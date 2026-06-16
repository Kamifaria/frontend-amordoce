# Tasks: Harry's Guitar Minigame Update

**Input**: Design documents from `/specs/013-harry-guitar-update/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

*(No setup required as we are modifying an existing component)*

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

*(No foundational tasks required, dependencies are already installed)*

---

## Phase 3: User Story 1 - Reduced Music Duration (Priority: P1) 🎯 MVP

**Goal**: Shorten the song duration to improve pacing.

**Independent Test**: Can be fully tested by playing the minigame and timing the music track to ensure it stops at the new duration.

### Implementation for User Story 1

- [x] T001 [US1] Reduce `SONG_DURATION` from 90 to 30 or 40 seconds in `src/components/game/minigames/GuitarMinigame.tsx`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Interactive Guitar Strings UI (Priority: P1)

**Goal**: Visual redesign of the minigame to resemble guitar strings where the dialogue box usually sits, complete with vibration animations.

**Independent Test**: Can be fully tested by observing the UI during the minigame and interacting with the rhythm notes to see the string tremble effect.

### Implementation for User Story 2

- [x] T002 [US2] Modify the main container CSS in `src/components/game/minigames/GuitarMinigame.tsx` to position the minigame at the bottom of the screen (dialogue box area) instead of full screen.
- [x] T003 [US2] Render 4-6 horizontal strings (using div or borders) in the play area of `src/components/game/minigames/GuitarMinigame.tsx`.
- [x] T004 [US2] Update the chord spawner logic in `src/components/game/minigames/GuitarMinigame.tsx` to spawn notes aligned with the horizontal strings rather than random X/Y percentages.
- [x] T005 [US2] Add a `isVibrating` state mapping (or Framer Motion `animate` property triggers) to the string elements in `src/components/game/minigames/GuitarMinigame.tsx` that fires a vertical tremble effect when a note on that string is tapped.

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T006 Ensure mobile responsiveness of the new guitar strings UI in `src/components/game/minigames/GuitarMinigame.tsx`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: N/A
- **Foundational (Phase 2)**: N/A
- **User Stories (Phase 3+)**: US1 and US2 can be implemented sequentially or in parallel, as they target different parts of the same file (logic vs UI).

### User Story Dependencies

- **User Story 1 (P1)**: No dependencies.
- **User Story 2 (P1)**: No dependencies.

### Implementation Strategy

1. Implement US1 (Duration) first as it is a 1-line change.
2. Implement US2 UI layout changes (anchoring to bottom).
3. Implement US2 Guitar strings visual.
4. Implement US2 Note spawning alignment.
5. Implement US2 Tremble animation on tap.
6. Test comprehensively.
