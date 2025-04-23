import { ThemedView } from "@/components/ui/ThemedView";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { ThemedText } from "../ui/ThemedText";

const { height } = Dimensions.get('window');

interface HeaderProps {
    title: string;
}

const MainHeader = ({ title }: HeaderProps) => { 

    return (
        <View style={styles.header}>
            <View style={styles.headerWrapper}>
                <Text style={styles.title}>{title}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        height: height * 0.2,
        backgroundColor: 'red'
    },
    headerWrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    title: {
        fontSize:36
    }
});

export default MainHeader;