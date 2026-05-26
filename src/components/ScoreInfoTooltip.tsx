"use client";

import { useId, useState } from "react";

export function ScoreInfoTooltip() {
  const [isOpen, setIsOpen] = useState(false);
  const tooltipId = useId();

  return (
    <div className="relative inline-flex shrink-0">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={tooltipId}
        aria-label="How prompt scores are calculated"
        onClick={() => setIsOpen((open) => !open)}
        onBlur={() => setIsOpen(false)}
        className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-zinc-300 bg-white text-[10px] font-semibold leading-none text-zinc-600 transition-colors hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
      >
        i
      </button>
      {isOpen && (
        <div
          id={tooltipId}
          role="tooltip"
          className="absolute left-0 top-full z-10 mt-2 w-64 rounded-lg border border-zinc-200 bg-white p-3 text-xs leading-relaxed text-zinc-600 shadow-lg sm:w-72"
        >
          Prompt scores are heuristic estimates based on clarity, specificity,
          context, role/task definition, output format, and constraints. Scores
          are guidance, not absolute measurements.
        </div>
      )}
    </div>
  );
}
