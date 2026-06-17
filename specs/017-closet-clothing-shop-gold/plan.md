# Implementation Plan: Goth Closet, Clothing Shop & Gold Economy

**Branch**: `017-closet-clothing-shop-gold` | **Date**: 2026-06-17 | **Spec**: [spec.md](file:///c:/Users/Kamila%20Faria/Desktop/Amor%20doce%20da%20veronica/frontend-amordoce/specs/017-closet-clothing-shop-gold/spec.md)

**Input**: Feature specification from `specs/017-closet-clothing-shop-gold/spec.md`

## Summary

This plan details the technical changes required to implement a gothic closet styling system for Veronica, a clothing shop accessible from the map where players buy dark clothing using Gold, and currency accrual logic (tarot daily draws, quests, and minigame rewards).

## Technical Context

**Language/Version**: TypeScript / React 19 / Next.js 16
**Primary Dependencies**: Zustand, TailwindCSS, Lucide Icons, Framer Motion
**Storage**: Client-side Zustand store persisted in localStorage
**Testing**: Jest / React Testing Library
**Target Platform**: Web (Responsive)
**Performance Goals**: Instant character outfit render updates and shop transitions
**Constraints**: Keep standard visual vn container constraints

## Constitution Check

- **Component Isolation**: Passed. The shop and closet components are built as isolated UI elements.
- **Premium & Responsive UI**: Passed. The clothing shop follows our sleek violet/pink neon gothic aesthetic.
- **Strict Type Safety**: Passed. All items, shop states, and purchase history have strict TypeScript types.
- **Centralized State Management**: Passed. Gold balance, inventory items, and equipped gear reside in the Zustand store (`useGameStore`).

## Project Structure

### Documentation (this feature)

```text
specs/017-closet-clothing-shop-gold/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
└── quickstart.md        # Phase 1 output
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── lobby/
│   │   └── WardrobeCloset.tsx  # Update with Goth clothes & dynamic character models
│   ├── game/
│   │   ├── MapOverlay.tsx      # Add Loja de Roupas location
│   │   └── ClothingShop.tsx    # Shop interface component
│   └── game/
│       └── GameScreen.tsx      # Render ClothingShop overlay if currentLocationId === 'shop'
├── store/
│   └── useGameStore.ts         # Add shop inventory state, unlockOutfit, buyOutfit, rewards
└── shared/
    └── types.ts                # Update EquippedOutfit and ClosetItem interfaces
```

## Complexity Tracking

No violations.
