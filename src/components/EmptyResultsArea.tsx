import { LoadingSpinner } from "@/components/LoadingSpinner";
import { PromptResult } from "@/components/PromptResult";
import { ResultsSkeleton } from "@/components/ResultsSkeleton";
import { secondaryButtonClasses } from "@/components/buttonStyles";
import type { PromptResult as PromptResultData } from "@/types/prompt";

export type EmptyResultsAreaProps = {
  result?: PromptResultData | null;
  error?: string | null;
  isLoading?: boolean;
  editableOptimizedPrompt?: string;
  onEditableOptimizedPromptChange?: (value: string) => void;
  displayImprovedScore?: number | null;
  onTryAgain?: () => void;
  canTryAgain?: boolean;
};

export function EmptyResultsArea({
  result = null,
  error = null,
  isLoading = false,
  editableOptimizedPrompt = "",
  onEditableOptimizedPromptChange,
  displayImprovedScore = null,
  onTryAgain,
  canTryAgain = false,
}: EmptyResultsAreaProps) {
  const hasResult =
    result !== null &&
    result.originalPrompt.trim() !== "" &&
    result.optimizedPrompt.trim() !== "";
  const showTryAgain = (hasResult || error !== null) && typeof onTryAgain === "function";

  return (
    <section
      className="px-6 pb-16 pt-0 sm:px-8"
      aria-labelledby="results-section-heading"
      aria-busy={isLoading}
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <h2
          id="results-section-heading"
          className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl"
        >
          Results
        </h2>

        {isLoading && (
          <div
            className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-600 transition-opacity duration-200"
            role="status"
          >
            <LoadingSpinner size="md" />
            <span>Optimizing your prompt…</span>
          </div>
        )}

        {error && !isLoading && (
          <p
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 transition-opacity duration-300"
            role="alert"
          >
            {error}
          </p>
        )}

        {isLoading ? (
          <ResultsSkeleton />
        ) : (
          <div className="transition-opacity duration-300">
            <PromptResult
              data={hasResult ? result : null}
              editableOptimizedPrompt={editableOptimizedPrompt}
              onEditableOptimizedPromptChange={onEditableOptimizedPromptChange}
              displayImprovedScore={displayImprovedScore}
              isEditableDisabled={isLoading}
            />
          </div>
        )}

        {showTryAgain && (
          <div className="flex flex-wrap items-center gap-3 transition-opacity duration-300">
            <button
              type="button"
              onClick={onTryAgain}
              disabled={!canTryAgain || isLoading}
              className={secondaryButtonClasses}
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
