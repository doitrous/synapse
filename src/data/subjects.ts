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
 * in a muted grey is more useful than an empty badge or a thrown error.
 */
export function getSubject(id: string): Subject {
  return subjectsById[id] ?? { id, name: id, short: id.toUpperCase(), color: '#6d7688' }
}
