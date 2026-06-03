'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SpriteCharacterProps {
  characterName: string;
  expression: string;
  position?: 'esquerda' | 'centro' | 'direita';
}

// Map characters and expressions to high-quality anime illustration placeholders
const CHARACTER_SPRITES: Record<string, Record<string, string>> = {
  Castiel: {
    neutro: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&q=80', // Anime character styled mock
    sorrindo: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&q=80',
    bravo: 'https://images.unsplash.com/photo-1560942485-b2a11cc13456?w=400&q=80',
    provocando: 'https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=400&q=80',
  },
  Nathaniel: {
    neutro: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
    sorrindo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80',
  }
};

const POSITION_CLASSES = {
  esquerda: 'left-[10%] justify-start',
  centro: 'left-1/2 -translate-x-1/2 justify-center',
  direita: 'right-[10%] justify-end'
};

export const SpriteCharacter: React.FC<SpriteCharacterProps> = ({
  characterName,
  expression,
  position = 'centro',
}) => {
  // If no speaker name or narration, don't render sprites
  if (!characterName || characterName.toLowerCase() === 'narrador' || characterName.toLowerCase() === 'sistema') {
    return null;
  }

  // Get image URL or fallback to a styled character card
  const characterMap = CHARACTER_SPRITES[characterName];
  const imageUrl = characterMap ? (characterMap[expression] || characterMap['neutro']) : null;

  return (
    <div className={`absolute bottom-0 z-10 flex h-[75%] w-[35%] pointer-events-none ${POSITION_CLASSES[position]}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={`${characterName}-${expression}`}
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="relative h-full w-full max-w-[280px]"
        >
          {imageUrl ? (
            // Custom CSS mask or border to make anime illustration fit visual novel style
            <div className="h-full w-full overflow-hidden rounded-t-full border-b-0 border-4 border-pink-500/30 bg-purple-950/20 backdrop-blur-sm">
              <img
                src={imageUrl}
                alt={`${characterName} (${expression})`}
                className="h-full w-full object-cover object-top filter contrast-125 saturate-110"
              />
            </div>
          ) : (
            // Silhouette fallback if sprite is missing
            <div className="flex h-full w-full flex-col items-center justify-end rounded-t-full border-4 border-b-0 border-dashed border-pink-500/20 bg-purple-950/10 p-4">
              <div className="text-center font-bold text-pink-400 text-lg uppercase tracking-widest drop-shadow-md">
                {characterName}
              </div>
              <div className="text-xs text-purple-300 italic mb-10">{expression}</div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
