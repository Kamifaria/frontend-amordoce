# Feature Specification: Dynamic Scenes & CGs

**Feature Branch**: `[015-dynamic-scenes-cgs]`

**Created**: 2026-06-16

**Status**: Draft

**Input**: User description: "preciso que faça uma varredura em todas as imagens que possivelmente pode esta aparecendo um fundo preto na hora do dialogo e tbm quero que mais personagens apareça na tela não apenas interagindo com a veronica e sim entre eles igual no inicio que aparece o castiel conversando com nathaniel quero os outros personagens conversndo noramlmente em lugares aleatorios e conversas aleatorias que fazem parte da personalidade deles e quando a veronica entra no patio e escuta a conversa ai sim ela pode interagir lembrando que quero as inagens da historia criada tbm e mantendo a caracteristica dos personagens dpendendo do cenario pode muda a roupa apenas as o rosto manter os traços"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Dialogue Image Background Fix (Priority: P1)

Users should see all character portraits and CG images perfectly integrated with the environment, without any black backgrounds or clipping artifacts during dialogues.

**Why this priority**: Black backgrounds break immersion significantly and are considered a high-priority bug for visual novel aesthetics.

**Independent Test**: Can be fully tested by opening any dialogue that displays character sprites or CGs and verifying the transparency and blending.

**Acceptance Scenarios**:

1. **Given** a dialogue node triggering a character sprite, **When** the image loads on screen, **Then** it must have a transparent background seamlessly blending with the scenario.

---

### User Story 2 - Dynamic Multi-Character Interactions (Priority: P2)

Users navigating the school should stumble upon existing characters conversing with each other (e.g., in the courtyard, classrooms) before the player character (Veronica) interrupts or joins the conversation.

**Why this priority**: Adds massive depth to the world, making characters feel alive and independent rather than just waiting for the player.

**Independent Test**: Can be fully tested by navigating to a location and reading a dialogue exchange exclusively between two NPCs, with options for the player to eavesdrop or interrupt.

**Acceptance Scenarios**:

1. **Given** Veronica enters the courtyard, **When** a dynamic event triggers, **Then** she sees Castiel and another character interacting autonomously based on their defined personalities.
2. **Given** an ongoing NPC conversation, **When** Veronica chooses to interrupt, **Then** the NPCs shift their attention to her and the dialogue tree branches accordingly.

---

### User Story 3 - Contextual Character Outfits & CGs (Priority: P3)

Users should see character sprites and CG illustrations wearing clothing appropriate for the current scene/scenario (e.g., gym clothes, casual clothes) while strictly preserving their facial features and original traits.

**Why this priority**: Enhances visual storytelling and prevents the visual fatigue of seeing characters in identical school uniforms in every context.

**Independent Test**: Can be tested by triggering a scene where a character is explicitly described as wearing different clothes and verifying the displayed asset matches the description without losing character identity.

**Acceptance Scenarios**:

1. **Given** a physical education scene, **When** the character sprite loads, **Then** the character is wearing sportswear while retaining their exact original facial design and hair.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST scan and fix alpha-channel (transparency) issues on all currently existing portrait images to eliminate black backgrounds.
- **FR-002**: System MUST support rendering at least two non-player characters on screen simultaneously during dialogue.
- **FR-003**: System MUST support dialogue nodes where the speaker is an NPC addressing another NPC.
- **FR-004**: System MUST allow the player to observe NPC conversations before providing a dialogue choice to intervene.
- **FR-005**: System MUST support loading alternate sprite variations (outfits) for characters based on the scene context.
- **FR-006**: Generated character assets MUST retain strict facial consistency with their original sprites regardless of the outfit.

### Key Entities

- **Dialogue Scene**: Now supports multi-speaker layouts and active listeners.
- **Character Asset**: Supports `outfit` variations (e.g., `default`, `sport`, `casual`).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of character sprites render with proper transparency (no black backgrounds).
- **SC-002**: At least 3 new dynamic NPC-to-NPC conversation scenes are added to the game map.
- **SC-003**: At least 1 alternate outfit CG/Sprite is successfully integrated for the main love interests without loss of character recognition.

## Assumptions

- Image generation for alternate outfits will be handled by external AI tools but integrated systematically.
- The UI can accommodate two sprites side-by-side without overflowing on mobile screens.
