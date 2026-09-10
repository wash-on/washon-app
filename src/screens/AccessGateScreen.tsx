import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, radius } from '@/theme';
import { Button } from '@/components/ui';
import { useLang } from '@/context/LanguageContext';
import { useAuth, type Membership } from '@/context/AuthContext';
import { appVariant, rolesForVariant } from '@/lib/variant';

/**
 * Two jobs, both required by Rule A3 (one active context at a time):
 *
 *  1. The identity holds more than one membership — a specialist who is also a
 *     customer. They choose; the app never chooses for them.
 *  2. The identity holds memberships, but none valid in THIS app. Someone
 *     opened WashOn Pro with a customer account, or vice versa. Say so plainly
 *     instead of showing an empty screen.
 */
export default function AccessGateScreen() {
  const { t } = useLang();
  const { user, setActiveMembership, signOut } = useAuth();

  const allowed = rolesForVariant(appVariant);
  const usable = (user?.memberships ?? []).filter((m) => allowed.includes(m.role));

  if (usable.length === 0) {
    return (
      <SafeAreaView style={s.root}>
        <View style={s.center}>
          <Text style={s.title}>{t('gate.wrongApp.title')}</Text>
          <Text style={s.body}>
            {appVariant === 'staff' ? t('gate.wrongApp.useClient') : t('gate.wrongApp.useStaff')}
          </Text>
          <Button label={t('common.signOut')} onPress={signOut} style={{ marginTop: 20 }} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.root}>
      <ScrollView contentContainerStyle={s.body2}>
        <Text style={s.title}>{t('gate.choose.title')}</Text>
        <Text style={s.body}>{t('gate.choose.body')}</Text>
        {usable.map((m: Membership, i) => (
          <TouchableOpacity key={i} style={s.card} onPress={() => setActiveMembership(m)}>
            <Text style={s.cardRole}>{t(`role.${m.role}`)}</Text>
            <Text style={s.cardScope}>{t(`scope.${m.scope_type}`)}</Text>
          </TouchableOpacity>
        ))}
        <Button label={t('common.signOut')} variant="ghost" onPress={signOut} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  center: { flex: 1, justifyContent: 'center', padding: 28 },
  body2: { padding: 28, paddingTop: 60 },
  title: { fontSize: 22, color: colors.text, fontFamily: fonts.display, marginBottom: 8 },
  body: { fontSize: 14, color: colors.text2, fontFamily: fonts.body, marginBottom: 22, lineHeight: 20 },
  card: {
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.sm, padding: 16, marginBottom: 12,
  },
  cardRole: { fontSize: 15, color: colors.text, fontFamily: fonts.bodyMed },
  cardScope: { fontSize: 12, color: colors.text3, fontFamily: fonts.body, marginTop: 3 },
});
