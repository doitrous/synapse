import { useMemo } from 'react'
import { type ManagedContentItem } from '@/data/contentControl'
import {
  managedMatchingToStudentMatching, managedWrittenToStudentWritten, type WrittenQuestion,
} from '@/data/writtenQuestion'
import type { MatchingQuestionView } from '@/data/matchingQuestion'
import { managedMultiToStudentMulti, type MultiResponseQuestionView } from '@/data/multiResponseQuestion'
import { managedLabelingToStudentLabeling, type LabelingQuestionView } from '@/data/labelingQuestion'
import { managedCompletionToStudentCompletion, type CompletionQuestionView } from '@/data/completionQuestion'
import { WRITTEN_FORMATS } from '@/data/questionFormat'
import { useScopedQuestions } from './content'

/**
 * These surfaces read question *formats*, not a kind, so they ask the questions
 * route for the one format each projection accepts rather than filtering a
 * catalogue. `written` is five authoring formats — the route takes one, so the
 * client asks for each and the responses are concatenated (and cached) as one.
 */
const WRITTEN_SCOPE = { formats: WRITTEN_FORMATS }

export function publishedWrittenFromCatalogue(catalogue: ManagedContentItem[]): WrittenQuestion[] {
  return catalogue
    .map((item) => managedWrittenToStudentWritten(item))
    .filter((question): question is WrittenQuestion => question !== null)
}

/**
 * Every published written exam question.
 *
 * Separate from `useLiveEssays` because these are separate things: an essay is
 * authored here as a teaching exercise, while these are the written half of a
 * faculty paper, carrying that paper's parts and marks. They share a runner
 * shape and nothing else.
 */
export function useLiveWrittenQuestions() {
  const [catalogue] = useScopedQuestions(WRITTEN_SCOPE)
  return useMemo(() => publishedWrittenFromCatalogue(catalogue), [catalogue])
}

export function publishedMatchingFromCatalogue(catalogue: ManagedContentItem[]): MatchingQuestionView[] {
  return catalogue
    .map((item) => managedMatchingToStudentMatching(item))
    .filter((question): question is MatchingQuestionView => question !== null)
}

/** Every published matching question. */
export function useLiveMatchingQuestions() {
  const [catalogue] = useScopedQuestions({ format: 'matching' })
  return useMemo(() => publishedMatchingFromCatalogue(catalogue), [catalogue])
}

/** Every published multiple-response question. */
export function useLiveMultiResponseQuestions() {
  const [catalogue] = useScopedQuestions({ format: 'mcq_multi' })
  return useMemo(
    () => catalogue.map(managedMultiToStudentMulti)
      .filter((q): q is MultiResponseQuestionView => q !== null),
    [catalogue],
  )
}

/** Every published labelling question. */
export function useLiveLabelingQuestions() {
  const [catalogue] = useScopedQuestions({ format: 'labeling' })
  return useMemo(
    () => catalogue.map(managedLabelingToStudentLabeling)
      .filter((q): q is LabelingQuestionView => q !== null),
    [catalogue],
  )
}

/** Every published completion question. */
export function useLiveCompletionQuestions() {
  const [catalogue] = useScopedQuestions({ format: 'completion' })
  return useMemo(
    () => catalogue.map(managedCompletionToStudentCompletion)
      .filter((q): q is CompletionQuestionView => q !== null),
    [catalogue],
  )
}
