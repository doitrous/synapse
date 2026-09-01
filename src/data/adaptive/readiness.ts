/**
 * Measuring where the student actually stands.
 *
 * Adaptive practice deliberately oversamples weakness, so accuracy inside it is
 * a biased estimator of exam performance — reliably pessimistic, and getting
 * more so the better the algorithm works. Reporting it as readiness would be a
 * lie the system tells more confidently over time.
 *
 * So readiness is measured by a separate instrument: blueprint-balanced, timed,
 * mixed, drawn from items held back from ordinary practice, with no adaptive
 * substitution once it starts. The two systems share a question bank and nothing
 * else.
 *
 * The result is always a **range**. Forty questions cannot support a point
 * estimate, and printing one would invite exactly the over-reading the product
 * exists to prevent.
 */

import type { AdaptiveConfig } from './config.ts'
import type { AdaptiveItem } from './item.ts'
import { itemInScope } from './item.ts'
import type { BlueprintNode } from './blueprint.ts'
import { mulberry32, seedFrom } from './blockBuilder.ts'

/** Dotted, so `isUserOwnedState` routes it to the student's own record. */
export const READINESS_RESULTS_STORAGE_KEY = 'nishany.progress.adaptive.readiness.v1'

/** Admin-owned: which items are reserved. Shared, because it governs the bank. */
export const HELD_OUT_STORAGE_KEY = 'nishany-adaptive-heldout-v1'

export interface HeldOutRegistry {
  version: 1
  /** Explicitly reserved by an admin. Authoritative. */
  itemIds: string[]
  /** When false, the deterministic auto-reserve below is not applied. */
  autoReserveEnabled: boolean
  updatedAt: string
}

export const EMPTY_HELD_OUT: HeldOutRegistry = {
  version: 1, itemIds: [], autoReserveEnabled: true, updatedAt: '',
}

/**
 * Whether an item is reserved for measurement.
 *
 * An admin flag decides it outright. Failing that, a deterministic hash reserves
 * a stable share of every concept's pool — deterministic so the same item is
 * reserved on every device and every rebuild, because an item that drifts in and
 * out of the held-out set is worse than no held-out set at all.
 *
 * The auto-reserve is a floor for banks nobody has curated, not a replacement
 * for curation. A concept with only one or two items reserves none of them: a
 * blueprint node with no practice questions left teaches nobody anything.
 */
export function isHeldOut(
  item: AdaptiveItem,
  registry: HeldOutRegistry,
  poolSizeForItem: number,
  config: AdaptiveConfig,
): boolean {
  if (registry.itemIds.includes(item.id)) return true
  if (!registry.autoReserveEnabled) return false

  const MIN_POOL_TO_RESERVE = 5
  if (poolSizeForItem < MIN_POOL_TO_RESERVE) return false

  // A stable per-item value in [0,1). Reserving the lowest slice is equivalent
  // to sampling at random, but repeatable without storing anything.
  const draw = mulberry32(seedFrom(item.id))()
  return draw < config.readiness.autoReserveShare
}

/** Build the held-out set once for a whole catalogue. */
export function heldOutIds(
  items: AdaptiveItem[],
  registry: HeldOutRegistry,
  config: AdaptiveConfig,
): Set<string> {
  const poolByConcept = new Map<string, number>()
  for (const item of items) {
    for (const conceptId of item.mainConceptIds) {
      poolByConcept.set(conceptId, (poolByConcept.get(conceptId) ?? 0) + 1)
    }
  }

  const held = new Set<string>()
  for (const item of items) {
    const pool = item.mainConceptIds.reduce((max, id) => Math.max(max, poolByConcept.get(id) ?? 0), 0)
    if (isHeldOut(item, registry, pool, config)) held.add(item.id)
  }
  return held
}

export interface ReadinessItem {
  item: AdaptiveItem
  /** The blueprint group this item was drawn to represent. */
  groupId: string
}

export interface AssembleReadinessInput {
  items: AdaptiveItem[]
  heldOut: Set<string>
  nodes: BlueprintNode[]
  nodeByConcept: Map<string, BlueprintNode>
  scope: { universityId: string; yearId: string; moduleIds?: string[] }
  /** Question id → ISO timestamp last shown in practice. */
  lastPracticedAt: Map<string, string>
  config: AdaptiveConfig
  assessmentId: string
  now: Date
}

export interface ReadinessAssembly {
  id: string
  items: ReadinessItem[]
  /** Groups the blueprint wanted but the pool could not supply. */
  underRepresented: Array<{ groupId: string; groupLabel: string; wanted: number; supplied: number }>
  seed: number
  createdAt: string
}

const DAY = 86_400_000

/**
 * Assemble a blueprint-balanced assessment.
 *
 * Slots are apportioned to blueprint groups by weight, then filled from held-out
 * items that have not been seen in practice recently. Where a group cannot be
 * filled, the shortfall is **reported rather than backfilled from elsewhere** —
 * a 40-item assessment that quietly became 30 cardiology items is not
 * blueprint-balanced, and reporting a range from it would be worse than
 * reporting nothing.
 */
export function assembleReadiness(input: AssembleReadinessInput): ReadinessAssembly {
  const { items, heldOut, nodes, nodeByConcept, scope, lastPracticedAt, config, now } = input
  const seed = seedFrom(input.assessmentId)
  const random = mulberry32(seed)

  const excludeBefore = now.getTime() - config.readiness.exposureExclusionDays * DAY

  const eligible = items.filter((item) => {
    if (!heldOut.has(item.id)) return false
    if (!itemInScope(item, scope)) return false
    const seenAt = lastPracticedAt.get(item.id)
    // Recently practised items measure recall of that session, not preparedness.
    if (seenAt && new Date(seenAt).getTime() >= excludeBefore) return false
    return item.conceptIds.some((conceptId) => nodeByConcept.has(conceptId))
  })

  const byGroup = new Map<string, AdaptiveItem[]>()
  for (const item of eligible) {
    const node = item.conceptIds.map((id) => nodeByConcept.get(id)).find(Boolean)
    if (!node) continue
    const bucket = byGroup.get(node.groupId)
    if (bucket) bucket.push(item)
    else byGroup.set(node.groupId, [item])
  }

  const groupWeights = new Map<string, { label: string; weight: number }>()
  for (const node of nodes) {
    const current = groupWeights.get(node.groupId)
    if (current) current.weight += node.weight
    else groupWeights.set(node.groupId, { label: node.groupLabel, weight: node.weight })
  }

  const size = config.readiness.assessmentSize
  const chosen: ReadinessItem[] = []
  const underRepresented: ReadinessAssembly['underRepresented'] = []

  // Largest-remainder again, for the same reason as block allocation: 40 items
  // across nine groups cannot represent nine percentages by rounding each one.
  const wanted = [...groupWeights.entries()]
    .map(([groupId, meta]) => ({ groupId, label: meta.label, exact: size * meta.weight }))
    .sort((a, b) => b.exact - a.exact || a.groupId.localeCompare(b.groupId))

  let assigned = 0
  const slots = wanted.map((entry) => {
    const floor = Math.floor(entry.exact)
    assigned += floor
    return { ...entry, slots: floor, remainder: entry.exact - floor }
  })
  const spare = size - assigned
  slots.sort((a, b) => b.remainder - a.remainder || a.groupId.localeCompare(b.groupId))
  for (let i = 0; i < spare; i++) slots[i % slots.length].slots += 1

  for (const group of slots) {
    if (group.slots <= 0) continue
    const pool = [...(byGroup.get(group.groupId) ?? [])]
      .map((item) => ({ item, jitter: random() }))
      .sort((a, b) => a.jitter - b.jitter)
      .map(({ item }) => item)

    const take = pool.slice(0, group.slots)
    for (const item of take) chosen.push({ item, groupId: group.groupId })
    if (take.length < group.slots) {
      underRepresented.push({
        groupId: group.groupId,
        groupLabel: group.label,
        wanted: group.slots,
        supplied: take.length,
      })
    }
  }

  // Interleave so consecutive items come from different groups. A mixed
  // assessment is part of the protocol, not a presentation preference: blocked
  // topics let a student settle into one mode of thinking and inflate the score.
  const interleaved = interleaveByGroup(chosen, random)

  return { id: input.assessmentId, items: interleaved, underRepresented, seed, createdAt: now.toISOString() }
}

/** Round-robin across groups, largest group first, so no group clumps. */
function interleaveByGroup(items: ReadinessItem[], random: () => number): ReadinessItem[] {
  const groups = new Map<string, ReadinessItem[]>()
  for (const entry of items) {
    const bucket = groups.get(entry.groupId)
    if (bucket) bucket.push(entry)
    else groups.set(entry.groupId, [entry])
  }
  const queues = [...groups.values()].sort((a, b) => b.length - a.length || random() - 0.5)
  const out: ReadinessItem[] = []
  let placed = 0
  while (placed < items.length) {
    for (const queue of queues) {
      const next = queue.shift()
      if (next) {
        out.push(next)
        placed += 1
      }
    }
  }
  return out
}

export interface ReadinessAnswer {
  questionId: string
  groupId: string
  correct: boolean
  seconds: number | null
  /** True when the student never answered — kept distinct from a wrong answer. */
  omitted: boolean
}

export interface GroupResult {
  groupId: string
  groupLabel: string
  answered: number
  correct: number
  /** Null when too few items to report honestly. */
  lower: number | null
  upper: number | null
  /** True when the pool could not supply enough items to report this group. */
  insufficient: boolean
}

export interface ReadinessResult {
  id: string
  at: string
  /** Blueprint-balanced score interval, 0–1. */
  lower: number
  upper: number
  answered: number
  omitted: number
  medianSeconds: number | null
  groups: GroupResult[]
  /** Groups the assessment could not represent — the honest asterisk on the score. */
  underRepresented: ReadinessAssembly['underRepresented']
  configVersion: number
  blueprintVersion: number | null
}

/**
 * A Wilson score interval.
 *
 * Chosen over the textbook normal approximation because that one is badly wrong
 * exactly where this product needs it to be right: small samples and proportions
 * near 0 or 1. A student who got 18 of 20 correct should not be shown an upper
 * bound above 1.
 */
export function wilsonInterval(correct: number, total: number, confidence: number): { lower: number; upper: number } {
  if (total <= 0) return { lower: 0, upper: 1 }
  const z = zFor(confidence)
  const p = correct / total
  const denominator = 1 + (z * z) / total
  const centre = p + (z * z) / (2 * total)
  const spread = z * Math.sqrt((p * (1 - p)) / total + (z * z) / (4 * total * total))
  return {
    lower: Math.max(0, (centre - spread) / denominator),
    upper: Math.min(1, (centre + spread) / denominator),
  }
}

/** The handful of confidence levels the console offers, rather than an erf. */
function zFor(confidence: number): number {
  const table: Array<[number, number]> = [[0.8, 1.2816], [0.9, 1.6449], [0.95, 1.96], [0.99, 2.5758]]
  return table.reduce((closest, [level, z]) =>
    Math.abs(level - confidence) < Math.abs(closest[0] - confidence) ? [level, z] : closest, table[1])[1]
}

/**
 * Score an assessment.
 *
 * Omissions are excluded from the accuracy denominator but reported separately.
 * Counting a blank as wrong would fold a pacing problem into a knowledge
 * estimate; hiding it entirely would let a student skip everything they found
 * hard and receive a flattering range.
 */
export function scoreReadiness(
  assembly: ReadinessAssembly,
  answers: ReadinessAnswer[],
  groupLabels: Map<string, string>,
  config: AdaptiveConfig,
  blueprintVersion: number | null,
  at = new Date().toISOString(),
): ReadinessResult {
  const marked = answers.filter((answer) => !answer.omitted)
  const correct = marked.filter((answer) => answer.correct).length
  const overall = wilsonInterval(correct, marked.length, config.readiness.intervalConfidence)

  const byGroup = new Map<string, ReadinessAnswer[]>()
  for (const answer of answers) {
    const bucket = byGroup.get(answer.groupId)
    if (bucket) bucket.push(answer)
    else byGroup.set(answer.groupId, [answer])
  }

  const under = new Set(assembly.underRepresented.map((entry) => entry.groupId))

  const groups: GroupResult[] = [...byGroup.entries()].map(([groupId, entries]) => {
    const groupMarked = entries.filter((entry) => !entry.omitted)
    const groupCorrect = groupMarked.filter((entry) => entry.correct).length
    const enough = groupMarked.length >= config.readiness.minItemsPerTopicReport
    const interval = enough
      ? wilsonInterval(groupCorrect, groupMarked.length, config.readiness.intervalConfidence)
      : null
    return {
      groupId,
      groupLabel: groupLabels.get(groupId) ?? groupId,
      answered: groupMarked.length,
      correct: groupCorrect,
      lower: interval?.lower ?? null,
      upper: interval?.upper ?? null,
      insufficient: !enough || under.has(groupId),
    }
  }).sort((a, b) => a.groupLabel.localeCompare(b.groupLabel))

  const times = answers.map((answer) => answer.seconds).filter((value): value is number => value !== null).sort((a, b) => a - b)
  const middle = Math.floor(times.length / 2)

  return {
    id: assembly.id,
    at,
    lower: overall.lower,
    upper: overall.upper,
    answered: marked.length,
    omitted: answers.length - marked.length,
    medianSeconds: times.length ? (times.length % 2 ? times[middle] : (times[middle - 1] + times[middle]) / 2) : null,
    groups,
    underRepresented: assembly.underRepresented,
    configVersion: config.version,
    blueprintVersion,
  }
}

/**
 * Calibration: did the student's confidence match their accuracy?
 *
 * Reported alongside the score because knowing *that* you do not know is a
 * separate, teachable skill — and a student who is confidently wrong needs a
 * different intervention from one who is uncertainly right.
 */
export function calibrationError(
  answers: Array<{ correct: boolean; confident: boolean; omitted: boolean }>,
): number | null {
  const marked = answers.filter((answer) => !answer.omitted)
  if (!marked.length) return null
  const confident = marked.filter((answer) => answer.confident)
  const unconfident = marked.filter((answer) => !answer.confident)
  if (!confident.length || !unconfident.length) return null

  const confidentAccuracy = confident.filter((answer) => answer.correct).length / confident.length
  const unconfidentAccuracy = unconfident.filter((answer) => answer.correct).length / unconfident.length
  // Perfect calibration would put confident answers far above unconfident ones.
  // The error is how much of that expected separation is missing.
  return Math.max(0, 1 - (confidentAccuracy - unconfidentAccuracy))
}

/** A readiness range in words. Never a single number, never a promise. */
export function readinessSentence(result: ReadinessResult | null): string {
  if (!result || result.answered === 0) {
    return 'No readiness assessment yet. Practice accuracy is not a substitute — adaptive blocks deliberately oversample your weak areas.'
  }
  const lower = Math.round(result.lower * 100)
  const upper = Math.round(result.upper * 100)
  const caveat = result.underRepresented.length
    ? ` ${result.underRepresented.length} blueprint area${result.underRepresented.length === 1 ? '' : 's'} could not be fully represented, so treat this as provisional.`
    : ''
  return `On blueprint-balanced questions held back from your practice, your performance is between ${lower}% and ${upper}%.${caveat}`
}
