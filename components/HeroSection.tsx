"use client";

import React from "react";
import { ArrowRight, Flame, Map, Lock, Scale, Sparkles } from "lucide-react";

interface HeroSectionProps {
  onBeginJourney: () => void;
  onSeeHowItWorks: () => void;
}

export function HeroSection({ onBeginJourney, onSeeHowItWorks }: HeroSectionProps) {
  return (
    <section id="home" className="relative w-full pt-10 pb-16 sm:pt-14 sm:pb-24 flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[700px] h-[550px] sm:h-[700px] bg-[radial-gradient(circle,rgba(249,115,22,0.14)_0%,rgba(234,179,8,0.06)_40%,transparent_70%)] pointer-events-none -z-10" />

      {/* 1. Category Tag Chip */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1C1917]/90 border border-[#292524] shadow-sm mb-6 sm:mb-8 backdrop-blur-sm">
        <Sparkles className="w-3.5 h-3.5 text-[#FACC15]" />
        <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-[#E8E1DF]">
          Personal Insight & Guidance
        </span>
      </div>

      {/* 2. Main Title */}
      <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#FAFAF9] max-w-2xl leading-[1.18] sm:leading-[1.15]">
        Discover What Makes You,{" "}
        <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] via-[#FACC15] to-[#FEF08A]">
          You.
        </span>
      </h1>

      {/* 3. Subtitle */}
      <p className="mt-5 text-sm sm:text-base text-[#A8A29E] max-w-md sm:max-w-xl leading-relaxed font-normal">
        Enter your birth details and uncover a personalized perspective on your personality, tendencies, strengths, and personal journey.
      </p>

      
    </section>
  );
}

export default HeroSection;

