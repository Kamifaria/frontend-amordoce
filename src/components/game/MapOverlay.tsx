'use client';

import React from 'react';
import { X, School, TreePine, MapPin, Dumbbell, Palette, Film, Lock, ShoppingBag } from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';

interface MapOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MapOverlay: React.FC<MapOverlayProps> = ({ isOpen, onClose }) => {
  const currentLocationId = useGameStore((state) => state.currentLocationId);
  const changeLocation = useGameStore((state) => state.changeLocation);
  const storyStage = useGameStore((state) => state.storyStage);

  if (!isOpen) return null;

  const locations = [
    {
      id: 'school',
      name: 'Escola (Interno)',
      desc: 'Corredores e Salas',
      icon: <School size={24} />,
      color: 'text-pink-400 bg-pink-500/20 border-pink-500/25',
      userColor: 'text-pink-500 bg-pink-500/15 border-pink-500/25',
      isLocked: false,
    },
    {
      id: 'patio',
      name: 'Pátio (Externo)',
      desc: 'Jardim e Cerejeiras',
      icon: <TreePine size={24} />,
      color: 'text-purple-400 bg-purple-500/20 border-purple-500/25',
      userColor: 'text-purple-500 bg-purple-500/15 border-purple-500/25',
      isLocked: false,
    },
    {
      id: 'quadra',
      name: 'Quadra (Externo)',
      desc: 'Área de Esportes',
      icon: <Dumbbell size={24} />,
      color: 'text-blue-400 bg-blue-500/20 border-blue-500/25',
      userColor: 'text-blue-500 bg-blue-500/15 border-blue-500/25',
      isLocked: false,
    },
    {
      id: 'galpao',
      name: 'Galpão (Interno)',
      desc: 'Sala de Artes e Oficina',
      icon: <Palette size={24} />,
      color: 'text-amber-400 bg-amber-500/20 border-amber-500/25',
      userColor: 'text-amber-500 bg-amber-500/15 border-amber-500/25',
      isLocked: false,
    },
    {
      id: 'cinema',
      name: 'Cinema (Externo)',
      desc: 'Local de Encontro',
      icon: <Film size={24} />,
      color: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/25',
      userColor: 'text-emerald-500 bg-emerald-500/15 border-emerald-500/25',
      isLocked: storyStage !== 'DATE_CINEMA',
      hint: 'Chegue na afinidade 50 e avance na história',
    },
    {
      id: 'shop',
      name: 'Loja de Roupas',
      desc: 'Comprar Looks Dark',
      icon: <ShoppingBag size={24} />,
      color: 'text-pink-400 bg-pink-500/20 border-pink-500/25',
      userColor: 'text-pink-500 bg-pink-500/15 border-pink-500/25',
      isLocked: false,
    },
  ];

  const handleSelectLocation = (locationId: string, isLocked: boolean) => {
    if (isLocked) return;
    changeLocation(locationId);
    onClose();
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm select-none">
      <div className="relative w-[90%] max-w-xl rounded-2xl border border-pink-500/35 bg-[#120e24]/95 p-6 shadow-[0_0_40px_rgba(219,39,119,0.3)] text-slate-100">
        
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
            Escolha para onde deseja se locomover agora (Custa 10 PA)
          </p>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-2 gap-4 max-h-[300px] overflow-y-auto pr-1">
          {locations.map((loc) => (
            <button
              key={loc.id}
              onClick={() => handleSelectLocation(loc.id, loc.isLocked)}
              disabled={loc.isLocked}
              title={loc.isLocked ? loc.hint : `Ir para ${loc.name}`}
              className={`relative flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
                loc.isLocked
                  ? 'opacity-40 border-dashed border-white/5 bg-black/20 cursor-not-allowed'
                  : currentLocationId === loc.id
                  ? 'border-pink-500 bg-pink-500/10 shadow-[0_0_15px_rgba(219,39,119,0.2)] cursor-pointer'
                  : 'border-white/10 bg-white/5 hover:border-pink-500/50 hover:bg-white/10 cursor-pointer'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${loc.color}`}>
                {loc.isLocked ? <Lock size={20} className="text-slate-400" /> : loc.icon}
              </div>
              <span className="font-semibold text-xs text-center">{loc.name}</span>
              <span className="text-[9px] text-slate-400 mt-0.5 text-center">{loc.desc}</span>
              
              {currentLocationId === loc.id && !loc.isLocked && (
                <div className={`absolute top-2 right-2 flex items-center gap-0.5 text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full border ${loc.userColor}`}>
                  <MapPin size={8} /> Você
                </div>
              )}
              
              {loc.isLocked && loc.hint && (
                <span className="text-[7px] text-rose-300 italic mt-1 text-center font-medium max-w-[95%]">
                  {loc.hint}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
