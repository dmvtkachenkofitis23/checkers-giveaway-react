import { Side } from '../../types/game';

interface PieceProps {
  side: Side;
  isKing: boolean;
}

const Piece = ({ side, isKing }: PieceProps) => {
  return (
    <div className={`piece ${side} ${isKing ? 'king' : ''}`}>
      {isKing && <span style={{ color: 'gold' }}>K</span>}
    </div>
  );
};

export default Piece;