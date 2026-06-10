# Implementation Plan: Add Kami Romance Route

**Branch**: `007-add-kami-romance-route` | **Date**: 2026-06-10 | **Spec**: [spec.md](./spec.md)

## Summary
Integrate Kami into the game's Zustand store, contacts list, dialogue expressions, and story scripts. Enable the romance/coupling route for both Kami and Maggie.

## Technical Context
- **Language**: TypeScript
- **State Management**: Zustand
- **Target Files**:
  - `src/components/game/SpriteCharacter.tsx` (sprite rendering)
  - `src/components/game/PhoneOverlay.tsx` (phone details)
  - `src/store/useGameStore.ts` (store definition)
  - `src/mock/storyData.ts` (story dialog tree)
