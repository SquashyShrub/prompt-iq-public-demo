import type { PromptRequest, PromptResult } from "@/types/prompt";
import { optimizePrompt } from "@/services/OpenAIService";

const PLACEHOLDER_TECHNIQUES = [
  "Task clarification",
  "Context framing",
  "Output formatting",
  "Constraint definition",
] as const;

export async function improvePrompt(
  request: PromptRequest,
): Promise<PromptResult> {
  const sanitized = request.prompt.trim();

  if (sanitized === "") {
    throw new Error("prompt is required and must be a non-empty string");
  }

  const optimizedPrompt = await optimizePrompt(sanitized);
  const originalScore = scorePrompt(sanitized);
  const improvedScore = scorePrompt(optimizedPrompt);

  return {
    originalPrompt: sanitized,
    optimizedPrompt,
    originalScore,
    improvedScore,
    explanation: buildExplanation(originalScore, improvedScore),
    techniquesUsed: [...PLACEHOLDER_TECHNIQUES],
  };
}

function scorePrompt(prompt: string): number {
  const text = prompt.trim().toLowerCase();
  let score = 10;

  const wordCount = text.split(/\s+/).filter(Boolean).length;
  if (wordCount >= 5) score += 5;
  if (wordCount >= 15) score += 10;
  if (wordCount >= 30) score += 10;

  if (
    /\b(create|write|explain|analyze|list|generate|describe|summarize|compare|design|build|help|make|provide|draft)\b/.test(
      text,
    )
  ) {
    score += 20;
  }

  if (
    /\b(context|background|audience|because|about|regarding|for a|as a|scenario|situation)\b/.test(
      text,
    )
  ) {
    score += 20;
  }

  if (
    /\b(must|should|only|avoid|do not|don't|limit|within|maximum|minimum|no more than|at least|constraint)\b/.test(
      text,
    )
  ) {
    score += 15;
  }

  if (
    /\b(format|list|table|json|bullet|paragraph|steps|outline|structure|organized|section)\b/.test(
      text,
    )
  ) {
    score += 20;
  }

  return Math.min(100, score);
}

function buildExplanation(originalScore: number, improvedScore: number): string {
  return [
    `Your original prompt scored ${originalScore}/100. The improved version scores ${improvedScore}/100.`,
    "The improved prompt adds structure so the model knows exactly what to produce.",
    "It clarifies the core task instead of leaving the request vague.",
    "It encourages relevant context and constraints so answers stay focused.",
    "It sets clear output expectations with an organized format.",
  ].join(" ");
}
