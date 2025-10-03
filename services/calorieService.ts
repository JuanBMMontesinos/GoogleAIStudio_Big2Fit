

// FIX: Corrected import path for types
import { UserProfile, Gender, ActivityLevel, Goal } from '../types';

const activityMultipliers: Record<ActivityLevel, number> = {
  [ActivityLevel.LOW]: 1.2,
  [ActivityLevel.MODERATE]: 1.375,
  [ActivityLevel.HIGH]: 1.55,
  [ActivityLevel.VERY_HIGH]: 1.725,
  [ActivityLevel.HYPERACTIVE]: 1.9,
};

const goalAdjustments: Record<Goal, number> = {
  [Goal.LOSE_WEIGHT_FAST]: -500,
  [Goal.LOSE_WEIGHT_SLOW]: -250,
  [Goal.MAINTAIN_WEIGHT]: 0,
  [Goal.GAIN_WEIGHT_SLOW]: 250,
  [Goal.GAIN_WEIGHT_FAST]: 500,
};

export const calculateBMR = (profile: UserProfile): number => {
  const { weight, height, age, gender } = profile;
  if (gender === Gender.MALE) {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
};

export const calculateTDEE = (profile: UserProfile): number => {
  const bmr = calculateBMR(profile);
  const multiplier = activityMultipliers[profile.activityLevel];
  return bmr * multiplier;
};

export const calculateTargetCalories = (profile: UserProfile): number => {
  const tdee = calculateTDEE(profile);
  const adjustment = goalAdjustments[profile.goal];
  return tdee + adjustment;
};

export const calculateTargetMacros = (targetCalories: number) => {
    // Standard 40% Carbs, 30% Protein, 30% Fat
    const protein = Math.round((targetCalories * 0.30) / 4);
    const carbs = Math.round((targetCalories * 0.40) / 4);
    const fat = Math.round((targetCalories * 0.30) / 9);
    return { protein, carbs, fat };
}