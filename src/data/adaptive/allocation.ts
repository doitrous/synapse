/**
 * Turning shares into slots.
 *
 * 40% of a 22-item block is 8.8 items. Rounding each share independently either
 * loses a slot or invents one, and doing that every block is how a stated "35%
 * blueprint coverage" quietly becomes 30% over a term. Largest-remainder
 * apportionment distributes the slots exactly, and the leftover fractions are
 * carried in the coverage debt rather than discarded.
 *
 * These are allocation targets, not separate pools. A question that repairs a
 * weakness *and* closes blueprint coverage satisfies both needs and consumes one
 * slot; `creditNeeds` is what records that so the block's diagnostics do not
 * double-count it.
 */

import { ALLOCATION_NEEDS, type AdaptiveConfig, type AllocationNeed, type AllocationShares } from './config.ts'
import { maxDebtRepayment, type CoverageDebt } from './coverage.ts'

export type SlotTargets = Record<AllocationNeed, number>

export interface AllocationPlan {
  size: number
  shares: AllocationShares
  targets: SlotTargets
  /** Slots moved into coverage to repay debt from earlier blocks. */
  debtRepaid: number
  /** Fractional remainders per need, carried so short blocks stay honest. */
  remainders: Record<AllocationNeed, number>
}

/**
 * Largest-remainder apportionment.
 *
 * Every need gets its floor, then the slots left over go to whoever was closest
 * to earning another one. Ties break in a fixed need order rather than by
 * object-key iteration, so the same inputs always produce the same block —
 * which is what makes a stored seed enough to reproduce a session.
 */
export function apportion(size: number, shares: AllocationShares): { targets: SlotTargets; remainders: Record<AllocationNeed, number> } {
  const exact = ALLOCATION_NEEDS.map((need) => ({ need, value: size * shares[need] }))
  const targets = {} as SlotTargets
  const remainders = {} as Record<AllocationNeed, number>

  let assigned = 0
  for (const { need, value } of exact) {
    const floor = Math.floor(value)
    targets[need] = floor
    remainders[need] = value - floor
    assigned += floor
  }

  const spare = size - assigned
  const ranked = [...exact]
    .map(({ need }) => need)
    .sort((a, b) => (remainders[b] - remainders[a]) || ALLOCATION_NEEDS.indexOf(a) - ALLOCATION_NEEDS.indexOf(b))

  for (let i = 0; i < spare; i++) {
    const need = ranked[i % ranked.length]
    targets[need] += 1
    // The remainder has been spent — recording that keeps `remainders` a true
    // statement of what is still owed rather than what was owed before.
    remainders[need] = Math.max(0, remainders[need] - 1)
  }

  return { targets, remainders }
}

/**
 * The slot plan for one block.
 *
 * Coverage debt is repaid out of the needs that can most afford it — weakness
 * first, then uncertainty — and never out of spaced review, because a review
 * that slips is a review that decays. Repayment is capped so a large debt is
 * spread across the rolling window instead of eating one whole block.
 */
export function planAllocation(
  size: number,
  shares: AllocationShares,
  debt: CoverageDebt,
  config: AdaptiveConfig,
): AllocationPlan {
  const { targets, remainders } = apportion(size, shares)

  const owed = Math.min(Math.round(debt.slots), maxDebtRepayment(size, config))
  let repaid = 0
  // Weakness before uncertainty: a student with a real weakness is better served
  // by one fewer repair item than by one fewer exploratory item, because the
  // exploratory item is the only thing measuring concepts nothing has touched.
  for (const donor of ['weakness', 'uncertainty'] as const) {
    while (repaid < owed && targets[donor] > 0) {
      targets[donor] -= 1
      targets.coverage += 1
      repaid += 1
    }
  }

  return { size, shares, targets, debtRepaid: repaid, remainders }
}

/**
 * Which needs a question would satisfy.
 *
 * One question, several needs, one slot. The builder fills the most constrained
 * quota first and credits every need the chosen item happens to serve, so a
 * block's diagnostics report what it actually delivered rather than what its
 * slot was nominally labelled.
 */
export interface NeedSignals {
  repairsWeakness: boolean
  closesCoverage: boolean
  isDueReview: boolean
  reducesUncertainty: boolean
}

export function creditNeeds(signals: NeedSignals): AllocationNeed[] {
  const needs: AllocationNeed[] = []
  if (signals.repairsWeakness) needs.push('weakness')
  if (signals.closesCoverage) needs.push('coverage')
  if (signals.isDueReview) needs.push('review')
  if (signals.reducesUncertainty) needs.push('uncertainty')
  return needs
}

/** Remaining slots per need, given what has been filled so far. */
export function remainingTargets(targets: SlotTargets, filled: SlotTargets): SlotTargets {
  return ALLOCATION_NEEDS.reduce((out, need) => {
    out[need] = Math.max(0, targets[need] - filled[need])
    return out
  }, {} as SlotTargets)
}

export function emptyTargets(): SlotTargets {
  return ALLOCATION_NEEDS.reduce((out, need) => {
    out[need] = 0
    return out
  }, {} as SlotTargets)
}

/**
 * The need with the fewest eligible candidates per remaining slot.
 *
 * Filling the most constrained quota first is what stops the builder spending
 * its last slots on a need nothing can satisfy. A need with remaining slots but
 * no candidates returns `Infinity` scarcity and is reported as a shortage rather
 * than quietly skipped.
 */
export function mostConstrainedNeed(
  remaining: SlotTargets,
  candidateCounts: Record<AllocationNeed, number>,
): AllocationNeed | null {
  const open = ALLOCATION_NEEDS.filter((need) => remaining[need] > 0)
  if (!open.length) return null
  return open
    .map((need) => ({
      need,
      scarcity: candidateCounts[need] === 0 ? Infinity : candidateCounts[need] / remaining[need],
    }))
    .sort((a, b) => a.scarcity - b.scarcity || ALLOCATION_NEEDS.indexOf(a.need) - ALLOCATION_NEEDS.indexOf(b.need))[0].need
}

/** Clamp a requested block size into the configured range. */
export function clampBlockSize(size: number, config: AdaptiveConfig): number {
  const { minBlockSize, maxBlockSize } = config.constraints
  return Math.max(minBlockSize, Math.min(maxBlockSize, Math.round(size)))
}
