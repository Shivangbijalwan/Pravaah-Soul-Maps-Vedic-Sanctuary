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

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  try {
    const body = await req.json();
    const result = await generateFullReading(body);
    return NextResponse.json(result);
  } catch (err: unknown) {
    console.error("Reading generation failed:", err);
    const message = err instanceof Error ? err.message : "Something went wrong.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
