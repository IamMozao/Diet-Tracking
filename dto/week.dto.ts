import { DishInfo, MealOptions } from "./meals.dto";

export enum Weekdays {
    monday = 'monday',
    tuesday = 'tuesday',
    wednesday = 'wednesday',
    thursday = 'thursday',
    friday = 'friday',
    saturday = 'saturday',
    sunday = 'sunday',
}

export type DayMeals = {
    [MealOptions.breakfast]: DishInfo;
    [MealOptions.lunch]: DishInfo;
    [MealOptions.snack]: DishInfo;
    [MealOptions.dinner]: DishInfo;
}