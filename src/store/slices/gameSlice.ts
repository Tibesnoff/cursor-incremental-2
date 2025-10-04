import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Decimal, createDecimal } from '@/utils/bigNumber';
import { calculateCost } from '@/utils/costCalculator';
import { getAllResourceConfigs, getBaseNeurons } from '@/utils/configLoader';
import { calculateMultiplier } from '@/utils/multiplierCalculator';

interface Resource {
  id: string;
  owned: number;
  bought: number;
}

interface GameState {
  points: string; // Store as string to avoid non-serializable Decimal objects
  isPlaying: boolean;
  resources: Resource[];
  buyMode: 'buy1' | 'till10';
}

// Initialize resources from config
const initialResources: Resource[] = getAllResourceConfigs().map((config) => ({
  id: config.id,
  owned: 0,
  bought: 0,
}));

const initialState: GameState = {
  points: getBaseNeurons().toString(),
  isPlaying: false,
  resources: initialResources,
  buyMode: 'buy1',
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setBuyMode: (state, action: PayloadAction<'buy1' | 'till10'>) => {
      state.buyMode = action.payload;
    },
    addNeuron: (state) => {
      const currentPoints = createDecimal(state.points);
      state.points = currentPoints.add(1).toString();
    },
    purchaseResource: (state, action: PayloadAction<string>) => {
      const resourceId = action.payload;
      const resource = state.resources.find((r) => r.id === resourceId);

      if (resource) {
        // Get config for this resource
        const config = getAllResourceConfigs().find((c) => c.id === resourceId);
        if (config) {
          // Calculate current cost based on bought count
          const currentCost = calculateCost(
            createDecimal(config.baseCost),
            resource.bought
          );

          const currentPoints = createDecimal(state.points);
          if (currentPoints.gte(currentCost)) {
            // Deduct cost
            state.points = currentPoints.sub(currentCost).toString();
            // Add resource to both owned and bought
            resource.owned += 1;
            resource.bought += 1;
          }
        }
      }
    },
    maxPurchase: (state) => {
      const configs = getAllResourceConfigs();
      let currentPoints = createDecimal(state.points);
      let purchased = true;

      // Keep purchasing until we can't afford anything
      while (purchased) {
        purchased = false;

        // Go through each resource in order
        for (const config of configs) {
          const resource = state.resources.find((r) => r.id === config.id);
          if (!resource) continue;

          // Calculate current cost for this resource
          const currentCost = calculateCost(
            createDecimal(config.baseCost),
            resource.bought
          );

          // If we can afford it, buy it
          if (currentPoints.gte(currentCost)) {
            currentPoints = currentPoints.sub(currentCost);
            resource.owned += 1;
            resource.bought += 1;
            purchased = true;
          }
        }
      }

      // Update points
      state.points = currentPoints.toString();
    },
    purchaseTill10: (state, action: PayloadAction<string>) => {
      const resourceId = action.payload;
      const resource = state.resources.find((r) => r.id === resourceId);

      if (resource) {
        const config = getAllResourceConfigs().find((c) => c.id === resourceId);
        if (config) {
          let currentPoints = createDecimal(state.points);

          // Calculate how many we need to buy
          let needed = 0;
          if (resource.bought === 0) {
            needed = 10; // Buy up to 10 from 0
          } else if (resource.bought % 10 === 0) {
            needed = 10; // Buy 10 more if at a 10x milestone
          } else {
            const next10x = Math.ceil(resource.bought / 10) * 10;
            needed = next10x - resource.bought;
          }

          // Buy as many as we can afford
          for (let i = 0; i < needed; i++) {
            const currentCost = calculateCost(
              createDecimal(config.baseCost),
              resource.bought
            );

            if (currentPoints.gte(currentCost)) {
              currentPoints = currentPoints.sub(currentCost);
              resource.owned += 1;
              resource.bought += 1;
            } else {
              break;
            }
          }

          // Update points
          state.points = currentPoints.toString();
        }
      }
    },
    tick: (state) => {
      const configs = getAllResourceConfigs();

      // Raw Data produces neurons
      const rawData = state.resources.find((r) => r.id === 'raw-data');
      if (rawData && rawData.owned > 0) {
        const rawDataConfig = configs.find((c) => c.id === 'raw-data');
        if (rawDataConfig) {
          const multiplier = calculateMultiplier(rawData.bought);
          const production = createDecimal(rawDataConfig.baseOutput)
            .mul(rawData.owned)
            .mul(multiplier);
          state.points = createDecimal(state.points).add(production).toString();
        }
      }

      // Processors produce Raw Data
      const processors = state.resources.find((r) => r.id === 'processors');
      if (processors && processors.owned > 0) {
        const processorsConfig = configs.find((c) => c.id === 'processors');
        const rawDataResource = state.resources.find(
          (r) => r.id === 'raw-data'
        );
        if (processorsConfig && rawDataResource) {
          const multiplier = calculateMultiplier(processors.bought);
          const production = createDecimal(processorsConfig.baseOutput)
            .mul(processors.owned)
            .mul(multiplier);
          rawDataResource.owned += production.toNumber();
        }
      }

      // Models produce Processors
      const models = state.resources.find((r) => r.id === 'models');
      if (models && models.owned > 0) {
        const modelsConfig = configs.find((c) => c.id === 'models');
        const processorsResource = state.resources.find(
          (r) => r.id === 'processors'
        );
        if (modelsConfig && processorsResource) {
          const multiplier = calculateMultiplier(models.bought);
          const production = createDecimal(modelsConfig.baseOutput)
            .mul(models.owned)
            .mul(multiplier);
          processorsResource.owned += production.toNumber();
        }
      }

      // Algorithms produce Models
      const algorithms = state.resources.find((r) => r.id === 'algorithms');
      if (algorithms && algorithms.owned > 0) {
        const algorithmsConfig = configs.find((c) => c.id === 'algorithms');
        const modelsResource = state.resources.find((r) => r.id === 'models');
        if (algorithmsConfig && modelsResource) {
          const multiplier = calculateMultiplier(algorithms.bought);
          const production = createDecimal(algorithmsConfig.baseOutput)
            .mul(algorithms.owned)
            .mul(multiplier);
          modelsResource.owned += production.toNumber();
        }
      }

      // Neural Nets produce Algorithms
      const neuralNets = state.resources.find((r) => r.id === 'neural-nets');
      if (neuralNets && neuralNets.owned > 0) {
        const neuralNetsConfig = configs.find((c) => c.id === 'neural-nets');
        const algorithmsResource = state.resources.find(
          (r) => r.id === 'algorithms'
        );
        if (neuralNetsConfig && algorithmsResource) {
          const multiplier = calculateMultiplier(neuralNets.bought);
          const production = createDecimal(neuralNetsConfig.baseOutput)
            .mul(neuralNets.owned)
            .mul(multiplier);
          algorithmsResource.owned += production.toNumber();
        }
      }

      // Frameworks produce Neural Nets
      const frameworks = state.resources.find((r) => r.id === 'frameworks');
      if (frameworks && frameworks.owned > 0) {
        const frameworksConfig = configs.find((c) => c.id === 'frameworks');
        const neuralNetsResource = state.resources.find(
          (r) => r.id === 'neural-nets'
        );
        if (frameworksConfig && neuralNetsResource) {
          const multiplier = calculateMultiplier(frameworks.bought);
          const production = createDecimal(frameworksConfig.baseOutput)
            .mul(frameworks.owned)
            .mul(multiplier);
          neuralNetsResource.owned += production.toNumber();
        }
      }

      // Data Centers produce Frameworks
      const dataCenters = state.resources.find((r) => r.id === 'data-centers');
      if (dataCenters && dataCenters.owned > 0) {
        const dataCentersConfig = configs.find((c) => c.id === 'data-centers');
        const frameworksResource = state.resources.find(
          (r) => r.id === 'frameworks'
        );
        if (dataCentersConfig && frameworksResource) {
          const multiplier = calculateMultiplier(dataCenters.bought);
          const production = createDecimal(dataCentersConfig.baseOutput)
            .mul(dataCenters.owned)
            .mul(multiplier);
          frameworksResource.owned += production.toNumber();
        }
      }

      // Research Labs produce Data Centers
      const researchLabs = state.resources.find(
        (r) => r.id === 'research-labs'
      );
      if (researchLabs && researchLabs.owned > 0) {
        const researchLabsConfig = configs.find(
          (c) => c.id === 'research-labs'
        );
        const dataCentersResource = state.resources.find(
          (r) => r.id === 'data-centers'
        );
        if (researchLabsConfig && dataCentersResource) {
          const multiplier = calculateMultiplier(researchLabs.bought);
          const production = createDecimal(researchLabsConfig.baseOutput)
            .mul(researchLabs.owned)
            .mul(multiplier);
          dataCentersResource.owned += production.toNumber();
        }
      }
    },
  },
});

export const {
  setPlaying,
  setBuyMode,
  addNeuron,
  purchaseResource,
  maxPurchase,
  purchaseTill10,
  tick,
} = gameSlice.actions;
export default gameSlice.reducer;
