'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GameScreen } from '@/components/game/GameScreen';

export default function GamePage() {
  const router = useRouter();

  // Authentication check on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0f0c1b] text-slate-100 flex flex-col items-center justify-center font-sans">
      {/* Main Game Screen Board HUD */}
      <GameScreen />
    </div>
  );
}
