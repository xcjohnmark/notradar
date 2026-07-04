# Features

A complete list of every feature planned for the platform. Features are grouped by development phase and ordered by ship priority within each phase.

---

## Roadmap

### Phase 1 — MVP
Launch the core discovery experience. Users can browse traders and markets without needing an account.
- Leaderboard
- Market Browser
- Multi-Currency Support
- Dark / Light Mode
- Onboarding Flow
- Mobile Responsive Design

### Phase 2 — Trader Intelligence
Deep-dive analytics for individual traders and personal portfolio tracking.
- Trader Profiles
- Trader Comparison
- Personal Portfolio Dashboard
- Market Watchlist

### Phase 3 — Copy Trading
The flagship feature set. Users connect their Bayse API keys and start copying trades.
- Watchlist & Trader Tracking
- Manual Copy Trading
- In-App Trading
- Risk Controls
- Automated Copy Trading Bot

### Phase 4 — Smart Money & AI
Real-time market intelligence and conversational AI.
- Whale Tracker / Live Activity Feed
- Smart Money Alerts
- AI Agent (Natural Language Terminal)

### Phase 5 — Pro Terminal & Growth
Power-user tools, monetization infrastructure, and platform growth features.
- Pro Trading Interface
- Copy Performance Analytics
- Leader Marketplace
- Referral Program
- Trade Journal / Notes
- Data Export

### Future — Multi-Platform
Expand beyond Bayse to become the universal prediction market terminal.
- Multi-Platform Support

---

## Core Features

### Phase 1 — MVP

| # | Feature | Description | Example Use Case |
|---|---------|-------------|-----------------|
| 1 | **Leaderboard** | Ranked table of top traders on Bayse. Filterable by market category (sports, crypto, politics, weather, etc.) and time period (24h, 7d, 14d, 30d, all-time). Sortable by PnL, win rate, volume, or trade count. | A user opens the app and sees "Top Crypto Traders — Last 7 Days." @stormchaser is #1 with ₦47,200 profit and a 78% win rate. The user clicks their profile to learn more. |
| 1 | **Market Browser** | Browsable list of all active Bayse prediction markets with live YES/NO prices, volume, and category tags. Filterable by category, trending, and keyword search. Shows market status (open, closing soon, resolved). | A user searches "Premier League" and sees all active match markets. They notice "Will Arsenal beat Chelsea?" is trending with ₦2.3M volume and YES trading at ₦0.72. |
| 1 | **Multi-Currency Support** | Full support for both USD and NGN throughout the platform. All prices, PnL, and leaderboard rankings can be toggled between currencies. Matches Bayse's native multi-currency support. | A Nigerian user views everything in NGN. A diaspora user switches to USD. Leaderboard rankings stay consistent because stats are computed in USD internally and converted at display time. |
| 1 | **Dark / Light Mode** | Theme toggle with dark mode as default (matching the trading terminal aesthetic). Persisted in user preferences. | User prefers light mode during daytime browsing and switches to dark mode at night. Their preference is remembered. |
| 1 | **Onboarding Flow** | Guided setup for new users: create account → (optional) connect Bayse API keys → pick favourite categories → follow first leader. Explains copy trading risks with a required acknowledgement. | New user signs up, gets a 4-step wizard: "Welcome → Connect your Bayse account → Choose what you're interested in (Sports / Crypto / Politics) → Follow your first top trader." They're active within 2 minutes. |
| 1 | **Mobile Responsive Design** | Fully responsive web app that works on mobile browsers. Key flows (leaderboard browsing, notifications, one-click copy) are optimized for small screens. | User gets a push notification on their phone about a whale trade. They open the app in Chrome mobile, see the trade details, and tap "Copy" — all without needing a desktop. |

### Phase 2 — Trader Intelligence

| # | Feature | Description | Example Use Case |
|---|---------|-------------|-----------------|
| 2 | **Trader Profiles** | Detailed profile page for any Bayse trader. Shows their username, avatar, total PnL, win/loss ratio, total trades, favourite categories, biggest win, longest win streak, average hold time, and recent trade activity. | A user clicks @mulumba from the leaderboard and sees: lifetime PnL of ₦312,000, 67% win rate, 480 trades, top category is Sports (72% of volume), biggest single win was ₦28,000 on a Champions League final market. |
| 2 | **Trader Comparison** | Side-by-side comparison of two or more traders across all metrics — PnL, win rate, consistency, category performance, drawdown, and recent form. | A user is deciding between copying @mulumba or @stormchaser. They compare both: @mulumba has higher total PnL but @stormchaser has a higher win rate and lower drawdowns. |
| 2 | **Personal Portfolio Dashboard** | Authenticated view of the user's own Bayse account. Shows account value, cash balance, realized and unrealized PnL (with time range filters), open positions with current value, open orders, trade history, win rate, and biggest win. | A user connects their API keys and sees: Account Value ₦45,000, PnL this month +₦8,200, 12 open positions, Win Rate 64%, Biggest Win ₦5,400 on "BTC > $100k?" market. |
| 2 | **Market Watchlist** | Users can save favourite markets to a personal watchlist with live price updates. Quick access from the dashboard sidebar. Optional price alerts when a market moves past a threshold. | User adds "Will Nigeria win AFCON 2026?" to their watchlist. It appears pinned on their dashboard. They set an alert: "Notify me if YES drops below ₦0.40." Two days later, the alert fires and they buy the dip. |

### Phase 3 — Copy Trading

| # | Feature | Description | Example Use Case |
|---|---------|-------------|-----------------|
| 3 | **Watchlist & Trader Tracking** | Users can follow/watch specific traders. When a tracked trader places a trade, the user gets a real-time notification with trade details (market, outcome, amount, price). | A user follows @mulumba. 20 minutes later, they receive a push notification: "🔔 @mulumba just bought YES on 'Will it rain in Lagos tomorrow?' — ₦5,000 at ₦0.45." The user can then decide to copy or ignore. |
| 3 | **Manual Copy Trading** | One-click copy of a leader's trade. When a notification comes in for a tracked trader, the user can tap "Copy This Trade" to instantly execute the same trade on their own Bayse account (via their stored API keys), with an adjustable amount. | User gets notified that @stormchaser bought YES for ₦10,000. They tap "Copy" and adjust the amount to ₦2,000. The trade is placed on Bayse using their own balance. |
| 3 | **In-App Trading** | Place trades directly from the platform without switching to app.bayse.markets. Includes market/limit orders, a quote preview (expected cost, shares, fees), and position management (view, sell). | User is browsing markets and sees "Nigeria vs Ghana — Will Nigeria Win?" at YES ₦0.65. They click "Buy YES," enter ₦5,000, see the quote (7,692 shares, ₦98 fee), and confirm. The trade executes on Bayse instantly. |
| 3 | **Risk Controls** | Configurable safety limits for all copy trading (manual and automated). Includes: max allocation per trade, max daily spend, global stop-loss (pause copying if account drops by X%), and slippage limits (skip trade if price has moved more than X% from leader's entry). | User sets: "Never spend more than ₦3,000 on a single copied trade" and "Pause all copying if my wallet drops below ₦10,000 this week." The copy engine respects these limits on every execution. |
| 3 | **Automated Copy Trading Bot** | Fully automated copy engine that runs 24/7. User selects leaders to follow, configures parameters (allocation %, max per trade, categories to include/exclude), and the bot mirrors trades in real-time without manual intervention. | User configures: "Copy @mulumba's sports trades at 50% of his position size, max ₦5,000 per trade, skip crypto markets." The bot runs overnight and copies 3 trades while the user sleeps. |

### Phase 4 — Smart Money & AI

| # | Feature | Description | Example Use Case |
|---|---------|-------------|-----------------|
| 4 | **Whale Tracker / Live Activity Feed** | Real-time scrolling feed of large trades happening across all Bayse markets. Highlights big-money moves (e.g., trades > ₦50,000), sudden volume spikes, and unusual concentration on a single outcome. Filterable by category and minimum trade size. | User opens the Whale Tracker and sees a live feed: "🐋 @bigfish just dropped ₦200,000 on YES for 'BTC > $110k by July' at ₦0.38." Three more large YES buys appear in 5 minutes — the user spots a trend and considers following the smart money. |
| 4 | **Smart Money Alerts** | Configurable alerts that fire when specific conditions are detected: a tracked trader enters a new position, a whale makes a large trade, a market's volume spikes suddenly, or the probability on a market shifts rapidly. Delivered via in-app notification, email, or push. | User sets an alert: "Notify me when any trade > ₦100,000 is placed on a crypto market." At 3 AM, the alert fires: "🚨 ₦150,000 BUY YES on 'ETH > $5k?' by @cryptoking." The user wakes up and decides to follow the trade. |
| 4 | **AI Agent (Natural Language Terminal)** | A conversational AI assistant embedded in the platform. Users type natural language questions and the agent queries the leaderboard, trader profiles, market data, and user portfolio to return detailed, formatted answers. | User types: "Who is the most successful trader on weather markets for the past 30 days?" → Agent responds with a detailed card showing the top trader, their PnL, win rate, recent trades, and most profitable weather bets. |

### Phase 5 — Pro Terminal & Growth

| # | Feature | Description | Example Use Case |
|---|---------|-------------|-----------------|
| 5 | **Pro Trading Interface** | Advanced market view for power users. Real-time order book visualization with depth, live price history charts with candlestick/line options, ticker data (24h volume, price change), and one-click trading with pre-filled quotes. | User opens the Pro view for "Will BTC close above $100k today?" and sees a full order book (bids stacked at 0.62-0.64, asks at 0.66-0.68), a price chart showing YES climbed from 0.45 to 0.65 in 3 hours, and a one-click "Buy YES at Market" button. |
| 5 | **Copy Performance Analytics** | Dashboard showing how much profit/loss the user has made specifically from copied trades. Breakdown by leader (which leaders made you money vs lost you money), by category, and over time. Includes ROI per leader and overall copy trading performance. | User checks their copy analytics: "Copying @mulumba earned you ₦12,400 over 30 days (28 trades, 71% win rate). Copying @badpicks lost you ₦3,200 (12 trades, 33% win rate). Net copy trading profit: ₦9,200." They unfollow @badpicks. |
| 5 | **Leader Marketplace** | Leaders can opt-in to be listed as "Premium Leaders" and set their own follower fee (e.g., ₦1,000/month or 5% of follower profits). Platform takes a cut of leader fees. Leaders get a dashboard showing their follower count, total fees earned, and follower performance. | @mulumba lists herself as a Premium Leader at ₦2,000/month. 50 users subscribe, earning her ₦100,000/month. The platform takes 20% (₦20,000). Users see a "Premium" badge on her profile and get priority copy execution. |
| 5 | **Referral Program** | Users earn rewards for inviting new users to the platform. Tiered referral system where referrers earn a percentage of their referrals' subscription or profit-share fees. Referral links and tracking dashboard. | User shares their referral link on Twitter. 10 friends sign up and subscribe to Pro (₦3,000/month each). The user earns 20% = ₦6,000/month in referral rewards. Their referral dashboard shows total invites, active subscribers, and lifetime earnings. |
| 5 | **Trade Journal / Notes** | Users can attach personal notes to any trade or position. Tag trades with custom labels (e.g., "gut feeling," "following whale," "AI recommended"). Filter trade history by tags to analyze which strategies work best. | User copies a trade and adds a note: "Followed @mulumba on this, high conviction." When reviewing their month, they filter by "following whale" trades and discover those have a 72% win rate vs 45% for "gut feeling" trades. |
| 5 | **Data Export** | Export trade history, portfolio data, leaderboard rankings, and copy performance as CSV or PDF. Useful for record-keeping, tax reporting, or sharing results. | User exports their monthly copy trading report as PDF: total trades, P&L, fees paid, leaders copied. They attach it to their TEF grant application to show traction. |

### Future — Multi-Platform

| # | Feature | Description | Example Use Case |
|---|---------|-------------|-----------------|
| ∞ | **Multi-Platform Support** | Future expansion beyond Bayse to aggregate leaderboards and copy trading across multiple prediction market platforms (e.g., Polymarket, Kalshi). Single dashboard for all prediction markets. | Phase 2 of the business: user sees a unified leaderboard combining Bayse and Polymarket traders. They can copy a Polymarket whale directly from the same interface they use for Bayse. |
