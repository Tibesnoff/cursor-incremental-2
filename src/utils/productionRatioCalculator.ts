import { Decimal, createDecimal } from './bigNumber';
import { getAllResourceConfigs } from '@/utils/configLoader';
import { calculateMultiplier } from '@/utils/multiplierCalculator';

export interface Resource {
  id: string;
  owned: number;
  bought: number;
}

/**
 * Calculate the production ratio for a resource
 * @param resourceId - The ID of the resource to calculate ratio for
 * @param resources - Array of all resources
 * @returns The production ratio as a percentage (0-100)
 */
export const calculateProductionRatio = (
  resourceId: string,
  resources: Resource[]
): number => {
  const configs = getAllResourceConfigs();
  const resourceIndex = configs.findIndex((config) => config.id === resourceId);

  // If this is the last resource or doesn't exist, no production ratio
  if (resourceIndex === -1 || resourceIndex === configs.length - 1) {
    return 0;
  }

  const currentResource = resources.find((r) => r.id === resourceId);
  const nextResourceId = configs[resourceIndex + 1].id;
  const nextResource = resources.find((r) => r.id === nextResourceId);

  if (!currentResource || !nextResource || currentResource.owned === 0) {
    return 0;
  }

  // Calculate how much the next resource produces of the current resource per second
  const nextResourceConfig = configs[resourceIndex + 1];
  const nextResourceMultiplier = calculateMultiplier(nextResource.bought);
  const nextResourceProduction = createDecimal(nextResourceConfig.baseOutput)
    .mul(nextResource.owned)
    .mul(nextResourceMultiplier);

  // Calculate current resource's production per second
  const currentResourceConfig = configs[resourceIndex];
  const currentResourceMultiplier = calculateMultiplier(currentResource.bought);
  const currentResourceProduction = createDecimal(
    currentResourceConfig.baseOutput
  )
    .mul(currentResource.owned)
    .mul(currentResourceMultiplier);

  // If current resource doesn't produce anything, ratio is 0
  if (currentResourceProduction.eq(0)) {
    return 0;
  }

  // Calculate ratio: (next resource production / current resource production) * 100
  const ratio = nextResourceProduction.div(currentResourceProduction).mul(100);

  return Math.min(ratio.toNumber(), 999.99); // Cap at 999.99% for display
};
