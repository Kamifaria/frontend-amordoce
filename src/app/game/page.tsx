'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GameScreen } from '@/components/game/GameScreen';
import { LobbyContainer } from '@/components/lobby';
import { useGameStore } from '@/store/useGameStore';
import { AchievementToast } from '@/components/game/AchievementToast';

export default function GamePage() {
  const router = useRouter();
  const currentView = useGameStore((state) => state.currentView);

  // Authentication check on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0f0c1b] text-slate-100 flex flex-col items-center justify-center font-sans w-screen overflow-hidden">
      {currentView === 'lobby' ? <LobbyContainer /> : <GameScreen />}
      <AchievementToast />
    </div>
  );
}
