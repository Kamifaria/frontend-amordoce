'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { TarotCard } from '../../shared/types';

const TAROT_DECK: TarotCard[] = [
  {
    id: 'wheel',
    name: 'A Roda da Fortuna',
    description: 'A sorte gira a seu favor. Você ganhou pontos adicionais para agir na escola!',
    rewardType: 'PA',
    rewardAmount: 30,
    image: '🔮',
  },
  {
    id: 'sun',
    name: 'O Sol',
    description: 'Um dia radiante! Você ganhou moedas extras de ouro para gastar na loja.',
    rewardType: 'Gold',
    rewardAmount: 20,
    image: '☀️',
  },
  {
    id: 'star',
    name: 'A Estrela',
    description: 'Sua estrela guia brilha. Um presente inesperado de Pontos de Ação!',
    rewardType: 'PA',
    rewardAmount: 20,
    image: '⭐',
  },
  {
    id: 'lovers',
    name: 'Os Enamorados',
    description: 'O amor está no ar. Sua energia de flerte rendeu pontos adicionais.',
    rewardType: 'PA',
    rewardAmount: 25,
    image: '💖',
  },
  {
    id: 'empress',
    name: 'A Imperatriz',
    description: 'Fartura e prosperidade. O ouro flui para o seu bolso.',
    rewardType: 'Gold',
    rewardAmount: 15,
    image: '👑',
  },
];

export const TarotDraw: React.FC = () => {
  const { lastDailyDraw, drawTarot, playSound } = useGameStore();
  const [selectedCardIdx, setSelectedCardIdx] = useState<number | null>(null);
  const [revealedCard, setRevealedCard] = useState<TarotCard | null>(null);
  const [shuffledCards, setShuffledCards] = useState<TarotCard[]>([]);
  const [cooldownRemaining, setCooldownRemaining] = useState<string>('');

  // Check cooldown status
  const checkCooldown = () => {
    if (!lastDailyDraw) return false;
    const now = Date.now();
    const oneDayMs = 24 * 60 * 60 * 1000;
    const elapsed = now - lastDailyDraw;
    
    if (elapsed < oneDayMs) {
      const remainingMs = oneDayMs - elapsed;
      const hours = Math.floor(remainingMs / (1000 * 60 * 60));
      const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
      setCooldownRemaining(`${hours}h ${minutes}m`);
      return true;
    }
    return false;
  };

  const isLocked = lastDailyDraw ? checkCooldown() : false;

  useEffect(() => {
    // Shuffling a selection of 3 cards from the deck
    const shuffled = [...TAROT_DECK].sort(() => Math.random() - 0.5).slice(0, 3);
    setShuffledCards(shuffled);

    // Keep cooldown timer updated
    const interval = setInterval(() => {
      checkCooldown();
    }, 30000);

    return () => clearInterval(interval);
  }, [lastDailyDraw]);

  const handleCardClick = (idx: number) => {
    if (isLocked || selectedCardIdx !== null) return;

    playSound('heart');
    setSelectedCardIdx(idx);
    
    const card = shuffledCards[idx];
    setRevealedCard(card);

    // Conceder a recompensa
    setTimeout(() => {
      drawTarot(card.rewardType, card.rewardAmount);
    }, 800);
  };

  return (
    <div className="w-full flex flex-col md:flex-row gap-8 items-center bg-white/5 backdrop-blur-md border border-purple-500/10 rounded-2xl p-6 md:p-8 relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute -left-20 -bottom-20 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Left side: Remi Banner */}
      <div className="flex-1 text-center md:text-left space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-full text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" /> Tiragem Diária
        </div>
        <h3 className="text-2xl font-black text-white tracking-wide">
          O Tarô do Destino de Remi
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed font-medium">
          "Deixe as cartas guiarem seus passos na Sweet Amoris, chérie. Uma vez por dia, puxe uma carta de tarô do meu deck e receba minha bênção na forma de PA ou moedas de Ouro!"
        </p>

        {isLocked && (
          <div className="flex items-center justify-center md:justify-start gap-2 text-pink-400 bg-pink-500/10 border border-pink-500/20 px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide w-fit">
            <Calendar className="w-4 h-4" />
            <span>Próxima tiragem liberada em: {cooldownRemaining}</span>
          </div>
        )}
      </div>

      {/* Right side: Tarot cards draw panel */}
      <div className="flex-[1.2] w-full flex justify-center gap-4 py-4">
        {shuffledCards.length > 0 && shuffledCards.map((card, idx) => {
          const isSelected = selectedCardIdx === idx;
          const isAnySelected = selectedCardIdx !== null;

          return (
            <div 
              key={idx}
              className="relative w-24 sm:w-28 aspect-[5/8] perspective"
            >
              <motion.div
                onClick={() => handleCardClick(idx)}
                className={`w-full h-full rounded-xl cursor-pointer preserve-3d transition-transform duration-700 shadow-xl relative border ${
                  isSelected 
                    ? 'border-purple-400 shadow-purple-500/20' 
                    : isLocked 
                    ? 'border-white/5 cursor-not-allowed opacity-40' 
                    : 'border-purple-500/30 hover:border-purple-400'
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isSelected ? 'rotateY(180deg) scale(1.08)' : 'rotateY(0deg)',
                }}
                whileHover={!isLocked && !isAnySelected ? { y: -8, scale: 1.05 } : {}}
              >
                {/* Front face (Card Back) */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-xl bg-gradient-to-b from-[#1b103c] to-[#0b081e] flex flex-col items-center justify-center border-2 border-amber-500/40 overflow-hidden backface-hidden"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  {/* Mystic card art */}
                  <div className="w-[85%] h-[90%] border border-amber-500/20 rounded-lg flex flex-col items-center justify-between py-4 relative">
                    <div className="text-[10px] text-amber-500/50 uppercase tracking-widest font-extrabold">Remi</div>
                    <div className="w-10 h-10 border border-amber-500/30 rounded-full flex items-center justify-center text-amber-400 text-lg shadow-inner">
                      🔮
                    </div>
                    <div className="text-[10px] text-amber-500/50 uppercase tracking-widest font-extrabold">Tarot</div>
                  </div>
                </div>

                {/* Back face (Card Front - Revealed) */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-xl bg-[#120e2e] flex flex-col items-center justify-between p-3 border-2 border-pink-500/40 text-center backface-hidden"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <div className="w-full border border-pink-500/20 rounded-lg h-full flex flex-col items-center justify-between py-2.5">
                    <span className="text-[9px] font-bold text-pink-400 uppercase tracking-wide">
                      Revelada
                    </span>

                    <span className="text-3xl filter drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]">
                      {card.image}
                    </span>

                    <div className="space-y-0.5">
                      <h4 className="text-[10px] sm:text-xs font-black text-white truncate max-w-[80px] sm:max-w-[100px] leading-tight">
                        {card.name}
                      </h4>
                      <p className="text-[10px] font-black text-yellow-300 tracking-wider">
                        +{card.rewardAmount} {card.rewardType}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
      
      {/* Revealed modal overlay */}
      <AnimatePresence>
        {revealedCard && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 z-30 bg-[#0d0a21]/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="text-4xl mb-2 filter drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]">
              {revealedCard.image}
            </div>
            <h4 className="text-xl font-black text-pink-300 mb-1">{revealedCard.name}</h4>
            <p className="text-sm font-semibold text-white max-w-sm mb-4">
              "{revealedCard.description}"
            </p>
            <div className="text-lg font-black text-yellow-300 bg-yellow-500/10 border border-yellow-500/20 px-6 py-2 rounded-full tracking-wider animate-bounce">
              Recebido: +{revealedCard.rewardAmount} {revealedCard.rewardType}!
            </div>
            <button
              onClick={() => {
                playSound('click');
                setRevealedCard(null);
              }}
              className="mt-6 text-xs font-bold text-slate-400 hover:text-white transition-colors underline cursor-pointer"
            >
              Fechar tiragem
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
