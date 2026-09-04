"use client";

import { useState } from "react";
import { ArrowRight, Calendar, Clock, MapPin, User } from "lucide-react";

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

  const update = (field: keyof BirthDetails, value: string) => {
    setDetails((current) => ({ ...current, [field]: value }));
  };

  const generateReading = async () => {
    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsGenerating(false);
  };

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
      <div className="mb-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">
          Sanctuary Records
        </p>
        <h1 className="font-display text-3xl font-medium text-stone-100 sm:text-4xl">
          Where did your journey begin?
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-stone-400">
          Add your birth details to prepare your personal celestial reading.
        </p>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          void generateReading();
        }}
        className="space-y-5 rounded-2xl border border-stone-800 bg-stone-900/60 p-6 sm:p-8"
      >
        <label className="block">
          <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-stone-400">
            <User className="h-4 w-4 text-orange-500" /> Full name
          </span>
          <input
            required
            value={details.fullName}
            onChange={(event) => update("fullName", event.target.value)}
            className="w-full rounded-lg bg-stone-950 px-4 py-3 text-stone-100 outline-none ring-orange-500 transition focus:ring-1"
            placeholder="Enter your full name"
          />
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-stone-400">
              <Calendar className="h-4 w-4 text-orange-500" /> Date of birth
            </span>
            <input
              required
              type="date"
              value={details.dateOfBirth}
              onChange={(event) => update("dateOfBirth", event.target.value)}
              className="w-full rounded-lg bg-stone-950 px-4 py-3 text-stone-100 outline-none ring-orange-500 transition focus:ring-1 scheme-dark"
            />
          </label>

          <label className="block">
            <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-stone-400">
              <Clock className="h-4 w-4 text-orange-500" /> Time of birth
            </span>
            <input
              required
              type="time"
              value={details.timeOfBirth}
              onChange={(event) => update("timeOfBirth", event.target.value)}
              className="w-full rounded-lg bg-stone-950 px-4 py-3 text-stone-100 outline-none ring-orange-500 transition focus:ring-1 scheme-dark"
            />
          </label>
        </div>

        <label className="block">
          <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-stone-400">
            <MapPin className="h-4 w-4 text-orange-500" /> Place of birth
          </span>
          <input
            required
            value={details.placeOfBirth}
            onChange={(event) => update("placeOfBirth", event.target.value)}
            className="w-full rounded-lg bg-stone-950 px-4 py-3 text-stone-100 outline-none ring-orange-500 transition focus:ring-1"
            placeholder="City, state, country"
          />
        </label>

        <button
          type="submit"
          disabled={isGenerating}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-4 text-sm font-bold text-white transition hover:bg-orange-400 disabled:cursor-wait disabled:opacity-70"
        >
          {isGenerating ? "Aligning celestial spheres..." : "Generate my reading"}
          {!isGenerating && <ArrowRight className="h-4 w-4" />}
        </button>
      </form>
    </main>
  );
}
