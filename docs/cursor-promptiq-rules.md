# PromptIQ Development Rules

## Stack
- Use Next.js App Router only
- Use TypeScript strictly
- Use Tailwind CSS only for styling
- Use Next.js API routes for backend logic
- Use OpenAI Responses API only for AI features

## Folder Structure
- Application routes belong in /src/app
- Reusable UI components belong in /src/components
- Shared TypeScript types belong in /src/types
- Business logic and API orchestration belong in /src/services

## Code Standards
- Prefer server components unless interactivity is required
- Keep components modular and readable
- Use async/await consistently
- Strongly type all API responses
- Avoid deeply nested logic
- Prioritize readability over cleverness

## Styling
- Use Tailwind utility classes
- Avoid inline styles
- Keep spacing and layout consistent

## API Standards
- Validate inputs before processing
- Return typed JSON responses
- Handle errors gracefully
- Never expose API keys to the client

## AI Standards
- Structure prompts clearly
- Separate system prompts from user prompts
- Keep prompt templates modular
- Organize optimization logic cleanly