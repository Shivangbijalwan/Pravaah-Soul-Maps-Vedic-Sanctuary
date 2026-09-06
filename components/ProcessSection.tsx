"use client";

import React, { useEffect, useRef } from "react";
import { Calendar, Share2, BookOpen, Clock, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import { SignInButton, Show } from "@clerk/nextjs";
import Link from "next/link";

export function ProcessSection({ onStepClick }: { onStepClick?: (n: number) => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale").forEach((el) => {
              el.classList.add("visible");
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      number: "01",
      title: "Share Your Birth Details",
      icon: Calendar,
      iconColor: "#F97316",
      description: "Enter your date, exact time, and place of birth. Precision in these coordinates ensures astronomical fidelity in your soul map.",
      tags: [
        { label: "No Account Required Initially", icon: <ShieldCheck className="w-3 h-3 text-[#FACC15]" /> },
        { label: "Takes 2 Minutes", icon: <Clock className="w-3 h-3 text-[#A8A29E]" /> },
      ],
      glow: "rgba(249,115,22,0.25)",
      gradient: "from-[#F97316]/20 to-transparent",
      lineColor: "#F97316",
    },
    {
      number: "02",
      title: "Discover Your Patterns",
      icon: Share2,
      iconColor: "#FACC15",
      description: "Your celestial and chronological moments are filtered into clear foundational themes, temperaments, and cyclical rhythms unique to your soul.",
      tags: [
        { label: "Vedic Synthesis", icon: <Sparkles className="w-3 h-3 text-[#F97316]" /> },
      ],
      glow: "rgba(250,204,21,0.25)",
      gradient: "from-[#FACC15]/20 to-transparent",
      lineColor: "#FACC15",
    },
    {
      number: "03",
      title: "Read Your Journey",
      icon: BookOpen,
      iconColor: "#EF4444",
      description: "Explore articulated chapters on strengths, learning modes, and relational paths. Save as a sanctified PDF to revisit for years to come.",
      tags: [
        { label: "Downloadable Dossier", icon: <Sparkles className="w-3 h-3 text-[#FEF08A]" /> },
      ],
      glow: "rgba(239,68,68,0.25)",
      gradient: "from-[#EF4444]/20 to-transparent",
      lineColor: "#EF4444",
    },
  ];

  return (
    <section
      id="journey-process"
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32 px-4 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[#FACC15]/4 blur-[80px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-[#F97316]/5 blur-[80px]" />
        {/* Vertical grid lines */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "repeating-linear-gradient(90deg, #FAFAF9 0px, #FAFAF9 1px, transparent 1px, transparent 80px)",
        }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20">
          <div className="reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1C1917] border border-[#FACC15]/25 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#FACC15]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FAFAF9]">The Process</span>
          </div>

          <h2 className="reveal delay-100 font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#FAFAF9] leading-[1.15] mb-6">
            A Journey in{" "}
            <span className="italic font-normal text-gradient-flame">Three Steps</span>
          </h2>

          <p className="reveal delay-200 text-base sm:text-lg text-[#A8A29E] max-w-xl mx-auto leading-relaxed">
            A thoughtful sequence designed to illuminate your distinct personal blueprint with clarity and reverence.
          </p>
        </div>

        {/* Steps — large card layout */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px -translate-y-1/2" style={{
            background: "linear-gradient(90deg, rgba(249,115,22,0.6) 0%, rgba(250,204,21,0.6) 50%, rgba(239,68,68,0.6) 100%)",
          }} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className={`reveal delay-${(idx + 1) * 200} group relative`}
                  onClick={() => onStepClick?.(idx + 1)}
                >
                  <div
                    className="relative p-8 rounded-3xl bg-[#1C1917] border border-[#292524] transition-all duration-500 overflow-hidden cursor-pointer h-full"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${step.lineColor}40`;
                      e.currentTarget.style.transform = "translateY(-8px)";
                      e.currentTarget.style.boxShadow = `0 20px 60px ${step.glow}, 0 0 0 1px ${step.lineColor}20`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#292524";
                      e.currentTarget.style.transform = "translateY(0px)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {/* Top gradient */}
                    <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b ${step.gradient} opacity-40`} />

                    {/* Step number — large display */}
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <span className="font-display text-7xl font-bold text-[#292524] group-hover:text-[#373433] transition-colors leading-none select-none">
                          {step.number}
                        </span>
                        <div
                          className="w-14 h-14 rounded-2xl bg-[#221F1E] border border-[#292524] flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                          style={{ boxShadow: `0 0 25px ${step.glow}` }}
                        >
                          <Icon className="w-6 h-6" style={{ color: step.iconColor }} />
                        </div>
                      </div>

                      <h3 className="font-display text-xl sm:text-2xl font-medium text-[#FAFAF9] mb-3 group-hover:text-[#FEF08A] transition-colors duration-300">
                        {step.title}
                      </h3>

                      <p className="text-sm text-[#A8A29E] leading-relaxed mb-6">
                        {step.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {step.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-[#221F1E] border border-[#292524] text-[#E8E1DF]"
                          >
                            {tag.icon}
                            {tag.label}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom accent line */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `linear-gradient(90deg, transparent 0%, ${step.lineColor} 50%, transparent 100%)` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="reveal delay-600 mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 sm:p-8 rounded-3xl glass-card-warm">
            <div className="text-center sm:text-left">
              <div className="font-display text-xl font-medium text-[#FAFAF9] mb-1">Ready to begin your journey?</div>
              <div className="text-sm text-[#A8A29E]">Your Vedic soul map awaits — crafted with precision and reverence.</div>
            </div>
            <Show when="signed-out">
              <SignInButton mode="modal" fallbackRedirectUrl="/home">
                <button
                  type="button"
                  className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F97316] text-[#0C0A09] font-semibold text-sm hover:bg-[#FB923C] flame-cta-glow transition-all duration-300"
                >
                  <span>Start My Reading</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </SignInButton>
            </Show>
            <Show when="signed-in">
              <Link
                href="/home"
                className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F97316] text-[#0C0A09] font-semibold text-sm hover:bg-[#FB923C] flame-cta-glow transition-all"
              >
                <span>Go to My Map</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Show>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProcessSection;
