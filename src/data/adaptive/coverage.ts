/**
 * How much of the blueprint has actually been practised, and what is owed.
 *
 * Coverage is measured in blueprint weight, not in questions answered. A student
 * who has answered two hundred questions on one topic has covered that topic's
 * weight and nothing else, and a count would flatter them into thinking
 * otherwise.
 *
 * Debt is what makes the coverage share survive a short block. A 20-item block
 * cannot represent every percentage exactly, so the shortfall is carried forward
 * and repaid across the rolling window rather than rounded away each time.
 */

import type { BlueprintNode } from './blueprint.ts'
import type { AdaptiveConfig } from './config.ts'

/** Dotted, so `isUserOwnedState` routes it to the student's own record. */
export const COVERAGE_DEBT_STORAGE_KEY = 'nishany.progress.adaptive.coverageDebt.v1'

export interface ConceptCoverage {
  conceptId: string
  groupId: string
  groupLabel: string
  /** Share of the blueprint this concept carries. */
  weight: number
  /** Distinct questions answered on it. */
  items: number
  /** True once it has any evidence at all. */
  touched: boolean
}

export interface CoverageState {
  /** Blueprint weight with at least one piece of evidence behind it, 0–1. */
  coveredWeight: number
  /** Blueprint weight never practised, 0–1. */
  uncoveredWeight: number
  /** Concepts on the blueprint that have no evidence. */
  uncoveredConcepts: ConceptCoverage[]
  /** Per group, for the bars both portals render. */
  groups: Array<{ groupId: string; groupLabel: string; weight: number; coveredWeight: number; uncovered: number }>
  /** Every concept, so a table can show the whole blueprint. */
  concepts: ConceptCoverage[]
}

/**
 * Coverage as it stands.
 *
 * `distinctItemsByConcept` comes from the evidence ledger. A concept counts as
 * covered on its first piece of evidence — covered means "practised at all", not
 * "mastered". Mastery is a separate measurement and conflating them would let a
 * single wrong answer report an area as done.
 */
export function coverageState(
  nodes: BlueprintNode[],
  distinctItemsByConcept: Map<string, number>,
): CoverageState {
  const concepts: ConceptCoverage[] = nodes.map((node) => {
    const items = distinctItemsByConcept.get(node.conceptId) ?? 0
    return {
      conceptId: node.conceptId,
      groupId: node.groupId,
      groupLabel: node.groupLabel,
      weight: node.weight,
      items,
      touched: items > 0,
    }
  })

  const coveredWeight = concepts.reduce((sum, entry) => sum + (entry.touched ? entry.weight : 0), 0)

  const groupMap = new Map<string, { groupId: string; groupLabel: string; weight: number; coveredWeight: number; uncovered: number }>()
  for (const entry of concepts) {
    const current = groupMap.get(entry.groupId) ?? {
      groupId: entry.groupId, groupLabel: entry.groupLabel, weight: 0, coveredWeight: 0, uncovered: 0,
    }
    current.weight += entry.weight
    if (entry.touched) current.coveredWeight += entry.weight
    else current.uncovered += 1
    groupMap.set(entry.groupId, current)
  }

  return {
    coveredWeight,
    uncoveredWeight: Math.max(0, 1 - coveredWeight),
    uncoveredConcepts: concepts.filter((entry) => !entry.touched).sort((a, b) => b.weight - a.weight),
    groups: [...groupMap.values()].sort((a, b) => b.weight - a.weight),
    concepts,
  }
}

/**
 * Slots owed to coverage from previous blocks.
 *
 * Positive means the last blocks under-served coverage and this one should serve
 * more. Clamped so a long absence cannot produce a block that is nothing but
 * coverage — repaying every owed slot at once is how an adaptive session turns
 * into a syllabus march and a student stops opening it.
 */
export interface CoverageDebt {
  /** Fractional slots owed, carried across blocks. */
  slots: number
  /** Blocks the debt has accumulated over, for the rolling window. */
  blocks: number
  updatedAt: string | null
}

export const EMPTY_COVERAGE_DEBT: CoverageDebt = { slots: 0, blocks: 0, updatedAt: null }

/**
 * The most a single block will repay, so no one block becomes all coverage.
 *
 * Spread over the rolling window: a debt of six slots against a four-block
 * window is repaid a slot or two at a time, which is the difference between
 * adaptive study and a syllabus march.
 */
export function maxDebtRepayment(blockSize: number, config: AdaptiveConfig): number {
  const window = Math.max(1, config.constraints.rollingDebtWindowBlocks)
  return Math.max(1, Math.round(blockSize / window))
}

/**
 * Fold a finished block into the debt.
 *
 * `targeted` is what the allocation asked for; `served` is what the builder
 * actually managed. The difference is the debt — which is why a pool shortage
 * that forces a block off-target is repaid later rather than forgotten.
 */
export function debtAfterBlock(
  debt: CoverageDebt,
  targeted: number,
  served: number,
  config: AdaptiveConfig,
  at = new Date().toISOString(),
): CoverageDebt {
  const blocks = Math.min(debt.blocks + 1, config.constraints.rollingDebtWindowBlocks)
  const outstanding = debt.slots + (targeted - served)
  // The window is what stops an old shortfall haunting a student forever: debt
  // decays toward zero as blocks pass, so a bad week does not distort a month.
  const decayed = outstanding * (1 - 1 / Math.max(1, config.constraints.rollingDebtWindowBlocks))
  return {
    slots: Math.max(0, Math.min(decayed, config.constraints.maxBlockSize)),
    blocks,
    updatedAt: at,
  }
}

/**
 * How much a question would contribute to closing coverage.
 *
 * Highest for a concept with real blueprint weight and no evidence at all; zero
 * for one already covered. Used as the `exam_blueprint_deficit` term, so a
 * question that reaches an untouched, heavily-weighted area outranks one that
 * revisits ground already walked.
 */
export function blueprintDeficit(
  conceptIds: string[],
  weights: Map<string, number>,
  distinctItemsByConcept: Map<string, number>,
): number {
  let best = 0
  for (const conceptId of conceptIds) {
    const weight = weights.get(conceptId)
    if (weight === undefined) continue
    const items = distinctItemsByConcept.get(conceptId) ?? 0
    // Falls off quickly: the second question on a concept closes far less
    // coverage than the first, and the tenth closes none worth naming.
    const deficit = weight * (1 / (1 + items))
    if (deficit > best) best = deficit
  }
  // Scaled against the largest single-concept weight so the term stays 0–1
  // whatever the blueprint's size. A 400-concept blueprint would otherwise emit
  // deficits near zero and the term would silently stop mattering. Reduced
  // rather than spread: a blueprint can hold thousands of concepts, and
  // `Math.max(...values)` overflows the argument limit long before that.
  let maxWeight = 0
  for (const weight of weights.values()) if (weight > maxWeight) maxWeight = weight
  return maxWeight > 0 ? Math.min(1, best / maxWeight) : 0
}

/**
 * Breadth not already explained by the concept itself.
 *
 * The specification is explicit that parent and child weakness must not both be
 * charged. Concept weakness is scored directly from the concept's own state;
 * this term only reports how much of the *rest* of the group is untouched, so a
 * weak concept in a well-covered topic does not collect a second penalty for
 * the topic it happens to sit in.
 */
export function groupGap(
  conceptIds: string[],
  nodeByConcept: Map<string, BlueprintNode>,
  coverage: CoverageState,
): number {
  const groups = new Map(coverage.groups.map((group) => [group.groupId, group]))
  const touched = new Set(coverage.concepts.filter((entry) => entry.touched).map((entry) => entry.conceptId))
  let worst = 0
  for (const conceptId of conceptIds) {
    const node = nodeByConcept.get(conceptId)
    if (!node) continue
    const group = groups.get(node.groupId)
    if (!group || group.weight <= 0) continue
    // Remove this concept's own weight from both sides, so what is left is
    // genuinely the breadth around it rather than the concept counted twice.
    const siblingWeight = group.weight - node.weight
    if (siblingWeight <= 0) continue
    const siblingCovered = group.coveredWeight - (touched.has(conceptId) ? node.weight : 0)
    const gap = Math.max(0, (siblingWeight - siblingCovered) / siblingWeight)
    if (gap > worst) worst = gap
  }
  return Math.min(1, worst)
}
