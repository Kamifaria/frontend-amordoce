# Data Model: Story Exploration & Pacing

This document defines the data structures and TypeScript interfaces for the story progression and exploration systems.

## 1. Type Schema Extensions (`src/shared/types.ts`)

We will add definitions for narrative stages and location data structures.

```typescript
export type StoryStage = 'INTRO' | 'FREE_EXPLORE' | 'MYSTERY_RESOLVED' | 'DATE_CINEMA';

export interface LocationInfo {
  id: string;
  name: string;
  backgroundUrl: string;
  isLocked: boolean;
  lockHint?: string;
}

export interface GameState {
  storyStage: StoryStage;
  currentLocationId: string;
  cluesFound: string[];
  setStoryStage: (stage: StoryStage) => void;
  changeLocation: (locationId: string) => void;
  collectClue: (clueId: string) => void;
}
```

## 2. Location Registry Mapping

Locations available in Episode 1:

| Location ID | Name | Background URL | Initial Status | Unlock Requirement |
|-------------|------|----------------|----------------|--------------------|
| `corredor` | Corredor Principal | `corredor` | Unlocked | None (Intro) |
| `sala_de_aula` | Sala de Aula | `sala_de_aula` | Unlocked | None (Intro) |
| `patio` | Pátio | `courtyard` | Locked | Complete Intro |
| `quadra` | Quadra de Esportes | `quadra` | Locked | Complete Intro |
| `galpao` | Galpão | `art_room` | Locked | Complete Intro |
| `cinema` | Cinema | `cinema` | Locked | Stage = `DATE_CINEMA` |

## 3. Character Placement Map per Stage

To guide the player, characters reside in specific locations during `FREE_EXPLORE`:

- **Nathaniel**: `sala_de_aula` (Investigating test answers)
- **Castiel**: `patio` (Relaxing under the tree)
- **Harry**: `patio` (Tuning guitar)
- **Maggie**: `galpao` (Painting new banner)
- **Lysandre**: `quadra` (Writing poetry)
- **Kami**: `patio` (Reading a book)
- **Remi**: `sala_de_aula` (Reading cards)
