import { useState, useEffect } from 'react';
import { Quiz } from './pages/Quiz';
import { Final } from './pages/Final';
import { Painel } from './pages/Painel';
import type { Resposta } from './data/perguntas';

const STORAGE_KEY = 'quiz-progress';
const SESSION_KEY = 'quiz-session';

function App() {
  const [mostrarFinal, setMostrarFinal] = useState(false);
  const [respostas, setRespostas] = useState<Map<number, Resposta>>(new Map());
  const [outrasRespostas, setOutrasRespostas] = useState<Map<number, string>>(new Map());

  useEffect(() => {
    // Verificar se o quiz já foi concluído
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        // Se não há progresso salvo, verificar se há sessão anterior
        const session = localStorage.getItem(SESSION_KEY);
        if (session) {
          // Se há sessão mas não progresso, pode ser que tenha sido concluído
          // Neste caso, mostramos a tela inicial normalmente
        }
      }
    } catch (e) {
      console.error('Erro ao verificar estado:', e);
    }
  }, []);

  const handleQuizConcluido = (resp: Map<number, Resposta>, outras: Map<number, string>) => {
    setRespostas(resp);
    setOutrasRespostas(outras);
    setMostrarFinal(true);
  };

  // Roteamento simples baseado em path
  const path = window.location.pathname;

  if (path.replace(/\/+$/, '').endsWith('/painel') || window.location.hash === '#painel') {
    return <Painel />;
  }

  if (mostrarFinal) {
    return <Final respostas={respostas} outrasRespostas={outrasRespostas} />;
  }

  return <Quiz onConcluido={handleQuizConcluido} />;
}

export default App;
