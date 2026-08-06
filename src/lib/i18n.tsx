import { createContext, useCallback, useContext, useEffect, useMemo, type ReactNode } from 'react'
import { usePersistentState } from '@/lib/usePersistentState'
import { AR } from '@/data/i18n-ar'

export type Lang = 'en' | 'ar'
export type Dir = 'ltr' | 'rtl'

export const LANG_STORAGE_KEY = 'synapse-lang'

interface I18nValue {
  lang: Lang
  dir: Dir
  setLang: (lang: Lang) => void
  toggle: () => void
  /**
   * Translate an English source string to the active language.
   * Keyed by the English text itself so surfaces can be wrapped incrementally:
   * `t('Dashboard')`. Missing Arabic entries fall back to the English source,
   * so the app is never broken by an untranslated string.
   */
  t: (en: string) => string
}

const I18nContext = createContext<I18nValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = usePersistentState<Lang>(LANG_STORAGE_KEY, 'en')
  const dir: Dir = lang === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    const root = document.documentElement
    root.lang = lang
    root.dir = dir
  }, [lang, dir])

  const t = useCallback(
    (en: string) => {
      if (lang === 'en') return en
      return AR[en] ?? en
    },
    [lang],
  )

  const value = useMemo<I18nValue>(
    () => ({ lang, dir, setLang, toggle: () => setLang(lang === 'ar' ? 'en' : 'ar'), t }),
    [lang, dir, setLang, t],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    // Landing pages render outside the provider; give them a passive default.
    return {
      lang: 'en',
      dir: 'ltr',
      setLang: () => {},
      toggle: () => {},
      t: (en) => en,
    }
  }
  return ctx
}

/** Convenience hook returning just the translate function. */
export function useT(): I18nValue['t'] {
  return useI18n().t
}
