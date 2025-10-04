import React from 'react';
import Button from '@/components/ui/Button';
import { useGame } from '@/hooks/useGame';

const HomePage: React.FC = () => {
    const { points, isPlaying, toggleGame } = useGame();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="text-center max-w-2xl mx-auto px-4">
                <h1 className="text-6xl font-bold text-indigo-600 mb-4">
                    AI Incremental Game
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                    Build your AI empire through resource management and automation!
                </p>

                <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Current Status
                    </h2>
                    <p className="text-lg text-gray-700 mb-4">
                        Points: {points.toLocaleString()}
                    </p>
                    <p className="text-lg text-gray-700 mb-6">
                        Status: {isPlaying ? 'Playing' : 'Paused'}
                    </p>

                    <div className="space-x-4">
                        <Button
                            onClick={toggleGame}
                            variant={isPlaying ? 'secondary' : 'primary'}
                            size="lg"
                        >
                            {isPlaying ? 'Pause Game' : 'Start Game'}
                        </Button>
                    </div>
                </div>

                <div className="text-sm text-gray-500">
                    <p>Click "Start Game" to begin your AI empire journey!</p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
