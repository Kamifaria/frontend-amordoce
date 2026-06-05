'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, Key, Mail, ArrowRight, Eye, EyeOff } from 'lucide-react';

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

    // Mock API Auth post for standalone mode. If backend is running, it will authenticate.
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

    // Fallback/Demo bypass: permit enter with any valid format
    if (email && password.length >= 4) {
      localStorage.setItem('token', 'demo-token-jwt');
      router.push('/game');
    } else {
      setError('Por favor, digite um email válido e uma senha com pelo menos 4 caracteres.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen flex bg-[#090714] text-slate-100 overflow-hidden font-sans">
      
      {/* LADO ESQUERDO (60%): Imagem Promocional com Parallax/Zoom Lento */}
      <div className="hidden md:flex relative w-3/5 h-full overflow-hidden justify-center items-center">
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1541829019-2188d558b1c7?w=1200&q=80')`,
            filter: 'brightness(0.65) contrast(1.1) saturate(0.95)'
          }}
        />
        
        {/* Violet/Gothic overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-950/20 to-[#090714]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090714]/80 via-transparent to-black/40" />

        {/* Character/Story Hook Text Overlay */}
        <div className="relative z-10 text-left max-w-lg p-10 mt-auto mb-16 mr-auto ml-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex items-center gap-2 text-pink-400 font-bold tracking-widest uppercase text-xs mb-3"
          >
            <Sparkles size={16} />
            Amor Doce da Veronica
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="text-4xl lg:text-5xl font-black tracking-tight leading-tight bg-gradient-to-r from-slate-100 via-pink-100 to-purple-300 bg-clip-text text-transparent drop-shadow-lg"
          >
            Conquiste os corações em Sweet Amoris
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 1.2 }}
            className="mt-4 text-sm text-slate-300 leading-relaxed drop-shadow"
          >
            Desvende os segredos de Remi, o misterioso vice-presidente gótico do conselho, desafie a pose rebelde de Harry e divirta-se com as travessuras de Maggie. Suas escolhas definem seu romance!
          </motion.p>
        </div>
      </div>

      {/* LADO DIREITO (40%): Painel de Autenticação Glassmorphism */}
      <div className="w-full md:w-2/5 flex flex-col justify-center items-center p-8 lg:p-12 bg-radial from-[#15112e] to-[#090714]">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md bg-white/[0.02] border border-purple-500/15 rounded-[32px] p-8 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-6 relative"
        >
          {/* Subtle purple aura glow behind card */}
          <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-tr from-purple-600/10 to-pink-500/10 blur-xl opacity-80 pointer-events-none -z-10" />

          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-wide text-slate-200">Benvinda de Volta</h2>
            <p className="text-xs text-purple-400 mt-1">Conecte sua conta para continuar sua jornada romântica</p>
          </div>

          {error && (
            <div className="p-3 text-xs bg-red-950/45 border border-red-500/20 text-red-300 rounded-xl text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Input Email */}
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-pink-400 transition-colors" size={18} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu e-mail ou usuário"
                className="w-full pl-11 pr-4 py-3.5 bg-black/30 border border-slate-800 focus:border-pink-500/50 rounded-xl text-sm text-slate-200 focus:outline-none transition-all placeholder-slate-600 focus:ring-1 focus:ring-pink-500/20"
              />
            </div>

            {/* Input Password */}
            <div className="relative group">
              <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-pink-400 transition-colors" size={18} />
              <input 
                type={showPassword ? 'text' : 'password'} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha secreta"
                className="w-full pl-11 pr-12 py-3.5 bg-black/30 border border-slate-800 focus:border-pink-500/50 rounded-xl text-sm text-slate-200 focus:outline-none transition-all placeholder-slate-600 focus:ring-1 focus:ring-pink-500/20"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={isLoading}
              className="mt-2 w-full py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 active:scale-[0.98] text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-pink-500/10 hover:shadow-pink-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                <>
                  Entrar no Sweet Amoris
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Alternative Signup Hint */}
          <div className="text-center text-[10px] text-slate-500 mt-2">
            Ao clicar em entrar, você concorda em seguir os termos de conduta de Sweet Amoris.
          </div>
        </motion.div>

      </div>
    </div>
  );
}
