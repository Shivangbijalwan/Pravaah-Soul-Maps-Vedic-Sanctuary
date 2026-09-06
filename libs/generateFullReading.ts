/**
 * generateFullReading()
 * The one function that takes a real user's birth data and returns EVERYTHING
 * — calculated numerology, calculated jyotish, and the AI's interpretation —
 * in one fixed shape (`FullReading`). Every user gets exactly this structure;
 * only the values inside change based on their actual birth data.
 *
 * Call this from your API route, a server action, or anywhere server-side.
 * Never call it from client components — it needs server-side AI credentials.
 */

import { getNumerology, NumerologyResult } from "./numerology";
import { geocodePlace } from "./geocode";
import { getTimezoneName, toUtcDate } from "./timezone";
import { calculateJyotish, JyotishResult } from "./jyotish";
import { SYSTEM_PROMPT, buildUserPrompt } from "./ai/promptSchema";
import { callAIForReading } from "./ai/callAIForReading";
import { ReadingSchema, Reading } from "./ai/readingSchema";

export interface UserBirthInput {
  name: string;
  dob: string;   // "YYYY-MM-DD"
  time: string;  // "HH:mm", 24-hour, local to the birth place
  place: string; // e.g. "Dehradun, Uttarakhand, India"
}

/**
 * THE FIXED FORMAT — identical structure for every single user.
 * Only the values differ, driven entirely by their own birth data.
 */
export interface FullReading {
  input: UserBirthInput;

  calculated: {
    numerology: NumerologyResult;              // mulank, bhagyank
    jyotish: JyotishResult;                     // ascendant + all 9 planets, rashi/nakshatra/pada
    resolvedPlace: string;                      // full geocoded place name
    timezoneName: string;                       // IANA timezone used for the calculation
  };

  interpretation: Reading;                      // the AI's structured write-up, same schema always

  meta: {
    generatedAt: string;                        // ISO timestamp
  };
}

export async function generateFullReading(input: UserBirthInput): Promise<FullReading> {
  const { name, dob, time, place } = input;

  if (!name || !dob || !time || !place) {
    throw new Error("Missing required fields: name, dob, time, place.");
  }

  // 1. Numerology — pure math on the actual DOB provided
  const numerology = getNumerology(dob);

  // 2. Resolve the actual place into coordinates + timezone
  const geo = await geocodePlace(place);
  const timezoneName = getTimezoneName(geo.latitude, geo.longitude);
  const utcDate = toUtcDate(dob, time, timezoneName);

  // 3. Jyotish — planetary positions for this exact birth moment and location
  const jyotish = await calculateJyotish(utcDate, geo.latitude, geo.longitude);

  // 4. AI interprets THIS user's calculated numbers — never invents its own
  const userPrompt = buildUserPrompt({ name, dob, time, place, numerology, jyotish });
  const interpretation = await getValidatedInterpretation(userPrompt);

  // 5. Same shape, every time, for every user
  return {
    input,
    calculated: {
      numerology,
      jyotish,
      resolvedPlace: geo.displayName,
      timezoneName,
    },
    interpretation,
    meta: {
      generatedAt: new Date().toISOString(),
    },
  };
}

async function getValidatedInterpretation(userPrompt: string): Promise<Reading> {
  const rawText = await callAIForReading(SYSTEM_PROMPT, userPrompt);
  const result = ReadingSchema.safeParse(safeJsonParse(rawText));
  if (result.success) return result.data;

  // One retry with an explicit reminder — catches the occasional formatting slip
  const retryPrompt = `${userPrompt}\n\nYour previous response did not match the required schema exactly. Return ONLY the JSON object, with every field present, no extra commentary.`;
  const retryText = await callAIForReading(SYSTEM_PROMPT, retryPrompt);
  const retryResult = ReadingSchema.safeParse(safeJsonParse(retryText));
  if (retryResult.success) return retryResult.data;

  throw new Error("AI response did not match the expected format after retry: " + retryResult.error.message);
}

function safeJsonParse(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    throw new Error("AI response was not valid JSON: " + text.slice(0, 200));
  }
}