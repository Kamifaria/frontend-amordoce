'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
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
    <div 
      className="min-h-screen w-screen flex flex-col justify-center items-center bg-[#070514] overflow-hidden font-sans relative"
      style={{
        backgroundImage: `url('/images/login_background.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Main Login Board wrapper (matches aspect ratio of background image to align overlays) */}
      <div className="w-full max-w-[1024px] aspect-[1024/633] relative flex items-end">
        <form 
          onSubmit={handleSubmit}
          className="absolute inset-0"
        >
          {/* Email input overlay - Positioned over the left box */}
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail..."
            className="absolute left-[16.5%] bottom-[7.2%] w-[27.3%] h-[6.5%] bg-[#0f0b21]/75 border border-purple-500/25 rounded-md outline-none text-white text-xs sm:text-sm px-4 focus:border-pink-500/70 focus:ring-1 focus:ring-pink-500/30 transition-all cursor-text placeholder-slate-500"
            style={{ caretColor: '#d9a752' }}
          />

          {/* Password input overlay - Positioned over the middle box */}
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha..."
            className="absolute left-[45.8%] bottom-[7.2%] w-[22.4%] h-[6.5%] bg-[#0f0b21]/75 border border-purple-500/25 rounded-md outline-none text-white text-xs sm:text-sm px-4 focus:border-pink-500/70 focus:ring-1 focus:ring-pink-500/30 transition-all cursor-text placeholder-slate-500"
            style={{ caretColor: '#d9a752' }}
          />

          {/* Login Submit button overlay - Positioned over the right button */}
          <button
            type="submit"
            disabled={isLoading}
            className="absolute left-[70.8%] bottom-[7.2%] w-[11.3%] h-[6.5%] bg-gradient-to-r from-pink-500/80 to-purple-600/80 border border-pink-500/30 hover:from-pink-500 hover:to-purple-600 rounded-md cursor-pointer disabled:opacity-50 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1 shadow-lg hover:shadow-pink-500/20"
          >
            {isLoading ? (
              <div className="w-4 h-4 rounded-full border-2 border-t-white border-r-transparent border-b-transparent border-l-transparent animate-spin" />
            ) : (
              'Entrar'
            )}
          </button>
        </form>
      </div>

      {/* Floating Demo Alert Overlay */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 bg-[#120e24]/90 border border-pink-500/30 text-pink-300 text-center px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold tracking-wide shadow-xl backdrop-blur-md flex items-center gap-2">
        <span>💡</span>
        <span>Modo Demo: Qualquer e-mail e senha de 4+ dígitos para jogar!</span>
      </div>

      {/* Error Alert Overlay */}
      {error && (
        <div className="absolute bottom-[16%] left-1/2 -translate-x-1/2 z-50 bg-red-950/90 border border-red-500/30 text-white text-center px-6 py-2 rounded-xl text-xs font-bold tracking-wide animate-bounce shadow-2xl backdrop-blur-sm">
          {error}
        </div>
      )}
    </div>
  );
}
