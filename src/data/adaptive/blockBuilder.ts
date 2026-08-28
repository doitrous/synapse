/**
 * Assembling one block.
 *
 * A constrained greedy builder with limited backtracking, seeded so the same
 * inputs always produce the same block. Integer programming and shadow-tested
 * optimisation stay on the shelf until an offline comparison shows they beat
 * this — a builder nobody can explain is not an improvement on one that can be
 * read in an afternoon.
 *
 * The order of operations is the safety property, and it never changes:
 *
 *   1. hard gates       — scope, approval, held-out, exposure. Not negotiable.
 *   2. score            — only ever applied to items that already passed (1).
 *   3. fill             — most constrained quota first, seeded tie-breaks.
 *   4. relax            — in a documented order, recorded, never silent.
 *
 * A high score can never admit an item that failed step 1. When the pool cannot
 * satisfy the constraints, the builder relaxes them in a published order and
 * emits a shortage event. It never quietly fills the gap with whatever topic
 * happens to have the most questions — a block that looks complete but is
 * secretly 60% cardiology is worse than a short block that says so.
 */

import type { AdaptiveConfig, AllocationNeed, RelaxableConstraint } from './config.ts'
import { ALLOCATION_NEEDS } from './config.ts'
import type { AdaptiveItem } from './item.ts'
import { itemInScope, primaryConcepts } from './item.ts'
import type { PriorityScore, ScoringContext } from './priority.ts'
import { needSignals, scoreItem } from './priority.ts'
import type { SlotTargets } from './allocation.ts'
import { creditNeeds, emptyTargets, mostConstrainedNeed } from './allocation.ts'
import type { PresentationMode } from './evidenceLedger.ts'

/**
 * A small, fast, seeded PRNG.
 *
 * Determinism is a product requirement, not a convenience: a stored seed is what
 * lets a support conversation reproduce the exact block a student is looking at.
 * `Math.random` would make every block unreproducible the moment it closed.
 */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** A deterministic seed from a string, so a block id alone reproduces a block. */
export function seedFrom(text: string): number {
  let hash = 0x811c9dc5
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193)
  }
  return hash >>> 0
}

export interface BlockSlot {
  index: number
  item: AdaptiveItem
  /** The quota this slot was filled against. */
  filledFor: AllocationNeed
  /** Every need the chosen item actually serves. One slot, several credits. */
  credits: AllocationNeed[]
  score: PriorityScore
  /** What the student is told, in their own language. */
  reason: string
}

/**
 * Why a block could not be built as specified.
 *
 * Two genuinely different failures, deliberately not merged. A relaxed
 * constraint means the pool was awkward; an unservable need means the pool
 * cannot address something the allocation asked for at all. They call for
 * different responses from content operations, and one label for both would
 * lose that.
 */
export type ShortageKind = 'constraint-relaxed' | 'need-unservable'

export interface ShortageEvent {
  kind: ShortageKind
  /** The constraint that had to give. Null for an unservable need. */
  constraint: RelaxableConstraint | null
  /** What the builder was trying to fill when it gave. */
  need: AllocationNeed | null
  /** Eligible candidates at that moment — the number content operations needs. */
  candidates: number
  slotsOutstanding: number
}

/** Slots moved from a need nothing could serve to the needs that could. */
export interface Redistribution {
  from: AllocationNeed
  slots: number
  to: AllocationNeed[]
}

export interface AdaptiveBlock {
  id: string
  createdAt: string
  seed: number
  mode: PresentationMode
  size: number
  slots: BlockSlot[]
  /** Slots asked for, per need. */
  targets: SlotTargets
  /** Slots actually filled against each need. */
  served: SlotTargets
  /** Every need credited across the block, including secondary credits. */
  credited: SlotTargets
  debtBefore: number
  debtAfter: number
  /** Constraints relaxed, in the order they were relaxed. */
  relaxed: RelaxableConstraint[]
  shortages: ShortageEvent[]
  /** Needs nothing in the pool could serve, and where their slots went. */
  redistributions: Redistribution[]
  /** Share of the block the student has never seen. */
  unseenShare: number
  /** Share of demanding items, for the mix diagnostics. */
  demandingShare: number
  meanCognitiveEffort: number
  configVersion: number
  blueprintVersion: number | null
}

/** What the builder needs beyond the scoring context. */
export interface BuildInput {
  blockId: string
  items: AdaptiveItem[]
  context: ScoringContext
  targets: SlotTargets
  size: number
  mode: PresentationMode
  scope: { universityId: string; yearId: string; moduleIds?: string[] }
  /** Items reserved for readiness assessment. Never selectable for practice. */
  heldOutIds: Set<string>
  /** Repair questions already used for a concept — a repeat proves nothing. */
  excludedQuestionIds: Set<string>
  debtBefore: number
  debtAfter: number
  blueprintVersion: number | null
  createdAt: string
}

/** The running state a candidate is checked against. */
interface Placement {
  chosen: BlockSlot[]
  usedIds: Set<string>
  primaryConceptCounts: Map<string, number>
  trailingTopic: string | null
  trailingRun: number
  unseen: number
}

/**
 * The hard gates.
 *
 * Everything here is a **yes or no** about whether an item may be shown to this
 * student at all, and none of it consults a score. `heldOutIds` is here rather
 * than in the relaxation list on purpose: spending a readiness item on practice
 * destroys the only unbiased measurement the product has, and no pool shortage
 * justifies that.
 */
export function passesHardGates(item: AdaptiveItem, input: BuildInput): boolean {
  if (input.heldOutIds.has(item.id)) return false
  if (input.excludedQuestionIds.has(item.id)) return false
  if (!itemInScope(item, input.scope)) return false
  return true
}

/** Soft constraints, each individually relaxable and each individually reported. */
function violates(
  item: AdaptiveItem,
  placement: Placement,
  input: BuildInput,
  relaxed: Set<RelaxableConstraint>,
): RelaxableConstraint | null {
  const { constraints } = input.context.config

  if (!relaxed.has('conceptCap')) {
    // Every concept the item is chiefly about, not just the first. An item
    // co-primary on two concepts is dominated by both, so it is blocked when
    // *any* of them is already at the cap.
    for (const primary of primaryConcepts(item)) {
      const used = placement.primaryConceptCounts.get(primary) ?? 0
      if (used >= constraints.maxItemsPerPrimaryConcept) return 'conceptCap'
    }
  }

  if (!relaxed.has('consecutiveTopic')) {
    if (placement.trailingTopic === item.topic && placement.trailingRun >= constraints.maxConsecutiveSameTopic) {
      return 'consecutiveTopic'
    }
  }

  if (!relaxed.has('exposureCap')) {
    const seen = input.context.exposureByQuestion.get(item.id) ?? 0
    if (seen >= constraints.maxExposuresPerItem) return 'exposureCap'
  }

  if (!relaxed.has('unseenShare')) {
    // Only bites near the end, when the remaining slots are the last chance to
    // reach the floor. Enforcing it from slot one would reject every review item
    // in a block that has plenty of room left for them.
    const seen = (input.context.exposureByQuestion.get(item.id) ?? 0) > 0
    const remaining = input.size - placement.chosen.length
    const needed = Math.ceil(input.size * constraints.minUnseenShare) - placement.unseen
    if (seen && needed >= remaining) return 'unseenShare'
  }

  return null
}

function applyPlacement(placement: Placement, slot: BlockSlot, context: ScoringContext): Placement {
  const counts = new Map(placement.primaryConceptCounts)
  // Charged to every concept the item is chiefly about, matching the check.
  for (const primary of primaryConcepts(slot.item)) {
    counts.set(primary, (counts.get(primary) ?? 0) + 1)
  }

  const sameTopic = placement.trailingTopic === slot.item.topic
  return {
    chosen: [...placement.chosen, slot],
    usedIds: new Set([...placement.usedIds, slot.item.id]),
    primaryConceptCounts: counts,
    trailingTopic: slot.item.topic,
    trailingRun: sameTopic ? placement.trailingRun + 1 : 1,
    unseen: placement.unseen + ((context.exposureByQuestion.get(slot.item.id) ?? 0) === 0 ? 1 : 0),
  }
}

/**
 * Candidates that would serve a given need, best first.
 *
 * Near-equal scores are shuffled with the block's seed. Without that, the same
 * handful of items would open every block for every student with a similar
 * profile, and the exposure concentration the validation scorecard tracks would
 * be built into the algorithm rather than discovered by it.
 */
function candidatesFor(
  need: AllocationNeed,
  scored: Array<{ item: AdaptiveItem; score: PriorityScore; needs: AllocationNeed[] }>,
  placement: Placement,
  random: () => number,
): Array<{ item: AdaptiveItem; score: PriorityScore; needs: AllocationNeed[] }> {
  const NEAR_EQUAL = 0.02
  return scored
    .filter((entry) => !placement.usedIds.has(entry.item.id) && entry.needs.includes(need))
    .map((entry) => ({ entry, jitter: random() }))
    .sort((a, b) => {
      const gap = b.entry.score.total - a.entry.score.total
      if (Math.abs(gap) > NEAR_EQUAL) return gap
      return a.jitter - b.jitter
    })
    .map(({ entry }) => entry)
}

/**
 * Build the block.
 *
 * Backtracking is deliberately shallow — one step. Deep search would let the
 * builder spend unbounded time proving a pool is inadequate, when the useful
 * answer in that case is to say so quickly and raise a shortage.
 */
export function buildBlock(input: BuildInput): AdaptiveBlock {
  const { context, size } = input
  const seed = seedFrom(input.blockId)
  const random = mulberry32(seed)

  const eligible = input.items.filter((item) => passesHardGates(item, input))

  const scored = eligible.map((item) => {
    const score = scoreItem(item, context)
    const signals = needSignals(item, context)
    const needs = creditNeeds(signals)
    return { item, score, needs }
  })

  const relaxed = new Set<RelaxableConstraint>()
  const relaxedOrder: RelaxableConstraint[] = []
  const shortages: ShortageEvent[] = []
  const redistributions: Redistribution[] = []
  const unservable = new Set<AllocationNeed>()

  let placement: Placement = {
    chosen: [], usedIds: new Set(), primaryConceptCounts: new Map(), trailingTopic: null, trailingRun: 0, unseen: 0,
  }
  const served = emptyTargets()
  const targets = { ...input.targets }

  /** Backtracks allowed before the builder accepts that a rule has to give. */
  const MAX_BACKTRACKS_PER_STALL = 1
  let backtracksSinceProgress = 0

  let guard = size * 8
  while (placement.chosen.length < size && guard-- > 0) {
    // The pool is spent. Relaxing further rules cannot produce an item that does
    // not exist, and logging a shortage per remaining rule would bury the one
    // fact that matters: the bank ran out.
    if (placement.usedIds.size >= scored.length) break

    const counts = ALLOCATION_NEEDS.reduce((out, need) => {
      out[need] = scored.filter(
        (entry) => !placement.usedIds.has(entry.item.id) && entry.needs.includes(need),
      ).length
      return out
    }, {} as Record<AllocationNeed, number>)

    const remaining = ALLOCATION_NEEDS.reduce((out, need) => {
      // A need already declared unservable is not asked for again; its slots
      // have been handed to needs the pool can actually satisfy.
      out[need] = unservable.has(need) ? 0 : Math.max(0, targets[need] - served[need])
      return out
    }, emptyTargets())

    // Every quota met but the block still short: the shares were satisfied and
    // there are slots left over, so anything eligible is a legitimate filler.
    const need = mostConstrainedNeed(remaining, counts)

    // Nothing in the pool serves this need at all. Relaxing a constraint cannot
    // conjure a weak concept for a student who has none, so the honest response
    // is to record the shortage and give the slots to needs that can be met —
    // rather than return a half-empty block, or pretend the need was served.
    if (need && counts[need] === 0) {
      const outstanding = remaining[need]
      unservable.add(need)
      shortages.push({ kind: 'need-unservable', constraint: null, need, candidates: 0, slotsOutstanding: outstanding })

      targets[need] -= outstanding
      const servable = ALLOCATION_NEEDS.filter((other) => !unservable.has(other) && counts[other] > 0)
      if (servable.length) {
        for (let i = 0; i < outstanding; i++) targets[servable[i % servable.length]] += 1
        redistributions.push({ from: need, slots: outstanding, to: servable })
      }
      continue
    }
    const pool = need
      ? candidatesFor(need, scored, placement, random)
      : scored.filter((entry) => !placement.usedIds.has(entry.item.id))
          .sort((a, b) => b.score.total - a.score.total)

    const pick = pool.find((entry) => violates(entry.item, placement, input, relaxed) === null)

    if (pick) {
      const slot: BlockSlot = {
        index: placement.chosen.length,
        item: pick.item,
        filledFor: need ?? pick.needs[0] ?? 'coverage',
        credits: pick.needs,
        score: pick.score,
        reason: '',
      }
      placement = applyPlacement(placement, slot, context)
      // Credit every need the item serves, but consume only the quota it was
      // chosen for. One question, several needs, one slot.
      served[slot.filledFor] += 1
      backtracksSinceProgress = 0
      continue
    }

    // Nothing fits. Try one step back before conceding: the previous pick may be
    // what closed the door, and swapping it is cheaper than relaxing a rule.
    //
    // Strictly bounded. Swapping the last item for an equally-blocked one is
    // still "a backtrack succeeded", so an unbounded loop here spins until the
    // guard expires and returns a short block with no shortage recorded — a
    // silent failure, which is the one outcome this builder must never produce.
    const backtracked = backtracksSinceProgress < MAX_BACKTRACKS_PER_STALL
      ? tryBacktrack(placement, scored, input, relaxed, random)
      : null
    if (backtracked) {
      backtracksSinceProgress += 1
      const removed = placement.chosen[placement.chosen.length - 1]
      served[removed.filledFor] = Math.max(0, served[removed.filledFor] - 1)
      placement = backtracked.placement
      served[backtracked.slot.filledFor] += 1
      continue
    }

    const next = input.context.config.relaxationOrder.find((constraint) => !relaxed.has(constraint))
    if (!next) break

    relaxed.add(next)
    relaxedOrder.push(next)
    shortages.push({
      kind: 'constraint-relaxed',
      constraint: next,
      need,
      candidates: need ? counts[need] : scored.length - placement.usedIds.size,
      slotsOutstanding: size - placement.chosen.length,
    })
  }

  const slots = placement.chosen.map((slot, index) => ({ ...slot, index }))
  const credited = emptyTargets()
  for (const slot of slots) for (const need of slot.credits) credited[need] += 1

  const unseen = slots.filter((slot) => (context.exposureByQuestion.get(slot.item.id) ?? 0) === 0).length
  const demanding = slots.filter((slot) => slot.item.demanding).length

  return {
    id: input.blockId,
    createdAt: input.createdAt,
    seed,
    mode: input.mode,
    size: slots.length,
    slots,
    targets,
    served,
    credited,
    debtBefore: input.debtBefore,
    debtAfter: input.debtAfter,
    relaxed: relaxedOrder,
    shortages,
    redistributions,
    unseenShare: slots.length ? unseen / slots.length : 0,
    demandingShare: slots.length ? demanding / slots.length : 0,
    meanCognitiveEffort: slots.length
      ? slots.reduce((sum, slot) => sum + slot.item.cognitiveEffort, 0) / slots.length
      : 0,
    configVersion: context.config.version,
    blueprintVersion: input.blueprintVersion,
  }
}

/**
 * Swap the last pick for one that leaves a feasible continuation.
 *
 * One step only. The common failure this recovers from is a last pick that
 * exhausts a concept cap and strands the remaining quota; a deeper search buys
 * very little on a 20–40 slot block and costs a great deal of certainty about
 * how long the builder can run.
 */
function tryBacktrack(
  placement: Placement,
  scored: Array<{ item: AdaptiveItem; score: PriorityScore; needs: AllocationNeed[] }>,
  input: BuildInput,
  relaxed: Set<RelaxableConstraint>,
  random: () => number,
): { placement: Placement; slot: BlockSlot } | null {
  const last = placement.chosen[placement.chosen.length - 1]
  if (!last) return null

  const rewound: Placement = {
    chosen: placement.chosen.slice(0, -1),
    usedIds: new Set([...placement.usedIds].filter((id) => id !== last.item.id)),
    primaryConceptCounts: new Map(placement.primaryConceptCounts),
    trailingTopic: placement.chosen[placement.chosen.length - 2]?.item.topic ?? null,
    trailingRun: 0,
    unseen: placement.unseen - ((input.context.exposureByQuestion.get(last.item.id) ?? 0) === 0 ? 1 : 0),
  }
  // Refunded to every concept it was charged to, or a rewind leaks a count
  // and the cap tightens for the rest of the block.
  for (const primary of primaryConcepts(last.item)) {
    const count = (rewound.primaryConceptCounts.get(primary) ?? 1) - 1
    if (count > 0) rewound.primaryConceptCounts.set(primary, count)
    else rewound.primaryConceptCounts.delete(primary)
  }
  // Recount the trailing run against the rewound tail, so removing one item
  // cannot leave a stale run length that blocks a legal placement.
  rewound.trailingRun = rewound.trailingTopic
    ? countTrailing(rewound.chosen, rewound.trailingTopic)
    : 0

  const alternatives = candidatesFor(last.filledFor, scored, rewound, random)
    .filter((entry) => entry.item.id !== last.item.id)

  const replacement = alternatives.find((entry) => violates(entry.item, rewound, input, relaxed) === null)
  if (!replacement) return null

  const slot: BlockSlot = {
    index: rewound.chosen.length,
    item: replacement.item,
    filledFor: last.filledFor,
    credits: replacement.needs,
    score: replacement.score,
    reason: '',
  }
  return { placement: applyPlacement(rewound, slot, input.context), slot }
}

function countTrailing(slots: BlockSlot[], topic: string): number {
  let run = 0
  for (let i = slots.length - 1; i >= 0; i--) {
    if (slots[i].item.topic !== topic) break
    run += 1
  }
  return run
}

/**
 * Whether the block honoured its quotas.
 *
 * Reported, not enforced — a block that missed a quota because the pool was
 * short is a fact worth showing content operations, and suppressing it would
 * hide exactly the signal that tells them what to author next.
 */
export function quotaDeviations(block: AdaptiveBlock, config: AdaptiveConfig): Array<{ need: AllocationNeed; target: number; served: number; within: boolean }> {
  return ALLOCATION_NEEDS.map((need) => {
    const target = block.targets[need]
    const served = block.served[need]
    return { need, target, served, within: Math.abs(target - served) <= config.constraints.quotaTolerance }
  })
}
