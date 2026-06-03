# Implementation Plan: Login Screen Amor Doce

**Branch**: `003-login-screen-amor-doce` | **Date**: 2026-06-03 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/003-login-screen/spec.md`

## Summary

O objetivo é implementar a tela de login clássica do Amor Doce baseada no site oficial (High School Life). Criaremos a estrutura visual contendo o cabeçalho superior de autenticação (Top Login Bar), logotipo do Sweet Amoris centralizado, painel lateral de navegação e seção de apresentação com botão de chamada para ação (CTA) "JOGAR".

## Technical Context

**Language/Version**: TypeScript / Next.js (React 19)

**Primary Dependencies**: Framer Motion, Tailwind CSS, Lucide React, Zustand

**Storage**: LocalStorage para simulação do estado de sessão.

**Testing**: Teste visual manual no navegador.

**Target Platform**: Desktop (resoluções 1200px+) com responsividade para resoluções menores.

**Project Type**: Web Application (Next.js App Router)

**Performance Goals**: Carregamento instantâneo da página inicial com assets otimizados.

**Constraints**: Fidelidade visual aos elementos clássicos da Sweet Amoris.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

1. **Component Isolation**: A barra superior de login (`TopLoginBar.tsx`) e o menu lateral (`NavMenu.tsx`) serão componentes autônomos.
2. **Premium & Responsive UI**: Utilização de transições do Framer Motion e regras do Tailwind para garantir suavidade e aspecto visual premium.
3. **Strict Type Safety**: Definições estritas de tipos para formulários e estados de navegação.
4. **Centralized State Management**: Integração com a sessão do jogador via Zustand se necessário.

## Project Structure

### Documentation (this feature)

```text
specs/003-login-screen/
├── plan.md              # Este arquivo de planejamento técnico
├── research.md          # Resultados de pesquisa de ativos e referências
├── data-model.md        # Estrutura de dados e tipos TypeScript
└── quickstart.md        # Guia rápido de execução e testes locais
```

### Source Code

```text
src/
├── app/
│   ├── page.tsx                 # Atualização para servir de portal/login se não autenticado
│   ├── login/
│   │   └── page.tsx             # Rota específica da tela de login clássica
├── components/
│   └── game/
│       ├── TopLoginBar.tsx      # Barra rosa de login superior
│       ├── SideNavMenu.tsx      # Menu vertical do lado direito
│       └── HeroSection.tsx      # Seção com texto principal e CTA "JOGAR"
```

**Structure Decision**: Criaremos novos componentes modulares na pasta `components/game/` para encapsular os elementos específicos do portal e manteremos a rota principal controlando o redirecionamento.
