import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function DriverLayout() {
  return (
    <Tabs screenOptions={{ 
      headerShown: false,
      tabBarActiveTintColor: '#003566',
      tabBarStyle: { backgroundColor: '#bde0fe', height: 65, paddingBottom: 10 }
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Requests',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="clipboard-list" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="earnings"
        options={{
          title: 'Earnings',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="cash-multiple" size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}