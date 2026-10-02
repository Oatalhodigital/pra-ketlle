interface CampoTextoProps {
  valor: string;
  onChange: (valor: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function CampoTexto({ valor, onChange, placeholder, disabled }: CampoTextoProps) {
  return (
    <textarea
      value={valor}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className="w-full p-4 border-2 border-gray-200 rounded-xl resize-none focus:border-rosa-queimado focus:outline-none min-h-[120px] text-lg"
      style={{ minHeight: '120px' }}
    />
  );
}
