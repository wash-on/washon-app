import React from 'react';
import { Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '@/theme';
import { useLang } from '@/context/LanguageContext';

import SplashScreen from '@/screens/SplashScreen';
import AuthScreen from '@/screens/AuthScreen';
import GuestScreen from '@/screens/GuestScreen';
import VehicleRegScreen from '@/screens/VehicleRegScreen';
import VehicleDetailScreen from '@/screens/VehicleDetailScreen';
import NotificationsScreen from '@/screens/NotificationsScreen';
import SpecialistDashboard from '@/screens/SpecialistDashboard';
import ClientDashboard from '@/screens/ClientDashboard';
import VehiclesScreen from '@/screens/VehiclesScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import PlaceholderScreen from '@/screens/PlaceholderScreen';

import type {
  RootStackParamList, SpecialistTabParamList, ClientTabParamList,
} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const SpecTab = createBottomTabNavigator<SpecialistTabParamList>();
const ClientTab = createBottomTabNavigator<ClientTabParamList>();

// react-navigation v7: tabBarStyle, tabBarActiveTintColor, tabBarLabelStyle
// are still valid inside screenOptions — no API change here.
const tabScreenOptions = {
  headerShown: false,
  tabBarStyle: {
    backgroundColor: colors.surface,
    borderTopColor: colors.border,
    height: 84,
    paddingTop: 8,
  },
  tabBarActiveTintColor: colors.accent,
  tabBarInactiveTintColor: colors.text3,
  tabBarLabelStyle: { fontSize: 10, fontFamily: fonts.bodyMed },
};

function SpecialistTabs() {
  const { t } = useLang();
  return (
    <SpecTab.Navigator screenOptions={tabScreenOptions}>
      <SpecTab.Screen
        name="Home"
        component={SpecialistDashboard}
        options={{
          title: t('nav.home'),
          // react-navigation v7: tabBarIcon API unchanged
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
        }}
      />
      <SpecTab.Screen
        name="Vehicles"
        component={VehiclesScreen}
        options={{
          title: t('nav.vehicles'),
          tabBarIcon: ({ color, size }) => <Ionicons name="car-sport" color={color} size={size} />,
        }}
      />
      <SpecTab.Screen
        name="Reports"
        component={PlaceholderScreen}
        options={{
          title: t('nav.reports'),
          tabBarIcon: ({ color, size }) => <Ionicons name="bar-chart" color={color} size={size} />,
        }}
      />
      <SpecTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: t('nav.profile'),
          tabBarIcon: ({ color, size }) => <Ionicons name="person-circle" color={color} size={size} />,
        }}
      />
    </SpecTab.Navigator>
  );
}

function ClientTabs() {
  const { t } = useLang();
  return (
    <ClientTab.Navigator screenOptions={tabScreenOptions}>
      <ClientTab.Screen
        name="Home"
        component={ClientDashboard}
        options={{
          title: t('nav.home'),
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
        }}
      />
      <ClientTab.Screen
        name="Vehicles"
        component={VehiclesScreen}
        options={{
          title: t('nav.vehicles'),
          tabBarIcon: ({ color, size }) => <Ionicons name="car-sport" color={color} size={size} />,
        }}
      />
      <ClientTab.Screen
        name="Schedule"
        component={PlaceholderScreen}
        options={{
          title: t('nav.schedule'),
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar" color={color} size={size} />,
        }}
      />
      <ClientTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: t('nav.profile'),
          tabBarIcon: ({ color, size }) => <Ionicons name="person-circle" color={color} size={size} />,
        }}
      />
    </ClientTab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    // react-navigation v7: Stack.Navigator + headerShown: false unchanged
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="Guest" component={GuestScreen} />
      {/* presentation: 'modal' still valid in v7 native-stack */}
      <Stack.Screen name="VehicleReg" component={VehicleRegScreen} options={{ presentation: 'modal' }} />
      <Stack.Screen name="SpecialistTabs" component={SpecialistTabs} />
      <Stack.Screen name="ClientTabs" component={ClientTabs} />
      <Stack.Screen name="VehicleDetail" component={VehicleDetailScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  );
}
