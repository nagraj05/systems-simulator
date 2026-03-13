"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Terminal, Cpu, Database } from "lucide-react";
import { SignInButton, useAuth } from "@clerk/nextjs";

function AuthButton({ isSignedIn }: { isSignedIn: boolean | undefined }) {
  if (isSignedIn) {
    return (
      <Button asChild size="lg" className="h-12 px-8">
        <Link href="/dashboard" className="flex items-center gap-2">
          Start Designing <ArrowRight className="w-4 h-4" />
        </Link>
      </Button>
    )
  }
  return (
    <SignInButton mode="modal">
      <Button size="lg" className="h-12 px-8 flex items-center gap-2">
        Start Designing <ArrowRight className="w-4 h-4" />
      </Button>
    </SignInButton>
  )
}

export function Hero() {
  const { isSignedIn } = useAuth();
  return (
    <section className="relative pt-24 pb-12 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      
      <div className="container mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border bg-muted/50 px-3 py-1 text-xs font-medium mb-6 animate-in fade-in slide-in-from-bottom-3 duration-1000">
          <span className="bg-primary/20 text-primary px-1.5 py-0.5 rounded">NEW</span>
          <span>Interactive Visual Simulator is live!</span>
        </div>
        
        <h1 className="text-4xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">
          Design Distributed Systems <br className="hidden md:block" /> with Confidence
        </h1>
        
        <p className="max-w-[700px] mx-auto text-muted-foreground text-lg md:text-xl mb-10 text-pretty">
          An interactive simulator for architects and developers. Drag, drop, and visualize data flow through clients, servers, and databases.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <AuthButton isSignedIn={isSignedIn} />
          <Button variant="outline" size="lg" className="h-12 px-8">
            <Link href="#how-it-works">How it works</Link>
          </Button>
        </div>
        
        {/* Floating Icons Representation */}
        <div className="relative mt-20 max-w-5xl mx-auto border rounded-xl bg-card p-4 shadow-2xl overflow-hidden aspect-video flex items-center justify-center gap-8 md:gap-16 grayscale opacity-50 dark:grayscale-0 dark:opacity-100 transition-all">
           <div className="flex flex-col items-center gap-2">
             <Terminal className="w-12 h-12 text-blue-500" />
             <span className="text-xs font-mono uppercase tracking-widest">Client</span>
           </div>
           <div className="w-12 h-[2px] bg-primary/20 relative hidden md:block">
              <div className="absolute top-1/2 left-0 w-2 h-2 bg-primary rounded-full -translate-y-1/2 animate-ping"></div>
           </div>
           <div className="flex flex-col items-center gap-2">
             <Cpu className="w-12 h-12 text-primary" />
             <span className="text-xs font-mono uppercase tracking-widest text-primary">API Gateway</span>
           </div>
           <div className="w-12 h-[2px] bg-primary/20 relative hidden md:block"></div>
           <div className="flex flex-col items-center gap-2">
             <Database className="w-12 h-12 text-green-500" />
             <span className="text-xs font-mono uppercase tracking-widest">Database</span>
           </div>
        </div>
      </div>
    </section>
  );
}
