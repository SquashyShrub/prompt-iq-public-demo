import { NextResponse } from "next/server";
import { improvePrompt } from "@/services/PromptService";
import type { PromptRequest } from "@/types/prompt";

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

  const promptRequest: PromptRequest = {
    prompt: (body as { prompt: string }).prompt,
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
