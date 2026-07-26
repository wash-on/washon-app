import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, {
  Defs,
  RadialGradient,
  LinearGradient,
  Stop,
  Rect,
  SvgXml,
} from 'react-native-svg';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, fonts, radius } from '@/theme';
import { useLang } from '@/context/LanguageContext';
import { washOnLogo, WASHON_LOGO_RATIO } from '@/assets/washOnLogo';
import type { RootStackParamList } from '@/navigation/types';
import type { Lang } from '@/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const LANGS: { code: Lang; label: string }[] = [
  { code: 'pt', label: '🇧🇷 PT' },
  { code: 'en', label: '🇺🇸 EN' },
  { code: 'es', label: '🇪🇸 ES' },
];

// Intrinsic aspect ratio of the badge — art v1.3, viewBox "93 124 1254 650".
// Exported by the asset itself so the ratio can never drift from the artwork.
const LOGO_RATIO = WASHON_LOGO_RATIO;

export default function SplashScreen({ navigation }: Props) {
  const { t, lang, setLang } = useLang();
  const { width, height } = useWindowDimensions();

  const logoWidth = Math.min(width * 0.86, 380);
  const logoHeight = logoWidth / LOGO_RATIO;

  return (
    <View style={styles.root}>
      {/* Radial blue-glow background, painted behind everything (incl. safe areas) */}
      <Svg style={StyleSheet.absoluteFill} width={width} height={height}>
        <Defs>
          <RadialGradient
            id="glow"
            cx="50%"
            cy="31%"
            rx="62%"
            ry="74%"
            fx="50%"
            fy="31%"
          >
            <Stop offset="0%" stopColor="#27509F" stopOpacity={1} />
            <Stop offset="32%" stopColor="#1A3B7E" stopOpacity={0.92} />
            <Stop offset="62%" stopColor="#0C1F4C" stopOpacity={0.55} />
            <Stop offset="100%" stopColor="#02060F" stopOpacity={0} />
          </RadialGradient>
          <LinearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#02060F" stopOpacity={0} />
            <Stop offset="68%" stopColor="#010409" stopOpacity={0.35} />
            <Stop offset="100%" stopColor="#000206" stopOpacity={0.92} />
          </LinearGradient>
        </Defs>
        {/* near-black base */}
        <Rect x={0} y={0} width={width} height={height} fill="#02060F" />
        {/* blue glow */}
        <Rect x={0} y={0} width={width} height={height} fill="url(#glow)" />
        {/* bottom darkening so the controls read cleanly */}
        <Rect x={0} y={0} width={width} height={height} fill="url(#fade)" />
      </Svg>

      <SafeAreaView style={styles.safe}>
        <View style={styles.spacerTop} />

        <View style={styles.logoWrap}>
          <SvgXml xml={washOnLogo} width={logoWidth} height={logoHeight} />
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.primary}
            onPress={() => navigation.navigate('Auth', { mode: 'login' })}
          >
            <Text style={styles.primaryText}>{t('common.enter')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.secondary}
            onPress={() => navigation.navigate('Auth', { mode: 'signup' })}
          >
            <Text style={styles.secondaryText}>{t('common.signup')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.ghost}
            onPress={() => navigation.navigate('Guest')}
          >
            <Text style={styles.ghostText}>{t('common.guest')}</Text>
          </TouchableOpacity>

          <View style={styles.langRow}>
            {LANGS.map((l) => {
              const active = lang === l.code;
              return (
                <TouchableOpacity
                  key={l.code}
                  activeOpacity={0.8}
                  onPress={() => setLang(l.code)}
                  style={[styles.pill, active && styles.pillActive]}
                >
                  <Text style={[styles.pillText, active && styles.pillTextActive]}>
                    {l.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.spacerBottom} />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#02060F' },
  safe: { flex: 1, alignItems: 'center' },

  spacerTop: { flex: 1 },
  spacerBottom: { flex: 1.4 },

  logoWrap: { alignItems: 'center', justifyContent: 'center' },

  actions: {
    width: '100%',
    paddingHorizontal: 28,
    marginTop: 40,
    gap: 14,
  },

  primary: {
    backgroundColor: '#2C54C4',
    borderRadius: radius.lg,
    paddingVertical: 18,
    alignItems: 'center',
    // soft blue glow under the primary CTA
    shadowColor: '#2C54C4',
    shadowOpacity: 0.55,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  primaryText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: fonts.bodyMed,
    letterSpacing: 0.2,
  },

  secondary: {
    backgroundColor: '#14161E',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    borderRadius: radius.lg,
    paddingVertical: 17,
    alignItems: 'center',
  },
  secondaryText: { color: '#fff', fontSize: 16, fontFamily: fonts.body },

  ghost: { alignItems: 'center', paddingVertical: 6, marginTop: 2 },
  ghostText: {
    color: colors.text2,
    fontSize: 14,
    textDecorationLine: 'underline',
    fontFamily: fonts.body,
  },

  langRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: 4,
  },
  pill: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  pillActive: {
    borderColor: '#2C54C4',
    backgroundColor: 'rgba(44,84,196,0.16)',
  },
  pillText: { fontSize: 12, color: colors.text2, fontFamily: fonts.body },
  pillTextActive: { color: '#fff' },
});
