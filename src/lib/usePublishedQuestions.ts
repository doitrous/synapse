import { useMemo } from 'react'
import type { Question } from '@/data/qbank'
import { publishedQuestionsFromCatalogue, publishedQuestionsForAudience, publishedQuestionSummariesForAudience, publishedQuestionSummariesFromCatalogue } from '@/data/questionProjection'
export { managedQuestionToStudentQuestion, publishedQuestionsFromCatalogue, publishedQuestionsForAudience, publishedQuestionSummariesForAudience, publishedQuestionSummariesFromCatalogue } from '@/data/questionProjection'
import { useScopedQuestions, type QuestionScope } from './content'
import { useIdentity } from './useIdentity'

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

/** Room invitations and challenge setup need ids and topics, never answer bodies. */
export function usePublishedQuestionSummaries() {
  const [catalogue] = useScopedQuestions(SUMMARY_SCOPE)
  return useMemo(() => publishedQuestionSummariesFromCatalogue(catalogue), [catalogue])
}
