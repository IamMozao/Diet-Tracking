import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="meals"
        options={{
          title: 'Meals',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="restaurant.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="week-plan"
        options={{
          title: 'Week Plan',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="calendar.circle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="add-dish"
        options={{
          title: 'Add Dish',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="local.restaurant" color={color} />,
        }}
      />
    </Tabs>
    
  );
}
