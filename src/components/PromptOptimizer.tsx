"use client";

import { useEffect, useState } from "react";
import { EmptyResultsArea } from "@/components/EmptyResultsArea";
import { PromptHistorySidebar } from "@/components/PromptHistorySidebar";
import { WeakPromptTextArea } from "@/components/WeakPromptTextArea";
import { usePromptHistory } from "@/components/usePromptHistory";
import { scorePrompt } from "@/services/promptScoring";
import type { PromptHistoryItem, PromptResult } from "@/types/prompt";
import { validatePrompt } from "@/utils/promptValidation";

const MAX_CHARACTERS = 500;
const SCORE_DEBOUNCE_MS = 300;

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
  const [attempt, setAttempt] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [result, setResult] = useState<PromptResult | null>(null);
  const [editableOptimizedPrompt, setEditableOptimizedPrompt] = useState("");
  const [displayImprovedScore, setDisplayImprovedScore] = useState<number | null>(
    null,
  );
  const [activeHistoryId, setActiveHistoryId] = useState<string | null>(null);

  const { history, addToHistory, clearHistory } = usePromptHistory();

  useEffect(() => {
    if (!result) {
      setDisplayImprovedScore(null);
      return;
    }

    if (editableOptimizedPrompt === result.optimizedPrompt) {
      setDisplayImprovedScore(result.improvedScore);
      return;
    }

    const timer = window.setTimeout(() => {
      setDisplayImprovedScore(scorePrompt(editableOptimizedPrompt));
    }, SCORE_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [editableOptimizedPrompt, result]);

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const nextValue = event.target.value;
    if (nextValue.length <= MAX_CHARACTERS) {
      setPrompt(nextValue);
      setAttempt(0);
      setActiveHistoryId(null);
      setValidationError(null);
    }
  }

  function restoreFromHistory(item: PromptHistoryItem) {
    setResult(item.result);
    setEditableOptimizedPrompt(item.editableOptimizedPrompt);
    setDisplayImprovedScore(scorePrompt(item.editableOptimizedPrompt));
    setPrompt(item.result.originalPrompt);
    setAttempt(0);
    setError(null);
    setValidationError(null);
    setActiveHistoryId(item.id);
  }

  function validateBeforeSubmit(trimmedPrompt: string): boolean {
    const validation = validatePrompt(trimmedPrompt);
    if (!validation.valid) {
      setValidationError(
        validation.reason ?? "Prompt does not appear to contain meaningful language.",
      );
      setError(null);
      return false;
    }
    setValidationError(null);
    return true;
  }

  async function submitWithAttempt(submitAttempt: number) {
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt || isLoading) return;

    if (!validateBeforeSubmit(trimmedPrompt)) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/improve-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: trimmedPrompt,
          attempt: submitAttempt,
          previousImprovedScore: result?.improvedScore,
        }),
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
        setEditableOptimizedPrompt("");
        setDisplayImprovedScore(null);
        setError(message);
        return;
      }

      if (!isPromptResult(data)) {
        setResult(null);
        setEditableOptimizedPrompt("");
        setDisplayImprovedScore(null);
        setError("Something went wrong. Please try again.");
        return;
      }

      setResult(data);
      setEditableOptimizedPrompt(data.optimizedPrompt);
      setDisplayImprovedScore(data.improvedScore);
      setAttempt(submitAttempt);
      setError(null);

      const entry = addToHistory(data, data.optimizedPrompt);
      setActiveHistoryId(entry.id);
    } catch {
      setResult(null);
      setEditableOptimizedPrompt("");
      setDisplayImprovedScore(null);
      setError(
        "Unable to connect. Please check your connection and try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit() {
    setAttempt(0);
    setActiveHistoryId(null);
    void submitWithAttempt(0);
  }

  function handleTryAgain() {
    const nextAttempt = attempt + 1;
    void submitWithAttempt(nextAttempt);
  }

  function handleEditableChange(value: string) {
    setEditableOptimizedPrompt(value);
    setActiveHistoryId(null);
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 lg:flex-row lg:items-start lg:gap-8">
      <PromptHistorySidebar
        history={history}
        activeId={activeHistoryId}
        onSelect={restoreFromHistory}
        onClear={() => {
          clearHistory();
          setActiveHistoryId(null);
        }}
      />
      <div className="min-w-0 flex-1">
        <WeakPromptTextArea
          value={prompt}
          onChange={handleChange}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          validationError={validationError}
        />
        <EmptyResultsArea
          result={result}
          error={error}
          isLoading={isLoading}
          editableOptimizedPrompt={editableOptimizedPrompt}
          onEditableOptimizedPromptChange={handleEditableChange}
          displayImprovedScore={displayImprovedScore}
          onTryAgain={handleTryAgain}
          canTryAgain={prompt.trim().length > 0}
        />
      </div>
    </div>
  );
}
