import React from 'react';
import { formatNumber } from '@/utils/numberFormatter';
import PurchaseButton from './PurchaseButton';

interface ResourceRowProps {
  name: string;
  owned: number;
  bought: number;
  multiplier: number;
  cost: string; // Will be formatted Big.js value
  canAfford: boolean;
  productionRatio: number; // Production ratio as percentage
  buyMode: 'buy1' | 'till10';
  till10Affordable: number;
  onPurchase: () => void;
}

const ResourceRow: React.FC<ResourceRowProps> = ({
  name,
  owned,
  bought,
  multiplier,
  cost,
  canAfford,
  productionRatio,
  buyMode,
  till10Affordable,
  onPurchase,
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-8 py-2 bg-white rounded-lg shadow-md border border-gray-200">
      <div className="grid grid-cols-5 gap-4 items-center">
        {/* Column 1: Name and Multiplier */}
        <div className="col-span-1">
          <h3 className="text-xl font-semibold text-gray-800">
            {name}{' '}
            <span className="text-sm text-gray-500">
              {formatNumber(multiplier)}x
            </span>
          </h3>
        </div>

        {/* Column 2: Amount */}
        <div className="col-span-1">
          <span className="text-xl font-semibold text-gray-600">
            {formatNumber(owned)}
            {productionRatio > 0 && (
              <span className="text-sm text-green-600 ml-2">
                ({productionRatio.toFixed(2)}%/s)
              </span>
            )}
          </span>
        </div>

        {/* Column 3: Blank */}
        <div className="col-span-1">{/* Empty space */}</div>

        {/* Column 4 & 5: Button */}
        <div className="col-span-2 relative group">
          <PurchaseButton
            onClick={onPurchase}
            disabled={!canAfford}
            buyMode={buyMode}
            currentBought={bought}
            affordableAmount={till10Affordable}
            cost={cost}
          />

          {/* Tooltip */}
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
            Bought: {formatNumber(bought)}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-800 rotate-45"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceRow;
