import { DishInfo } from '@/dto/meals.dto';
import React from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import DishView from './dish-info';

type DishListProps = {
    dishes: DishInfo[];
    onSelectDish: (data: DishInfo) => void;
};

export default function DishList({ dishes, onSelectDish }: DishListProps) {
    const sendData = (item: DishInfo) => {
        onSelectDish(item); 
    };

    return (
        <FlatList
            data={dishes}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={()=> sendData(item)}>
                    <DishView dish={item}></DishView>
                </TouchableOpacity>
            )}
        />
    );
}

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    itemBox: {
        backgroundColor: '#e0e0e0',
        padding: 16,
        borderRadius: 8,
        marginBottom: 10,
    },
    itemText: {
        fontSize: 16,
    },
});
