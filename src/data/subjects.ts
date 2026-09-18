import type { Subject } from './types'
import { CURRICULUM_SUBJECTS } from './curriculumCatalog.ts'

/**
 * The organ systems and disciplines the curriculum is organised by.
 *
 * This is authored taxonomy, not student data: every question, article,
 * resource and practical tags itself with one of these ids, and both portals
 * read the same list. It was previously the top of `student.ts`, buried under
 * a fabricated day's timetable, a fabricated revision queue and a fabricated
 * progress record — all of which have been removed. Only the taxonomy remains.
 */

export const subjects: Subject[] = CURRICULUM_SUBJECTS

export const subjectsById: Record<string, Subject> = Object.fromEntries(
  subjects.map((s) => [s.id, s]),
)

/**
 * A subject by id, falling back to a neutral placeholder.
 *
 * Content can legitimately reference a subject the catalogue no longer lists —
 * an import from another curriculum, a system since renamed. Showing the raw id
 * in a muted grey is more useful than an empty badge or a thrown error. A
 * missing id (a curriculum or planned event with no subject) is coerced to ''
 * so the fallback renders a dash rather than throwing on `undefined.toUpperCase`.
 */
export function getSubject(id: string): Subject {
  const key = id ?? ''
  return subjectsById[key] ?? { id: key, name: key, short: key.toUpperCase() || '—', color: '#6d7688' }
}

/**
 * A system's display name in the language the interface is in.
 *
 * System names are authored taxonomy, not translatable copy, so they never went
 * through `t()` and read as English islands inside an Arabic page. The Arabic
 * label rides on the subject itself (`ar`), the same way the glossary's
 * categories carry theirs, and this is the one place that chooses between them.
 * `id` and `short` are untouched: content, filters and imports keep matching on
 * the codes they always did.
 */
export function subjectName(id: string, lang: 'en' | 'ar'): string {
  const subject = getSubject(id)
  return lang === 'ar' ? (subject.ar ?? subject.name) : subject.name
}
