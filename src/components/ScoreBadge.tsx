export type ScoreBadgeProps = {
  score?: number;
  label?: string;
};

export function ScoreBadge({ score, label = "Score" }: ScoreBadgeProps) {
  const displayLabel =
    score !== undefined ? `${label}: ${score}/100` : `${label}: --`;

  return (
    <span className="inline-flex items-center rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-800">
      {displayLabel}
    </span>
  );
}
