import React, { createContext, useContext, useState, useCallback } from 'react';
import { i18n, setLanguage as applyLanguage } from '@/i18n';
import type { Lang } from '@/types';

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string, opts?: Record<string, unknown>) => string;
}

const LanguageContext = createContext<LangCtx | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>((i18n.locale as Lang) ?? 'pt');

  const setLang = useCallback((l: Lang) => {
    applyLanguage(l);
    setLangState(l);
  }, []);

  // Bind t to lang so consumers re-render when language switches.
  const t = useCallback(
    (key: string, opts?: Record<string, unknown>) => i18n.t(key, opts),
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}
