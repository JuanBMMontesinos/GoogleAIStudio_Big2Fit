
import React from 'react';
import Card from '../ui/Card';
import FireIcon from '../icons/FireIcon';

interface CalorieSummaryProps {
  consumed: number;
  target: number;
  burned: number;
}

const CalorieSummary: React.FC<CalorieSummaryProps> = ({ consumed, target, burned }) => {
  const netConsumed = consumed - burned;
  const remaining = Math.max(0, target - netConsumed);
  const percentage = target > 0 ? Math.min((netConsumed / target) * 100, 100) : 0;

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <Card className="flex flex-col items-center justify-center text-center h-full">
      <div className="relative w-48 h-48 mb-4">
        <svg className="w-full h-full" viewBox="0 0 200 200">
          <circle
            className="text-gray-700"
            strokeWidth="12"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="100"
            cy="100"
          />
          <circle
            className="text-teal-400"
            strokeWidth="12"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="100"
            cy="100"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
            transform="rotate(-90 100 100)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-white">{Math.round(remaining)}</span>
            <span className="text-sm text-gray-400">Restantes</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 w-full text-center">
        <div>
          <p className="text-xs text-gray-400">Meta</p>
          <p className="font-semibold text-white">{Math.round(target)}</p>
        </div>
        <div className="border-l border-r border-gray-700">
          <p className="text-xs text-gray-400">Consumido</p>
          <p className="font-semibold text-white">{Math.round(consumed)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Exercício</p>
          <p className="font-semibold text-white">{Math.round(burned)}</p>
        </div>
      </div>
    </Card>
  );
};

export default CalorieSummary;
