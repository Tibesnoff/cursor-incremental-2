import React from 'react';
import { Button } from 'antd';

interface PurchaseButtonProps {
    onClick: () => void;
    disabled: boolean;
    buyMode: 'buy1' | 'till10';
    currentBought: number;
    affordableAmount: number;
    cost: string;
}

const PurchaseButton: React.FC<PurchaseButtonProps> = ({
    onClick,
    disabled,
    buyMode,
    currentBought,
    affordableAmount,
    cost,
}) => {
    // Calculate progress for gradient
    const getProgressInfo = () => {
        // For both modes, show progress within current 10x cycle
        const currentCycle = currentBought % 10; // Position within current 10x cycle (0-9)
        const available = Math.min(affordableAmount, 10 - currentCycle);
        const remaining = 10 - currentCycle - available;

        // If nothing is available to buy, show only purchased portion
        if (available <= 0) {
            return {
                purchased: currentCycle,
                available: 0,
                total: 10,
                remaining: 10 - currentCycle,
            };
        }

        return {
            purchased: currentCycle,
            available,
            total: 10,
            remaining,
        };
    };

    const { purchased, available, total, remaining } = getProgressInfo();

    const getButtonText = () => {
        if (buyMode === 'buy1') {
            return 'Buy 1';
        } else {
            return `Buy ${available}`;
        }
    };

    return (
        <div className="relative w-full h-12 rounded-lg overflow-hidden border-2 border-black">
            {/* Background */}
            <div className="absolute inset-0 flex">
                {/* Purchased portion - Green gradient */}
                <div
                    className="bg-gradient-to-r from-green-400 to-green-500 h-full"
                    style={{ width: `${(purchased / total) * 100}%` }}
                />

                {/* Available portion - Blue gradient */}
                <div
                    className="bg-gradient-to-r from-blue-400 to-blue-500 h-full"
                    style={{ width: `${(available / total) * 100}%` }}
                />

                {/* Remaining portion - White */}
                <div
                    className="bg-white h-full"
                    style={{
                        width: `${(remaining / total) * 100}%`,
                    }}
                />
            </div>

            {/* Button Overlay */}
            <Button
                onClick={onClick}
                disabled={disabled}
                type={disabled ? 'default' : 'primary'}
                size="small"
                className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-transparent border-0 hover:bg-black hover:bg-opacity-10 py-1 gap-1"
                style={{
                    background: 'transparent',
                    color: disabled ? '#9CA3AF' : '#000000',
                    textShadow: 'none',
                }}
            >
                <div className="text-xs font-medium leading-tight">
                    {getButtonText()}
                </div>
                <div className="text-xs leading-tight">{cost} neurons</div>
            </Button>
        </div>
    );
};

export default PurchaseButton;
