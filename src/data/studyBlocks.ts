/**
 * The student's own plan, as distinct from their university's timetable.
 *
 * One shape, shared by the calendar that creates these, the dashboard timeline
 * that draws them, and the checklist that ticks them off. They were previously
 * three different notions of a "block": a stored record in the calendar, a
 * hardcoded array on the dashboard, and a local `useState` in the checklist —
 * so ticking a box on the dashboard changed nothing anywhere.
 */

export const STUDY_BLOCKS_STORAGE_KEY = 'synapse.calendar.blocks'

export interface StudyBlock {
  id: string
  title: string
  /** Local calendar date, `YYYY-MM-DD`. */
  date: string
  /** `HH:MM`, local. */
  start: string
  end: string
  subjectId: string
  /**
   * The module this block belongs to, e.g. `"CVS 01"` — optional, because a
   * student can plan against a subject without naming a module, and every
   * block written before this field existed has none.
   */
  moduleId?: string
  kind: string
  /** Set when the student ticks it off. */
  done?: boolean
  /** The timetable session this was planned from, when it was added from one. */
  sourceSessionId?: string
}

export function isoDay(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

/** Minutes between two `HH:MM` values, floored at zero. */
export function durationMinutes(start: string, end: string): number {
  const [startHour = 0, startMinute = 0] = start.split(':').map(Number)
  const [endHour = 0, endMinute = 0] = end.split(':').map(Number)
  return Math.max(0, (endHour * 60 + endMinute) - (startHour * 60 + startMinute))
}

/** Fractional hour of a `HH:MM` value, for positioning on a timeline. */
export function hourOf(value: string): number {
  const [hour = 0, minute = 0] = value.split(':').map(Number)
  return hour + minute / 60
}

export function blocksOn(blocks: StudyBlock[], date: Date): StudyBlock[] {
  const day = isoDay(date)
  return blocks.filter((block) => block.date === day).sort((a, b) => a.start.localeCompare(b.start))
}
