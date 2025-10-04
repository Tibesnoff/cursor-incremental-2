// Big number utilities
export {
  Decimal,
  createDecimal,
  toDecimalString,
  isValidNumber,
} from './bigNumber';

// Number formatting
export {
  formatNumber,
  formatCost,
  formatWithPrecision,
} from './numberFormatter';

// Game calculations
export { calculateCost } from './costCalculator';
export { calculateMultiplier } from './multiplierCalculator';
export { calculateProductionRatio } from './productionRatioCalculator';
export { calculateNeuronsPerSecond } from './neuronsPerSecondCalculator';
export {
  calculateTill10Needed,
  calculateTill10Affordable,
} from './till10Calculator';

// Configuration
export { getAllResourceConfigs, getBaseNeurons } from './configLoader';
