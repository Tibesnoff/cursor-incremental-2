import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Big from 'big.js';

interface GameState {
  points: Big;
  isPlaying: boolean;
}

const initialState: GameState = {
  points: new Big(0),
  isPlaying: false,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    addPoints: (state, action: PayloadAction<number>) => {
      state.points = state.points.add(action.payload);
    },
    setPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
  },
});

export const { addPoints, setPlaying } = gameSlice.actions;
export default gameSlice.reducer;
