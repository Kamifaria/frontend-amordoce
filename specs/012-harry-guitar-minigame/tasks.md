# Implementation Tasks: Harry Guitar Minigame

**Feature**: `012-harry-guitar-minigame`

## Phase 1: Setup

- [x] T001 Adicionar o diretório `src/components/game/minigames/` se ainda não existir.

## Phase 2: Foundational

- [x] T002 Atualizar a interface `GameState` em `src/store/useGameStore.ts` com variáveis de estado e actions (`activeMinigame`, `startMinigame`, `endMinigame`).
- [x] T003 Adicionar `minigame?: string` na interface `Choice` em `src/shared/types.ts`.

## Phase 3: User Story 1 - Descobrindo o Minigame (Priority: P1)

**Goal**: Permitir que a jogadora chegue ao pátio e engatilhe a tela do minigame através do diálogo com Harry.
**Independent Test Criteria**: Escolher "Me ensina?" na árvore de diálogo pausa a Visual Novel e executa a lógica do minigame.

- [x] T004 [US1] Adicionar a opção com a flag `minigame: 'guitar'` dentro de `choices` do nó de diálogo `harry-start` em `src/mock/storyData.ts`.
- [x] T005 [US1] Modificar o método `selectChoice` em `src/store/useGameStore.ts` para interceptar a flag `minigame` e rodar a action correspondente antes de tentar navegar pela árvore de história.

## Phase 4: User Story 2 - Mecânica Guitar Hero Simplificada (Priority: P1)

**Goal**: Notas caindo na tela onde a jogadora pode interagir com o teclado ou touch.
**Independent Test Criteria**: A pontuação, fever mode e combos acumulam corretamente durante 30s e a pista reconhece acertos.

- [x] T006 [P] [US2] Criar o arquivo e esqueleto base de `src/components/game/minigames/GuitarMinigame.tsx`.
- [x] T007 [US2] Implementar a mini-engine via `requestAnimationFrame` dentro de `GuitarMinigame.tsx` para animar e filtrar objetos (Notas Musicais) em um array iterativo.
- [x] T008 [US2] Configurar os hooks `useEffect` em `GuitarMinigame.tsx` para escutar Keyboard Events (Seta Direita, Esquerda, Baixo) e calcular colisões (Hit Window).
- [x] T009 [US2] Importar e renderizar `<GuitarMinigame />` dentro de `src/components/game/GameScreen.tsx` somente quando `activeMinigame === 'guitar'`.

## Phase 5: User Story 3 - Recompensa de Afinidade (Priority: P2)

**Goal**: Conectar o desempenho do minigame de volta à progressão principal e diálogo.
**Independent Test Criteria**: Fechar o minigame aplica a mudança de Afinidade correta (-15, +15, +20) com o personagem Harry e redireciona ao nó correto.

- [x] T010 [US3] Implementar o callback `endMinigame(score)` em `src/store/useGameStore.ts` que determina qual nó do diálogo prosseguir dependendo da pontuação (<40, <80, >=80).
- [x] T011 [US3] Construir o painel modal final de Pontuação (Score e Max Combo) dentro de `src/components/game/minigames/GuitarMinigame.tsx` engatilhando o botão de `Continuar História`.

## Phase 6: Polish & Cross-Cutting Concerns

- [x] T012 Modificar a propriedade visual de Touch (toques de dedo) usando `onTouchStart` nas pistas para habilitar suporte à Mobile em `GuitarMinigame.tsx`.
- [x] T013 Adicionar classes responsivas Tailwind para manter o minigame ajustado (`h-[100dvh]`) em celulares pequenos.
