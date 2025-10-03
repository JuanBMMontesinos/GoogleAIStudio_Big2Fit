
import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { UserProfile, DailyLog, Food, MealType, MealFood, Gender, ActivityLevel, Goal } from '../types';
import { PREDEFINED_FOODS, MEAL_TYPES } from '../constants';
import { v4 as uuidv4 } from 'uuid';

interface UserContextType {
  userProfile: UserProfile | null;
  dailyLog: DailyLog | null;
  foodList: Food[];
  saveUserProfile: (profile: UserProfile) => void;
  addFoodToMeal: (mealType: MealType, food: Food, grams: number) => void;
  removeFoodFromMeal: (mealType: MealType, foodId: string, grams: number) => void;
  addCustomFood: (food: Omit<Food, 'id' | 'isCustom'>) => void;
  updateWaterIntake: (amount: number) => void;
  isProfileComplete: () => boolean;
}

export const UserContext = createContext<UserContextType>({} as UserContextType);

const getTodayDateString = () => new Date().toISOString().split('T')[0];

const createEmptyLog = (date: string): DailyLog => {
  const emptyMeals = MEAL_TYPES.reduce((acc, mealType) => {
    acc[mealType] = { foods: [] };
    return acc;
  }, {} as Record<MealType, { foods: MealFood[] }>);

  return {
    date,
    meals: emptyMeals,
    water: 0,
  };
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [dailyLog, setDailyLog] = useState<DailyLog | null>(null);
  const [foodList, setFoodList] = useState<Food[]>([]);

  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      setUserProfile(JSON.parse(storedProfile));
    }

    const storedFoods = localStorage.getItem('customFoods');
    const customFoods = storedFoods ? JSON.parse(storedFoods) : [];
    setFoodList([...PREDEFINED_FOODS, ...customFoods]);
    
    const today = getTodayDateString();
    const storedLog = localStorage.getItem(`dailyLog-${today}`);
    if (storedLog) {
      setDailyLog(JSON.parse(storedLog));
    } else {
      setDailyLog(createEmptyLog(today));
    }
  }, []);

  const saveData = useCallback(() => {
    if (userProfile) localStorage.setItem('userProfile', JSON.stringify(userProfile));
    if (dailyLog) localStorage.setItem(`dailyLog-${dailyLog.date}`, JSON.stringify(dailyLog));
    const customFoods = foodList.filter(f => f.isCustom);
    localStorage.setItem('customFoods', JSON.stringify(customFoods));
  }, [userProfile, dailyLog, foodList]);

  useEffect(() => {
    saveData();
  }, [saveData]);

  const saveUserProfile = (profile: UserProfile) => {
    setUserProfile(profile);
  };

  const addCustomFood = (foodData: Omit<Food, 'id' | 'isCustom'>) => {
    const newFood: Food = { ...foodData, id: uuidv4(), isCustom: true };
    setFoodList(prevList => [...prevList, newFood]);
  };

  const addFoodToMeal = (mealType: MealType, food: Food, grams: number) => {
    setDailyLog(prevLog => {
      if (!prevLog) return null;
      const newLog = JSON.parse(JSON.stringify(prevLog)) as DailyLog;
      const mealFood: MealFood = { ...food, grams };
      newLog.meals[mealType].foods.push(mealFood);
      return newLog;
    });
  };
  
  const removeFoodFromMeal = (mealType: MealType, foodId: string, grams: number) => {
      setDailyLog(prevLog => {
          if (!prevLog) return null;
          const newLog = JSON.parse(JSON.stringify(prevLog)) as DailyLog;
          const meal = newLog.meals[mealType];
          const foodIndex = meal.foods.findIndex(f => f.id === foodId && f.grams === grams);
          if(foodIndex > -1){
              meal.foods.splice(foodIndex, 1);
          }
          return newLog;
      });
  };

  const updateWaterIntake = (amount: number) => {
    setDailyLog(prevLog => {
      if (!prevLog) return null;
      return { ...prevLog, water: amount };
    });
  };

  const isProfileComplete = () => {
    if (!userProfile) return false;
    return !!(userProfile.name && userProfile.age > 0 && userProfile.height > 0 && userProfile.weight > 0);
  };

  return (
    <UserContext.Provider value={{ userProfile, dailyLog, foodList, saveUserProfile, addFoodToMeal, removeFoodFromMeal, addCustomFood, updateWaterIntake, isProfileComplete }}>
      {children}
    </UserContext.Provider>
  );
};
