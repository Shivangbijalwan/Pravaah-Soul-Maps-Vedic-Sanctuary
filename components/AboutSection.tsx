"use client";

import React, { useEffect, useRef } from "react";
import { Sparkles, Shield, Compass, Flame, Feather, Scale } from "lucide-react";

export function AboutSection() {
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

  const pillars = [
    {
      icon: <Flame className="w-6 h-6 text-[#F97316]" />,
      title: "The Living Flame",
      subtitle: "Clarity over Fatalism",
      description: "We reject sensational predictions and fear-based mysticism. Pravaah approaches sacred wisdom as a reflective lantern — illuminating inner tendencies, innate gifts, and natural rhythms.",
      tag: "Guiding Light",
      color: "#F97316",
      glow: "rgba(249,115,22,0.2)",
    },
    {
      icon: <Compass className="w-6 h-6 text-[#FACC15]" />,
      title: "Mathematical Ephemeris",
      subtitle: "Astronomical Exactitude",
      description: "Every chart is computed with rigorous mathematical fidelity, translating your exact birth longitude, latitude, and chronological moment into coherent archetypal patterns.",
      tag: "Vedic Harmonics",
      color: "#FACC15",
      glow: "rgba(250,204,21,0.2)",
    },
    {
      icon: <Scale className="w-6 h-6 text-[#FAFAF9]" />,
      title: "Architectural Restraint",
      subtitle: "Serene & Uncluttered",
      description: "A deliberate departure from loud commercial dashboards. Designed like a temple sanctum — stratified warm stone surfaces, measured serif proportions, and quiet space to breathe.",
      tag: "Sacred Minimalism",
      color: "#FAFAF9",
      glow: "rgba(250,250,249,0.12)",
    },
    {
      icon: <Shield className="w-6 h-6 text-[#EF4444]" />,
      title: "Sovereign Sanctuary",
      subtitle: "Zero Commercial Tracking",
      description: "Your birth coordinates and reflections remain sacred and private. We operate with strict confidentiality, zero ad networks, and no data monetization — ever.",
      tag: "Protected Integrity",
      color: "#EF4444",
      glow: "rgba(239,68,68,0.2)",
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32 px-4 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] rounded-full bg-[#F97316]/5 blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#FACC15]/4 blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20">
          <div className="reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1C1917] border border-[#F97316]/25 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FAFAF9]">About Pravaah</span>
          </div>

          <h2 className="reveal delay-100 font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#FAFAF9] leading-[1.15] mb-6">
            A map to understand yourself,{" "}
            <br className="hidden sm:block" />
            <span className="italic font-normal text-gradient-flame">not a cage for your life.</span>
          </h2>

          <p className="reveal delay-200 text-base sm:text-lg text-[#A8A29E] leading-relaxed max-w-2xl mx-auto">
            Pravaah is a peaceful online space that blends ancient Indian wisdom with the science of the stars — designed to help you explore your unique personality, strengths, and life patterns without fear or judgment.
          </p>
        </div>

        {/* Philosophy banner */}
        <div className="reveal delay-300 mb-16">
          <div className="relative p-8 sm:p-12 rounded-3xl glass-card-warm overflow-hidden group">
            {/* Animated top glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#F97316]/60 to-transparent" />
            <div className="absolute top-0 left-1/4 w-1/2 h-12 bg-[#F97316]/8 blur-xl" />

            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0 relative">
                <div className="w-20 h-20 rounded-2xl bg-[#221F1E] border border-[#F97316]/30 flex items-center justify-center shadow-[0_0_40px_rgba(249,115,22,0.25)] group-hover:shadow-[0_0_60px_rgba(249,115,22,0.4)] transition-shadow duration-700">
                  <Feather className="w-9 h-9 text-[#FACC15]" />
                </div>
                <div className="absolute -inset-2 rounded-3xl border border-[#F97316]/15 animate-border-glow" />
              </div>

              <div className="space-y-3 text-center md:text-left">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F97316]">
                  Our Philosophy & Lineage
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-medium text-[#FAFAF9]">
                  &quot;The map is an altar, not a cage.&quot;
                </h3>
                <p className="text-sm sm:text-base text-[#A8A29E] leading-relaxed max-w-2xl">
                  Traditional astrology is often weighed down by dogma, superstition, or deterministic anxiety. At Pravaah, we honor your agency. Your birth coordinates are not a fixed verdict of destiny, but a contemplative mirror revealing recurring harmonic wavelengths, latent strengths, and energetic seasons.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className={`reveal delay-${(idx + 1) * 100} group relative p-7 sm:p-8 rounded-2xl bg-[#1C1917] border border-[#292524] hover:border-opacity-60 transition-all duration-500 overflow-hidden cursor-default`}
              style={{ "--hover-border": pillar.color } as React.CSSProperties}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${pillar.color}40`;
                e.currentTarget.style.boxShadow = `0 0 30px ${pillar.glow}, 0 20px 60px rgba(0,0,0,0.3)`;
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#292524";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Ambient corner glow */}
              <div
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ background: pillar.glow }}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-12 h-12 rounded-xl bg-[#221F1E] border border-[#292524] flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                    style={{ boxShadow: `0 0 20px ${pillar.glow}` }}
                  >
                    {pillar.icon}
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-[#221F1E] border border-[#292524] text-[#A8A29E]">
                    {pillar.tag}
                  </span>
                </div>

                <h4 className="font-display text-xl font-medium text-[#FAFAF9] mb-1 group-hover:text-[#FEF08A] transition-colors duration-300">
                  {pillar.title}
                </h4>
                <p className="text-xs font-semibold mb-3" style={{ color: pillar.color }}>
                  {pillar.subtitle}
                </p>
                <p className="text-sm text-[#A8A29E] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="reveal delay-500 mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-[#292524] rounded-2xl overflow-hidden">
          {[
            { value: "5000+", label: "Soul Maps Generated", color: "#F97316" },
            { value: "99.8%", label: "Astronomical Accuracy", color: "#FACC15" },
            { value: "0", label: "Ads / Trackers", color: "#EF4444" },
            { value: "∞", label: "Sacred Reflection", color: "#FAFAF9" },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#1C1917] p-6 sm:p-8 text-center group hover:bg-[#221F1E] transition-colors">
              <div className="font-display text-3xl sm:text-4xl font-bold mb-2 transition-colors group-hover:scale-105 inline-block" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-xs text-[#78716C] leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
