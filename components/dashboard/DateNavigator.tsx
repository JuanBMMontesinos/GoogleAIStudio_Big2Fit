import React, { useContext } from 'react';
// FIX: Corrected import path for UserContext
import { UserContext } from '../../context/UserContext';

const ChevronLeftIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
);

const ChevronRightIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);


const DateNavigator: React.FC = () => {
    const { selectedDate, changeDate, currentUser } = useContext(UserContext);

    const formatDate = (dateString: string) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const date = new Date(dateString + 'T00:00:00Z');
        
        const todayString = today.toISOString().split('T')[0];
        if (dateString === todayString) return "Hoje";
        
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        if (date.getTime() === yesterday.getTime()) return "Ontem";

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        if (date.getTime() === tomorrow.getTime()) return "Amanhã";
        
        return date.toLocaleDateString('pt-BR', { timeZone: 'UTC', day: '2-digit', month: 'short' });
    };

    const isToday = selectedDate === new Date().toISOString().split('T')[0];

    return (
        <div className="flex items-center justify-between mb-6">
             <div>
                <h1 className="text-3xl font-bold text-white">Resumo de {formatDate(selectedDate)}</h1>
                { currentUser?.profile?.name && <p className="text-lg text-gray-400">Olá, {currentUser.profile.name}</p> }
            </div>
            <div className="flex items-center space-x-2">
                 {!isToday && (
                    <button
                        onClick={() => changeDate('today')}
                        className="px-3 py-2 text-sm font-medium rounded-md transition-colors bg-gray-700 text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-teal-500"
                    >
                        Hoje
                    </button>
                 )}
                <button onClick={() => changeDate('prev')} className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-teal-500">
                    <ChevronLeftIcon />
                </button>
                <button onClick={() => changeDate('next')} className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-teal-500">
                    <ChevronRightIcon />
                </button>
            </div>
        </div>
    );
};

export default DateNavigator;