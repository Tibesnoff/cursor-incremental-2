import React from 'react';
import ResourceRow from '@/components/ui/ResourceRow';
import { useGame } from '@/hooks/useGame';
import { Resource } from '@/types/game';

const GamePage: React.FC = () => {
    const { points, handlePurchase } = useGame();

    const resources: Resource[] = [
        { id: 'raw-data', name: 'Raw Data', cost: 10, owned: 0, generationRate: 1 },
        {
            id: 'processors',
            name: 'Processors',
            cost: 100,
            owned: 0,
            generationRate: 0,
        },
        { id: 'models', name: 'Models', cost: 1000, owned: 0, generationRate: 0 },
        {
            id: 'algorithms',
            name: 'Algorithms',
            cost: 10000,
            owned: 0,
            generationRate: 0,
        },
        {
            id: 'neural-nets',
            name: 'Neural Nets',
            cost: 100000,
            owned: 0,
            generationRate: 0,
        },
        {
            id: 'frameworks',
            name: 'Frameworks',
            cost: 1000000,
            owned: 0,
            generationRate: 0,
        },
        {
            id: 'data-centers',
            name: 'Data Centers',
            cost: 10000000,
            owned: 0,
            generationRate: 0,
        },
        {
            id: 'research-labs',
            name: 'Research Labs',
            cost: 100000000,
            owned: 0,
            generationRate: 0,
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 py-8">
            <div className="container mx-auto px-4">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        AI Incremental Game
                    </h1>
                    <p className="text-xl text-gray-600">
                        Current Points: {points.toLocaleString()}
                    </p>
                </div>

                <div className="space-y-4">
                    {resources.map((resource) => (
                        <ResourceRow
                            key={resource.id}
                            name={resource.name}
                            cost={resource.cost}
                            owned={resource.owned}
                            generationRate={resource.generationRate}
                            onPurchase={() => handlePurchase(resource.name, resource.cost)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GamePage;
