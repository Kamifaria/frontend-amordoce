import { Choice } from '../shared/types';

export interface CallChoice {
  text: string;
  replyText: string;
  affinityChange?: number;
}

export const getCallDialogue = (characterId: string, affinity: number, stage: string): string => {
  // 1. REMI
  if (characterId === 'remi') {
    if (stage === 'INTRO') {
      if (affinity >= 50) return 'Ah, chérie... C\'est toi? O tarô previu sua ligação. O destino te trouxe a mim hoje. Quer saber o que as cartas dizem sobre nós dois?';
      if (affinity >= 25) return 'Bonjour, Veronica. Eu estava olhando as cartas e elas indicaram que devíamos tomar um café após as aulas. O que acha?';
      return 'Alô? Fale rápido, estou lendo as cartas de tarô para o conselho estudantil agora.';
    }
    if (stage === 'FREE_EXPLORE') {
      if (affinity >= 40) return 'Veronica, chérie. Você tem andado muito ocupada explorando a escola. Que tal uma pausa misteriosa na sala do grêmio para lermos a sua sorte?';
      return 'Alô. Se estiver procurando as chaves perdidas da quadra, ouvi dizer que a diretora andou por lá. Tome cuidado.';
    }
    if (stage === 'DATE_CINEMA') {
      return 'Mon amour... Estava pensando no perfume que você usará no cinema. O tarô diz que nossa noite sob as luzes da tela será inesquecível. Você concorda?';
    }
    return 'Chérie! O mistério escolar finalmente foi resolvido, e as cartas mostram uma linha de afeição muito forte entre nós dois agora.';
  }

  // 2. HARRY
  if (characterId === 'harry') {
    if (stage === 'INTRO') {
      if (affinity >= 50) return 'E aí, marrenta! Ligou porque sentiu falta das minhas provocações ou quer me ouvir tocar um solo de guitarra exclusivo?';
      if (affinity >= 25) return 'E aí, novata. O clube de música está ensaiando agora. Se quiser colar aqui para ver o som de perto, o convite está de pé.';
      return 'O que foi? Estou afinando a guitarra agora. Não faça eu perder meu ritmo.';
    }
    if (stage === 'FREE_EXPLORE') {
      if (affinity >= 40) return 'E aí, detetive! Fiquei sabendo que você está rondando a escola atrás de pistas. Quer que eu te ajude ou prefere continuar se perdendo sozinha?';
      return 'Oi. Se estiver procurando encrenca perto do galpão, melhor tomar cuidado com a diretora.';
    }
    if (stage === 'DATE_CINEMA') {
      return 'E aí, linda. O filme do cinema não me importa muito, contanto que eu possa sentar do seu lado na última fileira. Vai me dar essa moral?';
    }
    return 'E aí! Com o mistério resolvido, o foco agora é total na nossa banda. E claro, em você... pronto para o show?';
  }

  // 3. MAGGIE
  if (characterId === 'maggie') {
    if (stage === 'INTRO') {
      if (affinity >= 50) return 'AMIGA! Você não sabe o babado! O clube de artes está um caos de tinta, mas só consigo pensar em nós duas arrasando na escola! O que está fazendo?';
      if (affinity >= 25) return 'Oi, amiga! Consegui dois ingressos para uma galeria de arte super descolada! Você tem que ir comigo hoje!';
      return 'Oii! Estou cheia de glitter nos dedos e colando cartazes, te ligo depois!';
    }
    if (stage === 'FREE_EXPLORE') {
      return 'Menina, você achou a chave pequena? Eu vi o Nathaniel com cara de preocupado perto da quadra... investiga lá!';
    }
    if (stage === 'DATE_CINEMA') {
      return 'Amiga! Você vai ao cinema com o seu crush? Me conta tudo, preciso te ajudar a escolher o look mais babado do seu armário!';
    }
    return 'Amiga, que alívio que o mistério passou! Agora vamos focar 100% no show da banda e nas nossas roupas estilosas!';
  }

  // 4. KAMI
  if (characterId === 'kami') {
    if (stage === 'INTRO') {
      if (affinity >= 50) return 'Oi, Veronica... Hm, fico feliz que ligou. Eu estava no pátio ouvindo um som melancólico e pensando se você viria sentar comigo...';
      if (affinity >= 25) return 'Oi. Eu ia dar uma volta perto da praça depois da aula. Quer vir junto? Sem pressão, claro.';
      return 'Oi. Estou desenhando com grafite agora e prefiro silêncio. Nos vemos depois.';
    }
    if (stage === 'FREE_EXPLORE') {
      if (affinity >= 40) return 'Oi... Se você estiver procurando o papel rasgado, eu vi uns pedaços jogados perto do galpão antigo. Quer ir lá olhar comigo?';
      return 'Oi. Evite o corredor principal, a diretora está de mau humor hoje procurando alunos fora da sala.';
    }
    if (stage === 'DATE_CINEMA') {
      return 'Oi, Veronica... Fiquei pensando naquele encontro no cinema. Eu gosto de filmes clássicos e escuros... e de segurar sua mão quando a luz apaga...';
    }
    return 'Oi. O mistério acabou... ainda bem. Agora podemos nos concentrar no show de rock da banda.';
  }

  // 5. CASTIEL
  if (characterId === 'castiel') {
    if (stage === 'INTRO') {
      if (affinity >= 50) return 'Olha só quem ligou. Sentiu saudades da minha voz, novata? O que você quer aprontar comigo hoje?';
      if (affinity >= 25) return 'E aí. Estava pensando em ir ao fliperama mais tarde bater uns recordes... Se não tiver medo de perder pra mim, você pode vir.';
      return 'O que foi? Estou ocupado alimentando o Dragon agora. Fala logo.';
    }
    if (stage === 'FREE_EXPLORE') {
      if (affinity >= 40) return 'Novata, ouvi dizer que você anda bancando a detetive. Se precisar de um guarda-costas para entrar no galpão, é só pedir com jeitinho.';
      return 'Tsc. O Nathaniel está enchendo o saco com aquele formulário de novo. Se ver ele por aí, diga que eu sumi.';
    }
    if (stage === 'DATE_CINEMA') {
      return 'Ei... Estava pensando no cinema. Não me faça assistir nenhum romance meloso, hein? Mas se você ficar com medo no filme de terror, pode me abraçar.';
    }
    return 'E aí. O mistério chato da escola já foi. Agora é ensaiar as músicas para o show final. E ver se você vai torcer por mim na plateia.';
  }

  // 6. NATHANIEL
  if (characterId === 'nathaniel') {
    if (stage === 'INTRO') {
      if (affinity >= 50) return 'Olá, Veronica! Que surpresa agradável. Eu estava organizando as fichas do grêmio, mas sempre tenho tempo para ouvir sua voz.';
      if (affinity >= 25) return 'Olá. Comprei um novo romance policial e pensei se você não gostaria de lê-lo comigo na biblioteca amanhã.';
      return 'Olá. Por favor, seja breve, a Diretora me pediu para revisar a lista de presença escolar hoje.';
    }
    if (stage === 'FREE_EXPLORE') {
      if (affinity >= 40) return 'Veronica! Sumiram algumas chaves importantes da quadra. Se você achar qualquer pista, por favor, me traga imediatamente, tudo bem?';
      return 'Olá. A escola está cheia de boatos sobre o show da banda. Como representante, preciso garantir que tudo ocorra dentro das normas.';
    }
    if (stage === 'DATE_CINEMA') {
      return 'Olá, Veronica. Eu andei pesquisando os filmes em cartaz e escolhi um excelente documentário histórico. Espero que você goste de assistir ao meu lado...';
    }
    return 'Olá. Com a situação escolar normalizada, fico muito mais tranquilo. Obrigado por sempre me apoiar nas responsabilidades.';
  }

  // 7. LYSANDRE
  if (characterId === 'lysandre') {
    if (stage === 'INTRO') {
      if (affinity >= 50) return 'Olá, minha querida. É um deleite ouvir sua voz. Escrevi uma nova poesia vitoriana hoje... e confesso que pensei em seus olhos ao compor as rimas.';
      if (affinity >= 25) return 'Olá, Veronica. Gostaria de me acompanhar para um chá no fim de tarde? Seria excelente compartilhar algumas melodias clássicas.';
      return 'Olá. Desculpe-me, acabei de perder meu bloco de notas com todas as minhas letras musicais de novo...';
    }
    if (stage === 'FREE_EXPLORE') {
      if (affinity >= 40) return 'Olá. Enquanto procuro meu bloco, notei que a escola guarda segredos interessantes nos porões. Você gostaria de investigá-los ao meu lado?';
      return 'Olá. Castiel e eu estamos ensaiando algumas bases acústicas. Se nos vir no pátio, sinta-se à vontade para ouvir.';
    }
    if (stage === 'DATE_CINEMA') {
      return 'Olá, Veronica. O cinema é uma forma de arte fascinante. Estar na penumbra ao seu lado, compartilhando o mesmo ar... é quase poético.';
    }
    return 'Olá. As coisas voltaram aos eixos. Fico feliz em saber que o show da banda vai acontecer sem imprevistos.';
  }

  // 8. ARMIN
  if (characterId === 'armin') {
    if (stage === 'INTRO') {
      if (affinity >= 50) return 'Epa! Meu player 2 favorito ligou! E aí, pronta para um campeonato de Smash Bros hoje à noite ou prefere jogar um RPG cooperativo de turnos?';
      if (affinity >= 25) return 'E aí, Veronica! Baixei um jogo novo muito louco no celular. Quer que eu te mostre as manhas no intervalo de amanhã?';
      return 'E aí. Estou no meio de uma partida competitiva e não posso pausar! Fala rápido!';
    }
    if (stage === 'FREE_EXPLORE') {
      return 'Cara, essa busca por pistas na escola parece muito uma quest de RPG clássica! Quer ajuda para vasculhar o mapa do colégio?';
    }
    if (stage === 'DATE_CINEMA') {
      return 'Alô! Para o cinema, eu comprei um balde de pipoca gigante que brilha no escuro! E o melhor de tudo: vou poder dividir com você!';
    }
    return 'E aí! Mistério resolvido, agora é focar nas conquistas da Steam e na nossa música no show!';
  }

  // 9. ALEXY
  if (characterId === 'alexy') {
    if (stage === 'INTRO') {
      if (affinity >= 50) return 'BABADOOO! Veronica, meu amor! Estava olhando o catálogo de roupas novas e achei a sua CARA! Temos que fazer um desfile de moda particular!';
      if (affinity >= 25) return 'Oii! Queria ir ao shopping comprar uns casacos novos amanhã. Me ajuda a escolher? Você tem muito bom gosto!';
      return 'Oi, fofa! Estou arrumando meu cabelo agora, te ligo em cinco minutinhos!';
    }
    if (stage === 'FREE_EXPLORE') {
      return 'Menina, fiquei sabendo das chaves sumidas! Se você achar, me conta, quero saber quem é o culpado desse drama todo!';
    }
    if (stage === 'DATE_CINEMA') {
      return 'AI MEU DEUS! O cinema! Você precisa ir com aquela roupa rosa vibrante ou o corset preto com correntes! Vai deixar qualquer um babando!';
    }
    return 'Menina! Que bom que deu tudo certo! Agora o show vai ser um arraso e eu vou estar na primeira fila gritando seu nome!';
  }

  return 'Alô? Não consigo falar no momento.';
};

export const getCallChoices = (characterId: string, affinity: number, stage: string): CallChoice[] => {
  // 1. REMI
  if (characterId === 'remi') {
    if (stage === 'DATE_CINEMA') {
      return [
        { text: 'Com certeza! Vou usar meu perfume favorito para você.', replyText: 'Remi: Magnifique... Mal posso esperar para sentir sua fragrância tão perto de mim no cinema. ❤️', affinityChange: 15 },
        { text: 'Acho que prefiro focar no filme mesmo.', replyText: 'Remi: Ah, o ceticismo da mente racional... Mas o destino ainda assim nos unirá naquela sala.', affinityChange: -5 }
      ];
    }
    if (affinity >= 25) {
      return [
        { text: 'Claro, adoraria ir ao café ler as cartas com você!', replyText: 'Remi: Excelente. O tarô nos reserva grandes surpresas, chérie. Até amanhã na saída! 🔮', affinityChange: 10 },
        { text: 'Hm, não sei se confio muito em previsões de cartas...', replyText: 'Remi: Uma pena. As estrelas não mentem, mas respeito seu tempo. Nos vemos na escola.', affinityChange: -5 }
      ];
    }
    return [
      { text: 'Quem sabe outro dia, Remi?', replyText: 'Remi: Sem problemas, chérie. O tempo é relativo. Boa noite.', affinityChange: 5 },
      { text: 'Estou muito ocupada agora.', replyText: 'Remi: D\'accord. Nos falamos quando os astros permitirem.', affinityChange: 0 }
    ];
  }

  // 2. HARRY
  if (characterId === 'harry') {
    if (stage === 'DATE_CINEMA') {
      return [
        { text: 'Claro que sim, Harry! Vou adorar ficar do seu lado.', replyText: 'Harry: Heh... Sabia que você não ia recusar. Vou comprar a pipoca doce só pra te agradar. Até mais! 😉', affinityChange: 15 },
        { text: 'Se você se comportar e não fizer piadinhas...', replyText: 'Harry: Ei! Minhas piadas são a melhor parte da sessão, novata! Mas tudo bem, vou tentar ser um bom garoto.', affinityChange: 10 }
      ];
    }
    if (affinity >= 25) {
      return [
        { text: 'Eu adoraria ver o ensaio! Quero muito te ver tocar.', replyText: 'Harry: Beleza! Vou mandar ver no solo de guitarra pra te impressionar. Não se atrase! 🎸', affinityChange: 10 },
        { text: 'Tenho muito dever de casa para fazer.', replyText: 'Harry: Caramba, você é bem certinha, hein? Nathaniel fez escola com você. Fui.', affinityChange: -5 }
      ];
    }
    return [
      { text: 'Obrigada por ligar, Harry.', replyText: 'Harry: Falou, novata. Não durma na aula amanhã!', affinityChange: 5 },
      { text: 'Preciso desligar.', replyText: 'Harry: Beleza, vai lá. A gente se esbarra no pátio.', affinityChange: 0 }
    ];
  }

  // 3. MAGGIE
  if (characterId === 'maggie') {
    if (stage === 'DATE_CINEMA') {
      return [
        { text: 'Me ajuda sim! Quero arrasar no look para o encontro!', replyText: 'Maggie: EBAAA! Vou levar todas as minhas maquiagens e a gente faz um dia de spa na sua casa! Vai ser perfeito! 💖', affinityChange: 12 },
        { text: 'Vou usar algo básico mesmo, sem muita frescura.', replyText: 'Maggie: Básica? Ah não, Veronica! Sweet Amoris pede cor, estilo e ousadia! Mas você que sabe, amiga.', affinityChange: 2 }
      ];
    }
    if (affinity >= 25) {
      return [
        { text: 'Eu vou com certeza, Maggie! Adoro artes contemporâneas!', replyText: 'Maggie: Amiga, você é a melhor! Vamos tirar fotos super coloridas na exposição! Beijinhos! 🎨', affinityChange: 10 },
        { text: 'Hoje estou meio cansada para passear.', replyText: 'Maggie: Poxa, que pena! Mas vai descansar, amanhã a gente conversa no refeitório!', affinityChange: 0 }
      ];
    }
    return [
      { text: 'Amanhã me mostra suas pinturas!', replyText: 'Maggie: Sim! Fiz um quadro abstrato cheio de glitter e tinta neon! Você vai amar! Beijos!', affinityChange: 8 },
      { text: 'Boa noite, Maggie.', replyText: 'Maggie: Boa noite, amiga! Durma com os anjinhos!', affinityChange: 2 }
    ];
  }

  // 4. KAMI
  if (characterId === 'kami') {
    if (stage === 'DATE_CINEMA') {
      return [
        { text: 'Segurar sua mão seria perfeito, Kami.', replyText: 'Kami: Hm... legal. Vou escolher um filme clássico bem bonito para nós então. Boa noite, Veronica. 🖤', affinityChange: 15 },
        { text: 'Eu prefiro filmes de ação e barulho.', replyText: 'Kami: Ah... entendo. Talvez a gente possa assistir a outra coisa então. Até amanhã.', affinityChange: -2 }
      ];
    }
    if (affinity >= 25) {
      return [
        { text: 'Eu adoraria dar uma volta na praça com você!', replyText: 'Kami: Que bom... Vou levar meu MP3 pra gente dividir os fones de ouvido. Até amanhã na saída.', affinityChange: 12 },
        { text: 'Prefiro ficar em casa descansando hoje.', replyText: 'Kami: Tudo bem. Eu também gosto de silêncio e solidão às vezes. Nos vemos na escola.', affinityChange: 2 }
      ];
    }
    return [
      { text: 'O pátio fica lindo no entardecer.', replyText: 'Kami: É verdade. Fico feliz que você também repare nas coisas simples. Tchau.', affinityChange: 5 },
      { text: 'Até amanhã, Kami.', replyText: 'Kami: Até. Durma bem.', affinityChange: 2 }
    ];
  }

  // 5. CASTIEL
  if (characterId === 'castiel') {
    if (stage === 'DATE_CINEMA') {
      return [
        { text: 'Se for um filme de terror bem assustador, eu topo!', replyText: 'Castiel: Hah! Gostei de ver, novata. Não vá chorar de medo e apertar meu braço forte demais, hein? Nos vemos lá. 🖤', affinityChange: 15 },
        { text: 'Prefiro assistir um filme de romance bem doce.', replyText: 'Castiel: Tsc. Fala sério, romance de cinema é muito brega. Mas se você fizer questão, eu aguento o tédio.', affinityChange: 2 }
      ];
    }
    if (affinity >= 25) {
      return [
        { text: 'Fliperama? Eu topo! Prepare-se para ser derrotado!', replyText: 'Castiel: Gostei do desafio, novata. Quero ver você tentar bater meu recorde no pinball. Até amanhã! 🎮', affinityChange: 12 },
        { text: 'Não sou muito fã de fliperamas e barulho.', replyText: 'Castiel: Que chata. Perdeu a chance de ver minhas habilidades. Deixa pra lá.', affinityChange: -5 }
      ];
    }
    return [
      { text: 'Como está o Dragon?', replyText: 'Castiel: O cachorro está ótimo, comendo tudo que vê pela frente. Ele gostou de você, milagre.', affinityChange: 8 },
      { text: 'Não enche, Castiel.', replyText: 'Castiel: Hah! Arisca como sempre. Nos vemos por aí.', affinityChange: 5 }
    ];
  }

  // 6. NATHANIEL
  if (characterId === 'nathaniel') {
    if (stage === 'DATE_CINEMA') {
      return [
        { text: 'Eu adoraria assistir esse documentário histórico com você, Nathaniel.', replyText: 'Nathaniel: Excelente! Fico muito contente que compartilhe do meu gosto por história. Prometo que será proveitoso! 📚', affinityChange: 15 },
        { text: 'Acho documentários meio monótonos para o cinema...', replyText: 'Nathaniel: Oh, compreendo. Podemos escolher uma comédia leve ou suspense clássico se preferir. O importante é sua companhia.', affinityChange: 5 }
      ];
    }
    if (affinity >= 25) {
      return [
        { text: 'Seria maravilhoso ler e discutir o livro policial com você na biblioteca.', replyText: 'Nathaniel: Que ótimo! Reservei a melhor mesa de estudos para nós amanhã. Obrigado por aceitar! 📚', affinityChange: 12 },
        { text: 'Prefiro ler romances românticos.', replyText: 'Nathaniel: Entendo! Também há bons clássicos românticos na biblioteca se você quiser dar uma olhada.', affinityChange: 5 }
      ];
    }
    return [
      { text: 'Precisa de ajuda com os relatórios amanhã?', replyText: 'Nathaniel: Seria de grande valia, Veronica! Muito obrigado por ser tão atenciosa e prestativa.', affinityChange: 10 },
      { text: 'Boa noite, Nathaniel.', replyText: 'Nathaniel: Boa noite, Veronica. Descanse bastante e tenha bons sonhos.', affinityChange: 2 }
    ];
  }

  // 7. LYSANDRE
  if (characterId === 'lysandre') {
    if (stage === 'DATE_CINEMA') {
      return [
        { text: 'Estar ao seu lado na penumbra do cinema parece muito poético, Lysandre.', replyText: 'Lysandre: Suas palavras tocam profundamente meu coração, Veronica. Certamente teremos uma noite inesquecível. Sonhe com os anjos. 🌹', affinityChange: 15 },
        { text: 'Apenas preste atenção na tela e coma sua pipoca.', replyText: 'Lysandre: Ah... Sim, claro. Peço desculpas pela minha divagação. Tenha uma boa noite.', affinityChange: -2 }
      ];
    }
    if (affinity >= 25) {
      return [
        { text: 'Eu adoraria tomar um chá e ouvir seus novos poemas, Lysandre.', replyText: 'Lysandre: Fico honrado com seu interesse pela minha arte. Escolherei o melhor blend de ervas para nós. Até amanhã. 🌹', affinityChange: 12 },
        { text: 'Estou com a agenda cheia ultimamente, desculpe.', replyText: 'Lysandre: Compreendo perfeitamente, a vida escolar é deveras atarefada. Fica para uma próxima oportunidade.', affinityChange: 0 }
      ];
    }
    return [
      { text: 'Tomara que você ache seu bloco de notas logo.', replyText: 'Lysandre: Agradeço muito por sua preocupação. Você é sempre extremamente gentil. Boa noite.', affinityChange: 8 },
      { text: 'Boa noite, Lysandre.', replyText: 'Lysandre: Boa noite, querida. Que a noite lhe traga paz.', affinityChange: 2 }
    ];
  }

  // 8. ARMIN
  if (characterId === 'armin') {
    if (stage === 'DATE_CINEMA') {
      return [
        { text: 'Que demais! Adoro pipoca que brilha no escuro, Armin!', replyText: 'Armin: Hahaha sabia que você ia curtir! E depois do cinema a gente pode ir no fliperama fazer cooperativo! Fui! 🎮', affinityChange: 15 },
        { text: 'Acho isso meio infantil, prefiro pipoca salgada comum.', replyText: 'Armin: Poxa, que sem graça! Mas beleza, a gente compra metade de cada uma pra ninguém brigar. Até amanhã!', affinityChange: 2 }
      ];
    }
    if (affinity >= 25) {
      return [
        { text: 'Com certeza! Quero que você me mostre todas as manhas do jogo!', replyText: 'Armin: Fechado! Vou levar o controle extra pra gente jogar de dois no pátio! Até mais! 🎮', affinityChange: 12 },
        { text: 'Não tenho muita paciência para jogos de celular.', replyText: 'Armin: Ah, que pena! Mas tudo bem, a gente pode conversar sobre animes ou séries também. Até!', affinityChange: 0 }
      ];
    }
    return [
      { text: 'Qual seu console favorito?', replyText: 'Armin: O Switch pela portabilidade, mas o PC Master Race é imbatível! Amanhã te mostro fotos do meu setup!', affinityChange: 8 },
      { text: 'Vou dormir agora.', replyText: 'Armin: Valeu! Vou jogar mais uma partida de LoL e já vou também. Fui!', affinityChange: 2 }
    ];
  }

  // 9. ALEXY
  if (characterId === 'alexy') {
    if (stage === 'DATE_CINEMA') {
      return [
        { text: 'Vou usar o corset preto com correntes! Vai ficar maravilhoso!', replyText: 'Alexy: ARRASOU! Vou levar um gloss incrível pra te emprestar e fazer uma maquiagem bafo! Você vai ser a estrela da noite! 💖', affinityChange: 15 },
        { text: 'Vou de moletom básico e confortável.', replyText: 'Alexy: Amada? Moletom pro cinema com o crush? Não aceito isso! Amanhã vou te arrastar pro closet e resolver isso!', affinityChange: 2 }
      ];
    }
    if (affinity >= 25) {
      return [
        { text: 'Eu adoraria te ajudar a escolher roupas! Vamos sim!', replyText: 'Alexy: EBAAA! O shopping que nos aguarde, vamos gastar todo o nosso gold em estilo! Tchau fofa! 🛍️', affinityChange: 12 },
        { text: 'Não gosto muito de ir ao shopping.', replyText: 'Alexy: O que? Choquei! Mas tudo bem, posso escolher umas coisas online e te mostrar na escola!', affinityChange: 0 }
      ];
    }
    return [
      { text: 'Adorei seu estilo colorido, Alexy!', replyText: 'Alexy: Ai, obrigado! Cor é vida! Prometo que vou te dar várias dicas de moda amanhã!', affinityChange: 10 },
      { text: 'Preciso ir desligar.', replyText: 'Alexy: Tudo bem! Vai lá descansar, nos vemos amanhã! Beijos!', affinityChange: 2 }
    ];
  }

  return [];
};
