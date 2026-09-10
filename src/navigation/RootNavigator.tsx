import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '@/theme';
import { useLang } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { appVariant, rolesForVariant } from '@/lib/variant';

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
import BootstrapScreen from '@/screens/BootstrapScreen';
import AccessGateScreen from '@/screens/AccessGateScreen';
import AdminHomeScreen from '@/screens/AdminHomeScreen';

import type {
  RootStackParamList, SpecialistTabParamList, ClientTabParamList, AdminTabParamList,
} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const SpecTab = createBottomTabNavigator<SpecialistTabParamList>();
const ClientTab = createBottomTabNavigator<ClientTabParamList>();
const AdminTab = createBottomTabNavigator<AdminTabParamList>();

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

const icon = (name: React.ComponentProps<typeof Ionicons>['name']) =>
  ({ color, size }: { color: string; size: number }) =>
    <Ionicons name={name} color={color} size={size} />;

function SpecialistTabs() {
  const { t } = useLang();
  return (
    <SpecTab.Navigator screenOptions={tabScreenOptions}>
      <SpecTab.Screen name="Home" component={SpecialistDashboard}
        options={{ title: t('nav.home'), tabBarIcon: icon('home') }} />
      <SpecTab.Screen name="Vehicles" component={VehiclesScreen}
        options={{ title: t('nav.vehicles'), tabBarIcon: icon('car-sport') }} />
      <SpecTab.Screen name="Reports" component={PlaceholderScreen}
        options={{ title: t('nav.reports'), tabBarIcon: icon('bar-chart') }} />
      <SpecTab.Screen name="Profile" component={ProfileScreen}
        options={{ title: t('nav.profile'), tabBarIcon: icon('person-circle') }} />
    </SpecTab.Navigator>
  );
}

function ClientTabs() {
  const { t } = useLang();
  return (
    <ClientTab.Navigator screenOptions={tabScreenOptions}>
      <ClientTab.Screen name="Home" component={ClientDashboard}
        options={{ title: t('nav.home'), tabBarIcon: icon('home') }} />
      <ClientTab.Screen name="Vehicles" component={VehiclesScreen}
        options={{ title: t('nav.vehicles'), tabBarIcon: icon('car-sport') }} />
      <ClientTab.Screen name="Schedule" component={PlaceholderScreen}
        options={{ title: t('nav.schedule'), tabBarIcon: icon('calendar') }} />
      <ClientTab.Screen name="Profile" component={ProfileScreen}
        options={{ title: t('nav.profile'), tabBarIcon: icon('person-circle') }} />
    </ClientTab.Navigator>
  );
}

function AdminTabs() {
  const { t } = useLang();
  return (
    <AdminTab.Navigator screenOptions={tabScreenOptions}>
      <AdminTab.Screen name="Home" component={AdminHomeScreen}
        options={{ title: t('nav.home'), tabBarIcon: icon('shield-checkmark') }} />
      <AdminTab.Screen name="Profile" component={ProfileScreen}
        options={{ title: t('nav.profile'), tabBarIcon: icon('person-circle') }} />
    </AdminTab.Navigator>
  );
}

/**
 * The guard is structural, not conditional.
 *
 * In 0.1.8 every stack was registered at once, so any navigate() call could
 * reach any dashboard. Here the branches are mutually exclusive: a screen the
 * current membership does not justify is not registered at all, so there is no
 * route to navigate to. React Navigation swaps stacks automatically when the
 * auth state changes, which is why nothing calls navigation.reset() any more.
 *
 * This is a convenience for the user, NOT a security boundary. The boundary is
 * RLS. If this file were replaced entirely, the database would still refuse
 * every row the membership does not cover.
 */
export default function RootNavigator() {
  const { user, loading, activeMembership, needsBootstrap } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, justifyContent: 'center' }}>
        <ActivityIndicator color={colors.accent} />
      </View>
    );
  }

  const allowed = rolesForVariant(appVariant);
  const usable = activeMembership && allowed.includes(activeMembership.role)
    ? activeMembership
    : null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen name="Guest" component={GuestScreen} />
          <Stack.Screen name="VehicleReg" component={VehicleRegScreen}
            options={{ presentation: 'modal' }} />
        </>
      ) : needsBootstrap && appVariant === 'staff' ? (
        <Stack.Screen name="Bootstrap" component={BootstrapScreen} />
      ) : !usable ? (
        <Stack.Screen name="AccessGate" component={AccessGateScreen} />
      ) : (
        <>
          {usable.role === 'client' && (
            <Stack.Screen name="ClientTabs" component={ClientTabs} />
          )}
          {(usable.role === 'specialist' || usable.role === 'unit_manager') && (
            <Stack.Screen name="SpecialistTabs" component={SpecialistTabs} />
          )}
          {(usable.role === 'network_admin' || usable.role === 'franchisee'
            || usable.role === 'auditor') && (
            <Stack.Screen name="AdminTabs" component={AdminTabs} />
          )}
          <Stack.Screen name="VehicleReg" component={VehicleRegScreen}
            options={{ presentation: 'modal' }} />
          <Stack.Screen name="VehicleDetail" component={VehicleDetailScreen} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
