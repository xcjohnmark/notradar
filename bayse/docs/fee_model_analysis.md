# Monetization & Fee Model Analysis

This document outlines the charging structures and billing mechanisms for the Bayse copytrading platform.

---

## 1. The Core Billing Challenge (Non-Custodial Context)
Because our copytrading platform is **non-custodial**, we cannot automatically deduct fees directly from the user's Bayse wallet. We must set up a separate billing mechanism to capture revenue.

---

## 2. Recommended Pricing: Freemium + Profit-Share Hybrid

We recommend charging a small monthly subscription to cover infrastructure cost, combined with a profit-sharing performance fee on winning predictions.

```
┌────────────────────────────────────────────────────────────────────────┐
│                              PRICING TIERS                             │
├──────────────────────────┬──────────────────────────┬──────────────────┤
│ Free Tier                │ Pro Tier (₦3,000 / mo)   │ Elite Tier (TBD) │
├──────────────────────────┼──────────────────────────┼──────────────────┤
│ • Browse leaderboard     │ • Auto-copy 3 leaders    │ • Unlimited auto │
│ • View leader analytics  │ • Real-time alerts       │ • Priority execution│
│ • Manual "click-to-copy" │ • 20% Profit-Share fee   │ • 15% Profit-Share│
└──────────────────────────┴──────────────────────────┴──────────────────┘
```

---

## 3. Fee Collection Architecture: Pre-Funded Credits

To collect the profit-sharing performance fee without holding custody of user trading funds, we use **Pre-Funded Credits**:

1. **Top-Up:** The user deposits a small balance of operational credits (e.g., ₦2,000 or ₦5,000) using a gateway like Paystack or Stripe directly to our platform.
2. **Trade Monitoring:** We execute copied trades on Bayse.
3. **Outcome Tracking:** We listen to user account activities. When a `PAYOUT_WIN` activity is detected, we calculate the profit:
   $$\text{Profit} = \text{Payout Amount} - \text{Original Cost}$$
4. **Deduction:** We deduct the performance fee (e.g., 20% of profit) from their pre-funded credit balance on our platform.
5. **Low Balance Action:** If credits drop below a threshold (e.g., ₦500), we alert the user. If credits hit 0, we temporarily pause automatic copying until they top up.

---

## 4. Profit Tracking via Bayse API

To calculate profit-sharing, we query the following Bayse endpoints:
- `GET /v1/pm/pnl` — to retrieve realized profit/loss over a specific billing cycle.
- `GET /v1/pm/activities` — to track specific trade events (`BUY_TRADE_FILL`, `PAYOUT_WIN`, `PAYOUT_LOSS`).
- `GET /v1/pm/portfolio` — to monitor open positions and average entry costs.
