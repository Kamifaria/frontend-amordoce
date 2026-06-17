# Feature Specification: Episode 1 Band Show Finale

**Feature Branch**: `019-episode-one-show-finale`

**Created**: 2026-06-17

**Status**: Draft

**Input**: User description: "quero que o final do primeiro capitolo seja o show da banda que o harry kami e maggie e o peter estao criando então crie uma narrativa de convite para veronica se ela tive certa finidade com harry , kami ou maggie ela vai receber o convite e perto do capitolo vai aparece aopção do show e a musica que vai tocar vai ser a da olivia rodrigocoloca_eles_trocando_e_cantan finalizandoo video com que acabei de coloca entendeu?"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Show Invitation based on Affinity (Priority: P1)

As the story of Episode 1 draws to a close (specifically, after the school hours/dismissal events), the game checks Veronica's affinity (LOM) with the band members (Harry, Kami, and Maggie). If she has reached an affinity threshold of at least 25 LOM with any of them, she will receive a personalized invitation to their secret band show.

**Why this priority**: Crucial narrative branch that connects romance progression to the episode finale.

**Independent Test**: Advance Episode 1 dialogue with high LOM choices for Harry. Verify that after school hours, Harry offers Veronica a special ticket/invitation to their show.

**Acceptance Scenarios**:

1. **Given** Veronica has 25+ LOM with Harry, **When** school ends, **Then** Harry approaches Veronica and invites her to their band show.
2. **Given** Veronica has 25+ LOM with Kami, **When** school ends, **Then** Kami invites her to the band show.
3. **Given** Veronica has less than 25 LOM with all band members, **When** school ends, **Then** she goes home directly, bypassing the secret show scene.

---

### User Story 2 - Show Concert Choice & Audio Playback (Priority: P1)

When Veronica is invited, a choice box is presented allowing her to go to the concert or decline. If she goes, the scene changes to a music club/garage stage, and the audio player plays the file `/audio/Olivia Rodrigo - The Cure.mp3`.

**Why this priority**: Implements the key music audio asset feature and provides player choice agency.

**Independent Test**: Select "Ir ao Show" in the dialogue options. Verify that the background audio `/audio/Olivia Rodrigo - The Cure.mp3` starts playing immediately.

**Acceptance Scenarios**:

1. **Given** Veronica selects "Ir ao Show da Banda", **When** the concert scene starts, **Then** the audio `/audio/Olivia Rodrigo - The Cure.mp3` begins playing.

---

### User Story 3 - Onstage Band Performance & Sprite Transitions (Priority: P2)

During the concert, the band members (Harry, Kami, Maggie, Peter) are shown on stage. The sprites cycle on-screen dynamically (e.g. Harry singing/playing, Peter on guitar, Maggie on vocals/synths, Kami on stage) with lyrics displayed in the dialogue container, concluding with the standard Episode 1 finished overlay.

**Why this priority**: Provides the premium visual and storytelling payoff for the band show.

**Independent Test**: Follow the concert scene text. Verify that character sprites change position and update expressions dynamically to match the lyrics and performance.

**Acceptance Scenarios**:

1. **Given** the concert is playing, **When** Harry starts singing, **Then** Harry's sprite appears at center stage.
2. **Given** the song finishes, **When** the final dialogue resolves, **Then** the "Episódio Concluído" overlay is displayed.

---

### Edge Cases

- **Muted state**: If the player has muted the game, the Olivia Rodrigo song should not play (or plays silently) to respect their audio settings.
- **Switching tabs during show**: If the user leaves the game tab to the lobby during the show, the song should stop or pause.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The game story tree in `src/mock/storyData.ts` MUST include the show invitation branching nodes checking LOM score thresholds for Harry, Kami, and Maggie.
- **FR-002**: The story tree MUST include nodes representing the concert scene with lyrics from Olivia Rodrigo's song.
- **FR-003**: The audio player in `useGameStore.ts` or a new React hook/element MUST play `/audio/Olivia Rodrigo - The Cure.mp3` when the show scene is active.
- **FR-004**: The show scene MUST update character sprites (`harry`, `kami`, `maggie`, `peter`) dynamically across position fields (`centro`, `esquerda`, `direita`) to represent them playing and singing together.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Receiving the invitation is correctly gated by `LOM >= 25` with either Harry, Kami, or Maggie.
- **SC-002**: Selecting "Ir ao Show" plays the Olivia Rodrigo audio file with no console errors.
- **SC-003**: Sprites alternate correctly during the show to simulate a live band performance.

## Assumptions

- **A-001**: The audio file is located at `public/audio/Olivia Rodrigo - The Cure.mp3` and can be loaded via a standard HTML5 Audio element.
