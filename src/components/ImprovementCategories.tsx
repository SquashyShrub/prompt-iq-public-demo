import type { PromptImprovementCategory } from "@/types/prompt";

export type ImprovementCategoriesProps = {
  categories: PromptImprovementCategory[];
};

const IMPACT_STYLES: Record<
  PromptImprovementCategory["impact"],
  string
> = {
  low: "border-zinc-200 bg-zinc-50 text-zinc-600",
  medium: "border-amber-200 bg-amber-50 text-amber-800",
  high: "border-emerald-200 bg-emerald-50 text-emerald-800",
};

export function ImprovementCategories({
  categories,
}: ImprovementCategoriesProps) {
  if (categories.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-500">
        Improvement categories will appear here once optimization runs.
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {categories.map((category) => (
        <li
          key={category.name}
          className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h4 className="text-sm font-semibold text-zinc-900">
              {category.name}
            </h4>
            <span
              className={`inline-flex rounded-md border px-2 py-0.5 text-xs font-medium capitalize ${IMPACT_STYLES[category.impact]}`}
            >
              {category.impact} impact
            </span>
          </div>
          <p className="text-sm leading-relaxed text-zinc-600">
            {category.description}
          </p>
        </li>
      ))}
    </ul>
  );
}
