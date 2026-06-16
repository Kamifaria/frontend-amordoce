# Implementation Plan: Story CGs & Mobile Minigames Expansion

**Branch**: `[014-story-cgs-minigames]` | **Date**: 2026-06-16 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/014-story-cgs-minigames/spec.md`

## Summary

This feature expands the visual novel by adding contextual CG images to key dialogue nodes and introducing 4 new mobile-responsive minigames (Memory, Shell Game, Swipe, and Endless Runner) that are triggered directly from story choices.

## Technical Context

**Language/Version**: TypeScript / React 18

**Primary Dependencies**: framer-motion, lucide-react

**Storage**: Zustand (useGameStore)

**Testing**: Manual testing / Jest

**Target Platform**: Web Browser (Mobile-First)

**Project Type**: Web Application (Visual Novel / Game)

**Performance Goals**: 60fps animations for minigames on mobile devices.

**Constraints**: Tailwind CSS constraints, full touch support for all games.

**Scale/Scope**: 4 new isolated minigame components and storyData integration.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

No constitution violations detected. Standard Next.js/React patterns with Zustand are maintained.

## Project Structure

### Documentation (this feature)

```text
specs/014-story-cgs-minigames/
├── plan.md              
├── research.md          
├── data-model.md        
├── quickstart.md        
└── tasks.md             
```

### Source Code (repository root)

```text
src/
├── mock/
│   └── storyData.ts
├── components/
│   └── game/
│       ├── GameScreen.tsx
│       └── minigames/
│           ├── LysandreMemoryGame.tsx
│           ├── RemiTarotGame.tsx
│           ├── NathanielSwipeGame.tsx
│           └── CastielEscapeGame.tsx
```

**Structure Decision**: The minigames are strictly isolated components inside the `minigames/` folder, instantiated dynamically by `GameScreen.tsx` based on the story node payload.
