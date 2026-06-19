# Data Model: veronica-piano

## Entities

### 1. SheetMusic (Global State)
Stored in the global game store (`useGameStore.ts`).

```typescript
export interface SheetMusic {
  id: string; // e.g., 'melody_secret', 'melody_veronica_theme'
  title: string;
  notes: string[]; // e.g., ['C4', 'E4', 'G4', 'C5']
  unlocked: boolean;
}
```

### 2. PianoKey (Component Data)
Static data defining the keyboard layout.

```typescript
export interface PianoKeyData {
  note: string; // 'C4', 'C#4', 'D4', etc.
  type: 'white' | 'black';
  keyboardBinding: string; // 'a', 'w', 's', 'e', etc.
  audioSrc: string; // Path to audio file
}
```
