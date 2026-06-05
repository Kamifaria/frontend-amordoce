import { create } from 'zustand';
import { Choice, DialogueNode } from '../shared/types';
import { mockStory } from '../mock/storyData';

interface GameState {
  currentNodeId: string;
  playerPA: number;
  playerGold: number;
  currentSpeaker: string;
  currentText: string;
  backgroundUrl: string;
  choices: Choice[] | undefined;
  storyTree: Record<string, DialogueNode>;
  
  // Async status states
  isLoading: boolean;
  errorMsg: string | null;
  
  // Romance states
  affinities: Record<string, number>; // characterId -> affinity score
  isPhoneOpen: boolean;
  unlockedTips: string[];
  activeCall: {
    characterId: string;
    direction: 'incoming' | 'outgoing';
    status: 'ringing' | 'connected' | 'ended';
    dialogueNodeId: string;
  } | null;
  
  // Actions
  initStory: (story: Record<string, DialogueNode>, startNodeId: string, initialPA?: number, initialGold?: number) => void;
  nextNode: () => void;
  selectChoice: (choice: Choice) => void;
  addPA: (amount: number) => void;
  addGold: (amount: number) => void;
  
  // Async Actions
  fetchCurrentGameState: () => Promise<void>;
  advance: (choiceIndex?: number) => Promise<void>;
  clearError: () => void;

  // Phone Actions
  togglePhone: () => void;
  changeAffinity: (characterId: string, amount: number) => void;
  unlockTip: (tipId: string) => void;
  startCall: (characterId: string, customNodeId?: string) => void;
  answerCall: () => void;
  endCall: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  currentNodeId: '',
  playerPA: 100,
  playerGold: 50,
  currentSpeaker: '',
  currentText: '',
  backgroundUrl: '',
  choices: undefined,
  storyTree: {},
  isLoading: false,
  errorMsg: null,
  
  affinities: {
    castiel: 0,
    lysandre: 0,
    nathaniel: 0,
    remi: 0,
    harry: 0,
    maggie: 0,
    armin: 0,
    alexy: 0,
  },
  isPhoneOpen: false,
  unlockedTips: ['welcome_tip'],
  activeCall: null,

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

  fetchCurrentGameState: async () => {
    set({ isLoading: true, errorMsg: null });
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    try {
      const response = await fetch('http://localhost:4000/player/progress', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
      });

      if (!response.ok) {
        throw new Error('Falha ao carregar estado do servidor');
      }

      const data = await response.json();
      
      // Map backend affinities to frontend format
      const backendAffinities = data.affinities || [];
      const mappedAffinities: Record<string, number> = { ...get().affinities };
      backendAffinities.forEach((aff: { character_id: string; affinity_score: number }) => {
        if (aff.character_id) {
          mappedAffinities[aff.character_id.toLowerCase()] = aff.affinity_score;
        }
      });

      set({
        currentNodeId: data.current_node_id || 'start',
        playerPA: data.points_of_action ?? 100,
        playerGold: data.gold ?? 50,
        affinities: mappedAffinities,
        isLoading: false,
      });

      // Load initial node from memory or fetch
      const currentTree = get().storyTree;
      const activeNode = currentTree[get().currentNodeId] || mockStory[get().currentNodeId];
      if (activeNode) {
        set({
          currentSpeaker: activeNode.characterName,
          currentText: activeNode.text,
          backgroundUrl: activeNode.backgroundUrl,
          choices: activeNode.choices,
        });
      }
    } catch (error) {
      console.warn('Backend offline ou inacessível. Usando estado local (modo offline/mock).', error);
      // Fallback local: Se o estado estiver vazio, inicializar com a história mockada
      if (!get().currentNodeId) {
        get().initStory(mockStory, 'start');
      }
      set({ isLoading: false });
    }
  },

  advance: async (choiceIndex?: number) => {
    set({ isLoading: true, errorMsg: null });
    const { currentNodeId, playerPA, storyTree } = get();
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    // Check cost client-side if a choice is picked
    const currentNode = storyTree[currentNodeId] || mockStory[currentNodeId];
    let selectedChoice: Choice | undefined;
    
    if (currentNode && choiceIndex !== undefined && currentNode.choices) {
      selectedChoice = currentNode.choices[choiceIndex];
      if (selectedChoice && playerPA < selectedChoice.costPA) {
        set({ errorMsg: 'Saldo de PA Insuficiente', isLoading: false });
        return;
      }
    }

    try {
      const response = await fetch('http://localhost:4000/game/advance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          currentNodeId,
          choiceIndex,
        }),
      });

      if (response.status === 403) {
        set({ errorMsg: 'Saldo de PA Insuficiente', isLoading: false });
        return;
      }

      if (!response.ok) {
        throw new Error('Erro ao avançar cenário');
      }

      const data = await response.json();

      set({
        currentNodeId: data.id,
        currentSpeaker: data.characterName,
        currentText: data.text,
        backgroundUrl: data.backgroundUrl,
        choices: data.choices,
        playerPA: data.playerPA ?? playerPA,
        playerGold: data.playerGold ?? get().playerGold,
        isLoading: false,
      });

      // Update local affinity tracking if returned from backend
      if (data.affinityUpdated) {
        const { characterId, newScore } = data.affinityUpdated;
        get().changeAffinity(characterId.toLowerCase(), newScore - (get().affinities[characterId.toLowerCase()] || 0));
      }
    } catch (error) {
      console.warn('Backend offline. Executando avanço no lado do cliente.', error);
      set({ isLoading: false });

      // Fallback local: Executa a ação simulada no cliente
      if (choiceIndex !== undefined && selectedChoice) {
        get().selectChoice(selectedChoice);
      } else {
        get().nextNode();
      }
    }
  },

  clearError: () => set({ errorMsg: null }),

  nextNode: () => set((state) => {
    const currentNode = state.storyTree[state.currentNodeId] || mockStory[state.currentNodeId];
    if (!currentNode || currentNode.choices || !currentNode.next) return {};

    const nextNodeId = currentNode.next;
    const nextNode = state.storyTree[nextNodeId] || mockStory[nextNodeId];
    if (!nextNode) return {};

    return {
      currentNodeId: nextNodeId,
      currentSpeaker: nextNode.characterName,
      currentText: nextNode.text,
      backgroundUrl: nextNode.backgroundUrl,
      choices: nextNode.choices,
    };
  }),

  selectChoice: (choice) => {
    const state = get();
    if (state.playerPA < choice.costPA) {
      set({ errorMsg: 'Saldo de PA Insuficiente' });
      return;
    }

    const currentTree = state.storyTree['start'] ? state.storyTree : mockStory;
    const nextNode = currentTree[choice.nextNodeId];
    if (!nextNode) return;

    // Apply affinity change if present
    if (choice.affinityChange) {
      state.changeAffinity(choice.affinityChange.characterId, choice.affinityChange.amount);
    }

    set({
      playerPA: state.playerPA - choice.costPA,
      currentNodeId: choice.nextNodeId,
      currentSpeaker: nextNode.characterName,
      currentText: nextNode.text,
      backgroundUrl: nextNode.backgroundUrl,
      choices: nextNode.choices,
    });

    // Spontaneous incoming call check
    const updatedAffinities = get().affinities;
    Object.keys(updatedAffinities).forEach((charId) => {
      const score = updatedAffinities[charId];
      if (score >= 20 && !state.unlockedTips.includes(`${charId}_date_call`)) {
        set({
          unlockedTips: [...state.unlockedTips, `${charId}_date_call`],
          activeCall: {
            characterId: charId,
            direction: 'incoming',
            status: 'ringing',
            dialogueNodeId: `incoming_call_${charId}_date`
          },
          isPhoneOpen: true
        });
      }
    });
  },

  addPA: (amount) => set((state) => ({ playerPA: state.playerPA + amount })),
  addGold: (amount) => set((state) => ({ playerGold: state.playerGold + amount })),

  togglePhone: () => set((state) => ({ isPhoneOpen: !state.isPhoneOpen })),
  
  changeAffinity: (characterId, amount) => set((state) => {
    const currentScore = state.affinities[characterId] ?? 0;
    const newScore = Math.max(-100, Math.min(100, currentScore + amount));
    return {
      affinities: {
        ...state.affinities,
        [characterId]: newScore
      }
    };
  }),
  
  unlockTip: (tipId) => set((state) => ({
    unlockedTips: state.unlockedTips.includes(tipId) 
      ? state.unlockedTips 
      : [...state.unlockedTips, tipId]
  })),

  startCall: (characterId, customNodeId) => {
    const currentAffinity = get().affinities[characterId] ?? 0;
    let nodeId = customNodeId;
    if (!nodeId) {
      if (currentAffinity >= 50) {
        nodeId = `call_${characterId}_high`;
      } else if (currentAffinity >= 10) {
        nodeId = `call_${characterId}_medium`;
      } else {
        nodeId = `call_${characterId}_low`;
      }
    }

    set({
      activeCall: {
        characterId,
        direction: 'outgoing',
        status: 'ringing',
        dialogueNodeId: nodeId
      }
    });

    setTimeout(() => {
      set((state) => {
        if (state.activeCall && state.activeCall.status === 'ringing') {
          return {
            activeCall: {
              ...state.activeCall,
              status: 'connected'
            }
          };
        }
        return {};
      });
    }, 1500);
  },

  answerCall: () => set((state) => {
    if (state.activeCall && state.activeCall.status === 'ringing') {
      return {
        activeCall: {
          ...state.activeCall,
          status: 'connected'
        }
      };
    }
    return {};
  }),

  endCall: () => set({ activeCall: null }),
}));
