/**
 * What actually happened, concept by concept, kept forever.
 *
 * The distinction this file exists to protect: **evidence is immutable, mastery
 * is a rebuildable estimate**. Every mastery number anywhere in Adaptive Study
 * is derived by replaying these rows through a versioned model. Change the
 * model and the estimates change; the rows do not. That is what makes a
 * recomputation auditable instead of a quiet rewrite of history.
 *
 * One submitted response produces one event **per assessed concept**. That is
 * the mechanism behind the rule the whole product hangs on: three wrong answers
 * on one concept are three attempts and one weak concept, because they are three
 * events sharing a `conceptId` — not three concepts.
 *
 * Contextual concepts never appear here. `usePublishedQuestions` already drops
 * them, and recording one would tell a student to revise something no item
 * measured.
 */

/** Dotted, so `isUserOwnedState` routes these to the student's own record. */
export const ADAPTIVE_EVIDENCE_INDEX_KEY = 'nishany.progress.adaptive.evidenceIndex.v1'

export function adaptiveEvidenceMonthKey(month: string): string {
  return `nishany.progress.adaptive.evidence.${month}`
}

/**
 * How the student rated their own certainty before the answer was marked.
 *
 * `unstated` is not a middle value — it means the student was not asked, or
 * declined, and it must never be read as "normal confidence". Exam mode does not
 * interrupt to ask, so most exam-mode evidence is `unstated`.
 */
export type Confidence = 'sure' | 'unsure' | 'unstated'

/**
 * What became of the item.
 *
 * A blank and a timeout are deliberately not "wrong". A student who ran out of
 * time has demonstrated something about pacing, not about the concept, and
 * folding it into a wrong answer is how a mastery estimate quietly becomes a
 * measure of speed.
 */
export type AttemptOutcome = 'answered' | 'blank' | 'timeout'

/** Whether this student had already been shown the answer to this item. */
export type ExposureState = 'first' | 'repeat-after-reveal'

export type PresentationMode = 'tutor' | 'exam' | 'readiness'

/** Which concept role the item assigned — what it is *for* vs. what it also tests. */
export type ConceptRole = 'main' | 'secondary'

export interface AdaptiveEvidenceEvent {
  /** `<attemptId>:<conceptId>` — the idempotency key. */
  id: string
  /** ISO timestamp of when the answer was committed. */
  at: string
  /** Groups every event produced by one submitted response. */
  attemptId: string
  /** Groups the events made in one sitting. */
  blockId: string
  questionId: string
  /**
   * Which revision of the question was answered.
   *
   * A question edited after an answer was given is a different item. Without
   * this, replaying the ledger would credit a student with evidence about a stem
   * they never read.
   */
  questionVersion: string
  conceptId: string
  role: ConceptRole
  /** True only when marked against a key. Null for a blank or timeout. */
  correct: boolean | null
  outcome: AttemptOutcome
  confidence: Confidence
  /** Null when the item was untimed. */
  seconds: number | null
  /** Seconds the author expected this item to take, when they recorded one. */
  expectedSeconds: number | null
  mode: PresentationMode
  exposure: ExposureState
  /** The author's intended difficulty, carried so difficulty credit is replayable. */
  difficulty: string
  /** The distractor chosen, when it was a wrong answer with a mapped misconception. */
  misconceptionId?: string
  /** The config version in force when this was recorded, for audit. */
  configVersion: number
}

/**
 * One month of events.
 *
 * Sharded for the same reason `attempts.ts` is: `usePersistentState` rewrites a
 * whole document per change, and one flat log would re-upload a student's entire
 * history on every answer.
 */
export interface AdaptiveEvidenceMonth {
  version: 1
  month: string
  events: AdaptiveEvidenceEvent[]
}

export interface AdaptiveEvidenceIndex {
  version: 1
  months: string[]
  /** Events recorded in total — the honest denominator for "how much do we know". */
  events: number
  /** Distinct questions that have produced evidence. */
  questionIds: string[]
  lastAt: string | null
}

export const EMPTY_EVIDENCE_INDEX: AdaptiveEvidenceIndex = {
  version: 1, months: [], events: 0, questionIds: [], lastAt: null,
}

export function emptyEvidenceMonth(month: string): AdaptiveEvidenceMonth {
  return { version: 1, month, events: [] }
}

/** `YYYY-MM` — the shard a timestamp belongs to. */
export function evidenceMonth(at: string | Date): string {
  const date = typeof at === 'string' ? new Date(at) : at
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

export function evidenceId(attemptId: string, conceptId: string): string {
  return `${attemptId}:${conceptId}`
}

/**
 * Add an event, refusing an exact duplicate.
 *
 * The consumers that fold one response into mastery, boosts, reviews and
 * misconceptions are independent and retry-safe by design, so any of them may
 * run twice. The id is what makes a second run a no-op rather than a second
 * piece of evidence.
 */
export function appendEvidence(month: AdaptiveEvidenceMonth, event: AdaptiveEvidenceEvent): AdaptiveEvidenceMonth {
  if (month.events.some((existing) => existing.id === event.id)) return month
  return { ...month, events: [...month.events, event] }
}

export function indexEvidence(index: AdaptiveEvidenceIndex, event: AdaptiveEvidenceEvent): AdaptiveEvidenceIndex {
  const month = evidenceMonth(event.at)
  return {
    version: 1,
    months: index.months.includes(month) ? index.months : [...index.months, month].sort(),
    events: index.events + 1,
    questionIds: index.questionIds.includes(event.questionId)
      ? index.questionIds
      : [...index.questionIds, event.questionId],
    lastAt: !index.lastAt || event.at > index.lastAt ? event.at : index.lastAt,
  }
}

/** The last `count` months ending at `from`, oldest first. */
export function recentEvidenceMonths(count: number, from = new Date()): string[] {
  const months: string[] = []
  for (let back = count - 1; back >= 0; back--) {
    months.push(evidenceMonth(new Date(from.getFullYear(), from.getMonth() - back, 1)))
  }
  return months
}

/** Every event for one concept, oldest first — the input a mastery replay needs. */
export function eventsForConcept(events: AdaptiveEvidenceEvent[], conceptId: string): AdaptiveEvidenceEvent[] {
  return events
    .filter((event) => event.conceptId === conceptId)
    .sort((a, b) => a.at.localeCompare(b.at))
}

/** Group events by concept, each group sorted oldest first. */
export function groupByConcept(events: AdaptiveEvidenceEvent[]): Map<string, AdaptiveEvidenceEvent[]> {
  const grouped = new Map<string, AdaptiveEvidenceEvent[]>()
  for (const event of [...events].sort((a, b) => a.at.localeCompare(b.at))) {
    const bucket = grouped.get(event.conceptId)
    if (bucket) bucket.push(event)
    else grouped.set(event.conceptId, [event])
  }
  return grouped
}

/**
 * Raw wrong attempts — the number a student recognises from their own session.
 *
 * Deliberately separate from any count of weak concepts. Both numbers are shown,
 * and the rules surface explains why they differ, because a student who answered
 * three questions wrong and is told they have one weak concept will otherwise
 * assume the app has lost two of their mistakes.
 */
export function rawWrongAttempts(events: AdaptiveEvidenceEvent[]): number {
  return new Set(
    events.filter((event) => event.correct === false).map((event) => event.attemptId),
  ).size
}

/** Distinct questions that produced evidence for a concept. */
export function distinctQuestions(events: AdaptiveEvidenceEvent[]): number {
  return new Set(events.map((event) => event.questionId)).size
}
