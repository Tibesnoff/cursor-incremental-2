import React, { forwardRef } from 'react';

interface NavButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const NavButton = forwardRef<HTMLButtonElement, NavButtonProps>(
  ({ isActive, onClick, children }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        className={`w-full p-4 rounded-lg text-left transition-colors duration-200 ${
          isActive
            ? 'bg-blue-600 text-white'
            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
        }`}
      >
        <span className="font-medium">{children}</span>
      </button>
    );
  }
);

export default NavButton;
