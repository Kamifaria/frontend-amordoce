# Lista de Tarefas: Exploração e Ritmo da História

**Entrada**: Documentos de design de `/specs/008-story-exploration-and-pacing/`

**Pré-requisitos**: [plan.md](file:///c:/Users/Kamila%20Faria/Desktop/Amor%20doce%20da%20veronica/frontend-amordoce/specs/008-story-exploration-and-pacing/plan.md) (obrigatório), [spec.md](file:///c:/Users/Kamila%20Faria/Desktop/Amor%20doce%20da%20veronica/frontend-amordoce/specs/008-story-exploration-and-pacing/spec.md) (obrigatório)

## Formato: `[ID] [P?] [Story] Descrição`

- **[P]**: Pode rodar em paralelo (arquivos diferentes, sem dependências cruzadas).
- **[Story]**: A qual caso de uso a tarefa pertence (ex: US1, US2, US3, US4).

---

## Fase 1: Configuração (Infraestrutura Compartilhada)

**Objetivo**: Inicialização do estado e tipos básicos necessários para a história.

- [x] T001 Definir o tipo `StoryStage` e expandir o estado da localização no arquivo de tipos compartilhado [types.ts](file:///c:/Users/Kamila%20Faria/Desktop/Amor%20doce%20da%20veronica/frontend-amordoce/src/shared/types.ts)
- [x] T002 [P] Atualizar a definição de chaves de locais permitidos para incluir `'quadra'` e `'galpao'` em [types.ts](file:///c:/Users/Kamila%20Faria/Desktop/Amor%20doce%20da%20veronica/frontend-amordoce/src/shared/types.ts)

---

## Fase 2: Fundacional (Bloqueios de Pré-requisitos)

**Objetivo**: Infraestrutura básica no estado global (Zustand) que deve estar pronta antes das histórias de usuário.

- [x] T003 Adicionar os estados `storyStage`, `currentLocationId` e `cluesFound` com as respectivas ações de modificação de estado em [useGameStore.ts](file:///c:/Users/Kamila%20Faria/Desktop/Amor%20doce%20da%20veronica/frontend-amordoce/src/store/useGameStore.ts)
- [x] T004 Implementar o interceptor de consumo de PA ao mudar de sala no Zustand em [useGameStore.ts](file:///c:/Users/Kamila%20Faria/Desktop/Amor%20doce%20da%20veronica/frontend-amordoce/src/store/useGameStore.ts)

**Ponto de Controle**: Fundações prontas. A implementação das histórias de usuário pode começar.

---

## Fase 3: História de Usuário 1 - Introdução Cadenciada de Personagens (Prioridade: P1) 🎯 MVP

**Meta**: Travar a jogabilidade no prólogo linear inicial para que os personagens e a intriga principal sejam apresentados um a um.

**Teste Independente**: Iniciar novo jogo e validar que o mapa está inacessível e a história flui do Corredor para a Sala de Aula linearmente.

### Implementação para US1

- [x] T005 [P] [US1] Configurar os nós narrativos de introdução inicial (Prólogo) no arquivo de script [storyData.ts](file:///c:/Users/Kamila%20Faria/Desktop/Amor%20doce%20da%20veronica/frontend-amordoce/src/mock/storyData.ts)
- [x] T006 [US1] Ocultar/desabilitar o botão de mapa e telefone enquanto o `storyStage` for `'INTRO'` no componente [GameScreen.tsx](file:///c:/Users/Kamila%20Faria/Desktop/Amor%20doce%20da%20veronica/frontend-amordoce/src/components/game/GameScreen.tsx)
- [x] T007 [US1] Acionar a transição automática do `storyStage` de `'INTRO'` para `'FREE_EXPLORE'` ao concluir o diálogo de Remi em [useGameStore.ts](file:///c:/Users/Kamila%20Faria/Desktop/Amor%20doce%20da%20veronica/frontend-amordoce/src/store/useGameStore.ts)

**Ponto de Controle**: Introdução linear funcionando perfeitamente e liberando o jogador para o modo livre.

---

## Fase 4: História de Usuário 2 - Exploração Livre no Pátio, Quadra e Galpão (Prioridade: P1)

**Meta**: Permitir que a jogadora navegue de forma autônoma pelos cenários da escola para interagir com diferentes personagens.

**Teste Independente**: Clicar no botão do mapa na interface após a introdução e navegar entre Pátio, Quadra e Galpão com sucesso.

### Implementação para US2

- [x] T008 [P] [US2] Adicionar suporte visual e rotas para os novos locais (Quadra e Galpão) no overlay de navegação [MapOverlay.tsx](file:///c:/Users/Kamila%20Faria/Desktop/Amor%20doce%20da%20veronica/frontend-amordoce/src/components/game/MapOverlay.tsx)
- [x] T009 [US2] Implementar renderização condicional das sprites de paqueras em seus respectivos cenários (Castiel/Harry/Kami no Pátio, Lysandre na Quadra, Maggie no Galpão) no componente [GameScreen.tsx](file:///c:/Users/Kamila%20Faria/Desktop/Amor%20doce%20da%20veronica/frontend-amordoce/src/components/game/GameScreen.tsx)
- [x] T010 [US2] Deduzir custo de 10 PAs por mudança de local no mapa na ação `changeLocation` em [useGameStore.ts](file:///c:/Users/Kamila%20Faria/Desktop/Amor%20doce%20da%20veronica/frontend-amordoce/src/store/useGameStore.ts)

---

## Fase 5: História de Usuário 3 - Desbloqueio Progressivo do Cinema (Prioridade: P2)

**Meta**: Habilitar a rota externa de encontro no Cinema quando a afinidade for alta e o mistério principal progredir.

**Teste Independente**: Aumentar a afinidade para 50, progredir no capítulo e verificar que o botão do Cinema fica ativo no mapa.

### Implementação para US3

- [x] T011 [P] [US3] Inserir ícone de cadeado e tooltip de dica para o local do Cinema em [MapOverlay.tsx](file:///c:/Users/Kamila%20Faria/Desktop/Amor%20doce%20da%20veronica/frontend-amordoce/src/components/game/MapOverlay.tsx)
- [x] T012 [US3] Implementar o gatilho de mudança de estágio para `'DATE_CINEMA'` no Zustand Store quando os critérios forem atingidos em [useGameStore.ts](file:///c:/Users/Kamila%20Faria/Desktop/Amor%20doce%20da%20veronica/frontend-amordoce/src/store/useGameStore.ts)
- [x] T013 [US3] Adicionar nó de diálogo do encontro do Cinema no roteiro de história [storyData.ts](file:///c:/Users/Kamila%20Faria/Desktop/Amor%20doce%20da%20veronica/frontend-amordoce/src/mock/storyData.ts)

---

## Fase 6: História de Usuário 4 - Sistema de Intriga "O Mistério do Gabarito" (Prioridade: P2)

**Meta**: Desenvolver a narrativa principal com suspeitas mútuas, coleta de pistas e investigações paralelas.

**Teste Independente**: Jogar as opções de investigação e validar que as pistas são salvas no estado e as falas mudam conforme a escolha do aliado.

### Implementação para US4

- [x] T014 [P] [US4] Escrever os diálogos de ramificação de escolhas da investigação ("Aliar com Nathaniel" vs "Aliar com Castiel") em [storyData.ts](file:///c:/Users/Kamila%20Faria/Desktop/Amor%20doce%20da%20veronica/frontend-amordoce/src/mock/storyData.ts)
- [x] T015 [US4] Implementar o salvamento de pistas coletadas no estado `cluesFound` do store em [useGameStore.ts](file:///c:/Users/Kamila%20Faria/Desktop/Amor%20doce%20da%20veronica/frontend-amordoce/src/store/useGameStore.ts)
- [x] T016 [US4] Exibir o inventário de pistas e histórico de boatos coletados na aba de "Notas/Dicas" do celular em [PhoneOverlay.tsx](file:///c:/Users/Kamila%20Faria/Desktop/Amor%20doce%20da%20veronica/frontend-amordoce/src/components/game/PhoneOverlay.tsx)

---

## Fase 7: Polimento e Transversalidade

**Objetivo**: Transições suaves, animações e testes de validação final.

- [x] T017 Adicionar efeito visual de transição fade ao alternar entre cenários da escola
- [x] T018 Adicionar tooltip visual de dicas ativas ("Dica: Procure pistas no Galpão") no HUD de jogo
- [x] T019 Executar testes manuais conforme o guia de verificação `quickstart.md`

---

## Dependências e Ordem de Execução

- **Configuração (Fase 1)**: Sem dependências, inicia imediatamente.
- **Fundacional (Fase 2)**: Depende da Fase 1 - Bloqueia todas as histórias de usuário.
- **Histórias de Usuário (Fases 3 a 6)**: Podem prosseguir em paralelo após a conclusão da Fase 2.
- **Polimento (Fase 7)**: Depende da conclusão das fases anteriores.
