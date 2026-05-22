export type PromptInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  maxLength: number;
};

export function PromptInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  maxLength,
}: PromptInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-zinc-900">
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
        className="min-h-40 w-full resize-none rounded-lg border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-900 placeholder:text-zinc-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
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
