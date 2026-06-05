export interface Choice {
  text: string;
  nextNodeId: string;
  costPA: number;
  affinityChange?: {
    characterId: string;
    amount: number;
  };
}

export interface DialogueNode {
  id: string;
  speaker: string;
  expression: string; // ex: 'sorrindo', 'bravo', 'triste', 'neutro', 'none'
  characterName: string; // ex: 'Castiel', 'Nathaniel', 'Diretora', 'Narrador'
  backgroundUrl: string;
  text: string;
  choices?: Choice[];
  next?: string;
}

export interface PhoneContact {
  characterId: string;
  name: string;
  affinityScore: number;
  avatarUrl: string;
  canCall: boolean;
  lastCalled?: string;
}

export interface PhoneCallLog {
  id: string;
  characterId: string;
  direction: 'outgoing' | 'incoming';
  timestamp: string;
  completed: boolean;
  dialogueNodeId?: string;
}

export interface DatingTip {
  tipId: string;
  title: string;
  content: string;
  unlockedAt: string;
}
