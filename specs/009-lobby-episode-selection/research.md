# Technical Research & Decisions: Game Lobby and Episode Selection

## Decisions & Architecture

### 1. Unified Game State vs Route Navigation
- **Decision:** O Lobby será renderizado condicionalmente dentro da rota `/game` com base em uma variável de estado no Zustand store (`currentView: 'lobby' | 'episode'`).
- **Rationale:** Isso evita recarregar a página ou re-inicializar o Zustand store ao entrar em um episódio. Mantém a música de fundo e as transições de tela suaves e controláveis via Framer Motion.
- **Alternatives Considered:** Criar uma rota separada `/lobby` no Next.js. Isso exigiria salvar o estado em cache (LocalStorage) e sincronizá-lo de forma complexa na montagem/desmontagem de cada rota.

### 2. Daily Tarot Game Engine (Remi)
- **Decision:** A tiragem de tarô diária será implementada utilizando componentes do Framer Motion com rotação 3D (`rotateY`) para revelar a carta sorteada. As cartas concederão recompensas aleatórias (PA e Gold) baseadas em um array de resultados possíveis (ex: "A Estrela" dá +20 PA, "O Sol" dá +15 Gold).
- **Rationale:** Aumenta muito o engajamento visual, encaixando-se perfeitamente com a temática romântica/gótica do jogo.
- **Alternatives Considered:** Um botão simples de "Resgatar Recompensa". Rejeitado por não ser "premium" nem lúdico.

### 3. Closet / Wardrobe State Persistence
- **Decision:** As roupas selecionadas pela jogadora serão armazenadas no Zustand e injetadas dinamicamente no componente de Avatar. O estado do closet será salvo localmente para persistir a customização da boneca em tempo de execução.
- **Rationale:** Permite alterar cabelos e blusas instantaneamente no lobby e nas ilustrações/cenas onde o avatar é renderizado.

---

## Technical Feasibility & Constraints

- **Zustand State Size:** O estado adicional do lobby é pequeno (apenas IDs dos episódios liberados, informações de roupas equipadas e o timestamp do último tarô diário). Não degradará o desempenho do Zustand.
- **Animations Performance:** Usar propriedades como `transform` e `opacity` no Framer Motion para garantir que todas as animações ocorram na GPU, atingindo 60 FPS estáveis mesmo em dispositivos mobile de baixo custo.
