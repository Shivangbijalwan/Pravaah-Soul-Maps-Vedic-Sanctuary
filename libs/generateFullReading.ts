import { geocodePlace } from "./geocode";
import { calculateJyotish, type JyotishResult } from "./jyotish";
import { getNumerology, type NumerologyResult } from "./numerology";
import { callGeminiForReading } from "./ai/gemini";
import { buildUserPrompt, SYSTEM_PROMPT } from "./ai/promptSchema";
import { ReadingSchema, type Reading } from "./ai/readingSchema";
import { getTimezoneName, toUtcDate } from "./timezone";

export interface UserBirthInput {
  name: string;
  dob: string;
  time: string;
  place: string;
}

export interface FullReading {
  input: UserBirthInput;
  calculated: {
    numerology: NumerologyResult;
    jyotish: JyotishResult;
    resolvedPlace: string;
    timezoneName: string;
  };
  interpretation: Reading;
  meta: { generatedAt: string };
}

export async function generateFullReading(input: UserBirthInput): Promise<FullReading> {
  const { name, dob, time, place } = input;

  if (!name || !dob || !time || !place) {
    throw new Error("Missing required fields: name, dob, time, place.");
  }

  const numerology = getNumerology(dob);
  const geo = await geocodePlace(place);
  const timezoneName = getTimezoneName(geo.latitude, geo.longitude);
  const utcDate = toUtcDate(dob, time, timezoneName);
  const jyotish = await calculateJyotish(utcDate, geo.latitude, geo.longitude);
  const userPrompt = buildUserPrompt({ name, dob, time, place, numerology, jyotish });
  const interpretation = await getValidatedInterpretation(userPrompt);

  return {
    input,
    calculated: {
      numerology,
      jyotish,
      resolvedPlace: geo.displayName,
      timezoneName,
    },
    interpretation,
    meta: { generatedAt: new Date().toISOString() },
  };
}

async function getValidatedInterpretation(userPrompt: string): Promise<Reading> {
  const first = ReadingSchema.safeParse(parseJson(await callGeminiForReading(SYSTEM_PROMPT, userPrompt)));
  if (first.success) return first.data;

  const retryPrompt = `${userPrompt}\n\nReturn only the required JSON object with every field present.`;
  const retry = ReadingSchema.safeParse(
    parseJson(await callGeminiForReading(SYSTEM_PROMPT, retryPrompt))
  );
  if (retry.success) return retry.data;

  throw new Error("AI response did not match the expected format after retry.");
}

function parseJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    throw new Error("AI response was not valid JSON.");
  }
}
