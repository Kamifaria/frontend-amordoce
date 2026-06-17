'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { GameContainer } from './GameContainer';
import { Cenario } from './Cenario';
import { SpriteCharacter } from './SpriteCharacter';
import { DialogueBox } from './DialogueBox';
import { useGameStore } from '@/store/useGameStore';
import { 
  XCircle, 
  Smartphone, 
  Coins, 
  RefreshCw, 
  LogOut, 
  Volume2, 
  VolumeX, 
  Heart,
  BookOpen,
  Map
} from 'lucide-react';
import { PhoneOverlay } from './PhoneOverlay';
import { MapOverlay } from './MapOverlay';
import { CGOverlay } from './CGOverlay';
import { EpisodeFinishedOverlay } from './EpisodeFinishedOverlay';
import { GuitarMinigame } from './minigames/GuitarMinigame';
import { PaintingMinigame } from './minigames/PaintingMinigame';
import { LysandreMemoryGame } from './minigames/LysandreMemoryGame';
import { RemiTarotGame } from './minigames/RemiTarotGame';
import { NathanielSwipeGame } from './minigames/NathanielSwipeGame';
import { CastielEscapeGame } from './minigames/CastielEscapeGame';
import { ClothingShop } from './ClothingShop';
import { Choice } from '@/shared/types';
import { mockStory } from '@/mock/storyData';

export const GameScreen: React.FC = () => {
  const router = useRouter();
  const [isMapOpen, setIsMapOpen] = React.useState(false);
  const [activeCG, setActiveCG] = React.useState<{ url: string; id: string } | null>(null);
  const {
    currentNodeId,
    playerPA,
    playerGold,
    currentSpeaker,
    currentText,
    backgroundUrl,
    choices,
    storyTree,
    activeMinigame,
    fetchCurrentGameState,
    advance,
    errorMsg,
    clearError,
    isLoading,
    togglePhone,
    isMuted,
    toggleMute,
    affinityNotifications,
    initStory,
    storyStage,
    setView,
    currentLocationId
  } = useGameStore();

  // Load game state on mount
  useEffect(() => {
    fetchCurrentGameState();
  }, [fetchCurrentGameState]);

  const activeNode = storyTree[currentNodeId] || mockStory[currentNodeId];
  const isChoiceActive = !!(choices && choices.length > 0);

  useEffect(() => {
    if (activeNode && activeNode.cgUrl) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveCG({ url: activeNode.cgUrl, id: activeNode.id });
    }
  }, [activeNode]);

  const handleAdvance = () => {
    if (isChoiceActive || isLoading) return;
    advance();
  };

  const handleSelectChoice = (choice: Choice) => {
    if (isLoading) return;
    // Find index of choice
    const index = choices?.findIndex(c => c.nextNodeId === choice.nextNodeId) ?? -1;
    if (index !== -1) {
      advance(index);
    }
  };

  const handleRestart = () => {
    initStory(mockStory, 'start', 100, 50);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full">
      {/* Visual Novel Fixed Aspect Board */}
      {currentNodeId ? (
        <GameContainer>
          {/* Top HUD Bar (Unified and isolated within game container) */}
          <div className="absolute top-2 md:top-4 left-2 md:left-4 right-2 md:right-4 z-30 flex flex-col md:flex-row justify-between items-start md:items-center gap-2 pointer-events-auto select-none">
            {/* PA & Gold counters */}
            <div className="flex items-center gap-2 md:gap-3 bg-[#120e24]/75 backdrop-blur-md px-3 md:px-4 py-1.5 md:py-2 rounded-xl md:rounded-2xl border border-white/10 shadow-lg text-[10px] md:text-xs font-bold text-white tracking-wide transition-all hover:bg-[#120e24]/85">
              <div className="flex items-center gap-1.5 text-pink-400 hover:scale-105 transition-transform">
                <Heart size={14} className="fill-pink-500/20 text-pink-500 animate-pulse" />
                <span>PA: <span className="text-white text-sm font-extrabold">{playerPA}</span></span>
              </div>
              <div className="w-[1px] bg-white/20 self-stretch" />
              <div className="flex items-center gap-1.5 text-amber-400 hover:scale-105 transition-transform">
                <Coins size={14} className="fill-amber-400/20 text-amber-400" />
                <span>Gold: <span className="text-white text-sm font-extrabold">${playerGold}</span></span>
              </div>
            </div>

            {/* Top Bar Actions */}
            <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
              {/* Mute Button */}
              <button
                onClick={toggleMute}
                title={isMuted ? 'Ativar som' : 'Desativar som'}
                className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#120e24]/75 backdrop-blur-md text-slate-300 hover:text-white border border-white/10 hover:bg-[#1b1736]/80 transition-all cursor-pointer"
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>

              {/* Restart Button */}
              <button
                onClick={handleRestart}
                title="Reiniciar História"
                className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#120e24]/75 backdrop-blur-md text-purple-300 hover:text-purple-200 border border-white/10 hover:bg-[#1b1736]/80 transition-all cursor-pointer"
              >
                <RefreshCw size={16} />
              </button>

              {/* Episodes Button */}
              <button
                onClick={() => setView('lobby')}
                title="Voltar ao Lobby"
                className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#120e24]/75 backdrop-blur-md text-pink-300 hover:text-pink-200 border border-white/10 hover:bg-[#1b1736]/80 transition-all cursor-pointer"
              >
                <BookOpen size={16} />
              </button>

              {storyStage !== 'INTRO' && (
                <button
                  onClick={() => setIsMapOpen(true)}
                  title="Abrir Mapa"
                  className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#120e24]/75 backdrop-blur-md text-emerald-300 hover:text-emerald-200 border border-white/10 hover:bg-[#1b1736]/80 transition-all cursor-pointer"
                >
                  <Map size={16} />
                </button>
              )}

              {/* Phone Button */}
              <button
                onClick={togglePhone}
                title="Abrir Celular"
                className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 text-white shadow-md active:scale-95 hover:brightness-110 transition-all cursor-pointer border border-white/10"
              >
                <Smartphone size={16} />
              </button>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                title="Sair"
                className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#120e24]/75 backdrop-blur-md text-slate-400 hover:text-red-400 border border-white/10 hover:bg-red-950/20 transition-all cursor-pointer"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>

          {/* Floating relationship notifications overlay */}
          <div className="absolute right-4 top-16 z-40 flex flex-col gap-2 pointer-events-none">
            <AnimatePresence>
              {affinityNotifications.map((notif) => (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, y: 30, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -40, scale: 0.8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="flex items-center gap-2 bg-[#120e24]/90 border border-pink-500/30 px-4 py-2 rounded-full shadow-lg backdrop-blur-md text-xs font-bold text-white"
                >
                  <Heart size={14} className="text-pink-500 fill-pink-500 animate-pulse" />
                  <span className="capitalize">{notif.characterId}:</span>
                  <span className={notif.amount > 0 ? 'text-green-400' : 'text-red-400'}>
                    {notif.amount > 0 ? `+${notif.amount}` : notif.amount} LOM
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Background Scene — SpriteCharacter is inside so PNG transparency shows the scene bg */}
          <Cenario backgroundUrl={backgroundUrl}>
            {currentNodeId !== 'demo-end-loop' && activeNode && (
              <>
                {activeNode.sprites ? (
                  activeNode.sprites.map((sprite, idx) => (
                    <SpriteCharacter
                      key={`${sprite.name}-${idx}`}
                      characterName={sprite.name}
                      expression={sprite.expression}
                      position={sprite.position}
                      outfit={sprite.outfit}
                    />
                  ))
                ) : activeNode.characterName ? (
                  <SpriteCharacter
                    characterName={activeNode.characterName}
                    expression={activeNode.expression}
                    position="centro"
                  />
                ) : null}
              </>
            )}
          </Cenario>

          {currentNodeId === 'demo-end-loop' ? (
            <EpisodeFinishedOverlay
              onRestart={handleRestart}
              onOpenPhone={togglePhone}
            />
          ) : (
            <>
              {/* Dialogue Box */}
              <DialogueBox
                speakerName={currentSpeaker}
                text={currentText}
                onAdvance={handleAdvance}
                isChoiceActive={isChoiceActive}
                choices={choices}
                onSelectChoice={handleSelectChoice}
                playerPA={playerPA}
              />
            </>
          )}

          {/* Floating PA/Gold Warning Alert Overlay */}
          {errorMsg && (
            <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-red-950/90 border border-red-500/30 text-red-200 px-5 py-3 rounded-xl shadow-2xl backdrop-blur-md animate-bounce">
              <XCircle className="text-red-500" size={18} />
              <span className="text-sm font-semibold tracking-wide">{errorMsg}</span>
              <button 
                onClick={clearError}
                className="text-xs uppercase font-bold text-red-400 hover:text-white px-2 py-0.5 rounded border border-red-500/20 bg-red-900/10 cursor-pointer ml-2"
              >
                OK
              </button>
            </div>
          )}
          {/* Smartphone Overlay */}
          <PhoneOverlay />

          {/* Minigame Overlay */}
          {activeMinigame === 'guitar' && <GuitarMinigame />}
          {activeMinigame === 'painting' && <PaintingMinigame />}
          {activeMinigame === 'memory' && <LysandreMemoryGame />}
          {activeMinigame === 'tarot' && <RemiTarotGame />}
          {activeMinigame === 'swipe' && <NathanielSwipeGame />}
          {activeMinigame === 'escape' && <CastielEscapeGame />}

          {/* Map Overlay */}
          <MapOverlay isOpen={isMapOpen} onClose={() => setIsMapOpen(false)} />

          {/* CG Overlay */}
          <CGOverlay cgUrl={activeCG?.url || ''} cgId={activeCG?.id || ''} isOpen={!!activeCG} onClose={() => setActiveCG(null)} />

          {/* Clothing Shop Overlay */}
          {currentLocationId === 'shop' && <ClothingShop />}
        </GameContainer>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500" />
          <p className="text-sm text-pink-300 tracking-wider">Carregando Sweet Amoris...</p>
        </div>
      )}
    </div>
  );
};
