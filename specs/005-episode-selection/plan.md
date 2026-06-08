# Implementation Plan: Episode Selection Screen

**Branch**: `005-episode-selection` | **Date**: 2026-06-08 | **Spec**: [spec.md](./spec.md)

## Summary

O objetivo é implementar a tela de seleção de episódios no front-end. O jogador poderá visualizar os episódios do colégio Sweet Amoris, ver o progresso de ilustrações (CGs) e clicar para carregar e jogar o episódio desejado.

## Technical Context

- **Framework**: Next.js App Router (React 19)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand (`useGameStore.ts`)

## Proposed Changes

### 1. Store Updates
#### [MODIFY] [useGameStore.ts](file:///c:/Users/Kamila%20Faria/Desktop/Amor%20doce%20da%20veronica/frontend-amordoce/src/store/useGameStore.ts)
- Add state properties:
  - `unlockedEpisodes: number[]` (list of episode numbers unlocked, default `[1]`)
  - `activeEpisodeId: number` (currently active episode, default `1`)
  - `unlockedCGs: string[]` (list of CG image keys unlocked, e.g. `['ep1_date_castiel']`)
- Add actions:
  - `selectEpisode: (episodeId: number) => void` (loads story data for selected episode and redirects)
  - `unlockEpisode: (episodeId: number) => void` (adds episode to unlocked list)
  - `unlockCG: (cgId: string) => void` (adds illustration to gallery)

### 2. Mock Data Expansion
#### [MODIFY] [storyData.ts](file:///c:/Users/Kamila%20Faria/Desktop/Amor%20doce%20da%20veronica/frontend-amordoce/src/mock/storyData.ts)
- Expand mock story tree to contain:
  - Episode 1 story nodes (prefix `ep1_`)
  - Episode 2 story nodes (prefix `ep2_`)
  - Episode 3 story nodes (prefix `ep3_`)
- Define metadata for the episode lists (id, title, description, cover image, cgCount, startNodeId).

### 3. Components
#### [NEW] [EpisodeCard.tsx](file:///c:/Users/Kamila%20Faria/Desktop/Amor%20doce%20da%20veronica/frontend-amordoce/src/components/game/EpisodeCard.tsx)
- Reusable card component rendering episode details, lock overlay, illustration count badges, and the action button.

### 4. Pages
#### [NEW] [page.tsx](file:///c:/Users/Kamila%20Faria/Desktop/Amor%20doce%20da%20veronica/frontend-amordoce/src/app/game/episodes/page.tsx)
- Renders the full catalog page, linking back to `/game` (main screen) and displaying all episodes.
- Include a tab or link to access episodes from the main GameScreen HUD.

## Verification Plan

### Manual Verification
- Access `/game/episodes` and verify the grid of episodes is rendered.
- Check that Episode 1 is unlocked, showing "JOGAR!", and Episode 2/3 are locked.
- Click "JOGAR!" on Episode 1 and verify the story tree in `useGameStore` is initialized with Episode 1 nodes, redirecting the user to `/game`.
- Progress the story, earn affinity, check that state updates correctly.
