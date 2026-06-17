# Implementation Plan: Mobile Layout & Dialogue Fixes

**Branch**: `018-mobile-layout-dialogue-fixes` | **Date**: 2026-06-17 | **Spec**: [spec.md](file:///c:/Users/Kamila%20Faria/Desktop/Amor%20doce%20da%20veronica/frontend-amordoce/specs/018-mobile-layout-dialogue-fixes/spec.md)

**Input**: Feature specification from `specs/018-mobile-layout-dialogue-fixes/spec.md`

## Summary

This plan details the layout and rendering fixes required to ensure a perfect game experience on mobile screens, focusing on dialogue scrolling, speaker name visibility, character height/scale adjustments, and lobby container scrolling.

## Technical Context

**Language/Version**: TypeScript / React 19 / Next.js 16
**Primary Dependencies**: TailwindCSS, Framer Motion
**Target Platform**: Mobile Web (Responsive)

## Constitution Check

- **Component Isolation**: Passed.
- **Premium & Responsive UI**: Passed. We are enhancing mobile layout responsiveness.
- **Strict Type Safety**: Passed.

## Project Structure

### Documentation (this feature)

```text
specs/018-mobile-layout-dialogue-fixes/
├── plan.md              # This file
├── research.md          # Optional research notes
├── data-model.md        # N/A
└── quickstart.md        # N/A
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── game/
│   │   ├── DialogueBox.tsx     # Fix overflow and speaker tag clipping
│   │   └── SpriteCharacter.tsx # Adjust character scale/positioning on mobile
│   └── lobby/
│       └── LobbyContainer.tsx  # Enable scroll view
```

## Proposed Changes

### DialogueBox.tsx
- Replace `overflow-y-auto` with `overflow-visible` on the main container.
- Introduce an inner scroll container for dialogue text and choices.

### SpriteCharacter.tsx
- Add a mobile scale/translation factor.

### LobbyContainer.tsx
- Update wrapper to `h-[100dvh] overflow-y-auto`.
