# Tasks: Gameplay Enhancements Bundle

**Input**: Design documents from `/specs/010-gameplay-enhancements/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4, US5)
- Include exact file paths in descriptions

---

## Phase 1: Setup & Foundational

**Purpose**: Core types and store logic additions

- [ ] T001 Update `src/shared/types.ts` to include structures for Achievements, DailyQuests, SweetGramPost, and ScenarioItem.
- [ ] T002 Update Zustand store in `src/store/useGameStore.ts` to manage achievements, daily quests status, SweetGram feeds, and collected scenario items.

---

## Phase 2: User Story 1 - Álbum de Ilustrações / Galeria

**Goal**: Display unlocked CGs in a dedicated gallery tab.

- [ ] T003 [P] [US1] Create Gallery tab component in `src/components/lobby/GalleryTab.tsx`
- [ ] T004 [US1] Mount and export GalleryTab within the main `src/components/lobby/LobbyContainer.tsx`

---

## Phase 3: User Story 2 - Rede Social "SweetGram"

**Goal**: Instagram-style social app inside the phone overlay.

- [ ] T005 [P] [US2] Create SweetGram feed reader interface in `src/components/game/SweetGramApp.tsx`
- [ ] T006 [US2] Integrate SweetGram shortcut button and screen layer within `src/components/game/PhoneOverlay.tsx`

---

## Phase 4: User Story 3 - Missões Diárias

**Goal**: Display daily checklist on the lobby dashboard with currency rewards.

- [ ] T007 [P] [US3] Create quests panel component in `src/components/lobby/DailyQuests.tsx`
- [ ] T008 [US3] Mount DailyQuests panel on the main landing tab of `src/components/lobby/LobbyContainer.tsx`

---

## Phase 5: User Story 4 - Itens Clicáveis nos Cenários

**Goal**: Enable clicking on floating items in the background to pick them up.

- [ ] T009 [US4] Update background rendering inside `src/components/game/Cenario.tsx` to conditionally render clickable absolute objects based on the current location.

---

## Phase 6: User Story 5 - Notificação de Conquistas (Achievements)

**Goal**: Play dynamic congratulations toasts when user reaches key goals.

- [ ] T010 [P] [US5] Create floating toast notification UI in `src/components/game/AchievementToast.tsx`
- [ ] T011 [US5] Inject and mount AchievementToast layer globally inside `src/app/game/page.tsx`
