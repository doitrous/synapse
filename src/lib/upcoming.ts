import type { ScheduledSession } from './useStudentSchedule'
// Relative and extensioned, like every other module under `node --test`: it
// resolves imports itself and knows nothing about Vite's `@/` alias. The
// type-only import above is erased before it looks, so it may stay aliased.
import { durationMinutes, isoDay, type StudyBlock } from '../data/studyBlocks.ts'

/**
 * One shape for everything on a student's day, from either calendar.
 *
 * A student has two: the timetable their university published, and the blocks
 * they planned themselves. Every surface that asked "what is next" read only the
 * first, so a student whose university has published nothing — which is most of
 * them, most of the time — was told there was nothing coming while their own
 * calendar was full. The two are different records with different owners, and
 * they stay that way; this is only the reading of them.
 *
 * Everything here is a pure function over plain data, so the rules that decide
 * what a student is shown next can be tested without a browser, a clock, or a
 * stored document.
 */

export type UpcomingSource = 'faculty' | 'personal'

export interface UpcomingItem {
  /** Unique across both sources: the two id spaces are unrelated. */
  id: string
  source: UpcomingSource
  title: string
  start: Date
  /** Null for an untimed item, such as a logbook deadline. */
  end: Date | null
  subjectId: string
  /** "Lecture", "Revision" — what this is, for the badge. */
  kind: string
  location?: string
  isExam: boolean
  /** Personal only: ticked off by the student. */
  done?: boolean
  /** Faculty only: the module it belongs to. */
  courseName?: string
  /** The underlying record's id, for writing back to it. */
  recordId: string
  /** Personal only, and only when planned from a published session. */
  fromSessionId?: string
}

/** `YYYY-MM-DD` and `HH:MM` as a local Date — never as UTC, which shifts the day. */
export function localDateTime(date: string, time: string): Date | null {
  const [year, month, day] = date.split('-').map(Number)
  if (!year || !month || !day) return null
  const [hour, minute] = (time || '00:00').split(':').map(Number)
  return new Date(year, month - 1, day, hour || 0, minute || 0)
}

export function sessionItem(session: ScheduledSession): UpcomingItem {
  return {
    id: `faculty:${session.id}`,
    source: 'faculty',
    title: session.title || session.label,
    start: session.start,
    end: session.end,
    subjectId: session.topicIds[0] ?? '',
    kind: session.label,
    location: session.location,
    isExam: session.isExam,
    courseName: session.courseName,
    recordId: session.id,
  }
}

/** Null when the stored block has a date nothing can be made of. */
export function blockItem(block: StudyBlock): UpcomingItem | null {
  const start = localDateTime(block.date, block.start)
  if (!start) return null
  const minutes = durationMinutes(block.start, block.end)
  return {
    id: `personal:${block.id}`,
    source: 'personal',
    title: block.title,
    start,
    end: minutes > 0 ? new Date(start.getTime() + minutes * 60_000) : null,
    subjectId: block.subjectId,
    kind: block.kind,
    isExam: false,
    done: Boolean(block.done),
    recordId: block.id,
    fromSessionId: block.sourceSessionId,
  }
}

/**
 * Both calendars as one list, in time order.
 *
 * A block planned from a published session is dropped in favour of the session
 * it came from. "Add to plan" copies a session into the student's own blocks
 * and records which one — so without this the moment a student added a lecture
 * to their plan, their day showed that lecture twice, an hour of teaching
 * counted as two, and the next thing coming up was a duplicate of itself.
 */
export function mergeUpcoming(sessions: ScheduledSession[], blocks: StudyBlock[]): UpcomingItem[] {
  const facultyIds = new Set(sessions.map((session) => session.id))
  const items = sessions.map(sessionItem)
  for (const block of blocks) {
    if (block.sourceSessionId && facultyIds.has(block.sourceSessionId)) continue
    const item = blockItem(block)
    if (item) items.push(item)
  }
  return items.sort((a, b) => a.start.getTime() - b.start.getTime() || a.id.localeCompare(b.id))
}

/**
 * The next thing still to come.
 *
 * An item counts as still to come until it has finished, not until it has
 * started: a lecture forty minutes in is what the student is doing now, and
 * skipping to the one after it would answer a question nobody asked. An untimed
 * item has only its start to go on.
 */
export function nextUp(items: UpcomingItem[], now: Date): UpcomingItem | null {
  return items.find((item) => (item.end ?? item.start).getTime() >= now.getTime()) ?? null
}

/** Everything on one local calendar day, in time order. */
export function itemsOn(items: UpcomingItem[], day: Date): UpcomingItem[] {
  const wanted = isoDay(day)
  return items.filter((item) => isoDay(item.start) === wanted)
}

/**
 * Whether this item has already finished.
 *
 * Used to dim a row rather than to remove it: "what have I already missed" is
 * the question the day is most often asked, and a list that erases its own past
 * cannot answer it.
 */
export function isPast(item: UpcomingItem, now: Date): boolean {
  return (item.end ?? item.start).getTime() < now.getTime()
}

/** Minutes an item occupies. Zero for an untimed one. */
export function itemMinutes(item: UpcomingItem): number {
  if (!item.end) return 0
  return Math.max(0, Math.round((item.end.getTime() - item.start.getTime()) / 60_000))
}
