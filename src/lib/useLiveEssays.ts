import { useMemo } from 'react'
import { type ManagedContentItem } from '@/data/contentControl'
import { managedEssayToStudentEssay, type EssayQuestion } from '@/data/essay'
import { useContentSlice } from './content'

export function publishedEssaysFromCatalogue(catalogue: ManagedContentItem[]): EssayQuestion[] {
  return catalogue
    .map((item) => managedEssayToStudentEssay(item))
    .filter((essay): essay is EssayQuestion => essay !== null)
}

/** Published admin content is the single source of truth for every student essay surface. */
export function useLiveEssays() {
  const [catalogue] = useContentSlice('essay')
  return useMemo(() => publishedEssaysFromCatalogue(catalogue), [catalogue])
}
