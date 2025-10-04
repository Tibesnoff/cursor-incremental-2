import { Middleware } from '@reduxjs/toolkit';
import { tickService } from '@/services/TickService';
import { setPlaying } from '@/store/slices/gameSlice';
import { RootState } from '@/store/store';

export const tickMiddleware: Middleware<Record<string, never>, RootState> =
  (store) => (next) => (action) => {
    const result = next(action);

    // Start/stop tick service based on game state
    if (action.type === setPlaying.type) {
      if ((action as ReturnType<typeof setPlaying>).payload === true) {
        // Game started - start ticking
        // We need to pass the actual store, not the middleware API
        const actualStore =
          store as unknown as import('@reduxjs/toolkit').Store<RootState>;
        tickService.start(actualStore);
      } else {
        // Game paused - stop ticking
        tickService.stop();
      }
    }

    return result;
  };
