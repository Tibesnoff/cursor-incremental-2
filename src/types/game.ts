export interface Resource {
  id: string;
  name: string;
  cost: number;
  owned: number;
  generationRate: number;
}

export interface GameState {
  points: number;
  isPlaying: boolean;
  resources: Resource[];
}

export interface ResourceRowProps {
  name: string;
  cost: number;
  owned: number;
  generationRate: number;
  onPurchase: () => void;
}
