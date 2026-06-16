'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useGameStore } from '../../../store/useGameStore';

const CARDS_DATA = [
  { id: 'lovers', type: 'The Lovers', icon: '❤️' },
  { id: 'death', type: 'Death', icon: '💀' },
  { id: 'devil', type: 'The Devil', icon: '😈' },
];

export const RemiTarotGame: React.FC = () => {
  const { endMinigame } = useGameStore();
  const [gameState, setGameState] = useState<'show' | 'shuffling' | 'guess' | 'result'>('show');
  const [positions, setPositions] = useState([0, 1, 2]);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  useEffect(() => {
    // Sequência do jogo
    setTimeout(() => {
      setGameState('shuffling');
      
      let shuffles = 0;
      const shuffleInterval = setInterval(() => {
        setPositions(prev => {
          const newPos = [...prev];
          const i = Math.floor(Math.random() * 3);
          const j = Math.floor(Math.random() * 3);
          [newPos[i], newPos[j]] = [newPos[j], newPos[i]];
          return newPos;
        });
        
        shuffles++;
        if (shuffles > 15) {
          clearInterval(shuffleInterval);
          setGameState('guess');
        }
      }, 300);

    }, 3000); // 3 segundos mostrando as cartas
  }, []);

  const handleCardClick = (index: number) => {
    if (gameState !== 'guess') return;
    
    setSelectedCard(index);
    setGameState('result');

    setTimeout(() => {
      // Index in the positions array maps to the card.
      // positions[0] is where card 0 is.
      // We clicked on screen position 'index'. 
      // We need to find which card ID is at this screen position.
      const cardIdAtPosition = positions.indexOf(index);
      const cardType = CARDS_DATA[cardIdAtPosition].id;

      if (cardType === 'lovers') {
        endMinigame(100, { characterId: 'remi', amount: 15 });
      } else {
        endMinigame(0, { characterId: 'remi', amount: -5 });
      }
    }, 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 z-[100] flex items-center justify-center bg-[#0f0c1b]/95 backdrop-blur-md p-4"
    >
      <div className="max-w-3xl w-full flex flex-col items-center">
        <div className="flex flex-col items-center mb-12 text-center">
          <Sparkles className="text-purple-400 w-12 h-12 mb-4 animate-pulse" />
          <h2 className="text-3xl font-serif text-purple-200 font-bold">O Jogo do Destino</h2>
          <p className="text-purple-300 mt-2">
            {gameState === 'show' && "Observe bem. Onde está a carta 'Os Enamorados' (The Lovers)?"}
            {gameState === 'shuffling' && "Os fios do destino se entrelaçam..."}
            {gameState === 'guess' && "Faça sua escolha. Onde está o amor?"}
            {gameState === 'result' && "As cartas revelam a verdade..."}
          </p>
        </div>

        <div className="relative w-full h-64 md:h-80 flex justify-center items-center">
          {CARDS_DATA.map((card, i) => {
            const screenPosition = positions[i]; // 0 (left), 1 (center), 2 (right)
            const xOffset = (screenPosition - 1) * 120; // -120px, 0px, 120px
            
            const isRevealed = gameState === 'show' || gameState === 'result';
            const isSelected = selectedCard === screenPosition;

            return (
              <motion.div
                key={card.id}
                onClick={() => handleCardClick(screenPosition)}
                className="absolute w-24 h-36 md:w-32 md:h-48 cursor-pointer preserve-3d"
                animate={{ 
                  x: xOffset,
                  rotateY: isRevealed ? 0 : 180,
                  scale: isSelected ? 1.1 : 1,
                  y: isSelected ? -20 : 0
                }}
                transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                whileHover={gameState === 'guess' ? { scale: 1.05 } : {}}
              >
                {/* Frente (Conteúdo) */}
                <div className="absolute w-full h-full backface-hidden bg-[#2a1b38] border-2 border-purple-500/50 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.3)] flex flex-col items-center justify-center p-2">
                  <span className="text-4xl md:text-5xl mb-2">{card.icon}</span>
                  <span className="text-purple-200 font-serif text-sm font-bold text-center">{card.type}</span>
                </div>

                {/* Verso (Costas) */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-[#150e24] border-2 border-purple-900 rounded-xl flex items-center justify-center p-2">
                  <div className="w-full h-full border border-purple-800/50 rounded-lg flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]">
                    <Sparkles className="text-purple-800/50 w-8 h-8" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
