export type PromptRequest = {
  prompt: string;
};

export type PromptResult = {
  originalPrompt: string;
  optimizedPrompt: string;
  originalScore: number;
  improvedScore: number;
  explanation: string;
  techniquesUsed: string[];
};
