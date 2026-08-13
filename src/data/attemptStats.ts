import type { AttemptRecord } from './attempts'
import type { Difficulty } from './qbank'

/**
 * Every number the student sees about their own work, derived here.
 *
 * Pure functions over the attempt log, so each figure can be traced to the
 * records that produced it and tested without a browser. The rule this file
 * enforces is that an unmarked attempt never reaches an accuracy: a station
 * ticked by the student is practice, and counting it as right or wrong would
 * make the headline accuracy a number about nothing.
 *
 * Anything that would need a cohort — a percentile, a rank, "faster than
 * average" — is deliberately absent. That data does not exist on the client and
 * inventing it is exactly what these screens are being repaired for.
 */

/** Attempts that were marked against a key. */
export function marked(records: AttemptRecord[]): AttemptRecord[] {
  return records.filter((record) => record.correct !== null)
}

/** Accuracy across marked attempts, or null when nothing has been marked. */
export function accuracyOf(records: AttemptRecord[]): number | null {
  const scored = marked(records)
  if (!scored.length) return null
  return scored.filter((record) => record.correct).length / scored.length
}

export interface Breakdown<K extends string> {
  key: K
  attempts: number
  marked: number
  correct: number
  /** Null when this group has no marked attempt. */
  accuracy: number | null
}

function group<K extends string>(records: AttemptRecord[], keyOf: (record: AttemptRecord) => K): Breakdown<K>[] {
  const buckets = new Map<K, AttemptRecord[]>()
  for (const record of records) {
    const key = keyOf(record)
    const bucket = buckets.get(key)
    if (bucket) bucket.push(record)
    else buckets.set(key, [record])
  }
  return [...buckets.entries()].map(([key, items]) => {
    const scored = marked(items)
    return {
      key,
      attempts: items.length,
      marked: scored.length,
      correct: scored.filter((record) => record.correct).length,
      accuracy: scored.length ? scored.filter((record) => record.correct).length / scored.length : null,
    }
  })
}

export function bySubject(records: AttemptRecord[]): Breakdown<string>[] {
  return group(records, (record) => record.subjectId).sort((a, b) => b.attempts - a.attempts)
}

export function byTopic(records: AttemptRecord[]): Breakdown<string>[] {
  return group(records, (record) => record.topic).sort((a, b) => b.attempts - a.attempts)
}

export function byDifficulty(records: AttemptRecord[]): Breakdown<Difficulty>[] {
  return group(records, (record) => record.difficulty)
}

export function bySurface(records: AttemptRecord[]): Breakdown<string>[] {
  return group(records, (record) => record.surface).sort((a, b) => b.attempts - a.attempts)
}

/**
 * The weakest groups, worst accuracy first.
 *
 * A group needs `minMarked` marked attempts to be eligible. One wrong answer is
 * not a weakness, and ranking it as one sends a student to revise a topic on
 * the strength of a single unlucky item.
 */
export function weakest<K extends string>(breakdowns: Breakdown<K>[], minMarked = 3, limit = 5): Breakdown<K>[] {
  return breakdowns
    .filter((entry) => entry.marked >= minMarked && entry.accuracy !== null)
    .sort((a, b) => (a.accuracy! - b.accuracy!) || (b.marked - a.marked))
    .slice(0, limit)
}

export interface DayCount {
  /** Local calendar date, `YYYY-MM-DD`. */
  date: string
  attempts: number
  marked: number
  correct: number
}

/** Local calendar date of a timestamp — not the UTC one, which shifts the day. */
export function localDay(at: string | Date): string {
  const date = typeof at === 'string' ? new Date(at) : at
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

/**
 * One entry per day for the last `days` days, including the empty ones.
 *
 * A heatmap or a bar chart needs the gaps as much as the activity; skipping
 * silent days would compress a fortnight of nothing into a solid week.
 */
export function dailyCounts(records: AttemptRecord[], days: number, today = new Date()): DayCount[] {
  const counts = new Map<string, DayCount>()
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate() - (days - 1))
  for (let offset = 0; offset < days; offset++) {
    const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + offset)
    const key = localDay(date)
    counts.set(key, { date: key, attempts: 0, marked: 0, correct: 0 })
  }
  for (const record of records) {
    const entry = counts.get(localDay(record.at))
    if (!entry) continue
    entry.attempts += 1
    if (record.correct !== null) {
      entry.marked += 1
      if (record.correct) entry.correct += 1
    }
  }
  return [...counts.values()]
}

/**
 * Consecutive days ending today, or ending yesterday.
 *
 * A streak that broke the moment midnight passed would tell someone who studied
 * every day for a month that they were on zero, before they had a chance to
 * open the app. Today not being counted yet does not end the streak; the day
 * before that being empty does.
 */
export function currentStreak(records: AttemptRecord[], today = new Date()): number {
  const active = new Set(records.map((record) => localDay(record.at)))
  if (!active.size) return 0
  const todayKey = localDay(today)
  let cursor = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  if (!active.has(todayKey)) {
    cursor = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() - 1)
    if (!active.has(localDay(cursor))) return 0
  }
  let streak = 0
  while (active.has(localDay(cursor))) {
    streak += 1
    cursor = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() - 1)
  }
  return streak
}

export function longestStreak(records: AttemptRecord[]): number {
  const days = [...new Set(records.map((record) => localDay(record.at)))].sort()
  let best = 0
  let run = 0
  let previous: number | null = null
  for (const day of days) {
    const time = new Date(`${day}T00:00:00`).getTime()
    run = previous !== null && time - previous === 86_400_000 ? run + 1 : 1
    previous = time
    if (run > best) best = run
  }
  return best
}

/** Median seconds per timed attempt, or null when nothing was timed. */
export function medianSeconds(records: AttemptRecord[]): number | null {
  const timed = records
    .map((record) => record.seconds)
    .filter((seconds): seconds is number => typeof seconds === 'number' && seconds >= 0)
    .sort((a, b) => a - b)
  if (!timed.length) return null
  const middle = Math.floor(timed.length / 2)
  return timed.length % 2 ? timed[middle] : Math.round((timed[middle - 1] + timed[middle]) / 2)
}

/** Attempts per hour of the day, 0–23, in the student's own timezone. */
export function hourHistogram(records: AttemptRecord[]): number[] {
  const hours = new Array<number>(24).fill(0)
  for (const record of records) hours[new Date(record.at).getHours()] += 1
  return hours
}

export interface FirstAttemptSplit {
  first: Breakdown<'first'>
  repeat: Breakdown<'repeat'>
}

/**
 * How the first sight of an item compares with every later one.
 *
 * First-attempt accuracy is the honest measure of what a student knew; repeat
 * accuracy mostly measures whether they remember the answer. Reporting one
 * number over both flatters the record, so they are kept apart.
 */
export function firstAttemptSplit(records: AttemptRecord[]): FirstAttemptSplit {
  const ordered = [...records].sort((a, b) => a.at.localeCompare(b.at))
  const seen = new Set<string>()
  const firsts: AttemptRecord[] = []
  const repeats: AttemptRecord[] = []
  for (const record of ordered) {
    const key = `${record.surface}:${record.itemId}`
    if (seen.has(key)) repeats.push(record)
    else { seen.add(key); firsts.push(record) }
  }
  const summarise = <K extends string>(key: K, items: AttemptRecord[]): Breakdown<K> => {
    const scored = marked(items)
    return {
      key,
      attempts: items.length,
      marked: scored.length,
      correct: scored.filter((record) => record.correct).length,
      accuracy: scored.length ? scored.filter((record) => record.correct).length / scored.length : null,
    }
  }
  return { first: summarise('first', firsts), repeat: summarise('repeat', repeats) }
}

/** Distinct items attempted, which is coverage rather than volume. */
export function distinctItems(records: AttemptRecord[]): number {
  return new Set(records.map((record) => `${record.surface}:${record.itemId}`)).size
}
