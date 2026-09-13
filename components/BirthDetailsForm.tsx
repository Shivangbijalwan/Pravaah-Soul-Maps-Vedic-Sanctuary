"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Calendar, Clock, MapPin, User, Sparkles, Shield, Compass } from "lucide-react";
import DiyaFlame from "./DiyaFlame";

interface BirthDetails {
  fullName: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
}

export default function BirthDetailsForm() {
  const [details, setDetails] = useState<BirthDetails>({
    fullName: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStep, setLoadingStep] = useState("Aligning celestial spheres...");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const update = (field: keyof BirthDetails, value: string) => {
    setDetails((current) => ({ ...current, [field]: value }));
  };

  const generateReading = async () => {
    setIsGenerating(true);
    setError(null);
    setLoadingStep("Computing Vedic planetary ephemeris...");

    const stepTimer = setTimeout(() => {
      setLoadingStep("Synthesizing AI soul-map interpretation...");
    }, 2500);

    try {
      const response = await fetch("/api/reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: details.fullName,
          dob: details.dateOfBirth,
          time: details.timeOfBirth,
          place: details.placeOfBirth,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to generate your reading.");
      }

      clearTimeout(stepTimer);
      sessionStorage.setItem("latestReading", JSON.stringify(result));
      try {
        localStorage.setItem("latestReading", JSON.stringify(result));
      } catch {
        // Storage fallback
      }

      setLoadingStep("Illuminating your dossier...");
      router.push("/discover");
    } catch (submitError: unknown) {
      clearTimeout(stepTimer);
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to generate your reading. Please verify your details."
      );
      setIsGenerating(false);
    }
  };

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6 sm:py-16">
      {/* Header */}
      <div className="mb-8 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C1917] border border-[#F97316]/30 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#FACC15]" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#F97316]">
            Sacred Birth Coordinates
          </span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-medium text-[#FAFAF9] tracking-tight">
          Where did your journey begin?
        </h1>
        <p className="mt-3 text-sm text-[#A8A29E] leading-relaxed">
          Enter your precise chronological coordinates. Our astronomical ephemeris and Vedic AI engine will calculate your authentic soul map.
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="mb-6 rounded-2xl border border-[#EF4444]/30 bg-[#EF4444]/10 p-4 text-sm text-[#FFB3AD] flex items-start gap-3"
        >
          <Shield className="w-5 h-5 text-[#EF4444] shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-[#FAFAF9]">Calculation Notice</p>
            <p className="mt-0.5 text-xs text-[#FFB3AD]">{error}</p>
          </div>
        </div>
      )}

      <form
        onSubmit={(event) => {
          event.preventDefault();
          void generateReading();
        }}
        className="space-y-6 rounded-3xl border border-[#292524] bg-[#151312]/90 p-6 sm:p-9 shadow-2xl relative overflow-hidden backdrop-blur-xl"
      >
        {/* Ambient card glow */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#F97316]/5 blur-3xl pointer-events-none" />

        {/* Full Name */}
        <label className="block">
          <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#A8A29E]">
            <User className="h-4 w-4 text-[#F97316]" /> Full Name
          </span>
          <input
            required
            value={details.fullName}
            onChange={(event) => update("fullName", event.target.value)}
            className="w-full rounded-xl border border-[#292524] bg-[#1C1917] px-4 py-3.5 text-[#FAFAF9] placeholder-[#78716C] outline-none transition focus:border-[#F97316]/60 focus:ring-1 focus:ring-[#F97316]/40"
            placeholder="e.g. Aarav Sharma"
          />
        </label>

        {/* Date and Time */}
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#A8A29E]">
              <Calendar className="h-4 w-4 text-[#FACC15]" /> Date of Birth
            </span>
            <input
              required
              type="date"
              value={details.dateOfBirth}
              onChange={(event) => update("dateOfBirth", event.target.value)}
              className="w-full rounded-xl border border-[#292524] bg-[#1C1917] px-4 py-3.5 text-[#FAFAF9] outline-none transition focus:border-[#FACC15]/60 focus:ring-1 focus:ring-[#FACC15]/40 scheme-dark"
            />
          </label>

          <label className="block">
            <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#A8A29E]">
              <Clock className="h-4 w-4 text-[#FACC15]" /> Time of Birth
            </span>
            <input
              required
              type="time"
              value={details.timeOfBirth}
              onChange={(event) => update("timeOfBirth", event.target.value)}
              className="w-full rounded-xl border border-[#292524] bg-[#1C1917] px-4 py-3.5 text-[#FAFAF9] outline-none transition focus:border-[#FACC15]/60 focus:ring-1 focus:ring-[#FACC15]/40 scheme-dark"
            />
          </label>
        </div>

        {/* Place of Birth */}
        <label className="block">
          <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#A8A29E]">
            <MapPin className="h-4 w-4 text-[#EF4444]" /> Place of Birth
          </span>
          <input
            required
            value={details.placeOfBirth}
            onChange={(event) => update("placeOfBirth", event.target.value)}
            className="w-full rounded-xl border border-[#292524] bg-[#1C1917] px-4 py-3.5 text-[#FAFAF9] placeholder-[#78716C] outline-none transition focus:border-[#EF4444]/60 focus:ring-1 focus:ring-[#EF4444]/40"
            placeholder="e.g. Dehradun, Uttarakhand, India"
          />
        </label>

        {/* Submit button requested by user */}
        <button
          type="submit"
          disabled={isGenerating}
          className="group relative flex w-full items-center justify-center gap-2.5 rounded-full bg-[#F97316] px-6 py-4 text-sm font-bold text-[#0C0A09] transition-all duration-300 hover:bg-[#FB923C] flame-cta-glow disabled:cursor-wait disabled:opacity-75 cursor-pointer"
        >
          {isGenerating ? (
            <div className="flex items-center gap-2.5">
              <div className="w-4 h-4 border-2 border-[#0C0A09] border-t-transparent rounded-full animate-spin" />
              <span>{loadingStep}</span>
            </div>
          ) : (
            <>
              <span>Generate My Reading</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>

        {/* Confidentiality note */}
        <div className="flex items-center justify-center gap-2 text-center text-[11px] text-[#78716C] pt-1">
          <Shield className="w-3.5 h-3.5 text-[#F97316]/70" />
          <span>Coordinates are processed with sovereign privacy · No ad tracking</span>
        </div>
      </form>
    </main>
  );
}
