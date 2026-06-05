'use client';

import React, { useEffect } from 'react';
import { GameContainer } from './GameContainer';
import { Cenario } from './Cenario';
import { SpriteCharacter } from './SpriteCharacter';
import { DialogueBox } from './DialogueBox';
import { ChoiceOverlay } from './ChoiceOverlay';
import { useGameStore } from '@/store/useGameStore';
import { XCircle } from 'lucide-react';

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
    isLoading
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

  const handleSelectChoice = (choice: any) => {
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
