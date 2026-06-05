# Feature Specification: Romance Mechanics & Gameplay Expansion

**Feature Branch**: `004-romance-mechanics`

**Created**: 2026-06-05

**Status**: Draft

**Input**: User description: "vamos criar o resto da historia e opçoes de como se relcionar coloque tbm um medidor de conquista de cada garoto que a menina quer, inove em poder ligar para o garoto as vezes e crie dialogos e tbm coloque opçoes de certa quatidade de afinidade ele tbm te liga para chama pra sair e de mais dicas para melhorar a experiencia dela no jogo de novel romance escolar"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Love Interest Conquest & Affinity Meters (Priority: P1)

The player can view their current relationship level/affinity with each potential love interest in the school through a dedicated visual meter. This meter updates based on choices made in the story.

**Why this priority**: Essential core mechanic to track player progress and visual feedback for the romantic novel style.

**Independent Test**: Can be tested by making dialogue choices that increase/decrease affinity and checking if the visual meter updates correctly.

**Acceptance Scenarios**:

1. **Given** the player is in the main menu or pausing the game, **When** they open the "Relationships" screen, **Then** they see a list of love interests with their names, avatars, and a visual progress bar (Affinity Meter) from 0% to 100%.
2. **Given** the player makes a dialogue choice that pleases a character, **When** the choice is completed, **Then** the player sees a visual notification (+Affinity points) and the character's meter increases accordingly.

---

### User Story 2 - Player-Initiated Phone Calls (Priority: P2)

The player can open an in-game phone interface and choose to call any of the love interests. The phone calls initiate unique dialogue segments that vary depending on their current affinity level.

**Why this priority**: Innovative interaction mechanic requested to make relationships feel dynamic and responsive.

**Independent Test**: Can be tested by opening the phone UI, selecting a character to call, and verifying that the dialogue matches the current relationship status.

**Acceptance Scenarios**:

1. **Given** the player has access to the in-game phone, **When** they choose a contact and tap "Call", **Then** the game starts a call sequence with distinct audio/visual prompts and opens a dialogue tree.
2. **Given** the player calls a character with low affinity, **When** the call starts, **Then** the character reacts formally or briefly.
3. **Given** the player calls a character with high affinity, **When** the call starts, **Then** the character reacts warmly with intimate dialogue.

---

### User Story 3 - Incoming Calls & Invitations (Priority: P3)

When affinity with a character reaches specific milestones, the character will spontaneously call the player during free-time segments to invite them on dates or special school events.

**Why this priority**: Enhances realism and keeps the player motivated to raise affinity levels.

**Independent Test**: Can be tested by raising affinity to a threshold and advancing the story to free-time, then verifying the call event triggers.

**Acceptance Scenarios**:

1. **Given** the player's affinity with a character is above a target threshold, **When** they transition to a free-time phase, **Then** the phone rings with an incoming call from that character.
2. **Given** the incoming call is active, **When** the player accepts the call, **Then** they enter a custom dialogue where the character invites them on a date, allowing them to accept or decline.

---

### Edge Cases

- **Call Limits**: What happens when the player tries to call the same character repeatedly? Calling a character is limited to once per game-day to maintain balance, and calling does not cost Action Points.
- **Simultaneous Milestones**: What happens if the player reaches thresholds for multiple characters at the same time? The system must queue the incoming calls to prevent overlapping dialogs.
- **Declining Dates**: If the player declines an incoming date call, does affinity drop or does the invitation repeat later?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display an affinity/love meter for each love interest showing the percentage or numerical level of relationship progress.
- **FR-002**: System MUST allow the player to access a phone interface containing contacts for all met love interests.
- **FR-003**: System MUST trigger unique dialogue nodes based on the current affinity level during player-initiated calls.
- **FR-004**: System MUST trigger spontaneous incoming calls from love interests when affinity thresholds are crossed.
- **FR-005**: System MUST present date invitation prompts when accepting incoming calls.
- **FR-006**: System MUST track relationship history/progress.
- **FR-007**: System MUST provide user-friendly tips/tutorials for high school life decisions via a dedicated "LoveTips" diary application inside the phone interface.

### Key Entities *(include if feature involves data)*

- **Love Interest**: Represents a dateable character (name, avatar, current affinity level, unlocked call dialogues).
- **Phone Call Event**: Represents a dialogue session initiated via the phone interface (incoming/outgoing, target character, response type, state).
- **School Tip**: A tip/help card containing advice on school romance strategies and mechanics.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Players can see their exact affinity status with all love interests on the status screen in under 2 seconds.
- **SC-002**: 100% of date invitation triggers are successfully executed when the affinity score matches the target character's threshold.
- **SC-003**: Players can initiate and complete phone call interactions within 3 taps.

## Assumptions

- The game uses a standard visual novel choice-based dialogue engine.
- Art assets for characters and backgrounds are loaded dynamically.
- The target love interests for the story are Castiel, Lysandre, and Nathaniel, with specific affinity thresholds for triggering date calls set at 50, 75, and 90 affinity respectively.
