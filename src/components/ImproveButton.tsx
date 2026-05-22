export type ImproveButtonProps = {
  disabled?: boolean;
  className?: string;
};

export function ImproveButton({
  disabled = true,
  className = "",
}: ImproveButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`w-full rounded-lg bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 enabled:hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:self-start ${className}`.trimEnd()}
    >
      Optimize Prompt
    </button>
  );
}
