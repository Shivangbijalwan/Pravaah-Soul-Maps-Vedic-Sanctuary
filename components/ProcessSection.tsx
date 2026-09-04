"use client";

import React from "react";
import { Calendar, Share2, BookOpen, Clock, ShieldCheck, Sparkles } from "lucide-react";

interface ProcessSectionProps {
  onStepClick?: (stepNumber: number) => void;
}

export function ProcessSection({ onStepClick }: ProcessSectionProps) {
  const steps = [
    {
      number: "01",
      title: "Share Your Details",
      icon: <Calendar className="w-4 h-4 text-[#F97316]" />,
      description:
        "Enter your date, exact time, and place of birth. Precision ensures structured fidelity in your persona reading.",
      tags: [
        { label: "No Account Required", icon: <ShieldCheck className="w-3 h-3 text-[#FACC15]" /> },
        { label: "2 Min", icon: <Clock className="w-3 h-3 text-[#A8A29E]" /> },
      ],
    },
    {
      number: "02",
      title: "Discover Your Patterns",
      icon: <Share2 className="w-4 h-4 text-[#FACC15]" />,
      description:
        "Your celestial and chronological moments are filtered into clear foundational themes, temperaments, and cyclical rhythms.",
      tags: [
        { label: "Hermetic Synthesis", icon: <Sparkles className="w-3 h-3 text-[#F97316]" /> },
      ],
    },
    {
      number: "03",
      title: "Read Your Journey",
      icon: <BookOpen className="w-4 h-4 text-[#EF4444]" />,
      description:
        "Explore articulated chapters on strengths, learning modes, and relational paths. Keep it forever as a sanctified PDF.",
      tags: [
        { label: "Downloadable Dossier", icon: <Sparkles className="w-3 h-3 text-[#FEF08A]" /> },
      ],
    },
  ];

  return (
    <section
      id="journey-process"
      className="w-full max-w-xl mx-auto px-4 py-16 sm:py-20 flex flex-col items-center"
    >
      {/* 1. Header & Pre-title */}
      <div className="text-left w-full mb-10">
        <div className="flex items-center gap-2 mb-2 text-xs font-semibold tracking-[0.16em] uppercase text-[#F97316]">
          <span className="font-mono text-[11px] text-[#A8A29E]">{"//"}</span>
          <span>PROCESS</span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-[#FAFAF9]">
          A Journey in Three Steps
        </h2>

        <p className="mt-2.5 text-xs sm:text-sm text-[#A8A29E] leading-relaxed max-w-md">
          A thoughtful sequence designed to illuminate your distinct personal blueprint.
        </p>
      </div>

      {/* 2. Connected Timeline Stepper */}
      <div className="relative w-full space-y-8 pl-12 sm:pl-16">
        {/* Continuous glowing vertical timeline line */}
        <div className="absolute left-[19px] sm:left-[27px] top-6 bottom-8 w-[2px] bg-gradient-to-b from-[#F97316] via-[#FACC15] to-[#EF4444]/60" />

        {steps.map((step, idx) => (
          <div
            key={step.number}
            onClick={() => onStepClick?.(idx + 1)}
            className="group relative cursor-pointer"
          >
            {/* Step Number Badge positioned on the timeline line */}
            <div className="absolute -left-12 sm:-left-16 top-1.5 w-10 h-10 rounded-full bg-[#1C1917] border-2 border-[#292524] group-hover:border-[#F97316] flex items-center justify-center shadow-lg transition-all duration-300 z-10">
              <span className="font-display font-medium text-xs text-[#FACC15] group-hover:text-[#FAFAF9]">
                {step.number}
              </span>
            </div>

            {/* Step Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#1C1917] border border-[#292524] group-hover:border-[#F97316]/60 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.12)] transition-all duration-300 card-ambient-subtle">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-display text-base sm:text-lg font-medium text-[#FAFAF9] group-hover:text-[#FEF08A] transition-colors">
                  {step.title}
                </h3>
                <div className="w-8 h-8 rounded-full bg-[#221F1E] border border-[#292524] flex items-center justify-center">
                  {step.icon}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#A8A29E] leading-relaxed mb-4">
                {step.description}
              </p>

              {/* Tags / Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {step.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium tracking-wide bg-[#221F1E] border border-[#292524] text-[#E8E1DF] group-hover:border-[#373433]"
                  >
                    {tag.icon}
                    <span>{tag.label}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProcessSection;

