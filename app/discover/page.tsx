"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Compass,
  Sparkles,
  Star,
  Sun,
  Moon,
  Shield,
  Heart,
  Briefcase,
  Layers,
  Printer,
  RefreshCw,
  Calendar,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { HomeNavbar } from "../../components";
import DiyaFlame from "../../components/DiyaFlame";
import type { FullReading } from "../../libs/generateFullReading";

const PLANET_NAMES_SANSKRIT: Record<string, string> = {
  sun: "Surya (Sun)",
  moon: "Chandra (Moon)",
  mars: "Mangal (Mars)",
  mercury: "Budh (Mercury)",
  jupiter: "Guru / Brihaspati (Jupiter)",
  venus: "Shukra (Venus)",
  saturn: "Shani (Saturn)",
  rahu: "Rahu (North Node)",
  ketu: "Ketu (South Node)",
};

const PLANET_SYMBOLS: Record<string, string> = {
  sun: "☉",
  moon: "☽",
  mars: "♂",
  mercury: "☿",
  jupiter: "♃",
  venus: "♀",
  saturn: "♄",
  rahu: "☊",
  ketu: "☋",
};

export default function DiscoverPage() {
  const [reading, setReading] = useState<FullReading | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const sessionData = sessionStorage.getItem("latestReading");
      const localData = localStorage.getItem("latestReading");
      const raw = sessionData || localData;
      if (raw) {
        setReading(JSON.parse(raw) as FullReading);
      }
    } catch {
      // ignore parse errors
    } finally {
      setIsHydrated(true);
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-[#0C0A09] text-[#FAFAF9] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-[#F97316] border-t-transparent animate-spin" />
          <p className="text-sm font-medium text-[#A8A29E] tracking-wider uppercase">
            Opening your sacred archive...
          </p>
        </div>
      </div>
    );
  }

  if (!reading) {
    return (
      <div className="min-h-screen bg-[#0C0A09] text-[#FAFAF9]">
        <HomeNavbar />
        <main className="mx-auto max-w-xl px-4 py-20 text-center">
          <div className="rounded-3xl border border-[#292524] bg-[#151312] p-9 shadow-2xl backdrop-blur-xl">
            <div className="w-16 h-16 rounded-2xl bg-[#1C1917] border border-[#F97316]/30 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="h-8 w-8 text-[#FACC15]" />
            </div>
            <h1 className="font-display text-3xl font-medium text-[#FAFAF9]">
              No Soul Map Located Yet
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-[#A8A29E]">
              Enter your birth coordinates to generate your comprehensive Vedic reading.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/home"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#F97316] px-6 py-3.5 text-sm font-semibold text-[#0C0A09] flame-cta-glow hover:bg-[#FB923C] transition-all"
              >
                <span>Enter Birth Coordinates</span>
              </Link>
              <Link
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-[#292524] bg-[#1C1917] px-6 py-3.5 text-sm font-medium text-[#A8A29E] hover:text-[#FAFAF9] transition-all"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Return to Landing</span>
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const { calculated, interpretation, input } = reading;
  const planets = calculated?.jyotish?.planets;

  return (
    <div className="min-h-screen bg-[#0C0A09] text-[#FAFAF9] selection:bg-[#F97316]/30 selection:text-[#FEF08A]">
      <HomeNavbar />

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 space-y-10">

        {/* ── TOP HERO HEADER ALTAR ── */}
        <header className="relative rounded-3xl border border-[#292524] bg-[#151312]/90 p-6 sm:p-10 shadow-2xl overflow-hidden card-ambient-light">
          {/* Ambient decorative elements */}
          <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-[#F97316]/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-72 h-36 bg-[#FACC15]/5 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1C1917] border border-[#F97316]/30">
                <DiyaFlame size="sm" showBase={false} showHalo={false} />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F97316]">
                  Vedic Dossier · Active Alignment
                </span>
              </div>

              <h1 className="font-display text-3xl sm:text-5xl font-medium tracking-tight text-[#FAFAF9]">
                {interpretation.profile.name}
              </h1>

              <p className="text-sm text-[#A8A29E] leading-relaxed max-w-2xl">
                {interpretation.profile.birthSummary}
              </p>

              {/* Coordinates Pill Badges */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#F97316]/40 bg-[#F97316]/10 px-3 py-1 text-xs font-semibold text-[#F97316]">
                  <Sun className="h-3.5 w-3.5" />
                  Mulank (Driver): {calculated.numerology.mulank}
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#FACC15]/40 bg-[#FACC15]/10 px-3 py-1 text-xs font-semibold text-[#FACC15]">
                  <Star className="h-3.5 w-3.5" />
                  Bhagyank (Destiny): {calculated.numerology.bhagyank}
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#292524] bg-[#1C1917] px-3 py-1 text-xs font-medium text-[#E8E1DF]">
                  <Compass className="h-3.5 w-3.5 text-[#F97316]" />
                  Ascendant: {calculated.jyotish.ascendant.rashi} (
                  {calculated.jyotish.ascendant.nakshatra} Pada {calculated.jyotish.ascendant.pada})
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#292524] bg-[#1C1917] px-3 py-1 text-xs font-medium text-[#78716C]">
                  {calculated.resolvedPlace}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-row md:flex-col gap-2 shrink-0">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#292524] bg-[#1C1917] px-4 py-2.5 text-xs font-medium text-[#FAFAF9] hover:bg-[#221F1E] hover:border-[#F97316]/40 transition-all cursor-pointer"
              >
                <Printer className="h-3.5 w-3.5 text-[#FACC15]" />
                <span>Print Dossier</span>
              </button>

              <Link
                href="/home"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F97316] px-4 py-2.5 text-xs font-semibold text-[#0C0A09] hover:bg-[#FB923C] transition-all"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>New Reading</span>
              </Link>
            </div>
          </div>
        </header>

        {/* ── SECTION 1: NUMEROLOGY HARMONICS ── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#F97316]" />
            <h2 className="font-display text-xl sm:text-2xl font-medium text-[#FAFAF9]">
              Sacred Numerological Blueprint
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {/* Mulank Card */}
            <div className="rounded-3xl border border-[#292524] bg-[#151312] p-6 sm:p-7 relative overflow-hidden group hover:border-[#F97316]/40 transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#F97316]">
                  Soul Core · Root Vibrational Archetype
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F97316]/15 text-lg font-bold text-[#F97316] border border-[#F97316]/30">
                  {calculated.numerology.mulank}
                </span>
              </div>
              <h3 className="font-display text-lg font-medium text-[#FAFAF9] mb-2">
                Driver Number (Mulank {calculated.numerology.mulank})
              </h3>
              <p className="text-sm text-[#A8A29E] leading-relaxed">
                {interpretation.numerology.mulankInterpretation}
              </p>
            </div>

            {/* Bhagyank Card */}
            <div className="rounded-3xl border border-[#292524] bg-[#151312] p-6 sm:p-7 relative overflow-hidden group hover:border-[#FACC15]/40 transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#FACC15]">
                  Life Path · Destiny Vector
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FACC15]/15 text-lg font-bold text-[#FACC15] border border-[#FACC15]/30">
                  {calculated.numerology.bhagyank}
                </span>
              </div>
              <h3 className="font-display text-lg font-medium text-[#FAFAF9] mb-2">
                Destiny Number (Bhagyank {calculated.numerology.bhagyank})
              </h3>
              <p className="text-sm text-[#A8A29E] leading-relaxed">
                {interpretation.numerology.bhagyankInterpretation}
              </p>
            </div>
          </div>

          {/* Combined Harmonic Card */}
          <div className="rounded-3xl border border-[#292524] bg-[#1C1917]/70 p-6 sm:p-7">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#E8E1DF] mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#FACC15]" />
              Numerological Harmonic Synergy
            </h4>
            <p className="text-sm text-[#A8A29E] leading-relaxed">
              {interpretation.numerology.combinedInsight}
            </p>
          </div>
        </section>

        {/* ── SECTION 2: JYOTISH CELESTIAL ALIGNMENT ── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#FACC15]" />
            <h2 className="font-display text-xl sm:text-2xl font-medium text-[#FAFAF9]">
              Vedic Jyotish & Planetary Ephemeris
            </h2>
          </div>

          <div className="rounded-3xl border border-[#292524] bg-[#151312] p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="font-display text-lg font-medium text-[#FAFAF9] mb-2">
                Lagna (Ascendant) & Cosmic Horizon
              </h3>
              <p className="text-sm text-[#A8A29E] leading-relaxed">
                {interpretation.jyotish.overview}
              </p>
            </div>

            {/* Planetary Positions Table */}
            {planets && (
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-[#78716C] mb-3">
                  Sidereal Planetary Coordinates (Lahiri Ayanamsa)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {Object.entries(planets).map(([key, p]) => (
                    <div
                      key={key}
                      className="rounded-2xl border border-[#292524] bg-[#1C1917] p-3.5 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base font-serif text-[#F97316]">
                          {PLANET_SYMBOLS[key] || "✦"}
                        </span>
                        <div>
                          <p className="text-xs font-semibold text-[#FAFAF9]">
                            {PLANET_NAMES_SANSKRIT[key] || key}
                          </p>
                          <p className="text-[11px] text-[#A8A29E]">
                            {p.rashi} · {p.degreeInSign.toFixed(1)}°
                          </p>
                        </div>
                      </div>
                      <div className="text-right text-[10px] text-[#78716C]">
                        <p>{p.nakshatra}</p>
                        <p>Pada {p.pada}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Jyotish Observations */}
            <div className="border-t border-[#292524] pt-5">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-[#E8E1DF] mb-3">
                Key Astrological Observations
              </h4>
              <ul className="space-y-2">
                {interpretation.jyotish.observations.map((obs, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[#A8A29E]">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FACC15]" />
                    <span>{obs}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── SECTION 3: PERSONALITY & TEMPERAMENT ── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#EF4444]" />
            <h2 className="font-display text-xl sm:text-2xl font-medium text-[#FAFAF9]">
              Personality & Soul Temperament
            </h2>
          </div>

          <div className="rounded-3xl border border-[#292524] bg-[#151312] p-6 sm:p-8 space-y-6">
            <p className="text-sm leading-relaxed text-[#A8A29E]">
              {interpretation.personality.overview}
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Strengths */}
              <div className="rounded-2xl border border-[#F97316]/20 bg-[#1C1917] p-5">
                <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#F97316] mb-3">
                  <CheckCircle2 className="h-4 w-4" /> Core Innate Strengths
                </h3>
                <ul className="space-y-2.5">
                  {interpretation.personality.strengths.map((str, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#E8E1DF]">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F97316]" />
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Challenges */}
              <div className="rounded-2xl border border-[#292524] bg-[#1C1917] p-5">
                <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#A8A29E] mb-3">
                  <AlertCircle className="h-4 w-4 text-[#FACC15]" /> Latent Growth Edges
                </h3>
                <ul className="space-y-2.5">
                  {interpretation.personality.challenges.map((ch, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#A8A29E]">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FACC15]" />
                      <span>{ch}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 4: CAREER & DHARMA + RELATIONSHIPS ── */}
        <section className="grid gap-6 md:grid-cols-2">
          {/* Career */}
          <div className="rounded-3xl border border-[#292524] bg-[#151312] p-6 sm:p-8 space-y-4">
            <h3 className="flex items-center gap-2 font-display text-xl font-medium text-[#FAFAF9]">
              <Briefcase className="h-5 w-5 text-[#F97316]" />
              Dharma & Vocational Calling
            </h3>
            <p className="text-sm text-[#A8A29E] leading-relaxed">
              {interpretation.career.workStyle}
            </p>
            <div className="border-t border-[#292524] pt-4">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-[#78716C] mb-2">
                Auspicious Vocational Fields
              </h4>
              <ul className="space-y-2">
                {interpretation.career.tendencies.map((tend, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#E8E1DF]">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F97316]" />
                    <span>{tend}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Relationships */}
          <div className="rounded-3xl border border-[#292524] bg-[#151312] p-6 sm:p-8 space-y-4">
            <h3 className="flex items-center gap-2 font-display text-xl font-medium text-[#FAFAF9]">
              <Heart className="h-5 w-5 text-[#EF4444]" />
              Relational Harmonics
            </h3>
            <p className="text-sm text-[#A8A29E] leading-relaxed">
              {interpretation.relationships.communicationStyle}
            </p>
            <div className="border-t border-[#292524] pt-4">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-[#78716C] mb-2">
                Connection Dynamics
              </h4>
              <ul className="space-y-2">
                {interpretation.relationships.tendencies.map((rel, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#E8E1DF]">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#EF4444]" />
                    <span>{rel}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── SECTION 5: AUSPICIOUS ASSOCIATIONS & SOUL SADHANA ── */}
        <section className="rounded-3xl border border-[#292524] bg-[#151312] p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#292524] pb-5">
            <div>
              <h3 className="font-display text-xl font-medium text-[#FAFAF9]">
                Traditional Sacred Associations
              </h3>
              <p className="text-xs text-[#78716C] mt-0.5">
                Vedic rhythmic alignments for heightened clarity and flow
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="rounded-full bg-[#1C1917] border border-[#292524] px-3.5 py-1 text-[#FACC15]">
                Numbers: {interpretation.traditionalAssociations.numbers.join(", ")}
              </span>
              <span className="rounded-full bg-[#1C1917] border border-[#292524] px-3.5 py-1 text-[#F97316]">
                Days: {interpretation.traditionalAssociations.days.join(", ")}
              </span>
            </div>
          </div>

          {/* Growth Areas (Sadhana) */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#E8E1DF] mb-3">
              Soul Sadhana & Evolving Practices
            </h4>
            <div className="grid gap-3 sm:grid-cols-2">
              {interpretation.growthAreas.map((area, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-[#292524] bg-[#1C1917] p-4 flex items-start gap-3"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FACC15]/10 text-xs font-bold text-[#FACC15]">
                    {i + 1}
                  </span>
                  <span className="text-xs sm:text-sm text-[#A8A29E] leading-relaxed">{area}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Summary / Epilogue */}
          <div className="rounded-2xl border border-[#F97316]/30 bg-[#F97316]/5 p-5 text-center sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#F97316] mb-1">
              Sanctuary Reflection
            </p>
            <p className="text-sm italic text-[#FAFAF9] leading-relaxed">
              "{interpretation.summary}"
            </p>
          </div>
        </section>

        {/* ── FOOTER CALLOUT ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#292524] text-xs text-[#78716C]">
          <Link
            href="/"
            className="inline-flex items-center gap-2 hover:text-[#FAFAF9] transition-colors"
          >
            <ArrowLeft className="h-4 w-4 text-[#F97316]" />
            <span>Return to Pravaah Landing Sanctuary</span>
          </Link>

          <Link
            href="/home"
            className="inline-flex items-center gap-2 text-[#F97316] hover:text-[#FB923C] font-semibold transition-colors"
          >
            <span>Explore Another Birth Chart</span>
            <RefreshCw className="h-3.5 w-3.5" />
          </Link>
        </div>

      </main>
    </div>
  );
}
