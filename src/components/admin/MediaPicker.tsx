import { useId, useMemo, useRef, useState } from 'react'
import { FileAudio, FileVideo, ImagePlus, Search, Upload } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Field, SearchInput, TextInput } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { Panel } from '@/components/ui/Panel'
import { PlacedImage } from '@/components/ui/PlacedMedia'
import { usePersistentState } from '@/lib/usePersistentState'
import { useIdentity } from '@/lib/useIdentity'
import { uploadMedia } from '@/lib/mediaUpload'
import { apiDelete } from '@/lib/api'
import {
  MEDIA_STATE_KEY, emptyMediaLibrary, mediaReleaseBlockers, mediaTypeOf,
  type ManagedMediaType, type MediaLibraryDocument, type MediaRecord,
} from '@/data/mediaLibrary'

const ACCEPT: Record<ManagedMediaType, string> = {
  image: 'image/png,image/jpeg,image/gif,image/webp',
  audio: 'audio/mpeg,audio/wav,audio/ogg,audio/mp4,.mp3,.wav,.ogg,.m4a',
  video: 'video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov,.m4v',
}

const MEDIUM_ICON = { image: ImagePlus, audio: FileAudio, video: FileVideo }
const IMAGE_MAX_BYTES = 100 * 1024 * 1024

/**
 * Choose an image: one already in the library, or a new one.
 *
 * The library is deliberately not narrowed by reviewer scope. Restricting it
 * would fight the reason it exists — an upper limb plate is equally useful to a
 * Year 2 and a Year 4 reviewer, and forcing the second to re-upload recreates
 * the duplication this replaces. Seeing an image grants nothing on its own;
 * *placing* one edits a question, and that write is already refused out of
 * scope by the server.
 */
export function MediaPicker({ onPick, onCancel, medium = 'image' }: {
  onPick: (mediaId: string, record: MediaRecord) => void
  onCancel?: () => void
  medium?: ManagedMediaType
}) {
  const [library, setLibrary] = usePersistentState<MediaLibraryDocument>(MEDIA_STATE_KEY, emptyMediaLibrary)
  const identity = useIdentity()
  const [query, setQuery] = useState('')
  const [busy, setBusy] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const [pending, setPending] = useState<{
    id: string
    measured: Pick<MediaRecord, 'storageKey' | 'sha256' | 'mimeType' | 'sizeBytes' | 'mediaType' | 'width' | 'height' | 'durationSeconds'>
    title: string
    altText: string
    rights: string
  } | null>(null)
  const [duplicate, setDuplicate] = useState<MediaRecord | null>(null)
  const fileInput = useRef<HTMLInputElement>(null)
  const fieldId = useId()

  const records = useMemo(() => library.records ?? [], [library.records])
  const matches = useMemo(() => {
    const q = query.trim().toLowerCase()
    const rightMedium = records.filter((record) => mediaTypeOf(record) === medium && mediaReleaseBlockers(record).length === 0)
    if (!q) return rightMedium.slice(0, 24)
    return rightMedium.filter((record) => `${record.title} ${record.altText}`.toLowerCase().includes(q)).slice(0, 24)
  }, [medium, query, records])

  async function choose(file: File) {
    setBusy(true)
    setProgress(0)
    setError('')
    setDuplicate(null)
    try {
      if (medium === 'image' && file.size > IMAGE_MAX_BYTES) {
        throw new Error('Images may be up to 100 MB. Large video and audio files may be up to 2 GB.')
      }
      const { id, measured, alreadyStored } = await uploadMedia(file, setProgress)
      if (measured.mediaType !== medium) {
        if (!alreadyStored) await apiDelete(`/media/${encodeURIComponent(id)}`).catch(() => undefined)
        throw new Error(`That file contains ${measured.mediaType}, but this request needs ${medium}.`)
      }
      // These exact bytes are already here. Offer what already describes them
      // rather than starting a second description of the same picture.
      const twin = alreadyStored ? records.find((record) => record.sha256 === measured.sha256) : undefined
      if (twin) {
        setDuplicate(twin)
        return
      }
      setPending({ id, measured, title: file.name.replace(/\.[^.]+$/, ''), altText: '', rights: '' })
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'That file could not be uploaded.')
    } finally {
      setBusy(false)
      setProgress(0)
    }
  }

  function commit() {
    if (!pending) return
    const record: MediaRecord = {
      id: pending.id,
      ...pending.measured,
      title: pending.title.trim(),
      altText: pending.altText.trim(),
      rights: pending.rights.trim(),
      tags: { moduleIds: [], moduleSubjectPaths: [], conceptIds: [], yearIds: [] },
      uploadedBy: identity.userId ?? 'unknown',
      uploadedAt: new Date().toISOString(),
    }
    setLibrary((current) => ({ ...current, records: [record, ...(current.records ?? [])] }))
    setPending(null)
    onPick(record.id, record)
  }

  async function discardPending() {
    if (!pending) return
    const id = pending.id
    setPending(null)
    try {
      await apiDelete(`/media/${encodeURIComponent(id)}`)
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'The unused upload could not be discarded.')
    }
  }

  const blockers = pending
    ? mediaReleaseBlockers({ ...pending.measured, title: pending.title, altText: pending.altText, rights: pending.rights })
    : []

  return (
    <Panel className="p-3">
      {!pending && (
        <>
          <label className="flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-primary-line bg-primary-tint/25 px-3 text-[12.5px] font-semibold text-primary-strong shadow-sm transition-[background-color,border-color] hover:bg-primary-tint/50 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary active:scale-[0.96]">
            <Icon icon={busy ? Upload : MEDIUM_ICON[medium]} size={15} />
            <span role={busy ? 'status' : undefined} aria-live={busy ? 'polite' : undefined}>
              {busy ? `Uploading ${medium}… ${Math.round(progress * 100)}%` : `Upload ${medium}`}
            </span>
            <input
              ref={fileInput}
              type="file"
              accept={ACCEPT[medium]}
              className="sr-only"
              disabled={busy}
              onChange={(event) => {
                const file = event.currentTarget.files?.[0]
                event.currentTarget.value = ''
                if (file) void choose(file)
              }}
            />
          </label>

          <p className="mt-1.5 text-center text-[10.5px] leading-relaxed text-ink-3">
            {medium === 'video' ? 'MP4, WebM or MOV · large files upload in safe chunks up to 2 GB'
              : medium === 'audio' ? 'MP3, M4A, WAV or OGG · large files upload in safe chunks up to 2 GB'
                : 'PNG, JPEG, GIF or WebP · up to 100 MB'}
          </p>

          {error && <p role="alert" className="mt-2 text-[11.5px] text-danger">{error}</p>}

          {duplicate && (
            <div className="mt-3 rounded-lg border border-primary-line bg-primary-tint/30 p-3">
              <p className="text-[12.5px] font-semibold text-ink">This exact {medium} is already in the library as “{duplicate.title}”.</p>
              <p className="mt-0.5 text-[11.5px] leading-relaxed text-ink-2">Using it keeps one record, so fixing it later fixes it everywhere.</p>
              <div className="mt-2 flex gap-2">
                <Button size="sm" variant="primary" disabled={mediaReleaseBlockers(duplicate).length > 0} onClick={() => { setDuplicate(null); onPick(duplicate.id, duplicate) }}>Use that one</Button>
                <Button size="sm" variant="ghost" onClick={() => setDuplicate(null)}>Cancel</Button>
              </div>
              {mediaReleaseBlockers(duplicate).length > 0 && <p className="mt-2 text-[11.5px] text-warning">Complete its accessibility and rights details in Resources &amp; Media before using it.</p>}
            </div>
          )}

          <div className="mt-3">
            <SearchInput aria-label={`Search released ${medium} media`} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the media library" />
          </div>
          {matches.length === 0 ? (
            <p className="mt-3 flex items-center gap-1.5 text-[11.5px] text-ink-3">
              <Icon icon={Search} size={13} />
              {records.length ? `No ${medium} matches that.` : `The library is empty. Upload the first ${medium}.`}
            </p>
          ) : (
            <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {matches.map((record) => (
                <li key={record.id}>
                  <button type="button" onClick={() => onPick(record.id, record)} className="w-full rounded-lg border border-line p-1 text-start transition-[background-color,border-color] hover:border-primary-line hover:bg-primary-tint/20 active:scale-[0.96]">
                    {medium === 'image'
                      ? <PlacedImage record={record} className="max-h-24 w-full rounded object-contain" />
                      : <span className="grid h-20 place-items-center rounded bg-inset"><Icon icon={MEDIUM_ICON[medium]} size={24} className="text-primary" /></span>}
                    <span className="mt-1 block truncate px-1 pb-1 text-[11px] text-ink-2">{record.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
          {onCancel && <Button className="mt-3" size="sm" variant="ghost" onClick={onCancel}>Cancel</Button>}
        </>
      )}

      {pending && (
        <div className="space-y-3">
          <p className="text-[12.5px] font-semibold text-ink">
            Stored — {medium === 'image'
              ? `${pending.measured.width}×${pending.measured.height}`
              : pending.measured.durationSeconds
                ? `${Math.round(pending.measured.durationSeconds)} seconds`
                : pending.measured.mimeType}. Describe it before it can reach a student.
          </p>
          <Field label="Title" htmlFor={`${fieldId}-title`} hint="What it is, in the picker">
            <TextInput id={`${fieldId}-title`} value={pending.title} onChange={(event) => setPending({ ...pending, title: event.target.value })} />
          </Field>
          <Field label={medium === 'image' ? 'Alt text' : 'Accessibility description or transcript'} htmlFor={`${fieldId}-description`} hint="What a student who cannot access the media needs to know">
            <TextInput id={`${fieldId}-description`} value={pending.altText} onChange={(event) => setPending({ ...pending, altText: event.target.value })} />
          </Field>
          <Field label="Rights" htmlFor={`${fieldId}-rights`} hint="Where it came from, and on what licence">
            <TextInput id={`${fieldId}-rights`} value={pending.rights} onChange={(event) => setPending({ ...pending, rights: event.target.value })} />
          </Field>
          {blockers.length > 0 && (
            <p className="text-[11.5px] leading-relaxed text-ink-2">
              Held back from students until it has {blockers.join(' and ')}.
            </p>
          )}
          <div className="flex gap-2">
            <Button size="sm" variant="primary" disabled={blockers.length > 0} onClick={commit}>Add to the library</Button>
            <Button size="sm" variant="ghost" onClick={() => void discardPending()}>Discard</Button>
          </div>
        </div>
      )}
    </Panel>
  )
}
