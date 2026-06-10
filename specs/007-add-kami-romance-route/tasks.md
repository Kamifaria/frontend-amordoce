# Tasks: Add Kami Romance Route

**Input**: Design documents from `specs/007-add-kami-romance-route/`

## Phase 1: Foundational (Blocking Prerequisites)

- [x] T001 Update Zustand store state `affinities` and initial chat thread in `src/store/useGameStore.ts` to include `kami`

---

## Phase 2: User Story 1 - Meeting Kami & Friendship Progression (Priority: P1)

- [x] T002 [P] [US1] Add Kami character sprite mapping in `src/components/game/SpriteCharacter.tsx`
- [x] T003 [P] [US1] Add Kami to Contacts list and tips in `src/components/game/PhoneOverlay.tsx`
- [x] T004 [US1] Add Kami story nodes and chat trigger messages in `src/mock/storyData.ts`

---

## Phase 3: User Story 2 - Love Tier & Date Invites with Kami (Priority: P1)

- [x] T005 [US2] Update call dialogue mapping for Kami in `src/components/game/PhoneOverlay.tsx` to handle Love Tier calls
- [x] T006 [US2] Write conditional high affinity nodes and call log options for Kami in `src/mock/storyData.ts`

---

## Phase 4: Polish & Verification

- [x] T007 Run type-safety compilation checks using `npx tsc --noEmit`
