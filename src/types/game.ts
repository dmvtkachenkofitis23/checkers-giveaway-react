export type Side = 'white' | 'black';

export interface PieceType {
  side: Side;
  isKing: boolean;
}

export type BoardType = (PieceType | null)[][];

export interface Coordinate {
  r: number;
  c: number;
}

export interface Move {
  r: number;
  c: number;
  removed?: Coordinate;
}

export interface Capture {
  from: Coordinate;
  jumps: Move[];
}