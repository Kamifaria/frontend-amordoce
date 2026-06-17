# Feature Specification: Story Dialogue Bugfixes, Maggie Integration & Class Schedules (Chapter 1)

**Feature Branch**: `016-story-fixes-maggie-classes`

**Created**: 2026-06-17

**Status**: Draft

**Input**: User description: "/speckit-specify outro problema existe uns bugs na conversas reveja e se tem algum problema la e vamos seguir a historia do capitolo 1 lcom os aconcimentos quero tbm adicionar horarios das aulas para umas 2 e como sempre coloca um pouco a mais a parte de conseguir conquistar alguem a maggie não apareceu ainda preciso que em algum momento da historia ela apareça tbm"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Resolving Broken Conversation Paths (Priority: P1)

The player should be able to play through all branches of Chapter 1 without encountering broken dialogues (dangling references like `find-notebook` and `maggie-start`).

**Why this priority**: Crucial for game playability so players don't experience a frozen interface.

**Independent Test**: Play through the "Search Art Room" path and the "Search Photography Room" (Galpão) paths and verify that dialogues advance correctly to subsequent scenes.

**Acceptance Scenarios**:

1. **Given** the player is in the Art Room searching for Lysandre's notebook, **When** they choose to ask Kami about it (`maggie-art-notebook`), **Then** the game successfully transitions to finding the notebook (`quest-found-notebook`) instead of freezing on a non-existent node.
2. **Given** the player is in the Photography Club/Room, **When** they choose to speak with Maggie, **Then** the dialogue advances to her introduction scene (`maggie-intro-patio`) rather than breaking on `maggie-start`.

---

### User Story 2 - Maggie's Introduction in Episode 1 (Priority: P1)

Maggie should be introduced during the school day in Episode 1 (prior to the end-of-day chat) so she has physical presence in the school and the player can interact with her.

**Why this priority**: High value for story consistency and character roster parity, since she was only mentioned/reachable in a buggy manner previously.

**Independent Test**: The player goes to the Photography Club/Room or the Courtyard during the notebook quest and meets/talks to Maggie directly.

**Acceptance Scenarios**:

1. **Given** the player is searching for the notebook, **When** they visit the Photography Club/Room (Galpão), **Then** they see Maggie's sprite and can talk to her, learning about her passion for photography.
2. **Given** the player meets Maggie in person, **When** they choose dialog options, **Then** they can gain or lose affinity with her, and she mentions her friendship with the other characters.

---

### User Story 3 - Class Schedules & Time Events (Priority: P2)

The story should incorporate class time events (morning and afternoon class start/end times) to structure the school day pacing.

**Why this priority**: Enhances pacing and structure of the episode, giving players a sense of school schedule flow.

**Independent Test**: Play through Episode 1 and verify the inclusion of morning/afternoon class transitions and schedule markers.

**Acceptance Scenarios**:

1. **Given** the player finishes the initial corridor confrontation, **When** the morning class bell rings, **Then** a brief transition screen or narrator dialogue displays the class schedule (e.g. 08:30 - Portuguese, 10:30 - Math).
2. **Given** classes end for the day, **When** the afternoon bell rings, **Then** the player transitions to the free exploration/notebook search phase.

---

### User Story 4 - Additional Romance & Flirting Choices (Priority: P2)

Players should have additional dialog choices to express interest or flirt with characters, gaining higher Love-O-Meter (LOM) affinity points.

**Why this priority**: Directly aligns with visual novel/otome game core romance mechanics.

**Independent Test**: Verify there are more romantic/flirty choices when interacting with Nathaniel, Castiel, Remi, Harry, Lysandre, Kami, and Maggie.

**Acceptance Scenarios**:

1. **Given** the player is talking to any love interest, **When** they select a flirty choice, **Then** their Love-O-Meter increases by a distinct, positive amount.

### Edge Cases

- **What happens when the player has insufficient Action Points (PA) for the new flirting options?** The option is disabled and styled appropriately (same as other premium options).
- **How does the system handle returning to the search menu if a room is visited twice?** Checked locations should be marked, or dialogues should have appropriate fallback lines.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The game story configuration MUST fix the dangling references (`find-notebook` and `maggie-start`) to prevent runtime narrative freezes.
- **FR-002**: Maggie MUST be added as an active character sprite with expressions, dialogue nodes, and a location during the Episode 1 school day search.
- **FR-003**: The narrative flow MUST include at least two class schedule/bell transition nodes (e.g. morning classes start, afternoon classes end).
- **FR-004**: Each main character dialogue interaction in Episode 1 MUST include at least one dialogue option focused on romance/flirting that increases affinity (LOM).
- **FR-005**: All choices MUST be verified against the player's current PA, and the state must persist correctly.

### Key Entities

- **DialogueNode**: Represents a block of dialogue. Needs to point to a valid `next` node or include a list of `choices` with valid `nextNodeId` attributes.
- **Character (Maggie)**: Represents Maggie, including sprite assets, expression variants (neutra, sorrindo, provocando), and relationship metrics.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: zero (0) broken dialogue links/nodes in mockStory.
- **SC-002**: 100% of rooms in the notebook search quest lead to fully functioning dialogue flows.
- **SC-003**: Maggie has at least two direct dialogue interactions during the school day in Episode 1.
- **SC-004**: Players have access to at least 4 new romantic/flirty dialogue choices across the chapter.

## Assumptions

- **A-001**: Sprite assets for Maggie are available or can fall back to existing placeholder images/sprites.
- **A-002**: The current game store and engine support transitions to any newly added nodes.
