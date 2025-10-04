import React from 'react';
import { Button } from 'antd';
import {
  useAppSelector,
  useAppDispatch,
  setBuyMode,
  maxPurchase,
} from '@/store';

const GameControls: React.FC = () => {
  const dispatch = useAppDispatch();
  const { buyMode } = useAppSelector((state) => state.game);

  const handleMaxBuy = () => {
    dispatch(maxPurchase());
  };

  const handleToggleMode = () => {
    dispatch(setBuyMode(buyMode === 'buy1' ? 'till10' : 'buy1'));
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-8 mb-4">
      <div className="flex justify-between items-center">
        <Button
          type="primary"
          onClick={handleMaxBuy}
          size="large"
          className="text-lg px-8 py-3"
        >
          Max
        </Button>
        <Button
          type={buyMode === 'buy1' ? 'primary' : 'default'}
          onClick={handleToggleMode}
          size="large"
          className="text-lg px-8 py-3"
        >
          {buyMode === 'buy1' ? 'Buy 1' : 'Till 10'}
        </Button>
      </div>
    </div>
  );
};

export default GameControls;
