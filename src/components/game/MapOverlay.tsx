'use client';

import React from 'react';
import { X, School, TreePine, MapPin } from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';

interface MapOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MapOverlay: React.FC<MapOverlayProps> = ({ isOpen, onClose }) => {
  const currentLocationId = useGameStore((state) => state.currentLocationId);
  const changeLocation = useGameStore((state) => state.changeLocation);

  if (!isOpen) return null;

  const handleSelectLocation = (locationId: 'school' | 'patio') => {
    changeLocation(locationId);
    onClose();
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm select-none">
      <div className="relative w-[85%] max-w-lg rounded-2xl border border-pink-500/35 bg-[#120e24]/95 p-6 shadow-[0_0_40px_rgba(219,39,119,0.3)] text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-pink-500 transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Mapa de Sweet Amoris
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Escolha para onde deseja se locomover agora
          </p>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* School Card */}
          <button
            onClick={() => handleSelectLocation('school')}
            className={`relative flex flex-col items-center justify-center p-6 rounded-xl border transition-all cursor-pointer ${
              currentLocationId === 'school'
                ? 'border-pink-500 bg-pink-500/10 shadow-[0_0_15px_rgba(219,39,119,0.2)]'
                : 'border-white/10 bg-white/5 hover:border-pink-500/50 hover:bg-white/10'
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center mb-3 text-pink-400">
              <School size={24} />
            </div>
            <span className="font-semibold text-sm">Escola (Interno)</span>
            <span className="text-[10px] text-slate-400 mt-1">Corredores e Salas</span>
            {currentLocationId === 'school' && (
              <div className="absolute top-2 right-2 text-pink-500 flex items-center gap-0.5 text-[9px] font-bold uppercase tracking-wider bg-pink-500/15 px-1.5 py-0.5 rounded-full border border-pink-500/25">
                <MapPin size={8} /> Você
              </div>
            )}
          </button>

          {/* Patio Card */}
          <button
            onClick={() => handleSelectLocation('patio')}
            className={`relative flex flex-col items-center justify-center p-6 rounded-xl border transition-all cursor-pointer ${
              currentLocationId === 'patio'
                ? 'border-pink-500 bg-pink-500/10 shadow-[0_0_15px_rgba(219,39,119,0.2)]'
                : 'border-white/10 bg-white/5 hover:border-pink-500/50 hover:bg-white/10'
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-3 text-purple-400">
              <TreePine size={24} />
            </div>
            <span className="font-semibold text-sm">Pátio (Externo)</span>
            <span className="text-[10px] text-slate-400 mt-1">Jardim e Cerejeiras</span>
            {currentLocationId === 'patio' && (
              <div className="absolute top-2 right-2 text-purple-500 flex items-center gap-0.5 text-[9px] font-bold uppercase tracking-wider bg-purple-500/15 px-1.5 py-0.5 rounded-full border border-purple-500/25">
                <MapPin size={8} /> Você
              </div>
            )}
          </button>

        </div>
      </div>
    </div>
  );
};
