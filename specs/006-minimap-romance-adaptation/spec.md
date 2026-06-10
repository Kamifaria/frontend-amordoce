# Feature Specification: Mini-Map Navigation & Advanced Romance Routes

**Feature Branch**: `006-minimap-romance-adaptation`

**Created**: 2026-06-10

**Status**: Draft

**Input**: User description: "vamos la tive ideia de um mini mapa pro usuario escolher se volta pra escola ou se vai pro patio e no patio pode conhecer mais alunos fora que temos que adapitar o roteiro lembrando que conforme vc tem mais afinidade com cada pessoa muda uma ligação ,muda o convite , quem vai trata melhor se vc tive um nivel de amizade  tratamento de amizade e tive num nivel de love tratamando de love , cada personagem tem sua personagem quero uns personagens dificeis de conquistar  quero que as reposta sejam abiguas sem vc sabe como vai favorecer ao seu crush tanto muçlher tanto homens  vou passa a sprites de cada personagem e faremos um planos para emcaixar eles nesse novo roteiro e preciso de imagems novas para cada sotiação que esta acontecendo  exemplo castiel e natanael brigando entao monte crie novas ideias , mandei 4 spitrs da maggie então já coloque ela no roteiro  entnedeu?"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Mini-Map Navigation (Priority: P1)

The player can open a mini-map interface to choose between returning to the main school building (indoors) or going out to the Patio. In the Patio, the player can meet and interact with more students (e.g., Armin, Alexy, and Maggie).

**Why this priority**: Core exploration mechanic that enables players to choose where they want to go and who they want to meet.

**Independent Test**: Click on the Map button, choose "Patio", verify that the background and character list update to Patio-specific characters, and then choose "School" to return indoors.

**Acceptance Scenarios**:

1. **Given** the player is in free-roaming mode, **When** they click the Mini-Map icon, **Then** a visual map overlay is shown containing interactive nodes for "School (Indoors)" and "Patio (Outdoors)".
2. **Given** the player selects "Patio", **When** they confirm the choice, **Then** the scene transitions to the Patio background, and the pool of potential random student encounters changes.

---

### User Story 2 - Dynamic Dialogue & Phone Call Adaptation (Priority: P1)

A character's dialogue, phone call conversations, and date invitations adapt dynamically based on the player's affinity tier with them (Friendship Tier vs. Love Tier).

**Why this priority**: Essential romance feedback mechanic to make player relationships feel alive and responsive to choices.

**Independent Test**: Reach the Friendship tier with a character and call them to observe friendly dialogue. Raise affinity to the Love tier and call them again to observe warm/romantic dialogue.

**Acceptance Scenarios**:

1. **Given** a character is in the "Friendship Tier", **When** they call the player, **Then** the dialogue uses friendly, platonic language and offers casual hangouts.
2. **Given** a character is in the "Love Tier", **When** they call the player, **Then** the dialogue uses intimate, romantic language and invites the player on a formal date.

---

### User Story 3 - Ambiguous Dialogue Choices & Difficult Crushes (Priority: P2)

To increase difficulty, dialogue choices are written ambiguously so players cannot easily predict which option will please a specific crush. This applies to both male and female love interests.

**Why this priority**: Enhances challenge and realism, preventing players from easily gaming the system to raise affinity.

**Independent Test**: Interact with a difficult crush, select an ambiguous choice, and verify that the affinity outcome feels organic but non-obvious.

**Acceptance Scenarios**:

1. **Given** a dialogue choice selection screen, **When** the options are displayed, **Then** the wording does not clearly indicate which character will favor which choice.

---

### User Story 4 - Situational Illustration Events (CGs) & Maggie's Route (Priority: P2)

Unique story events (e.g., Castiel and Nathaniel fighting) unlock new full-screen illustrations (CGs). Maggie is fully integrated into the route using her four expressions (sly/smug, angry, blushing, neutral).

**Why this priority**: Enriches the visual novel experience and adds Maggie as a key romanceable/route option.

**Independent Test**: Trigger the "Castiel and Nathaniel fight" event and verify that the special fight CG is unlocked and displayed. Play Maggie's route and check that her expressions change correctly.

**Acceptance Scenarios**:

1. **Given** the player triggers the fight scene, **When** the dialogue starts, **Then** the screen displays the new custom fight illustration.
2. **Given** the player talks to Maggie, **When** she responds with different emotions, **Then** the UI renders the correct expression sprite (neutral, angry, blushing, or smug).

---

### Edge Cases

- **Mini-Map Accessibility**: The mini-map must be disabled during active conversations or story cutscenes to prevent players from leaving in the middle of dialogue.
- **Affinity Threshold Transition**: If a choice pushes a player's affinity from Friendship to Love tier during a conversation, the active conversation continues in the current state, but subsequent calls/encounters instantly transition to the Love tier behavior.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST implement a Mini-Map UI component displaying interactive location nodes (School, Patio).
- **FR-002**: The system MUST support location transitions that swap backgrounds, active characters, and story trees.
- **FR-003**: Dialogue nodes MUST support conditional text branches based on the player's affinity tier (Friendship vs. Love).
- **FR-004**: Phone call templates MUST branch into friendly or romantic versions depending on the active relationship tier.
- **FR-005**: Dialogue choices MUST support ambiguous pathways where choices affect multiple characters' affinity scores in non-obvious ways.
- **FR-006**: The system MUST support difficult-to-conquer characters (specifically Castiel and Lysandre) with lower base affinity gains (+5 / +10 points instead of +15 / +20) and stricter choice paths.
- **FR-007**: The system MUST support unlocking and displaying three situational illustrations (CGs): Castiel & Nathaniel Hallway Fight, Maggie's Dynamic Painting, and the Patio Group Introduction.
- **FR-008**: The system MUST integrate Maggie's route using her 4 sprites (neutral, blushing/smiling, angry, sly/smug).

### Key Entities

- **MapLocation**: Represents a location in the school (School, Patio). Attributes: ID, name, background image, list of present characters.
- **RelationshipTier**: Represents the romance tier (Friendship vs. Love) calculated based on the character's affinity score.
- **IllustrationEvent (CG)**: Represents an unlockable full-screen event artwork. Attributes: ID, title, image URL, unlocked status.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Location switching via the Mini-Map takes less than 500ms from click to render.
- **SC-002**: Relationship tier calculation and dialogue branching execute without any lag or frame drops (0ms delay).
- **SC-003**: 100% of Maggie's expressions load dynamically according to the dialogue script.

## Assumptions

- The game's state store (Zustand) manages the player's current location, character affinity scores, and unlocked CG list.
- Relationship thresholds are: Friendship Tier (-100 to 49 affinity), Love Tier (50 to 100 affinity).
- Maggie's sprites are located in the public assets directory.
