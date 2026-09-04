"use client";

import { useState } from "react";
import Link from "next/link";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import { BookOpen, House, Info, LogIn, Menu, Route, X } from "lucide-react";
import DiyaFlame from "./DiyaFlame";

const links = [
  { label: "Home", href: "#home", icon: House },
  { label: "About", href: "#about", icon: Info },
  { label: "Process", href: "#journey-process", icon: Route },

];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#292524] bg-[#0C0A09]/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-3" aria-label="Pravaah home">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#292524] bg-[#1C1917]">
            <DiyaFlame size="sm" showBase={false} showHalo={false} />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl font-semibold tracking-tight text-[#FAFAF9]">
              Pravaah
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#A8A29E]">
              Soul Maps
            </span>
          </div>
        </a>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="flex items-center gap-1.5 text-sm font-medium text-[#A8A29E] transition-colors hover:text-[#FAFAF9]"
            >
              <link.icon className="h-4 w-4 text-[#F97316]" aria-hidden="true" />
              {link.label}
            </a>
          ))}
        </nav>

        {/* Authentication controls */}
        <div className="flex items-center gap-2">
          <Show when="signed-out">
            <SignInButton mode="modal" fallbackRedirectUrl="/home">
              <button
                type="button"
                className="flex items-center gap-2 rounded-full bg-[#F97316] px-4 py-2 text-sm font-medium text-[#1C1917] transition-colors hover:bg-[#FB923C] sm:px-8"
              >
                <LogIn className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">Sign in</span>
              </button>
            </SignInButton>
          </Show>

          <Show when="signed-in">
            <Link
              href="/home"
              className="hidden items-center gap-1.5 rounded-full border border-[#292524] px-4 py-2 text-sm font-medium text-[#FAFAF9] transition-colors hover:border-[#F97316] sm:flex"
            >
              <House className="h-4 w-4 text-[#F97316]" aria-hidden="true" />
              Home
            </Link>
            <UserButton />
          </Show>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="inline-flex items-center justify-center rounded-full border border-[#292524] bg-[#1C1917] p-2 text-[#FAFAF9] md:hidden"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav links panel */}
      {mobileMenuOpen && (
        <div className="border-t border-[#292524] bg-[#120F0D]/95 md:hidden">
          <nav
            className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6"
            aria-label="Mobile navigation"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-[#FAFAF9] hover:bg-[#1C1917]"
              >
                <link.icon className="h-4 w-4 text-[#F97316]" aria-hidden="true" />
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;