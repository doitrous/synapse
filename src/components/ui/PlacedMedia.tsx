import { useEffect, useState } from 'react'
import { ZoomableImage } from '@/components/ui/MediaAttachmentView'
import { mediaUrl, type MediaPlacement, type MediaRecord } from '@/data/mediaLibrary'
import { apiFetchFile } from '@/lib/api'

/**
 * Whether these bytes actually begin like an image.
 *
 * The server identifies an upload from its own content and refuses anything
 * else; this is the reading half of that stance. Without it, anything answering
 * 200 — an SPA index page, a proxy's error page, a sign-in redirect — becomes a
 * Blob labelled `image/png` and renders as a broken picture with no
 * explanation. A broken image tells the reviewer nothing; a sentence does.
 */
function looksLikeImage(bytes: ArrayBuffer): boolean {
  const head = new Uint8Array(bytes.slice(0, 12))
  if (head.length < 12) return false
  const starts = (...signature: number[]) => signature.every((byte, index) => head[index] === byte)
  const ascii = (offset: number, text: string) =>
    [...text].every((character, index) => head[offset + index] === character.charCodeAt(0))
  return (
    starts(0x89, 0x50, 0x4e, 0x47)          // PNG
    || starts(0xff, 0xd8, 0xff)             // JPEG
    || ascii(0, 'GIF8')                     // GIF
    || (ascii(0, 'RIFF') && ascii(8, 'WEBP'))
  )
}

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
        if (!looksLikeImage(bytes)) {
          setError('The server did not return an image for this record. It may not have finished uploading.')
          return
        }
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
