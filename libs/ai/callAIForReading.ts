/**
 * Tries Gemini first (primary provider). If it fails specifically because of
 * a quota/rate-limit error (HTTP 429), automatically retries with Groq
 * instead of failing the whole request. Any other kind of error (bad
 * request, invalid key, etc.) is NOT retried on a different provider — it's
 * thrown immediately, since switching providers won't fix a real bug.
 */

import { callGeminiForReading } from "./gemini";
import { callGroqForReading } from "./groq";

export class AIQuotaError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AIQuotaError";
  }
}

export async function callAIForReading(systemPrompt: string, userPrompt: string): Promise<string> {
  try {
    return await callGeminiForReading(systemPrompt, userPrompt);
  } catch (err: unknown) {
    const isQuotaError =
      typeof err === "object" &&
      err !== null &&
      "status" in err &&
      err.status === 429;

    if (!isQuotaError) {
      throw err; // a real bug — don't mask it by silently switching providers
    }

    try {
      return await callGroqForReading(systemPrompt, userPrompt);
    } catch (fallbackError) {
      const message = fallbackError instanceof Error
        ? fallbackError.message
        : "All AI providers are unavailable.";
      throw new AIQuotaError(`Gemini quota reached and fallback failed: ${message}`);
    }
  }
}