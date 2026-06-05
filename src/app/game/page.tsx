'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GameScreen } from '@/components/game/GameScreen';
import { PhoneOverlay } from '@/components/game/PhoneOverlay';
import { useGameStore } from '@/store/useGameStore';
import { Heart, Coins, RefreshCw, Smartphone, LogOut } from 'lucide-react';
import { mockStory } from '@/mock/storyData';

export default function GamePage() {
  const router = useRouter();
  const {
    playerPA,
    playerGold,
    togglePhone,
    initStory
  } = useGameStore();

  // Authentication check on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const handleRestart = () => {
    initStory(mockStory, 'start', 100, 50);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-[#0f0c1b] text-slate-100 flex flex-col items-center justify-center font-sans">
      
      {/* Header Info / Stat Bar */}
      <div className="absolute top-4 left-4 right-4 z-40 flex items-center justify-between pointer-events-none">
        <div className="flex gap-4 pointer-events-auto">
          {/* PA Stats */}
          <div className="flex items-center gap-2 rounded-full border border-pink-500/20 bg-[#120e24]/80 px-4 py-1.5 shadow-lg backdrop-blur-md">
            <Heart className="text-pink-500 fill-pink-500" size={18} />
            <div className="text-xs font-bold tracking-wider text-pink-300">
              PA: <span className="text-white text-sm">{playerPA}</span>
            </div>
          </div>

          {/* Gold Stats */}
          <div className="flex items-center gap-2 rounded-full border border-amber-500/20 bg-[#120e24]/80 px-4 py-1.5 shadow-lg backdrop-blur-md">
            <Coins className="text-amber-400 fill-amber-400" size={18} />
            <div className="text-xs font-bold tracking-wider text-amber-300">
              Gold: <span className="text-white text-sm">${playerGold}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pointer-events-auto">
          {/* Smart Phone Toggle Button */}
          <button 
            onClick={togglePhone}
            className="flex items-center gap-2 rounded-full border border-pink-500/20 bg-[#120e24]/80 hover:bg-pink-950/60 transition-all px-4 py-1.5 shadow-lg backdrop-blur-md text-xs font-bold uppercase tracking-wider text-pink-300 cursor-pointer"
          >
            <Smartphone size={14} />
            Celular
          </button>

          {/* Restart Button */}
          <button 
            onClick={handleRestart}
            className="flex items-center gap-2 rounded-full border border-purple-500/20 bg-[#120e24]/80 hover:bg-purple-950/60 transition-all px-4 py-1.5 shadow-lg backdrop-blur-md text-xs font-bold uppercase tracking-wider text-purple-300 cursor-pointer"
          >
            <RefreshCw size={14} />
            Reiniciar
          </button>

          {/* Logout Button */}
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-full border border-slate-700/20 bg-[#120e24]/80 hover:bg-slate-900/60 transition-all px-4 py-1.5 shadow-lg backdrop-blur-md text-xs font-bold uppercase tracking-wider text-slate-400 cursor-pointer"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>

      {/* Main Game Screen Board HUD */}
      <GameScreen />

      {/* Smartphone overlay */}
      <PhoneOverlay />
    </div>
  );
}
