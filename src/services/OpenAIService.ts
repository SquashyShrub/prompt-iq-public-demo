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
  const parsed = parseStructuredSections(prompt);
  const isAlreadyStructured = parsed.foundAnySection;
  const sections: string[] = [];

  const taskBody = isAlreadyStructured
    ? ensureNonEmpty(
        parsed.sections.Task,
        `Clearly complete the following request: ${stripSectionHeadings(prompt)}`,
      )
    : `Clearly complete the following request: ${prompt}`;

  if (techniquesUsed.includes("Task clarification")) {
    sections.push("## Task", taskBody);
  } else {
    sections.push(prompt);
  }

  if (techniquesUsed.includes("Context framing")) {
    const contextBody = ensureNonEmpty(
      parsed.sections.Context,
      "Provide relevant background, audience, and situational details needed to tailor the response.",
    );
    sections.push("", "## Context", contextBody);
  }

  if (techniquesUsed.includes("Constraint definition")) {
    const constraintsBody = ensureNonEmpty(
      parsed.sections.Constraints,
      [
        "- Stay focused on the request scope",
        "- Avoid unrelated information",
        "- Use clear, practical language",
      ].join("\n"),
    );
    sections.push("", "## Constraints", constraintsBody);
  }

  if (techniquesUsed.includes("Output formatting")) {
    const formatBody = ensureNonEmpty(
      parsed.sections["Output Format"],
      "Organize the response with clear headings, bullet points, and a logical step-by-step structure.",
    );
    sections.push("", "## Output Format", formatBody);
  }

  return sections.join("\n");
}

type StructuredSectionName = "Task" | "Context" | "Constraints" | "Output Format";

function parseStructuredSections(prompt: string): {
  foundAnySection: boolean;
  sections: Record<StructuredSectionName, string>;
} {
  const lines = prompt.split(/\r?\n/);
  const initial: Record<StructuredSectionName, string[]> = {
    Task: [],
    Context: [],
    Constraints: [],
    "Output Format": [],
  };

  let current: StructuredSectionName | null = null;
  let foundAnySection = false;

  for (const line of lines) {
    const section = matchSectionHeading(line);
    if (section) {
      current = section;
      foundAnySection = true;
      continue;
    }

    if (current) initial[current].push(line);
  }

  return {
    foundAnySection,
    sections: {
      Task: initial.Task.join("\n").trim(),
      Context: initial.Context.join("\n").trim(),
      Constraints: initial.Constraints.join("\n").trim(),
      "Output Format": initial["Output Format"].join("\n").trim(),
    },
  };
}

function matchSectionHeading(line: string): StructuredSectionName | null {
  const normalized = line.trim().toLowerCase();
  if (normalized === "## task") return "Task";
  if (normalized === "## context") return "Context";
  if (normalized === "## constraints") return "Constraints";
  if (normalized === "## output format") return "Output Format";
  return null;
}

function ensureNonEmpty(value: string, fallback: string): string {
  const trimmed = value.trim();
  return trimmed === "" ? fallback : trimmed;
}

function stripSectionHeadings(prompt: string): string {
  return prompt
    .split(/\r?\n/)
    .filter((line) => matchSectionHeading(line) === null)
    .join("\n")
    .trim();
}
