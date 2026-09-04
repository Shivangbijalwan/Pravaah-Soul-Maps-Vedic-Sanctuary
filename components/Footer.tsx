"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Compass,
  Sparkles,
  BookOpen,
  User,
  Shield,
  Heart,
  ChevronRight,
  Flame,
  LogIn,
} from "lucide-react";
import DiyaFlame from "./DiyaFlame";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";

interface FooterProps {
  onOpenBirthModal: () => void;
  isLoggedIn?: boolean;
  onToggleAuth?: () => void;
}

export function Footer({ onOpenBirthModal, isLoggedIn, onToggleAuth }: FooterProps) {
  const [activeTab, setActiveTab] = useState<"journey" | "discover" | "readings" | "profile">("journey");

  return (
    <>
      {/* 1. Main Contemplative Web Footer */}
      <footer id="footer" className="w-full bg-[#0C0A09] border-t border-[#292524] pt-14 pb-24 sm:pb-16 text-[#A8A29E] text-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Column 1: Brand & Purpose */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1C1917] border border-[#292524] flex items-center justify-center">
                  <DiyaFlame size="sm" showBase={false} showHalo={false} />
                </div>
                <span className="font-display text-xl font-semibold text-[#FAFAF9]">
                  Pravaah
                </span>
              </div>

              <p className="text-sm text-[#A8A29E] max-w-sm leading-relaxed">
                A sanctuary bridging classical Indian wisdom traditions with mathematical precision. Honoring the quiet blueprint within every living breath.
              </p>

              <div className="flex items-center gap-4 text-xs text-[#78716C] pt-2">
                <span>Coordinates Protected</span>
                <span>•</span>
                <span>Zero Commercial Ad Tracking</span>
              </div>
            </div>

            {/* Column 2: Sanctuary Navigation */}
            <div>
              <h5 className="font-semibold text-[#FAFAF9] tracking-wider uppercase text-[11px] mb-4">
                Sanctuary
              </h5>
              <ul className="space-y-2.5">
                <li>
                  <a href="#about" className="hover:text-[#FEF08A] transition-colors">
                    About The Sanctuary
                  </a>
                </li>
                <li>
                  <a href="#journey-process" className="hover:text-[#F97316] transition-colors">
                    The 3-Step Process
                  </a>
                </li>
                <li>
                  <a href="#reading-preview" className="hover:text-[#FACC15] transition-colors">
                    Reading Dossier Sample
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onOpenBirthModal}
                    className="hover:text-[#FAFAF9] text-left transition-colors"
                  >
                    Enter Birth Coordinates
                  </button>
                </li>
                <li>
                  <Show when="signed-out">
                    <SignInButton mode="modal">
                      <button
                        type="button"
                        className="hover:text-[#F97316] text-left transition-colors cursor-pointer"
                      >
                        Seeker Sign In
                      </button>
                    </SignInButton>
                  </Show>
                  <Show when="signed-in">
                    <Link
                      href="/home"
                      className="hover:text-[#FACC15] text-left transition-colors"
                    >
                      Sanctuary Home Dashboard
                    </Link>
                  </Show>
                </li>
              </ul>
            </div>

           </div>

          {/* Bottom Bar with Reverence Notice */}
          <div className="pt-8 border-t border-[#292524] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#78716C]">
            <p>© {new Date().getFullYear()} Pravaah Soul Maps. All sacred rights reserved.</p>
            <p className="flex items-center gap-1.5">
              <span>Carved with reverence</span>
              <span className="text-[#F97316]">✦</span>
              <span>For quiet reflection</span>
            </p>
          </div>
        </div>
      </footer>

      {/* 2. Mobile Docked Bottom Navigation Bar (Matching uploaded screenshot & responsive) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#151312]/95 backdrop-blur-md border-t border-[#292524] px-4 py-2">
        <div className="flex items-center justify-around">
          {/* Tab 1: Journey */}
          <button
            type="button"
            onClick={() => {
              setActiveTab("journey");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === "journey" ? "text-[#F97316]" : "text-[#78716C] hover:text-[#A8A29E]"
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                activeTab === "journey" ? "bg-[#F97316]/15 text-[#F97316]" : ""
              }`}
            >
              <Flame className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-medium tracking-wider">Journey</span>
          </button>

          {/* Tab 2: Discover */}
          <a
            href="#journey-process"
            onClick={() => setActiveTab("discover")}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === "discover" ? "text-[#FACC15]" : "text-[#78716C] hover:text-[#A8A29E]"
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                activeTab === "discover" ? "bg-[#FACC15]/15 text-[#FACC15]" : ""
              }`}
            >
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-medium tracking-wider">Discover</span>
          </a>

          {/* Tab 3: Readings */}
          <a
            href="#reading-preview"
            onClick={() => setActiveTab("readings")}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === "readings" ? "text-[#FAFAF9]" : "text-[#78716C] hover:text-[#A8A29E]"
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                activeTab === "readings" ? "bg-[#FAFAF9]/15 text-[#FAFAF9]" : ""
              }`}
            >
              <BookOpen className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-medium tracking-wider">Readings</span>
          </a>

          {/* Tab 4: Profile / Auth (Mobile preview managed with Clerk) */}
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button
                type="button"
                onClick={() => setActiveTab("profile")}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  activeTab === "profile" ? "text-[#F97316]" : "text-[#78716C] hover:text-[#A8A29E]"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    activeTab === "profile" ? "bg-[#F97316]/15 text-[#F97316]" : ""
                  }`}
                >
                  <LogIn className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-medium tracking-wider">Sign In</span>
              </button>
            </SignInButton>
          </Show>

          <Show when="signed-in">
            <Link
              href="/home"
              onClick={() => setActiveTab("profile")}
              className={`flex flex-col items-center gap-1 transition-colors ${
                activeTab === "profile" ? "text-[#FACC15]" : "text-[#78716C] hover:text-[#A8A29E]"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  activeTab === "profile" ? "bg-[#FACC15]/15 text-[#FACC15]" : ""
                }`}
              >
                <User className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-medium tracking-wider">Home</span>
            </Link>
          </Show>
        </div>
      </div>
    </>
  );
}

export default Footer;
