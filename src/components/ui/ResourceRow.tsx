import React from 'react';
import { ResourceRowProps } from '@/types/game';

const ResourceRow: React.FC<ResourceRowProps> = ({
    name,
    cost,
    owned,
    generationRate,
    onPurchase,
}) => {
    return (
        <div className="flex items-center justify-between w-full max-w-4xl mx-auto px-6 py-4 bg-white rounded-lg shadow-md border border-gray-200">
            <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
                <div className="text-sm text-gray-600 mt-1">
                    <span>Owned: {owned}</span>
                    <span className="ml-4">Rate: {generationRate}/s</span>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <div className="text-right">
                    <div className="text-sm text-gray-600">Cost</div>
                    <div className="font-semibold">{cost.toLocaleString()}</div>
                </div>
                <button
                    onClick={onPurchase}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                    Purchase
                </button>
            </div>
        </div>
    );
};

export default ResourceRow;
