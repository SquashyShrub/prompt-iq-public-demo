export function toCopyablePromptBody(optimizedPrompt: string): string {
  return optimizedPrompt
    .split(/\r?\n/)
    .filter((line) => !isStructuredHeading(line))
    .join("\n")
    .trim();
}

function isStructuredHeading(line: string): boolean {
  const normalized = line.trim().toLowerCase();
  return (
    normalized === "## task" ||
    normalized === "## context" ||
    normalized === "## constraints" ||
    normalized === "## output format" ||
    normalized === "## role" ||
    normalized === "## tone" ||
    normalized === "## success criteria"
  );
}
