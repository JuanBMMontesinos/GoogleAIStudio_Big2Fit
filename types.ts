
export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export enum ActivityLevel {
  LOW = 'low',
  MODERATE = 'moderate',
  HIGH = 'high',
  VERY_HIGH = 'very_high',
  HYPERACTIVE = 'hyperactive',
}

export enum Goal {
  LOSE_WEIGHT_FAST = 'lose_weight_fast',
  LOSE_WEIGHT_SLOW = 'lose_weight_slow',
  MAINTAIN_WEIGHT = 'maintain_weight',
  GAIN_WEIGHT_SLOW = 'gain_weight_slow',
  GAIN_WEIGHT_FAST = 'gain_weight_fast',
}

export interface UserProfile {
  name: string;
  height: number; // in cm
  weight: number; // in kg
  gender: Gender;
  age: number;
  activityLevel: ActivityLevel;
  goal: Goal;
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

export enum MealType {
  BREAKFAST = 'Café da Manhã',
  LUNCH = 'Almoço',
  DINNER = 'Jantar',
  SNACKS = 'Lanches',
}

export interface Meal {
  foods: MealFood[];
}

export type DailyLog = {
  date: string; // YYYY-MM-DD
  meals: Record<MealType, Meal>;
  water: number; // in ml
};
