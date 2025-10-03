
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, UserProfile, Food, MealType, MealFood, DailyLog, Exercise, LoggedExercise, Gender, ActivityLevel, Goal } from '../types';
import { FOOD_LIST } from '../constants';

// A mock hashing function for demonstration. In a real app, use a library like bcrypt.
const simpleHash = (s: string) => {
    let h = 0;
    for (let i = 0; i < s.length; i++) {
        h = Math.imul(31, h) + s.charCodeAt(i) | 0;
    }
    return h.toString();
};

const getTodayDateString = () => new Date().toISOString().split('T')[0];

const createEmptyLog = (date: string): DailyLog => ({
    date,
    meals: {
        'Café da Manhã': { foods: [] },
        'Almoço': { foods: [] },
        'Jantar': { foods: [] },
        'Lanches': { foods: [] },
    },
    water: 0,
    exercises: [],
});

interface IUserContext {
    isAuthenticated: boolean;
    currentUser: User | null;
    foodList: Food[];
    dailyLog: DailyLog | null;
    selectedDate: string;
    login: (email: string, pass: string) => boolean;
    signup: (name: string, email: string, pass: string) => boolean;
    logout: () => void;
    saveUserProfile: (profile: UserProfile) => void;
    updatePassword: (currentPass: string, newPass: string) => boolean;
    isProfileComplete: () => boolean;
    addFoodToMeal: (mealType: MealType, food: Food, grams: number) => void;
    removeFoodFromMeal: (mealType: MealType, foodId: string, grams: number) => void;
    addCustomFood: (food: Omit<Food, 'id' | 'isCustom'>) => void;
    updateWaterIntake: (amount: number) => void;
    changeDate: (direction: 'prev' | 'next' | 'today') => void;
    addExercise: (exercise: Exercise, duration: number) => void;
    removeExercise: (exerciseId: string, duration: number) => void;
}

export const UserContext = createContext<IUserContext>({} as IUserContext);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [users, setUsers] = useState<User[]>(() => {
        const localData = localStorage.getItem('users');
        return localData ? JSON.parse(localData) : [];
    });
    const [currentUser, setCurrentUser] = useState<User | null>(() => {
        const localData = localStorage.getItem('currentUser');
        return localData ? JSON.parse(localData) : null;
    });
    const [foodList, setFoodList] = useState<Food[]>(() => {
         const localData = localStorage.getItem('foodList');
        return localData ? JSON.parse(localData) : FOOD_LIST;
    });
    const [dailyLogs, setDailyLogs] = useState<Record<string, DailyLog>>(() => {
        const localData = localStorage.getItem('dailyLogs');
        return localData ? JSON.parse(localData) : {};
    });
    const [selectedDate, setSelectedDate] = useState<string>(getTodayDateString());

    const dailyLog = dailyLogs[selectedDate] || createEmptyLog(selectedDate);

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users));
    }, [users]);

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        } else {
            localStorage.removeItem('currentUser');
        }
    }, [currentUser]);
    
    useEffect(() => {
        localStorage.setItem('foodList', JSON.stringify(foodList));
    }, [foodList]);
    
    useEffect(() => {
        localStorage.setItem('dailyLogs', JSON.stringify(dailyLogs));
    }, [dailyLogs]);

    const updateLogs = (log: DailyLog) => {
        setDailyLogs(prev => ({ ...prev, [log.date]: log }));
    };

    const login = (email: string, pass: string): boolean => {
        const user = users.find(u => u.email === email);
        if (user && user.passwordHash === simpleHash(pass)) {
            setCurrentUser(user);
            return true;
        }
        return false;
    };

    const signup = (name: string, email: string, pass: string): boolean => {
        if (users.some(u => u.email === email)) {
            return false;
        }
        const newUser: User = {
            id: `user-${Date.now()}`,
            email,
            passwordHash: simpleHash(pass),
            profile: { name, age: 0, height: 0, weight: 0, gender: Gender.MALE, activityLevel: ActivityLevel.LOW, goal: Goal.MAINTAIN_WEIGHT },
        };
        setUsers(prev => [...prev, newUser]);
        setCurrentUser(newUser);
        return true;
    };

    const logout = () => {
        setCurrentUser(null);
    };

    const saveUserProfile = (profile: UserProfile) => {
        if (!currentUser) return;
        const updatedUser = { ...currentUser, profile };
        setCurrentUser(updatedUser);
        setUsers(prev => prev.map(u => u.id === currentUser.id ? updatedUser : u));
    };

    const updatePassword = (currentPass: string, newPass: string): boolean => {
        if (!currentUser || currentUser.passwordHash !== simpleHash(currentPass)) {
            return false;
        }
        const updatedUser = { ...currentUser, passwordHash: simpleHash(newPass) };
        setCurrentUser(updatedUser);
        setUsers(prev => prev.map(u => u.id === currentUser.id ? updatedUser : u));
        return true;
    };

    const isProfileComplete = (): boolean => {
        if (!currentUser?.profile) return false;
        const { age, height, weight, name } = currentUser.profile;
        return !!(age && height && weight && name);
    };

    const addFoodToMeal = (mealType: MealType, food: Food, grams: number) => {
        const newFood: MealFood = { ...food, grams };
        const updatedLog = { ...dailyLog };
        updatedLog.meals[mealType].foods.push(newFood);
        updateLogs(updatedLog);
    };

    const removeFoodFromMeal = (mealType: MealType, foodId: string, grams: number) => {
        const updatedLog = { ...dailyLog };
        const foods = updatedLog.meals[mealType].foods;
        const indexToRemove = foods.findIndex(f => f.id === foodId && f.grams === grams);
        if (indexToRemove > -1) {
            foods.splice(indexToRemove, 1);
        }
        updateLogs(updatedLog);
    };
    
    const addCustomFood = (food: Omit<Food, 'id' | 'isCustom'>) => {
        const newFood: Food = { ...food, id: `custom-${Date.now()}`, isCustom: true };
        setFoodList(prev => [newFood, ...prev]);
    }

    const updateWaterIntake = (amount: number) => {
        const updatedLog = { ...dailyLog, water: amount };
        updateLogs(updatedLog);
    };

    const changeDate = (direction: 'prev' | 'next' | 'today') => {
        if (direction === 'today') {
            setSelectedDate(getTodayDateString());
            return;
        }
        const currentDate = new Date(selectedDate + 'T00:00:00');
        if (direction === 'prev') {
            currentDate.setDate(currentDate.getDate() - 1);
        } else {
            currentDate.setDate(currentDate.getDate() + 1);
        }
        setSelectedDate(currentDate.toISOString().split('T')[0]);
    };
    
    const addExercise = (exercise: Exercise, duration: number) => {
        const newExercise: LoggedExercise = { ...exercise, duration };
        const updatedLog = { ...dailyLog };
        updatedLog.exercises.push(newExercise);
        updateLogs(updatedLog);
    }

    const removeExercise = (exerciseId: string, duration: number) => {
        const updatedLog = { ...dailyLog };
        const exercises = updatedLog.exercises;
        const indexToRemove = exercises.findIndex(ex => ex.id === exerciseId && ex.duration === duration);
        if (indexToRemove > -1) {
            exercises.splice(indexToRemove, 1);
        }
        updateLogs(updatedLog);
    };
    

    const value: IUserContext = {
        isAuthenticated: !!currentUser,
        currentUser,
        foodList,
        dailyLog,
        selectedDate,
        login,
        signup,
        logout,
        saveUserProfile,
        updatePassword,
        isProfileComplete,
        addFoodToMeal,
        removeFoodFromMeal,
        addCustomFood,
        updateWaterIntake,
        changeDate,
        addExercise,
        removeExercise,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
