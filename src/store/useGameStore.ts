import { create } from 'zustand';
import { Choice, DialogueNode, ChatMessage, ChatThread, StoryStage, EquippedOutfit, Achievement, DailyQuest, SweetGramPost, ScenarioItem } from '../shared/types';
import { mockStory } from '../mock/storyData';

// Synthesize sounds using Web Audio API (Zero external asset dependencies!)
let sharedAudioCtx: AudioContext | null = null;

const playSynthesizedSound = (type: 'tick' | 'heart' | 'choice' | 'ring' | 'connected' | 'click') => {
  if (typeof window === 'undefined') return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return;

  try {
    if (!sharedAudioCtx) {
      sharedAudioCtx = new AudioContextClass();
    }
    const ctx = sharedAudioCtx;
    const initialPA = 99999;
    
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
  storyStage?: StoryStage;
  cluesFound?: string[];
  currentLocationId?: string;
  lastDailyDraw?: number | null;
  equippedOutfit?: EquippedOutfit;
  metCharacters?: string[];
}) => {
  if (typeof window !== 'undefined') {
    const prevSaved = localStorage.getItem('local_game_state');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let prevParsed: any = {};
    if (prevSaved) {
      try {
        prevParsed = JSON.parse(prevSaved);
      } catch (e) {
        console.warn('Error parsing previous game state:', e);
      }
    }
    const merged = {
      ...prevParsed,
      ...stateData,
      metCharacters: stateData.metCharacters || prevParsed.metCharacters || [],
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
  // Minigame states
  activeMinigame: string | null;
  startMinigame: (minigameId: string) => void;
  endMinigame: (score: number) => void;

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
  metCharacters: string[];
  
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
  savePainting: (dataUrl: string) => void;
  selectChatChoice: (characterId: string, choiceIndex: number) => void;
  sendChatMessage: (characterId: string, text: string) => void;
  triggerIncomingText: (characterId: string, initialText: string) => void;
  tryRandomMessage: () => void;

  // Episode Actions
  unlockedEpisodes: number[];
  activeEpisodeId: number;
  unlockedCGs: string[];
  selectEpisode: (episodeId: number) => void;
  unlockEpisode: (episodeId: number) => void;
  unlockCG: (cgId: string) => void;

  // Story stage and clues
  storyStage: StoryStage;
  cluesFound: string[];
  setStoryStage: (stage: StoryStage) => void;
  collectClue: (clueId: string) => void;

  // Navigation state & action
  currentLocationId: string;
  changeLocation: (locationId: string) => void;

  // Lobby States & Actions
  currentView: 'lobby' | 'episode';
  lastDailyDraw: number | null;
  equippedOutfit: EquippedOutfit;
  setView: (view: 'lobby' | 'episode') => void;
  drawTarot: (rewardType: 'PA' | 'Gold', rewardAmount: number) => void;
  updateOutfit: (outfit: EquippedOutfit) => void;

  // Gameplay Enhancements States
  achievements: Achievement[];
  dailyQuests: DailyQuest[];
  sweetGramPosts: SweetGramPost[];
  savedPaintings: string[];
  collectedItems: string[];
  achievementQueue: Achievement[];

  // Gameplay Enhancements Actions
  unlockAchievement: (id: string) => void;
  dismissAchievement: () => void;
  incrementQuestProgress: (id: string, amount: number) => void;
  claimQuestReward: (id: string) => void;
  likePost: (postId: string) => void;
  commentOnPost: (postId: string, commentIndex: number) => void;
  collectScenarioItem: (item: ScenarioItem) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  currentNodeId: '',
  playerPA: 99999,
  playerGold: 50,
  currentSpeaker: '',
  currentText: '',
  backgroundUrl: '',
  choices: undefined,
  storyTree: {},
  activeMinigame: null,
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
    kami: 0,
  },
  isPhoneOpen: false,
  unlockedTips: ['welcome_tip'],
  unlockedEpisodes: [1],
  activeEpisodeId: 1,
  unlockedCGs: [],
  storyStage: 'INTRO',
  cluesFound: [],
  currentLocationId: 'school',
  activeCall: null,
  focusedCharacter: null,
  metCharacters: [],
  savedPaintings: [],

  // Lobby States
  currentView: 'lobby',
  lastDailyDraw: null,
  equippedOutfit: {
    hairstyle: 'long-pink',
    top: 'school-uniform-top',
    bottom: 'skirt-pink',
  },

  setView: (view) => set({ currentView: view }),
  
  drawTarot: (rewardType, rewardAmount) => {
    const nextDraw = Date.now();
    set((state) => {
      const updatedPA = state.playerPA + (rewardType === 'PA' ? rewardAmount : 0);
      const updatedGold = state.playerGold + (rewardType === 'Gold' ? rewardAmount : 0);
      
      saveLocalProgress({
        currentNodeId: state.currentNodeId,
        playerPA: updatedPA,
        playerGold: updatedGold,
        affinities: state.affinities,
        unlockedTips: state.unlockedTips,
        unlockedEpisodes: state.unlockedEpisodes,
        activeEpisodeId: state.activeEpisodeId,
        unlockedCGs: state.unlockedCGs,
        storyStage: state.storyStage,
        cluesFound: state.cluesFound,
        currentLocationId: state.currentLocationId,
        lastDailyDraw: nextDraw,
        equippedOutfit: state.equippedOutfit,
      });

      return { 
        playerPA: updatedPA,
        playerGold: updatedGold,
        lastDailyDraw: nextDraw 
      };
    });

    // Integrated enhancements triggers
    get().unlockAchievement('tarot_master');
    get().incrementQuestProgress('tarot_today', 1);
  },

  updateOutfit: (outfit) => {
    set({ equippedOutfit: outfit });
    saveLocalProgress({
      currentNodeId: get().currentNodeId,
      playerPA: get().playerPA,
      playerGold: get().playerGold,
      affinities: get().affinities,
      unlockedTips: get().unlockedTips,
      unlockedEpisodes: get().unlockedEpisodes,
      activeEpisodeId: get().activeEpisodeId,
      unlockedCGs: get().unlockedCGs,
      storyStage: get().storyStage,
      cluesFound: get().cluesFound,
      currentLocationId: get().currentLocationId,
      lastDailyDraw: get().lastDailyDraw,
      equippedOutfit: outfit,
    });

    // Integrated enhancements triggers
    get().unlockAchievement('fashionista');
    get().incrementQuestProgress('change_style', 1);
  },

  // Gameplay Enhancements States
  achievements: [
    { id: 'crush_castiel', title: 'Guitarrista Rebelde', description: 'Alcance 50% de afinidade com o Castiel', unlocked: false, icon: '🎸' },
    { id: 'crush_nathaniel', title: 'Estudioso de Ouro', description: 'Alcance 50% de afinidade com o Nathaniel', unlocked: false, icon: '📚' },
    { id: 'tarot_master', title: 'Destino Traçado', description: 'Realize sua primeira tiragem de tarô com o Remi', unlocked: false, icon: '🔮' },
    { id: 'fashionista', title: 'Estilo Puro', description: 'Troque de roupa no closet pela primeira vez', unlocked: false, icon: '👚' },
    { id: 'collector', title: 'Caçadora de Relíquias', description: 'Encontre um item oculto no cenário', unlocked: false, icon: '🔑' },
  ],
  dailyQuests: [
    { id: 'check_in', description: 'Entrar no jogo na Sweet Amoris', target: 1, current: 1, completed: false, rewardType: 'PA', rewardAmount: 20 },
    { id: 'tarot_today', description: 'Consultar o tarô diário de Remi', target: 1, current: 0, completed: false, rewardType: 'Gold', rewardAmount: 10 },
    { id: 'change_style', description: 'Mudar de cabelo ou roupa no closet', target: 1, current: 0, completed: false, rewardType: 'PA', rewardAmount: 15 },
  ],
  sweetGramPosts: [
    {
      id: 'post_castiel_1',
      characterId: 'castiel',
      characterName: 'Castiel',
      avatarColor: 'from-red-500 to-rose-600',
      imageUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop&q=60',
      caption: 'Guitarra afinada e cordas novas. O som do ensaio hoje vai ser pesado. 🎸🤘',
      likes: 142,
      hasLiked: false,
      comments: [
        { id: 'c1', sender: 'Lysandre', text: 'Excelente. O ritmo da nova letra encaixa perfeitamente.' },
        { id: 'c2', sender: 'Maggie', text: 'Quero ouvir essa logo! Toca Decode! 😍' }
      ],
      commentOptions: [
        { text: 'Aposto que o ensaio vai ser incrível!', affinityChange: 10 },
        { text: 'Toma cuidado para não fazer barulho demais...', affinityChange: -5 }
      ]
    },
    {
      id: 'post_nathaniel_1',
      characterId: 'nathaniel',
      characterName: 'Nathaniel',
      avatarColor: 'from-amber-400 to-yellow-500',
      imageUrl: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=500&auto=format&fit=crop&q=60',
      caption: 'Um pouco de paz e silêncio na biblioteca para organizar a papelada do grêmio. 📚☕',
      likes: 98,
      hasLiked: false,
      comments: [
        { id: 'c3', sender: 'Diretora', text: 'Parabéns pela dedicação, Nathaniel.' }
      ],
      commentOptions: [
        { text: 'Se precisar de uma mãozinha, é só chamar!', affinityChange: 10 },
        { text: 'Organizar papéis parece muito chato.', affinityChange: -5 }
      ]
    }
  ],
  collectedItems: [],
  achievementQueue: [],

  // Gameplay Enhancements Actions
  unlockAchievement: (id) => {
    set((state) => {
      const achievements = state.achievements.map((ach) => {
        if (ach.id === id && !ach.unlocked) {
          const unlockedAch = { ...ach, unlocked: true, unlockedAt: Date.now() };
          state.playSound('heart');
          setTimeout(() => {
            set((curr) => ({ achievementQueue: [...curr.achievementQueue, unlockedAch] }));
          }, 100);
          return unlockedAch;
        }
        return ach;
      });
      return { achievements };
    });
  },

  dismissAchievement: () => {
    set((state) => ({
      achievementQueue: state.achievementQueue.slice(1)
    }));
  },

  incrementQuestProgress: (id, amount) => {
    set((state) => {
      const dailyQuests = state.dailyQuests.map((q) => {
        if (q.id === id && !q.completed) {
          const nextVal = Math.min(q.target, q.current + amount);
          return {
            ...q,
            current: nextVal,
            completed: nextVal >= q.target
          };
        }
        return q;
      });
      return { dailyQuests };
    });
  },

  claimQuestReward: (id) => {
    set((state) => {
      const quest = state.dailyQuests.find(q => q.id === id);
      if (!quest || !quest.completed) return {};

      if (quest.rewardType === 'PA') {
        state.addPA(quest.rewardAmount);
      } else {
        state.addGold(quest.rewardAmount);
      }

      const dailyQuests = state.dailyQuests.filter(q => q.id !== id);
      state.playSound('heart');

      return { dailyQuests };
    });
  },

  likePost: (postId) => {
    set((state) => {
      const sweetGramPosts = state.sweetGramPosts.map((post) => {
        if (post.id === postId && !post.hasLiked) {
          state.playSound('click');
          state.changeAffinity(post.characterId, 5);
          return {
            ...post,
            hasLiked: true,
            likes: post.likes + 1
          };
        }
        return post;
      });
      return { sweetGramPosts };
    });
  },

  commentOnPost: (postId, commentIndex) => {
    set((state) => {
      const sweetGramPosts = state.sweetGramPosts.map((post) => {
        if (post.id === postId && post.commentOptions) {
          const option = post.commentOptions[commentIndex];
          state.playSound('choice');
          state.changeAffinity(post.characterId, option.affinityChange);
          
          const newComment = {
            id: `usr_${Date.now()}`,
            sender: 'Veronica',
            text: option.text
          };

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { commentOptions, ...rest } = post;
          return {
            ...rest,
            comments: [...post.comments, newComment]
          };
        }
        return post;
      });
      return { sweetGramPosts };
    });
  },

  collectScenarioItem: (item) => {
    set((state) => {
      if (state.collectedItems.includes(item.id)) return {};
      
      state.playSound('heart');
      
      if (item.rewardType === 'PA' && item.rewardAmount) {
        state.addPA(item.rewardAmount);
      } else if (item.rewardType === 'Gold' && item.rewardAmount) {
        state.addGold(item.rewardAmount);
      } else if (item.rewardType === 'Clue' && item.clueId) {
        state.collectClue(item.clueId);
      }

      setTimeout(() => {
        get().unlockAchievement('collector');
      }, 500);

      return {
        collectedItems: [...state.collectedItems, item.id]
      };
    });
  },

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
    },
    {
      characterId: 'kami',
      characterName: 'Kami',
      avatarColor: 'from-purple-900 to-black',
      unread: true,
      messages: [
        {
          id: 'kami_welcome_1',
          sender: 'kami',
          text: 'Ei, Veronica. Fiquei sabendo que você é a garota nova. Se estiver de saco cheio do barulho do corredor, me encontra no pátio depois.',
          timestamp: '15:15',
          choices: [
            {
              text: 'Adorei o silêncio do pátio... e a sua companhia.',
              nextMessageId: 'kami_reply_flirt',
              affinityChange: { characterId: 'kami', amount: 15 }
            },
            {
              text: 'O corredor é bem movimentado mesmo, prefiro o pátio.',
              nextMessageId: 'kami_reply_friendly',
              affinityChange: { characterId: 'kami', amount: 10 }
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
      storyStage: 'INTRO',
      cluesFound: [],
      currentLocationId: 'school',
      affinities: {
        castiel: 0,
        lysandre: 0,
        nathaniel: 0,
        remi: 0,
        harry: 0,
        maggie: 0,
        armin: 0,
        alexy: 0,
        kami: 0,
      },
      unlockedTips: ['welcome_tip']
    });
  },

  fetchCurrentGameState: async () => {
    set({ isLoading: true, errorMsg: null });
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const isDemo = !token || token === 'demo-token-jwt';

    if (isDemo) {
      // Local fallback immediately
      const saved = typeof window !== 'undefined' ? localStorage.getItem('local_game_state') : null;
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const activeNode = mockStory[parsed.currentNodeId];
          if (activeNode) {
            set({
              currentNodeId: parsed.currentNodeId,
              playerPA: 99999, // FOR TESTING
              playerGold: parsed.playerGold,
              affinities: parsed.affinities || get().affinities,
              unlockedTips: parsed.unlockedTips || get().unlockedTips,
              unlockedEpisodes: parsed.unlockedEpisodes || get().unlockedEpisodes,
              activeEpisodeId: parsed.activeEpisodeId || get().activeEpisodeId,
              unlockedCGs: parsed.unlockedCGs || get().unlockedCGs,
              storyStage: parsed.storyStage || 'INTRO',
              cluesFound: parsed.cluesFound || [],
              currentLocationId: parsed.currentLocationId || 'school',
              currentSpeaker: activeNode.characterName,
              currentText: activeNode.text,
              backgroundUrl: activeNode.backgroundUrl,
              choices: activeNode.choices,
              currentView: parsed.currentView || get().currentView,
              lastDailyDraw: parsed.lastDailyDraw || get().lastDailyDraw,
              equippedOutfit: parsed.equippedOutfit || get().equippedOutfit,
              isMuted: parsed.isMuted ?? false,
              chatThreads: parsed.chatThreads || [],
              metCharacters: parsed.metCharacters || [],
              savedPaintings: parsed.savedPaintings || [],
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
      return;
    }

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
        playerPA: data.points_of_action ?? 99999,
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
              playerPA: 99999, // FOR TESTING
              playerGold: parsed.playerGold,
              affinities: parsed.affinities || get().affinities,
              unlockedTips: parsed.unlockedTips || get().unlockedTips,
              unlockedEpisodes: parsed.unlockedEpisodes || get().unlockedEpisodes,
              activeEpisodeId: parsed.activeEpisodeId || get().activeEpisodeId,
              unlockedCGs: parsed.unlockedCGs || get().unlockedCGs,
              storyStage: parsed.storyStage || 'INTRO',
              cluesFound: parsed.cluesFound || [],
              currentLocationId: parsed.currentLocationId || 'school',
              currentSpeaker: activeNode.characterName,
              currentText: activeNode.text,
              backgroundUrl: activeNode.backgroundUrl,
              choices: activeNode.choices,
              currentView: parsed.currentView || get().currentView,
              lastDailyDraw: parsed.lastDailyDraw || get().lastDailyDraw,
              equippedOutfit: parsed.equippedOutfit || get().equippedOutfit,
              metCharacters: parsed.metCharacters || [],
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
    const isDemo = !token || token === 'demo-token-jwt';

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

    if (isDemo) {
      set({ isLoading: false });
      if (choiceIndex !== undefined && selectedChoice) {
        get().selectChoice(selectedChoice);
      } else {
        get().nextNode();
      }
      return;
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
    if (!currentNode || currentNode.choices || (!currentNode.next && !currentNode.nextLove)) return;

    let nextNodeId = currentNode.next;
    const speakerKey = currentNode.characterName?.toLowerCase();
    const affinity = get().affinities[speakerKey] ?? 0;

    if (currentNode.nextLove && currentNode.nextLoveThreshold !== undefined && affinity >= currentNode.nextLoveThreshold) {
      nextNodeId = currentNode.nextLove;
    }

    if (!nextNodeId) return;
    const nextNode = currentStoryMap[nextNodeId];
    if (!nextNode) return;

    get().playSound('click');

    let nextStage = get().storyStage;
    if (nextNodeId === 'harry-start' && nextStage === 'INTRO') {
      nextStage = 'FREE_EXPLORE';
    }

    if (nextNodeId === 'find-key-quadra') {
      get().collectClue('chave_pequena');
    } else if (nextNodeId === 'find-paper-galpao') {
      get().collectClue('gabarito_rasgado');
    }

    // Add speaker to metCharacters if valid
    const state = get();
    const nextSpeakerKey = nextNode.characterName?.toLowerCase();
    const isMainCharacter = ['castiel', 'nathaniel', 'lysandre', 'remi', 'harry', 'maggie', 'kami'].includes(nextSpeakerKey || '');
    
    let updatedMetCharacters = state.metCharacters;
    if (nextSpeakerKey && isMainCharacter && !updatedMetCharacters.includes(nextSpeakerKey)) {
      updatedMetCharacters = [...updatedMetCharacters, nextSpeakerKey];
      set({ metCharacters: updatedMetCharacters });
    }

    set({
      currentNodeId: nextNodeId,
      currentSpeaker: nextNode.characterName,
      currentText: nextNode.text,
      backgroundUrl: nextNode.backgroundUrl,
      choices: nextNode.choices,
      storyStage: nextStage,
    });

    state.tryRandomMessage();

    saveLocalProgress({
      currentNodeId: nextNodeId,
      playerPA: get().playerPA,
      playerGold: get().playerGold,
      affinities: get().affinities,
      unlockedTips: get().unlockedTips,
      unlockedEpisodes: get().unlockedEpisodes,
      activeEpisodeId: get().activeEpisodeId,
      unlockedCGs: get().unlockedCGs,
      storyStage: nextStage,
      cluesFound: get().cluesFound,
      currentLocationId: get().currentLocationId,
      metCharacters: get().metCharacters,
    });
  },

  selectChoice: (choice) => {
    const state = get();
    if (state.playerPA < choice.costPA) {
      set({ errorMsg: 'Saldo de PA Insuficiente' });
      state.playSound('choice');
      return;
    }

    if (choice.minigame) {
      set({
        playerPA: state.playerPA - choice.costPA,
      });
      state.startMinigame(choice.minigame);
      return;
    }

    const currentTree = state.storyTree['start'] ? state.storyTree : mockStory;
    if (!choice.nextNodeId) return;
    
    const nextNode = currentTree[choice.nextNodeId];
    if (!nextNode) return;

    state.playSound('choice');

    // Apply affinity change if present
    if (choice.affinityChange) {
      state.changeAffinity(choice.affinityChange.characterId, choice.affinityChange.amount);
    }
    if (choice.affinityChanges) {
      choice.affinityChanges.forEach((change) => {
        state.changeAffinity(change.characterId, change.amount);
      });
    }

    if (choice.focusedCharacter !== undefined) {
      set({ focusedCharacter: choice.focusedCharacter });
    }

    let nextStage = state.storyStage;
    if (choice.nextNodeId === 'harry-start' && nextStage === 'INTRO') {
      nextStage = 'FREE_EXPLORE';
    }

    if (choice.nextNodeId === 'find-key-quadra') {
      state.collectClue('chave_pequena');
    } else if (choice.nextNodeId === 'find-paper-galpao') {
      state.collectClue('gabarito_rasgado');
    }

    // Add speaker to metCharacters if valid
    const speakerKey = nextNode.characterName?.toLowerCase();
    const isMainCharacter = ['castiel', 'nathaniel', 'lysandre', 'remi', 'harry', 'maggie', 'kami'].includes(speakerKey);
    
    let updatedMetCharacters = state.metCharacters;
    if (isMainCharacter && !updatedMetCharacters.includes(speakerKey)) {
      updatedMetCharacters = [...updatedMetCharacters, speakerKey];
    }

    set({
      playerPA: state.playerPA - choice.costPA,
      currentNodeId: choice.nextNodeId,
      currentSpeaker: nextNode.characterName,
      currentText: nextNode.text,
      backgroundUrl: nextNode.backgroundUrl,
      choices: nextNode.choices,
      storyStage: nextStage,
      metCharacters: updatedMetCharacters,
    });

    state.tryRandomMessage();

    saveLocalProgress({
      currentNodeId: choice.nextNodeId,
      playerPA: state.playerPA - choice.costPA,
      playerGold: state.playerGold,
      affinities: get().affinities,
      unlockedTips: get().unlockedTips,
      unlockedEpisodes: get().unlockedEpisodes,
      activeEpisodeId: get().activeEpisodeId,
      unlockedCGs: get().unlockedCGs,
      storyStage: nextStage,
      cluesFound: get().cluesFound,
      currentLocationId: get().currentLocationId,
      metCharacters: get().metCharacters,
    });
  },

  startMinigame: (minigameId) => set({ activeMinigame: minigameId }),
  
  endMinigame: (score) => {
    const state = get();
    set({ activeMinigame: null });
    
    // Custom logic for Harry Guitar Minigame
    if (state.currentNodeId === 'harry-start') {
      let nextNodeId = 'harry-guitar-nice';
      let affinityChange = 15;
      
      if (score >= 400) {
        nextNodeId = 'harry-guitar-bold';
        affinityChange = 20;
      } else if (score < 150) {
        nextNodeId = 'harry-guitar-rude';
        affinityChange = -15;
      }

      // Automatically apply affinity and advance to the proper node
      set((s) => ({
        affinities: {
          ...s.affinities,
          harry: (s.affinities.harry || 0) + affinityChange,
        }
      }));
      
      const nextNode = state.storyTree[nextNodeId];
      if (nextNode) {
        set((s) => ({
          currentNodeId: nextNodeId,
          currentSpeaker: nextNode.speaker,
          currentText: nextNode.text,
          backgroundUrl: nextNode.backgroundUrl,
          choices: nextNode.choices,
        }));
      }
    } else if (state.currentNodeId === 'kami-art-start') {
      // Jogo de Pintura (Mixagem de Cores)
      // Score alto (>= 80% de precisão) -> kami-paint-success
      // Score baixo (< 80%) -> kami-paint-fail
      let nextNodeId = 'kami-paint-success';
      let affinityChange = 25;
      
      if (score < 80) {
        nextNodeId = 'kami-paint-fail';
        affinityChange = -10;
      }

      set((s) => ({
        affinities: {
          ...s.affinities,
          kami: (s.affinities.kami || 0) + affinityChange,
        }
      }));
      
      const nextNode = state.storyTree[nextNodeId] || mockStory[nextNodeId];
      if (nextNode) {
        set((s) => ({
          currentNodeId: nextNodeId,
          currentSpeaker: nextNode.speaker || nextNode.characterName,
          currentText: nextNode.text,
          backgroundUrl: nextNode.backgroundUrl,
          choices: nextNode.choices,
        }));
      }
    } else if (state.currentNodeId === 'remi-start') {
      // Jogo de Tarot do Remi
      // Vence se escolheu a carta lovers (score === 100) -> remi-tarot-lovers
      // Perde caso contrário (score === 0) -> remi-tarot-tower
      const nextNodeId = score === 100 ? 'remi-tarot-lovers' : 'remi-tarot-tower';
      const nextNode = state.storyTree[nextNodeId] || mockStory[nextNodeId];
      if (nextNode) {
        set({
          currentNodeId: nextNodeId,
          currentSpeaker: nextNode.speaker || nextNode.characterName,
          currentText: nextNode.text,
          backgroundUrl: nextNode.backgroundUrl,
          choices: nextNode.choices,
        });
      }
    } else if (state.currentNodeId === 'nathaniel-classroom-meet') {
      // Jogo de Justificativas do Nathaniel (Swipe)
      // Após o jogo, avança para a organização dos papéis
      const nextNodeId = 'nathaniel-classroom-help';
      const nextNode = state.storyTree[nextNodeId] || mockStory[nextNodeId];
      if (nextNode) {
        set({
          currentNodeId: nextNodeId,
          currentSpeaker: nextNode.speaker || nextNode.characterName,
          currentText: nextNode.text,
          backgroundUrl: nextNode.backgroundUrl,
          choices: nextNode.choices,
        });
      }
    }
  },

  addPA: (amount) => set((state) => ({ playerPA: state.playerPA + amount })),
  addGold: (amount) => set((state) => ({ playerGold: state.playerGold + amount })),

  togglePhone: () => {
    get().playSound('click');
    set((state) => ({ isPhoneOpen: !state.isPhoneOpen }));
  },
  
  changeAffinity: (characterId, amount) => {
    if (amount === 0) return;
    
    // Difficult crushes (Castiel and Lysandre) have 50% reduced positive affinity gains
    let finalAmount = amount;
    if (amount > 0 && (characterId === 'castiel' || characterId === 'lysandre')) {
      finalAmount = Math.max(1, Math.round(amount * 0.5));
    }
    
    const currentScore = get().affinities[characterId] ?? 0;
    const newScore = Math.max(-100, Math.min(100, currentScore + finalAmount));
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

    if (newScore >= 50) {
      if (characterId === 'castiel') setTimeout(() => get().unlockAchievement('crush_castiel'), 100);
      if (characterId === 'nathaniel') setTimeout(() => get().unlockAchievement('crush_nathaniel'), 100);
    }
    
    // Auto-remove notification after 3s
    setTimeout(() => {
      get().removeAffinityNotification(notificationId);
    }, 3000);

    let nextStage = get().storyStage;
    if (newScore >= 50 && nextStage === 'FREE_EXPLORE') {
      nextStage = 'DATE_CINEMA';
    }

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
        unlockedTips: updatedTips,
        unlockedEpisodes: get().unlockedEpisodes,
        activeEpisodeId: get().activeEpisodeId,
        unlockedCGs: get().unlockedCGs,
        storyStage: nextStage,
        cluesFound: get().cluesFound,
        currentLocationId: get().currentLocationId,
      });

      return {
        affinities: nextAffinities,
        unlockedTips: updatedTips,
        storyStage: nextStage,
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

  savePainting: (dataUrl: string) => {
    set((state) => ({
      savedPaintings: [...state.savedPaintings, dataUrl]
    }));
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const replyChoices: any[] | undefined = undefined;

      if (choice.nextMessageId === 'maggie_reply_nathaniel') {
        replyText = 'Hum, Nathaniel é meio certinho, mas ele é fofo mesmo! Aposto que ele vai gostar de você se você for educada!';
      } else if (choice.nextMessageId === 'maggie_reply_castiel') {
        replyText = 'Ui, gosta dos rebeldes, né? Hahaha! O Castiel finge que não liga pra ninguém, mas aposto que no fundo ele gostou do seu atrevimento!';
      } else if (choice.nextMessageId === 'maggie_reply_neutral') {
        replyText = 'Justo! O primeiro dia é pra analisar o terreno mesmo. Me conta se algum deles fizer algo interessante!';
      } else if (choice.nextMessageId === 'kami_reply_flirt') {
        replyText = 'Hum... você é bem ousada para quem acabou de chegar. Mas não vou fingir que não gostei. Te vejo no pátio amanhã, Veronica.';
      } else if (choice.nextMessageId === 'kami_reply_friendly') {
        replyText = 'Entendo. O pátio é o melhor lugar para fugir do barulho dos corredores. Até amanhã.';
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
      const cleanText = text.toLowerCase().trim();
      if (characterId === 'maggie' && (cleanText === 'ei maggie canta decode paramore' || cleanText === 'ei meggie canta decode paramore')) {
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
      playerPA: 99999,
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

  setStoryStage: (stage) => {
    set({ storyStage: stage });
    saveLocalProgress({
      currentNodeId: get().currentNodeId,
      playerPA: get().playerPA,
      playerGold: get().playerGold,
      affinities: get().affinities,
      unlockedTips: get().unlockedTips,
      unlockedEpisodes: get().unlockedEpisodes,
      activeEpisodeId: get().activeEpisodeId,
      unlockedCGs: get().unlockedCGs,
      storyStage: stage,
      cluesFound: get().cluesFound,
      currentLocationId: get().currentLocationId,
    });
  },

  collectClue: (clueId) => {
    set((state) => {
      const nextClues = state.cluesFound.includes(clueId)
        ? state.cluesFound
        : [...state.cluesFound, clueId];
      saveLocalProgress({
        currentNodeId: state.currentNodeId,
        playerPA: state.playerPA,
        playerGold: state.playerGold,
        affinities: state.affinities,
        unlockedTips: state.unlockedTips,
        unlockedEpisodes: state.unlockedEpisodes,
        activeEpisodeId: state.activeEpisodeId,
        unlockedCGs: state.unlockedCGs,
        storyStage: state.storyStage,
        cluesFound: nextClues,
        currentLocationId: state.currentLocationId,
      });
      return { cluesFound: nextClues };
    });
  },

  changeLocation: (locationId) => {
    if (get().playerPA < 10) {
      set({ errorMsg: 'Saldo de PA Insuficiente' });
      get().playSound('choice');
      return;
    }

    get().playSound('click');
    let entryNodeId = 'start';
    if (locationId === 'patio') {
      entryNodeId = 'search-courtyard';
    } else if (locationId === 'quadra') {
      entryNodeId = 'search-quadra';
    } else if (locationId === 'galpao') {
      entryNodeId = 'search-galpao';
    } else if (locationId === 'cinema') {
      entryNodeId = 'search-cinema';
    }

    const currentStoryMap = get().storyTree['start'] ? get().storyTree : mockStory;
    const entryNode = currentStoryMap[entryNodeId];
    const nextPA = get().playerPA - 10;

    if (entryNode) {
      set({
        currentLocationId: locationId,
        currentNodeId: entryNodeId,
        currentSpeaker: entryNode.characterName,
        currentText: entryNode.text,
        backgroundUrl: entryNode.backgroundUrl,
        choices: entryNode.choices,
        playerPA: nextPA,
      });

      saveLocalProgress({
        currentNodeId: entryNodeId,
        playerPA: nextPA,
        playerGold: get().playerGold,
        affinities: get().affinities,
        unlockedTips: get().unlockedTips,
        unlockedEpisodes: get().unlockedEpisodes,
        activeEpisodeId: get().activeEpisodeId,
        unlockedCGs: get().unlockedCGs,
        storyStage: get().storyStage,
        cluesFound: get().cluesFound,
        currentLocationId: locationId,
      });
    }
  },

  tryRandomMessage: () => {
    const state = get();
    // 15% chance to trigger
    if (Math.random() > 0.15) return;
    
    // Only characters we have met
    const met = state.metCharacters || [];
    if (met.length === 0) return;

    // Pick a random met character
    const randomChar = met[Math.floor(Math.random() * met.length)];

    // Random phrases for each character
    const phrases: Record<string, string[]> = {
      castiel: [
        'Ainda acordada? Que tédio.',
        'Meu cachorro tá comendo meu sofá... de novo.',
        'Você vai pro pátio amanhã? Talvez eu passe lá.',
        'Hmph. Não vai dormir não?',
        'Tocando um pouco de guitarra aqui pra matar o tempo.'
      ],
      nathaniel: [
        'Boa noite! Conseguiu revisar a matéria de hoje?',
        'O grêmio deu muito trabalho hoje, mas finalmente terminei.',
        'Você prefere romances ou mistérios na literatura?',
        'Espero que você tenha um ótimo dia amanhã!',
        'Lembre-se de não chegar atrasada amanhã. Até mais!'
      ],
      lysandre: [
        'A lua está belíssima hoje, não acha?',
        'Acabei de compor alguns versos novos. Talvez te mostre amanhã.',
        'Por acaso você não viu meu bloco de notas por aí, viu?',
        'O silêncio da noite é inspirador.',
        'Boa noite, senhorita. Durma bem.'
      ],
      remi: [
        'Chérie, as cartas me disseram que você estava pensando em mim.',
        'A roda da fortuna está girando ao nosso favor.',
        'Já separou o look de amanhã? O grêmio espera por nós.',
        'Que as estrelas guiem seus sonhos esta noite.',
        'Sinto uma energia muito positiva vindo de você hoje.'
      ],
      harry: [
        'E aí?! Tá fazendo o que?',
        'Eu tava pensando aqui... amanhã a gente podia dar uma volta na escola!',
        'Cara, que fome! Tem algum lanche aí?',
        'Ahn... oi. Só passando pra dar oi mesmo.',
        'Você acha que eu devia trocar a cor do meu cabelo de novo?'
      ],
      maggie: [
        'Menina, você não sabe o babado!!',
        'Tá acordada ainda? Vamos fazer uma fofoca rápida!',
        'Odiei a atividade de hoje, juro. Muito chata!',
        'E aí, já decidiu se tá de olho em alguém da escola? 👀',
        'Ai que tédio! Manda algo pra assistir?'
      ],
      kami: [
        'O silêncio do pátio faz falta de noite.',
        'Espero que não esteja perdendo o sono à toa.',
        'Eu? Só observando as estrelas da minha janela.',
        'Você é bem curiosa, sabia?',
        'Até amanhã. Tente não arrumar confusão.'
      ]
    };

    const charPhrases = phrases[randomChar];
    if (!charPhrases) return;

    const randomPhrase = charPhrases[Math.floor(Math.random() * charPhrases.length)];
    
    // Check if there is already a thread, and if the last message was less than 5 minutes ago to avoid spam
    const thread = state.chatThreads.find(t => t.characterId === randomChar);
    if (thread && thread.messages.length > 0) {
      const lastMsg = thread.messages[thread.messages.length - 1];
      // Since timestamp is 'HH:MM', we just avoid sending if there's unread
      if (thread.unread) return;
    }

    state.triggerIncomingText(randomChar, randomPhrase);
  },
}));
