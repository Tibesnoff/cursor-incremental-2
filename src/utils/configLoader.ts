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

export const loadGameConfig = (): GameConfig => {
  return gameConfig as GameConfig;
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
