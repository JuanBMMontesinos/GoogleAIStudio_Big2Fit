

import React, { useContext } from 'react';
import Card from '../ui/Card';
// FIX: Corrected import path for UserContext
import { UserContext } from '../../context/UserContext';
// FIX: Corrected import path for constants
import { WATER_INCREMENT, MAX_WATER } from '../../constants';
import Button from '../ui/Button';

const WaterIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
    <svg className={`w-8 h-8 transition-colors duration-300 ${filled ? 'text-blue-400' : 'text-gray-600'}`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm0 1.5a8.25 8.25 0 110 16.5 8.25 8.25 0 010-16.5zm-3.855 8.32a.75.75 0 00-1.06 1.06l2.06 2.06c.234.234.615.234.85 0l4.48-4.48a.75.75 0 10-1.06-1.06L10 12.94l-1.855-1.855z" clipRule="evenodd" />
        <path d="M12,2A10,10,0,0,0,2,12c0,4.42,2.87,8.17,6.84,9.5c-1.33-1.63-2.2-3.77-2.2-6.2c0-5.1,3.9-9.3,8.7-9.7c-0.2-.07-0.4-.1-0.6-.1A10,10,0,0,0,12,2Z"/>
    </svg>
);


const WaterTracker: React.FC = () => {
    const { dailyLog, updateWaterIntake } = useContext(UserContext);
    const waterConsumed = dailyLog?.water || 0;
    
    const glasses = Array.from({ length: MAX_WATER / WATER_INCREMENT }, (_, i) => (i + 1) * WATER_INCREMENT);

    const handleWaterClick = (amount: number) => {
        updateWaterIntake(amount);
    };
    
    const handleReset = () => updateWaterIntake(0);

    return (
        <Card title="Água">
            <div className="text-center mb-4">
                <span className="text-3xl font-bold text-white">{waterConsumed}</span>
                <span className="text-lg text-gray-400"> / {MAX_WATER} ml</span>
            </div>
            <div className="grid grid-cols-4 gap-4 mb-4">
                {glasses.map((amount) => (
                    <button key={amount} onClick={() => handleWaterClick(amount)} className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-gray-700 transition-colors">
                        <WaterIcon filled={waterConsumed >= amount} />
                        <span className="text-xs mt-1 text-gray-400">{amount/1000}L</span>
                    </button>
                ))}
            </div>
            <Button onClick={handleReset} variant="secondary" className="w-full">Zerar</Button>
        </Card>
    );
};

export default WaterTracker;