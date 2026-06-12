'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { useGameStore } from '@/store/useGameStore';
import { ScenarioItem } from '@/shared/types';

interface CenarioProps {
  backgroundUrl: string;
  children?: React.ReactNode;
}

const SCENARIO_ITEMS: Record<string, ScenarioItem[]> = {
  quadra: [
    { id: 'item_chave_quadra', name: 'Chave Pequena', left: '42%', top: '78%', icon: '🔑', rewardType: 'Clue', clueId: 'chave_pequena' }
  ],
  galpao: [
    { id: 'item_gabarito', name: 'Gabarito Rasgado', left: '65%', top: '68%', icon: '📄', rewardType: 'Clue', clueId: 'gabarito_rasgado' }
  ],
  patio: [
    { id: 'item_trevo', name: 'Trevo de Quatro Folhas', left: '20%', top: '85%', icon: '🍀', rewardType: 'PA', rewardAmount: 20 }
  ],
  sala_de_aula: [
    { id: 'item_lapis', name: 'Lápis da Sorte', left: '80%', top: '72%', icon: '✏️', rewardType: 'Gold', rewardAmount: 10 }
  ]
};

const getBackgroundSrc = (url: string): string => {
  if (!url) return '';
  if (url.startsWith('http') || url.startsWith('/')) {
    return url;
  }
  const map: Record<string, string> = {
    'corredor': '/images/backgrounds/corridor.png',
    'sala_de_aula': '/images/backgrounds/classroom.png',
    'patio': '/images/backgrounds/courtyard.png',
    'sala_de_artes': '/images/backgrounds/art_room.png',
    'remi_encounter': '/images/backgrounds/remi_encounter.png',
  };
  return map[url.toLowerCase()] || `/images/backgrounds/${url}.png`;
};

export const Cenario: React.FC<CenarioProps> = ({ backgroundUrl, children }) => {
  const bgSrc = getBackgroundSrc(backgroundUrl);
  const { currentLocationId, collectedItems, collectScenarioItem, storyStage } = useGameStore();

  const items = SCENARIO_ITEMS[currentLocationId] || [];

  return (
    <div className="absolute inset-0 z-0 h-full w-full pointer-events-auto">
      <AnimatePresence mode="popLayout">
        {bgSrc && (
          <motion.div
            key={bgSrc}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${bgSrc})` }}
          />
        )}
      </AnimatePresence>

      {/* Render Point-and-Click scenario items in FREE_EXPLORE stage */}
      {storyStage === 'FREE_EXPLORE' && items.map((item) => {
        const isAlreadyCollected = collectedItems.includes(item.id);
        if (isAlreadyCollected) return null;

        return (
          <motion.button
            key={item.id}
            onClick={() => collectScenarioItem(item)}
            className="absolute z-10 p-2 text-2xl filter drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] cursor-pointer hover:scale-125 select-none"
            style={{ left: item.left, top: item.top }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            title={`Coletar ${item.name}`}
          >
            {item.icon}
          </motion.button>
        );
      })}

      {/* Sprite characters render inside the scene div so transparent PNG areas show the background-image */}
      {children}

      {/* Subtle overlay gradients for improved text legibility and atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#120e24]/75 via-transparent to-black/30 pointer-events-none" />
    </div>
  );
};

