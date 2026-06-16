# Quickstart: Minigames & CGs

To test the newly added minigames, start the local development server:
`npm run dev`

1. Proceed through the visual novel's first episode.
2. When confronted by Castiel and Nathaniel in the hallway, choose a dialogue option:
   - "Algumas regras..." -> Triggers **Castiel Escape Minigame**
   - "As regras do colégio..." -> Triggers **Nathaniel Swipe Minigame**
3. Proceed to the classroom and speak with Remi. Choose to accept the reading -> Triggers **Remi Tarot Minigame**.
4. Proceed to the courtyard and meet Lysandre. Offer to help him find his notes -> Triggers **Lysandre Memory Minigame**.

**How to add new minigames in the future**:
1. Create a `NewMinigame.tsx` inside `src/components/game/minigames/`.
2. Ensure it calls `endMinigame(score, affinity)` when finished.
3. Import it in `GameScreen.tsx` and map it to a key (e.g. `activeMinigame === 'new_game'`).
4. In `storyData.ts`, attach `minigame: 'new_game'` to any `Choice` or `DialogueNode`.
