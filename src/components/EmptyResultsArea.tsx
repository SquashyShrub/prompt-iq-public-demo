import { PromptResult } from "@/components/PromptResult";

export function EmptyResultsArea() {
  return (
    <section
      className="px-6 pb-16 pt-0 sm:px-8"
      aria-labelledby="results-section-heading"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <h2
          id="results-section-heading"
          className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl"
        >
          Results
        </h2>
        <PromptResult />
      </div>
    </section>
  );
}
