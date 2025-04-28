import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { Div, DivProps, ThemeType, useTheme } from "react-native-magnus";

export type ThemedViewProps = DivProps & {
  color?: string;
  style?: any;

};

export function ThemedView({
  style,
  ...otherProps
}: ThemedViewProps) {

  const { theme } = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  return <Div
    style={{ ...styles.basic, ...style }}
    {...otherProps}
  />;
}

const makeStyles = (theme: ThemeType) => StyleSheet.create({
  basic:{
    backgroundColor: theme.palette.primary[500]
 },
});
