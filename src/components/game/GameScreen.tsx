'use client';

import React, { useEffect } from 'react';
import { GameContainer } from './GameContainer';
import { Cenario } from './Cenario';
import { SpriteCharacter } from './SpriteCharacter';
import { DialogueBox } from './DialogueBox';
import { ChoiceOverlay } from './ChoiceOverlay';
import { useGameStore } from '@/store/useGameStore';
import { XCircle, Smartphone, Sparkles, Coins } from 'lucide-react';
import { PhoneOverlay } from './PhoneOverlay';
import { Choice } from '@/shared/types';

export const GameScreen: React.FC = () => {
  const {
    currentNodeId,
    playerPA,
    playerGold,
    currentSpeaker,
    currentText,
    backgroundUrl,
    choices,
    storyTree,
    fetchCurrentGameState,
    advance,
    errorMsg,
    clearError,
    isLoading,
    togglePhone
  } = useGameStore();

  // Load game state on mount
  useEffect(() => {
    fetchCurrentGameState();
  }, [fetchCurrentGameState]);

  const activeNode = storyTree[currentNodeId];
  const isChoiceActive = !!(choices && choices.length > 0);

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

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full">
      {/* Visual Novel Fixed Aspect Board */}
      {currentNodeId ? (
        <GameContainer>
          {/* Top HUD Bar */}
          <div className="absolute top-4 left-4 right-4 z-30 flex justify-between items-center pointer-events-auto">
            {/* PA & Gold counters */}
            <div className="flex gap-3 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 shadow-lg text-xs font-bold text-white tracking-wide">
              <div className="flex items-center gap-1.5 text-pink-400">
                <Sparkles size={14} className="animate-pulse" />
                <span>PA: {playerPA}</span>
              </div>
              <div className="w-[1px] bg-white/20 self-stretch" />
              <div className="flex items-center gap-1.5 text-amber-400">
                <Coins size={14} />
                <span>Gold: {playerGold}</span>
              </div>
            </div>

            {/* Phone Button */}
            <button
              onClick={togglePhone}
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 text-white shadow-lg active:scale-95 hover:brightness-110 transition-all cursor-pointer border border-white/10"
            >
              <Smartphone size={20} />
            </button>
          </div>

          {/* Background Scene */}
          <Cenario backgroundUrl={backgroundUrl} />

          {/* Sprite Character Overlay */}
          {activeNode && (
            <SpriteCharacter 
              characterName={activeNode.characterName} 
              expression={activeNode.expression}
              position="centro"
            />
          )}

          {/* Dialogue Box */}
          <DialogueBox
            speakerName={currentSpeaker}
            text={currentText}
            onAdvance={handleAdvance}
            isChoiceActive={isChoiceActive}
          />

          {/* Decision choices */}
          {isChoiceActive && choices && (
            <ChoiceOverlay
              choices={choices}
              onSelectChoice={handleSelectChoice}
              playerPA={playerPA}
            />
          )}

          {/* Smartphone Overlay */}
          <PhoneOverlay />

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
