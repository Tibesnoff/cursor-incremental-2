import React, { useState, useRef, useEffect } from 'react';
import NavButton from './NavButton';
import Submenu from './Submenu';
import { submenuConfig } from '@/config/submenuConfig';

interface NavigationProps {
    currentPage: 'game' | 'settings';
    currentSubmenu: string;
    onNavigate: (page: 'game' | 'settings') => void;
    onSubmenuNavigate: (page: string, submenu: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({
    currentPage,
    currentSubmenu,
    onSubmenuNavigate,
}) => {
    const [hoveredButton, setHoveredButton] = useState<string | null>(null);
    const [buttonPositions, setButtonPositions] = useState<{
        [key: string]: number;
    }>({});
    const gameButtonRef = useRef<HTMLButtonElement>(null);
    const settingsButtonRef = useRef<HTMLButtonElement>(null);
    const closeTimeoutRef = useRef<number | null>(null);

    const handleNavClick = (page: 'game' | 'settings') => {
        const items = submenuConfig[page];
        const currentIndex = items.findIndex((item) => item.id === currentSubmenu);
        const nextIndex = (currentIndex + 1) % items.length;
        const nextItem = items[nextIndex];

        // Just cycle through submenu options, don't navigate
        onSubmenuNavigate(page, nextItem.id);
    };

    const handleSubmenuItemClick = (itemId: string) => {
        // Navigate to the selected submenu item using the page that owns the submenu
        const submenuPage = hoveredButton; // The page that owns the currently open submenu
        if (submenuPage) {
            onSubmenuNavigate(submenuPage, itemId);
        }
    };

    const handleMouseEnter = (
        page: 'game' | 'settings',
        buttonRef: React.RefObject<HTMLButtonElement>
    ) => {
        // Clear any pending close timeout
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }

        setHoveredButton(page);
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setButtonPositions((prev) => ({
                ...prev,
                [page]: rect.top,
            }));
        }
    };

    const handleMouseLeave = () => {
        // Set a timeout to close the submenu after a short delay
        closeTimeoutRef.current = setTimeout(() => {
            setHoveredButton(null);
        }, 150); // 150ms delay to allow moving to submenu
    };

    const handleCloseSubmenu = () => {
        // Clear timeout and close immediately
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
        setHoveredButton(null);
    };

    const handleSubmenuMouseEnter = () => {
        // Cancel any pending close timeout when mouse enters submenu
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
    };

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (closeTimeoutRef.current) {
                clearTimeout(closeTimeoutRef.current);
            }
        };
    }, []);

    return (
        <>
            <nav className="fixed left-0 top-0 h-full w-48 bg-gray-800 shadow-lg z-10">
                <div className="flex flex-col h-full">
                    {/* Navigation Buttons */}
                    <div className="flex-1 p-4 space-y-2">
                        <div
                            onMouseEnter={() => handleMouseEnter('game', gameButtonRef)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <NavButton
                                ref={gameButtonRef}
                                isActive={currentPage === 'game'}
                                onClick={() => handleNavClick('game')}
                            >
                                Game
                            </NavButton>
                        </div>

                        <div
                            onMouseEnter={() =>
                                handleMouseEnter('settings', settingsButtonRef)
                            }
                            onMouseLeave={handleMouseLeave}
                        >
                            <NavButton
                                ref={settingsButtonRef}
                                isActive={currentPage === 'settings'}
                                onClick={() => handleNavClick('settings')}
                            >
                                Settings
                            </NavButton>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Submenus */}
            {hoveredButton === 'game' && (
                <Submenu
                    items={submenuConfig.game}
                    activeItem={currentSubmenu}
                    onItemClick={handleSubmenuItemClick}
                    isOpen={true}
                    buttonTop={buttonPositions.game || 0}
                    onClose={handleCloseSubmenu}
                    onMouseEnter={handleSubmenuMouseEnter}
                />
            )}

            {hoveredButton === 'settings' && (
                <Submenu
                    items={submenuConfig.settings}
                    activeItem={currentSubmenu}
                    onItemClick={handleSubmenuItemClick}
                    isOpen={true}
                    buttonTop={buttonPositions.settings || 0}
                    onClose={handleCloseSubmenu}
                    onMouseEnter={handleSubmenuMouseEnter}
                />
            )}
        </>
    );
};

export default Navigation;
