# Tech Stack & Architecture ($0 Budget)

This document outlines the software stack and infrastructure architecture for **Notradar**. Every component has been selected to ensure **$0 upfront cost**, scaling only as the user base and revenue grow.

---

## 1. Core Application Stack

| Layer | Technology | Selection Rationale | Cost |
|---|---|---|---|
| **Framework** | **Next.js 15 (App Router)** + **TypeScript** | Unified frontend & API routes, Server Actions for secure backend operations, standard for modern React apps. | **$0** (Open Source) |
| **Styling** | **Tailwind CSS v4** | Industry standard utility-first styling. Fully customizable, optimized compile times, matching dark terminal aesthetic. | **$0** (Open Source) |
| **Database** | **Supabase (PostgreSQL)** | Managed Postgres database with built-in row-level security (RLS). Includes a client library that integrates easily with Next.js. | **$0** (Free Tier: 500MB DB) |
| **Authentication** | **Supabase Auth** or **NextAuth.js** | Built-in email/password and social login OAuth handlers. | **$0** (Free Tier: up to 50k monthly active users) |

---

## 2. Key Vault & Security ($0 Custody)

| Component | Technology | Implementation | Cost |
|---|---|---|---|
| **Encryption Engine** | Node.js native `crypto` module | **AES-256-GCM** authenticated encryption. Followers' `secretKey` credentials are encrypted in Next.js Server Actions before saving to the DB. | **$0** (Built-in) |
| **Key Management** | Environment Variables | Master Key Encryption Key (KEK) is stored in local `.env.local` (and Vercel environment variables in production). | **$0** (Zero infrastructure overhead) |

---

## 3. Real-Time Copytrading Engine ($0 Run Cost)

Since copytrading requires monitoring leader trades 24/7, we need to handle WebSocket streams or frequent polls without paying for expensive persistent servers.

### Development Option
- **Node.js WebSocket Daemon (`ws` package)**: Run a lightweight script locally during development to listen to `wss://socket.bayse.markets/ws/v1/user` and execute trades.

### Production Options ($0)
1. **Fly.io (Free Tier)**:
   - Run a single-process Node.js worker that maintains the WebSocket connection.
   - **Cost**: **$0** (Fly.io offers 3 shared-cpu-1x VMs, 256MB RAM, and 3GB volume for free).
2. **Oracle Cloud Infrastructure (OCI) Always Free**:
   - Provision an Ampere A1 Compute instance (up to 4 ARM CPUs, 24GB RAM).
   - **Cost**: **$0** (Extremely generous compute tier, more than enough to run the copying daemon).
3. **Serverless Polling (Vercel Cron)**:
   - If running a persistent WebSocket worker is too complex initially, a Vercel Cron Job can poll `GET /v1/pm/trades` every 1 minute.
   - **Cost**: **$0** (Vercel provides 2 free cron jobs per project). *Note: This introduces up to 1-minute execution latency.*

---

## 4. Third-Party Integrations & Monetization ($0 Capital)

| Service | Provider | Billing Model | Cost |
|---|---|---|---|
| **Hosting & CDN** | **Vercel** | Hobby/Free Tier. Automatic deployments from GitHub. | **$0** |
| **Payment Gateway** | **Paystack** (NGN) / **Stripe** (USD) | Transaction fee percentage-only pricing (no monthly setup fees). Pays for itself from user top-ups. | **$0** upfront |
| **Transactional Email** | **Resend** or **SendGrid** | Sends waitlist onboarding and win notifications. | **$0** (Resend Free Tier: 3,000 emails/month) |

---

## 5. Deployment Workflow

```
[Local Dev] ──(git push)──> [GitHub Repo] ──(webhook)──> [Vercel Deployment]
                                                    │
                                                    └───> [Fly.io / OCI Worker] (Pull changes)
```
