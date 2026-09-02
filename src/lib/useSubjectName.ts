import { useCallback } from 'react'
import { subjectName } from '@/data/subjects'
import { useI18n } from '@/lib/i18n'

/**
 * `subjectName` bound to the active language.
 *
 * The pure helper lives in `data/subjects.ts`, which stays free of React so the
 * data tests can import it under `node --test`; this is the component-side
 * wrapper every surface that renders a system's name should use instead of
 * reading `getSubject(id).name`.
 */
export function useSubjectName(): (id: string) => string {
  const { lang } = useI18n()
  return useCallback((id: string) => subjectName(id, lang), [lang])
}
