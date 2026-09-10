import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, radius } from '@/theme';
import { Button } from '@/components/ui';
import { useLang } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';

/**
 * Minimal network-admin landing screen for homologation.
 *
 * It is deliberately thin: the admin module is not built (see runbook §8). What
 * it must do is prove the bootstrap worked end to end — the membership exists,
 * the token carries it, and the G9 shortfall is visible rather than silent.
 */
export default function AdminHomeScreen() {
  const { t } = useLang();
  const { user, activeMembership, signOut } = useAuth();
  const [adminCount, setAdminCount] = useState<number | null>(null);

  useEffect(() => {
    supabase
      .from('memberships')
      .select('membership_id', { count: 'exact', head: true })
      .eq('role', 'network_admin')
      .eq('status', 'active')
      .then(({ count }) => setAdminCount(count ?? 0));
  }, []);

  return (
    <SafeAreaView style={s.root}>
      <ScrollView contentContainerStyle={s.body}>
        <Text style={s.eyebrow}>{t('admin.home.eyebrow')}</Text>
        <Text style={s.title}>{user?.name}</Text>

        <View style={s.card}>
          <Row label={t('admin.home.role')} value={t(`role.${activeMembership?.role}`)} />
          <Row label={t('admin.home.scope')} value={t(`scope.${activeMembership?.scope_type}`)} />
          <Row label={t('admin.home.activeAdmins')} value={adminCount === null ? '…' : String(adminCount)} />
        </View>

        {adminCount !== null && adminCount < 2 && (
          <View style={s.warn}>
            <Text style={s.warnText}>{t('bootstrap.secondAdminPending')}</Text>
          </View>
        )}

        <Button label={t('common.signOut')} variant="ghost" onPress={signOut} style={{ marginTop: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={s.row}>
      <Text style={s.rowLabel}>{label}</Text>
      <Text style={s.rowValue}>{value}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  body: { padding: 24, paddingTop: 40 },
  eyebrow: {
    fontSize: 11, letterSpacing: 1.4, textTransform: 'uppercase',
    color: colors.accent, fontFamily: fonts.bodyMed, marginBottom: 6,
  },
  title: { fontSize: 24, color: colors.text, fontFamily: fonts.display, marginBottom: 22 },
  card: {
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.sm, paddingHorizontal: 16, paddingVertical: 4,
  },
  row: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 13, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border,
  },
  rowLabel: { fontSize: 13, color: colors.text2, fontFamily: fonts.body },
  rowValue: { fontSize: 13, color: colors.text, fontFamily: fonts.bodyMed },
  warn: {
    backgroundColor: 'rgba(234,179,8,0.10)', borderWidth: 1, borderColor: 'rgba(234,179,8,0.45)',
    borderRadius: radius.sm, padding: 14, marginTop: 18,
  },
  warnText: { fontSize: 13, color: '#FDE047', fontFamily: fonts.bodyMed, lineHeight: 19 },
});
