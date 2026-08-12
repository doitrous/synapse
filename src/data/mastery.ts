/**
 * What a student has actually demonstrated, concept by concept.
 *
 * Authoring already draws the distinction this file depends on: a question's
 * `mainConceptIds` and `conceptIds` are what it assesses, while
 * `contextualConceptIds` are merely mentioned. Only the first two reach this
 * ledger. Recording a contextual concept would tell a student to revise
 * something no item ever measured, which is the most damaging error the
 * authoring contract names.
 */

export const MASTERY_STORAGE_KEY = 'synapse-concept-mastery-v1'

/** Which surface produced a piece of evidence. */
export type MasterySource = 'question' | 'case' | 'interpretation' | 'station'

/**
 * Sources whose answers are marked against a key.
 *
 * A station or checklist is ticked by the student, so it says the concept was
 * practised and nothing about whether it was understood. Keeping those two
 * kinds of evidence apart is what stops a self-scored checklist inflating an
 * accuracy figure.
 */
const MARKED_SOURCES: readonly MasterySource[] = ['question', 'case', 'interpretation']

export function isMarkedSource(source: MasterySource): boolean {
  return MARKED_SOURCES.includes(source)
}

export interface ConceptMastery {
  conceptId: string
  /** Answers marked against a key. */
  attempts: number
  /** How many of those were right. */
  correct: number
  /** Self-scored encounters — stations and checklists. No accuracy is claimed. */
  encounters: number
  /** ISO timestamp of the most recent evidence of any kind. */
  lastSeen: string
}

export type MasteryLedger = Record<string, ConceptMastery>

export interface EvidenceInput {
  /** Concepts the item assesses. Contextual concepts must not appear here. */
  conceptIds: string[]
  source: MasterySource
  /** Ignored for self-scored sources, which make no accuracy claim. */
  correct?: boolean
  /** ISO timestamp. Passed in rather than read from the clock so this stays pure. */
  at: string
}

function blank(conceptId: string, at: string): ConceptMastery {
  return { conceptId, attempts: 0, correct: 0, encounters: 0, lastSeen: at }
}

/**
 * Fold one item's result into the ledger, returning a new one.
 *
 * Concepts are deduplicated: an item that names the same concept as both its
 * main and a secondary concept is still one piece of evidence, not two.
 */
export function recordEvidence(ledger: MasteryLedger, input: EvidenceInput): MasteryLedger {
  const ids = [...new Set(input.conceptIds.map((id) => id.trim()).filter(Boolean))]
  if (!ids.length) return ledger
  const next = { ...ledger }
  for (const conceptId of ids) {
    const current = next[conceptId] ?? blank(conceptId, input.at)
    next[conceptId] = isMarkedSource(input.source)
      ? {
          ...current,
          attempts: current.attempts + 1,
          correct: current.correct + (input.correct ? 1 : 0),
          lastSeen: input.at,
        }
      : { ...current, encounters: current.encounters + 1, lastSeen: input.at }
  }
  return next
}

/** Accuracy on marked answers, or null when nothing has been marked yet. */
export function accuracy(entry: ConceptMastery): number | null {
  return entry.attempts ? entry.correct / entry.attempts : null
}

/**
 * How confident the ledger is about a concept.
 *
 * `practised` is deliberately separate from the accuracy bands: it is what a
 * student has done on a station or checklist, where nobody marked the work.
 * One right answer is not mastery either, so a single attempt cannot reach
 * `secure`.
 */
export type MasteryBand = 'unseen' | 'practised' | 'shaky' | 'developing' | 'secure'

/** Marked answers needed before accuracy is called anything but provisional. */
export const CONFIDENT_ATTEMPTS = 3

export function masteryBand(entry: ConceptMastery | undefined): MasteryBand {
  if (!entry) return 'unseen'
  if (!entry.attempts) return entry.encounters ? 'practised' : 'unseen'
  const rate = entry.correct / entry.attempts
  if (rate < 0.5) return 'shaky'
  if (rate < 0.8 || entry.attempts < CONFIDENT_ATTEMPTS) return 'developing'
  return 'secure'
}

export interface MasterySummary {
  /** Concepts with at least one marked answer. */
  measured: number
  /** Concepts seen only on a station or checklist, so never marked. */
  practisedOnly: number
  attempts: number
  correct: number
  /** Overall accuracy across marked answers, or null when there are none. */
  accuracy: number | null
}

export function summarise(ledger: MasteryLedger): MasterySummary {
  const entries = Object.values(ledger)
  const attempts = entries.reduce((sum, entry) => sum + entry.attempts, 0)
  const correct = entries.reduce((sum, entry) => sum + entry.correct, 0)
  return {
    measured: entries.filter((entry) => entry.attempts > 0).length,
    practisedOnly: entries.filter((entry) => !entry.attempts && entry.encounters > 0).length,
    attempts,
    correct,
    accuracy: attempts ? correct / attempts : null,
  }
}

/**
 * The concepts most worth revising, weakest first.
 *
 * Only concepts with a marked answer are eligible: a concept met once on a
 * checklist has no accuracy to be weak on, and ranking it as a weakness would
 * be inventing a measurement.
 */
export function weakest(ledger: MasteryLedger, limit = 5): ConceptMastery[] {
  return Object.values(ledger)
    .filter((entry) => entry.attempts > 0)
    .sort((a, b) => {
      const byRate = (a.correct / a.attempts) - (b.correct / b.attempts)
      // A tie on accuracy is broken by evidence: more attempts is the surer call.
      return byRate !== 0 ? byRate : b.attempts - a.attempts
    })
    .slice(0, limit)
}
