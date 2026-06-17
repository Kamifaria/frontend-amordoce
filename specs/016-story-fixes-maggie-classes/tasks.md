# Tasks: Story Dialogue Bugfixes, Maggie Integration & Class Schedules

**Input**: Design documents from `/specs/016-story-fixes-maggie-classes/`

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

- [x] T001 Review existing story data structure and character configurations in `src/mock/storyData.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [x] T002 Locate the exact lines for room choice selections and broken references in `src/mock/storyData.ts`

---

## Phase 3: User Story 1 - Resolving Broken Conversation Paths (Priority: P1) 🎯 MVP

**Goal**: Play through all branches of Chapter 1 without encountering broken dialogues (like `find-notebook` and `maggie-start` dangling references).

**Independent Test**: Play through the "Search Art Room" path and verify that dialogues advance correctly to subsequent scenes.

### Implementation for User Story 1

- [x] T003 [US1] Fix dangling node references in `maggie-art-notebook` by pointing to `quest-found-notebook` in `src/mock/storyData.ts`
- [x] T004 [US1] Fix broken choices in `search-galpao` by linking them to valid dialogue branches in `src/mock/storyData.ts`

---

## Phase 4: User Story 2 - Maggie's Introduction in Episode 1 (Priority: P1)

**Goal**: Maggie should be introduced during the school day in Episode 1 (prior to the end-of-day chat) so she has physical presence.

**Independent Test**: The player goes to the Photography Room (Galpão) during the notebook quest and meets/talks to Maggie directly.

### Implementation for User Story 2

- [x] T005 [US2] Create new dialogue nodes for Maggie's school-day introduction, featuring her sprite and customizable dialogue in `src/mock/storyData.ts`

---

## Phase 5: User Story 3 - Class Schedules & Time Events (Priority: P2)

**Goal**: The story should incorporate class time events (morning and afternoon class start/end times) to structure the school day pacing.

**Independent Test**: Play through Episode 1 and verify the inclusion of morning/afternoon class transitions and schedule markers.

### Implementation for User Story 3

- [x] T006 [US3] Insert morning class schedule announcement and afternoon class dismissal transition nodes in `src/mock/storyData.ts`

---

## Phase 6: User Story 4 - Additional Romance & Flirting Choices (Priority: P2)

**Goal**: Players should have additional dialog choices to express interest or flirt with characters, gaining higher Love-O-Meter (LOM) affinity points.

**Independent Test**: Verify there are more romantic/flirty choices when interacting with Nathaniel.

### Implementation for User Story 4

- [x] T007 [US4] Enrich existing dialogue choices with romantic/flirting options that adjust LOM affinity values in `src/mock/storyData.ts`

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T008 Verify story flow, compile the app, and run a production build test

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Completed.
- **Foundational (Phase 2)**: Completed.
- **User Stories (Phase 3+)**: Completed.
- **Polish (Final Phase)**: Completed.
