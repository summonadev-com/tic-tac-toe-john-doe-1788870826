import type { Cell } from '@/types/game';

interface SquareProps {
  value: Cell;
  index: number;
  winning: boolean;
  disabled: boolean;
  onSelect: (index: number) => void;
}

export function Square({ value, index, winning, disabled, onSelect }: SquareProps) {
  return (
    <button
      type="button"
      aria-label={`Cell ${index + 1}${value ? `, ${value}` : ', empty'}`}
      disabled={disabled || value !== null}
      onClick={() => onSelect(index)}
      className={[
        'group relative flex aspect-square items-center justify-center rounded-2xl border transition-all duration-200',
        'text-5xl font-black sm:text-6xl',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70',
        winning
          ? 'border-cyan-300/70 bg-cyan-400/20 shadow-[0_0_30px_-6px_rgba(34,211,238,0.8)]'
          : 'border-white/10 bg-white/5',
        value === null && !disabled
          ? 'cursor-pointer hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/10 active:translate-y-0'
          : 'cursor-default',
      ].join(' ')}
    >
      {value && (
        <span
          key={value}
          className={[
            'animate-[mark-in_180ms_ease-out] drop-shadow',
            value === 'X' ? 'text-cyan-300' : 'text-fuchsia-300',
          ].join(' ')}
        >
          {value}
        </span>
      )}
    </button>
  );
}
