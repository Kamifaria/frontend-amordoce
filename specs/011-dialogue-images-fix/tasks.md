# Tasks: Dialogue and CG Image Backgrounds Fix

**Input**: Design documents from `/specs/011-dialogue-images-fix/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Asset swapping and preparation

- [ ] T001 Backup the fake-PNG file `public/images/cgs/fight.png` to `public/images/cgs/fight_backup.png`
- [ ] T002 Copy the true-PNG transparent asset `public/images/sprites/briga_castiele_natahiel.png` to `public/images/cgs/fight.png`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Centralized background store verification

- [ ] T003 Verify that `useGameStore` correctly handles and exposes the active `backgroundUrl` value

---

## Phase 3: User Story 1 - Exact CG Fitting and Dynamic Background Overlay (Priority: P1) 🎯 MVP

**Goal**: Overlay transparent PNG CGs on top of the actual school corridor background without any checkerboard grid.

**Independent Test**: Play through the beginning of Episode 1 to trigger the confrontation fight CG and confirm the corridor background shows behind the characters.

### Implementation for User Story 1

- [ ] T004 [US1] Retrieve the active `backgroundUrl` from `useGameStore` in `src/components/game/CGOverlay.tsx`
- [ ] T005 [US1] Add a mapping helper and apply the mapped background image behind the transparent CG image in `src/components/game/CGOverlay.tsx`

---

## Phase 4: User Story 2 - Dialogue Sprites Alignment and Coherent Scene Backgrounds (Priority: P2)

**Goal**: Ensure all dialogue sprites fit precisely, do not float, and fallback to coherent backgrounds when necessary.

**Independent Test**: Advance dialogues across different nodes and inspect sprite sizing.

### Implementation for User Story 2

- [ ] T006 [P] [US2] Review and align containment styles (`object-fit: contain`) and positions in `src/components/game/SpriteCharacter.tsx`
- [ ] T007 [US2] Ensure any dialogue node with missing or empty background properties falls back to the current active background scene in `src/components/game/SpriteCharacter.tsx` or related components

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Manual visual verification and cleanups

- [ ] T008 Run verification steps in `specs/011-dialogue-images-fix/quickstart.md` to confirm alignment and transparency fixes on dev server
