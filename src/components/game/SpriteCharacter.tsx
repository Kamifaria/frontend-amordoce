'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SpriteCharacterProps {
  characterName: string;
  expression: string; // e.g. 'neutro' | 'sorrindo' | 'bravo' | 'provocando' | 'triste'
  position?: 'esquerda' | 'centro' | 'direita';
}

// Map characters to high-quality generated anime sprites in public folder
const CHARACTER_SPRITES: Record<string, string> = {
  castiel: '/images/sprites/castiel.png',
  nathaniel: '/images/sprites/nathaniel.png',
  lysandre: '/images/sprites/lysandre.png',
  remi: '/images/sprites/remi.png',
  harry: '/images/sprites/harry.png',
  maggie: '/images/sprites/maggie.png',
  kami: '/images/sprites/kami.png',
};

const POSITION_CLASSES = {
  esquerda: 'left-[10%] justify-start',
  centro: 'left-1/2 -translate-x-1/2 justify-center',
  direita: 'right-[10%] justify-end'
};

// Framer motion variants to simulate expressions using micro-animations and filters
const EXPRESSION_VARIANTS = {
  neutro: {
    y: 0,
    x: 0,
    rotate: 0,
    scale: 1,
    filter: 'contrast(1.05) saturate(1.05) brightness(1)',
  },
  sorrindo: {
    y: [0, -18, 0], // Playful bounce jump
    x: 0,
    rotate: 0,
    scale: 1.03,
    filter: 'contrast(1.1) saturate(1.2) brightness(1.05)',
  },
  bravo: {
    x: [0, -6, 6, -6, 6, 0], // Angry shake tremor
    y: 0,
    rotate: 0,
    scale: 1.01,
    filter: 'contrast(1.2) saturate(0.9) hue-rotate(-12deg) brightness(0.95)',
  },
  provocando: {
    y: 0,
    x: 0,
    rotate: [0, -2.5, 2.5, 0], // Wiggle / head tilt
    scale: 1.02,
    filter: 'contrast(1.15) saturate(1.1) brightness(1.02)',
  },
  triste: {
    y: 15, // Slumped/disappointed posture
    x: 0,
    rotate: 0,
    scale: 0.97,
    filter: 'contrast(0.9) saturate(0.65) brightness(0.85)',
  }
};

export const SpriteCharacter: React.FC<SpriteCharacterProps> = ({
  characterName,
  expression,
  position = 'centro',
}) => {
  // If no speaker name, narrator or system, don't render sprites
  if (!characterName || characterName.toLowerCase() === 'narrador' || characterName.toLowerCase() === 'sistema') {
    return null;
  }

  const charKey = characterName.toLowerCase();
  const safeExpression = (expression || 'neutro').toLowerCase();
  let imageUrl = '';

  if (charKey === 'castiel') {
    if (safeExpression === 'bravo' || safeExpression === 'angry') {
      imageUrl = '/images/sprites/castiel_bravo.png';
    } else if (safeExpression === 'sorrindo' || safeExpression === 'happy' || safeExpression === 'smiling') {
      imageUrl = '/images/sprites/castiel_sorrindo.png';
    } else if (safeExpression === 'provocando' || safeExpression === 'sly' || safeExpression === 'smirk' || safeExpression === 'smirking') {
      imageUrl = '/images/sprites/castiel_sorriso_pilantra.png';
    } else if (safeExpression === 'triste' || safeExpression === 'sad' || safeExpression === 'crying') {
      imageUrl = '/images/sprites/castiel_triste.png';
    } else {
      imageUrl = '/images/sprites/castiel.png';
    }
  } else if (charKey === 'nathaniel') {
    if (safeExpression === 'bravo' || safeExpression === 'angry') {
      imageUrl = '/images/sprites/nathaniel_bravo.png';
    } else if (safeExpression === 'sorrindo' || safeExpression === 'happy' || safeExpression === 'smiling') {
      imageUrl = '/images/sprites/nathaniel_sorrindo.png';
    } else if (safeExpression === 'provocando' || safeExpression === 'sly' || safeExpression === 'smirk' || safeExpression === 'smirking') {
      imageUrl = '/images/sprites/nathaniel_sorriso_pilantra.png';
    } else if (safeExpression === 'triste' || safeExpression === 'sad' || safeExpression === 'crying') {
      imageUrl = '/images/sprites/nathaniel_triste.png';
    } else {
      imageUrl = '/images/sprites/nathaniel.png';
    }
  } else if (charKey === 'lysandre') {
    if (safeExpression === 'bravo' || safeExpression === 'angry') {
      imageUrl = '/images/sprites/lysandre_bravo.png';
    } else if (safeExpression === 'sorrindo' || safeExpression === 'happy' || safeExpression === 'smiling') {
      imageUrl = '/images/sprites/lysandre_sorrindo.png';
    } else if (safeExpression === 'provocando' || safeExpression === 'sly' || safeExpression === 'smirk' || safeExpression === 'smirking') {
      imageUrl = '/images/sprites/lysandre_sorriso_pilantra.png';
    } else if (safeExpression === 'triste' || safeExpression === 'sad' || safeExpression === 'crying') {
      imageUrl = '/images/sprites/lysandre_triste.png';
    } else {
      imageUrl = '/images/sprites/lysandre.png';
    }
  } else if (charKey === 'remi') {
    if (safeExpression === 'bravo' || safeExpression === 'angry') {
      imageUrl = '/images/sprites/remi_bravo.png';
    } else if (safeExpression === 'sorrindo' || safeExpression === 'happy' || safeExpression === 'smiling') {
      imageUrl = '/images/sprites/remi2sorrindo.png';
    } else if (safeExpression === 'provocando' || safeExpression === 'sly' || safeExpression === 'smirk' || safeExpression === 'smirking') {
      imageUrl = '/images/sprites/remi2pilantra.png';
    } else if (safeExpression === 'triste' || safeExpression === 'sad' || safeExpression === 'crying') {
      imageUrl = '/images/sprites/remi2triste.png';
    } else {
      imageUrl = '/images/sprites/remi.png';
    }
  } else if (charKey === 'harry') {
    if (safeExpression === 'bravo' || safeExpression === 'angry') {
      imageUrl = '/images/sprites/harry_bravo.png';
    } else if (safeExpression === 'sorrindo' || safeExpression === 'happy' || safeExpression === 'smiling') {
      imageUrl = '/images/sprites/harry_sorrindo.png';
    } else if (safeExpression === 'triste' || safeExpression === 'sad' || safeExpression === 'crying') {
      imageUrl = '/images/sprites/Harry_timido.png';
    } else {
      imageUrl = '/images/sprites/harry.png';
    }
  } else if (charKey === 'maggie') {
    if (safeExpression === 'bravo' || safeExpression === 'angry') {
      imageUrl = '/images/sprites/maggie_brava.png';
    } else if (safeExpression === 'sorrindo' || safeExpression === 'happy' || safeExpression === 'smiling') {
      imageUrl = '/images/sprites/maggie_sorrindo.png';
    } else if (safeExpression === 'provocando' || safeExpression === 'sly' || safeExpression === 'smirk' || safeExpression === 'smirking') {
      imageUrl = '/images/sprites/maggie_sorriso_pilantra.png';
    } else if (safeExpression === 'triste' || safeExpression === 'sad' || safeExpression === 'crying') {
      imageUrl = '/images/sprites/maggie_neutro.png';
    } else {
      imageUrl = '/images/sprites/maggie.png';
    }
  } else if (charKey === 'kami') {
    if (safeExpression === 'bravo' || safeExpression === 'angry') {
      imageUrl = '/images/sprites/kami_brava.png';
    } else if (safeExpression === 'sorrindo' || safeExpression === 'happy' || safeExpression === 'smiling') {
      imageUrl = '/images/sprites/kami_sorriso.png';
    } else if (safeExpression === 'provocando' || safeExpression === 'sly' || safeExpression === 'smirk' || safeExpression === 'smirking') {
      imageUrl = '/images/sprites/kami_sorriso_pilantra.png';
    } else if (safeExpression === 'triste' || safeExpression === 'sad' || safeExpression === 'crying') {
      imageUrl = '/images/sprites/kami_triste.png';
    } else {
      imageUrl = '/images/sprites/kami.png';
    }
  } else {
    imageUrl = CHARACTER_SPRITES[charKey] || '';
  }
  const variantKey = (safeExpression in EXPRESSION_VARIANTS) 
    ? (safeExpression as keyof typeof EXPRESSION_VARIANTS) 
    : 'neutro';

  return (
    <div className={`absolute bottom-0 z-15 flex h-[60%] w-[35%] pointer-events-none ${POSITION_CLASSES[position]}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={`${characterName}-${expression}`}
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={variantKey}
          variants={EXPRESSION_VARIANTS}
          exit={{ opacity: 0, y: 60, scale: 0.95 }}
          transition={{ 
            type: 'spring', 
            stiffness: 160, 
            damping: 20,
            y: { duration: 0.4 },
            x: { duration: 0.35 }
          }}
          className="relative h-full w-full flex items-end justify-center"
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={`${characterName} (${expression})`}
              className="h-full w-auto object-contain object-bottom filter transition-all duration-300 drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            />
          ) : (
            // Silhouette fallback if sprite is missing
            <div className="flex h-[75%] w-full flex-col items-center justify-end rounded-t-full border-4 border-b-0 border-dashed border-pink-500/20 bg-purple-950/10 p-4">
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
