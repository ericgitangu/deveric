import { Redis } from "@upstash/redis";

// Single Upstash Redis client for the whole app.
//
// Built explicitly (not Redis.fromEnv()) so we can `.trim()` the URL + token: a
// trailing newline/whitespace in the Vercel env var otherwise reaches the SDK
// verbatim, which logs "The redis url/token contains whitespace or newline,
// which can cause errors!" and can break requests. Trimming at this single
// source of truth makes every call site robust to env-var hygiene.
//
// (Secrets live in Vercel's encrypted env vars — the right secret store for a
// Vercel-hosted app, the same role GCP Secret Manager plays for PesaCore on
// Cloud Run.)
export const redis = new Redis({
  url: (process.env.UPSTASH_REDIS_REST_URL ?? "").trim(),
  token: (process.env.UPSTASH_REDIS_REST_TOKEN ?? "").trim(),
});
