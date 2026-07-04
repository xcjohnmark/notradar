# Legal & Security Compliance Guide

This guide details the operational, security, and legal requirements for our non-custodial copytrading platform on Bayse Markets. Refer to this during development to ensure keys are stored safely and the platform operates within the law.

---

## 1. Security Architecture (Technical Compliance)

Your primary security objective is to protect user API credentials (`publicKey` and `secretKey`). If your database is compromised, an attacker can use your users' keys to drain their accounts via intentional bad trades (wash trading against an attacker-controlled market).

### Key Vaulting & Encryption
- **Encryption at Rest:** Never store API secret keys in plain text. Use **AES-256-GCM** (authenticated encryption) or a managed Key Management Service (KMS) like AWS KMS or GCP KMS.
- **Envelope Encryption:** Encrypt each user's API keys using a unique data key (DEK), and encrypt the DEK with a master key (KEK) managed by your KMS.
- **No Log Leaks:** Write strict middleware or filters to redact strings matching `pk_live_` and `sk_live_` from all application logs, error trackers (Sentry), and database backups.

### Execution Isolation
- **Process Separation:** Keep your **Copy Trading Engine** separate from your web application server. The engine should run in a private VPC with restricted access to the DB.
- **Ephemeral Key Loading:** Keys should only be loaded into memory temporarily when signing an order request and cleared immediately after.

---

## 2. Regulatory & Legal Frameworks

Even though you do not hold user funds, your platform advises and automates trading decisions. This puts you under the purview of financial regulators depending on your target markets (e.g., US, Nigeria, UK, EU).

### SEC & SEC Nigeria (Securities Commission)
- **Broker-Dealer vs. Software Tool:** You must position your platform strictly as a **technology service provider**. Do not pool funds, do not guarantee returns, and do not execute trades on your own discretion.
- **Investment Advisers Act:** If you recommend specific leaders or charge performance fees, regulators might classify you as an unregistered Investment Adviser. To mitigate this:
  - Avoid using terms like "investment advice," "managed portfolio," or "guaranteed profits."
  - Provide objective sorting algorithms for leaders (e.g., sort by win rate, sorting by volume) rather than curated "staff picks."

### CFTC (Commodity Futures Trading Commission)
If Bayse offers prediction markets that resemble binary options or event contracts (especially for US users):
- **Commodity Trading Advisor (CTA):** Providing automated copytrading systems can require CTA registration in the US. Consider blocking US IP addresses / geofencing if you do not want to register with the CFTC/NFA.

### Data Privacy Laws (GDPR & NDPR)
Since you are collecting API keys and user information:
- **NDPR (Nigeria Data Protection Regulation) / GDPR:** Ensure users can request the deletion of their accounts. When they delete their accounts, you must securely overwrite/scrub their encrypted API keys from your DB.

---

## 3. Disclaimers, TOS & Risk Mitigations

To protect yourself from lawsuits if a leader loses a follower's money, you need robust legal agreements that users must accept.

### Essential Terms of Service (TOS) Clauses
1. **No Fiduciary Duty:** State clearly that you are not a fiduciary, financial advisor, or broker.
2. **Slippage and Execution Risk:** Acknowledge that because copying trades takes time (latency), followers might get filled at a worse price than the leader (slippage), or may not get filled at all.
3. **Leader Liability:** Leaders are not liable for followers' losses. Follower trades are executed at their own risk.
4. **Platform Outages:** You are not liable for losses due to platform downtime, WebSocket drops, or API key expiration.

### Forced Risk Settings (In-App Guards)
Provide configuration controls to users to prove to regulators that you give users ultimate control over their risk:
- **Maximum Allocation per Trade:** Let users set a limit (e.g., "Never spend more than $50 on a single copied trade").
- **Global Stop-Loss:** Let users set a threshold (e.g., "If my wallet balance drops by 20% this week, pause all copy trading").
- **Slippage Limits:** Do not execute copied trades if the market price has moved more than X% away from the leader's entry price.

---

## 4. API Integrity & Limits

Bayse enforces rate limits and trading rules. Failing to handle them correctly could cause your platform keys to be blacklisted.

- **Rate Limit Gating:** Scale your writes. If you have 1,000 followers trying to copy a single trade at the exact same millisecond, your batch calls must respect Bayse's write rate limits. Queue transactions and process them gracefully.
- **Idempotency Keys:** Always send a unique `Idempotency-Key` header with every order placement request. If a network timeout occurs, this prevents you from accidentally placing the trade twice for the follower.
- **Invalid Key Handling:** If a user revokes their API key on Bayse, your request will fail with `401 Unauthorized`. Your engine must immediately catch this exception, disable auto-copy for that user, and notify them to update their credentials.
