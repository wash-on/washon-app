import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, fonts } from '@/theme';
import { Badge } from './ui';

/* ── Vehicle / order card ── */
export function VehicleCard({
  plate, subtitle, time, status, onPress, dim,
}: {
  plate: string; subtitle: string; time?: string; status?: string;
  onPress?: () => void; dim?: boolean;
}) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.card}>
      <View style={[styles.icon, dim && { backgroundColor: colors.surface3 }]}>
        <Ionicons name="car-sport" size={22} color={dim ? colors.text3 : colors.accent} />
      </View>
      <View style={{ flex: 1, minWidth: 0 }}>
        <Text style={styles.plate}>{plate}</Text>
        <Text style={styles.model} numberOfLines={1}>{subtitle}</Text>
        {time ? <Text style={styles.time}>{time}</Text> : null}
      </View>
      <View style={{ alignItems: 'flex-end', gap: 6 }}>
        {status ? <Badge status={status} /> : null}
        <Ionicons name="chevron-forward" size={16} color={colors.text3} />
      </View>
    </TouchableOpacity>
  );
}

/* ── Labeled text input ── */
export function Field({
  label, value, onChangeText, placeholder, secureTextEntry, keyboardType, autoCapitalize, hint,
}: {
  label: string; value: string; onChangeText: (s: string) => void;
  placeholder?: string; secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'phone-pad' | 'numeric';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'; hint?: string;
}) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.text3}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
    </View>
  );
}

/* ── Checklist OK/✗ row ── */
export function ChecklistRow({
  name, description, value, onChange,
}: {
  name: string; description?: string;
  value: 'ok' | 'fail' | 'none'; onChange: (v: 'ok' | 'fail') => void;
}) {
  return (
    <View style={styles.checkRow}>
      <View style={{ flex: 1 }}>
        <Text style={styles.checkName}>{name}</Text>
        {description ? <Text style={styles.checkDesc}>{description}</Text> : null}
      </View>
      <View style={{ flexDirection: 'row', gap: 6 }}>
        <Toggle active={value === 'ok'} kind="ok" onPress={() => onChange('ok')} />
        <Toggle active={value === 'fail'} kind="fail" onPress={() => onChange('fail')} />
      </View>
    </View>
  );
}

function Toggle({ active, kind, onPress }: { active: boolean; kind: 'ok' | 'fail'; onPress: () => void }) {
  const activeStyle =
    kind === 'ok'
      ? { backgroundColor: colors.successBg, borderColor: colors.success }
      : { backgroundColor: colors.dangerBg, borderColor: colors.danger };
  const activeFg = kind === 'ok' ? colors.success : colors.danger;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.toggle, active && activeStyle]}
    >
      <Text style={[styles.toggleText, active && { color: activeFg }]}>
        {kind === 'ok' ? 'OK' : '✗'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface2, borderRadius: radius.lg, padding: 14,
    flexDirection: 'row', alignItems: 'center', gap: 12,
    borderWidth: 1, borderColor: colors.border, marginBottom: 10,
  },
  icon: {
    width: 44, height: 44, backgroundColor: colors.surface3, borderRadius: radius.sm,
    alignItems: 'center', justifyContent: 'center',
  },
  plate: { fontFamily: fonts.display, fontSize: 17, color: colors.text, letterSpacing: 1 },
  model: { fontSize: 12, color: colors.text2, marginTop: 1 },
  time: { fontSize: 11, color: colors.text3, marginTop: 2 },
  label: {
    fontSize: 11, color: colors.text2, marginBottom: 6, fontFamily: fonts.bodyMed,
    textTransform: 'uppercase', letterSpacing: 0.5,
  },
  input: {
    backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.sm, paddingHorizontal: 14, paddingVertical: 13,
    color: colors.text, fontSize: 15, fontFamily: fonts.body,
  },
  hint: { fontSize: 11, color: colors.text3, marginTop: 4 },
  checkRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  checkName: { fontSize: 14, color: colors.text, fontFamily: fonts.bodyMed },
  checkDesc: { fontSize: 12, color: colors.text2, marginTop: 2 },
  toggle: {
    paddingVertical: 6, paddingHorizontal: 14, borderRadius: radius.xs,
    borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface3,
  },
  toggleText: { fontSize: 12, color: colors.text2, fontFamily: fonts.bodyMed },
});
