import { useMemo } from 'react'
import {
  CONTENT_LEDGER_STORAGE_KEY,
  initialManagedContent,
  isStudentPublishable,
  type ManagedContentItem,
} from '@/data/contentControl'
import { DIFFICULTIES, type Difficulty, type Question } from '@/data/qbank'
import { usePersistentState } from './usePersistentState'
import { useIdentity } from './useIdentity'
import { questionInAudience } from './questionAudience'

function difficultyFor(item: ManagedContentItem): Difficulty {
  const value = item.questionData?.tags.intendedDifficulty ?? item.fields.Difficulty
  return DIFFICULTIES.includes(value as Difficulty) ? value as Difficulty : 'Moderate'
}

/** Convert the admin authoring shape into the exact question shape used by students. */
export function managedQuestionToStudentQuestion(
  item: ManagedContentItem,
  catalogue: ManagedContentItem[],
): Question | null {
  if (item.kind !== 'question' || !isStudentPublishable(item) || !item.questionData) return null

  const data = item.questionData
  const answers = data.answers.filter((answer) => answer.text.trim())
  if (answers.length < 2 || !answers.some((answer) => answer.label === data.correctAnswer)) return null

  const titlesById = new Map(catalogue.map((entry) => [entry.id, entry.title]))
  const correctExplanation = answers.find((answer) => answer.label === data.correctAnswer)?.explanation ?? ''

  return {
    id: item.id,
    subjectId: item.subjectId,
    topic: data.tags.topic.trim() || item.fields.Topic?.trim() || 'General',
    difficulty: difficultyFor(item),
    vignette: item.fields.Vignette?.trim() ?? '',
    stem: item.title,
    options: answers.map((answer) => ({
      text: answer.text,
      correct: answer.label === data.correctAnswer,
      rationale: answer.explanation,
    })),
    explanation: item.fields.Explanation?.trim() || correctExplanation,
    libraryRefs: data.libraryIds.map((id) => ({ id, title: titlesById.get(id) ?? id })),
    resourceRefs: data.resourceIds.map((id) => titlesById.get(id) ?? id),
    attachedImage: data.attachedImage.trim() || undefined,
    attachments: (data.attachments ?? []).map((attachment) => ({ ...attachment })),
    learningObjective: data.learningObjective.trim() || undefined,
    // `contextualConceptIds` is deliberately absent: those are mentioned by the
    // vignette but never assessed, so surfacing them would send a student to
    // revise something this question did not measure.
    conceptIds: [...new Set([...(data.tags.mainConceptIds ?? []), ...data.tags.conceptIds])],
    source: data.tags.sourceCategory,
  }
}

/**
 * The same inclusion rule as `managedQuestionToStudentQuestion` (question kind,
 * publishable, has real data, at least two answers, a correct one among them),
 * but stops there: no options/rationale array, no explanation, no cross-catalogue
 * title lookups for library/resource refs, no attachments. Everything a hub
 * needs to count and group questions — id, subject, topic, difficulty,
 * vignette/stem text, source, concept and library *ids* — is cheap to read
 * straight off the authoring record, so this is O(1) per item instead of
 * `managedQuestionToStudentQuestion`'s per-item catalogue-wide title map.
 *
 * ponytail: `libraryRefs[].title` is set to the raw id, not the real title —
 * fine for scope/count matching (which only reads `.id`), wrong to render.
 * Anything that needs the real title (starting a test) is rebuilt from
 * `publishedQuestionsForAudience` first — see `useScopedPublishedQuestions`'s
 * `enabled` gate.
 */
function managedQuestionToSummary(item: ManagedContentItem): Question | null {
  if (item.kind !== 'question' || !isStudentPublishable(item) || !item.questionData) return null

  const data = item.questionData
  const answers = data.answers.filter((answer) => answer.text.trim())
  if (answers.length < 2 || !answers.some((answer) => answer.label === data.correctAnswer)) return null

  return {
    id: item.id,
    subjectId: item.subjectId,
    topic: data.tags.topic.trim() || item.fields.Topic?.trim() || 'General',
    difficulty: difficultyFor(item),
    vignette: item.fields.Vignette?.trim() ?? '',
    stem: item.title,
    options: [],
    explanation: '',
    libraryRefs: data.libraryIds.map((id) => ({ id, title: id })),
    resourceRefs: [],
    attachedImage: data.attachedImage.trim() || undefined,
    attachments: [],
    learningObjective: undefined,
    conceptIds: [...new Set([...(data.tags.mainConceptIds ?? []), ...data.tags.conceptIds])],
    source: data.tags.sourceCategory,
  }
}

/** Project the catalogue to lightweight, audience-scoped question descriptors — see `managedQuestionToSummary`. */
export function publishedQuestionSummariesForAudience(
  catalogue: ManagedContentItem[],
  audience: { universityId?: string; yearId?: string },
): Question[] {
  const { universityId, yearId } = audience
  return catalogue
    .map((item) => (questionInAudience(item, universityId, yearId) ? managedQuestionToSummary(item) : null))
    .filter((question): question is Question => question !== null)
}

export function publishedQuestionsFromCatalogue(catalogue: ManagedContentItem[]): Question[] {
  return catalogue
    .map((item) => managedQuestionToStudentQuestion(item, catalogue))
    .filter((question): question is Question => question !== null)
}

/** Project the catalogue to the questions a student in this audience may sit. */
export function publishedQuestionsForAudience(
  catalogue: ManagedContentItem[],
  audience: { universityId?: string; yearId?: string },
): Question[] {
  const { universityId, yearId } = audience
  return catalogue
    .map((item) =>
      questionInAudience(item, universityId, yearId) ? managedQuestionToStudentQuestion(item, catalogue) : null,
    )
    .filter((question): question is Question => question !== null)
}

/** Published admin content is the single source of truth for every student question surface. */
export function usePublishedQuestions() {
  const [catalogue] = usePersistentState<ManagedContentItem[]>(CONTENT_LEDGER_STORAGE_KEY, initialManagedContent)
  return useMemo(() => publishedQuestionsFromCatalogue(catalogue), [catalogue])
}

/** Stable empty array so a disabled `useScopedPublishedQuestions` doesn't hand out a new `[]` reference every render. */
const EMPTY_QUESTIONS: Question[] = []

/**
 * The published questions this student may sit, scoped to their university and
 * year. Every student-facing question surface (the Question Bank, Adaptive
 * Study) must use an audience gate so a Helwan question never reaches a Kasr
 * student; the unscoped `usePublishedQuestions` is for admin and cross-cohort
 * surfaces (question-of-the-day pinning, rooms) that deliberately see the whole
 * bank.
 *
 * `enabled` (default `true`, so every existing caller is unchanged) defers the
 * actual per-question build: pass `false` while a caller only needs the
 * lightweight `useScopedPublishedQuestionSummaries` below, and flip it on the
 * moment the real, fully-built questions are needed (e.g. the Question Bank
 * starting a test).
 */
export function useScopedPublishedQuestions(enabled = true) {
  const [catalogue] = usePersistentState<ManagedContentItem[]>(CONTENT_LEDGER_STORAGE_KEY, initialManagedContent)
  const { audience } = useIdentity()
  const { universityId, yearId } = audience
  return useMemo(
    () => (enabled ? publishedQuestionsForAudience(catalogue, { universityId, yearId }) : EMPTY_QUESTIONS),
    [enabled, catalogue, universityId, yearId],
  )
}

/**
 * The counts-only sibling of `useScopedPublishedQuestions`: same audience
 * scoping and inclusion rule, but skips the heavy per-question build (see
 * `managedQuestionToSummary`). This is what the Question Bank hub should
 * mount with — counts, source cards and presets only need these fields, not
 * options/explanations/attachments.
 */
export function useScopedPublishedQuestionSummaries() {
  const [catalogue] = usePersistentState<ManagedContentItem[]>(CONTENT_LEDGER_STORAGE_KEY, initialManagedContent)
  const { audience } = useIdentity()
  const { universityId, yearId } = audience
  return useMemo(
    () => publishedQuestionSummariesForAudience(catalogue, { universityId, yearId }),
    [catalogue, universityId, yearId],
  )
}
