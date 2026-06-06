const FRIENDLY_BY_STATUS: Record<number, string> = {
  400: "Please check your prompt and try again.",
  500: "Something went wrong while optimizing your prompt. Please try again.",
  502: "We couldn't reach the optimization service. Please try again.",
  503: "The optimization service is temporarily unavailable. Please try again.",
};

const FRIENDLY_BY_MESSAGE: Record<string, string> = {
  "Failed to improve prompt":
    "Something went wrong while optimizing your prompt. Please try again.",
  "Invalid JSON body": "There was a problem sending your prompt. Please try again.",
};

function isNetworkError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  const message = error.message.toLowerCase();
  return (
    message.includes("failed to fetch") ||
    message.includes("networkerror") ||
    message.includes("network request failed") ||
    message.includes("load failed")
  );
}

export function toFriendlyUserMessage(
  error: unknown,
  options?: { status?: number; apiMessage?: string },
): string {
  if (isNetworkError(error)) {
    return "Network connection issue detected. Please check your connection and try again.";
  }

  const status = options?.status;
  if (status !== undefined && FRIENDLY_BY_STATUS[status]) {
    return FRIENDLY_BY_STATUS[status]!;
  }

  const apiMessage = options?.apiMessage?.trim();
  if (apiMessage && FRIENDLY_BY_MESSAGE[apiMessage]) {
    return FRIENDLY_BY_MESSAGE[apiMessage]!;
  }

  if (
    apiMessage &&
    (apiMessage.includes("prompt is required") ||
      apiMessage.includes("meaningful language") ||
      apiMessage.includes("too short"))
  ) {
    return apiMessage;
  }

  if (error instanceof Error && error.message.trim() !== "") {
    const lower = error.message.toLowerCase();
    if (lower.includes("failed to fetch") || lower.includes("network")) {
      return "Network connection issue detected. Please check your connection and try again.";
    }
  }

  return "Something went wrong while optimizing your prompt. Please try again.";
}

export function logOptimizationError(context: string, error: unknown): void {
  console.error(`[PromptIQ] ${context}`, error);
}
