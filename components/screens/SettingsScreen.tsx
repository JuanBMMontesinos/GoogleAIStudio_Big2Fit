
import React, { useState } from 'react';
import Card from '../ui/Card';
import ProfileEditor from '../settings/ProfileEditor';
import ChangePassword from '../settings/ChangePassword';

interface SettingsScreenProps {
    setActiveScreen: (screen: 'dashboard' | 'settings') => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ setActiveScreen }) => {
    const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile');

    return (
        <div className="container mx-auto max-w-2xl">
            <h1 className="text-3xl font-bold text-white mb-6">Configurações</h1>
            <div className="flex border-b border-gray-700 mb-6">
                <button 
                    onClick={() => setActiveTab('profile')} 
                    className={`px-4 py-2 text-lg font-medium transition-colors ${activeTab === 'profile' ? 'text-teal-400 border-b-2 border-teal-400' : 'text-gray-400 hover:text-white'}`}
                >
                    Meu Perfil
                </button>
                <button 
                    onClick={() => setActiveTab('password')} 
                    className={`px-4 py-2 text-lg font-medium transition-colors ${activeTab === 'password' ? 'text-teal-400 border-b-2 border-teal-400' : 'text-gray-400 hover:text-white'}`}
                >
                    Alterar Senha
                </button>
            </div>

            {activeTab === 'profile' && <ProfileEditor setActiveScreen={setActiveScreen} />}
            {activeTab === 'password' && <ChangePassword />}
        </div>
    );
};

export default SettingsScreen;