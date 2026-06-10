# Data Model: Mini-Map & Romance Routes

## 1. Game State Schema Additions (Zustand)

```typescript
interface GameState {
  // New navigation states
  currentLocationId: 'school' | 'patio';
  unlockedCGs: string[]; // List of CG IDs unlocked by the player
  
  // Actions
  changeLocation: (locationId: 'school' | 'patio') => void;
  unlockCG: (cgId: string) => void;
}
```

## 2. Entities & Interfaces

### MapLocation
Represents an explorable area of the school.
```typescript
interface MapLocation {
  id: 'school' | 'patio';
  name: string;
  backgroundUrl: string;
  entryNodeId: string;
  residentCharacters: string[]; // Character IDs who can be found here
}
```

### RelationshipTier
Represents a character's relationship level with the player.
- **Friendship Tier**: Affinity score < 50. Dialogues use formal, casual, or friendly greetings. Phone calls are conversational.
- **Love Tier**: Affinity score >= 50. Dialogues use affectionate greetings. Unlocks formal date invitations.

```typescript
type RelationshipTier = 'friendship' | 'love';
```

### CGIllustration
Represents an unlockable full-screen event CG.
```typescript
interface CGIllustration {
  id: string; // e.g., 'castiel_nathaniel_fight', 'maggie_painting', 'patio_encounter'
  title: string;
  imageUrl: string; // Path to public assets
  description: string;
}
```

## 3. Mock Story Tree Structure Adaptation (DialogueNode)
To support dynamic expression and CG triggers, the `DialogueNode` type is extended or leveraged:
- `cgUrl?: string` (optional full-screen CG overlay)
- `expression?: 'sly' | 'angry' | 'blushing' | 'neutral' | 'none'` (to support Maggie's 4 expressions)
