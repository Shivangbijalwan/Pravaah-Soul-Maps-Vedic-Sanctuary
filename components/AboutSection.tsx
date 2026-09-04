"use client";

import React from "react";
import { Sparkles, Shield, Compass, Flame, Feather, Eye, Scale, ArrowRight } from "lucide-react";

interface AboutSectionProps {
  onBeginJourney?: () => void;
}

export function AboutSection({ onBeginJourney }: AboutSectionProps) {
  const pillars = [
    {
      icon: <Flame className="w-5 h-5 text-[#F97316]" />,
      title: "The Living Flame (Jyoti)",
      subtitle: "Clarity over Fatalism",
      description:
        "We reject sensational predictions and fear-based mysticism. Pravaah approaches sacred wisdom as a reflective lantern—illuminating inner tendencies, innate gifts, and natural rhythms.",
      tag: "Guiding Light",
      glowColor: "rgba(249,115,22,0.15)",
    },
    {
      icon: <Compass className="w-5 h-5 text-[#FACC15]" />,
      title: "Mathematical Ephemeris",
      subtitle: "Astronomical Exactitude",
      description:
        "Every chart is computed with rigorous mathematical fidelity, translating your exact birth longitude, latitude, and chronological moment into coherent archetypal patterns.",
      tag: "Vedic Harmonics",
      glowColor: "rgba(250,204,21,0.15)",
    },
    {
      icon: <Scale className="w-5 h-5 text-[#FAFAF9]" />,
      title: "Architectural Restraint",
      subtitle: "Serene & Uncluttered",
      description:
        "A deliberate departure from loud commercial dashboards. Designed like a temple sanctum—stratified warm stone surfaces, measured serif proportions, and quiet space to breathe.",
      tag: "Sacred Minimalism",
      glowColor: "rgba(250,250,249,0.1)",
    },
    {
      icon: <Shield className="w-5 h-5 text-[#EF4444]" />,
      title: "Sovereign Sanctuary",
      subtitle: "Zero Commercial Tracking",
      description:
        "Your birth coordinates and reflections remain sacred and private. We operate with strict confidentiality, zero ad networks, and no data monetization.",
      tag: "Protected Integrity",
      glowColor: "rgba(239,68,68,0.15)",
    },
  ];

  return (
    <section
      id="about"
      className="w-full max-w-4xl mx-auto px-4 py-16 sm:py-24 flex flex-col items-center relative"
    >
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(ellipse,rgba(249,115,22,0.08)_0%,transparent_70%)] pointer-events-none -z-10" />

      {/* 1. Header & Pre-title */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1C1917] border border-[#292524] shadow-sm mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FAFAF9]">
            About Pravaah
          </span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#FAFAF9] leading-[1.2]">
          A tool to understand yourself,{" "}
          <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] via-[#FACC15] to-[#FEF08A]">
            not a rulebook for your life.
          </span>
        </h2>

        <p className="mt-4 text-sm sm:text-base text-[#A8A29E] leading-relaxed max-w-xl mx-auto font-normal">
         Pravaah is a peaceful online space that blends ancient Indian wisdom with the science of the stars. It’s designed to help you explore your unique personality, strengths, and life patterns without fear or judgment.
        </p>
      </div>

      {/* 2. Core Philosophy Narrative Card */}
      <div className="w-full p-7 sm:p-10 rounded-3xl bg-[#1C1917]/90 border border-[#292524] shadow-xl relative overflow-hidden mb-10 card-ambient-light">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#221F1E] border border-[#F97316]/30 flex items-center justify-center shrink-0 shadow-[0_0_25px_rgba(249,115,22,0.2)]">
            <Feather className="w-8 h-8 text-[#FACC15]" />
          </div>

          <div className="space-y-3 text-center md:text-left">
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F97316]">
              Our Philosophy & Lineage
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-medium text-[#FAFAF9]">
              “The map is an altar, not a cage.”
            </h3>
            <p className="text-xs sm:text-sm text-[#E0C0B1] leading-relaxed">
              Traditional astrology is often weighed down by dogma, superstition, or deterministic anxiety. At Pravaah, we honor your agency. Your birth coordinates are not a fixed verdict of destiny, but a contemplative mirror revealing recurring harmonic wavelengths, latent strengths, and energetic seasons.
            </p>
          </div>
        </div>
      </div>

      {/* 3. The Four Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
        {pillars.map((pillar, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-7 rounded-2xl bg-[#1C1917] border border-[#292524] hover:border-[#F97316]/50 transition-all duration-300 relative group overflow-hidden"
          >
            {/* Ambient hover glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 80% 20%, ${pillar.glowColor} 0%, transparent 60%)`,
              }}
            />

            <div className="flex items-start justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-[#221F1E] border border-[#292524] flex items-center justify-center group-hover:scale-105 transition-transform">
                {pillar.icon}
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] font-medium tracking-wide uppercase bg-[#221F1E] border border-[#292524] text-[#A8A29E] group-hover:text-[#FAFAF9] group-hover:border-[#373433]">
                {pillar.tag}
              </span>
            </div>

            <h4 className="font-display text-lg sm:text-xl font-medium text-[#FAFAF9] mb-1 group-hover:text-[#FEF08A] transition-colors">
              {pillar.title}
            </h4>

            <p className="text-xs font-medium text-[#F97316] mb-3">
              {pillar.subtitle}
            </p>

            <p className="text-xs sm:text-sm text-[#A8A29E] leading-relaxed">
              {pillar.description}
            </p>
          </div>
        ))}
      </div>

      {/* 4. Bottom Contemplative Ribbon */}
      <div className="mt-12 w-full flex flex-col sm:flex-row items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-[#151312] border border-[#292524]">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FACC15] animate-pulse" />
          <span className="text-xs text-[#E8E1DF] font-medium">
            Ready to explore your personal blueprint?
          </span>
        </div>

        <a
          href="#journey-process"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#F97316] hover:text-[#FB923C] transition-colors group"
        >
          <span>See the 3-step sequence</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </section>
  );
}

export default AboutSection;

