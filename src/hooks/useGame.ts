import { useAppSelector, useAppDispatch } from '@/store/hooks';
import {
  purchaseResource,
  maxPurchase,
  purchaseTill10,
} from '@/store/slices/gameSlice';
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

  const maxBuy = useCallback(() => {
    dispatch(maxPurchase());
  }, [dispatch]);

  const purchaseTill10Action = useCallback(
    (resourceId: string) => {
      dispatch(purchaseTill10(resourceId));
    },
    [dispatch]
  );

  return {
    points,
    resources,
    purchase,
    maxBuy,
    purchaseTill10: purchaseTill10Action,
  };
};
