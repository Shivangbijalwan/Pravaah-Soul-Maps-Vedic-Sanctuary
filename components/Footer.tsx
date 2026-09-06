"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, BookOpen, Flame, LogIn, House, User } from "lucide-react";
import DiyaFlame from "./DiyaFlame";
import { Show, SignInButton } from "@clerk/nextjs";

interface FooterProps {
  onOpenBirthModal?: () => void;
}

export function Footer({ onOpenBirthModal }: FooterProps) {
  const [activeTab, setActiveTab] = useState<"journey" | "discover" | "readings" | "profile">("journey");

  return (
    <>
      {/* Main Footer */}
      <footer id="footer" className="relative w-full bg-[#080706] border-t border-[#292524] pt-16 pb-24 sm:pb-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-[#F97316]/30 to-transparent" />
          <div className="absolute top-0 left-1/4 w-[300px] h-32 bg-[#F97316]/5 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">

            {/* Brand */}
            <div className="md:col-span-5 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1C1917] border border-[#292524] flex items-center justify-center">
                  <DiyaFlame size="sm" showBase={false} showHalo={false} />
                </div>
                <div>
                  <span className="font-display text-xl font-semibold text-[#FAFAF9] block">Pravaah</span>
                  <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#78716C]">Soul Maps</span>
                </div>
              </div>

              <p className="text-sm text-[#78716C] max-w-sm leading-relaxed">
                A sanctuary bridging classical Indian wisdom traditions with mathematical precision. Honoring the quiet blueprint within every living breath.
              </p>

              {/* Dividers */}
              <div className="flex items-center gap-3 text-[11px] text-[#78716C]">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FACC15] animate-pulse" />
                  <span>Coordinates Protected</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-pulse" style={{ animationDelay: "0.5s" }} />
                  <span>Zero Ad Tracking</span>
                </div>
              </div>

              {/* Zodiac symbols */}
              <div className="flex flex-wrap gap-2 pt-1">
                {["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"].map((z) => (
                  <span key={z} className="text-[#292524] hover:text-[#F97316] transition-colors cursor-default text-base">{z}</span>
                ))}
              </div>
            </div>

            {/* Navigation links */}
            <div className="md:col-span-3">
              <h5 className="font-semibold text-[#FAFAF9] tracking-wider uppercase text-[10px] mb-5">Sanctuary</h5>
              <ul className="space-y-3">
                {[
                  { label: "About The Sanctuary", href: "#about" },
                  { label: "The 3-Step Process", href: "#journey-process" },
                  { label: "Reading Dossier", href: "#reading-preview" },
                  { label: "Seeker Reflections", href: "#testimonials" },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[#78716C] hover:text-[#FAFAF9] transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#292524] group-hover:bg-[#F97316] transition-colors" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Auth + CTA */}
            <div className="md:col-span-4">
              <h5 className="font-semibold text-[#FAFAF9] tracking-wider uppercase text-[10px] mb-5">Begin Your Journey</h5>

              <div className="p-5 rounded-2xl bg-[#1C1917] border border-[#292524]">
                <p className="text-sm text-[#A8A29E] leading-relaxed mb-4">
                  Your Vedic soul map is one birth moment away. Enter your coordinates and discover your authentic blueprint.
                </p>

                <Show when="signed-out">
                  <SignInButton mode="modal">
                    <button
                      type="button"
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#F97316]/15 border border-[#F97316]/30 text-sm font-medium text-[#F97316] hover:bg-[#F97316]/25 transition-all"
                    >
                      <LogIn className="w-4 h-4" />
                      Sign In to Begin
                    </button>
                  </SignInButton>
                </Show>

                <Show when="signed-in">
                  {onOpenBirthModal ? (
                    <button
                      type="button"
                      onClick={onOpenBirthModal}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#F97316]/15 border border-[#F97316]/30 text-sm font-medium text-[#F97316] hover:bg-[#F97316]/25 transition-all"
                    >
                      <House className="w-4 h-4" />
                      Discover My Soul Map
                    </button>
                  ) : (
                    <Link
                      href="/home"
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#F97316]/15 border border-[#F97316]/30 text-sm font-medium text-[#F97316] hover:bg-[#F97316]/25 transition-all"
                    >
                      <House className="w-4 h-4" />
                      Go to My Soul Map
                    </Link>
                  )}
                </Show>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-[#1C1917] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#78716C]">
            <p>© {new Date().getFullYear()} Pravaah Soul Maps. All sacred rights reserved.</p>
            <p className="flex items-center gap-2">
              <span>Carved with reverence</span>
              <span className="text-[#F97316]">✦</span>
              <span>For quiet reflection</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile Docked Bottom Nav */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0C0A09]/97 backdrop-blur-xl border-t border-[#292524] px-2 py-2 safe-area-bottom">
        <div className="flex items-center justify-around max-w-sm mx-auto">

          <button
            type="button"
            onClick={() => { setActiveTab("journey"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${activeTab === "journey" ? "text-[#F97316]" : "text-[#78716C]"}`}
          >
            <Flame className={`w-5 h-5 ${activeTab === "journey" ? "text-[#F97316]" : "text-[#78716C]"}`} />
            <span className="text-[9px] font-medium tracking-wider">Journey</span>
          </button>

          <a
            href="#journey-process"
            onClick={() => setActiveTab("discover")}
            className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${activeTab === "discover" ? "text-[#FACC15]" : "text-[#78716C]"}`}
          >
            <Sparkles className={`w-5 h-5 ${activeTab === "discover" ? "text-[#FACC15]" : "text-[#78716C]"}`} />
            <span className="text-[9px] font-medium tracking-wider">Process</span>
          </a>

          <a
            href="#reading-preview"
            onClick={() => setActiveTab("readings")}
            className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${activeTab === "readings" ? "text-[#FAFAF9]" : "text-[#78716C]"}`}
          >
            <BookOpen className={`w-5 h-5 ${activeTab === "readings" ? "text-[#FAFAF9]" : "text-[#78716C]"}`} />
            <span className="text-[9px] font-medium tracking-wider">Readings</span>
          </a>

          <Show when="signed-out">
            <SignInButton mode="modal">
              <button
                type="button"
                onClick={() => setActiveTab("profile")}
                className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${activeTab === "profile" ? "text-[#F97316]" : "text-[#78716C]"}`}
              >
                <LogIn className={`w-5 h-5 ${activeTab === "profile" ? "text-[#F97316]" : "text-[#78716C]"}`} />
                <span className="text-[9px] font-medium tracking-wider">Sign In</span>
              </button>
            </SignInButton>
          </Show>

          <Show when="signed-in">
            <Link
              href="/home"
              onClick={() => setActiveTab("profile")}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${activeTab === "profile" ? "text-[#FACC15]" : "text-[#78716C]"}`}
            >
              <User className={`w-5 h-5 ${activeTab === "profile" ? "text-[#FACC15]" : "text-[#78716C]"}`} />
              <span className="text-[9px] font-medium tracking-wider">My Map</span>
            </Link>
          </Show>

        </div>
      </div>
    </>
  );
}

export default Footer;
