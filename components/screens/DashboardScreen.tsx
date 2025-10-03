
import React, { useState, useContext, useMemo } from 'react';
import { UserContext } from '../../context/UserContext';
import CalorieSummary from '../dashboard/CalorieSummary';
import MacroSummary from '../dashboard/MacroSummary';
import MealList from '../dashboard/MealList';
import WaterTracker from '../dashboard/WaterTracker';
import AddFoodModal from '../dashboard/AddFoodModal';
import { MealType, MealFood } from '../../types';
import DateNavigator from '../dashboard/DateNavigator';
import { calculateTargetCalories, calculateTargetMacros } from '../../services/calorieService';
import ExerciseList from '../dashboard/ExerciseList';
import AddExerciseModal from '../dashboard/AddExerciseModal';

const DashboardScreen: React.FC = () => {
  const { dailyLog, currentUser } = useContext(UserContext);
  const [isAddFoodModalOpen, setAddFoodModalOpen] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState<MealType>('Café da Manhã');
  const [isAddExerciseModalOpen, setAddExerciseModalOpen] = useState(false);

  const handleAddFoodClick = (mealType: MealType) => {
    setSelectedMealType(mealType);
    setAddFoodModalOpen(true);
  };
  
  const handleAddExerciseClick = () => {
      setAddExerciseModalOpen(true);
  }

  const totals = useMemo(() => {
    if (!dailyLog) return { calories: 0, protein: 0, carbs: 0, fat: 0, exerciseCalories: 0 };

    let calories = 0, protein = 0, carbs = 0, fat = 0;

    Object.values(dailyLog.meals).forEach(meal => {
      meal.foods.forEach((food: MealFood) => {
        const ratio = food.grams / 100;
        calories += food.calories * ratio;
        protein += food.protein * ratio;
        carbs += food.carbs * ratio;
        fat += food.fat * ratio;
      });
    });
    
    const exerciseCalories = dailyLog.exercises.reduce((total, ex) => total + (ex.caloriesBurned * ex.duration), 0);

    return { 
        calories: Math.round(calories), 
        protein: Math.round(protein), 
        carbs: Math.round(carbs), 
        fat: Math.round(fat),
        exerciseCalories: Math.round(exerciseCalories)
    };
  }, [dailyLog]);

  const targetCalories = useMemo(() => {
    return currentUser?.profile ? calculateTargetCalories(currentUser.profile) : 2000;
  }, [currentUser]);

  const targetMacros = useMemo(() => {
    return calculateTargetMacros(targetCalories);
  }, [targetCalories]);

  if (!currentUser || !dailyLog) {
      return <div className="text-center p-8">Carregando dados...</div>
  }

  return (
    <>
      <div className="container mx-auto">
        <DateNavigator />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna Esquerda */}
          <div className="lg:col-span-1 space-y-6">
            <CalorieSummary consumed={totals.calories} target={targetCalories} burned={totals.exerciseCalories} />
            <MacroSummary consumed={{protein: totals.protein, carbs: totals.carbs, fat: totals.fat}} target={targetMacros} />
          </div>

          {/* Coluna Direita */}
          <div className="lg:col-span-2 space-y-6">
            <MealList onAddFoodClick={handleAddFoodClick} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <WaterTracker />
                <ExerciseList onAddExerciseClick={handleAddExerciseClick} />
            </div>
          </div>
        </div>
      </div>
      
      <AddFoodModal 
        isOpen={isAddFoodModalOpen}
        onClose={() => setAddFoodModalOpen(false)}
        mealType={selectedMealType}
      />
      <AddExerciseModal
        isOpen={isAddExerciseModalOpen}
        onClose={() => setAddExerciseModalOpen(false)}
      />
    </>
  );
};

export default DashboardScreen;
