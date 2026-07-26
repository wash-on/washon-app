import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '@/theme';
import { useLang } from '@/context/LanguageContext';

// Generic "coming soon" view for Reports / Schedule (future release in spec).
export default function PlaceholderScreen() {
  const { t } = useLang();
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.center}>
        <Ionicons name="construct-outline" size={48} color={colors.text3} />
        <Text style={styles.text}>{t('toast.soon')}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  text: { color: colors.text2, fontSize: 15, fontFamily: fonts.bodyMed },
});
