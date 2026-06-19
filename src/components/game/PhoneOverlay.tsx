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
  VolumeX,
  Image as ImageIcon
} from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';
import { LoveOMeter } from './LoveOMeter';
import { SweetGramApp } from './SweetGramApp';
import { getCallDialogue, getCallChoices } from '../../utils/phoneDialogues';

export const PhoneOverlay: React.FC = () => {
  const {
    isPhoneOpen,
    togglePhone,
    affinities,
    activeCall,
    startCall,
    answerCall,
    endCall,
    unlockedTips,
    isMuted,
    toggleMute,
    chatThreads,
    cluesFound,
    metCharacters,
    savedPaintings,
    storyStage,
  } = useGameStore();

  const [activeTab, setActiveTab] = useState<'home' | 'contacts' | 'tips' | 'chat' | 'sweetgram' | 'gallery'>('home');
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [selectedCallChoice, setSelectedCallChoice] = useState<number | null>(null);
  const [callResponseText, setCallResponseText] = useState<string | null>(null);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedCallChoice(null);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCallResponseText(null);
  }, [activeCall?.characterId, activeCall?.status]);

  if (!isPhoneOpen) return null;

  // Contact list data
  const contacts = [
    { id: 'remi', name: 'Remi', avatarColor: 'from-violet-600 to-slate-900', initial: 'R' },
    { id: 'harry', name: 'Harry', avatarColor: 'from-red-600 to-zinc-900', initial: 'H' },
    { id: 'maggie', name: 'Maggie', avatarColor: 'from-pink-400 to-purple-600', initial: 'M' },
    { id: 'kami', name: 'Kami', avatarColor: 'from-purple-900 via-indigo-950 to-black', initial: 'K' },
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
      id: 'kami_likes',
      title: 'Manias da Kami',
      content: 'Kami é reservada e alternativa. Ela gosta de silêncio, música grunge/gótica e de pessoas autênticas. Não seja chata ou submissa com ela!',
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



  const currentCharacter = contacts.find(c => c.id === activeCall?.characterId);
  const currentAffinity = affinities[activeCall?.characterId ?? ''] ?? 0;

  return (
    <div 
      onClick={togglePhone}
      className="absolute inset-0 z-50 flex items-center justify-center md:justify-end p-0 md:p-6 bg-[#0c0a1a] md:bg-black/60 backdrop-blur-sm pointer-events-auto cursor-pointer"
    >
      {/* Smartphone container */}
      <motion.div 
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 200, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 200, opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full h-[100dvh] md:w-[340px] md:h-[640px] rounded-none md:rounded-[48px] border-0 md:border-[10px] border-[#1e1c2e] bg-[#0c0a1a] shadow-none md:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col ring-0 md:ring-4 ring-purple-500/20 cursor-default"
      >
        {/* Smartphone Camera Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 rounded-full bg-[#1e1c2e] z-40 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ml-6" />
        </div>

        {/* Screen Status Bar */}
        <div className="pt-8 px-6 pb-2 flex justify-between items-center text-[10px] font-semibold text-slate-400 select-none z-30 bg-[#0d0a1c]/80 backdrop-blur-md">
          <span>15:25</span>
          <div className="flex items-center gap-1.5">
            <button onClick={toggleMute} className="hover:text-white transition-colors cursor-pointer">
              {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
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
                  <h2 className="text-xl font-bold text-slate-200 flex items-center justify-center gap-1">
                    {currentCharacter?.name}
                    {activeCall.status === 'connected' && currentAffinity >= 50 && (
                      <Heart size={18} className="text-pink-500 fill-pink-500 animate-pulse" />
                    )}
                  </h2>
                  <p className="text-xs text-purple-400 font-semibold tracking-widest uppercase mt-1">
                    {activeCall.status === 'ringing'
                      ? 'Chamando...'
                      : currentAffinity >= 50
                      ? 'Ligação Amorosa ❤️'
                      : 'Ligação de Amizade 💬'}
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
                    <div className="flex flex-col gap-4">
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-purple-950/45 border border-pink-500/25 rounded-2xl p-4 text-sm text-slate-100 text-left leading-relaxed shadow-inner"
                      >
                        <span className="block text-[10px] font-bold text-pink-400 uppercase tracking-widest mb-1.5">
                          {callResponseText ? 'Resposta' : 'Chamada de Voz'}
                        </span>
                        &ldquo;{callResponseText || getCallDialogue(activeCall.characterId, currentAffinity, storyStage)}&rdquo;
                      </motion.div>

                      {/* Display call response choices if not chosen yet */}
                      {!callResponseText && (
                        <div className="flex flex-col gap-2">
                          {getCallChoices(activeCall.characterId, currentAffinity, storyStage).map((choice, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                const changeAffinity = useGameStore.getState().changeAffinity;
                                if (choice.affinityChange) {
                                  changeAffinity(activeCall.characterId, choice.affinityChange);
                                }
                                setSelectedCallChoice(idx);
                                setCallResponseText(choice.replyText);
                              }}
                              className="w-full text-[11px] p-2.5 rounded-xl border border-pink-500/20 hover:border-pink-500/50 bg-[#120e24]/90 hover:bg-pink-950/20 text-slate-200 hover:text-white transition-all text-left cursor-pointer font-medium"
                            >
                              {choice.text}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
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
                      <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent font-serif">SweetPhone</h1>
                      <p className="text-[11px] text-slate-400 mt-0.5">Conecte-se com os garotos de Sweet Amoris</p>
                    </div>

                    {/* Quick cellphone explanation */}
                    <div className="bg-[#191330] border border-pink-500/20 rounded-2xl p-3 text-left my-2 shadow-inner">
                      <span className="block text-[10px] font-bold text-pink-400 uppercase tracking-widest mb-1.5 flex items-center gap-1 select-none">
                        📱 Guia do Celular
                      </span>
                      <p className="text-[11px] text-slate-200 leading-normal">
                        • <strong>Garotos</strong>: Veja afinidades (Love-o-Meter) e faça ligações.<br/>
                        • <strong>SweetChat</strong>: Converse por chat para progredir na história.<br/>
                        • <strong>SweetGram</strong>: Acompanhe postagens e fotos dos alunos.<br/>
                        • <strong>LoveTips</strong>: Veja dicas secretas desbloqueadas com afinidade!
                      </p>
                    </div>

                    {/* App grid */}
                    <div className="grid grid-cols-2 gap-4 my-4">
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

                      {/* Gallery App */}
                      <button 
                        onClick={() => setActiveTab('gallery')}
                        className="aspect-square rounded-3xl bg-gradient-to-tr from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-amber-500/10 hover:border-amber-500/30 transition-all p-4 flex flex-col items-center justify-center gap-2 text-slate-100 group cursor-pointer shadow-lg shadow-black/30"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <ImageIcon className="text-amber-400" size={24} />
                        </div>
                        <span className="text-xs font-semibold tracking-wider">Galeria</span>
                      </button>

                      {/* SweetGram App */}
                      <button 
                        onClick={() => {
                          const playSound = useGameStore.getState().playSound;
                          playSound('click');
                          setActiveTab('sweetgram');
                        }}
                        className="col-span-2 py-3.5 px-6 rounded-3xl bg-gradient-to-r from-pink-500/20 to-purple-600/20 hover:from-pink-500/30 hover:to-purple-600/30 border border-pink-500/10 hover:border-pink-500/30 transition-all flex items-center justify-between text-slate-100 group cursor-pointer shadow-md my-0.5"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-2xl bg-pink-500/15 flex items-center justify-center group-hover:scale-105 transition-transform text-2xl">
                            📸
                          </div>
                          <div className="text-left">
                            <span className="text-xs font-bold tracking-wider block">SweetGram</span>
                            <span className="text-[10px] text-pink-300">Fotos e comentários</span>
                          </div>
                        </div>
                        <span className="text-[9px] font-bold text-pink-400 uppercase tracking-widest bg-pink-500/10 px-2.5 py-0.5 rounded-full">Social</span>
                      </button>
                    </div>

                    {/* Chat App button */}
                    <button 
                      onClick={() => setActiveTab('chat')}
                      className="w-full py-4 px-6 rounded-3xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 border border-emerald-500/10 hover:border-emerald-500/30 transition-all flex items-center justify-between text-slate-100 group cursor-pointer shadow-md my-2"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 flex items-center justify-center group-hover:scale-105 transition-transform text-2xl">
                          💬
                        </div>
                        <div className="text-left">
                          <span className="text-xs font-bold tracking-wider block">SweetChat</span>
                          <span className="text-[10px] text-emerald-300">Mensagens escolares</span>
                        </div>
                      </div>
                      {chatThreads.some(t => t.unread) && (
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse mr-2" />
                      )}
                    </button>

                    {/* Bottom Status panel */}
                    <div className="bg-[#120e24]/75 border border-slate-700/20 rounded-2xl p-4 flex items-center gap-3">
                      <Sparkles className="text-pink-400 shrink-0" size={18} />
                      <div className="text-left">
                        <span className="block text-[10px] font-bold text-pink-400 uppercase tracking-widest">Dica Rápida</span>
                        <p className="text-[11px] text-slate-300 leading-tight mt-0.5">Visite a aba SweetChat para conversar e desbloquear encontros!</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* GALLERY APP */}
                {activeTab === 'gallery' && (
                  <div className="flex-1 flex flex-col pt-2 h-full">
                    <div className="flex items-center gap-2 mb-4">
                      <button onClick={() => setActiveTab('home')} className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white cursor-pointer">
                        <ChevronLeft size={18} />
                      </button>
                      <h2 className="text-lg font-bold text-slate-200">Minhas Pinturas</h2>
                    </div>

                    <div className="flex-1 overflow-y-auto grid grid-cols-2 gap-3 pr-1 pb-20">
                      {savedPaintings.length === 0 ? (
                        <div className="col-span-2 text-center text-slate-500 text-xs py-10">
                          Nenhuma arte salva ainda.<br/>Visite a Sala de Artes!
                        </div>
                      ) : (
                        savedPaintings.map((imgUrl, idx) => (
                          <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-white/5 group">
                            <img src={imgUrl} alt={`Pintura ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                          </div>
                        ))
                      )}
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
                      {contacts
                        .filter((char) => (metCharacters || []).includes(char.id))
                        .map((char) => {
                        const score = affinities[char.id] ?? 0;
                        return (
                          <div key={char.id} className="flex flex-col gap-2 p-1.5 bg-[#120e2b]/55 border border-purple-500/10 rounded-2xl shadow-sm">
                            <div className="flex items-center justify-between px-2 pt-1">
                              <div className="flex items-center gap-3 flex-1 min-w-0 pr-2">
                                <div className={`w-10 h-10 shrink-0 rounded-full bg-gradient-to-tr ${char.avatarColor} flex items-center justify-center font-bold text-white text-base shadow`}>
                                  {char.initial}
                                </div>
                                <span className="font-semibold text-slate-100 truncate">{char.name}</span>
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

                    {/* Clues section */}
                    <div className="mb-4 bg-purple-950/20 border border-purple-500/20 rounded-2xl p-3 text-left">
                      <h3 className="font-bold text-xs text-pink-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                        🔍 Inventário de Pistas
                      </h3>
                      {cluesFound.length === 0 ? (
                        <p className="text-[10px] text-slate-400 italic">Nenhuma pista coletada ainda. Explore a escola!</p>
                      ) : (
                        <div className="flex flex-col gap-1.5">
                          {cluesFound.includes('chave_pequena') && (
                            <div className="text-[11px] text-slate-200 bg-white/5 p-2 rounded-xl border border-white/5 flex justify-between items-center">
                              <span>🔑 Chave Pequena (Quadra)</span>
                              <span className="text-[8px] text-emerald-400 font-bold">Coletado</span>
                            </div>
                          )}
                          {cluesFound.includes('gabarito_rasgado') && (
                            <div className="text-[11px] text-slate-200 bg-white/5 p-2 rounded-xl border border-white/5 flex justify-between items-center">
                              <span>📄 Gabarito Rasgado (Galpão)</span>
                              <span className="text-[8px] text-emerald-400 font-bold">Coletado</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Tips scroll list */}
                    <div className="flex flex-col gap-4 overflow-y-auto max-h-[260px] pr-1">
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

                {/* 4. SWEETCHAT APP (WhatsApp-like) */}
                {activeTab === 'chat' && (
                  <div className="flex-1 flex flex-col pt-2 h-full">
                    {!activeThreadId ? (
                      <>
                        <div className="flex items-center gap-2 mb-4">
                          <button onClick={() => setActiveTab('home')} className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white cursor-pointer">
                            <ChevronLeft size={18} />
                          </button>
                          <h2 className="text-lg font-bold text-slate-200">SweetChat</h2>
                        </div>
                        
                        {/* Threads list */}
                        <div className="flex flex-col gap-3 overflow-y-auto max-h-[460px] pr-1">
                          {chatThreads.length === 0 ? (
                            <div className="text-center text-slate-500 py-10 text-xs italic">
                              Nenhuma conversa ativa no momento...
                            </div>
                          ) : (
                            chatThreads.map((thread) => {
                              const lastMsg = thread.messages[thread.messages.length - 1];
                              return (
                                <button
                                  key={thread.characterId}
                                  onClick={() => {
                                    setActiveThreadId(thread.characterId);
                                    // Mark as read in store
                                    useGameStore.setState((s) => ({
                                      chatThreads: s.chatThreads.map(t => t.characterId === thread.characterId ? { ...t, unread: false } : t)
                                    }));
                                  }}
                                  className="w-full flex items-center justify-between p-3 rounded-2xl bg-[#120e2b]/55 hover:bg-[#191438]/70 border border-purple-500/10 hover:border-pink-500/20 transition-all text-left cursor-pointer"
                                >
                                  <div className="flex items-center gap-3 flex-1 min-w-0 pr-2">
                                    <div className={`w-10 h-10 shrink-0 rounded-full bg-gradient-to-tr ${thread.avatarColor} flex items-center justify-center font-bold text-white text-base shadow`}>
                                      {thread.characterName.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <span className="font-semibold text-slate-100 text-sm block truncate py-0.5">{thread.characterName}</span>
                                      <span className="text-[11px] text-slate-400 truncate block mt-0.5">
                                        {lastMsg ? lastMsg.text : 'Sem mensagens'}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex flex-col items-end gap-1.5">
                                    <span className="text-[9px] text-slate-500">{lastMsg ? lastMsg.timestamp : ''}</span>
                                    {thread.unread && (
                                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                                    )}
                                  </div>
                                </button>
                              );
                            })
                          )}
                        </div>
                      </>
                    ) : (
                      // Single conversation window
                      (() => {
                        const thread = chatThreads.find(t => t.characterId === activeThreadId);
                        if (!thread) {
                          setActiveThreadId(null);
                          return null;
                        }
                        
                        // Check if last message has choices
                        const currentChoicesMsg = thread.messages.find(m => m.choices && m.choices.length > 0);
                        const hasChoices = !!currentChoicesMsg;
                        
                        return (
                          <div className="flex-1 flex flex-col h-full">
                            {/* Chat Header */}
                            <div className="flex items-center gap-3 pb-3 border-b border-slate-800/80 mb-3">
                              <button onClick={() => setActiveThreadId(null)} className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white cursor-pointer">
                                <ChevronLeft size={18} />
                              </button>
                              <div className={`w-8 h-8 shrink-0 rounded-full bg-gradient-to-tr ${thread.avatarColor} flex items-center justify-center font-bold text-white text-xs shadow`}>
                                {thread.characterName.charAt(0)}
                              </div>
                              <div className="text-left flex-1 min-w-0 pr-2">
                                <span className="font-bold text-slate-200 text-sm block leading-normal truncate py-0.5">{thread.characterName}</span>
                                <span className="text-[9px] text-emerald-400 font-semibold tracking-wider uppercase block mt-0.5">Online</span>
                              </div>
                            </div>
                            
                            {/* Message Bubble Feed */}
                            <div className="flex-1 overflow-y-auto max-h-[300px] flex flex-col gap-2.5 pr-1 mb-3">
                              {thread.messages.map((msg) => {
                                const isPlayer = msg.sender === 'player';
                                return (
                                  <div
                                    key={msg.id}
                                    className={`flex flex-col max-w-[80%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                                      isPlayer
                                        ? 'bg-gradient-to-tr from-pink-600 to-purple-600 text-white rounded-tr-none self-end text-right font-medium'
                                        : 'bg-[#181530] text-slate-100 border border-slate-700/20 rounded-tl-none self-start text-left font-medium'
                                    }`}
                                  >
                                    <p>{msg.text}</p>
                                    <span className={`text-[8px] mt-1 block ${isPlayer ? 'text-pink-200 text-right' : 'text-purple-300 text-left'}`}>
                                      {msg.timestamp}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                            
                            {/* Chat Choices or Text Input */}
                            <div className="mt-auto pt-2 border-t border-slate-800/60 bg-[#0c0a1a]">
                              {hasChoices && currentChoicesMsg.choices ? (
                                <div className="flex flex-col gap-2">
                                  <span className="block text-[9px] font-bold text-pink-400 uppercase tracking-widest text-center">
                                    Escolha sua resposta
                                  </span>
                                  {currentChoicesMsg.choices.map((choice, idx) => (
                                    <button
                                      key={idx}
                                      onClick={() => {
                                        const selectChatChoice = useGameStore.getState().selectChatChoice;
                                        selectChatChoice(thread.characterId, idx);
                                      }}
                                      className="w-full text-[11px] p-2.5 rounded-xl border border-pink-500/20 hover:border-pink-500/50 bg-[#120e24] hover:bg-pink-950/20 text-slate-200 hover:text-white transition-all text-left cursor-pointer font-medium"
                                    >
                                      {choice.text}
                                    </button>
                                  ))}
                                </div>
                              ) : (
                                <form
                                  onSubmit={(e) => {
                                    e.preventDefault();
                                    if (!inputText.trim()) return;
                                    const sendChatMessage = useGameStore.getState().sendChatMessage;
                                    sendChatMessage(thread.characterId, inputText);
                                    setInputText('');
                                  }}
                                  className="flex gap-2 items-center"
                                >
                                  <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    placeholder="Digite uma mensagem..."
                                    className="flex-1 bg-[#120e24] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 outline-none focus:border-pink-500/40"
                                  />
                                  <button
                                    type="submit"
                                    className="px-3 py-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold transition-colors cursor-pointer"
                                  >
                                    Enviar
                                  </button>
                                </form>
                              )}
                            </div>
                          </div>
                        );
                      })()
                    )}
                  </div>
                )}

                {/* 5. SWEETGRAM APP */}
                {activeTab === 'sweetgram' && (
                  <SweetGramApp onBack={() => setActiveTab('home')} />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Home Indicator bar */}
        <div className="py-2.5 flex justify-center bg-[#0c0a1a] border-t border-slate-900 z-30">
          <button 
            onClick={() => {
              if (activeCall) {
                endCall();
              }
              if (activeTab !== 'home') setActiveTab('home');
              else togglePhone();
            }}
            className="w-32 h-1.5 rounded-full bg-slate-500/40 hover:bg-slate-400 transition-colors cursor-pointer"
          />
        </div>
      </motion.div>

      {/* Floating Close Button outside the phone frame */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          togglePhone();
        }}
        className="absolute top-6 left-6 md:top-12 md:left-12 p-3 rounded-full bg-[#120e24]/90 hover:bg-[#1b1736]/90 border border-pink-500/40 text-slate-200 hover:text-white transition-all cursor-pointer z-50 flex items-center gap-2 font-bold shadow-lg shadow-black/55 backdrop-blur-md"
        title="Fechar Celular"
      >
        <X size={18} className="text-pink-400 animate-pulse" />
        <span className="text-xs uppercase tracking-wider text-slate-200">Voltar para o Jogo</span>
      </button>
    </div>
  );
};
