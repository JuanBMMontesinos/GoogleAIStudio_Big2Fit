
export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum ActivityLevel {
  LOW = 'LOW', // Sedentário (pouco ou nenhum exercício)
  MODERATE = 'MODERATE', // Exercício leve (1-3 dias/semana)
  HIGH = 'HIGH', // Exercício moderado (3-5 dias/semana)
  VERY_HIGH = 'VERY_HIGH', // Exercício pesado (6-7 dias/semana)
  HYPERACTIVE = 'HYPERACTIVE', // Exercício muito pesado (trabalho físico + exercício)
}

export enum Goal {
  LOSE_WEIGHT_FAST = 'LOSE_WEIGHT_FAST',
  LOSE_WEIGHT_SLOW = 'LOSE_WEIGHT_SLOW',
  MAINTAIN_WEIGHT = 'MAINTAIN_WEIGHT',
  GAIN_WEIGHT_SLOW = 'GAIN_WEIGHT_SLOW',
  GAIN_WEIGHT_FAST = 'GAIN_WEIGHT_FAST',
}

export interface UserProfile {
  name: string;
  age: number;
  height: number;
  weight: number;
  gender: Gender;
  activityLevel: ActivityLevel;
  goal: Goal;
}

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  profile: UserProfile;
}

export interface Food {
  id: string;
  name: string;
  calories: number; // per 100g
  protein: number; // per 100g
  carbs: number; // per 100g
  fat: number; // per 100g
  isCustom?: boolean;
}

export interface MealFood extends Food {
  grams: number;
}

export type MealType = 'Café da Manhã' | 'Almoço' | 'Jantar' | 'Lanches';

export interface Meal {
  foods: MealFood[];
}

export interface Exercise {
    id: string;
    name: string;
    caloriesBurned: number; // per minute
}

export interface LoggedExercise extends Exercise {
    duration: number; // in minutes
}

export interface DailyLog {
  date: string; // YYYY-MM-DD
  meals: Record<MealType, Meal>;
  water: number; // in ml
  exercises: LoggedExercise[];
}
