# Tasks: Mobile Layout & Dialogue Fixes

**Input**: Design documents from `/specs/018-mobile-layout-dialogue-fixes/`

**Prerequisites**: plan.md (required), spec.md (required for user stories)

---

## Phase 1: Setup (Shared Infrastructure)

- [x] T001 Review responsive styles in `src/components/game/DialogueBox.tsx` and `src/components/game/SpriteCharacter.tsx`

---

## Phase 2: Foundational (Blocking Prerequisites)

- [x] T002 Update layout overflow variables inside `src/components/lobby/LobbyContainer.tsx`

---

## Phase 3: User Story 1 - Dialogue & Sprite Layout Optimization on Mobile (Priority: P1)

**Goal**: Veronica can read dialogue text without clipping and see character sprites properly positioned above the dialogue container.

- [x] T003 [US1] Wrap speech text and choice lists in an inner scrollable wrapper container with vertical limits in `src/components/game/DialogueBox.tsx`
- [x] T004 [US1] Apply scale and translation factors to character sprites on mobile viewports inside `src/components/game/SpriteCharacter.tsx`

---

## Phase 4: User Story 2 - Speaker Name Restored on Mobile (Priority: P1)

**Goal**: Restore the speaker name container visibility above the dialogue box on small viewports.

- [x] T005 [US2] Modify `DialogueBox.tsx` parent layout to use `overflow-visible` to prevent absolute speaker tags from clipping

---

## Phase 5: User Story 3 - Lobby Scrollability on Mobile (Priority: P2)

**Goal**: Ensure pages with list content scroll correctly on touch screen viewports.

- [x] T006 [US3] Constrain the outer `LobbyContainer.tsx` layout boundary to viewport height and handle local page overflows

---

## Phase 6: Polish & Cross-Cutting Concerns

- [x] T007 Build and verify code type safety and run browser verification screenshots
