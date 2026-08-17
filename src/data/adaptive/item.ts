/**
 * A question as the selector sees it.
 *
 * `usePublishedQuestions` projects the authoring record into the shape a student
 * *reads* — stem, options, explanation — and deliberately drops the tagging that
 * only matters to whoever decides what to ask next. The selector needs both, so
 * `itemProjection.ts` projects the same approved record into the shape it
 * *chooses* by.
 *
 * This file holds the type and the pure predicates over it, and imports nothing
 * from the app. That is what lets the selection algorithms be unit-tested under
 * `node --test`, which cannot resolve the `@/` alias. The projection that does
 * need the app lives next door.
 */

import type { Difficulty, Question } from '@/data/qbank'

/**
 * A question plus everything needed to decide whether to ask it.
 *
 * `question` is the exact object the runner renders, so what the selector scored
 * and what the student reads can never drift apart.
 */
export interface AdaptiveItem {
  id: string
  question: Question
  /**
   * A stable fingerprint of the answerable content.
   *
   * Evidence records this so a replay can tell that a question was edited after
   * it was answered. Without it, a rewritten stem silently inherits the evidence
   * of the stem it replaced.
   */
  version: string
  subjectId: string
  topic: string
  difficulty: Difficulty
  /** Concepts the item is *for*. Weighted at full relevance. */
  mainConceptIds: string[]
  /** Concepts it also assesses. Weighted lower. */
  secondaryConceptIds: string[]
  /** Both, in the order the mastery model should prefer. */
  conceptIds: string[]
  moduleIds: string[]
  universityIds: string[]
  years: string[]
  /** When set, the item applies *only* to these year/university IDs. */
  onlyFor: string[]
  /** 0–1. Falls back to the Low/Medium/High band when no score was authored. */
  cognitiveEffort: number
  clinicalReasoningLevel: number
  examRelevance: number
  /** Author's estimate, used to judge whether an answer arrived impossibly fast. */
  estimatedSeconds: number | null
  /** True when the difficulty band is one most students are expected to miss. */
  demanding: boolean
  /** Option index → the author's rationale, which is what makes a distractor teachable. */
  optionRationales: string[]
}

/**
 * The role a concept plays for this item.
 *
 * Returns null when the item does not assess the concept at all, so a caller
 * cannot accidentally record full-relevance evidence for a concept the question
 * merely mentions.
 */
export function conceptRole(item: AdaptiveItem, conceptId: string): 'main' | 'secondary' | null {
  if (item.mainConceptIds.includes(conceptId)) return 'main'
  if (item.secondaryConceptIds.includes(conceptId)) return 'secondary'
  return null
}

/**
 * The concept an item is chiefly about.
 *
 * The per-block cap is "no more than two items **dominated by** one concept", so
 * it has to be applied against a single concept per item rather than against
 * every concept the item touches. Falls back to the first assessed concept when
 * nothing was marked as main.
 */
export function primaryConcept(item: AdaptiveItem): string | null {
  return item.mainConceptIds[0] ?? item.secondaryConceptIds[0] ?? null
}

/**
 * Whether this item is in scope for this student.
 *
 * A **hard gate**, evaluated before any scoring: an out-of-scope item must be
 * impossible to select, not merely unlikely to win.
 *
 * Empty means unrestricted, matching how scope already works everywhere else in
 * Synapse. `questionOnlyFor` is the exception — when an author sets it, it is an
 * allow-list and nothing outside it qualifies.
 */
export function itemInScope(
  item: AdaptiveItem,
  scope: { universityId: string; yearId: string; moduleIds?: string[] },
): boolean {
  if (item.onlyFor.length > 0) {
    const allowed = new Set(item.onlyFor)
    if (!allowed.has(scope.yearId) && !allowed.has(scope.universityId)) return false
  }
  if (scope.universityId && item.universityIds.length > 0 && !item.universityIds.includes(scope.universityId)) {
    return false
  }
  if (scope.yearId && item.years.length > 0 && !item.years.includes(scope.yearId)) return false
  if (scope.moduleIds?.length && item.moduleIds.length > 0) {
    const wanted = new Set(scope.moduleIds)
    if (!item.moduleIds.some((id) => wanted.has(id))) return false
  }
  return true
}

/** The index of the correct option, or -1 when the item has no key. */
export function correctOptionIndex(item: AdaptiveItem): number {
  return item.question.options.findIndex((option) => option.correct)
}
