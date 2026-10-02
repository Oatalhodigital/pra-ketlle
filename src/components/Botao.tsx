import { motion } from 'framer-motion';

interface BotaoProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  variante?: 'primario' | 'secundario';
}

export function Botao({ onClick, children, disabled, variante = 'primario' }: BotaoProps) {
  const estilos = {
    primario: 'bg-rosa-queimado text-white hover:bg-rosa-queimado/90',
    secundario: 'bg-vinho text-white hover:bg-vinho/90',
  };

  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all
        ${estilos[variante]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        min-h-[54px]
      `}
    >
      {children}
    </motion.button>
  );
}
