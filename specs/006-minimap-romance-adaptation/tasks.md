# Tasks: Mini-Map Navigation & Advanced Romance Routes

**Input**: Design documents from `specs/006-minimap-romance-adaptation/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md

**Tests**: Tests are OPTIONAL - none were explicitly requested, so validation will be handled through manual testing via the quickstart guide.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Exact file paths are provided in descriptions.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Set up interfaces and type structures needed for data modeling.

- [x] T001 Create shared TypeScript interfaces and models for MapLocation and CGIllustration in `src/shared/types.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core state management infrastructure in Zustand.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T002 Update Zustand store in `src/store/useGameStore.ts` to add states `currentLocationId`, `unlockedCGs` and actions `changeLocation`, `unlockCG`

**Checkpoint**: Foundation ready - user story implementation can now begin.

---

## Phase 3: User Story 1 - Mini-Map Navigation (Priority: P1) 🎯 MVP

**Goal**: Enable navigation between the School building and the Patio via an overlay map.

**Independent Test**: Verify navigation by clicking the Map button in the header, choosing Patio to change background, and then choosing School to return.

### Implementation for User Story 1

- [x] T003 [P] [US1] Create the interactive map modal component in `src/components/game/MapOverlay.tsx`
- [x] T004 [US1] Integrate the map trigger button and overlay modal in the main game interface `src/components/game/GameScreen.tsx`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently.

---

## Phase 4: User Story 2 - Dynamic Dialogue & Phone Call Adaptation (Priority: P1)

**Goal**: Branch dialogue, calls, and date invitations depending on friendship vs. love affinity levels.

**Independent Test**: Check that calling a character has different dialogue before and after crossing the 50 affinity threshold.

### Implementation for User Story 2

- [x] T005 [US2] Update the phone interface in `src/components/game/PhoneOverlay.tsx` to handle tier-based call views
- [x] T006 [US2] Update call triggers and node-retrieval logic in `src/store/useGameStore.ts` to branch conversations by affinity level

**Checkpoint**: At this point, relationship tiers dynamically alter calls and story dialogue.

---

## Phase 5: User Story 3 - Ambiguous Dialogue Choices & Difficult Crushes (Priority: P2)

**Goal**: Support difficult crushes (Castiel/Lysandre) and ambiguous choices.

**Independent Test**: Verify that picking choices for Castiel/Lysandre grants reduced affinity increments compared to other characters.

### Implementation for User Story 3

- [x] T007 [US3] Implement custom affinity modifier rules inside the `changeAffinity` action in `src/store/useGameStore.ts`
- [x] T008 [US3] Rewrite dialog tree choices in `src/mock/storyData.ts` to make choices ambiguous for all crushes

**Checkpoint**: Romance difficulty and choice ambiguities are functional.

---

## Phase 6: User Story 4 - Situational Illustration Events (CGs) & Maggie's Route (Priority: P2)

**Goal**: Render new illustration CG screens and support Maggie's 4 expression sprites.

**Independent Test**: Trigger the Castiel/Nathaniel fight, verify the CG appears. Interact with Maggie and verify all 4 expression sprites load.

### Implementation for User Story 4

- [x] T009 [P] [US4] Create the full-screen illustration modal component in `src/components/game/CGOverlay.tsx`
- [x] T010 [US4] Integrate CGOverlay into `src/components/game/GameScreen.tsx` to intercept and display event illustrations
- [x] T011 [US4] Add new story events and Maggie's routes with her 4 expressions in `src/mock/storyData.ts`

**Checkpoint**: All user stories are complete.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Cleanup, testing, and validations.

- [x] T012 Run manual testing sequence in browser using `specs/006-minimap-romance-adaptation/quickstart.md`
- [x] T013 Run TypeScript type checks and linting checks in project root

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on Setup (T001).
- **User Stories (Phases 3 to 6)**: Depend on Foundational (T002).
- **Polish (Phase 7)**: Depends on all user stories being complete.

### Parallel Opportunities

- T003 [US1] and T009 [US4] can be developed in parallel since they reside in separate files and don't block each other.
