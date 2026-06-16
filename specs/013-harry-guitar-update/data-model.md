# Data Model: Harry's Guitar Minigame Update

## Entities

### `Chord` (Existing, to be updated)
- `id`: string
- `x`: number (percentage 10-90) -> *Will be repurposed for string/fret position if needed*
- `y`: number (percentage 20-80) -> *Will map to one of the 4-6 horizontal strings*
- `label`: string (e.g. 'C', 'G', etc.)
- `stringIndex`: number (0-3 or 0-5) *NEW: Determines which horizontal string the note is on*

### `StringState` (New)
- `isVibrating`: boolean (triggers Framer Motion animation)

### State (in `GuitarMinigame`)
- `score`: number
- `timeLeft`: number
- `gameState`: 'playing' | 'finished'
- `activeChords`: `Chord[]`
- `activeTrembles`: `Record<number, boolean>` *NEW: To track which strings are currently trembling*
