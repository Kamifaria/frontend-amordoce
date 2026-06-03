'use client';

import React, { useEffect } from 'react';
import { GameContainer } from '@/components/game/GameContainer';
import { Cenario } from '@/components/game/Cenario';
import { SpriteCharacter } from '@/components/game/SpriteCharacter';
import { DialogueBox } from '@/components/game/DialogueBox';
import { ChoiceOverlay } from '@/components/game/ChoiceOverlay';
import { useGameStore } from '@/store/useGameStore';
import { mockStory } from '@/mock/storyData';
import { Heart, Coins, RefreshCw } from 'lucide-react';

export default function Home() {
  const {
    currentNodeId,
    playerPA,
    playerGold,
    currentSpeaker,
    currentText,
    backgroundUrl,
    choices,
    storyTree,
    initStory,
    nextNode,
    selectChoice,
  } = useGameStore();

  // Load the mock story flow on initial page load
  useEffect(() => {
    initStory(mockStory, 'start', 100, 50);
  }, [initStory]);

  const activeNode = storyTree[currentNodeId];
  const isChoiceActive = !!(choices && choices.length > 0);

  const handleRestart = () => {
    initStory(mockStory, 'start', 100, 50);
  };

  return (
    <div className="min-h-screen bg-[#0f0c1b] text-slate-100 flex flex-col items-center justify-center font-sans">
      
      {/* Header Info / Stat Bar */}
      <div className="absolute top-4 left-4 right-4 z-40 flex items-center justify-between pointer-events-none">
        <div className="flex gap-4 pointer-events-auto">
          {/* PA Stats */}
          <div className="flex items-center gap-2 rounded-full border border-pink-500/20 bg-[#120e24]/80 px-4 py-1.5 shadow-lg backdrop-blur-md">
            <Heart className="text-pink-500 fill-pink-500" size={18} />
            <div className="text-xs font-bold tracking-wider text-pink-300">
              PA: <span className="text-white text-sm">{playerPA}</span>
            </div>
          </div>

          {/* Gold Stats */}
          <div className="flex items-center gap-2 rounded-full border border-amber-500/20 bg-[#120e24]/80 px-4 py-1.5 shadow-lg backdrop-blur-md">
            <Coins className="text-amber-400 fill-amber-400" size={18} />
            <div className="text-xs font-bold tracking-wider text-amber-300">
              Gold: <span className="text-white text-sm">${playerGold}</span>
            </div>
          </div>
        </div>

        {/* Restart Button */}
        <button 
          onClick={handleRestart}
          className="flex items-center gap-2 rounded-full border border-purple-500/20 bg-[#120e24]/80 hover:bg-purple-950/60 transition-all px-4 py-1.5 shadow-lg backdrop-blur-md text-xs font-bold uppercase tracking-wider text-purple-300 pointer-events-auto cursor-pointer"
        >
          <RefreshCw size={14} />
          Reiniciar
        </button>
      </div>

      {/* Main Game Frame */}
      {currentNodeId ? (
        <GameContainer>
          {/* Cenario (Background image with Crossfade Transition) */}
          <Cenario backgroundUrl={backgroundUrl} />

          {/* Sprite Character (Render characters with transitions based on state) */}
          {activeNode && (
            <SpriteCharacter 
              characterName={activeNode.characterName} 
              expression={activeNode.expression}
              position="centro"
            />
          )}

          {/* Dialogue Box (Controls dialogue text, typewriter effect, click-skips) */}
          <DialogueBox
            speakerName={currentSpeaker}
            text={currentText}
            onAdvance={nextNode}
            isChoiceActive={isChoiceActive}
          />

          {/* Choices Overlay (Shows buttons when branching paths exist) */}
          {isChoiceActive && choices && (
            <ChoiceOverlay
              choices={choices}
              onSelectChoice={selectChoice}
              playerPA={playerPA}
            />
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
}
