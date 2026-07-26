import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { UserProfile, Lang } from '@/types';

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  initials: string;
  role: UserProfile;
}

interface AuthCtx {
  user: SessionUser | null;
  loading: boolean;
  signIn: (email: string, password: string, role: UserProfile) => Promise<{ error?: string }>;
  signUp: (data: SignUpData) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
}

export interface SignUpData {
  name: string;
  surname: string;
  contact: string;
  cpf: string;
  phone1: string;
  phone2?: string;
  lang: Lang;
  password: string;
}

const AuthContext = createContext<AuthCtx | undefined>(undefined);

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function validatePassword(pw: string) {
  return pw.length >= 8 && /[a-zA-Z]/.test(pw) && /[0-9]/.test(pw);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    // supabase-js v2.107: getSession() API unchanged.
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        const u = data.session.user;
        const name = (u.user_metadata?.name as string) ?? u.email ?? 'User';
        setUser({
          id: u.id,
          name,
          email: u.email ?? '',
          initials: initials(name),
          role: (u.user_metadata?.role as UserProfile) ?? 'Client',
        });
      }
      setLoading(false);
    });
  }, []);

  const signIn = useCallback(
    async (email: string, password: string, role: UserProfile) => {
      if (!isSupabaseConfigured) {
        const demo =
          role === 'Client'
            ? { id: 'demo-client', name: 'Maria Santos', email: 'maria@email.com', role }
            : { id: 'demo-spec', name: 'João Silva', email: 'joao@washon.com.br', role };
        setUser({ ...demo, initials: initials(demo.name) });
        return {};
      }
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { error: error.message };
      const u = data.user;
      const name = (u?.user_metadata?.name as string) ?? email;
      setUser({
        id: u!.id,
        name,
        email,
        initials: initials(name),
        role: (u?.user_metadata?.role as UserProfile) ?? role,
      });
      return {};
    },
    []
  );

  const signUp = useCallback(async (d: SignUpData) => {
    if (!isSupabaseConfigured) {
      return {};
    }
    const { error } = await supabase.auth.signUp({
      email: d.contact,
      password: d.password,
      options: {
        data: {
          name: `${d.name} ${d.surname}`.trim(),
          role: 'Client',
          cpf: d.cpf,
          cellphone_1: d.phone1,
          cellphone_2: d.phone2,
          lang: d.lang,
        },
      },
    });
    if (error) return { error: error.message };
    return {};
  }, []);

  const signOut = useCallback(async () => {
    if (isSupabaseConfigured) await supabase.auth.signOut();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
