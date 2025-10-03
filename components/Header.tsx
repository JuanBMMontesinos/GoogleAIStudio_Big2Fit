
import React from 'react';

interface HeaderProps {
    activeScreen: 'dashboard' | 'profile';
    setActiveScreen: (screen: 'dashboard' | 'profile') => void;
}

const Header: React.FC<HeaderProps> = ({ activeScreen, setActiveScreen }) => {

    const NavButton: React.FC<{screen: 'dashboard' | 'profile', children: React.ReactNode}> = ({ screen, children }) => {
        const isActive = activeScreen === screen;
        return (
            <button 
                onClick={() => setActiveScreen(screen)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${isActive ? 'bg-teal-500 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
            >
                {children}
            </button>
        )
    };

  return (
    <header className="bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-white">
              Big<span className="text-teal-400">2</span>Fit
            </span>
          </div>
          <nav className="flex items-center space-x-2">
            <NavButton screen="dashboard">Dashboard</NavButton>
            <NavButton screen="profile">Perfil</NavButton>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
