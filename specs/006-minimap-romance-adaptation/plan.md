# Implementation Plan: Mini-Map Navigation & Advanced Romance Routes

**Branch**: `006-minimap-romance-adaptation` | **Date**: 2026-06-10 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/006-minimap-romance-adaptation/spec.md`

## Summary
Add a mini-map exploration overlay allowing navigation between School and Patio. Adapt character dialogue, phone calls, and date invitations to branch based on affinity tiers (Friendship vs. Love), implementing ambiguous choices to increase romance difficulty. Integrate Maggie's route with her 4 expression sprites and trigger full-screen CGs for key events (Castiel/Nathaniel fight, Maggie painting, Patio group introduction).

## Technical Context

**Language/Version**: TypeScript 5.x, React 18+

**Primary Dependencies**: Next.js 14+ (App Router), Zustand (state management), Lucide React (icons), Tailwind CSS (styling)

**Storage**: LocalStorage (client-side progress caching), REST API (backend synchronization via JWT)

**Testing**: React Testing Library, Jest

**Target Platform**: Modern Web Browsers (Responsive Desktop & Mobile, optimized for 16:9 canvas layout)

**Project Type**: Next.js Web Application (Frontend) & NestJS Service (Backend)

**Performance Goals**: Mini-map transition < 500ms, dialogue branch updates < 16ms (60 FPS)

**Constraints**: Hardware-accelerated transitions, centered 16:9 stable layout

**Scale/Scope**: 2 locations, 3 CG events, 1 new character route integration (Maggie)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Component Isolation**: Pass. The MapOverlay and CGModal components will be built as independent modular UI elements.
- **Premium & Responsive UI**: Pass. Map and CG transitions will use hardware-accelerated CSS transforms/opacity fades, respecting the 16:9 centered viewport container.
- **Strict Type Safety**: Pass. All new interfaces (MapLocation, CGIllustration, etc.) are strictly typed without `any`.
- **Centralized State Management**: Pass. All navigation, active location, and CG unlocks are managed inside `useGameStore.ts`.

## Project Structure

### Documentation (this feature)

```text
specs/006-minimap-romance-adaptation/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── checklists/
    └── requirements.md  # Specification Quality Checklist
```

### Source Code

```text
frontend/
├── public/
│   └── assets/
│       ├── cgs/          # CG images (fight, painting, patio)
│       └── characters/   # Maggie's 4 expression sprites
├── src/
│   ├── components/
│   │   └── game/
│   │       ├── MapOverlay.tsx   # New Map modal component
│   │       └── CGOverlay.tsx    # New CG presentation component
│   ├── store/
│   │   └── useGameStore.ts      # Modified to store location & CG state
│   └── mock/
│       └── storyData.ts         # Modified with new branches and CG triggers
```

**Structure Decision**: The project is structured as a split frontend/backend setup. The files for this feature reside inside `frontend/` (under `src/components/game` and `src/store`).
