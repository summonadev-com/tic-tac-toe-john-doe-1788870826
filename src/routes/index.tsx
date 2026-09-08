import { useMemo, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Board } from '@/components/Board';
import { createEmptyBoard, findWinner, isDraw } from '@/lib/tictactoe';
import type { BoardState, Player, Scores } from '@/types/game';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  const [board, setBoard] = useState<BoardState>(createEmptyBoard);
  const [turn, setTurn] = useState<Player>('X');
  const [scores, setScores] = useState<Scores>({ X: 0, O: 0, draws: 0 });

  const result = useMemo(() => findWinner(board), [board]);
  const draw = useMemo(() => isDraw(board), [board]);
  const over = result !== null || draw;

  function handleSelect(index: number) {
    if (over || board[index] !== null) return;
    const next = [...board];
    next[index] = turn;
    setBoard(next);

    const won = findWinner(next);
    if (won) {
      setScores((s) => ({ ...s, [won.winner]: s[won.winner] + 1 }));
      return;
    }
    if (isDraw(next)) {
      setScores((s) => ({ ...s, draws: s.draws + 1 }));
      return;
    }
    setTurn(turn === 'X' ? 'O' : 'X');
  }

  function newRound() {
    setBoard(createEmptyBoard());
    setTurn('X');
  }

  function resetScores() {
    setScores({ X: 0, O: 0, draws: 0 });
    newRound();
  }

  const status = result
    ? `${result.winner} wins!`
    : draw
      ? "It's a draw!"
      : `${turn}'s turn`;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 py-10 text-slate-100">
      <div className="w-full max-w-md">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Tic Tac Toe</h1>
          <p className="mt-1 text-sm text-slate-400">Two players, one board.</p>
        </header>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-sm sm:p-6">
          <div className="mb-5 flex items-center justify-center">
            <span
              className={[
                'rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors duration-300',
                result
                  ? 'border-cyan-300/50 bg-cyan-400/15 text-cyan-200'
                  : draw
                    ? 'border-amber-300/50 bg-amber-400/15 text-amber-200'
                    : 'border-white/15 bg-white/5 text-slate-200',
              ].join(' ')}
            >
              {status}
            </span>
          </div>

          <Board
            board={board}
            winningLine={result?.line ?? null}
            frozen={over}
            onSelect={handleSelect}
          />

          <div className="mt-6 grid grid-cols-3 gap-2.5 text-center">
            <ScoreTile label="X" value={scores.X} tone="text-cyan-300" />
            <ScoreTile label="Draws" value={scores.draws} tone="text-slate-300" />
            <ScoreTile label="O" value={scores.O} tone="text-fuchsia-300" />
          </div>

          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
            <button
              type="button"
              onClick={newRound}
              className="flex-1 rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition-colors duration-200 hover:bg-cyan-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
            >
              New Round
            </button>
            <button
              type="button"
              onClick={resetScores}
              className="flex-1 rounded-xl border border-white/15 px-4 py-2.5 text-sm font-semibold text-slate-200 transition-colors duration-200 hover:border-white/30 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              Reset Scores
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScoreTile({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2.5">
      <p className="text-[11px] font-medium uppercase tracking-widest text-slate-400">{label}</p>
      <p className={`mt-0.5 text-xl font-bold ${tone}`}>{value}</p>
    </div>
  );
}
