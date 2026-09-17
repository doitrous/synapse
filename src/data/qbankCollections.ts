import { attemptOrder, type AttemptRecord } from './attempts.ts'
import type { Question } from './qbank.ts'
import type { LibTopic } from './library.ts'
import { subtopicKey, topicKey, type Scope } from './qbankScope.ts'

/**
 * The questions a student can come back to.
 *
 * Three collections, and the evidence behind each one lives somewhere
 * different. Flags are their own stored list. Wrong answers are a query over
 * the attempt log. Omissions are neither: the log only receives a question once
 * its answer is checked, so a skipped question writes nothing at all, and the
 * only way to know one was skipped is to know what the sitting contained.
 * `SessionManifests` is that record.
 *
 * Getting a question right takes it out of the wrong list, and answering one
 * takes it out of the omitted list. Both are working sets a student can empty.
 * A permanent record of every mistake would only ever grow, which is the
 * opposite of something to revise from.
 */

/** Which questions each finished sitting contained, in the order they were sat. */
export type SessionManifests = Record<string, string[]>

/**
 * How many sittings the manifest map keeps.
 *
 * `usePersistentState` rewrites a whole document on every change, so this map
 * has to be bounded. It is written only when a sitting begins or a test is
 * deleted — never per answer — so the bound is set high enough that no real
 * student reaches it rather than low enough to keep the document small.
 */
export const MAX_STORED_SITTINGS = 600

/** The surfaces whose records count as sitting a question from the bank. */
const QUESTION_SURFACES: ReadonlySet<string> = new Set(['qbank', 'room'])

/**
 * The most recent marked verdict per question.
 *
 * Unmarked records are skipped rather than treated as wrong: a station is
 * ticked by the student against a checklist, so it is evidence of practice and
 * says nothing about correctness.
 */
export function latestVerdicts(records: AttemptRecord[]): Map<string, boolean> {
  const latest = new Map<string, { order: number; correct: boolean }>()
  for (const entry of records) {
    if (!QUESTION_SURFACES.has(entry.surface) || entry.correct === null) continue
    const order = attemptOrder(entry)
    const seen = latest.get(entry.itemId)
    if (seen && seen.order >= order) continue
    latest.set(entry.itemId, { order, correct: entry.correct })
  }
  const out = new Map<string, boolean>()
  latest.forEach((entry, itemId) => out.set(itemId, entry.correct))
  return out
}

export function incorrectIds(records: AttemptRecord[]): Set<string> {
  const out = new Set<string>()
  latestVerdicts(records).forEach((correct, itemId) => {
    if (!correct) out.add(itemId)
  })
  return out
}

/**
 * Served by a sitting, and never answered anywhere since.
 *
 * Order does not come into it. A question the student has attempted at any
 * point is one they have engaged with, so it leaves the list whichever sitting
 * the attempt belongs to — which also means this needs no timestamp for the
 * sitting itself, and a manifest is enough.
 */
export function omittedIds(manifests: SessionManifests, records: AttemptRecord[]): Set<string> {
  const answered = new Set<string>()
  for (const entry of records) {
    if (!QUESTION_SURFACES.has(entry.surface)) continue
    answered.add(entry.itemId)
  }
  const out = new Set<string>()
  for (const questionIds of Object.values(manifests)) {
    for (const id of questionIds) {
      if (!answered.has(id)) out.add(id)
    }
  }
  return out
}

/** Every question id the student has attempted on a question surface, ever. */
export function attemptedIds(records: AttemptRecord[]): Set<string> {
  const out = new Set<string>()
  for (const entry of records) {
    if (!QUESTION_SURFACES.has(entry.surface)) continue
    out.add(entry.itemId)
  }
  return out
}

/** The published questions behind a set of ids, in pool order. */
export function questionsById(pool: Question[], ids: Set<string>): Question[] {
  return pool.filter((question) => ids.has(question.id))
}

/**
 * The scope a set of questions implies — the topics they came from, not the
 * questions themselves.
 *
 * `questionsInScope` matches either a subtopic id carried by a library
 * reference or a topic title, so both kinds of key are emitted. A question
 * naming a topic outside the tree it is given contributes nothing; callers pass
 * the merged `chooserTopics` tree, where every topic the bank names exists.
 */
export function scopeFromQuestions(questions: Question[], libraryTopics: LibTopic[]): Scope {
  const byTitle = new Map<string, string>()
  for (const topic of libraryTopics) byTitle.set(topic.title.trim().toLowerCase(), topic.id)

  const scope: Scope = new Set()
  for (const question of questions) {
    for (const ref of question.libraryRefs) scope.add(subtopicKey(ref.id))
    const topicId = byTitle.get((question.topic ?? '').trim().toLowerCase())
    if (topicId) scope.add(topicKey(topicId))
  }
  return scope
}

/**
 * Keep the newest `limit` sittings.
 *
 * Insertion order is the chronological order: sittings are added as they are
 * started, and a session id is never an integer-like key, so both the object
 * and its JSON round-trip preserve it. Returns the input untouched when it is
 * already within the limit, so a write is only made when one is needed.
 */
export function pruneManifests(
  manifests: SessionManifests,
  limit = MAX_STORED_SITTINGS,
): SessionManifests {
  const keys = Object.keys(manifests)
  if (keys.length <= limit) return manifests
  const out: SessionManifests = {}
  for (const key of keys.slice(keys.length - limit)) out[key] = manifests[key]
  return out
}
