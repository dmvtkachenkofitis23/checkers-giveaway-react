import React from 'react';
import { Side } from '../../types/game';

interface PieceProps {
  side: Side;
  isKing: boolean;
}

const Piece: React.FC<PieceProps> = ({ side, isKing }) => {
  return (
    <div className={`piece ${side} ${isKing ? 'king' : ''}`}>
      {isKing && <span style={{ color: 'gold' }}>K</span>}
    </div>
  );
};

export default Piece;