# Phase 0: Research

## Touch Events vs Mouse Events for Canvas/React
- **Decision**: Use React's unified Pointer Events (`onPointerDown`, `onPointerMove`, `onPointerUp`) instead of traditional touch/mouse separate events.
- **Rationale**: Pointer events abstract both touch and mouse inputs seamlessly, preventing duplicate event firing and significantly reducing code complexity for mobile responsiveness.
- **Alternatives considered**: Separate `onTouchStart` and `onMouseDown` handlers (rejected due to complexity).

## Endless Runner Mechanic in React
- **Decision**: Use `setInterval` for the game loop with state updates containing a list of obstacle coordinates.
- **Rationale**: A simple top-to-bottom object falling logic is extremely lightweight. React state can handle 60fps for simple div translations.
- **Alternatives considered**: Canvas API (rejected due to overkill for a simple 3-lane dodger).

## Tinder-style Swipe
- **Decision**: Use `framer-motion`'s `drag="x"` and `onDragEnd` to calculate horizontal offsets.
- **Rationale**: It provides native-feeling physics and snapping out of the box without manual CSS transitions.
