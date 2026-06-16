# Data Model: Story CGs & Minigames

## CGAsset (Overlay configuration)
Passed indirectly via `activeCG` in GameScreen when a DialogueNode specifies `cgUrl`.
- `cgUrl`: string (path to the image)
- `cgId`: string

## Minigame Trigger (Choice extensions)
Extended `Choice` interface in `types.ts` already supports `minigame?: string`.
- Possible values added: `'memory'`, `'tarot'`, `'swipe'`, `'escape'`

## Minigame State
Each minigame manages its own isolated state using standard React `useState`.
At the end of the minigame, it must invoke `endMinigame(score, { characterId, amount })` from `useGameStore`.
