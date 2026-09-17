import { attemptOrder, type AttemptRecord, type AttemptSurface } from './attempts.ts'
import type { Difficulty } from './qbank'
import { paceBand, type PaceBand } from './qbankSession.ts'
import { bucketOf, type SourceBucket } from './questionSource.ts'

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

/** The finest authored label available, falling back to the historical topic. */
export function bySubtopic(records: AttemptRecord[]): Breakdown<string>[] {
  return group(records, (record) => record.subtopic?.trim() || record.topic)
    .sort((a, b) => b.attempts - a.attempts)
}

export function byDifficulty(records: AttemptRecord[]): Breakdown<Difficulty>[] {
  return group(records, (record) => record.difficulty)
}

/**
 * Attempts grouped by MCQ source bucket — same shape as `byDifficulty`. Marked
 * vs unmarked answers are handled by `group`, exactly as every sibling
 * breakdown. For a future per-source accuracy view; the coverage panel does not
 * use this.
 */
export function bySource(records: AttemptRecord[]): Breakdown<SourceBucket>[] {
  return group(records, (record) => bucketOf(record.source))
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
  const ordered = [...records].sort((a, b) => attemptOrder(a) - attemptOrder(b))
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

/** One sitting, reconstructed from the records it produced. */
export interface SessionSummary {
  sessionId: string
  /** When the first answer in the sitting was committed. */
  startedAt: string
  /** When the last one was. */
  endedAt: string
  surface: AttemptSurface
  answered: number
  /** Answers that were actually marked — a station is practice, not a score. */
  marked: number
  correct: number
  accuracy: number | null
  /** Distinct subjects covered, most-answered first. */
  subjectIds: string[]
  seconds: number
}

/**
 * One sitting, in the detail the student who sat it wants.
 *
 * The list of previous tests showed a name, a date, a count and one accuracy
 * figure. Everything below was already in the log and simply never read back —
 * which questions were right, which were wrong, which topics they were in, how
 * long each took. Derived rather than stored, so a deleted answer changes these
 * the same way it changes every other figure in the app.
 */
export interface SessionDetail {
  sessionId: string
  answered: number
  /** Answers that were marked against a key — the denominator for accuracy. */
  marked: number
  correct: number
  wrong: number
  /** Marked by nobody: a station ticked by the student is practice, not a score. */
  unmarked: number
  accuracy: number | null
  /** Full wall-clock duration when recorded, otherwise summed item timings. */
  durationSeconds: number
  /** Compatibility alias used by the older previous-tests surface. */
  seconds: number
  overtimeSeconds: number
  averageSeconds: number | null
  medianSeconds: number | null
  pace: Record<PaceBand, number>
  subjects: Breakdown<string>[]
  topics: Breakdown<string>[]
  subtopics: Breakdown<string>[]
  /** Topics with at least one wrong answer, most wrong first. */
  missed: Breakdown<string>[]
  /**
   * The weakest topic in this sitting, or null when nothing qualifies.
   *
   * Two marked attempts, not the three `weakest` asks of a whole history: a
   * sitting is usually five to twenty questions, and at three nothing would
   * ever qualify. One wrong answer still is not a weakness — it is a wrong
   * answer, and it is already listed under `missed`.
   */
  weakestTopic: Breakdown<string> | null
  /** Topics missed here and in at least two earlier marked attempts. */
  repeatedWeaknesses: string[]
  answers: Array<{
    itemId: string
    topic: string
    subtopic?: string
    correct: boolean | null
    selectedIndex?: number
    correctIndex?: number
    seconds: number | null
  }>
}

export function sessionDetail(records: AttemptRecord[], sessionId: string): SessionDetail {
  const own = records.filter((record) => record.sessionId === sessionId)
  const scored = marked(own)
  const correct = scored.filter((record) => record.correct).length
  const topics = byTopic(own)
  const timed = own.filter((record) => typeof record.seconds === 'number' && record.seconds >= 0)
  const recordedDuration = own.reduce((longest, record) => Math.max(longest, record.sessionDurationSeconds ?? 0), 0)
  const summedDuration = timed.reduce((sum, record) => sum + (record.seconds ?? 0), 0)
  const durationSeconds = recordedDuration || summedDuration
  const ownMissedTopics = new Set(own.filter((record) => record.correct === false).map((record) => record.topic))
  const earlierWrongByTopic = new Map<string, number>()
  for (const record of records) {
    if (record.sessionId === sessionId || record.correct !== false) continue
    earlierWrongByTopic.set(record.topic, (earlierWrongByTopic.get(record.topic) ?? 0) + 1)
  }
  const pace: Record<PaceBand, number> = { good: 0, target: 0, slower: 0, overtime: 0 }
  for (const record of timed) pace[paceBand(record.seconds!)] += 1
  return {
    sessionId,
    answered: own.length,
    marked: scored.length,
    correct,
    wrong: scored.length - correct,
    unmarked: own.length - scored.length,
    accuracy: scored.length ? correct / scored.length : null,
    durationSeconds,
    seconds: durationSeconds,
    overtimeSeconds: own.reduce((longest, record) => Math.max(longest, record.sessionOvertimeSeconds ?? 0), 0),
    averageSeconds: timed.length ? Math.round(summedDuration / timed.length) : null,
    medianSeconds: medianSeconds(own),
    pace,
    subjects: bySubject(own),
    topics,
    subtopics: bySubtopic(own),
    missed: topics
      .filter((topic) => topic.marked > topic.correct)
      .sort((a, b) => (b.marked - b.correct) - (a.marked - a.correct)),
    weakestTopic: weakest(topics, 2, 1)[0] ?? null,
    repeatedWeaknesses: [...ownMissedTopics]
      .filter((topic) => (earlierWrongByTopic.get(topic) ?? 0) >= 2)
      .sort((a, b) => (earlierWrongByTopic.get(b) ?? 0) - (earlierWrongByTopic.get(a) ?? 0)),
    answers: own.map((record) => ({
      itemId: record.itemId,
      topic: record.topic,
      ...(record.subtopic ? { subtopic: record.subtopic } : {}),
      correct: record.correct,
      ...(typeof record.selectedIndex === 'number' ? { selectedIndex: record.selectedIndex } : {}),
      ...(typeof record.correctIndex === 'number' ? { correctIndex: record.correctIndex } : {}),
      seconds: record.seconds,
    })),
  }
}

/**
 * Group the attempt log into sittings.
 *
 * Every record already carries the `sessionId` of the sitting that produced it,
 * and nothing ever read it back — so a student could not see the tests they had
 * taken. Newest first, because that is the one anyone wants.
 */
export function bySession(records: AttemptRecord[]): SessionSummary[] {
  const groups = new Map<string, AttemptRecord[]>()
  for (const record of records) {
    if (!record.sessionId) continue
    const existing = groups.get(record.sessionId)
    if (existing) existing.push(record)
    else groups.set(record.sessionId, [record])
  }

  const summaries: SessionSummary[] = []
  for (const [sessionId, group] of groups) {
    const times = group.map((record) => record.at).sort()
    const scored = group.filter((record) => record.correct != null)
    const correct = scored.filter((record) => record.correct).length
    const bySubject = new Map<string, number>()
    for (const record of group) bySubject.set(record.subjectId, (bySubject.get(record.subjectId) ?? 0) + 1)
    summaries.push({
      sessionId,
      startedAt: times[0],
      endedAt: times[times.length - 1],
      surface: group[0].surface,
      answered: group.length,
      marked: scored.length,
      correct,
      accuracy: scored.length ? correct / scored.length : null,
      subjectIds: [...bySubject.entries()].sort((a, b) => b[1] - a[1]).map(([id]) => id),
      seconds: group.reduce((longest, record) => Math.max(longest, record.sessionDurationSeconds ?? 0), 0)
        || group.reduce((sum, record) => sum + (record.seconds ?? 0), 0),
    })
  }
  return summaries.sort((a, b) => b.startedAt.localeCompare(a.startedAt))
}
