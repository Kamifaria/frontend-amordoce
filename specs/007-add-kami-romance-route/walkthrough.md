# Walkthrough: Add Kami Romance Route

We have successfully integrated the new character **Kami** as a full romanceable route option along with Maggie.

## 🛠️ Changes Implemented

### 1. State Management & Chats
- **Zustand Store updated** in [useGameStore.ts](file:///c:/Users/Kamila%20Faria/Desktop/Amor%20doce%20da%20veronica/frontend-amordoce/src/store/useGameStore.ts):
  - Added `kami: 0` to starting affinities.
  - Added an initial welcome chat thread for Kami inside SweetChat with unique options for the player.
  - Implemented Kami's specific chat choices auto-reply handlers.

### 2. Character Sprites & Expressions
- **Dynamic Sprite Resolver updated** in [SpriteCharacter.tsx](file:///c:/Users/Kamila%20Faria/Desktop/Amor%20doce%20da%20veronica/frontend-amordoce/src/components/game/SpriteCharacter.tsx):
  - Added `kami` to target character list.
  - Mapped individual expression sprites dynamically:
    - `/images/sprites/kami_neutral.png` (neutral)
    - `/images/sprites/kami_blushing.png` (blushing/smiling)
    - `/images/sprites/kami_angry.png` (angry)
    - `/images/sprites/kami_sad.png` (crying)
    - `/images/sprites/kami_sly.png` (smug)

### 3. Phone Interface & Guides
- **Phone UI updated** in [PhoneOverlay.tsx](file:///c:/Users/Kamila%20Faria/Desktop/Amor%20doce%20da%20veronica/frontend-amordoce/src/components/game/PhoneOverlay.tsx):
  - Added Kami to the contacts list using a dark gradient (`from-purple-900 via-indigo-950 to-black`) and `'K'` initial.
  - Added a custom guide tip for Kami (`kami_likes`).
  - Added Call Dialogue variants for Kami's low, medium, and high affinity levels.

### 4. Story Dialogues
- **Dialogue Script updated** in [storyData.ts](file:///c:/Users/Kamila%20Faria/Desktop/Amor%20doce%20da%20veronica/frontend-amordoce/src/mock/storyData.ts):
  - Modified the Pátio search node to present a choice between Castiel and Kami.
  - Wrote a new conversation path introducing Kami, with choices that affect relationship affinity.
  - Added Kami's chat nodes for the end of the day.

## 🧪 Verification
- Compilation type safety verification: Passed successfully via `npx tsc --noEmit`.
