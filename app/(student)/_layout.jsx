import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';

export default function StudentLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0084c2',
        tabBarInactiveTintColor: '#777',
        tabBarStyle: {
          backgroundColor: '#d8eefe',
          height: Platform.OS === 'ios' ? 85 : 70, 
          paddingBottom: Platform.OS === 'ios' ? 25 : 12,
          paddingTop: 8,
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="moped" size={28} color={color} />,
        }}
      />

      <Tabs.Screen
        name="detail"
        options={{
          title: 'Details',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="clipboard-text-outline" size={26} color={color} />,
        }}
      />

      {/* MAO NI ANG SECRET PARA MAWALA SIYA SA NAV BAR */}
      <Tabs.Screen
        name="messages"
        options={{
          href: null, // Kini ang mopapahawa sa "Messages" sa ubos
        }}
      />

      <Tabs.Screen
        name="studentprofile" 
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account-circle-outline" size={26} color={color} />,
        }}
      />
    </Tabs>
  );
}