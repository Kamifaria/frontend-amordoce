# Walkthrough: Mini-Map Navigation & Advanced Romance Routes

We have implemented the Navigation, Relationship Tiers, Difficult Crushes, and event CGs features.

## 🛠️ Changes Implemented

### 1. Types & State Management
- **Types added** in [types.ts](file:///c:/Users/Kamila%20Faria/Desktop/Amor%20doce%20da%20veronica/frontend-amordoce/src/shared/types.ts):
  - `MapLocation`, `CGIllustration`
  - Extended `DialogueNode` with `nextLove`, `nextLoveThreshold`, and `cgUrl` for dynamic branching and image overlays.
- **Zustand Store updated** in [useGameStore.ts](file:///c:/Users/Kamila%20Faria/Desktop/Amor%20doce%20da%20veronica/frontend-amordoce/src/store/useGameStore.ts):
  - Track `currentLocationId` and `unlockedCGs`.
  - Implemented `changeLocation` and `unlockCG` actions.
  - Implemented custom difficulty rules in `changeAffinity` (50% positive gain reduction for `castiel` and `lysandre`).
  - Added nextLove threshold checking in `nextNode` to branch stories dynamically when affinity is high.

### 2. User Interface Components
- **Map Navigation** in [MapOverlay.tsx](file:///c:/Users/Kamila%20Faria/Desktop/Amor%20doce%20da%20veronica/frontend-amordoce/src/components/game/MapOverlay.tsx):
  - Interactive modal layout displaying "Escola" (School) and "Pátio" (Patio) with custom badges showing the player's current location.
- **CG Presentation** in [CGOverlay.tsx](file:///c:/Users/Kamila%20Faria/Desktop/Amor%20doce%20da%20veronica/frontend-amordoce/src/components/game/CGOverlay.tsx):
  - Full-screen premium visual presentation of illustrations with glow effects, automatically calling `unlockCG` upon trigger.
- **Phone UI Tiers** in [PhoneOverlay.tsx](file:///c:/Users/Kamila%20Faria/Desktop/Amor%20doce%20da%20veronica/frontend-amordoce/src/components/game/PhoneOverlay.tsx):
  - Calls branch based on affinity score, and Love Tier calls are adorned with animated hearts and romantic status tags.
- **Game UI Integration** in [GameScreen.tsx](file:///c:/Users/Kamila%20Faria/Desktop/Amor%20doce%20da%20veronica/frontend-amordoce/src/components/game/GameScreen.tsx):
  - Integrated Map button and MapOverlay trigger.
  - Intercepts and displays active CG illustrations via CGOverlay when a node has a `cgUrl` property.

### 3. Story Adaptation
- **Dialogue Script updated** in [storyData.ts](file:///c:/Users/Kamila%20Faria/Desktop/Amor%20doce%20da%20veronica/frontend-amordoce/src/mock/storyData.ts):
  - Configured Maggie's route to use her 4 specific expressions (`neutral`, `blushing`, `sly`, `angry`) mapped dynamically in [SpriteCharacter.tsx](file:///c:/Users/Kamila%20Faria/Desktop/Amor%20doce%20da%20veronica/frontend-amordoce/src/components/game/SpriteCharacter.tsx).
  - Wrote ambiguous choices for the confrontation in the hallway, Castiel's courtyard meeting, and Maggie's art club.
  - Added CG event trigger nodes for the hallway fight, patio introduction, and Maggie's painting.

## 🧪 Validation & Verification
- Compile and type safety check: Verified successful with no compiler warnings or type mismatches.
- Manual test plans are documented in [quickstart.md](file:///c:/Users/Kamila%20Faria/Desktop/Amor%20doce%20da%20veronica/frontend-amordoce/specs/006-minimap-romance-adaptation/quickstart.md) for local validation.
