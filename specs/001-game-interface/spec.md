# Feature Specification: Game Interface for Amor Doce Clone

**Feature Branch**: `001-game-interface`

**Created**: 2026-06-02

**Status**: Draft

**Input**: User description: "/speckit-specify Você é um Engenheiro de Software Sênior especialista em Next.js, TypeScript e Tailwind CSS. Preciso estruturar a interface do jogo "Amor Doce Clone" (estilo Visual Novel/Otome Game clássico baseado em website). Gere a estrutura de componentes principais para a tela do jogo rodando em uma Single Page Application (SPA) ultra fluida. Requisitos Técnicos Obrigatórios: 1. Stack: Next.js 14+ (App Router), TypeScript estrito, Tailwind CSS para estilização e Framer Motion para animações de interface e sprites. 2. Estado Global: Crie um store do Zustand para gerenciar o estado do jogo local (currentNodeId, playerPA, playerGold, currentSpeaker, currentText, choices, e backgroundUrl). 3. Efeito de Digitação: O texto do diálogo deve aparecer caractere por caractere (efeito typewriter). Se o usuário clicar na tela enquanto o texto digita, o efeito deve parar e exibir o texto completo instantaneamente. Estrutura de Componentes para Criar: - GameContainer, Cenario, SpriteCharacter, DialogueBox, ChoiceOverlay. Contrato de Tipagem TypeScript (shared/types.ts)"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Fullscreen Stable Aspect Ratio Game Container (Priority: P1)

Users see a centered game canvas on their screens that preserves a classic visual novel ratio (16:9), scaling gracefully depending on screen size, with a visually polished outer environment.

**Why this priority**: Core game layout is required for any visual components to render correctly and remain consistent across device resolutions.

**Independent Test**: Can be verified by running the application, resizing the browser window, and ensuring the game canvas maintains a centered layout with a 16:9 aspect ratio and does not overflow or stretch out of proportion.

**Acceptance Scenarios**:

1. **Given** a user opens the game on a desktop viewport, **When** they resize the window, **Then** the game canvas remains centered, scales down or up, and maintains its 16:9 aspect ratio.
2. **Given** a user opens the game on a mobile device, **When** they rotate the device to landscape, **Then** the game container fits the viewport height and width correctly.

---

### User Story 2 - Typewriter Text Effect & Dialogue Skip (Priority: P1)

The user reads game text character-by-character to build suspense and match classical Otome game pacing. If they find it slow or want to progress fast, a single click on the screen/dialogue area instantly reveals the full dialogue line.

**Why this priority**: Essential for visual novel narrative pacing and user control over text speed.

**Independent Test**: Can be tested by clicking to trigger new text and verifying that the typing speed is progressive, and clicking again during typing immediately fills the dialogue box.

**Acceptance Scenarios**:

1. **Given** new dialogue starts typing out character-by-character, **When** the user clicks on the game viewport before typing finishes, **Then** typing stops and the entire text is fully displayed immediately.
2. **Given** dialogue text typing has completed, **When** the user clicks on the game viewport, **Then** the game state advances to the next node (deducting Action Points if applicable) and starts typing the new text.

---

### User Story 3 - Interactive Choice Overlay (Priority: P2)

When the dialogue node contains branching choices, the user sees styled choice buttons overlaying the scene. Selecting a choice transitions the game state to the specified next node, deducting the required Action Points (PA). Clicking outside choices does not advance the dialogue.

**Why this priority**: Allows branching narratives, which is the core gameplay loop of Otome games.

**Independent Test**: Can be tested by navigating to a node with choices, verifying that the classic click-to-advance behavior is blocked, and confirming that clicking a choice correctly changes the dialogue/background node and deducts Action Points.

**Acceptance Scenarios**:

1. **Given** a dialogue node contains choices, **When** the choices are displayed, **Then** standard advance-clicks on the dialogue area are ignored/blocked.
2. **Given** choice options are visible, **When** the user clicks a choice that costs Action Points, **Then** the user's PA is updated accordingly and the game transitions to the selected next node.

---

### User Story 4 - Visual Scene Transitions & Character Sprites (Priority: P2)

When backgrounds or characters change expressions/positions, they transition smoothly using fades and sliding animations rather than abrupt image swapping.

**Why this priority**: Enhances the visual experience, giving it a premium feel as per the web application development guidelines.

**Independent Test**: Can be tested by transitioning to a node with a different background and speaker/expression, and observing smooth visual transitions (Framer Motion fades and slides).

**Acceptance Scenarios**:

1. **Given** the dialogue node transitions to a new background URL, **When** the change happens, **Then** the background image fades smoothly from the previous one.
2. **Given** a character enters a scene or changes expression, **When** they update, **Then** the sprite slides into place or fades smoothly to the new expression.

---

### Edge Cases

- **Insufficient Action Points (PA)**: If a user selects a choice that requires more PA than they currently have, the system should prevent the transition and show a visually polished notification.
- **Fast Clicking**: If the user clicks multiple times in rapid succession, the application must handle the state transitions sequentially without skipping nodes or triggering visual glitching of the typewriter effect.
- **No Background/No Speaker Nodes**: If a node lacks a background URL or a character sprite (e.g., narration nodes), the system should smoothly fade out the previous elements and center the dialogue text box without layout breakage.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The layout MUST use a fixed aspect ratio container (16:9 ratio, max-w-5xl) centered vertically and horizontally on the viewport.
- **FR-002**: The Zustand global store MUST hold the following state properties: `currentNodeId`, `playerPA`, `playerGold`, `currentSpeaker`, `currentText`, `choices`, and `backgroundUrl`.
- **FR-003**: The DialogueBox component MUST render the character's name in a styled badge and the dialogue text.
- **FR-004**: The dialogue text typing effect MUST print characters at a configurable speed (e.g., 30ms per character).
- **FR-005**: If the user clicks anywhere in the game viewport during typing, the typing animation MUST stop and display the entire current text. If clicked after typing is finished, it MUST advance to the next node unless choices are active.
- **FR-006**: When choices are present in the current node, the ChoiceOverlay component MUST be rendered, and normal advance clicking MUST be disabled.
- **FR-007**: Selecting a choice MUST deduct its `costPA` from the player's PA and update the `currentNodeId` to the choice's `nextNodeId`.
- **FR-008**: The SpriteCharacter component MUST support absolute positioning (`esquerda`, `centro`, `direita`) and animate expression changes/entrances using Framer Motion.
- **FR-009**: The Cenario component MUST use Framer Motion's `AnimatePresence` or exit/enter animations to transition background URLs smoothly with a fade effect.

### Key Entities

- **PlayerState**: Represents the user's current game state. Contains:
  - `playerPA`: Action points used to make choices or advance.
  - `playerGold`: Currency/Gold count.
- **DialogueNode**: Represents a single scene/dialogue frame in the game. Contains:
  - `id`: Unique identifier for the node.
  - `speaker`: The entity speaking (name or system).
  - `characterName`: Display name of the speaking character.
  - `expression`: Expression key for sprite selection.
  - `backgroundUrl`: Image URL for the scene background.
  - `text`: Dialogue text to be displayed.
  - `choices`: Array of available choices (optional).
  - `next`: ID of the next node to advance to automatically (optional).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The game canvas scales responsively from mobile viewports (minimum 320px width) up to 4K resolutions without visual distortion or overflow.
- **SC-002**: Dialogue typewriter animation displays text smoothly and immediately completes within 16ms of a click event.
- **SC-003**: Background transitions are completed in under 500ms using a hardware-accelerated CSS/motion transition.
- **SC-004**: The state store updates and components re-render without noticeable lag, maintaining a stable 60 FPS during sprite animations and transitions.

## Assumptions

- **A-001**: Dialogue narrative nodes are provided via a local mock dataset or a JSON database structure during development.
- **A-002**: Images for backgrounds and character sprites are loaded via external URLs or public assets with standard aspect ratios.
- **A-003**: The default action point (PA) deduction per standard node progression is 0, while choice-specific deductions are specified dynamically in the choice entity.
- **A-004**: The user has standard modern web browser capabilities supporting CSS Flexbox/Grid, Framer Motion (WebGL/hardware acceleration), and ES6 JavaScript.
