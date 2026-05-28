import { BOARD_SIZE } from '../constants/gameConstants';
import { BoardType, Side, Move, Capture } from '../types/game';

export const createInitialBoard = (): BoardType => {
  const board: BoardType = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));
  
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if ((row + col) % 2 !== 0) {
        if (row < 3) board[row][col] = { side: 'black', isKing: false };
        if (row > 4) board[row][col] = { side: 'white', isKing: false };
      }
    }
  }
  return board;
};

const isWithinBounds = (row: number, col: number): boolean => {
  return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
};

export const getAvailableCaptures = (board: BoardType, side: Side): Capture[] => {
  const captures: Capture[] = [];
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      const piece = board[r][c];
      if (piece && piece.side === side) {
        const pieceCaptures = getPieceJumps(board, r, c);
        if (pieceCaptures.length > 0) {
          captures.push({ from: { r, c }, jumps: pieceCaptures });
        }
      }
    }
  }
  return captures;
};

export const getPieceJumps = (board: BoardType, r: number, c: number): Move[] => {
  const piece = board[r][c];
  if (!piece) return [];
  
  const jumps: Move[] = [];
  const directions = [[1, 1], [1, -1], [-1, 1], [-1, -1]];

  directions.forEach(([dr, dc]) => {
    const midR = r + dr;
    const midC = c + dc;
    const endR = r + dr * 2;
    const endC = c + dc * 2;

    if (isWithinBounds(endR, endC)) {
      const midPiece = board[midR][midC];
      const endPiece = board[endR][endC];
      if (midPiece && midPiece.side !== piece.side && endPiece === null) {
        jumps.push({ r: endR, c: endC, removed: { r: midR, c: midC } });
      }
    }
  });
  return jumps;
};

export const getRegularMoves = (board: BoardType, r: number, c: number): Move[] => {
  const piece = board[r][c];
  if (!piece) return [];
  
  const moves: Move[] = [];
  const forward = piece.side === 'white' ? -1 : 1;
  const directions = [[forward, 1], [forward, -1]];

  if (piece.isKing) {
    directions.push([-forward, 1], [-forward, -1]);
  }

  directions.forEach(([dr, dc]) => {
    const newR = r + dr;
    const newC = c + dc;
    if (isWithinBounds(newR, newC) && board[newR][newC] === null) {
      moves.push({ r: newR, c: newC });
    }
  });
  return moves;
};