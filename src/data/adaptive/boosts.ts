/**
 * What a wrong answer actually buys.
 *
 * A single error must not become a permanent label, and it must not be ignored
 * either. The answer is a **temporary, capped, expiring** nudge: the concept
 * becomes slightly likelier to be selected for the next few blocks, and — where
 * the error was repeated or confident — the system also owes the student a
 * transfer check on different material.
 *
 * The multiplier is deliberately small. A 5% nudge inside a 20-item block often
 * changes nothing, which is exactly why the transfer-check obligation exists
 * alongside it: the obligation is the guarantee, the multiplier is the
 * preference. Relying on the multiplier alone would let a confident error
 * disappear because the arithmetic happened not to reorder anything.
 */

import type { AdaptiveConfig } from './config.ts'

/** Dotted, so `isUserOwnedState` routes it to the student's own record. */
export const ADAPTIVE_BOOSTS_STORAGE_KEY = 'nishany.progress.adaptive.boosts.v1'

export interface ConceptBoost {
  conceptId: string
  /** Stacked multiplier, always at or below `stackedMultiplierCap`. */
  multiplier: number
  /** Blocks this survives. Decremented only when a block could have used it. */
  remainingEligibleBlocks: number
  /**
   * ISO timestamp before which the concept should not be re-asked.
   *
   * Re-asking a concept in the same sitting tests recall of the explanation just
   * read, not knowledge. This is the spacing that makes the repair mean something.
   */
  notBefore: string
  /** Questions already used to repair this concept, so a repeat is never reused. */
  repairQuestionIds: string[]
  /** Successful distinct repairs so far. */
  repairs: number
  /** How many of those were spaced rather than immediate. */
  spacedRepairs: number
  /** Blocks within which an owed transfer check must be served, or null when none is owed. */
  transferCheckWithinBlocks: number | null
  createdAt: string
  /** Why this exists, in the student's words. */
  reason: string
}

export type BoostLedger = Record<string, ConceptBoost>

const HOUR = 3_600_000

/**
 * Register a wrong answer against a concept.
 *
 * Stacking is capped, so a bad session cannot compound into a block that is
 * nothing but one concept. A repeated or high-confidence error additionally
 * creates the transfer-check obligation.
 */
export function recordError(
  ledger: BoostLedger,
  input: {
    conceptId: string
    questionId: string
    /** True when the student said they were sure — the strongest evidence. */
    highConfidence: boolean
    /** True when this concept has been missed before. */
    repeated: boolean
    at: string
  },
  config: AdaptiveConfig,
): BoostLedger {
  const { boostMultiplier, stackedMultiplierCap, remainingEligibleBlocks, transferCheckWithinBlocks, delayedTransferHours } = config.interventions
  const existing = ledger[input.conceptId]

  const stacked = Math.min(
    stackedMultiplierCap,
    (existing?.multiplier ?? 1) * boostMultiplier,
  )

  const owesTransferCheck = input.highConfidence || input.repeated
  const notBefore = new Date(new Date(input.at).getTime() + delayedTransferHours * HOUR).toISOString()

  return {
    ...ledger,
    [input.conceptId]: {
      conceptId: input.conceptId,
      multiplier: stacked,
      remainingEligibleBlocks,
      // A fresh error restarts the spacing: the point is distance from the
      // moment the answer was revealed, not from the first time it went wrong.
      notBefore,
      repairQuestionIds: [...new Set([...(existing?.repairQuestionIds ?? []), input.questionId])],
      repairs: existing?.repairs ?? 0,
      spacedRepairs: existing?.spacedRepairs ?? 0,
      transferCheckWithinBlocks: owesTransferCheck
        ? transferCheckWithinBlocks
        : existing?.transferCheckWithinBlocks ?? null,
      createdAt: existing?.createdAt ?? input.at,
      reason: input.highConfidence
        ? 'You were sure about an answer that turned out to be wrong, so this concept is worth checking properly.'
        : 'Included because this concept needs reinforcement.',
    },
  }
}

/**
 * Register a successful repair.
 *
 * The boost is cancelled only after the configured number of *distinct* repair
 * questions, including at least one spaced success. Re-answering the same
 * question correctly proves the explanation was read, not that the concept was
 * learnt, so it does not count.
 */
export function recordRepair(
  ledger: BoostLedger,
  input: { conceptId: string; questionId: string; at: string },
  config: AdaptiveConfig,
): BoostLedger {
  const boost = ledger[input.conceptId]
  if (!boost) return ledger

  const alreadyUsed = boost.repairQuestionIds.includes(input.questionId)
  const spaced = new Date(input.at).getTime() >= new Date(boost.notBefore).getTime()

  const repairs = alreadyUsed ? boost.repairs : boost.repairs + 1
  const spacedRepairs = !alreadyUsed && spaced ? boost.spacedRepairs + 1 : boost.spacedRepairs

  const resolved =
    repairs >= config.interventions.repairsToCancelBoost &&
    spacedRepairs >= config.interventions.spacedRepairsRequired

  if (resolved) {
    const next = { ...ledger }
    delete next[input.conceptId]
    return next
  }

  return {
    ...ledger,
    [input.conceptId]: {
      ...boost,
      repairs,
      spacedRepairs,
      repairQuestionIds: [...new Set([...boost.repairQuestionIds, input.questionId])],
    },
  }
}

/**
 * Age every boost by one block.
 *
 * `eligibleConceptIds` is the crucial argument: a boost is only spent when a
 * block could genuinely have served it. Decrementing on every block regardless
 * would expire a boost for a concept the student's chosen scope never included,
 * which is the same as forgetting the error.
 */
export function ageBoosts(ledger: BoostLedger, eligibleConceptIds: Set<string>): BoostLedger {
  const next: BoostLedger = {}
  for (const [conceptId, boost] of Object.entries(ledger)) {
    if (!eligibleConceptIds.has(conceptId)) {
      next[conceptId] = boost
      continue
    }
    const remaining = boost.remainingEligibleBlocks - 1
    const owed = boost.transferCheckWithinBlocks === null ? null : boost.transferCheckWithinBlocks - 1
    if (remaining <= 0 && (owed === null || owed <= 0)) continue
    next[conceptId] = {
      ...boost,
      remainingEligibleBlocks: Math.max(0, remaining),
      transferCheckWithinBlocks: owed === null ? null : Math.max(0, owed),
    }
  }
  return next
}

/**
 * The multiplier to apply when scoring a question for this student, now.
 *
 * Returns 1 — no effect — when the concept is still inside its spacing window.
 * A boost that fires immediately would put the concept back in front of the
 * student in the same session, which is the opposite of what spacing is for.
 */
export function multiplierFor(ledger: BoostLedger, conceptIds: string[], now = new Date()): number {
  let multiplier = 1
  for (const conceptId of conceptIds) {
    const boost = ledger[conceptId]
    if (!boost || boost.remainingEligibleBlocks <= 0) continue
    if (now.getTime() < new Date(boost.notBefore).getTime()) continue
    multiplier = Math.max(multiplier, boost.multiplier)
  }
  return multiplier
}

/** Concepts owed a transfer check, most overdue first. */
export function owedTransferChecks(ledger: BoostLedger): ConceptBoost[] {
  return Object.values(ledger)
    .filter((boost) => boost.transferCheckWithinBlocks !== null)
    .sort((a, b) => (a.transferCheckWithinBlocks ?? 0) - (b.transferCheckWithinBlocks ?? 0))
}

/** Questions already used to repair a concept — never offered as its repair again. */
export function usedRepairQuestions(ledger: BoostLedger, conceptIds: string[]): Set<string> {
  const used = new Set<string>()
  for (const conceptId of conceptIds) {
    for (const questionId of ledger[conceptId]?.repairQuestionIds ?? []) used.add(questionId)
  }
  return used
}
