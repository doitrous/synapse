import { useMemo } from 'react'
import { type ManagedContentItem } from '@/data/contentControl'
import { managedEssayToStudentEssay, type EssayQuestion } from '@/data/essay'
import { useContentSlice } from './content'

export function publishedEssaysFromCatalogue(catalogue: ManagedContentItem[]): EssayQuestion[] {
  return catalogue
    .map((item) => managedEssayToStudentEssay(item))
    .filter((essay): essay is EssayQuestion => essay !== null)
}

/**
 * Published admin content is the single source of truth for every student essay surface.
 *
 * Returns the slice's own load `status` alongside the items so a surface that
 * shows essays next to other formats can gate each on its own source rather than
 * AND-ing them behind the slowest — see `EssayQuestions`.
 */
export function useLiveEssays() {
  const [catalogue, status] = useContentSlice('essay')
  const items = useMemo(() => publishedEssaysFromCatalogue(catalogue), [catalogue])
  return { items, status }
}

/**
 * The counts-only sibling of `useLiveEssays`: same inclusion rule and the same
 * projection, but reads the `view=summary` slice — no prompt, examiner's note
 * or model answer. `usePracticeProgress` only ever reads `.length` and each
 * essay's key-point ids, never a body, so this is what it should mount with.
 */
export function useLiveEssaysSummary() {
  const [catalogue] = useContentSlice('essay', { view: 'summary' })
  return useMemo(() => publishedEssaysFromCatalogue(catalogue), [catalogue])
}
