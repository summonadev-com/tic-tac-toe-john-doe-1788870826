import { Square } from '@/components/Square';
import type { BoardState } from '@/types/game';

interface BoardProps {
  board: BoardState;
  winningLine: readonly number[] | null;
  frozen: boolean;
  onSelect: (index: number) => void;
}

export function Board({ board, winningLine, frozen, onSelect }: BoardProps) {
  return (
    <div className="grid w-full grid-cols-3 gap-2.5 sm:gap-3">
      {board.map((value, index) => (
        <Square
          key={index}
          index={index}
          value={value}
          winning={winningLine?.includes(index) ?? false}
          disabled={frozen}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
