import React from 'react';

interface SubmenuItem {
  id: string;
  label: string;
}

interface SubmenuProps {
  items: SubmenuItem[];
  activeItem: string;
  onItemClick: (itemId: string) => void;
  isOpen: boolean;
  buttonTop: number;
  onClose: () => void;
  onMouseEnter: () => void;
}

const Submenu: React.FC<SubmenuProps> = ({
  items,
  activeItem,
  onItemClick,
  isOpen,
  buttonTop,
  onClose,
  onMouseEnter,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed left-48 bg-gray-700 shadow-lg z-30 rounded-r-lg"
      style={{
        top: buttonTop,
        height: '56px', // Same height as nav button
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onClose}
    >
      <div className="flex h-full">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemClick(item.id)}
            className={`px-4 h-full flex items-center transition-colors duration-200 border-r border-gray-600 last:border-r-0 ${
              activeItem === item.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <span className="font-medium whitespace-nowrap">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Submenu;
