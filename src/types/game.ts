export type Player = 'X' | 'O';
export type Cell = Player | null;
export type BoardState = Cell[];

export interface WinResult {
  winner: Player;
  line: [number, number, number];
}

export interface Scores {
  X: number;
  O: number;
  draws: number;
}
