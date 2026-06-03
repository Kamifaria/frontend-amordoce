import { DialogueNode } from '../shared/types';

export const mockStory: Record<string, DialogueNode> = {
  'start': {
    id: 'start',
    speaker: 'Castiel',
    expression: 'neutro',
    characterName: 'Castiel',
    backgroundUrl: 'https://images.unsplash.com/photo-1541829019-2188d558b1c7?w=1200&q=80',
    text: 'Ei, novata. O que você está fazendo aqui no corredor?',
    next: 'choice-node'
  },
  'choice-node': {
    id: 'choice-node',
    speaker: 'Castiel',
    expression: 'sorrindo',
    characterName: 'Castiel',
    backgroundUrl: 'https://images.unsplash.com/photo-1541829019-2188d558b1c7?w=1200&q=80',
    text: 'Precisa de alguma coisa ou está apenas perdida? Tenho mais o que fazer...',
    choices: [
      { text: 'Estou um pouco perdida, na verdade...', nextNodeId: 'lost-path', costPA: 10 },
      { text: 'Não te interessa!', nextNodeId: 'angry-path', costPA: 15 }
    ]
  },
  'lost-path': {
    id: 'lost-path',
    speaker: 'Castiel',
    expression: 'provocando',
    characterName: 'Castiel',
    backgroundUrl: 'https://images.unsplash.com/photo-1541829019-2188d558b1c7?w=1200&q=80',
    text: 'Hmph. Típico. Vem, eu te mostro onde fica a secretaria de Sweet Amoris.',
    next: 'end'
  },
  'angry-path': {
    id: 'angry-path',
    speaker: 'Castiel',
    expression: 'bravo',
    characterName: 'Castiel',
    backgroundUrl: 'https://images.unsplash.com/photo-1541829019-2188d558b1c7?w=1200&q=80',
    text: 'Nossa, que humor irritante. Se vira sozinha então, novata.',
    next: 'end'
  },
  'end': {
    id: 'end',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&q=80',
    text: 'Você segue seu caminho pelos corredores de Sweet Amoris.'
  }
};
