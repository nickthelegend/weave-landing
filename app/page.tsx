"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useInView, AnimatePresence } from "framer-motion";
import {
  Zap,
  ChevronRight,
  ArrowRight,
  Github,
  MoveDown,
  Globe,
  Lock,
  ShieldCheck,
  TrendingUp,
  History,
  Terminal,
  Code,
  CheckCircle2,
  Database,
  Mail,
  CircleDollarSign,
  Layers,
  BarChart3,
  Activity
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Framer Motion Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as any } }
};

// --- Components ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-6 border-b border-transparent",
      scrolled ? "glass-nav py-4" : "py-8"
    )}>
      <div className="max-w-7xl mx-auto px-10 flex items-center justify-between">
        <div className="flex items-center gap-1 group cursor-pointer">
          <span className="text-2xl font-display font-bold tracking-tight">Weave</span>
          <div className="w-2 h-2 rounded-full bg-primary mt-2 shadow-[0_0_10px_#ad46ff]" />
        </div>

        <div className="hidden lg:flex items-center gap-10">
          {["Overview", "Features", "Strategies", "Governance", "Roadmap"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-semibold tracking-wide text-white/40 hover:text-white transition-colors">
              {item}
            </a>
          ))}
        </div>

        <a
          href="http://localhost:3000"
          className="bg-primary text-white px-8 py-3 rounded-full font-semibold text-[13px] tracking-normal flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(173,70,255,0.3)]"
        >
          Launch App <ArrowRight size={14} />
        </a>
      </div>
    </nav>
  );
};

const StatItem = ({ label, value }: { label: string, value: string }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = numericValue / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= numericValue) {
        setDisplayValue(numericValue);
        clearInterval(timer);
      } else {
        setDisplayValue(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [numericValue]);

  return (
    <div className="space-y-1 text-center">
      <p className="text-3xl font-mono font-bold tracking-tight tabular-nums">
        {value.startsWith("$") ? "$" : ""}{displayValue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}{value.endsWith("%") ? "%" : ""}
      </p>
      <p className="text-[12px] font-semibold text-white/80">{label}</p>
    </div>
  );
};

const TypewriterLog = () => {
  const logs = [
    "[2026-03-17 00:00:01] Harvest started",
    "[2026-03-17 00:00:03] Yield: $47.23",
    "[2026-03-17 00:00:05] Reinvested ✓",
    "[2026-03-17 00:00:05] Price/share: $1.0047"
  ];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === logs[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2000);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % logs.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 20 : 50, Math.random() * 100));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  return (
    <div className="font-mono text-[10px] md:text-xs text-white/80 h-12 flex items-center bg-black p-4 rounded border border-white/5">
      <span className="text-primary mr-2">{`>>>`}</span>
      {logs[index].substring(0, subIndex)}
      <span className="w-2 h-4 bg-primary ml-1 animate-pulse" />
    </div>
  );
};

const SectionWrapper = ({ children, id = "", className = "" }: { children: React.ReactNode, id?: string, className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      className={`py-32 px-6 md:px-20 ${className}`}
    >
      {children}
    </motion.section>
  );
};

// --- Page ---

export default function LandingPage() {
  const [deposit, setDeposit] = useState(1000);

  const withoutWeave = deposit * 2.69;
  const withWeave = deposit * 8.412;
  const difference = withWeave - withoutWeave;

  return (
    <div className="bg-black text-white min-h-screen selection:bg-primary/30 font-sans grid-texture">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden pt-20">
        <div className="absolute inset-0 hero-glow pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-primary text-[10px] font-bold tracking-wide mb-8"
        >
          Built on Initia · Testnet Live · 2026
        </motion.div>

        <div className="font-display font-semibold tracking-tight leading-[0.85] text-[12vw] md:text-[10vw] mb-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            Your yield.
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-primary text-glow">
            Automated.
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            Forever.
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="max-w-[480px] text-secondary-text text-sm md:text-base text-[#86868b] leading-relaxed mb-12"
        >
          Weave is the first automated yield vault on Initia. Deposit USDC. Earn 169% APY through daily auto-compounding. Withdraw anytime.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row gap-6 mb-20"
        >
          <a
            href="http://localhost:3000"
            className="bg-primary text-white px-10 py-4 rounded-full font-semibold text-[15px] tracking-normal shadow-[0_0_40px_rgba(173,70,255,0.4)] hover:scale-105 active:scale-95 transition-all"
          >
            Launch App <ArrowRight size={18} className="inline ml-2" />
          </a>
          <button className="bg-[#1c1c1e] text-white hover:bg-[#2c2c2e] px-8 py-4 rounded-full font-semibold text-[15px] transition-all flex items-center justify-center gap-3">
            <Github size={20} /> View on GitHub
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="grid grid-cols-3 gap-16 md:gap-24 border-t border-white/5 pt-12"
        >
          <StatItem label="Aggregated APY" value="169%" />
          <StatItem label="TVL (Live)" value="$0" />
          <StatItem label="Daily Harvest" value="True" />
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10"
        >
          <MoveDown className="text-white/20" size={24} />
        </motion.div>
      </section>

      {/* Problem */}
      <SectionWrapper className="bg-black min-h-screen flex flex-col justify-center">
        <div className="space-y-4 mb-32">
          <p className="font-mono text-secondary-text text-[10px] font-bold tracking-wide">The Problem</p>
          <h2 className="text-5xl md:text-7xl lg:text-9xl font-display font-semibold tracking-tight leading-none">
            Initia shows <br /> 169% APY.
          </h2>
        </div>

        <div className="space-y-12">
          <h2 className="text-5xl md:text-7xl lg:text-9xl font-display font-semibold tracking-tight leading-none text-primary">
            But nobody tells you <br /> what you actually earn.
          </h2>
          <p className="max-w-2xl text-secondary-text text-base md:text-xl text-[#86868b] leading-relaxed">
            Most of that yield is vested for 12 months. Your liquid earnings are actually $14/month on a $1,000 deposit. We fixed that.
          </p>
        </div>
      </SectionWrapper>

      {/* Numbers / Comparison */}
      <SectionWrapper id="features" className="bg-black">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="flex flex-col lg:flex-row gap-1 border border-white/5 rounded-[32px] overflow-hidden min-h-[600px]">

            {/* Left: Without */}
            <div className="flex-1 bg-surface p-12 md:p-20 flex flex-col justify-between">
              <div className="space-y-2">
                <p className="text-[10px] font-semibold text-[#86868b]">Without Weave</p>
                <h3 className="text-5xl md:text-7xl font-mono font-semibold tracking-tight tabular-nums">
                  ${withoutWeave.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </h3>
                <p className="text-[10px] font-bold text-white/20 text-[#86868b]">
                  ${deposit.toLocaleString()} at 169% APR · 1 Year
                </p>
              </div>
              <p className="text-sm font-medium text-[#86868b]">
                Simple interest. <br /> Rewards sit idle.
              </p>
            </div>

            {/* Center: Gap */}
            <div className="lg:w-1 bg-primary/20" />

            {/* Right: With */}
            <div className="flex-1 bg-primary/5 p-12 md:p-20 flex flex-col justify-between relative group">
              <div className="absolute top-8 right-8 bg-primary text-white text-[11px] font-semibold px-3 py-1 rounded-full tracking-normal shadow-[0_0_20px_rgba(173,70,255,0.5)]">
                Recommended
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-semibold text-[#86868b] text-primary">With Weave</p>
                <h3 className="text-5xl md:text-7xl font-mono font-semibold tracking-tight tabular-nums text-primary text-glow">
                  ${withWeave.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </h3>
                <p className="text-[10px] font-bold text-primary/40 text-[#86868b]">
                  ${deposit.toLocaleString()} with daily compounding · 1 Year
                </p>
              </div>

              <div className="space-y-8 relative z-10">
                <div className="space-y-1">
                  <p className="text-3xl md:text-5xl font-display font-semibold text-white tracking-tight">
                    +${difference.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </p>
                  <p className="text-[11px] font-semibold tracking-wide text-white">More with Weave</p>
                </div>
                <p className="text-sm font-medium text-primary/60 text-[#86868b]">
                  Auto-compounded daily. <br /> Every reward reinvested.
                </p>
              </div>

              <Zap className="absolute -bottom-10 -right-10 text-primary opacity-5 group-hover:opacity-10 transition-opacity duration-700" size={300} fill="currentColor" />
            </div>
          </div>

          {/* Slider Controls */}
          <div className="max-w-3xl mx-auto space-y-10">
            <div className="flex justify-between items-end">
              <p className="text-[10px] font-semibold tracking-wide text-white/40">Adjust your deposit</p>
              <p className="text-2xl font-mono font-bold text-white tracking-tight tabular-nums">${deposit.toLocaleString()}</p>
            </div>
            <div className="relative flex items-center">
              <input
                type="range"
                min="100"
                max="100000"
                step="100"
                value={deposit}
                onChange={(e) => setDeposit(parseInt(e.target.value))}
                className="w-full appearance-none bg-white/10 h-1 rounded-full outline-none accent-primary cursor-pointer"
              />
              <div className="absolute left-0 -bottom-8 flex justify-between w-full text-[9px] font-bold text-white/20 tracking-tight">
                <span>$100</span>
                <span>$100,000</span>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* How It Works */}
      <SectionWrapper className="max-w-7xl mx-auto space-y-40">
        {/* Step 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div variants={fadeInUp} className="order-2 lg:order-1">
            <div className="terminal-card bg-surface p-8 relative group overflow-hidden border-primary/10">
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] font-semibold text-[#86868b]">Active Connection</span>
                </div>
                <span className="text-[10px] font-mono text-primary">0x42...ef21</span>
              </div>
              <div className="space-y-6">
                <div className="bg-black border border-white/10 p-6 rounded-[32px]">
                  <p className="text-[9px] font-semibold text-white/20 mb-2">Deposit mUSDC</p>
                  <p className="text-4xl font-mono font-bold tabular-nums">10,000.00</p>
                </div>
                <button className="w-full bg-primary text-white py-5 rounded-full font-semibold text-[15px] hover:bg-primary/90 transition-all shadow-[0_0_30px_rgba(173,70,255,0.2)]">
                  Execute Deposit
                </button>
              </div>
            </div>
          </motion.div>
          <div className="space-y-6 order-1 lg:order-2">
            <p className="font-mono text-primary text-[10px] font-bold tracking-wide">Step 01</p>
            <h2 className="text-5xl md:text-7xl font-display font-semibold leading-none">Deposit once.</h2>
            <p className="text-secondary-text text-base md:text-lg text-[#86868b] leading-relaxed max-w-md">
              Single token entry. No need to split your tokens manually. Weave's Zap-In contract handles everything. One click. Done.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-6">
            <p className="font-mono text-primary text-[10px] font-bold tracking-wide">Step 02</p>
            <h2 className="text-5xl md:text-7xl font-display font-semibold leading-none text-primary">Compounds <br /> daily.</h2>
            <p className="text-secondary-text text-base md:text-lg text-[#86868b] leading-relaxed max-w-md">
              Our keeper bot harvests your VIP emissions and swap fees daily. Every reward is automatically reinvested. While you sleep.
            </p>
          </div>
          <motion.div variants={fadeInUp}>
            <div className="terminal-card bg-surface p-10 border-primary/10 space-y-8">
              <div className="flex items-center gap-3 text-white/40 mb-4">
                <Terminal size={18} />
                <span className="text-[10px] font-semibold text-[#86868b]">Protocol Harvest Log</span>
              </div>
              <TypewriterLog />
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/40 p-4 border border-white/5 rounded-[32px]">
                  <p className="text-[8px] font-semibold text-white/20 mb-1">Last Recompound</p>
                  <p className="text-sm font-mono text-white/80 font-bold">Today, 00:05</p>
                </div>
                <div className="bg-black/40 p-4 border border-white/5 rounded-[32px]">
                  <p className="text-[8px] font-semibold text-white/20 mb-1">Efficiency</p>
                  <p className="text-sm font-mono text-primary font-bold  tabular-nums">99.8%</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Step 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div variants={fadeInUp} className="order-2 lg:order-1">
            <div className="terminal-card bg-primary text-white p-12 border-none shadow-[0_0_50px_rgba(173,70,255,0.2)]">
              <div className="space-y-12">
                <div className="space-y-2">
                  <p className="text-[12px] font-semibold text-white/80">Current Position</p>
                  <h4 className="text-6xl font-mono font-semibold tracking-tight tabular-nums text-white">$1,284.73</h4>
                  <div className="flex items-center gap-2 text-white font-bold text-[12px]">
                    <TrendingUp size={14} className="animate-bounce" />
                    + $284.73 Yield Earned
                  </div>
                </div>
                <button className="w-full bg-black text-white py-5 rounded-full font-semibold text-[14px] hover:bg-white/20 transition-all">
                  Withdraw Principal + Yield
                </button>
              </div>
            </div>
          </motion.div>
          <div className="space-y-6 order-1 lg:order-2">
            <p className="font-mono text-primary text-[10px] font-bold tracking-wide">Step 03</p>
            <h2 className="text-5xl md:text-7xl font-display font-semibold leading-none">Withdraw whenever.</h2>
            <p className="text-secondary-text text-base md:text-lg text-[#86868b] leading-relaxed max-w-md">
              No lockups. No penalties. Your position grows every day. Withdraw your original deposit plus everything Weave earned you.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* Strategies */}
      <SectionWrapper id="strategies" className="bg-black">
        <div className="max-w-7xl mx-auto space-y-16 text-center">
          <div className="space-y-4">
            <p className="font-mono text-secondary-text text-[10px] font-bold tracking-wide">Yield Sources</p>
            <h2 className="text-5xl md:text-8xl font-display font-semibold leading-none">Two strategies. <br /> One vault.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {[
              {
                name: "Initia DEX",
                sub: "USDC-INIT Weighted Pool",
                stats: [
                  { l: "Fee APR", v: "0.62%" },
                  { l: "Emission APR", v: "168.98%" },
                  { l: "Total APR", v: "169.60%", p: true }
                ],
                risk: "Medium"
              },
              {
                name: "Echelon Finance",
                sub: "USDC Money Market",
                stats: [
                  { l: "Lending APR", v: "~8.00%" },
                  { l: "Stability", v: "High" },
                  { l: "Total APR", v: "8.00%", p: true }
                ],
                risk: "Low"
              }
            ].map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="terminal-card bg-surface p-10 border-t-4 border-t-primary"
              >
                <div className="flex justify-between items-start mb-10">
                  <div className="space-y-1">
                    <h3 className="text-3xl font-semibold">{s.name}</h3>
                    <p className="text-[10px] font-bold text-[#86868b]">{s.sub}</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-[#0B7B5E]/10 border border-[#0B7B5E]/20 rounded-full">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0B7B5E] animate-pulse" />
                    <span className="text-[8px] font-semibold text-[#0B7B5E] text-[#86868b]">Active</span>
                  </div>
                </div>
                <div className="space-y-6">
                  {s.stats.map((st, j) => (
                    <div key={j} className="flex justify-between items-end border-b border-white/5 pb-2">
                      <p className="text-[10px] font-semibold text-white/20">{st.l}</p>
                      <p className={`text-xl font-mono font-bold tracking-tight ${st.p ? "text-primary text-glow" : "text-white/80"}`}>{st.v}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={14} className="text-white/20" />
                    <span className="text-[10px] font-semibold text-white/20 text-[#86868b]">{s.risk} Risk</span>
                  </div>
                  <ChevronRight className="text-primary" size={20} />
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-[10px] font-semibold text-white/20 tracking-wide pt-8">
            More strategies coming in V3 → Blackwing · Tucana · More Minitias
          </p>
        </div>
      </SectionWrapper>

      {/* Governance */}
      <SectionWrapper id="governance">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <div className="space-y-10 text-center lg:text-left">
            <h2 className="text-7xl md:text-9xl font-display font-semibold leading-[0.85] tracking-tight">No hidden <br /> fees.</h2>
            <p className="text-secondary-text text-lg md:text-xl text-[#86868b] leading-relaxed max-w-md mx-auto lg:mx-0">
              10% of yield goes to WEAVE token stakers. That's it. Everything else is yours.
            </p>
          </div>
          <div className="flex flex-col items-center gap-12">
            <div
              className="w-80 h-80 rounded-full relative shadow-[0_0_100px_rgba(173,70,255,0.1)] transition-transform duration-700 hover:rotate-12"
              style={{
                background: `conic-gradient(#ad46ff 0% 40%, #6b21a8 40% 60%, #374151 60% 80%, #7c3aed 80% 90%, rgba(255,255,255,0.1) 90% 100%)`
              }}
            >
              <div className="absolute inset-10 bg-black rounded-full flex flex-col items-center justify-center text-center p-6 border border-white/5">
                <p className="text-[10px] font-semibold text-[#86868b] mb-1">Genesis Distribution</p>
                <p className="text-4xl font-display font-semibold text-white tracking-tight leading-none">100M</p>
                <p className="text-[10px] font-bold text-primary mt-1 text-[#86868b]">WEAVE</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-12 gap-y-6 text-[10px] font-semibold text-[#86868b]">
              <div className="flex items-center gap-3"><div className="w-2 h-2 bg-[#ad46ff] rounded-full" /> LP Rewards (40%)</div>
              <div className="flex items-center gap-3"><div className="w-2 h-2 bg-[#6b21a8] rounded-full" /> Team (20%)</div>
              <div className="flex items-center gap-3"><div className="w-2 h-2 bg-[#374151] rounded-full" /> Treasury (20%)</div>
              <div className="flex items-center gap-3"><div className="w-2 h-2 bg-[#7c3aed] rounded-full" /> Airdrop (10%)</div>
            </div>
            <div className="w-full max-w-sm pt-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Email for priority access..."
                  className="flex-grow bg-white/5 border border-white/10 rounded-[32px] p-4 text-xs outline-none focus:border-primary/40 transition-all placeholder:text-white/10"
                />
                <button className="bg-primary text-white px-8 py-4 rounded-full font-semibold text-[15px]">Join</button>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Roadmap */}
      <SectionWrapper id="roadmap" className="bg-black">
        <div className="max-w-7xl mx-auto space-y-16">
          <h2 className="text-5xl font-display font-semibold text-center tracking-tight">What we're building.</h2>
          <div className="flex overflow-x-auto no-scrollbar pb-10 gap-8 lg:justify-between min-w-full">
            {[
              { v: "V1", t: "NOW", title: "Automated Vault", desc: "WeaveVault live on testnet · Auto-compounding · Zap-In · Open source", active: true },
              { v: "V2", t: "Q3 2026", title: "Governance", desc: "WEAVE token launch · veWEAVE staking · Gauge voting · Fee sharing", active: false },
              { v: "V3", t: "Q4 2026", title: "Expansion", desc: "Blackwing vault · Tucana vault · IBC routing · WEAVE on Osmosis", active: false },
              { v: "V4", t: "2027", title: "Cross-Chain", desc: "Ethereum bridge · $50M TVL target · CEX listings · Real yield layer", active: false },
            ].map((p, i) => (
              <div key={i} className={`flex-shrink-0 w-72 space-y-6 ${p.active ? "opacity-100" : "opacity-30"}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-4 h-4 rounded-full ${p.active ? "bg-primary shadow-[0_0_15px_#ad46ff] scale-125" : "bg-white/20"}`} />
                  <div className="h-[1px] flex-grow bg-white/10" />
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-semibold text-primary text-[#86868b]">{p.v} // {p.t}</p>
                    <h4 className="text-xl font-semibold mt-1">{p.title}</h4>
                  </div>
                  <p className="text-[10px] font-medium text-white/60 leading-relaxed text-[#86868b]">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Final CTA */}
      <SectionWrapper className="text-center space-y-12">
        <h2 className="text-7xl md:text-9xl font-display font-semibold  tracking-tight leading-none text-glow">Start earning. <br /> Right now.</h2>
        <p className="max-w-md mx-auto text-secondary-text text-sm text-[#86868b] leading-relaxed">Weave is live on Initia testnet. Get test tokens and try it in 60 seconds.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-8 pt-10">
          <a
            href="http://localhost:3000"
            className="bg-primary text-white px-12 py-5 rounded-full font-semibold text-[17px] tracking-normal shadow-[0_0_60px_rgba(173,70,255,0.4)] hover:scale-110 active:scale-95 transition-all"
          >
            Launch Terminal →
          </a>
          <button className="bg-[#1c1c1e] text-white hover:bg-[#2c2c2e] px-10 py-4 rounded-full font-semibold text-[17px] transition-all">
            Get tokens
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-12 pt-24 opacity-30 text-[10px] font-semibold text-[#86868b]">
          <span className="flex items-center gap-2"><Lock size={12} /> Non-custodial</span>
          <span className="flex items-center gap-2"><Code size={12} /> Open source</span>
          <span className="flex items-center gap-2"><CheckCircle2 size={12} /> 7/7 Tests Passed</span>
          <span className="flex items-center gap-2"><Database size={12} /> Built on Initia</span>
        </div>
      </SectionWrapper>

      <footer className="border-t border-white/5 bg-black p-20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-16">
          <div className="space-y-6">
            <div className="flex items-center gap-1 group cursor-pointer">
              <span className="text-xl font-display font-bold tracking-tight">Weave</span>
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1 shadow-[0_0_10px_#ad46ff]" />
            </div>
            <p className="text-[9px] font-medium text-white/20 leading-relaxed text-[#86868b] max-w-[200px]">
              Aggregating institutional liquidity across the Initia ecosystem.
            </p>
          </div>
          <div className="space-y-6">
            <p className="text-[10px] font-semibold text-[#86868b]">Protocol</p>
            <div className="flex flex-col gap-4 text-[9px] font-bold text-white/20 text-[#86868b]">
              <a href="#" className="hover:text-primary transition-colors">Overview</a>
              <a href="#" className="hover:text-primary transition-colors">Vaults</a>
              <a href="#" className="hover:text-primary transition-colors">Strategies</a>
            </div>
          </div>
          <div className="space-y-6">
            <p className="text-[10px] font-semibold text-[#86868b]">Governance</p>
            <div className="flex flex-col gap-4 text-[9px] font-bold text-white/20 text-[#86868b]">
              <a href="#" className="hover:text-primary transition-colors">WEAVE Token</a>
              <a href="#" className="hover:text-primary transition-colors">veWEAVE Staking</a>
              <a href="#" className="hover:text-primary transition-colors">Gauges</a>
            </div>
          </div>
          <div className="space-y-6 text-right">
            <p className="text-[10px] font-semibold text-[#86868b]">&copy; 2026</p>
            <p className="text-[9px] font-bold text-white/10 tracking-wide">Initia Network</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
