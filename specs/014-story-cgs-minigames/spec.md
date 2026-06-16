# Feature Specification: Story CGs & Mobile Minigames Expansion

**Feature Branch**: `[014-story-cgs-minigames]`

**Created**: 2026-06-16

**Status**: Draft

**Input**: User description: "vamos trabalhar na historia para cada acontecimento da historia dos capitolos vamos criar imagem que combine com essa historia lembrando de manter sempre os traços dos personagens, e quero dicas de novos mini games que envolva oque a historia esta nos levando lembrando que tudo isso tbm tem que ser responsivo para mobile quero dicas e as imagens conforme a historia caminha"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Immerse with Contextual CGs per Chapter (Priority: P1)

As a player, I want to see beautiful full-screen CGs (Computer Graphics/Illustrations) during key moments in every chapter, so that I feel more immersed in the story and the characters' emotions.

**Why this priority**: CGs are a core element of visual novels and highly requested by players to reward story progression.

**Independent Test**: Can be fully tested by playing a chapter and verifying that the corresponding CG appears at the exact moment described, with correct character traits preserved.

**Acceptance Scenarios**:

1. **Given** the player reaches a significant event in Chapter X, **When** the dialogue node triggers the event, **Then** a full-screen CG overlay matching the scene is displayed.
2. **Given** a CG is displayed, **When** the player views it on a mobile device, **Then** the image scales responsively and maintains a 16:9 aspect ratio without distortion.

---

### User Story 2 - Engage with Contextual Minigames (Priority: P2)

As a player, I want to play new minigames that are directly related to the current story events, so that the gameplay feels integrated rather than disconnected.

**Why this priority**: Themed minigames break up the reading pace and add interactive fun that makes the narrative memorable.

**Independent Test**: Can be fully tested by reaching the minigame trigger in the story, completing the minigame on mobile or desktop, and receiving points/affinity correctly.

**Acceptance Scenarios**:

1. **Given** the story involves an action (e.g., finding a lost item, baking a cake, sports), **When** the minigame starts, **Then** the mechanics and visuals match that action exactly.
2. **Given** the player starts a minigame on a mobile phone, **When** they interact using touch controls, **Then** the UI is fully responsive, buttons are tap-friendly, and no content is cut off.

### Edge Cases

- What happens when a player rotates their mobile device during a CG or minigame? (UI should adapt or force portrait/landscape depending on the game).
- How does the system handle missing CG images if the asset fails to load? (Should fallback to the background with normal sprites gracefully).
- What if the player skips the dialogue too fast? (The minigame or CG must not break the game state sequence).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST support defining unique `cgUrl`s for specific dialogue nodes across all new chapters.
- **FR-002**: System MUST render CG overlays in a mobile-responsive container that prevents horizontal scrolling and scales down correctly on smaller screens.
- **FR-003**: System MUST provide a generic interface/factory to plug in new contextual minigames based on a `minigameId` defined in the story node.
- **FR-004**: System MUST ensure all new minigames support touch events (`onTouchStart`, `onTouchMove`, etc.) alongside mouse events.
- **FR-005**: All generated CGs MUST maintain the facial features, hair, and specific traits of the characters established by their reference sprites.

### Key Entities

- **CGAsset**: Represents the image file, character traits required, and the specific chapter/scene it belongs to.
- **MinigameConfig**: The configuration object that links a specific story node to the corresponding React minigame component.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of new CGs render correctly on both desktop (1920x1080) and standard mobile viewports (e.g., 375x667) without UI breaking.
- **SC-002**: 100% of new minigames are fully playable and completable using only mobile touch inputs.
- **SC-003**: All new CGs pass visual consistency checks against character reference sheets.

## Assumptions

- Image generation tools (AI) will be used to create the CGs, relying on reference sprites to maintain consistency.
- The game will primarily be played in portrait or landscape mode on mobile, but UI containers will use `aspect-video` ou `max-w-full` flexbox to handle responsiveness.
- The existing `GameScreen` and `CGOverlay` architecture can be reused to trigger these new assets.
