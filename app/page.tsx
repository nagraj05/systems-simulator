"use client";

import { Navbar } from "@/components/shared/navbar";
import { Hero } from "@/components/features/landing/hero";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";
import { SignInButton, useAuth } from "@clerk/nextjs";

function AuthButton({ isSignedIn }: { isSignedIn: boolean | undefined }) {
  if (isSignedIn) {
    return (
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-3 bg-[#00E5A0] text-black font-display font-bold text-sm px-7 py-4 rounded-lg hover:bg-[#33EDAF] transition-all shadow-[0_0_24px_rgba(0,229,160,0.25)] hover:shadow-[0_0_36px_rgba(0,229,160,0.4)] hover:-translate-y-0.5"
      >
        Start Simulating <span className="text-lg">→</span>
      </Link>
    );
  }
  return (
    <SignInButton mode="modal">
      <button className="inline-flex items-center gap-3 bg-[#00E5A0] text-black font-display font-bold text-sm px-7 py-4 rounded-lg hover:bg-[#33EDAF] transition-all shadow-[0_0_24px_rgba(0,229,160,0.25)] hover:shadow-[0_0_36px_rgba(0,229,160,0.4)] hover:-translate-y-0.5">
        Start for Free <span className="text-lg">→</span>
      </button>
    </SignInButton>
  );
}

export default function Home() {
  const { isSignedIn } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-[#0D0F14] text-white selection:bg-[#00E5A0]/20 selection:text-[#00E5A0]">
      <Navbar />

      <main className="flex-grow">
        {/* ─── HERO ─── */}
        <section className="relative pt-40 pb-24 px-10 overflow-hidden border-b border-white/[0.06]">
          {/* Grid background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              maskImage:
                "radial-gradient(ellipse 80% 60% at 50% 100%, transparent 30%, black 100%)",
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto">
            {/* Live badge */}
            <div className="inline-flex items-center gap-2 bg-[#00E5A0]/10 border border-[#00E5A0]/20 rounded px-3 py-1.5 mb-8 font-mono text-[10px] text-[#00E5A0] tracking-[0.08em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E5A0] animate-pulse" />
              v2.1 — Multi-region simulation now live
            </div>

            <h1 className="font-display font-extrabold text-[clamp(40px,6vw,72px)] leading-[1.05] tracking-[-0.04em] max-w-[720px] mb-6 text-white">
              Design systems that{" "}
              <em className="not-italic text-[#00E5A0]">don&apos;t fail</em>{" "}
              under pressure.
            </h1>
            <p className="text-white/50 text-lg font-medium leading-relaxed max-w-[520px] mb-10">
              A high-fidelity infrastructure simulator for engineers who need to
              validate architecture before it hits production.
            </p>

            <div className="flex items-center gap-4 mb-14">
              <AuthButton isSignedIn={isSignedIn} />
              <button className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-white/40 hover:text-white/70 border border-white/[0.07] hover:border-white/20 px-5 py-4 rounded-lg transition-all">
                ▶ Watch demo (2 min)
              </button>
            </div>

            {/* Stats bar */}
            <div className="flex items-center gap-10 pt-8 border-t border-white/[0.06]">
              {[
                { num: "12k+", label: "Simulations run" },
                { num: "<50ms", label: "Real-time latency" },
                { num: "99.9%", label: "Uptime SLA" },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-10">
                  <div>
                    <div className="font-display font-extrabold text-2xl tracking-[-0.03em] text-white">
                      {stat.num}
                    </div>
                    <div className="font-mono text-[10px] text-white/30 tracking-[0.1em] uppercase mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                  {i < 2 && <div className="w-px h-8 bg-white/[0.06]" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FEATURES ─── */}
        <section id="how-it-works" className="py-24 px-10 border-b border-white/[0.06] bg-[#0D0F14]">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-4 font-mono text-[10px] text-[#00E5A0] tracking-[0.18em] uppercase">
              <span className="w-5 h-px bg-[#00E5A0]" />
              Capabilities
            </div>
            <h2 className="font-display font-extrabold text-[clamp(28px,4vw,44px)] tracking-[-0.03em] text-white mb-3">
              The engineer&apos;s sandbox.
            </h2>
            <p className="text-white/40 text-base font-medium leading-relaxed max-w-md mb-12">
              Everything you need to design, simulate, and harden complex
              distributed systems — before they go live.
            </p>

            {/* Feature grid */}
            <div className="grid md:grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06] rounded-xl overflow-hidden">
              {[
                {
                  icon: "⚡",
                  iconBg: "bg-blue-500/10",
                  iconColor: "text-blue-400",
                  title: "Ultra-Fast Design",
                  desc: "Drag-and-drop interface with snap-to-grid, smart connectors, and instant topology validation.",
                  tag: "drag-and-drop",
                },
                {
                  icon: "◈",
                  iconBg: "bg-[#00E5A0]/10",
                  iconColor: "text-[#00E5A0]",
                  title: "Deep Simulation",
                  desc: "Watch real-time data packets traverse nodes. Identify bottlenecks with precision telemetry.",
                  tag: "real-time",
                },
                {
                  icon: "⬡",
                  iconBg: "bg-amber-500/10",
                  iconColor: "text-amber-400",
                  title: "Fail-Safe Analysis",
                  desc: "Inject latency, trigger node failures, and stress-test your system's resilience at any scale.",
                  tag: "chaos-engineering",
                },
              ].map((feat, i) => (
                <div
                  key={i}
                  className="bg-[#13161C] hover:bg-[#1A1E27] transition-colors duration-200 p-8 group"
                >
                  <div
                    className={`w-10 h-10 rounded-lg ${feat.iconBg} flex items-center justify-center text-lg ${feat.iconColor} mb-5 group-hover:scale-110 transition-transform`}
                  >
                    {feat.icon}
                  </div>
                  <h3 className="font-display font-bold text-[17px] tracking-[-0.02em] text-white mb-2.5">
                    {feat.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed font-medium mb-5">
                    {feat.desc}
                  </p>
                  <span className="font-mono text-[10px] text-white/20 border border-white/[0.07] px-2 py-1 rounded-sm tracking-[0.08em]">
                    {feat.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PRICING ─── */}
        <section id="pricing" className="py-24 px-10 bg-[#0D0F14] border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-4 font-mono text-[10px] text-[#00E5A0] tracking-[0.18em] uppercase">
              <span className="w-5 h-px bg-[#00E5A0]" />
              Pricing
            </div>
            <h2 className="font-display font-extrabold text-[clamp(28px,4vw,44px)] tracking-[-0.03em] text-white mb-3">
              Scale your curiosity.
            </h2>
            <p className="text-white/40 text-base font-medium max-w-sm mb-12">
              Choose the workspace that fits your engineering workflow.
            </p>

            <div className="grid md:grid-cols-2 gap-4 max-w-3xl">
              {/* Starter */}
              <div className="bg-[#13161C] border border-white/[0.07] rounded-xl p-8 hover:border-white/[0.12] transition-colors">
                <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/30 mb-5">
                  Starter
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-display font-extrabold text-5xl tracking-[-0.04em] text-white">
                    $0
                  </span>
                  <span className="font-mono text-[11px] text-white/30 tracking-[0.05em]">
                    / forever
                  </span>
                </div>
                <p className="text-white/40 text-sm mb-6 font-medium leading-relaxed">
                  For individual engineers learning the craft.
                </p>
                <div className="border-t border-white/[0.06] pt-5 mb-6 space-y-3">
                  {[
                    "3 Active Simulations",
                    "Standard Component Library",
                    "Real-time Flow Analysis",
                    "Community Access",
                  ].map((f) => (
                    <div key={f} className="flex items-center gap-3 text-white/50 text-sm font-medium">
                      <Check className="w-4 h-4 text-[#00E5A0] flex-shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
                <button className="w-full font-mono text-[10px] uppercase tracking-[0.1em] text-white/30 border border-white/[0.07] hover:border-white/20 hover:text-white/60 py-3 rounded-lg transition-all">
                  Current Plan
                </button>
              </div>

              {/* Architect */}
              <div className="relative bg-[#13161C] border border-[#00E5A0]/25 rounded-xl p-8 hover:border-[#00E5A0]/40 transition-colors"
                style={{ background: "linear-gradient(135deg, rgba(0,229,160,0.04) 0%, #13161C 60%)" }}>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/30">
                    Architect
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-[#00E5A0] bg-[#00E5A0]/10 border border-[#00E5A0]/20 px-2 py-1 rounded-sm">
                    Popular
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-display font-extrabold text-5xl tracking-[-0.04em] text-white">
                    $19
                  </span>
                  <span className="font-mono text-[11px] text-white/30 tracking-[0.05em]">
                    / month
                  </span>
                </div>
                <p className="text-white/40 text-sm mb-6 font-medium leading-relaxed">
                  For serious system designers who need unlimited depth.
                </p>
                <div className="border-t border-white/[0.06] pt-5 mb-6 space-y-3">
                  {[
                    "Unlimited Simulations",
                    "Advanced Performance Profiling",
                    "Multi-Region Latency Simulation",
                    "Export to Mermaid & Terraform",
                    "Priority Feature Access",
                  ].map((f) => (
                    <div key={f} className="flex items-center gap-3 text-white/70 text-sm font-medium">
                      <Check className="w-4 h-4 text-[#00E5A0] flex-shrink-0 drop-shadow-[0_0_6px_rgba(0,229,160,0.5)]" />
                      {f}
                    </div>
                  ))}
                </div>
                <button
                  disabled
                  className="w-full font-mono text-[10px] uppercase tracking-[0.1em] text-black font-medium bg-[#00E5A0] py-3 rounded-lg opacity-60 cursor-not-allowed"
                >
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="py-24 px-10 bg-[#13161C] text-center">
          <h2 className="font-display font-extrabold text-[clamp(32px,5vw,56px)] tracking-[-0.04em] text-white mb-4">
            Ready to simulate{" "}
            <span className="text-[#00E5A0]">the future?</span>
          </h2>
          <p className="text-white/40 text-base font-medium mb-10">
            Join thousands of engineers stress-testing their systems before launch.
          </p>
          <div className="flex items-center justify-center gap-4">
            <AuthButton isSignedIn={isSignedIn} />
            <button className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-white/40 hover:text-white/70 border border-white/[0.07] hover:border-white/20 px-5 py-4 rounded-lg transition-all">
              Read the docs
            </button>
          </div>
        </section>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="py-6 px-10 border-t border-white/[0.06] bg-[#0D0F14] flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-2.5 font-display font-bold text-sm tracking-[-0.01em] text-white/40">
          <div className="w-6 h-6 rounded-md bg-[#13161C] border border-white/[0.07] flex items-center justify-center font-mono text-[11px] text-[#00E5A0]">
            S
          </div>
          SCALEINFRA
        </div>
        <p className="font-mono text-[10px] text-white/20 tracking-[0.05em]">
          © {new Date().getFullYear()} SCALEINFRA. Built for system architects.
        </p>
        <div className="flex items-center gap-6">
          {["Privacy", "Terms", "Security"].map((link) => (
            <Link
              key={link}
              href="#"
              className="font-mono text-[10px] uppercase tracking-[0.1em] text-white/20 hover:text-white/50 transition-colors"
            >
              {link}
            </Link>
          ))}
        </div>
      </footer>
    </div>
  );
}