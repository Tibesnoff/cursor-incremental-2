import Big from 'big.js';

/**
 * Formats numbers for display in the game
 * - Small numbers: 1,234 (with commas)
 * - Large numbers: 1.23e+15 (scientific notation)
 * - Handles Big.js objects seamlessly
 */
export const formatNumber = (value: Big | number | string): string => {
  const bigValue =
    typeof value === 'string' || typeof value === 'number'
      ? new Big(value)
      : value;

  // Convert to number for threshold checking
  const numValue = bigValue.toNumber();

  // Use scientific notation for numbers >= 1e6 (1 million)
  if (numValue >= 1e6) {
    return bigValue.toExponential(2).replace('e+', 'e');
  }

  // Use regular formatting with commas for smaller numbers
  return bigValue.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Formats numbers specifically for costs (always shows precision)
 */
export const formatCost = (value: Big | number | string): string => {
  const bigValue =
    typeof value === 'string' || typeof value === 'number'
      ? new Big(value)
      : value;

  const numValue = bigValue.toNumber();

  // Always use scientific notation for costs >= 1e3 (1 thousand)
  if (numValue >= 1e3) {
    return bigValue.toExponential(2).replace('e+', 'e');
  }

  // Regular formatting for smaller costs
  return bigValue.toFixed(0);
};

/**
 * Formats numbers for display with custom precision
 */
export const formatWithPrecision = (
  value: Big | number | string,
  precision: number = 2
): string => {
  const bigValue =
    typeof value === 'string' || typeof value === 'number'
      ? new Big(value)
      : value;

  const numValue = bigValue.toNumber();

  if (numValue >= 1e6) {
    return bigValue.toExponential(precision).replace('e+', 'e');
  }

  // For decimals, don't add commas to the decimal part
  const fixed = bigValue.toFixed(precision);
  const [integerPart, decimalPart] = fixed.split('.');
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
};
