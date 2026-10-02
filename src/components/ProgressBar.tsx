interface ProgressBarProps {
  atual: number;
  total: number;
}

export function ProgressBar({ atual, total }: ProgressBarProps) {
  const porcentagem = (atual / total) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
      <div
        className="bg-rosa-queimado h-2 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${porcentagem}%` }}
      />
    </div>
  );
}
