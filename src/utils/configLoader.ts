import gameConfig from '@/config/gameConfig.json';

export interface ResourceConfig {
  id: string;
  name: string;
  baseOutput: number;
  baseCost: number;
  costMultiplier: number;
}

export interface GameConfig {
  baseNeurons: number;
  resources: ResourceConfig[];
}

// Cache the loaded config to avoid repeated JSON parsing
let cachedConfig: GameConfig | null = null;

export const loadGameConfig = (): GameConfig => {
  if (!cachedConfig) {
    cachedConfig = gameConfig as GameConfig;
  }
  return cachedConfig;
};

export const getResourceConfig = (id: string): ResourceConfig | undefined => {
  const config = loadGameConfig();
  return config.resources.find((resource) => resource.id === id);
};

export const getAllResourceConfigs = (): ResourceConfig[] => {
  const config = loadGameConfig();
  return config.resources;
};

export const getBaseNeurons = (): number => {
  const config = loadGameConfig();
  return config.baseNeurons;
};
