'use client';

/**
 * Language context for the PT-BR / EN toggle.
 *
 * Mirrors the existing theme pattern: plain React Context + localStorage
 * ('portfolio-lang'), defaulting to PT-BR. <html lang> is kept in sync so
 * screen readers and crawlers see the active locale. No routing, no extra
 * dependencies — the production URL stays exactly the same.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { translations, type Locale } from './translations';

export type { Locale } from './translations';
export type Dict = typeof translations.pt;

const STORAGE_KEY = 'portfolio-lang';

interface LanguageContextValue {
  locale: Locale;
  t: Dict;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // 'pt' on both server and first client render → no hydration mismatch.
  const [locale, setLocaleState] = useState<Locale>('pt');

  // Restore the saved preference after mount.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'pt' || saved === 'en') setLocaleState(saved);
    } catch {
      /* localStorage unavailable — keep default */
    }
  }, []);

  // Keep <html lang> in sync with the active locale.
  useEffect(() => {
    document.documentElement.lang = locale === 'pt' ? 'pt-BR' : 'en';
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => {
      const next: Locale = prev === 'pt' ? 'en' : 'pt';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  return (
    <LanguageContext.Provider
      value={{ locale, t: translations[locale], setLocale, toggleLocale }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    // Fallback to PT so a component rendered outside the provider never crashes.
    return { locale: 'pt', t: translations.pt, setLocale: () => {}, toggleLocale: () => {} };
  }
  return ctx;
}
