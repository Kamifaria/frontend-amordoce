# Feature Specification: Goth Closet, Clothing Shop & Gold Economy

**Feature Branch**: `017-closet-clothing-shop-gold`

**Created**: 2026-06-17

**Status**: Draft

**Input**: User description: "essa é a veronica personagem principal do meu jogo quero coloca quero montar um closet e criar uma loja no mapa de roupas para ela montar a personagem muda de roupa de dicas preciso coloca uma funcionalidade para o gold quero dicas de como funciona esse gold no amor doce e como faço para obter pode ser com os mini games de dicas e melhorias sobre isso quero monte a veronica e no closet coloca umas roupas de teste para gente ve mas nada muito girlzinha algo mais dark como ela é"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Dark/Goth Closet Customization (Priority: P1)

The player (Veronica) can access the Wardrobe/Closet to change outfits. The closet must contain gothic/dark options (black vests, corsets, ripped jeans, gothic hair) instead of pink/girly styles, and the avatar preview should update in real time.

**Why this priority**: Crucial for defining the player character's custom goth identity and establishing the core dress-up gameplay loop.

**Independent Test**: Open the Closet, click on different gothic hair, top, or bottom items, and verify that the avatar representation updates immediately to show the selected styles.

**Acceptance Scenarios**:

1. **Given** the player opens the Closet, **When** they select "Cabelo Roxo Gótico", **Then** the avatar preview updates to render the purple hair style.
2. **Given** the player selects "Jaqueta Punk Spikes" (top) and "Calça Rasgada Grunge" (bottom), **Then** these items are instantly displayed on the avatar preview.

---

### User Story 2 - Clothing Shop on the Map (Priority: P1)

The map overlay should include a new location: "Loja de Roupas" (Clothing Shop). Visiting this shop lets players browse available dark-themed outfits, view their Gold cost, and buy them.

**Why this priority**: Connects map exploration with the dress-up loop and gives utility to Gold.

**Independent Test**: Open the map, click on "Loja de Roupas", browse items, buy a locked gothic outfit using Gold, and verify it becomes available in the Closet.

**Acceptance Scenarios**:

1. **Given** the player is on the Map, **When** they click "Loja de Roupas", **Then** they transition to a dedicated shop interface showing buyable clothing items.
2. **Given** the player has enough Gold, **When** they click "Comprar" on a locked item, **Then** their Gold balance decreases, the item unlocks, and it becomes selectable in the Closet.

---

### User Story 3 - Gold Currency & Minigame Earning System (Priority: P2)

Players need mechanisms to obtain Gold. Gold is earned by:
- Daily Tarot card draw.
- Score performance in minigames (playing the minigames like Guitar Dueling, Painting, or Memory matches yields Gold rewards).
- Completed daily quests.

**Why this priority**: Encourages minigame replayability and creates a functional progression loop.

**Independent Test**: Complete a minigame (e.g. Guitar Minigame), achieve a high score, and verify that Gold is added to the player's balance.

**Acceptance Scenarios**:

1. **Given** the player finishes the Guitar Minigame with a score of 400+, **When** the minigame results are displayed, **Then** they receive a reward of 15 Gold.
2. **Given** the player draws their daily Tarot card, **When** it yields a Gold reward, **Then** the Gold is added to their balance immediately.

### Edge Cases

- **What happens if the player tries to buy a clothing item but has insufficient Gold?** The system shows a warning toast ("Gold Insuficiente") and prevents the purchase.
- **Can the player buy the same item twice?** No, once an item is purchased, the button changes to "Comprado" or "Equipar".

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The Closet system MUST replace the girly placeholders with dark/goth clothing items:
  - **Hairs**: Cabelo Roxo Gótico, Curto Preto Grunge, Tranças Punk.
  - **Tops**: Blusa Preta & Corpete, Jaqueta de Couro Spikes, Camiseta de Banda.
  - **Bottoms**: Saia de Couro com Correntes, Calça Preta Rasgada, Shorts Escuro & Meia Arruda.
- **FR-002**: The Map Overlay MUST include a new selectable node "Loja de Roupas" (Clothing Shop).
- **FR-003**: The Clothing Shop MUST show locks, prices, and enable purchases using the player's Gold.
- **FR-004**: Completing minigames MUST award Gold based on the final score tier:
  - High score (400+): 20 Gold.
  - Medium score (150-399): 10 Gold.
  - Low score (<150): 5 Gold.
- **FR-005**: The Closet avatar MUST update visually to match the exact gothic items equipped.

### Key Entities

- **ClosetItem**: Represents a piece of clothing with attributes `id`, `name`, `category` (hair, top, bottom), `preview` (emoji/icon), `price` (Gold), and `owned` status (boolean).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of default starting items in the closet are dark/goth themed.
- **SC-002**: The Clothing Shop offers at least 6 unique items to purchase.
- **SC-003**: Successfully completing any minigame adds the correct amount of Gold based on score tier.
- **SC-004**: Buying an item unlocks it in the Closet instantly.

## Assumptions

- **A-001**: Web Audio API and state managers (Zustand) can be used to handle sound effects and state persistence.
- **A-002**: Avatars can be represented with themed icons/emojis in a stylized preview.
