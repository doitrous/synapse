import { useMemo } from 'react'
import {
  CONTENT_LEDGER_STORAGE_KEY,
  initialManagedContent,
  type ManagedContentItem,
} from '@/data/contentControl'
import {
  managedMatchingToStudentMatching, managedWrittenToStudentWritten, type WrittenQuestion,
} from '@/data/writtenQuestion'
import type { MatchingQuestionView } from '@/data/matchingQuestion'
import { managedMultiToStudentMulti, type MultiResponseQuestionView } from '@/data/multiResponseQuestion'
import { managedLabelingToStudentLabeling, type LabelingQuestionView } from '@/data/labelingQuestion'
import { usePersistentState } from './usePersistentState'

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
  const [catalogue] = usePersistentState<ManagedContentItem[]>(CONTENT_LEDGER_STORAGE_KEY, initialManagedContent)
  return useMemo(() => publishedWrittenFromCatalogue(catalogue), [catalogue])
}

export function publishedMatchingFromCatalogue(catalogue: ManagedContentItem[]): MatchingQuestionView[] {
  return catalogue
    .map((item) => managedMatchingToStudentMatching(item))
    .filter((question): question is MatchingQuestionView => question !== null)
}

/** Every published matching question. */
export function useLiveMatchingQuestions() {
  const [catalogue] = usePersistentState<ManagedContentItem[]>(CONTENT_LEDGER_STORAGE_KEY, initialManagedContent)
  return useMemo(() => publishedMatchingFromCatalogue(catalogue), [catalogue])
}

/** Every published multiple-response question. */
export function useLiveMultiResponseQuestions() {
  const [catalogue] = usePersistentState<ManagedContentItem[]>(CONTENT_LEDGER_STORAGE_KEY, initialManagedContent)
  return useMemo(
    () => catalogue.map(managedMultiToStudentMulti)
      .filter((q): q is MultiResponseQuestionView => q !== null),
    [catalogue],
  )
}

/** Every published labelling question. */
export function useLiveLabelingQuestions() {
  const [catalogue] = usePersistentState<ManagedContentItem[]>(CONTENT_LEDGER_STORAGE_KEY, initialManagedContent)
  return useMemo(
    () => catalogue.map(managedLabelingToStudentLabeling)
      .filter((q): q is LabelingQuestionView => q !== null),
    [catalogue],
  )
}
