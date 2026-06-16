# Tasks: Dynamic Scenes & CGs (015)

**Input**: Design documents from `specs/015-dynamic-scenes-cgs/`

**Prerequisites**: spec.md ✅ | research.md ✅ | data-model.md ✅ | quickstart.md ✅

**Status atual**: As fases 1-2 (Setup + Fundacional) e parte das fases 3-5 já foram implementadas. As tarefas pendentes são marcadas com `[ ]` e as concluídas com `[x]`.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Pode rodar em paralelo (arquivos diferentes, sem dependências)
- **[Story]**: Qual user story ([US1], [US2], [US3])
- Todos os caminhos são absolutos relativos à raiz do projeto

---

## Phase 1: Setup (Infraestrutura Compartilhada)

**Objetivo**: Scripts e dependências de suporte à remoção de fundo e ao motor multi-sprite.

- [x] T001 Instalar `@imgly/background-removal-node` (já estava em `package.json`)
- [x] T002 Criar o script de limpeza automática em `scripts/remove-bgs.js`
- [x] T003 Executar `node scripts/remove-bgs.js` para processar os 56 sprites de `public/images/sprites/`

---

## Phase 2: Fundacional (Pré-requisitos Bloqueadores)

**Objetivo**: Modificações no sistema de tipos e no motor gráfico que são base para todas as user stories.

⚠️ **CRÍTICO**: Nenhuma user story pode avançar sem que esta fase esteja concluída.

- [x] T004 Adicionar interface `sprites?: SpriteEntry[]` ao `DialogueNode` em `src/shared/types.ts`
- [x] T005 [P] Atualizar `src/components/game/GameScreen.tsx` para iterar sobre `activeNode.sprites` e renderizar múltiplos `SpriteCharacter`
- [x] T006 [P] Adicionar prop `outfit?: string` e parâmetro ao `getSpriteUrl` em `src/components/game/SpriteCharacter.tsx`

**Checkpoint**: Motor de sprites multi-personagem funcional. User stories podem avançar.

---

## Phase 3: User Story 1 — Fundo Transparente nas Imagens (Priority: P1) 🎯 MVP

**Goal**: 100% dos sprites carregam sem fundo preto nos diálogos.

**Independent Test**: Abrir qualquer diálogo com personagem na tela e verificar visualmente que não há quadrado ou sombra escura ao redor da imagem.

### Implementação

- [x] T007 [US1] Executar `node scripts/remove-bgs.js` em todos os 56 PNGs de `public/images/sprites/` (concluído automaticamente)
- [ ] T008 [US1] Verificar visualmente os sprites no navegador em `http://localhost:3000` e confirmar transparência em Castiel, Nathaniel, Lysandre, Harry, Remi, Kami, Maggie e Veronica
- [ ] T009 [US1] Verificar sprites de CG em `public/images/cgs/` — executar `node scripts/remove-bgs.js` adaptado para essa pasta se necessário

**Checkpoint**: US1 completa — zero fundos pretos em todos os diálogos.

---

## Phase 4: User Story 2 — Cenas Dinâmicas NPC-to-NPC (Priority: P2)

**Goal**: Ao menos 3 cenas onde NPCs conversam entre si em locais do mapa antes de Veronica interagir.

**Independent Test**: Navegar até cada local e observar a conversa de dois NPCs aparecer com os personagens posicionados nos lados opostos da tela antes de qualquer opção de interação surgir.

### Implementação

- [x] T010 [US2] Adicionar cena NPC-to-NPC (Nathaniel vs Castiel) na cena inicial `confronto-start` em `src/mock/storyData.ts` usando o campo `sprites`
- [ ] T011 [US2] Criar cena NPC-to-NPC no **pátio** (ex: Harry e Lysandre conversando sobre música) em `src/mock/storyData.ts` com nó de observação antes das escolhas de Veronica
- [ ] T012 [P] [US2] Criar cena NPC-to-NPC na **biblioteca** (ex: Nathaniel e Maggie estudando) em `src/mock/storyData.ts`
- [ ] T013 [P] [US2] Criar cena NPC-to-NPC na **quadra** (ex: Castiel e Harry discutindo sobre banda) em `src/mock/storyData.ts`
- [ ] T014 [US2] Integrar os novos nós de cenas NPC ao mapa de localizações em `src/mock/storyData.ts` (conectar `entryNodeId` dos locais ao nó de observação)

**Checkpoint**: US2 completa — 3+ cenas NPC-to-NPC navegáveis pelo mapa.

---

## Phase 5: User Story 3 — Trajes Contextuais (Priority: P3)

**Goal**: Ao menos 1 outfit alternativo visualmente integrado para os personagens principais sem perda da identidade facial.

**Independent Test**: Disparar uma cena que referencie `outfit: 'gym'` e verificar que o personagem exibe o visual de roupa esportiva com o mesmo rosto e cabelo reconhecíveis.

### Implementação

- [x] T015 [US3] Adicionar suporte a `outfit` na função `getSpriteUrl` de `src/components/game/SpriteCharacter.tsx` com fallback para o sprite padrão
- [ ] T016 [P] [US3] Gerar/adicionar asset `public/images/sprites/castiel_gym.png` (roupa de educação física, mantendo traços do rosto)
- [ ] T017 [P] [US3] Gerar/adicionar asset `public/images/sprites/nathaniel_gym.png`
- [ ] T018 [P] [US3] Gerar/adicionar asset `public/images/sprites/harry_gym.png`
- [ ] T019 [US3] Criar uma cena de aula de educação física em `src/mock/storyData.ts` que use `outfit: 'gym'` em pelo menos dois personagens
- [ ] T020 [US3] Validar no navegador que o fallback funciona corretamente quando o arquivo `_gym.png` não existe (deve exibir o sprite padrão sem erro)

**Checkpoint**: US3 completa — outfits contextuais disponíveis e com graceful fallback.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Objetivo**: Polimento, responsividade mobile e integração final.

- [ ] T021 [P] Validar layout de 2 sprites lado a lado em mobile (375px) — garantir que os personagens não se sobreponham nem saiam da tela
- [ ] T022 [P] Ajustar `w-[85%] md:w-[45%] lg:w-[40%]` em `src/components/game/SpriteCharacter.tsx` se necessário para mobile com 2 sprites
- [ ] T023 Atualizar `specs/015-dynamic-scenes-cgs/quickstart.md` com as novas cenas NPC adicionadas
- [ ] T024 Executar `npm run lint` e corrigir eventuais erros de TypeScript introduzidos

---

## Dependências & Ordem de Execução

### Dependências entre fases

- **Phase 1 (Setup)**: Sem dependências — pode começar imediatamente
- **Phase 2 (Fundacional)**: Depende da Phase 1 — **bloqueia todas as user stories**
- **Phase 3 (US1)**: Depende apenas da Phase 2
- **Phase 4 (US2)**: Depende da Phase 2; pode ser paralela à Phase 3
- **Phase 5 (US3)**: Depende da Phase 2; pode ser paralela às Phases 3 e 4
- **Phase 6 (Polish)**: Depende de todas as fases anteriores estarem concluídas

### Dependências dentro de cada User Story

- **US2**: T011 → T014 (os nós NPC devem existir antes de serem ligados ao mapa)
- **US3**: T016/T017/T018 (assets) → T019 (cena que usa o outfit) → T020 (validação do fallback)

### Oportunidades de Paralelismo

- T011, T012, T013 (cenas NPC) podem ser criadas em paralelo por diferentes pessoas
- T016, T017, T018 (assets de outfit) podem ser gerados em paralelo
- T021 e T022 (validação mobile) podem rodar em paralelo ao T023

---

## Parallel Example: User Story 2

```bash
# Lançar as 3 novas cenas NPC juntas (arquivos diferentes, sem dependência entre si):
Task: "Cena pátio Harry & Lysandre — src/mock/storyData.ts"
Task: "Cena biblioteca Nathaniel & Maggie — src/mock/storyData.ts"
Task: "Cena quadra Castiel & Harry — src/mock/storyData.ts"
```

---

## Estratégia de Implementação

### MVP Imediato (US1 — já 90% concluída)

1. ✅ Phase 1: Setup (concluído)
2. ✅ Phase 2: Fundacional (concluído)
3. ⏳ Phase 3 US1: Validar visualmente os sprites no navegador (T008, T009)
4. **PARAR e VALIDAR**: Confirmar zero fundos pretos
5. Demo pronta para US1

### Entrega Incremental

1. ✅ Setup + Fundacional → Base pronta
2. ⏳ US1 — Validação visual → Demo sem fundo preto
3. US2 — 3 cenas NPC-to-NPC → Mundo mais vivo
4. US3 — Outfits contextuais → Profundidade visual
5. Polish → Responsividade mobile perfeita

---

## Notas

- `[P]` = tarefas diferentes arquivos, sem dependência entre si
- `[USn]` = rastreamento da user story correspondente
- Cada user story é testável independentemente
- Commitar após cada task ou grupo lógico
- Checar `http://localhost:3000` após cada mudança no `storyData.ts`
