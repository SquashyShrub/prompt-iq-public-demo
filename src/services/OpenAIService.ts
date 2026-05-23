export async function optimizePrompt(prompt: string): Promise<string> {
  return `Create a clear, structured response for the following request: ${prompt}. Include relevant context, constraints, and an organized output format.`;
}
