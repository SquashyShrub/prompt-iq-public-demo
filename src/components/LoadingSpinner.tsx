export type LoadingSpinnerProps = {
  size?: "sm" | "md";
  className?: string;
};

const SIZE_CLASSES = {
  sm: "h-4 w-4 border-2",
  md: "h-5 w-5 border-2",
} as const;

export function LoadingSpinner({
  size = "sm",
  className = "",
}: LoadingSpinnerProps) {
  return (
    <span
      className={`inline-block animate-spin rounded-full border-zinc-300 border-t-zinc-700 ${SIZE_CLASSES[size]} ${className}`.trim()}
      aria-hidden="true"
    />
  );
}
