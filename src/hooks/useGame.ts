import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { addPoints, setPlaying } from '@/store/slices/gameSlice';
import { useCallback } from 'react';

export const useGame = () => {
  const dispatch = useAppDispatch();
  const { points, isPlaying } = useAppSelector((state) => state.game);

  const handlePurchase = useCallback(
    (resourceName: string, cost: number) => {
      if (points >= cost) {
        dispatch(addPoints(-cost));
        console.log(`Purchased: ${resourceName} for ${cost} points`);
      } else {
        console.log(`Not enough points to purchase ${resourceName}`);
      }
    },
    [dispatch, points]
  );

  const toggleGame = useCallback(() => {
    dispatch(setPlaying(!isPlaying));
  }, [dispatch, isPlaying]);

  return {
    points,
    isPlaying,
    handlePurchase,
    toggleGame,
  };
};
