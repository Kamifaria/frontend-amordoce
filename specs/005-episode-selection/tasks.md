# Tasks: Episode Selection Screen

**Input**: Design documents from `specs/005-episode-selection/`

**Prerequisites**: plan.md, spec.md

---

## Phase 1: Setup & Data

- [ ] T001 Define episode metadata structure and episode list inside `src/mock/storyData.ts`
- [ ] T002 Add episode nodes (Episode 1, 2, and 3 starter nodes) inside `src/mock/storyData.ts`
- [ ] T003 Update Zustand Store in `src/store/useGameStore.ts` with unlocked episodes state and actions

---

## Phase 2: Components

- [ ] T004 Create `EpisodeCard` component in `src/components/game/EpisodeCard.tsx` with responsive layout and Tailwind CSS
- [ ] T005 Implement illustrations count badge (CG tracker) inside `EpisodeCard.tsx`

---

## Phase 3: Pages & Navigation

- [ ] T006 Create `src/app/game/episodes/page.tsx` page to display the catalog of episodes
- [ ] T007 Add "Episódios" navigation button to the main HUD in `src/components/game/GameScreen.tsx` to access `/game/episodes`
- [ ] T008 Integrate confirmation popup if player tries to switch active episode in progress

---

## Phase 4: Verification

- [ ] T009 Run compiler checks to verify that Next.js build passes
- [ ] T010 Manually test episode switching and loading correct story data
