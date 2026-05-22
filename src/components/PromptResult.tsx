import { CopyButton } from "@/components/CopyButton";
import { ScoreBadge } from "@/components/ScoreBadge";

export function PromptResult() {
  return (
    <article className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
      <header className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <h3 className="text-lg font-semibold tracking-tight text-zinc-900">
          Optimized Prompt
        </h3>
        <div className="flex flex-wrap items-center gap-2">
          <ScoreBadge />
          <CopyButton />
        </div>
      </header>
      <p className="text-base leading-relaxed text-zinc-500">
        Your improved prompt will appear here after optimization.
      </p>
    </article>
  );
}
