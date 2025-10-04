import Big from 'big.js';
import { calculateCost } from '@/utils/costCalculator';
import { getAllResourceConfigs } from '@/utils/configLoader';

/**
 * Calculate how many items are needed to reach the next 10x milestone
 * @param currentBought - Current number of bought items
 * @returns Number of items needed to reach next 10x
 */
export const calculateTill10Needed = (currentBought: number): number => {
  // If we have 0, buy up to 10
  if (currentBought === 0) return 10;

  // If we're at a 10x milestone, buy up to the next 10x
  if (currentBought % 10 === 0) {
    return 10;
  }

  // Otherwise, buy up to the next 10x milestone
  const next10x = Math.ceil(currentBought / 10) * 10;
  return next10x - currentBought;
};

/**
 * Calculate how many items can be afforded to reach the next 10x milestone
 * @param resourceId - ID of the resource
 * @param currentBought - Current number of bought items
 * @param availablePoints - Available points to spend
 * @returns Number of items that can be afforded
 */
export const calculateTill10Affordable = (
  resourceId: string,
  currentBought: number,
  availablePoints: Big
): number => {
  const config = getAllResourceConfigs().find((c) => c.id === resourceId);
  if (!config) return 0;

  const needed = calculateTill10Needed(currentBought);
  if (needed <= 0) return 0;

  // If we can't afford even 1, return 0
  const firstCost = calculateCost(new Big(config.baseCost), currentBought);
  if (availablePoints.lt(firstCost)) return 0;

  let canAfford = 0;
  let currentPoints = availablePoints;
  let currentBoughtCount = currentBought;

  // Calculate how many we can actually afford
  for (let i = 0; i < needed; i++) {
    const cost = calculateCost(new Big(config.baseCost), currentBoughtCount);
    if (currentPoints.gte(cost)) {
      currentPoints = currentPoints.sub(cost);
      currentBoughtCount++;
      canAfford++;
    } else {
      break;
    }
  }

  return canAfford;
};
