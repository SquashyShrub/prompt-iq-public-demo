import type {
  PromptImprovementCategory,
  PromptRequest,
  PromptResult,
} from "@/types/prompt";
import {
  getTechniquesForAttempt,
  getVariantIndex,
  optimizePrompt,
} from "@/services/OpenAIService";

const TASK_PATTERN =
  /\b(create|write|explain|analyze|list|generate|describe|summarize|compare|design|build|help|make|provide|draft)\b/;

const CONTEXT_PATTERN =
  /\b(context|background|audience|because|about|regarding|for a|as a|scenario|situation)\b/;

const CONSTRAINT_PATTERN =
  /\b(must|should|only|avoid|do not|don't|limit|within|maximum|minimum|no more than|at least|constraint)\b/;

const FORMAT_PATTERN =
  /\b(format|list|table|json|bullet|paragraph|steps|outline|structure|organized|section)\b/;

const VARIANT_LABELS = [
  "balanced structure",
  "detailed instructional style",
  "concise action-oriented style",
  "role-based expert framing",
] as const;

export async function improvePrompt(
  request: PromptRequest,
): Promise<PromptResult> {
  const sanitized = request.prompt.trim();
  const attempt =
    typeof request.attempt === "number" && request.attempt >= 0
      ? Math.floor(request.attempt)
      : 0;

  if (sanitized === "") {
    throw new Error("prompt is required and must be a non-empty string");
  }

  const techniquesUsed = getTechniquesForAttempt(attempt);
  const optimizedPrompt = await optimizePrompt(sanitized, techniquesUsed, attempt);
  const originalScore = scorePrompt(sanitized);
  const rawImprovedScore = scorePrompt(optimizedPrompt);
  const improvedScore = stabilizeImprovedScore(
    originalScore,
    rawImprovedScore,
    request.previousImprovedScore,
  );

  return normalizePromptResult({
    originalPrompt: sanitized,
    optimizedPrompt,
    originalScore,
    improvedScore,
    explanation: buildExplanation(originalScore, improvedScore, attempt),
    techniquesUsed,
    improvementCategories: buildImprovementCategories(sanitized, optimizedPrompt),
  });
}

function stabilizeImprovedScore(
  originalScore: number,
  improvedScore: number,
  previousImprovedScore?: number,
): number {
  const minFromOriginal = Math.min(100, originalScore + 10);
  let stabilized = Math.max(improvedScore, minFromOriginal);

  if (previousImprovedScore !== undefined) {
    const minFromPrevious = Math.max(0, previousImprovedScore - 10);
    stabilized = Math.max(stabilized, minFromPrevious);
  }

  return clampScore(stabilized);
}

function scorePrompt(prompt: string): number {
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

  return Math.min(100, score);
}

function normalizePromptResult(value: unknown): PromptResult {
  const fallbackOriginalPrompt = "";
  const fallbackOptimizedPrompt = "";

  if (typeof value !== "object" || value === null) {
    return {
      originalPrompt: fallbackOriginalPrompt,
      optimizedPrompt: fallbackOptimizedPrompt,
      originalScore: 0,
      improvedScore: 0,
      explanation: "Optimization result was incomplete. Please try again.",
      techniquesUsed: [],
      improvementCategories: [],
    };
  }

  const record = value as Record<string, unknown>;

  const originalPrompt =
    typeof record.originalPrompt === "string" ? record.originalPrompt.trim() : "";

  const optimizedPromptRaw =
    typeof record.optimizedPrompt === "string" ? record.optimizedPrompt.trim() : "";

  const optimizedPrompt =
    optimizedPromptRaw !== ""
      ? optimizedPromptRaw
      : originalPrompt !== ""
        ? originalPrompt
        : fallbackOptimizedPrompt;

  const originalScore = clampScore(record.originalScore);
  const improvedScore = clampScore(record.improvedScore);

  const explanation =
    typeof record.explanation === "string" && record.explanation.trim() !== ""
      ? record.explanation.trim()
      : "This is a placeholder optimization. OpenAI integration will be added later.";

  const techniquesUsed = isStringArray(record.techniquesUsed)
    ? record.techniquesUsed.map((t) => t.trim()).filter(Boolean)
    : [];

  const improvementCategories = normalizeImprovementCategories(
    record.improvementCategories,
  );

  return {
    originalPrompt,
    optimizedPrompt,
    originalScore,
    improvedScore,
    explanation,
    techniquesUsed,
    improvementCategories,
  };
}

function clampScore(value: unknown): number {
  if (typeof value !== "number" || Number.isNaN(value)) return 0;
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, Math.round(value)));
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function normalizeImprovementCategories(
  value: unknown,
): PromptImprovementCategory[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (typeof item !== "object" || item === null) return null;
      const record = item as Record<string, unknown>;

      const name = typeof record.name === "string" ? record.name.trim() : "";
      const description =
        typeof record.description === "string" ? record.description.trim() : "";

      const impact = normalizeImpact(record.impact);

      if (!name || !description) return null;
      return { name, description, impact };
    })
    .filter((item): item is PromptImprovementCategory => item !== null);
}

function normalizeImpact(
  value: unknown,
): PromptImprovementCategory["impact"] {
  if (value === "low" || value === "medium" || value === "high") return value;
  return "low";
}

function buildImprovementCategories(
  originalPrompt: string,
  optimizedPrompt: string,
): PromptImprovementCategory[] {
  const original = originalPrompt.trim().toLowerCase();
  const optimized = optimizedPrompt.trim().toLowerCase();
  const originalWords = original.split(/\s+/).filter(Boolean).length;
  const optimizedWords = optimized.split(/\s+/).filter(Boolean).length;

  return [
    {
      name: "Clarity",
      description:
        "Clarifies the main task so the AI understands what outcome is expected.",
      impact: impactForSignal(
        TASK_PATTERN.test(original),
        TASK_PATTERN.test(optimized),
      ),
    },
    {
      name: "Context",
      description:
        "Frames the request with background details so responses stay relevant.",
      impact: impactForSignal(
        CONTEXT_PATTERN.test(original),
        CONTEXT_PATTERN.test(optimized),
      ),
    },
    {
      name: "Constraints",
      description:
        "Adds boundaries that keep the model focused on the right scope and tone.",
      impact: impactForSignal(
        CONSTRAINT_PATTERN.test(original),
        CONSTRAINT_PATTERN.test(optimized),
      ),
    },
    {
      name: "Output Format",
      description:
        "Sets expectations for how the answer should be structured and presented.",
      impact: impactForSignal(
        FORMAT_PATTERN.test(original),
        FORMAT_PATTERN.test(optimized),
      ),
    },
    {
      name: "Specificity",
      description:
        "Expands detail so the prompt leaves less room for vague or generic answers.",
      impact: impactForSpecificity(originalWords, optimizedWords),
    },
  ];
}

function impactForSignal(
  originalHasSignal: boolean,
  optimizedHasSignal: boolean,
): PromptImprovementCategory["impact"] {
  if (!originalHasSignal && optimizedHasSignal) return "high";
  if (!originalHasSignal || !optimizedHasSignal) return "medium";
  return "low";
}

function impactForSpecificity(
  originalWords: number,
  optimizedWords: number,
): PromptImprovementCategory["impact"] {
  if (originalWords < 5) return "high";
  if (originalWords < 15 && optimizedWords >= originalWords + 10) return "medium";
  return "low";
}

function buildExplanation(
  originalScore: number,
  improvedScore: number,
  attempt: number,
): string {
  const variantLabel = VARIANT_LABELS[getVariantIndex(attempt)];

  return [
    `Your original prompt scored ${originalScore}/100. This attempt uses a ${variantLabel} and scores ${improvedScore}/100.`,
    "The improved prompt adds structure so the model knows exactly what to produce.",
    "It clarifies the core task instead of leaving the request vague.",
    "It encourages relevant context and constraints so answers stay focused.",
    "It sets clear output expectations with an organized format.",
  ].join(" ");
}
