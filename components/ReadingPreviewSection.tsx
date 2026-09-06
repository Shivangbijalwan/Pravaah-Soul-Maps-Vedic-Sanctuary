"use client";

import React, { useEffect, useRef } from "react";
import { Sparkles, BookOpen, Star, Eye, Lock, Download, ArrowRight, Layers } from "lucide-react";
import { SignInButton, Show } from "@clerk/nextjs";
import Link from "next/link";

const CHAPTERS = [
  {
    number: "I",
    title: "Identity & Core Self",
    subtitle: "Your Fundamental Archetype",
    description: "An exploration of your Lagna (Ascendant), Sun sign placement, and the dominant planetary energies that shape your core personality, self-expression, and the first impression you make on the world.",
    tags: ["Lagna Chart", "Sun Sign", "Rising Archetype"],
    color: "#F97316",
    glow: "rgba(249,115,22,0.2)",
    preview: [
      "Core temperament: Pitta dominant with Vata secondary",
      "Natural leadership through creative self-expression",
      "Strongest in environments of aesthetic freedom",
    ],
  },
  {
    number: "II",
    title: "Relational Patterns",
    subtitle: "How You Connect & Love",
    description: "Examining your 7th house, Venus placement, and Navamsa chart to reveal your relational style, what you seek in deep partnerships, and the energetic rhythms of your emotional bonds.",
    tags: ["7th House", "Venus Placement", "Navamsa"],
    color: "#FACC15",
    glow: "rgba(250,204,21,0.2)",
    preview: [
      "Seeks depth and intellectual resonance in partnership",
      "Loyalty once trust is established is absolute",
      "Navigating the tension between independence and intimacy",
    ],
  },
  {
    number: "III",
    title: "Vocation & Dharma",
    subtitle: "Your Life's Sacred Purpose",
    description: "Your 10th house, Saturn, and current Dasha periods illuminate the vocational currents — what you are designed to contribute, the arenas where you naturally excel, and your timely seasons of growth.",
    tags: ["10th House", "Dasha Periods", "Saturn Karma"],
    color: "#EF4444",
    glow: "rgba(239,68,68,0.2)",
    preview: [
      "Dharma oriented toward teaching and creative synthesis",
      "Saturn mahadasha activating disciplined mastery",
      "Peak vocational cycle: 2025–2032",
    ],
  },
];

export function ReadingPreviewSection() {
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

  return (
    <section
      id="reading-preview"
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32 px-4 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px section-divider" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-[#F97316]/5 blur-[90px]" />
        <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] rounded-full bg-[#FACC15]/4 blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
          <div>
            <div className="reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1C1917] border border-[#F97316]/25 mb-6">
              <BookOpen className="w-3.5 h-3.5 text-[#F97316]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FAFAF9]">The Reading Dossier</span>
            </div>

            <h2 className="reveal delay-100 font-display text-4xl sm:text-5xl font-medium tracking-tight text-[#FAFAF9] leading-[1.15] mb-6">
              Your soul map,{" "}
              <span className="italic font-normal text-gradient-flame">
                in three<br />sacred chapters.
              </span>
            </h2>

            <p className="reveal delay-200 text-base text-[#A8A29E] leading-relaxed mb-8">
              Each reading is a carefully crafted dossier — not a generic report, but an articulated exploration of your unique celestial signature. Written to be kept forever.
            </p>

            {/* Features */}
            <div className="reveal delay-300 space-y-3">
              {[
                { icon: <Eye className="w-4 h-4 text-[#F97316]" />, text: "Personalized to your exact birth moment" },
                { icon: <Lock className="w-4 h-4 text-[#FACC15]" />, text: "Private — never stored or shared" },
                { icon: <Download className="w-4 h-4 text-[#EF4444]" />, text: "Downloadable PDF for lifetime reference" },
                { icon: <Layers className="w-4 h-4 text-[#FAFAF9]" />, text: "3 comprehensive chapters of insight" },
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#221F1E] border border-[#292524] flex items-center justify-center flex-shrink-0">
                    {feature.icon}
                  </div>
                  <span className="text-sm text-[#A8A29E]">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sample dossier card */}
          <div className="reveal-right delay-200">
            <div className="relative p-6 rounded-3xl bg-[#1C1917] border border-[#292524] overflow-hidden">
              {/* Top glow line */}
              <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-[#F97316]/60 to-transparent" />

              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#221F1E] border border-[#F97316]/30 flex items-center justify-center">
                    <Star className="w-5 h-5 text-[#FACC15]" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#FAFAF9]">Pravaah Soul Dossier</div>
                    <div className="text-[10px] text-[#78716C]">Sample Preview — Vedic Analysis</div>
                  </div>
                </div>
                <span className="text-[10px] font-medium px-2 py-1 rounded-full bg-[#F97316]/15 border border-[#F97316]/30 text-[#F97316]">Sample</span>
              </div>

              {/* Preview lines — blurred content */}
              <div className="space-y-2 mb-5">
                {[
                  { width: "100%", opacity: 1 },
                  { width: "90%", opacity: 0.8 },
                  { width: "95%", opacity: 0.7 },
                  { width: "80%", opacity: 0.5 },
                  { width: "85%", opacity: 0.4 },
                ].map((line, i) => (
                  <div
                    key={i}
                    className="h-2 rounded-full bg-[#292524]"
                    style={{ width: line.width, opacity: line.opacity }}
                  />
                ))}
              </div>

              {/* Chapter tabs */}
              <div className="flex gap-2 mb-4">
                {["Identity", "Relational", "Vocation"].map((tab, i) => (
                  <span
                    key={tab}
                    className={`px-3 py-1 rounded-full text-[10px] font-medium border ${i === 0 ? "bg-[#F97316]/15 border-[#F97316]/40 text-[#F97316]" : "bg-[#221F1E] border-[#292524] text-[#78716C]"}`}
                  >
                    {tab}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-[#78716C] pt-4 border-t border-[#292524]">
                <span>46 pages · PDF</span>
                <span className="text-[#F97316]">Your birth moment</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chapters */}
        <div className="space-y-5">
          {CHAPTERS.map((chapter, idx) => (
            <div
              key={chapter.number}
              className={`reveal delay-${(idx + 1) * 100} group relative p-7 sm:p-8 rounded-2xl bg-[#1C1917] border border-[#292524] overflow-hidden transition-all duration-500`}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${chapter.color}35`;
                e.currentTarget.style.boxShadow = `0 10px 40px ${chapter.glow}`;
                e.currentTarget.style.transform = "translateX(4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#292524";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateX(0px)";
              }}
            >
              {/* Left accent */}
              <div
                className="absolute left-0 top-6 bottom-6 w-0.5 rounded-full transition-all duration-500 group-hover:opacity-100 opacity-30"
                style={{ background: chapter.color }}
              />

              {/* Corner glow */}
              <div
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-700"
                style={{ background: chapter.glow }}
              />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                {/* Chapter label */}
                <div className="lg:col-span-1">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="font-display text-5xl font-bold" style={{ color: `${chapter.color}25` }}>
                      {chapter.number}
                    </span>
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] mb-1" style={{ color: chapter.color }}>
                        Chapter {chapter.number}
                      </div>
                      <h3 className="font-display text-lg font-medium text-[#FAFAF9] group-hover:text-[#FEF08A] transition-colors duration-300">
                        {chapter.title}
                      </h3>
                      <p className="text-xs text-[#78716C] mt-0.5">{chapter.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {chapter.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#221F1E] border border-[#292524] text-[#A8A29E]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="lg:col-span-1">
                  <p className="text-sm text-[#A8A29E] leading-relaxed">{chapter.description}</p>
                </div>

                {/* Preview insights */}
                <div className="lg:col-span-1">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#78716C] mb-3">Sample Insights</div>
                  <div className="space-y-2">
                    {chapter.preview.map((insight, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: chapter.color }} />
                        <span className="text-xs text-[#A8A29E] leading-relaxed">{insight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="reveal delay-500 mt-16 relative overflow-hidden rounded-3xl">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1C1917] via-[#221F1E] to-[#1C1917]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F97316]/50 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.12)_0%,transparent_60%)]" />

          <div className="relative z-10 p-8 sm:p-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F97316]/15 border border-[#F97316]/30 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#FACC15]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#F97316]">Begin Today</span>
            </div>

            <h3 className="font-display text-3xl sm:text-4xl font-medium text-[#FAFAF9] mb-4">
              Your dossier is ready to be{" "}
              <span className="italic font-normal text-gradient-flame">written.</span>
            </h3>

            <p className="text-base text-[#A8A29E] mb-8 max-w-xl mx-auto">
              Enter your birth coordinates and receive a deeply personal Vedic blueprint — your personality, cosmic rhythms, and life journey revealed.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Show when="signed-out">
                <SignInButton mode="modal" fallbackRedirectUrl="/home">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#F97316] text-[#0C0A09] font-semibold text-sm hover:bg-[#FB923C] flame-cta-glow transition-all duration-300"
                  >
                    <span>Receive My Soul Map</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </SignInButton>
              </Show>
              <Show when="signed-in">
                <Link
                  href="/home"
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#F97316] text-[#0C0A09] font-semibold text-sm hover:bg-[#FB923C] flame-cta-glow transition-all"
                >
                  <span>View My Soul Map</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Show>
            
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReadingPreviewSection;
