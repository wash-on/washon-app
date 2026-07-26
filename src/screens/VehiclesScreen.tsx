import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fonts, radius } from '@/theme';
import { VehicleCard } from '@/components/cards';
import { useLang } from '@/context/LanguageContext';
import { MOCK_ORDERS } from '@/lib/mockData';
import type { RootStackParamList } from '@/navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;
const FILTERS = ['all', 'scheduled', 'awaiting', 'in-service', 'ready', 'delivered'] as const;

export default function VehiclesScreen() {
  const { t } = useLang();
  const nav = useNavigation<Nav>();
  const [filter, setFilter] = useState<string>('all');
  const [q, setQ] = useState('');

  const shown = MOCK_ORDERS.filter((o) => {
    const matchFilter = filter === 'all' || o.vehicle_status === filter;
    const matchQ = !q ||
      o.license_plate!.toLowerCase().includes(q.toLowerCase()) ||
      `${o.make} ${o.model}`.toLowerCase().includes(q.toLowerCase());
    return matchFilter && matchQ;
  });

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('vehicles.title')}</Text>
        <TouchableOpacity><Text style={styles.scheduleLink}>{t('vehicles.schedule')}</Text></TouchableOpacity>
      </View>
      <View style={styles.search}>
        <Ionicons name="search" size={18} color={colors.text3} />
        <TextInput style={styles.searchInput} placeholder={t('vehicles.search')} placeholderTextColor={colors.text3} value={q} onChangeText={setQ} />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chips} contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}>
        {FILTERS.map((f) => (
          <TouchableOpacity key={f} onPress={() => setFilter(f)} style={[styles.chip, filter === f && styles.chipActive]}>
            <Text style={[styles.chipText, filter === f && { color: '#fff' }]}>
              {f === 'all' ? t('vehicles.all') : t(`status.${f}`)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}>
        {shown.map((o) => (
          <VehicleCard key={o.service_order_id} plate={o.license_plate!} subtitle={`${o.make} ${o.model} · ${o.service_name}`} status={o.vehicle_status} onPress={() => nav.navigate('VehicleDetail', { order: o })} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border },
  title: { fontSize: 18, color: colors.text, fontFamily: fonts.bodyBold },
  scheduleLink: { color: colors.accent, fontSize: 14, fontFamily: fonts.bodyMed },
  search: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm, paddingHorizontal: 14, paddingVertical: 10, margin: 16, marginBottom: 12 },
  searchInput: { flex: 1, color: colors.text, fontSize: 15, fontFamily: fonts.body },
  chips: { flexGrow: 0, marginBottom: 12 },
  chip: { backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.border, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6 },
  chipActive: { backgroundColor: colors.primaryLight, borderColor: colors.primary },
  chipText: { fontSize: 12, color: colors.text2, fontFamily: fonts.body },
});
