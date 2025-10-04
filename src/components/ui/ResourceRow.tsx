import React from 'react';
import { formatNumber } from '@/utils/numberFormatter';

interface ResourceRowProps {
  name: string;
  owned: number;
  bought: number;
  multiplier: number;
  cost: string; // Will be formatted Big.js value
  canAfford: boolean;
  productionRatio: number; // Production ratio as percentage
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
  onPurchase,
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-8 py-4 bg-white rounded-lg shadow-md border border-gray-200">
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
          <button
            onClick={onPurchase}
            disabled={!canAfford}
            className={`w-full h-12 px-2 py-1 rounded-lg transition-colors duration-200 font-medium flex flex-col items-center justify-center ${
              canAfford
                ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                : 'bg-gray-400 text-gray-200 cursor-not-allowed'
            }`}
          >
            <div className="text-sm">Buy 1</div>
            <div className="text-xs">{cost} neurons</div>
          </button>

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
