# Feature Specification: Login Screen Amor Doce

**Feature Branch**: `003-login-screen-amor-doce`

**Created**: 2026-06-03

**Status**: Draft

**Input**: User description: "preciso que a login screaen fique igual a do site do amor doce https://www.amordoce.com/high-school-life#intro faça uma pesquisa nesse site e copie tudo que for preciso"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Desktop Layout Authentication (Priority: P1)

Como jogador, quero acessar a tela de login do simulador com a identidade visual clássica do Amor Doce (High School Life), contendo o formulário de login no topo e a arte de fundo com os paqueras, para ter uma experiência imersiva e familiar.

**Why this priority**: A autenticação básica é o núcleo do fluxo de entrada do usuário. O visual idêntico ao jogo clássico é a principal demanda estética.

**Independent Test**: Pode ser testado acessando a rota principal `/login` ou a página inicial `/`, preenchendo os campos de e-mail e senha no formulário do topo e clicando em entrar.

**Acceptance Scenarios**:

1. **Given** que o usuário está na tela inicial, **When** a página carrega, **Then** o usuário deve ver a barra superior rosa com os campos de "E-mail", "Senha", o botão de interrogação `?` (recuperação) e o botão de login (ícone ou texto).
2. **Given** a tela inicial carregada, **When** o usuário olha para o fundo, **Then** ele deve ver a imagem clássica dos paqueras e o logotipo Sweet Amoris centralizado.
3. **Given** o formulário no topo, **When** o usuário insere credenciais válidas e clica em Entrar, **Then** ele deve ser autenticado e redirecionado para a tela do jogo.

---

### User Story 2 - Cadastro e CTA "Jogar" (Priority: P2)

Como novo jogador, quero ver o botão chamativo de "JOGAR" no centro/esquerda da tela, com as estatísticas de inscritos e jogadoras online, para que eu possa me cadastrar ou iniciar o fluxo do jogo de forma simples.

**Why this priority**: É a principal chamada de ação (CTA) da página clássica, guiando novos usuários no fluxo de conversão.

**Independent Test**: Clicar no botão "JOGAR" no meio da página e verificar se abre o fluxo/modal de cadastro.

**Acceptance Scenarios**:

1. **Given** a seção de conteúdo principal ativa, **When** o usuário olha abaixo do texto descritivo da escola, **Then** ele deve ver o botão de CTA "JOGAR" com as informações de contadores ("25.242.053 INSCRITOS", "1.448 apaixonadas online").

---

### User Story 3 - Menu de Navegação e Redes Sociais (Priority: P3)

Como usuário, quero navegar pelos links laterais (Início, Paqueras, Personalização, Episódios, Aplicativo) e ícones de redes sociais no rodapé para acessar informações complementares.

**Why this priority**: Aprimora a navegação e fidelidade visual da página oficial.

**Independent Test**: Clicar nos links do menu vertical direito e observar a navegação por âncora ou mudança de seção.

**Acceptance Scenarios**:

1. **Given** a tela de login, **When** o usuário clica em "Paqueras" no menu vertical lateral direito, **Then** a visualização deve deslizar ou atualizar para a seção correspondente.

### Edge Cases

- **Telas muito pequenas (Mobile)**: Como a página oficial clássica do Amor Doce usa largura fixa (ou viewport de 1200px), a tela deve manter a legibilidade ou readequar o formulário do topo em telas menores de forma responsiva.
- **Campos Vazios**: Se o usuário clicar no botão de submissão do topo com os campos de E-mail ou Senha vazios, o formulário deve exibir um alerta visual simples sem tentar realizar a requisição.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema MUST exibir o cabeçalho superior (Top Login Bar) com formulário contendo: campo E-mail (placeholder "E-mail"), campo Senha (type="password", placeholder "Senha"), botão de recuperação "?" e botão submit estilizado de acordo com o original.
- **FR-002**: O sistema MUST possuir um botão para "Conexão via Facebook" estilizado na barra de login superior.
- **FR-003**: O sistema MUST exibir como imagem de fundo principal a imagem clássica do Amor Doce (URL: `https://www.amordoce.com/image/index/disconnected/s1/crush.jpg`).
- **FR-004**: O logotipo oficial do Sweet Amoris MUST ser exibido centralizado no topo (URL: `https://www.amordoce.com/image/i18n/br/logo-as/as-s1.png`).
- **FR-005**: O sistema MUST incluir um menu de navegação vertical no lado direito com as opções: Início, Paqueras, Personalização, Episódios e Aplicativo.
- **FR-006**: O sistema MUST exibir a seção principal de apresentação com o texto "Crie a sua própria aventura na escola Sweet Amoris..." e o botão de CTA "JOGAR".

### Key Entities *(include if feature involves data)*

- **Sessão do Jogador**: Representa o estado do jogador conectado após autenticação no formulário superior. Atributos: E-mail, Token, Logado (Boolean).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A tela de login carrega os ativos visuais (imagem de fundo e logotipo oficial) em menos de 2 segundos sob conexão estável.
- **SC-002**: O layout do cabeçalho superior e o posicionamento do formulário mantêm fidelidade visual de 95% em relação ao site original clássico em resoluções de desktop (1200px ou superior).

## Assumptions

- A API de autenticação existente no backend é compatível e será utilizada para validar o formulário de login.
- As imagens e logotipos oficiais hospedados no domínio `amordoce.com` serão referenciados diretamente ou hospedados localmente para garantir estabilidade.
