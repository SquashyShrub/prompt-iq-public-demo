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
      <article className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
        <header className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-2">
            <ScoreInfoTooltip />
            <h3 className="text-lg font-semibold tracking-tight text-zinc-900">
              Optimized Prompt
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <ScoreBadge />
            <CopyButton disabled label="Copy Improved Prompt" />
          </div>
        </header>
        <p className="text-base leading-relaxed text-zinc-500">
          Your improved prompt will appear here after optimization.
        </p>
      </article>
    );
  }

  const copyText = toCopyablePromptBody(editableOptimizedPrompt);
  const afterScore = displayImprovedScore ?? data.improvedScore;

  return (
    <article className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
      <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-2">
          <ScoreInfoTooltip />
          <h3 className="text-lg font-semibold tracking-tight text-zinc-900">
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

      <div className="flex flex-col gap-6">
        <section aria-labelledby="before-after-heading">
          <h4
            id="before-after-heading"
            className="mb-3 text-sm font-semibold text-zinc-900"
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
              className="mb-2 text-sm font-semibold text-zinc-900"
            >
              What Changed
            </h4>
            <p className="text-base leading-relaxed text-zinc-600">
              {data.explanation}
            </p>
          </section>
        )}

        {data.techniquesUsed.length > 0 && (
          <section aria-labelledby="techniques-heading">
            <h4
              id="techniques-heading"
              className="mb-3 text-sm font-semibold text-zinc-900"
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
            className="mb-3 text-sm font-semibold text-zinc-900"
          >
            Improvement Categories
          </h4>
          <ImprovementCategories categories={data.improvementCategories} />
        </section>
      </div>
    </article>
  );
}
