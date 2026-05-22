import { NextResponse } from "next/server";

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

  return NextResponse.json({
    optimizedPrompt: "This is a placeholder optimized prompt.",
    score: null,
    explanation:
      "OpenAI integration will be added in a later Phase 2 step.",
  });
}
