"use client";

import { useState } from "react";
import { EmptyResultsArea } from "@/components/EmptyResultsArea";
import { WeakPromptTextArea } from "@/components/WeakPromptTextArea";
import type { PromptResult } from "@/types/prompt";

const MAX_CHARACTERS = 500;

function isPromptResult(value: unknown): value is PromptResult {
  if (typeof value !== "object" || value === null) return false;

  const result = value as Record<string, unknown>;

  return (
    typeof result.originalPrompt === "string" &&
    typeof result.optimizedPrompt === "string" &&
    typeof result.originalScore === "number" &&
    typeof result.improvedScore === "number" &&
    typeof result.explanation === "string" &&
    Array.isArray(result.techniquesUsed) &&
    result.techniquesUsed.every((item) => typeof item === "string") &&
    Array.isArray(result.improvementCategories)
  );
}

export function PromptOptimizer() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PromptResult | null>(null);

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const nextValue = event.target.value;
    if (nextValue.length <= MAX_CHARACTERS) {
      setPrompt(nextValue);
    }
  }

  async function handleSubmit() {
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/improve-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: trimmedPrompt }),
      });

      const data: unknown = await response.json();

      if (!response.ok) {
        const message =
          typeof data === "object" &&
          data !== null &&
          "error" in data &&
          typeof (data as { error: unknown }).error === "string"
            ? (data as { error: string }).error
            : "Something went wrong. Please try again.";
        setResult(null);
        setError(message);
        return;
      }

      if (!isPromptResult(data)) {
        setResult(null);
        setError("Something went wrong. Please try again.");
        return;
      }

      setResult(data);
      setError(null);
    } catch {
      setResult(null);
      setError(
        "Unable to connect. Please check your connection and try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <WeakPromptTextArea
        value={prompt}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
      <EmptyResultsArea
        result={result}
        error={error}
        isLoading={isLoading}
        onTryAgain={handleSubmit}
        canTryAgain={prompt.trim().length > 0}
      />
    </>
  );
}
