const PLACEHOLDER_TECHNIQUES = [
  "Task clarification",
  "Context framing",
  "Output formatting",
  "Constraint definition",
] as const;

export async function optimizePrompt(
  prompt: string,
  techniquesUsed: readonly string[] = PLACEHOLDER_TECHNIQUES,
): Promise<string> {
  return buildStructuredPrompt(prompt, techniquesUsed);
}

function buildStructuredPrompt(
  prompt: string,
  techniquesUsed: readonly string[],
): string {
  const sections: string[] = [];

  if (techniquesUsed.includes("Task clarification")) {
    sections.push("## Task");
    sections.push(`Clearly complete the following request: ${prompt}`);
  } else {
    sections.push(prompt);
  }

  if (techniquesUsed.includes("Context framing")) {
    sections.push("");
    sections.push("## Context");
    sections.push(
      "Provide relevant background, audience, and situational details needed to tailor the response.",
    );
  }

  if (techniquesUsed.includes("Constraint definition")) {
    sections.push("");
    sections.push("## Constraints");
    sections.push(
      "- Stay focused on the request scope",
      "- Avoid unrelated information",
      "- Use clear, practical language",
    );
  }

  if (techniquesUsed.includes("Output formatting")) {
    sections.push("");
    sections.push("## Output Format");
    sections.push(
      "Organize the response with clear headings, bullet points, and a logical step-by-step structure.",
    );
  }

  return sections.join("\n");
}
