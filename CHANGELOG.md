# Changelog

All notable changes to this project will be documented in this file.

# [Unreleased]

Planned:
- Real OpenAI Responses API integration
- Editable optimized prompt results
- Local/session prompt history
- Expanded prompt engineering techniques
- Score explanation info button
- Improved copy behavior for optimized prompts

---

Staged:

## [0.3.0-dev] - 2026-05-23

Added

App:
- Connected frontend prompt optimizer workflow to API route
- Added loading, error, idle, and success result states
- Displayed structured optimization results in the UI
- Added visible prompt engineering techniques used
- Added before/after comparison UI
- Added prompt improvement categories
- Added structured AI response format

Updated

App:
- Updated PromptResult to display scores, explanation, techniques, categories, and comparison
- Updated placeholder optimization workflow so displayed techniques match generated prompt structure
- Updated ImproveButton and PromptInput for interactive testing
- Updated EmptyResultsArea to support result, loading, and error states

## [0.2.0] - 2026-05-22

Added

Backend:
- Created `.env.local` support
- Added `OPENAI_API_KEY` environment variable placeholder
- Created `/api/improve-prompt` API route
- Added shared PromptRequest and PromptResult types
- Created PromptService
- Created OpenAIService placeholder boundary
- Added deterministic prompt scoring system
- Added explanation output
- Added prompt engineering techniques metadata

Updated

Backend:
- Refactored API route to use service-layer workflow
- Preserved placeholder OpenAI behavior with no real model calls

Tooling:
- Added PowerShell-safe validation scripts
- Updated ESLint ignores for generated files

## [0.1.0] - 2026-05-22

Added

App:
- Initialized Next.js project foundation with TypeScript
- Configured Tailwind CSS
- Created Phase 1 folder structure
- Added landing heading section
- Added weak prompt input section
- Added reusable improve button
- Added empty results area

Components:
- LandingHeading
- WeakPromptTextArea
- PromptInput
- ImproveButton
- EmptyResultsArea
- PromptResult
- CopyButton
- ScoreBadge

Updated

App:
- Updated home page to render the full Phase 1 UI flow:
  LandingHeading → WeakPromptTextArea → EmptyResultsArea

## [0.0.0] - 2026-05-18

Added

Docs:
- DESIGN.md
- STRATEGY.md

Updated

Docs:
- README.md
- CHANGELOG.md
