'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/useGameStore';

interface SpriteCharacterProps {
  characterName: string;
  expression: string;
  position?: 'esquerda' | 'centro' | 'direita';
  outfit?: string;
}

const POSITION_CLASSES = {
  esquerda: 'left-[2%]',
  centro: 'left-1/2 -translate-x-1/2',
  direita: 'right-[2%]',
};

const WIDTH_CLASSES = {
  esquerda: 'w-[55%] md:w-[45%] lg:w-[40%]',
  centro: 'w-[75%] md:w-[45%] lg:w-[40%]',
  direita: 'w-[55%] md:w-[45%] lg:w-[40%]',
};

const EXPRESSION_ANIMATE = {
  neutro:     { opacity: 1, y: 0, x: 0, rotate: 0, scale: 1 },
  sorrindo:   { opacity: 1, y: 0, x: 0, rotate: 0, scale: 1.03 },
  bravo:      { opacity: 1, y: 0, x: 0, rotate: 0, scale: 1.01 },
  provocando: { opacity: 1, y: 0, x: 0, rotate: 0, scale: 1.02 },
  triste:     { opacity: 1, y: 10, x: 0, rotate: 0, scale: 0.97 },
};

const EXPRESSION_KEYFRAMES: Partial<Record<keyof typeof EXPRESSION_ANIMATE, object>> = {
  sorrindo:   { y: [0, -12, 0] },
  bravo:      { x: [0, -5, 5, -5, 5, 0] },
  provocando: { rotate: [0, -2, 2, 0] },
};

const EXPRESSION_TRANSITIONS: Partial<Record<keyof typeof EXPRESSION_ANIMATE, object>> = {
  sorrindo:   { y: { duration: 0.5, ease: 'easeInOut' } },
  bravo:      { x: { duration: 0.4, ease: 'easeInOut' } },
  provocando: { rotate: { duration: 0.5, ease: 'easeInOut' } },
};

const EXPRESSION_ALIASES: Record<string, keyof typeof EXPRESSION_ANIMATE> = {
  neutro: 'neutro', neutral: 'neutro', none: 'neutro', '': 'neutro',
  sorrindo: 'sorrindo', happy: 'sorrindo', smiling: 'sorrindo', blushing: 'sorrindo',
  bravo: 'bravo', brava: 'bravo', angry: 'bravo',
  provocando: 'provocando', sly: 'provocando', smirk: 'provocando', smirking: 'provocando',
  triste: 'triste', sad: 'triste', crying: 'triste', timido: 'triste', timida: 'triste',
};

function getSpriteUrl(charKey: string, expr: string, outfit: string = 'default'): string {
  switch (charKey) {
    case 'castiel':
      if (outfit === 'gym') {
        if (expr === 'bravo') return '/images/sprites/castiel_gym_bravo.png';
        if (expr === 'sorrindo') return '/images/sprites/castiel_gym_sorrindo.png';
        return '/images/sprites/castiel_gym.png';
      }
      if (expr === 'bravo') return '/images/sprites/castiel_bravo.png';
      if (expr === 'sorrindo') return '/images/sprites/castiel_sorrindo.png';
      if (expr === 'provocando') return '/images/sprites/castiel_sorriso_pilantra.png';
      if (expr === 'triste') return '/images/sprites/castiel_triste.png';
      return '/images/sprites/castiel.png';
    case 'nathaniel':
      if (expr === 'bravo') return '/images/sprites/nathaniel_bravo.png';
      if (expr === 'sorrindo') return '/images/sprites/nathaniel_sorrindo.png';
      if (expr === 'provocando') return '/images/sprites/nathaniel_sorriso_pilantra.png';
      if (expr === 'triste') return '/images/sprites/nathaniel_triste.png';
      return '/images/sprites/nathaniel.png';
    case 'lysandre':
      if (expr === 'bravo') return '/images/sprites/lysandre_bravo.png';
      if (expr === 'sorrindo') return '/images/sprites/lysandre_sorrindo.png';
      if (expr === 'provocando') return '/images/sprites/lysandre_sorriso_pilantra.png';
      if (expr === 'triste') return '/images/sprites/lysandre_triste.png';
      return '/images/sprites/lysandre.png';
    case 'remi':
      if (expr === 'sorrindo') return '/images/sprites/remi2sorrindo.png';
      if (expr === 'provocando') return '/images/sprites/remi2pilantra.png';
      if (expr === 'triste') return '/images/sprites/remi2triste.png';
      return '/images/sprites/remi2neutro.png';
    case 'harry':
      if (expr === 'bravo') return '/images/sprites/harry_bravo.png';
      if (expr === 'sorrindo') return '/images/sprites/harry_sorrindo.png';
      if (expr === 'triste') return '/images/sprites/Harry_timido.png';
      return '/images/sprites/harry.png';
    case 'maggie':
      if (expr === 'bravo') return '/images/sprites/maggie_brava.png';
      if (expr === 'sorrindo') return '/images/sprites/maggie_sorrindo.png';
      if (expr === 'provocando') return '/images/sprites/maggie_sorriso_pilantra.png';
      if (expr === 'triste') return '/images/sprites/maggie_neutro.png';
      return '/images/sprites/maggie.png';
    case 'kami':
      if (expr === 'bravo') return '/images/sprites/kami_brava.png';
      if (expr === 'sorrindo') return '/images/sprites/kami_sorriso.png';
      if (expr === 'provocando') return '/images/sprites/kami_sorriso_pilantra.png';
      if (expr === 'triste') return '/images/sprites/kami_triste.png';
      return '/images/sprites/kami.png';
    default:
      return '';
  }
}



export const SpriteCharacter: React.FC<SpriteCharacterProps> = ({
  characterName,
  expression,
  position = 'centro',
  outfit = 'default',
}) => {
  // ⚠️ ALL hooks must be before any conditional return
  const charKey = (characterName || '').toLowerCase().trim();
  const rawExpr = (expression || 'neutro').toLowerCase().trim();
  const mappedExpr = EXPRESSION_ALIASES[rawExpr] ?? 'neutro';
  const imageUrl = getSpriteUrl(charKey, mappedExpr, outfit);
  // Fallback URL (default outfit, same expression, then neutral)
  const fallbackUrl = getSpriteUrl(charKey, mappedExpr, 'default') || getSpriteUrl(charKey, 'neutro', 'default');

  // Read store but don't use (kept for future scene bg use)
  useGameStore(state => state.backgroundUrl);

  const [displayUrl, setDisplayUrl] = React.useState<string>(imageUrl);
  const ready = true;

  React.useEffect(() => {
    setDisplayUrl(imageUrl);
  }, [imageUrl]);

  // Guards after all hooks
  if (!charKey || ['narrador', 'narrator', 'sistema', 'system', 'none'].includes(charKey)) return null;
  if (!imageUrl) return null;

  const baseAnimate = {
    ...EXPRESSION_ANIMATE[mappedExpr],
    ...(EXPRESSION_KEYFRAMES[mappedExpr] || {}),
    opacity: ready ? 1 : 0,
  };
  const animTransition = {
    ...(EXPRESSION_TRANSITIONS[mappedExpr] || {}),
    default: { type: 'tween', duration: 0.3 },
  };

  return (
    <div
      className={`absolute bottom-0 z-10 pointer-events-none transition-all duration-300 max-md:translate-y-[-10%] max-md:scale-[1.25] ${POSITION_CLASSES[position]} ${WIDTH_CLASSES[position]}`}
      style={{ height: '100%' }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`${charKey}-${mappedExpr}`}
          initial={{ opacity: 0, y: 60, scale: 0.93 }}
          animate={baseAnimate}
          exit={{ opacity: 0, y: 60, scale: 0.93 }}
          transition={animTransition as object}
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={displayUrl}
            alt={characterName}
            onError={(e) => {
              // Graceful fallback: if outfit asset missing, use default sprite
              const target = e.currentTarget;
              if (target.src !== fallbackUrl && fallbackUrl) {
                target.src = fallbackUrl;
              }
            }}
            style={{
              height: '100%',
              width: 'auto',
              maxWidth: '100%',
              objectFit: 'contain',
              objectPosition: 'bottom center',
              filter: 'drop-shadow(0 8px 28px rgba(0,0,0,0.65))',
              display: 'block',
              transform: charKey === 'maggie' ? 'scale(1.6) translateY(-5%)' : 'scale(1)',
              transformOrigin: 'bottom center',
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
