import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, UserProfile, DailyLog, Food, MealType, MealFood, Gender, ActivityLevel, Goal } from '../types';
import { PREDEFINED_FOODS, MEAL_TYPES } from '../constants';
import { v4 as uuidv4 } from 'uuid';

// In a real app, this would be handled by a backend.
// We are simulating a user database in localStorage.
const USERS_STORAGE_KEY = 'big2fit_users';
const LOGGED_IN_USER_ID_KEY = 'big2fit_loggedInUserId';

interface UserContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  dailyLog: DailyLog | null;
  foodList: Food[];
  selectedDate: string;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  saveUserProfile: (profile: UserProfile) => void;
  updatePassword: (currentPassword: string, newPassword: string) => boolean;
  addFoodToMeal: (mealType: MealType, food: Food, grams: number) => void;
  removeFoodFromMeal: (mealType: MealType, foodId: string, grams: number) => void;
  addCustomFood: (food: Omit<Food, 'id' | 'isCustom'>) => void;
  updateWaterIntake: (amount: number) => void;
  isProfileComplete: () => boolean;
  changeDate: (direction: 'next' | 'prev' | 'today') => void;
}

export const UserContext = createContext<UserContextType>({} as UserContextType);

const getTodayDateString = () => new Date().toISOString().split('T')[0];

const createEmptyLog = (date: string): DailyLog => {
  const emptyMeals = MEAL_TYPES.reduce((acc, mealType) => {
    acc[mealType] = { foods: [] };
    return acc;
  }, {} as Record<MealType, { foods: MealFood[] }>);

  return { date, meals: emptyMeals, water: 0 };
};

const createEmptyProfile = (name: string): UserProfile => ({
  name,
  height: 0,
  weight: 0,
  gender: Gender.MALE,
  age: 0,
  activityLevel: ActivityLevel.MODERATE,
  goal: Goal.MAINTAIN_WEIGHT,
});


export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [dailyLog, setDailyLog] = useState<DailyLog | null>(null);
  const [foodList, setFoodList] = useState<Food[]>(PREDEFINED_FOODS);
  const [selectedDate, setSelectedDate] = useState<string>(getTodayDateString());

  // Effect for initial load of users and session (runs once)
  useEffect(() => {
    const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
    const allUsers = storedUsers ? JSON.parse(storedUsers) : [];
    setUsers(allUsers);
    
    const loggedInUserId = localStorage.getItem(LOGGED_IN_USER_ID_KEY);
    if (loggedInUserId) {
      const userToLogin = allUsers.find((u: User) => u.id === loggedInUserId);
      if (userToLogin) {
        setCurrentUser(userToLogin);
      }
    }
  }, []);

  // Effect to load data when currentUser or selectedDate changes
  useEffect(() => {
    if (currentUser) {
      // Load user's custom foods
      const storedFoods = localStorage.getItem(`customFoods-${currentUser.id}`);
      const customFoods = storedFoods ? JSON.parse(storedFoods) : [];
      setFoodList([...PREDEFINED_FOODS, ...customFoods]);

      // Load daily log for selected date
      const storedLog = localStorage.getItem(`dailyLog-${currentUser.id}-${selectedDate}`);
      if (storedLog) {
        setDailyLog(JSON.parse(storedLog));
      } else {
        setDailyLog(createEmptyLog(selectedDate));
      }
    } else {
      // Reset data if no user is logged in
      setDailyLog(null);
      setFoodList(PREDEFINED_FOODS);
    }
  }, [currentUser, selectedDate]);
  
  // Effect to save dailyLog whenever it changes
  useEffect(() => {
    if (dailyLog && currentUser) {
      localStorage.setItem(`dailyLog-${currentUser.id}-${dailyLog.date}`, JSON.stringify(dailyLog));
    }
  }, [dailyLog, currentUser]);
  
  const persistUsers = (updatedUsers: User[]) => {
      setUsers(updatedUsers);
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
  }

  const signup = (name: string, email: string, password: string): boolean => {
    const emailExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if(emailExists) {
        alert("Email já cadastrado.");
        return false;
    }
    const newUser: User = {
        id: uuidv4(),
        email,
        password, // In a real app, hash this!
        profile: createEmptyProfile(name),
    };
    const updatedUsers = [...users, newUser];
    persistUsers(updatedUsers);
    setCurrentUser(newUser);
    localStorage.setItem(LOGGED_IN_USER_ID_KEY, newUser.id);
    return true;
  }
  
  const login = (email: string, password: string): boolean => {
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if(user && user.password === password) {
          setCurrentUser(user);
          localStorage.setItem(LOGGED_IN_USER_ID_KEY, user.id);
          return true;
      }
      return false;
  }
  
  const logout = () => {
      setCurrentUser(null);
      localStorage.removeItem(LOGGED_IN_USER_ID_KEY);
  }

  const saveUserProfile = (profile: UserProfile) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, profile };
    setCurrentUser(updatedUser);

    const updatedUsers = users.map(u => u.id === currentUser.id ? updatedUser : u);
    persistUsers(updatedUsers);
  };
  
  const updatePassword = (currentPassword: string, newPassword: string): boolean => {
    if(!currentUser || currentUser.password !== currentPassword) return false;
    
    const updatedUser = { ...currentUser, password: newPassword };
    setCurrentUser(updatedUser);
    
    const updatedUsers = users.map(u => u.id === currentUser.id ? updatedUser : u);
    persistUsers(updatedUsers);
    return true;
  }

  const addCustomFood = (foodData: Omit<Food, 'id' | 'isCustom'>) => {
    if (!currentUser) return;
    const newFood: Food = { ...foodData, id: uuidv4(), isCustom: true };
    const updatedFoodList = [...foodList, newFood];
    setFoodList(updatedFoodList);
    
    const customFoods = updatedFoodList.filter(f => f.isCustom);
    localStorage.setItem(`customFoods-${currentUser.id}`, JSON.stringify(customFoods));
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
    if (!currentUser?.profile) return false;
    const { profile } = currentUser;
    return !!(profile.name && profile.age > 0 && profile.height > 0 && profile.weight > 0);
  };

  const changeDate = (direction: 'next' | 'prev' | 'today') => {
      if (direction === 'today') {
          setSelectedDate(getTodayDateString());
          return;
      }
      
      const currentDate = new Date(selectedDate + 'T00:00:00Z');
      if (direction === 'next') {
          currentDate.setDate(currentDate.getDate() + 1);
      } else {
          currentDate.setDate(currentDate.getDate() - 1);
      }
      setSelectedDate(currentDate.toISOString().split('T')[0]);
  };

  const isAuthenticated = !!currentUser;
  // Note: userProfile is now derived from currentUser for backward compatibility in components
  const userProfile = currentUser?.profile || null; 

  return (
    <UserContext.Provider value={{ currentUser, isAuthenticated, dailyLog, foodList, selectedDate, changeDate, login, signup, logout, saveUserProfile, updatePassword, addFoodToMeal, removeFoodFromMeal, addCustomFood, updateWaterIntake, isProfileComplete }}>
      {children}
    </UserContext.Provider>
  );
};