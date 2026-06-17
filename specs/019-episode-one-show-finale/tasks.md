# Tasks: Episode 1 Band Show Finale

**Input**: Design documents from `/specs/019-episode-one-show-finale/`

**Prerequisites**: plan.md (required), spec.md (required for user stories)

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

- [x] T001 Review ending nodes in `src/mock/storyData.ts` and player store actions in `src/store/useGameStore.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [x] T002 Integrate LOM branch checks when transitioning to ending nodes in `src/store/useGameStore.ts`

---

## Phase 3: User Story 1 - Show Invitation Narrative (Priority: P1)

**Goal**: Veronica receives a custom invite to the show from Harry, Kami, or Maggie if she has 25+ LOM.

**Independent Test**: Advance story to school day end, verify invitation node triggers if LOM is high enough.

### Implementation for User Story 1

- [x] T003 [US1] Add show invitation nodes (`show-invite-harry`, `show-invite-kami`, `show-invite-maggie`, `show-invite-none`) with choice branching options to `src/mock/storyData.ts`

---

## Phase 4: User Story 2 - Band Show Concert Scene & Music Player (Priority: P1)

**Goal**: The Olivia Rodrigo audio file plays during the show and pauses when returning to the lobby or muting.

**Independent Test**: Start concert, verify audio `/audio/Olivia Rodrigo - The Cure.mp3` plays and conforms to mute buttons.

### Implementation for User Story 2

- [x] T004 [US2] Add concert audio file play trigger when entering concert nodes in `src/store/useGameStore.ts`
- [x] T005 [US2] Bind concert audio pause control inside `toggleMute` toggle logic in `src/store/useGameStore.ts`

---

## Phase 5: User Story 3 - Visual Concert Scene & Dialogue (Priority: P2)

**Goal**: Render the band members performing and singing on stage using dynamic sprite position structures.

**Independent Test**: Walk through concert nodes, verify character sprites cycle on stage.

### Implementation for User Story 3

- [x] T006 [US3] Add visual concert nodes (`concert-start`, `concert-performance-1`, `concert-performance-2`, `concert-performance-3`, `concert-performance-4`) containing dynamic sprite array configurations to `src/mock/storyData.ts`

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T007 Test the show branching, verify audio player plays, and check Next.js compile build
