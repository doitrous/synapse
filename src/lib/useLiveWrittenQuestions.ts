import { useMemo } from 'react'
import {
  CONTENT_LEDGER_STORAGE_KEY,
  initialManagedContent,
  type ManagedContentItem,
} from '@/data/contentControl'
import { managedWrittenToStudentWritten, type WrittenQuestion } from '@/data/writtenQuestion'
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
