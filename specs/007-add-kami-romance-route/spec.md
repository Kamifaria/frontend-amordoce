# Feature Specification: Kami Romance Route

**Feature Branch**: `007-add-kami-romance-route`

**Created**: 2026-06-10

**Status**: Approved

**Input**: User description: "essa é a kami implementa ela na historia tbm tanto ela como a maggie pode se torna casais"

## User Scenarios & Testing

### User Story 1 - Meeting Kami & Friendship Progression (Priority: P1)
The player can meet Kami in the school Patio or hallway, talk to her, and increase/decrease relationship affinity. Kami starts with low affinity, and dialogue choices are ambiguous.

**Why this priority**: Essential to introduce the new character and verify her standard friendship path.

**Independent Test**: Meet Kami in the courtyard/patio and verify dialogues load, and choice updates affect her affinity correctly.

---

### User Story 2 - Love Tier & Date Invites with Kami (Priority: P1)
When the player crosses 50 affinity points with Kami, the relationship transitions to the Love Tier. Phone calls to Kami reflect this status, and she will invite the player on a date.

**Why this priority**: Core romance feature requested by the user.

**Independent Test**: Raise Kami's affinity above 50, call her on the phone, and verify that she delivers her Love Tier dialogue and invitation.

## Requirements

- **FR-001**: System MUST add Kami as a romanceable character in the store with starting affinity 0.
- **FR-002**: System MUST add Kami to contacts list in the phone UI with a dark custom gradient.
- **FR-003**: System MUST support Kami's 5 expression sprites (neutral, blushing, angry, sad, sly).
- **FR-004**: System MUST add story nodes in `storyData.ts` introducing Kami in the Patio and corridors.
- **FR-005**: System MUST branch phone calls and call logs for Kami based on her relationship tier.

## Success Criteria

- **SC-001**: Kami's expression sprites render correctly inside the Game screen with zero lag.
- **SC-002**: Love tier call invitation triggers successfully when affinity is >= 50.
