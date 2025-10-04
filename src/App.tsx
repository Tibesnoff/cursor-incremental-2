import { ErrorBoundary } from '@/components/ErrorBoundary';
import HomePage from '@/pages/HomePage';
import GamePage from '@/pages/GamePage';
import { useGame } from '@/hooks/useGame';

function App() {
    const { isPlaying } = useGame();

    return (
        <ErrorBoundary>{isPlaying ? <GamePage /> : <HomePage />}</ErrorBoundary>
    );
}

export default App;
