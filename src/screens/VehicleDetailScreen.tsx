import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, fonts, radius } from '@/theme';
import { Badge, Button } from '@/components/ui';
import { useLang } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { colorHex } from '@/lib/mockData';
import type { RootStackParamList } from '@/navigation/types';
import type { VehicleStatus } from '@/types';

type Props = NativeStackScreenProps<RootStackParamList, 'VehicleDetail'>;

// Stage order used to light up the timeline.
const STAGES: VehicleStatus[] = ['scheduled', 'awaiting', 'in-service', 'ready', 'delivered'];

export default function VehicleDetailScreen({ route, navigation }: Props) {
  const { t } = useLang();
  const { user } = useAuth();
  const { order } = route.params;
  const [status, setStatus] = useState<VehicleStatus>(order.vehicle_status);

  const isSpecialist = user?.role === 'Specialist';
  const stageIndex = STAGES.indexOf(status);

  function renderActions() {
    if (!isSpecialist) {
      return <Text style={styles.note}>{t('detail.track')}</Text>;
    }
    switch (status) {
      case 'scheduled':
        return (
          <View style={styles.btnRow}>
            <Button label={t('detail.confirmCheckin')} variant="success" flex onPress={() => setStatus('awaiting')} />
            <Button label={t('detail.cancel')} variant="danger" flex onPress={() => setStatus('cancelled')} />
          </View>
        );
      case 'awaiting':
        return <Button label={t('detail.startService')} variant="primary" onPress={() => setStatus('in-service')} />;
      case 'in-service':
        return <Button label={t('detail.finishService')} variant="primary" onPress={() => setStatus('ready')} />;
      case 'ready':
        return <Button label={t('detail.confirmDelivery')} variant="secondary" onPress={() => setStatus('delivered')} />;
      default:
        return <Text style={styles.note}>{t('detail.finished')}</Text>;
    }
  }

  const timeline = [
    { stage: 'scheduled', label: t('detail.tlScheduled') },
    { stage: 'awaiting', label: t('detail.tlCheckin') },
    { stage: 'in-service', label: t('detail.tlStarted') },
    { stage: 'ready', label: t('detail.tlReady') },
    { stage: 'delivered', label: t('detail.tlDelivered') },
  ];

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={styles.headerWrap}>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={22} color={colors.text} />
            </TouchableOpacity>
            <View>
              <Text style={styles.headerTitle}>{t('detail.title')}</Text>
              <Text style={styles.headerSub}>#OS-{order.service_order_id}</Text>
            </View>
          </View>
          <View style={styles.hero}>
            <View style={styles.plateRow}>
              <View style={styles.plateBox}>
                <Text style={styles.plate}>{order.license_plate}</Text>
              </View>
              <Badge status={status} />
            </View>
            <Text style={styles.model}>{order.make} {order.model}</Text>
            <View style={styles.colorChip}>
              <View style={[styles.colorDot, { backgroundColor: colorHex[order.color ?? ''] ?? '#888' }]} />
              <Text style={styles.colorText}>{order.color ?? 'N/A'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('detail.services')}</Text>
          <View style={styles.serviceRow}>
            <Text style={styles.serviceName}>{order.service_name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Text style={styles.serviceValue}>R$ {order.service_value_final?.toFixed(2)}</Text>
              <Badge status={status} />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('detail.timeline')}</Text>
          {timeline.map((item, i) => {
            const done = STAGES.indexOf(item.stage as VehicleStatus) <= stageIndex && status !== 'cancelled';
            const active = STAGES.indexOf(item.stage as VehicleStatus) === stageIndex && status !== 'cancelled';
            return (
              <View key={item.stage} style={styles.tlItem}>
                <View style={styles.tlLineWrap}>
                  <View
                    style={[
                      styles.tlDot,
                      done && { backgroundColor: colors.success, borderColor: colors.success },
                      active && { backgroundColor: colors.accent, borderColor: colors.accent },
                    ]}
                  />
                  {i < timeline.length - 1 && <View style={styles.tlLine} />}
                </View>
                <Text style={[styles.tlText, !done && { opacity: 0.4 }]}>{item.label}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.actionBar}>{renderActions()}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  headerWrap: { backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 10 },
  headerTitle: { fontSize: 16, color: colors.text, fontFamily: fonts.bodyBold },
  headerSub: { fontSize: 12, color: colors.text2 },
  hero: { paddingHorizontal: 16, paddingBottom: 20 },
  plateRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8 },
  plateBox: { backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm, paddingHorizontal: 16, paddingVertical: 6 },
  plate: { fontFamily: fonts.display, fontSize: 26, color: colors.text, letterSpacing: 2 },
  model: { fontSize: 14, color: colors.text2, marginTop: 2 },
  colorChip: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 },
  colorDot: { width: 12, height: 12, borderRadius: 6 },
  colorText: { fontSize: 12, color: colors.text2 },
  section: { padding: 16 },
  sectionTitle: { fontSize: 11, color: colors.text3, textTransform: 'uppercase', letterSpacing: 1, fontFamily: fonts.bodyBold, marginBottom: 12 },
  serviceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm, padding: 14 },
  serviceName: { fontSize: 14, color: colors.text, fontFamily: fonts.bodyMed },
  serviceValue: { fontSize: 13, color: colors.text2 },
  tlItem: { flexDirection: 'row', gap: 12, paddingBottom: 4 },
  tlLineWrap: { alignItems: 'center' },
  tlDot: { width: 16, height: 16, borderRadius: 8, backgroundColor: colors.surface3, borderWidth: 2, borderColor: colors.border, marginTop: 2 },
  tlLine: { width: 1, flex: 1, minHeight: 20, backgroundColor: colors.border, marginVertical: 2 },
  tlText: { fontSize: 13, color: colors.text, paddingBottom: 16 },
  note: { textAlign: 'center', color: colors.text2, fontSize: 13, paddingVertical: 8 },
  actionBar: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, paddingBottom: 28, backgroundColor: colors.bg, borderTopWidth: 1, borderTopColor: colors.border },
  btnRow: { flexDirection: 'row', gap: 10 },
});
