import React, { useState } from "react";
import { ThemedView } from "../ui/ThemedView";
import { Button, StyleSheet, Text, TouchableOpacity } from "react-native";
import { DishInfo, MealOptions } from "@/dto/meals.dto";
import { IconSymbol } from "../ui/IconSymbol";
import { Weekdays } from "@/dto/week.dto";
import CustomModal from "./modal";
import DishList from "./dish-list";
import useMealStore from "@/store/meal-store";
import useWeekStore from "@/store/week-store";
import { ThemedText } from "../ui/ThemedText";
import { FlatList } from "react-native-gesture-handler";


type DishViewProps = {
    dish: DishInfo;
    weekday?: Weekdays;
    meal?: MealOptions;
};

export default function DishView({ dish, weekday, meal }: DishViewProps) {

    const meals = useMealStore((state) => state.allMeals);

    const updateWeek = useWeekStore((state) => state.updateWeek);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDishSelection = (data: DishInfo) => {
        setIsModalOpen(false);
        updateWeek(weekday!, meal!, data);
    }

    const DishDetails = () => (
        <ThemedView style={styles.dishInfo}>
            <Text style={styles.mealName}>{dish.name}</Text>
            <ThemedView style={styles.ingredientsWrapper}>
                {
                    dish.ingredients.map(ingredient => (
                        <Text style={styles.mealIngredients}>{ingredient}</Text>
                    ))
                }
            </ThemedView>
        </ThemedView>
    )

    return (
        <ThemedView
            key={dish.name}
            style={
                styles.dishView
            }
        >
            <DishDetails></DishDetails>
            {
                (weekday && meal) &&
                <TouchableOpacity onPress={() => setIsModalOpen(true)} style={styles.editDish}>
                    <Text>
                        <IconSymbol size={28} name="house.fill" color={'#000'} />,
                    </Text>
                </TouchableOpacity>
            }


            <CustomModal visible={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <FlatList
                            data={meals[meal!]}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={styles.listContainer}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={()=> handleDishSelection(item)}>
                                    <DishView dish={item}></DishView>
                                </TouchableOpacity>
                            )}
                        />
            </CustomModal>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    dishView: {
        backgroundColor: '#ccc',
        width: '100%',
        marginBottom: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    mealName: { fontSize: 21, backgroundColor: '#ccc', },
    ingredientsWrapper: {
        includeFontPadding: false,
        backgroundColor: '#ccc',
        flexDirection: 'row',
    },
    mealIngredients: {
        marginRight: 5,
        includeFontPadding: false
    },
    dishInfo: {
    },
    editDish: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ccc',
        paddingHorizontal: 10
    },
    listContainer: {
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
});