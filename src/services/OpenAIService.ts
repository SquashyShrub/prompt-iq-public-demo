const CORE_TECHNIQUES = [
  "Task clarification",
  "Context framing",
  "Output formatting",
  "Constraint definition",
] as const;

const VARIANT_COUNT = 4;

type VariantStyle = "balanced" | "detailed" | "concise" | "role-based";

export function getVariantIndex(attempt: number): number {
  const safeAttempt = Number.isFinite(attempt) && attempt >= 0 ? Math.floor(attempt) : 0;
  return safeAttempt % VARIANT_COUNT;
}

export function getTechniquesForAttempt(attempt: number): string[] {
  const variantIndex = getVariantIndex(attempt);
  const base = [...CORE_TECHNIQUES];

  switch (variantIndex) {
    case 0:
      return base;
    case 1:
      return [...base, "Step-by-step structure", "Success criteria"];
    case 2:
      return [...base, "Tone control"];
    case 3:
      return [...base, "Role assignment", "Audience targeting"];
    default:
      return base;
  }
}

export async function optimizePrompt(
  prompt: string,
  techniquesUsed: readonly string[],
  attempt: number = 0,
): Promise<string> {
  const variantIndex = getVariantIndex(attempt);
  const style: VariantStyle =
    variantIndex === 0
      ? "balanced"
      : variantIndex === 1
        ? "detailed"
        : variantIndex === 2
          ? "concise"
          : "role-based";

  return buildStructuredPrompt(prompt, techniquesUsed, style);
}

function buildStructuredPrompt(
  prompt: string,
  techniquesUsed: readonly string[],
  style: VariantStyle,
): string {
  const parsed = parseStructuredSections(prompt);
  const isAlreadyStructured = parsed.foundAnySection;
  const sections: string[] = [];
  const coreRequest = stripSectionHeadings(prompt) || prompt;

  if (techniquesUsed.includes("Role assignment")) {
    const roleBody =
      parsed.sections.Role.trim() !== ""
        ? parsed.sections.Role
        : getRoleBody(style, coreRequest);
    sections.push("## Role", roleBody);
  }

  const taskBody = getTaskBody(style, coreRequest, parsed.sections.Task, isAlreadyStructured);
  if (techniquesUsed.includes("Task clarification")) {
    if (sections.length > 0) sections.push("");
    sections.push("## Task", taskBody);
  } else if (sections.length === 0) {
    sections.push(prompt);
  }

  if (techniquesUsed.includes("Context framing")) {
    const contextBody = getContextBody(
      style,
      parsed.sections.Context,
      techniquesUsed.includes("Audience targeting"),
    );
    sections.push("", "## Context", contextBody);
  }

  if (techniquesUsed.includes("Constraint definition")) {
    const constraintsBody = getConstraintsBody(style, parsed.sections.Constraints);
    sections.push("", "## Constraints", constraintsBody);
  }

  if (techniquesUsed.includes("Tone control")) {
    const toneBody =
      parsed.sections.Tone.trim() !== ""
        ? parsed.sections.Tone
        : getToneBody(style);
    sections.push("", "## Tone", toneBody);
  }

  if (techniquesUsed.includes("Output formatting")) {
    const formatBody = getFormatBody(
      style,
      parsed.sections["Output Format"],
      techniquesUsed.includes("Step-by-step structure"),
    );
    sections.push("", "## Output Format", formatBody);
  }

  if (techniquesUsed.includes("Success criteria")) {
    const successBody =
      parsed.sections["Success Criteria"].trim() !== ""
        ? parsed.sections["Success Criteria"]
        : getSuccessCriteriaBody(style, coreRequest);
    sections.push("", "## Success Criteria", successBody);
  }

  return sections.join("\n").replace(/^\n+/, "");
}

function getRoleBody(style: VariantStyle, coreRequest: string): string {
  if (style === "role-based") {
    return `You are an expert assistant specializing in the domain of this request: "${coreRequest}". Apply professional judgment and practical recommendations.`;
  }
  return "You are a helpful expert assistant focused on producing clear, actionable results.";
}

function getTaskBody(
  style: VariantStyle,
  coreRequest: string,
  existingTask: string,
  isAlreadyStructured: boolean,
): string {
  const existing = existingTask.trim();

  if (existing !== "") return existing;

  switch (style) {
    case "detailed":
      return `Provide a thorough, instructional response for: ${coreRequest}. Break the work into clear phases and explain key decisions.`;
    case "concise":
      return `Complete this request efficiently: ${coreRequest}. Prioritize direct actions and essential details only.`;
    case "role-based":
      return `As the assigned expert, deliver a high-quality solution for: ${coreRequest}.`;
    case "balanced":
    default:
      return isAlreadyStructured
        ? coreRequest
        : `Clearly complete the following request: ${coreRequest}`;
  }
}

function getContextBody(
  style: VariantStyle,
  existingContext: string,
  includeAudience: boolean,
): string {
  const existing = existingContext.trim();
  if (existing !== "") return existing;

  if (includeAudience) {
    return "Identify the target audience, their goals, and situational constraints. Tailor examples and recommendations to that audience.";
  }

  switch (style) {
    case "detailed":
      return "Include relevant background, assumptions, constraints, and any domain context needed for a complete answer.";
    case "concise":
      return "Include only the minimum context required to avoid ambiguity.";
    case "role-based":
      return "Describe the user scenario, stakeholders, and environment so the expert response stays relevant.";
    case "balanced":
    default:
      return "Provide relevant background, audience, and situational details needed to tailor the response.";
  }
}

function getConstraintsBody(
  style: VariantStyle,
  existingConstraints: string,
): string {
  const existing = existingConstraints.trim();
  if (existing !== "") return existing;

  switch (style) {
    case "concise":
      return "- Stay within scope\n- Keep language direct and practical\n- Avoid unnecessary detail";
    case "detailed":
      return "- Stay focused on the request scope\n- Cover important edge cases where relevant\n- Use precise, instructional language";
    case "role-based":
      return "- Apply expert-level rigor\n- Avoid generic filler\n- Keep recommendations actionable";
    case "balanced":
    default:
      return [
        "- Stay focused on the request scope",
        "- Avoid unrelated information",
        "- Use clear, practical language",
      ].join("\n");
  }
}

function getToneBody(style: VariantStyle): string {
  switch (style) {
    case "concise":
      return "Use a direct, confident, and efficient tone. Prefer short sentences and actionable phrasing.";
    case "detailed":
      return "Use a clear, instructional tone that guides the reader step by step without unnecessary jargon.";
    case "role-based":
      return "Use a professional expert tone that is authoritative, practical, and easy to follow.";
    case "balanced":
    default:
      return "Use a clear, professional tone that balances clarity with practical guidance.";
  }
}

function getFormatBody(
  style: VariantStyle,
  existingFormat: string,
  includeSteps: boolean,
): string {
  const existing = existingFormat.trim();
  if (existing !== "") return existing;

  if (includeSteps) {
    return "Present the answer in numbered steps with brief explanations for each step, followed by a short summary.";
  }

  switch (style) {
    case "concise":
      return "Use short sections with bullet points and a brief summary at the end.";
    case "detailed":
      return "Organize the response with headings, numbered steps, bullet lists, and a final recap section.";
    case "role-based":
      return "Structure the answer with expert recommendations, rationale, and a prioritized action plan.";
    case "balanced":
    default:
      return "Organize the response with clear headings, bullet points, and a logical step-by-step structure.";
  }
}

function getSuccessCriteriaBody(style: VariantStyle, coreRequest: string): string {
  switch (style) {
    case "detailed":
      return `The response should fully address "${coreRequest}", include actionable steps, and make it easy to verify completion.`;
    case "concise":
      return `The response should directly satisfy "${coreRequest}" in the shortest complete form.`;
    case "role-based":
      return `The response should demonstrate expert-level quality for "${coreRequest}" with clear, defensible recommendations.`;
    case "balanced":
    default:
      return `The response should clearly satisfy "${coreRequest}" with practical, well-structured output.`;
  }
}

type StructuredSectionName =
  | "Task"
  | "Context"
  | "Constraints"
  | "Output Format"
  | "Role"
  | "Tone"
  | "Success Criteria";

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
    Role: [],
    Tone: [],
    "Success Criteria": [],
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
      Role: initial.Role.join("\n").trim(),
      Tone: initial.Tone.join("\n").trim(),
      "Success Criteria": initial["Success Criteria"].join("\n").trim(),
    },
  };
}

function matchSectionHeading(line: string): StructuredSectionName | null {
  const normalized = line.trim().toLowerCase();
  if (normalized === "## task") return "Task";
  if (normalized === "## context") return "Context";
  if (normalized === "## constraints") return "Constraints";
  if (normalized === "## output format") return "Output Format";
  if (normalized === "## role") return "Role";
  if (normalized === "## tone") return "Tone";
  if (normalized === "## success criteria") return "Success Criteria";
  return null;
}

function stripSectionHeadings(prompt: string): string {
  return prompt
    .split(/\r?\n/)
    .filter((line) => matchSectionHeading(line) === null)
    .join("\n")
    .trim();
}
