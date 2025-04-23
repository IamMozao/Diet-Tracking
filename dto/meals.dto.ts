export enum MealOptions {
    breakfast = 'breakfast', 
    lunch = 'lunch',
    snack = 'snack',
    dinner = 'dinner'
}

export interface DishInfo {
    name: string;
    calories: number;
    ingredients: string[];
}