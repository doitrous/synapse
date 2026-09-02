import type { AttemptRecord } from './attempts.ts'
import { localDay } from './attemptStats.ts'
import { coveredCount } from './essay.ts'
import type { EssayMarking } from './essayCollections.ts'
import { missedPracticalIds, type PracticalCatalogueEntry } from './practicalCollections.ts'
import type { PracticalProgress } from './practicalProgress.ts'

/**
 * The student's own standing, in whichever bank they are looking at.
 *
 * The "Your progress" panel was built out of the MCQ attempt log alone, so a
 * student who had spent a fortnight on stations and written papers saw a panel
 * that said they had done nothing. The other two banks are not marked the way
 * MCQs are, though, so this cannot be one query over one log — each kind is
 * reduced here to the smallest thing every figure in the panel actually needs,
 * and every figure is then computed over that one shape.
 *
 * The reduction is `BankEvent`: one piece of work, on one item, on one day,
 * carrying however many marked units it was worth and how many of those went
 * the student's way. Everything below — the ring, the accuracy, this week, the
 * streak, the seven bars, the per-subject rows — is a fold over a list of them,
 * so the four filters cannot drift apart.
 *
 * What "marked units" means per kind, and why:
 *
 * - **MCQ** — one unit per answer, because every MCQ is marked against a key.
 *   Sources are unchanged from the panel this replaces: records on the `qbank`
 *   and `room` surfaces, accuracy over every marked answer.
 * - **Practical** — one unit per item the student has worked on, right when
 *   the item is *not* in `missedPracticalIds`. Nothing in the practical bank
 *   is marked against a key, so "passed" is the WP10 missed rule read the
 *   other way round; see `practicalCollections.ts` for what it asks of each
 *   format.
 * - **Essay** — one unit per key point in an essay the student has marked, and
 *   right for each one they ticked. An essay is scored by how much of the
 *   answer was there, which is a fraction of its key points, not a verdict.
 *
 * `all` is the union of the three, so its accuracy is the weighted mean the
 * union implies: every marked unit counts once, whatever produced it.
 */

/** Which bank the panel is reporting on. `all` is the union of the other three. */
export type BankKind = 'all' | 'mcq' | 'practical' | 'essay'

/** The four filters, in the order they are offered. */
export const BANK_KINDS: readonly BankKind[] = ['all', 'mcq', 'practical', 'essay']

/** The three kinds that actually produce work. `all` is a view over them. */
export type WorkKind = Exclude<BankKind, 'all'>

/** MCQ records only reach these figures from the two surfaces that key them. */
const MCQ_SURFACES = new Set(['qbank', 'room'])

/** What this needs out of the MCQ bank. */
export interface McqStatsSource {
  /** The whole attempt log; the qbank/room filter is applied here. */
  records: AttemptRecord[]
  /** How many questions are published to this student. */
  total: number
}

/** A practical item, with the system it belongs to. */
export interface PracticalStatsEntry extends PracticalCatalogueEntry {
  subjectId: string
}

/** What this needs out of the practical bank. */
export interface PracticalStatsSource {
  progress: PracticalProgress
  catalogue: PracticalStatsEntry[]
  /** The attempt log, so the missed rule can see wrong decisions and lab answers. */
  records?: AttemptRecord[]
}

/** An essay, with the system it belongs to and the points it is marked against. */
export interface EssayStatsItem {
  id: string
  subjectId: string
  keyPoints: { id: string }[]
}

/** What this needs out of the essay bank. */
export interface EssayStatsSource {
  answers: Record<string, EssayMarking>
  essays: EssayStatsItem[]
}

export interface BankSources {
  mcq: McqStatsSource
  practical: PracticalStatsSource
  essay: EssayStatsSource
}

/**
 * One piece of work, reduced to what every figure in the panel needs.
 *
 * `marked` is how many units were marked, not whether it was: an MCQ answer
 * nobody keyed is a real event with nothing to score, and it must still show
 * on the day it happened without dragging an accuracy anywhere.
 */
export interface BankEvent {
  kind: WorkKind
  /** Unique across kinds, so `all` can count distinct items without collisions. */
  itemKey: string
  subjectId: string
  /** ISO timestamp; the local calendar day of it is what the charts bucket by. */
  at: string
  /** Marked units this event was worth. Zero when nothing was marked. */
  marked: number
  /** How many of those went right. Never greater than `marked`. */
  correct: number
}

function mcqEvents(source: McqStatsSource): BankEvent[] {
  const out: BankEvent[] = []
  for (const record of source.records) {
    if (!MCQ_SURFACES.has(record.surface)) continue
    out.push({
      kind: 'mcq',
      // The surface is part of the key exactly as `distinctItems` keys it: the
      // same question sat in a room and in the bank is two pieces of work.
      itemKey: `mcq:${record.surface}:${record.itemId}`,
      subjectId: record.subjectId,
      at: record.at,
      marked: record.correct === null ? 0 : 1,
      correct: record.correct === true ? 1 : 0,
    })
  }
  return out
}

/**
 * When one practical item was last worked on, or null if it never was.
 *
 * The progress store keeps a single `lastAt` per item rather than a log, so an
 * item worked on twice counts on the later day only. That is the whole of what
 * the store records; see the report for what it costs.
 */
function practicalAt(progress: PracticalProgress, entry: PracticalStatsEntry): string | null {
  if (entry.kind === 'osce') {
    const station = progress.stations?.[entry.id]
    // No mark total is nothing to be a share of, so there is no result to report.
    return station && station.outOf > 0 ? station.lastAt : null
  }
  if (entry.kind === 'case') return progress.cases?.[entry.id]?.lastAt ?? null
  const set = progress.labs?.[entry.id]
  return set && set.done > 0 ? set.lastAt : null
}

function practicalEvents(source: PracticalStatsSource): BankEvent[] {
  const missed = new Set(missedPracticalIds(source.progress, source.catalogue, source.records ?? []))
  const out: BankEvent[] = []
  for (const entry of source.catalogue) {
    const at = practicalAt(source.progress, entry)
    if (!at) continue
    out.push({
      kind: 'practical',
      itemKey: `practical:${entry.id}`,
      subjectId: entry.subjectId,
      at,
      marked: 1,
      correct: missed.has(entry.id) ? 0 : 1,
    })
  }
  return out
}

function essayEvents(source: EssayStatsSource): BankEvent[] {
  const out: BankEvent[] = []
  for (const essay of source.essays) {
    const answer = source.answers[essay.id]
    if (!answer) continue
    const covered = coveredCount(answer.ticked ?? null, essay.keyPoints.map((point) => point.id))
    out.push({
      kind: 'essay',
      itemKey: `essay:${essay.id}`,
      subjectId: essay.subjectId,
      at: answer.updatedAt ?? '',
      // `covered` is null for an answer written but not yet marked. That is
      // still work done on a day; it is simply not a score of nought.
      marked: covered?.total ?? 0,
      correct: covered?.covered ?? 0,
    })
  }
  return out
}

/** Every piece of work in one bank, unordered. */
export function bankEvents(kind: BankKind, sources: BankSources): BankEvent[] {
  if (kind === 'mcq') return mcqEvents(sources.mcq)
  if (kind === 'practical') return practicalEvents(sources.practical)
  if (kind === 'essay') return essayEvents(sources.essay)
  return [...mcqEvents(sources.mcq), ...practicalEvents(sources.practical), ...essayEvents(sources.essay)]
}

/** How many items the bank holds, which is the denominator of the ring. */
export function bankTotal(kind: BankKind, sources: BankSources): number {
  if (kind === 'mcq') return sources.mcq.total
  if (kind === 'practical') return sources.practical.catalogue.length
  if (kind === 'essay') return sources.essay.essays.length
  return sources.mcq.total + sources.practical.catalogue.length + sources.essay.essays.length
}

export interface BankDay {
  /** Local calendar date, `YYYY-MM-DD`. */
  date: string
  /** Pieces of work on that day — answers, practical items, essays. */
  attempts: number
  marked: number
  correct: number
}

/**
 * One entry per day for the last `days` days, including the empty ones.
 *
 * Silent days are kept for the same reason `dailyCounts` keeps them: a bar
 * chart that skipped them would compress a fortnight of nothing into a solid
 * week of work.
 */
export function bankDailyCounts(
  kind: BankKind,
  sources: BankSources,
  days = 7,
  now = new Date(),
): BankDay[] {
  const counts = new Map<string, BankDay>()
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (days - 1))
  for (let offset = 0; offset < days; offset++) {
    const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + offset)
    const key = localDay(date)
    counts.set(key, { date: key, attempts: 0, marked: 0, correct: 0 })
  }
  for (const event of bankEvents(kind, sources)) {
    if (!event.at) continue
    const day = counts.get(localDay(event.at))
    if (!day) continue
    day.attempts += 1
    day.marked += event.marked
    day.correct += event.correct
  }
  return [...counts.values()]
}

export interface BankSubjectRow {
  subjectId: string
  /** Pieces of work in this system. */
  attempts: number
  /** Marked units: MCQ answers, practical items, essay key points. */
  marked: number
  correct: number
  /** Null when nothing in this system was marked. */
  accuracy: number | null
}

/**
 * How many marked units a system needs before its accuracy is worth showing.
 *
 * Three for MCQs, unchanged: one wrong answer is not a weakness, and ranking it
 * as one sends a student to revise a subject on a single unlucky item. One for
 * the other two, because a marked unit there is a whole station or a whole
 * written answer — waiting for three would keep the rows empty for weeks.
 */
export const SUBJECT_EVIDENCE: Record<BankKind, number> = {
  all: 1,
  mcq: 3,
  practical: 1,
  essay: 1,
}

/**
 * Accuracy per system, weakest first.
 *
 * Weakest first rather than busiest first: the list is read to decide what to
 * revise next, and the busiest subject is usually just the one with the most
 * questions published in it. Systems with nothing marked sort last — they are
 * not weak, they are unknown.
 */
export function bankAccuracyBySubject(kind: BankKind, sources: BankSources): BankSubjectRow[] {
  const rows = new Map<string, BankSubjectRow>()
  for (const event of bankEvents(kind, sources)) {
    const row = rows.get(event.subjectId) ?? { subjectId: event.subjectId, attempts: 0, marked: 0, correct: 0, accuracy: null }
    row.attempts += 1
    row.marked += event.marked
    row.correct += event.correct
    rows.set(event.subjectId, row)
  }
  const out = [...rows.values()]
  for (const row of out) row.accuracy = row.marked ? row.correct / row.marked : null
  return out.sort((a, b) => {
    if (a.accuracy === null && b.accuracy === null) return a.subjectId.localeCompare(b.subjectId)
    if (a.accuracy === null) return 1
    if (b.accuracy === null) return -1
    return (a.accuracy - b.accuracy) || (b.marked - a.marked) || a.subjectId.localeCompare(b.subjectId)
  })
}

/** The rows worth showing, weakest first — evidence floor applied per kind. */
export function weakestSubjects(kind: BankKind, sources: BankSources, limit = 6): BankSubjectRow[] {
  return bankAccuracyBySubject(kind, sources)
    .filter((row) => row.accuracy !== null && row.marked >= SUBJECT_EVIDENCE[kind])
    .slice(0, limit)
}

export interface BankSummary {
  /** Distinct items the student has worked on. */
  seen: number
  /** Items the bank holds. */
  total: number
  /** Across every marked unit, or null when nothing has been marked. */
  accuracy: number | null
  /** Pieces of work in the last seven days, today included. */
  thisWeek: number
  streakDays: number
}

/**
 * Consecutive days ending today, or ending yesterday.
 *
 * Same rule as `currentStreak`, over days rather than records: a streak that
 * broke the moment midnight passed would tell someone who worked every day for
 * a month that they were on zero before they had opened the app.
 */
function streakFromDays(days: Set<string>, now: Date): number {
  if (!days.size) return 0
  let cursor = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  if (!days.has(localDay(cursor))) {
    cursor = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() - 1)
    if (!days.has(localDay(cursor))) return 0
  }
  let streak = 0
  while (days.has(localDay(cursor))) {
    streak += 1
    cursor = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() - 1)
  }
  return streak
}

/** Every headline figure the panel shows, for one bank. */
export function bankSummary(kind: BankKind, sources: BankSources, now = new Date()): BankSummary {
  const events = bankEvents(kind, sources)
  const items = new Set<string>()
  const days = new Set<string>()
  let marked = 0
  let correct = 0
  for (const event of events) {
    items.add(event.itemKey)
    if (event.at) days.add(localDay(event.at))
    marked += event.marked
    correct += event.correct
  }
  const week = bankDailyCounts(kind, sources, 7, now)
  return {
    seen: items.size,
    total: bankTotal(kind, sources),
    accuracy: marked ? correct / marked : null,
    thisWeek: week.reduce((sum, day) => sum + day.attempts, 0),
    streakDays: streakFromDays(days, now),
  }
}
