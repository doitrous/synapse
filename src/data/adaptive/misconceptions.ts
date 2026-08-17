/**
 * Not knowing something, versus believing the wrong thing.
 *
 * These need different repairs. A student who does not know the answer needs
 * teaching; a student who confidently holds a specific wrong model needs that
 * model contradicted. Tracking them together produces the familiar failure where
 * more practice on a concept leaves the same wrong answer chosen every time,
 * because nothing ever addressed the belief behind it.
 *
 * A misconception is identified by the distractor chosen. Authors already write
 * a rationale per option explaining which misunderstanding picks it, so the
 * option index is a stable enough key without asking anyone to author a second
 * taxonomy.
 */

import type { AdaptiveEvidenceEvent } from './evidenceLedger.ts'
import type { AdaptiveConfig } from './config.ts'

/** A distractor on a specific question is one identifiable wrong belief. */
export function misconceptionId(questionId: string, optionIndex: number): string {
  return `${questionId}#${optionIndex}`
}

export interface MisconceptionRecord {
  id: string
  questionId: string
  optionIndex: number
  conceptIds: string[]
  /** Times this exact distractor has been chosen. */
  count: number
  /** Times it was chosen with stated confidence — the strongest evidence. */
  confidentCount: number
  firstAt: string
  lastAt: string
  /** The author's rationale for this option, which is what makes it teachable. */
  rationale: string
}

/**
 * Build the misconception record from the evidence ledger.
 *
 * Derived rather than stored, for the same reason mastery is: the ledger is the
 * only durable thing, and anything computed from it can be recomputed when the
 * rules change.
 */
export function misconceptionsFrom(
  events: AdaptiveEvidenceEvent[],
  rationaleFor: (questionId: string, optionIndex: number) => string,
): MisconceptionRecord[] {
  const records = new Map<string, MisconceptionRecord>()

  for (const event of events) {
    if (event.correct !== false || !event.misconceptionId) continue
    const [questionId, rawIndex] = event.misconceptionId.split('#')
    const optionIndex = Number(rawIndex)
    if (!questionId || Number.isNaN(optionIndex)) continue

    const existing = records.get(event.misconceptionId)
    if (existing) {
      // One response produces one event per concept, so the same misconception
      // arrives several times per answer. Counting each would multiply a single
      // wrong click by however many concepts the question happened to tag.
      if (!existing.conceptIds.includes(event.conceptId)) existing.conceptIds.push(event.conceptId)
      if (event.at > existing.lastAt) {
        existing.count += 1
        if (event.confidence === 'sure') existing.confidentCount += 1
        existing.lastAt = event.at
      }
      continue
    }

    records.set(event.misconceptionId, {
      id: event.misconceptionId,
      questionId,
      optionIndex,
      conceptIds: [event.conceptId],
      count: 1,
      confidentCount: event.confidence === 'sure' ? 1 : 0,
      firstAt: event.at,
      lastAt: event.at,
      rationale: rationaleFor(questionId, optionIndex),
    })
  }

  return [...records.values()].sort((a, b) => b.count - a.count || b.lastAt.localeCompare(a.lastAt))
}

/**
 * Misconceptions that have earned a targeted intervention.
 *
 * The threshold is repetition, not severity of tone. Choosing a distractor once
 * is ordinary; choosing the same one twice is a belief, and that is when it is
 * worth naming to the student and worth a short approved resource.
 */
export function escalatedMisconceptions(
  records: MisconceptionRecord[],
  config: AdaptiveConfig,
): MisconceptionRecord[] {
  const threshold = config.interventions.misconceptionEscalationCount
  return records.filter((record) => record.count >= threshold || record.confidentCount >= 1)
}

/** Misconception counts per concept, for the concept table. */
export function byConcept(records: MisconceptionRecord[]): Map<string, MisconceptionRecord[]> {
  const grouped = new Map<string, MisconceptionRecord[]>()
  for (const record of records) {
    for (const conceptId of record.conceptIds) {
      const bucket = grouped.get(conceptId)
      if (bucket) bucket.push(record)
      else grouped.set(conceptId, [record])
    }
  }
  return grouped
}

/**
 * Whether a question is a useful check on a known misconception.
 *
 * The same question is never it — re-serving the item whose distractor was
 * chosen tests memory of the correction. A useful check is a *different*
 * question on the same concept, which is exactly what a transfer check is.
 */
export function checksMisconception(
  question: { id: string; conceptIds?: string[] },
  record: MisconceptionRecord,
): boolean {
  if (question.id === record.questionId) return false
  return (question.conceptIds ?? []).some((conceptId) => record.conceptIds.includes(conceptId))
}
