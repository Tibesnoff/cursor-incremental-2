import React from 'react';
import { PurchaseButton } from '@/components/ui';
import {
  useAppSelector,
  useAppDispatch,
  purchaseResource,
  purchaseTill10,
} from '@/store';
import {
  formatNumber,
  formatCost,
  calculateCost,
  getAllResourceConfigs,
  calculateMultiplier,
  calculateProductionRatio,
  calculateTill10Affordable,
  createDecimal,
} from '@/utils';

interface ResourceRowProps {
  resourceId: string;
}

const ResourceRow: React.FC<ResourceRowProps> = ({ resourceId }) => {
  // Get data from Redux store
  const { points, resources, buyMode } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();

  // Find the resource and config
  const resource = resources.find((r) => r.id === resourceId);
  const config = getAllResourceConfigs().find((c) => c.id === resourceId);

  if (!resource || !config) return null;

  // Calculate all the values we need
  const currentCost = calculateCost(
    createDecimal(config.baseCost),
    resource.bought
  );
  const multiplier = calculateMultiplier(resource.bought);
  const canAfford = createDecimal(points).gte(currentCost);
  const productionRatio = calculateProductionRatio(resourceId, resources);

  // Calculate affordable amount based on mode
  const till10Affordable =
    buyMode === 'till10'
      ? calculateTill10Affordable(
          resourceId,
          resource.bought,
          createDecimal(points)
        )
      : canAfford
        ? 1
        : 0;

  // Handle purchase internally
  const handlePurchase = () => {
    if (buyMode === 'buy1') {
      dispatch(purchaseResource(resourceId));
    } else {
      dispatch(purchaseTill10(resourceId));
    }
  };
  return (
    <div className="w-full max-w-6xl mx-auto px-8 py-2 bg-white rounded-lg shadow-md border border-gray-200">
      <div className="grid grid-cols-5 gap-4 items-center">
        {/* Column 1: Name and Multiplier */}
        <div className="col-span-1">
          <h3 className="text-xl font-semibold text-gray-800">
            {config.name}{' '}
            <span className="text-sm text-gray-500">
              {formatNumber(multiplier)}x
            </span>
          </h3>
        </div>

        {/* Column 2: Amount */}
        <div className="col-span-1">
          <span className="text-xl font-semibold text-gray-600">
            {formatNumber(resource.owned)}
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
            onClick={handlePurchase}
            disabled={!canAfford}
            buyMode={buyMode}
            currentBought={resource.bought}
            affordableAmount={till10Affordable}
            cost={formatCost(currentCost)}
          />

          {/* Tooltip */}
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
            Bought: {formatNumber(resource.bought)}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-800 rotate-45"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceRow;
