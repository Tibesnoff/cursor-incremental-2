export { store } from './store';
export { useAppSelector, useAppDispatch } from './hooks';
export { default as gameSlice } from './slices/gameSlice';
export {
  setPlaying,
  setBuyMode,
  addNeuron,
  purchaseResource,
  maxPurchase,
  purchaseTill10,
  tick,
} from './slices/gameSlice';
