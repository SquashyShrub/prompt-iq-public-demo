export type BeforeAfterComparisonProps = {
  originalPrompt: string;
  optimizedPrompt: string;
};

export function BeforeAfterComparison({
  originalPrompt,
  optimizedPrompt,
}: BeforeAfterComparisonProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <article className="flex flex-col rounded-lg border border-zinc-200 bg-zinc-50 p-4">
        <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Before
        </h4>
        <p className="flex-1 whitespace-pre-wrap text-base leading-relaxed text-zinc-800">
          {originalPrompt}
        </p>
      </article>
      <article className="flex flex-col rounded-lg border border-zinc-900 bg-white p-4 shadow-sm">
        <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-900">
          After
        </h4>
        <p className="flex-1 whitespace-pre-wrap text-base leading-relaxed text-zinc-800">
          {optimizedPrompt}
        </p>
      </article>
    </div>
  );
}

