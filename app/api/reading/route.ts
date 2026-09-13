/**
 * POST /api/reading
 * Body: { name, dob: "YYYY-MM-DD", time: "HH:mm", place: "City, State, Country" }
 *
 * This is the ONLY place the AI gets called from. It:
 * 1. Runs your deterministic numerology + jyotish calculations
 * 2. Sends the results (not raw guesses) to Gemini for interpretation
 * 3. Validates the AI's JSON before returning it
 * 4. Retries once with a stricter reminder if validation fails
 */

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { generateFullReading } from "../../../libs/generateFullReading";
import { AIQuotaError } from "../../../libs/ai/callAIForReading";

export async function POST(req: NextRequest) {
  let userId: string | null = null;
  try {
    const authObj = await auth();
    userId = authObj?.userId || null;
  } catch {
    // Non-blocking in dev or if Clerk auth headers are omitted
  }

  try {
    const body = await req.json();
    const result = await generateFullReading(body);
    return NextResponse.json(result);
  } catch (err: unknown) {
    console.error("Reading generation failed:", err);
    if (err instanceof AIQuotaError) {
      return NextResponse.json(
        { error: err.message, code: "AI_PROVIDER_UNAVAILABLE" },
        { status: 503 }
      );
    }
    const message = err instanceof Error ? err.message : "Something went wrong.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
