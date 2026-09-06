import { NumerologyResult } from "../numerology";
import { JyotishResult } from "../jyotish";

export const SYSTEM_PROMPT = `You are a structured Numerology + Jyotish interpretation engine embedded in a web app. You are NOT a general chatbot.

RULES YOU MUST FOLLOW EXACTLY:
1. You will be given ALREADY-CALCULATED numerology numbers and jyotish (Vedic astrology) positions. Never recalculate, question, or change these numbers — treat them as ground truth.
2. Never invent birth information that was not provided.
3. Never claim absolute certainty. Frame numerology and jyotish as traditional, interpretive systems for reflection — not scientifically validated predictions.
4. Never make definitive statements about death, serious illness, accidents, or other catastrophic events.
5. Return ONLY valid JSON matching the exact schema you are given. No prose before or after. No markdown code fences.
6. Every field must be filled with genuinely specific, personalized interpretation — not generic filler.
7. Keep each string field concise: 1-3 sentences unless it's an array (then each item is a short phrase).`;

export function buildUserPrompt(input: {
  name: string;
  dob: string;
  time: string;
  place: string;
  numerology: NumerologyResult;
  jyotish: JyotishResult;
}) {
  const { name, dob, time, place, numerology, jyotish } = input;

  const payload = {
    user: { name },
    birth: { date: dob, time, place },
    numerology: {
      mulank: numerology.mulank,
      bhagyank: numerology.bhagyank,
    },
    jyotish: {
      ascendant: { rashi: jyotish.ascendant.rashi, nakshatra: jyotish.ascendant.nakshatra, pada: jyotish.ascendant.pada },
      moon: { rashi: jyotish.planets.moon.rashi, nakshatra: jyotish.planets.moon.nakshatra, pada: jyotish.planets.moon.pada },
      sun: { rashi: jyotish.planets.sun.rashi },
      mars: { rashi: jyotish.planets.mars.rashi },
      mercury: { rashi: jyotish.planets.mercury.rashi },
      jupiter: { rashi: jyotish.planets.jupiter.rashi },
      venus: { rashi: jyotish.planets.venus.rashi },
      saturn: { rashi: jyotish.planets.saturn.rashi },
      rahu: { rashi: jyotish.planets.rahu.rashi },
      ketu: { rashi: jyotish.planets.ketu.rashi },
    },
  };

  return `Here is the calculated data for this person. Interpret it and return JSON matching this exact TypeScript shape:

interface Reading {
  profile: { name: string; birthSummary: string };
  numerology: {
    mulankInterpretation: string;
    bhagyankInterpretation: string;
    combinedInsight: string;
  };
  personality: { overview: string; strengths: string[]; challenges: string[] };
  career: { tendencies: string[]; workStyle: string };
  relationships: { tendencies: string[]; communicationStyle: string };
  jyotish: { overview: string; observations: string[] };
  traditionalAssociations: { numbers: number[]; days: string[] };
  growthAreas: string[];
  summary: string;
}

CALCULATED DATA:
${JSON.stringify(payload, null, 2)}`;
}