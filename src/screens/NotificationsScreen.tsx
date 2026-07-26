import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fonts } from '@/theme';
import type { RootStackParamList } from '@/navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;
import { useLang } from '@/context/LanguageContext';

type Item = { icon: keyof typeof Ionicons.glyphMap; tint: string; bg: string; title: string; body: string; time: string };

export default function NotificationsScreen() {
  const { t } = useLang();
  const nav = useNavigation<Nav>();

  const today: Item[] = [
    { icon: 'construct-outline', tint: colors.info, bg: colors.infoBg, title: 'Serviço iniciado · ABC-1234', body: 'Polimento do Honda Civic foi iniciado por João', time: '09:15' },
    { icon: 'checkmark-circle-outline', tint: colors.success, bg: colors.successBg, title: 'Veículo pronto · DEF-9012', body: 'VW Polo está pronto para retirada', time: '11:42' },
    { icon: 'calendar-outline', tint: colors.warn, bg: colors.warnBg, title: 'Novo agendamento · GHI-3456', body: 'Ford Ka agendado para Cristalização às 14:00', time: '08:00' },
  ];
  const yesterday: Item[] = [
    { icon: 'checkmark-circle-outline', tint: colors.success, bg: colors.successBg, title: 'Entrega confirmada · JKL-7890', body: 'Jeep Compass entregue. Pagamento PIX confirmado.', time: '17:30' },
  ];

  const Row = (n: Item, i: number) => (
    <View key={i} style={styles.item}>
      <View style={[styles.icon, { backgroundColor: n.bg }]}>
        <Ionicons name={n.icon} size={18} color={n.tint} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.itemTitle}>{n.title}</Text>
        <Text style={styles.itemBody}>{n.body}</Text>
        <Text style={styles.itemTime}>{n.time}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => nav.goBack()}><Ionicons name="arrow-back" size={22} color={colors.text} /></TouchableOpacity>
        <Text style={styles.headerTitle}>{t('notifications.title')}</Text>
      </View>
      <ScrollView>
        <Text style={styles.section}>{t('notifications.today')}</Text>
        {today.map(Row)}
        <Text style={styles.section}>{t('notifications.yesterday')}</Text>
        {yesterday.map(Row)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 12, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border },
  headerTitle: { fontSize: 16, color: colors.text, fontFamily: fonts.bodyBold },
  section: { fontSize: 11, color: colors.text3, textTransform: 'uppercase', letterSpacing: 1, fontFamily: fonts.bodyBold, paddingHorizontal: 20, paddingTop: 18, paddingBottom: 10 },
  item: { flexDirection: 'row', gap: 12, paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.border },
  icon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  itemTitle: { fontSize: 14, color: colors.text, fontFamily: fonts.bodyMed },
  itemBody: { fontSize: 12, color: colors.text2, marginTop: 2 },
  itemTime: { fontSize: 11, color: colors.text3, marginTop: 4 },
});
