# Data Model Schema: Game Lobby and Episode Selection

## TypeScript Interfaces

```typescript
export interface Episode {
  id: number;
  title: string;
  description: string;
  coverImage: string;
  unlocked: boolean;
  completed: boolean;
}

export interface LobbyState {
  currentView: 'lobby' | 'episode';
  unlockedEpisodes: number[]; // Array de IDs de episódios desbloqueados
  lastDailyDraw: number | null; // Timestamp do último sorteio de cartas de tarô
  equippedOutfit: {
    hairstyle: string; // Ex: 'long-pink', 'short-brunette'
    top: string;       // Ex: 'school-uniform-top', 'casual-tshirt'
    bottom: string;    // Ex: 'skirt-pink', 'jeans-blue'
  };
}

export interface TarotCard {
  id: string;
  name: string;
  description: string;
  rewardType: 'PA' | 'Gold';
  rewardAmount: number;
  image: string;
}
```

## State Transitions & Game Flow

1. **Login Sucedido** -> Zustand carrega `LobbyState` inicial de localStorage / backend.
2. **Entrar no Jogo** -> Renderiza `LobbyContainer.tsx` padrão.
3. **Seleção de Episódio**:
   - Clicar em episódio disponível -> Muda `currentView` para `'episode'` e inicia o motor do jogo carregando o roteiro correspondente.
4. **Tiragem de Tarô**:
   - Selecionar carta -> Concede PA/Gold -> Define `lastDailyDraw` para `Date.now()`.
5. **Closet (Guarda-roupa)**:
   - Alterar roupas -> Atualiza `equippedOutfit` -> Salva em localStorage.
