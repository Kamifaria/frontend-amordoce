import { create } from 'zustand';
import { Choice, DialogueNode } from '../shared/types';

interface GameState {
  currentNodeId: string;
  playerPA: number;
  playerGold: number;
  currentSpeaker: string;
  currentText: string;
  backgroundUrl: string;
  choices: Choice[] | undefined;
  storyTree: Record<string, DialogueNode>;
  
  // Actions
  initStory: (story: Record<string, DialogueNode>, startNodeId: string, initialPA?: number, initialGold?: number) => void;
  nextNode: () => void;
  selectChoice: (choice: Choice) => void;
  addPA: (amount: number) => void;
  addGold: (amount: number) => void;
}

export const useGameStore = create<GameState>((set) => ({
  currentNodeId: '',
  playerPA: 100, // default start PA
  playerGold: 50,  // default start Gold
  currentSpeaker: '',
  currentText: '',
  backgroundUrl: '',
  choices: undefined,
  storyTree: {},

  initStory: (story, startNodeId, initialPA = 100, initialGold = 50) => {
    const startNode = story[startNodeId];
    if (!startNode) return;
    
    set({
      storyTree: story,
      currentNodeId: startNodeId,
      playerPA: initialPA,
      playerGold: initialGold,
      currentSpeaker: startNode.characterName,
      currentText: startNode.text,
      backgroundUrl: startNode.backgroundUrl,
      choices: startNode.choices,
    });
  },

  nextNode: () => set((state) => {
    const currentNode = state.storyTree[state.currentNodeId];
    if (!currentNode || currentNode.choices || !currentNode.next) return {};

    const nextNodeId = currentNode.next;
    const nextNode = state.storyTree[nextNodeId];
    if (!nextNode) return {};

    return {
      currentNodeId: nextNodeId,
      currentSpeaker: nextNode.characterName,
      currentText: nextNode.text,
      backgroundUrl: nextNode.backgroundUrl,
      choices: nextNode.choices,
    };
  }),

  selectChoice: (choice) => set((state) => {
    if (state.playerPA < choice.costPA) {
      // In a real application, we might set a notification or alert.
      // We will handle this state-side by not transitioning.
      return {};
    }

    const nextNode = state.storyTree[choice.nextNodeId];
    if (!nextNode) return {};

    return {
      playerPA: state.playerPA - choice.costPA,
      currentNodeId: choice.nextNodeId,
      currentSpeaker: nextNode.characterName,
      currentText: nextNode.text,
      backgroundUrl: nextNode.backgroundUrl,
      choices: nextNode.choices,
    };
  }),

  addPA: (amount) => set((state) => ({ playerPA: state.playerPA + amount })),
  addGold: (amount) => set((state) => ({ playerGold: state.playerGold + amount })),
}));
