/**
 * Approved authoring records → the shape the selector chooses by.
 *
 * The approval gate is not re-implemented here. `managedQuestionToStudentQuestion`
 * *is* the gate: an item it refuses — unpublished, missing a key, fewer than two
 * usable answers — produces no adaptive item either. Writing a second
 * "is this publishable?" check is how a path around the approval rule gets built
 * by accident, and in a medical question bank that path is the whole risk.
 */

import type { ManagedContentItem, QuestionTags } from '@/data/contentControl'
import { DEMANDING_DIFFICULTIES } from '@/data/qbank'
import { managedQuestionToStudentQuestion } from '@/lib/usePublishedQuestions'
import type { AdaptiveItem } from './item'

const COGNITIVE_BAND: Record<QuestionTags['cognitiveEffort'], number> = {
  Low: 0.2,
  Medium: 0.5,
  High: 0.85,
}

/**
 * A fingerprint of the parts a student answers against.
 *
 * Deliberately not `updatedAt`: re-tagging a question, or fixing a typo in an
 * author's private note, does not invalidate evidence about whether the student
 * knew the answer. Only the stem, the options and the key do.
 */
export function questionVersion(item: ManagedContentItem): string {
  const data = item.questionData
  if (!data) return '0'
  const material = [
    item.title,
    data.correctAnswer,
    ...data.answers.map((answer) => `${answer.label}:${answer.text}`),
  ].join(' ')

  // FNV-1a: short, stable across runs, no dependency. Length is mixed into the
  // output because a bare 32-bit hash collides often enough that two different
  // stems could end up sharing one student's evidence.
  let hash = 0x811c9dc5
  for (let i = 0; i < material.length; i++) {
    hash ^= material.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193)
  }
  return `${(hash >>> 0).toString(36)}.${material.length.toString(36)}`
}

/**
 * Project one approved record, or null when it is not eligible to be asked.
 *
 * `catalogue` is needed because the student projection resolves library titles
 * against it — the same argument, for the same reason.
 */
export function adaptiveItemFrom(
  item: ManagedContentItem,
  catalogue: ManagedContentItem[],
): AdaptiveItem | null {
  const question = managedQuestionToStudentQuestion(item, catalogue)
  if (!question || !item.questionData) return null

  const { tags, estimatedSeconds, answers } = item.questionData
  const main = [...new Set(tags.mainConceptIds ?? [])]
  // Anything tagged as a main concept is not also a secondary one. Counting it
  // twice would let a single answer supply two pieces of evidence about one
  // concept — the exact double-count the whole model is built to avoid.
  const secondary = [...new Set(tags.conceptIds ?? [])].filter((id) => !main.includes(id))

  return {
    id: item.id,
    question,
    version: questionVersion(item),
    subjectId: item.subjectId,
    topic: question.topic,
    difficulty: question.difficulty,
    mainConceptIds: main,
    secondaryConceptIds: secondary,
    conceptIds: [...main, ...secondary],
    moduleIds: [...new Set([...(tags.moduleIds ?? []), ...(tags.module ? [tags.module] : [])])],
    universityIds: tags.universityIds ?? [],
    years: tags.years ?? [],
    onlyFor: tags.questionOnlyFor ?? [],
    cognitiveEffort: tags.cognitiveEffortScore ?? COGNITIVE_BAND[tags.cognitiveEffort] ?? 0.5,
    clinicalReasoningLevel: tags.clinicalReasoningLevel ?? 0,
    examRelevance: tags.examRelevance ?? 0,
    estimatedSeconds: estimatedSeconds > 0 ? estimatedSeconds : null,
    demanding: DEMANDING_DIFFICULTIES.includes(question.difficulty),
    optionRationales: answers
      .filter((answer) => answer.text.trim())
      .map((answer) => answer.explanation),
  }
}

// Cached by the catalogue's reference: it is one stable object per store
// document, so a remount reads the projection back rather than re-hashing and
// re-projecting the whole catalogue — the same module-scope memo trick
// `publishedQuestionsFromCatalogue` uses. Mirrors it deliberately.
const adaptiveItems = new WeakMap<ManagedContentItem[], AdaptiveItem[]>()

/** Every approved, answerable item in the catalogue. */
export function adaptiveItemsFrom(catalogue: ManagedContentItem[]): AdaptiveItem[] {
  const cached = adaptiveItems.get(catalogue)
  if (cached) return cached
  const items = catalogue
    .map((item) => adaptiveItemFrom(item, catalogue))
    .filter((item): item is AdaptiveItem => item !== null)
  adaptiveItems.set(catalogue, items)
  return items
}
