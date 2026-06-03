# Quickstart Guide: Game Interface for Amor Doce Clone

## Component Hierarchy & Directory Structure

To implement the game screen, create the following directory structure inside the `frontend-amordoce` root directory:

```text
src/
├── shared/
│   └── types.ts             # Contains TypeScript interfaces
├── store/
│   └── useGameStore.ts      # Zustand state store
├── components/
│   └── game/
│       ├── GameContainer.tsx  # Layout wrapper & scaling behavior
│       ├── Cenario.tsx        # Dynamic background component with crossfade
│       ├── SpriteCharacter.tsx# Dynamic sprite component with Framer Motion animations
│       ├── DialogueBox.tsx    # Text box with badge + typewriter animation
│       └── ChoiceOverlay.tsx  # Choice prompt modal overlay
└── app/
    ├── page.tsx             # Next.js SPA index entry point
    └── layout.tsx           # Global HTML layout
```

## Running the Development Server

1. Install project dependencies (including Zustand, Framer Motion, and Tailwind CSS):
   ```bash
   npm install zustand framer-motion lucide-react
   ```
2. Start the dev environment:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000` to view the game screen.

## Mock Data Setup

Ensure you have a sample dialogue flow to test transitions. Save this JSON structure inside `src/mock/storyData.ts` to test the dialogue paths:

```typescript
import { DialogueNode } from '@/shared/types';

export const mockStory: Record<string, DialogueNode> = {
  'start': {
    id: 'start',
    speaker: 'Castiel',
    expression: 'neutro',
    characterName: 'Castiel',
    backgroundUrl: 'https://images.unsplash.com/photo-1541829019-2188d558b1c7?w=1200',
    text: 'Ei, novata. O que você está fazendo aqui no corredor?',
    next: 'choice-node'
  },
  'choice-node': {
    id: 'choice-node',
    speaker: 'Castiel',
    expression: 'sorrindo',
    characterName: 'Castiel',
    backgroundUrl: 'https://images.unsplash.com/photo-1541829019-2188d558b1c7?w=1200',
    text: 'Precisa de alguma coisa ou está apenas perdida?',
    choices: [
      { text: 'Estou um pouco perdida, na verdade...', nextNodeId: 'lost-path', costPA: 2 },
      { text: 'Não te interessa!', nextNodeId: 'angry-path', costPA: 2 }
    ]
  },
  'lost-path': {
    id: 'lost-path',
    speaker: 'Castiel',
    expression: 'provocando',
    characterName: 'Castiel',
    backgroundUrl: 'https://images.unsplash.com/photo-1541829019-2188d558b1c7?w=1200',
    text: 'Hmph. Típico. Vem, eu te mostro onde fica a secretaria.',
    next: 'end'
  },
  'angry-path': {
    id: 'angry-path',
    speaker: 'Castiel',
    expression: 'bravo',
    characterName: 'Castiel',
    backgroundUrl: 'https://images.unsplash.com/photo-1541829019-2188d558b1c7?w=1200',
    text: 'Nossa, que humor irritante. Se vira sozinha então.',
    next: 'end'
  },
  'end': {
    id: 'end',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200',
    text: 'A conversa acabou e você segue seu caminho.'
  }
};
```
