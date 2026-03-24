import { Tabs } from 'expo-router';
import { Home, Calendar, Target, Sparkles, MapPin, User } from 'lucide-react-native';

const TAB_ICON_SIZE = 22;

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#18181b',
        tabBarInactiveTintColor: '#a1a1aa',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1.5,
          borderTopColor: '#f4f4f5',
          paddingTop: 8,
          height: 80,
          paddingBottom: 20,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '800',
          textTransform: 'uppercase',
          letterSpacing: 0.5,
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Feed',
          tabBarIcon: ({ color }) => <Home size={TAB_ICON_SIZE} color={color} />,
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: 'Events',
          tabBarIcon: ({ color }) => <Calendar size={TAB_ICON_SIZE} color={color} />,
        }}
      />
      <Tabs.Screen
        name="teams"
        options={{
          title: 'Teams',
          tabBarIcon: ({ color }) => <Target size={TAB_ICON_SIZE} color={color} />,
        }}
      />
      <Tabs.Screen
        name="projects"
        options={{
          title: 'Projects',
          tabBarIcon: ({ color }) => <Sparkles size={TAB_ICON_SIZE} color={color} />,
        }}
      />
      <Tabs.Screen
        name="going-out"
        options={{
          title: 'Going Out',
          tabBarIcon: ({ color }) => <MapPin size={TAB_ICON_SIZE} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <User size={TAB_ICON_SIZE} color={color} />,
        }}
      />
    </Tabs>
  );
}
