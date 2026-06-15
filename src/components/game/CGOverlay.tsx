'use client';

import React, { useEffect, useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';

interface CGOverlayProps {
  cgUrl: string;
  cgId: string;
  isOpen: boolean;
  onClose: () => void;
}

const getBackgroundSrc = (url: string): string => {
  if (!url) return '';
  if (url.startsWith('http') || url.startsWith('/')) {
    return url;
  }
  const map: Record<string, string> = {
    'corredor': '/images/backgrounds/corridor.png',
    'sala_de_aula': '/images/backgrounds/classroom.png',
    'patio': '/images/backgrounds/courtyard.png',
    'sala_de_artes': '/images/backgrounds/bg_art_room_beautiful.png',
    'artroom': '/images/backgrounds/bg_art_room_beautiful.png',
    'remi_encounter': '/images/backgrounds/remi_encounter.png',
  };
  return map[url.toLowerCase()] || `/images/backgrounds/${url}.png`;
};

export const CGOverlay: React.FC<CGOverlayProps> = ({ cgUrl, cgId, isOpen, onClose }) => {
  const unlockCG = useGameStore((state) => state.unlockCG);
  const backgroundUrl = useGameStore((state) => state.backgroundUrl);
  const [displayUrl, setDisplayUrl] = useState<string>('');

  useEffect(() => {
    if (isOpen && cgId) {
      unlockCG(cgId);
    }
  }, [isOpen, cgId, unlockCG]);

  useEffect(() => {
    if (cgUrl) {
      // Add a cache buster so the browser fetches the newly generated/fixed image
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplayUrl(`${cgUrl}?v=${Date.now()}`);
    }
  }, [cgUrl]);

  if (!isOpen) return null;

  const bgSrc = getBackgroundSrc(backgroundUrl);

  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md select-none animate-fade-in p-4">
      {/* Visual Novel Container Constraint (16:9 ratio) */}
      <div 
        className="relative w-full max-w-2xl aspect-video rounded-2xl overflow-hidden border border-pink-500/50 shadow-[0_0_50px_rgba(219,39,119,0.4)] bg-[#120e24] bg-cover bg-center"
        style={bgSrc ? { backgroundImage: `url(${bgSrc})` } : undefined}
      >
        
        {/* CG Image */}
        <img
          src={displayUrl || cgUrl}
          alt="Ilustração Especial"
          className="w-full h-full object-contain animate-scale-up"
        />

        {/* Shine Overlay Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a1b]/80 via-transparent to-transparent pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-black/50 hover:bg-pink-600/90 text-white p-2.5 rounded-full border border-white/20 transition-all cursor-pointer hover:scale-105 active:scale-95 z-50"
          title="Fechar Ilustração"
        >
          <X size={18} />
        </button>

        {/* CG Title/Celebration Badges */}
        <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-1.5 text-left pointer-events-none z-10">
          <div className="flex items-center gap-1 bg-pink-500/20 text-pink-300 border border-pink-500/30 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest w-fit animate-pulse">
            <Sparkles size={10} /> Ilustração Desbloqueada
          </div>
          <h2 className="text-xl font-bold text-white tracking-wide drop-shadow-md">
            Momento Especial
          </h2>
        </div>
      </div>
    </div>
  );
};

