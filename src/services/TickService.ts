import { Store } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';

class TickService {
  private intervalId: number | null = null;
  private store: Store<RootState> | null = null;

  start(store: Store<RootState>) {
    if (this.intervalId) {
      this.stop();
    }

    this.store = store;
    this.intervalId = window.setInterval(() => {
      // Tick logic will be handled elsewhere
      console.log('Tick!');
    }, 10); // 10ms = 100 FPS for incremental game
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.store = null;
  }

  isRunning(): boolean {
    return this.intervalId !== null;
  }
}

// Export singleton instance
export const tickService = new TickService();
export default tickService;
