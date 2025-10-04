import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { purchaseResource } from '@/store/slices/gameSlice';
import { useCallback } from 'react';

export const useGame = () => {
  const dispatch = useAppDispatch();
  const { points, resources } = useAppSelector((state) => state.game);

  const purchase = useCallback(
    (resourceId: string) => {
      dispatch(purchaseResource(resourceId));
    },
    [dispatch]
  );

  return {
    points,
    resources,
    purchase,
  };
};
