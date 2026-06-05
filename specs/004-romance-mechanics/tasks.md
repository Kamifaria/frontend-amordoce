# Tasks: Romance Mechanics & Gameplay Expansion

**Input**: Design documents from `specs/004-romance-mechanics/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Descrição`

- **[P]**: Pode rodar em paralelo (arquivos diferentes, sem dependências)
- **[Story]**: A qual história de usuário esta tarefa pertence (ex: US1, US2, US3)
- Caminhos de arquivo exatos estão incluídos nas descrições.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Setup folder structures for phone components in `frontend-amordoce/src/components/game/`
- [ ] T002 [P] Configure/check asset paths for love interests' avatars in `frontend-amordoce/public/assets/avatars/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T003 Create the `UnlockedTip` database entity in `backend-amordoce/src/player/entities/unlocked-tip.entity.ts`
- [ ] T004 Define state properties (`isPhoneOpen`, `activeCall`, `unlockedTips`, `isLoading`, `errorMsg`) and action/API functions in `frontend-amordoce/src/store/useGameStore.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Love Interest Conquest & Affinity Meters (Priority: P1) 🎯 MVP

**Goal**: The player can view relationship level/affinity with each love interest through a dedicated visual meter that updates based on choices.

**Independent Test**: Verify affinity meter UI component renders properly, fetches data from the backend contacts API, and visually increases/decreases dynamically.

### Implementation for User Story 1

- [ ] T005 [P] [US1] Create the backend endpoint `GET /player/phone/contacts` in `backend-amordoce/src/player/phone.controller.ts` to return contact list with names, avatars, and current affinity scores
- [ ] T006 [US1] Implement the service method in `backend-amordoce/src/player/phone.service.ts` to query `CharacterAffinity` and retrieve progress contacts
- [ ] T007 [P] [US1] Create the `LoveOMeter` React component in `frontend-amordoce/src/components/game/LoveOMeter.tsx` using Tailwind CSS and Framer Motion
- [ ] T008 [US1] Integrate `LoveOMeter` into the game's pause menu or relationship screen in `frontend-amordoce/src/components/game/GameScreen.tsx`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently.

---

## Phase 4: User Story 2 - Player-Initiated Phone Calls (Priority: P2)

**Goal**: Open phone interface, select a contact to call, and initiate unique dialogue based on affinity level.

**Independent Test**: Open phone UI, select character to call, verify dialogue tree starts, and check once-a-day calling limits constraint.

### Implementation for User Story 2

- [ ] T009 [P] [US2] Implement backend endpoint `POST /player/phone/call` in `backend-amordoce/src/player/phone.controller.ts` to log call and check limit
- [ ] T010 [US2] Implement call initiation logic in `backend-amordoce/src/player/phone.service.ts` checking daily limit and returning the appropriate dialogue node ID based on affinity score
- [ ] T011 [P] [US2] Create the `PhoneOverlay` overlay/UI component in `frontend-amordoce/src/components/game/PhoneOverlay.tsx` with contact dialer, active call screen, and hangup actions
- [ ] T012 [US2] Integrate `PhoneOverlay` into the HUD in `frontend-amordoce/src/components/game/GameScreen.tsx` so the player can open/close the phone

**Checkpoint**: At this point, User Stories 1 and 2 should both work independently.

---

## Phase 5: User Story 3 - Incoming Calls & Invitations (Priority: P3)

**Goal**: Spontaneous incoming calls from love interests when affinity thresholds (50, 75, 90) are crossed during free-time.

**Independent Test**: Adjust user affinity via helper tools to milestones, enter free-time, and verify phone rings with date invitation.

### Implementation for User Story 3

- [ ] T013 [US3] Implement the trigger condition logic in `backend-amordoce/src/player/phone.service.ts` to check milestones (50, 75, 90) and return incoming call events
- [ ] T014 [US3] Add step check in `backend-amordoce/src/dialogue/dialogue.service.ts` to queue and push incoming call nodes on state update
- [ ] T015 [US3] Create the incoming call visual ring alert popup in `frontend-amordoce/src/components/game/PhoneOverlay.tsx` with Accept/Decline buttons
- [ ] T016 [US3] Integrate incoming call states into Zustand store `frontend-amordoce/src/store/useGameStore.ts` to launch dialogue session when call is accepted

**Checkpoint**: All user stories should now be independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T017 [P] Create and configure mock story tips in backend `GET /player/tips` endpoint in `backend-amordoce/src/player/phone.controller.ts`
- [ ] T018 Implement the "LoveTips" diary UI panel inside `frontend-amordoce/src/components/game/PhoneOverlay.tsx` to read unlocked tips
- [ ] T019 [P] Run `npm run lint` and verify typescript compiler checks in both `frontend-amordoce` and `backend-amordoce`
- [ ] T020 Validate visual responsiveness on mobile viewport simulated at 360x740 for all newly introduced screens

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories.
- **User Stories (Phase 3+)**: All depend on Foundational phase completion.
  - User stories can then proceed in parallel (if staffed).
  - Or sequentially in priority order (P1 → P2 → P3).
- **Polish (Final Phase)**: Depends on all desired user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories.
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable.
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable.

### Within Each User Story

- Models before services.
- Services before endpoints.
- Core implementation before integration.
- Story complete before moving to next priority.

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel.
- All Foundational tasks marked [P] can run in parallel (within Phase 2).
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows).
- Models within a story marked [P] can run in parallel.

---

## Parallel Example: User Story 1

```bash
# Launch all models/endpoints for User Story 1 together:
Task: "Create the backend endpoint GET /player/phone/contacts in backend-amordoce/src/player/phone.controller.ts"
Task: "Create the LoveOMeter React component in frontend-amordoce/src/components/game/LoveOMeter.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup.
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories).
3. Complete Phase 3: User Story 1.
4. **STOP and VALIDATE**: Test User Story 1 independently.
5. Deploy/demo if ready.

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready.
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!).
3. Add User Story 2 → Test independently → Deploy/Demo.
4. Add User Story 3 → Test independently → Deploy/Demo.
5. Each story adds value without breaking previous stories.
