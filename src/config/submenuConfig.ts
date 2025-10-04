export interface SubmenuItem {
  id: string;
  label: string;
}

export interface SubmenuConfig {
  game: SubmenuItem[];
  settings: SubmenuItem[];
}

export const submenuConfig: SubmenuConfig = {
  game: [{ id: 'charles', label: 'Charles' }],
  settings: [
    { id: 'game', label: 'Game' },
    { id: 'dev', label: 'Dev' },
    { id: 'saving', label: 'Saving' },
  ],
};
