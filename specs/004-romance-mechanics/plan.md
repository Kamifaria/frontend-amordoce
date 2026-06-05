# Plano de Implementação: Mecânicas de Romance e Expansão da Jogabilidade

**Branch**: `004-romance-mechanics` | **Data**: 2026-06-05 | **Especificação**: [spec.md](file:///c:/Users/Kamila%20Faria/Desktop/Amor%20doce%20da%20veronica/frontend-amordoce/specs/004-romance-mechanics/spec.md)

**Entrada**: Especificação da feature localizada em `specs/004-romance-mechanics/spec.md`

## Resumo
Expandir a jogabilidade principal de romance visual novel para incluir mecânicas de romance escolar. Isso inclui:
1. **Medidor Love-o-Meter**: Interface que exibe os níveis de afinidade com os garotos e garotas de Sweet Amoris.
2. **Smartphone In-Game**: Novo painel HUD permitindo fazer ligações aos contatos desbloqueados e acessar o guia "LoveTips".
3. **Chamadas Recebidas**: Lógica para tocar o telefone in-game e disparar convites de encontros após ultrapassar limites de afinidade.
Isso é atingido integrando chamadas assíncronas no Zustand, criando controllers/endpoints no NestJS e projetando interfaces reativas.

## Contexto Técnico

- **Tecnologias**: Next.js 16.2.7 (React 19), TypeScript 5, NestJS 11 (Node 22), PostgreSQL
- **Dependências Principais**: Framer Motion, Zustand, Lucide React, TypeORM
- **Armazenamento**: PostgreSQL (afinidades, registros de ligações e dicas)
- **Testes**: Jest para backend, React Testing Library para componentes do front-end
- **Plataforma Alvo**: Web Desktop & Mobile (Design Responsivo)
- **Tipo de Projeto**: Web App Monorepo (`frontend-amordoce` e `backend-amordoce`)
- **Metas de Desempenho**: Animações de transição suaves a 60 FPS, tempo de resposta UI <100ms
- **Restrições**: Manter proporção estável de tela de jogo (aspect-video 16:9)

## Verificação da Constituição

- **Isolamento de Componentes**: Os novos componentes `PhoneOverlay` e `LoveOMeter` são autocontidos e atualizam estados diretamente no Zustand.
- **UI Responsiva e Premium**: Transições e popups animados usando Framer Motion para sensação fluida de jogo.
- **Segurança de Tipos Estrita**: Sem uso de tipo `any`. Interfaces TypeScript bem definidas em `src/shared/types.ts`.
- **Gerenciamento de Estado Centralizado**: Toda a lógica de chamadas e afinidades centralizada em `useGameStore.ts`.

## Estrutura do Projeto

### Documentação (esta feature)

```text
specs/004-romance-mechanics/
├── plan.md              # Este arquivo
├── research.md          # Resultados de pesquisa (Fase 0)
├── data-model.md        # Modelagem de dados (Fase 1)
├── quickstart.md        # Guia de inicialização rápida (Fase 1)
└── contracts/
    └── api.md           # Contrato da API (Fase 1)
```

### Código Fonte

Modificações e novos arquivos em ambos os projetos:

#### Frontend (`frontend-amordoce`)
- [NEW] `src/components/game/PhoneOverlay.tsx`: Aplicativo e tela de smartphone.
- [NEW] `src/components/game/LoveOMeter.tsx`: Barra visual de afinidade.
- [MODIFY] `src/store/useGameStore.ts`: Estados assíncronos de chamadas e afinidades.
- [MODIFY] `src/app/page.tsx` & `src/components/game/GameScreen.tsx`: Integração com o HUD.

#### Backend (`backend-amordoce`)
- [NEW] `src/player/entities/phone-call-log.entity.ts`: Tabela do banco.
- [NEW] `src/player/phone.controller.ts`: Endpoints da API.
- [NEW] `src/player/phone.service.ts`: Validações de limites e metas de afinidade.

## Alterações Propostas

### [MODIFY] [useGameStore.ts](file:///c:/Users/Kamila%20Faria/Desktop/Amor%20doce%20da%20veronica/frontend-amordoce/src/store/useGameStore.ts)
- Adicionar atributos `isPhoneOpen`, `activeCall`, `unlockedTips`, `isLoading` e `errorMsg`.
- Adicionar funções de avanço assíncrono à API.

### [NEW] [PhoneOverlay.tsx](file:///c:/Users/Kamila%20Faria/Desktop/Amor%20doce%20da%20veronica/frontend-amordoce/src/components/game/PhoneOverlay.tsx)
- Tela deslizante contendo lista de contatos, tela de chamada telefônica e LoveTips.

## Plano de Verificação

### Testes Automatizados
- Executar os linters:
  ```bash
  npm run lint
  ```

### Verificação Manual
- Abrir celular, clicar em ligar para Castiel e verificar a interface de chamada e o diálogo de voz.
- Simular afinidade de 20 pontos nas decisões de diálogo e checar o recebimento automático de ligações de encontros.
