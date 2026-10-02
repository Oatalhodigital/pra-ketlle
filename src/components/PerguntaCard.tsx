import { motion } from 'framer-motion';
import type { TipoPergunta } from '../data/perguntas';
import { OpcaoItem } from './OpcaoItem';
import { MultiplaSelecao } from './MultiplaSelecao';
import { EscalaSlider } from './EscalaSlider';
import { CampoTexto } from './CampoTexto';

interface PerguntaCardProps {
  tipo: TipoPergunta;
  texto: string;
  opcoes?: string[];
  valor: string | string[] | number;
  onChange: (valor: string | string[] | number) => void;
  outro?: string;
  onChangeOutro: (valor: string) => void;
  disabled?: boolean;
}

export function PerguntaCard({
  tipo,
  texto,
  opcoes,
  valor,
  onChange,
  outro,
  onChangeOutro,
  disabled,
}: PerguntaCardProps) {
  const temOutro = outro !== undefined;

  const handleOutroClick = () => {
    if (tipo === 'multipla_escolha') {
      onChange('Outra...');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-2xl p-6 shadow-lg"
    >
      <h2 className="text-2xl font-serif text-vinho mb-6">{texto}</h2>

      {tipo === 'multipla_escolha' && opcoes && (
        <div className="space-y-3">
          {opcoes.map((opcao) => (
            <OpcaoItem
              key={opcao}
              texto={opcao}
              selecionado={valor === opcao}
              onClick={() => onChange(opcao)}
              disabled={disabled}
            />
          ))}
          <OpcaoItem
            texto="Outra…"
            selecionado={valor === 'Outra...'}
            onClick={handleOutroClick}
            disabled={disabled}
          />
          {valor === 'Outra...' && (
            <CampoTexto
              valor={outro || ''}
              onChange={onChangeOutro}
              placeholder="Escreva sua resposta..."
              disabled={disabled}
            />
          )}
        </div>
      )}

      {tipo === 'multipla_selecao' && opcoes && (
        <div className="space-y-3">
          <MultiplaSelecao
            opcoes={opcoes}
            selecionados={valor as string[]}
            onSelect={(opcao) => {
              const selecionados = valor as string[];
              if (selecionados.includes(opcao)) {
                onChange(selecionados.filter((s) => s !== opcao));
              } else {
                onChange([...selecionados, opcao]);
              }
            }}
            disabled={disabled}
          />
          <OpcaoItem
            texto="Outra…"
            selecionado={temOutro && outro !== ''}
            onClick={() => {}}
            disabled={disabled}
          />
          {temOutro && (
            <CampoTexto
              valor={outro || ''}
              onChange={onChangeOutro}
              placeholder="Escreva sua resposta..."
              disabled={disabled}
            />
          )}
        </div>
      )}

      {tipo === 'escala' && (
        <EscalaSlider valor={valor as number} onChange={onChange as (v: number) => void} disabled={disabled} />
      )}

      {tipo === 'texto' && (
        <CampoTexto
          valor={valor as string}
          onChange={onChange as (v: string) => void}
          placeholder="Sua resposta..."
          disabled={disabled}
        />
      )}
    </motion.div>
  );
}
