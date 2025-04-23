import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert, Dimensions } from "react-native";
import { ThemedView } from "@/components/ui/ThemedView";
import MainHeader from "@/components/shared/main-header";
import { DishInfo, MealOptions } from "@/dto/meals.dto";
import useMealStore from "@/store/meal-store";
import RNPickerSelect from 'react-native-picker-select';
import { ThemedText } from "@/components/ui/ThemedText";
// import { TextInput } from "@/components/ui/TextInput";


const screenHeight = Dimensions.get('window').height;

export default function AddDishS() {
    const [dishName, setDishName] = useState("");
    const [selectedMeal, setSelectedMeal] = useState<MealOptions | null>(null);
    const [calories, setCalories] = useState("");
    const [ingredients, setIngredients] = useState<string[]>([""]);

    const addDish = useMealStore((state) => state.addMeal);

    const handleIngredientChange = (index: number, value: string) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index] = value;
        setIngredients(updatedIngredients);
    };

    const addIngredientField = () => {
        setIngredients([...ingredients, ""]);
    };

    const handleSave = () => {
        if (!dishName || !calories || ingredients.some(i => !i.trim())) {
            Alert.alert("Please fill out all fields.");
            return;
        }

        const newDish: DishInfo = {
            name: dishName,
            calories: Number(calories),
            ingredients: ingredients.map(i => i.trim()),
        };

        addDish(selectedMeal!, newDish);
    };

    return (
        <ThemedView>
            <MainHeader title="Add New Dish" />

            <ScrollView contentContainerStyle={styles.formContainer}>
                <Text style={styles.label}>Dish Name</Text>
                <TextInput
                    style={styles.input}
                    value={dishName}
                    onChangeText={setDishName}
                    placeholder="e.g. Chicken Stir Fry"
                />

                <Text style={styles.label}>Dish Type</Text>
                <RNPickerSelect
                    onValueChange={(value) => setSelectedMeal(value)}
                    items={[
                        { label: 'Breakfast', value: MealOptions.breakfast },
                        { label: 'Lunch', value: MealOptions.lunch },
                        { label: 'Snack', value: MealOptions.snack },
                        { label: 'Dinner', value: MealOptions.dinner },
                    ]}
                    placeholder={{ label: "Select a meal...", value: null }}
                    style={{
                        inputIOS: styles.input,
                        inputAndroid: styles.input,
                    }}
                />

                <Text style={styles.label}>Calories</Text>
                <TextInput
                    style={styles.input}
                    value={calories}
                    onChangeText={setCalories}
                    keyboardType="numeric"
                    placeholder="e.g. 500"
                />

                <Text style={styles.label}>Ingredients</Text>
                {ingredients.map((ingredient, index) => (
                    <TextInput
                        key={index}
                        style={styles.input}
                        value={ingredient}
                        onChangeText={(value) => handleIngredientChange(index, value)}
                        placeholder={`Ingredient ${index + 1}`}
                    />
                ))}

                <TouchableOpacity onPress={addIngredientField} style={styles.addButton}>
                    <Text style={styles.addButtonText}>+ Add Ingredient</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Save Dish</Text>
                </TouchableOpacity>
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    formContainer: {
        padding: 20,
        height: screenHeight * 0.8
    },
    label: {
        marginTop: 15,
        fontSize: 16,
        fontWeight: "500",
    },
    input: {
        borderWidth: 1,
        borderColor: "#aaa",
        borderRadius: 8,
        padding: 10,
        marginTop: 5,
        backgroundColor: "#fff",
    },
    addButton: {
        marginTop: 10,
        backgroundColor: "#4CAF50",
        padding: 12,
        borderRadius: 6,
        alignItems: "center",
    },
    addButtonText: {
        color: "#fff",
        fontSize: 16,
    },
    saveButton: {
        marginTop: 20,
        backgroundColor: "#2196F3",
        padding: 15,
        borderRadius: 6,
        alignItems: "center",
    },
    saveButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});
