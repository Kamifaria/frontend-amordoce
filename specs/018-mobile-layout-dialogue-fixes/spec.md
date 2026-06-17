# Feature Specification: Mobile Layout & Dialogue Fixes

**Feature Branch**: `018-mobile-layout-dialogue-fixes`

**Created**: 2026-06-17

**Status**: Draft

**Input**: User description: "no modo mobile continua ainda cortando uns dialogos as bvezes o dialoog é grande e corta o personagem não esta aprecendo mais o nome de quem esta falando como fazemos essa correção par ao jogo ser perfeito em mobile lembrando q lobby não tem scrollbar para descer os capitolos preciso da melhor ideia para a melhor experiencia em mobile com jogo na foto mostra os problemas crie uma estrategia para resolver isso no mobile"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Dialogue & Sprite Layout Optimization on Mobile (Priority: P1)

The player on a mobile device should see a perfectly composed visual novel container. Dialogue texts should not overflow or get cut off, character sprites should scale down proportionally, and the dialogue box should be sized appropriately to avoid covering characters' faces or critical details.

**Why this priority**: Core visual composition of a visual novel game. Text must be readable and character sprites must be fully visible.

**Independent Test**: Open the game on a mobile viewport (e.g., width 375px or 500px). Walk through dialogues with long texts and verify that all text fits inside the container and characters are positioned properly without overlapping issues.

**Acceptance Scenarios**:

1. **Given** the player is using a mobile viewport, **When** a long dialogue text is rendered, **Then** the font size scales down slightly and the dialogue box expands height-wise to contain the entire text without overflow or clipping.
2. **Given** a character sprite is active on screen in mobile view, **When** the dialogue box is displayed, **Then** the sprite is positioned higher or scaled down so its head/upper body remains fully visible above the dialogue box.

---

### User Story 2 - Speaker Name Display on Mobile (Priority: P1)

Restore the speaker name container on mobile devices. When a character or narrator is speaking, their name must be clearly displayed in the dedicated speaker name box on top of/attached to the dialogue box.

**Why this priority**: Essential for identifying the current speaker in conversations, especially with multiple characters present.

**Independent Test**: Start the game on a mobile viewport, trigger dialogue from Nathaniel or Castiel, and verify that their name appears in a readable label above the dialogue text.

**Acceptance Scenarios**:

1. **Given** a dialogue node has an active speaker (e.g., "Nathaniel"), **When** rendered on mobile viewports, **Then** a visible, stylized box displays the name "Nathaniel" above the main dialogue text.

---

### User Story 3 - Lobby Scrollability on Mobile (Priority: P2)

Ensure the lobby page is fully scrollable on mobile devices so players can scroll down to access and select subsequent episodes or chapters.

**Why this priority**: Prevents user blocker where players cannot view or play later chapters due to screen space limitations.

**Independent Test**: Open the Lobby on a mobile viewport and scroll/swipe vertically to reach the bottom chapters.

**Acceptance Scenarios**:

1. **Given** the player is in the Lobby on a mobile viewport, **When** they drag/swipe up or use the touch scroll, **Then** the page scrolls smoothly to reveal the rest of the chapters.

---

### Edge Cases

- **Extremely long dialogue text**: If the dialogue text is exceptionally long, a scrollbar inside the dialogue container or automatic pagination/text-breaking should prevent layout breakage.
- **Multiple characters on screen on mobile**: If two character sprites are displayed on a mobile viewport, they should scale down and position side-by-side without overlapping each other or clipping out of bounds.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The DialogueBox component MUST use responsive styles (Tailwind viewport modifiers or CSS media queries) to scale down text size and padding on mobile viewports.
- **FR-002**: The DialogueBox MUST support multi-line overflow by dynamic container sizing, ensuring no text is hidden.
- **FR-003**: The SpriteCharacter component MUST adjust its positioning (e.g., bottom offset or vertical scale) on mobile viewports so that the character's face is not covered by the dialogue box.
- **FR-004**: The speaker name container MUST NOT be hidden via CSS classes (like `hidden md:block`) on mobile viewports. It must remain visible and legible on all screen sizes.
- **FR-005**: The Lobby view MUST have CSS rules enabling vertical scrolling (e.g., `overflow-y-auto` or removal of body-height constraints like `h-screen` or `overflow-hidden` on parent containers on mobile).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of dialogue text is readable without any truncation or overflow on mobile screens as narrow as 360px.
- **SC-002**: The speaker name box is visible on all viewport widths when a speaker is active.
- **SC-003**: The lobby page allows vertical scrolling, enabling access to all chapters.

## Assumptions

- **A-001**: The aspect ratio wrapper (GameContainer) can adapt or scale its children to fit mobile screens comfortably.
