export const config = {
  // Nome da pessoa que vai responder
  nomeDestinatario: 'Ketlle',

  // Nome do remetente
  nomeRemetente: 'Leandro',

  // Número do WhatsApp do remetente (formato: 55XXXXXXXXXXX, sem + ou traços)
  whatsappNumero: '5531982606442',

  // URL do Google Apps Script (configure nos GitHub Secrets como VITE_SCRIPT_URL)
  // Para desenvolvimento local, pode deixar vazio - as respostas vão só pelo WhatsApp
  scriptUrl: import.meta.env.VITE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycby1ChCvGq3cKzDMGteqzl1eyC8EMD3CfkA2a6DabwcrNR_7PH4sTHRobpArrhEsdXIP/exec',

  // Mensagem final que aparece na tela surpresa
  mensagemFinal: 'Obrigado por responder tudo, Ketlle. Agora eu sei um pouquinho mais dos seus sonhos… e quero realizar cada um deles do seu lado. Com amor, Leandro. ❤️',

  // Caminho da música de fundo (opcional)
  // Coloque o arquivo em public/musicas/ e configure aqui
  musicaFundo: '', // ex.: import.meta.env.BASE_URL + 'musicas/nossa-musica.mp3'

  // Fotos do casal (coloque em public/fotos/)
  fotos: [
    import.meta.env.BASE_URL + 'fotos/foto1.jpg',
    import.meta.env.BASE_URL + 'fotos/foto2.jpg',
    import.meta.env.BASE_URL + 'fotos/foto3.jpg',
    import.meta.env.BASE_URL + 'fotos/foto4.jpg',
  ],

  // Cores do tema
  cores: {
    primaria: '#C05621', // rosa queimado
    secundaria: '#722F37', // vinho
    fundo: '#F5F5DC', // creme
    destaque: '#D4AF37', // dourado suave
  },
};
