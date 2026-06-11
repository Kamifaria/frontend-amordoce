# Research: Story Exploration & Pacing

This document details the architectural decisions and research findings for the story exploration and pacing state machine.

## Decision: Story Stage State Machine

We need a way to progress the game state from linear introduction to open school exploration, and then to date scenes (e.g. Cinema).

- **Selected Approach**: Centralized `storyStage` field in Zustand store.
- **Rationale**: Keeps the state easily accessible by components (`MapOverlay`, `GameScreen`, `PhoneOverlay`) and allows simple serializable persistence.
- **Alternatives Considered**: 
  - *Decentralized conditional logic based on dialogue node IDs*: Hard to maintain and debug as nodes scale. Rejected.

## Decision: Dynamic Location & Character Registry

- **Selected Approach**: Map locations and character presence dynamically filtered based on `storyStage`.
- **Rationale**: Simplifies checking which character is where, avoiding manually hardcoding lists in UI files.
- **Alternatives Considered**:
  - *Hardcoding locations inside MapOverlay*: Hard to scale when adding new chapters. Rejected.

## Decision: Action Points (PA) Pacing

- **Selected Approach**: Standard deduction of PA per major dialogue choice and location change.
- **Rationale**: Matches the original game mechanics and limits user speed run potential.
- **Alternatives Considered**:
  - *Free navigation*: Negates game strategy and pacing. Rejected.
