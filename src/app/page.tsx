"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { joinWaitlist } from "./actions";

// Mock data for copytrading simulation
const TRADERS = [
  {
    tag: "@stormchaser",
    category: "Crypto",
    winRate: 78,
    pnl30dPercent: 42.5,
    description: "Swells crypto momentum and trades short-term market trends with tight risk limits.",
    avatarText: "SC",
    recentMarket: "BTC > $100k by end of week?",
    recentOutcome: "YES",
    recentPrice: 0.64,
  },
  {
    tag: "@mulumba",
    category: "Sports",
    winRate: 71,
    pnl30dPercent: 31.8,
    description: "Specializes in major European football leagues and arbitrage across match outcomes.",
    avatarText: "ML",
    recentMarket: "Will Arsenal win the Premier League?",
    recentOutcome: "YES",
    recentPrice: 0.58,
  },
];

export default function Home() {
  const [selectedTraderIndex, setSelectedTraderIndex] = useState(0);
  const [currency, setCurrency] = useState<"USD" | "NGN">("USD");
  const [copyAmount, setCopyAmount] = useState(100); // Default $100 or ₦150k
  
  // Waitlist form state
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<{ success?: boolean; message?: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  const activeTrader = TRADERS[selectedTraderIndex];

  // Currency multiplier (1 USD = 1,500 NGN)
  const rate = 1500;
  
  const formatValue = (usdVal: number) => {
    if (currency === "USD") {
      return `$${usdVal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } else {
      return `₦${(usdVal * rate).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    }
  };

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    if (!email) return;

    startTransition(async () => {
      const formData = new FormData();
      formData.append("email", email);
      const res = await joinWaitlist(null, formData);
      setStatus(res);
      if (res.success) {
        setEmail("");
      }
    });
  };

  // Simulated PnL and fee calculation
  const projectedProfit = copyAmount * (activeTrader.pnl30dPercent / 100);
  const platformFee = projectedProfit * 0.20; // 20% performance fee
  const netProfit = projectedProfit - platformFee;

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-[#F1F5F9] font-sans antialiased overflow-x-hidden relative selection:bg-[#00D4FF]/30 selection:text-[#00D4FF]">
      
      {/* Background Radial Glow Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-radial from-[#00D4FF]/10 to-transparent pointer-events-none blur-3xl" />
      <div className="absolute top-[30%] right-[-10%] w-[60%] h-[60%] rounded-full bg-radial from-[#F5A623]/5 to-transparent pointer-events-none blur-3xl" />
      <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] rounded-full bg-radial from-[#00D4FF]/5 to-transparent pointer-events-none blur-3xl" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Navigation Header */}
      <header className="relative z-10 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-white/10 bg-[#111827] flex items-center justify-center">
            <Image
              src="/logo.jpg"
              alt="Notradar Bull Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <span className="font-bold tracking-wider text-xl bg-gradient-to-r from-[#00D4FF] to-[#5B9BF5] bg-clip-text text-transparent uppercase">
            Notradar
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://x.com/notradar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#94A3B8] hover:text-[#00D4FF] transition-colors"
          >
            {/* X Logo */}
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-20 flex flex-col items-center">
        
        {/* Hero Section */}
        <div className="w-full text-center max-w-4xl mx-auto mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00D4FF]/20 bg-[#00D4FF]/5 text-xs text-[#00D4FF] font-mono mb-6 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse" />
            PRE-LAUNCH ACCESS LIVE
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
            Your Edge on{" "}
            <span className="bg-gradient-to-r from-[#00D4FF] via-[#5B9BF5] to-[#F5A623] bg-clip-text text-transparent">
              Bayse Markets
            </span>
          </h1>
          <p className="text-[#94A3B8] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            A premium, non-custodial copytrading platform built on top of Bayse Markets. 
            Mirror top traders, establish customized risk controls, and trade with conviction—all directly from your own wallet.
          </p>

          {/* Waitlist Subscription Box */}
          <div className="max-w-md mx-auto w-full">
            <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-3 p-1.5 rounded-xl border border-white/10 bg-[#111827]/80 backdrop-blur-md focus-within:border-[#00D4FF]/50 transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <input
                type="email"
                placeholder="Enter your Gmail address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isPending}
                className="flex-1 bg-transparent px-4 py-3 rounded-lg text-sm text-[#F1F5F9] placeholder-[#64748B] focus:outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isPending}
                className="bg-[#00D4FF] text-black font-semibold text-sm px-6 py-3 rounded-lg hover:bg-[#33DDFF] active:bg-[#00B8E0] transition-all duration-200 cursor-pointer disabled:opacity-50 shadow-[0_0_15px_rgba(0,212,255,0.3)] hover:shadow-[0_0_20px_rgba(0,212,255,0.5)] font-mono tracking-wider flex items-center justify-center min-w-[120px]"
              >
                {isPending ? "SIGNING..." : "GET EDGE"}
              </button>
            </form>

            {/* Success/Error Feedback */}
            {status && (
              <div
                className={`mt-4 px-4 py-3 rounded-lg border text-sm font-mono text-left flex items-start gap-3 animate-fade-in ${
                  status.success
                    ? "bg-[#00E5A0]/10 border-[#00E5A0]/20 text-[#00E5A0]"
                    : "bg-[#FF6B6B]/10 border-[#FF6B6B]/20 text-[#FF6B6B]"
                }`}
              >
                <span className="mt-0.5 font-bold">{status.success ? "✓" : "✗"}</span>
                <div>
                  <p className="font-semibold">{status.success ? "Success" : "Error"}</p>
                  <p className="text-xs opacity-90 mt-0.5">{status.message}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Interactive Copytrading Simulator Widget */}
        <section className="w-full max-w-4xl mx-auto mb-20 lg:mb-28">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">See Copytrading in Action</h2>
            <p className="text-[#94A3B8] text-sm">Simulate execution using actual historical stats from top Bayse leaders.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 border border-white/5 rounded-2xl bg-[#111827]/40 backdrop-blur-md overflow-hidden p-6 md:p-8 shadow-[0_0_50px_rgba(0,0,0,0.4)]">
            
            {/* Left Controls Column */}
            <div className="md:col-span-2 flex flex-col gap-6">
              
              {/* Leader Picker */}
              <div>
                <label className="text-xs text-[#94A3B8] uppercase tracking-wider font-mono block mb-3">
                  Select Leader to Copy
                </label>
                <div className="flex flex-col gap-2">
                  {TRADERS.map((trader, idx) => (
                    <button
                      key={trader.tag}
                      onClick={() => setSelectedTraderIndex(idx)}
                      className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                        selectedTraderIndex === idx
                          ? "bg-[#00D4FF]/10 border-[#00D4FF]/30 text-[#00D4FF]"
                          : "bg-white/5 border-transparent text-[#94A3B8] hover:bg-white/10"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs font-mono ${
                        selectedTraderIndex === idx ? "bg-[#00D4FF] text-black" : "bg-white/10 text-white"
                      }`}>
                        {trader.avatarText}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate text-white">{trader.tag}</p>
                        <p className="text-xs opacity-70 truncate">{trader.category} market specialist</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Allocation Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs text-[#94A3B8] uppercase tracking-wider font-mono">
                    Copy Amount
                  </label>
                  <div className="flex rounded-md overflow-hidden border border-white/10 bg-white/5 p-0.5">
                    <button
                      onClick={() => {
                        setCurrency("USD");
                        setCopyAmount(100);
                      }}
                      className={`px-2 py-0.5 text-xs font-bold font-mono rounded cursor-pointer ${
                        currency === "USD" ? "bg-[#00D4FF] text-black" : "text-[#94A3B8] hover:text-white"
                      }`}
                    >
                      USD
                    </button>
                    <button
                      onClick={() => {
                        setCurrency("NGN");
                        setCopyAmount(150); // Set defaults
                      }}
                      className={`px-2 py-0.5 text-xs font-bold font-mono rounded cursor-pointer ${
                        currency === "NGN" ? "bg-[#00D4FF] text-black" : "text-[#94A3B8] hover:text-white"
                      }`}
                    >
                      NGN
                    </button>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl border border-white/5 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold font-mono text-white">
                      {currency === "USD" ? `$${copyAmount}` : `₦${(copyAmount * 1000).toLocaleString()}`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={currency === "USD" ? 10 : 15}
                    max={currency === "USD" ? 1000 : 1500}
                    step={currency === "USD" ? 10 : 15}
                    value={copyAmount}
                    onChange={(e) => setCopyAmount(Number(e.target.value))}
                    className="w-full accent-[#00D4FF] cursor-pointer bg-white/10 rounded-lg appearance-none h-1"
                  />
                  <div className="flex justify-between text-[10px] text-[#64748B] font-mono mt-2">
                    <span>MIN: {currency === "USD" ? "$10" : "₦15,000"}</span>
                    <span>MAX: {currency === "USD" ? "$1,000" : "₦1.5M"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Simulation Analytics Column */}
            <div className="md:col-span-3 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/5 pt-6 md:pt-0 md:pl-8">
              
              {/* Leader Metrics Card */}
              <div className="bg-[#111827]/60 border border-white/5 rounded-xl p-5 mb-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-[#00D4FF]/5 pointer-events-none blur-xl" />
                <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
                  <span className="font-semibold text-[#F1F5F9]">{activeTrader.tag} Profile</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-[#F5A623]/20 bg-[#F5A623]/10 text-[#F5A623]">
                    30D HISTORICAL DATA
                  </span>
                </div>
                <p className="text-xs text-[#94A3B8] leading-relaxed mb-4">{activeTrader.description}</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                    <span className="block text-[10px] text-[#64748B] font-mono uppercase tracking-wider">30D Return</span>
                    <span className="text-lg font-bold text-[#00E5A0] font-mono">+{activeTrader.pnl30dPercent}%</span>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/5">
                    <span className="block text-[10px] text-[#64748B] font-mono uppercase tracking-wider">Win Rate</span>
                    <span className="text-lg font-bold text-white font-mono">{activeTrader.winRate}%</span>
                  </div>
                </div>
              </div>

              {/* Projection & Action Preview */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="text-[#94A3B8]">Projected 30d Profit</span>
                    <span className="font-bold text-[#00E5A0] font-mono">{formatValue(currency === "USD" ? projectedProfit : projectedProfit * 1000)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs mb-3 border-b border-white/5 pb-2">
                    <span className="text-[#64748B]">Platform performance fee (20%)</span>
                    <span className="text-[#FF6B6B] font-mono">-{formatValue(currency === "USD" ? platformFee : platformFee * 1000)}</span>
                  </div>
                  <div className="flex justify-between items-center text-base font-semibold border-b border-white/5 pb-4 mb-4">
                    <span className="text-white">Your Projected Net Return</span>
                    <span className="text-[#00D4FF] font-mono">{formatValue(currency === "USD" ? netProfit : netProfit * 1000)}</span>
                  </div>
                </div>

                {/* API Request Box Code Preview */}
                <div className="bg-black/40 border border-white/5 rounded-lg p-4 font-mono text-[11px] text-[#94A3B8]">
                  <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-white/5">
                    <span className="text-[10px] text-[#64748B]">NOTRADAR SIGNING ENGINE</span>
                    <span className="text-[9px] text-[#00D4FF] animate-pulse">● EXECUTING</span>
                  </div>
                  <div className="space-y-1">
                    <div><span className="text-[#5B9BF5]">const</span> payload = <span className="text-[#F5A623]">`{new Date().getTime() / 1000 | 0}.POST./orders`</span>;</div>
                    <div><span className="text-[#5B9BF5]">const</span> signature = hmacSha256(payload, secretKey);</div>
                    <div>
                      POST <span className="text-white">"https://relay.bayse.markets/v1/orders"</span>
                    </div>
                    <div className="text-[#64748B] pl-4">
                      -H <span className="text-[#00E5A0]">"X-Public-Key: pk_live_***"</span> <br />
                      -H <span className="text-[#00E5A0]">`X-Signature: ${"$"}&#123;signature&#125;`</span> <br />
                      -d <span className="text-[#F5A623]">{`'{"outcomeId":"${activeTrader.avatarText === "SC" ? "btc-yes" : "ars-yes"}", "amount":${currency === "USD" ? copyAmount : copyAmount * 1000}}'`}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Highlights Grid */}
        <section className="w-full max-w-5xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-2">Designed for Conviction</h2>
            <p className="text-[#94A3B8]">Everything you need to copy trades at speed with zero friction.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Feature 1 */}
            <div className="border border-white/5 rounded-xl bg-[#111827]/40 p-6 flex flex-col justify-between transition-all duration-300 hover:border-[#00D4FF]/30 group">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#00D4FF]/10 text-[#00D4FF] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200">
                  <svg className="w-5 h-5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-white">Multi-Currency</h3>
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed mt-2">
                Recalculate rankings and balances instantly between NGN and USD to match native market settlements.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="border border-white/5 rounded-xl bg-[#111827]/40 p-6 flex flex-col justify-between transition-all duration-300 hover:border-[#00D4FF]/30 group">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#00D4FF]/10 text-[#00D4FF] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200">
                  <svg className="w-5 h-5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
                    <path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 004.561 21h14.878a2 2 0 001.94-1.515L22 17" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-white">Ranked Leaderboard</h3>
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed mt-2">
                Evaluate traders by PnL, win rate, or activity. Filter by category to copy managers that align with your strategy.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="border border-white/5 rounded-xl bg-[#111827]/40 p-6 flex flex-col justify-between transition-all duration-300 hover:border-[#00D4FF]/30 group">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#00D4FF]/10 text-[#00D4FF] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200">
                  <svg className="w-5 h-5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-white">Non-Custodial</h3>
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed mt-2">
                Keep ultimate control over your capital. Sign trades locally via secure delegated API keys, without depositing into third party custody.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="border border-white/5 rounded-xl bg-[#111827]/40 p-6 flex flex-col justify-between transition-all duration-300 hover:border-[#00D4FF]/30 group">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#00D4FF]/10 text-[#00D4FF] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200">
                  <svg className="w-5 h-5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-white">Real-Time Sync</h3>
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed mt-2">
                Instant fill execution triggered by leader activities. Automated matching with customizable maximum allocation and slippage limits.
              </p>
            </div>
            
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black/20 py-8 text-center text-xs text-[#64748B]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[#94A3B8]">NOTRADAR</span>
            <span>—</span>
            <span>Your edge on Bayse.</span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://x.com/notradar"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00D4FF] transition-colors"
            >
              Follow on X
            </a>
            <span>•</span>
            <span className="opacity-80">Built on Bayse Markets API</span>
          </div>
          <div>
            © {new Date().getFullYear()} Notradar. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}
