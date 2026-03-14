"use client";

import { UserButton, useAuth, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { ModeToggle } from "@/components/shared/mode-toggle";

export function Navbar() {
  const { isSignedIn } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-10",
        scrolled
          ? "bg-[#0D0F14]/90 backdrop-blur-xl border-b border-white/[0.06] py-3"
          : "bg-transparent py-4"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group transition-transform hover:scale-[1.02] active:scale-95"
        >
          <div className="w-8 h-8 rounded-lg bg-[#00E5A0] flex items-center justify-center font-mono text-sm text-black font-medium shadow-[0_0_16px_rgba(0,229,160,0.3)] group-hover:shadow-[0_0_24px_rgba(0,229,160,0.45)] transition-shadow">
            S
          </div>
          <span className="font-display font-extrabold text-lg tracking-[-0.03em] text-white">
            SCALEINFRA
          </span>
        </Link>

        {/* Center nav links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Features", href: "#features" },
            { label: "How it works", href: "#how-it-works" },
            { label: "Pricing", href: "#pricing" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/40 hover:text-white/80 transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <ModeToggle />

          {!isSignedIn ? (
            <>
              <SignInButton mode="modal">
                <button className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/40 hover:text-white/80 transition-colors px-4 py-2 rounded-md border border-white/[0.07] hover:border-white/20 bg-transparent">
                  Sign In
                </button>
              </SignInButton>
              <SignInButton mode="modal">
                <button className="font-mono text-[10px] uppercase tracking-[0.12em] text-black font-medium px-4 py-2 rounded-md bg-[#00E5A0] hover:bg-[#33EDAF] transition-colors shadow-[0_0_12px_rgba(0,229,160,0.2)] hover:shadow-[0_0_18px_rgba(0,229,160,0.35)]">
                  Launch App →
                </button>
              </SignInButton>
            </>
          ) : (
            <div className="flex items-center gap-6">
              <Link
                href="/dashboard"
                className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#00E5A0] hover:text-[#33EDAF] transition-colors"
              >
                Dashboard
              </Link>
              <div className="p-[3px] rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                <UserButton />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}