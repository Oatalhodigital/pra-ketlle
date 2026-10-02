import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { perguntas } from '../data/perguntas';
import type { Resposta } from '../data/perguntas';
import { config } from '../config';
import { PerguntaCard } from '../components/PerguntaCard';
import { ProgressBar } from '../components/ProgressBar';
import { Botao } from '../components/Botao';
import { FloatingHearts } from '../components/FloatingHearts';

const STORAGE_KEY = 'quiz-progress';
const SESSION_KEY = 'quiz-session';

interface QuizProps {
  onConcluido?: (respostas: Map<number, Resposta>, outrasRespostas: Map<number, string>) => void;
}

export function Quiz({ onConcluido }: QuizProps) {
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [respostas, setRespostas] = useState<Map<number, Resposta>>(new Map());
  const [outrasRespostas, setOutrasRespostas] = useState<Map<number, string>>(new Map());
  const [enviando, setEnviando] = useState(false);
  const [concluido, setConcluido] = useState(false);
  const [idSessao] = useState(() => {
    const existing = localStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const newId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    localStorage.setItem(SESSION_KEY, newId);
    return newId;
  });

  // Carregar progresso do localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        setIndiceAtual(data.indice || 0);
        setRespostas(new Map(data.respostas || []));
        setOutrasRespostas(new Map(data.outras || []));
      }
    } catch (e) {
      console.error('Erro ao carregar progresso:', e);
    }
  }, []);

  // Salvar progresso no localStorage
  useEffect(() => {
    try {
      const data = {
        indice: indiceAtual,
        respostas: Array.from(respostas.entries()),
        outras: Array.from(outrasRespostas.entries()),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Erro ao salvar progresso:', e);
    }
  }, [indiceAtual, respostas, outrasRespostas]);

  const perguntaAtual = perguntas[indiceAtual];
  const respostaAtual = respostas.get(perguntaAtual.id);
  const outroAtual = outrasRespostas.get(perguntaAtual.id);

  const isRespostaValida = () => {
    if (!respostaAtual) return false;
    if (perguntaAtual.tipo === 'multipla_selecao') {
      return Array.isArray(respostaAtual.valor) && respostaAtual.valor.length > 0;
    }
    if (perguntaAtual.tipo === 'texto') {
      return typeof respostaAtual.valor === 'string' && respostaAtual.valor.trim().length > 0;
    }
    if (respostaAtual.valor === 'Outra...') {
      return outroAtual && outroAtual.trim().length > 0;
    }
    return true;
  };

  const handleRespostaChange = (valor: string | string[] | number) => {
    setRespostas(new Map(respostas.set(perguntaAtual.id, { perguntaId: perguntaAtual.id, valor })));
  };

  const handleOutroChange = (valor: string) => {
    setOutrasRespostas(new Map(outrasRespostas.set(perguntaAtual.id, valor)));
  };

  const handleProximo = () => {
    if (indiceAtual < perguntas.length - 1) {
      setIndiceAtual(indiceAtual + 1);
    } else {
      handleEnviar();
    }
  };

  const handleVoltar = () => {
    if (indiceAtual > 0) {
      setIndiceAtual(indiceAtual - 1);
    }
  };

  const handleEnviar = async () => {
    setEnviando(true);

    const dados = {
      idSessao,
      dataHora: new Date().toISOString(),
      respostas: Array.from(respostas.entries()).map(([id, resp]) => ({
        perguntaId: id,
        valor: resp.valor,
        outro: outrasRespostas.get(id),
      })),
    };

    // Enviar para o Apps Script
    if (config.scriptUrl) {
      try {
        await fetch(config.scriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain',
          },
          body: JSON.stringify(dados),
        });
      } catch (e) {
        console.error('Erro ao enviar:', e);
      }
    }

    // Limpar localStorage
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Erro ao limpar localStorage:', e);
    }

    setEnviando(false);
    setConcluido(true);

    // Chamar callback se fornecido
    if (onConcluido) {
      onConcluido(respostas, outrasRespostas);
    }
  };

  // Tela de abertura
  if (indiceAtual === 0 && !respostaAtual && !concluido) {
    return (
      <div className="min-h-screen bg-creme flex flex-col items-center justify-center p-6 relative">
        <FloatingHearts />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <h1 className="text-4xl font-serif text-vinho mb-4">
            Oi, {config.nomeDestinatario} 💌
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            O {config.nomeRemetente} fez uma coisa só pra você… responde com sinceridade, tá?
          </p>
          <Botao onClick={() => setIndiceAtual(1)}>Bora começar</Botao>
        </motion.div>
      </div>
    );
  }

  // Tela de envio
  if (enviando) {
    return (
      <div className="min-h-screen bg-creme flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: [1, 1.2, 1], opacity: 1 }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="text-8xl mb-4"
        >
          ❤️
        </motion.div>
        <p className="text-2xl font-serif text-vinho">Enviando suas respostas…</p>
      </div>
    );
  }

  // Tela final (será redirecionada para a página de surpresa)
  if (concluido) {
    return (
      <div className="min-h-screen bg-creme flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-2xl font-serif text-vinho mb-4">Tudo pronto!</p>
          <p className="text-lg text-gray-700">Carregando surpresa…</p>
        </motion.div>
      </div>
    );
  }

  // Tela do quiz
  return (
    <div className="min-h-screen bg-creme p-4 pb-24">
      <FloatingHearts />
      <div className="max-w-lg mx-auto pt-8">
        <ProgressBar atual={indiceAtual + 1} total={perguntas.length} />
        <div className="mb-4">
          <span className="text-sm text-gray-500">
            {indiceAtual + 1}/{perguntas.length}
          </span>
          <h3 className="text-lg font-serif text-rosa-queimado">
            {perguntaAtual.emoji} {perguntaAtual.bloco}
          </h3>
        </div>

        <AnimatePresence mode="wait">
          <PerguntaCard
            key={perguntaAtual.id}
            tipo={perguntaAtual.tipo}
            texto={perguntaAtual.texto}
            opcoes={perguntaAtual.opcoes}
            valor={respostaAtual?.valor || (perguntaAtual.tipo === 'multipla_selecao' ? [] : '')}
            onChange={handleRespostaChange}
            outro={outroAtual}
            onChangeOutro={handleOutroChange}
            disabled={enviando}
          />
        </AnimatePresence>

        <div className="flex gap-4 mt-6">
          <Botao
            onClick={handleVoltar}
            disabled={indiceAtual === 0 || enviando}
            variante="secundario"
          >
            Voltar
          </Botao>
          <Botao
            onClick={handleProximo}
            disabled={!isRespostaValida() || enviando}
          >
            {indiceAtual === perguntas.length - 1 ? 'Finalizar' : 'Próxima'}
          </Botao>
        </div>
      </div>
    </div>
  );
}
