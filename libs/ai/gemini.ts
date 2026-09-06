/**
 * Server-only call to the Gemini API's free tier.
 * NEVER import this file from a client component — GEMINI_API_KEY must stay
 * server-side only (set it in Vercel's environment variables).
 *
 * Model IDs on the free tier change fairly often (Google deprecates old ones
 * on a schedule). Set GEMINI_MODEL in your env vars so you can swap models
 * without a code change — check https://ai.google.dev/gemini-api/docs/models
 * if this ever 404s or starts returning deprecation warnings.
 */

const DEFAULT_MODEL = "gemini-flash-latest";

export async function callGeminiForReading(systemPrompt: string, userPrompt: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set in environment variables.");
  }

  const model = process.env.GEMINI_MODEL || DEFAULT_MODEL;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: systemPrompt }] },
      contents: [{ role: "user", parts: [{ text: userPrompt }] }],
      generationConfig: {
        temperature: 0.4,
        responseMimeType: "application/json",
      },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini API error (${res.status}): ${errText}`);
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("Gemini returned no content. Full response: " + JSON.stringify(data));
  }

  return text; // raw JSON string — caller should JSON.parse and validate it
}