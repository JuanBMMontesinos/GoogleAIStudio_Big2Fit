
import React, { useContext } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { UserContext } from '../../context/UserContext';
import { MealType, MealFood } from '../../types';
import { MEAL_TYPES } from '../../constants';
import PlusIcon from '../icons/PlusIcon';
import TrashIcon from '../icons/TrashIcon';

interface MealListProps {
  onAddFoodClick: (mealType: MealType) => void;
}

const MealList: React.FC<MealListProps> = ({ onAddFoodClick }) => {
  const { dailyLog, removeFoodFromMeal } = useContext(UserContext);

  if (!dailyLog) return null;

  const calculateMealTotals = (foods: MealFood[]) => {
    return foods.reduce(
      (totals, food) => {
        const ratio = food.grams / 100;
        totals.calories += Math.round(food.calories * ratio);
        totals.protein += Math.round(food.protein * ratio);
        return totals;
      },
      { calories: 0, protein: 0 }
    );
  };

  return (
    <Card title="Refeições">
      <div className="space-y-6">
        {MEAL_TYPES.map(mealType => {
          const meal = dailyLog.meals[mealType];
          const totals = calculateMealTotals(meal.foods);
          return (
            <div key={mealType} className="bg-gray-700/50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <div>
                    <h3 className="text-lg font-semibold text-white">{mealType}</h3>
                    <p className="text-sm text-gray-400">{totals.calories} kcal  · {totals.protein}g Proteína</p>
                </div>
                <Button onClick={() => onAddFoodClick(mealType)} className="!p-2">
                  <PlusIcon className="h-5 w-5" />
                </Button>
              </div>
              <ul className="space-y-2">
                {meal.foods.length > 0 ? (
                  meal.foods.map((food, index) => (
                    <li key={`${food.id}-${index}`} className="flex justify-between items-center text-sm bg-gray-900/50 p-2 rounded">
                      <div>
                        <p className="text-gray-200">{food.name}</p>
                        <p className="text-xs text-gray-400">{food.grams}g</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-xs text-gray-300">{Math.round((food.calories * food.grams) / 100)} kcal</span>
                         <button onClick={() => removeFoodFromMeal(mealType, food.id, food.grams)} className="text-gray-500 hover:text-red-500">
                           <TrashIcon />
                         </button>
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 text-center py-2">Nenhum alimento adicionado.</p>
                )}
              </ul>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default MealList;
