# Tasks: Goth Closet, Clothing Shop & Gold Economy

**Input**: Design documents from `/specs/017-closet-clothing-shop-gold/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- Paths shown below assume single project structure

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Review closet structures and store models in `src/components/lobby/WardrobeCloset.tsx` and `src/store/useGameStore.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [x] T002 Add `unlockedItems` state and `buyOutfit` action to player state in `src/store/useGameStore.ts`

---

## Phase 3: User Story 1 - Dark/Goth Closet Customization (Priority: P1) 🎯 MVP

**Goal**: Veronica can dress up using a gothic/dark themed wardrobe with a dynamically updating preview avatar.

**Independent Test**: Open closet, equip "Cabelo Roxo Gótico", and verify that the avatar updates.

### Implementation for User Story 1

- [x] T003 [US1] Replace placeholders in `src/components/lobby/WardrobeCloset.tsx` with goth hair, tops, and bottoms, and restrict equipping to unlockedItems
- [x] T004 [US1] Update dynamic avatar icon/layer preview in `src/components/lobby/WardrobeCloset.tsx` to match goth clothing selections

---

## Phase 4: User Story 2 - Clothing Shop on the Map (Priority: P1)

**Goal**: Add a Clothing Shop location on the map overlay enabling item browsing and buying using Gold.

**Independent Test**: Open map, select "Loja de Roupas", buy a locked gothic outfit using Gold, and verify it unlocks.

### Implementation for User Story 2

- [x] T005 [US2] Create `src/components/game/ClothingShop.tsx` shop overlay component with items, prices, and buy buttons
- [x] T006 [US2] Add new "Loja de Roupas" map location node inside `src/components/game/MapOverlay.tsx`
- [x] T007 [US2] Render `ClothingShop` overlay in `src/components/game/GameScreen.tsx` when location is active

---

## Phase 5: User Story 3 - Gold Currency & Minigame Earning System (Priority: P2)

**Goal**: Earning Gold by completing minigames, displaying rewards based on final score.

**Independent Test**: Play the Guitar Minigame and check that finishing awards Gold.

### Implementation for User Story 3

- [x] T008 [US3] Add gold reward logic on completion of minigames in `src/store/useGameStore.ts`

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T009 Test purchase flows, verify PA/Gold deducts, and verify compiling via production build test
