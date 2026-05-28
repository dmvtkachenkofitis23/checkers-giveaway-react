import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cell from '../Cell/Cell';
import { WHITE, BLACK } from '../../constants/gameConstants';
import { getAvailableCaptures, getPieceJumps, getRegularMoves } from '../../logic/gameLogic';
import { updateGameState, setWinner, resetGame } from '../../store/gameSlice';
import { RootState } from '../../store';
import { Coordinate, Move } from '../../types/game';
import './Board.css';

const Board: React.FC = () => {
  const dispatch = useDispatch();
  const { board, turn, winner, theme, players } = useSelector((state: RootState) => state.game);

  const [selected, setSelected] = useState<Coordinate | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<Move[]>([]);

  useEffect(() => {
    const whitePieces = board.flat().filter(p => p?.side === WHITE).length;
    const blackPieces = board.flat().filter(p => p?.side === BLACK).length;

    if (whitePieces === 0) {
      dispatch(setWinner(WHITE));
      return;
    }
    if (blackPieces === 0) {
      dispatch(setWinner(BLACK));
      return;
    }

    let hasMoves = false;
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (board[r][c]?.side === turn) {
          if (getRegularMoves(board, r, c).length > 0 || getPieceJumps(board, r, c).length > 0) {
            hasMoves = true;
            break;
          }
        }
      }
      if (hasMoves) break;
    }

    if (!hasMoves) {
      dispatch(setWinner(turn));
    }
  }, [board, turn, dispatch]);

  const handleCellClick = (r: number, c: number) => {
    if (winner) return;

    const piece = board[r][c];
    const mustCapture = getAvailableCaptures(board, turn);

    if (piece && piece.side === turn) {
      if (mustCapture.length > 0) {
        const canThisPieceJump = mustCapture.find(m => m.from.r === r && m.from.c === c);
        if (!canThisPieceJump) {
          alert("Зобов'язаний бити!");
          return;
        }
        setSelected({ r, c });
        setPossibleMoves(getPieceJumps(board, r, c));
      } else {
        setSelected({ r, c });
        setPossibleMoves(getRegularMoves(board, r, c));
      }
      return;
    }

    const move = possibleMoves.find(m => m.r === r && m.c === c);
    if (selected && move) {
      const newBoard = board.map(row => [...row]);
      const movingPiece = newBoard[selected.r][selected.c];
      
      if (movingPiece) {
        const updatedPiece = { ...movingPiece };
        if ((turn === WHITE && r === 0) || (turn === BLACK && r === 7)) {
          updatedPiece.isKing = true;
        }

        newBoard[r][c] = updatedPiece;
        newBoard[selected.r][selected.c] = null;

        if (move.removed) {
          newBoard[move.removed.r][move.removed.c] = null;
          const nextJumps = getPieceJumps(newBoard, r, c);
          if (nextJumps.length > 0) {
            dispatch(updateGameState({ board: newBoard, turn }));
            setSelected({ r, c });
            setPossibleMoves(nextJumps);
            return;
          }
        }

        dispatch(updateGameState({ 
          board: newBoard, 
          turn: turn === WHITE ? BLACK : WHITE 
        }));
        setSelected(null);
        setPossibleMoves([]);
      }
    }
  };

  return (
    <div className="game-container">
      {winner ? (
        <div className="winner-message">
          <h2>Переміг {winner === WHITE ? players.white : players.black}!</h2>
          <button onClick={() => dispatch(resetGame())}>Грати знову</button>
        </div>
      ) : (
        <h2>Зараз хід: {turn === WHITE ? players.white : players.black}</h2>
      )}
      
      <div className={`board ${theme} ${winner ? 'game-over' : ''}`}>
        {board.map((row, r) => row.map((piece, c) => (
          <Cell 
            key={`${r}-${c}`}
            row={r} col={c}
            piece={piece}
            isHighlighted={selected?.r === r && selected?.c === c}
            isPossible={possibleMoves.some(m => m.r === r && m.c === c)}
            onClick={handleCellClick}
          />
        )))}
      </div>
    </div>
  );
};

export default Board;