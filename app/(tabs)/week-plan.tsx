import DishView from "@/components/shared/dish-info";
import MainHeader from "@/components/shared/main-header";
import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import { MealOptions } from "@/dto/meals.dto";
import { Weekdays } from "@/dto/week.dto";
import { capitalize } from "@/helpers/general";
import useWeekStore from "@/store/week-store";
import React, { useMemo, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Collapsible from 'react-native-collapsible';
import { ThemeType, useTheme } from "react-native-magnus";


const screenHeight = Dimensions.get('window').height;

type WeekdayProps = {
    day: Weekdays;
};

export default function WeekPlan() {
    const { theme } = useTheme();
    const styles = useMemo(() => makeStyles(theme), [theme]);

    const [expandedDays, setExpandedDays] = useState<Partial<Record<Weekdays, boolean>>>({});

    const toggleCollapse = (day: Weekdays) => {
        setExpandedDays((prev) => ({
            ...prev,
            [day]: !prev[day]
        }));
    };


    const week = useWeekStore((state) => state.week);

    const weekdays = [Weekdays.monday, Weekdays.tuesday, Weekdays.wednesday, Weekdays.thursday, Weekdays.friday, Weekdays.saturday, Weekdays.sunday];


    return (
        <ThemedView>
            <MainHeader title='Week Plan' />
            <ScrollView contentContainerStyle={styles.bodyWrapper}>
                {weekdays.map(day => (
                    <ThemedView style={styles.container}>
                        <TouchableOpacity onPress={() => toggleCollapse(day)} style={styles.button}>
                            <ThemedText style={styles.buttonText}>{capitalize(day)}</ThemedText>
                        </TouchableOpacity>

                        <Collapsible collapsed={!expandedDays[day]}>
                            <DishView dish={week[day].breakfast} weekday={day} meal={MealOptions.breakfast}></DishView>
                            <DishView dish={week[day].lunch} weekday={day} meal={MealOptions.lunch}></DishView>
                            <DishView dish={week[day].snack} weekday={day} meal={MealOptions.snack}></DishView>
                            <DishView dish={week[day].dinner} weekday={day} meal={MealOptions.dinner}></DishView>
                        </Collapsible>
                    </ThemedView>
                ))}
            </ScrollView>
        </ThemedView>
    );
}

const makeStyles = (theme: ThemeType) => StyleSheet.create({
    bodyWrapper: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        justifyContent: 'flex-start',
        height: screenHeight * 0.8
    },
    container: {
        paddingVertical: 5,
        backgroundColor: theme.palette.textOnPrimary,
        marginBottom: 10,
        borderRadius:15,
        padding:10

    },
    button: {
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: theme.colors!.gray900,
        fontSize: 16,
        fontFamily: 'LatoBlack'
    }
});

