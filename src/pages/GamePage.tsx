import React from 'react';
import ResourceRow from '@/components/ui/ResourceRow';
import { useGame } from '@/hooks/useGame';
import { formatCost, formatWithPrecision } from '@/utils/numberFormatter';
import { calculateCost } from '@/utils/costCalculator';
import { getAllResourceConfigs } from '@/utils/configLoader';
import { calculateMultiplier } from '@/utils/multiplierCalculator';
import { calculateProductionRatio } from '@/utils/productionRatioCalculator';
import Big from 'big.js';

const GamePage: React.FC = () => {
    const { points, resources, purchase } = useGame();

    const handlePurchase = (resourceId: string) => {
        purchase(resourceId);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 py-8">
            <div className="container mx-auto px-4">
                <div className="mb-8 text-center">
                    <p className="text-xl text-gray-600">
                        Charles has {formatWithPrecision(new Big(points), 1)} neurons
                    </p>
                </div>

                <div className="space-y-4">
                    {resources.map((resource, index) => {
                        const config = getAllResourceConfigs().find(
                            (c) => c.id === resource.id
                        );
                        if (!config) return null;

                        // Check if resource is locked (previous resource not bought)
                        const isLocked = index > 0 && resources[index - 1].bought === 0;
                        if (isLocked) return null;

                        const currentCost = calculateCost(
                            new Big(config.baseCost),
                            resource.bought
                        );

                        const multiplier = calculateMultiplier(resource.bought);
                        const canAfford = new Big(points).gte(currentCost);
                        const productionRatio = calculateProductionRatio(
                            resource.id,
                            resources
                        );

                        return (
                            <ResourceRow
                                key={resource.id}
                                name={config.name}
                                owned={resource.owned}
                                bought={resource.bought}
                                multiplier={multiplier}
                                cost={formatCost(currentCost)}
                                canAfford={canAfford}
                                productionRatio={productionRatio}
                                onPurchase={() => handlePurchase(resource.id)}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default GamePage;
