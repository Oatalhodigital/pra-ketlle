import { OpcaoItem } from './OpcaoItem';

interface MultiplaSelecaoProps {
  opcoes: string[];
  selecionados: string[];
  onSelect: (opcao: string) => void;
  disabled?: boolean;
}

export function MultiplaSelecao({ opcoes, selecionados, onSelect, disabled }: MultiplaSelecaoProps) {
  return (
    <div className="space-y-3">
      {opcoes.map((opcao) => (
        <OpcaoItem
          key={opcao}
          texto={opcao}
          selecionado={selecionados.includes(opcao)}
          onClick={() => onSelect(opcao)}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
