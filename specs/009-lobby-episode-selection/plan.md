# Implementation Plan: Game Lobby and Episode Selection

**Branch**: `009-lobby-episode-selection` | **Date**: 2026-06-12 | **Spec**: [spec.md](file:///c:/Users/Kamila%20Faria/Desktop/Amor%20doce%20da%20veronica/frontend-amordoce/specs/009-lobby-episode-selection/spec.md)

**Input**: Feature specification from `/specs/009-lobby-episode-selection/spec.md`

## Summary

O objetivo é implementar um Lobby Central interativo após o login. O lobby será a interface inicial do usuário e contará com um carrossel de seleção de episódios (com desbloqueio progressivo), um mini-game de tarô com o Remi (tiragem diária de PA e Gold), visualização do Love-o-Meter com os rapazes e acesso ao Closet de customização visual do avatar.

## Technical Context

**Language/Version**: TypeScript / React 19 (Next.js 16)

**Primary Dependencies**: `framer-motion`, `lucide-react`, `zustand`

**Storage**: LocalStorage para persistência de progresso local (Fallback) e integração com a API `/auth/login` / progresso do usuário.

**Testing**: Validação visual via subagente de navegação do browser e testes manuais de fluxo.

**Target Platform**: Web (Design responsivo mobile e desktop, mantendo proporção ideal no container do jogo).

**Project Type**: Web Application

**Performance Goals**: Transições de tela suaves a 60 FPS, tempo de carregamento do lobby < 1s.

**Constraints**: Preservar a proporção e consistência visual do jogo (16:9) e respeitar as regras de saldo de PA.

**Scale/Scope**: 1 tela de lobby principal com abas/overlays modais (Episódios, Tarô, Afinidades, Closet).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Component Isolation:** Os modais/abas do lobby (Closet, Tarot, Love-o-Meter) serão desenvolvidos como componentes isolados e auto-contidos recebendo propriedades ou conectando-se ao Zustand. **[PASSED]**
- **Premium & Responsive UI:** Uso intensivo de `framer-motion` para animações fluidas das cartas de tarô, troca de abas e carrossel de episódios. **[PASSED]**
- **Strict Type Safety:** Interfaces TS completas para episódios, itens de closet e estado do lobby. **[PASSED]**
- **Centralized State Management:** Integração com o Zustand store existente para ler e alterar saldo de PA, Gold, progresso do episódio ativo e estado visual selecionado. **[PASSED]**

## Project Structure

### Documentation (this feature)

```text
specs/009-lobby-episode-selection/
├── spec.md              # Feature specification
├── plan.md              # This file
├── research.md          # Technical research & decisions
├── data-model.md        # Data entities schema
└── quickstart.md        # Quickstart setup & integration guide
```

### Source Code

```text
src/
├── app/
│   ├── login/
│   │   └── page.tsx      # Redireciona para o jogo
│   └── game/
│       └── page.tsx      # Gerencia a exibição do Lobby vs Tela de Jogo ativo
├── components/
│   └── lobby/
│       ├── LobbyContainer.tsx       # Container principal do Lobby
│       ├── EpisodeSelector.tsx      # Carrossel/Lista de Episódios
│       ├── TarotDraw.tsx            # Tiragem diária de cartas de tarô (Remi)
│       ├── AffinityTracker.tsx      # Painel do Love-o-Meter dos rapazes
│       └── WardrobeCloset.tsx       # Closet de customização da protagonista
└── store/
    └── gameStore.ts                 # Zustand store atualizado com estados do lobby
```

**Structure Decision**: Utilizaremos a arquitetura Next.js App Router do projeto, estendendo o Zustand store em `src/store/gameStore.ts` e organizando os novos componentes modulares na pasta `src/components/lobby/`.
