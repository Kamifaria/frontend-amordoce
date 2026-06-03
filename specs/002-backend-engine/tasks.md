# Tasks: Backend Dialogue Engine & Character Progression

**Input**: Design documents from `specs/002-backend-engine/`

**Prerequisites**: plan.md (required), spec.md (required)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Bootstrap NestJS application inside the backend directory `backend-amordoce/`
- [ ] T002 Install NestJS database and caching libraries (`@nestjs/typeorm`, `typeorm`, `pg`, `cache-manager`, `redis`) inside `backend-amordoce/package.json`
- [ ] T003 [P] Configure environment database and Redis credentials in `backend-amordoce/.env`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T004 Define `Player` and `LoveOMeter` TypeORM schemas inside `backend-amordoce/src/player/entities/`
- [ ] T005 Setup database connection configs inside NestJS root configuration `backend-amordoce/src/app.module.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Action Point (PA) Server Validation (Priority: P1) 🎯 MVP

**Goal**: Validate PA balances before allowing dialogue nodes to advance and persist updates to Postgres.

**Independent Test**: Send endpoint transition requests and confirm that insufficient PA yields a 403 response, while sufficient PA correctly decrements.

### Implementation for User Story 1

- [ ] T006 [US1] Create dialogue advancement controller endpoints inside `backend-amordoce/src/dialogue/dialogue.controller.ts`
- [ ] T007 [US1] Implement PA database validation and pessimistic write locking inside `backend-amordoce/src/dialogue/dialogue.service.ts`

**Checkpoint**: User Story 1 is complete; PA is validated and decremented securely on the server.

---

## Phase 4: User Story 2 - Character Affinity and the Three-Button Rule (Priority: P1)

**Goal**: Handle branching choices with option types (A, B, C) and update character affinity.

**Independent Test**: Execute choice requests and verify correct dialogue reacts, adjusting Remi's or Harry's Love-o-Meter values in PostgreSQL.

### Implementation for User Story 2

- [ ] T008 [US2] Implement choice response controller endpoints in `backend-amordoce/src/dialogue/dialogue.controller.ts`
- [ ] T009 [US2] Implement Three-Button Rule (Option A, B, C) modifier computations in `backend-amordoce/src/dialogue/dialogue.service.ts`
- [ ] T010 [P] [US2] Write the Remi, Harry, and Maggie mock story sequence JSON database inside `backend-amordoce/src/dialogue/mock/storyData.json`

**Checkpoint**: User Story 2 works; decisions dynamically affect character love meter levels.

---

## Phase 5: User Story 3 - Redis Caching for Dialogue Trees (Priority: P2)

**Goal**: Store active narrative dialogue nodes in Redis cache memory for rapid lookup.

**Independent Test**: Traverse active nodes and verify Redis query execution metrics report hit ratios above 90%.

### Implementation for User Story 3

- [ ] T011 [US3] Register NestJS Redis Cache connection configs inside root module `backend-amordoce/src/app.module.ts`
- [ ] T012 [US3] Integrate cache checks and lookups inside dialogue resolver `backend-amordoce/src/dialogue/dialogue.service.ts`

**Checkpoint**: User Story 3 is complete; dialogue node retrieval times are significantly reduced.

---

## Phase 6: Polish & Front-End Integration

**Purpose**: System testing and frontend API binding.

- [ ] T013 Run integration test scenarios for validation checks and error code payloads in `backend-amordoce/src/dialogue/dialogue.service.spec.ts`
- [ ] T014 Update the front-end Zustand state store to fetch dynamically from backend endpoints in `src/store/useGameStore.ts`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion.
- **User Stories (Phase 3+)**: Depend on Foundational completion.
- **Polish (Final Phase)**: Depends on all user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: Foundation story for server validation.
- **User Story 2 (P2)**: Dependent on US1 validation engine.
- **User Story 3 (P3)**: Runs parallel to database loading.

### Parallel Opportunities

- T003 (Environment config) alongside npm library setups.
- T010 (Story JSON drafting) alongside endpoint service definitions.
