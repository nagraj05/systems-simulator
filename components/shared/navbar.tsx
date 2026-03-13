"use client";

import Link from "next/link";
import { useAuth, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export function Navbar() {
  const { isSignedIn } = useAuth();

  return (
    <nav className="fixed top-0 w-full z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold tracking-tighter flex items-center gap-2 text-primary">
            <span className="w-6 h-6 rounded bg-primary text-primary-foreground flex items-center justify-center font-mono">S</span>
            SYS-SIM
          </Link>
          <div className="hidden md:flex gap-4">
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">How it works</Link>
            <Link href="#docs" className="text-sm font-medium hover:text-primary transition-colors">Docs</Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">Pricing</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {isSignedIn ? (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <UserButton />
            </>
          ) : (
            <div className="flex items-center gap-2">
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm">Sign In</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button size="sm">Get Started</Button>
              </SignUpButton>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
