export type PromptValidationResult = {
  valid: boolean;
  reason?: string;
};

const MIN_LENGTH = 6;
const MIN_MEANINGFUL_WORDS = 1;

const TECHNICAL_PATTERN =
  /```|##\s|\b(function|const|let|var|import|export|class|interface|async|await|return|SELECT|FROM|WHERE|useEffect|useState|npm|typescript|javascript|python|react|next\.?js|api|json|sql|html|css)\b/i;

const COMMON_SHORT_WORDS = new Set([
  "a",
  "an",
  "ai",
  "as",
  "at",
  "be",
  "by",
  "do",
  "go",
  "he",
  "i",
  "if",
  "in",
  "is",
  "it",
  "me",
  "my",
  "no",
  "of",
  "on",
  "or",
  "so",
  "to",
  "up",
  "us",
  "we",
]);

function extractTokens(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[\s,.;:!?\-_#/`'"()[\]{}<>]+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 0);
}

function hasVowel(token: string): boolean {
  return /[aeiouy]/i.test(token);
}

function looksLikeMeaningfulToken(token: string): boolean {
  if (COMMON_SHORT_WORDS.has(token)) return true;
  if (token.length >= 2 && /^\d+$/.test(token)) return true;
  if (token.length >= 3 && hasVowel(token)) return true;
  if (token.length >= 4 && /[a-z]/i.test(token)) return true;
  return false;
}

function letterRatio(text: string): number {
  const letters = (text.match(/[a-zA-Z]/g) || []).length;
  const nonSpace = text.replace(/\s/g, "").length;
  if (nonSpace === 0) return 0;
  return letters / nonSpace;
}

function isTechnicalOrStructured(text: string): boolean {
  if (TECHNICAL_PATTERN.test(text)) return true;
  if (/[{}()[\]`]/.test(text) && text.trim().length >= 12) return true;
  return false;
}

function hasSeparatorSpam(text: string): boolean {
  const separators = (text.match(/[;|]/g) || []).length;
  const spaces = (text.match(/\s/g) || []).length;
  if (text.length >= 12 && separators >= 3 && spaces <= 1) return true;
  if (/([;|_])\1{2,}/.test(text)) return true;
  return false;
}

export function validatePrompt(prompt: string): PromptValidationResult {
  const trimmed = prompt.trim();

  if (trimmed.length < MIN_LENGTH) {
    return { valid: false, reason: "Prompt appears too short to optimize." };
  }

  const tokens = extractTokens(trimmed);
  const meaningfulTokens = tokens.filter(looksLikeMeaningfulToken);

  if (isTechnicalOrStructured(trimmed)) {
    if (meaningfulTokens.length >= MIN_MEANINGFUL_WORDS || letterRatio(trimmed) >= 0.45) {
      return { valid: true };
    }
  }

  if (meaningfulTokens.length < MIN_MEANINGFUL_WORDS) {
    return {
      valid: false,
      reason: "Prompt does not appear to contain meaningful language.",
    };
  }

  if (tokens.length >= 4 && meaningfulTokens.length / tokens.length < 0.35) {
    return {
      valid: false,
      reason: "Prompt does not appear to contain meaningful language.",
    };
  }

  if (letterRatio(trimmed) < 0.55) {
    return {
      valid: false,
      reason: "Prompt appears to contain mostly random characters or symbols.",
    };
  }

  if (hasSeparatorSpam(trimmed)) {
    return {
      valid: false,
      reason: "Prompt appears to contain mostly random characters or symbols.",
    };
  }

  if (trimmed.length >= 18 && !/\s/.test(trimmed) && meaningfulTokens.length < 2) {
    return {
      valid: false,
      reason: "Prompt does not appear to contain meaningful language.",
    };
  }

  return { valid: true };
}
