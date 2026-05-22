export type ScoreBadgeProps = {
  score?: number;
};

export function ScoreBadge({ score }: ScoreBadgeProps) {
  const label =
    score !== undefined ? `Score: ${score}/100` : "Score: --";

  return (
    <span className="inline-flex items-center rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-700">
      {label}
    </span>
  );
}
