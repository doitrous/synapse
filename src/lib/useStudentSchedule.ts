import { useMemo } from 'react'
import { usePersistentState } from './usePersistentState'
import { useUniversityCatalogue } from './useUniversityCatalogue'
import { useIdentity } from './useIdentity'
import {
  EXAM_BLOCK_TYPES, MODULE_BLOCK_LABEL,
  type ModuleScheduleBlock, type ModuleScheduleStore,
} from '@/data/moduleSchedule'

export const MODULE_SCHEDULE_STORAGE_KEY = 'synapse-module-schedules-v1'

/**
 * A block on the student's timetable, with the module it belongs to attached.
 *
 * The admin console stores schedules per module, keyed
 * `<universityId>:<year label>:<courseId>`. A student does not think in modules
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
 * The student's own timetable, as their university published it.
 *
 * Empty until an admin has set up their year — which is the honest state, and
 * the reason the old generated calendar had to go: it manufactured lectures,
 * seminars and a recurring exam for every month, forever, for everyone.
 */
export function useStudentSchedule(): { sessions: ScheduledSession[]; hasYear: boolean } {
  const { audience } = useIdentity()
  const [catalogue] = useUniversityCatalogue()
  const [schedules] = usePersistentState<ModuleScheduleStore>(MODULE_SCHEDULE_STORAGE_KEY, {})

  return useMemo(() => {
    const university = catalogue.find((item) => item.id === audience.universityId)
    const year = university?.years.find((item) => item.year === audience.year)
    if (!year) return { sessions: [], hasYear: false }

    const sessions: ScheduledSession[] = []
    for (const course of year.courses) {
      const blocks = schedules[`${university!.id}:${year.year}:${course.id}`] ?? []
      for (const block of blocks) {
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
    return { sessions, hasYear: true }
  }, [audience.universityId, audience.year, catalogue, schedules])
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
