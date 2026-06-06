export function ResultsSkeleton() {
  return (
    <article
      className="animate-pulse rounded-xl border border-zinc-200/80 bg-white p-5 shadow-sm sm:p-6"
      aria-hidden="true"
    >
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="h-6 w-48 rounded-md bg-zinc-200" />
        <div className="flex flex-wrap gap-2">
          <div className="h-7 w-24 rounded-md bg-zinc-200" />
          <div className="h-7 w-24 rounded-md bg-zinc-200" />
          <div className="h-7 w-36 rounded-md bg-zinc-200" />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="h-40 rounded-lg bg-zinc-100" />
          <div className="h-40 rounded-lg bg-zinc-100" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-32 rounded bg-zinc-200" />
          <div className="h-4 w-full rounded bg-zinc-100" />
          <div className="h-4 w-11/12 max-w-md rounded bg-zinc-100" />
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="h-6 w-28 rounded-md bg-zinc-200" />
          <div className="h-6 w-32 rounded-md bg-zinc-200" />
          <div className="h-6 w-24 rounded-md bg-zinc-200" />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="h-24 rounded-lg bg-zinc-100" />
          <div className="h-24 rounded-lg bg-zinc-100" />
        </div>
      </div>
    </article>
  );
}
