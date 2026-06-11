'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Key, HelpCircle } from 'lucide-react';

interface TopLoginBarProps {
  onShowRegister?: () => void;
}

export const TopLoginBar: React.FC<TopLoginBarProps> = ({ onShowRegister }) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email.split('@')[0], password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          localStorage.setItem('token', data.token);
          router.push('/game');
          return;
        }
      }
    } catch (err) {
      console.warn('Backend offline ou erro de autenticação. Entrando em modo demonstração local.', err);
    }

    // Fallback/Demo bypass
    if (email && password.length >= 4) {
      localStorage.setItem('token', 'demo-token-jwt');
      router.push('/game');
    } else {
      setError('E-mail válido e senha (mínimo 4 caracteres) são necessários.');
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-[#e1376f] via-[#ec4899] to-[#db2777] border-b-4 border-[#b91c1c]/20 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-col md:flex-row items-center justify-between gap-3 text-white">
        
        {/* Left Side Message */}
        <div className="hidden lg:block text-xs font-bold tracking-wide uppercase select-none drop-shadow-sm flex items-center gap-2">
          <img src="/images/logo_veronica.png" alt="Cupcake Logo" className="h-6 w-auto inline-block mr-1 rounded" />
          Acesse sua conta do Amor Doce da Veronica
        </div>

        {/* Center/Right Form Container */}
        <form onSubmit={handleSubmit} className="flex flex-wrap items-center justify-center gap-3 w-full md:w-auto">
          {/* Email/Username field */}
          <div className="relative flex items-center">
            <span className="absolute left-2.5 text-pink-300">
              <Mail size={14} />
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
              className="pl-8 pr-2.5 py-1.5 w-48 bg-white/10 hover:bg-white/15 focus:bg-white text-xs text-white focus:text-slate-800 placeholder-pink-200 focus:placeholder-slate-400 border border-white/20 focus:border-white rounded-md outline-none transition-all"
            />
          </div>

          {/* Password field with Recovery Button */}
          <div className="relative flex items-center gap-1">
            <div className="relative flex items-center">
              <span className="absolute left-2.5 text-pink-300">
                <Key size={14} />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                className="pl-8 pr-8 py-1.5 w-40 bg-white/10 hover:bg-white/15 focus:bg-white text-xs text-white focus:text-slate-800 placeholder-pink-200 focus:placeholder-slate-400 border border-white/20 focus:border-white rounded-md outline-none transition-all"
              />
              {/* Recovery "?" button */}
              <button
                type="button"
                title="Esqueceu a senha?"
                onClick={() => alert('Recuperação de senha indisponível no modo demonstração.')}
                className="absolute right-2 text-pink-300 hover:text-white transition-colors cursor-pointer"
              >
                <HelpCircle size={14} />
              </button>
            </div>
          </div>

          {/* Login Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="px-5 py-1.5 bg-white text-[#e1376f] hover:bg-pink-100 hover:scale-[1.03] active:scale-95 transition-all text-xs font-black uppercase rounded-md shadow-sm border border-transparent cursor-pointer disabled:opacity-50 flex items-center justify-center min-w-[70px]"
          >
            {isLoading ? (
              <div className="w-3.5 h-3.5 rounded-full border-2 border-[#e1376f]/30 border-t-[#e1376f] animate-spin" />
            ) : (
              'Entrar'
            )}
          </button>

          {/* Facebook Connection Button */}
          <button
            type="button"
            onClick={() => alert('Autenticação com Facebook indisponível no modo demonstração.')}
            className="px-3 py-1.5 bg-[#1877f2] hover:bg-[#166fe5] hover:scale-[1.03] active:scale-95 transition-all text-xs font-bold rounded-md shadow-sm border border-transparent cursor-pointer flex items-center gap-1.5 text-white"
          >
            <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg>
            <span className="hidden sm:inline">Conectar</span>
          </button>
        </form>
      </div>

      {/* Inline Login Error Alert Bar */}
      {error && (
        <div className="w-full bg-red-600 text-white text-center py-1 text-[11px] font-bold tracking-wide animate-fade-in shadow-inner">
          {error}
        </div>
      )}
    </div>
  );
};
