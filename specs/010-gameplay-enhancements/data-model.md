# Data Model Schema: Gameplay Enhancements Bundle

## TypeScript Interfaces

```typescript
export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: number;
  icon: string;
}

export interface DailyQuest {
  id: string;
  description: string;
  target: number;
  current: number;
  completed: boolean;
  rewardType: 'PA' | 'Gold';
  rewardAmount: number;
}

export interface SweetGramPost {
  id: string;
  characterId: string;
  characterName: string;
  avatarColor: string;
  imageUrl: string;
  caption: string;
  likes: number;
  hasLiked: boolean;
  comments: {
    id: string;
    sender: string;
    text: string;
  }[];
  interactiveCommentOption?: {
    text: string;
    affinityChange: number;
  };
}

export interface ScenarioItem {
  id: string;
  name: string;
  left: string; // Ex: '45%'
  top: string;  // Ex: '70%'
  icon: string; // Ex: '🔑'
  rewardType: 'PA' | 'Gold' | 'Clue';
  rewardAmount?: number;
  clueId?: string;
}
```
