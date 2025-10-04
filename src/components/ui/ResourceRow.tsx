import React from 'react';

interface ResourceRowProps {
  name: string;
  onPurchase: () => void;
}

const ResourceRow: React.FC<ResourceRowProps> = ({ name, onPurchase }) => {
  return (
    <div className="flex items-center justify-between w-full max-w-4xl mx-auto px-6 py-4 bg-white rounded-lg shadow-md border border-gray-200">
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
      </div>
      <button
        onClick={onPurchase}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
      >
        Purchase
      </button>
    </div>
  );
};

export default ResourceRow;
