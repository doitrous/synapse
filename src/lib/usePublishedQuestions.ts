import { useMemo } from 'react'
import { isStudentPublishable, type ManagedContentItem } from '@/data/contentControl'
import { DIFFICULTIES, type Difficulty, type Question } from '@/data/qbank'
import { useScopedQuestions, type QuestionScope } from './content'
import { useIdentity } from './useIdentity'
import { questionInAudience } from './questionAudience'

function difficultyFor(item: ManagedContentItem): Difficulty {
  const value = item.questionData?.tags.intendedDifficulty ?? item.fields.Difficulty
  return DIFFICULTIES.includes(value as Difficulty) ? value as Difficulty : 'Moderate'
}

/**
 * The module ids a question is tagged for: its own `moduleIds`, plus the module
 * named at the head of each `module > subject > topic` path. Same union the
 * server's `itemModules` takes, so the chooser groups by the authored module.
 */
function questionModuleIds(tags: { moduleIds?: string[]; moduleSubjectPaths?: string[] }): string[] {
  const fromPaths = (tags.moduleSubjectPaths ?? [])
    .map((path) => path.split('>')[0]?.trim())
    .filter((module): module is string => Boolean(module))
  return [...new Set([...(tags.moduleIds ?? []), ...fromPaths])]
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
    moduleIds: questionModuleIds(data.tags),
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
  // A record with no `answers` at all came from `/content/questions?view=summary`,
  // where the server strips them *after* applying this exact rule
  // (`isAnswerableQuestion`). A record that has them is re-checked here, which
  // is every record in the demo build and every one that still carries a key.
  const answers = (data.answers ?? []).filter((answer) => answer.text.trim())
  if (data.answers && (answers.length < 2 || !answers.some((answer) => answer.label === data.correctAnswer))) return null

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
    moduleIds: questionModuleIds(data.tags),
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

/**
 * Published admin content is the single source of truth for every student
 * question surface.
 *
 * The catalogue is `/api/content/questions`, not the admin ledger: the same
 * answerable-question rule applied server-side, plus `{ id, title }` stubs for
 * the library and resource ids the projection resolves to titles. A student's
 * own cohort is applied there too, so "unscoped" here means "not narrowed
 * further by this client", never "every university's bank".
 */
export function usePublishedQuestions() {
  const [catalogue] = useScopedQuestions()
  return useMemo(() => publishedQuestionsFromCatalogue(catalogue), [catalogue])
}

/** The one scope object every unscoped caller shares, so the memo below has a stable key. */
const WHOLE_BANK: QuestionScope = {}
const SUMMARY_SCOPE: QuestionScope = { view: 'summary' }

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
 * `enabled` (default `true`, so every existing caller is unchanged) gates the
 * **request** as well as the build. Full questions carry every option,
 * rationale and explanation and are the largest thing a student can download,
 * so a surface that only needs `useScopedPublishedQuestionSummaries` below
 * must not ask for them at all — flip this on the moment they are really
 * needed (the Question Bank starting a test), and narrow `scope` to what that
 * test actually covers so the answer is a slice rather than the whole bank.
 */
export function useScopedPublishedQuestions(enabled = true, scope: QuestionScope = WHOLE_BANK) {
  const [catalogue] = useScopedQuestions(scope, { enabled })
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
 *
 * A different *document*, not a cheaper read of the same one: `view=summary`
 * is its own request under its own cache key, and the server sends no answers,
 * rationales or explanations at all. Roughly a quarter of the bytes the full
 * questions weigh, and none of them are bytes a student could answer from.
 */
export function useScopedPublishedQuestionSummaries() {
  const [catalogue] = useScopedQuestions(SUMMARY_SCOPE)
  const { audience } = useIdentity()
  const { universityId, yearId } = audience
  return useMemo(
    () => publishedQuestionSummariesForAudience(catalogue, { universityId, yearId }),
    [catalogue, universityId, yearId],
  )
}
