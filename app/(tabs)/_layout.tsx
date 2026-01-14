import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        // Global Tab Bar Styling
        tabBarActiveTintColor: '#E50914', // Netflix Red
        tabBarInactiveTintColor: '#888',
        tabBarStyle: {
          backgroundColor: '#000', // Dark theme
          borderTopColor: '#222',
          height: Platform.OS === 'ios' ? 88 : 65,
          paddingBottom: Platform.OS === 'ios' ? 30 : 10,
        },
        headerStyle: {
          backgroundColor: '#000',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      {/* 1. Home Tab - Maps to app/(tabs)/index.tsx */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'film' : 'film-outline'} size={24} color={color} />
          ),
        }}
      />

      {/* 2. Search Tab - Maps to app/(tabs)/search.tsx */}
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'search' : 'search-outline'} size={24} color={color} />
          ),
        }}
      />

      {/* 3. Favorites Tab - Maps to app/(tabs)/favorites.tsx */}
      <Tabs.Screen
        name="favourites"
        options={{
          title: 'Watchlist',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'heart' : 'heart-outline'} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}