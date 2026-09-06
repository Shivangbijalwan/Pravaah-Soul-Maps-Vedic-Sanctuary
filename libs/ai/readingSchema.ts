/**
 * Validates the shape of what Gemini returns before your app trusts it.
 * This is the safety net that catches a malformed or incomplete AI response
 * BEFORE it reaches the database or the user's screen.
 *
 * npm install zod
 */

import { z } from "zod";

export const ReadingSchema = z.object({
  profile: z.object({
    name: z.string(),
    birthSummary: z.string(),
  }),
  numerology: z.object({
    mulankInterpretation: z.string(),
    bhagyankInterpretation: z.string(),
    combinedInsight: z.string(),
  }),
  personality: z.object({
    overview: z.string(),
    strengths: z.array(z.string()).min(1),
    challenges: z.array(z.string()).min(1),
  }),
  career: z.object({
    tendencies: z.array(z.string()).min(1),
    workStyle: z.string(),
  }),
  relationships: z.object({
    tendencies: z.array(z.string()).min(1),
    communicationStyle: z.string(),
  }),
  jyotish: z.object({
    overview: z.string(),
    observations: z.array(z.string()).min(1),
  }),
  traditionalAssociations: z.object({
    numbers: z.array(z.number()),
    days: z.array(z.string()),
  }),
  growthAreas: z.array(z.string()).min(1),
  summary: z.string(),
});

export type Reading = z.infer<typeof ReadingSchema>;