# Feature Specification: Gameplay Enhancements Bundle

**Feature Branch**: `010-gameplay-enhancements`

**Created**: 2026-06-12

**Status**: Draft

**Input**: User description: "todas sao muito boas pode implementar" (todas as sugestões de interatividade e engajamento: Álbum de CGs, SweetGram no celular, Missões Diárias, Cenários Clicáveis e Conquistas).

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Álbum de Ilustrações / Galeria (Priority: P1)

Como jogadora, quero ver todas as ilustrações especiais (CGs) que desbloqueei nos episódios em uma aba de galeria no lobby.

**Independent Test**:
- Ir para o Lobby, acessar a aba "Galeria".
- Verificar que as CGs bloqueadas aparecem cinzas/com cadeado, e as desbloqueadas aparecem nítidas e podem ser ampliadas.

---

### User Story 2 - Rede Social "SweetGram" no Celular (Priority: P2)

Como jogadora, quero abrir um app de rede social no celular do jogo, ver postagens dos rapazes, curtir e comentar para ganhar afinidade extra.

**Independent Test**:
- Abrir o telefone no jogo, clicar no ícone do "SweetGram".
- Ver posts de Castiel e Lysandre. Clicar em "Curtir" e selecionar um comentário.
- Verificar se a afinidade com o personagem correspondente aumenta.

---

### User Story 3 - Missões Diárias no Lobby (Priority: P2)

Como jogadora, quero ver uma lista de 3 tarefas diárias no lobby e concluí-las para obter PA e Gold bônus.

**Independent Test**:
- Acessar a barra lateral ou seção do lobby para ver as missões (ex: "Fazer check-in diário", "Mudar de roupa", "Visualizar o tarô").
- Completar uma missão e ver a barra de progresso ou botão de resgate de PA/Gold funcionar.

---

### User Story 4 - Itens Clicáveis nos Cenários (Priority: P2)

Como jogadora, ao explorar cenários (como a Quadra ou Pátio), quero clicar em objetos brilhantes ou escondidos na tela para coletar Gold, PA ou itens de missão.

**Independent Test**:
- Entrar na Quadra no Episódio 1.
- Identificar um brilho no chão e clicar nele.
- Verificar que a chave da quadra é adicionada ao inventário e um feedback visual de "+10 Gold" surge na tela.

---

### User Story 5 - Notificação de Conquistas (Achievements) (Priority: P3)

Como jogadora, quero desbloquear conquistas ao atingir metas e ver um pop-up de parabéns animado na tela.

**Independent Test**:
- Subir a afinidade de Castiel para 50.
- Ver o pop-up "Conquista Desbloqueada: Guitarrista Rebelde" surgir no topo da tela com um efeito de som e brilho.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema MUST fornecer uma aba "Galeria" no Lobby que lista as CGs disponíveis por episódio.
- **FR-002**: O sistema MUST conter um novo aplicativo no PhoneOverlay chamado "SweetGram" com feed de fotos e comentários interativos que influenciam o Love-o-Meter.
- **FR-003**: O Lobby MUST exibir 3 Missões Diárias geradas aleatoriamente a cada dia, recompensando a jogadora com PA e Gold.
- **FR-004**: O componente de Cenário MUST renderizar itens interativos clicáveis baseados na localização atual do jogador.
- **FR-005**: O sistema MUST rastrear conquistas globais do jogador (ex: afinidade máxima, cliques no cenário) e exibir um aviso flutuante animado.

---

## Success Criteria *(mandatory)*

- **SC-001**: Curtir ou comentar no SweetGram altera a afinidade instantaneamente sem atrasos de rendering.
- **SC-002**: Itens clicáveis se adaptam à proporção 16:9 do container principal sem quebrar o alinhamento absoluto.
- **SC-003**: Pop-ups de conquista desaparecem sozinhos após 4 segundos e não bloqueiam cliques na tela de diálogo.
