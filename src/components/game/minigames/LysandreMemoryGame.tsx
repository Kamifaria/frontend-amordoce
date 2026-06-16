'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, CheckCircle, XCircle } from 'lucide-react';
import { useGameStore } from '../../../store/useGameStore';

const POEM_PAIRS = [
  { id: 1, textA: 'O vento sopra', textB: 'A alma chora', matchId: 'A' },
  { id: 2, textA: 'Olhos profundos', textB: 'Segredos do mundo', matchId: 'B' },
  { id: 3, textA: 'Pétala caída', textB: 'Tristeza da vida', matchId: 'C' },
  { id: 4, textA: 'Amor distante', textB: 'Dor constante', matchId: 'D' },
];

export const LysandreMemoryGame: React.FC = () => {
  const { endMinigame, changeAffinity } = useGameStore();
  const [cards, setCards] = useState<{ id: string; text: string; matchId: string; isFlipped: boolean; isMatched: boolean }[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);

  useEffect(() => {
    // Preparar as cartas
    const preparedCards = POEM_PAIRS.flatMap(pair => [
      { id: `${pair.id}-A`, text: pair.textA, matchId: pair.matchId, isFlipped: false, isMatched: false },
      { id: `${pair.id}-B`, text: pair.textB, matchId: pair.matchId, isFlipped: false, isMatched: false }
    ]).sort(() => Math.random() - 0.5);
    
    setCards(preparedCards);
  }, []);

  const handleCardClick = (index: number) => {
    if (flippedCards.length >= 2 || cards[index].isFlipped || cards[index].isMatched) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const card1 = newCards[newFlipped[0]];
      const card2 = newCards[newFlipped[1]];

      if (card1.matchId === card2.matchId) {
        // Match!
        setTimeout(() => {
          setCards(prev => prev.map(c => c.matchId === card1.matchId ? { ...c, isMatched: true } : c));
          setFlippedCards([]);
          setMatches(m => {
            const newM = m + 1;
            if (newM === POEM_PAIRS.length) {
              setTimeout(() => {
                changeAffinity('lysandre', 15);
                endMinigame(100);
              }, 1000);
            }
            return newM;
          });
        }, 800);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map((c, i) => newFlipped.includes(i) ? { ...c, isFlipped: false } : c));
          setFlippedCards([]);
        }, 1200);
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
    >
      <div className="max-w-2xl w-full bg-[#1e2520] border-4 border-[#3a473e] rounded-xl p-6 shadow-2xl flex flex-col items-center">
        <div className="flex flex-col items-center mb-6">
          <BookOpen className="text-emerald-500 w-12 h-12 mb-2" />
          <h2 className="text-2xl font-serif text-emerald-100 font-bold text-center">Os Poemas Perdidos</h2>
          <p className="text-emerald-300 text-sm text-center">Ajude o Lysandre a organizar suas rimas que voaram com o vento.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full perspective-1000">
          <AnimatePresence>
            {cards.map((card, idx) => (
              <motion.div
                key={card.id}
                onClick={() => handleCardClick(idx)}
                className="relative aspect-[3/4] cursor-pointer"
                whileHover={{ scale: card.isFlipped ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="w-full h-full absolute preserve-3d"
                  initial={false}
                  animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
                  transition={{ duration: 0.4, type: 'spring', stiffness: 200, damping: 20 }}
                >
                  {/* Frente (costas da carta) */}
                  <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-[#2a362f] to-[#18201b] border-2 border-[#455c4d] rounded-lg shadow-lg flex items-center justify-center">
                    <BookOpen className="text-[#455c4d] opacity-50 w-8 h-8" />
                  </div>
                  
                  {/* Verso (conteúdo) */}
                  <div 
                    className={`absolute w-full h-full backface-hidden rounded-lg shadow-lg flex items-center justify-center p-3 text-center rotate-y-180 border-2 ${card.isMatched ? 'bg-emerald-900 border-emerald-400' : 'bg-[#e2dac6] border-[#c0b599]'}`}
                  >
                    <p className={`font-serif text-sm md:text-base font-bold ${card.isMatched ? 'text-emerald-200' : 'text-[#5a4f3b]'}`}>
                      {card.text}
                    </p>
                    {card.isMatched && <CheckCircle className="absolute bottom-2 right-2 text-emerald-400 w-5 h-5 opacity-50" />}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
