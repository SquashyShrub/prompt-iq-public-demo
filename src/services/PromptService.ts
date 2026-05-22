import type { PromptRequest, PromptResult } from "@/types/prompt";
import { optimizePrompt } from "@/services/OpenAIService";

export async function improvePrompt(
  request: PromptRequest,
): Promise<PromptResult> {
  const sanitized = request.prompt.trim();

  if (sanitized === "") {
    throw new Error("prompt is required and must be a non-empty string");
  }

  return optimizePrompt(sanitized);
}
