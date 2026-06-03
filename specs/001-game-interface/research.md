# Research Notes: Game Interface for Amor Doce Clone

## Technical Choices & Decisions

### 1. State Management: Zustand
- **Decision**: Use Zustand for global game state management.
- **Rationale**: 
  - Allows fine-grained selector-based subscription to state changes, avoiding unnecessary re-renders of heavy components (like the character sprite list or high-res background).
  - Minimal boilerplate compared to Redux, and more performant than standard React Context (which triggers full-tree re-renders on any value change).
  - Can be easily accessed outside of React components if we decide to integrate persistent local storage or keyboard event listeners in the future.
- **Alternatives Considered**: 
  - *React Context API*: Rejected because any change to background, PA, or dialogue triggers re-render for all consumers, causing stuttering during typewriter animation.
  - *Redux Toolkit*: Rejected due to excessive boilerplate for a relatively simple game loop.

### 2. Typewriter Dialog Animation & Skip Feature
- **Decision**: Implement a custom React hook (`useTypewriter`) combining a timer-based effect and a status ref.
- **Rationale**: 
  - To implement the "click to skip and show full text" behavior, we need instant toggle. A custom hook with `useRef` to track the full string and active typing timer allows us to clean up the timer immediately and update the displayed text to the complete string instantly on click.
- **Alternatives Considered**: 
  - *Framer Motion Text Animation*: Frame-by-frame character revealing is hard to implement with Framer Motion natively while supporting dynamic click-to-skip.
  - *Typed.js / Third-party libraries*: Adds unnecessary dependency footprint and limits fine-tuned game-loop synchronization.

### 3. Background Image Transitions
- **Decision**: Use Framer Motion's `<AnimatePresence>` wrapper with absolute positioning for background layers.
- **Rationale**: 
  - Permits rendering the incoming and outgoing background images simultaneously during the transition phase, enabling a smooth crossfade effect rather than a harsh jump cut.
- **Alternatives Considered**: 
  - *CSS transitions on a single background-image style*: CSS cannot animate between two separate image URLs on a single element smoothly; it will just swap the images and then transition the opacity of the container.

### 4. Component Layout & Aspect Ratio Box
- **Decision**: Centered wrapper with `max-w-5xl aspect-video w-full h-auto` layout inside a CSS Flexbox/Grid container.
- **Rationale**: 
  - Keeps the classic visual novel 16:9 screen composition intact. Using Tailwind's modern `aspect-video` class maintains consistency, and letterboxing handles wider or narrower viewports.
- **Alternatives Considered**: 
  - *Fluid Fullscreen Layout*: Visual novels rely on precise positioning of sprites relative to the background. Fluid layouts would cause characters to drift off-position relative to background elements.
