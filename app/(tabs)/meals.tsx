import DishView from "@/components/shared/dish-info";
import MainHeader from "@/components/shared/main-header";
import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import { DishInfo, MealOptions } from "@/dto/meals.dto";
import useMealStore from "@/store/meal-store";
import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";



const screenHeight = Dimensions.get('window').height;

export default function Meals() {

    const tabs: MealOptions[] = [MealOptions.breakfast, MealOptions.lunch, MealOptions.snack, MealOptions.dinner];

    const meals = useMealStore((state) => state.allMeals);

    const [activeTab, setActiveTab] = useState(MealOptions.breakfast);
    const [activeMeal, setActiveMeal] = useState(meals.breakfast);

    const switchActiveTab = (tab: MealOptions) => {
        setActiveTab(tab);

        switch (tab) {
            case MealOptions.breakfast:
                setActiveMeal(meals.breakfast);
                break;

            case MealOptions.lunch:
                setActiveMeal(meals.lunch);
                break;

            case MealOptions.snack:
                setActiveMeal(meals.snack);
                break;

            case MealOptions.dinner:
                setActiveMeal(meals.dinner);
                break;

            default:
                break;
        }
    }

    const Tabs = () => {
        return (
            <ThemedView style={styles.tabContainer}>
                {
                    tabs.map(tab => (
                        <TouchableOpacity
                            key={tab}
                            style={[
                                styles.tabButton,
                                activeTab === tab && styles.activeTabButton
                            ]}
                            onPress={() => switchActiveTab(tab)}
                        >
                            <Text
                                type="defaultSemiBold"
                                style={[
                                    styles.tabText,
                                    activeTab == tab && styles.activeTabText
                                ]}
                            >
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))
                }
            </ThemedView>
        );
    }



    return (
        <ThemedView>
            <MainHeader title='Meals' />
            <ThemedView style={styles.bodyWrapper}>
                <Tabs></Tabs>
                <ThemedView style={styles.mealsContainer}>
                    <ThemedView style={styles.mealsWrapper}>
                        {
                            activeMeal.map((dish) => (
                                <DishView key={dish.name} dish={dish}></DishView>
                            ))
                        }
                    </ThemedView>
                </ThemedView>
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    bodyWrapper: {
        paddingTop: 10,
        paddingHorizontal: 10,
        justifyContent: 'flex-start',
        height: screenHeight * 0.8
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    tabButton: {
        paddingVertical: 8,
        paddingHorizontal: 15,
    },
    activeTabButton: {
        backgroundColor: '#f3f4ee',
        borderRadius: 10
    },
    tabText: {
        color: '#000',
        fontSize: 16,
    },
    activeTabText: {
        fontWeight: 'bold',
    },
    contentContainer: {
        padding: 20,
    },
    contentText: {
        fontSize: 18,
    },

    mealsContainer: {
        backgroundColor: '',
        paddingTop: 10
    },
    mealsWrapper: {
        justifyContent: 'center', // centers vertically
        alignItems: 'center',     // centers horizontally
        backgroundColor: '#fff',
        flexDirection: 'column',

    },
    mealView: {
        backgroundColor: '#ddd',
        width: '90%',
        marginBottom: 10,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    mealName: { fontSize: 21 },
    ingredientsWrapper: {
        flexDirection: 'row',
        backgroundColor: '#ddd'
    },
    mealIngredients: {
        marginRight: 5
    },
    mealViewMoreButton: {}
});