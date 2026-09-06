"use client";

import React, { useEffect, useRef, useState } from "react";
import { Sparkles, ArrowRight, Star, ChevronDown } from "lucide-react";
import DiyaFlame from "./DiyaFlame";
import { SignInButton, Show } from "@clerk/nextjs";
import Link from "next/link";

interface HeroSectionProps {
  onBeginJourney: () => void;
  onSeeHowItWorks: () => void;
}

const STARS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 0.5,
  duration: Math.random() * 4 + 2,
  delay: Math.random() * 5,
  opacity: Math.random() * 0.7 + 0.3,
}));

const ZODIACS = [
  "♈ Aries", "♉ Taurus", "♊ Gemini", "♋ Cancer",
  "♌ Leo", "♍ Virgo", "♎ Libra", "♏ Scorpio",
  "♐ Sagittarius", "♑ Capricorn", "♒ Aquarius", "♓ Pisces",
];

export function HeroSection({ onBeginJourney, onSeeHowItWorks }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const parallaxX = (mousePos.x - 0.5) * 30;
  const parallaxY = (mousePos.y - 0.5) * 20;

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden"
    >
      {/* ── Starfield ── */}
      <div className="absolute inset-0 pointer-events-none">
        {mounted && STARS.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-[#FAFAF9] animate-twinkle"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              "--duration": `${star.duration}s`,
              "--delay": `${star.delay}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* ── Ambient orbs (parallax) ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "15%",
          left: "10%",
          transform: `translate(${parallaxX * 1.2}px, ${parallaxY * 0.8}px)`,
          transition: "transform 0.3s ease-out",
        }}
      >
        <div className="w-[500px] h-[500px] rounded-full opacity-[0.12] blur-[80px] bg-[#F97316]" />
      </div>
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "10%",
          right: "5%",
          transform: `translate(${-parallaxX * 0.8}px, ${-parallaxY * 0.6}px)`,
          transition: "transform 0.3s ease-out",
        }}
      >
        <div className="w-[400px] h-[400px] rounded-full opacity-[0.09] blur-[70px] bg-[#FACC15]" />
      </div>
      <div
        className="absolute pointer-events-none"
        style={{
          top: "40%",
          right: "20%",
          transform: `translate(${-parallaxX * 0.5}px, ${parallaxY * 0.4}px)`,
          transition: "transform 0.3s ease-out",
        }}
      >
        <div className="w-[300px] h-[300px] rounded-full opacity-[0.07] blur-[60px] bg-[#EF4444]" />
      </div>

      {/* ── Rotating zodiac ring ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "700px",
          height: "700px",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) translate(${parallaxX * 0.3}px, ${parallaxY * 0.2}px)`,
          transition: "transform 0.6s ease-out",
        }}
      >
        <div className="w-full h-full rounded-full border border-[#292524]/40 animate-spin-slow relative">
          {ZODIACS.map((zodiac, i) => {
            const angle = (i / ZODIACS.length) * 360;
            const rad = (angle * Math.PI) / 180;
            const r = 48;
            const x = 50 + r * Math.sin(rad);
            const y = 50 - r * Math.cos(rad);
            return (
              <span
                key={zodiac}
                className="absolute text-[9px] text-[#78716C]/50 font-mono"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                }}
              >
                {zodiac.split(" ")[0]}
              </span>
            );
          })}
        </div>
        <div className="absolute inset-8 rounded-full border border-[#292524]/20 animate-spin-reverse" />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">

        {/* Category pill */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1C1917]/90 border border-[#F97316]/30 shadow-sm mb-8 backdrop-blur-sm transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FACC15]" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#E8E1DF]">
            Vedic Soul Map · Personal Insight
          </span>
        </div>

        {/* Headline */}
        <h1
          className={`font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight text-[#FAFAF9] leading-[1.1] mb-6 transition-all duration-1000 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          Know the{" "}
          <span className=" font-normal text-gradient-flame">
            Soul
          </span>
          <br />
          Behind the{" "}
          <span className=" font-normal text-gradient-gold">
            Stars
          </span>
        </h1>

        {/* Sub */}
        <p
          className={`text-base sm:text-lg text-[#A8A29E] max-w-lg leading-relaxed mb-10 transition-all duration-1000 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          Enter your birth coordinates and receive a deeply personal Vedic blueprint — your personality, cosmic rhythms, and life journey revealed with mathematical precision.
        </p>

        {/* Trust badges */}
        <div
          className={`flex flex-wrap items-center justify-center gap-6 mt-12 transition-all duration-1000 delay-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          {[
            { label: "Ancient Vedic Wisdom", icon: "✦" },
            { label: "Mathematical Precision", icon: "◉" },
            { label: "Private & Sacred", icon: "⊕" },
          ].map((badge) => (
            <div key={badge.label} className="flex items-center gap-2 text-[11px] text-[#78716C]">
              <span className="text-[#F97316]/70 text-xs">{badge.icon}</span>
              <span>{badge.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <button
        type="button"
        onClick={onSeeHowItWorks}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#78716C] hover:text-[#F97316] transition-colors animate-float"
      >
        <span className="text-[10px] font-medium tracking-[0.2em] uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4" />
      </button>
    </section>
  );
}

export default HeroSection;
