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
import type { PersistentStateStatus } from './stateStore'
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
export function useLiveWrittenQuestionsWithStatus(): readonly [WrittenQuestion[], PersistentStateStatus] {
  const [catalogue, status] = useScopedQuestions(WRITTEN_SCOPE)
  return [useMemo(() => publishedWrittenFromCatalogue(catalogue), [catalogue]), status]
}

export function useLiveWrittenQuestions() {
  return useLiveWrittenQuestionsWithStatus()[0]
}

export function publishedMatchingFromCatalogue(catalogue: ManagedContentItem[]): MatchingQuestionView[] {
  return catalogue
    .map((item) => managedMatchingToStudentMatching(item))
    .filter((question): question is MatchingQuestionView => question !== null)
}

export function useLiveMatchingQuestionsWithStatus(): readonly [MatchingQuestionView[], PersistentStateStatus] {
  const [catalogue, status] = useScopedQuestions({ format: 'matching' })
  return [useMemo(() => publishedMatchingFromCatalogue(catalogue), [catalogue]), status]
}

/** Every published matching question. */
export function useLiveMatchingQuestions() {
  return useLiveMatchingQuestionsWithStatus()[0]
}

export function useLiveMultiResponseQuestionsWithStatus(): readonly [MultiResponseQuestionView[], PersistentStateStatus] {
  const [catalogue, status] = useScopedQuestions({ format: 'mcq_multi' })
  return [useMemo(
    () => catalogue.map(managedMultiToStudentMulti)
      .filter((q): q is MultiResponseQuestionView => q !== null),
    [catalogue],
  ), status]
}

/** Every published multiple-response question. */
export function useLiveMultiResponseQuestions() {
  return useLiveMultiResponseQuestionsWithStatus()[0]
}

export function useLiveLabelingQuestionsWithStatus(): readonly [LabelingQuestionView[], PersistentStateStatus] {
  const [catalogue, status] = useScopedQuestions({ format: 'labeling' })
  return [useMemo(
    () => catalogue.map(managedLabelingToStudentLabeling)
      .filter((q): q is LabelingQuestionView => q !== null),
    [catalogue],
  ), status]
}

/** Every published labelling question. */
export function useLiveLabelingQuestions() {
  return useLiveLabelingQuestionsWithStatus()[0]
}

export function useLiveCompletionQuestionsWithStatus(): readonly [CompletionQuestionView[], PersistentStateStatus] {
  const [catalogue, status] = useScopedQuestions({ format: 'completion' })
  return [useMemo(
    () => catalogue.map(managedCompletionToStudentCompletion)
      .filter((q): q is CompletionQuestionView => q !== null),
    [catalogue],
  ), status]
}

/** Every published completion question. */
export function useLiveCompletionQuestions() {
  return useLiveCompletionQuestionsWithStatus()[0]
}
