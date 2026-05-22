export type PromptRequest = {
  prompt: string;
};

export type PromptResult = {
  optimizedPrompt: string;
  score: number | null;
  explanation: string;
};
