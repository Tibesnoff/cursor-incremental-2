import Big from 'big.js';

/**
 * Calculates the cost of purchasing a resource based on tiered pricing
 * - First 10 purchases: Same cost (base)
 * - After 10: 1000x increase
 * - After 20: 10^1 * 1000x increase
 * - After 30: 10^2 * 1000x increase
 * - And so on...
 *
 * @param baseCost - The initial cost of the resource
 * @param bought - Number of resources already bought
 * @returns The cost to purchase the next resource
 */
export const calculateCost = (
  baseCost: Big | number | string,
  bought: number
): Big => {
  const base =
    typeof baseCost === 'string' || typeof baseCost === 'number'
      ? new Big(baseCost)
      : baseCost;

  // First 10 purchases: same cost
  if (bought < 10) {
    return base;
  }

  // Calculate tier (every 10 purchases = new tier)
  const tier = Math.floor(bought / 10);

  // First tier jump: 1000x increase
  if (tier === 1) {
    return base.mul(1000);
  }

  // Subsequent tiers: 10^(tier-1) * 1000x increase
  const tierMultiplier = new Big(10).pow(tier - 1).mul(1000);
  return base.mul(tierMultiplier);
};
