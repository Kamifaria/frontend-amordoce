# Feature Specification: Game Lobby and Episode Selection

**Feature Branch**: `009-lobby-episode-selection`

**Created**: 2026-06-12

**Status**: Draft

**Input**: User description: "vamos para outra prte quando entra no jogo quero que mostrei tipo um lobby onde temos a escolha dos capilotos obviamnente apenas 1 capitolo vai fica liberado os outros não pq so libera se vc concluir e um lobby onde podemos criar algumas interaçoes quero dicas de como deixa esse loby legal antes da pessoa começa o jogo dicas de como podemos melhorar tudo isso"

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Seleção e Desbloqueio de Episódios (Priority: P1)

Como jogadora, ao acessar o jogo, quero ver uma lista dos episódios disponíveis e poder iniciar o primeiro episódio para poder jogar a história sequencialmente.

**Why this priority**: É o fluxo principal e necessário para o jogo funcionar. Sem a seleção e desbloqueio progressivo de episódios, não há progressão de história.

**Independent Test**:
- Logar no jogo e verificar que apenas o Episódio 1 está desbloqueado para jogar.
- Completar o Episódio 1 e retornar ao Lobby para verificar que o Episódio 2 foi desbloqueado com sucesso.
- Tentar iniciar o Episódio 2 diretamente com o Episódio 1 incompleto e garantir que o acesso seja bloqueado.

**Acceptance Scenarios**:
1. **Given** que a jogadora acabou de criar uma conta ou está jogando pela primeira vez, **When** ela acessa a tela de seleção de episódios, **Then** apenas o Episódio 1 deve estar jogável, e os episódios subsequentes devem exibir um ícone de cadeado.
2. **Given** que a jogadora completou com sucesso o Episódio 1, **When** ela retorna ao lobby, **Then** o Episódio 2 deve passar a exibir o status "Desbloqueado" e ficar disponível para início.

---

### User Story 2 - Tiragem de Tarô Diária de PA/Gold (Priority: P2)

Como jogadora, quero poder interagir com uma tiragem de cartas de tarô com o personagem Remi diariamente no lobby para ganhar Pontos de Ação (PA) e Gold adicionais de forma lúdica.

**Why this priority**: Melhora muito o engajamento diário e a retenção, dando utilidade ao lobby antes da jogadora começar o jogo.

**Independent Test**:
- Clicar no banner do Remi no lobby para abrir a tela de tarô.
- Escolher uma carta de tarô e receber uma recompensa aleatória de PA ou Gold.
- Tentar tirar outra carta no mesmo dia e ver uma mensagem indicando que a tiragem diária já foi realizada.

**Acceptance Scenarios**:
1. **Given** que a jogadora não realizou a tiragem diária hoje, **When** ela acessa a área do Remi no lobby e escolhe uma carta, **Then** o jogo deve exibir a carta de tarô correspondente e creditar de forma animada o PA/Gold na conta da jogadora.
2. **Given** que a tiragem diária já foi concluída hoje, **When** a jogadora tenta jogar novamente, **Then** a opção deve aparecer desabilitada com um cronômetro indicando o tempo restante até a próxima tiragem.

---

### User Story 3 - Visualização de Afinidade e Amorômetro (Priority: P2)

Como jogadora, quero ver meus status de afinidade (Love-o-Meter) com todos os rapazes diretamente no lobby para saber quem está com o maior nível de afeição.

**Why this priority**: Incentiva o replay dos episódios para melhorar a pontuação com os personagens preferidos.

**Independent Test**:
- Clicar na aba "Afinidades" ou no painel de Love-o-Meter no lobby.
- Verificar que as pontuações de Castiel, Lysandre, Nathaniel e Kami são exibidas corretamente em forma de barras verticais ou corações.

**Acceptance Scenarios**:
1. **Given** que a jogadora possui progresso salvo com afinidades variadas, **When** ela abre o painel de status do lobby, **Then** as barras do Love-o-Meter devem refletir as pontuações atuais acumuladas até o momento.

---

### User Story 4 - Closet de Customização Visual (Priority: P3)

Como jogadora, quero poder trocar de roupa, cabelo ou acessórios da minha personagem no lobby para que a minha personagem apareça customizada durante as conversas no jogo.

**Why this priority**: Altamente solicitado em jogos de romance, mas é um recurso cosmético secundário que pode ser integrado em fases posteriores.

**Independent Test**:
- Acessar o ícone de Guarda-roupa no lobby.
- Selecionar um item de vestuário diferente e salvar.
- Iniciar um episódio e verificar que o sprite da protagonista reflete as alterações feitas.

**Acceptance Scenarios**:
1. **Given** que a jogadora possui itens de roupa desbloqueados, **When** ela seleciona uma blusa no Closet e clica em "Salvar", **Then** o avatar principal do lobby e o sprite de diálogo no jogo devem atualizar para a blusa selecionada.

---

### Edge Cases

- **Troca de episódio em andamento:** Se a jogadora iniciar o Episódio 2 mas decidir voltar para repetir o Episódio 1, o progresso do Episódio 2 é preservado ou perdido? [NEEDS CLARIFICATION: Política de replay de episódios]
- **Sem recursos para o episódio:** Se a jogadora tentar iniciar um episódio que exige uma certa quantidade mínima de PA ou Gold, o jogo deve impedir a entrada e sugerir a tiragem de cartas ou a compra de recursos.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema MUST exibir uma tela de Lobby interativa imediatamente após o login bem-sucedido.
- **FR-002**: O Lobby MUST conter um componente de seleção de episódios em formato de carrossel de capas.
- **FR-003**: Apenas o Episódio 1 MUST estar liberado inicialmente. Os episódios 2 e seguintes devem requerer a conclusão do episódio imediatamente anterior na ordem numérica para serem desbloqueados.
- **FR-004**: O Lobby MUST disponibilizar um mini-game diário de Tarô com Remi que garante bônus de PA/Gold aleatórios uma vez a cada 24 horas.
- **FR-005**: O Lobby MUST possuir um painel de consulta rápida do Love-o-Meter com os personagens principais (Nathaniel, Castiel, Lysandre, Kami).
- **FR-006**: O Lobby MUST dar acesso a uma área de Closet (Guarda-roupa) permitindo customizar o avatar do usuário.
- **FR-007**: O sistema MUST tocar uma trilha sonora ambiente exclusiva do lobby que pode ser pausada pelo jogador.
- **FR-008**: O progresso de episódios concluídos e desbloqueados MUST ser sincronizado com o banco de dados/localStorage para persistência entre sessões.

### Key Entities

- **UserProgress**:
  - `completedEpisodes`: Lista com IDs dos episódios concluídos.
  - `activeEpisodeId`: ID do episódio que está sendo jogado no momento (se houver).
  - `lastDailyDraw`: Timestamp do último sorteio de tarô diário efetuado.
- **Episode**:
  - `id`: Identificador único.
  - `title`: Título do episódio.
  - `description`: Sinopse rápida do capítulo.
  - `coverImage`: URL da imagem ilustrativa da capa.
  - `unlocked`: Status indicando se a jogadora pode jogá-lo.
- **ClosetOutfit**:
  - `activeHairstyle`: Estilo de cabelo selecionado.
  - `activeTop`: Blusa/camisa vestida.
  - `activeBottom`: Calça/saia vestida.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: O tempo de carregamento inicial do Lobby a partir do Login deve ser inferior a 1.2 segundos em conexões padrão.
- **SC-002**: 100% dos usuários devem conseguir resgatar o bônus diário de Tarô em menos de 3 cliques após entrar no Lobby.
- **SC-003**: Bloqueio de episódios não concluídos deve ser 100% robusto do lado do cliente (sem bypass visual).

---

## Assumptions

- Presume-se que o usuário possua uma conta registrada e dados de inventário (PA, Gold) ativos para exibir no lobby.
- A customização de roupas no Closet utiliza ativos de imagem SVG ou PNG pré-fatiados com transparência para sobreposição perfeita no avatar.
- As músicas tocadas no lobby respeitam a preferência de volume global do usuário configurada no jogo.
