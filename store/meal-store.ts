// mealStore.ts
import { DishInfo, MealOptions } from '@/dto/meals.dto';
import { AllMeals, MealState } from '@/dto/stores.dto';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';



export const initialState: AllMeals = {
    breakfast: [{
        name: 'Omlet',
        calories: 256,
        ingredients: ['eggss', 'spinach']
    }, {
        name: 'Salad',
        calories: 500,
        ingredients: ['Lettuce', 'Tomato']
    }],
    lunch:[{
        name: 'Chicken with tomato',
        calories: 256,
        ingredients: ['chicken', 'tomato']
    }, {
        name: 'Salmon',
        calories: 500,
        ingredients: ['Samon', 'Beans']
    }],
    snack:[{
        name: 'Whey',
        calories: 256,
        ingredients: ['Whey Protein']
    }, {
        name: 'Pioerogi',
        calories: 500,
        ingredients: ['Pierogi']
    }],
    dinner: [{
        name: 'Soup',
        calories: 256,
        ingredients: ['soup']
    }, {
        name: 'Rice',
        calories: 500,
        ingredients: ['rice']
    }]
}

const clearMeals = () => ({
    allMeals: {
      breakfast: [],
      lunch: [],
      snack: [],
      dinner: [],
    },
  })

  const useMealStore = create<MealState>()(
    persist(
      (set, get) => {
        const updateMealList = (mealType: MealOptions, dishInfo: DishInfo) => {
          const currentMeals = get().allMeals[mealType];
          return {
            ...get().allMeals,
            [mealType]: [...currentMeals, dishInfo],
          };
        };
  
        return {
          allMeals: initialState,
  
          addMeal: (mealType, dishInfo) =>
            set(() => ({
              allMeals: updateMealList(mealType, dishInfo),
            })),
  
          clearMeals: () =>
            set(() => ({
              allMeals: {
                breakfast: [],
                lunch: [],
                snack: [],
                dinner: [],
              },
            })),
        };
      },
      {
        name: 'all-meals-storage',
      }
    )
  );

export default useMealStore;
