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
};

export function WeakPromptTextArea({
  value,
  onChange,
  onSubmit,
  isLoading = false,
}: WeakPromptTextAreaProps) {
  const hasValidPrompt = value.trim().length > 0;
  const isButtonDisabled = !hasValidPrompt || isLoading;

  return (
    <section
      className="px-6 pb-8 pt-0 sm:px-8"
      aria-labelledby="weak-prompt-heading"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <header className="flex flex-col gap-2 text-center sm:text-left">
          <h2
            id="weak-prompt-heading"
            className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl"
          >
            Try Improving a Weak Prompt
          </h2>
          <p className="text-base leading-relaxed text-zinc-600">
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

        <ImproveButton
          disabled={isButtonDisabled}
          isLoading={isLoading}
          onClick={onSubmit}
        />
      </div>
    </section>
  );
}
