'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { FileText, Check, X } from 'lucide-react';
import { useGameStore } from '../../../store/useGameStore';

const PAPERS = [
  { id: 1, student: 'Castiel', excuse: 'Faltei porque o vento estava muito forte e minha guitarra podia desafinar.', isGood: false },
  { id: 2, student: 'Iris', excuse: 'Ajudando a organizar o laboratório de biologia com o professor.', isGood: true },
  { id: 3, student: 'Ken', excuse: 'Precisei ir à enfermaria porque comi muitos biscoitos.', isGood: false },
  { id: 4, student: 'Kim', excuse: 'Treino da equipe de atletismo para a competição regional.', isGood: true },
  { id: 5, student: 'Ambre', excuse: 'Fui fazer as unhas porque quebrei uma na porta da sala.', isGood: false },
];

export const NathanielSwipeGame: React.FC = () => {
  const { endMinigame, changeAffinity } = useGameStore();
  const [cards, setCards] = useState(PAPERS);
  const [score, setScore] = useState(0);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo, cardId: number) => {
    const swipeThreshold = 100;
    if (info.offset.x > swipeThreshold) {
      handleSwipe(cardId, 'right');
    } else if (info.offset.x < -swipeThreshold) {
      handleSwipe(cardId, 'left');
    }
  };

  const handleSwipe = (cardId: number, direction: 'left' | 'right') => {
    const card = cards.find(c => c.id === cardId);
    if (!card) return;

    // Right = Aprovar, Left = Rejeitar
    const approved = direction === 'right';
    const isCorrect = approved === card.isGood;

    setScore(prev => prev + (isCorrect ? 20 : -10));

    setCards(prev => {
      const nextCards = prev.filter(c => c.id !== cardId);
      if (nextCards.length === 0) {
        setTimeout(() => {
          changeAffinity('nathaniel', 15);
          endMinigame(100);
        }, 1000);
      }
      return nextCards;
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-slate-900/95 backdrop-blur-sm p-4 overflow-hidden"
    >
      <div className="absolute top-10 flex flex-col items-center text-center">
        <FileText className="text-blue-400 w-10 h-10 mb-2" />
        <h2 className="text-2xl font-bold text-white">Grêmio Estudantil</h2>
        <p className="text-blue-200 text-sm max-w-md mt-2">
          Ajude o Nathaniel com a papelada. Deslize para a <strong>DIREITA</strong> para aprovar justificativas válidas, e para a <strong>ESQUERDA</strong> para rejeitar as ruins.
        </p>
      </div>

      <div className="relative w-full max-w-sm h-96 flex items-center justify-center mt-12 perspective-1000">
        <AnimatePresence>
          {cards.map((card, index) => {
            // Only render top 2 cards for performance and stacking effect
            if (index > 1) return null;
            
            return (
              <motion.div
                key={card.id}
                className="absolute w-full h-full bg-white rounded-2xl shadow-xl border border-slate-200 flex flex-col p-6"
                style={{ zIndex: cards.length - index }}
                initial={{ scale: 0.95, y: 20, opacity: 0 }}
                animate={{ scale: index === 0 ? 1 : 0.95, y: index === 0 ? 0 : 20, opacity: 1 }}
                exit={{ x: 0, opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                drag={index === 0 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, info) => handleDragEnd(e, info, card.id)}
                whileDrag={{ cursor: "grabbing" }}
              >
                <div className="flex justify-between items-start mb-6 border-b pb-4">
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">{card.student}</h3>
                    <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Justificativa de Falta</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                    <span className="text-xl">📝</span>
                  </div>
                </div>
                
                <div className="flex-1">
                  <p className="text-slate-700 italic text-lg leading-relaxed">
                    "{card.excuse}"
                  </p>
                </div>

                <div className="flex justify-between items-center mt-6 pt-4 border-t">
                  <button 
                    onClick={() => handleSwipe(card.id, 'left')}
                    className="w-12 h-12 rounded-full bg-red-100 text-red-500 flex items-center justify-center hover:bg-red-200 transition-colors"
                  >
                    <X size={24} />
                  </button>
                  <span className="text-xs font-bold text-slate-400">DESLIZE</span>
                  <button 
                    onClick={() => handleSwipe(card.id, 'right')}
                    className="w-12 h-12 rounded-full bg-green-100 text-green-500 flex items-center justify-center hover:bg-green-200 transition-colors"
                  >
                    <Check size={24} />
                  </button>
                </div>
              </motion.div>
            );
          }).reverse()}
        </AnimatePresence>

        {cards.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center bg-white p-8 rounded-2xl shadow-xl"
          >
            <Check className="text-blue-500 w-16 h-16 mb-4" />
            <h3 className="text-xl font-bold text-slate-800">Trabalho Concluído!</h3>
            <p className="text-slate-500 text-center mt-2">Nathaniel vai ficar muito grato pela sua ajuda.</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
