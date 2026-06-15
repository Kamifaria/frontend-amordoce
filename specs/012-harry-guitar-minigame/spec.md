# Feature Specification: Harry Guitar Minigame

**Feature Branch**: `[012-harry-guitar-minigame]`

**Created**: 2026-06-15

**Status**: Draft

**Input**: User description: "quando a personagem conhcer o harry quero que eles tenham um pouco mais de interação no patio e ele pergunta pra veronica se ela que aprender a tocar e nisso se ela escolher sim entra em um mini game igual o guitahero ou mais simples seja qual for a for de fazer de aperta os botao no tempo que aparece na tela nas cortas do violao m mas pra frente queria coloca como se fosse uma musica do harry style mas oque vc sugerte nessa gameplay? quero dicas e melhorias para o jogo fica mega legal"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Descobrindo o Minigame (Priority: P1)

A jogadora explora o pátio, encontra o Harry tocando violão e inicia uma interação. Ele oferece ensinar Veronica a tocar. Ao aceitar, o jogo transiciona suavemente para o minigame.

**Why this priority**: É a ponte essencial entre a narrativa (Visual Novel) e a nova mecânica de gameplay. Sem isso, a mecânica não existe no universo do jogo.

**Independent Test**: Pode ser testado navegando até o diálogo correto no fluxo de história e verificando se a escolha engatilha a tela do minigame.

**Acceptance Scenarios**:

1. **Given** que Veronica está no pátio conversando com Harry, **When** ele a convida para tocar violão, **Then** aparecem opções de "Sim" e "Não".
2. **Given** que a jogadora seleciona "Sim", **When** o diálogo acaba, **Then** a interface do minigame de guitarra é carregada na tela.

---

### User Story 2 - Mecânica Guitar Hero Simplificada (Priority: P1)

Durante o minigame, notas musicais "caem" em cordas virtuais na tela, e a jogadora precisa pressionar as teclas correspondentes ou tocar na tela exatamente quando a nota passar pela zona de acerto.

**Why this priority**: É o núcleo do gameplay interativo que quebra a monotonia da leitura de diálogos.

**Independent Test**: O minigame pode ser jogado independentemente recebendo uma música/sequência de notas mockada para testar a detecção de acertos e erros.

**Acceptance Scenarios**:

1. **Given** que o minigame iniciou, **When** uma nota chega na zona de acerto e o botão é pressionado no tempo correto, **Then** o jogo registra um "Acerto" (Hit) e aumenta o combo e pontuação.
2. **Given** que uma nota passou pela zona de acerto, **When** o botão for ignorado ou pressionado fora do tempo, **Then** o jogo registra um "Erro" (Miss) e reseta o combo.

---

### User Story 3 - Recompensa de Afinidade (Priority: P2)

No final da música, a pontuação total é calculada. O desempenho da jogadora dita a reação de Harry e quanto de Afinidade ela ganha com ele.

**Why this priority**: Recompensa a jogadora pelo seu esforço e conecta o minigame ao principal loop de progressão do jogo (Lov-o-Meter).

**Independent Test**: Pode ser testado mockando uma pontuação final e verificando a injeção correta dos pontos de afinidade no banco de dados da sessão.

**Acceptance Scenarios**:

1. **Given** que a música acabou, **When** a tela de resultado aparece, **Then** a pontuação final é mostrada.
2. **Given** um bom desempenho (>70%), **When** o minigame fecha, **Then** Harry elogia a jogadora e a afinidade aumenta significativamente.
3. **Given** um mau desempenho (<30%), **When** o minigame fecha, **Then** Harry faz uma provocação amigável e a afinidade aumenta de forma leve ou neutra.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE adicionar uma ramificação de diálogo na árvore de nós (storyTree) associada ao encontro com Harry no pátio.
- **FR-002**: O sistema DEVE possuir uma engine simplificada de ritmo, suportando entre 3 a 4 "cordas" (lanes) para notas descendentes.
- **FR-003**: O sistema DEVE permitir suporte de input por Teclado (teclas A, S, D, F) e Toque na Tela (Mobile touch) nas cordas.
- **FR-004**: O sistema DEVE acompanhar métricas de Acertos, Erros, Combo Atual e Pontuação Total.
- **FR-005**: O sistema DEVE carregar faixas de áudio e sincronizar a queda visual das notas com o ritmo da música de fundo (BPM aproximado).
- **FR-006**: O sistema DEVE integrar a pontuação final com o sistema de Afinidades global do `useGameStore`.

### Key Entities

- **NoteTrack**: Estrutura de dados que define o tempo de cada nota caindo nas pistas (timestamp, duração, tipo de corda).
- **MinigameResult**: Objeto guardando pontuação, taxa de acerto e combo máximo alcançado na partida.

## Dicas e Sugestões de Melhorias para o Gameplay (Visão de Design)
- **Visualização Estética**: Como Harry é inspirado no rock/indie (Harry Styles), a música escolhida deve ser na pegada violão acústico animado (estilo "Cherry" ou "Canyon Moon"). As notas podem ser pequenos corações ou palhetas de violão em tons pastéis (rosa e lilás) para manter a estética do jogo "Amor Doce da Veronica".
- **Facilidade**: Em vez das 5 pistas do Guitar Hero clássico, recomendo **3 pistas (cordas)** para manter a jogabilidade fácil em telas verticais de celular, considerando que seu público pode jogar com uma mão.
- **Mecânica de "Fever"**: Ao acertar 10 notas seguidas, as notas ganham brilho, o som ganha palmas e a pontuação duplica.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: O minigame deve rodar a 60 FPS consistentes em dispositivos desktop e mobile modernos.
- **SC-002**: Jogadoras em telas mobile devem conseguir registrar inputs (touch) sem atraso perceptível de hardware (< 50ms de latência input/visual).
- **SC-003**: 80% das testadoras devem considerar a dificuldade inicial "Acessível" ou "Fácil" na primeira tentativa.
- **SC-004**: A transição entre o diálogo e o minigame deve ocorrer em menos de 2 segundos.

## Assumptions

- Assumimos que o áudio/música usado (por exemplo, faixas inspiradas em Harry Styles) não incorrerá em violação de Direitos Autorais severas na versão de desenvolvimento, usando faixas cover acústicas gratuitas.
- Assumimos que a latência padrão do navegador com React é responsiva o suficiente para um minigame casual sem necessidade de engine externa (WebGL).
- A engine será construída em 2D usando Framer Motion ou CSS Transitions via requestAnimationFrame.
