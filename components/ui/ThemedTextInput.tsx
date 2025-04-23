import { TextInput, type TextInputProps, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'multiline';
};

export function ThemedTextInput({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextInputProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const backgroundColor = useThemeColor({ light: '#fff', dark: '#000' }, 'background');

  return (
    <TextInput
      style={[
        { color, backgroundColor },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'multiline' ? styles.multiline : undefined,
        style,
      ]}
      placeholderTextColor={color}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    padding: 10,
    borderRadius: 6,
    fontFamily: 'MyFont-Regular',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 12,
    fontFamily: 'MyFont-Bold',
  },
  multiline: {
    fontSize: 16,
    lineHeight: 24,
    padding: 10,
    borderRadius: 6,
    fontFamily: 'MyFont-Regular',
    textAlignVertical: 'top',
  },
});
