import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WHITE } from '../constants/gameConstants';
import { createInitialBoard } from '../logic/gameLogic';
import { BoardType, Side } from '../types/game';

interface GameState {
  board: BoardType;
  turn: Side;
  winner: Side | null;
  theme: string;
  players: {
    white: string;
    black: string;
  };
}

const initialState: GameState = {
  board: createInitialBoard(),
  turn: WHITE,
  winner: null,
  theme: 'classic',
  players: {
    white: 'Білі',
    black: 'Чорні',
  },
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    updateGameState: (state, action: PayloadAction<{ board: BoardType; turn: Side }>) => {
      state.board = action.payload.board;
      state.turn = action.payload.turn;
    },
    setWinner: (state, action: PayloadAction<Side | null>) => {
      state.winner = action.payload;
    },
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
    setPlayers: (state, action: PayloadAction<{ white: string; black: string }>) => {
      state.players = action.payload;
    },
    resetGame: (state) => {
      state.board = createInitialBoard();
      state.turn = WHITE;
      state.winner = null;
    },
  },
});

export const { updateGameState, setWinner, setTheme, setPlayers, resetGame } = gameSlice.actions;
export default gameSlice.reducer;