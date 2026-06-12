# Implementation Plan: Gameplay Enhancements Bundle

**Branch**: `010-gameplay-enhancements` | **Date**: 2026-06-12 | **Spec**: [spec.md](file:///c:/Users/Kamila%20Faria/Desktop/Amor%20doce%20da%20veronica/frontend-amordoce/specs/010-gameplay-enhancements/spec.md)

**Input**: Feature specification from `/specs/010-gameplay-enhancements/spec.md`

## Summary

O plano consiste em adicionar 5 mecânicas de engajamento e interatividade:
1. **Galeria de Imagens (Álbum):** Uma nova aba no Lobby para exibir e ampliar as ilustrações (CGs) desbloqueadas.
2. **SweetGram App:** Um novo aplicativo no telefone celular simulando uma rede social com posts dos rapazes, curtidas e comentários com bônus de LOM.
3. **Missões Diárias:** Exibição de 3 mini-tarefas diárias no Lobby com recompensas em PA/Gold.
4. **Itens Clicáveis nos Cenários:** Adicionar sprites de itens coletáveis brilhantes sobrepostos no `Cenario.tsx` que dão PA, Gold ou Clues ao clicar.
5. **Notificação de Conquistas (Achievements):** Sistema centralizado para gerenciar conquistas e exibir pop-ups animados com `framer-motion`.

## Technical Context

**Language/Version**: TypeScript / React 19 (Next.js 16)

**Primary Dependencies**: `framer-motion`, `lucide-react`, `zustand`

**Storage**: LocalStorage para salvar as conquistas concluídas, curtidas no SweetGram, missões diárias ativas e itens clicáveis já recolhidos.

## Constitution Check

- **Component Isolation:** O SweetGram será encapsulado no `PhoneOverlay`, os itens clicáveis serão isolados no `Cenario.tsx` através de posições absolutas baseadas na localização, e o gerenciador de conquistas será um overlay global. **[PASSED]**
- **Premium & Responsive UI:** As curtidas, cartas de tarô, pop-ups de conquista e o álbum de fotos usarão animações fluidas e efeitos de zoom com Framer Motion. **[PASSED]**
- **Centralized State Management:** Toda a lógica de estado das missões, conquistas e SweetGram será incorporada ao Zustand store para garantir sincronização instantânea. **[PASSED]**

## Project Structure

### Documentation

```text
specs/010-gameplay-enhancements/
├── spec.md              # Feature specification
├── plan.md              # This file
├── research.md          # Technical research & decisions
├── data-model.md        # Data models schema
└── quickstart.md        # Quickstart setup & integration guide
```

### Source Code

```text
src/
├── components/
│   ├── lobby/
│   │   ├── GalleryTab.tsx        # Galeria de CGs
│   │   └── DailyQuests.tsx       # Componente de Missões Diárias
│   ├── game/
│   │   ├── Cenario.tsx           # Atualizado para renderizar itens clicáveis
│   │   ├── SweetGramApp.tsx      # Aplicativo do SweetGram no celular
│   │   └── AchievementToast.tsx  # Pop-up animado global de conquistas
└── store/
    └── useGameStore.ts           # Adição das novas variáveis de estado e ações
```
