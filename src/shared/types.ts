export interface Choice {
  text: string;
  nextNodeId: string;
  costPA: number;
  affinityChange?: {
    characterId: string;
    amount: number;
  };
  affinityChanges?: {
    characterId: string;
    amount: number;
  }[];
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

export type StoryStage = 'INTRO' | 'FREE_EXPLORE' | 'MYSTERY_RESOLVED' | 'DATE_CINEMA';

export interface MapLocation {
  id: string; // e.g., 'school' | 'patio' | 'quadra' | 'galpao' | 'cinema'
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

export interface Episode {
  id: number;
  title: string;
  description: string;
  coverImage: string;
  unlocked: boolean;
  completed: boolean;
}

export interface EquippedOutfit {
  hairstyle: string;
  top: string;
  bottom: string;
}

export interface TarotCard {
  id: string;
  name: string;
  description: string;
  rewardType: 'PA' | 'Gold';
  rewardAmount: number;
  image: string;
}

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
  commentOptions?: {
    text: string;
    affinityChange: number;
  }[];
}

export interface ScenarioItem {
  id: string;
  name: string;
  left: string;
  top: string;
  icon: string;
  rewardType: 'PA' | 'Gold' | 'Clue';
  rewardAmount?: number;
  clueId?: string;
}
