import {
  EXAM_BLOCK_TYPES, MODULE_BLOCK_LABEL,
  type ModuleScheduleBlock, type ModuleScheduleStore,
} from '../data/moduleSchedule.ts'
import { moduleKey } from '../data/moduleSubjects.ts'
import type { UniYear, University } from '../data/universities.ts'

/**
 * A block on the student's timetable, with the module it belongs to attached.
 *
 * The admin console stores schedules per module, keyed
 * `<universityId>:<yearId>:<courseId>`. A student does not think in modules
 * when they look at a Tuesday, so this flattens every module in their year into
 * one list and keeps the module name for the label.
 */
export interface ScheduledSession extends ModuleScheduleBlock {
  courseId: string
  courseName: string
  /** Local `Date` for the block's start, or its date at midnight when untimed. */
  start: Date
  /** Null for a logbook task, which is a deadline rather than a sitting. */
  end: Date | null
  label: string
  isExam: boolean
}

/** `YYYY-MM-DD` and `HH:MM` as a local Date — never as UTC, which shifts the day. */
function localDateTime(date: string, time: string): Date | null {
  const [year, month, day] = date.split('-').map(Number)
  if (!year || !month || !day) return null
  const [hour, minute] = (time || '00:00').split(':').map(Number)
  return new Date(year, month - 1, day, hour || 0, minute || 0)
}

/**
 * The blocks the console published for one module of this student's year.
 *
 * Keyed by the year's **ID**, through the very `moduleKey` the console writes
 * with, so a reader and a writer of the same store can never drift apart again.
 * They had drifted: both once keyed by the year's *label*, and when years grew
 * stable IDs the console moved to `moduleKey(uni.id, y.id, c.id)` while this
 * reader was left building `<uni>:<year label>:<course>`. "KAU_Y1" and "Year 1"
 * never match, so every published timetable came back empty — no lectures and
 * no exams in the calendar, `nextExam` null, and therefore no exam horizon for
 * the adaptive planner, which quietly gave every student the no-exam shares.
 *
 * The label form is still read when the ID finds nothing, because schedules
 * published before that migration are genuinely stored under it. Preferring the
 * ID means current data always wins; iOS reads both for the same reason
 * (`ios/Synapse/Core/Model/StudentSchedule.swift`).
 */
function blocksFor(
  schedules: ModuleScheduleStore, university: University, year: UniYear, courseId: string,
): ModuleScheduleBlock[] {
  return schedules[moduleKey(university.id, year.id, courseId)]
    ?? schedules[moduleKey(university.id, year.year, courseId)]
    ?? []
}

/**
 * The student's own timetable, as their university published it.
 *
 * Empty until an admin has set up their year — which is the honest state, and
 * the reason the old generated calendar had to go: it manufactured lectures,
 * seminars and a recurring exam for every month, forever, for everyone.
 */
export function flattenSchedule(
  university: University, year: UniYear, schedules: ModuleScheduleStore,
): ScheduledSession[] {
  const sessions: ScheduledSession[] = []
  for (const course of year.courses) {
    for (const block of blocksFor(schedules, university, year, course.id)) {
      const start = localDateTime(block.date, block.startTime)
      if (!start) continue
      sessions.push({
        ...block,
        courseId: course.id,
        courseName: course.name,
        start,
        end: block.endTime ? localDateTime(block.date, block.endTime) : null,
        label: MODULE_BLOCK_LABEL[block.type] ?? block.type,
        isExam: EXAM_BLOCK_TYPES.includes(block.type),
      })
    }
  }
  sessions.sort((a, b) => a.start.getTime() - b.start.getTime())
  return sessions
}

/** Whether two dates fall on the same local calendar day. */
export function sameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

/** Minutes a block occupies. Zero for an untimed logbook task. */
export function sessionMinutes(session: ScheduledSession): number {
  if (!session.end) return 0
  return Math.max(0, Math.round((session.end.getTime() - session.start.getTime()) / 60_000))
}

/**
 * The next exam on the timetable, and how many days away it is.
 *
 * Null when the student's year has no exam scheduled. The dashboard used to
 * claim "38 days to your Cardiovascular exam" from a literal; if no exam has
 * been published, the honest answer is to say nothing at all.
 */
export function nextExam(sessions: ScheduledSession[], now = new Date()): { session: ScheduledSession; daysAway: number } | null {
  const upcoming = sessions.find((session) => session.isExam && session.start.getTime() >= now.getTime())
  if (!upcoming) return null
  const midnightToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const midnightExam = new Date(upcoming.start.getFullYear(), upcoming.start.getMonth(), upcoming.start.getDate())
  return {
    session: upcoming,
    daysAway: Math.round((midnightExam.getTime() - midnightToday.getTime()) / 86_400_000),
  }
}
