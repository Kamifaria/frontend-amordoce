'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Phone, 
  PhoneOff, 
  BookOpen, 
  Heart, 
  ChevronLeft, 
  Sparkles,
  Volume2,
  VolumeX
} from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';
import { LoveOMeter } from './LoveOMeter';

export const PhoneOverlay: React.FC = () => {
  const {
    isPhoneOpen,
    togglePhone,
    affinities,
    activeCall,
    startCall,
    answerCall,
    endCall,
    unlockedTips
  } = useGameStore();

  const [activeTab, setActiveTab] = useState<'home' | 'contacts' | 'tips'>('home');
  const [muted, setMuted] = useState(false);

  if (!isPhoneOpen) return null;

  // Contact list data
  const contacts = [
    { id: 'remi', name: 'Remi', avatarColor: 'from-violet-600 to-slate-900', initial: 'R' },
    { id: 'harry', name: 'Harry', avatarColor: 'from-red-600 to-zinc-900', initial: 'H' },
    { id: 'maggie', name: 'Maggie', avatarColor: 'from-pink-400 to-purple-600', initial: 'M' },
    { id: 'castiel', name: 'Castiel', avatarColor: 'from-red-500 to-rose-600', initial: 'C' },
    { id: 'lysandre', name: 'Lysandre', avatarColor: 'from-emerald-500 to-teal-600', initial: 'L' },
    { id: 'nathaniel', name: 'Nathaniel', avatarColor: 'from-amber-400 to-yellow-500', initial: 'N' },
    { id: 'armin', name: 'Armin', avatarColor: 'from-blue-500 to-indigo-600', initial: 'Ar' },
    { id: 'alexy', name: 'Alexy', avatarColor: 'from-cyan-400 to-pink-500', initial: 'Al' },
  ];

  // List of all tips
  const datingTips = [
    {
      id: 'welcome_tip',
      title: 'Bem-vinda a Sweet Amoris!',
      content: 'Fale com os garotos no corredor para ganhar afinidade. Respostas doces ou ousadas aumentam seus pontos, respostas grosseiras diminuem!',
    },
    {
      id: 'remi_likes',
      title: 'Charme do Remi',
      content: 'Remi adora mistério, cartas de tarô e atitude. Respostas ousadas e confiantes chamam sua atenção. D\'accord, chérie?',
    },
    {
      id: 'harry_likes',
      title: 'Rebeldia de Harry',
      content: 'Harry adora garotas irônicas, música e atitude desafiadora. Ele toca guitarra e ama ser provocado de volta.',
    },
    {
      id: 'maggie_likes',
      title: 'Energia da Maggie',
      content: 'Maggie é sua melhor amiga caótica no clube de artes. Apoie as ideias artísticas excêntricas dela para mantê-la animada!',
    },
    {
      id: 'castiel_likes',
      title: 'Gostos do Castiel',
      content: 'Castiel ama guitarras, rock pesado e garotas que dizem o que pensam sem rodeios. Evite Nathaniel perto dele!',
    },
    {
      id: 'nathaniel_likes',
      title: 'Segredos do Nathaniel',
      content: 'Nathaniel é o representante de turma. Ele é organizado, gosta de romances policiais e gatos. Seja educada e responsável.',
    },
    {
      id: 'lysandre_likes',
      title: 'Estilo do Lysandre',
      content: 'Lysandre é misterioso e ama poesia e música vitoriana. Ele é muito esquecido, então ajude-o a achar seus pertences perdidos!',
    },
  ];

  // Custom dialogues for phone call interactions
  const getCallDialogue = (characterId: string, affinity: number): string => {
    if (characterId === 'remi') {
      if (affinity >= 50) return 'Ah, chérie... C\'est toi? Que bom ouvir sua voz. As cartas previram que você ligaria. O que planeja fazer conosco hoje, mon amour?';
      if (affinity >= 10) return 'Bonjour, mon ange. Pensando nas minhas cartas de tarô ou em mim? D\'accord, estou sempre à disposição.';
      return 'Pas de chance... Estou ocupado com os deveres do conselho estudantil. Fale rápido, chérie.';
    }
    if (characterId === 'harry') {
      if (affinity >= 50) return 'E aí! Ligou para ouvir meu solo de guitarra ou já está com saudades da minha provocação diária?';
      if (affinity >= 10) return 'Oi, novata. Estava pensando em te mandar uma mensagem irônica, mas você se antecipou. Curiosa?';
      return 'O que foi? Se for para reclamar do barulho da minha guitarra, desista.';
    }
    if (characterId === 'maggie') {
      if (affinity >= 50) return 'AMIGA! Você não sabe o que eu pintei! Vem voando para o clube de artes agora, precisamos fofocar e planejar sua conquista!';
      if (affinity >= 10) return 'Oii! Estou cheia de purpurina e ideias malucas! Como está indo o seu dia escolar?';
      return 'Oi! Estou no meio de uma colagem caótica agora, te ligo depois!';
    }
    if (characterId === 'castiel') {
      if (affinity >= 50) return 'Oi... O que foi? Estava pensando em você agora mesmo. Quer dar uma volta depois da aula?';
      if (affinity >= 10) return 'Fala, novata. Aconteceu alguma coisa ou só queria ouvir minha voz mesmo?';
      return 'O que você quer? Estou ocupado afinando minha guitarra agora. Fala logo.';
    }
    if (characterId === 'nathaniel') {
      if (affinity >= 50) return 'Olá! Que bom que ligou. Eu estava organizando uns papéis, mas sempre tenho tempo para conversar com você.';
      if (affinity >= 10) return 'Olá! Tudo bem? Se precisar de ajuda com as regras da escola ou tarefas, pode me ligar.';
      return 'Oi. Por favor, seja breve, tenho muitas responsabilidades no grêmio estudantil hoje.';
    }
    if (characterId === 'lysandre') {
      if (affinity >= 50) return 'Olá, minha querida. É adorável ouvir sua voz. Escrevi um poema novo e pensei em você.';
      if (affinity >= 10) return 'Olá. Desculpe, acabei de perder meu bloco de notas de novo... Mas fico feliz em falar com você.';
      return 'Olá. Desculpe-me, estou ocupado ensaiando com o Castiel no momento.';
    }
    return 'Alô? Não consigo falar agora.';
  };

  const currentCharacter = contacts.find(c => c.id === activeCall?.characterId);
  const currentAffinity = affinities[activeCall?.characterId ?? ''] ?? 0;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-end p-6 bg-black/45 backdrop-blur-sm pointer-events-auto">
      {/* Smartphone container */}
      <motion.div 
        initial={{ y: 200, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 200, opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-[340px] h-[640px] rounded-[48px] border-[10px] border-[#1e1c2e] bg-[#0c0a1a] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col ring-4 ring-purple-500/20"
      >
        {/* Smartphone Camera Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 rounded-full bg-[#1e1c2e] z-40 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ml-6" />
        </div>

        {/* Screen Status Bar */}
        <div className="pt-8 px-6 pb-2 flex justify-between items-center text-[10px] font-semibold text-slate-400 select-none z-30 bg-[#0d0a1c]/80 backdrop-blur-md">
          <span>15:25</span>
          <div className="flex items-center gap-1.5">
            <button onClick={() => setMuted(!muted)} className="hover:text-white transition-colors">
              {muted ? <VolumeX size={12} /> : <Volume2 size={12} />}
            </button>
            <span>5G</span>
            <div className="w-5 h-2.5 rounded-sm border border-slate-500 p-0.5 flex items-center">
              <div className="h-full w-3.5 bg-green-500 rounded-2xs" />
            </div>
          </div>
        </div>

        {/* Main Phone Content Area */}
        <div className="flex-1 overflow-y-auto px-5 pb-6 pt-2 select-none flex flex-col">
          <AnimatePresence mode="wait">
            {/* CALL STATE SCREEN */}
            {activeCall ? (
              <motion.div
                key="call"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex-1 flex flex-col items-center justify-between py-8 text-center"
              >
                <div className="mt-8">
                  {/* Call Avatar */}
                  <div className={`w-24 h-24 rounded-full bg-gradient-to-tr ${currentCharacter?.avatarColor || 'from-purple-500 to-indigo-600'} flex items-center justify-center text-4xl font-extrabold text-white shadow-xl shadow-purple-950/40 border border-white/10 mb-4 mx-auto`}>
                    {currentCharacter?.initial}
                  </div>
                  <h2 className="text-xl font-bold text-slate-200">{currentCharacter?.name}</h2>
                  <p className="text-xs text-purple-400 font-semibold tracking-widest uppercase mt-1">
                    {activeCall.status === 'ringing' ? 'Chamando...' : 'Chamada Conectada'}
                  </p>
                </div>

                {/* Call Audio/Visual Wave or Dialogue Box */}
                <div className="w-full px-2 py-4">
                  {activeCall.status === 'ringing' ? (
                    <div className="flex gap-1 justify-center items-center h-16">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ height: [12, 36, 12] }}
                          transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
                          className="w-1 bg-pink-500 rounded-full"
                        />
                      ))}
                    </div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-purple-950/45 border border-pink-500/25 rounded-2xl p-4 text-sm text-slate-100 text-left leading-relaxed shadow-inner"
                    >
                      <span className="block text-[10px] font-bold text-pink-400 uppercase tracking-widest mb-1.5">
                        Mensagem de Voz
                      </span>
                      &ldquo;{getCallDialogue(activeCall.characterId, currentAffinity)}&rdquo;
                    </motion.div>
                  )}
                </div>

                {/* Call Buttons */}
                <div className="flex gap-6 justify-center w-full">
                  {activeCall.status === 'ringing' && activeCall.direction === 'incoming' ? (
                    <>
                      {/* Decline button */}
                      <button 
                        onClick={endCall}
                        className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 active:scale-95 transition-all flex items-center justify-center text-white shadow-lg shadow-red-950/40 cursor-pointer"
                      >
                        <PhoneOff size={22} />
                      </button>
                      {/* Answer button */}
                      <button 
                        onClick={answerCall}
                        className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 active:scale-95 transition-all flex items-center justify-center text-white shadow-lg shadow-green-950/40 cursor-pointer animate-bounce"
                      >
                        <Phone size={22} />
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={endCall}
                      className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 active:scale-95 transition-all flex items-center justify-center text-white shadow-lg shadow-red-950/40 cursor-pointer"
                    >
                      <PhoneOff size={22} />
                    </button>
                  )}
                </div>
              </motion.div>
            ) : (
              // APP NAVIGATION TAB VIEWS
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 flex flex-col mt-2"
              >
                {/* 1. HOME SCREEN */}
                {activeTab === 'home' && (
                  <div className="flex-1 flex flex-col justify-between py-4">
                    {/* Header welcome */}
                    <div>
                      <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">SweetPhone</h1>
                      <p className="text-[11px] text-slate-400 mt-1">Conecte-se com os garotos de Sweet Amoris</p>
                    </div>

                    {/* App grid */}
                    <div className="grid grid-cols-2 gap-4 my-8">
                      {/* Contacts App */}
                      <button 
                        onClick={() => setActiveTab('contacts')}
                        className="aspect-square rounded-3xl bg-gradient-to-tr from-pink-500/20 to-purple-500/20 hover:from-pink-500/30 hover:to-purple-500/30 border border-pink-500/10 hover:border-pink-500/30 transition-all p-4 flex flex-col items-center justify-center gap-2 text-slate-100 group cursor-pointer shadow-lg shadow-black/30"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-pink-500/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Heart className="text-pink-400 fill-pink-400/20" size={24} />
                        </div>
                        <span className="text-xs font-semibold tracking-wider">Garotos</span>
                      </button>

                      {/* Tips App */}
                      <button 
                        onClick={() => setActiveTab('tips')}
                        className="aspect-square rounded-3xl bg-gradient-to-tr from-purple-500/20 to-indigo-500/20 hover:from-purple-500/30 hover:to-indigo-500/30 border border-purple-500/10 hover:border-purple-500/30 transition-all p-4 flex flex-col items-center justify-center gap-2 text-slate-100 group cursor-pointer shadow-lg shadow-black/30"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-purple-500/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <BookOpen className="text-purple-400" size={24} />
                        </div>
                        <span className="text-xs font-semibold tracking-wider">LoveTips</span>
                      </button>
                    </div>

                    {/* Bottom Status panel */}
                    <div className="bg-[#120e24]/75 border border-slate-700/20 rounded-2xl p-4 flex items-center gap-3">
                      <Sparkles className="text-pink-400 shrink-0" size={18} />
                      <div className="text-left">
                        <span className="block text-[10px] font-bold text-pink-400 uppercase tracking-widest">Dica Rápida</span>
                        <p className="text-[11px] text-slate-300 leading-tight mt-0.5">Visite a tela dos Garotos para ligar para eles e receber encontros!</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. CONTACTS APP */}
                {activeTab === 'contacts' && (
                  <div className="flex-1 flex flex-col pt-2">
                    <div className="flex items-center gap-2 mb-4">
                      <button onClick={() => setActiveTab('home')} className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white cursor-pointer">
                        <ChevronLeft size={18} />
                      </button>
                      <h2 className="text-lg font-bold text-slate-200">Meus Relacionamentos</h2>
                    </div>

                    {/* Contacts scroll list */}
                    <div className="flex flex-col gap-4 overflow-y-auto max-h-[460px] pr-1">
                      {contacts.map((char) => {
                        const score = affinities[char.id] ?? 0;
                        return (
                          <div key={char.id} className="flex flex-col gap-2 p-1.5 bg-[#120e2b]/55 border border-purple-500/10 rounded-2xl shadow-sm">
                            <div className="flex items-center justify-between px-2 pt-1">
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${char.avatarColor} flex items-center justify-center font-bold text-white text-base shadow`}>
                                  {char.initial}
                                </div>
                                <span className="font-semibold text-slate-100">{char.name}</span>
                              </div>
                              
                              {/* Call Button */}
                              <button
                                onClick={() => startCall(char.id)}
                                className="w-9 h-9 rounded-xl bg-pink-500 hover:bg-pink-600 text-white flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer"
                              >
                                <Phone size={16} />
                              </button>
                            </div>
                            
                            {/* In-Phone LoveOMeter component */}
                            <LoveOMeter characterName="Afinidade" affinityScore={score} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 3. LOVETIPS DIARY APP */}
                {activeTab === 'tips' && (
                  <div className="flex-1 flex flex-col pt-2">
                    <div className="flex items-center gap-2 mb-4">
                      <button onClick={() => setActiveTab('home')} className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white cursor-pointer">
                        <ChevronLeft size={18} />
                      </button>
                      <h2 className="text-lg font-bold text-slate-200">Guia LoveTips</h2>
                    </div>

                    {/* Tips scroll list */}
                    <div className="flex flex-col gap-4 overflow-y-auto max-h-[460px] pr-1">
                      {datingTips.map((tip) => {
                        const isUnlocked = unlockedTips.includes(tip.id);
                        return (
                          <div 
                            key={tip.id} 
                            className={`p-4 rounded-2xl border transition-all duration-300 ${
                              isUnlocked 
                                ? 'bg-purple-950/20 border-purple-500/25 shadow-md shadow-purple-950/10' 
                                : 'bg-[#0b0a14]/60 border-slate-800/40 opacity-45'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <h3 className="font-bold text-sm text-slate-200 flex items-center gap-1.5">
                                <Sparkles size={14} className={isUnlocked ? 'text-pink-400' : 'text-slate-600'} />
                                {tip.title}
                              </h3>
                              <span className="text-[9px] font-bold uppercase tracking-widest text-pink-500">
                                {isUnlocked ? 'Desbloqueado' : 'Bloqueado'}
                              </span>
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed text-left">
                              {isUnlocked ? tip.content : 'Aumente afinidade com os garotos para desbloquear dicas especiais!'}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Home Indicator bar */}
        <div className="py-2.5 flex justify-center bg-[#0c0a1a] border-t border-slate-900 z-30">
          <button 
            onClick={() => {
              if (activeCall) return;
              if (activeTab !== 'home') setActiveTab('home');
              else togglePhone();
            }}
            className="w-32 h-1.5 rounded-full bg-slate-500/40 hover:bg-slate-400 transition-colors cursor-pointer"
          />
        </div>

        {/* Close Button on Top Right */}
        <button 
          onClick={togglePhone}
          className="absolute top-8 right-5 p-1.5 rounded-full bg-black/40 hover:bg-black/60 border border-slate-700/20 text-slate-400 hover:text-white transition-all cursor-pointer z-35"
        >
          <X size={14} />
        </button>
      </motion.div>
    </div>
  );
};
