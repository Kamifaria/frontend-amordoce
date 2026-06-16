'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Sparkles, User } from 'lucide-react';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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

  const handleQuickDemo = () => {
    setEmail('docete@amordoce.com');
    setPassword('123456');
    setError(null);
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col justify-end items-center bg-[#070514] overflow-y-auto font-sans p-4 md:p-0">
      
      {/* Background image base layer - fully visible and crisp */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-500"
        style={{ backgroundImage: `url('/images/login_background.jpg')` }}
      />
      
      {/* Soft vignette overlay to enhance readability of inputs but keep characters fully visible */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/80 via-transparent to-black/35 pointer-events-none" />

      {/* Floating error notification at the top of the screen */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md bg-red-950/95 border border-red-500/50 text-red-200 text-xs sm:text-sm px-6 py-3 rounded-xl font-semibold shadow-2xl backdrop-blur-md text-center"
          >
            ⚠️ {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive Glassmorphic Login Container: Centered Card on Mobile, Bottom Bar on Desktop */}
      <motion.div 
        className="relative z-10 w-full max-w-md md:max-w-none bg-[#0d0921]/90 backdrop-blur-md border border-pink-500/30 md:border-none md:border-t-2 md:border-pink-500/40 shadow-[0_10px_30px_rgba(0,0,0,0.5)] md:shadow-[0_-10px_30px_rgba(0,0,0,0.5)] p-6 md:px-6 md:py-3.5 rounded-2xl md:rounded-none"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <form 
          onSubmit={handleSubmit}
          className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 w-full"
        >
          {/* Welcome & Demo shortcut */}
          <div className="flex flex-row md:flex-col items-center md:items-start justify-between w-full md:w-auto gap-2 border-b border-white/5 md:border-none pb-3 md:pb-0">
            <div className="flex items-center gap-1.5">
              <span className="text-pink-400 font-extrabold text-sm sm:text-base tracking-wider drop-shadow-[0_0_8px_rgba(236,72,153,0.4)]">
                LOGIN
              </span>
              <span className="text-[10px] bg-pink-500/20 text-pink-300 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                Demo
              </span>
            </div>
            <button
              type="button"
              onClick={handleQuickDemo}
              className="text-xs text-slate-400 hover:text-pink-300 transition-colors underline flex items-center gap-1 cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-pink-500/70" />
              Preencher dados de teste
            </button>
          </div>

          {/* Input Fields Container */}
          <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto flex-1 max-w-3xl">
            {/* Email Input */}
            <div className="relative w-full md:flex-1 group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-pink-400 transition-colors">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu e-mail..."
                className="w-full bg-[#120d2b]/95 border border-purple-500/30 rounded-lg py-2.5 pl-9 pr-3 text-white placeholder-slate-500 outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500/30 transition-all text-xs sm:text-sm"
              />
            </div>

            {/* Password Input */}
            <div className="relative w-full md:flex-1 group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-pink-400 transition-colors">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha..."
                className="w-full bg-[#120d2b]/95 border border-purple-500/30 rounded-lg py-2.5 pl-9 pr-9 text-white placeholder-slate-500 outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500/30 transition-all text-xs sm:text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-pink-400 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Action Button */}
          <div className="w-full md:w-auto">
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full md:w-44 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold py-2.5 px-4 rounded-lg shadow-[0_4px_15px_rgba(236,72,153,0.3)] transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5 text-xs sm:text-sm"
            >
              {isLoading ? (
                <div className="w-4 h-4 rounded-full border-2 border-t-white border-r-transparent border-b-transparent border-l-transparent animate-spin" />
              ) : (
                <>
                  <span>Entrar</span>
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                </>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
      
    </div>
  );
}
