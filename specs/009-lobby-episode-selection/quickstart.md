# Quickstart: Game Lobby and Episode Selection

Este guia orienta na rápida integração e teste da nova tela de Lobby e Seleção de Episódios no projeto.

## Passos para Integração

1. **Atualizar o Zustand Store (`src/store/gameStore.ts`)**:
   - Adicionar os campos de estado: `currentView`, `unlockedEpisodes`, `lastDailyDraw` e `equippedOutfit`.
   - Adicionar as actions: `setView`, `unlockEpisode`, `drawTarot` e `updateOutfit`.

2. **Criar a Estrutura de Componentes**:
   - Criar `src/components/lobby/LobbyContainer.tsx` para gerenciar as abas.
   - Criar `src/components/lobby/EpisodeSelector.tsx` para carrossel e bloqueio dos episódios.
   - Criar `src/components/lobby/TarotDraw.tsx` para animação e sorteio de PA/Gold.
   - Criar `src/components/lobby/AffinityTracker.tsx` para exibir os status do Love-o-Meter.
   - Criar `src/components/lobby/WardrobeCloset.tsx` para gerenciar a customização de roupas.

3. **Conectar à Rota Principal (`src/app/game/page.tsx`)**:
   - Ajustar o container principal para verificar `currentView`.
   - Se `currentView === 'lobby'`, renderiza o `LobbyContainer`.
   - Se `currentView === 'episode'`, renderiza a `GameScreen` ativa.

## Testes Rápidos

1. Entre no jogo no modo de demonstração.
2. Certifique-se de que a tela inicial é o Lobby.
3. Teste o mini-game de Tarô diário com o Remi e verifique se o saldo de PA ou Gold é acrescido e animado corretamente.
4. Verifique as afinidades no painel do Love-o-Meter.
5. No carrossel de episódios, valide se apenas o Episódio 1 está desbloqueado e se o Episódio 2 tem o cadeado ativo.
