'use client';

import React from 'react';
import { Heart, MessageCircle, Send, ArrowLeft, Check } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';

interface SweetGramAppProps {
  onBack: () => void;
}

export const SweetGramApp: React.FC<SweetGramAppProps> = ({ onBack }) => {
  const { sweetGramPosts, likePost, commentOnPost, playSound } = useGameStore();

  const handleLike = (postId: string) => {
    likePost(postId);
  };

  const handleComment = (postId: string, commentIdx: number) => {
    commentOnPost(postId, commentIdx);
  };

  return (
    <div className="w-full h-full bg-[#0d0920] flex flex-col relative text-slate-100">
      {/* App Header */}
      <header className="flex items-center gap-3 p-4 border-b border-white/5 bg-[#120d2d]/90 backdrop-blur-md sticky top-0 z-10 select-none">
        <button
          onClick={() => { playSound('click'); onBack(); }}
          className="p-1 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex flex-col">
          <span className="text-sm font-black tracking-wider text-pink-400">SweetGram</span>
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest">Feed de Postagens</span>
        </div>
      </header>

      {/* Posts Feed container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-20">
        {sweetGramPosts.map((post) => {
          return (
            <div
              key={post.id}
              className="bg-[#120d2d]/60 border border-white/5 rounded-2xl overflow-hidden shadow-lg flex flex-col"
            >
              {/* Post Header */}
              <div className="flex items-center gap-2.5 p-3.5 border-b border-white/5">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${post.avatarColor} flex items-center justify-center font-bold text-xs shadow-inner`}>
                  {post.characterName[0]}
                </div>
                <div>
                  <h4 className="text-xs font-black text-white">{post.characterName}</h4>
                  <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">Estudante</span>
                </div>
              </div>

              {/* Post Image */}
              <div className="relative aspect-square w-full bg-slate-950">
                <img
                  src={post.imageUrl}
                  alt="Post content"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Hide failed unsplash loads and show cute placeholder
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                {/* Fallback image */}
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 to-[#120d2d] flex flex-col items-center justify-center text-5xl">
                  📸
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 p-3.5 border-b border-white/5">
                <button
                  onClick={() => handleLike(post.id)}
                  disabled={post.hasLiked}
                  className={`flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
                    post.hasLiked 
                      ? 'text-pink-500 scale-105' 
                      : 'text-slate-400 hover:text-pink-400'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${post.hasLiked ? 'fill-pink-500' : ''}`} />
                  <span>{post.likes}</span>
                </button>
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                  <MessageCircle className="w-5 h-5" />
                  <span>{post.comments.length}</span>
                </div>
              </div>

              {/* Caption & Comments List */}
              <div className="p-3.5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2.5">
                  {/* Caption */}
                  <p className="text-xs leading-relaxed font-semibold">
                    <span className="font-extrabold text-white mr-1.5">{post.characterName}</span>
                    {post.caption}
                  </p>

                  {/* Comments */}
                  <div className="space-y-1.5 pt-2 border-t border-white/5">
                    {post.comments.map((comment) => (
                      <p key={comment.id} className="text-[11px] leading-relaxed font-medium">
                        <span className="font-bold text-slate-300 mr-1.5">{comment.sender}</span>
                        <span className="text-slate-200">{comment.text}</span>
                      </p>
                    ))}
                  </div>
                </div>

                {/* Interactive Comment Input */}
                {post.commentOptions && post.commentOptions.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-white/5 space-y-2">
                    <span className="text-[9px] font-bold text-pink-400 uppercase tracking-wider block">Escolha sua Resposta</span>
                    <div className="flex flex-col gap-2">
                      {post.commentOptions.map((option, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => handleComment(post.id, oIdx)}
                          className="text-left w-full text-[11px] font-bold bg-[#0d0920] hover:bg-pink-500/10 border border-white/10 hover:border-pink-500/30 text-slate-300 hover:text-white px-3 py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-between"
                        >
                          <span>{option.text}</span>
                          <span className={option.affinityChange > 0 ? 'text-green-400' : 'text-red-400'}>
                            {option.affinityChange > 0 ? `+${option.affinityChange} LOM` : `${option.affinityChange} LOM`}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
