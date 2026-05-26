"use client";

import { useState } from "react";
import type { PromptHistoryItem } from "@/types/prompt";

export type PromptHistorySidebarProps = {
  history: PromptHistoryItem[];
  activeId?: string | null;
  onSelect: (item: PromptHistoryItem) => void;
  onClear: () => void;
};

function formatTimestamp(timestamp: number): string {
  return new Date(timestamp).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function PromptHistorySidebar({
  history,
  activeId = null,
  onSelect,
  onClear,
}: PromptHistorySidebarProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className="w-full min-w-0 max-w-full shrink-0 overflow-hidden lg:w-72"
      aria-label="Prompt history"
    >
      <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
        <div className="flex items-center justify-between gap-2 border-b border-zinc-200 px-4 py-3">
          <h2 className="truncate text-sm font-semibold text-zinc-900">History</h2>
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            className="shrink-0 text-xs font-medium text-zinc-600 hover:text-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 lg:hidden"
            aria-expanded={isOpen}
          >
            {isOpen ? "Hide" : "Show"}
          </button>
        </div>

        <div
          className={`flex flex-col gap-3 overflow-hidden p-4 ${isOpen ? "block" : "hidden lg:flex"}`}
        >
          {history.length === 0 ? (
            <p className="text-sm text-zinc-500">
              Recent optimizations will appear here (saved on this device only).
            </p>
          ) : (
            <ul className="flex max-h-96 min-w-0 flex-col gap-2 overflow-y-auto overflow-x-hidden">
              {history.map((item) => {
                const isActive = item.id === activeId;
                return (
                  <li key={item.id} className="min-w-0">
                    <button
                      type="button"
                      onClick={() => onSelect(item)}
                      className={`w-full min-w-0 overflow-hidden rounded-lg border px-3 py-2 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 ${
                        isActive
                          ? "border-zinc-900 bg-zinc-50"
                          : "border-zinc-200 bg-white hover:bg-zinc-50"
                      }`}
                    >
                      <p className="line-clamp-2 break-words text-sm font-medium text-zinc-900">
                        {item.result.originalPrompt.trim()}
                      </p>
                      <p className="mt-1 truncate text-xs text-zinc-600">
                        {item.result.originalScore} → {item.result.improvedScore}
                      </p>
                      <p className="mt-1 truncate text-xs text-zinc-400">
                        {formatTimestamp(item.timestamp)}
                      </p>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          {history.length > 0 && (
            <button
              type="button"
              onClick={onClear}
              className="w-full shrink-0 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
            >
              Clear History
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
