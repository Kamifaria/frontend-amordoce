# Feature Specification: Harry's Guitar Minigame Update

**Feature Branch**: `013-harry-guitar-update`

**Created**: 2026-06-16

**Status**: Draft

**Input**: User description: "eu quero que diminua o tempo de musica do mini game do harry e eu quero uma alteração a onde fica o dialogo quero cordas de violao e que apareça as opçoes pra aperta no ritmo e quando aperta nas costas elas tremen"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Reduced Music Duration (Priority: P1)

As a player, I want the music in Harry's minigame to have a shorter duration so the minigame does not drag on too long.

**Why this priority**: Improves the pacing of the game.

**Independent Test**: Can be fully tested by playing the minigame and timing the music track.

**Acceptance Scenarios**:

1. **Given** the user starts Harry's minigame, **When** the music plays, **Then** it finishes in the newly defined shorter timeframe.

---

### User Story 2 - Interactive Guitar Strings UI (Priority: P1)

As a player, I want to see guitar strings in the dialogue area and interactive rhythm options, and see the strings vibrate when I press the correct options.

**Why this priority**: This transforms the minigame from a simple text/audio experience into an interactive rhythm minigame, which is the core request.

**Independent Test**: Can be fully tested by observing the UI during the minigame and interacting with the rhythm notes.

**Acceptance Scenarios**:

1. **Given** the user is in Harry's minigame, **When** they look at the dialogue area, **Then** they see guitar strings instead of standard text boxes.
2. **Given** the user is playing the minigame, **When** a rhythm note appears, **Then** they can press it.
3. **Given** the user presses a rhythm note, **When** the action is registered, **Then** the guitar strings visibly vibrate/tremble on the screen.

### Edge Cases

- What happens when the user misses a rhythm note? Does the string still vibrate or play a wrong sound?
- How does the system handle the transition back to standard dialogue after the minigame ends?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST reduce the duration of the audio track used for Harry's guitar minigame.
- **FR-002**: System MUST replace the standard dialogue window with a custom UI representing guitar strings during the minigame state.
- **FR-003**: System MUST display rhythm-based options (notes/buttons) synced with the music for the user to press.
- **FR-004**: System MUST trigger a visual vibration/tremble animation on the guitar strings when the user presses the rhythm options.

### Key Entities

- **Minigame State**: Tracks whether the minigame is currently active, which overrides the standard dialogue UI.
- **Rhythm Note**: Data structure for notes appearing on the screen, including timing and corresponding input.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Music duration for the minigame is shortened to the specified length.
- **SC-002**: The dialogue area successfully renders guitar strings instead of text during the minigame.
- **SC-003**: 100% of user button presses on rhythm notes trigger the string vibration animation.
- **SC-004**: Users can successfully complete the minigame with the new interactive rhythm mechanics.

## Assumptions

- We assume the necessary audio files (or options to trim the current ones) are available or can be configured via code.
- We assume the existing UI framework allows for custom component injection into the dialogue area.
- We assume the string vibration animation can be achieved with standard CSS/JS animations.
