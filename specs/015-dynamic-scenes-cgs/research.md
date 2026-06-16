# Research: Dynamic Scenes & CGs (015)

## Technical Context

**Feature Directory**: `specs/015-dynamic-scenes-cgs`
**Feature Branch**: `015-dynamic-scenes-cgs`
**Stack**: Next.js 16 + React 19 + TypeScript + Zustand + Framer Motion + Tailwind CSS

---

## Decision Log

### D-001: Background Removal Strategy
- **Decision**: Use `@imgly/background-removal-node` (already in `package.json`) via a local Node script (`scripts/remove-bgs.js`) to remove black backgrounds from all existing PNGs.
- **Rationale**: Zero external dependencies, runs locally, preserves original filenames.
- **Alternatives considered**: Manual Photoshop masking (too slow, 56 files); DALL-E re-generation (would change sprite style); CSS `mix-blend-mode` (only works in dark backgrounds, fragile).
- **Status**: ✅ COMPLETE — Script ran successfully on all 56 files.

### D-002: Multi-Character Rendering
- **Decision**: Extend `DialogueNode` with an optional `sprites: SpriteEntry[]` array. `GameScreen` iterates over `sprites` and renders one `SpriteCharacter` per entry, falling back to the legacy `characterName` field for backward compatibility.
- **Rationale**: Additive change—zero existing nodes break. Array-based approach scales to 3 or more characters trivially.
- **Alternatives considered**: Dedicated `leftCharacter` + `rightCharacter` fields (rigid, doesn't scale to 3); full scene graph (over-engineered for current needs).
- **Status**: ✅ IMPLEMENTED — `types.ts`, `GameScreen.tsx`, `SpriteCharacter.tsx` all updated.

### D-003: Outfit / Costume Variants
- **Decision**: Add optional `outfit?: string` prop to `SpriteCharacter`. `getSpriteUrl` checks for outfit-suffixed files (e.g. `castiel_gym.png`) before falling back to the default sprite.
- **Rationale**: Graceful degradation—if the asset doesn't exist yet, the default outfit is shown automatically.
- **Alternatives considered**: Separate costume system with sprite sheets (too complex for current scope).
- **Status**: ✅ IMPLEMENTED — Code ready; gym assets need creation for full activation.

### D-004: NPC-to-NPC Conversation Pattern
- **Decision**: Author NPC-only dialogue nodes using the new `sprites` array where both characters are listed, and set `characterName: 'Narrador'` so no voice attribution goes to Veronica. A subsequent `choices` node lets the player eavesdrop or interrupt.
- **Rationale**: Reuses the existing dialogue engine with zero new mechanics. Authorable directly in `storyData.ts`.
- **Alternatives considered**: Automatic random NPC event scheduler (needs a runtime event system, out of scope).

---

## Resolved NEEDS CLARIFICATION

All clarification questions from the planning phase were resolved via implementation decisions above. No unresolved items remain.

---

## Best Practices Applied

- **Constitution I (Component Isolation)**: `SpriteCharacter` remains stateless and prop-driven. ✅
- **Constitution II (Premium UI)**: Framer Motion `AnimatePresence` wraps each sprite for smooth entry/exit transitions. ✅
- **Constitution III (Type Safety)**: New `SpriteEntry` inline type in `DialogueNode`; `outfit` is `string | undefined` never `any`. ✅
- **Constitution IV (Centralized State)**: Sprites are derived from `activeNode` in the Zustand store slice; no new state atoms added. ✅
