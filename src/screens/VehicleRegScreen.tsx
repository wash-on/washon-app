import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, fonts } from '@/theme';
import { Button } from '@/components/ui';
import { Field } from '@/components/cards';
import { useLang } from '@/context/LanguageContext';
import type { RootStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'VehicleReg'>;

// In-memory plate registry; swap for a Supabase unique constraint check.
const registeredPlates = new Set<string>();

export default function VehicleRegScreen({ navigation }: Props) {
  const { t } = useLang();
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [plate, setPlate] = useState('');
  const [color, setColor] = useState('');
  const [error, setError] = useState('');

  function save() {
    const p = plate.trim().toUpperCase();
    if (!p) return setError(t('vehicleReg.errPlate'));
    if (registeredPlates.has(p)) return setError(t('vehicleReg.errDup'));
    registeredPlates.add(p);
    setError('');
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={22} color={colors.text} /></TouchableOpacity>
        <View>
          <Text style={styles.title}>{t('vehicleReg.title')}</Text>
          <Text style={styles.sub}>{t('vehicleReg.sub')}</Text>
        </View>
      </View>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 16 }} keyboardShouldPersistTaps="handled">
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <View style={styles.row}>
            <View style={{ flex: 1 }}><Field label={t('checkin.make')} value={make} onChangeText={setMake} placeholder="Honda" /></View>
            <View style={{ flex: 1 }}><Field label={t('checkin.model')} value={model} onChangeText={setModel} placeholder="Civic" /></View>
          </View>
          <Field label={t('checkin.plate')} value={plate} onChangeText={setPlate} placeholder="ABC-1234" autoCapitalize="characters" />
          <Field label={t('checkin.color')} value={color} onChangeText={setColor} placeholder="Prata" />
          <Button label={t('common.save')} variant="success" onPress={save} />
          <Button label={t('common.cancel')} variant="ghost" onPress={() => navigation.goBack()} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 12, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border },
  title: { fontSize: 16, color: colors.text, fontFamily: fonts.bodyBold },
  sub: { fontSize: 12, color: colors.text2 },
  error: { backgroundColor: 'rgba(224,62,62,0.1)', borderWidth: 1, borderColor: colors.danger, borderRadius: 9, padding: 10, color: '#F87171', fontSize: 13, marginBottom: 14 },
  row: { flexDirection: 'row', gap: 10 },
});
