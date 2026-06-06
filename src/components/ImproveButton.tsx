import { LoadingSpinner } from "@/components/LoadingSpinner";
import { primaryButtonClasses } from "@/components/buttonStyles";

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
      className={`inline-flex w-full items-center justify-center gap-2 sm:w-auto sm:self-start ${primaryButtonClasses} ${className}`.trim()}
    >
      {isLoading && (
        <LoadingSpinner
          size="sm"
          className="border-white/30 border-t-white"
        />
      )}
      <span>{buttonLabel}</span>
    </button>
  );
}
