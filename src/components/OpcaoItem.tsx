import { motion } from 'framer-motion';

interface OpcaoItemProps {
  texto: string;
  selecionado: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export function OpcaoItem({ texto, selecionado, onClick, disabled }: OpcaoItemProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full p-4 text-left rounded-xl border-2 transition-all
        ${selecionado
          ? 'border-rosa-queimado bg-rosa-queimado/10 text-rosa-queimado'
          : 'border-gray-200 bg-white text-gray-700 hover:border-rosa-queimado/50'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        min-h-[44px]
      `}
    >
      <span className="text-lg">{texto}</span>
    </motion.button>
  );
}
