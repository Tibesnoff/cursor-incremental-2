import { ErrorBoundary } from '@/components/layout';
import { Navigation } from '@/components/navigation';
import { GamePage, SettingsPage } from '@/pages';
import { useAppDispatch, setPlaying } from '@/store';
import { useEffect, useState } from 'react';

function App() {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState<'game' | 'settings'>('game');
  const [currentSubmenu, setCurrentSubmenu] = useState<string>('charles');

  // Start the game automatically when app loads
  useEffect(() => {
    dispatch(setPlaying(true));
  }, [dispatch]);

  const handleNavigate = (page: 'game' | 'settings') => {
    setCurrentPage(page);
    // Set default submenu for each page
    if (page === 'game') {
      setCurrentSubmenu('charles');
    } else if (page === 'settings') {
      setCurrentSubmenu('game');
    }
  };

  const handleSubmenuNavigate = (page: string, submenu: string) => {
    // Always update the submenu selection
    setCurrentSubmenu(submenu);

    // Only change the page if we're clicking a submenu item from a different page
    if (page !== currentPage) {
      setCurrentPage(page as 'game' | 'settings');
    }
  };

  return (
    <ErrorBoundary>
      <div className="flex h-screen">
        <Navigation
          currentPage={currentPage}
          currentSubmenu={currentSubmenu}
          onNavigate={handleNavigate}
          onSubmenuNavigate={handleSubmenuNavigate}
        />
        <main className="flex-1 ml-48">
          {currentPage === 'game' && <GamePage />}
          {currentPage === 'settings' && (
            <SettingsPage currentSubmenu={currentSubmenu} />
          )}
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
