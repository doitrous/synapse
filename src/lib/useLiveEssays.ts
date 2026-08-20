import { useMemo } from 'react'
import {
  CONTENT_LEDGER_STORAGE_KEY,
  initialManagedContent,
  type ManagedContentItem,
} from '@/data/contentControl'
import { managedEssayToStudentEssay, type EssayQuestion } from '@/data/essay'
import { usePersistentState } from './usePersistentState'

export function publishedEssaysFromCatalogue(catalogue: ManagedContentItem[]): EssayQuestion[] {
  return catalogue
    .map((item) => managedEssayToStudentEssay(item))
    .filter((essay): essay is EssayQuestion => essay !== null)
}

/** Published admin content is the single source of truth for every student essay surface. */
export function useLiveEssays() {
  const [catalogue] = usePersistentState<ManagedContentItem[]>(CONTENT_LEDGER_STORAGE_KEY, initialManagedContent)
  return useMemo(() => publishedEssaysFromCatalogue(catalogue), [catalogue])
}
