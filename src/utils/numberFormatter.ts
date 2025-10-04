import { Decimal, createDecimal } from './bigNumber';

/**
 * Formats numbers for display in the game
 * - Small numbers: 1,234 (with commas)
 * - Large numbers: 1.23e+15 (scientific notation)
 * - Handles Decimal objects seamlessly
 */
export const formatNumber = (value: Decimal | number | string): string => {
  const decimalValue = createDecimal(value);

  // Convert to number for threshold checking (with error handling)
  let numValue: number;
  try {
    numValue = decimalValue.toNumber();
  } catch (error) {
    // If number is too large for JavaScript, use scientific notation
    return decimalValue.toExponential(2).replace('e+', 'e');
  }

  // Use scientific notation for numbers >= 1e6 (1 million)
  if (numValue >= 1e6) {
    return decimalValue.toExponential(2).replace('e+', 'e');
  }

  // Use regular formatting with commas for smaller numbers
  return decimalValue.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Formats numbers specifically for costs (always shows precision)
 */
export const formatCost = (value: Decimal | number | string): string => {
  const decimalValue = createDecimal(value);

  let numValue: number;
  try {
    numValue = decimalValue.toNumber();
  } catch (error) {
    return decimalValue.toExponential(2).replace('e+', 'e');
  }

  // Always use scientific notation for costs >= 1e3 (1 thousand)
  if (numValue >= 1e3) {
    return decimalValue.toExponential(2).replace('e+', 'e');
  }

  // Regular formatting for smaller costs
  return decimalValue.toFixed(0);
};

/**
 * Formats numbers for display with custom precision
 */
export const formatWithPrecision = (
  value: Decimal | number | string,
  precision: number = 2
): string => {
  const decimalValue = createDecimal(value);

  let numValue: number;
  try {
    numValue = decimalValue.toNumber();
  } catch (error) {
    return decimalValue.toExponential(precision).replace('e+', 'e');
  }

  if (numValue >= 1e6) {
    return decimalValue.toExponential(precision).replace('e+', 'e');
  }

  // For decimals, don't add commas to the decimal part
  const fixed = decimalValue.toFixed(precision);
  const [integerPart, decimalPart] = fixed.split('.');
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
};
