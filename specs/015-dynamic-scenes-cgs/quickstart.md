# Quickstart: Dynamic Scenes & CGs (015)

## O que foi feito nesta feature

Esta feature adicionou três grandes melhorias ao motor visual do jogo:

1. **Fundo Transparente** — Script automático de IA que removeu o fundo preto de todos os 56 sprites.
2. **Múltiplos Personagens na Tela** — O jogo agora renderiza 2 ou mais personagens simultaneamente.
3. **Trajes Contextuais (Outfits)** — Suporte a versões alternativas de roupa para cada personagem.

---

## Como Adicionar uma Cena NPC-to-NPC

No arquivo `src/mock/storyData.ts`, use o campo `sprites` no nó de diálogo:

```typescript
'minha-cena-npc': {
  id: 'minha-cena-npc',
  speaker: 'Narrador',
  expression: 'none',
  characterName: 'Narrador',
  sprites: [
    { name: 'Harry',   expression: 'sorrindo',   position: 'esquerda' },
    { name: 'Lysandre', expression: 'neutro', position: 'direita' }
  ],
  backgroundUrl: 'patio',
  text: 'Harry e Lysandre conversam sobre música perto do mural.',
  next: 'proxima-cena'
}
```

> **Backward Compatible**: Nós sem `sprites` continuam funcionando normalmente com o campo `characterName`.

---

## Como Adicionar um Outfit

1. Crie a imagem e salve em: `public/images/sprites/{personagem}_{outfit}.png`
   - Exemplo: `castiel_gym.png`, `nathaniel_gym_bravo.png`
2. No `storyData.ts`, adicione `outfit: 'gym'` no sprite desejado:
```typescript
sprites: [
  { name: 'Castiel', expression: 'bravo', position: 'direita', outfit: 'gym' }
]
```
3. Se a imagem não existir, o sistema usa o sprite padrão automaticamente (graceful fallback).

---

## Como Re-executar a Limpeza de Fundo

Se você adicionar novos sprites com fundo preto:

```bash
node scripts/remove-bgs.js
```

O script detecta todos os `.png` na pasta `public/images/sprites/` e processa com IA.

---

## Posições Disponíveis

| Valor | Posição na tela |
|---|---|
| `esquerda` | Canto esquerdo (2% da borda) |
| `centro` | Centro (com offset horizontal) |
| `direita` | Canto direito (2% da borda) |

---

## Expressões Disponíveis

| Alias | Animação |
|---|---|
| `neutro`, `neutral`, `none` | Estático |
| `sorrindo`, `happy`, `smiling`, `blushing` | Leve salto vertical |
| `bravo`, `angry` | Tremor horizontal |
| `provocando`, `sly`, `smirk` | Rotação suave |
| `triste`, `sad`, `timido` | Levemente abaixado |
