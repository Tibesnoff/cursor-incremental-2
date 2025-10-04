import {
  useAppSelector,
  useAppDispatch,
  purchaseResource,
  maxPurchase,
  purchaseTill10,
  setBuyMode,
} from '@/store';
import { useCallback } from 'react';

export const useGame = () => {
  const dispatch = useAppDispatch();
  const { points, resources, buyMode } = useAppSelector((state) => state.game);

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

  const setBuyModeAction = useCallback(
    (mode: 'buy1' | 'till10') => {
      dispatch(setBuyMode(mode));
    },
    [dispatch]
  );

  return {
    points,
    resources,
    buyMode,
    purchase,
    maxBuy,
    purchaseTill10: purchaseTill10Action,
    setBuyMode: setBuyModeAction,
  };
};
