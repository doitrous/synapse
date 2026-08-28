import { useMemo } from 'react'
import { usePersistentState } from './usePersistentState'
import { MEDIA_STATE_KEY, emptyMediaLibrary, type MediaLibraryDocument, type MediaRecord } from '@/data/mediaLibrary'

/**
 * Every media record, by id.
 *
 * One document, read by every surface that renders media. The bytes are a
 * separate request per image; this carries only what is needed to render one —
 * its alt text, its type and its size.
 */
export function useMediaRecords(): Map<string, MediaRecord> {
  const [document] = usePersistentState<MediaLibraryDocument>(MEDIA_STATE_KEY, emptyMediaLibrary)
  return useMemo(() => new Map((document.records ?? []).map((record) => [record.id, record])), [document])
}
