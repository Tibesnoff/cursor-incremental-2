import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Resource {
  id: string;
  name: string;
  owned: number;
  generationRate: number;
  cost: number;
}

interface GameState {
  points: number;
  isPlaying: boolean;
  resources: Resource[];
}

const initialResources: Resource[] = [
  { id: 'raw-data', name: 'Raw Data', owned: 0, generationRate: 1, cost: 10 },
  {
    id: 'processors',
    name: 'Processors',
    owned: 0,
    generationRate: 0,
    cost: 100,
  },
  { id: 'models', name: 'Models', owned: 0, generationRate: 0, cost: 1000 },
  {
    id: 'algorithms',
    name: 'Algorithms',
    owned: 0,
    generationRate: 0,
    cost: 10000,
  },
  {
    id: 'neural-nets',
    name: 'Neural Nets',
    owned: 0,
    generationRate: 0,
    cost: 100000,
  },
  {
    id: 'frameworks',
    name: 'Frameworks',
    owned: 0,
    generationRate: 0,
    cost: 1000000,
  },
  {
    id: 'data-centers',
    name: 'Data Centers',
    owned: 0,
    generationRate: 0,
    cost: 10000000,
  },
  {
    id: 'research-labs',
    name: 'Research Labs',
    owned: 0,
    generationRate: 0,
    cost: 100000000,
  },
];

const initialState: GameState = {
  points: 0,
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
      state.points += 1;
    },
  },
});

export const { setPlaying, addNeuron } = gameSlice.actions;
export default gameSlice.reducer;
