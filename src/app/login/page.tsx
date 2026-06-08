'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TopLoginBar } from '@/components/game/TopLoginBar';
import { HeroSection } from '@/components/game/HeroSection';
import { SideNavMenu } from '@/components/game/SideNavMenu';

export default function Login() {
  const handleScrollToLogin = () => {
    // Focus the first input of TopLoginBar
    const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
    if (emailInput) {
      emailInput.focus();
      emailInput.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="min-h-screen w-screen flex flex-col bg-[#090714] text-slate-100 overflow-x-hidden font-sans relative"
      style={{
        backgroundImage: `linear-gradient(rgba(9, 7, 20, 0.45), rgba(9, 7, 20, 0.65)), url('https://www.amordoce.com/image/index/disconnected/s1/crush.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* 1. Header Bar: TopLoginBar */}
      <TopLoginBar />

      {/* 2. Main Page Container */}
      <div className="flex-1 flex flex-col justify-center items-center max-w-7xl w-full mx-auto px-6 py-12 md:py-16 z-10 relative">
        
        {/* Sweet Amoris Logo: Centralized */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-12 flex justify-center w-full"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://www.amordoce.com/image/i18n/br/logo-as/as-s1.png" 
            alt="Sweet Amoris Logo" 
            className="h-28 sm:h-36 object-contain drop-shadow-[0_4px_12px_rgba(236,72,153,0.3)] select-none pointer-events-none"
          />
        </motion.div>

        {/* Content Columns: Hero on Left, Side Navigation on Right */}
        <div className="w-full flex flex-col md:flex-row items-center md:items-start justify-between gap-12 mt-4">
          
          {/* Left Column: HeroSection */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 w-full flex justify-center md:justify-start"
          >
            <HeroSection onPlayClick={handleScrollToLogin} />
          </motion.div>

          {/* Right Column: SideNavMenu */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full md:w-auto flex justify-center md:justify-end shrink-0"
          >
            <SideNavMenu />
          </motion.div>

        </div>
      </div>

      {/* Subtle bottom decorative overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#090714] to-transparent pointer-events-none" />
    </div>
  );
}
