import Constants from 'expo-constants';
import type { RoleKey } from '@/context/AuthContext';

/** Which build this is: set by app.config.ts from the APP_VARIANT env var. */
export const appVariant: 'client' | 'staff' =
  (Constants.expoConfig?.extra?.appVariant as 'client' | 'staff') ?? 'client';

/**
 * Which roles this build is allowed to render. A convenience for the UI only —
 * the database does not care which app you are holding, and RLS denies
 * out-of-scope rows either way. This just stops the staff app from showing a
 * customer a specialist dashboard it would then fail to populate.
 */
export function rolesForVariant(v: 'client' | 'staff'): RoleKey[] {
  return v === 'client'
    ? ['client']
    : ['specialist', 'unit_manager', 'franchisee', 'network_admin', 'auditor'];
}
