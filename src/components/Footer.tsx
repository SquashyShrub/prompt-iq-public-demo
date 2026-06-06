export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-zinc-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-2 px-6 py-8 text-center sm:px-8 sm:py-10">
        <p className="text-sm font-semibold tracking-tight text-zinc-900">
          PromptIQ
        </p>
        <p className="max-w-md text-sm leading-relaxed text-zinc-600">
          AI-assisted prompt optimization and learning.
        </p>
        <p className="text-xs leading-relaxed text-zinc-500">
          Built with Next.js, TypeScript, and Tailwind CSS.
        </p>
        <p className="text-xs text-zinc-400">&copy; {year} PromptIQ</p>
      </div>
    </footer>
  );
}
