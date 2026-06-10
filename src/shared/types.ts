export interface Choice {
  text: string;
  nextNodeId: string;
  costPA: number;
  affinityChange?: {
    characterId: string;
    amount: number;
  };
  focusedCharacter?: string;
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
  nextLove?: string;
  nextLoveThreshold?: number;
  cgUrl?: string;
  triggerChatCharacterId?: string;
  triggerChatText?: string;
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

export interface ChatMessage {
  id: string;
  sender: 'player' | string; // 'player' or characterId
  text: string;
  timestamp: string;
  choices?: {
    text: string;
    nextMessageId: string;
    affinityChange?: {
      characterId: string;
      amount: number;
    };
  }[];
  nextMessageId?: string;
}

export interface ChatThread {
  characterId: string;
  characterName: string;
  avatarColor: string;
  messages: ChatMessage[];
  unread: boolean;
  activeNodeId?: string;
}

export interface MapLocation {
  id: 'school' | 'patio';
  name: string;
  backgroundUrl: string;
  entryNodeId: string;
  residentCharacters: string[];
}

export interface CGIllustration {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
}


