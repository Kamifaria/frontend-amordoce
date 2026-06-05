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
      { 
        text: 'Estou um pouco perdida, na verdade...', 
        nextNodeId: 'lost-path', 
        costPA: 10,
        affinityChange: { characterId: 'castiel', amount: 20 }
      },
      { 
        text: 'Não te interessa!', 
        nextNodeId: 'angry-path', 
        costPA: 15,
        affinityChange: { characterId: 'castiel', amount: -15 }
      }
    ]
  },
  'lost-path': {
    id: 'lost-path',
    speaker: 'Castiel',
    expression: 'provocando',
    characterName: 'Castiel',
    backgroundUrl: 'https://images.unsplash.com/photo-1541829019-2188d558b1c7?w=1200&q=80',
    text: 'Hmph. Típico. Vem, eu te mostro onde fica a secretaria de Sweet Amoris. O representante de turma Nathaniel deve estar por lá.',
    next: 'nathaniel-node'
  },
  'angry-path': {
    id: 'angry-path',
    speaker: 'Castiel',
    expression: 'bravo',
    characterName: 'Castiel',
    backgroundUrl: 'https://images.unsplash.com/photo-1541829019-2188d558b1c7?w=1200&q=80',
    text: 'Nossa, que humor irritante. Se vira sozinha então, novata.',
    next: 'nathaniel-node'
  },
  'nathaniel-node': {
    id: 'nathaniel-node',
    speaker: 'Nathaniel',
    expression: 'neutro',
    characterName: 'Nathaniel',
    backgroundUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&q=80',
    text: 'Olá! Você deve ser a nova aluna. Eu sou o Nathaniel, representante dos alunos. Tudo pronto para começar suas aulas?',
    choices: [
      {
        text: 'Sim, obrigada pela recepção calorosa! (Sorrir)',
        nextNodeId: 'nathaniel-nice',
        costPA: 10,
        affinityChange: { characterId: 'nathaniel', amount: 25 }
      },
      {
        text: 'Tanto faz, só me dê minha ficha de inscrição.',
        nextNodeId: 'nathaniel-rude',
        costPA: 10,
        affinityChange: { characterId: 'nathaniel', amount: -10 }
      }
    ]
  },
  'nathaniel-nice': {
    id: 'nathaniel-nice',
    speaker: 'Nathaniel',
    expression: 'sorrindo',
    characterName: 'Nathaniel',
    backgroundUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&q=80',
    text: 'Não há de quê! É meu dever garantir que todos se sintam bem-vindos em Sweet Amoris.',
    next: 'lysandre-node'
  },
  'nathaniel-rude': {
    id: 'nathaniel-rude',
    speaker: 'Nathaniel',
    expression: 'triste',
    characterName: 'Nathaniel',
    backgroundUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&q=80',
    text: 'Oh... Certo. Aqui está a sua ficha de inscrição. Por favor, preencha-a até o final do dia.',
    next: 'lysandre-node'
  },
  'lysandre-node': {
    id: 'lysandre-node',
    speaker: 'Lysandre',
    expression: 'neutro',
    characterName: 'Lysandre',
    backgroundUrl: 'https://images.unsplash.com/photo-1541829019-2188d558b1c7?w=1200&q=80',
    text: 'Com licença... Por acaso você viu um bloco de notas com capa de couro por aí? Eu pareço tê-lo perdido de novo...',
    choices: [
      {
        text: 'Não vi, mas posso te ajudar a procurar se quiser!',
        nextNodeId: 'lysandre-help',
        costPA: 10,
        affinityChange: { characterId: 'lysandre', amount: 20 }
      },
      {
        text: 'Não vi nada. Procure melhor.',
        nextNodeId: 'lysandre-nohelp',
        costPA: 5,
        affinityChange: { characterId: 'lysandre', amount: -10 }
      }
    ]
  },
  'lysandre-help': {
    id: 'lysandre-help',
    speaker: 'Lysandre',
    expression: 'sorrindo',
    characterName: 'Lysandre',
    backgroundUrl: 'https://images.unsplash.com/photo-1541829019-2188d558b1c7?w=1200&q=80',
    text: 'Isso seria de grande ajuda, obrigado. Suas palavras são muito gentis.',
    next: 'remi-start'
  },
  'lysandre-nohelp': {
    id: 'lysandre-nohelp',
    speaker: 'Lysandre',
    expression: 'triste',
    characterName: 'Lysandre',
    backgroundUrl: 'https://images.unsplash.com/photo-1541829019-2188d558b1c7?w=1200&q=80',
    text: 'Entendo... De qualquer forma, desculpe pelo incômodo.',
    next: 'remi-start'
  },
  'remi-start': {
    id: 'remi-start',
    speaker: 'Remi',
    expression: 'sorriso_ladino',
    characterName: 'Remi',
    backgroundUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&q=80',
    text: 'Bonjour, chérie. Vejo que está explorando nossos corredores. O que procura? Quem sabe as cartas tenham a resposta...',
    choices: [
      {
        text: 'Desculpe incomodar, Remi... Só vim entregar essa autorização. (Doce/Tímida)',
        nextNodeId: 'remi-nice',
        costPA: 10,
        affinityChange: { characterId: 'remi', amount: 15 }
      },
      {
        text: 'Jogando tarô em horário de aula, Vice-Presidente? Que rebelde... (Ousada/Irônica)',
        nextNodeId: 'remi-bold',
        costPA: 10,
        affinityChange: { characterId: 'remi', amount: 25 }
      },
      {
        text: 'Não me olhe assim. Só assine logo isso aqui. (Defensiva/Grossa)',
        nextNodeId: 'remi-rude',
        costPA: 10,
        affinityChange: { characterId: 'remi', amount: -15 }
      }
    ]
  },
  'remi-nice': {
    id: 'remi-nice',
    speaker: 'Remi',
    expression: 'sorrindo',
    characterName: 'Remi',
    backgroundUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&q=80',
    text: 'Ah, merci. Muito educada. Assinarei de bom grado para você, chérie.',
    next: 'harry-start'
  },
  'remi-bold': {
    id: 'remi-bold',
    speaker: 'Remi',
    expression: 'provocando',
    characterName: 'Remi',
    backgroundUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&q=80',
    text: 'Haha, touché! Gosto de pessoas perspicazes. As cartas dizem que nos daremos muito bem, chérie.',
    next: 'harry-start'
  },
  'remi-rude': {
    id: 'remi-rude',
    speaker: 'Remi',
    expression: 'neutro',
    characterName: 'Remi',
    backgroundUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&q=80',
    text: 'Pas de chance... Quanta pressa. Aqui está seu papel. Passe bem.',
    next: 'harry-start'
  },
  'harry-start': {
    id: 'harry-start',
    speaker: 'Harry',
    expression: 'provocando',
    characterName: 'Harry',
    backgroundUrl: 'https://images.unsplash.com/photo-1541829019-2188d558b1c7?w=1200&q=80',
    text: 'E aí, novata. Curtiu o som da minha guitarra ou vai dizer que vim atrapalhar seu passeio?',
    choices: [
      {
        text: 'Você toca muito bem... É uma música linda. (Doce/Tímida)',
        nextNodeId: 'harry-nice',
        costPA: 10,
        affinityChange: { characterId: 'harry', amount: 15 }
      },
      {
        text: 'Barulho maneiro, mas acho que consigo solar melhor que você. (Ousada/Irônica)',
        nextNodeId: 'harry-bold',
        costPA: 10,
        affinityChange: { characterId: 'harry', amount: 25 }
      },
      {
        text: 'Dá pra diminuir o barulho? Tá dando dor de cabeça. (Defensiva/Grossa)',
        nextNodeId: 'harry-rude',
        costPA: 10,
        affinityChange: { characterId: 'harry', amount: -15 }
      }
    ]
  },
  'harry-nice': {
    id: 'harry-nice',
    speaker: 'Harry',
    expression: 'neutro',
    characterName: 'Harry',
    backgroundUrl: 'https://images.unsplash.com/photo-1541829019-2188d558b1c7?w=1200&q=80',
    text: 'Valeu. Fico feliz que alguém por aqui tenha bom gosto musical.',
    next: 'maggie-start'
  },
  'harry-bold': {
    id: 'harry-bold',
    speaker: 'Harry',
    expression: 'sorrindo',
    characterName: 'Harry',
    backgroundUrl: 'https://images.unsplash.com/photo-1541829019-2188d558b1c7?w=1200&q=80',
    text: 'Ah é? Desafio aceito! Quero só ver você tentar me superar no próximo ensaio.',
    next: 'maggie-start'
  },
  'harry-rude': {
    id: 'harry-rude',
    speaker: 'Harry',
    expression: 'bravo',
    characterName: 'Harry',
    backgroundUrl: 'https://images.unsplash.com/photo-1541829019-2188d558b1c7?w=1200&q=80',
    text: 'Tsc... Que sem graça. Vai achar outra pessoa para estragar o dia.',
    next: 'maggie-start'
  },
  'maggie-start': {
    id: 'maggie-start',
    speaker: 'Maggie',
    expression: 'sorrindo',
    characterName: 'Maggie',
    backgroundUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&q=80',
    text: 'Oiii! Sou a Maggie do clube de artes! Você quer me ajudar a pintar esse painel gigante super caótico?!',
    choices: [
      {
        text: 'Nossa, que ateliê colorido! Posso desenhar com você? (Doce/Tímida)',
        nextNodeId: 'maggie-nice',
        costPA: 10,
        affinityChange: { characterId: 'maggie', amount: 20 }
      },
      {
        text: 'Seu cabelo combina perfeitamente com a tinta espalhada na parede! (Ousada/Irônica)',
        nextNodeId: 'maggie-bold',
        costPA: 10,
        affinityChange: { characterId: 'maggie', amount: 15 }
      },
      {
        text: 'Que bagunça. Como você consegue trabalhar aqui? (Defensiva/Grossa)',
        nextNodeId: 'maggie-rude',
        costPA: 10,
        affinityChange: { characterId: 'maggie', amount: -10 }
      }
    ]
  },
  'maggie-nice': {
    id: 'maggie-nice',
    speaker: 'Maggie',
    expression: 'sorrindo',
    characterName: 'Maggie',
    backgroundUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&q=80',
    text: 'SIIIM! Pegue o pincel e vamos fazer mágica!',
    next: 'end'
  },
  'maggie-bold': {
    id: 'maggie-bold',
    speaker: 'Maggie',
    expression: 'sorrindo',
    characterName: 'Maggie',
    backgroundUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&q=80',
    text: 'Hahaha! É pura arte abstrata viva! Adorei você!',
    next: 'end'
  },
  'maggie-rude': {
    id: 'maggie-rude',
    speaker: 'Maggie',
    expression: 'triste',
    characterName: 'Maggie',
    backgroundUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&q=80',
    text: 'Ah... É um caos organizado, faz parte da criatividade...',
    next: 'end'
  },
  'end': {
    id: 'end',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&q=80',
    text: 'Você conclui seu primeiro dia conhecendo os garotos e as garotas de Sweet Amoris. Experimente abrir o seu telefone celular clicando no ícone do smartphone para interagir mais com eles e conferir as suas dicas de conquista!'
  }
};

