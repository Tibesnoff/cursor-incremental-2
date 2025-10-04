import Big from 'big.js';
import { getAllResourceConfigs } from '@/utils/configLoader';
import { calculateMultiplier } from '@/utils/multiplierCalculator';

export interface Resource {
  id: string;
  owned: number;
  bought: number;
}

/**
 * Calculate total neurons per second production
 * @param resources - Array of all resources
 * @returns The total neurons per second production
 */
export const calculateNeuronsPerSecond = (resources: Resource[]): Big => {
  const configs = getAllResourceConfigs();

  // Find Raw Data resource (which produces neurons)
  const rawData = resources.find((r) => r.id === 'raw-data');

  if (!rawData || rawData.owned === 0) {
    return new Big(0);
  }

  const rawDataConfig = configs.find((c) => c.id === 'raw-data');
  if (!rawDataConfig) {
    return new Big(0);
  }

  const multiplier = calculateMultiplier(rawData.bought);
  const production = new Big(rawDataConfig.baseOutput)
    .mul(rawData.owned)
    .mul(multiplier);

  return production;
};
