# Research: veronica-piano

## Decision 1: Audio Playback Method
- **Decision**: Use `HTMLAudioElement` with preloaded audio samples for piano notes. Native `Audio` object with `.cloneNode(true)` works well for polyphony.
- **Rationale**: Pre-recorded samples provide a much higher quality piano sound compared to raw Web Audio API oscillator synthesis. Cloning the audio node allows for overlapping notes (polyphony) which is a requirement.
- **Alternatives considered**: Web Audio API (AudioContext) with oscillators (rejected due to synthetic sound quality), Web Audio API with buffers (good, but slightly more complex to implement than simple Audio objects).

## Decision 2: Keyboard Event Handling
- **Decision**: Attach a global `keydown` and `keyup` event listener in a `useEffect` within the Piano component. Prevent default actions for bound keys to stop browser scrolling.
- **Rationale**: The user must be able to press keys to play notes. Global listener ensures focus issues don't prevent playing.
- **Alternatives considered**: `onKeyDown` on a specific div (requires the div to maintain focus, which can be annoying for users).

## Decision 3: State Management for Sheet Music and Easter Egg
- **Decision**: Extend `useGameStore` to track `unlockedSheetMusic` (array of IDs) and `currentPianoSequence` (array of recently played note strings).
- **Rationale**: Sheet music unlocks are part of the game's overall progression, so they belong in the global store. The sequence tracker can be local to the Piano component, but putting it in the store allows for easier easter egg validation.
- **Alternatives considered**: Local state only. Local state is fine for the sequence tracker, but not for `unlockedSheetMusic` which persists across room visits.
