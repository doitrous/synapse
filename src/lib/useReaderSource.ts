import { useMemo } from 'react'
import { useLiveResources } from './useLiveResources'
import { useMyDocuments } from './useMyDocuments'
import { annotationScope } from './reader/annotationKey'

/**
 * What the reader is reading, wherever it came from.
 *
 * A catalogue resource and a student's own upload differ in exactly two ways:
 * where the bytes are fetched from, and which scope their marks are filed
 * under. Both are resolved here, so the reader, the toolbar and the whole
 * annotation model carry no branch at all — an uploaded handout gets the
 * identical editor because it is the identical editor.
 *
 * Uploads are addressed as `my:<id>` in the same route as everything else, so
 * `/app/resources/:id` keeps working and a bookmark to either kind survives.
 */

const UPLOAD_PREFIX = 'my:'

export interface ReaderSource {
  found: boolean
  title: string
  /** True once a file exists to open. */
  hasFile: boolean
  /** Where `usePdfDocument` fetches the bytes, or null in demo mode. */
  filePath: string | null
  /** An IndexedDB reference, when the file never left this browser. */
  localRef: string | null
  /** The key prefix the student's marks on this document are filed under. */
  scope: string
  /** For the "back to resources" trail and recent-documents logging. */
  type: string
  subjectId: string
  meta: string
  loading: boolean
}

export function isUploadId(routeId: string): boolean {
  return routeId.startsWith(UPLOAD_PREFIX)
}

export function uploadRouteId(documentId: string): string {
  return `${UPLOAD_PREFIX}${documentId}`
}

export function useReaderSource(routeId: string): ReaderSource {
  const resources = useLiveResources()
  const mine = useMyDocuments()

  return useMemo(() => {
    if (isUploadId(routeId)) {
      const id = routeId.slice(UPLOAD_PREFIX.length)
      // A non-PDF upload has no reader. Treating it as missing is honest: the
      // file exists on the account, but not as something this screen can show.
      const document = mine.items.find((item) => item.id === id && item.mediaType === 'pdf')
      if (!document) {
        return { ...MISSING, loading: mine.loading }
      }
      return {
        found: true,
        title: document.title,
        hasFile: true,
        filePath: document.ref ? null : `/my-documents/${encodeURIComponent(id)}/file`,
        localRef: document.ref ?? null,
        scope: annotationScope('document', id),
        type: 'Book',
        subjectId: '',
        meta: '',
        loading: false,
      }
    }

    const resource = resources.find((item) => item.id === routeId)
    if (!resource) return { ...MISSING, loading: false }
    return {
      found: true,
      title: resource.title,
      hasFile: Boolean(resource.hasFile),
      filePath: `/medical-resources/${encodeURIComponent(resource.id)}`,
      localRef: null,
      scope: annotationScope('resource', resource.id),
      type: resource.type,
      subjectId: resource.subjectId,
      meta: resource.meta ?? '',
      loading: false,
    }
  }, [mine.items, mine.loading, resources, routeId])
}

const MISSING: ReaderSource = {
  found: false, title: '', hasFile: false, filePath: null, localRef: null,
  scope: '', type: '', subjectId: '', meta: '', loading: false,
}
