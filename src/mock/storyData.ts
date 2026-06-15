import { DialogueNode } from '../shared/types';

export const mockStory: Record<string, DialogueNode> = {
  'start': {
    id: 'start',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'corredor',
    text: 'Seu primeiro dia em Sweet Amoris começou agitado. Logo ao cruzar o corredor principal, você se depara com Nathaniel e Castiel discutindo acaloradamente perto dos armários.',
    next: 'confronto-start'
  },

  // --- CENA 1: O CONFRONTO (NATHANIEL VS CASTIEL) ---
  'confronto-start': {
    id: 'confronto-start',
    speaker: 'Nathaniel',
    expression: 'bravo',
    characterName: 'Nathaniel',
    backgroundUrl: 'corredor',
    cgUrl: '/images/cgs/fight.png',
    text: 'Castiel, eu já disse! Como representante dos alunos, eu exijo que você assine esta ficha de ausência ou terei que reportar à Diretora!',
    next: 'confronto-castiel-reply'
  },
  'confronto-castiel-reply': {
    id: 'confronto-castiel-reply',
    speaker: 'Castiel',
    expression: 'provocando',
    characterName: 'Castiel',
    backgroundUrl: 'corredor',
    text: 'Reporte para quem você quiser, Nathaniel. Faça um bom proveito do seu papel de cão de guarda da escola.',
    next: 'confronto-veronica-intervenes'
  },
  'confronto-veronica-intervenes': {
    id: 'confronto-veronica-intervenes',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'corredor',
    text: 'Os dois parecem prestes a brigar fisicamente. O que você decide dizer?',
    choices: [
      {
        text: '"Isso realmente importa tanto assim? Talvez assinar logo poupe o tempo de todo mundo."',
        nextNodeId: 'confronto-nathaniel-path',
        costPA: 10,
        affinityChanges: [
          { characterId: 'nathaniel', amount: 15 },
          { characterId: 'castiel', amount: -10 }
        ]
      },
      {
        text: '"Algumas regras parecem apenas burocracia desnecessária, não acham?"',
        nextNodeId: 'confronto-castiel-path',
        costPA: 10,
        affinityChanges: [
          { characterId: 'castiel', amount: 15 },
          { characterId: 'nathaniel', amount: -10 }
        ]
      },
      {
        text: '"Se vocês continuarem gritando aqui, a Diretora vai ouvir sem precisar de relatórios."',
        nextNodeId: 'confronto-pacify-path',
        costPA: 10
      }
    ]
  },

  'confronto-nathaniel-path': {
    id: 'confronto-nathaniel-path',
    speaker: 'Nathaniel',
    expression: 'sorrindo',
    characterName: 'Nathaniel',
    backgroundUrl: 'corredor',
    text: 'Obrigado... Hã, Veronica, certo? Fico feliz que alguém aqui tenha bom senso.',
    next: 'confronto-nathaniel-extra'
  },
  'confronto-nathaniel-extra': {
    id: 'confronto-nathaniel-extra',
    speaker: 'Castiel',
    expression: 'bravo',
    characterName: 'Castiel',
    backgroundUrl: 'corredor',
    text: 'Tsc. Olha só, Nathaniel arrumou uma defensora. Não se meta onde não é chamada, novata.',
    next: 'remi-start'
  },

  'confronto-castiel-path': {
    id: 'confronto-castiel-path',
    speaker: 'Castiel',
    expression: 'sorrindo',
    characterName: 'Castiel',
    backgroundUrl: 'corredor',
    text: 'Haha! Viu só, representante? Até a novata sabe que você é um pé no saco. Valeu pela força, Veronica.',
    next: 'confronto-castiel-extra'
  },
  'confronto-castiel-extra': {
    id: 'confronto-castiel-extra',
    speaker: 'Nathaniel',
    expression: 'triste',
    characterName: 'Nathaniel',
    backgroundUrl: 'corredor',
    text: 'Eu... Eu só estava tentando fazer o meu trabalho. Isso não foi muito legal da sua parte, Veronica.',
    next: 'remi-start'
  },

  'confronto-pacify-path': {
    id: 'confronto-pacify-path',
    speaker: 'Castiel',
    expression: 'neutro',
    characterName: 'Castiel',
    backgroundUrl: 'corredor',
    text: 'Hmph. Tanto faz. Só não vou assinar nada hoje.',
    next: 'confronto-pacify-extra'
  },
  'confronto-pacify-extra': {
    id: 'confronto-pacify-extra',
    speaker: 'Nathaniel',
    expression: 'triste',
    characterName: 'Nathaniel',
    backgroundUrl: 'corredor',
    text: 'Me desculpe por essa cena no seu primeiro dia, Veronica. Eu tentarei resolver isso em outro momento.',
    next: 'remi-start'
  },

  // --- CENA 2: O MISTÉRIO DO TARÔ (REMI) ---
  'remi-start': {
    id: 'remi-start',
    speaker: 'Remi',
    expression: 'neutro',
    characterName: 'Remi',
    backgroundUrl: 'sala_de_aula',
    text: 'Bonjour, chérie. Eu vi o pequeno alvoroço no corredor... Mas esqueça aqueles rapazes barulhentos. Gostaria de saber o que o destino reserva para o seu primeiro dia? As cartas de tarô nunca mentem.',
    choices: [
      {
        text: 'Eu adoraria uma leitura de cartas, Remi.',
        nextNodeId: 'remi-tarot-lovers',
        costPA: 10,
        affinityChange: { characterId: 'remi', amount: 15 }
      },
      {
        text: 'Desde que a carta revele que teremos um futuro juntos...',
        nextNodeId: 'remi-tarot-devil',
        costPA: 10,
        affinityChange: { characterId: 'remi', amount: 20 }
      },
      {
        text: 'Não acredito em superstições. Tenho mais o que fazer.',
        nextNodeId: 'remi-tarot-tower',
        costPA: 10,
        affinityChange: { characterId: 'remi', amount: -15 }
      }
    ]
  },
  'remi-tarot-lovers': {
    id: 'remi-tarot-lovers',
    speaker: 'Remi',
    expression: 'sorrindo',
    characterName: 'Remi',
    backgroundUrl: 'sala_de_aula',
    text: 'Magnifique. A carta dos Namorados se revelou para nós... Ela sugere uma conexão profunda prestes a florescer sob a luz da escola. O destino é sábio, chérie.',
    next: 'remi-end'
  },
  'remi-tarot-devil': {
    id: 'remi-tarot-devil',
    speaker: 'Remi',
    expression: 'provocando',
    characterName: 'Remi',
    backgroundUrl: 'sala_de_aula',
    text: 'Ah, que ousadia deliciosa! A carta do Diabo se manifestou. Ela fala de tentação, magnetismo e desejos ocultos... Parece que você gosta de brincar com o perigo, mon ange.',
    next: 'remi-end'
  },
  'remi-tarot-tower': {
    id: 'remi-tarot-tower',
    speaker: 'Remi',
    expression: 'neutro',
    characterName: 'Remi',
    backgroundUrl: 'sala_de_aula',
    text: 'A Torre. Ruína para quem ignora os mistérios do invisível. Que pena, chérie... A ignorância é um caminho muito cinza.',
    next: 'remi-end'
  },
  'remi-end': {
    id: 'remi-end',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'sala_de_aula',
    text: 'Remi sorri enigmaticamente e recolhe suas cartas com sotaque francês cativante. Você se despede e caminha em direção ao pátio.',
    next: 'harry-start'
  },

  // --- CENA 3: O DESAFIO DE GUITARRA (HARRY) ---
  'harry-start': {
    id: 'harry-start',
    speaker: 'Harry',
    expression: 'smile',
    characterName: 'Harry',
    backgroundUrl: 'patio',
    text: 'E aí, novata. Curte um som? Quer aprender a tocar uns acordes?',
    choices: [
      {
        text: 'Sim! Me ensina? (Jogar Minigame de Guitarra)',
        costPA: 10,
        minigame: 'guitar'
      },
      {
        text: 'Não, obrigada. Estou com pressa.',
        nextNodeId: 'harry-guitar-rude',
        costPA: 0,
        affinityChange: { characterId: 'harry', amount: -15 }
      }
    ]
  },
  'harry-guitar-nice': {
    id: 'harry-guitar-nice',
    speaker: 'Harry',
    expression: 'neutro',
    characterName: 'Harry',
    backgroundUrl: 'patio',
    text: 'Heh, valeu. A maioria das pessoas só reclama da altura. É bom ver que você tem ouvidos atentos.',
    next: 'harry-end'
  },
  'harry-guitar-bold': {
    id: 'harry-guitar-bold',
    speaker: 'Harry',
    expression: 'sorrindo',
    characterName: 'Harry',
    backgroundUrl: 'patio',
    text: 'Ah é? Desafio aceito! Quero ver você tentar me encarar em um duelo no clube de música. Não vá amarelar depois, Veronica.',
    next: 'harry-end'
  },
  'harry-guitar-rude': {
    id: 'harry-guitar-rude',
    speaker: 'Harry',
    expression: 'bravo',
    characterName: 'Harry',
    backgroundUrl: 'patio',
    text: 'Tsc. Outra reclamona na escola. Vá ler seus livros em paz então.',
    next: 'harry-end'
  },
  'harry-end': {
    id: 'harry-end',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'patio',
    text: 'Harry guarda a palheta com um sorriso de lado. "Se você curte pinturas e desenhos, a Kami é a melhor do colégio. Dá um pulo na Sala de Artes depois."',
    next: 'kami-art-start'
  },

  // --- CENA 4: CLUBE DE ARTES (KAMI) ---
  'kami-art-start': {
    id: 'kami-art-start',
    speaker: 'Kami',
    expression: 'neutro',
    characterName: 'Kami',
    backgroundUrl: 'artroom',
    cgUrl: '/images/cgs/cg_kami_apron.png',
    text: 'A sala tem cheiro de tinta a óleo fresca. Kami está em frente a uma tela gigante, vestindo um avental sujo de tinta. "Você tem o olhar de uma artista... Fique à vontade para desenhar o que quiser naquele cavalete em branco. Eu adoro colecionar a arte dos outros."',
    choices: [
      {
        text: 'Desenhar no Cavalete Livre (Jogo de Pintura Livre)',
        nextNodeId: 'kami-paint-success',
        minigame: 'painting',
        costPA: 10,
      },
      {
        text: 'Suas misturas parecem... um pouco agressivas. Tem certeza disso?',
        nextNodeId: 'kami-art-bold',
        costPA: 10,
        affinityChange: { characterId: 'kami', amount: 20 }
      },
      {
        text: 'Não quero me sujar de tinta, obrigada.',
        nextNodeId: 'kami-art-rude',
        costPA: 0,
        affinityChange: { characterId: 'kami', amount: -15 }
      }
    ]
  },
  'kami-paint-success': {
    id: 'kami-paint-success',
    speaker: 'Kami',
    expression: 'sorrindo',
    characterName: 'Kami',
    backgroundUrl: 'artroom',
    text: 'Ela olha para a sua pintura recém terminada e esboça um leve sorriso. "Isso... tem muita personalidade. Vou adicionar à minha coleção de momentos guardados. Obrigada, Veronica."',
    next: 'kami-art-end'
  },
  'kami-paint-fail': {
    id: 'kami-paint-fail',
    speaker: 'Kami',
    expression: 'triste',
    characterName: 'Kami',
    backgroundUrl: 'artroom',
    text: 'Kami suspira e olha para a mancha marrom na paleta. "Acho que vou ter que recomeçar essa parte. Deixa para lá."',
    next: 'kami-art-end'
  },
  'kami-art-bold': {
    id: 'kami-art-bold',
    speaker: 'Kami',
    expression: 'smile',
    characterName: 'Kami',
    backgroundUrl: 'artroom',
    text: 'Ela dá um sorriso de canto. "Agressivas? Eu chamo de expressivas. Tem medo de intensidade, novata?"',
    next: 'kami-art-end'
  },
  'kami-art-rude': {
    id: 'kami-art-rude',
    speaker: 'Kami',
    expression: 'neutro',
    characterName: 'Kami',
    backgroundUrl: 'artroom',
    text: 'Ela volta a encarar a tela. "Tudo bem. A arte exige sacrifícios que nem todos estão dispostos a fazer."',
    next: 'kami-art-end'
  },
  'kami-art-end': {
    id: 'kami-art-end',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'sala_de_artes',
    text: 'Após pintar com a Kami, as aulas finalmente chegam ao fim. O sinal toca anunciando o fim do dia escolar. No corredor, você encontra Lysandre procurando algo desesperadamente.',
    next: 'lysandre-lost-notebook'
  },

  // --- CENA 5: MISSÃO DO CADERNO DO LYSANDRE ---
  'lysandre-lost-notebook': {
    id: 'lysandre-lost-notebook',
    speaker: 'Lysandre',
    expression: 'triste',
    characterName: 'Lysandre',
    backgroundUrl: 'corredor',
    text: 'Ah, com licença... Eu realmente não consigo encontrar meu bloco de notas de couro. Tenho certeza de que o perdi em algum lugar hoje... Você poderia me ajudar?',
    choices: [
      {
        text: 'Não se preocupe, eu vou te ajudar a procurar agora mesmo!',
        nextNodeId: 'quest-choose-location',
        costPA: 10,
        affinityChange: { characterId: 'lysandre', amount: 15 }
      },
      {
        text: 'De novo, Lysandre? Você precisa de um chaveiro ou GPS para as suas coisas...',
        nextNodeId: 'quest-choose-location',
        costPA: 10,
        affinityChange: { characterId: 'lysandre', amount: 20 }
      },
      {
        text: 'Desculpe, mas eu tenho que ir para casa agora. Boa sorte.',
        nextNodeId: 'quest-decline',
        costPA: 5,
        affinityChange: { characterId: 'lysandre', amount: -15 }
      }
    ]
  },
  'quest-decline': {
    id: 'quest-decline',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'patio',
    text: 'Você decide ir embora. Ao chegar no seu quarto, deita-se cansada do primeiro dia e decide checar o celular.',
    next: 'quest-home-end'
  },
  'quest-choose-location': {
    id: 'quest-choose-location',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'corredor',
    text: 'Onde você deseja procurar pelo bloco de notas do Lysandre primeiro?',
    choices: [
      { text: 'Procurar na Sala de Aula', nextNodeId: 'search-classroom', costPA: 10 },
      { text: 'Procurar no Pátio das Cerejeiras', nextNodeId: 'search-courtyard', costPA: 10 },
      { text: 'Procurar na Sala de Artes da Kami', nextNodeId: 'search-art-room', costPA: 10 },
      { text: 'Procurar na Biblioteca com Remi', nextNodeId: 'search-library', costPA: 10 }
    ]
  },
  'search-classroom': {
    id: 'search-classroom',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'sala_de_aula',
    text: 'A sala de aula está silenciosa, banhada pela luz do sol da tarde. Nathaniel está organizando alguns papéis na mesa do professor.',
    next: 'nathaniel-classroom-meet'
  },
  'nathaniel-classroom-meet': {
    id: 'nathaniel-classroom-meet',
    speaker: 'Nathaniel',
    expression: 'neutro',
    characterName: 'Nathaniel',
    backgroundUrl: 'sala_de_aula',
    text: 'Ah, olá, Veronica! Procurando alguma coisa na sala a essa hora?',
    choices: [
      {
        text: 'Sim, o Lysandre perdeu o bloco de notas dele. Viu algo?',
        nextNodeId: 'nathaniel-classroom-help',
        costPA: 10,
        affinityChange: { characterId: 'nathaniel', amount: 15 }
      },
      {
        text: 'Estou investigando um mistério... Quer ser meu cúmplice?',
        nextNodeId: 'nathaniel-classroom-tease',
        costPA: 10,
        affinityChange: { characterId: 'nathaniel', amount: 20 }
      }
    ]
  },
  'nathaniel-classroom-help': {
    id: 'nathaniel-classroom-help',
    speaker: 'Nathaniel',
    expression: 'neutro',
    characterName: 'Nathaniel',
    backgroundUrl: 'sala_de_aula',
    text: 'Hm, um bloco de notas de couro? Não vi nada parecido pelas mesas. Mas se eu encontrar, te aviso.',
    next: 'quest-choose-location-2'
  },
  'nathaniel-classroom-tease': {
    id: 'nathaniel-classroom-tease',
    speaker: 'Nathaniel',
    expression: 'sorrindo',
    characterName: 'Nathaniel',
    backgroundUrl: 'sala_de_aula',
    text: 'Haha, cúmplice? Depende da travessura! Se for o caderno do Lysandre, infelizmente não o vi por aqui. Ele costuma ir à sala de artes mais cedo.',
    next: 'quest-choose-location-2'
  },
  'search-library': {
    id: 'search-library',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'sala_de_aula',
    text: 'Você entra na biblioteca silenciosa. A luz dourada da tarde brilha nas estantes de livros. Remi está sentado em uma mesa no canto, cercado por suas cartas de tarô.',
    next: 'remi-library-meet'
  },
  'remi-library-meet': {
    id: 'remi-library-meet',
    speaker: 'Remi',
    expression: 'neutro',
    characterName: 'Remi',
    backgroundUrl: 'sala_de_aula',
    text: 'Bonjour, chérie. O destino sussurrou que você viria me encontrar entre os livros. Ou está apenas procurando um lugar tranquilo para nós dois?',
    choices: [
      {
        text: 'Estou procurando o caderno de couro do Lysandre. Viu por aí?',
        nextNodeId: 'remi-library-help',
        costPA: 10,
        affinityChange: { characterId: 'remi', amount: 15 }
      },
      {
        text: 'Vim ver se suas cartas conseguem adivinhar o que eu perdi.',
        nextNodeId: 'remi-library-tease',
        costPA: 10,
        affinityChange: { characterId: 'remi', amount: 20 }
      }
    ]
  },
  'remi-library-help': {
    id: 'remi-library-help',
    speaker: 'Remi',
    expression: 'triste',
    characterName: 'Remi',
    backgroundUrl: 'sala_de_aula',
    text: 'Ah, o caderno de composições do Lysandre? Ele perde até a própria cabeça se não estiver colada ao pescoço. Não vi nada aqui... Que tal olhar na sala de artes com a Kami? A mente criativa dela atrai essas coisas.',
    next: 'quest-choose-location-library-done'
  },
  'remi-library-tease': {
    id: 'remi-library-tease',
    speaker: 'Remi',
    expression: 'provocando',
    characterName: 'Remi',
    backgroundUrl: 'sala_de_aula',
    text: 'Ah, chérie... Adoro o seu senso de desafio. A carta dos Namorados diz que seu caminho leva à Sala de Artes. Eu vi o Lysandre com a Kami mais cedo, dê uma olhada lá.',
    next: 'quest-choose-location-library-done'
  },
  'quest-choose-location-library-done': {
    id: 'quest-choose-location-library-done',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'corredor',
    text: 'Remi não estava com o caderno, mas indicou a sala de artes. Onde ir agora?',
    choices: [
      { text: 'Procurar na Sala de Aula', nextNodeId: 'search-classroom', costPA: 10 },
      { text: 'Procurar no Pátio das Cerejeiras', nextNodeId: 'search-courtyard', costPA: 10 },
      { text: 'Procurar na Sala de Artes da Kami', nextNodeId: 'search-art-room', costPA: 10 }
    ]
  },
  'quest-choose-location-2': {
    id: 'quest-choose-location-2',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'corredor',
    text: 'A sala de aula não tinha pistas. Onde procurar agora?',
    choices: [
      { text: 'Procurar no Pátio das Cerejeiras', nextNodeId: 'search-courtyard', costPA: 10 },
      { text: 'Procurar na Sala de Artes da Kami', nextNodeId: 'search-art-room', costPA: 10 },
      { text: 'Procurar na Biblioteca com Remi', nextNodeId: 'search-library', costPA: 10 }
    ]
  },
  'search-courtyard': {
    id: 'search-courtyard',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'patio',
    text: 'As pétalas de cerejeira caem no gramado. Você vê Castiel sob a árvore de fones de ouvido, e mais adiante, uma garota de cabelos escuros e mechas brancas (Kami) lendo concentrada.',
    choices: [
      { text: 'Aproximar-se de Castiel', nextNodeId: 'castiel-courtyard-meet', costPA: 0 },
      { text: 'Falar com a garota de mechas brancas (Kami)', nextNodeId: 'kami-courtyard-meet', costPA: 0 }
    ]
  },
  'castiel-courtyard-meet': {
    id: 'castiel-courtyard-meet',
    speaker: 'Castiel',
    expression: 'provocando',
    characterName: 'Castiel',
    backgroundUrl: 'patio',
    text: 'Olha só quem resolveu aparecer. Veio me fazer companhia ou está perdida de novo?',
    choices: [
      {
        text: '"Eu estava procurando algo importante... Mas você me parece ocupado demais."',
        nextNodeId: 'castiel-courtyard-notebook',
        costPA: 10,
        affinityChange: { characterId: 'castiel', amount: 8 }
      },
      {
        text: '"Pensei que um rapaz solitário sob a árvore estivesse precisando de distração."',
        nextNodeId: 'castiel-courtyard-tease',
        costPA: 10,
        affinityChange: { characterId: 'castiel', amount: 10 }
      }
    ]
  },
  'kami-courtyard-meet': {
    id: 'kami-courtyard-meet',
    speaker: 'Kami',
    expression: 'neutral',
    characterName: 'Kami',
    backgroundUrl: 'patio',
    text: 'Hm? Precisa de alguma coisa ou só está encarando meu cabelo?',
    choices: [
      {
        text: '"Achei o visual das mechas incrível, combina com esse pátio."',
        nextNodeId: 'kami-courtyard-nice',
        costPA: 10,
        affinityChange: { characterId: 'kami', amount: 15 }
      },
      {
        text: '"Só estava me perguntando se o livro é tão interessante quanto parece."',
        nextNodeId: 'kami-courtyard-intrigue',
        costPA: 10,
        affinityChange: { characterId: 'kami', amount: 20 }
      },
      {
        text: '"Desculpe incomodar. Vou procurar o caderno do Lysandre em outro lugar."',
        nextNodeId: 'quest-choose-location-3',
        costPA: 5,
        affinityChange: { characterId: 'kami', amount: -10 }
      }
    ]
  },
  'kami-courtyard-nice': {
    id: 'kami-courtyard-nice',
    speaker: 'Kami',
    expression: 'blushing',
    characterName: 'Kami',
    backgroundUrl: 'patio',
    text: 'Ah... Valeu. Geralmente as pessoas acham meio agressivo, mas que bom que gostou. Sou a Kami, a propósito.',
    next: 'kami-courtyard-notebook-ask'
  },
  'kami-courtyard-intrigue': {
    id: 'kami-courtyard-intrigue',
    speaker: 'Kami',
    expression: 'sly',
    characterName: 'Kami',
    backgroundUrl: 'patio',
    text: 'Geralmente quem pergunta isso quer puxar assunto. Mas sim, é um livro de mistério clássico. Sou a Kami. O que faz no pátio a essa hora?',
    next: 'kami-courtyard-notebook-ask'
  },
  'kami-courtyard-notebook-ask': {
    id: 'kami-courtyard-notebook-ask',
    speaker: 'Kami',
    expression: 'neutral',
    characterName: 'Kami',
    backgroundUrl: 'patio',
    text: 'E então, o que você está procurando por aqui?',
    choices: [
      {
        text: '"O Lysandre perdeu o caderno de couro dele. Sabe de algo?"',
        nextNodeId: 'kami-courtyard-notebook-reply',
        costPA: 10,
        affinityChange: { characterId: 'kami', amount: 10 }
      },
      {
        text: '"Agora que te conheci, acho que já encontrei o que queria."',
        nextNodeId: 'kami-courtyard-flirt-reply',
        costPA: 10,
        affinityChange: { characterId: 'kami', amount: 15 }
      }
    ]
  },
  'kami-courtyard-notebook-reply': {
    id: 'kami-courtyard-notebook-reply',
    speaker: 'Kami',
    expression: 'neutral',
    characterName: 'Kami',
    backgroundUrl: 'patio',
    text: 'Aquele garoto vitoriano esquecido? Não vi caderno nenhum. Se eu fosse você, olhava com a Kami na sala de artes.',
    next: 'quest-choose-location-3'
  },
  'kami-courtyard-flirt-reply': {
    id: 'kami-courtyard-flirt-reply',
    speaker: 'Kami',
    expression: 'sly',
    characterName: 'Kami',
    backgroundUrl: 'patio',
    text: 'Uh... Que direta. Você é bem ousada para uma novata, Veronica. Mas não, não vi o caderno do Lysandre. Vá falar com a Kami na sala de artes.',
    next: 'quest-choose-location-3'
  },
  'castiel-courtyard-notebook': {
    id: 'castiel-courtyard-notebook',
    speaker: 'Castiel',
    expression: 'neutro',
    characterName: 'Castiel',
    backgroundUrl: 'patio',
    text: 'Aquele caderno do Lysandre? Aquele cabeça de vento perde até os próprios sapatos. Não vi nada. Se eu fosse você, olhava na sala de artes.',
    next: 'quest-choose-location-3'
  },
  'castiel-courtyard-tease': {
    id: 'castiel-courtyard-tease',
    speaker: 'Castiel',
    expression: 'sorrindo',
    characterName: 'Castiel',
    backgroundUrl: 'patio',
    text: 'Hah! Fico impressionado com a sua coragem, novata. Mas para sua informação, o Lysandre estava com o caderno dele na sala de artes com a Kami mais cedo.',
    next: 'quest-choose-location-3'
  },
  'quest-choose-location-3': {
    id: 'quest-choose-location-3',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'corredor',
    text: 'Ainda sem sinal do caderno. Qual o próximo destino?',
    choices: [
      { text: 'Procurar na Sala de Aula', nextNodeId: 'search-classroom', costPA: 10 },
      { text: 'Procurar na Sala de Artes da Kami', nextNodeId: 'search-art-room', costPA: 10 },
      { text: 'Procurar na Biblioteca com Remi', nextNodeId: 'search-library', costPA: 10 }
    ]
  },
  'search-art-room': {
    id: 'search-art-room',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'sala_de_artes',
    text: 'A sala de artes tem um cheiro forte de solvente. Kami está limpando seus pincéis calmamente.',
    next: 'maggie-art-meet'
  },
  'maggie-art-meet': {
    id: 'maggie-art-meet',
    speaker: 'Kami',
    expression: 'neutro',
    characterName: 'Kami',
    backgroundUrl: 'artroom',
    text: 'Kami olha para você com a expressão inabalável. "Procurando algo?"',
    choices: [
      {
        text: 'Sabe do caderno do Lysandre?',
        nextNodeId: 'maggie-art-notebook',
        costPA: 10,
        affinityChange: { characterId: 'kami', amount: 15 }
      },
      {
        text: 'Não estava procurando nada, mas te encontrei.',
        nextNodeId: 'maggie-art-tease',
        costPA: 10,
        affinityChange: { characterId: 'kami', amount: 20 }
      }
    ]
  },
  'maggie-art-notebook': {
    id: 'maggie-art-notebook',
    speaker: 'Kami',
    expression: 'smile',
    characterName: 'Kami',
    backgroundUrl: 'artroom',
    text: '"O diário dele? Sim, ele deixou em cima dessa mesa enquanto reclamava da paleta de cores." Ela te entrega o caderno.',
    next: 'find-notebook'
  },
  'maggie-art-tease': {
    id: 'maggie-art-tease',
    speaker: 'Kami',
    expression: 'smile',
    characterName: 'Kami',
    backgroundUrl: 'sala_de_artes',
    text: 'Hahaha! Seria uma boa tela abstrata! Mas falando sério, eu o encontrei no chão e guardei na gaveta para proteger a capa. Pode pegar!',
    next: 'quest-found-notebook'
  },
  'quest-found-notebook': {
    id: 'quest-found-notebook',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'sala_de_artes',
    text: 'Você encontrou o Bloco de Notas do Lysandre! Agora você deve voltar ao corredor principal para entregá-lo.',
    next: 'quest-deliver-notebook'
  },
  'quest-deliver-notebook': {
    id: 'quest-deliver-notebook',
    speaker: 'Lysandre',
    expression: 'triste',
    characterName: 'Lysandre',
    backgroundUrl: 'corredor',
    text: 'Ah, olá... Você conseguiu encontrar alguma pista do meu bloco?',
    choices: [
      {
        text: 'Sim! Encontrei na sala de artes com a Kami. Aqui está!',
        nextNodeId: 'lysandre-happy-end',
        costPA: 10,
        affinityChange: { characterId: 'lysandre', amount: 30 }
      },
      {
        text: 'Achei! Mas só entrego se você ler um dos poemas dele para mim!',
        nextNodeId: 'lysandre-poetic-end',
        costPA: 10,
        affinityChange: { characterId: 'lysandre', amount: 40 }
      }
    ]
  },
  'lysandre-happy-end': {
    id: 'lysandre-happy-end',
    speaker: 'Lysandre',
    expression: 'sorrindo',
    characterName: 'Lysandre',
    backgroundUrl: 'corredor',
    text: 'Oh! Céus, muito obrigado! Você salvou minhas composições e minha sanidade hoje. Sou imensamente grato a você, Veronica.',
    next: 'quest-completed'
  },
  'lysandre-poetic-end': {
    id: 'lysandre-poetic-end',
    speaker: 'Lysandre',
    expression: 'sorrindo',
    characterName: 'Lysandre',
    backgroundUrl: 'corredor',
    text: 'Ah... Ler um poema? Você é mesmo muito insistente... Tudo bem, eu leio. *Sob o véu das cerejeiras, encontrei um olhar que brilha mais que o sol...* Obrigado por salvar minha poesia.',
    next: 'quest-completed'
  },
  'quest-completed': {
    id: 'quest-completed',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'patio',
    text: 'Missão cumprida! O caderno está a salvo. Agora você tem um tempo livre para explorar a escola antes de ir para casa.',
    next: 'free-time-hub'
  },
  'free-time-hub': {
    id: 'free-time-hub',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'corredor',
    text: 'Para onde você quer ir agora?',
    choices: [
      { text: 'Explorar a Biblioteca', nextNodeId: 'explore-library', costPA: 10 },
      { text: 'Ir para o Pátio das Cerejeiras', nextNodeId: 'explore-courtyard', costPA: 10 },
      { text: 'Assistir ao treino na Quadra de Basquete', nextNodeId: 'explore-basketball', costPA: 10 },
      { text: 'Ir para casa (Finalizar o dia)', nextNodeId: 'quest-home-end', costPA: 0 }
    ]
  },
  'explore-library': {
    id: 'explore-library',
    speaker: 'Nathaniel',
    expression: 'sorrindo',
    characterName: 'Nathaniel',
    backgroundUrl: 'bg_library',
    text: 'A biblioteca está magnífica com a luz da tarde. Nathaniel está arrumando alguns livros. "Veronica! Está procurando algo para ler? A escola é linda, não é?"',
    choices: [
      { text: '"Sim, você pode me mostrar mais da escola?"', nextNodeId: 'explore-library-tour', costPA: 5, affinityChanges: [{characterId: 'nathaniel', amount: 15}] },
      { text: 'Apenas conversar e voltar', nextNodeId: 'free-time-hub', costPA: 0 }
    ]
  },
  'explore-library-tour': {
    id: 'explore-library-tour',
    speaker: 'Nathaniel',
    expression: 'sorrindo',
    characterName: 'Nathaniel',
    backgroundUrl: 'bg_library',
    text: '"Com prazer! Vou adorar te apresentar tudo." Vocês passam um tempo conversando sobre livros.',
    next: 'free-time-hub'
  },
  'explore-courtyard': {
    id: 'explore-courtyard',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'bg_courtyard',
    text: 'O pátio das cerejeiras está florido... Mas espere. Aquele é o Lysandre? Ele está entregando uma carta para a Kami?!',
    choices: [
      { text: 'Espiar a declaração...', nextNodeId: 'lysandre-kami-drama', costPA: 5 }
    ]
  },
  'lysandre-kami-drama': {
    id: 'lysandre-kami-drama',
    speaker: 'Lysandre',
    expression: 'neutro',
    characterName: 'Lysandre',
    backgroundUrl: 'bg_courtyard',
    cgUrl: '/images/cgs/cg_lysandre_kami.png',
    text: '"Kami... Eu escrevi isso pensando em você." Ele estende a carta. Kami desvia o olhar, suspirando. "Lysandre. Eu já disse. Não procure em mim uma musa."',
    next: 'lysandre-kami-drama-2'
  },
  'lysandre-kami-drama-2': {
    id: 'lysandre-kami-drama-2',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'bg_courtyard',
    text: 'A tensão no ar é palpável. O que você vai fazer?',
    choices: [
      { text: 'Aparecer e tentar ajudar o Lysandre a conquistá-la', nextNodeId: 'help-lysandre', costPA: 10, affinityChanges: [{characterId: 'lysandre', amount: 20}] },
      { text: 'Não se envolver e ir embora', nextNodeId: 'free-time-hub', costPA: 0 }
    ]
  },
  'help-lysandre': {
    id: 'help-lysandre',
    speaker: 'Veronica',
    expression: 'none',
    characterName: 'Veronica',
    backgroundUrl: 'bg_courtyard',
    text: '"Kami, você devia dar uma chance! O poema dele é lindo!" Lysandre me olha surpreso, com o rosto vermelho.',
    next: 'help-lysandre-2'
  },
  'help-lysandre-2': {
    id: 'help-lysandre-2',
    speaker: 'Kami',
    expression: 'neutro',
    characterName: 'Kami',
    backgroundUrl: 'bg_courtyard',
    text: '"Veronica? Há quanto tempo está espionando? De qualquer forma... o amor não é como uma pintura que você pode simplesmente consertar com outras cores." Kami vai embora.',
    next: 'help-lysandre-3'
  },
  'help-lysandre-3': {
    id: 'help-lysandre-3',
    speaker: 'Lysandre',
    expression: 'triste',
    characterName: 'Lysandre',
    backgroundUrl: 'bg_courtyard',
    text: '"Agradeço a intenção, Veronica. Mas acho que preciso de tempo..." Ele guarda a carta com um olhar melancólico e sai.',
    next: 'free-time-hub'
  },
  'explore-basketball': {
    id: 'explore-basketball',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'bg_basketball_court',
    text: 'Você escuta barulho de tênis cantando e a bola quicando. A Quadra de Basquete está lotada!',
    next: 'basketball-match-start'
  },
  'basketball-match-start': {
    id: 'basketball-match-start',
    speaker: 'Remi',
    expression: 'sorrindo',
    characterName: 'Remi',
    backgroundUrl: 'bg_basketball_court',
    cgUrl: '/images/cgs/cg_boys_basketball.png',
    text: 'Todos os garotos (Castiel, Lysandre, Nathaniel, Harry e Remi) estão jogando juntos de uniforme! O jogo está acirradíssimo. Para quem você vai gritar e torcer?',
    choices: [
      { text: 'Torcer pelo Castiel!', nextNodeId: 'free-time-hub', costPA: 5, affinityChanges: [{characterId: 'castiel', amount: 30}] },
      { text: 'Torcer pelo Nathaniel!', nextNodeId: 'free-time-hub', costPA: 5, affinityChanges: [{characterId: 'nathaniel', amount: 30}] },
      { text: 'Torcer pelo Lysandre!', nextNodeId: 'free-time-hub', costPA: 5, affinityChanges: [{characterId: 'lysandre', amount: 30}] },
      { text: 'Torcer pelo Harry!', nextNodeId: 'free-time-hub', costPA: 5, affinityChanges: [{characterId: 'harry', amount: 30}] },
      { text: 'Torcer pelo Remi!', nextNodeId: 'free-time-hub', costPA: 5, affinityChanges: [{characterId: 'remi', amount: 30}] }
    ]
  },

  // --- CENA FINAL EM CASA E ACESSO AO CELULAR ---
  'quest-home-end': {
    id: 'quest-home-end',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'sala_de_aula', // Usando sala de aula como quarto por enquanto
    text: 'Você chega em casa e se deita para descansar. O primeiro dia em Sweet Amoris foi cansativo, mas inesquecível. Quem você gostaria de chamar no celular para bater um papo no SweetChat agora?',
    choices: [
      { text: 'Chamar Castiel no Chat', nextNodeId: 'home-castiel-chat', costPA: 0 },
      { text: 'Chamar Nathaniel no Chat', nextNodeId: 'home-nathaniel-chat', costPA: 0 },
      { text: 'Chamar Remi no Chat', nextNodeId: 'home-remi-chat', costPA: 0 },
      { text: 'Chamar Harry no Chat', nextNodeId: 'home-harry-chat', costPA: 0 },
      { text: 'Falar com a Maggie no Chat', nextNodeId: 'home-maggie-chat', costPA: 0 },
      { text: 'Chamar a Kami no Chat', nextNodeId: 'home-kami-chat', costPA: 0 },
      { text: 'Chamar Lysandre no Chat', nextNodeId: 'home-lysandre-chat', costPA: 0 }
    ]
  },

  // --- ENTRADAS DE CHAT AUTOMÁTICAS (WhatsApp) ---
  'home-castiel-chat': {
    id: 'home-castiel-chat',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'sala_de_aula',
    text: 'Você envia um "Oi" para Castiel. Um tempo depois, a tela brilha com uma mensagem dele!',
    triggerChatCharacterId: 'castiel',
    triggerChatText: 'E aí, novata. Sobreviveu ao primeiro dia de Sweet Amoris? Se precisar de ajuda pra calar a boca do Nathaniel da próxima vez, só chamar.',
    next: 'quest-check-phone'
  },
  'home-nathaniel-chat': {
    id: 'home-nathaniel-chat',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'sala_de_aula',
    text: 'Você envia uma mensagem para Nathaniel. Ele responde rapidamente!',
    triggerChatCharacterId: 'nathaniel',
    triggerChatText: 'Olá, Veronica! Só queria agradecer de verdade pela sua ajuda hoje com a ficha de ausência. A escola pode ser difícil no início, mas fico muito feliz em te ajudar a se ajustar.',
    next: 'quest-check-phone'
  },
  'home-remi-chat': {
    id: 'home-remi-chat',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'sala_de_aula',
    text: 'Você abre o contato do Remi e envia uma figurinha. Ele te manda uma mensagem misteriosa.',
    triggerChatCharacterId: 'remi',
    triggerChatText: 'Bonjour, chérie. O destino me sussurrou que você estaria olhando para a tela do celular agora. Pensando nas minhas cartas de tarô... ou em mim?',
    next: 'quest-check-phone'
  },
  'home-harry-chat': {
    id: 'home-harry-chat',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'sala_de_aula',
    text: 'Você manda mensagem para Harry comentando sobre a música. Ele te responde desafiador.',
    triggerChatCharacterId: 'harry',
    triggerChatText: 'E aí, novata! Estava aqui tentando compor um solo novo e pensei no seu desafio. Que tal um duelo no clube de música depois das aulas amanhã? Topa?',
    next: 'quest-check-phone'
  },
  'home-maggie-chat': {
    id: 'home-maggie-chat',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'sala_de_aula',
    text: 'Você abre a conversa com a Maggie. Ela já estava digitando!',
    triggerChatCharacterId: 'maggie',
    triggerChatText: 'AMIGAAAA! Nem acredito que terminamos de pintar aquele painel! O pátio ficou lindo! Qual garoto você achou mais fofo até agora? Me conta tudo, não esconde nada! 🤫',
    next: 'quest-check-phone'
  },
  'home-kami-chat': {
    id: 'home-kami-chat',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'sala_de_aula',
    text: 'Você manda mensagem para Kami. Ela responde após alguns minutos!',
    triggerChatCharacterId: 'kami',
    triggerChatText: 'Oi, Veronica. Estava ouvindo música aqui. O que achou do pátio hoje? Fiquei surpresa de você ter vindo falar comigo.',
    next: 'quest-check-phone'
  },
  'home-lysandre-chat': {
    id: 'home-lysandre-chat',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'sala_de_aula',
    text: 'Você envia uma mensagem para Lysandre. Ele te responde logo depois, muito educado.',
    triggerChatCharacterId: 'lysandre',
    triggerChatText: 'Olá, Veronica. Muito obrigado por me ajudar a encontrar o meu bloco de notas hoje. Seria terrível perder minhas composições. Espero que tenha tido um bom primeiro dia.',
    next: 'quest-check-phone'
  },

  'quest-check-phone': {
    id: 'quest-check-phone',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'sala_de_aula',
    text: 'Notificação: O rapaz ou moça te mandou uma mensagem de texto no celular! Abra o menu "Celular" no canto superior direito para ler e responder as mensagens no SweetChat.',
    choices: [
      { text: 'Abrir celular e conversar', nextNodeId: 'demo-end-node', costPA: 0 },
      { text: 'Ir dormir', nextNodeId: 'demo-end-node', costPA: 0 }
    ]
  },
  'demo-end-node': {
    id: 'demo-end-node',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'sala_de_aula',
    text: 'Parabéns! Você concluiu a demonstração do Episódio 1 com escolhas de romance, novos arcos de história no corredor, pátio, grêmio e sala de artes, além da integração com o SweetChat (mensagens de texto).',
    next: 'demo-end-loop'
  },
  'demo-end-loop': {
    id: 'demo-end-loop',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'sala_de_aula',
    text: 'Fim do Episódio 1. Clique em "Reiniciar" para jogar de novo e tomar rumos diferentes, ou continue conversando com os garotos no Celular!'
  },

  // --- EPISÓDIO 2: CONHECENDO OS CLUBES ---
  'ep2_start': {
    id: 'ep2_start',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'sala_de_aula',
    text: 'Episódio 2: Conhecendo os Clubes. A escola Sweet Amoris está organizando novos clubes estudantis. Você precisa escolher em qual se inscrever.',
    next: 'ep2_choice'
  },
  'ep2_choice': {
    id: 'ep2_choice',
    speaker: 'Maggie',
    expression: 'sorrindo',
    characterName: 'Maggie',
    backgroundUrl: 'sala_de_artes',
    text: 'Veronica! E aí, você vai vir pro Clube de Fotografia comigo ou vai pro Clube de Música com o Harry?',
    choices: [
      {
        text: 'Clube de Fotografia: "Vou com você, Maggie! Fazer umas fotos legais!"',
        nextNodeId: 'ep2_maggie_path',
        costPA: 10,
        affinityChanges: [
          { characterId: 'maggie', amount: 15 },
          { characterId: 'harry', amount: -10 }
        ]
      },
      {
        text: 'Clube de Música: "Quero ver a guitarra do Harry em ação..."',
        nextNodeId: 'ep2_harry_path',
        costPA: 10,
        affinityChanges: [
          { characterId: 'harry', amount: 15 },
          { characterId: 'maggie', amount: -10 }
        ]
      }
    ]
  },
  'ep2_maggie_path': {
    id: 'ep2_maggie_path',
    speaker: 'Maggie',
    expression: 'sorrindo',
    characterName: 'Maggie',
    backgroundUrl: 'sala_de_artes',
    text: 'Maggie sorri segurando sua câmera polaroid. "Perfeito! A luz da tarde está ótima, vamos tirar fotos incríveis no pátio."',
    next: 'ep2_end_loop'
  },
  'ep2_harry_path': {
    id: 'ep2_harry_path',
    speaker: 'Harry',
    expression: 'sorrindo',
    characterName: 'Harry',
    backgroundUrl: 'patio',
    text: 'Sabia que você viria. O clube de música é o melhor lugar. Vamos ensaiar alguns acordes pesados.',
    next: 'ep2_end_loop'
  },
  'ep2_end_loop': {
    id: 'ep2_end_loop',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'corredor',
    text: 'Você completou a demonstração do Episódio 2! Em breve mais desdobramentos de clubes estarão disponíveis.',
    next: 'demo-end-loop'
  },

  // --- EPISÓDIO 3: O CACHORRO PERDIDO ---
  'ep3_start': {
    id: 'ep3_start',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'patio',
    text: 'Episódio 3: O Cachorro Perdido. Um cãozinho travesso entrou na escola Sweet Amoris e está correndo pelo pátio! A diretora está desesperada.',
    next: 'ep3_choice'
  },
  'ep3_choice': {
    id: 'ep3_choice',
    speaker: 'Nathaniel',
    expression: 'bravo',
    characterName: 'Nathaniel',
    backgroundUrl: 'corredor',
    text: 'Veronica, você viu um pequeno Totó correndo por aqui? Se a Diretora pegar ele, será um desastre para as regras do colégio!',
    choices: [
      {
        text: 'Ajudar Nathaniel: "Vou procurar perto das salas de aula!"',
        nextNodeId: 'ep3_nathaniel_path',
        costPA: 10,
        affinityChanges: [
          { characterId: 'nathaniel', amount: 15 },
          { characterId: 'castiel', amount: -10 }
        ]
      },
      {
        text: 'Ajudar Castiel: "O cachorro parece feliz livre, deixa ele correr!"',
        nextNodeId: 'ep3_castiel_path',
        costPA: 10,
        affinityChanges: [
          { characterId: 'castiel', amount: 15 },
          { characterId: 'nathaniel', amount: -10 }
        ]
      }
    ]
  },
  'ep3_nathaniel_path': {
    id: 'ep3_nathaniel_path',
    speaker: 'Nathaniel',
    expression: 'sorrindo',
    characterName: 'Nathaniel',
    backgroundUrl: 'corredor',
    text: 'Obrigado! Conseguimos segurá-lo antes que ele roesse a cortina do grêmio.',
    next: 'ep3_end_loop'
  },
  'ep3_castiel_path': {
    id: 'ep3_castiel_path',
    speaker: 'Castiel',
    expression: 'sorrindo',
    characterName: 'Castiel',
    backgroundUrl: 'patio',
    text: 'Haha, o Totó fez o Nathaniel correr a escola toda. Hilário. Dei um pedaço de biscoito pra ele e ele fugiu pros portões.',
    next: 'ep3_end_loop'
  },
  'ep3_end_loop': {
    id: 'ep3_end_loop',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'patio',
    text: 'Você completou a demonstração do Episódio 3! O cachorro foi resgatado com sucesso.',
    next: 'demo-end-loop'
  },
  'search-quadra': {
    id: 'search-quadra',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'patio', // quadra fallback
    text: 'A quadra de esportes está ensolarada. Lysandre está na arquibancada. No chão da quadra, você nota uma pequena chave brilhando.',
    choices: [
      { text: 'Pegar a chave misteriosa', nextNodeId: 'find-key-quadra', costPA: 10 },
      { text: 'Aproximar-se de Lysandre', nextNodeId: 'lysandre-lost-notebook', costPA: 0 }
    ]
  },
  'find-key-quadra': {
    id: 'find-key-quadra',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'patio',
    text: 'Você pegou a Chave Pequena! Talvez ela abra algum armário importante.',
    next: 'search-quadra-after-clue'
  },
  'search-quadra-after-clue': {
    id: 'search-quadra-after-clue',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'patio',
    text: 'Lysandre continua aqui na arquibancada.',
    choices: [
      { text: 'Falar com Lysandre', nextNodeId: 'lysandre-lost-notebook', costPA: 0 }
    ]
  },
  'search-galpao': {
    id: 'search-galpao',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'sala_de_artes',
    text: 'A sala do clube de fotografia está cheia de fotos reveladas secando. Maggie está limpando a lente da câmera. Próximo à mesa, há um pedaço de papel rasgado no lixo.',
    choices: [
      { text: 'Examinar o papel no lixo', nextNodeId: 'find-paper-galpao', costPA: 10 },
      { text: 'Falar com Maggie', nextNodeId: 'maggie-start', costPA: 0 }
    ]
  },
  'find-paper-galpao': {
    id: 'find-paper-galpao',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'sala_de_artes',
    text: 'Você pegou o Gabarito Rasgado! Parece que alguém jogou fora as respostas da prova.',
    next: 'search-galpao-after-clue'
  },
  'search-galpao-after-clue': {
    id: 'search-galpao-after-clue',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'sala_de_artes',
    text: 'Maggie continua arrumando os equipamentos fotográficos.',
    choices: [
      { text: 'Falar com Maggie', nextNodeId: 'maggie-start', costPA: 0 }
    ]
  },
  'search-cinema': {
    id: 'search-cinema',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'sala_de_aula',
    text: 'A sala de cinema está escura e confortável. Você vê seu pretendente acenando para você na última fileira.',
    choices: [
      { text: 'Ir se sentar para o encontro', nextNodeId: 'cinema-date-start', costPA: 0 }
    ]
  },
  'cinema-date-start': {
    id: 'cinema-date-start',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'sala_de_aula',
    text: 'Vocês compram pipoca e começam a assistir ao filme. No meio da sessão, vocês se aproximam bastante...',
    next: 'cinema-date-end'
  },
  'cinema-date-end': {
    id: 'cinema-date-end',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'sala_de_aula',
    text: 'O encontro no cinema foi maravilhoso! Você sente que a afinidade de vocês cresceu muito.',
    next: 'demo-end-loop'
  }
};

export interface EpisodeMetadata {
  id: number;
  number: number;
  title: string;
  description: string;
  coverImage: string;
  cgCount: number;
  startNodeId: string;
}

export const mockEpisodes: EpisodeMetadata[] = [
  {
    id: 1,
    number: 1,
    title: 'Um Novo Começo',
    description: 'Seu primeiro dia em Sweet Amoris! Conheça Nathaniel, Castiel, Remi, Harry, Maggie e Lysandre.',
    coverImage: '/images/backgrounds/corridor.png',
    cgCount: 3,
    startNodeId: 'start'
  },
  {
    id: 2,
    number: 2,
    title: 'Conhecendo os Clubes',
    description: 'É hora de escolher um clube escolar! Música ou artes? Suas escolhas definem quem você verá hoje.',
    coverImage: '/images/backgrounds/classroom.png',
    cgCount: 3,
    startNodeId: 'ep2_start'
  },
  {
    id: 3,
    number: 3,
    title: 'O Cachorro Perdido',
    description: 'O cachorro da diretora fugiu! Ajude a encontrá-lo e ganhe a gratidão (ou irritação) dos rapazes.',
    coverImage: '/images/backgrounds/courtyard.png',
    cgCount: 4,
    startNodeId: 'ep3_start'
  }
];
