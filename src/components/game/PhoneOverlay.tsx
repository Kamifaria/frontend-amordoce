'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Phone, 
  PhoneOff, 
  BookOpen, 
  Heart, 
  ChevronLeft, 
  Sparkles,
  Volume2,
  VolumeX,
  Image as ImageIcon
} from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';
import { LoveOMeter } from './LoveOMeter';
import { SweetGramApp } from './SweetGramApp';

export const PhoneOverlay: React.FC = () => {
  const {
    isPhoneOpen,
    togglePhone,
    affinities,
    activeCall,
    startCall,
    answerCall,
    endCall,
    unlockedTips,
    isMuted,
    toggleMute,
    chatThreads,
    cluesFound,
    metCharacters,
    savedPaintings,
    storyStage,
  } = useGameStore();

  const [activeTab, setActiveTab] = useState<'home' | 'contacts' | 'tips' | 'chat' | 'sweetgram' | 'gallery'>('home');
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [selectedCallChoice, setSelectedCallChoice] = useState<number | null>(null);
  const [callResponseText, setCallResponseText] = useState<string | null>(null);

  React.useEffect(() => {
    setSelectedCallChoice(null);
    setCallResponseText(null);
  }, [activeCall?.characterId, activeCall?.status]);

  if (!isPhoneOpen) return null;

  // Contact list data
  const contacts = [
    { id: 'remi', name: 'Remi', avatarColor: 'from-violet-600 to-slate-900', initial: 'R' },
    { id: 'harry', name: 'Harry', avatarColor: 'from-red-600 to-zinc-900', initial: 'H' },
    { id: 'maggie', name: 'Maggie', avatarColor: 'from-pink-400 to-purple-600', initial: 'M' },
    { id: 'kami', name: 'Kami', avatarColor: 'from-purple-900 via-indigo-950 to-black', initial: 'K' },
    { id: 'castiel', name: 'Castiel', avatarColor: 'from-red-500 to-rose-600', initial: 'C' },
    { id: 'lysandre', name: 'Lysandre', avatarColor: 'from-emerald-500 to-teal-600', initial: 'L' },
    { id: 'nathaniel', name: 'Nathaniel', avatarColor: 'from-amber-400 to-yellow-500', initial: 'N' },
    { id: 'armin', name: 'Armin', avatarColor: 'from-blue-500 to-indigo-600', initial: 'Ar' },
    { id: 'alexy', name: 'Alexy', avatarColor: 'from-cyan-400 to-pink-500', initial: 'Al' },
  ];

  // List of all tips
  const datingTips = [
    {
      id: 'welcome_tip',
      title: 'Bem-vinda a Sweet Amoris!',
      content: 'Fale com os garotos no corredor para ganhar afinidade. Respostas doces ou ousadas aumentam seus pontos, respostas grosseiras diminuem!',
    },
    {
      id: 'remi_likes',
      title: 'Charme do Remi',
      content: 'Remi adora mistério, cartas de tarô e atitude. Respostas ousadas e confiantes chamam sua atenção. D\'accord, chérie?',
    },
    {
      id: 'harry_likes',
      title: 'Rebeldia de Harry',
      content: 'Harry adora garotas irônicas, música e atitude desafiadora. Ele toca guitarra e ama ser provocado de volta.',
    },
    {
      id: 'maggie_likes',
      title: 'Energia da Maggie',
      content: 'Maggie é sua melhor amiga caótica no clube de artes. Apoie as ideias artísticas excêntricas dela para mantê-la animada!',
    },
    {
      id: 'kami_likes',
      title: 'Manias da Kami',
      content: 'Kami é reservada e alternativa. Ela gosta de silêncio, música grunge/gótica e de pessoas autênticas. Não seja chata ou submissa com ela!',
    },
    {
      id: 'castiel_likes',
      title: 'Gostos do Castiel',
      content: 'Castiel ama guitarras, rock pesado e garotas que dizem o que pensam sem rodeios. Evite Nathaniel perto dele!',
    },
    {
      id: 'nathaniel_likes',
      title: 'Segredos do Nathaniel',
      content: 'Nathaniel é o representante de turma. Ele é organizado, gosta de romances policiais e gatos. Seja educada e responsável.',
    },
    {
      id: 'lysandre_likes',
      title: 'Estilo do Lysandre',
      content: 'Lysandre é misterioso e ama poesia e música vitoriana. Ele é muito esquecido, então ajude-o a achar seus pertences perdidos!',
    },
  ];

  // Custom dialogues for phone call interactions
  const getCallDialogue = (characterId: string, affinity: number, stage: string): string => {
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
      // Fallback/MYSTERY_RESOLVED
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

  interface CallChoice {
    text: string;
    replyText: string;
    affinityChange?: number;
  }

  const getCallChoices = (characterId: string, affinity: number, stage: string): CallChoice[] => {
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

  const currentCharacter = contacts.find(c => c.id === activeCall?.characterId);
  const currentAffinity = affinities[activeCall?.characterId ?? ''] ?? 0;

  return (
    <div 
      onClick={togglePhone}
      className="absolute inset-0 z-50 flex items-center justify-center md:justify-end p-0 md:p-6 bg-[#0c0a1a] md:bg-black/60 backdrop-blur-sm pointer-events-auto cursor-pointer"
    >
      {/* Smartphone container */}
      <motion.div 
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 200, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 200, opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full h-[100dvh] md:w-[340px] md:h-[640px] rounded-none md:rounded-[48px] border-0 md:border-[10px] border-[#1e1c2e] bg-[#0c0a1a] shadow-none md:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col ring-0 md:ring-4 ring-purple-500/20 cursor-default"
      >
        {/* Smartphone Camera Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 rounded-full bg-[#1e1c2e] z-40 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ml-6" />
        </div>

        {/* Screen Status Bar */}
        <div className="pt-8 px-6 pb-2 flex justify-between items-center text-[10px] font-semibold text-slate-400 select-none z-30 bg-[#0d0a1c]/80 backdrop-blur-md">
          <span>15:25</span>
          <div className="flex items-center gap-1.5">
            <button onClick={toggleMute} className="hover:text-white transition-colors cursor-pointer">
              {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
            </button>
            <span>5G</span>
            <div className="w-5 h-2.5 rounded-sm border border-slate-500 p-0.5 flex items-center">
              <div className="h-full w-3.5 bg-green-500 rounded-2xs" />
            </div>
          </div>
        </div>

        {/* Main Phone Content Area */}
        <div className="flex-1 overflow-y-auto px-5 pb-6 pt-2 select-none flex flex-col">
          <AnimatePresence mode="wait">
            {/* CALL STATE SCREEN */}
            {activeCall ? (
              <motion.div
                key="call"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex-1 flex flex-col items-center justify-between py-8 text-center"
              >
                <div className="mt-8">
                  {/* Call Avatar */}
                  <div className={`w-24 h-24 rounded-full bg-gradient-to-tr ${currentCharacter?.avatarColor || 'from-purple-500 to-indigo-600'} flex items-center justify-center text-4xl font-extrabold text-white shadow-xl shadow-purple-950/40 border border-white/10 mb-4 mx-auto`}>
                    {currentCharacter?.initial}
                  </div>
                  <h2 className="text-xl font-bold text-slate-200 flex items-center justify-center gap-1">
                    {currentCharacter?.name}
                    {activeCall.status === 'connected' && currentAffinity >= 50 && (
                      <Heart size={18} className="text-pink-500 fill-pink-500 animate-pulse" />
                    )}
                  </h2>
                  <p className="text-xs text-purple-400 font-semibold tracking-widest uppercase mt-1">
                    {activeCall.status === 'ringing'
                      ? 'Chamando...'
                      : currentAffinity >= 50
                      ? 'Ligação Amorosa ❤️'
                      : 'Ligação de Amizade 💬'}
                  </p>
                </div>

                {/* Call Audio/Visual Wave or Dialogue Box */}
                <div className="w-full px-2 py-4">
                  {activeCall.status === 'ringing' ? (
                    <div className="flex gap-1 justify-center items-center h-16">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ height: [12, 36, 12] }}
                          transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
                          className="w-1 bg-pink-500 rounded-full"
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-purple-950/45 border border-pink-500/25 rounded-2xl p-4 text-sm text-slate-100 text-left leading-relaxed shadow-inner"
                      >
                        <span className="block text-[10px] font-bold text-pink-400 uppercase tracking-widest mb-1.5">
                          {callResponseText ? 'Resposta' : 'Chamada de Voz'}
                        </span>
                        &ldquo;{callResponseText || getCallDialogue(activeCall.characterId, currentAffinity, storyStage)}&rdquo;
                      </motion.div>

                      {/* Display call response choices if not chosen yet */}
                      {!callResponseText && (
                        <div className="flex flex-col gap-2">
                          {getCallChoices(activeCall.characterId, currentAffinity, storyStage).map((choice, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                const changeAffinity = useGameStore.getState().changeAffinity;
                                if (choice.affinityChange) {
                                  changeAffinity(activeCall.characterId, choice.affinityChange);
                                }
                                setSelectedCallChoice(idx);
                                setCallResponseText(choice.replyText);
                              }}
                              className="w-full text-[11px] p-2.5 rounded-xl border border-pink-500/20 hover:border-pink-500/50 bg-[#120e24]/90 hover:bg-pink-950/20 text-slate-200 hover:text-white transition-all text-left cursor-pointer font-medium"
                            >
                              {choice.text}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Call Buttons */}
                <div className="flex gap-6 justify-center w-full">
                  {activeCall.status === 'ringing' && activeCall.direction === 'incoming' ? (
                    <>
                      {/* Decline button */}
                      <button 
                        onClick={endCall}
                        className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 active:scale-95 transition-all flex items-center justify-center text-white shadow-lg shadow-red-950/40 cursor-pointer"
                      >
                        <PhoneOff size={22} />
                      </button>
                      {/* Answer button */}
                      <button 
                        onClick={answerCall}
                        className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 active:scale-95 transition-all flex items-center justify-center text-white shadow-lg shadow-green-950/40 cursor-pointer animate-bounce"
                      >
                        <Phone size={22} />
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={endCall}
                      className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 active:scale-95 transition-all flex items-center justify-center text-white shadow-lg shadow-red-950/40 cursor-pointer"
                    >
                      <PhoneOff size={22} />
                    </button>
                  )}
                </div>
              </motion.div>
            ) : (
              // APP NAVIGATION TAB VIEWS
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 flex flex-col mt-2"
              >
                {/* 1. HOME SCREEN */}
                {activeTab === 'home' && (
                  <div className="flex-1 flex flex-col justify-between py-4">
                    {/* Header welcome */}
                    <div>
                      <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent font-serif">SweetPhone</h1>
                      <p className="text-[11px] text-slate-400 mt-0.5">Conecte-se com os garotos de Sweet Amoris</p>
                    </div>

                    {/* Quick cellphone explanation */}
                    <div className="bg-[#191330] border border-pink-500/20 rounded-2xl p-3 text-left my-2 shadow-inner">
                      <span className="block text-[10px] font-bold text-pink-400 uppercase tracking-widest mb-1.5 flex items-center gap-1 select-none">
                        📱 Guia do Celular
                      </span>
                      <p className="text-[11px] text-slate-200 leading-normal">
                        • <strong>Garotos</strong>: Veja afinidades (Love-o-Meter) e faça ligações.<br/>
                        • <strong>SweetChat</strong>: Converse por chat para progredir na história.<br/>
                        • <strong>SweetGram</strong>: Acompanhe postagens e fotos dos alunos.<br/>
                        • <strong>LoveTips</strong>: Veja dicas secretas desbloqueadas com afinidade!
                      </p>
                    </div>

                    {/* App grid */}
                    <div className="grid grid-cols-2 gap-4 my-4">
                      {/* Contacts App */}
                      <button 
                        onClick={() => setActiveTab('contacts')}
                        className="aspect-square rounded-3xl bg-gradient-to-tr from-pink-500/20 to-purple-500/20 hover:from-pink-500/30 hover:to-purple-500/30 border border-pink-500/10 hover:border-pink-500/30 transition-all p-4 flex flex-col items-center justify-center gap-2 text-slate-100 group cursor-pointer shadow-lg shadow-black/30"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-pink-500/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Heart className="text-pink-400 fill-pink-400/20" size={24} />
                        </div>
                        <span className="text-xs font-semibold tracking-wider">Garotos</span>
                      </button>

                      {/* Tips App */}
                      <button 
                        onClick={() => setActiveTab('tips')}
                        className="aspect-square rounded-3xl bg-gradient-to-tr from-purple-500/20 to-indigo-500/20 hover:from-purple-500/30 hover:to-indigo-500/30 border border-purple-500/10 hover:border-purple-500/30 transition-all p-4 flex flex-col items-center justify-center gap-2 text-slate-100 group cursor-pointer shadow-lg shadow-black/30"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-purple-500/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <BookOpen className="text-purple-400" size={24} />
                        </div>
                        <span className="text-xs font-semibold tracking-wider">LoveTips</span>
                      </button>

                      {/* Gallery App */}
                      <button 
                        onClick={() => setActiveTab('gallery')}
                        className="aspect-square rounded-3xl bg-gradient-to-tr from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-amber-500/10 hover:border-amber-500/30 transition-all p-4 flex flex-col items-center justify-center gap-2 text-slate-100 group cursor-pointer shadow-lg shadow-black/30"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <ImageIcon className="text-amber-400" size={24} />
                        </div>
                        <span className="text-xs font-semibold tracking-wider">Galeria</span>
                      </button>

                      {/* SweetGram App */}
                      <button 
                        onClick={() => {
                          const playSound = useGameStore.getState().playSound;
                          playSound('click');
                          setActiveTab('sweetgram');
                        }}
                        className="col-span-2 py-3.5 px-6 rounded-3xl bg-gradient-to-r from-pink-500/20 to-purple-600/20 hover:from-pink-500/30 hover:to-purple-600/30 border border-pink-500/10 hover:border-pink-500/30 transition-all flex items-center justify-between text-slate-100 group cursor-pointer shadow-md my-0.5"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-2xl bg-pink-500/15 flex items-center justify-center group-hover:scale-105 transition-transform text-2xl">
                            📸
                          </div>
                          <div className="text-left">
                            <span className="text-xs font-bold tracking-wider block">SweetGram</span>
                            <span className="text-[10px] text-pink-300">Fotos e comentários</span>
                          </div>
                        </div>
                        <span className="text-[9px] font-bold text-pink-400 uppercase tracking-widest bg-pink-500/10 px-2.5 py-0.5 rounded-full">Social</span>
                      </button>
                    </div>

                    {/* Chat App button */}
                    <button 
                      onClick={() => setActiveTab('chat')}
                      className="w-full py-4 px-6 rounded-3xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 border border-emerald-500/10 hover:border-emerald-500/30 transition-all flex items-center justify-between text-slate-100 group cursor-pointer shadow-md my-2"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 flex items-center justify-center group-hover:scale-105 transition-transform text-2xl">
                          💬
                        </div>
                        <div className="text-left">
                          <span className="text-xs font-bold tracking-wider block">SweetChat</span>
                          <span className="text-[10px] text-emerald-300">Mensagens escolares</span>
                        </div>
                      </div>
                      {chatThreads.some(t => t.unread) && (
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse mr-2" />
                      )}
                    </button>

                    {/* Bottom Status panel */}
                    <div className="bg-[#120e24]/75 border border-slate-700/20 rounded-2xl p-4 flex items-center gap-3">
                      <Sparkles className="text-pink-400 shrink-0" size={18} />
                      <div className="text-left">
                        <span className="block text-[10px] font-bold text-pink-400 uppercase tracking-widest">Dica Rápida</span>
                        <p className="text-[11px] text-slate-300 leading-tight mt-0.5">Visite a aba SweetChat para conversar e desbloquear encontros!</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* GALLERY APP */}
                {activeTab === 'gallery' && (
                  <div className="flex-1 flex flex-col pt-2 h-full">
                    <div className="flex items-center gap-2 mb-4">
                      <button onClick={() => setActiveTab('home')} className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white cursor-pointer">
                        <ChevronLeft size={18} />
                      </button>
                      <h2 className="text-lg font-bold text-slate-200">Minhas Pinturas</h2>
                    </div>

                    <div className="flex-1 overflow-y-auto grid grid-cols-2 gap-3 pr-1 pb-20">
                      {savedPaintings.length === 0 ? (
                        <div className="col-span-2 text-center text-slate-500 text-xs py-10">
                          Nenhuma arte salva ainda.<br/>Visite a Sala de Artes!
                        </div>
                      ) : (
                        savedPaintings.map((imgUrl, idx) => (
                          <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-white/5 group">
                            <img src={imgUrl} alt={`Pintura ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* 2. CONTACTS APP */}
                {activeTab === 'contacts' && (
                  <div className="flex-1 flex flex-col pt-2">
                    <div className="flex items-center gap-2 mb-4">
                      <button onClick={() => setActiveTab('home')} className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white cursor-pointer">
                        <ChevronLeft size={18} />
                      </button>
                      <h2 className="text-lg font-bold text-slate-200">Meus Relacionamentos</h2>
                    </div>

                    {/* Contacts scroll list */}
                    <div className="flex flex-col gap-4 overflow-y-auto max-h-[460px] pr-1">
                      {contacts
                        .filter((char) => (metCharacters || []).includes(char.id))
                        .map((char) => {
                        const score = affinities[char.id] ?? 0;
                        return (
                          <div key={char.id} className="flex flex-col gap-2 p-1.5 bg-[#120e2b]/55 border border-purple-500/10 rounded-2xl shadow-sm">
                            <div className="flex items-center justify-between px-2 pt-1">
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${char.avatarColor} flex items-center justify-center font-bold text-white text-base shadow`}>
                                  {char.initial}
                                </div>
                                <span className="font-semibold text-slate-100">{char.name}</span>
                              </div>
                              
                              {/* Call Button */}
                              <button
                                onClick={() => startCall(char.id)}
                                className="w-9 h-9 rounded-xl bg-pink-500 hover:bg-pink-600 text-white flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer"
                              >
                                <Phone size={16} />
                              </button>
                            </div>
                            
                            {/* In-Phone LoveOMeter component */}
                            <LoveOMeter characterName="Afinidade" affinityScore={score} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 3. LOVETIPS DIARY APP */}
                {activeTab === 'tips' && (
                  <div className="flex-1 flex flex-col pt-2">
                    <div className="flex items-center gap-2 mb-4">
                      <button onClick={() => setActiveTab('home')} className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white cursor-pointer">
                        <ChevronLeft size={18} />
                      </button>
                      <h2 className="text-lg font-bold text-slate-200">Guia LoveTips</h2>
                    </div>

                    {/* Clues section */}
                    <div className="mb-4 bg-purple-950/20 border border-purple-500/20 rounded-2xl p-3 text-left">
                      <h3 className="font-bold text-xs text-pink-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                        🔍 Inventário de Pistas
                      </h3>
                      {cluesFound.length === 0 ? (
                        <p className="text-[10px] text-slate-400 italic">Nenhuma pista coletada ainda. Explore a escola!</p>
                      ) : (
                        <div className="flex flex-col gap-1.5">
                          {cluesFound.includes('chave_pequena') && (
                            <div className="text-[11px] text-slate-200 bg-white/5 p-2 rounded-xl border border-white/5 flex justify-between items-center">
                              <span>🔑 Chave Pequena (Quadra)</span>
                              <span className="text-[8px] text-emerald-400 font-bold">Coletado</span>
                            </div>
                          )}
                          {cluesFound.includes('gabarito_rasgado') && (
                            <div className="text-[11px] text-slate-200 bg-white/5 p-2 rounded-xl border border-white/5 flex justify-between items-center">
                              <span>📄 Gabarito Rasgado (Galpão)</span>
                              <span className="text-[8px] text-emerald-400 font-bold">Coletado</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Tips scroll list */}
                    <div className="flex flex-col gap-4 overflow-y-auto max-h-[260px] pr-1">
                      {datingTips.map((tip) => {
                        const isUnlocked = unlockedTips.includes(tip.id);
                        return (
                          <div 
                            key={tip.id} 
                            className={`p-4 rounded-2xl border transition-all duration-300 ${
                              isUnlocked 
                                ? 'bg-purple-950/20 border-purple-500/25 shadow-md shadow-purple-950/10' 
                                : 'bg-[#0b0a14]/60 border-slate-800/40 opacity-45'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <h3 className="font-bold text-sm text-slate-200 flex items-center gap-1.5">
                                <Sparkles size={14} className={isUnlocked ? 'text-pink-400' : 'text-slate-600'} />
                                {tip.title}
                              </h3>
                              <span className="text-[9px] font-bold uppercase tracking-widest text-pink-500">
                                {isUnlocked ? 'Desbloqueado' : 'Bloqueado'}
                              </span>
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed text-left">
                              {isUnlocked ? tip.content : 'Aumente afinidade com os garotos para desbloquear dicas especiais!'}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 4. SWEETCHAT APP (WhatsApp-like) */}
                {activeTab === 'chat' && (
                  <div className="flex-1 flex flex-col pt-2 h-full">
                    {!activeThreadId ? (
                      <>
                        <div className="flex items-center gap-2 mb-4">
                          <button onClick={() => setActiveTab('home')} className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white cursor-pointer">
                            <ChevronLeft size={18} />
                          </button>
                          <h2 className="text-lg font-bold text-slate-200">SweetChat</h2>
                        </div>
                        
                        {/* Threads list */}
                        <div className="flex flex-col gap-3 overflow-y-auto max-h-[460px] pr-1">
                          {chatThreads.length === 0 ? (
                            <div className="text-center text-slate-500 py-10 text-xs italic">
                              Nenhuma conversa ativa no momento...
                            </div>
                          ) : (
                            chatThreads.map((thread) => {
                              const lastMsg = thread.messages[thread.messages.length - 1];
                              return (
                                <button
                                  key={thread.characterId}
                                  onClick={() => {
                                    setActiveThreadId(thread.characterId);
                                    // Mark as read in store
                                    useGameStore.setState((s) => ({
                                      chatThreads: s.chatThreads.map(t => t.characterId === thread.characterId ? { ...t, unread: false } : t)
                                    }));
                                  }}
                                  className="w-full flex items-center justify-between p-3 rounded-2xl bg-[#120e2b]/55 hover:bg-[#191438]/70 border border-purple-500/10 hover:border-pink-500/20 transition-all text-left cursor-pointer"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${thread.avatarColor} flex items-center justify-center font-bold text-white text-base shadow`}>
                                      {thread.characterName.charAt(0)}
                                    </div>
                                    <div className="max-w-[170px]">
                                      <span className="font-semibold text-slate-100 text-sm block">{thread.characterName}</span>
                                      <span className="text-[11px] text-slate-400 truncate block mt-0.5">
                                        {lastMsg ? lastMsg.text : 'Sem mensagens'}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex flex-col items-end gap-1.5">
                                    <span className="text-[9px] text-slate-500">{lastMsg ? lastMsg.timestamp : ''}</span>
                                    {thread.unread && (
                                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                                    )}
                                  </div>
                                </button>
                              );
                            })
                          )}
                        </div>
                      </>
                    ) : (
                      // Single conversation window
                      (() => {
                        const thread = chatThreads.find(t => t.characterId === activeThreadId);
                        if (!thread) {
                          setActiveThreadId(null);
                          return null;
                        }
                        
                        // Check if last message has choices
                        const currentChoicesMsg = thread.messages.find(m => m.choices && m.choices.length > 0);
                        const hasChoices = !!currentChoicesMsg;
                        
                        return (
                          <div className="flex-1 flex flex-col h-full">
                            {/* Chat Header */}
                            <div className="flex items-center gap-3 pb-3 border-b border-slate-800/80 mb-3">
                              <button onClick={() => setActiveThreadId(null)} className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white cursor-pointer">
                                <ChevronLeft size={18} />
                              </button>
                              <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${thread.avatarColor} flex items-center justify-center font-bold text-white text-xs shadow`}>
                                {thread.characterName.charAt(0)}
                              </div>
                              <div className="text-left flex-1">
                                <span className="font-bold text-slate-200 text-sm block leading-none">{thread.characterName}</span>
                                <span className="text-[9px] text-emerald-400 font-semibold tracking-wider uppercase block mt-1">Online</span>
                              </div>
                            </div>
                            
                            {/* Message Bubble Feed */}
                            <div className="flex-1 overflow-y-auto max-h-[300px] flex flex-col gap-2.5 pr-1 mb-3">
                              {thread.messages.map((msg) => {
                                const isPlayer = msg.sender === 'player';
                                return (
                                  <div
                                    key={msg.id}
                                    className={`flex flex-col max-w-[80%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                                      isPlayer
                                        ? 'bg-gradient-to-tr from-pink-600 to-purple-600 text-white rounded-tr-none self-end text-right font-medium'
                                        : 'bg-[#181530] text-slate-100 border border-slate-700/20 rounded-tl-none self-start text-left font-medium'
                                    }`}
                                  >
                                    <p>{msg.text}</p>
                                    <span className={`text-[8px] mt-1 block ${isPlayer ? 'text-pink-200 text-right' : 'text-purple-300 text-left'}`}>
                                      {msg.timestamp}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                            
                            {/* Chat Choices or Text Input */}
                            <div className="mt-auto pt-2 border-t border-slate-800/60 bg-[#0c0a1a]">
                              {hasChoices && currentChoicesMsg.choices ? (
                                <div className="flex flex-col gap-2">
                                  <span className="block text-[9px] font-bold text-pink-400 uppercase tracking-widest text-center">
                                    Escolha sua resposta
                                  </span>
                                  {currentChoicesMsg.choices.map((choice, idx) => (
                                    <button
                                      key={idx}
                                      onClick={() => {
                                        const selectChatChoice = useGameStore.getState().selectChatChoice;
                                        selectChatChoice(thread.characterId, idx);
                                      }}
                                      className="w-full text-[11px] p-2.5 rounded-xl border border-pink-500/20 hover:border-pink-500/50 bg-[#120e24] hover:bg-pink-950/20 text-slate-200 hover:text-white transition-all text-left cursor-pointer font-medium"
                                    >
                                      {choice.text}
                                    </button>
                                  ))}
                                </div>
                              ) : (
                                <form
                                  onSubmit={(e) => {
                                    e.preventDefault();
                                    if (!inputText.trim()) return;
                                    const sendChatMessage = useGameStore.getState().sendChatMessage;
                                    sendChatMessage(thread.characterId, inputText);
                                    setInputText('');
                                  }}
                                  className="flex gap-2 items-center"
                                >
                                  <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    placeholder="Digite uma mensagem..."
                                    className="flex-1 bg-[#120e24] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 outline-none focus:border-pink-500/40"
                                  />
                                  <button
                                    type="submit"
                                    className="px-3 py-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold transition-colors cursor-pointer"
                                  >
                                    Enviar
                                  </button>
                                </form>
                              )}
                            </div>
                          </div>
                        );
                      })()
                    )}
                  </div>
                )}

                {/* 5. SWEETGRAM APP */}
                {activeTab === 'sweetgram' && (
                  <SweetGramApp onBack={() => setActiveTab('home')} />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Home Indicator bar */}
        <div className="py-2.5 flex justify-center bg-[#0c0a1a] border-t border-slate-900 z-30">
          <button 
            onClick={() => {
              if (activeCall) {
                endCall();
              }
              if (activeTab !== 'home') setActiveTab('home');
              else togglePhone();
            }}
            className="w-32 h-1.5 rounded-full bg-slate-500/40 hover:bg-slate-400 transition-colors cursor-pointer"
          />
        </div>
      </motion.div>

      {/* Floating Close Button outside the phone frame */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          togglePhone();
        }}
        className="absolute top-6 left-6 md:top-12 md:left-12 p-3 rounded-full bg-[#120e24]/90 hover:bg-[#1b1736]/90 border border-pink-500/40 text-slate-200 hover:text-white transition-all cursor-pointer z-50 flex items-center gap-2 font-bold shadow-lg shadow-black/55 backdrop-blur-md"
        title="Fechar Celular"
      >
        <X size={18} className="text-pink-400 animate-pulse" />
        <span className="text-xs uppercase tracking-wider text-slate-200">Voltar para o Jogo</span>
      </button>
    </div>
  );
};
