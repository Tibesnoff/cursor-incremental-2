import React from 'react';
import { GameHeader, GameControls, ResourceList } from '@/components/game';
import { useGameKeybinds } from '@/hooks';

const GamePage: React.FC = () => {
  // Set up game keybinds
  useGameKeybinds();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 py-8">
      <div className="container mx-auto px-4">
        <GameHeader />
        <GameControls />
        <ResourceList />
      </div>
    </div>
  );
};

export default GamePage;
