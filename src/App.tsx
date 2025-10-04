import { ErrorBoundary } from '@/components/ErrorBoundary';
import GamePage from '@/pages/GamePage';
import { useAppDispatch } from '@/store/hooks';
import { setPlaying } from '@/store/slices/gameSlice';
import { useEffect } from 'react';

function App() {
    const dispatch = useAppDispatch();

    // Start the game automatically when app loads
    useEffect(() => {
        dispatch(setPlaying(true));
    }, [dispatch]);

    return (
        <ErrorBoundary>
            <GamePage />
        </ErrorBoundary>
    );
}

export default App;
