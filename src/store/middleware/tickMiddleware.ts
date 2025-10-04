import { Middleware } from '@reduxjs/toolkit';
import { tickService } from '@/services/TickService';
import { setPlaying } from '@/store/slices/gameSlice';

export const tickMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  // Start/stop tick service based on game state
  if (action.type === setPlaying.type) {
    if (action.payload === true) {
      // Game started - start ticking
      tickService.start(store);
    } else {
      // Game paused - stop ticking
      tickService.stop();
    }
  }

  return result;
};
