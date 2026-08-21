import { useEffect, useState } from 'react'
import { ZoomableImage } from '@/components/ui/MediaAttachmentView'
import { mediaUrl, type MediaPlacement, type MediaRecord } from '@/data/mediaLibrary'
import { apiFetchFile } from '@/lib/api'

/**
 * One placed image, fetched with the session's credentials.
 *
 * `GET /api/media/:id` is authenticated, and an `<img src>` cannot send a
 * bearer token — it would simply 401 and show a broken image. So the bytes are
 * fetched like any other protected file and handed to the tag as an object URL,
 * which is what `MediaAttachmentView` already does for attachments. Revoked on
 * unmount, or a long session leaks a blob per image it has ever shown.
 */
export function PlacedImage({ record, caption, className }: {
  record: MediaRecord
  caption?: string
  className?: string
}) {
  const [source, setSource] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    let objectUrl = ''
    setError('')
    setSource('')
    apiFetchFile(mediaUrl(record.id))
      .then((bytes) => {
        if (!active) return
        objectUrl = URL.createObjectURL(new Blob([bytes], { type: record.mimeType }))
        setSource(objectUrl)
      })
      .catch((reason: unknown) => {
        if (active) setError(reason instanceof Error ? reason.message : 'This image could not be loaded.')
      })
    return () => {
      active = false
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [record.id, record.mimeType])

  if (error) return <p role="alert" className="px-1 text-[11.5px] text-danger">{error}</p>
  if (!source) return <div className="h-32 animate-pulse rounded-lg bg-inset" aria-hidden />
  return (
    <figure className="mt-2 overflow-hidden rounded-xl border border-line bg-surface-2 p-2">
      <ZoomableImage src={source} alt={record.altText} className={className ?? 'max-h-80 w-full rounded-lg object-contain'} />
      {(caption || record.title) && (
        <figcaption className="mt-1.5 px-1 text-[11.5px] leading-snug text-ink-3">{caption || record.title}</figcaption>
      )}
    </figure>
  )
}

/**
 * Images placed in one slot of an item.
 *
 * Alt text comes from the record rather than the placement: it describes the
 * picture, and the picture does not change between uses. The caption does, so
 * that is per-placement.
 */
export function PlacedMedia({ placements, records, className }: {
  placements: MediaPlacement[]
  records: Map<string, MediaRecord>
  className?: string
}) {
  if (!placements.length) return null
  return (
    <div className={className}>
      {placements.map((placement) => {
        const record = records.get(placement.mediaId)
        return record
          ? <PlacedImage key={placement.id} record={record} caption={placement.caption} />
          : null
      })}
    </div>
  )
}
