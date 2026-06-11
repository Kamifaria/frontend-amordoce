# Especificação do Recurso: Exploração e Ritmo da História

**Branch do Recurso**: `[008-story-exploration-and-pacing]`

**Criado em**: 11 de Junho de 2026

**Status**: Rascunho

**Entrada**: Descrição do usuário: "qual sera a historia que vamos usa preciso precisamos saber qual personagem vai se apresentar como vamos conocer os outros quero um espaço de tempo pra cada personagem quero um roteiro muito bom com intrigas quero um roteiro melhor que do amor doce pode criar cenarios conforma temos no mapa e coloca a opção depois que o aluno conhecera escola te a liberdade de andar pela patio quadra galpao mais pra frente liberar cinema entendeu e de dicas tbm aceito tudo"

## Cenários de Usuário & Testes *(obrigatório)*

### Caso de Uso 1 - Introdução Cadenciada de Personagens (Prioridade: P1)
Como jogadora, quero que a introdução de cada personagem principal ocorra em uma sequência dramática bem delimitada no início do jogo, para que eu tenha tempo de conhecer a personalidade e os mistérios de cada um sem ser sobrecarregada por muitos personagens ao mesmo tempo.

**Por que esta prioridade**: Crítico para a experiência narrativa (ritmo). Evita que todos os personagens se apresentem de uma vez e constrói a intriga inicial gradualmente.

**Teste Independente**: Pode ser testado jogando o prólogo/introdução linear onde o jogador conhece Nathaniel e Castiel no corredor, depois é guiado para a sala de aula onde encontra Remi, garantindo que nenhum outro personagem ou local do mapa apareça antes do momento correto.

**Cenários de Aceitação**:
1. **Dado** que a jogadora está iniciando o jogo, **Quando** ela avança no diálogo inicial, **Então** ela deve passar pelo confronto no Corredor (Nathaniel vs Castiel) e depois pelo encontro com Remi na sala de aula.
2. **Dado** que a jogadora está na fase introdutória, **Quando** ela abre o Mini-Mapa ou os Contatos do Celular, **Então** as áreas como Pátio, Quadra, Galpão e Cinema, assim como os personagens Maggie, Harry e Kami, devem aparecer bloqueados ou inacessíveis.

---

### Caso de Uso 2 - Exploração Livre no Pátio, Quadra e Galpão (Prioridade: P1)
Como jogadora, após concluir o tour inicial de introdução da escola, quero ter a liberdade de navegar livremente entre as áreas desbloqueadas do Mini-Mapa (Pátio, Quadra, Galpão e Corredores) para investigar pistas, conversar com personagens e progredir no mistério principal.

**Por que esta prioridade**: É a mecânica central de exploração que dá liberdade e controle ao jogador.

**Teste Independente**: Pode ser testado após o término da introdução, abrindo o Mini-Mapa e clicando nos ícones das diferentes localizações para alternar entre elas, interagindo com os personagens presentes em cada uma.

**Cenários de Aceitação**:
1. **Dado** que a jogadora terminou o mistério do bloco de notas ou o tour inicial, **Quando** ela acessa o Mini-Mapa, **Então** as opções "Pátio", "Quadra" e "Galpão" devem estar disponíveis para navegação livre.
2. **Dado** que a jogadora está na Quadra ou no Galpão, **Quando** ela clica nos pontos de interesse ou nos personagens residentes, **Então** diálogos específicos sobre o mistério atual devem ser disparados.

---

### Caso de Uso 3 - Desbloqueio Progressivo do Cinema (Prioridade: P2)
Como jogadora, quero que novas localizações fora da escola, como o Cinema, sejam desbloqueadas somente após atingir um nível mínimo de afinidade com um personagem ou completar o capítulo principal, abrindo a possibilidade de encontros (dates).

**Por que esta prioridade**: Cria um sentimento de recompensa e progressão ao longo da narrativa, expandindo o mundo do jogo de forma lógica.

**Teste Independente**: Simular o aumento de afinidade de um paquera acima de 50 pontos no Zustand Store e verificar se o ícone do Cinema torna-se ativo no Mini-Mapa.

**Cenários de Aceitação**:
1. **Dado** que a jogadora tem afinidade menor que 50 com todos os personagens, **Quando** ela olha o Mini-Mapa, **Então** a localização "Cinema" deve aparecer com um cadeado e uma mensagem de dica indicando o requisito.
2. **Dado** que a jogadora atinge afinidade >= 50 com qualquer personagem, **Quando** ela abre o mapa, **Então** o Cinema é desbloqueado e um diálogo de transição é ativado.

---

### Caso de Uso 4 - Sistema de Intriga Central "O Mistério do Gabarito" (Prioridade: P2)
Como jogadora, quero participar de um enredo principal cheio de intrigas escolares, suspeitas mútuas e fofocas no celular, onde minhas escolhas determinam quem me ajuda a investigar e como os outros reagem às minhas acusações.

**Por que esta prioridade**: Melhora significativamente a qualidade do roteiro, oferecendo alta rejogabilidade e drama mais maduro.

**Teste Independente**: Validar que as escolhas de diálogo alteram a linha de investigação (por exemplo, culpar o Castiel vs defender o Castiel), resultando em diálogos e reações diferentes no chat e na escola.

**Cenários de Aceitação**:
1. **Dado** que o roubo do gabarito foi anunciado, **Quando** a jogadora decide investigar com Nathaniel (Ordem) ou com Castiel (Rebelde), **Então** as pistas encontradas nos cenários (Quadra/Galpão) mudam dinamicamente.
2. **Dado** que a jogadora espalhou um boato sobre um personagem no SweetChat, **Quando** ela encontra esse personagem pessoalmente na escola, **Então** a reação e expressão inicial dele devem ser alteradas (ex: bravo ou triste).

---

### Casos de Borda (Edge Cases)

- **O que acontece se a jogadora gastar todos os seus PAs (Pontos de Ação) no meio da exploração?**
  - O sistema deve bloquear a navegação de mapas e interações de diálogo caras, exibindo um aviso amigável que sugere formas de recuperar PA.
- **Como o sistema se comporta se o jogador tentar pular etapas da introdução usando rotas diretas do chat?**
  - O estado do fluxo no Zustand Store deve restringir o gatilho dos chats até que as respectivas nodes narrativas de introdução física tenham sido concluídas.

## Requisitos *(obrigatório)*

### Requisitos Funcionais

- **FR-001**: O sistema DEVE gerenciar o progresso do fluxo da história através de estágios narrativos (`storyStage` no Zustand: `'INTRO'`, `'FREE_EXPLORE'`, `'MYSTERY_RESOLVED'`, `'DATE_CINEMA'`).
- **FR-002**: O mapa DEVE travar e destravar localizações dinamicamente dependendo do `storyStage` ativo e do nível de afinidade dos personagens.
- **FR-003**: Os personagens residentes DEVE mudar de localização física na escola de acordo com o progresso do capítulo.
- **FR-004**: O sistema DEVE exibir um balão de dicas rápidas (Tooltip/Dicas de Ajuda) no canto superior da tela ou no menu do celular para guiar a jogadora.
- **FR-005**: O sistema DEVE permitir a realização de escolhas de diálogo que afetem a afinidade individual e alterem o rumo da investigação.
- **FR-006**: O sistema DEVE habilitar a transição para o Cinema ao aceitar um convite de date.

### Entidades Chave

- **StoryStage**: Representa o marco narrativo atual do jogador no capítulo.
  - Atributos: `stageId` (string), `allowedLocations` (array de IDs), `hintText` (string de dica).
- **IntrigueClue**: Representa uma pista coletada nos cenários durante a exploração.
  - Atributos: `clueId` (string), `name` (string), `foundAt` (locationId), `requiredToProgress` (boolean).

## Critérios de Sucesso *(obrigatório)*

### Resultados Mensuráveis

- **SC-001**: A jogadora deve ser capaz de concluir o fluxo introdutório e receber a liberdade de exploração no mapa em menos de 5 minutos de jogo ativo.
- **SC-002**: A navegação entre mapas livres (Pátio, Quadra, Galpão) deve carregar instantaneamente, sem atrasos visíveis na transição de telas.
- **SC-003**: 100% dos eventos de desbloqueio do Cinema devem disparar quando a afinidade de um paquera cruzar o limiar de 50 pontos.
- **SC-004**: O jogador deve ter acesso a um diário de dicas visível no jogo que reduza a taxa de cliques perdidos em pelo menos 60%.

## Suposições e Premissas

- Presume-se que o mapa da escola já possui suporte visual para múltiplos cenários.
- Os recursos visuais do Cinema (background) serão integrados assim que a rota do Cinema for desbloqueada na narrativa.
- A mecânica de Pontos de Ação (PA) controlará o custo de exploração e escolhas narrativas.
