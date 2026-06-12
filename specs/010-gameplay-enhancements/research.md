# Technical Research & Decisions: Gameplay Enhancements Bundle

## Decisions & Architecture

### 1. Point-and-Click Items Positioning
- **Decision:** Os itens clicáveis nos cenários serão definidos em um mapa estático por localização (`currentLocationId`). Cada item terá coordenadas de posicionamento percentuais (`left: string`, `top: string`) para se posicionarem de forma responsiva no container 16:9 de `Cenario.tsx`.
- **Rationale:** Isso garante que o item sempre esteja exatamente no mesmo lugar do cenário (ex: chave em cima do banco na quadra), independente da resolução da tela do usuário.
- **Alternatives Considered:** Coordenadas absolutas em pixels (quebraria em telas mobile ou redimensionadas).

### 2. achievements tracking
- **Decision:** As conquistas serão verificadas dinamicamente toda vez que o estado do Zustand mudar (usando hooks ou assinando mudanças de afinidade, moedas ou PAs).
- **Rationale:** Centraliza o trigger de conquistas e evita espalhar lógica de desbloqueio em centenas de linhas de diálogos.

### 3. SweetGram Feed
- **Decision:** As postagens do SweetGram serão mockadas em um arquivo de dados estruturado. O estado de curtidas e respostas de comentários selecionados será gravado no Zustand para que cada ação seja realizada uma única vez e aumente a afinidade permanentemente.
