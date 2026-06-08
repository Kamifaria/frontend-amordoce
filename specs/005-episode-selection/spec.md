# Feature Specification: Episode Selection Screen

**Feature Branch**: `005-episode-selection`

**Created**: 2026-06-08

**Status**: Draft

**Input**: User description: "Tela de Seleção de Episódios: Uma interface de menu para escolher qual episódio da história jogar. achei interessante , como funciona o amor doce? a jogabilidade e oque foi implementado conforme o tempo?"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Episode Catalog Visual Grid (Priority: P1)

Como jogador, quero ver um catálogo visual dos episódios disponíveis no jogo, exibindo o número do episódio, título, imagem de visualização, descrição rápida e status de bloqueado/desbloqueado, para que eu possa acompanhar meu progresso na história.

**Why this priority**: É a base visual necessária para que o usuário saiba quais partes da história existem e quais estão disponíveis para jogar.

**Independent Test**: Acessar o menu principal do jogo, clicar em "Episódios" e verificar se a grade de episódios carrega com os dados corretos (título, descrição, imagem) e se os episódios posteriores ao progresso atual aparecem com um ícone de cadeado.

**Acceptance Scenarios**:

1. **Given** que o jogador está na tela de seleção de episódios, **When** a página carrega, **Then** o jogador deve ver os cards dos episódios 1 (desbloqueado), 2 (desbloqueado/bloqueado dependendo do progresso) e 3 (bloqueado).
2. **Given** um card de episódio desbloqueado, **When** o jogador passa o mouse (hover), **Then** ele deve ver efeitos visuais sutis indicando interatividade.
3. **Given** um card de episódio bloqueado, **When** o jogador visualiza o card, **Then** ele deve ver um overlay escurecido com um ícone de cadeado e o botão de jogar desabilitado.

---

### User Story 2 - Launching & Replaying Episodes (Priority: P2)

Como jogador, quero selecionar um episódio desbloqueado e clicar em "JOGAR" para iniciar ou retomar a história desse episódio a partir de seu nó inicial, carregando o fluxo correspondente no jogo.

**Why this priority**: Conecta a tela de seleção ao loop principal de gameplay, tornando-a funcional.

**Independent Test**: Clicar no botão "JOGAR" do Episódio 1 e verificar se a tela do jogo é aberta carregando os diálogos iniciais específicos desse episódio.

**Acceptance Scenarios**:

1. **Given** o card do Episódio 1 desbloqueado, **When** o jogador clica em "JOGAR", **Then** o estado do jogo no Zustand Store é inicializado com a árvore de história do Episódio 1 e o usuário é redirecionado para a tela principal de gameplay (`/game`).

---

### User Story 3 - Collectibles & CG Trackers (Priority: P3)

Como jogador, quero ver em cada card de episódio a quantidade de ilustrações (CGs) especiais que já desbloeei (ex: "1/3 Ilustrações Obtidas"), para me motivar a rejogar e conseguir todos os finais.

**Why this priority**: Aumenta o valor de replay e engajamento do jogador com o jogo.

**Independent Test**: Verificar se o contador de ilustrações no card do episódio corresponde às imagens desbloqueadas salvas no perfil do jogador.

**Acceptance Scenarios**:

1. **Given** a tela de episódios, **When** o card do Episódio 1 é renderizado, **Then** deve exibir um selo com "🏆 Ilustrações: X/Y" representando as imagens coletadas.

### Edge Cases

- **Troca rápida de episódios**: Se o jogador mudar de episódio enquanto houver uma partida ativa em progresso, o sistema deve exibir um aviso de confirmação antes de apagar o progresso local ativo do episódio atual.
- **Nenhum episódio desbloqueado**: Caso ocorra erro de carregamento ou banco novo, o Episódio 1 deve ser desbloqueado por padrão.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema MUST exibir uma página ou seção `/game/episodes` com layout responsivo composto por cards de episódios em formato grid/carousel.
- **FR-002**: Cada card de episódio MUST exibir: número do episódio, título, descrição curta, imagem representativa de visualização e status de desbloqueio.
- **FR-003**: Episódios bloqueados MUST exibir um overlay visual com ícone de cadeado e impedir a ação de jogar.
- **FR-004**: Ao selecionar um episódio e confirmar, o sistema MUST inicializar a `storyTree` correspondente no Zustand Store e redirecionar para a tela do jogo.
- **FR-005**: O sistema MUST exibir o total de ilustrações desbloqueadas (CGs) por episódio (ex: "🏆 Ilustrações: 1/3").
- **FR-006**: O sistema MUST exibir um aviso de confirmação caso o usuário tente iniciar um novo episódio tendo um progresso ativo não finalizado.

### Key Entities

- **Episódio**: Representa um episódio da história. Atributos: ID, número, título, descrição, imagem de capa, nó de início (startNodeId), lista de nós de diálogo, lista de ilustrações (CGs) associadas, e status (desbloqueado/bloqueado).
- **Progresso do Jogador**: Armazena as informações de qual episódio está ativo e quais CGs já foram coletadas.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: O usuário consegue transitar da tela de seleção de episódios para o gameplay do episódio selecionado em menos de 1 segundo.
- **SC-002**: O design visual dos cards mantém fidelidade de 95% às proporções clássicas do menu de episódios do Amor Doce em resoluções desktop e mobile.

## Assumptions

- As árvores de história de cada episódio estarão disponíveis no arquivo mock de história (`src/mock/storyData.ts`) divididas por identificadores específicos (ex: `ep1_start`, `ep2_start`).
- As ilustrações desbloqueadas serão salvas no perfil local do jogador no Zustand Store e mantidas no LocalStorage.
