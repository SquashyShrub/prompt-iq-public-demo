import { PromptResult } from "@/components/PromptResult";
import type { PromptResult as PromptResultData } from "@/types/prompt";

export type EmptyResultsAreaProps = {
  result?: PromptResultData | null;
  error?: string | null;
  isLoading?: boolean;
  onTryAgain?: () => void;
  canTryAgain?: boolean;
};

export function EmptyResultsArea({
  result = null,
  error = null,
  isLoading = false,
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
          <p
            className="rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-600"
            role="status"
          >
            Optimizing your prompt…
          </p>
        )}

        {error && !isLoading && (
          <p
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
            role="alert"
          >
            {error}
          </p>
        )}

        <PromptResult data={hasResult ? result : null} />

        {showTryAgain && (
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onTryAgain}
              disabled={!canTryAgain || isLoading}
              className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 enabled:hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
