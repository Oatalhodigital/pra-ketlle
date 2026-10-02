import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { config } from '../config';
import { Botao } from '../components/Botao';
import { FloatingHearts } from '../components/FloatingHearts';
import type { Resposta } from '../data/perguntas';
import { perguntas } from '../data/perguntas';

interface FinalProps {
  respostas: Map<number, Resposta>;
  outrasRespostas: Map<number, string>;
}

export function Final({ respostas, outrasRespostas }: FinalProps) {
  const [fotosVisiveis, setFotosVisiveis] = useState(false);
  const [fotoAmpliada, setFotoAmpliada] = useState<number | null>(null);
  const [musicaTocando, setMusicaTocando] = useState(false);
  const [audio] = useState(() => {
    if (config.musicaFundo) {
      const audio = new Audio(config.musicaFundo);
      audio.loop = true;
      return audio;
    }
    return null;
  });

  useEffect(() => {
    // Explosão de confetes em formato de coração
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#C05621', '#722F37', '#D4AF37', '#FF69B4'],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#C05621', '#722F37', '#D4AF37', '#FF69B4'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();

    // Mostrar fotos após 1 segundo
    setTimeout(() => setFotosVisiveis(true), 1000);
  }, []);

  const handleTocarMusica = () => {
    if (audio) {
      if (musicaTocando) {
        audio.pause();
      } else {
        audio.play();
      }
      setMusicaTocando(!musicaTocando);
    }
  };

  const perguntasOrdenadas = Array.from(respostas.entries())
    .map(([id, resp]) => ({ id, resp }))
    .sort((a, b) => a.id - b.id);

  const gerarMensagemWhatsApp = () => {
    let mensagem = `Oi ${config.nomeRemetente}! ❤️\n\nAqui estão minhas respostas do quiz:\n\n`;

    perguntasOrdenadas.forEach(({ id }) => {
      const pergunta = perguntas.find((p) => p.id === id);
      const resposta = respostas.get(id);
      if (resposta && pergunta) {
        mensagem += `${pergunta.emoji} ${pergunta.texto}\n`;
        if (Array.isArray(resposta.valor)) {
          mensagem += `Resposta: ${resposta.valor.join(', ')}\n`;
        } else {
          mensagem += `Resposta: ${resposta.valor}\n`;
        }
        const outro = outrasRespostas.get(id);
        if (outro) {
          mensagem += `Outra: ${outro}\n`;
        }
        mensagem += '\n';
      }
    });

    mensagem += '\nCom amor, ' + config.nomeDestinatario + ' 💕';

    return encodeURIComponent(mensagem);
  };

  return (
    <div className="min-h-screen bg-creme p-4 relative">
      <FloatingHearts />

      <div className="max-w-lg mx-auto pt-8 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-serif text-vinho mb-4">
            Parabéns, {config.nomeDestinatario}! 🎉
          </h1>
          <p className="text-lg text-gray-700 whitespace-pre-line">
            {config.mensagemFinal}
          </p>
        </motion.div>

        <AnimatePresence>
          {fotosVisiveis && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-2 gap-4 mb-8"
            >
              {config.fotos.map((foto, index) => (
                <motion.div
                  key={foto}
                  initial={{ opacity: 0, rotate: -10, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: (index % 2 === 0 ? 3 : -3), scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="relative aspect-square"
                  onClick={() => setFotoAmpliada(index)}
                >
                  <div className="w-full h-full bg-white p-3 shadow-lg transform rotate-0 hover:rotate-0 transition-transform cursor-pointer">
                    <img
                      src={foto}
                      alt={`Foto ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {config.musicaFundo && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleTocarMusica}
            className="fixed bottom-24 right-4 bg-vinho text-white p-4 rounded-full shadow-lg z-10"
          >
            {musicaTocando ? '⏸️' : '🎵'}
          </motion.button>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <Botao
            onClick={() => {
              const url = `https://wa.me/${config.whatsappNumero}?text=${gerarMensagemWhatsApp()}`;
              window.open(url, '_blank');
            }}
          >
            Mandar minhas respostas pro {config.nomeRemetente} 💌
          </Botao>
        </motion.div>
      </div>

      <AnimatePresence>
        {fotoAmpliada !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFotoAmpliada(null)}
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 cursor-pointer"
          >
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              src={config.fotos[fotoAmpliada]}
              alt="Foto ampliada"
              className="max-w-full max-h-full object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
