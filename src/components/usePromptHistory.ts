"use client";

import { useCallback, useEffect, useState } from "react";
import type { PromptHistoryItem, PromptResult } from "@/types/prompt";

const STORAGE_KEY = "promptiq-prompt-history";
const MAX_ITEMS = 10;

function isPromptResult(value: unknown): value is PromptResult {
  if (typeof value !== "object" || value === null) return false;
  const record = value as Record<string, unknown>;
  return (
    typeof record.originalPrompt === "string" &&
    typeof record.optimizedPrompt === "string" &&
    typeof record.originalScore === "number" &&
    typeof record.improvedScore === "number" &&
    typeof record.explanation === "string" &&
    Array.isArray(record.techniquesUsed) &&
    Array.isArray(record.improvementCategories)
  );
}

function parseHistoryItem(value: unknown): PromptHistoryItem | null {
  if (typeof value !== "object" || value === null) return null;
  const record = value as Record<string, unknown>;
  if (typeof record.id !== "string" || typeof record.timestamp !== "number") {
    return null;
  }
  if (!isPromptResult(record.result)) return null;
  const editable =
    typeof record.editableOptimizedPrompt === "string"
      ? record.editableOptimizedPrompt
      : record.result.optimizedPrompt;
  return {
    id: record.id,
    timestamp: record.timestamp,
    result: record.result,
    editableOptimizedPrompt: editable,
  };
}

function loadHistory(): PromptHistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map(parseHistoryItem)
      .filter((item): item is PromptHistoryItem => item !== null)
      .slice(0, MAX_ITEMS);
  } catch {
    return [];
  }
}

export function usePromptHistory() {
  const [history, setHistory] = useState<PromptHistoryItem[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setHistory(loadHistory());
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady || typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch {
      // Ignore quota or privacy errors.
    }
  }, [history, isReady]);

  const addToHistory = useCallback(
    (result: PromptResult, editableOptimizedPrompt: string): PromptHistoryItem => {
      const entry: PromptHistoryItem = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        result,
        editableOptimizedPrompt,
      };
      setHistory((prev) => [entry, ...prev].slice(0, MAX_ITEMS));
      return entry;
    },
    [],
  );

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return { history, addToHistory, clearHistory, isReady };
}
