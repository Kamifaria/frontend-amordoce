# Implementation Plan: Dialogue and CG Image Backgrounds Fix

**Branch**: `011-dialogue-images-fix` | **Date**: 2026-06-12 | **Spec**: [spec.md](file:///c:/Users/Kamila%20Faria/Desktop/Amor%20doce%20da%20veronica/frontend-amordoce/specs/011-dialogue-images-fix/spec.md)

**Input**: Feature specification from `/specs/011-dialogue-images-fix/spec.md`

## Summary

This plan outlines the design and changes required to resolve transparent checkerboard grids in game illustrations/CGs and dialogue overlays. We will ensure that transparent PNGs correctly overlay the active story scene background (e.g. the corridor for the fight scene) using CSS layout composition, and adjust container dimensions and styles so that all images fit precisely within the gameplay borders.

## Technical Context

**Language/Version**: TypeScript / JavaScript (Next.js 14+)

**Primary Dependencies**: React 18, Tailwind CSS, Zustand, Framer Motion

**Storage**: N/A (Client-side state / LocalStorage via Zustand)

**Testing**: Manual visual testing via Browser subagent

**Target Platform**: Web browsers (16:9 aspect ratio container)

**Project Type**: Next.js App Router Frontend

**Performance Goals**: 60 FPS transition animations, zero layout shift (CLS)

**Constraints**: Center-aligned 16:9 aspect ratio game screen container

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Component Isolation**: Yes, changes will be isolated to [CGOverlay.tsx](file:///c:/Users/Kamila%20Faria/Desktop/Amor%20doce%20da%20veronica/frontend-amordoce/src/components/game/CGOverlay.tsx) and related dialogue/scene styling.
- **Premium & Responsive UI**: Yes, ensuring perfect fit and beautiful background overlays.
- **Strict Type Safety**: Yes, maintaining type safety in components and stores.
- **Centralized State Management**: Yes, utilizing current store values for active backgrounds.

## Project Structure

### Documentation (this feature)

```text
specs/011-dialogue-images-fix/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
└── quickstart.md        # Phase 1 output
```

### Source Code (repository root)

```text
src/
└── components/
    └── game/
        ├── CGOverlay.tsx
        ├── SpriteCharacter.tsx
        └── DialogueBox.tsx
```

**Structure Decision**: Single Next.js web application structure. Changes will focus on UI components in `src/components/game/`.

## Complexity Tracking

No violations.
