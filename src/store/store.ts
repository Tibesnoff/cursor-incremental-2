import { configureStore } from '@reduxjs/toolkit';
import gameReducer from '@/store/slices/gameSlice';
import { tickMiddleware } from '@/store/middleware/tickMiddleware';

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tickMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
