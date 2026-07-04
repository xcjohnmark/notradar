# Bayse Markets Copytrading Platform

This repository contains the architecture, designs, and source code for a non-custodial copytrading platform built on top of [Bayse Markets](https://bayse.markets).

---

## 📚 Project Documentation & Guides

To keep our architecture and compliance standards easy to reference as the codebase grows, we maintain the following guides in the `docs/` folder:

### 1. [Non-Custodial Copytrading Guide](file:///c:/Users/ADMIN/Documents/bayse/docs/non_custodial_copytrading.md)
Detailed breakdown of how we mirror leader trades using delegated API keys (`publicKey` and `secretKey`) while ensuring user funds stay securely in their own Bayse wallets.

### 2. [Legal & Security Compliance Checklist](file:///c:/Users/ADMIN/Documents/bayse/docs/legal_security_compliance.md)
The legal rules, advisor frameworks (SEC, SEC Nigeria, CFTC), data privacy standards (NDPR/GDPR), terms of service disclosures, and database key encryption guidelines (AES-256-GCM) that our platform must enforce.

### 3. [Monetization & Fee Model Analysis](file:///c:/Users/ADMIN/Documents/bayse/docs/fee_model_analysis.md)
An analysis of how to generate revenue without custody. Explains the hybrid model (freemium monthly subscriptions + profit-share performance fees on wins) and how to handle payments via pre-funded platform credits.

---

## 🛠️ Next Steps in Development
1. **API Signature Utility:** Implement the HMAC-SHA256 signature generator required for making write API requests on behalf of users.
2. **WebSocket Subscriber:** Set up the `user_trades` WebSocket channel listener to stream leader fills.
3. **Database Schema:** Design the encrypted credential vault and follower configuration tables.
