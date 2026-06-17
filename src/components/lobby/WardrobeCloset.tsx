'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shirt, Scissors, Palette, Sparkles, CheckCircle2 } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { EquippedOutfit } from '../../shared/types';

interface ClosetItem {
  id: string;
  name: string;
  preview: string;
}

const HAIRSTYLES: ClosetItem[] = [
  { id: 'long-purple-goth', name: 'Roxo Gótico (Veronica)', preview: '💜' },
  { id: 'short-black-grunge', name: 'Curto Preto Grunge', preview: '🖤' },
  { id: 'punk-braids', name: 'Tranças Punk', preview: '💈' },
];

const TOPS: ClosetItem[] = [
  { id: 'black-corset', name: 'Corpete Escuro', preview: '👚' },
  { id: 'leather-spikes', name: 'Couro com Spikes', preview: '🧥' },
  { id: 'band-tshirt', name: 'Camiseta de Banda', preview: '👕' },
];

const BOTTOMS: ClosetItem[] = [
  { id: 'skirt-chains', name: 'Saia com Correntes', preview: '👗' },
  { id: 'ripped-jeans', name: 'Calça Rasgada', preview: '👖' },
  { id: 'shorts-fishnet', name: 'Shorts & Arruda', preview: '🩳' },
];

export const WardrobeCloset: React.FC = () => {
  const { equippedOutfit, updateOutfit, playSound, unlockedItems } = useGameStore();
  const [activeTab, setActiveTab] = useState<'hair' | 'top' | 'bottom'>('hair');

  const handleEquip = (category: 'hair' | 'top' | 'bottom', itemId: string) => {
    if (!unlockedItems.includes(itemId)) {
      playSound('choice');
      return;
    }
    playSound('click');
    const newOutfit = { ...equippedOutfit };
    if (category === 'hair') newOutfit.hairstyle = itemId;
    if (category === 'top') newOutfit.top = itemId;
    if (category === 'bottom') newOutfit.bottom = itemId;
    updateOutfit(newOutfit);
  };

  const getOutfitName = (category: 'hair' | 'top' | 'bottom', id: string) => {
    if (category === 'hair') return HAIRSTYLES.find(x => x.id === id)?.name || id;
    if (category === 'top') return TOPS.find(x => x.id === id)?.name || id;
    return BOTTOMS.find(x => x.id === id)?.name || id;
  };

  const currentItems = 
    activeTab === 'hair' ? HAIRSTYLES : 
    activeTab === 'top' ? TOPS : BOTTOMS;

  return (
    <div className="w-full flex flex-col md:flex-row gap-8 bg-white/5 backdrop-blur-md border border-pink-500/10 rounded-2xl p-6 md:p-8 relative">
      
      {/* Left Column: Doll/Avatar Preview */}
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-950/60 border border-white/5 rounded-2xl p-6 min-h-[300px] text-center relative overflow-hidden">
        {/* Soft pink backlight */}
        <div className="absolute w-40 h-40 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />

        <h4 className="text-xs font-bold text-pink-400 uppercase tracking-widest mb-6 relative z-10 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> Veronica Avatar
        </h4>

        {/* Dynamic Stylized Avatar representation */}
        <div className="relative w-36 h-36 border-4 border-pink-500/20 rounded-full flex flex-col items-center justify-center bg-[#120e29] shadow-inner mb-6 z-10 scale-110 overflow-hidden">
          <img 
            src="/images/sprites/veronica.png" 
            alt="Veronica" 
            className="w-full h-full object-contain object-top mt-4 scale-150" 
          />
          {/* Hair icon layer */}
          <span className="text-2xl absolute top-1 right-2 bg-slate-950/70 rounded-full p-1 border border-white/10 w-7 h-7 flex items-center justify-center">
            {equippedOutfit.hairstyle === 'long-purple-goth' ? '💜' : equippedOutfit.hairstyle === 'short-black-grunge' ? '🖤' : '💈'}
          </span>
          {/* Clothing Layer */}
          <span className="text-xl absolute bottom-2 left-2 bg-slate-950/70 rounded-full p-1 border border-white/10 w-7 h-7 flex items-center justify-center filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
            {equippedOutfit.top === 'black-corset' ? '👚' : equippedOutfit.top === 'leather-spikes' ? '🧥' : '👕'}
          </span>
          <span className="text-xl absolute bottom-2 right-2 bg-slate-950/70 rounded-full p-1 border border-white/10 w-7 h-7 flex items-center justify-center filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            {equippedOutfit.bottom === 'skirt-chains' ? '👗' : equippedOutfit.bottom === 'ripped-jeans' ? '👖' : '🩳'}
          </span>
        </div>

        {/* Current outfit list */}
        <div className="text-left w-full space-y-1.5 text-xs text-slate-300 font-medium relative z-10 bg-[#0d0921]/50 p-3.5 rounded-xl border border-white/5">
          <div>💇‍♀️ <span className="text-pink-300">Cabelo:</span> {getOutfitName('hair', equippedOutfit.hairstyle)}</div>
          <div>👚 <span className="text-pink-300">Blusa:</span> {getOutfitName('top', equippedOutfit.top)}</div>
          <div>👖 <span className="text-pink-300">Parte de Baixo:</span> {getOutfitName('bottom', equippedOutfit.bottom)}</div>
        </div>
      </div>

      {/* Right Column: Wardrobe Selector */}
      <div className="flex-[1.5] flex flex-col justify-between">
        <div>
          {/* Closet Category Tabs */}
          <div className="flex gap-2 border-b border-white/5 pb-4 mb-6">
            <button
              onClick={() => { playSound('click'); setActiveTab('hair'); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                activeTab === 'hair' 
                  ? 'bg-pink-500/20 border border-pink-500/30 text-pink-300' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Scissors className="w-3.5 h-3.5" /> Cabelos
            </button>
            <button
              onClick={() => { playSound('click'); setActiveTab('top'); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                activeTab === 'top' 
                  ? 'bg-pink-500/20 border border-pink-500/30 text-pink-300' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Shirt className="w-3.5 h-3.5" /> Blusas
            </button>
            <button
              onClick={() => { playSound('click'); setActiveTab('bottom'); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                activeTab === 'bottom' 
                  ? 'bg-pink-500/20 border border-pink-500/30 text-pink-300' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Palette className="w-3.5 h-3.5" /> Saias/Calças
            </button>
          </div>

          {/* Wardrobe Item Cards */}
          <div className="grid grid-cols-3 gap-4">
            {currentItems.map((item) => {
              const isEquipped = 
                (activeTab === 'hair' && equippedOutfit.hairstyle === item.id) ||
                (activeTab === 'top' && equippedOutfit.top === item.id) ||
                (activeTab === 'bottom' && equippedOutfit.bottom === item.id);

              const isUnlocked = unlockedItems.includes(item.id);

              return (
                <motion.div
                  key={item.id}
                  onClick={() => handleEquip(activeTab, item.id)}
                  whileHover={isUnlocked ? { y: -3 } : {}}
                  whileTap={isUnlocked ? { scale: 0.97 } : {}}
                  className={`relative cursor-pointer bg-white/5 border rounded-xl p-4 flex flex-col items-center justify-between text-center transition-all min-h-[110px] ${
                    !isUnlocked
                      ? 'opacity-40 border-white/5 bg-black/40 cursor-not-allowed'
                      : isEquipped 
                      ? 'border-pink-500 bg-pink-500/5' 
                      : 'border-white/5 hover:border-pink-500/30'
                  }`}
                >
                  <span className="text-3xl filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">{item.preview}</span>
                  <span className="text-[10px] font-bold text-white tracking-wide truncate max-w-[80px]">{item.name}</span>
                  
                  {!isUnlocked && (
                    <div className="absolute top-1.5 right-1.5 text-slate-500">
                      🔒
                    </div>
                  )}

                  {isUnlocked && isEquipped && (
                    <div className="absolute top-1.5 right-1.5 text-pink-400">
                      <CheckCircle2 className="w-4 h-4 fill-[#0d0921]" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        <p className="text-[10px] text-slate-500 font-semibold leading-relaxed mt-6">
          👚 Use o closet para mudar o visual da Veronica. Roupas bloqueadas podem ser adquiridas na Loja de Roupas pelo Mapa usando Gold!
        </p>
      </div>

    </div>
  );
};
