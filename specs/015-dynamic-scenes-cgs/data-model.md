# Data Model: Dynamic Scenes & CGs (015)

## Modified Entities

### `DialogueNode` (modified)
**File**: `src/shared/types.ts`

```typescript
export interface DialogueNode {
  id: string;
  speaker: string;
  expression: string;
  characterName: string;        // Legacy single-character field (preserved for BC)
  sprites?: {                   // NEW — optional multi-character array
    name: string;               // Character key (e.g. 'Castiel')
    expression: string;         // Emotion key (e.g. 'bravo')
    position: 'esquerda' | 'centro' | 'direita';
    outfit?: string;            // Optional outfit variant key (e.g. 'gym')
  }[];
  backgroundUrl: string;
  text: string;
  choices?: Choice[];
  next?: string;
  nextLove?: string;
  nextLoveThreshold?: number;
  cgUrl?: string;
  triggerChatCharacterId?: string;
  triggerChatText?: string;
}
```

**Key rules**:
- If `sprites` is present, it takes priority over `characterName` for rendering.
- If `sprites` is absent, the engine falls back to the legacy `characterName` field.
- `position` controls CSS absolute positioning: `left-[2%]` / `left-1/2` / `right-[2%]`.

---

### `SpriteCharacter` component props (modified)
**File**: `src/components/game/SpriteCharacter.tsx`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `characterName` | `string` | — | Character key, must match `getSpriteUrl` switch |
| `expression` | `string` | `'neutro'` | Expression alias |
| `position` | `'esquerda' \| 'centro' \| 'direita'` | `'centro'` | On-screen placement |
| `outfit` | `string` | `'default'` | Costume variant key |

---

## Sprite Asset Naming Convention

The `getSpriteUrl` function uses the following naming pattern:

```
/images/sprites/{character}_{outfit}_{expression}.png  → outfit variant
/images/sprites/{character}_{expression}.png           → default outfit
/images/sprites/{character}.png                        → fallback
```

**Examples**:
- `castiel.png` — default neutral
- `castiel_bravo.png` — default angry
- `castiel_gym.png` — gym outfit neutral *(needs asset)*
- `castiel_gym_bravo.png` — gym outfit angry *(needs asset)*

---

## NPC Conversation Node Pattern

Standard template for an NPC-to-NPC dialogue scene:

```typescript
{
  id: 'npc-scene-start',
  speaker: 'Narrador',
  expression: 'none',
  characterName: 'Narrador',
  sprites: [
    { name: 'Castiel', expression: 'provocando', position: 'esquerda' },
    { name: 'Nathaniel', expression: 'bravo', position: 'direita' }
  ],
  backgroundUrl: 'patio',
  text: '[Narrador] Castiel e Nathaniel conversam acaloradamente perto das arquibancadas...',
  next: 'npc-scene-intervene'
},
{
  id: 'npc-scene-intervene',
  speaker: 'Narrador',
  expression: 'none',
  characterName: 'Narrador',
  backgroundUrl: 'patio',
  text: 'Você pode se aproximar e entrar na conversa. O que faz?',
  choices: [
    { text: 'Observar em silêncio', nextNodeId: '...', costPA: 0 },
    { text: 'Se aproximar', nextNodeId: '...', costPA: 5 }
  ]
}
```

---

## Background Removal Pipeline

**Script**: `scripts/remove-bgs.js`

```
Input:  public/images/sprites/*.png  (56 files)
Tool:   @imgly/background-removal-node  (file:// URL input)
Output: Same path, PNG with alpha channel, no black fill
Status: ✅ Complete — all 56 files processed successfully
```
