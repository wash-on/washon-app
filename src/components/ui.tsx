import React, { useState } from 'react';
import {
  View, Text, Image, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, ActivityIndicator,
} from 'react-native';
import { colors, radius, fonts, statusColors } from '@/theme';
import { useLang } from '@/context/LanguageContext';

// Real logo asset — art v1.3 (07/2026), 2000×1037 px, ratio ≈ 1.9292:1.
// The tagline "Estética Automotiva" is part of the artwork and is never
// translated, so this asset is language-independent.
const LOGO_PNG = require('../../assets/logo-wash-on.png');
const LOGO_RATIO = 2000 / 1037;

/* ── Logo — uses real PNG, falls back to text placeholder on error ── */
export function Logo({ size = 'sm' }: { size?: 'sm' | 'lg' }) {
  const [imgError, setImgError] = useState(false);

  // Dimensions that preserve the artwork's real aspect ratio.
  const width  = size === 'lg' ? 180 : 60;
  const height = width / LOGO_RATIO;

  if (!imgError) {
    return (
      <Image
        source={LOGO_PNG}
        style={{ width, height, resizeMode: 'contain' }}
        onError={() => setImgError(true)}
        accessibilityLabel="WashOn Estética Automotiva"
      />
    );
  }

  // ── Fallback: text-based placeholder ───────────────────────────
  const wash = size === 'lg' ? 64 : 20;
  const on   = size === 'lg' ? 34 : 13;
  const padV = size === 'lg' ? 6 : 1;
  const padH = size === 'lg' ? 14 : 7;
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={{ fontFamily: fonts.display, fontSize: wash, color: '#fff', letterSpacing: -1 }}>
        WASH
      </Text>
      <View
        style={{
          backgroundColor: colors.primary,
          transform: [{ skewX: '-8deg' }],
          paddingVertical: padV,
          paddingHorizontal: padH,
          marginLeft: -3,
        }}
      >
        <Text
          style={{
            fontFamily: fonts.displayMed,
            fontSize: on,
            color: '#fff',
            fontStyle: 'italic',
            transform: [{ skewX: '8deg' }],
          }}
        >
          On
        </Text>
      </View>
    </View>
  );
}

/* ── Status badge ── */
export function Badge({ status }: { status: string }) {
  const { t } = useLang();
  const c = statusColors[status] ?? { bg: colors.surface3, fg: colors.text2 };
  return (
    <View style={[styles.badge, { backgroundColor: c.bg }]}>
      <Text style={[styles.badgeText, { color: c.fg }]}>{t(`status.${status}`)}</Text>
    </View>
  );
}

/* ── Buttons ── */
type BtnVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'ghost';
export function Button({
  label, onPress, variant = 'primary', style, loading, flex,
}: {
  label: string; onPress: () => void; variant?: BtnVariant;
  style?: ViewStyle; loading?: boolean; flex?: boolean;
}) {
  const bg: Record<BtnVariant, string> = {
    primary: colors.primary, secondary: colors.surface2,
    success: colors.success, danger: colors.danger, ghost: 'transparent',
  };
  const fg = variant === 'secondary' ? colors.text : variant === 'ghost' ? colors.text2 : '#fff';
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[
        styles.btn,
        { backgroundColor: bg[variant] },
        variant === 'secondary' && { borderWidth: 1, borderColor: colors.border2 },
        variant === 'ghost' && { paddingVertical: 12 },
        flex && { flex: 1 },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={fg} />
      ) : (
        <Text style={[styles.btnText, { color: fg }]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

/* ── Fake iOS status bar row (9:41 + wifi) ── */
export function FauxStatusBar() {
  return (
    <View style={styles.statusBar}>
      <Text style={styles.statusTime}>9:41</Text>
      <Text style={styles.statusTime}>􀙇 􀛪</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 4, paddingHorizontal: 10, borderRadius: 20, alignSelf: 'flex-start',
  },
  badgeText: { fontSize: 10, fontFamily: fonts.bodyBold, letterSpacing: 0.5, textTransform: 'uppercase' },
  btn: {
    borderRadius: radius.lg, paddingVertical: 15, alignItems: 'center', justifyContent: 'center',
  },
  btnText: { fontFamily: fonts.bodyMed, fontSize: 15 },
  statusBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 22, paddingTop: 8, paddingBottom: 6,
  },
  statusTime: { color: colors.text2, fontSize: 12, fontFamily: fonts.bodyMed },
});
