import React, { useState } from 'react';
import ResourceRow from '@/components/ui/ResourceRow';
import { Button } from 'antd';
import { useGame } from '@/hooks/useGame';
import { formatWithPrecision } from '@/utils/numberFormatter';
import { calculateNeuronsPerSecond } from '@/utils/neuronsPerSecondCalculator';
import Big from 'big.js';

const GamePage: React.FC = () => {
  const { points, resources, buyMode, maxBuy, setBuyMode } = useGame();

  const neuronsPerSecond = calculateNeuronsPerSecond(resources);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <p className="text-xl text-gray-600">
            Charles has {formatWithPrecision(new Big(points), 1)} neurons
          </p>
          <p className="text-lg text-green-600">
            Your research is producing{' '}
            {formatWithPrecision(neuronsPerSecond, 2)} neurons per second
          </p>
        </div>

        {/* Max Button and Toggle */}
        <div className="w-full max-w-6xl mx-auto px-8 mb-4">
          <div className="flex justify-between items-center">
            <Button
              type="primary"
              onClick={maxBuy}
              size="large"
              className="text-lg px-8 py-3"
            >
              Max
            </Button>
            <Button
              type={buyMode === 'buy1' ? 'primary' : 'default'}
              onClick={() => setBuyMode(buyMode === 'buy1' ? 'till10' : 'buy1')}
              size="large"
              className="text-lg px-8 py-3"
            >
              {buyMode === 'buy1' ? 'Buy 1' : 'Till 10'}
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {resources.map((resource, index) => {
            // Check if resource is locked (previous resource not bought)
            const isLocked = index > 0 && resources[index - 1].bought === 0;
            if (isLocked) return null;

            return <ResourceRow key={resource.id} resourceId={resource.id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default GamePage;
