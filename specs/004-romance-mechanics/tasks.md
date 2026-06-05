# Tarefas: Conexão Assíncrona, HUD de Jogo e Autenticação

**Entrada**: Documentos de design de `specs/004-romance-mechanics/`

**Pré-requisitos**: plan.md (obrigatório), spec.md (obrigatório para histórias de usuário), research.md, data-model.md, contracts/

## Formato: `[ID] [P?] [Story] Descrição`

- **[P]**: Pode rodar em paralelo (arquivos diferentes, sem dependências)
- **[Story]**: A qual história de usuário esta tarefa pertence (ex: US1, US2, US3)
- Inclua caminhos de arquivo exatos nas descrições

---

## Fase 1: Configuração (Infraestrutura Compartilhada)

**Objetivo**: Inicialização das rotas e estrutura básica de páginas

- [x] T001 Inicializar os diretórios e arquivos de roteamento in-game em `frontend-amordoce/src/app/game/page.tsx`
- [x] T002 Criar a casca da página de login em `frontend-amordoce/src/app/login/page.tsx`

---

## Fase 2: Fundações (Pré-requisitos Bloqueantes)

**Objetivo**: Conexão assíncrona com o backend e gerenciamento de estado global

- [x] T003 Modificar o Zustand store para consumir a API assincronamente em `frontend-amordoce/src/store/useGameStore.ts`
- [x] T004 Adicionar tratamento de erros e exibição de alerta de "Saldo de PA Insuficiente" em `frontend-amordoce/src/store/useGameStore.ts`

---

## Fase 3: História de Usuário 1 - HUD Unificado GameScreen (Prioridade: P1) 🎯 MVP

**Objetivo**: Unificar cenário, sprite de personagem e caixa de diálogo em um container de aspect-ratio 16:9 estável.

### Implementação para a História de Usuário 1

- [x] T005 [P] [US1] Criar o componente centralizador `GameScreen.tsx` em `frontend-amordoce/src/components/game/GameScreen.tsx`
- [x] T006 [US1] Ajustar o roteamento principal em `frontend-amordoce/src/app/page.tsx` para redirecionar usuários autenticados para `/game` e não autenticados para `/login`

---

## Fase 4: História de Usuário 2 - Página de Login Split-Screen (Prioridade: P2)

**Objetivo**: Criar interface de login dividida com estética gótica/violeta e glassmorphism.

### Implementação para a História de Usuário 2

- [x] T007 [P] [US2] Implementar efeito de parallax e zoom contínuo com Framer Motion no lado promocional (esquerdo) da tela de login em `frontend-amordoce/src/app/login/page.tsx`
- [x] T008 [US2] Implementar o painel de autenticação do lado direito com inputs flutuantes e botões neon brilhantes em `frontend-amordoce/src/app/login/page.tsx`

---

## Fase 5: Polimento e Correções Gerais

- [x] T009 Executar verificação e testes do fluxo de login e redirecionamento de rotas no navegador
