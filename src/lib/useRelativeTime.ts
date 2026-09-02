import { useCallback } from 'react'
import { formatRelativeTime, relativeDay } from '@/lib/format'
import { useI18n } from '@/lib/i18n'

/**
 * `formatRelativeTime` bound to the active language.
 *
 * The formatters in `lib/format.ts` stay pure and take the language explicitly,
 * so they remain testable under `node --test` and free of React. This is the
 * component-side wrapper, mirroring `lib/useSubjectName.ts`.
 */
export function useRelativeTime(): (iso: string, from?: Date) => string {
  const { lang } = useI18n()
  return useCallback((iso: string, from?: Date) => formatRelativeTime(iso, lang, from), [lang])
}

/** `relativeDay` bound to the active language. */
export function useRelativeDay(): (target: Date, from?: Date) => string {
  const { lang } = useI18n()
  return useCallback((target: Date, from?: Date) => relativeDay(target, lang, from), [lang])
}
