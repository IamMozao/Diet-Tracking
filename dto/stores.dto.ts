// Meal

import { DishInfo, MealOptions } from "./meals.dto";
import { DayMeals, Weekdays } from "./week.dto";


export interface AllMeals {
    breakfast: DishInfo[];
    lunch: DishInfo[];
    snack: DishInfo[];
    dinner: DishInfo[];
}


export type MealState = {
  allMeals: AllMeals;
  addMeal: (mealType: MealOptions, dishInfo:DishInfo) => void;
  clearMeals: () => void;
};

// Week

export interface WeekMeals {
    [Weekdays.monday]: DayMeals;
    [Weekdays.tuesday]: DayMeals;
    [Weekdays.wednesday]: DayMeals;
    [Weekdays.thursday]: DayMeals;
    [Weekdays.friday]: DayMeals;
    [Weekdays.saturday]: DayMeals;
    [Weekdays.sunday]: DayMeals;
  }
  
  export type WeekState = {
    week: WeekMeals;
    updateWeek: (weekday: Weekdays, meal: MealOptions, dish: DishInfo) => void;
    clearWeek: () => void;
  };