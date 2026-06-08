'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Home, Users, Sparkles, BookOpen, ShieldAlert } from 'lucide-react';

export const SideNavMenu: React.FC = () => {
  const menuItems = [
    { name: 'Início', icon: <Home size={16} />, href: '#intro' },
    { name: 'Paqueras', icon: <Users size={16} />, href: '#crushes' },
    { name: 'Personalização', icon: <Sparkles size={16} />, href: '#custom' },
    { name: 'Episódios', icon: <BookOpen size={16} />, href: '#episodes' },
    { name: 'Aplicativo', icon: <ShieldAlert size={16} />, href: '#app' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    alert(`A seção "${href.replace('#', '')}" é ilustrativa para simular o site oficial.`);
  };

  return (
    <div className="flex flex-col gap-6 bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-md shadow-2xl w-full max-w-[240px]">
      
      {/* Navigation Title */}
      <div className="text-[10px] font-black uppercase tracking-widest text-pink-400 border-b border-white/10 pb-2 mb-1">
        Menu de Navegação
      </div>

      {/* Menu Links */}
      <nav className="flex flex-col gap-1.5">
        {menuItems.map((item, index) => (
          <motion.a
            key={item.name}
            href={item.href}
            onClick={(e) => handleLinkClick(e, item.href)}
            whileHover={{ x: 6, color: '#f472b6' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-slate-300 font-semibold text-xs transition-colors"
          >
            <span className="text-pink-400">{item.icon}</span>
            <span>{item.name}</span>
          </motion.a>
        ))}
      </nav>

      {/* Divider */}
      <div className="border-t border-white/10 my-1" />

      {/* Social Media Links */}
      <div className="flex flex-col gap-3">
        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
          Redes Sociais
        </span>
        <div className="flex items-center gap-3">
          <motion.a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15, y: -2 }}
            className="w-8 h-8 rounded-lg bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 flex items-center justify-center transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </motion.a>
          <motion.a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15, y: -2 }}
            className="w-8 h-8 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/><path d="m10 15 5-3-5-3v6z"/></svg>
          </motion.a>
          <motion.a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15, y: -2 }}
            className="w-8 h-8 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 flex items-center justify-center transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
          </motion.a>
        </div>
      </div>
    </div>
  );
};
