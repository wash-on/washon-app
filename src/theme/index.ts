export const colors = {
  primary: '#1A56CC',
  primaryDark: '#0F3A8C',
  primaryLight: 'rgba(26,86,204,0.15)',
  accent: '#2B7FFF',
  bg: '#0A0A0A',
  surface: '#111111',
  surface2: '#181818',
  surface3: '#222222',
  surface4: '#2A2A2A',
  text: '#FFFFFF',
  text2: '#9AA3B4',
  text3: '#555F70',
  success: '#1DB954',
  successBg: 'rgba(29,185,84,0.12)',
  danger: '#E03E3E',
  dangerBg: 'rgba(224,62,62,0.12)',
  warn: '#F5A623',
  warnBg: 'rgba(245,166,35,0.12)',
  info: '#2B7FFF',
  infoBg: 'rgba(43,127,255,0.12)',
  purple: '#9B59B6',
  purpleBg: 'rgba(155,89,182,0.12)',
  border: 'rgba(255,255,255,0.07)',
  border2: 'rgba(255,255,255,0.12)',
};

export const radius = { lg: 14, sm: 9, xs: 6 };

export const fonts = {
  display: 'Rajdhani_700Bold',
  displayMed: 'Rajdhani_500Medium',
  body: 'DMSans_400Regular',
  bodyMed: 'DMSans_500Medium',
  bodyBold: 'DMSans_600SemiBold',
  bodyLight: 'DMSans_300Light',
};

// Maps a vehicle/order status to its badge palette.
export const statusColors: Record<string, { bg: string; fg: string }> = {
  scheduled: { bg: colors.warnBg, fg: colors.warn },
  awaiting: { bg: colors.infoBg, fg: colors.info },
  'in-service': { bg: colors.successBg, fg: colors.success },
  ready: { bg: colors.purpleBg, fg: colors.purple },
  delivered: { bg: colors.surface3, fg: colors.text2 },
  cancelled: { bg: colors.dangerBg, fg: colors.danger },
  confirmed: { bg: colors.successBg, fg: colors.success },
};
