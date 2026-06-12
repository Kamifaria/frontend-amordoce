# Tasks: Game Lobby and Episode Selection

**Input**: Design documents from `/specs/009-lobby-episode-selection/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are OPTIONAL - only include if requested (none explicitly requested for TDD).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create components directory structure under `src/components/lobby/`
- [x] T002 [P] Setup basic components export index file in `src/components/lobby/index.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T003 Update typescript declarations in `src/shared/types.ts` to include Episode, LobbyState, and equippedOutfit types.
- [x] T004 Update Zustand store in `src/store/gameStore.ts` to include state slices (currentView, unlockedEpisodes, lastDailyDraw, equippedOutfit) and mutations (setView, unlockEpisode, drawTarot, updateOutfit).

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Seleção e Desbloqueio de Episódios (Priority: P1) 🎯 MVP

**Goal**: Render episode selector component and restrict access to locked episodes.

**Independent Test**: Navigate to main view after login and verify only Episode 1 is playable, and Episode 2 shows locked state.

### Implementation for User Story 1

- [x] T005 [P] [US1] Create Episode Selector component in `src/components/lobby/EpisodeSelector.tsx`
- [x] T006 [US1] Create main container layout component in `src/components/lobby/LobbyContainer.tsx` and integrate EpisodeSelector
- [x] T007 [US1] Update entry layout page in `src/app/game/page.tsx` to conditionally render LobbyContainer or GameScreen based on `currentView`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Tiragem de Tarô Diária de PA/Gold (Priority: P2)

**Goal**: Daily tarot draw game with Remi to earn PA and Gold.

**Independent Test**: Click Tarot tab, draw card, verify PA/Gold is added and daily limit enforces 24h wait.

### Implementation for User Story 2

- [x] T008 [P] [US2] Create Tarot Card Draw component with flipping animation in `src/components/lobby/TarotDraw.tsx`
- [x] T009 [US2] Connect Tarot Draw component with store rewards and cooldown timers in `src/components/lobby/TarotDraw.tsx`
- [x] T010 [US2] Mount TarotDraw panel within main container layout in `src/components/lobby/LobbyContainer.tsx`

**Checkpoint**: At this point, User Stories 1 and 2 should both work independently

---

## Phase 5: User Story 3 - Visualização de Afinidade e Amorômetro (Priority: P2)

**Goal**: Display current character affinity stats (Love-o-Meter).

**Independent Test**: Open Affinity panel, verify correct values are displayed for Nathaniel, Castiel, Lysandre, and Kami.

### Implementation for User Story 3

- [x] T011 [P] [US3] Create Love-o-Meter progress bar renderer in `src/components/lobby/AffinityTracker.tsx`
- [x] T012 [US3] Integrate AffinityTracker tab inside `src/components/lobby/LobbyContainer.tsx`

**Checkpoint**: All P1 and P2 user stories should now be independently functional

---

## Phase 6: User Story 4 - Closet de Customização Visual (Priority: P3)

**Goal**: Closet page allowing protagonist avatar custom clothing and hair updates.

**Independent Test**: Equipping hair/clothes in Closet, checking avatar update, and starting episode to see changes reflected.

### Implementation for User Story 4

- [x] T013 [P] [US4] Create closet selectors and preview avatar renderer in `src/components/lobby/WardrobeCloset.tsx`
- [x] T014 [US4] Bind WardrobeCloset selection actions to Zustand `equippedOutfit` updates in `src/components/lobby/WardrobeCloset.tsx`
- [x] T015 [US4] Integrate dynamic protagonist sprites inside the dialogue container `src/components/game/GameScreen.tsx` to respect selected outfit

**Checkpoint**: All user stories are now complete

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final touches and quality checks

- [x] T016 Implement soundtrack controller with mute/play button in `src/components/lobby/LobbyContainer.tsx`
- [x] T017 Conduct mobile responsiveness verification for all lobby screens and adjust responsive tailwind classes.
