export type CopyButtonProps = {
  disabled?: boolean;
  className?: string;
};

export function CopyButton({
  disabled = true,
  className = "",
}: CopyButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-900 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 enabled:hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50 ${className}`.trimEnd()}
    >
      Copy
    </button>
  );
}
