# UI Component Contracts: Game Interface

## 1. GameContainer Component Contract
```typescript
interface GameContainerProps {
  children: React.ReactNode;
}
// Parent container centering elements and ensuring a 16:9 aspect-video canvas scaling
```

## 2. Cenario Component Contract
```typescript
interface CenarioProps {
  backgroundUrl: string;
}
// Render the current scene background with fading AnimatePresence transitions
```

## 3. SpriteCharacter Component Contract
```typescript
interface SpriteCharacterProps {
  characterName: string;
  expression: string;
  position: 'esquerda' | 'centro' | 'direita';
}
// Animates character entrance, slides, and changes in facial expression using Framer Motion
```

## 4. DialogueBox Component Contract
```typescript
interface DialogueBoxProps {
  speakerName: string;
  text: string;
  onAdvance: () => void; // Advances dialogue once completed
}
// Displays speaker name badge and typewriter text, allowing instant skips on viewport click
```

## 5. ChoiceOverlay Component Contract
```typescript
interface ChoiceOverlayProps {
  choices: Choice[];
  onSelectChoice: (choice: Choice) => void;
}
// Disables background clicks and forces user to select from current branching options
```
