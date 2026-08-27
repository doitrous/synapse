import type { TextAnchor } from '@/lib/library/textAnchor'

/**
 * A student's highlight on a question's stem, options, or explanation while
 * solving the question bank.
 *
 * Deliberately thinner than `LibraryMark`: one color, no note, no tone choice.
 * Solving a question is a faster, more disposable act than reading and
 * annotating a library article — a highlight here means "this mattered", not a
 * place to write something down.
 */
export interface QuestionHighlight {
  id: string
  questionId: string
  anchor: TextAnchor
  /** ISO timestamp, for stable ordering. */
  createdAt: string
}

/**
 * Dotted under `synapse.qbank.`, which `isUserOwnedState` already routes to the
 * student's own record — the same pattern `questionNotes` (`StudyRail`) uses.
 * Without that prefix this would land in the shared catalogue store, where a
 * student has no write permission and every save would be refused.
 */
export const QUESTION_HIGHLIGHTS_STORAGE_KEY = 'synapse.qbank.questionHighlights.v1'

/** Highlights keyed by the question they sit on. */
export type QuestionHighlightStore = Record<string, QuestionHighlight[]>

let sequence = 0
export function newHighlightId(): string {
  sequence += 1
  return `qhl-${Date.now().toString(36)}-${sequence}`
}

export function highlightsFor(store: QuestionHighlightStore, questionId: string): QuestionHighlight[] {
  return store[questionId] ?? []
}

/** Add or replace a highlight, keeping each question's list in creation order. */
export function upsertHighlight(store: QuestionHighlightStore, highlight: QuestionHighlight): QuestionHighlightStore {
  const existing = highlightsFor(store, highlight.questionId)
  const without = existing.filter((item) => item.id !== highlight.id)
  return { ...store, [highlight.questionId]: [...without, highlight] }
}

/** Remove a highlight, and the question's entry entirely once its last one goes. */
export function removeHighlight(store: QuestionHighlightStore, questionId: string, highlightId: string): QuestionHighlightStore {
  const remaining = highlightsFor(store, questionId).filter((item) => item.id !== highlightId)
  const next = { ...store }
  if (remaining.length) next[questionId] = remaining
  else delete next[questionId]
  return next
}
