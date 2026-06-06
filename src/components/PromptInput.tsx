export type PromptInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  maxLength: number;
  disabled?: boolean;
};

export function PromptInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  maxLength,
  disabled = false,
}: PromptInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-zinc-800">
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={6}
        maxLength={maxLength}
        disabled={disabled}
        className="min-h-40 w-full resize-none rounded-lg border border-zinc-300 bg-white px-4 py-3 text-base leading-relaxed text-zinc-900 shadow-sm placeholder:text-zinc-400 transition-colors duration-200 focus-visible:border-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-500"
      />
      <p
        className="text-right text-sm text-zinc-500"
        aria-live="polite"
        aria-atomic="true"
      >
        {value.length} / {maxLength}
      </p>
    </div>
  );
}
