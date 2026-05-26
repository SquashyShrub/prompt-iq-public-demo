/**
 * Shared heuristic prompt scoring (0–100).
 * Used by PromptService on the server and by the client for live edits.
 * Keep in sync when scoring rules change.
 */

const TASK_PATTERN =
  /\b(create|write|explain|analyze|list|generate|describe|summarize|compare|design|build|help|make|provide|draft)\b/;

const CONTEXT_PATTERN =
  /\b(context|background|audience|because|about|regarding|for a|as a|scenario|situation)\b/;

const CONSTRAINT_PATTERN =
  /\b(must|should|only|avoid|do not|don't|limit|within|maximum|minimum|no more than|at least|constraint)\b/;

const FORMAT_PATTERN =
  /\b(format|list|table|json|bullet|paragraph|steps|outline|structure|organized|section)\b/;

export function scorePrompt(prompt: string): number {
  const text = prompt.trim().toLowerCase();
  let score = 10;

  const wordCount = text.split(/\s+/).filter(Boolean).length;
  if (wordCount >= 5) score += 5;
  if (wordCount >= 15) score += 10;
  if (wordCount >= 30) score += 10;

  if (TASK_PATTERN.test(text)) score += 20;
  if (CONTEXT_PATTERN.test(text)) score += 20;
  if (CONSTRAINT_PATTERN.test(text)) score += 15;
  if (FORMAT_PATTERN.test(text)) score += 20;

  return clampScore(score);
}

export function clampScore(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, Math.round(value)));
}
