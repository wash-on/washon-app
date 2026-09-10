import React, {
  createContext, useContext, useState, useEffect, useCallback, useMemo,
} from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { Lang } from '@/types';

/**
 * Replaces the 0.1.8 AuthContext.
 *
 * What changed and why:
 *   - `signIn` no longer takes a `role`. In 0.1.8 the caller passed the profile
 *     and it was read back out of `user_metadata`, which an authenticated
 *     client can rewrite — any user could grant themselves Specialist (Gap A,
 *     Rule A3 violation). Role now arrives only in the `memberships` claim
 *     minted by the Custom Access Token Hook, and the server re-derives it on
 *     every query regardless of what this file believes.
 *   - `role` is no longer a scalar. An identity may be a client at home and a
 *     specialist at work (v1.6 Principle P2), so the session carries a list and
 *     an `activeMembership` the user switches between.
 *
 * Nothing here is a security control. If this file were replaced wholesale by
 * an attacker, RLS would still deny every out-of-scope row. It exists to render
 * the right screens, not to decide access.
 */

export type RoleKey =
  | 'client' | 'specialist' | 'unit_manager'
  | 'franchisee' | 'network_admin' | 'auditor';

export type ScopeType = 'self' | 'account' | 'unit' | 'unit_group' | 'network';

export interface Membership {
  role: RoleKey;
  scope_type: ScopeType;
  scope_id: string | null;
}

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  initials: string;
  memberships: Membership[];
  preferredLanguage: Lang;
}

interface AuthCtx {
  user: SessionUser | null;
  loading: boolean;
  /** Null until a membership is chosen. Null with memberships.length > 1
   *  is the signal to render the context switcher (Rule A3). */
  activeMembership: Membership | null;
  setActiveMembership: (m: Membership) => void;
  /** True when the identity authenticated but holds no active membership —
   *  e.g. the very first admin, before claiming the master password. */
  needsBootstrap: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (data: SignUpData) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
}

export interface SignUpData {
  name: string; surname: string; contact: string; cpf: string;
  phone1: string; phone2?: string; lang: Lang; password: string;
}

const AuthContext = createContext<AuthCtx | undefined>(undefined);

function initials(name: string) {
  return name.split(' ').map((p) => p[0]).filter(Boolean)
    .slice(0, 2).join('').toUpperCase();
}

export function validatePassword(pw: string) {
  return pw.length >= 8 && /[a-zA-Z]/.test(pw) && /[0-9]/.test(pw);
}

/** BCP-47 in the database (`pt-BR`), catalogue key in the app (`pt`). */
function toLang(bcp47: string | undefined): Lang {
  switch (bcp47) {
    case 'en': return 'en';
    case 'es': return 'es';
    default:   return 'pt';
  }
}

/** Decodes the payload only. Signature verification happens server-side; this
 *  is a rendering hint (Rule N3). Never treat it as proof of anything. */
function readClaims(accessToken: string): Record<string, unknown> {
  try {
    const payload = accessToken.split('.')[1];
    const pad = payload.length % 4 ? '='.repeat(4 - (payload.length % 4)) : '';
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/') + pad);
    return JSON.parse(json);
  } catch {
    return {};
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<Membership | null>(null);

  const hydrate = useCallback(async () => {
    if (!isSupabaseConfigured) { setLoading(false); return; }
    const { data } = await supabase.auth.getSession();
    const session = data.session;
    if (!session?.user) { setUser(null); setActive(null); setLoading(false); return; }

    const claims = readClaims(session.access_token);
    const memberships = (claims.memberships as Membership[] | undefined) ?? [];
    const name =
      (session.user.user_metadata?.name as string) ?? session.user.email ?? 'User';

    setUser({
      id: session.user.id,
      email: session.user.email ?? '',
      name,
      initials: initials(name),
      memberships,
      preferredLanguage: toLang(claims.preferred_language as string),
    });

    // Auto-select only when there is nothing to choose. More than one
    // membership means the user decides, never the app.
    setActive(memberships.length === 1 ? memberships[0] : null);
    setLoading(false);
  }, []);

  useEffect(() => {
    hydrate();
    if (!isSupabaseConfigured) return;
    const { data: sub } = supabase.auth.onAuthStateChange(() => { hydrate(); });
    return () => sub.subscription.unsubscribe();
  }, [hydrate]);

  const signIn = useCallback(async (email: string, password: string) => {
    if (!isSupabaseConfigured) return { error: 'Supabase not configured' };
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    await hydrate();
    return {};
  }, [hydrate]);

  const signUp = useCallback(async (d: SignUpData) => {
    if (!isSupabaseConfigured) return { error: 'Supabase not configured' };
    // Rule A1 — self-registration produces a client and nothing else. No role
    // is written to user_metadata: metadata is user-writable and therefore
    // cannot carry authority. The membership is created server-side.
    const { error } = await supabase.auth.signUp({
      email: d.contact,
      password: d.password,
      options: {
        data: {
          name: `${d.name} ${d.surname}`.trim(),
          cpf: d.cpf,
          cellphone_1: d.phone1,
          cellphone_2: d.phone2,
          preferred_language: d.lang === 'pt' ? 'pt-BR' : d.lang,
        },
      },
    });
    if (error) return { error: error.message };
    return {};
  }, []);

  const signOut = useCallback(async () => {
    if (isSupabaseConfigured) await supabase.auth.signOut();
    setUser(null);
    setActive(null);
  }, []);

  const needsBootstrap = !!user && user.memberships.length === 0;

  const value = useMemo<AuthCtx>(() => ({
    user, loading, activeMembership: active, setActiveMembership: setActive,
    needsBootstrap, signIn, signUp, signOut, refresh: hydrate,
  }), [user, loading, active, needsBootstrap, signIn, signUp, signOut, hydrate]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

/** Rendering hint only (Rule N3). The server decides. */
export function useCan(): (permission: string) => boolean {
  const { activeMembership } = useAuth();
  return useCallback(() => !!activeMembership, [activeMembership]);
}
