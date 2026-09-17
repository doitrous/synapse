import { attemptOrder, type AttemptRecord } from './attempts.ts'
import type { QuestionHighlight } from './questionHighlights'

/**
 * Turning the raw attempt log and a student's question-bank highlights into
 * signals an administrator can read: does this student flip-flop on answers
 * they have already seen, and do their highlights land on the substance of a
 * question or scatter across it.
 *
 * Both analyses are pure functions over records the app already keeps — no
 * new storage, no fabricated numbers. `StudyTrackingSettings` only gates
 * whether a signal is computed/shown; it never changes what the underlying
 * math means.
 */

/* ---------------------------------------------------------------------------
 * Settings
 * ------------------------------------------------------------------------- */

/**
 * Which activity signals an institution has switched on.
 *
 * Flat booleans rather than a nested tree: every signal here is either fully
 * on or fully off for the whole institution, and a flat shape is what
 * `usePersistentState` and the settings page's existing toggles already
 * expect. New signals join as additional optional-with-default booleans
 * rather than restructuring this type.
 */
export interface StudyTrackingSettings {
  /** Master switch for answer-change tracking (all three transition kinds below). */
  answerChanges: boolean
  /** Individual transition kinds, so an institution can track only the ones it cares about. */
  trackCorrectToIncorrect: boolean
  trackIncorrectToCorrect: boolean
  trackIncorrectToIncorrect: boolean
  /** Master switch for highlight-behaviour tracking. */
  highlightBehavior: boolean
}

export const STUDY_TRACKING_SETTINGS_KEY = 'nishany.admin.studyTrackingSettings.v1'

export const DEFAULT_STUDY_TRACKING_SETTINGS: StudyTrackingSettings = {
  answerChanges: true,
  trackCorrectToIncorrect: true,
  trackIncorrectToCorrect: true,
  trackIncorrectToIncorrect: true,
  highlightBehavior: true,
}

/* ---------------------------------------------------------------------------
 * Answer-change analysis
 * ------------------------------------------------------------------------- */

/**
 * How a student's verdict on one item moved between two consecutive marked
 * attempts. `correctToCorrect` is tracked too, purely as the "no change"
 * baseline the other three are measured against — a class that never varies
 * would otherwise be invisible in the totals.
 */
export type AnswerTransitionKind =
  | 'correctToIncorrect'
  | 'incorrectToCorrect'
  | 'incorrectToIncorrect'
  | 'correctToCorrect'

export type AnswerTransitionCounts = Record<AnswerTransitionKind, number>

function zeroTransitionCounts(): AnswerTransitionCounts {
  return { correctToIncorrect: 0, incorrectToCorrect: 0, incorrectToIncorrect: 0, correctToCorrect: 0 }
}

export interface AnswerChangeSummary {
  /** Items seen more than once with a marked verdict both times. */
  itemsWithRepeatedAttempts: number
  /** Sum of every transition counted below. */
  totalTransitions: number
  counts: AnswerTransitionCounts
  /** Same counts, broken out per item, for a drill-down view. */
  byItem: Record<string, AnswerTransitionCounts>
}

function emptyAnswerChangeSummary(): AnswerChangeSummary {
  return { itemsWithRepeatedAttempts: 0, totalTransitions: 0, counts: zeroTransitionCounts(), byItem: {} }
}

function transitionKind(previous: boolean, current: boolean): AnswerTransitionKind {
  if (previous && current) return 'correctToCorrect'
  if (previous && !current) return 'correctToIncorrect'
  if (!previous && current) return 'incorrectToCorrect'
  return 'incorrectToIncorrect'
}

/**
 * Group attempts by item, order each group by when the answer was committed,
 * and classify every consecutive pair into a transition.
 *
 * An attempt with `correct: null` (a station tick, a flashcard grade, an
 * untimed self-report) is dropped before ordering: those verdicts are not
 * "wrong" or "right" against a key, so a pair straddling one would have to
 * invent a side of the transition that was never marked. Records missing a
 * timestamp are dropped the same way — there is nothing honest to order them
 * against.
 */
export function classifyAnswerChanges(records: AttemptRecord[]): AnswerChangeSummary {
  if (!records.length) return emptyAnswerChangeSummary()

  const byItem = new Map<string, AttemptRecord[]>()
  for (const record of records) {
    if (record.correct === null || !record.at) continue
    const group = byItem.get(record.itemId)
    if (group) group.push(record)
    else byItem.set(record.itemId, [record])
  }

  const counts = zeroTransitionCounts()
  const perItem: Record<string, AnswerTransitionCounts> = {}
  let itemsWithRepeatedAttempts = 0
  let totalTransitions = 0

  for (const [itemId, group] of byItem) {
    if (group.length < 2) continue
    const ordered = [...group].sort((a, b) => attemptOrder(a) - attemptOrder(b))
    const itemCounts = zeroTransitionCounts()
    for (let i = 1; i < ordered.length; i++) {
      const kind = transitionKind(ordered[i - 1].correct as boolean, ordered[i].correct as boolean)
      itemCounts[kind] += 1
      counts[kind] += 1
      totalTransitions += 1
    }
    itemsWithRepeatedAttempts += 1
    perItem[itemId] = itemCounts
  }

  return { itemsWithRepeatedAttempts, totalTransitions, counts, byItem: perItem }
}

/** Which transitions a settings object says to surface, in a stable order. */
export function enabledTransitionKinds(settings: StudyTrackingSettings): AnswerTransitionKind[] {
  if (!settings.answerChanges) return []
  const kinds: AnswerTransitionKind[] = []
  if (settings.trackCorrectToIncorrect) kinds.push('correctToIncorrect')
  if (settings.trackIncorrectToCorrect) kinds.push('incorrectToCorrect')
  if (settings.trackIncorrectToIncorrect) kinds.push('incorrectToIncorrect')
  return kinds
}

/* ---------------------------------------------------------------------------
 * Highlight-behaviour analysis
 * ------------------------------------------------------------------------- */

/**
 * `QuestionHighlight.anchor.block` is the free-form id the runner assigns to
 * whatever the student selected inside (`vignette`, `stem`, `option-<n>`,
 * `rationale-<n>`, `explanation` — see `QuestionBank.tsx`'s calls to
 * `HighlightableText`). Nothing in storage marks a highlight as "key" or
 * "concept-linked"; `QuestionHighlight` carries only an id, the question, the
 * anchor and a timestamp. So "key" here is a heuristic classification of the
 * block id, defined honestly:
 *
 *  - `rationale` / `explanation` blocks hold the *reasoning* — why an answer
 *    is right or wrong, the part actually being studied for.
 *  - `vignette` / `stem` / `option` blocks hold the *prompt* — the scenario
 *    and the raw answer choices, which a student may highlight for orientation
 *    without it reflecting engagement with the underlying concept.
 *
 * This is a proxy, not a verified signal: a student can highlight something
 * important inside the stem, or something incidental inside the rationale.
 * Treat `keyBlockShare` as "share of highlights on the answer's reasoning",
 * not as a claim about what the student actually understood.
 */
export type HighlightBlockKind = 'vignette' | 'stem' | 'option' | 'rationale' | 'explanation' | 'other'

const KEY_BLOCK_KINDS: ReadonlySet<HighlightBlockKind> = new Set(['rationale', 'explanation'])

export function classifyHighlightBlock(block: string): HighlightBlockKind {
  if (block === 'vignette') return 'vignette'
  if (block === 'stem') return 'stem'
  if (block === 'explanation') return 'explanation'
  if (block.startsWith('option-')) return 'option'
  if (block.startsWith('rationale-')) return 'rationale'
  return 'other'
}

/**
 * Whether a highlighted phrase overlaps a known concept term (a concept's
 * label or one of its aliases). Optional second signal for "key" — it needs
 * the concept graph's terms, which the pure module does not import (that
 * would couple it to `conceptGraph.ts` and to persisted state); callers that
 * have the terms on hand may pass them in. A plain case-insensitive substring
 * test, not the word-boundary regex `ConceptText` renders with — cheap, and
 * an approximation is enough for a "does this look concept-linked" score.
 */
export function isConceptLinkedHighlight(exactText: string, conceptTerms: readonly string[]): boolean {
  const text = exactText.trim().toLowerCase()
  if (!text || !conceptTerms.length) return false
  return conceptTerms.some((term) => {
    const needle = term.trim().toLowerCase()
    return needle.length > 0 && text.includes(needle)
  })
}

export type HighlightBlockCounts = Record<HighlightBlockKind, number>

function zeroBlockCounts(): HighlightBlockCounts {
  return { vignette: 0, stem: 0, option: 0, rationale: 0, explanation: 0, other: 0 }
}

/** "Focused" reads highlights concentrated on reasoning; "sporadic" reads them scattered without much reasoning coverage; "none" is zero highlights, not a claim about behaviour. */
export type HighlightFocusLabel = 'none' | 'sporadic' | 'mixed' | 'focused'

export interface HighlightBehaviorSummary {
  totalHighlights: number
  /** Distinct questions carrying at least one highlight. */
  questionsHighlighted: number
  /** `totalHighlights / questionsHighlighted`, 0 when nothing is highlighted. */
  highlightsPerQuestion: number
  byBlockKind: HighlightBlockCounts
  /** Share of highlights on `rationale` / `explanation` blocks — see the module doc above. */
  keyBlockShare: number
  /**
   * Share of highlights whose text overlaps a supplied concept term. `null`
   * when no `conceptTerms` were passed to `analyzeHighlightBehavior` — that
   * is "not computed", never "zero".
   */
  conceptLinkedShare: number | null
  /**
   * Blend of the two signals above (just `keyBlockShare` when concept terms
   * were not supplied), in [0, 1]. Higher means highlights cluster on the
   * parts of a question that explain the answer; lower means they are spread
   * across prompt text with little reasoning coverage. A heuristic score for
   * a preview panel, not a graded metric.
   */
  focusScore: number
  focusLabel: HighlightFocusLabel
}

function focusLabelFor(score: number, totalHighlights: number): HighlightFocusLabel {
  if (totalHighlights === 0) return 'none'
  if (score >= 0.6) return 'focused'
  if (score >= 0.3) return 'mixed'
  return 'sporadic'
}

/**
 * Summarise a set of highlights (typically one student's whole
 * `QuestionHighlightStore`, flattened) into the metrics above.
 *
 * `conceptTerms` is optional — labels and aliases from the concept graph, in
 * whatever casing they are stored. Pass them to get `conceptLinkedShare`;
 * omit them to get a block-kind-only view.
 */
export function analyzeHighlightBehavior(
  highlights: readonly QuestionHighlight[],
  options: { conceptTerms?: readonly string[] } = {},
): HighlightBehaviorSummary {
  const byBlockKind = zeroBlockCounts()
  const questionIds = new Set<string>()
  let keyBlockHits = 0
  let conceptLinkedHits = 0
  const conceptTerms = options.conceptTerms

  for (const highlight of highlights) {
    questionIds.add(highlight.questionId)
    const kind = classifyHighlightBlock(highlight.anchor.block)
    byBlockKind[kind] += 1
    if (KEY_BLOCK_KINDS.has(kind)) keyBlockHits += 1
    if (conceptTerms && isConceptLinkedHighlight(highlight.anchor.exact, conceptTerms)) conceptLinkedHits += 1
  }

  const totalHighlights = highlights.length
  const questionsHighlighted = questionIds.size
  const keyBlockShare = totalHighlights ? keyBlockHits / totalHighlights : 0
  const conceptLinkedShare = conceptTerms ? (totalHighlights ? conceptLinkedHits / totalHighlights : 0) : null

  const focusScore = conceptLinkedShare === null
    ? keyBlockShare
    : (keyBlockShare + conceptLinkedShare) / 2

  return {
    totalHighlights,
    questionsHighlighted,
    highlightsPerQuestion: questionsHighlighted ? totalHighlights / questionsHighlighted : 0,
    byBlockKind,
    keyBlockShare,
    conceptLinkedShare,
    focusScore,
    focusLabel: focusLabelFor(focusScore, totalHighlights),
  }
}

/** Flatten a `QuestionHighlightStore`-shaped record into a plain list, for callers that only have the store. */
export function flattenHighlightStore(store: Record<string, QuestionHighlight[]>): QuestionHighlight[] {
  return Object.values(store).flat()
}
