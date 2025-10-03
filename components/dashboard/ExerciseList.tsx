
import React, { useContext } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { UserContext } from '../../context/UserContext';
import { LoggedExercise } from '../../types';
import PlusIcon from '../icons/PlusIcon';
import TrashIcon from '../icons/TrashIcon';
import DumbbellIcon from '../icons/DumbbellIcon';

interface ExerciseListProps {
  onAddExerciseClick: () => void;
}

const ExerciseList: React.FC<ExerciseListProps> = ({ onAddExerciseClick }) => {
  const { dailyLog, removeExercise } = useContext(UserContext);

  if (!dailyLog) return null;
  
  const calculateTotalCalories = (exercises: LoggedExercise[]) => {
      return exercises.reduce((total, ex) => {
          return total + Math.round(ex.caloriesBurned * ex.duration);
      }, 0);
  };
  
  const totalCaloriesBurned = calculateTotalCalories(dailyLog.exercises);

  return (
    <Card title="Exercícios">
      <div className="bg-gray-700/50 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h3 className="text-lg font-semibold text-white flex items-center">
                <DumbbellIcon className="h-5 w-5 mr-2" />
                <span>Atividade Física</span>
            </h3>
            <p className="text-sm text-gray-400">{totalCaloriesBurned} kcal queimadas</p>
          </div>
          <Button onClick={onAddExerciseClick} className="!p-2">
            <PlusIcon className="h-5 w-5" />
          </Button>
        </div>
        <ul className="space-y-2">
          {dailyLog.exercises.length > 0 ? (
            dailyLog.exercises.map((exercise, index) => (
              <li key={`${exercise.id}-${index}`} className="flex justify-between items-center text-sm bg-gray-900/50 p-2 rounded">
                <div>
                  <p className="text-gray-200">{exercise.name}</p>
                  <p className="text-xs text-gray-400">{exercise.duration} min</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-xs text-gray-300">~{Math.round(exercise.caloriesBurned * exercise.duration)} kcal</span>
                   <button onClick={() => removeExercise(exercise.id, exercise.duration)} className="text-gray-500 hover:text-red-500">
                     <TrashIcon />
                   </button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-sm text-gray-500 text-center py-2">Nenhum exercício adicionado.</p>
          )}
        </ul>
      </div>
    </Card>
  );
};

export default ExerciseList;
