import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fonts } from '@/theme';
import { Logo } from '@/components/ui';
import { VehicleCard } from '@/components/cards';
import { useLang } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { CLIENT_ORDERS } from '@/lib/mockData';
import type { RootStackParamList } from '@/navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function ClientDashboard() {
  const { t } = useLang();
  const { user } = useAuth();
  const nav = useNavigation<Nav>();

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.header}>
          <View style={styles.top}>
            <View style={styles.userRow}>
              <View style={[styles.avatar, { backgroundColor: colors.purple }]}>
                <Text style={styles.avatarText}>{user?.initials ?? 'MS'}</Text>
              </View>
              <View>
                <Text style={styles.name}>{user?.name ?? 'Maria Santos'}</Text>
                <Text style={styles.role}>{t('auth.client')}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <TouchableOpacity style={styles.bell} onPress={() => nav.navigate('Notifications')}>
                <Ionicons name="notifications-outline" size={20} color={colors.text} />
                <View style={styles.dot} />
              </TouchableOpacity>
              <Logo size="sm" />
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>{t('dash.activeOrders')}</Text>
        <View style={styles.list}>
          {CLIENT_ORDERS.map((o) => (
            <VehicleCard
              key={o.service_order_id}
              plate={o.license_plate!}
              subtitle={`${o.make} ${o.model} · ${o.service_name}`}
              status={o.vehicle_status}
              onPress={() => nav.navigate('VehicleDetail', { order: o })}
            />
          ))}
        </View>

        <Text style={styles.sectionTitle}>{t('dash.myVehicles')}</Text>
        <View style={styles.list}>
          <VehicleCard plate="MSA-0001" subtitle="Fiat Argo · Médio · Flex" />
          <VehicleCard plate="MSA-0002" subtitle="Chevrolet Onix · Pequeno · Flex" />
        </View>

        <Text style={styles.sectionTitle}>{t('dash.history')}</Text>
        <View style={styles.list}>
          <VehicleCard plate="MSA-0001" subtitle="Higienização Interna · 10/05/2026" status="delivered" dim />
          <VehicleCard plate="MSA-0002" subtitle="Cristalização · 02/05/2026" status="cancelled" dim />
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={26} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: { backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border, paddingHorizontal: 18, paddingBottom: 14 },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 },
  userRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontFamily: fonts.display, fontSize: 13, color: '#fff' },
  name: { fontSize: 14, color: colors.text, fontFamily: fonts.bodyMed },
  role: { fontSize: 11, color: colors.text2 },
  bell: { width: 38, height: 38, borderRadius: 19, backgroundColor: colors.surface3, alignItems: 'center', justifyContent: 'center' },
  dot: { position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: 4, backgroundColor: colors.danger, borderWidth: 2, borderColor: colors.surface },
  sectionTitle: { fontSize: 11, color: colors.text3, textTransform: 'uppercase', letterSpacing: 1, fontFamily: fonts.bodyBold, paddingHorizontal: 18, paddingTop: 16, paddingBottom: 10 },
  list: { paddingHorizontal: 16 },
  fab: { position: 'absolute', bottom: 24, right: 16, width: 52, height: 52, borderRadius: 26, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', shadowColor: colors.primary, shadowOpacity: 0.5, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 6 },
});
