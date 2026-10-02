export type TipoPergunta = 'multipla_escolha' | 'multipla_selecao' | 'escala' | 'texto';

export interface Pergunta {
  id: number;
  bloco: string;
  emoji: string;
  tipo: TipoPergunta;
  texto: string;
  opcoes?: string[];
}

export const perguntas: Pergunta[] = [
  // Bloco 1: Dates 🍷
  {
    id: 1,
    bloco: 'Dates',
    emoji: '🍷',
    tipo: 'multipla_escolha',
    texto: 'Qual é o date perfeito pra você?',
    opcoes: ['Jantar romântico', 'Cinema + pipoca', 'Piquenique ao ar livre', 'Noite de filme em casa', 'Barzinho com música ao vivo'],
  },
  {
    id: 2,
    bloco: 'Dates',
    emoji: '🍷',
    tipo: 'multipla_escolha',
    texto: 'Você prefere date planejado ou surpresa?',
    opcoes: ['Quero saber de tudo antes', 'Me surpreende!', 'Um pouco de cada'],
  },
  {
    id: 3,
    bloco: 'Dates',
    emoji: '🍷',
    tipo: 'multipla_selecao',
    texto: 'Que comidas não podem faltar num date nosso?',
    opcoes: ['Japonesa', 'Hambúrguer', 'Pizza', 'Massas', 'Churrasco', 'Doces e sobremesa'],
  },
  {
    id: 4,
    bloco: 'Dates',
    emoji: '🍷',
    tipo: 'escala',
    texto: 'De 0 a 10, o quanto você gostaria que a gente tivesse mais dates só nossos?',
  },

  // Bloco 2: Lugares pra gente ir 📍
  {
    id: 5,
    bloco: 'Lugares pra gente ir',
    emoji: '📍',
    tipo: 'multipla_escolha',
    texto: 'Praia ou montanha?',
    opcoes: ['Praia, sempre', 'Montanha e friozinho', 'Os dois', 'Cidade grande'],
  },
  {
    id: 6,
    bloco: 'Lugares pra gente ir',
    emoji: '📍',
    tipo: 'texto',
    texto: 'Qual lugar aqui perto você tem vontade de conhecer comigo?',
  },
  {
    id: 7,
    bloco: 'Lugares pra gente ir',
    emoji: '📍',
    tipo: 'multipla_escolha',
    texto: 'Nossa próxima viagem deveria ser para…',
    opcoes: ['Nordeste', 'Serra Gaúcha', 'Rio de Janeiro', 'Exterior', 'Um lugar que a gente sorteie'],
  },
  {
    id: 8,
    bloco: 'Lugares pra gente ir',
    emoji: '📍',
    tipo: 'multipla_selecao',
    texto: 'Que tipo de rolê você mais curte?',
    opcoes: ['Restaurante novo', 'Show ou festival', 'Parque', 'Shopping', 'Café charmoso', 'Barzinho'],
  },

  // Bloco 3: Coisas pra fazer comigo ✨
  {
    id: 9,
    bloco: 'Coisas pra fazer comigo',
    emoji: '✨',
    tipo: 'multipla_selecao',
    texto: 'Coisas que você quer fazer comigo pelo menos uma vez:',
    opcoes: ['Viagem internacional', 'Ver o nascer do sol juntos', 'Acampar', 'Fazer um curso juntos', 'Cozinhar algo difícil', 'Fazer uma tatuagem juntos', 'Andar de balão'],
  },
  {
    id: 10,
    bloco: 'Coisas pra fazer comigo',
    emoji: '✨',
    tipo: 'multipla_escolha',
    texto: 'Um hobby novo pra gente ter juntos:',
    opcoes: ['Academia', 'Dançar', 'Cozinhar', 'Jogos', 'Trilhas', 'Fotografia'],
  },
  {
    id: 11,
    bloco: 'Coisas pra fazer comigo',
    emoji: '✨',
    tipo: 'texto',
    texto: 'Descreve o nosso fim de semana perfeito, do jeitinho que você imagina.',
  },
  {
    id: 12,
    bloco: 'Coisas pra fazer comigo',
    emoji: '✨',
    tipo: 'texto',
    texto: 'Tem alguma coisa que você sempre quis fazer e ainda não teve coragem ou oportunidade?',
  },

  // Bloco 4: Sonhos e futuro 🌙
  {
    id: 13,
    bloco: 'Sonhos e futuro',
    emoji: '🌙',
    tipo: 'texto',
    texto: 'Qual é o seu maior sonho hoje?',
  },
  {
    id: 14,
    bloco: 'Sonhos e futuro',
    emoji: '🌙',
    tipo: 'multipla_escolha',
    texto: 'Como você imagina a gente daqui a 5 anos?',
    opcoes: ['Morando juntos', 'Casados', 'Com filhos', 'Viajando o mundo', 'Crescendo na carreira, lado a lado'],
  },
  {
    id: 15,
    bloco: 'Sonhos e futuro',
    emoji: '🌙',
    tipo: 'multipla_escolha',
    texto: 'Filhos?',
    opcoes: ['Quero sim', 'Talvez, mais pra frente', 'Pet já tá ótimo', 'Não quero', 'Ainda não sei'],
  },
  {
    id: 16,
    bloco: 'Sonhos e futuro',
    emoji: '🌙',
    tipo: 'texto',
    texto: 'Como seria a casa dos seus sonhos para a gente?',
  },

  // Bloco 5: Visão de relacionamento 💞
  {
    id: 17,
    bloco: 'Visão de relacionamento',
    emoji: '💞',
    tipo: 'multipla_selecao',
    texto: 'O que é essencial pra você num relacionamento?',
    opcoes: ['Confiança', 'Comunicação', 'Respeito', 'Parceria', 'Admiração', 'Bom humor', 'Liberdade'],
  },
  {
    id: 18,
    bloco: 'Visão de relacionamento',
    emoji: '💞',
    tipo: 'multipla_escolha',
    texto: 'Quando a gente discorda, o que funciona melhor pra você?',
    opcoes: ['Conversar na hora', 'Dar um tempinho e conversar depois', 'Um abraço antes de tudo', 'Escrever o que sente'],
  },
  {
    id: 19,
    bloco: 'Visão de relacionamento',
    emoji: '💞',
    tipo: 'texto',
    texto: 'Que tradição de casal você gostaria que a gente criasse?',
  },
  {
    id: 20,
    bloco: 'Visão de relacionamento',
    emoji: '💞',
    tipo: 'texto',
    texto: 'Em uma frase: o que um relacionamento precisa ter pra durar a vida toda?',
  },
];

export interface Resposta {
  perguntaId: number;
  valor: string | string[] | number;
  outro?: string;
}
