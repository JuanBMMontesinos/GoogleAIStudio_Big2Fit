
import React, { useState, useContext } from 'react';
import { UserProvider, UserContext } from './context/UserContext';
import ProfileScreen from './components/screens/ProfileScreen';
import DashboardScreen from './components/screens/DashboardScreen';
import Header from './components/Header';

const AppContent: React.FC = () => {
  const { userProfile, isProfileComplete } = useContext(UserContext);
  const [activeScreen, setActiveScreen] = useState<'dashboard' | 'profile'>('dashboard');

  if (!isProfileComplete()) {
    return <ProfileScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Header activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
      <main className="p-4 sm:p-6 md:p-8">
        {activeScreen === 'dashboard' ? <DashboardScreen /> : <ProfileScreen />}
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
};

export default App;
