'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/useGameStore';

interface SpriteCharacterProps {
  characterName: string;
  expression: string;
  position?: 'esquerda' | 'centro' | 'direita';
}

const POSITION_CLASSES = {
  esquerda: 'left-[2%]',
  centro: 'left-1/2 -translate-x-1/2',
  direita: 'right-[2%]',
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

function getSpriteUrl(charKey: string, expr: string): string {
  switch (charKey) {
    case 'castiel':
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

/**
 * BFS flood-fill from all 4 edges to remove "checkerboard" or plain white backgrounds.
 * Detects both:
 *  - Pure white/near-white opaque pixels (rgba ~255,255,255,255)
 *  - Checkered gray pixels that alternate with white (rgba ~204,204,204,255)
 * Only pixels reachable from the image border are made transparent.
 * CORS: The server returns Access-Control-Allow-Origin: * so crossOrigin='anonymous' works.
 */
function removeBackground(imageUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous'; // Required to avoid tainted canvas with CORS headers present
    img.src = imageUrl;

    img.onload = () => {
      try {
        const MAX_DIM = 1024; // process at max 1024px for speed
        const scale = Math.min(1, MAX_DIM / Math.max(img.width, img.height));
        const W = Math.round(img.width * scale);
        const H = Math.round(img.height * scale);

        const canvas = document.createElement('canvas');
        canvas.width = W;
        canvas.height = H;

        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) { resolve(imageUrl); return; }

        ctx.drawImage(img, 0, 0, W, H);

        let imgData: ImageData;
        try {
          imgData = ctx.getImageData(0, 0, W, H);
        } catch (corsErr) {
          console.warn('[SpriteCharacter] Canvas getImageData failed (CORS?). Using raw URL.', corsErr);
          resolve(imageUrl);
          return;
        }

        const data = imgData.data;
        const TOL = 35; // tolerance for near-white and checkerboard gray

        /**
         * Returns true if the pixel at byte offset `i` looks like background:
         * - Near-white: all channels >= 255-TOL  
         * - Near-gray (checkerboard): channels ~200 ± TOL with low saturation
         * - Already fully transparent
         */
        const isBackground = (i: number): boolean => {
          const a = data[i + 3];
          if (a < 10) return true; // already transparent
          const r = data[i], g = data[i + 1], b = data[i + 2];
          // White / near-white
          if (r >= 255 - TOL && g >= 255 - TOL && b >= 255 - TOL) return true;
          // Checkerboard gray (~204,204,204 or ~128,128,128)
          const avg = (r + g + b) / 3;
          const saturation = Math.max(Math.abs(r - avg), Math.abs(g - avg), Math.abs(b - avg));
          if (avg >= 120 && saturation < 25) return true; // low-saturation gray
          return false;
        };

        const visited = new Uint8Array(W * H);
        const queue: number[] = [];

        const seed = (x: number, y: number) => {
          const idx = y * W + x;
          if (visited[idx]) return;
          visited[idx] = 1;
          if (isBackground(idx * 4)) queue.push(idx);
        };

        // Seed from all 4 edges
        for (let x = 0; x < W; x++) { seed(x, 0); seed(x, H - 1); }
        for (let y = 1; y < H - 1; y++) { seed(0, y); seed(W - 1, y); }

        const DX = [1, -1, 0, 0];
        const DY = [0, 0, 1, -1];

        while (queue.length > 0) {
          const cur = queue.pop()!;
          data[cur * 4 + 3] = 0; // make transparent
          const cx = cur % W;
          const cy = (cur / W) | 0;
          for (let d = 0; d < 4; d++) {
            const nx = cx + DX[d], ny = cy + DY[d];
            if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
            const ni = ny * W + nx;
            if (!visited[ni]) {
              visited[ni] = 1;
              if (isBackground(ni * 4)) queue.push(ni);
            }
          }
        }

        // --- Edge erosion (Defringing) ---
        // Removes the white/gray halo left by anti-aliased edges blending with the background
        for (let pass = 0; pass < 2; pass++) {
          const toErode: number[] = [];
          for (let y = 0; y < H; y++) {
            for (let x = 0; x < W; x++) {
              const i = y * W + x;
              const alphaIdx = i * 4 + 3;
              if (data[alphaIdx] === 0) continue; // Already transparent

              let hasTransparentNeighbor = false;
              for (let d = 0; d < 4; d++) {
                const nx = x + DX[d], ny = y + DY[d];
                if (nx >= 0 && ny >= 0 && nx < W && ny < H) {
                  if (data[(ny * W + nx) * 4 + 3] === 0) {
                    hasTransparentNeighbor = true;
                    break;
                  }
                }
              }

              if (hasTransparentNeighbor) {
                const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2];
                const brightness = (r + g + b) / 3;
                
                if (pass === 0) {
                  // Pass 1: Unconditionally erode 1 pixel. The immediate boundary is always a blended mix.
                  toErode.push(i);
                } else {
                  // Pass 2: Erode a second pixel only if it's bright (white halo). 
                  // If it's dark (character outline), just soften it slightly.
                  if (brightness > 130) {
                    toErode.push(i);
                  } else {
                    data[alphaIdx] = Math.max(0, data[alphaIdx] - 100); // soften edge
                  }
                }
              }
            }
          }
          // Apply erosion
          for (const i of toErode) {
            data[i * 4 + 3] = 0;
          }
        }

        ctx.putImageData(imgData, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      } catch (err) {
        console.warn('[SpriteCharacter] Background removal error:', err);
        resolve(imageUrl);
      }
    };

    img.onerror = (e) => {
      console.warn('[SpriteCharacter] Image load error:', e);
      resolve(imageUrl);
    };
  });
}

// Global cache: imageUrl → processed data URL
const spriteCache = new Map<string, string>();

export const SpriteCharacter: React.FC<SpriteCharacterProps> = ({
  characterName,
  expression,
  position = 'centro',
}) => {
  // ⚠️ ALL hooks must be before any conditional return
  const charKey = (characterName || '').toLowerCase().trim();
  const rawExpr = (expression || 'neutro').toLowerCase().trim();
  const mappedExpr = EXPRESSION_ALIASES[rawExpr] ?? 'neutro';
  const imageUrl = getSpriteUrl(charKey, mappedExpr);

  // Read store but don't use (kept for future scene bg use)
  useGameStore(state => state.backgroundUrl);

  const [displayUrl, setDisplayUrl] = React.useState<string>(
    () => spriteCache.get(imageUrl) || imageUrl
  );
  const [ready, setReady] = React.useState<boolean>(spriteCache.has(imageUrl));

  React.useEffect(() => {
    if (!imageUrl) return;
    if (spriteCache.has(imageUrl)) {
      setDisplayUrl(spriteCache.get(imageUrl)!);
      setReady(true);
      return;
    }

    // Show raw image first (with bg), then replace with processed version
    setDisplayUrl(imageUrl);
    setReady(false);

    removeBackground(imageUrl).then((result) => {
      spriteCache.set(imageUrl, result);
      setDisplayUrl(result);
      setReady(true);
    });
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
      className={`absolute bottom-0 z-10 pointer-events-none ${POSITION_CLASSES[position]}`}
      style={{ height: '100%', width: '40%' }}
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
          <img
            src={displayUrl}
            alt={characterName}
            style={{
              height: '100%',
              width: 'auto',
              maxWidth: '100%',
              objectFit: 'contain',
              objectPosition: 'bottom center',
              filter: 'drop-shadow(0 8px 28px rgba(0,0,0,0.65))',
              display: 'block',
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
