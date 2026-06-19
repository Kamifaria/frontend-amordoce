import { StateCreator } from 'zustand';
import { 
  Choice, 
  DialogueNode, 
  StoryStage, 
  EquippedOutfit, 
  Achievement, 
  DailyQuest, 
  SweetGramPost, 
  ScenarioItem, 
  ChatThread 
} from '../shared/types';

export interface PlayerSlice {
  playerPA: number;
  playerGold: number;
  affinities: Record<string, number>;
  focusedCharacter: string | null;
  metCharacters: string[];
  equippedOutfit: EquippedOutfit;
  unlockedItems: string[];
  collectedItems: string[];
  achievements: Achievement[];
  dailyQuests: DailyQuest[];
  achievementQueue: Achievement[];

  addPA: (amount: number) => void;
  addGold: (amount: number) => void;
  selectRomanceFocus: (characterId: string | null) => void;
  changeAffinity: (characterId: string, amount: number) => void;
  updateOutfit: (outfit: EquippedOutfit) => void;
  buyOutfit: (itemId: string, cost: number) => boolean;
  unlockAchievement: (id: string) => void;
  dismissAchievement: () => void;
  incrementQuestProgress: (id: string, amount: number) => void;
  claimQuestReward: (id: string) => void;
  drawTarot: (rewardType: 'PA' | 'Gold', rewardAmount: number) => void;
  lastDailyDraw: number | null;
}

export interface StorySlice {
  currentNodeId: string;
  currentSpeaker: string;
  currentText: string;
  backgroundUrl: string;
  choices: Choice[] | undefined;
  storyTree: Record<string, DialogueNode>;
  storyStage: StoryStage;
  cluesFound: string[];
  currentLocationId: string;
  currentView: 'lobby' | 'episode';
  unlockedEpisodes: number[];
  activeEpisodeId: number;
  unlockedCGs: string[];
  savedPaintings: string[];
  environment: {
    timeOfDay: 'morning' | 'afternoon' | 'night';
    weather: 'clear' | 'rain' | 'snow';
  };

  initStory: (story: Record<string, DialogueNode>, startNodeId: string, initialPA?: number, initialGold?: number) => void;
  nextNode: () => void;
  selectChoice: (choice: Choice) => void;
  fetchCurrentGameState: () => Promise<void>;
  advance: (choiceIndex?: number) => Promise<void>;
  setStoryStage: (stage: StoryStage) => void;
  collectClue: (clueId: string) => void;
  changeLocation: (locationId: string) => void;
  setView: (view: 'lobby' | 'episode') => void;
  selectEpisode: (episodeId: number) => void;
  unlockEpisode: (episodeId: number) => void;
  unlockCG: (cgId: string) => void;
  collectScenarioItem: (item: ScenarioItem) => void;
  savePainting: (dataUrl: string) => void;
  setEnvironment: (env: Partial<StorySlice['environment']>) => void;
}

export interface PhoneSlice {
  isPhoneOpen: boolean;
  unlockedTips: string[];
  activeCall: {
    characterId: string;
    direction: 'incoming' | 'outgoing';
    status: 'ringing' | 'connected' | 'ended';
    dialogueNodeId: string;
  } | null;
  chatThreads: ChatThread[];
  sweetGramPosts: SweetGramPost[];

  togglePhone: () => void;
  unlockTip: (tipId: string) => void;
  startCall: (characterId: string, customNodeId?: string) => void;
  answerCall: () => void;
  endCall: () => void;
  selectChatChoice: (characterId: string, choiceIndex: number) => void;
  sendChatMessage: (characterId: string, text: string) => void;
  triggerIncomingText: (characterId: string, initialText: string) => void;
  tryRandomMessage: () => void;
  likePost: (postId: string) => void;
  commentOnPost: (postId: string, commentIndex: number) => void;
}

export interface MinigameSlice {
  activeMinigame: string | null;
  unlockedSheetMusic: string[];

  startMinigame: (minigameId: string) => void;
  endMinigame: (score: number) => void;
  unlockSheetMusic: (id: string) => void;
}

export interface SystemSlice {
  isLoading: boolean;
  errorMsg: string | null;
  isMuted: boolean;
  affinityNotifications: { characterId: string; amount: number; id: string }[];

  toggleMute: () => void;
  playSound: (type: 'tick' | 'heart' | 'choice' | 'ring' | 'connected' | 'click') => void;
  removeAffinityNotification: (id: string) => void;
  clearError: () => void;
}

export type GameState = PlayerSlice & StorySlice & PhoneSlice & MinigameSlice & SystemSlice;

export type GameStateCreator<T> = StateCreator<GameState, [], [], T>;
