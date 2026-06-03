# Data Model: Game Interface for Amor Doce Clone

## TypeScript Typings (shared/types.ts)

```typescript
export interface Choice {
  text: string;
  nextNodeId: string;
  costPA: number;
}

export interface DialogueNode {
  id: string;
  speaker: string;
  expression: string; // e.g., 'sorrindo', 'bravo', 'triste', 'neutro'
  characterName: string; // e.g., 'Castiel', 'Nathaniel', 'Diretora', 'Narrador'
  backgroundUrl: string;
  text: string;
  choices?: Choice[];
  next?: string;
}
```

## Zustand Game Store Schema (store/useGameStore.ts)

### State
- `currentNodeId`: `string` - ID of the active dialogue node.
- `playerPA`: `number` - Current Action Points of the player.
- `playerGold`: `number` - Current Gold of the player.
- `currentSpeaker`: `string` - Name of the speaker (e.g., `'Castiel'`).
- `currentText`: `string` - The current narrative text.
- `backgroundUrl`: `string` - URL of the current scene's background.
- `choices`: `Choice[] | undefined` - Current set of branching options.
- `storyTree`: `Record<string, DialogueNode>` - The complete dialogue database loaded into memory.

### Actions
- `initStory(story: Record<string, DialogueNode>, startNodeId: string)`: Loads the dialogue tree and initializes the state.
- `nextNode()`: Advances to the next node automatically when the user clicks the screen (if no choices exist and `next` is defined).
- `selectChoice(choice: Choice)`: Processes a choice, deducts PA, and transitions to the next node.
- `addPA(amount: number)`: Grants additional PA.
- `addGold(amount: number)`: Grants additional gold.

### State Transitions (Pseudocode)

```typescript
const nextNode = () => {
  const current = state.storyTree[state.currentNodeId];
  if (current && current.next && !current.choices) {
    const targetNode = state.storyTree[current.next];
    if (targetNode) {
      set({
        currentNodeId: current.next,
        currentSpeaker: targetNode.characterName,
        currentText: targetNode.text,
        backgroundUrl: targetNode.backgroundUrl,
        choices: targetNode.choices
      });
    }
  }
};

const selectChoice = (choice: Choice) => {
  if (state.playerPA < choice.costPA) {
    // Dispatch insufficient PA notification
    return;
  }
  const nextNodeId = choice.nextNodeId;
  const targetNode = state.storyTree[nextNodeId];
  if (targetNode) {
    set({
      currentNodeId: nextNodeId,
      playerPA: state.playerPA - choice.costPA,
      currentSpeaker: targetNode.characterName,
      currentText: targetNode.text,
      backgroundUrl: targetNode.backgroundUrl,
      choices: targetNode.choices
    });
  }
};
```
