"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import { BookOpen, House, Info, LogIn, Menu, Route, X, Star } from "lucide-react";
import DiyaFlame from "./DiyaFlame";

const links = [
  { label: "Home", href: "#home", icon: House },
  { label: "About", href: "#about", icon: Info },
  { label: "Process", href: "#journey-process", icon: Route },
  { label: "Readings", href: "#reading-preview", icon: BookOpen },
  { label: "Testimonials", href: "#testimonials", icon: Star },
  
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Active section detection
      const sectionIds = ["home", "about", "journey-process", "reading-preview", "testimonials"];
      for (const id of [...sectionIds].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-500 ${
        scrolled
          ? "border-b border-[#292524] bg-[#0C0A09]/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <a
          href="#home"
          className="flex items-center gap-3 group"
          onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
          aria-label="Pravaah home"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#292524] bg-[#1C1917] group-hover:border-[#F97316]/50 transition-colors duration-300 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.2)]">
            <DiyaFlame size="sm" showBase={false} showHalo={false} />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl font-semibold tracking-tight text-[#FAFAF9] group-hover:text-gradient-flame transition-all">
              Pravaah
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#A8A29E]">
              Soul Maps
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {links.map((link) => {
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "text-[#FAFAF9] bg-[#1C1917] border border-[#292524]"
                    : "text-[#A8A29E] hover:text-[#FAFAF9] hover:bg-[#1C1917]/60"
                }`}
              >
                <link.icon className={`h-3.5 w-3.5 transition-colors ${isActive ? "text-[#F97316]" : "text-[#78716C]"}`} aria-hidden="true" />
                {link.label}
                
                
              </a>
            );
          })}
        </nav>  

        {/* Auth controls */}
        <div className="flex items-center gap-2">
          <Show when="signed-out">
            <SignInButton mode="modal" fallbackRedirectUrl="/home">
              <button
                type="button"
                className="group relative hidden sm:flex items-center gap-2 rounded-full bg-[#1C1917] border border-[#292524] px-5 py-2 text-sm font-medium text-[#FAFAF9] transition-all duration-300 hover:border-[#F97316]/50 hover:bg-[#221F1E] overflow-hidden"
              >
                <LogIn className="h-4 w-4 text-[#F97316]" aria-hidden="true" />
                <span>Sign in</span>
              </button>
            </SignInButton>
            <SignInButton mode="modal" fallbackRedirectUrl="/home">
              <button
                type="button"
                className="sm:hidden flex items-center gap-2 rounded-full bg-[#F97316] px-4 py-2 text-sm font-medium text-[#0C0A09] flame-cta-glow transition-all"
              >
                <LogIn className="h-4 w-4" />
              </button>
            </SignInButton>
          </Show>

          <Show when="signed-in">
            <Link
              href="/home"
              className="hidden sm:flex items-center gap-1.5 rounded-full border border-[#292524] px-4 py-2 text-sm font-medium text-[#FAFAF9] transition-all duration-300 hover:border-[#F97316]/50 hover:bg-[#1C1917]"
            >
              <House className="h-4 w-4 text-[#F97316]" aria-hidden="true" />
              My Map
            </Link>
            <UserButton />
          </Show>

        

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="inline-flex items-center justify-center rounded-full border border-[#292524] bg-[#1C1917] p-2 text-[#FAFAF9] md:hidden hover:border-[#F97316]/50 transition-colors"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav panel */}
      {mobileMenuOpen && (
        <div className="border-t border-[#292524] bg-[#0C0A09]/98 backdrop-blur-xl md:hidden">
          <nav className="mx-auto max-w-7xl px-4 py-5 sm:px-6" aria-label="Mobile navigation">
            <div className="space-y-1 mb-5">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#FAFAF9] hover:bg-[#1C1917] hover:text-[#FEF08A] transition-all"
                >
                  <link.icon className="h-4 w-4 text-[#F97316]" aria-hidden="true" />
                  {link.label}
                </a>
              ))}
            </div>
            <div className="pt-4 border-t border-[#292524]">
              <Show when="signed-out">
                <SignInButton mode="modal" fallbackRedirectUrl="/home">
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 rounded-full bg-[#F97316] py-3 text-sm font-semibold text-[#0C0A09] flame-cta-glow"
                  >
                    <LogIn className="w-4 h-4" />
                    Sign in & Begin Journey
                  </button>
                </SignInButton>
              </Show>
              <Show when="signed-in">
                <Link
                  href="/home"
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-[#F97316] py-3 text-sm font-semibold text-[#0C0A09] flame-cta-glow"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <House className="w-4 h-4" />
                  Go to My Soul Map
                </Link>
              </Show>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
