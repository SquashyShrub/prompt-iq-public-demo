"use client";

import { useState } from "react";
import { ImproveButton } from "@/components/ImproveButton";
import { PromptInput } from "@/components/PromptInput";

const MAX_CHARACTERS = 500;
const TEXTAREA_ID = "weak-prompt-input";

export function WeakPromptTextArea() {
  const [value, setValue] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const nextValue = event.target.value;
    if (nextValue.length <= MAX_CHARACTERS) {
      setValue(nextValue);
    }
  }

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
            Enter a vague or under-specified prompt below. This is where you
            will start the optimization flow once PromptIQ is ready to improve
            your instructions.
          </p>
        </header>

        <PromptInput
          id={TEXTAREA_ID}
          label="Your weak prompt"
          value={value}
          onChange={handleChange}
          placeholder="Write me a workout plan."
          maxLength={MAX_CHARACTERS}
        />

        <ImproveButton />
      </div>
    </section>
  );
}
