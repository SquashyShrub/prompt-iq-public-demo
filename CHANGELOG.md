# Changelog

All notable changes to this project will be documented in this file.

---

## [0.5.0-alpha]

### Added

#### UI & UX
- Added loading spinner workflow
- Added results loading skeletons
- Added friendly error messaging system
- Added reusable button styling utilities
- Added responsive footer component
- Added typography and spacing polish pass
- Added accessibility-focused hover and focus states

#### Reliability
- Added malformed response normalization
- Added safe PromptResult fallback handling
- Added score clamping safeguards
- Added optimization response validation

#### Prompt Optimization
- Added Copy Improved Prompt workflow
- Added copy success and failure feedback
- Added Try Again workflow
- Added optimization attempt tracking
- Added deterministic optimization variants
- Added structured prompt reuse detection
- Added duplicate section prevention

#### Testing
- Added unit testing coverage
- Added long prompt validation tests
- Added short prompt validation tests
- Added empty prompt validation tests
- Added API failure and fallback tests

### Updated

#### Optimization Engine
- Improved variant generation quality
- Improved technique-aware optimization structure
- Improved score consistency between optimization variants

#### UI
- Improved prompt editing workflow
- Improved loading-state experience
- Improved result presentation
- Improved responsive layout behavior
- Improved typography, spacing, and visual hierarchy

#### Documentation
- Updated README for public demo release
- Updated deployment documentation
- Updated architecture documentation
- Updated project roadmap

### Fixed

#### Prompt Workflow
- Fixed copy behavior copying metadata and section headings
- Fixed duplicate structured prompt sections
- Fixed weak retry differentiation
- Fixed malformed optimization response handling

#### Validation
- Fixed edge-case prompt handling
- Fixed fallback behavior consistency

### Deployment

#### Production Readiness
- Deployed PromptIQ public demo
- Verified production build pipeline
- Verified unit testing pipeline
- Verified responsive layouts across common screen sizes
- Established public demo release baseline

## [0.4.0-alpha] - 2026-05-26

### Added

#### App:
- Added editable optimized prompt workflow
- Added editable optimized prompt textarea behavior
- Added local prompt history sidebar
- Added localStorage persistence for recent optimizations
- Added history restoration workflow
- Added “Clear History” workflow
- Added prompt score information tooltip
- Added lightweight prompt validation heuristics
- Added live optimized prompt score recalculation
- Added deterministic “Try Again” optimization variants
- Added optimization attempt tracking system
- Added variant cycling behavior
- Added improved copy-only optimized prompt workflow

#### Optimization Engine:
- Added balanced optimization style
- Added detailed instructional optimization style
- Added concise action-oriented optimization style
- Added role-based expert optimization style
- Added score stabilization logic
- Added duplicate structured-section prevention
- Added prompt technique-aware optimization logic

#### Validation:
- Added lightweight English/relevance validation
- Added gibberish/random-character detection heuristics
- Added structured prompt validation safeguards

### Updated

#### UI:
- Moved local history sidebar to responsive left-side layout
- Improved editable optimized prompt UX
- Improved responsive sidebar layout
- Improved result workflow polish
- Improved prompt score UX

#### Optimization:
- Updated deterministic optimization workflow to produce meaningfully distinct variants
- Updated optimization techniques so displayed techniques reflect actual generated structure
- Updated score recalculation workflow for edited optimized prompts

### Fixed

#### UI:
- Fixed history tile overflow behavior
- Fixed copy button copying metadata/headings
- Fixed weak “Try Again” differentiation

#### Validation:
- Prevented invalid/gibberish prompt optimization requests
- Prevented malformed structured prompt duplication

### Technical

#### Architecture:
- Expanded PromptRequest attempt-tracking support
- Added previousImprovedScore stabilization support
- Added reusable validation utility layer
- Improved local prompt persistence handling
- Improved client-side score synchronization

#### Validation:
- npm run check ✅
- npm run dev ✅
- Manual variant workflow testing completed
- Structured prompt reuse validated

---

## [0.3.0-dev] - 2026-05-23

### Added

#### App:
- Connected frontend prompt optimizer workflow to API route
- Added loading, error, idle, and success result states
- Displayed structured optimization results in the UI
- Added visible prompt engineering techniques used
- Added before/after comparison UI
- Added prompt improvement categories
- Added structured AI response format
- Added deterministic placeholder optimization workflow

#### Optimization:
- Added prompt scoring system
- Added prompt score comparison workflow
- Added optimization explanations
- Added optimization technique tracking

### Updated

#### App:
- Updated PromptResult to display scores, explanations, techniques, categories, and comparison
- Updated placeholder optimization workflow so displayed techniques match generated prompt structure
- Updated ImproveButton and PromptInput for interactive testing
- Updated EmptyResultsArea to support result, loading, and error states

#### Architecture:
- Improved service-layer optimization structure
- Improved result formatting workflow

---

## [0.2.0] - 2026-05-22

### Added

#### Backend:
- Created `.env.local` support
- Added `OPENAI_API_KEY` environment variable placeholder
- Created `/api/improve-prompt` API route
- Added shared PromptRequest and PromptResult types
- Created PromptService
- Created OpenAIService placeholder boundary
- Added deterministic prompt scoring system
- Added explanation output structure
- Added prompt engineering techniques metadata

#### Architecture:
- Added layered service architecture:
  Frontend → API Route → PromptService → OpenAIService

### Updated

#### Backend:
- Refactored API route to use service-layer workflow
- Preserved placeholder OpenAI behavior with no live model calls

#### Tooling:
- Added PowerShell-safe validation scripts
- Updated ESLint ignores for generated files

---

## [0.1.0] - 2026-05-22

### Added

#### App:
- Initialized Next.js project foundation with TypeScript
- Configured Tailwind CSS
- Created initial Phase 1 folder structure
- Added landing heading section
- Added weak prompt input section
- Added reusable improve button
- Added empty results area

#### Components:
- LandingHeading
- WeakPromptTextArea
- PromptInput
- ImproveButton
- EmptyResultsArea
- PromptResult
- CopyButton
- ScoreBadge

### Updated

#### App:
- Updated home page to render the full Phase 1 UI flow:
  LandingHeading → WeakPromptTextArea → EmptyResultsArea

---

## [0.0.0] - 2026-05-18

### Added

Docs:
- DESIGN.md
- STRATEGY.md
- Initial roadmap planning
- Initial architecture planning
- Initial feature planning

- README.md
- CHANGELOG.md
