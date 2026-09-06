"use client";

import React, { useEffect, useRef, useState } from "react";
import { Quote, Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "The reading described patterns I had never been able to articulate. It felt like someone had quietly observed me for years and then offered the most compassionate reflection.",
    name: "Ananya R.",
    role: "Architect, Bengaluru",
    sign: "♋ Cancer",
    stars: 5,
    color: "#F97316",
  },
  {
    quote: "Pravaah does not predict, it illuminates. The Vedic synthesis of my birth chart revealed tendencies I recognize deeply — without a single ounce of judgment.",
    name: "Vikram S.",
    role: "Writer & Musician, Mumbai",
    sign: "♑ Capricorn",
    stars: 5,
    color: "#FACC15",
  },
  {
    quote: "I was skeptical of astrology until Pravaah. The precision is remarkable. My temperament, my relational patterns — all articulated with language I had been searching for.",
    name: "Meera K.",
    role: "Therapist, Delhi",
    sign: "♍ Virgo",
    stars: 5,
    color: "#EF4444",
  },
  {
    quote: "The design alone is worth experiencing — like visiting a temple. The content? A mirror I did not know I needed. It has changed how I see my own cycles.",
    name: "Arjun P.",
    role: "Filmmaker, Chennai",
    sign: "♏ Scorpio",
    stars: 5,
    color: "#FAFAF9",
  },
  {
    quote: "Private, precise, and profoundly non-judgmental. Pravaah gave me a vocabulary for my inner experience that years of self-help books never could.",
    name: "Priya M.",
    role: "Researcher, Pune",
    sign: "♒ Aquarius",
    stars: 5,
    color: "#F97316",
  },
  {
    quote: "The mathematical precision behind each reading is astounding. My birth chart analysis captured subtleties about my personality that even close friends hadn't noticed.",
    name: "Rahul T.",
    role: "Engineer, Hyderabad",
    sign: "♉ Taurus",
    stars: 5,
    color: "#FACC15",
  },
];

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

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

  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-[#F97316]/5 blur-[100px]" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16 px-4">
          <div className="reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1C1917] border border-[#EF4444]/25 mb-6">
            <Star className="w-3.5 h-3.5 text-[#EF4444]" fill="#EF4444" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FAFAF9]">Seeker Reflections</span>
          </div>

          <h2 className="reveal delay-100 font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#FAFAF9] leading-[1.15] mb-4">
            Words from the{" "}
            <span className="italic font-normal text-gradient-flame">Sanctuary</span>
          </h2>
          <p className="reveal delay-200 text-base text-[#A8A29E] max-w-xl mx-auto">
            Seekers who have walked the path and found their reflection.
          </p>
        </div>

        {/* Marquee row 1 */}
        <div
          className="relative overflow-hidden mb-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            ref={trackRef}
            className="flex gap-4 w-max"
            style={{
              animation: `marquee 40s linear infinite`,
              animationPlayState: isPaused ? "paused" : "running",
            }}
          >
            {doubled.map((t, i) => (
              <div
                key={i}
                className="w-80 sm:w-96 flex-shrink-0 p-7 rounded-2xl bg-[#1C1917] border border-[#292524] hover:border-opacity-50 transition-all duration-300 group"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${t.color}40`;
                  e.currentTarget.style.boxShadow = `0 0 30px ${t.color}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#292524";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <Star key={si} className="w-3.5 h-3.5 text-[#FACC15]" fill="#FACC15" />
                  ))}
                </div>

                {/* Quote icon */}
                <Quote className="w-6 h-6 mb-3 opacity-30" style={{ color: t.color }} />

                <p className="text-sm text-[#A8A29E] leading-relaxed mb-6 italic">
                  &quot;{t.quote}&quot;
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-[#FAFAF9]">{t.name}</div>
                    <div className="text-xs text-[#78716C]">{t.role}</div>
                  </div>
                  <span className="text-lg" style={{ color: t.color }}>{t.sign}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0C0A09] to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0C0A09] to-transparent pointer-events-none z-10" />
        </div>

        {/* Marquee row 2 — reverse */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="flex gap-4 w-max"
            style={{
              animation: `marquee 50s linear infinite reverse`,
              animationPlayState: isPaused ? "paused" : "running",
            }}
          >
            {[...doubled].reverse().map((t, i) => (
              <div
                key={i}
                className="w-72 sm:w-80 flex-shrink-0 p-6 rounded-2xl bg-[#151312] border border-[#292524] transition-all duration-300"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${t.color}30`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#292524";
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xl" style={{ color: t.color }}>{t.sign}</span>
                  <div>
                    <div className="text-sm font-semibold text-[#FAFAF9]">{t.name}</div>
                    <div className="text-xs text-[#78716C]">{t.role}</div>
                  </div>
                </div>
                <p className="text-xs text-[#78716C] italic leading-relaxed line-clamp-3">&quot;{t.quote}&quot;</p>
              </div>
            ))}
          </div>

          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0C0A09] to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0C0A09] to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
