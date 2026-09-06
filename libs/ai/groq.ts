/**
 * Groq free tier — no credit card, ~14,400 requests/day (as of 2026; check
 * console.groq.com/docs/rate-limits for current numbers). Used as a fallback
 * when Gemini returns a 429 (quota/rate limit) error.
 *
 * Model note: Groq deprecates old model IDs on a schedule (they emailed users
 * about retiring llama-3.1-8b-instant and llama-3.3-70b-versatile in 2026).
 * openai/gpt-oss-20b is their current recommended fast/free-tier replacement.
 * If this ever 404s again, check console.groq.com/docs/deprecations for the
 * current recommended model and update GROQ_MODEL in your env vars — no code
 * change needed.
 *
 * Get a free key at https://console.groq.com
 */

const DEFAULT_MODEL = "openai/gpt-oss-20b";

export async function callGroqForReading(systemPrompt: string, userPrompt: string): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not set in environment variables.");
  }

  const model = process.env.GROQ_MODEL || DEFAULT_MODEL;

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.4,
      response_format: { type: "json_object" },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    const error = new Error(`Groq API error (${res.status}): ${errText}`) as Error & { status?: number };
    error.status = res.status;
    throw error;
  }

  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;

  if (!text) {
    throw new Error("Groq returned no content. Full response: " + JSON.stringify(data));
  }

  return text;
}