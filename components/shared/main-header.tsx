import React, { useMemo } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { ThemedText } from "../ui/ThemedText";
import { useTheme, ThemeType } from "react-native-magnus";
import { ThemedView } from "../ui/ThemedView";

const { height } = Dimensions.get('window');

interface HeaderProps {
    title: string;
}


const MainHeader = ({ title }: HeaderProps) => { 
    const {theme} = useTheme();
    const styles = useMemo(() => makeStyles(theme), [theme]);
    return (
        <ThemedView style={styles.header}>
            <ThemedView style={styles.headerWrapper}>
                <ThemedText fontSize='6xl' style={styles.title}>{title}</ThemedText>
            </ThemedView>
        </ThemedView>
    );
}

const makeStyles = (theme: ThemeType) => StyleSheet.create({
    header: {
        height: height * 0.2,
        
    },
    headerWrapper: {
        flex: 1,
        flexDirection: 'column', 
        justifyContent: 'flex-end',
        backgroundColor: theme.palette.primary[500] 
    },
    title: {
        fontFamily: 'SpecialGothic',
        color: '#FFF8D6',
        marginLeft: 15,
        marginBottom:5,
        fontSize:55
    }
 })



export default MainHeader;