'use client';

import React from 'react';
import { Award, CheckCircle, AlertCircle, HelpCircle } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';

export const DailyQuests: React.FC = () => {
  const { dailyQuests, claimQuestReward } = useGameStore();

  return (
    <div className="w-full bg-white/5 backdrop-blur-md border border-purple-500/10 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-pink-300 mb-4 flex items-center gap-2">
        <Award className="w-5 h-5 text-pink-500" /> Missões Diárias
      </h3>
      <p className="text-xs text-slate-400 mb-6 font-semibold">
        Conclua os objetivos do dia para obter Pontos de Ação (PA) e Gold extras!
      </p>

      <div className="space-y-4">
        {dailyQuests.length === 0 ? (
          <div className="text-center py-6 text-slate-400 text-xs font-bold border border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center gap-2 bg-[#0c0920]/45">
            <span>✨</span> Todas as missões do dia foram concluídas e resgatadas! Volte amanhã!
          </div>
        ) : (
          dailyQuests.map((quest) => {
            const isCompleted = quest.completed;

            return (
              <div
                key={quest.id}
                className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border transition-colors ${
                  isCompleted 
                    ? 'border-pink-500/30 bg-pink-500/5' 
                    : 'border-white/5 bg-[#120d2d]/30'
                }`}
              >
                {/* Info */}
                <div className="flex-1 space-y-1.5 w-full">
                  <div className="flex items-center gap-2">
                    {isCompleted ? (
                      <CheckCircle className="w-4 h-4 text-emerald-400 fill-[#0d0921]" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-pink-400" />
                    )}
                    <h4 className="text-sm font-bold text-white leading-tight">{quest.description}</h4>
                  </div>

                  {/* Progress bar */}
                  <div className="flex items-center gap-3 w-full">
                    <div className="flex-1 h-1.5 bg-slate-950/80 rounded-full overflow-hidden border border-white/5">
                      <div
                        className="h-full bg-pink-500 rounded-full transition-all duration-500"
                        style={{ width: `${(quest.current / quest.target) * 100}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap">
                      {quest.current} / {quest.target}
                    </span>
                  </div>
                </div>

                {/* Reward & Claim Button */}
                <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto border-t border-white/5 sm:border-none pt-3 sm:pt-0">
                  <div className="text-right">
                    <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider block">Recompensa</span>
                    <span className="text-xs font-extrabold text-yellow-300">
                      +{quest.rewardAmount} {quest.rewardType}
                    </span>
                  </div>

                  {isCompleted ? (
                    <button
                      onClick={() => claimQuestReward(quest.id)}
                      className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold text-xs rounded-xl cursor-pointer shadow-lg shadow-pink-500/20"
                    >
                      Resgatar
                    </button>
                  ) : (
                    <button
                      disabled
                      className="px-4 py-2 bg-slate-800 text-slate-500 font-bold text-xs rounded-xl cursor-not-allowed border border-white/5"
                    >
                      Pendente
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
