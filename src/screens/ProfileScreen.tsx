import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fonts, radius } from '@/theme';
import { useLang } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import type { RootStackParamList } from '@/navigation/types';
import type { Lang } from '@/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function ProfileScreen() {
  const { t, lang, setLang } = useLang();
  const { user, signOut, activeMembership } = useAuth();
  const nav = useNavigation<Nav>();

  async function logout() {
    await signOut();
    nav.reset({ index: 0, routes: [{ name: 'Splash' }] });
  }

  const Item = ({ icon, label, right, onPress }: { icon: keyof typeof Ionicons.glyphMap; label: string; right?: string; onPress?: () => void }) => (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Ionicons name={icon} size={20} color={colors.text2} />
      <Text style={styles.itemText}>{label}</Text>
      {right ? <Text style={styles.itemRight}>{right}</Text> : <Ionicons name="chevron-forward" size={16} color={colors.text3} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}><Text style={styles.avatarText}>{user?.initials ?? 'JS'}</Text></View>
          <Text style={styles.name}>{user?.name ?? 'João Silva'}</Text>
          <Text style={styles.email}>{user?.email ?? 'joao@washon.com.br'}</Text>
          <View style={styles.badge}><Text style={styles.badgeText}>{activeMembership ? t(`role.${activeMembership.role}`) : ''}</Text></View>
        </View>

        <Text style={styles.group}>{t('profile.language')}</Text>
        <View style={{ paddingHorizontal: 16, gap: 6 }}>
          {(['pt', 'en', 'es'] as Lang[]).map((l) => (
            <TouchableOpacity key={l} style={[styles.langOpt, lang === l && styles.langOptActive]} onPress={() => setLang(l)}>
              <Text style={[styles.langText, lang === l && { color: '#fff' }]}>
                {l === 'pt' ? '🇧🇷 Português' : l === 'en' ? '🇺🇸 English' : '🇪🇸 Español'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.group}>{t('profile.account')}</Text>
        <View style={styles.section}>
          <Item icon="create-outline" label={t('profile.editProfile')} />
          <Item icon="lock-closed-outline" label={t('profile.changePwd')} />
          <Item icon="car-sport-outline" label={t('profile.myVehicles')} onPress={() => nav.navigate('VehicleReg', { from: 'SpecialistTabs' })} />
        </View>

        <Text style={styles.group}>{t('profile.notifications')}</Text>
        <View style={styles.section}>
          <Item icon="chatbubble-outline" label={t('profile.notifStart')} right={t('profile.yes')} />
          <Item icon="checkmark-circle-outline" label={t('profile.notifEnd')} right={t('profile.yes')} />
        </View>

        <Text style={styles.group}>{t('profile.support')}</Text>
        <View style={styles.section}>
          <Item icon="help-circle-outline" label={t('profile.help')} />
          <Item icon="information-circle-outline" label={t('profile.version')} right="0.1.5" />
        </View>

        <TouchableOpacity style={styles.logout} onPress={logout}>
          <Ionicons name="log-out-outline" size={18} color={colors.danger} />
          <Text style={styles.logoutText}>{t('common.logout')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  profileHeader: { backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border, padding: 20, alignItems: 'center', gap: 8 },
  avatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: 'rgba(26,86,204,0.4)' },
  avatarText: { fontFamily: fonts.display, fontSize: 24, color: '#fff' },
  name: { fontSize: 18, color: colors.text, fontFamily: fonts.bodyBold },
  email: { fontSize: 13, color: colors.text2 },
  badge: { backgroundColor: colors.primaryLight, borderWidth: 1, borderColor: 'rgba(43,127,255,0.3)', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 4 },
  badgeText: { color: colors.accent, fontSize: 12, fontFamily: fonts.bodyMed },
  group: { fontSize: 10, color: colors.text3, textTransform: 'uppercase', letterSpacing: 1, fontFamily: fonts.bodyBold, paddingHorizontal: 16, paddingTop: 16, paddingBottom: 6 },
  section: { paddingHorizontal: 16, gap: 2 },
  item: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 14, backgroundColor: colors.surface2, borderRadius: radius.sm },
  itemText: { flex: 1, fontSize: 14, color: colors.text },
  itemRight: { fontSize: 12, color: colors.text3 },
  langOpt: { paddingHorizontal: 16, paddingVertical: 12, backgroundColor: colors.surface2, borderRadius: radius.sm, borderWidth: 1, borderColor: 'transparent' },
  langOptActive: { borderColor: colors.primary, backgroundColor: colors.primaryLight },
  langText: { fontSize: 14, color: colors.text2 },
  logout: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, margin: 16, paddingVertical: 14, borderWidth: 1, borderColor: 'rgba(224,62,62,0.3)', borderRadius: radius.lg },
  logoutText: { color: colors.danger, fontSize: 15, fontFamily: fonts.bodyMed },
});
