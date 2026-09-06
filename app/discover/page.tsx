"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Compass, Sparkles } from "lucide-react";
import { HomeNavbar } from "../../components";
import type { FullReading } from "../../libs/generateFullReading";

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-sm leading-relaxed text-stone-300">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function DiscoverPage() {
  const [reading] = useState<FullReading | null>(() => {
    if (typeof window === "undefined") return null;
    const stored = sessionStorage.getItem("latestReading");
    if (!stored) return null;
    try {
      return JSON.parse(stored) as FullReading;
    } catch {
      sessionStorage.removeItem("latestReading");
      return null;
    }
  });
  const missing = !reading;

  return (
    <div className="min-h-screen bg-abyss text-cream">
      <HomeNavbar />
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {missing && (
          <div className="mx-auto max-w-xl rounded-3xl border border-stone-800 bg-stone-900/70 p-8 text-center">
            <Sparkles className="mx-auto mb-4 h-8 w-8 text-orange-400" />
            <h1 className="font-display text-3xl text-stone-100">No reading found yet</h1>
            <p className="mt-3 text-sm leading-relaxed text-stone-400">Return to the landing page and generate your personal reading first.</p>
            <Link href="/" className="mt-6 inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-stone-950">
              <ArrowLeft className="h-4 w-4" /> Go back and begin
            </Link>
          </div>
        )}

        {reading && (
          <div className="space-y-8">
            <header className="rounded-3xl border border-stone-800 bg-stone-900/70 p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">Your soul map</p>
              <h1 className="mt-2 font-display text-4xl text-stone-100">{reading.interpretation.profile.name}</h1>
              <p className="mt-3 text-sm text-stone-400">{reading.interpretation.profile.birthSummary}</p>
              <div className="mt-5 flex flex-wrap gap-3 text-xs text-stone-400">
                <span className="rounded-full bg-stone-800 px-3 py-1">Mulank {reading.calculated.numerology.mulank}</span>
                <span className="rounded-full bg-stone-800 px-3 py-1">Bhagyank {reading.calculated.numerology.bhagyank}</span>
                <span className="rounded-full bg-stone-800 px-3 py-1">{reading.calculated.jyotish.ascendant.rashi} ascendant</span>
              </div>
            </header>

            <section className="grid gap-6 md:grid-cols-2">
              <article className="rounded-3xl border border-stone-800 bg-stone-900/60 p-6">
                <h2 className="mb-3 flex items-center gap-2 font-display text-2xl text-stone-100"><Compass className="h-5 w-5 text-orange-400" /> Personality</h2>
                <p className="mb-4 text-sm leading-relaxed text-stone-300">{reading.interpretation.personality.overview}</p>
                <List items={reading.interpretation.personality.strengths} />
              </article>
              <article className="rounded-3xl border border-stone-800 bg-stone-900/60 p-6">
                <h2 className="mb-3 font-display text-2xl text-stone-100">Growth areas</h2>
                <List items={reading.interpretation.growthAreas} />
                <p className="mt-4 text-sm leading-relaxed text-stone-400">{reading.interpretation.summary}</p>
              </article>
            </section>

            <section className="grid gap-6 md:grid-cols-2">
              <article className="rounded-3xl border border-stone-800 bg-stone-900/60 p-6">
                <h2 className="mb-3 font-display text-2xl text-stone-100">Career</h2>
                <p className="mb-4 text-sm text-stone-300">{reading.interpretation.career.workStyle}</p>
                <List items={reading.interpretation.career.tendencies} />
              </article>
              <article className="rounded-3xl border border-stone-800 bg-stone-900/60 p-6">
                <h2 className="mb-3 font-display text-2xl text-stone-100">Relationships</h2>
                <p className="mb-4 text-sm text-stone-300">{reading.interpretation.relationships.communicationStyle}</p>
                <List items={reading.interpretation.relationships.tendencies} />
              </article>
            </section>

            <section className="rounded-3xl border border-stone-800 bg-stone-900/60 p-6 sm:p-8">
              <h2 className="mb-3 font-display text-2xl text-stone-100">Jyotish perspective</h2>
              <p className="mb-4 text-sm leading-relaxed text-stone-300">{reading.interpretation.jyotish.overview}</p>
              <List items={reading.interpretation.jyotish.observations} />
              <p className="mt-5 text-xs text-stone-500">{reading.calculated.resolvedPlace} · {reading.calculated.timezoneName}</p>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
