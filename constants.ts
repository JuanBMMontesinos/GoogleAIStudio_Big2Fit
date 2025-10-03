
import { Food, ActivityLevel, Goal, Gender, MealType } from './types';
import { v4 as uuidv4 } from 'uuid';

export const ACTIVITY_LEVELS = [
  { id: ActivityLevel.LOW, label: 'Baixo - Pouco ou nenhum exercício' },
  { id: ActivityLevel.MODERATE, label: 'Moderado - Exercício leve 1-3x/semana' },
  { id: ActivityLevel.HIGH, label: 'Alto - Exercício moderado 3-5x/semana' },
  { id: ActivityLevel.VERY_HIGH, label: 'Muito Alto - Exercício intenso 6-7x/semana' },
  { id: ActivityLevel.HYPERACTIVE, label: 'Hiperativo - Atividade muito intensa ou trabalho pesado' },
];

export const GOALS = [
  { id: Goal.LOSE_WEIGHT_FAST, label: 'Perder peso' },
  { id: Goal.LOSE_WEIGHT_SLOW, label: 'Perder peso lentamente' },
  { id: Goal.MAINTAIN_WEIGHT, label: 'Manter peso' },
  { id: Goal.GAIN_WEIGHT_SLOW, label: 'Aumentar peso lentamente' },
  { id: Goal.GAIN_WEIGHT_FAST, label: 'Aumentar peso' },
];

export const GENDERS = [
    { id: Gender.MALE, label: 'Masculino' },
    { id: Gender.FEMALE, label: 'Feminino' },
]

export const MEAL_TYPES = [
  MealType.BREAKFAST,
  MealType.LUNCH,
  MealType.DINNER,
  MealType.SNACKS,
];

export const PREDEFINED_FOODS: Food[] = [
  { id: uuidv4(), name: 'Arroz Branco Cozido', calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
  { id: uuidv4(), name: 'Feijão Carioca Cozido', calories: 76, protein: 5, carbs: 14, fat: 0.5 },
  { id: uuidv4(), name: 'Peito de Frango Grelhado', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { id: uuidv4(), name: 'Bife de Alcatra Grelhado', calories: 240, protein: 35, carbs: 0, fat: 10 },
  { id: uuidv4(), name: 'Ovo Cozido', calories: 155, protein: 13, carbs: 1.1, fat: 11 },
  { id: uuidv4(), name: 'Pão Francês', calories: 289, protein: 9, carbs: 59, fat: 3 },
  { id: uuidv4(), name: 'Batata Doce Cozida', calories: 86, protein: 1.6, carbs: 20, fat: 0.1 },
  { id: uuidv4(), name: 'Maçã', calories: 52, protein: 0.3, carbs: 14, fat: 0.2 },
  { id: uuidv4(), name: 'Banana', calories: 89, protein: 1.1, carbs: 23, fat: 0.3 },
  { id: uuidv4(), name: 'Leite Integral', calories: 61, protein: 3.4, carbs: 5, fat: 3.3 },
  { id: uuidv4(), name: 'Queijo Minas Frescal', calories: 264, protein: 17, carbs: 2, fat: 20 },
  { id: uuidv4(), name: 'Azeite de Oliva', calories: 884, protein: 0, carbs: 0, fat: 100 },
  { id: uuidv4(), name: 'Alface', calories: 15, protein: 1.4, carbs: 2.9, fat: 0.2 },
  { id: uuidv4(), name: 'Tomate', calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2 },
  { id: uuidv4(), name: 'Brócolis Cozido', calories: 35, protein: 2.4, carbs: 7.2, fat: 0.4 },
];

export const WATER_INCREMENT = 250; // ml
export const MAX_WATER = 3000; // ml
