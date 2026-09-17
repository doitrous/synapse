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
  const [catalogue, status] = useScopedQuestions(WRITTEN_SCOPE)
  const items = useMemo(() => publishedWrittenFromCatalogue(catalogue), [catalogue])
  return { items, status }
}

export function publishedMatchingFromCatalogue(catalogue: ManagedContentItem[]): MatchingQuestionView[] {
  return catalogue
    .map((item) => managedMatchingToStudentMatching(item))
    .filter((question): question is MatchingQuestionView => question !== null)
}

/** Every published matching question. */
export function useLiveMatchingQuestions() {
  const [catalogue, status] = useScopedQuestions({ format: 'matching' })
  const items = useMemo(() => publishedMatchingFromCatalogue(catalogue), [catalogue])
  return { items, status }
}

/** Every published multiple-response question. */
export function useLiveMultiResponseQuestions() {
  const [catalogue, status] = useScopedQuestions({ format: 'mcq_multi' })
  const items = useMemo(
    () => catalogue.map(managedMultiToStudentMulti)
      .filter((q): q is MultiResponseQuestionView => q !== null),
    [catalogue],
  )
  return { items, status }
}

/** Every published labelling question. */
export function useLiveLabelingQuestions() {
  const [catalogue, status] = useScopedQuestions({ format: 'labeling' })
  const items = useMemo(
    () => catalogue.map(managedLabelingToStudentLabeling)
      .filter((q): q is LabelingQuestionView => q !== null),
    [catalogue],
  )
  return { items, status }
}

/** Every published completion question. */
export function useLiveCompletionQuestions() {
  const [catalogue, status] = useScopedQuestions({ format: 'completion' })
  const items = useMemo(
    () => catalogue.map(managedCompletionToStudentCompletion)
      .filter((q): q is CompletionQuestionView => q !== null),
    [catalogue],
  )
  return { items, status }
}
