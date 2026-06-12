# Feature Specification: Dialogue and CG Image Backgrounds Fix

**Feature Branch**: `011-dialogue-images-fix`

**Created**: 2026-06-12

**Status**: Draft

**Input**: User description: "vamos la as imagens estao fora  no quadrado  preciso que acerte precisamente e que o fundo branco transparente era pra ter o fundo do corredor  vamos verifica isso preciso que rtodas as inagens dos dialogos estejam certinhas  entendeu as que tem um fundo branco vc pode  adicionar um cenario coerente com a situaçção da historia ok?"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Exact CG Fitting and Dynamic Background Overlay (Priority: P1)

As a player, when a special CG/illustration is unlocked or shown during dialogue, I want to see the characters/action cleanly superimposed over the actual game scenario (like the school corridor) instead of seeing a checkerboard transparent pattern or generic white box, and the image must fit exactly within its borders.

**Why this priority**: Crucial for story immersion and visual polish. Checkerboards and misaligned borders break the visual novels' aesthetic.

**Independent Test**: Trigger a CG event (such as the Nathaniel vs Castiel fight scene) in the game and verify the CG overlay has no checkerboard/white background, showing the school corridor behind the characters, and that it fits perfectly in its container.

**Acceptance Scenarios**:

1. **Given** the player reaches the fight scene dialogue in Episode 1, **When** the Special CG overlay triggers, **Then** the characters are displayed with the corridor background rendered behind them instead of the checkerboard grid.
2. **Given** any special CG/illustration display, **When** it renders on screen, **Then** it fits precisely inside its visual frame without spilling outside the borders or clipping awkwardly.

---

### User Story 2 - Dialogue Sprites Alignment and Coherent Scene Backgrounds (Priority: P2)

As a player, when reading the dialogue, I want all character sprites and images to be perfectly positioned inside the game area, and any dialogue assets that have raw transparent/white backgrounds should automatically fall back to the active scene background (e.g., courtyard, classroom, corridor) appropriate for that dialogue.

**Why this priority**: Enhances readability and dialogue UI presentation.

**Independent Test**: Advance through dialogue nodes in different locations and inspect the layout structure of character images to confirm zero overflow/clipping and correct background matching.

**Acceptance Scenarios**:

1. **Given** a dialogue node with specific character sprites, **When** the sprite is rendered on screen, **Then** it aligns properly with the bottom/dialogue box area and does not overflow the main screen boundaries.
2. **Given** dialogue/characters with raw white/empty background properties, **When** rendered, **Then** the scene's current background image is displayed behind them automatically.

---

### Edge Cases

- **No active background defined**: If a dialogue node or scene does not specify a background, it should fall back to a default coherent scene background (e.g. the corridor) rather than showing a black or white container.
- **Varying CG Aspect Ratios**: If a CG has a different aspect ratio than the default container, it should use CSS containing techniques (like `object-fit: contain` or `cover`) combined with centering to ensure no overflow and no white borders.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST overlay transparent PNG CGs (e.g., the fight scene) on top of the active story background (e.g., the corridor) or a fallback location.
- **FR-002**: The system MUST render all CG and dialogue elements centered and fully contained inside the gameplay square/borders, ensuring they do not spill outside the borders.
- **FR-003**: The system MUST ensure character sprites and dialogue overlays align correctly with the dialogue box, preventing floating or cut-off assets.
- **FR-004**: The system MUST map any static white/empty backgrounds in dialogs to a coherent story background based on the current context.

### Key Entities

- **CG / Illustration**: A special full-screen or boxed graphic shown during key narrative moments (e.g., fight scene).
- **Dialogue Sprite**: The transparent character graphic overlay displayed during conversations.
- **Scene Background**: The visual location backdrop (e.g., corridor, courtyard).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of CG overlays show a coherent background scenario instead of transparent checkerboard or blank white grids.
- **SC-002**: 100% of dialogue images/sprites fit precisely in the container without clipping or overflowing.
- **SC-003**: 0 layout shifting occurs when CG overlays load.

## Assumptions

- The transparent checkerboard is part of the original image assets (transparent alpha channels), which can be styled using CSS backgrounds behind them, or standard layout placement.
- The default corridor background asset exists and is accessible at a public/local URL inside the project.
