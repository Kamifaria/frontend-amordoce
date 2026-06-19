'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, Shirt, Heart, Music, VolumeX, LogOut, Image } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { EpisodeSelector } from './EpisodeSelector';
import { TarotDraw } from './TarotDraw';
import { AffinityTracker } from './AffinityTracker';
import { WardrobeCloset } from './WardrobeCloset';
import { DailyQuests } from './DailyQuests';
import { GalleryTab } from './GalleryTab';
import { VeronicaPiano } from '../game/piano/VeronicaPiano';

export const LobbyContainer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'episodes' | 'tarot' | 'closet' | 'affinities' | 'gallery' | 'quarto'>('episodes');
  const { playerPA, playerGold, isMuted, toggleMute, playSound } = useGameStore();

  const handleTabChange = (tab: 'episodes' | 'tarot' | 'closet' | 'affinities' | 'gallery' | 'quarto') => {
    playSound('click');
    setActiveTab(tab);
  };

  const handleLogout = () => {
    playSound('click');
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="h-[100dvh] w-screen bg-[#070514] overflow-y-auto overflow-x-hidden font-sans relative pb-12 flex flex-col items-center">
      {/* Absolute background image with lower opacity for ambient atmosphere */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 blur-sm scale-102 pointer-events-none"
        style={{ backgroundImage: `url('/images/login_background.jpg')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0821]/80 via-[#100c2a]/95 to-[#070514] pointer-events-none" />

      {/* Top dashboard header bar */}
      <header className="relative z-10 w-full max-w-6xl px-4 md:px-6 py-3 md:py-5 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 border-b border-white/5">
        {/* Title */}
        <div className="flex items-center gap-3">
          <img 
            src="/images/logo_veronica.png" 
            alt="Amor Doce da Veronica" 
            className="h-12 object-contain drop-shadow-[0_0_10px_rgba(236,72,153,0.3)]"
          />
        </div>

        {/* Currency details + mute controls */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-4 bg-[#120e2e]/90 border border-pink-500/20 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-lg">
            {/* PA */}
            <div className="flex items-center gap-1.5">
              <span className="text-pink-400">🍬 PA:</span>
              <span className="text-white">{playerPA}</span>
            </div>
            {/* Gold */}
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-1.5">
              <span className="text-yellow-400">🪙 Gold:</span>
              <span className="text-white">${playerGold}</span>
            </div>
          </div>

          {/* Music toggle */}
          <button
            onClick={toggleMute}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-pink-400 cursor-pointer transition-colors shadow-lg"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Music className="w-4 h-4" />}
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="p-2.5 rounded-xl bg-red-950/20 hover:bg-red-950/40 border border-red-500/20 text-red-400 cursor-pointer transition-colors shadow-lg"
            title="Sair do Jogo"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content Dashboard */}
      <main className="relative z-10 w-full max-w-6xl px-4 md:px-6 mt-4 md:mt-8 flex-1 flex flex-col gap-4 md:gap-6">
        
        {/* Tab Navigation Menu */}
        <nav className="flex flex-nowrap overflow-x-auto md:flex-wrap gap-2.5 border-b border-white/5 pb-4 md:pb-5">
          <button
            onClick={() => handleTabChange('episodes')}
            className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 cursor-pointer transition-all ${
              activeTab === 'episodes'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/10'
                : 'bg-white/5 text-slate-400 hover:text-white border border-white/5 hover:border-white/10'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Escolha de Episódios</span>
          </button>

          <button
            onClick={() => handleTabChange('quarto')}
            className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 cursor-pointer transition-all ${
              activeTab === 'quarto'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/10'
                : 'bg-white/5 text-slate-400 hover:text-white border border-white/5 hover:border-white/10'
            }`}
          >
            <Music className="w-4 h-4 text-amber-300" />
            <span>Meu Quarto (Piano)</span>
          </button>

          <button
            onClick={() => handleTabChange('tarot')}
            className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 cursor-pointer transition-all ${
              activeTab === 'tarot'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/10'
                : 'bg-white/5 text-slate-400 hover:text-white border border-white/5 hover:border-white/10'
            }`}
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>Tarô do Remi</span>
          </button>

          <button
            onClick={() => handleTabChange('closet')}
            className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 cursor-pointer transition-all ${
              activeTab === 'closet'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/10'
                : 'bg-white/5 text-slate-400 hover:text-white border border-white/5 hover:border-white/10'
            }`}
          >
            <Shirt className="w-4 h-4" />
            <span>Closet</span>
          </button>

          <button
            onClick={() => handleTabChange('gallery')}
            className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 cursor-pointer transition-all ${
              activeTab === 'gallery'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/10'
                : 'bg-white/5 text-slate-400 hover:text-white border border-white/5 hover:border-white/10'
            }`}
          >
            <Image className="w-4 h-4" />
            <span>Galeria</span>
          </button>

          <button
            onClick={() => handleTabChange('affinities')}
            className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 cursor-pointer transition-all ${
              activeTab === 'affinities'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/10'
                : 'bg-white/5 text-slate-400 hover:text-white border border-white/5 hover:border-white/10'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Afinidades (Love-o-Meter)</span>
          </button>
        </nav>

        {/* Tab view area */}
        <div className="flex-1 mt-2">
          {activeTab === 'episodes' && (
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="flex-[1.8] w-full">
                <EpisodeSelector />
              </div>
              <div className="flex-1 w-full lg:max-w-md">
                <DailyQuests />
              </div>
            </div>
          )}
          {activeTab === 'tarot' && <TarotDraw />}
          {activeTab === 'closet' && <WardrobeCloset />}
          {activeTab === 'gallery' && <GalleryTab />}
          {activeTab === 'affinities' && <AffinityTracker />}
          {activeTab === 'quarto' && <VeronicaPiano onClose={() => setActiveTab('episodes')} />}
        </div>
      </main>
    </div>
  );
};

