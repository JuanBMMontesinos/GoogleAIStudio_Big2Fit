import React, { useState, useContext } from 'react';
import { UserProvider, UserContext } from './context/UserContext';
import SettingsScreen from './components/screens/SettingsScreen';
import DashboardScreen from './components/screens/DashboardScreen';
import Header from './components/Header';
import AuthScreen from './components/screens/AuthScreen';

const MainApp: React.FC = () => {
  const { isProfileComplete } = useContext(UserContext);
  const [activeScreen, setActiveScreen] = useState<'dashboard' | 'settings'>('dashboard');

  // If the user is logged in but hasn't filled out their profile, force them to the settings screen.
  React.useEffect(() => {
    if (!isProfileComplete()) {
      setActiveScreen('settings');
    }
  }, [isProfileComplete]);


  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Header activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
      <main className="p-4 sm:p-6 md:p-8">
        {activeScreen === 'dashboard' ? <DashboardScreen /> : <SettingsScreen />}
      </main>
    </div>
  );
}


const AppContent: React.FC = () => {
  const { isAuthenticated } = useContext(UserContext);

  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  return <MainApp />;
};

const App: React.FC = () => {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
};

export default App;