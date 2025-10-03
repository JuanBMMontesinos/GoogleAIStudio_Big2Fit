
import React, { useContext, useMemo, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { calculateTargetCalories, calculateTargetMacros } from '../../services/calorieService';
import { MealFood, MealType } from '../../types';
import Card from '../ui/Card';
import CalorieSummary from '../dashboard/CalorieSummary';
import MacroSummary from '../dashboard/MacroSummary';
import WaterTracker from '../dashboard/WaterTracker';
import MealList from '../dashboard/MealList';
import AddFoodModal from '../dashboard/AddFoodModal';
import { MEAL_TYPES } from '../../constants';


const DashboardScreen: React.FC = () => {
    const { userProfile, dailyLog } = useContext(UserContext);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState<MealType | null>(null);

    const handleAddFoodClick = (mealType: MealType) => {
        setSelectedMeal(mealType);
        setModalOpen(true);
    };

    const {
        totalCalories,
        totalProtein,
        totalCarbs,
        totalFat,
        targetCalories,
        targetProtein,
        targetCarbs,
        targetFat
    } = useMemo(() => {
        if (!userProfile || !dailyLog) return { totalCalories: 0, totalProtein: 0, totalCarbs: 0, totalFat: 0, targetCalories: 0, targetProtein: 0, targetCarbs: 0, targetFat: 0 };

        let cals = 0, prot = 0, carbs = 0, fat = 0;
        
        MEAL_TYPES.forEach(mealType => {
            dailyLog.meals[mealType].foods.forEach((food: MealFood) => {
                const ratio = food.grams / 100;
                cals += food.calories * ratio;
                prot += food.protein * ratio;
                carbs += food.carbs * ratio;
                fat += food.fat * ratio;
            });
        });

        const targetCals = calculateTargetCalories(userProfile);
        const targetMacros = calculateTargetMacros(targetCals);

        return {
            totalCalories: Math.round(cals),
            totalProtein: Math.round(prot),
            totalCarbs: Math.round(carbs),
            totalFat: Math.round(fat),
            targetCalories: Math.round(targetCals),
            ...targetMacros,
        };
    }, [userProfile, dailyLog]);

    if (!userProfile || !dailyLog) {
        return <div className="text-center p-8">Carregando dados...</div>;
    }
    
    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-white mb-6">Resumo de Hoje, {userProfile.name}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <CalorieSummary
                    consumed={totalCalories}
                    target={targetCalories}
                />
                <Card className="md:col-span-2">
                   <MacroSummary
                        consumed={{ protein: totalProtein, carbs: totalCarbs, fat: totalFat }}
                        target={{ protein: targetProtein, carbs: targetCarbs, fat: targetFat }}
                    />
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <MealList onAddFoodClick={handleAddFoodClick} />
                </div>
                <div>
                   <WaterTracker />
                </div>
            </div>

            {selectedMeal && (
                <AddFoodModal
                    isOpen={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    mealType={selectedMeal}
                />
            )}
        </div>
    );
};

export default DashboardScreen;
