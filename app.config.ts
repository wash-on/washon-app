import type { ExpoConfig, ConfigContext } from 'expo/config';

/**
 * Two apps, one codebase.
 *
 * Your decision: start with a client app and a staff/admin app, split the
 * staff app into staff + admin later. Nothing here blocks that — adding a
 * third variant is a new entry in VARIANTS and a new EAS profile.
 *
 *   APP_VARIANT=client npx expo start
 *   APP_VARIANT=staff  npx expo start
 *
 * `bundleIdentifier` differs per variant, so both can sit on one device and
 * TestFlight treats them as separate apps — which is what homologation needs.
 */

type Variant = 'client' | 'staff';

const VARIANTS: Record<Variant, {
  name: string; slug: string; ios: string; android: string; scheme: string;
}> = {
  client: {
    name: 'WashOn',
    slug: 'washon-client',
    ios: 'com.washonestetica.client',
    android: 'com.washonestetica.client',
    scheme: 'washon',
  },
  staff: {
    // Deliberately distinct on the home screen: a specialist and a network
    // admin must never be unsure which app they are holding.
    name: 'WashOn Pro',
    slug: 'washon-staff',
    ios: 'com.washonestetica.staff',
    android: 'com.washonestetica.staff',
    scheme: 'washonpro',
  },
};

const variant = (process.env.APP_VARIANT ?? 'client') as Variant;

if (!VARIANTS[variant]) {
  throw new Error(
    `APP_VARIANT must be one of ${Object.keys(VARIANTS).join(' | ')}, got "${variant}"`
  );
}

const v = VARIANTS[variant];

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: v.name,
  slug: v.slug,
  version: '0.2.0',
  orientation: 'portrait',
  scheme: v.scheme,
  userInterfaceStyle: 'dark',
  icon: './assets/icon.png',
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: false,
    bundleIdentifier: v.ios,
    buildNumber: '1',
    infoPlist: {
      UIUserInterfaceStyle: 'Dark',
      CFBundleDisplayName: v.name,
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
    package: v.android,
    versionCode: 1,
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#0A0A0A',
    },
  },
  // SDK 56 removed the top-level `splash` key; it is configured through the
  // expo-splash-screen plugin now.
  plugins: [
    'expo-font',
    'expo-localization',
    'expo-secure-store',
    ['expo-splash-screen', {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#0A0A0A',
    }],
  ],
  extra: {
    appVariant: variant,
    eas: { projectId: process.env.EAS_PROJECT_ID },
  },
});
