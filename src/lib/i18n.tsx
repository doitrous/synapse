import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { usePersistentState } from '@/lib/usePersistentState'
import { AppBootSkeleton } from '@/components/loading/AppBootSkeleton'

export type Lang = 'en' | 'ar'
export type Dir = 'ltr' | 'rtl'

export const LANG_STORAGE_KEY = 'nishany-lang'

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
  // The Arabic dictionary is ~320KB. English is the default, so it is fetched
  // lazily the first time a session is actually in Arabic — never on the English
  // boot path, where the whole thing used to ship in the eager app shell.
  const [ar, setAr] = useState<Record<string, string> | null>(null)
  // If the fetch fails, the app renders anyway with the English source as a last
  // resort — the alternative is holding a skeleton forever on a lost network.
  const [arFailed, setArFailed] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    root.lang = lang
    root.dir = dir
  }, [lang, dir])

  useEffect(() => {
    if (lang !== 'ar' || ar) return
    let cancelled = false
    void import('@/data/i18n-ar').then(
      (m) => { if (!cancelled) setAr(m.AR) },
      () => { if (!cancelled) setArFailed(true) },
    )
    return () => { cancelled = true }
  }, [lang, ar])

  const t = useCallback(
    (en: string) => {
      if (lang === 'en') return en
      return ar?.[en] ?? en
    },
    [lang, ar],
  )

  // An Arabic session waits behind a skeleton until its dictionary arrives,
  // rather than painting English strings that snap to Arabic a beat later. The
  // skeleton lays out right-to-left, so first paint already reads as Arabic.
  const arabicPending = lang === 'ar' && !ar && !arFailed

  const value = useMemo<I18nValue>(
    () => ({ lang, dir, setLang, toggle: () => setLang(lang === 'ar' ? 'en' : 'ar'), t }),
    [lang, dir, setLang, t],
  )

  return (
    <I18nContext.Provider value={value}>
      {arabicPending ? <AppBootSkeleton /> : children}
    </I18nContext.Provider>
  )
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
