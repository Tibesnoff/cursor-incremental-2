import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setPlaying, addNeuron } from '@/store/slices/gameSlice';
import { useCallback } from 'react';

export const useGame = () => {
  const dispatch = useAppDispatch();
  const { points, isPlaying, resources } = useAppSelector(
    (state) => state.game
  );

  const toggleGame = useCallback(() => {
    dispatch(setPlaying(!isPlaying));
  }, [dispatch, isPlaying]);

  const addOneNeuron = useCallback(() => {
    dispatch(addNeuron());
  }, [dispatch]);

  return {
    points,
    isPlaying,
    resources,
    toggleGame,
    addOneNeuron,
  };
};
