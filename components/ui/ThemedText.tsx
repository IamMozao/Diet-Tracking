import { Text, StyleProp, StyleSheet, TextStyle } from 'react-native';
import { Text as MagnusText, TextProps } from 'react-native-magnus';

export type ThemedTextProps = TextProps & {
  color?: string;
  style?: any;

};

export function ThemedText({
  style,
  color,
  ...rest
}: ThemedTextProps) {

  return (
    <MagnusText
    style={{...styles.basic, ...style}}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  basic:{
     backgroundColor: "transparent",
     fontFamily: 'LatoRegular'
  },
});
