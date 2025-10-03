
import React from 'react';

interface MacroData {
  protein: number;
  carbs: number;
  fat: number;
}

interface MacroSummaryProps {
  consumed: MacroData;
  target: MacroData;
}

const MacroProgressBar: React.FC<{ label: string; consumed: number; target: number, color: string }> = ({ label, consumed, target, color }) => {
  const percentage = target > 0 ? Math.min((consumed / target) * 100, 100) : 0;
  return (
    <div>
      <div className="flex justify-between items-baseline mb-1">
        <span className="text-sm font-medium text-white">{label}</span>
        <span className="text-xs text-gray-400">{consumed}g / {target}g</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <div className={`${color} h-2.5 rounded-full transition-all duration-500`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

const MacroSummary: React.FC<MacroSummaryProps> = ({ consumed, target }) => {
  return (
    <div className="h-full flex flex-col justify-between">
      <h2 className="text-xl font-bold text-white mb-4">Macronutrientes</h2>
      <div className="space-y-4">
        <MacroProgressBar label="Proteínas" consumed={consumed.protein} target={target.protein} color="bg-sky-500" />
        <MacroProgressBar label="Carboidratos" consumed={consumed.carbs} target={target.carbs} color="bg-yellow-500" />
        <MacroProgressBar label="Gorduras" consumed={consumed.fat} target={target.fat} color="bg-rose-500" />
      </div>
    </div>
  );
};

export default MacroSummary;
