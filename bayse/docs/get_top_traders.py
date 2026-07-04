import os
import sys
import time
import requests
from datetime import datetime, timezone, timedelta
from concurrent.futures import ThreadPoolExecutor, as_completed

# API Endpoint URL
BASE_URL = "https://relay.bayse.markets/v1"

# Helper function to fetch with retry and timeout
def fetch_with_retry(url, params=None, retries=5, backoff=1.5):
    for i in range(retries):
        try:
            resp = requests.get(url, params=params, timeout=20)
            if resp.status_code == 200:
                return resp.json()
            else:
                print(f"[{resp.status_code}] Failed to fetch {url}. Retrying ({i+1}/{retries})...", file=sys.stderr)
        except Exception as e:
            print(f"Error fetching {url}: {e}. Retrying ({i+1}/{retries})...", file=sys.stderr)
        time.sleep(backoff ** i)
    raise Exception(f"Failed to fetch {url} after {retries} retries")

# 1. Fetch resolved events for 15-minute crypto series
def fetch_series_events(series_slug, cutoff_date):
    events_map = {}
    page = 1
    stop = False
    
    while not stop:
        url = f"{BASE_URL}/pm/events"
        params = {
            'seriesSlug': series_slug,
            'status': 'resolved',
            'page': page,
            'size': 100
        }
        try:
            data = fetch_with_retry(url, params=params)
            events = data.get("events", [])
            if not events:
                break
                
            for event in events:
                res_date_str = event.get("resolutionDate")
                if not res_date_str:
                    continue
                res_date = datetime.fromisoformat(res_date_str.replace("Z", "+00:00"))
                if res_date < cutoff_date:
                    stop = True
                    break
                
                # Store market details
                for market in event.get("markets", []):
                    market_id = market["id"]
                    events_map[market_id] = {
                        "market_id": market_id,
                        "event_title": event.get("title"),
                        "market_title": market.get("title"),
                        "outcome1Id": market.get("outcome1Id"),
                        "outcome2Id": market.get("outcome2Id"),
                        "resolvedOutcomeId": market.get("resolvedOutcomeId"),
                        "totalOrders": market.get("totalOrders", 0),
                        "supportedCurrencies": event.get("supportedCurrencies", ["USD"])
                    }
                    
            if stop:
                break
            pagination = data.get("pagination", {})
            if page >= pagination.get("lastPage", 1):
                break
            page += 1
        except Exception as e:
            print(f"Error fetching page {page} for series {series_slug}: {e}", file=sys.stderr)
            break
            
    print(f"Fetched {len(events_map)} resolved markets for series {series_slug}", file=sys.stderr)
    return events_map

# 2. Fetch all trades page by page
def fetch_trades_page(params, page):
    page_params = params.copy()
    page_params['page'] = page
    url = f"{BASE_URL}/pm/trades"
    try:
        data = fetch_with_retry(url, params=page_params)
        return data.get("data", [])
    except Exception as e:
        print(f"Error fetching trades page {page}: {e}", file=sys.stderr)
        return []

# 3. Resolve user UUID to tag/username
def lookup_user_tag(user_id):
    url = f"{BASE_URL}/user/lookup"
    params = {'userId': user_id}
    try:
        resp = requests.get(url, params=params, timeout=10)
        if resp.status_code == 200:
            return resp.json().get("tag")
    except Exception:
        pass
    return None

def main():
    now = datetime.now(timezone.utc)
    cutoff = now - timedelta(days=30)
    print(f"Scanning 15-minute crypto markets resolved after: {cutoff.isoformat()}", file=sys.stderr)
    
    series_slugs = ['crypto-sol-15min', 'crypto-eth-15min', 'crypto-btc-15min']
    market_map = {}
    
    # Fetch events in parallel for the 3 series
    with ThreadPoolExecutor(max_workers=3) as executor:
        futures = {executor.submit(fetch_series_events, slug, cutoff): slug for slug in series_slugs}
        for future in as_completed(futures):
            res = future.result()
            market_map.update(res)
            
    print(f"Total 15-minute crypto markets resolved in last 30 days: {len(market_map)}", file=sys.stderr)
    
    # Fetch all trades in the 30-day range
    trades_params = {
        'fromDate': cutoff.isoformat().replace("+00:00", "Z"),
        'toDate': now.isoformat().replace("+00:00", "Z"),
        'size': 100
    }
    
    # Get page 1 first to know the total count and page count
    print("Fetching page 1 of trades...", file=sys.stderr)
    first_page = fetch_with_retry(f"{BASE_URL}/pm/trades", params={**trades_params, 'page': 1})
    all_trades = first_page.get("data", [])
    pagination = first_page.get("pagination", {})
    last_page = pagination.get("lastPage", 1)
    total_trades = pagination.get("totalCount", 0)
    print(f"Total platform trades in 30-day range: {total_trades} across {last_page} pages", file=sys.stderr)
    
    # Fetch remaining pages in parallel
    if last_page > 1:
        print(f"Fetching remaining {last_page - 1} pages of trades in parallel...", file=sys.stderr)
        with ThreadPoolExecutor(max_workers=20) as executor:
            futures = [executor.submit(fetch_trades_page, trades_params, p) for p in range(2, last_page + 1)]
            for future in as_completed(futures):
                all_trades.extend(future.result())
                
    print(f"Total trades fetched: {len(all_trades)}", file=sys.stderr)
    
    # Filter trades and calculate user ledger state
    # User state structure: { user_id: { "cash": 0.0, "shares": { outcome_id: 0.0 } } }
    ledger = {}
    
    for t in all_trades:
        market_id = t.get("marketId")
        if market_id not in market_map:
            continue
            
        # Parse trade fields
        size = float(t["size"])
        taker_uid = t["takerUserId"]
        maker_uid = t["makerUserId"]
        match_type = t["matchType"]
        taker_side = t["takerSide"]
        taker_price = float(t["takerPrice"])
        maker_price = float(t["makerPrice"])
        taker_fee = float(t.get("takerFee", 0.0))
        taker_outcome = t["takerOutcomeId"]
        maker_outcome = t["makerOutcomeId"]
        
        # Initialize user ledger entries if needed
        for uid in (taker_uid, maker_uid):
            if uid not in ledger:
                ledger[uid] = {"cash": 0.0, "shares": {}}
                
        # 1. Process Taker
        if taker_side == 'BUY':
            ledger[taker_uid]["cash"] -= (size * taker_price + taker_fee)
            ledger[taker_uid]["shares"][taker_outcome] = ledger[taker_uid]["shares"].get(taker_outcome, 0.0) + size
        elif taker_side == 'SELL':
            ledger[taker_uid]["cash"] += (size * taker_price - taker_fee)
            ledger[taker_uid]["shares"][taker_outcome] = ledger[taker_uid]["shares"].get(taker_outcome, 0.0) - size
            
        # 2. Process Maker
        if match_type == 'MINT':
            ledger[maker_uid]["cash"] -= (size * maker_price)
            ledger[maker_uid]["shares"][maker_outcome] = ledger[maker_uid]["shares"].get(maker_outcome, 0.0) + size
        elif match_type == 'BURN':
            ledger[maker_uid]["cash"] += (size * maker_price)
            ledger[maker_uid]["shares"][maker_outcome] = ledger[maker_uid]["shares"].get(maker_outcome, 0.0) - size
        else: # e.g. COMPLEMENTARY
            if taker_side == 'BUY':
                ledger[maker_uid]["cash"] += (size * maker_price)
                ledger[maker_uid]["shares"][maker_outcome] = ledger[maker_uid]["shares"].get(maker_outcome, 0.0) - size
            elif taker_side == 'SELL':
                ledger[maker_uid]["cash"] -= (size * maker_price)
                ledger[maker_uid]["shares"][maker_outcome] = ledger[maker_uid]["shares"].get(maker_outcome, 0.0) + size

    # 3. Add settlement payouts at resolution
    # For each market, find its winning outcome
    for market_id, m_info in market_map.items():
        win_outcome = m_info["resolvedOutcomeId"]
        if not win_outcome:
            continue
        # Payout any winning shares held by users
        for uid, state in ledger.items():
            shares_held = state["shares"].get(win_outcome, 0.0)
            if shares_held > 0.00001:
                state["cash"] += shares_held * 1.0
                state["shares"][win_outcome] = 0.0
                
    # Calculate PnL per user (final cash balance after resolution payouts)
    user_pnls = []
    for uid, state in ledger.items():
        pnl = state["cash"]
        if abs(pnl) > 0.01:
            user_pnls.append((uid, pnl))
            
    # Sort and rank traders
    user_pnls.sort(key=lambda x: x[1], reverse=True)
    top_20 = user_pnls[:20]
    
    print(f"\nTop 20 traders in 15m crypto markets (last 30 days):")
    print(f"{'Rank':<5} | {'User ID':<38} | {'Username/Tag':<18} | {'Realized PnL (USD)':<20}")
    print("-" * 90)
    
    # Resolve usernames in parallel
    resolved_tags = {}
    with ThreadPoolExecutor(max_workers=10) as executor:
        futures = {executor.submit(lookup_user_tag, uid): uid for uid, _ in top_20}
        for future in as_completed(futures):
            uid = futures[future]
            resolved_tags[uid] = future.result() or "N/A"
            
    for rank, (uid, pnl) in enumerate(top_20, 1):
        tag = resolved_tags.get(uid, "N/A")
        print(f"{rank:<5} | {uid:<38} | {tag:<18} | ${pnl:,.2f}")

if __name__ == "__main__":
    main()
