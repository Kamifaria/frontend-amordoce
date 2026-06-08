# 🌸 Amor Doce da Veronica - Visual Novel Engine (Frontend) 🌸

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Zustand](https://img.shields.io/badge/Zustand-5.0-pink?style=for-the-badge)](https://github.com/pmndrs/zustand)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.0-purple?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-blue?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

Um motor de **Visual Novel** e simulador de romance inspirado no clássico jogo *Amor Doce*, totalmente recriado com uma estética moderna premium de alta fidelidade, animações responsivas e integração com sistema de mensagens virtuais.

---

## 🎨 Demonstração & Recursos Visuais

O projeto recria fielmente a experiência original do jogo com melhorias significativas de interface (UX/UI), trazendo um design com efeitos de vidro translúcido, sombras profundas e cores vibrantes inspiradas no colégio **Sweet Amoris**.

### ✨ Recursos Principais:
*   **🎭 Motor de Expressões Dinâmicas:** Os sprites dos personagens reagem ao contexto da cena mudando de expressão (`neutro`, `sorrindo`, `bravo`, `provocando`, `triste`) aplicando filtros CSS dinâmicos de cor/saturação e animações físicas (como tremores de raiva e pulos de alegria).
*   **📱 SweetPhone Integrado:** Um smartphone virtual completo que roda dentro do jogo:
    *   **SweetChat (Mensagens):** Converse com Maggie, Castiel, Nathaniel, Lysandre e outros com mensagens de texto assíncronas reativas.
    *   **Chamadas de Voz:** Receba ligações de voz automáticas quando ultrapassar limites de afinidade e ligue para qualquer contato com respostas faladas adaptadas à sua afinidade atual.
    *   **Guia LoveTips:** Um diário com segredos e gostos desbloqueáveis para cada paquera.
*   **📚 Catálogo de Episódios:** Menu de seleção de episódios completo com:
    *   Requisitos de desbloqueio estruturados.
    *   Contador de ilustrações (CGs) colecionadas por episódio.
    *   Proteção contra reinício acidental de progresso.
*   **🖼️ Ilustrações Colecionáveis (CGs):** Cenas especiais marcantes revelam ilustrações completas de tela inteira (como o primeiro encontro de tarô com o Remi) com ocultação inteligente de sprites.
*   **🔊 Sintetizador de Áudio (Web Audio API):** Efeitos sonoros retro sutilmente sintetizados diretamente no navegador para cliques, corações batendo (afinidade), escolhas de diálogo e ringtones do telefone, sem depender de arquivos de áudio externos grandes.

---

## 📂 Estrutura do Projeto

```text
src/
├── app/
│   ├── favicon.ico
│   ├── globals.css          # Estilos gerais e tokens Tailwind
│   ├── layout.tsx           # Layout principal da aplicação
│   ├── page.tsx             # Redirecionamento e inicialização
│   ├── login/
│   │   └── page.tsx         # Tela de Login clássica redesenhada
│   └── game/
│       ├── page.tsx         # Dashboard / HUD principal do jogo
│       └── episodes/
│           └── page.tsx     # Tela de seleção de episódios
├── components/
│   └── game/
│       ├── Cenario.tsx         # Renderizador do cenário (Backgrounds)
│       ├── ChoiceOverlay.tsx   # Painel com opções de diálogo/escolha reativas
│       ├── DialogueBox.tsx     # Caixa de diálogo com efeito de digitação suave
│       ├── EpisodeCard.tsx     # Card interativo de episódios
│       ├── GameContainer.tsx   # Envoltório responsivo com proporção 16:9
│       ├── HeroSection.tsx     # Apresentação principal na tela de Login
│       ├── LoveOMeter.tsx      # Barra de afinidade (LOM) clássica de termômetro
│       ├── PhoneOverlay.tsx    # Interface completa do celular virtual
│       ├── SideNavMenu.tsx     # Menu lateral estilo Sweet Amoris
│       ├── SpriteCharacter.tsx # Exibição e expressão física do paquera ativo
│       └── TopLoginBar.tsx     # Painel superior de formulário de login rosa
├── mock/
│   └── storyData.ts         # Árvore de diálogos completa (Episódios 1, 2 e 3)
├── shared/
│   └── types.ts             # Definições de tipos TS de diálogos, escolhas e chats
└── store/
    └── useGameStore.ts      # Estado global reativo com Zustand (PA, Gold, Inventário, Ligações)
```

---

## 🕹️ Como Funciona o Motor de História

O simulador é alimentado por um interpretador reativo baseado em um grafo indexado de nós de diálogo (`DialogueNode`):

```typescript
export interface DialogueNode {
  id: string;
  speaker: string;
  characterName: string;
  expression: string;     // 'neutro' | 'sorrindo' | 'bravo' | 'provocando' | 'triste'
  backgroundUrl: string;   // URL da imagem ou ID mapeado
  text: string;
  next?: string;           // Próximo nó automático
  choices?: Choice[];      // Escolhas disponíveis
  triggerChatCharacterId?: string; // Dispara chat no celular
  triggerChatText?: string;
}
```

Cada escolha do jogador consome **Pontos de Ação (PA)** e afeta a afinidade com o paquera correspondente, atualizando instantaneamente os contadores e ativando gatilhos no celular.

---

## ⚙️ Instalação e Execução

### Pré-requisitos
*   **Node.js**: Versão 18.0 ou superior.
*   **Gerenciador de Pacotes**: npm ou yarn.

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Kamifaria/frontend-amordoce.git
    cd frontend-amordoce
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

4.  **Acesse no navegador:**
    Navegue para [http://localhost:3000](http://localhost:3000).

### Integração com o Backend (NestJS + PostgreSQL)
A aplicação tenta carregar o progresso do jogador diretamente do servidor de API local na porta `4000`. Caso o servidor esteja offline, o motor ativa automaticamente o **Modo de Fallback Local**, persistindo seu progresso de escolhas, diálogos, ilustrações desbloqueadas e saldo de PA diretamente no `localStorage` do navegador para que você nunca perca seu progresso.

---

## 🔧 Scripts Úteis

*   `npm run dev` - Executa a aplicação localmente com hot-reload.
*   `npm run build` - Cria o pacote otimizado pronto para produção.
*   `npm run start` - Inicializa a aplicação construída em produção.
*   `npm run lint` - Analisa e corrige problemas de sintaxe e padrões de código.
