# Implementation Plan: veronica-piano

**Branch**: `020-veronica-piano` | **Date**: 2026-06-19 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/020-veronica-piano/spec.md`

## Summary

Implement an autonomous, free-play piano in Veronica's room. Players can interact with the piano, play notes via mouse or keyboard, discover a secret easter egg melody, and view unlocked sheet music earned from other minigames.

## Technical Context

**Language/Version**: TypeScript / React

**Primary Dependencies**: Native HTML Audio API, React Hooks, Zustand (`useGameStore`)

**Storage**: Global State (Zustand) for unlocked sheet music.

**Testing**: Jest for utility functions (if any sequence matching logic is extracted).

**Target Platform**: Web Browser (Desktop and Mobile)

**Project Type**: Web Application (Frontend)

**Performance Goals**: Audio latency < 50ms, polyphony support.

**Constraints**: Audio must not clip abruptly, keyboard focus must be managed gracefully.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

No complex patterns introduced. Extending existing `useGameStore`. Single component `VeronicaPiano.tsx` to handle UI and logic.

## Project Structure

### Documentation (this feature)

```text
specs/020-veronica-piano/
├── plan.md              # This file
├── research.md          # Audio and state management decisions
├── data-model.md        # Interfaces for Sheet Music and Piano Keys
└── spec.md              # Feature specification
```

### Source Code (repository root)

```text
src/
├── components/
│   └── game/
│       └── piano/
│           ├── VeronicaPiano.tsx
│           ├── PianoKeyboard.tsx
│           ├── SheetMusicTab.tsx
│           └── pianoKeysData.ts
├── store/
│   └── useGameStore.ts (modified to add Sheet Music state)
└── assets/
    └── audio/
        └── piano/ (new folder with note samples)
```

**Structure Decision**: The piano feature will live under `src/components/game/piano/` as it's a specific interactive element in the game room. `useGameStore` will be modified to include the new collectible entity.
