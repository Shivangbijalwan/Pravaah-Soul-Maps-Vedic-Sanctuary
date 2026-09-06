"use client";

import React, { useState } from "react";
import { X, Calendar, Clock, MapPin, User, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

interface BirthCoordinatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitCoordinates: (data: {
    fullName: string;
    birthDate: string;
    birthTime: string;
    birthPlace: string;
  }) => Promise<void>;
}

export function BirthCoordinatesModal({
  isOpen,
  onClose,
  onSubmitCoordinates,
}: BirthCoordinatesModalProps) {
  const [fullName, setFullName] = useState("Aarav Varma");
  const [birthDate, setBirthDate] = useState("1995-10-24");
  const [birthTime, setBirthTime] = useState("06:45");
  const [birthPlace, setBirthPlace] = useState("Varanasi, India");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    void onSubmitCoordinates({ fullName, birthDate, birthTime, birthPlace })
      .then(onClose)
      .catch((submitError: unknown) => {
        setError(submitError instanceof Error ? submitError.message : "Unable to generate your reading.");
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-[#1C1917] border border-[#292524] shadow-[0_0_60px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Subtle top ember glow */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-32 bg-[radial-gradient(circle,rgba(249,115,22,0.2)_0%,transparent_70%)] pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#A8A29E] hover:text-[#FAFAF9] hover:bg-[#221F1E] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-[#221F1E] border border-[#F97316]/40 flex items-center justify-center text-[#FACC15] shadow-[0_0_15px_rgba(249,115,22,0.2)]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] tracking-[0.2em] font-semibold uppercase text-[#F97316]">
              Coordinates Sanctuary
            </span>
            <h3 className="font-display text-2xl font-medium text-[#FAFAF9]">
              Enter Birth Coordinates
            </h3>
          </div>
        </div>

        <p className="text-xs text-[#A8A29E] mb-6 leading-relaxed">
          Precise astronomical alignment enables accurate synthesis of foundational temperaments and cyclical rhythms.
        </p>

        {error && (
          <p role="alert" className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-medium text-[#E8E1DF] mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#FACC15]" />
              <span>Full Name or Preferred Identifier</span>
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Aarav Varma"
              className="w-full px-4 py-2.5 rounded-xl bg-[#151312] border border-[#292524] text-[#FAFAF9] placeholder-[#78716C] text-sm focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]/50 transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Birth Date */}
            <div>
              <label className="block text-xs font-medium text-[#E8E1DF] mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#F97316]" />
                <span>Date of Birth</span>
              </label>
              <input
                type="date"
                required
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#151312] border border-[#292524] text-[#FAFAF9] text-sm focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]/50 transition-all [color-scheme:dark]"
              />
            </div>

            {/* Birth Time */}
            <div>
              <label className="block text-xs font-medium text-[#E8E1DF] mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#FEF08A]" />
                <span>Exact Time</span>
              </label>
              <input
                type="time"
                required
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#151312] border border-[#292524] text-[#FAFAF9] text-sm focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]/50 transition-all [color-scheme:dark]"
              />
            </div>
          </div>

          {/* Place of Birth */}
          <div>
            <label className="block text-xs font-medium text-[#E8E1DF] mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#EF4444]" />
              <span>Place of Birth (City & Country)</span>
            </label>
            <input
              type="text"
              required
              value={birthPlace}
              onChange={(e) => setBirthPlace(e.target.value)}
              placeholder="City, State, Country"
              className="w-full px-4 py-2.5 rounded-xl bg-[#151312] border border-[#292524] text-[#FAFAF9] placeholder-[#78716C] text-sm focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]/50 transition-all"
            />
          </div>

          {/* Privacy Note */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-[#221F1E] border border-[#292524] text-[11px] text-[#A8A29E]">
            <ShieldCheck className="w-4 h-4 text-[#FACC15] shrink-0" />
            <span>Encrypted locally. Your planetary coordinates are never sold or rented.</span>
          </div>

          {/* Actions */}
          <div className="pt-3 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#A8A29E] hover:text-[#FAFAF9] hover:bg-[#221F1E] transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-full text-xs font-semibold bg-[#F97316] text-[#0C0A09] hover:bg-[#FB923C] transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(249,115,22,0.3)] disabled:opacity-50"
            >
              <span>{isSubmitting ? "Harmonizing..." : "Harmonize Chart"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BirthCoordinatesModal;

