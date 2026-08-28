import { useMemo } from 'react'
import {
  CONTENT_LEDGER_STORAGE_KEY,
  initialManagedContent,
  isStudentPublishable,
  type ManagedContentItem,
} from '@/data/contentControl'
import { managedSlideToStudentSlide, type HistologySlide } from '@/data/histology'
import { usePersistentState } from './usePersistentState'

export function publishedSlidesFromCatalogue(catalogue: ManagedContentItem[]): HistologySlide[] {
  return catalogue
    .filter(isStudentPublishable)
    .map(managedSlideToStudentSlide)
    .filter((slide): slide is HistologySlide => slide !== null)
}

/** Published admin content is the single source of truth for every student slide surface. */
export function useLiveHistology(): { slides: HistologySlide[] } {
  const [ledger] = usePersistentState<ManagedContentItem[]>(CONTENT_LEDGER_STORAGE_KEY, initialManagedContent)
  const slides = useMemo(() => publishedSlidesFromCatalogue(ledger), [ledger])
  return { slides }
}
