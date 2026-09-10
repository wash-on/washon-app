import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, radius } from '@/theme';
import { Logo, Button } from '@/components/ui';
import { Field } from '@/components/cards';
import { useLang } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';

/**
 * First access to the staff app, network-admin path (requirement 6).
 *
 * Shown when an authenticated identity holds no membership at all. The user
 * presents the master password generated at deploy time (requirement 5) and
 * becomes the first network_admin.
 *
 * They already own their credential — Supabase Auth created it at sign-up — so
 * no administrator ever knows another user's password (Rule L1). The second
 * admin arrives later by invitation and sets their own.
 */

/** Denial codes the database can return, mapped to translated copy. */
const DENIALS = [
  'authz.denied.invalidSecret',
  'authz.denied.expired',
  'authz.denied.stateConflict',
  'authz.denied.rateLimited',
] as const;

export default function BootstrapScreen() {
  const { t } = useLang();
  const { user, refresh, signOut } = useAuth();
  const [secret, setSecret] = useState('');
  const [fullName, setFullName] = useState(user?.name ?? '');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  async function submit() {
    if (secret.trim().length < 20) return setError(t('bootstrap.error.secretTooShort'));
    if (fullName.trim().length < 3) return setError(t('bootstrap.error.nameRequired'));
    setError('');
    setBusy(true);
    const { error: rpcError } = await supabase.rpc('claim_bootstrap', {
      p_secret: secret.trim(),
      p_full_name: fullName.trim(),
      p_language: 'pt-BR',
      p_reason: 'Primeiro administrador da rede (bootstrap de homologacao)',
    });
    setBusy(false);

    if (rpcError) {
      // Show translated copy, never the raw Postgres message (Rule I1).
      const hit = DENIALS.find((d) => rpcError.message.includes(d));
      setError(hit ? t(`bootstrap.denied.${hit}`) : t('bootstrap.denied.generic'));
      return;
    }
    setDone(true);
    // The current token predates the membership; force the hook to re-mint it.
    await supabase.auth.refreshSession();
    await refresh();
  }

  if (done) {
    return (
      <SafeAreaView style={s.root}>
        <View style={s.center}>
          <Text style={s.title}>{t('bootstrap.success.title')}</Text>
          <Text style={s.body}>{t('bootstrap.success.body')}</Text>
          <View style={s.warn}>
            <Text style={s.warnText}>{t('bootstrap.secondAdminPending')}</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.root} edges={['top']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">
          <View style={s.logoRow}><Logo size="sm" /></View>

          <Text style={s.eyebrow}>{t('bootstrap.eyebrow')}</Text>
          <Text style={s.title}>{t('bootstrap.title')}</Text>
          <Text style={s.body}>{t('bootstrap.body')}</Text>

          {error ? <Text style={s.error}>{error}</Text> : null}

          <Field
            label={t('bootstrap.field.fullName')}
            value={fullName}
            onChangeText={setFullName}
            placeholder={t('bootstrap.placeholder.fullName')}
            autoCapitalize="words"
          />
          <Field
            label={t('bootstrap.field.masterPassword')}
            value={secret}
            onChangeText={setSecret}
            placeholder={t('bootstrap.placeholder.masterPassword')}
            secureTextEntry
            autoCapitalize="none"
            hint={t('bootstrap.hint.oneReveal')}
          />

          <Button label={t('bootstrap.action.claim')} onPress={submit} loading={busy} style={{ marginTop: 6 }} />
          <Text style={s.footnote}>{t('bootstrap.footnote.expiry')}</Text>
          <Button label={t('common.signOut')} variant="ghost" onPress={signOut} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  scroll: { padding: 24, paddingBottom: 48 },
  center: { flex: 1, justifyContent: 'center', padding: 28 },
  logoRow: { alignItems: 'center', marginBottom: 26 },
  eyebrow: {
    fontSize: 11, letterSpacing: 1.4, textTransform: 'uppercase',
    color: colors.accent, fontFamily: fonts.bodyMed, marginBottom: 6,
  },
  title: { fontSize: 23, color: colors.text, fontFamily: fonts.display, marginBottom: 8 },
  body: { fontSize: 14, lineHeight: 21, color: colors.text2, fontFamily: fonts.body, marginBottom: 22 },
  error: {
    backgroundColor: 'rgba(224,62,62,0.1)', borderWidth: 1, borderColor: colors.danger,
    borderRadius: radius.sm, padding: 10, color: '#F87171', fontSize: 13, marginBottom: 14,
  },
  warn: {
    backgroundColor: 'rgba(234,179,8,0.10)', borderWidth: 1, borderColor: 'rgba(234,179,8,0.45)',
    borderRadius: radius.sm, padding: 14, marginTop: 18,
  },
  warnText: { fontSize: 13, color: '#FDE047', fontFamily: fonts.bodyMed, lineHeight: 19 },
  footnote: {
    fontSize: 11, color: colors.text3, fontFamily: fonts.body,
    marginTop: 16, textAlign: 'center', lineHeight: 16,
  },
});
