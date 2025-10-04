import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Big from 'big.js';
import { calculateCost } from '@/utils/costCalculator';
import { getAllResourceConfigs, getBaseNeurons } from '@/utils/configLoader';
import { calculateMultiplier } from '@/utils/multiplierCalculator';

interface Resource {
  id: string;
  owned: number;
  bought: number;
}

interface GameState {
  points: string; // Store as string to avoid non-serializable Big.js objects
  isPlaying: boolean;
  resources: Resource[];
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
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    addNeuron: (state) => {
      const currentPoints = new Big(state.points);
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
            new Big(config.baseCost),
            resource.bought,
            new Big(config.costMultiplier)
          );

          const currentPoints = new Big(state.points);
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
    tick: (state) => {
      // Production chain: Raw Data -> Processors -> Models -> etc.
      // Each resource produces the next one in the chain
      const configs = getAllResourceConfigs();

      // Raw Data produces neurons
      const rawData = state.resources.find((r) => r.id === 'raw-data');
      if (rawData && rawData.owned > 0) {
        const rawDataConfig = configs.find((c) => c.id === 'raw-data');
        if (rawDataConfig) {
          const multiplier = calculateMultiplier(rawData.bought);
          const currentPoints = new Big(state.points);
          state.points = currentPoints
            .add(
              new Big(rawDataConfig.baseOutput)
                .mul(rawData.owned)
                .mul(multiplier)
            )
            .toString();
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
          rawDataResource.owned += new Big(processorsConfig.baseOutput)
            .mul(processors.owned)
            .mul(multiplier)
            .toNumber();
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
          processorsResource.owned += new Big(modelsConfig.baseOutput)
            .mul(models.owned)
            .mul(multiplier)
            .toNumber();
        }
      }

      // Algorithms produce Models
      const algorithms = state.resources.find((r) => r.id === 'algorithms');
      if (algorithms && algorithms.owned > 0) {
        const algorithmsConfig = configs.find((c) => c.id === 'algorithms');
        const modelsResource = state.resources.find((r) => r.id === 'models');
        if (algorithmsConfig && modelsResource) {
          const multiplier = calculateMultiplier(algorithms.bought);
          modelsResource.owned += new Big(algorithmsConfig.baseOutput)
            .mul(algorithms.owned)
            .mul(multiplier)
            .toNumber();
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
          algorithmsResource.owned += new Big(neuralNetsConfig.baseOutput)
            .mul(neuralNets.owned)
            .mul(multiplier)
            .toNumber();
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
          neuralNetsResource.owned += new Big(frameworksConfig.baseOutput)
            .mul(frameworks.owned)
            .mul(multiplier)
            .toNumber();
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
          frameworksResource.owned += new Big(dataCentersConfig.baseOutput)
            .mul(dataCenters.owned)
            .mul(multiplier)
            .toNumber();
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
          dataCentersResource.owned += new Big(researchLabsConfig.baseOutput)
            .mul(researchLabs.owned)
            .mul(multiplier)
            .toNumber();
        }
      }
    },
  },
});

export const { setPlaying, addNeuron, purchaseResource, tick } =
  gameSlice.actions;
export default gameSlice.reducer;
