# Tasks: Veronica Piano

## Phase 1: Setup

- [x] T001 Create directory structure in `src/components/game/piano/`
- [x] T002 Implement static keys and melodies data in `src/components/game/piano/pianoKeysData.ts`

## Phase 2: Foundational

- [x] T003 Update `GameState` interface and initial state to support sheet music in `src/store/useGameStore.ts`
- [x] T004 Add `unlockSheetMusic` action in `src/store/useGameStore.ts`

## Phase 3: [US1] Autonomous Piano Keyboard

**Story Goal:** As a player, I want to freely play notes on a piano interface so I can experiment with melodies autonomously.

- [x] T005 [P] [US1] Implement `PianoKeyboard.tsx` UI and interactions in `src/components/game/piano/PianoKeyboard.tsx`
- [x] T006 [US1] Add web audio API synthesizer for piano notes in `src/components/game/piano/PianoKeyboard.tsx`
- [x] T007 [US1] Handle touch and click events for white and black keys in `src/components/game/piano/PianoKeyboard.tsx`

## Phase 4: [US2] Sheet Music System & Rewards

**Story Goal:** As a player, I want to collect sheet music pages as rewards so I have a sense of progression and melodies to practice.

- [x] T008 [P] [US2] Implement `SheetMusicTab.tsx` UI to list unlocked melodies in `src/components/game/piano/SheetMusicTab.tsx`
- [x] T009 [US2] Integrate `useGameStore` state to `SheetMusicTab.tsx` to render owned partituras in `src/components/game/piano/SheetMusicTab.tsx`

## Phase 5: [US3] Secret Easter Egg Sequence

**Story Goal:** As a player, I want to trigger a special event if I play a specific sequence of notes (easter egg) so I am rewarded for discovering secrets.

- [x] T010 [US3] Add note tracking buffer and sequence matching logic in `src/components/game/piano/PianoKeyboard.tsx`
- [x] T011 [US3] Implement `VeronicaPiano.tsx` main container and Easter Egg dialog modal in `src/components/game/piano/VeronicaPiano.tsx`
- [x] T012 [US3] Add integration to `GameScreen` via `activeMinigame === 'piano'` in `src/components/game/GameScreen.tsx`

## Phase 6: Polish & Cross-Cutting

- [x] T013 Make piano layout responsive and horizontally scrollable on mobile devices in `src/components/game/piano/PianoKeyboard.tsx`
- [x] T014 Transcribe Aeris' Theme sheet music into the secret sequence data in `src/components/game/piano/pianoKeysData.ts`

## Dependencies

- Phase 2 depends on Phase 1
- Phase 3 depends on Phase 1
- Phase 4 depends on Phase 2
- Phase 5 depends on Phase 3 and Phase 4
- Phase 6 depends on all previous phases being complete.

## Parallel Execution Opportunities

- T005 and T008 can be executed in parallel after Phase 2 is complete.
