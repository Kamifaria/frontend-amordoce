# Research: Harry's Guitar Minigame Update

## 1. Music Duration Reduction
**Decision**: Reduce `SONG_DURATION` in `GuitarMinigame.tsx` from 90 seconds to 30 seconds.
**Rationale**: 90 seconds is too long for a quick minigame, pacing feels dragged. 30 seconds is a standard sweet spot for visual novel minigames.
**Alternatives considered**: Dynamic duration based on score (rejected as the song needs a fixed playtime or specific crop).

## 2. Guitar Strings UI in Dialogue Area
**Decision**: Redesign `GuitarMinigame` to render visually as a set of horizontal lines (guitar strings) situated where the dialogue box usually is (bottom area).
**Rationale**: Meets user requirement of replacing dialogue space with guitar strings.
**Alternatives considered**: An overlay on top of the character sprite. (Rejected, user specifically mentioned "where the dialogue is").

## 3. Rhythm Notes & String Tremble Animation
**Decision**: 
- Render 4-6 horizontal strings using standard CSS borders or divs.
- Rhythm notes (chords) will travel along these strings or spawn on them.
- When a note is pressed, use Framer Motion to apply a brief vibration/tremble animation (e.g. `y: [0, -5, 5, -2, 2, 0]`) on the specific string div.
**Rationale**: Framer Motion is already used and provides simple `animate` properties for spring physics and keyframes, perfect for a vibrating string effect.
**Alternatives considered**: CSS pure keyframes (rejected because Framer Motion handles React state and animation lifecycles much cleaner).
