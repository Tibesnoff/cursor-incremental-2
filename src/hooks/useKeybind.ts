import { useEffect } from 'react';
import {
  useAppSelector,
  useAppDispatch,
  purchaseResource,
  purchaseTill10,
  maxPurchase,
} from '@/store';

interface Resource {
  id: string;
  owned: number;
  bought: number;
}

interface KeybindConfig {
  key: string;
  handler: () => void;
  description?: string;
}

export const useKeybind = (keybinds: KeybindConfig[]) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Don't trigger if user is typing in an input field
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement
      ) {
        return;
      }

      const keybind = keybinds.find(
        (kb) => kb.key.toLowerCase() === event.key.toLowerCase()
      );
      if (keybind) {
        event.preventDefault();
        keybind.handler();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [keybinds]);
};

// Game-specific keybind hook that automatically sets up game keybinds
export const useGameKeybinds = () => {
  const dispatch = useAppDispatch();
  const { resources, buyMode } = useAppSelector((state) => state.game);

  const keybinds = [
    // Number keys 1-8 for purchasing resources
    ...resources.slice(0, 8).map((resource: Resource, index: number) => ({
      key: (index + 1).toString(),
      handler: () => {
        if (buyMode === 'buy1') {
          dispatch(purchaseResource(resource.id));
        } else {
          dispatch(purchaseTill10(resource.id));
        }
      },
    })),
    // M key for max purchase
    {
      key: 'm',
      handler: () => dispatch(maxPurchase()),
    },
  ];

  useKeybind(keybinds);
};
