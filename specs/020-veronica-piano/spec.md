# Feature Specification: veronica-piano

**Feature Branch**: `020-veronica-piano`

**Created**: 2026-06-19

**Status**: Draft

**Input**: User description: "quero que no quarto da veronica tenha um piano para poder tocar que ela possa aperta e sair o som das notas e que apareça algo simples alguma ideia eu queria que fosse difente do minigame do harry queria algo mais altonomo para pessoa toca qual ideia legal e dica boa para isso acontecer"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Free Play Piano Interaction (Priority: P1)

As a player exploring Veronica's room, I want to click on the piano and freely play notes so that I can enjoy a relaxing, autonomous musical experience without the pressure of a structured minigame.

**Why this priority**: This is the core functionality requested by the user, providing an interactive element in Veronica's room.

**Independent Test**: Can be tested by opening the piano interface in Veronica's room and clicking the keys or using the keyboard to ensure corresponding sounds are played immediately.

**Acceptance Scenarios**:

1. **Given** the player is in Veronica's room, **When** they interact with the piano object, **Then** a simple, elegant piano keyboard interface appears on the screen.
2. **Given** the piano interface is open, **When** the player clicks or presses a bound key for a specific piano key, **Then** the corresponding musical note sound is played without delay.
3. **Given** the piano interface is open, **When** the player presses multiple keys in sequence, **Then** the notes play autonomously allowing free expression.
4. **Given** the piano interface is open, **When** the player clicks a "Close" or "Return" button, **Then** the interface closes and the player returns to the room exploration view.

---

### User Story 2 - Secret Melody Easter Egg (Priority: P2)

As a player, I want to discover hidden reactions if I play a specific sequence of notes, so that the free play feels rewarding and deeply integrated into the game's lore or character.

**Why this priority**: The user asked for "ideas/tips" to make it cool and different. Adding an easter egg makes the autonomous play more engaging without turning it into a strict rhythm game like Harry's.

**Independent Test**: Can be tested by playing the predefined secret melody and verifying if the special dialogue or visual effect triggers.

**Acceptance Scenarios**:

1. **Given** the piano interface is open, **When** the player plays a specific sequence of notes (e.g., Veronica's favorite song or a known theme), **Then** a special visual effect or a unique dialogue from Veronica is triggered.
2. **Given** the easter egg has been triggered, **When** the player continues playing, **Then** they can return to free play normally.

---

### User Story 3 - Collectible Sheet Music (Priority: P2)

As a player, I want to collect sheet music pages by completing minigames and view them in a dedicated tab on the piano, so that I have a clear goal to unlock melodies that I can play on the autonomous piano.

**Why this priority**: Connects the piano feature to the broader game economy and progression system, adding replay value to minigames.

**Independent Test**: Can be tested by awarding a sheet music item to the player's inventory, opening the piano interface, navigating to the "Sheet Music" tab, and verifying the new melody is visible.

**Acceptance Scenarios**:

1. **Given** the player completes a specific minigame, **When** they receive the reward, **Then** they can unlock a new "Sheet Music" page.
2. **Given** the piano interface is open, **When** the player clicks the "Sheet Music" tab, **Then** they see a list of all unlocked melodies.
3. **Given** the "Sheet Music" tab is open, **When** the player selects a melody, **Then** the notes to play are displayed so the player can attempt to play it manually on the keyboard.

### Edge Cases

- What happens if the player mashes many keys at once? (Should have polyphony limit or handle overlapping audio gracefully).
- How does the system handle audio loading? (Audio files should be preloaded when entering the room to prevent lag on first press).
- What if the player's device is on silent or low volume? (Visual feedback like keys depressing or musical notes appearing is necessary).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display an interactive piano keyboard UI when the piano object is selected in Veronica's room.
- **FR-002**: System MUST play distinct audio samples (piano notes) corresponding to the keys pressed.
- **FR-003**: System MUST support both mouse/touch clicks and physical keyboard bindings for playing notes.
- **FR-004**: System MUST provide visual feedback (e.g., key depression, floating note particles) when a key is played.
- **FR-005**: System MUST allow simultaneous or rapidly sequential note playing (polyphony) without cutting off the previous note abruptly, up to a reasonable limit.
- **FR-006**: System MUST include a recognizable "Close" mechanism to exit the piano view.
- **FR-007**: System MUST track the sequence of played notes to detect if a "secret melody" (Easter Egg) has been played.
- **FR-008**: System MUST provide a "Sheet Music" tab or overlay within the piano interface to display unlocked melodies.
- **FR-009**: System MUST allow sheet music to be unlocked as rewards from completing other minigames or narrative events.
- **FR-010**: System MUST display the required note sequence for a selected sheet music melody when viewed by the player.

### Key Entities

- **Piano Key**: Represents a single key on the keyboard, with properties like note name (e.g., C4, D4), assigned audio file, and physical keyboard binding.
- **Note Sequence Tracker**: A temporary state that records the last N notes played to compare against secret melodies.
- **Sheet Music**: A collectible item that contains a specific sequence of notes (melody) and its unlocked status.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Players can play notes with less than 50ms latency between interaction and sound playback.
- **SC-002**: The piano interface loads and is fully interactive within 1 second of clicking the piano in the room.
- **SC-003**: Players can trigger the easter egg melody successfully based on a provided hint.
- **SC-004**: The free play mode clearly distinguishes itself from structured minigames by not having a score, timer, or pass/fail conditions.

## Assumptions

- The audio samples for the piano notes will be provided or sourced (standard piano soundfont).
- The "secret melody" will be defined during the implementation phase or narrative design.
- The player's device supports basic web audio API for playback.
