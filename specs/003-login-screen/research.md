# Research & Decisions - Login Screen Amor Doce

Esta seção documenta as decisões de design, ativos visuais e estratégias de responsividade para a recriação da tela de login clássica do Amor Doce (High School Life).

## Decisões Técnicas e de Design

### 1. Ativos Visuais Oficiais
*   **Imagem de Fundo**: Utilizaremos a imagem de fundo oficial carregada do domínio clássico.
    *   **URL**: `https://www.amordoce.com/image/index/disconnected/s1/crush.jpg`
*   **Logotipo**: O logotipo oficial do Sweet Amoris será centralizado no meio superior da tela.
    *   **URL**: `https://www.amordoce.com/image/i18n/br/logo-as/as-s1.png`

### 2. Cabeçalho de Login (Top Login Bar)
*   **Decisão**: Criar um componente isolado `TopLoginBar.tsx` na pasta de componentes.
*   **Estilo**: Barra horizontal rosa com inputs integrados (E-mail e Senha) com estilo arredondado e borda sutil, ícone de interrogação rosa e botões de ação ("Entrar" e "Conexão via Facebook").
*   **Fontes**: Usaremos a fonte `Arvo` (serif) padrão do jogo clássico para manter a fidelidade tipográfica.

### 3. Responsividade (Mobile)
*   **Desafio**: O site clássico foi projetado para largura mínima de 1200px.
*   **Solução**: Em telas pequenas (< 1024px), a barra de login superior se transformará em um formulário colapsável ou empilhado para garantir a usabilidade no mobile, enquanto a imagem de fundo se ajustará com `background-size: cover`.

### 4. Alternativas Consideradas
*   *Hospedar imagens localmente*: Rejeitado inicialmente para usar as URLs oficiais do jogo como assets nativos e manter o tamanho do repositório baixo, mas com fallback local caso haja indisponibilidade.
