import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, fonts, radius } from '@/theme';
import { Logo } from '@/components/ui';
import { useLang } from '@/context/LanguageContext';
import type { RootStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Guest'>;

const SERVICES = [
  { icon: '🚿', name: 'Lavagem Básica', p: [60, 80, 100], desc: 'Lavagem externa completa com shampoo neutro, rodas e pneus.' },
  { icon: '✨', name: 'Lavagem Premium', p: [120, 150, 190], desc: 'Lavagem externa + aspiração interior, painel e vidros internos.' },
  { icon: '💎', name: 'Polimento', p: [350, 420, 500], desc: 'Correção de pintura, remoção de riscos e brilho profissional.' },
  { icon: '🪑', name: 'Higienização Interna', p: [280, 340, 420], desc: 'Limpeza profunda do interior com extratora a vapor.' },
  { icon: '🔷', name: 'Cristalização', p: [800, 1000, 1300], desc: 'Proteção com cristal de sílica. Até 12 meses de brilho.' },
  { icon: '🛡️', name: 'Vitrificação', p: [1500, 2000, 2500], desc: 'Revestimento cerâmico de longa duração, até 5 anos.' },
  { icon: '🎞️', name: 'Insulfilm', p: [450, 550, 680], desc: 'Película de controle solar. Reduz calor e bloqueia UV.' },
];

const INSTA = 'https://www.instagram.com/washonestetica';
const FB = 'https://www.facebook.com/p/Wash-on-est%C3%A9tica-automotiva-61555475860948/';

export default function GuestScreen({ navigation }: Props) {
  const { t } = useLang();
  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={22} color={colors.text} /></TouchableOpacity>
            <Logo size="sm" />
            <View style={{ width: 22 }} />
          </View>
          <Text style={styles.title}>{t('guest.title')}</Text>
          <Text style={styles.sub}>{t('guest.sub')}</Text>
        </View>

        <Text style={styles.section}>{t('guest.services')}</Text>
        {SERVICES.map((s) => (
          <View key={s.name} style={styles.card}>
            <Text style={styles.cardName}>{s.icon}  {s.name}</Text>
            <View style={styles.prices}>
              <Price label={t('guest.small')} v={s.p[0]} />
              <Price label={t('guest.medium')} v={s.p[1]} />
              <Price label={t('guest.large')} v={s.p[2]} />
            </View>
            <Text style={styles.desc}>{s.desc}</Text>
          </View>
        ))}

        <Text style={styles.section}>{t('guest.social')}</Text>
        <View style={styles.social}>
          <TouchableOpacity style={styles.socialBtn} onPress={() => Linking.openURL(INSTA)}>
            <Ionicons name="logo-instagram" size={18} color="#E1306C" />
            <Text style={styles.socialText}>Instagram</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn} onPress={() => Linking.openURL(FB)}>
            <Ionicons name="logo-facebook" size={18} color="#1877F2" />
            <Text style={styles.socialText}>Facebook</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.cta} onPress={() => navigation.navigate('Auth', { mode: 'signup' })}>
          <Text style={styles.ctaTitle}>{t('guest.ctaTitle')}</Text>
          <Text style={styles.ctaSub}>{t('guest.ctaSub')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function Price({ label, v }: { label: string; v: number }) {
  return (
    <View style={styles.priceChip}>
      <Text style={styles.priceLabel}>{label} </Text>
      <Text style={styles.priceVal}>R$ {v}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: { backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border, paddingHorizontal: 20, paddingBottom: 16 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  title: { fontSize: 22, color: colors.text, fontFamily: fonts.bodyBold, marginTop: 14 },
  sub: { fontSize: 13, color: colors.text2, marginTop: 4 },
  section: { fontSize: 11, color: colors.text3, textTransform: 'uppercase', letterSpacing: 1, fontFamily: fonts.bodyBold, paddingHorizontal: 20, paddingTop: 18, paddingBottom: 10 },
  card: { marginHorizontal: 16, marginBottom: 10, backgroundColor: colors.surface2, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: 14 },
  cardName: { fontSize: 15, color: colors.text, fontFamily: fonts.bodyMed },
  prices: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 10 },
  priceChip: { flexDirection: 'row', backgroundColor: colors.surface3, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4 },
  priceLabel: { fontSize: 12, color: colors.text2 },
  priceVal: { fontSize: 13, color: colors.text, fontFamily: fonts.bodyMed },
  desc: { fontSize: 12, color: colors.text2, lineHeight: 18, marginTop: 10 },
  social: { flexDirection: 'row', gap: 12, paddingHorizontal: 16, paddingBottom: 16 },
  socialBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm, paddingVertical: 12 },
  socialText: { fontSize: 13, color: colors.text2 },
  cta: { margin: 16, backgroundColor: colors.primary, borderRadius: radius.lg, padding: 16, alignItems: 'center' },
  ctaTitle: { fontSize: 15, color: '#fff', fontFamily: fonts.bodyBold },
  ctaSub: { fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
});
