# Implementation Plan: Story Exploration & Pacing

**Branch**: `[008-story-exploration-and-pacing]` | **Date**: 2026-06-11 | **Spec**: [spec.md](file:///c:/Users/Kamila%20Faria/Desktop/Amor%20doce%20da%20veronica/frontend-amordoce/specs/008-story-exploration-and-pacing/spec.md)

**Input**: Feature specification from `specs/008-story-exploration-and-pacing/spec.md`

## Summary

This feature implements Episode 1 story progression, free map exploration pacing, and the progressive unlocking of game locations (Pátio, Quadra, Galpão, and eventually Cinema) in the Zustand game store. The player starts in a linear intro sequence (Corridor and Classroom), is then released to explore school locations, and unlocks the Cinema when affinity requirements are met.

## Technical Context

**Language/Version**: TypeScript / React 18 / Next.js 14+

**Primary Dependencies**: Zustand, Framer Motion, Tailwind CSS

**Storage**: Zustand Store with optional LocalStorage persistence for game saves

**Testing**: Jest, React Testing Library

**Target Platform**: Modern Web Browsers

**Project Type**: Next.js App Router Frontend Web Application

**Performance Goals**: Stable 60 FPS transitions during location changes and character entrance animations.

**Constraints**: Preserving 16:9 responsive aspect ratio for the game UI container.

**Scale/Scope**: 7 primary characters, 5 explorable locations, 1 chapter progression state.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Component Isolation**: Every component (e.g., `MapOverlay`, `DialogueBox`, `SpriteCharacter`) receives state via props or selectors and remains isolated. (PASSED)
- **Premium & Responsive UI**: Transitions use Framer Motion, and the layout adheres to the 16:9 viewport scale wrapper. (PASSED)
- **Strict Type Safety**: All narrative stages and locations are fully typed under `src/shared/types.ts`. (PASSED)
- **Centralized State Management**: Narrative progress, current location, and character affinity are centralized in `useGameStore.ts`. (PASSED)

## Project Structure

### Documentation (this feature)

```text
specs/008-story-exploration-and-pacing/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
└── quickstart.md        # Phase 1 output
```

### Source Code (repository root)

```text
src/
├── app/
│   └── game/
│       ├── page.tsx
│       └── episodes/
├── components/
│   └── game/
│       ├── GameScreen.tsx
│       ├── MapOverlay.tsx
│       ├── SpriteCharacter.tsx
│       └── DialogueBox.tsx
├── shared/
│   └── types.ts
├── store/
│   └── useGameStore.ts
└── mock/
    └── storyData.ts
```

**Structure Decision**: Standard Next.js single project layout (Option 1). We will modify the existing store, components, and mock files in-place to support the exploration state machine.

## Complexity Tracking

*No violations of the constitution are required for this implementation.*
