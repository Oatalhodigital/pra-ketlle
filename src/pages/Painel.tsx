import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { config } from '../config';
import { Botao } from '../components/Botao';
import { perguntas } from '../data/perguntas';

interface RespostaPlanilha {
  dataHora: string;
  idSessao: string;
  [key: string]: any;
}

export function Painel() {
  const [chave, setChave] = useState(() => {
    try {
      return localStorage.getItem('painel-chave') || '';
    } catch {
      return '';
    }
  });
  const [autenticado, setAutenticado] = useState(false);
  const [respostas, setRespostas] = useState<RespostaPlanilha[]>([]);
  const [envioSelecionado, setEnvioSelecionado] = useState<number | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (chave) {
      handleAutenticar();
    }
  }, []);

  const handleAutenticar = async () => {
    if (!chave.trim()) {
      setErro('Digite a chave de acesso');
      return;
    }

    setCarregando(true);
    setErro('');

    try {
      const url = `${config.scriptUrl}?acao=listar&chave=${encodeURIComponent(chave)}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.erro) {
        setErro('Chave incorreta');
        setAutenticado(false);
      } else {
        setAutenticado(true);
        setRespostas(data.respostas || []);
        localStorage.setItem('painel-chave', chave);
      }
    } catch (e) {
      setErro('Erro ao conectar. Verifique a URL do Apps Script.');
      console.error(e);
    } finally {
      setCarregando(false);
    }
  };

  const handleAtualizar = async () => {
    await handleAutenticar();
  };

  const handleCopiarTudo = () => {
    if (envioSelecionado === null) return;

    const resposta = respostas[envioSelecionado];
    let texto = `Respostas do quiz - ${new Date(resposta.dataHora).toLocaleString('pt-BR')}\n\n`;

    perguntas.forEach((pergunta) => {
      const chavePergunta = `pergunta_${pergunta.id}`;
      const valor = resposta[chavePergunta];
      const outro = resposta[`${chavePergunta}_outro`];

      texto += `${pergunta.emoji} ${pergunta.texto}\n`;
      if (valor) {
        texto += `Resposta: ${valor}\n`;
      }
      if (outro) {
        texto += `Outra: ${outro}\n`;
      }
      texto += '\n';
    });

    navigator.clipboard.writeText(texto);
    alert('Copiado para a área de transferência!');
  };

  const handleBaixarJSON = () => {
    if (envioSelecionado === null) return;

    const resposta = respostas[envioSelecionado];
    const blob = new Blob([JSON.stringify(resposta, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `respostas-${resposta.idSessao}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Atualização automática a cada 30 segundos
  useEffect(() => {
    if (autenticado) {
      const interval = setInterval(handleAtualizar, 30000);
      return () => clearInterval(interval);
    }
  }, [autenticado, chave]);

  if (!autenticado) {
    return (
      <div className="min-h-screen bg-creme flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-lg max-w-md w-full"
        >
          <h1 className="text-2xl font-serif text-vinho mb-4 text-center">Painel do {config.nomeRemetente}</h1>
          <p className="text-gray-600 mb-4 text-center">Digite a chave de acesso</p>
          <input
            type="password"
            value={chave}
            onChange={(e) => setChave(e.target.value)}
            placeholder="Chave secreta"
            className="w-full p-4 border-2 border-gray-200 rounded-xl mb-4 focus:border-rosa-queimado focus:outline-none"
            onKeyPress={(e) => e.key === 'Enter' && handleAutenticar()}
          />
          {erro && <p className="text-red-500 text-sm mb-4">{erro}</p>}
          <Botao onClick={handleAutenticar} disabled={carregando}>
            {carregando ? 'Carregando...' : 'Acessar'}
          </Botao>
        </motion.div>
      </div>
    );
  }

  const respostaSelecionada = envioSelecionado !== null ? respostas[envioSelecionado] : null;
  const blocos = Array.from(new Set(perguntas.map((p) => p.bloco)));

  return (
    <div className="min-h-screen bg-creme p-4">
      <div className="max-w-2xl mx-auto pt-8 pb-24">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-serif text-vinho">Painel do {config.nomeRemetente}</h1>
          <div className="flex gap-2">
            <Botao onClick={handleAtualizar} disabled={carregando} variante="secundario">
              {carregando ? '...' : 'Atualizar'}
            </Botao>
          </div>
        </div>

        {respostas.length === 0 ? (
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <p className="text-gray-600">Nenhuma resposta ainda.</p>
          </div>
        ) : (
          <>
            {respostas.length > 1 && (
              <div className="bg-white rounded-2xl p-4 shadow-lg mb-4">
                <h3 className="font-semibold text-vinho mb-2">Envios ({respostas.length})</h3>
                <div className="space-y-2">
                  {respostas.map((r, i) => (
                    <button
                      key={r.idSessao}
                      onClick={() => setEnvioSelecionado(i)}
                      className={`w-full p-3 text-left rounded-lg transition-all ${
                        envioSelecionado === i ? 'bg-rosa-queimado/10 border-2 border-rosa-queimado' : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <p className="text-sm font-medium">
                        {new Date(r.dataHora).toLocaleString('pt-BR')}
                      </p>
                      <p className="text-xs text-gray-500">Sessão: {r.idSessao}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {respostaSelecionada && (
              <>
                <div className="bg-white rounded-2xl p-4 shadow-lg mb-4">
                  <p className="text-sm text-gray-600">
                    Respondido em: {new Date(respostaSelecionada.dataHora).toLocaleString('pt-BR')}
                  </p>
                </div>

                {blocos.map((bloco) => {
                  const perguntasBloco = perguntas.filter((p) => p.bloco === bloco);
                  return (
                    <div key={bloco} className="mb-6">
                      <h2 className="text-xl font-serif text-rosa-queimado mb-3">
                        {perguntasBloco[0].emoji} {bloco}
                      </h2>
                      <div className="space-y-3">
                        {perguntasBloco.map((pergunta) => {
                          const chavePergunta = `pergunta_${pergunta.id}`;
                          const valor = respostaSelecionada[chavePergunta];
                          const outro = respostaSelecionada[`${chavePergunta}_outro`];

                          return (
                            <div key={pergunta.id} className="bg-white rounded-xl p-4 shadow">
                              <p className="font-medium text-gray-800 mb-2">{pergunta.texto}</p>
                              <p className="text-vinho">{valor || '-'}</p>
                              {outro && <p className="text-sm text-gray-600 mt-1">Outra: {outro}</p>}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}

                <div className="flex gap-4 mt-6">
                  <Botao onClick={handleCopiarTudo}>Copiar tudo</Botao>
                  <Botao onClick={handleBaixarJSON} variante="secundario">
                    Baixar JSON
                  </Botao>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
