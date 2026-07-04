# Non-Custodial Copytrading on Bayse

This document details the architectural decisions and flows for executing copytrades on Bayse Markets without holding custody of follower funds.

---

## 1. The Core Architecture (Non-Custodial API Key Delegation)

Instead of depositing funds into a platform-controlled wallet (like traditional custodial copytrading platforms), followers keep their funds in their own personal Bayse accounts. They delegate trading execution to us by creating and sharing API key pairs (`publicKey` / `secretKey`).

```
┌──────────────────────────────────────────────────┐
│                YOUR COPYTRADE APP                 │
│                                                   │
│  ┌─────────────┐  ┌──────────────────────────┐   │
│  │ Leader       │  │ Follower Execution       │   │
│  │ Monitoring   │  │                          │   │
│  │              │  │  For each follower:      │   │
│  │ WebSocket ◄──┼──┤  1. Get leader's trade   │   │
│  │ user_trades  │  │  2. Scale amount         │   │
│  │ channel      │  │  3. Sign with their key  │   │
│  │ (no auth!)   │  │  4. POST order to Bayse  │   │
│  └─────────────┘  │  5. Track result          │   │
│                    └──────────────────────────┘   │
│                                                   │
│  ┌─────────────────────────────────────────────┐ │
│  │ 🔐 Key Vault (encrypted API keys per user)  │ │
│  └─────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────┘
```

---

## 2. Step-by-Step Copytrade Execution Flow

1. **User Funding:** Followers deposit USDT directly on `app.bayse.markets` into their own accounts.
2. **API Key Generation:** Followers go to account settings in Bayse, create a new API key pair, and paste the public & secret keys into our platform.
3. **Encryption & Storage:** Our platform encrypts and vaults their secret keys (using AES-256-GCM).
4. **Leader Tracking:** We subscribe to the leader's trading activities using the public WebSocket channel `user_trades` (subscribing by leader's `userId`).
5. **Signal Distribution:** When the WebSocket broadcasts a filled trade for the leader, our engine:
   - Fetches the active followers copying this leader.
   - Calculates the proportionate trade size for each follower.
   - Signs a `POST /v1/pm/events/{eventId}/markets/{marketId}/orders` request payload using the follower's private `secretKey` (via HMAC-SHA256).
   - Sends the order to Bayse.
6. **Execution:** Bayse matches the order and deducts the funds directly from the follower's personal balance.

---

## 3. Benefits of This Model

- **No Regulatory Money Transmission License Required:** You do not touch user funds, hold deposits, or handle withdrawals.
- **Minimal Custody Liability:** If your platform experiences an outage, user funds remain secure in their Bayse wallets.
- **Instant Revocation:** The user can delete their API key on Bayse at any time, instantly cutting off our access.
- **Lower Implementation Complexity:** No ledger systems, withdrawal queue management, or payment gateway accounting for deposits are required.
