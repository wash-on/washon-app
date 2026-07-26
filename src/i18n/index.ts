import { I18n } from 'i18n-js';
import { getLocales } from 'expo-localization';
import { pt } from './pt';
import { en } from './en';
import { es } from './es';
import type { Lang } from '@/types';

export const i18n = new I18n({ pt, en, es });

i18n.enableFallback = true;
i18n.defaultLocale = 'pt';

const device = getLocales()[0]?.languageCode ?? 'pt';
i18n.locale = ['pt', 'en', 'es'].includes(device) ? device : 'pt';

export function setLanguage(lang: Lang) {
  i18n.locale = lang;
}

export function t(key: string, opts?: Record<string, unknown>) {
  return i18n.t(key, opts);
}
