import React from 'react';
import Piece from '../Piece/Piece';
import { PieceType } from '../../types/game';

interface CellProps {
  row: number;
  col: number;
  piece: PieceType | null;
  isHighlighted: boolean;
  isPossible: boolean;
  onClick: (row: number, col: number) => void;
}

const Cell: React.FC<CellProps> = ({ row, col, piece, isHighlighted, isPossible, onClick }) => {
  const isDark = (row + col) % 2 !== 0;
  return (
    <div 
      className={`cell ${isDark ? 'dark' : 'light'} ${isHighlighted ? 'selected' : ''}`}
      onClick={() => onClick(row, col)}
    >
      {isPossible && <div className="hint" />}
      {piece && <Piece side={piece.side} isKing={piece.isKing} />}
    </div>
  );
};

export default Cell;