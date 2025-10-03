import React, { useState, useContext, useRef, useEffect } from 'react';
import { UserContext } from '../context/UserContext';

interface HeaderProps {
    activeScreen: 'dashboard' | 'settings';
    setActiveScreen: (screen: 'dashboard' | 'settings') => void;
}

const Header: React.FC<HeaderProps> = ({ activeScreen, setActiveScreen }) => {
    const { currentUser, logout } = useContext(UserContext);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu if clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleNav = (screen: 'dashboard' | 'settings') => {
        setActiveScreen(screen);
        setMenuOpen(false);
    }

    return (
        <header className="bg-gray-800 shadow-md">
            <div className="container mx-auto px-4 sm:px-6 md:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center cursor-pointer" onClick={() => handleNav('dashboard')}>
                        <span className="text-2xl font-bold text-white">
                            Big<span className="text-teal-400">2</span>Fit
                        </span>
                    </div>
                    {currentUser && (
                        <div className="relative" ref={menuRef}>
                            <button onClick={() => setMenuOpen(!isMenuOpen)} className="flex items-center space-x-2 bg-gray-700/50 hover:bg-gray-700 p-2 rounded-lg transition-colors">
                                <span className="text-white font-medium">{currentUser.profile.name}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-gray-400 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                            {isMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg z-20 overflow-hidden">
                                    <a onClick={() => handleNav('dashboard')} className={`block px-4 py-2 text-sm ${activeScreen === 'dashboard' ? 'bg-teal-500 text-white' : 'text-gray-200'} hover:bg-gray-600 cursor-pointer`}>Dashboard</a>
                                    <a onClick={() => handleNav('settings')} className={`block px-4 py-2 text-sm ${activeScreen === 'settings' ? 'bg-teal-500 text-white' : 'text-gray-200'} hover:bg-gray-600 cursor-pointer`}>Configurações</a>
                                    <div className="border-t border-gray-600"></div>
                                    <a onClick={logout} className="block px-4 py-2 text-sm text-red-400 hover:bg-red-500 hover:text-white cursor-pointer">Logout</a>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
