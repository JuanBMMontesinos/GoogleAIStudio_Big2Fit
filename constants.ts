
import { Gender, ActivityLevel, Goal, Food, MealType, Exercise } from './types';

export const MEAL_TYPES: MealType[] = ['Café da Manhã', 'Almoço', 'Jantar', 'Lanches'];

export const GENDERS = [
  { id: Gender.MALE, label: 'Masculino' },
  { id: Gender.FEMALE, label: 'Feminino' },
];

export const ACTIVITY_LEVELS = [
  { id: ActivityLevel.LOW, label: 'Sedentário (pouco ou nenhum exercício)' },
  { id: ActivityLevel.MODERATE, label: 'Exercício leve (1-3 dias/semana)' },
  { id: ActivityLevel.HIGH, label: 'Exercício moderado (3-5 dias/semana)' },
  { id: ActivityLevel.VERY_HIGH, label: 'Exercício pesado (6-7 dias/semana)' },
  { id: ActivityLevel.HYPERACTIVE, label: 'Muito Ativo (trabalho físico + exercício)' },
];

export const GOALS = [
  { id: Goal.LOSE_WEIGHT_FAST, label: 'Perder peso rápido (-500 kcal)' },
  { id: Goal.LOSE_WEIGHT_SLOW, label: 'Perder peso devagar (-250 kcal)' },
  { id: Goal.MAINTAIN_WEIGHT, label: 'Manter peso' },
  { id: Goal.GAIN_WEIGHT_SLOW, label: 'Ganhar peso devagar (+250 kcal)' },
  { id: Goal.GAIN_WEIGHT_FAST, label: 'Ganhar peso rápido (+500 kcal)' },
];

export const WATER_INCREMENT = 250; // ml
export const MAX_WATER = 3000; // ml

export const FOOD_LIST: Food[] = [
    { id: '1', name: 'Peito de Frango Grelhado', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    { id: '2', name: 'Arroz Branco Cozido', calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
    { id: '3', name: 'Feijão Preto Cozido', calories: 132, protein: 8.9, carbs: 23.7, fat: 0.5 },
    { id: '4', name: 'Batata Doce Cozida', calories: 86, protein: 1.6, carbs: 20, fat: 0.1 },
    { id: '5', name: 'Ovo Cozido', calories: 155, protein: 13, carbs: 1.1, fat: 11 },
    { id: '6', name: 'Banana Prata', calories: 89, protein: 1.1, carbs: 23, fat: 0.3 },
    { id: '7', name: 'Salmão Grelhado', calories: 208, protein: 20, carbs: 0, fat: 13 },
    { id: '8', name: 'Azeite de Oliva', calories: 884, protein: 0, carbs: 0, fat: 100 },
    { id: '9', name: 'Pão Integral', calories: 247, protein: 13, carbs: 41, fat: 4 },
    { id: '10', name: 'Leite Integral', calories: 61, protein: 3.2, carbs: 4.8, fat: 3.3 },
];

export const EXERCISE_LIST: Exercise[] = [
    { id: 'ex1', name: 'Caminhada', caloriesBurned: 5 },
    { id: 'ex2', name: 'Corrida', caloriesBurned: 10 },
    { id: 'ex3', name: 'Ciclismo', caloriesBurned: 8 },
    { id: 'ex4', name: 'Musculação', caloriesBurned: 6 },
];
