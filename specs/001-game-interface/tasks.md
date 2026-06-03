# Tasks: Game Interface for Amor Doce Clone

**Input**: Design documents from `specs/001-game-interface/`

**Prerequisites**: plan.md (required), spec.md (required)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create project file structure inside the frontend workspace `src/` directory
- [x] T002 Initialize project dependencies including `zustand`, `framer-motion`, and `lucide-react`
- [x] T003 [P] Configure strict TypeScript rules and import aliases in `tsconfig.json`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Define TypeScript types and contracts in `src/shared/types.ts`
- [x] T005 Create the Zustand base store structure and type outline in `src/store/useGameStore.ts`
- [x] T006 [P] Set up global css styles, default fonts, and container resets in `src/app/globals.css`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Fullscreen Stable Aspect Ratio Game Container (Priority: P1) 🎯 MVP

**Goal**: Center the game canvas on screen, maintaining a classic 16:9 ratio across all sizes.

**Independent Test**: Verify layout stays centered and scaled correctly on window resize without distortion.

### Implementation for User Story 1

- [x] T007 [P] [US1] Implement responsive aspect-ratio viewport wrapping inside `src/components/game/GameContainer.tsx`
- [x] T008 [US1] Embed the layout wrapper into main index view `src/app/page.tsx` and run initial viewport checks

**Checkpoint**: User Story 1 is fully functional and layout scales correctly.

---

## Phase 4: User Story 2 - Typewriter Text Effect & Dialogue Skip (Priority: P1)

**Goal**: Character-by-character dialogue rendering with instant viewport click-to-complete.

**Independent Test**: Trigger dialogue typing, click during animation to verify skip, and click after completion to advance the node.

### Implementation for User Story 2

- [x] T009 [US2] Implement node index traversing and typewriter skip handlers in `src/store/useGameStore.ts`
- [x] T010 [P] [US2] Write the sample story node tree inside mock database `src/mock/storyData.ts`
- [x] T011 [US2] Implement typewriter text effects and badge tags in `src/components/game/DialogueBox.tsx`
- [x] T012 [US2] Connect `DialogueBox` to Zustand state inside `src/app/page.tsx` to handle page text progression

**Checkpoint**: User Story 2 works; dialogues type and progress on screen click.

---

## Phase 5: User Story 3 - Interactive Choice Overlay (Priority: P2)

**Goal**: Show overlay buttons for decisions, deduct Action Points (PA), and direct state branch.

**Independent Test**: Open a choice node, verify standard progress clicking is blocked, click a choice, and verify store values update correctly.

### Implementation for User Story 3

- [x] T013 [US3] Implement choice action and PA validation checks inside Zustand store `src/store/useGameStore.ts`
- [x] T014 [P] [US3] Create choice layout buttons in `src/components/game/ChoiceOverlay.tsx`
- [x] T015 [US3] Integrate `ChoiceOverlay` in index page `src/app/page.tsx` and block canvas advance handler when choices are visible

**Checkpoint**: User Story 3 is complete; branching paths correctly change scenes.

---

## Phase 6: User Story 4 - Visual Scene Transitions & Character Sprites (Priority: P2)

**Goal**: Seamless scene transitions and character expression updates using Framer Motion.

**Independent Test**: Perform dialogue actions and verify visual background fades and character sprite entries are smooth.

### Implementation for User Story 4

- [x] T016 [P] [US4] Implement dynamic scene fades inside `src/components/game/Cenario.tsx` using `AnimatePresence`
- [x] T017 [P] [US4] Implement absolute character positioning and expression animations in `src/components/game/SpriteCharacter.tsx`
- [x] T018 [US4] Bind `Cenario` and `SpriteCharacter` layout positions into page canvas `src/app/page.tsx`

**Checkpoint**: User Story 4 is complete; backgrounds and characters update with high-fidelity transitions.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: UI details and validation testing.

- [x] T019 [P] Style custom interactive scrollbars, dialogue buttons, and game fonts
- [x] T020 Run layout responsive testing across mobile devices and handle edge cases (fast clicking and narration-only screens)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion. Blocks user stories.
- **User Stories (Phase 3+)**: Depend on Foundational completion.
- **Polish (Final Phase)**: Depends on all user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: Independent MVP story.
- **User Story 2 (P2)**: Dependent on US1 for positioning dialogue area.
- **User Story 3 (P3)**: Dependent on US2 logic.
- **User Story 4 (P4)**: Runs alongside US2 & US3.

### Parallel Opportunities

- T003 (TypeScript Config) can run alongside directory creation.
- T006 (Global CSS resets) can run alongside Zustand setup.
- T007 (GameContainer), T010 (Mock database), T014 (Choice layout), T016 (Cenario), and T017 (Character Sprite) can be implemented in parallel.

---

## Parallel Example: User Story 4

```bash
# Implement asset rendering components in parallel:
Task: "Implement dynamic scene fades inside src/components/game/Cenario.tsx"
Task: "Implement absolute character positioning and expression animations in src/components/game/SpriteCharacter.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Setup workspace.
2. Initialize Zustand and routing.
3. Deliver centered aspect container.

### Incremental Delivery

1. Foundation ready.
2. Add Typewriter Dialogue → Playable visual novel progression.
3. Add Branching Choices → Interactive visual novel gameplay.
4. Add Sprite transitions → Polished visual aesthetic.
