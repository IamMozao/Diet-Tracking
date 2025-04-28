import React, { useMemo, useState } from "react";
import { ThemedView } from "../ui/ThemedView";
import { Button, StyleSheet, TouchableOpacity } from "react-native";
import { DishInfo, MealOptions } from "@/dto/meals.dto";
import { IconSymbol } from "../ui/IconSymbol";
import { Weekdays } from "@/dto/week.dto";
import CustomModal from "./modal";
import DishList from "./dish-list";
import useMealStore from "@/store/meal-store";
import useWeekStore from "@/store/week-store";
import { ThemedText } from "../ui/ThemedText";
import { FlatList } from "react-native-gesture-handler";
import { Text, ThemeType, useTheme } from "react-native-magnus";


type DishViewProps = {
    dish: DishInfo;
    weekday?: Weekdays;
    meal?: MealOptions;
};

export default function DishView({ dish, weekday, meal }: DishViewProps) {
    const { theme } = useTheme();
    const styles = useMemo(() => makeStyles(theme), [theme]);


    const meals = useMealStore((state) => state.allMeals);

    const updateWeek = useWeekStore((state) => state.updateWeek);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDishSelection = (data: DishInfo) => {
        setIsModalOpen(false);
        updateWeek(weekday!, meal!, data);
    }

    const DishDetails = () => (
        <ThemedView style={styles.dishInfo}>
            <ThemedText style={styles.mealName}>{dish.name}</ThemedText>
            <ThemedView style={styles.ingredientsWrapper}>
                {
                    dish.ingredients.map(ingredient => (
                        <ThemedText style={styles.mealIngredients}>{ingredient}</ThemedText>
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
                        <TouchableOpacity onPress={() => handleDishSelection(item)}>
                            <DishView dish={item}></DishView>
                        </TouchableOpacity>
                    )}
                />
            </CustomModal>
        </ThemedView>
    )
}

const makeStyles = (theme: ThemeType) => {
    const bgColor = theme.palette.textOnPrimary;
    
    return StyleSheet.create({
        dishView: {
            width: '100%',
            marginBottom: 0,
            paddingHorizontal: 10,
            paddingTop:10,
            paddingBottom:10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: bgColor,
            borderBottomColor: theme.colors!.gray600,
            borderBottomWidth:1
        },
        mealName: { fontSize: 21,backgroundColor: bgColor,},
        ingredientsWrapper: {
            includeFontPadding: false,
            flexDirection: 'row',
            backgroundColor: bgColor,
        },
        mealIngredients: {
            marginRight: 5,
            includeFontPadding: false,
        },
        dishInfo: {
        },
        editDish: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 10
        },
        listContainer: {
            paddingVertical: 20,
            paddingHorizontal: 10,
        },
    })
};