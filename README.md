# Pravaah — Numerology & Jyotish Soul Maps

A personal-insight web portal where a signed-in user enters their birth details (date, time, and place of birth) and receives a structured, personalized **Numerology + Jyotish (Vedic astrology)** reading — calculated deterministically in code and interpreted by an AI, never the other way around.

---

## Table of Contents

- [How It Works](#how-it-works)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Data Flow](#data-flow)
- [Getting Started (Local Development)](#getting-started-local-development)
- [Environment Variables](#environment-variables)
- [Deployment (Vercel)](#deployment-vercel)
- [AI Provider Fallback](#ai-provider-fallback)
- [Known Limitations](#known-limitations)
- [Troubleshooting](#troubleshooting)
- [Disclaimer](#disclaimer)

---

## How It Works

1. A user signs in via **Clerk**.
2. They fill in a birth details form: full name, date of birth, time of birth, and place of birth.
3. The app calculates their **numerology numbers** (mulank, bhagyank) and full **Jyotish chart** (ascendant, all 9 planets — rashi, nakshatra, pada) using deterministic code. No AI is involved in this step.
4. Only the *calculated numbers* — never raw guesses — are sent to an AI model, which interprets them into a structured, readable report following a strict, fixed JSON schema.
5. The AI's response is validated against that schema before being trusted. If it doesn't match, the app retries once automatically.
6. The reading is shown on `/discover` in the same fixed layout for every user — only the content inside each section differs.

The core rule this project is built around:

```
User data → Calculations (code) → Verified structured data → AI interpretation → Structured JSON → UI
```

**Never:** `User data → AI → "please calculate everything"`. Letting an AI do astronomical or numerological math invites wrong numbers. This app never does that.

---

## Tech Stack

| Layer | Tool | Notes |
|---|---|---|
| Framework | Next.js (App Router, Turbopack) | Deployed on Vercel |
| Styling | Tailwind CSS v4 | Dark, premium visual theme |
| Auth | Clerk | Uses Clerk's current API (`Show`, `useAuth`, `useClerk`) — **not** the deprecated `SignedIn`/`SignedOut` components |
| Numerology | Hand-written digit-reduction functions | No library needed, fully deterministic |
| Jyotish | [`ephemeris`](https://www.npmjs.com/package/ephemeris) (pure JS, Moshier algorithm) | Tropical planetary longitudes converted to sidereal via a Lahiri ayanamsa approximation |
| Geocoding | [Nominatim](https://nominatim.openstreetmap.org) (OpenStreetMap) | Free, no API key, place name → lat/lng |
| Timezone | [`geo-tz`](https://www.npmjs.com/package/geo-tz) + [`luxon`](https://www.npmjs.com/package/luxon) | Resolves coordinates to an IANA timezone and converts local birth time to UTC, respecting historical DST rules |
| AI (primary) | Google Gemini API (free tier) | Server-only, structured JSON output |
| AI (fallback) | Groq API (free tier) | Automatically used if Gemini returns a 429 (quota) error |
| Validation | [`zod`](https://www.npmjs.com/package/zod) | Validates every AI response against a strict schema before trusting it |

Everything runs on free tiers — no paid services required to run this project end to end.

---

## Project Structure

```
app/
  page.tsx                     Home/landing page — composes Navbar, Hero, About, etc.
                                Has the "Discover Your Reading" button.
  discover/
    page.tsx                   Renders one FullReading in a fixed template,
                                identical layout for every user.
  api/
    reading/
      route.ts                 POST endpoint — the ONLY place the AI is called from.
                                Requires a signed-in Clerk user.

components/
  Navbar.tsx                   Sticky header. Exports:
                                - Navbar: nav links, responsive mobile menu,
                                  Clerk auth buttons + profile dropdown
                                - AuthShowcase: larger dedicated auth card
                                  for the landing page body
                                Both read Clerk auth state internally
                                (no auth props needed from parent pages).

lib/
  numerology.ts                getMulank(), getBhagyank(), getNumerology()
                                Pure digit-reduction math. No network calls.

  geocode.ts                   geocodePlace() — place name → {lat, lng, displayName}
                                via Nominatim.

  timezone.ts                  getTimezoneName() — coordinates → IANA timezone.
                                toUtcDate() — local birth date+time → correct UTC Date,
                                accounting for historical DST via Luxon.

  jyotish.ts                   calculateJyotish() — the Vedic astrology engine.
                                Computes ascendant + all planets' sidereal
                                longitude, rashi, nakshatra, and pada.

  generateFullReading.ts       The orchestrator. Takes {name, dob, time, place},
                                runs numerology + geocoding + timezone + jyotish,
                                sends the results to the AI, validates the
                                response, and returns one fixed-shape
                                FullReading object.

  ai/
    promptSchema.ts            SYSTEM_PROMPT (AI's rules of engagement) and
                                buildUserPrompt() (packages calculated data +
                                required JSON shape for the AI).
    gemini.ts                  Calls the Gemini API. Server-only.
    groq.ts                    Calls the Groq API (fallback provider). Server-only.
    callAIForReading.ts        Tries Gemini first, falls back to Groq automatically
                                on a 429 quota error only.
    readingSchema.ts           Zod schema the AI's JSON response must match.

hooks/
  useGenerateReading.ts        Client-side hook wrapping the fetch call to
                                /api/reading — exposes {data, loading, error,
                                generateReading}.
```

---

## Data Flow

```
User submits birth form (name, dob, time, place)
        │
        ▼
POST /api/reading  (requires signed-in Clerk user)
        │
        ▼
generateFullReading()
        │
        ├─► getNumerology(dob)              → mulank, bhagyank
        ├─► geocodePlace(place)             → lat, lng
        ├─► getTimezoneName(lat, lng)       → IANA timezone
        ├─► toUtcDate(dob, time, tz)        → correct UTC birth moment
        ├─► calculateJyotish(utcDate, ...)  → ascendant + 9 planets
        │
        ▼
buildUserPrompt(calculated data)  →  callAIForReading()
        │                                │
        │                    ┌───────────┴───────────┐
        │                    ▼                       ▼
        │                 Gemini                   Groq (fallback,
        │              (primary)                  only on 429)
        │                    │                       │
        │                    └───────────┬───────────┘
        ▼                                ▼
                     AI's JSON response
                                │
                                ▼
                  Validate against ReadingSchema (zod)
                     │                        │
                  valid                    invalid
                     │                        │
                     ▼                        ▼
                 Return it          Retry once with a
                                    stricter reminder,
                                    then validate again
                                │
                                ▼
              FullReading JSON returned to client
                                │
                                ▼
        Saved to sessionStorage, user routed to /discover
                                │
                                ▼
              Rendered in the fixed template
```

---

## Getting Started (Local Development)

```bash
# 1. Install dependencies
npm install
npm install ephemeris geo-tz luxon zod

# 2. Set up environment variables (see below)
cp .env.example .env.local   # or create .env.local manually

# 3. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

Create `.env.local` in the project root:

```bash
# Clerk (get from dashboard.clerk.com/last-active?path=api-keys)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Gemini — primary AI provider (get from aistudio.google.com)
GEMINI_API_KEY=your_gemini_key
GEMINI_MODEL=gemini-flash-latest   # optional override

# Groq — fallback AI provider, used only when Gemini hits its quota
# (get from console.groq.com)
GROQ_API_KEY=your_groq_key
GROQ_MODEL=openai/gpt-oss-20b      # optional override
```

**Never** commit `.env.local` — confirm it's listed in `.gitignore`. All keys above are read only in server-side files (API routes) and are never exposed to the browser.

When deploying, add the same variables in **Vercel → Project Settings → Environment Variables**, with the **Production** environment checked (not just Preview).

---

## Deployment (Vercel)

1. Push the repo to GitHub.
2. Import it into Vercel.
3. Add all environment variables listed above under Production.
4. Deploy — Vercel auto-builds on every push to `main`.
5. `ephemeris`, `geo-tz`, `luxon`, and `zod` are all pure JavaScript with no native/compiled dependencies, so they run cleanly on Vercel's serverless functions without any special configuration.

---

## AI Provider Fallback

`lib/ai/callAIForReading.ts` tries **Gemini** first. If Gemini specifically returns an HTTP 429 (quota/rate limit) error, it automatically retries the same request with **Groq** instead of failing. Any other kind of error (bad request, invalid key, malformed prompt) is *not* retried on a different provider — it's surfaced immediately, since switching providers won't fix a real bug.

Free-tier model IDs on both providers change periodically as providers retire older models. If you see a `model_not_found` or similar error:
- **Gemini:** check [ai.google.dev/gemini-api/docs/models](https://ai.google.dev/gemini-api/docs/models) and update `GEMINI_MODEL`.
- **Groq:** check [console.groq.com/docs/deprecations](https://console.groq.com/docs/deprecations) and update `GROQ_MODEL`.

Both are environment variables, so no code changes are needed when a model is retired.

---

## Known Limitations

- **No database yet.** Readings are currently held only in `sessionStorage` on the client — a page refresh loses the current reading, and there's no reading history. Adding Postgres (Neon/Supabase, both free tier) + Prisma is the natural next step.
- **Jyotish precision is approximate, not observatory-grade.** The Lahiri ayanamsa and ascendant calculations use standard approximation formulas, accurate enough to correctly place planets in the right sign/nakshatra, but not to arc-second precision. For professional-grade accuracy, swap in the Swiss Ephemeris (`sweph` npm package), which requires bundling ephemeris data files.
- **No caching.** The same person requesting a reading twice currently triggers two separate AI calls, which is wasteful — adding a cache (e.g., Vercel KV / Upstash Redis, keyed by a hash of the birth details) would meaningfully cut AI usage.
- **Geocoding rate limits.** Nominatim's usage policy asks for roughly 1 request/second; fine for this app's volume, but don't batch-geocode many readings in a tight loop.

---

## Troubleshooting

**"Missing publishableKey" (Clerk):** Confirm `.env.local` has `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (the `NEXT_PUBLIC_` prefix is required for browser-side Clerk code), and restart the dev server — Next.js only reads env files on startup.

**"Parsing CSS source code failed" on `globals.css`:** Usually a UTF-8 BOM at the very start of the file. Re-save the file as UTF-8 *without* BOM and clear `.next` before rebuilding.

**"Gemini quota reached and fallback failed" with a `model_not_found` error:** The Groq model ID was deprecated — see [AI Provider Fallback](#ai-provider-fallback) above.

**AI response fails schema validation repeatedly:** Check `lib/ai/promptSchema.ts`'s `SYSTEM_PROMPT` is being sent correctly, and confirm `generationConfig.responseMimeType` is set to `"application/json"` in `gemini.ts` / `response_format` in `groq.ts`.

---

## Disclaimer

Numerology and Jyotish interpretations are traditional systems intended for personal reflection and entertainment. They are not scientifically validated predictions and should not be treated as a substitute for professional medical, legal, or financial advice.
