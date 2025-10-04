/**
 * Calculates the multiplier based on owned count
 * Every 10 owned = 2x multiplier
 * Formula: 2^(floor(owned/10))
 *
 * @param owned - Number of resources owned
 * @returns The multiplier value
 */
export const calculateMultiplier = (owned: number): number => {
  if (owned === 0) return 1;

  const multiplierLevel = Math.floor(owned / 10);
  return Math.pow(2, multiplierLevel);
};
