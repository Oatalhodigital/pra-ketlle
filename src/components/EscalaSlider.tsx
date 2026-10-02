import { motion } from 'framer-motion';

interface EscalaSliderProps {
  valor: number;
  onChange: (valor: number) => void;
  disabled?: boolean;
}

const emojis = ['😢', '😕', '😐', '🙂', '😊', '😄', '😁', '🥰', '😍', '🤩'];

export function EscalaSlider({ valor, onChange, disabled }: EscalaSliderProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <motion.span
          key={valor}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-6xl"
        >
          {emojis[valor]}
        </motion.span>
        <p className="text-3xl font-bold text-rosa-queimado mt-2">{valor}/10</p>
      </div>
      <input
        type="range"
        min="0"
        max="9"
        value={valor}
        onChange={(e) => onChange(parseInt(e.target.value))}
        disabled={disabled}
        className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rosa-queimado"
        style={{ minHeight: '44px' }}
      />
      <div className="flex justify-between text-sm text-gray-500">
        <span>Pouco</span>
        <span>Muito</span>
      </div>
    </div>
  );
}
