export type ImproveButtonProps = {
  disabled?: boolean;
  isLoading?: boolean;
  label?: string;
  onClick?: () => void;
  className?: string;
};

export function ImproveButton({
  disabled = false,
  isLoading = false,
  label = "Optimize Prompt",
  onClick,
  className = "",
}: ImproveButtonProps) {
  const buttonLabel = isLoading ? "Optimizing…" : label;
  const isDisabled = disabled || isLoading;

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={onClick}
      aria-busy={isLoading}
      className={`w-full rounded-lg bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 enabled:hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:self-start ${className}`.trimEnd()}
    >
      {buttonLabel}
    </button>
  );
}
