import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, fonts, radius } from '@/theme';
import { Logo, Button } from '@/components/ui';
import { Field } from '@/components/cards';
import { useLang } from '@/context/LanguageContext';
import { useAuth, validatePassword } from '@/context/AuthContext';
import { appVariant } from '@/lib/variant';
import type { RootStackParamList } from '@/navigation/types';
import type { Lang } from '@/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Auth'>;

/**
 * WHAT CHANGED FROM 0.1.8, and why it matters more than it looks:
 *
 * The login form had a "Client / Specialist" chip row. Whatever the user
 * tapped was passed into signIn() and written to their session — the login
 * screen asked people what authority they would like to have. That is Gap A,
 * and it is why nothing else in this release can be trusted until it is gone.
 *
 * There is now no role control of any kind. Sign in with an e-mail and a
 * password; the server decides what you are from your memberships, and
 * RootNavigator renders whatever that turns out to be. There is also no
 * navigation.reset() call: the stack swaps by itself when auth state changes.
 *
 * Sign-up is unchanged in shape but produces a customer and only a customer
 * (Rule A1). Staff never self-register — they arrive by invitation.
 */
export default function AuthScreen({ route, navigation }: Props) {
  const { t, lang, setLang } = useLang();
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>(route.params?.mode ?? 'login');
  const [contactMode, setContactMode] = useState<'email' | 'phone'>('email');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // login fields
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');

  // signup fields
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [suContact, setSuContact] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone1, setPhone1] = useState('');
  const [phone2, setPhone2] = useState('');
  const [suLang, setSuLang] = useState<Lang>(lang);
  const [pwd, setPwd] = useState('');
  const [pwd2, setPwd2] = useState('');

  // The staff build never offers self-registration (Rule A1).
  const allowSignup = appVariant === 'client';

  async function handleLogin() {
    if (!validatePassword(password)) {
      setError(t('auth.errPwd'));
      return;
    }
    setError('');
    setLoading(true);
    const res = await signIn(contact, password);
    setLoading(false);
    if (res.error) setError(res.error);
    // On success: no navigation call. AuthContext updates, RootNavigator swaps.
  }

  async function handleSignup() {
    if (!name) return setError(t('auth.errName'));
    if (!validatePassword(pwd)) return setError(t('auth.errPwd'));
    if (pwd !== pwd2) return setError(t('auth.errPwdMatch'));
    setError('');
    setLoading(true);
    const res = await signUp({
      name, surname, contact: suContact, cpf, phone1, phone2, lang: suLang, password: pwd,
    });
    setLoading(false);
    if (res.error) return setError(res.error);
    setMode('login');
  }

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity onPress={() => navigation.canGoBack() && navigation.goBack()}>
              <Ionicons name="arrow-back" size={22} color={colors.text2} />
            </TouchableOpacity>
            <Logo size="sm" />
            <View style={{ width: 22 }} />
          </View>
          {allowSignup && (
            <View style={styles.tabs}>
              {(['login', 'signup'] as const).map((m) => (
                <TouchableOpacity
                  key={m}
                  style={[styles.tab, mode === m && styles.tabActive]}
                  onPress={() => { setMode(m); setError(''); }}
                >
                  <Text style={[styles.tabText, mode === m && { color: '#fff' }]}>
                    {m === 'login' ? t('common.enter') : t('common.signup')}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled">
          {error ? <Text style={styles.error}>{error}</Text> : null}

          {mode === 'login' || !allowSignup ? (
            <>
              <ContactToggle value={contactMode} onChange={setContactMode} t={t} />
              <Field
                label={contactMode === 'email' ? t('auth.emailLabel') : t('auth.phoneLabel')}
                value={contact} onChangeText={setContact}
                placeholder={contactMode === 'email' ? 'voce@email.com' : '(11) 99999-9999'}
                keyboardType={contactMode === 'email' ? 'email-address' : 'phone-pad'}
                autoCapitalize="none"
              />
              <Field
                label={t('auth.password')} value={password} onChangeText={setPassword}
                placeholder={t('auth.pwdPlaceholder')} secureTextEntry hint={t('auth.pwdHint')}
              />
              <Button label={t('common.enter')} onPress={handleLogin} loading={loading} style={{ marginTop: 6 }} />
            </>
          ) : (
            <>
              <ContactToggle value={contactMode} onChange={setContactMode} t={t} />
              <View style={styles.row}>
                <View style={{ flex: 1 }}>
                  <Field label={t('auth.name')} value={name} onChangeText={setName} placeholder="João" />
                </View>
                <View style={{ flex: 1 }}>
                  <Field label={t('auth.surname')} value={surname} onChangeText={setSurname} placeholder="Silva" />
                </View>
              </View>
              <Field
                label={contactMode === 'email' ? t('auth.emailLabel') : t('auth.phoneLabel')}
                value={suContact} onChangeText={setSuContact}
                placeholder={contactMode === 'email' ? 'voce@email.com' : '(11) 99999-9999'}
                keyboardType={contactMode === 'email' ? 'email-address' : 'phone-pad'}
                autoCapitalize="none"
              />
              <Field label={t('auth.cpf')} value={cpf} onChangeText={setCpf} placeholder="000.000.000-00" keyboardType="numeric" />
              <View style={styles.row}>
                <View style={{ flex: 1 }}>
                  <Field label={t('auth.phone1')} value={phone1} onChangeText={setPhone1} placeholder="(11) 99999-9999" keyboardType="phone-pad" />
                </View>
                <View style={{ flex: 1 }}>
                  <Field label={t('auth.phone2')} value={phone2} onChangeText={setPhone2} placeholder="Opcional" keyboardType="phone-pad" />
                </View>
              </View>
              <Text style={styles.label}>{t('auth.prefLang')}</Text>
              <View style={styles.chipRow}>
                {(['pt', 'en', 'es'] as Lang[]).map((l) => (
                  <TouchableOpacity
                    key={l}
                    style={[styles.chip, suLang === l && styles.chipActive]}
                    onPress={() => setSuLang(l)}
                  >
                    <Text style={[styles.chipText, suLang === l && { color: '#fff' }]}>{l.toUpperCase()}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={{ height: 14 }} />
              <Field label={t('auth.password')} value={pwd} onChangeText={setPwd} placeholder={t('auth.pwdPlaceholder')} secureTextEntry hint={t('auth.pwdHint')} />
              <Field label={t('auth.confirmPwd')} value={pwd2} onChangeText={setPwd2} placeholder={t('auth.repeatPwd')} secureTextEntry />
              <Button label={t('common.signup')} onPress={handleSignup} loading={loading} style={{ marginTop: 4 }} />
              <Button label={t('auth.addVehicle')} variant="ghost" onPress={() => navigation.navigate('VehicleReg', { from: 'Auth' })} />
            </>
          )}

          <View style={styles.langRow}>
            {(['pt', 'en', 'es'] as Lang[]).map((l) => (
              <TouchableOpacity key={l} onPress={() => setLang(l)} style={[styles.pill, lang === l && styles.pillActive]}>
                <Text style={[styles.pillText, lang === l && { color: '#fff' }]}>{l.toUpperCase()}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function ContactToggle({
  value, onChange, t,
}: { value: 'email' | 'phone'; onChange: (v: 'email' | 'phone') => void; t: (k: string) => string }) {
  return (
    <View style={styles.contactTabs}>
      {(['email', 'phone'] as const).map((c) => (
        <TouchableOpacity key={c} style={[styles.contactTab, value === c && styles.contactTabActive]} onPress={() => onChange(c)}>
          <Text style={[styles.contactText, value === c && { color: '#fff' }]}>
            {c === 'email' ? `📧 ${t('auth.email')}` : `📱 ${t('auth.phone')}`}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: { paddingHorizontal: 24, paddingBottom: 18, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 },
  tabs: { flexDirection: 'row', backgroundColor: colors.surface2, borderRadius: radius.sm, padding: 3, gap: 3, marginTop: 8 },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 9, borderRadius: 7 },
  tabActive: { backgroundColor: colors.primary },
  tabText: { fontSize: 13, color: colors.text2, fontFamily: fonts.bodyMed },
  body: { padding: 24, paddingBottom: 48 },
  error: { backgroundColor: 'rgba(224,62,62,0.1)', borderWidth: 1, borderColor: colors.danger, borderRadius: radius.sm, padding: 10, color: '#F87171', fontSize: 13, marginBottom: 14 },
  contactTabs: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  contactTab: { flex: 1, paddingVertical: 8, borderRadius: radius.xs, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface2, alignItems: 'center' },
  contactTabActive: { borderColor: colors.primary, backgroundColor: colors.primaryLight },
  contactText: { fontSize: 13, color: colors.text2, fontFamily: fonts.bodyMed },
  label: { fontSize: 11, color: colors.text2, marginBottom: 6, fontFamily: fonts.bodyMed, textTransform: 'uppercase', letterSpacing: 0.5 },
  chipRow: { flexDirection: 'row', gap: 8, marginBottom: 6 },
  chip: { flex: 1, paddingVertical: 11, borderRadius: radius.sm, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface2, alignItems: 'center' },
  chipActive: { borderColor: colors.primary, backgroundColor: colors.primaryLight },
  chipText: { fontSize: 13, color: colors.text2, fontFamily: fonts.bodyMed },
  row: { flexDirection: 'row', gap: 10 },
  langRow: { flexDirection: 'row', justifyContent: 'center', gap: 10, marginTop: 18 },
  pill: { backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.border, borderRadius: 20, paddingVertical: 5, paddingHorizontal: 16 },
  pillActive: { borderColor: colors.primary, backgroundColor: colors.primaryLight },
  pillText: { fontSize: 12, color: colors.text2, fontFamily: fonts.body },
});
