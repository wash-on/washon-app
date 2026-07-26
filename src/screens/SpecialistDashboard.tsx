import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fonts, radius } from '@/theme';
import { Logo } from '@/components/ui';
import { VehicleCard } from '@/components/cards';
import { CheckinSheet, CheckoutSheet } from './sheets';
import { useLang } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { MOCK_ORDERS } from '@/lib/mockData';
import type { RootStackParamList } from '@/navigation/types';
import type { ServiceOrder } from '@/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const STAT_KEYS = [
  { key: 'scheduled', color: colors.warn },
  { key: 'awaiting', color: colors.accent },
  { key: 'in-service', color: colors.success },
  { key: 'ready', color: colors.purple },
  { key: 'delivered', color: colors.text },
  { key: 'cancelled', color: colors.danger },
] as const;

const STAT_LABEL: Record<string, string> = {
  scheduled: 'dash.scheduled', awaiting: 'dash.awaiting', 'in-service': 'dash.inService',
  ready: 'dash.ready', delivered: 'dash.delivered', cancelled: 'dash.cancelled',
};

export default function SpecialistDashboard() {
  const { t } = useLang();
  const { user } = useAuth();
  const nav = useNavigation<Nav>();
  const [orders, setOrders] = useState<ServiceOrder[]>(MOCK_ORDERS);
  const [checkinOpen, setCheckinOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const counts = STAT_KEYS.reduce((acc, s) => {
    acc[s.key] = orders.filter((o) => o.vehicle_status === s.key).length;
    return acc;
  }, {} as Record<string, number>);

  const inProgress = orders.filter((o) =>
    ['scheduled', 'awaiting', 'in-service', 'ready'].includes(o.vehicle_status)
  );

  function handleCheckin(order: ServiceOrder) {
    setOrders((prev) => [order, ...prev]);
    setCheckinOpen(false);
  }

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <View style={styles.header}>
          <View style={styles.top}>
            <View style={styles.userRow}>
              <View style={[styles.avatar, { backgroundColor: colors.accent }]}>
                <Text style={styles.avatarText}>{user?.initials ?? 'JS'}</Text>
              </View>
              <View>
                <Text style={styles.name}>{user?.name ?? 'João Silva'}</Text>
                <Text style={styles.role}>{t('auth.specialist')}</Text>
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

          <View style={styles.statsGrid}>
            {STAT_KEYS.map((s) => (
              <View key={s.key} style={styles.tile}>
                <Text style={[styles.statNum, { color: s.color }]}>{counts[s.key]}</Text>
                <Text style={styles.statLbl}>{t(STAT_LABEL[s.key])}</Text>
              </View>
            ))}
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity style={[styles.action, { backgroundColor: colors.success }]} onPress={() => setCheckinOpen(true)}>
              <Ionicons name="enter-outline" size={24} color="#fff" />
              <Text style={styles.actionText}>{t('dash.checkin')}</Text>
              <Text style={styles.actionSub}>{t('dash.checkinSub')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.action, { backgroundColor: colors.primary }]} onPress={() => setCheckoutOpen(true)}>
              <Ionicons name="exit-outline" size={24} color="#fff" />
              <Text style={styles.actionText}>{t('dash.checkout')}</Text>
              <Text style={styles.actionSub}>{t('dash.checkoutSub')}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionTitle}>{t('dash.inProgress')}</Text>
        <View style={{ paddingHorizontal: 16 }}>
          {inProgress.map((o) => (
            <VehicleCard
              key={o.service_order_id}
              plate={o.license_plate!}
              subtitle={`${o.make} ${o.model} · ${o.service_name}`}
              status={o.vehicle_status}
              onPress={() => nav.navigate('VehicleDetail', { order: o })}
            />
          ))}
        </View>
      </ScrollView>

      <CheckinSheet visible={checkinOpen} onClose={() => setCheckinOpen(false)} onConfirm={handleCheckin} />
      <CheckoutSheet visible={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
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
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  tile: { width: '31.5%', backgroundColor: colors.surface2, borderRadius: radius.sm, paddingVertical: 12, alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  statNum: { fontFamily: fonts.display, fontSize: 32, lineHeight: 34 },
  statLbl: { fontSize: 9, color: colors.text2, marginTop: 2, textTransform: 'uppercase', letterSpacing: 0.3 },
  actionRow: { flexDirection: 'row', gap: 10 },
  action: { flex: 1, borderRadius: radius.lg, paddingVertical: 14, alignItems: 'center', gap: 4 },
  actionText: { fontSize: 14, color: '#fff', fontFamily: fonts.bodyMed },
  actionSub: { fontSize: 10, color: 'rgba(255,255,255,0.65)' },
  sectionTitle: { fontSize: 11, color: colors.text3, textTransform: 'uppercase', letterSpacing: 1, fontFamily: fonts.bodyBold, paddingHorizontal: 18, paddingTop: 16, paddingBottom: 10 },
});
