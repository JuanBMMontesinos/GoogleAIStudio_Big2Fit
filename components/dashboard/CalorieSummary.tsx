
import React from 'react';
import Card from '../ui/Card';
import FireIcon from '../icons/FireIcon';

interface CalorieSummaryProps {
  consumed: number;
  target: number;
}

const CircularProgress: React.FC<{ percentage: number; color: string; children: React.ReactNode }> = ({ percentage, color, children }) => {
    const sqSize = 160;
    const strokeWidth = 14;
    const radius = (sqSize - strokeWidth) / 2;
    const viewBox = `0 0 ${sqSize} ${sqSize}`;
    const dashArray = radius * Math.PI * 2;
    const dashOffset = dashArray - (dashArray * Math.min(percentage, 100)) / 100;

    return (
        <div className="relative flex items-center justify-center" style={{width: sqSize, height: sqSize}}>
            <svg width={sqSize} height={sqSize} viewBox={viewBox}>
                <circle
                    className="fill-transparent stroke-gray-700"
                    cx={sqSize / 2}
                    cy={sqSize / 2}
                    r={radius}
                    strokeWidth={`${strokeWidth}px`}
                />
                <circle
                    className={`fill-transparent ${color}`}
                    cx={sqSize / 2}
                    cy={sqSize / 2}
                    r={radius}
                    strokeWidth={`${strokeWidth}px`}
                    transform={`rotate(-90 ${sqSize/2} ${sqSize/2})`}
                    style={{
                        strokeDasharray: dashArray,
                        strokeDashoffset: dashOffset,
                        strokeLinecap: 'round',
                        transition: 'stroke-dashoffset 0.5s ease-in-out',
                    }}
                />
            </svg>
            <div className="absolute text-center">
                {children}
            </div>
        </div>
    );
};

const CalorieSummary: React.FC<CalorieSummaryProps> = ({ consumed, target }) => {
  const remaining = target - consumed;
  const percentage = target > 0 ? (consumed / target) * 100 : 0;

  return (
    <Card title="Calorias" className="flex flex-col items-center">
        <CircularProgress percentage={percentage} color="stroke-teal-400">
            <span className="text-3xl font-bold text-white">{consumed}</span>
            <span className="text-sm text-gray-400">kcal</span>
        </CircularProgress>
        <div className="w-full flex justify-around mt-4 text-center">
            <div>
                <p className="text-xs text-gray-400 uppercase">Meta</p>
                <p className="font-bold text-white">{target}</p>
            </div>
             <div>
                <p className="text-xs text-gray-400 uppercase">Restante</p>
                <p className={`font-bold ${remaining < 0 ? 'text-red-500' : 'text-white'}`}>{remaining}</p>
            </div>
        </div>
    </Card>
  );
};

export default CalorieSummary;
