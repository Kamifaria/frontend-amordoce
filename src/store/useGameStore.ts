import { create } from 'zustand';
import { Choice, DialogueNode, ChatMessage, ChatThread } from '../shared/types';
import { mockStory } from '../mock/storyData';

// Synthesize sounds using Web Audio API (Zero external asset dependencies!)
let sharedAudioCtx: AudioContext | null = null;

const playSynthesizedSound = (type: 'tick' | 'heart' | 'choice' | 'ring' | 'connected' | 'click') => {
  if (typeof window === 'undefined') return;
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return;

  try {
    if (!sharedAudioCtx) {
      sharedAudioCtx = new AudioContextClass();
    }
    const ctx = sharedAudioCtx;
    
    // Resume context if suspended (browsers suspend audio contexts until user interaction)
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    
    if (type === 'tick') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1000, ctx.currentTime);
      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    } else if (type === 'choice') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } else if (type === 'heart') {
      // Arpeggio chime
      const playTone = (freq: number, start: number, duration: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.03, start);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + duration);
      };
      playTone(523.25, ctx.currentTime, 0.15); // C5
      playTone(659.25, ctx.currentTime + 0.08, 0.15); // E5
      playTone(783.99, ctx.currentTime + 0.16, 0.15); // G5
      playTone(1046.50, ctx.currentTime + 0.24, 0.25); // C6
    } else if (type === 'click') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(550, ctx.currentTime);
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } else if (type === 'ring') {
      const playRing = (start: number) => {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        osc1.frequency.setValueAtTime(480, start);
        osc2.frequency.setValueAtTime(440, start);
        gain.gain.setValueAtTime(0.03, start);
        gain.gain.linearRampToValueAtTime(0.03, start + 0.35);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.4);
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);
        osc1.start(start);
        osc2.start(start);
        osc1.stop(start + 0.4);
        osc2.stop(start + 0.4);
      };
      playRing(ctx.currentTime);
      playRing(ctx.currentTime + 0.5);
    } else if (type === 'connected') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.setValueAtTime(880.00, ctx.currentTime + 0.08); // A5
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    }
  } catch (e) {
    console.warn('Falha ao tocar som sintetizado', e);
  }
};

// Local progress saver for standalone/offline mode
const saveLocalProgress = (stateData: { 
  currentNodeId: string; 
  playerPA: number; 
  playerGold: number; 
  affinities: Record<string, number>; 
  unlockedTips: string[];
  unlockedEpisodes?: number[];
  activeEpisodeId?: number;
  unlockedCGs?: string[];
}) => {
  if (typeof window !== 'undefined') {
    const prevSaved = localStorage.getItem('local_game_state');
    let prevParsed = {};
    if (prevSaved) {
      try {
        prevParsed = JSON.parse(prevSaved);
      } catch (e) {
        console.warn('Error parsing previous game state:', e);
      }
    }
    const merged = {
      ...prevParsed,
      ...stateData
    };
    localStorage.setItem('local_game_state', JSON.stringify(merged));
  }
};

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
  focusedCharacter: string | null;
  chatThreads: ChatThread[];
  
  // Audio state
  isMuted: boolean;
  toggleMute: () => void;
  playSound: (type: 'tick' | 'heart' | 'choice' | 'ring' | 'connected' | 'click') => void;

  // Relationship floating notifications
  affinityNotifications: { characterId: string; amount: number; id: string }[];
  removeAffinityNotification: (id: string) => void;
  
  // Actions
  initStory: (story: Record<string, DialogueNode>, startNodeId: string, initialPA?: number, initialGold?: number) => void;
  nextNode: () => void;
  selectChoice: (choice: Choice) => void;
  addPA: (amount: number) => void;
  addGold: (amount: number) => void;
  selectRomanceFocus: (characterId: string | null) => void;
  
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
  selectChatChoice: (characterId: string, choiceIndex: number) => void;
  sendChatMessage: (characterId: string, text: string) => void;
  triggerIncomingText: (characterId: string, initialText: string) => void;

  // Episode Actions
  unlockedEpisodes: number[];
  activeEpisodeId: number;
  unlockedCGs: string[];
  selectEpisode: (episodeId: number) => void;
  unlockEpisode: (episodeId: number) => void;
  unlockCG: (cgId: string) => void;
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
  unlockedEpisodes: [1],
  activeEpisodeId: 1,
  unlockedCGs: [],
  activeCall: null,
  focusedCharacter: null,
  chatThreads: [
    {
      characterId: 'maggie',
      characterName: 'Maggie',
      avatarColor: 'from-pink-400 to-purple-600',
      unread: true,
      messages: [
        {
          id: 'maggie_welcome_1',
          sender: 'maggie',
          text: 'Oiii Veronica! Bem-vinda a Sweet Amoris! Fiquei super feliz de te conhecer hoje! ❤️',
          timestamp: '15:10'
        },
        {
          id: 'maggie_welcome_2',
          sender: 'maggie',
          text: 'Se precisar de ajuda para lidar com o Castiel ou o Nathaniel me avisa, eles vivem brigando... O que você achou deles?',
          timestamp: '15:11',
          choices: [
            {
              text: 'Achei o Nathaniel fofo e educado.',
              nextMessageId: 'maggie_reply_nathaniel',
              affinityChange: { characterId: 'maggie', amount: 5 }
            },
            {
              text: 'O Castiel é meio marrento, mas tem estilo...',
              nextMessageId: 'maggie_reply_castiel',
              affinityChange: { characterId: 'maggie', amount: 10 }
            },
            {
              text: 'Ainda não decidi, preciso de tempo.',
              nextMessageId: 'maggie_reply_neutral',
              affinityChange: { characterId: 'maggie', amount: 5 }
            }
          ]
        }
      ]
    }
  ],

  isMuted: false,
  affinityNotifications: [],

  toggleMute: () => {
    set((state) => {
      const nextMute = !state.isMuted;
      // Synthesize a quick sound to give feedback if unmuting
      if (!nextMute) {
        setTimeout(() => get().playSound('click'), 50);
      }
      return { isMuted: nextMute };
    });
  },

  playSound: (type) => {
    if (get().isMuted) return;
    playSynthesizedSound(type);
  },

  removeAffinityNotification: (id) => set((state) => ({
    affinityNotifications: state.affinityNotifications.filter((n) => n.id !== id)
  })),

  initStory: (story, startNodeId, initialPA = 100, initialGold = 50) => {
    const startNode = story[startNodeId];
    if (!startNode) return;
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('local_game_state');
    }

    set({
      storyTree: story,
      currentNodeId: startNodeId,
      playerPA: initialPA,
      playerGold: initialGold,
      currentSpeaker: startNode.characterName,
      currentText: startNode.text,
      backgroundUrl: startNode.backgroundUrl,
      choices: startNode.choices,
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
      unlockedTips: ['welcome_tip']
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
      // Fallback local: Tenta carregar progresso salvo no localStorage
      const saved = typeof window !== 'undefined' ? localStorage.getItem('local_game_state') : null;
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const activeNode = mockStory[parsed.currentNodeId];
          if (activeNode) {
            set({
              currentNodeId: parsed.currentNodeId,
              playerPA: parsed.playerPA,
              playerGold: parsed.playerGold,
              affinities: parsed.affinities || get().affinities,
              unlockedTips: parsed.unlockedTips || get().unlockedTips,
              unlockedEpisodes: parsed.unlockedEpisodes || get().unlockedEpisodes,
              activeEpisodeId: parsed.activeEpisodeId || get().activeEpisodeId,
              unlockedCGs: parsed.unlockedCGs || get().unlockedCGs,
              currentSpeaker: activeNode.characterName,
              currentText: activeNode.text,
              backgroundUrl: activeNode.backgroundUrl,
              choices: activeNode.choices,
            });
            set({ isLoading: false });
            return;
          }
        } catch (e) {
          console.warn('Erro ao carregar estado local salvo:', e);
        }
      }

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
    const currentStoryMap = storyTree['start'] ? storyTree : mockStory;
    const currentNode = currentStoryMap[currentNodeId];
    let selectedChoice: Choice | undefined;
    
    if (currentNode && choiceIndex !== undefined && currentNode.choices) {
      selectedChoice = currentNode.choices[choiceIndex];
      if (selectedChoice && playerPA < selectedChoice.costPA) {
        set({ errorMsg: 'Saldo de PA Insuficiente', isLoading: false });
        get().playSound('choice');
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
        get().playSound('choice');
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

  clearError: () => {
    get().playSound('click');
    set({ errorMsg: null });
  },

  nextNode: () => {
    const currentStoryMap = get().storyTree['start'] ? get().storyTree : mockStory;
    const currentNode = currentStoryMap[get().currentNodeId];
    if (!currentNode || currentNode.choices || !currentNode.next) return;

    const nextNodeId = currentNode.next;
    const nextNode = currentStoryMap[nextNodeId];
    if (!nextNode) return;

    get().playSound('click');

    set({
      currentNodeId: nextNodeId,
      currentSpeaker: nextNode.characterName,
      currentText: nextNode.text,
      backgroundUrl: nextNode.backgroundUrl,
      choices: nextNode.choices,
    });

    if (nextNode.triggerChatCharacterId && nextNode.triggerChatText) {
      get().triggerIncomingText(nextNode.triggerChatCharacterId, nextNode.triggerChatText);
    }

    saveLocalProgress({
      currentNodeId: nextNodeId,
      playerPA: get().playerPA,
      playerGold: get().playerGold,
      affinities: get().affinities,
      unlockedTips: get().unlockedTips
    });
  },

  selectChoice: (choice) => {
    const state = get();
    if (state.playerPA < choice.costPA) {
      set({ errorMsg: 'Saldo de PA Insuficiente' });
      state.playSound('choice');
      return;
    }

    const currentTree = state.storyTree['start'] ? state.storyTree : mockStory;
    const nextNode = currentTree[choice.nextNodeId];
    if (!nextNode) return;

    state.playSound('choice');

    // Apply affinity change if present
    if (choice.affinityChange) {
      state.changeAffinity(choice.affinityChange.characterId, choice.affinityChange.amount);
    }

    if (choice.focusedCharacter !== undefined) {
      set({ focusedCharacter: choice.focusedCharacter });
    }

    set({
      playerPA: state.playerPA - choice.costPA,
      currentNodeId: choice.nextNodeId,
      currentSpeaker: nextNode.characterName,
      currentText: nextNode.text,
      backgroundUrl: nextNode.backgroundUrl,
      choices: nextNode.choices,
    });

    if (nextNode.triggerChatCharacterId && nextNode.triggerChatText) {
      state.triggerIncomingText(nextNode.triggerChatCharacterId, nextNode.triggerChatText);
    }

    saveLocalProgress({
      currentNodeId: choice.nextNodeId,
      playerPA: state.playerPA - choice.costPA,
      playerGold: state.playerGold,
      affinities: get().affinities,
      unlockedTips: get().unlockedTips
    });

    // Spontaneous incoming call check
    // Wait a brief delay after selecting choice before ringing to make it feel natural
    const updatedAffinities = get().affinities;
    Object.keys(updatedAffinities).forEach((charId) => {
      const score = updatedAffinities[charId];
      if (score >= 20 && !state.unlockedTips.includes(`${charId}_date_call`)) {
        setTimeout(() => {
          // Play ring sound
          state.playSound('ring');
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
        }, 1200);
      }
    });
  },

  addPA: (amount) => set((state) => ({ playerPA: state.playerPA + amount })),
  addGold: (amount) => set((state) => ({ playerGold: state.playerGold + amount })),

  togglePhone: () => {
    get().playSound('click');
    set((state) => ({ isPhoneOpen: !state.isPhoneOpen }));
  },
  
  changeAffinity: (characterId, amount) => {
    if (amount === 0) return;
    const currentScore = get().affinities[characterId] ?? 0;
    const newScore = Math.max(-100, Math.min(100, currentScore + amount));
    const notificationId = Math.random().toString(36).substring(2, 9);
    
    if (amount > 0) {
      get().playSound('heart');
    } else {
      get().playSound('choice');
    }
    
    // Auto unlock tip for that character when affinity crosses 10!
    const updatedTips = [...get().unlockedTips];
    const tipId = `${characterId}_likes`;
    if (newScore >= 10 && !updatedTips.includes(tipId)) {
      updatedTips.push(tipId);
    }
    
    // Auto-remove notification after 3s
    setTimeout(() => {
      get().removeAffinityNotification(notificationId);
    }, 3000);

    set((state) => {
      const nextAffinities = {
        ...state.affinities,
        [characterId]: newScore
      };
      
      saveLocalProgress({
        currentNodeId: get().currentNodeId,
        playerPA: get().playerPA,
        playerGold: get().playerGold,
        affinities: nextAffinities,
        unlockedTips: updatedTips
      });

      return {
        affinities: nextAffinities,
        unlockedTips: updatedTips,
        affinityNotifications: [
          ...state.affinityNotifications,
          { characterId, amount, id: notificationId }
        ]
      };
    });
  },
  
  unlockTip: (tipId) => set((state) => ({
    unlockedTips: state.unlockedTips.includes(tipId) 
      ? state.unlockedTips 
      : [...state.unlockedTips, tipId]
  })),

  startCall: (characterId, customNodeId) => {
    get().playSound('click');
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

    // Play ringing sound
    get().playSound('ring');

    setTimeout(() => {
      set((state) => {
        if (state.activeCall && state.activeCall.status === 'ringing') {
          get().playSound('connected');
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

  answerCall: () => {
    get().playSound('connected');
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
  },

  endCall: () => {
    get().playSound('click');
    set({ activeCall: null });
  },

  selectRomanceFocus: (characterId) => set({ focusedCharacter: characterId }),

  selectChatChoice: (characterId, choiceIndex) => {
    const state = get();
    const thread = state.chatThreads.find(t => t.characterId === characterId);
    if (!thread) return;

    // Find the message that currently has the choices
    const currentMsgIndex = thread.messages.findIndex(m => m.choices && m.choices.length > 0);
    if (currentMsgIndex === -1) return;

    const message = thread.messages[currentMsgIndex];
    if (!message.choices) return;

    const choice = message.choices[choiceIndex];
    if (!choice) return;

    // Apply affinity change if present
    if (choice.affinityChange) {
      state.changeAffinity(choice.affinityChange.characterId, choice.affinityChange.amount);
    }

    // Play choice click sound
    state.playSound('click');

    // Create player response message
    const playerMsg: ChatMessage = {
      id: `${characterId}_choice_response_${Date.now()}`,
      sender: 'player',
      text: choice.text,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    // Update messages to remove choices from previous message, add player message
    const updatedMessages = thread.messages.map((m, idx) => {
      if (idx === currentMsgIndex) {
        const { choices, ...rest } = m;
        return rest; // remove choices so they can't be clicked again
      }
      return m;
    });

    updatedMessages.push(playerMsg);

    // Set updated messages in thread
    const updatedThreads = state.chatThreads.map(t => {
      if (t.characterId === characterId) {
        return {
          ...t,
          messages: updatedMessages
        };
      }
      return t;
    });

    set({ chatThreads: updatedThreads });

    // Trigger NPC response with a small typing delay!
    setTimeout(() => {
      state.playSound('ring'); // notification chime
      
      let replyText = '';
      let replyChoices: any[] | undefined = undefined;

      if (choice.nextMessageId === 'maggie_reply_nathaniel') {
        replyText = 'Hum, Nathaniel é meio certinho, mas ele é fofo mesmo! Aposto que ele vai gostar de você se você for educada!';
      } else if (choice.nextMessageId === 'maggie_reply_castiel') {
        replyText = 'Ui, gosta dos rebeldes, né? Hahaha! O Castiel finge que não liga pra ninguém, mas aposto que no fundo ele gostou do seu atrevimento!';
      } else if (choice.nextMessageId === 'maggie_reply_neutral') {
        replyText = 'Justo! O primeiro dia é pra analisar o terreno mesmo. Me conta se algum deles fizer algo interessante!';
      } else if (choice.nextMessageId === 'castiel_reply_yes') {
        replyText = 'Hmph. Pode ser. Quem sabe a gente não se tromba por aí no pátio.';
      } else if (choice.nextMessageId === 'castiel_reply_no') {
        replyText = 'Tsc. Beleza então. Fique na sua.';
      } else if (choice.nextMessageId === 'remi_reply_tarot') {
        replyText = 'Excelente escolha, chérie. O tarô revela tudo. A roda da fortuna está girando para nós.';
      } else if (choice.nextMessageId === 'remi_reply_normal') {
        replyText = 'Très bien. Nos vemos no grêmio para mais assuntos sérios.';
      } else {
        replyText = 'Legal! Conversamos mais na escola amanhã!';
      }

      const npcMsg: ChatMessage = {
        id: `${characterId}_npc_reply_${Date.now()}`,
        sender: characterId,
        text: replyText,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        choices: replyChoices
      };

      set((currentState) => {
        const nextThreads = currentState.chatThreads.map(t => {
          if (t.characterId === characterId) {
            return {
              ...t,
              unread: true,
              messages: [...t.messages, npcMsg]
            };
          }
          return t;
        });
        return { chatThreads: nextThreads };
      });
    }, 1500);
  },

  sendChatMessage: (characterId, text) => {
    const state = get();
    const thread = state.chatThreads.find(t => t.characterId === characterId);
    if (!thread) return;

    state.playSound('click');

    const playerMsg: ChatMessage = {
      id: `custom_${Date.now()}`,
      sender: 'player',
      text,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    const updatedThreads = state.chatThreads.map(t => {
      if (t.characterId === characterId) {
        return {
          ...t,
          messages: [...t.messages, playerMsg]
        };
      }
      return t;
    });

    set({ chatThreads: updatedThreads });

    // Auto reply mock
    setTimeout(() => {
      state.playSound('ring');
      let replyText = 'Ah, legal! Vamos conversar pessoalmente na escola amanhã, chérie!';
      if (characterId === 'maggie' && text.toLowerCase().trim() === 'ei maggie conta decode paramore') {
        replyText = "On my own (I'm screaming: I love you so)\nOn my own (but my thoughts you can't decode)\n\nBut how did we get here\nWhen I used to know you so well?\nYeah\nHow did we get here?\nWell, I think I know";
      }

      const npcMsg: ChatMessage = {
        id: `custom_reply_${Date.now()}`,
        sender: characterId,
        text: replyText,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      };
      set((currentState) => {
        const nextThreads = currentState.chatThreads.map(t => {
          if (t.characterId === characterId) {
            return {
              ...t,
              unread: true,
              messages: [...t.messages, npcMsg]
            };
          }
          return t;
        });
        return { chatThreads: nextThreads };
      });
    }, 1500);
  },

  triggerIncomingText: (characterId, initialText) => {
    const state = get();
    state.playSound('ring');
    
    // Check if thread already exists
    const threadExists = state.chatThreads.some(t => t.characterId === characterId);
    
    const npcMsg: ChatMessage = {
      id: `incoming_${characterId}_${Date.now()}`,
      sender: characterId,
      text: initialText,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    if (threadExists) {
      const updatedThreads = state.chatThreads.map(t => {
        if (t.characterId === characterId) {
          return {
            ...t,
            unread: true,
            messages: [...t.messages, npcMsg]
          };
        }
        return t;
      });
      set({ chatThreads: updatedThreads });
    } else {
      // Create new thread
      const charNameMap: Record<string, string> = {
        castiel: 'Castiel',
        nathaniel: 'Nathaniel',
        lysandre: 'Lysandre',
        remi: 'Remi',
        harry: 'Harry',
        maggie: 'Maggie'
      };
      const avatarColors: Record<string, string> = {
        castiel: 'from-red-500 to-rose-600',
        nathaniel: 'from-amber-400 to-yellow-500',
        lysandre: 'from-emerald-500 to-teal-600',
        remi: 'from-violet-600 to-slate-900',
        harry: 'from-red-600 to-zinc-900',
        maggie: 'from-pink-400 to-purple-600'
      };
      const newThread: ChatThread = {
        characterId,
        characterName: charNameMap[characterId] || characterId,
        avatarColor: avatarColors[characterId] || 'from-purple-500 to-indigo-600',
        unread: true,
        messages: [npcMsg]
      };
      set({ chatThreads: [...state.chatThreads, newThread] });
    }
  },

  selectEpisode: (episodeId: number) => {
    let startNodeId = 'start';
    if (episodeId === 2) startNodeId = 'ep2_start';
    if (episodeId === 3) startNodeId = 'ep3_start';

    // Get story mock nodes
    get().initStory(mockStory, startNodeId, 100, 50);
    set({ activeEpisodeId: episodeId });

    saveLocalProgress({
      currentNodeId: startNodeId,
      playerPA: 100,
      playerGold: 50,
      affinities: get().affinities,
      unlockedTips: get().unlockedTips,
      unlockedEpisodes: get().unlockedEpisodes,
      activeEpisodeId: episodeId,
      unlockedCGs: get().unlockedCGs
    });
  },

  unlockEpisode: (episodeId: number) => {
    set((state) => {
      if (state.unlockedEpisodes.includes(episodeId)) return {};
      const nextUnlocked = [...state.unlockedEpisodes, episodeId];
      saveLocalProgress({
        currentNodeId: state.currentNodeId,
        playerPA: state.playerPA,
        playerGold: state.playerGold,
        affinities: state.affinities,
        unlockedTips: state.unlockedTips,
        unlockedEpisodes: nextUnlocked,
        activeEpisodeId: state.activeEpisodeId,
        unlockedCGs: state.unlockedCGs
      });
      return { unlockedEpisodes: nextUnlocked };
    });
  },

  unlockCG: (cgId: string) => {
    set((state) => {
      if (state.unlockedCGs.includes(cgId)) return {};
      const nextCGs = [...state.unlockedCGs, cgId];
      saveLocalProgress({
        currentNodeId: state.currentNodeId,
        playerPA: state.playerPA,
        playerGold: state.playerGold,
        affinities: state.affinities,
        unlockedTips: state.unlockedTips,
        unlockedEpisodes: state.unlockedEpisodes,
        activeEpisodeId: state.activeEpisodeId,
        unlockedCGs: nextCGs
      });
      return { unlockedCGs: nextCGs };
    });
  },
}));
