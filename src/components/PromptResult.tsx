import { BeforeAfterComparison } from "@/components/BeforeAfterComparison";
import { CopyButton } from "@/components/CopyButton";
import { ImprovementCategories } from "@/components/ImprovementCategories";
import { ScoreBadge } from "@/components/ScoreBadge";
import { ScoreInfoTooltip } from "@/components/ScoreInfoTooltip";
import { toCopyablePromptBody } from "@/components/promptTextUtils";
import type { PromptResult as PromptResultData } from "@/types/prompt";

export type PromptResultProps = {
  data?: PromptResultData | null;
  editableOptimizedPrompt?: string;
  onEditableOptimizedPromptChange?: (value: string) => void;
  displayImprovedScore?: number | null;
  isEditableDisabled?: boolean;
};

export function PromptResult({
  data,
  editableOptimizedPrompt = "",
  onEditableOptimizedPromptChange,
  displayImprovedScore = null,
  isEditableDisabled = false,
}: PromptResultProps) {
  const hasResult =
    data !== undefined &&
    data !== null &&
    data.originalPrompt.trim() !== "" &&
    data.optimizedPrompt.trim() !== "";

  if (!hasResult) {
    return (
      <article className="rounded-xl border border-zinc-200/80 bg-white p-5 shadow-sm sm:p-6">
        <header className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-2">
            <ScoreInfoTooltip />
            <h3 className="text-base font-semibold tracking-tight text-zinc-900 sm:text-lg">
              Optimized Prompt
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <ScoreBadge />
            <CopyButton disabled label="Copy Improved Prompt" />
          </div>
        </header>
        <p className="max-w-prose text-sm leading-relaxed text-zinc-500 sm:text-base">
          Your improved prompt will appear here after optimization.
        </p>
      </article>
    );
  }

  const copyText = toCopyablePromptBody(editableOptimizedPrompt);
  const afterScore = displayImprovedScore ?? data.improvedScore;

  return (
    <article className="rounded-xl border border-zinc-200/80 bg-white p-5 shadow-sm transition-opacity duration-300 sm:p-6">
      <header className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-2">
          <ScoreInfoTooltip />
          <h3 className="text-base font-semibold tracking-tight text-zinc-900 sm:text-lg">
            Prompt Optimization Results
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <ScoreBadge score={data.originalScore} label="Before" />
          <ScoreBadge score={afterScore} label="After" />
          <CopyButton
            text={copyText}
            disabled={false}
            label="Copy Improved Prompt"
          />
        </div>
      </header>

      <div className="flex flex-col gap-5 sm:gap-6">
        <section aria-labelledby="before-after-heading">
          <h4
            id="before-after-heading"
            className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500"
          >
            Before / After Comparison
          </h4>
          <BeforeAfterComparison
            originalPrompt={data.originalPrompt}
            editableOptimizedPrompt={editableOptimizedPrompt}
            onEditableOptimizedPromptChange={
              onEditableOptimizedPromptChange ?? (() => undefined)
            }
            isEditableDisabled={isEditableDisabled || !onEditableOptimizedPromptChange}
          />
        </section>

        {data.explanation.trim() !== "" && (
          <section aria-labelledby="explanation-heading">
            <h4
              id="explanation-heading"
              className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500"
            >
              What Changed
            </h4>
            <p className="max-w-prose text-sm leading-relaxed text-zinc-600 sm:text-[0.9375rem] sm:leading-7">
              {data.explanation}
            </p>
          </section>
        )}

        {data.techniquesUsed.length > 0 && (
          <section aria-labelledby="techniques-heading">
            <h4
              id="techniques-heading"
              className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500"
            >
              Techniques Used
            </h4>
            <ul className="flex flex-wrap gap-2">
              {data.techniquesUsed.map((technique) => (
                <li
                  key={technique}
                  className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700"
                >
                  {technique}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section aria-labelledby="categories-heading">
          <h4
            id="categories-heading"
            className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500"
          >
            Improvement Categories
          </h4>
          <ImprovementCategories categories={data.improvementCategories} />
        </section>
      </div>
    </article>
  );
}
