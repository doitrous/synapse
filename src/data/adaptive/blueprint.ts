/**
 * What has to be learnt to be ready for an exam.
 *
 * A blueprint is a weighted list of concepts, grouped by the topic they sit
 * under. Adaptive selection may oversample weakness, but it may never silently
 * abandon this list — that separation is the whole reason the file exists.
 *
 * Weights are **derived, not invented**. `Concept` already carries
 * `blueprintWeight` and `examWeightByYear`, authored alongside the concept
 * itself, so a blueprint that no admin has touched still describes the real
 * curriculum. An admin-authored blueprint overrides those weights for a named
 * university/year/module, is versioned, and carries a dated change note — but it
 * starts from the derived figures rather than from an empty form nobody fills in.
 */

import type { Concept } from '@/data/conceptGraph'
import { derivedExamWeight } from '@/data/examSignal'

/** Admin-owned, so this is a shared catalogue document. */
export const ADAPTIVE_BLUEPRINT_STORAGE_KEY = 'nishany-adaptive-blueprints-v1'

export interface BlueprintNode {
  conceptId: string
  /** Display label, carried so a blueprint reads without the concept graph. */
  label: string
  /** The topic this concept is grouped under — a subject id, or a taxonomy node. */
  groupId: string
  groupLabel: string
  /** Share of the whole blueprint, 0–1. Normalised across the blueprint. */
  weight: number
  /** True when an admin set this weight rather than it being derived. */
  overridden: boolean
}

export interface Blueprint {
  id: string
  name: string
  /** Bumped whenever weights change materially. */
  version: number
  /** Scope. Empty means "applies wherever nothing more specific does". */
  universityId: string
  /** The scoped year identifier, e.g. `OMS_Y3`. */
  yearId: string
  moduleIds: string[]
  nodes: BlueprintNode[]
  /** Set once published; a draft never governs a student's block. */
  publishedAt: string | null
  changeNotes: Array<{ version: number; at: string; author: string; note: string }>
}

/**
 * How much weight a concept carries for a given year.
 *
 * Per-year weight wins where it exists, because a concept can be central in one
 * year and background in another. A concept with no recorded weight at all still
 * counts — at a small uniform weight — because "nobody has weighted this yet" is
 * not the same as "this is not on the exam", and treating it as zero would drop
 * whole areas of a partially-authored curriculum out of coverage silently.
 */
export const UNWEIGHTED_CONCEPT_WEIGHT = 0.25

export function rawConceptWeight(concept: Concept, yearId: string, currentYear = new Date().getFullYear()): number {
  const perYear = yearId ? concept.examWeightByYear?.[yearId] : undefined
  if (typeof perYear === 'number' && perYear > 0) return perYear
  // A weight derived from the papers a concept actually appeared on beats a
  // number somebody typed, and unlike that number it can say why. Ranked below
  // an explicit per-year weight, which is a deliberate override.
  if (concept.examSignal?.appearances.length) {
    const derived = derivedExamWeight(concept.examSignal, { currentYear })
    if (derived > 0) return derived
  }
  if (typeof concept.blueprintWeight === 'number' && concept.blueprintWeight > 0) return concept.blueprintWeight
  return UNWEIGHTED_CONCEPT_WEIGHT
}

/**
 * Whether a concept belongs to this student at all.
 *
 * Empty means unrestricted — the same "empty means everyone" rule vouchers,
 * campaigns and content scope already use. A concept explicitly scoped to other
 * universities or other years is not on this student's blueprint, and including
 * it would manufacture coverage debt they can never repay.
 */
export function conceptInScope(concept: Concept, universityId: string, yearId: string): boolean {
  if (concept.status === 'inactive') return false
  const universities = concept.universityIds ?? []
  if (universityId && universities.length > 0 && !universities.includes(universityId)) return false
  const years = concept.examWeightByYear ? Object.keys(concept.examWeightByYear) : []
  // A concept that names per-year weights is scoped to exactly those years.
  if (yearId && years.length > 0 && !years.includes(yearId)) return false
  return true
}

export interface DeriveBlueprintInput {
  concepts: Concept[]
  universityId: string
  yearId: string
  /** Restrict to these modules when the student is studying a specific one. */
  moduleIds?: string[]
  /** Resolves a concept to its display group. Defaults to the concept's subject. */
  groupFor?: (concept: Concept) => { id: string; label: string }
}

/**
 * A readable label from a raw catalogue id, for when no `groupFor` mapper is
 * supplied at all.
 *
 * This is a last resort, not the intended path — the real friendly names live
 * in the curriculum catalogue and are resolved by the `groupFor` a caller
 * should pass in (see `useAdaptiveConfig.ts`). But a student must never see a
 * bare code like `SYS_PHARM` or `haem` on screen, so even this fallback turns
 * an id into words rather than printing it back verbatim.
 */
function humanizeGroupId(id: string): string {
  const withoutPrefix = id.replace(/^(SYS|TPC|SUB|MIC|NAN)_/, '')
  const words = withoutPrefix.replace(/[_-]+/g, ' ').trim()
  if (!words) return 'Other topics'
  return words
    .toLowerCase()
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function defaultGroup(concept: Concept): { id: string; label: string } {
  const id = concept.topicTagId || concept.topicId || concept.systemId || concept.subjectId || 'ungrouped'
  return { id, label: humanizeGroupId(id) }
}

/**
 * Build a blueprint from the concept graph.
 *
 * Weights are normalised to sum to 1 so a blueprint can be compared against
 * another with a different number of concepts. An empty result is returned
 * honestly rather than padded — a university with no concepts authored has no
 * blueprint, and the interface says exactly that.
 */
export function deriveBlueprint(input: DeriveBlueprintInput): BlueprintNode[] {
  const { concepts, universityId, yearId, moduleIds, groupFor = defaultGroup } = input
  const wanted = moduleIds?.length ? new Set(moduleIds) : null

  const eligible = concepts.filter((concept) => {
    if (!conceptInScope(concept, universityId, yearId)) return false
    if (!wanted) return true
    const owned = concept.moduleIds ?? []
    // A concept with no module recorded belongs to the year rather than to one
    // module, so it stays in scope rather than being filtered into nothing.
    return owned.length === 0 || owned.some((id) => wanted.has(id))
  })

  const raw = eligible.map((concept) => ({ concept, weight: rawConceptWeight(concept, yearId) }))
  const total = raw.reduce((sum, entry) => sum + entry.weight, 0)
  if (total <= 0) return []

  return raw.map(({ concept, weight }) => {
    const group = groupFor(concept)
    return {
      conceptId: concept.id,
      label: concept.label,
      groupId: group.id,
      groupLabel: group.label,
      weight: weight / total,
      overridden: false,
    }
  })
}

/**
 * Apply an admin blueprint's overrides to the derived nodes.
 *
 * The derived set decides *which* concepts are in scope; the stored blueprint
 * decides *how much* each one is worth. That order matters: an admin blueprint
 * written before a concept was authored must not exclude that concept from
 * coverage, or a new area of the curriculum stays invisible until someone
 * remembers to re-open the blueprint editor.
 */
export function resolveBlueprint(derived: BlueprintNode[], stored: Blueprint | null): BlueprintNode[] {
  if (!stored || !stored.publishedAt) return normaliseNodes(derived)
  const overrides = new Map(stored.nodes.map((node) => [node.conceptId, node]))
  const merged = derived.map((node) => {
    const override = overrides.get(node.conceptId)
    return override
      ? { ...node, weight: Math.max(0, override.weight), overridden: true }
      : node
  })
  return normaliseNodes(merged)
}

/** Re-normalise so weights sum to 1 after editing. Zero-weight nodes are dropped. */
export function normaliseNodes(nodes: BlueprintNode[]): BlueprintNode[] {
  const kept = nodes.filter((node) => node.weight > 0)
  const total = kept.reduce((sum, node) => sum + node.weight, 0)
  if (total <= 0) return []
  return kept.map((node) => ({ ...node, weight: node.weight / total }))
}

/** Weight per group, for the coverage bars the student and admin both read. */
export function weightByGroup(nodes: BlueprintNode[]): Array<{ groupId: string; groupLabel: string; weight: number; concepts: number }> {
  const groups = new Map<string, { groupId: string; groupLabel: string; weight: number; concepts: number }>()
  for (const node of nodes) {
    const current = groups.get(node.groupId)
    if (current) {
      current.weight += node.weight
      current.concepts += 1
    } else {
      groups.set(node.groupId, { groupId: node.groupId, groupLabel: node.groupLabel, weight: node.weight, concepts: 1 })
    }
  }
  return [...groups.values()].sort((a, b) => b.weight - a.weight)
}

/**
 * The blueprint that governs a student.
 *
 * Most specific first: a module blueprint beats a year one, which beats a
 * university one. Two blueprints of equal specificity are resolved by version,
 * newest winning, so republishing does not depend on list order.
 */
export function blueprintFor(
  blueprints: Blueprint[],
  { universityId, yearId, moduleIds }: { universityId: string; yearId: string; moduleIds?: string[] },
): Blueprint | null {
  const wanted = new Set(moduleIds ?? [])
  const candidates = blueprints.filter((blueprint) => {
    if (!blueprint.publishedAt) return false
    if (blueprint.universityId && blueprint.universityId !== universityId) return false
    if (blueprint.yearId && blueprint.yearId !== yearId) return false
    if (blueprint.moduleIds.length && ![...wanted].some((id) => blueprint.moduleIds.includes(id))) return false
    return true
  })
  if (!candidates.length) return null

  const specificity = (blueprint: Blueprint) =>
    (blueprint.moduleIds.length ? 4 : 0) + (blueprint.yearId ? 2 : 0) + (blueprint.universityId ? 1 : 0)

  return [...candidates].sort((a, b) => specificity(b) - specificity(a) || b.version - a.version)[0] ?? null
}

/** A new, empty, unpublished blueprint seeded from the derived weights. */
export function draftBlueprint(
  name: string,
  scope: { universityId: string; yearId: string; moduleIds: string[] },
  derived: BlueprintNode[],
): Blueprint {
  return {
    id: `bp-${scope.universityId || 'any'}-${scope.yearId || 'any'}-${derived.length}`,
    name,
    version: 1,
    universityId: scope.universityId,
    yearId: scope.yearId,
    moduleIds: scope.moduleIds,
    nodes: derived.map((node) => ({ ...node })),
    publishedAt: null,
    changeNotes: [],
  }
}
