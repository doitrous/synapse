/**
 * One shape for anything that appears on the student's calendar.
 *
 * This module used to *generate* the calendar: a lecture every Monday, a
 * seminar every Tuesday, a lab every Thursday, review cards on even days and a
 * "Formative assessment: Cardiovascular" on the third Thursday of every month,
 * forever, for every student. None of it existed. What remains is the shape
 * those events are now mapped into, from two real sources — the module
 * schedule an admin published, and the blocks the student planned themselves.
 */

export type Layer = 'curriculum' | 'personal'

export interface CalEvent {
  id: string
  title: string
  date: Date
  /** `HH:MM`, local. */
  time: string
  /** `HH:MM` end, when the source has one. */
  endTime?: string
  layer: Layer
  subjectId: string
  /** The module this belongs to, e.g. `"CVS 01"`, when one is recorded. */
  moduleId?: string
  kind: string
  location?: string
  /** True for an exam block, which is worth marking differently. */
  isExam?: boolean
}
