"use client";

import { useState } from "react";

export type CopyButtonProps = {
  text?: string;
  disabled?: boolean;
  className?: string;
};

export function CopyButton({
  text,
  disabled = true,
  className = "",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const hasText = typeof text === "string" && text.trim().length > 0;
  const isDisabled = disabled || !hasText;

  async function handleCopy() {
    if (!hasText || !text) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  const label = copied ? "Copied!" : "Copy";

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={handleCopy}
      className={`rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-900 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 enabled:hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50 ${className}`.trimEnd()}
    >
      {label}
    </button>
  );
}
