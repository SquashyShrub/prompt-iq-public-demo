import { EditableOptimizedPrompt } from "@/components/EditableOptimizedPrompt";

export type BeforeAfterComparisonProps = {
  originalPrompt: string;
  editableOptimizedPrompt: string;
  onEditableOptimizedPromptChange: (value: string) => void;
  isEditableDisabled?: boolean;
};

export function BeforeAfterComparison({
  originalPrompt,
  editableOptimizedPrompt,
  onEditableOptimizedPromptChange,
  isEditableDisabled = false,
}: BeforeAfterComparisonProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <article className="flex flex-col rounded-lg border border-zinc-200/80 bg-zinc-50/80 p-4">
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
          Before
        </h4>
        <p className="flex-1 whitespace-pre-wrap text-sm leading-relaxed text-zinc-800 sm:text-[0.9375rem] sm:leading-7">
          {originalPrompt}
        </p>
      </article>
      <article className="flex flex-col rounded-lg border border-zinc-300 bg-white p-4 shadow-sm">
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-700">
          After
        </h4>
        <EditableOptimizedPrompt
          value={editableOptimizedPrompt}
          onChange={onEditableOptimizedPromptChange}
          disabled={isEditableDisabled}
          id="optimized-prompt-after"
        />
      </article>
    </div>
  );
}
