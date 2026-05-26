import { NextResponse } from "next/server";
import { improvePrompt } from "@/services/PromptService";
import type { PromptRequest } from "@/types/prompt";

function parseAttempt(value: unknown): number {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
    return 0;
  }
  return Math.floor(value);
}

function parsePreviousImprovedScore(value: unknown): number | undefined {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return undefined;
  }
  return Math.max(0, Math.min(100, Math.round(value)));
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("prompt" in body) ||
    typeof (body as { prompt: unknown }).prompt !== "string" ||
    (body as { prompt: string }).prompt.trim() === ""
  ) {
    return NextResponse.json(
      { error: "prompt is required and must be a non-empty string" },
      { status: 400 },
    );
  }

  const record = body as Record<string, unknown>;

  const promptRequest: PromptRequest = {
    prompt: (record.prompt as string).trim(),
    attempt: parseAttempt(record.attempt),
    previousImprovedScore: parsePreviousImprovedScore(
      record.previousImprovedScore,
    ),
  };

  try {
    const result = await improvePrompt(promptRequest);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Failed to improve prompt" },
      { status: 500 },
    );
  }
}
