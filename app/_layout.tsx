import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemeProvider, Text, useTheme } from 'react-native-magnus';
import { lightTheme } from '@/constants/themes/light-theme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const theme = useTheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    SpecialGothic: require('../assets/fonts/SpecialGothicExpandedOne-Regular.ttf'),
    LatoBlack: require('../assets/fonts/lato/Lato-Black.ttf'),
    LatoBlackItalic: require('../assets/fonts/lato/Lato-BlackItalic.ttf'),
    LatoBold: require('../assets/fonts/lato/Lato-Bold.ttf'),
    LatoBoldItalic: require('../assets/fonts/lato/Lato-BoldItalic.ttf'),
    LatoItalic: require('../assets/fonts/lato/Lato-Italic.ttf'),
    LatoLight: require('../assets/fonts/lato/Lato-Light.ttf'),
    LatoLightItalic: require('../assets/fonts/lato/Lato-LightItalic.ttf'),
    LatoRegular: require('../assets/fonts/lato/Lato-Regular.ttf'),
    LatoThin: require('../assets/fonts/lato/Lato-Thin.ttf'),
    LatoThinItalic: require('../assets/fonts/lato/Lato-ThinItalic.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
console.log(theme);

  return (
    <ThemeProvider theme={lightTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
