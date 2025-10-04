import React from 'react';
import ResourceRow from '@/components/ui/ResourceRow';
import { useGame } from '@/hooks/useGame';

const GamePage: React.FC = () => {
    const { points, resources } = useGame();

    const handlePurchase = (resourceName: string) => {
        console.log(`Purchased: ${resourceName}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 py-8">
            <div className="container mx-auto px-4">
                <div className="mb-8 text-center">
                    <p className="text-xl text-gray-600">
                        Charles has {points.toLocaleString()} neurons
                    </p>
                </div>

                <div className="space-y-4">
                    {resources.map((resource) => (
                        <ResourceRow
                            key={resource.id}
                            name={resource.name}
                            onPurchase={() => handlePurchase(resource.name)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GamePage;
