import React from 'react';
import { useAppSelector } from '@/store';
import {
  formatWithPrecision,
  createDecimal,
  calculateNeuronsPerSecond,
} from '@/utils';

const GameHeader: React.FC = () => {
  const { points, resources } = useAppSelector((state) => state.game);

  const neuronsPerSecond = calculateNeuronsPerSecond(resources);

  // Calculate what percentage of total neurons the research production represents
  const totalNeurons = createDecimal(points);
  const researchProductionPercentage = totalNeurons.gt(0)
    ? neuronsPerSecond.div(totalNeurons).mul(100).toNumber()
    : 0;

  return (
    <div className="mb-8 text-center">
      <p className="text-xl text-gray-600">
        Charles has {formatWithPrecision(createDecimal(points), 1)} neurons
      </p>
      <p className="text-lg text-green-600">
        Your research is producing {formatWithPrecision(neuronsPerSecond, 2)}{' '}
        neurons per second
        {researchProductionPercentage > 0 && (
          <span className="text-sm text-green-600 ml-2">
            ({researchProductionPercentage.toFixed(2)}%/s)
          </span>
        )}
      </p>
    </div>
  );
};

export default GameHeader;
