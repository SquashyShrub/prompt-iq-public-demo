export type PromptRequest = {
  prompt: string;
  attempt?: number;
  previousImprovedScore?: number;
};

export type PromptImprovementCategory = {
  name: string;
  description: string;
  impact: "low" | "medium" | "high";
};

export type PromptResult = {
  originalPrompt: string;
  optimizedPrompt: string;
  originalScore: number;
  improvedScore: number;
  explanation: string;
  techniquesUsed: string[];
  improvementCategories: PromptImprovementCategory[];
};

export type StructuredPromptOptimizationResponse = PromptResult;
