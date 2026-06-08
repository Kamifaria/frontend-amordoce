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
    text: 'Os dois parecem prestes a brigar fisicamente. O que você decide fazer?',
    choices: [
      {
        text: 'Apoiar Nathaniel: "Castiel, pare de ser infantil e assine logo." (Doce/Tímida)',
        nextNodeId: 'confronto-nathaniel-path',
        costPA: 10,
        affinityChange: { characterId: 'nathaniel', amount: 20 }
      },
      {
        text: 'Apoiar Castiel: "Nathaniel, você também é chato com essas regras bobas." (Ousada/Irônica)',
        nextNodeId: 'confronto-castiel-path',
        costPA: 10,
        affinityChange: { characterId: 'castiel', amount: 20 }
      },
      {
        text: 'Acalmar os dois: "Ei, parem! Não vale a pena brigar por isso." (Defensiva/Grossa)',
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
        text: 'Eu adoraria uma leitura de cartas, Remi. (Doce/Tímida)',
        nextNodeId: 'remi-tarot-lovers',
        costPA: 10,
        affinityChange: { characterId: 'remi', amount: 20 }
      },
      {
        text: 'Desde que a carta revele que teremos um futuro juntos... (Ousada/Irônica)',
        nextNodeId: 'remi-tarot-devil',
        costPA: 10,
        affinityChange: { characterId: 'remi', amount: 25 }
      },
      {
        text: 'Não acredito em superstições. Tenho mais o que fazer. (Defensiva/Grossa)',
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
    backgroundUrl: 'remi_encounter',
    text: 'Magnifique. A carta dos Namorados se revelou para nós... Ela sugere uma conexão profunda prestes a florescer sob a luz da escola. O destino é sábio, chérie.',
    next: 'remi-end'
  },
  'remi-tarot-devil': {
    id: 'remi-tarot-devil',
    speaker: 'Remi',
    expression: 'provocando',
    characterName: 'Remi',
    backgroundUrl: 'remi_encounter',
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
    expression: 'neutro',
    characterName: 'Harry',
    backgroundUrl: 'patio',
    text: 'E aí, novata. Curtiu o riff de guitarra que eu estava ensaiando ou veio me mandar parar igual ao Nathaniel?',
    choices: [
      {
        text: 'Eu achei lindo... Você toca com muita paixão. (Doce/Tímida)',
        nextNodeId: 'harry-guitar-nice',
        costPA: 10,
        affinityChange: { characterId: 'harry', amount: 15 }
      },
      {
        text: 'Toca bem, mas aposto que eu consigo solar melhor que você. (Ousada/Irônica)',
        nextNodeId: 'harry-guitar-bold',
        costPA: 10,
        affinityChange: { characterId: 'harry', amount: 25 }
      },
      {
        text: 'O barulho é legal, mas bem que podia tocar longe das salas de aula. (Defensiva/Grossa)',
        nextNodeId: 'harry-guitar-rude',
        costPA: 10,
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
    text: 'Harry volta a dedilhar sua guitarra com um sorriso desafiador no rosto. Você resolve entrar para a sala de artes para conhecer a Maggie.',
    next: 'maggie-start'
  },

  // --- CENA 4: CLUBE DE ARTES (MAGGIE) ---
  'maggie-start': {
    id: 'maggie-start',
    speaker: 'Maggie',
    expression: 'neutro',
    characterName: 'Maggie',
    backgroundUrl: 'sala_de_artes',
    text: 'Oiii! Sou a Maggie do clube de artes! Você quer me ajudar a pintar esse painel gigante super caótico?! Vai ter muita tinta colorida!',
    choices: [
      {
        text: 'Nossa, que ateliê lindo! Adoraria te ajudar a pintar! (Doce/Tímida)',
        nextNodeId: 'maggie-nice',
        costPA: 10,
        affinityChange: { characterId: 'maggie', amount: 20 }
      },
      {
        text: 'Seu cabelo combina perfeitamente com a bagunça de tinta! (Ousada/Irônica)',
        nextNodeId: 'maggie-bold',
        costPA: 10,
        affinityChange: { characterId: 'maggie', amount: 15 }
      },
      {
        text: 'Que bagunça. Como você consegue achar alguma coisa aqui? (Defensiva/Grossa)',
        nextNodeId: 'maggie-rude',
        costPA: 10,
        affinityChange: { characterId: 'maggie', amount: -15 }
      }
    ]
  },
  'maggie-nice': {
    id: 'maggie-nice',
    speaker: 'Maggie',
    expression: 'sorrindo',
    characterName: 'Maggie',
    backgroundUrl: 'sala_de_artes',
    text: 'SIIIM! Pegue o pincel e vamos fazer mágica! Vamos encher essa escola cinza de cores vibrantes!',
    next: 'maggie-end'
  },
  'maggie-bold': {
    id: 'maggie-bold',
    speaker: 'Maggie',
    expression: 'sorrindo',
    characterName: 'Maggie',
    backgroundUrl: 'sala_de_artes',
    text: 'Hahaha! Pura arte abstrata viva! Amei o elogio! Você é das minhas, Veronica!',
    next: 'maggie-end'
  },
  'maggie-rude': {
    id: 'maggie-rude',
    speaker: 'Maggie',
    expression: 'triste',
    characterName: 'Maggie',
    backgroundUrl: 'sala_de_artes',
    text: 'Ah... É que o caos estimula a minha criatividade artística... Mas desculpe a bagunça.',
    next: 'maggie-end'
  },
  'maggie-end': {
    id: 'maggie-end',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'sala_de_artes',
    text: 'Após pintar com Maggie, as aulas finalmente chegam ao fim. O sinal toca anunciando o fim do dia escolar. No corredor, você encontra Lysandre procurando algo desesperadamente.',
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
        text: 'Não se preocupe, eu vou te ajudar a procurar agora mesmo! (Doce/Tímida)',
        nextNodeId: 'quest-choose-location',
        costPA: 10,
        affinityChange: { characterId: 'lysandre', amount: 15 }
      },
      {
        text: 'De novo, Lysandre? Você precisa de um chaveiro ou GPS para as suas coisas... (Ousada/Irônica)',
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
      { text: 'Procurar na Sala de Artes da Maggie', nextNodeId: 'search-art-room', costPA: 10 }
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
        text: 'Sim, o Lysandre perdeu o bloco de notas dele. Viu algo? (Doce/Tímida)',
        nextNodeId: 'nathaniel-classroom-help',
        costPA: 10,
        affinityChange: { characterId: 'nathaniel', amount: 15 }
      },
      {
        text: 'Estou investigando um mistério... Quer ser meu cúmplice? (Ousada/Irônica)',
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
  'quest-choose-location-2': {
    id: 'quest-choose-location-2',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'corredor',
    text: 'A sala de aula não tinha pistas. Onde procurar agora?',
    choices: [
      { text: 'Procurar no Pátio das Cerejeiras', nextNodeId: 'search-courtyard', costPA: 10 },
      { text: 'Procurar na Sala de Artes da Maggie', nextNodeId: 'search-art-room', costPA: 10 }
    ]
  },
  'search-courtyard': {
    id: 'search-courtyard',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'patio',
    text: 'As pétalas de cerejeira caem no gramado. Sentado sob a maior árvore, você vê Castiel ouvindo música com fones de ouvido.',
    next: 'castiel-courtyard-meet'
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
        text: 'Só estou procurando o caderno do Lysandre. Sabe onde está? (Doce/Tímida)',
        nextNodeId: 'castiel-courtyard-notebook',
        costPA: 10,
        affinityChange: { characterId: 'castiel', amount: 15 }
      },
      {
        text: 'Vim ver se o bad boy sabe fazer outra coisa além de me provocar. (Ousada/Irônica)',
        nextNodeId: 'castiel-courtyard-tease',
        costPA: 10,
        affinityChange: { characterId: 'castiel', amount: 20 }
      }
    ]
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
    text: 'Hah! Fico impressionado com a sua coragem, novata. Mas para sua informação, o Lysandre estava com o caderno dele na sala de artes com a Maggie mais cedo.',
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
      { text: 'Procurar na Sala de Artes da Maggie', nextNodeId: 'search-art-room', costPA: 10 }
    ]
  },
  'search-art-room': {
    id: 'search-art-room',
    speaker: 'Narrador',
    expression: 'none',
    characterName: 'Narrador',
    backgroundUrl: 'sala_de_artes',
    text: 'A sala de artes tem um cheiro gostoso de tinta fresca. Maggie está guardando os pincéis e cantando baixo.',
    next: 'maggie-art-meet'
  },
  'maggie-art-meet': {
    id: 'maggie-art-meet',
    speaker: 'Maggie',
    expression: 'sorrindo',
    characterName: 'Maggie',
    backgroundUrl: 'sala_de_artes',
    text: 'Oiii! Voltou para pintar comigo? O painel ainda tem espaço para cor!',
    choices: [
      {
        text: 'Procuramos um bloco de notas de couro preto do Lysandre. Viu? (Doce/Tímida)',
        nextNodeId: 'maggie-art-notebook',
        costPA: 10,
        affinityChange: { characterId: 'maggie', amount: 15 }
      },
      {
        text: 'Vim conferir se você não usou o caderno dele para limpar tinta! (Ousada/Irônica)',
        nextNodeId: 'maggie-art-tease',
        costPA: 10,
        affinityChange: { characterId: 'maggie', amount: 20 }
      }
    ]
  },
  'maggie-art-notebook': {
    id: 'maggie-art-notebook',
    speaker: 'Maggie',
    expression: 'sorrindo',
    characterName: 'Maggie',
    backgroundUrl: 'sala_de_artes',
    text: 'Ah! Um bloco de notas de couro preto? Eu vi sim! Estava caído bem atrás do cavalete principal. Eu guardei na minha gaveta de esboços para proteger os poemas. Aqui está!',
    next: 'quest-found-notebook'
  },
  'maggie-art-tease': {
    id: 'maggie-art-tease',
    speaker: 'Maggie',
    expression: 'sorrindo',
    characterName: 'Maggie',
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
        text: 'Sim! Encontrei na sala de artes com a Maggie. Aqui está! (Doce/Tímida)',
        nextNodeId: 'lysandre-happy-end',
        costPA: 10,
        affinityChange: { characterId: 'lysandre', amount: 30 }
      },
      {
        text: 'Achei! Mas só entrego se você ler um dos poemas dele para mim! (Ousada/Irônica)',
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
    text: 'Missão cumprida! Com o caderno são e salvo, você volta para casa orgulhosa de ter ajudado Lysandre no seu primeiro dia.',
    next: 'quest-home-end'
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
      { text: 'Falar com a Maggie no Chat', nextNodeId: 'home-maggie-chat', costPA: 0 }
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
    text: 'Veronica! E aí, você vai vir pro Clube de Artes comigo ou vai pro Clube de Música com o Harry?',
    choices: [
      {
        text: 'Clube de Artes: "Vou ficar com você, Maggie! Arte é tudo!"',
        nextNodeId: 'ep2_maggie_path',
        costPA: 10,
        affinityChange: { characterId: 'maggie', amount: 20 }
      },
      {
        text: 'Clube de Música: "Quero ver a guitarra do Harry em ação..."',
        nextNodeId: 'ep2_harry_path',
        costPA: 10,
        affinityChange: { characterId: 'harry', amount: 20 }
      }
    ]
  },
  'ep2_maggie_path': {
    id: 'ep2_maggie_path',
    speaker: 'Maggie',
    expression: 'sorrindo',
    characterName: 'Maggie',
    backgroundUrl: 'sala_de_artes',
    text: 'EBAAA! Vamos pintar painéis gigantescas de neon! Vamos dominar o colégio com tinta!',
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
        affinityChange: { characterId: 'nathaniel', amount: 20 }
      },
      {
        text: 'Ajudar Castiel: "O cachorro parece feliz livre, deixa ele correr!"',
        nextNodeId: 'ep3_castiel_path',
        costPA: 10,
        affinityChange: { characterId: 'castiel', amount: 20 }
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
