"use client";

import { useState } from "react";
import { compactSecondaryButtonClasses } from "@/components/buttonStyles";

export type CopyButtonProps = {
  text?: string;
  disabled?: boolean;
  label?: string;
  className?: string;
};

export function CopyButton({
  text,
  disabled = true,
  label = "Copy Improved Prompt",
  className = "",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const hasText = typeof text === "string" && text.trim().length > 0;
  const isDisabled = disabled || !hasText;

  async function handleCopy() {
    if (!hasText || !text) return;

    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard unavailable");
      }
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setFailed(false);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("[PromptIQ] Copy to clipboard failed", error);
      setCopied(false);
      setFailed(true);
      window.setTimeout(() => setFailed(false), 2000);
    }
  }

  const buttonLabel = copied ? "Copied!" : failed ? "Copy failed" : label;

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={handleCopy}
      className={`${compactSecondaryButtonClasses} ${className}`.trim()}
    >
      {buttonLabel}
    </button>
  );
}
