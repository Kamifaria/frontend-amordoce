# Implementation Plan: Harry's Guitar Minigame Update

**Branch**: `013-harry-guitar-update` | **Date**: 2026-06-16 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/013-harry-guitar-update/spec.md`

## Summary

This plan outlines the changes to `GuitarMinigame.tsx`. The goal is to reduce the minigame song duration to 30-40 seconds to improve pacing, and drastically redesign the UI: replacing the generic full-screen overlay with a focused "guitar strings" UI positioned where the dialogue box usually sits. Rhythm notes will appear on these strings, and the strings will visually tremble when notes are tapped.

## Technical Context

**Language/Version**: TypeScript / React (Next.js 14+)

**Primary Dependencies**: Framer Motion (for animations), Tailwind CSS, Zustand (state)

**Storage**: N/A (State is ephemeral or goes to global store)

**Testing**: N/A (No unit tests specified in repo currently)

**Target Platform**: Web Browsers (Responsive 16:9 container)

**Project Type**: Web Application (Visual Novel / Game)

**Performance Goals**: 60fps stable, smooth Framer Motion animations for strings.

**Constraints**: Audio needs to be stopped when duration ends or minigame is unmounted.

**Scale/Scope**: Updating 1 specific React component (`GuitarMinigame.tsx`).

## Constitution Check

*GATE: Passed.*
- **I. Component Isolation**: The `GuitarMinigame` remains isolated.
- **II. Premium & Responsive UI**: Using Framer Motion for the tremble effect ensures hardware-accelerated, high-quality micro-animations.
- **III. Strict Type Safety**: `Chord` interface will be extended safely.
- **IV. Centralized State Management**: Existing Zustand `useGameStore` remains untouched (we only call `endMinigame(score)`).

## Project Structure

### Documentation (this feature)

```text
specs/013-harry-guitar-update/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
└── spec.md              # Original specification
```

### Source Code (repository root)

```text
src/
└── components/
    └── game/
        └── minigames/
            └── GuitarMinigame.tsx
```

**Structure Decision**: We are updating an existing component `src/components/game/minigames/GuitarMinigame.tsx`. No new files are required outside of specs.
