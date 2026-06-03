# Amor Doce - Visual Novel Engine (Frontend)

Este é o repositório do frontend do simulador do jogo **Amor Doce**, desenvolvido com tecnologias modernas de desenvolvimento web como **Next.js**, **Zustand** para gerenciamento de estado global, **Framer Motion** para animações fluidas e **Tailwind CSS** para estilização visual.

---

## 🚀 Tecnologias Utilizadas

*   **Next.js (v16.2)**: Framework React com App Router.
*   **Zustand (v5.0)**: Gerenciamento de estado global leve e reativo.
*   **Framer Motion (v12.4)**: Animações de transição de cenário e aparição de sprites/escolhas.
*   **Tailwind CSS (v4)**: Estilização utilitária moderna e responsiva.
*   **Lucide React**: Biblioteca de ícones modernos.
*   **TypeScript**: Tipagem estática para robustez do código.

---

## 📂 Estrutura do Projeto

```text
src/
├── app/
│   ├── favicon.ico
│   ├── globals.css      # Estilos globais e reset do Tailwind
│   ├── layout.tsx       # Estrutura principal da página
│   └── page.tsx         # Página principal do simulador de jogo
├── components/
│   └── game/
│       ├── Cenario.tsx         # Fundo visual do jogo com animações de transição
│       ├── ChoiceOverlay.tsx   # Painel com opções de diálogo/escolha reativas
│       ├── DialogueBox.tsx     # Caixa de diálogo com o nome do personagem e efeito typewriter
│       ├── GameContainer.tsx   # Container principal que encapsula a tela de jogo
│       └── SpriteCharacter.tsx # Exibição e animações dos sprites dos personagens
├── mock/
│   └── story.ts         # Base de dados em mock para testar a árvore de diálogos
├── shared/
│   └── types.ts         # Definições de tipos TypeScript (DialogueNode, Choice, etc.)
└── store/
    └── useGameStore.ts  # Gerenciamento de estado global com Zustand
```

---

## 🕹️ Funcionalidades e Funcionamento do Motor do Jogo

O sistema opera como um interpretador de **Árvores de Diálogos (Dialogue Trees)**.

1.  **Carregamento do Cenário e Diálogo**: Cada nó de diálogo (`DialogueNode`) possui:
    *   `characterName`: O nome do personagem falando no momento.
    *   `text`: O texto a ser falado.
    *   `backgroundUrl`: A imagem de fundo do cenário.
    *   `choices`: Um array de opções disponíveis para o jogador.
    *   `next`: O ID do próximo nó automático caso não haja opções.
2.  **Sistema de Pontos de Ação (PA) e Gold**:
    *   Ações e escolhas deduzem pontos de PA de forma dinâmica.
    *   O estado é preservado de forma global, bloqueando transições caso o jogador não tenha PA suficiente.
3.  **Animações Reativas**:
    *   Transições suaves de cenários de fundo utilizando `Framer Motion`.
    *   Efeito de digitação da caixa de diálogo.

---

## 🛠️ Gerenciamento de Estado (Zustand Store)

O estado centralizado em `src/store/useGameStore.ts` controla:
*   `currentNodeId`: O identificador do nó da história atual.
*   `playerPA`: Pontos de Ação disponíveis do jogador.
*   `playerGold`: Ouro/dinheiro disponível para compras.
*   `choices`: As escolhas ativas no nó de diálogo atual.
*   `initStory()`: Inicializa a árvore de diálogos e carrega o primeiro nó.
*   `nextNode()`: Avança na história em diálogos lineares.
*   `selectChoice()`: Processa a escolha do jogador, deduzindo PA se necessário e atualizando o nó.

---

## ⚙️ Instalação e Execução

### Pré-requisitos
*   [Node.js](https://nodejs.org/) instalado (versão v18 ou superior recomendada)
*   Gerenciador de pacotes `npm` ou `yarn`

### Passos para Rodar

1.  **Clone o repositório**:
    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd frontend-amordoce
    ```

2.  **Instale as dependências**:
    ```bash
    npm install
    ```

3.  **Execute o servidor de desenvolvimento**:
    ```bash
    npm run dev
    ```

4.  **Acesse no navegador**:
    Abra [http://localhost:3000](http://localhost:3000) para ver e interagir com o jogo.

---

## 🔧 Scripts Úteis

*   `npm run dev` - Executa o servidor de desenvolvimento local.
*   `npm run build` - Gera a build otimizada de produção.
*   `npm run start` - Inicia a aplicação construída em ambiente de produção.
*   `npm run lint` - Analisa e corrige problemas de formatação e boas práticas com ESLINT.
