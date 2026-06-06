"use client";

import { ImproveButton } from "@/components/ImproveButton";
import { PromptInput } from "@/components/PromptInput";

const MAX_CHARACTERS = 500;
const TEXTAREA_ID = "weak-prompt-input";

export type WeakPromptTextAreaProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  isLoading?: boolean;
  validationError?: string | null;
};

export function WeakPromptTextArea({
  value,
  onChange,
  onSubmit,
  isLoading = false,
  validationError = null,
}: WeakPromptTextAreaProps) {
  const hasValidPrompt = value.trim().length > 0;
  const isButtonDisabled = !hasValidPrompt || isLoading;

  return (
    <section
      className="pb-6 sm:pb-8"
      aria-labelledby="weak-prompt-heading"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-5">
        <header className="flex flex-col gap-2 text-center sm:text-left">
          <h2
            id="weak-prompt-heading"
            className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl"
          >
            Try Improving a Weak Prompt
          </h2>
          <p className="max-w-prose text-base leading-relaxed text-zinc-600">
            Enter a vague or under-specified prompt below, then optimize it to
            see a structured before-and-after comparison.
          </p>
        </header>

        <PromptInput
          id={TEXTAREA_ID}
          label="Your weak prompt"
          value={value}
          onChange={onChange}
          placeholder="Write me a workout plan."
          maxLength={MAX_CHARACTERS}
          disabled={isLoading}
        />

        {validationError && (
          <p
            className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 transition-opacity duration-300"
            role="alert"
          >
            {validationError}
          </p>
        )}

        <ImproveButton
          disabled={isButtonDisabled}
          isLoading={isLoading}
          onClick={onSubmit}
        />
      </div>
    </section>
  );
}
