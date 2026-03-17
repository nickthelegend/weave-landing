"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Zap, ChevronRight, ArrowRight, Github, MoveDown } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
          <span className="text-2xl font-display font-bold tracking-tighter uppercase italic">Weave</span>
          <div className="w-2 h-2 rounded-full bg-primary mt-2 shadow-[0_0_10px_#ad46ff]" />
        </div>

        <div className="hidden lg:flex items-center gap-10">
          {["Overview", "Features", "Strategies", "Governance", "Roadmap"].map((item) => (
            <a key={item} href="#" className="text-[10px] font-black uppercase tracking-[0.25em] text-white/40 hover:text-white transition-colors">
              {item}
            </a>
          ))}
        </div>

        <button className="bg-primary text-white px-8 py-3 rounded-sm font-black uppercase italic text-[11px] tracking-widest flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(173,70,255,0.3)]">
          Launch App <ArrowRight size={14} />
        </button>
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
    <div className="space-y-1">
      <p className="text-3xl font-mono font-bold italic tracking-tighter tabular-nums">
        {value.startsWith("$") ? "$" : ""}{displayValue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}{value.endsWith("%") ? "%" : ""}
      </p>
      <p className="text-[10px] font-black uppercase tracking-widest text-white/30 italic">{label}</p>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden pt-20">
      <div className="absolute inset-0 hero-glow pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-mono text-primary text-[10px] font-bold uppercase tracking-[0.4em] mb-8"
      >
        Built on Initia · Testnet Live · 2026
      </motion.div>

      <div className="font-display font-black uppercase tracking-tighter leading-[0.85] text-[12vw] md:text-[10vw] mb-12">
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
        className="max-w-[480px] text-secondary-text text-sm md:text-base uppercase tracking-widest leading-relaxed mb-12"
      >
        Weave is the first automated yield vault on Initia. Deposit USDC. Earn 169% APY through daily auto-compounding. Withdraw anytime.
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ delay: 1 }}
        className="flex flex-col sm:flex-row gap-6 mb-20"
      >
        <button className="bg-primary text-white px-12 py-6 rounded-sm font-black uppercase italic text-sm tracking-[0.2em] shadow-[0_0_40px_rgba(173,70,255,0.4)] hover:scale-105 active:scale-95 transition-all">
          Launch App <ArrowRight size={18} className="inline ml-2" />
        </button>
        <button className="border border-white/10 text-white/60 px-12 py-6 rounded-sm font-black uppercase italic text-sm tracking-[0.2em] hover:border-primary/40 hover:text-white transition-all flex items-center justify-center gap-3">
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
  );
};

const Problem = () => {
  return (
    <section className="bg-black min-h-screen flex flex-col justify-center px-10 md:px-20 lg:px-40 py-40 space-y-32">
      <div className="space-y-4">
        <p className="font-mono text-secondary-text text-[10px] font-bold uppercase tracking-[0.4em]">The Problem</p>
        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          className="text-5xl md:text-7xl lg:text-9xl font-display font-black uppercase tracking-tighter leading-none"
        >
          Initia shows <br /> 169% APY.
        </motion.h2>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        className="space-y-12"
      >
        <h2 className="text-5xl md:text-7xl lg:text-9xl font-display font-black uppercase tracking-tighter leading-none text-primary">
          But nobody tells you <br /> what you actually earn.
        </h2>
        <p className="max-w-2xl text-secondary-text text-base md:text-xl uppercase tracking-widest leading-relaxed">
          Most of that yield is vested for 12 months. Your liquid earnings are actually $14/month on a $1,000 deposit. We fixed that.
        </p>
      </motion.div>
    </section>
  );
};

const Comparison = () => {
  const [deposit, setDeposit] = useState(1000);
  
  const withoutWeave = deposit * 2.69;
  const withWeave = deposit * 8.412;
  const difference = withWeave - withoutWeave;

  return (
    <section className="bg-black py-40 px-6">
      <div className="max-w-7xl mx-auto space-y-20">
        <div className="flex flex-col lg:flex-row gap-1 border border-white/5 rounded-sm overflow-hidden min-h-[600px]">
          
          {/* Left: Without */}
          <div className="flex-1 bg-surface p-12 md:p-20 flex flex-col justify-between">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Without Weave</p>
              <h3 className="text-5xl md:text-7xl font-mono font-black italic tracking-tighter tabular-nums">
                ${withoutWeave.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </h3>
              <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
                ${deposit.toLocaleString()} at 169% APR · 1 Year
              </p>
            </div>
            <p className="text-sm font-medium text-white/40 uppercase tracking-widest italic">
              Simple interest. <br /> Rewards sit idle.
            </p>
          </div>

          {/* Center: Gap */}
          <div className="lg:w-1 bg-primary/20" />

          {/* Right: With */}
          <div className="flex-1 bg-primary/5 p-12 md:p-20 flex flex-col justify-between relative group">
            <div className="absolute top-8 right-8 bg-primary text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest italic shadow-[0_0_20px_rgba(173,70,255,0.5)]">
              Recommended
            </div>
            
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-primary">With Weave</p>
              <h3 className="text-5xl md:text-7xl font-mono font-black italic tracking-tighter tabular-nums text-primary text-glow">
                ${withWeave.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </h3>
              <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">
                ${deposit.toLocaleString()} with daily compounding · 1 Year
              </p>
            </div>

            <div className="space-y-8 relative z-10">
              <div className="space-y-1">
                <p className="text-3xl md:text-5xl font-display font-black italic text-white tracking-tighter">
                  +${difference.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </p>
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white italic">More with Weave</p>
              </div>
              <p className="text-sm font-medium text-primary/60 uppercase tracking-widest italic">
                Auto-compounded daily. <br /> Every reward reinvested.
              </p>
            </div>
            
            <Zap className="absolute -bottom-10 -right-10 text-primary opacity-5 group-hover:opacity-10 transition-opacity duration-700" size={300} fill="currentColor" />
          </div>
        </div>

        {/* Slider Controls */}
        <div className="max-w-3xl mx-auto space-y-10">
          <div className="flex justify-between items-end">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 italic">Adjust your deposit</p>
            <p className="text-2xl font-mono font-bold italic text-white tracking-tighter">${deposit.toLocaleString()}</p>
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
            <div className="absolute left-0 -bottom-8 flex justify-between w-full text-[9px] font-bold text-white/20 uppercase">
              <span>$100</span>
              <span>$100,000</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Page ---

export default function LandingPage() {
  return (
    <div className="bg-black text-white min-h-screen selection:bg-primary/30">
      <Navbar />
      <Hero />
      <Problem />
      <Comparison />
      
      {/* Final CTA */}
      <section className="py-40 text-center space-y-12 px-6">
        <h2 className="text-5xl md:text-8xl font-display font-black uppercase italic tracking-tighter leading-none">
          Ready to <br /> maximize?
        </h2>
        <div className="flex justify-center">
          <button className="bg-primary text-white px-16 py-8 rounded-sm font-black uppercase italic text-xl tracking-[0.2em] shadow-[0_0_60px_rgba(173,70,255,0.4)] hover:scale-110 active:scale-95 transition-all">
            Launch Terminal
          </button>
        </div>
        <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em] pt-20">
          Weave Protocol // 2026 // Initia Network
        </p>
      </section>
    </div>
  );
}
