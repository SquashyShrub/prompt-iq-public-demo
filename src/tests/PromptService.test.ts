import { describe, expect, it } from "vitest";
import { POST } from "@/app/api/improve-prompt/route";
import {
  improvePrompt,
  normalizePromptResult,
} from "@/services/PromptService";
import type { PromptResult } from "@/types/prompt";

function assertValidPromptResult(result: PromptResult): void {
  expect(result.originalPrompt.length).toBeGreaterThan(0);
  expect(result.optimizedPrompt.length).toBeGreaterThan(0);
  expect(result.originalScore).toBeGreaterThanOrEqual(0);
  expect(result.originalScore).toBeLessThanOrEqual(100);
  expect(result.improvedScore).toBeGreaterThanOrEqual(0);
  expect(result.improvedScore).toBeLessThanOrEqual(100);
  expect(Array.isArray(result.techniquesUsed)).toBe(true);
  expect(Array.isArray(result.improvementCategories)).toBe(true);
}

describe("improvePrompt", () => {
  it("handles a very long prompt without crashing", async () => {
    const longPrompt =
      "Help me write a detailed product launch plan. ".repeat(80).trim();

    const result = await improvePrompt({ prompt: longPrompt });

    expect(result.originalPrompt).toBe(longPrompt);
    assertValidPromptResult(result);
  });

  it("rejects an empty prompt", async () => {
    await expect(improvePrompt({ prompt: "" })).rejects.toThrow(
      "prompt is required and must be a non-empty string",
    );
  });

  it("rejects a whitespace-only prompt", async () => {
    await expect(improvePrompt({ prompt: "   \n\t  " })).rejects.toThrow(
      "prompt is required and must be a non-empty string",
    );
  });

  it("optimizes a very short weak prompt", async () => {
    const result = await improvePrompt({ prompt: "Help" });

    assertValidPromptResult(result);
    expect(result.originalPrompt).toBe("Help");
    expect(result.originalScore).toBeLessThanOrEqual(35);
    expect(result.improvedScore).toBeGreaterThanOrEqual(result.originalScore);
    expect(result.optimizedPrompt.toLowerCase()).toContain("help");
  });
});

describe("normalizePromptResult", () => {
  it("returns safe fallbacks for non-object input", () => {
    const result = normalizePromptResult(null);

    expect(result.originalPrompt).toBe("");
    expect(result.optimizedPrompt).toBe("");
    expect(result.originalScore).toBe(0);
    expect(result.improvedScore).toBe(0);
    expect(result.techniquesUsed).toEqual([]);
    expect(result.improvementCategories).toEqual([]);
    expect(result.explanation).toContain("incomplete");
  });

  it("falls back to originalPrompt when optimizedPrompt is missing", () => {
    const result = normalizePromptResult({
      originalPrompt: "  Draft an email  ",
      originalScore: 20,
      improvedScore: 45,
    });

    expect(result.originalPrompt).toBe("Draft an email");
    expect(result.optimizedPrompt).toBe("Draft an email");
  });

  it("clamps invalid scores to 0–100", () => {
    const result = normalizePromptResult({
      originalPrompt: "Test prompt",
      optimizedPrompt: "Improved prompt",
      originalScore: Number.NaN,
      improvedScore: 150,
    });

    expect(result.originalScore).toBe(0);
    expect(result.improvedScore).toBe(100);
  });

  it("defaults techniquesUsed to an empty array when invalid", () => {
    const result = normalizePromptResult({
      originalPrompt: "Test prompt",
      optimizedPrompt: "Improved prompt",
      originalScore: 10,
      improvedScore: 30,
      techniquesUsed: "Task clarification",
    });

    expect(result.techniquesUsed).toEqual([]);
  });

  it("defaults improvementCategories to an empty array when invalid", () => {
    const result = normalizePromptResult({
      originalPrompt: "Test prompt",
      optimizedPrompt: "Improved prompt",
      originalScore: 10,
      improvedScore: 30,
      improvementCategories: { name: "Clarity" },
    });

    expect(result.improvementCategories).toEqual([]);
  });
});

describe("POST /api/improve-prompt", () => {
  it("returns 400 for an empty prompt", async () => {
    const response = await POST(
      new Request("http://localhost/api/improve-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: "" }),
      }),
    );

    expect(response.status).toBe(400);
    const body = (await response.json()) as { error: string };
    expect(body.error).toBe(
      "prompt is required and must be a non-empty string",
    );
  });

  it("returns 400 for whitespace-only prompt", async () => {
    const response = await POST(
      new Request("http://localhost/api/improve-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: "   " }),
      }),
    );

    expect(response.status).toBe(400);
  });

  it("returns 400 for invalid JSON body", async () => {
    const response = await POST(
      new Request("http://localhost/api/improve-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{not valid json",
      }),
    );

    expect(response.status).toBe(400);
    const body = (await response.json()) as { error: string };
    expect(body.error).toBe("Invalid JSON body");
  });
});
