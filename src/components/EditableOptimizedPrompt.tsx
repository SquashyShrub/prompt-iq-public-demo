"use client";

export type EditableOptimizedPromptProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  id?: string;
};

export function EditableOptimizedPrompt({
  value,
  onChange,
  disabled = false,
  id = "editable-optimized-prompt",
}: EditableOptimizedPromptProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-zinc-900">
        Edit improved prompt
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        rows={10}
        className="min-h-48 w-full resize-y rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm leading-relaxed text-zinc-800 transition-colors duration-200 focus-visible:border-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 disabled:cursor-not-allowed disabled:bg-zinc-50 disabled:text-zinc-500"
      />
      <p className="text-xs text-zinc-500">
        Changes here are used when you copy. Metadata and scores stay separate.
      </p>
    </div>
  );
}
