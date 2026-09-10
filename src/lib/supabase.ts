import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const url = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
const anonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const isSupabaseConfigured = Boolean(url && anonKey);

/**
 * Session storage moved from AsyncStorage to SecureStore.
 *
 * AsyncStorage is plain unencrypted files in the app sandbox — readable from a
 * backup or a jailbroken device. The refresh token is a long-lived credential
 * and belongs in the Keychain. SecureStore values are capped at 2048 bytes;
 * Supabase sessions fit, but the chunking below keeps a large token from
 * silently failing to persist and logging the user out on every launch.
 */
const CHUNK = 1800;

const SecureAdapter = {
  getItem: async (key: string) => {
    const head = await SecureStore.getItemAsync(key);
    if (head === null) return null;
    if (!head.startsWith('__chunks__:')) return head;
    const count = parseInt(head.split(':')[1], 10);
    const parts: string[] = [];
    for (let i = 0; i < count; i++) {
      parts.push((await SecureStore.getItemAsync(`${key}__${i}`)) ?? '');
    }
    return parts.join('');
  },
  setItem: async (key: string, value: string) => {
    if (value.length <= CHUNK) {
      await SecureStore.setItemAsync(key, value);
      return;
    }
    const count = Math.ceil(value.length / CHUNK);
    await SecureStore.setItemAsync(key, `__chunks__:${count}`);
    for (let i = 0; i < count; i++) {
      await SecureStore.setItemAsync(`${key}__${i}`, value.slice(i * CHUNK, (i + 1) * CHUNK));
    }
  },
  removeItem: async (key: string) => {
    const head = await SecureStore.getItemAsync(key);
    if (head?.startsWith('__chunks__:')) {
      const count = parseInt(head.split(':')[1], 10);
      for (let i = 0; i < count; i++) await SecureStore.deleteItemAsync(`${key}__${i}`);
    }
    await SecureStore.deleteItemAsync(key);
  },
};

export const supabase = createClient(url, anonKey, {
  auth: {
    // SecureStore has no web implementation; fall back to the default there.
    storage: Platform.OS === 'web' ? undefined : SecureAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
