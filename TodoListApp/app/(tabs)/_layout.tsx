import { Tabs } from 'expo-router';
import React from 'react';
import { Provider } from 'react-redux';
import store from '../../redux/themeMode/themeStore';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="test"
          options={{
            title: 'Test',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
            ),
          }}
        />
        {/* <Tabs.Screen
          name="explore"
          options={{
            title: 'screen',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'heart' : 'heart-outline'} color={color} />
            ),
          }}
        /> */}
      </Tabs>
    </Provider>
  );
}
