# Research Notes: Mini-Map Navigation & Advanced Romance Routes

## 1. Designated Difficult-to-Conquer Characters
- **Decision**: Castiel and Lysandre are selected as the primary "difficult-to-conquer" characters.
- **Rationale**: In the original lore, Castiel is sarcastic and quick to react negatively to submissive or overly-direct flirting, while Lysandre is reserved and easily put off by intrusion of privacy or excessive teasing. This makes them perfect candidates for lower base affinity gains (+5 or +10 instead of +15/+20) and stricter choice paths.
- **Alternatives Considered**: Making Maggie difficult. However, Maggie is a new, bubbly character who fits better as an accessible, friendly route for beginners, contrastive to the male leads.

## 2. Unlocking and Displaying CG Scenes
- **Decision**: We will support 3 CG scenes:
  1. **Castiel & Nathaniel Hallway Fight**: Unlocked when intervening or observing their confrontation in the hallway.
  2. **Maggie's Dynamic Painting**: Unlocked when visiting Maggie in the Art Room and choosing to help paint the canvas.
  3. **Patio Group Introduction**: Unlocked when accessing the Patio for the first time via the mini-map and meeting Armin and Alexy.
- **Rationale**: Providing a rich set of CGs satisfies the visual novel standard of reward progression.
- **Alternatives Considered**: 1 or 2 CGs. Rejected because the user specifically requested examples like Castiel/Nathaniel fighting and Maggie, and going to the Patio needs a strong visual hook.

## 3. Mini-Map Navigation Architecture
- **Decision**: The mini-map will be a modal overlay accessible in the gameplay screen during free-roaming nodes (nodes where `choices` are location-based).
- **Rationale**: Keeping the map as a overlay preserves the centered 16:9 viewport of the game screen and fits within the Component Isolation principle of the Constitution.
- **Implementation**: Clicking a map node dispatches a location-change action to the Zustand store, resetting the backdrop, loading the location's entry node, and checking for random student encounter probabilities.
