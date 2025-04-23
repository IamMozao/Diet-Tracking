import { DishInfo, MealOptions } from '@/dto/meals.dto';
import { AllMeals, WeekMeals, WeekState } from '@/dto/stores.dto';
import { DayMeals, Weekdays } from '@/dto/week.dto';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { initialState as initialMealState } from './meal-store';

const emptyMeals: DayMeals = {
  breakfast: {
    name: 'Omlet',
    calories: 256,
    ingredients: ['eggss', 'spinach']
  },
  lunch: {
    name: 'Chicken with tomato',
    calories: 256,
    ingredients: ['chicken', 'tomato']
  },
  snack: {
    name: 'Whey',
    calories: 256,
    ingredients: ['Whey Protein']
  },
  dinner: {
    name: 'Soup',
    calories: 256,
    ingredients: ['soup']
  }
};

const initialWeek: WeekMeals = {
  [Weekdays.monday]: { ...emptyMeals },
  [Weekdays.tuesday]: { ...emptyMeals },
  [Weekdays.wednesday]: { ...emptyMeals },
  [Weekdays.thursday]: { ...emptyMeals },
  [Weekdays.friday]: { ...emptyMeals },
  [Weekdays.saturday]: { ...emptyMeals },
  [Weekdays.sunday]: { ...emptyMeals },
};

const useWeekStore = create<WeekState>()(
  persist(
    (set, get) => ({
      week: { ...initialWeek },

      updateWeek: (weekday, meal, dish) => {
        const currentWeek = get().week;
        set({
          week: {
            ...currentWeek,
            [weekday]: {
              ...currentWeek[weekday],
              [meal]: dish,
            },
          },
        });
      },

      clearWeek: () => {
        set({ week: { ...initialWeek } });
      },
    }),
    {
      name: 'week-storage',
    }
  )
);

export default useWeekStore;
