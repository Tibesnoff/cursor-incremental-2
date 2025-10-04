import { Decimal } from 'decimal.js';

// Configure Decimal.js for better precision and large number handling
Decimal.set({
  precision: 50, // High precision for calculations
  rounding: Decimal.ROUND_HALF_UP,
  toExpNeg: -9e15, // Very large negative exponent
  toExpPos: 9e15, // Very large positive exponent
  maxE: 9e15, // Maximum exponent
  minE: -9e15, // Minimum exponent
});

export { Decimal };
export default Decimal;

// Helper function to create a Decimal from various inputs
export const createDecimal = (value: string | number | Decimal): Decimal => {
  try {
    return new Decimal(value);
  } catch (error) {
    console.warn('Invalid number provided to createDecimal:', value, error);
    return new Decimal(0);
  }
};

// Helper function to safely convert to string
export const toDecimalString = (decimal: Decimal): string => {
  try {
    return decimal.toString();
  } catch (error) {
    console.warn('Error converting Decimal to string:', error);
    return '0';
  }
};

// Helper function to check if a number is valid
export const isValidNumber = (value: string | number): boolean => {
  try {
    new Decimal(value);
    return true;
  } catch {
    return false;
  }
};
