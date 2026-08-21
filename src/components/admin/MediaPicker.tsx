import { useMemo, useRef, useState } from 'react'
import { ImagePlus, Search } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Field, SearchInput, TextInput } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { Panel } from '@/components/ui/Panel'
import { PlacedImage } from '@/components/ui/PlacedMedia'
import { usePersistentState } from '@/lib/usePersistentState'
import { useIdentity } from '@/lib/useIdentity'
import { uploadMedia } from '@/lib/mediaUpload'
import {
  MEDIA_STATE_KEY, emptyMediaLibrary, mediaReleaseBlockers,
  type MediaLibraryDocument, type MediaRecord,
} from '@/data/mediaLibrary'

function newMediaId() {
  return `med-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

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
export function MediaPicker({ onPick, onCancel }: {
  onPick: (mediaId: string) => void
  onCancel?: () => void
}) {
  const [library, setLibrary] = usePersistentState<MediaLibraryDocument>(MEDIA_STATE_KEY, emptyMediaLibrary)
  const identity = useIdentity()
  const [query, setQuery] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [pending, setPending] = useState<{
    measured: MediaRecord extends never ? never : Pick<MediaRecord, 'storageKey' | 'sha256' | 'mimeType' | 'sizeBytes' | 'width' | 'height'>
    title: string
    altText: string
    rights: string
  } | null>(null)
  const [duplicate, setDuplicate] = useState<MediaRecord | null>(null)
  const fileInput = useRef<HTMLInputElement>(null)

  const records = library.records ?? []
  const matches = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return records.slice(0, 24)
    return records.filter((record) => `${record.title} ${record.altText}`.toLowerCase().includes(q)).slice(0, 24)
  }, [query, records])

  async function choose(file: File) {
    setBusy(true)
    setError('')
    setDuplicate(null)
    try {
      const { measured, alreadyStored } = await uploadMedia(file)
      // These exact bytes are already here. Offer what already describes them
      // rather than starting a second description of the same picture.
      const twin = alreadyStored ? records.find((record) => record.sha256 === measured.sha256) : undefined
      if (twin) {
        setDuplicate(twin)
        return
      }
      setPending({ measured, title: file.name.replace(/\.[^.]+$/, ''), altText: '', rights: '' })
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'That file could not be uploaded.')
    } finally {
      setBusy(false)
    }
  }

  function commit() {
    if (!pending) return
    const record: MediaRecord = {
      id: newMediaId(),
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
    onPick(record.id)
  }

  const blockers = pending
    ? mediaReleaseBlockers({ ...pending.measured, title: pending.title, altText: pending.altText, rights: pending.rights })
    : []

  return (
    <Panel className="p-3">
      {!pending && (
        <>
          <label className="flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-line-2 bg-surface-2 px-3 text-[12.5px] font-semibold text-ink-2 hover:border-primary-line hover:bg-primary-tint/35">
            <Icon icon={ImagePlus} size={15} />
            {busy ? 'Uploading…' : 'Upload an image'}
            <input
              ref={fileInput}
              type="file"
              accept="image/png,image/jpeg,image/gif,image/webp"
              className="sr-only"
              disabled={busy}
              onChange={(event) => {
                const file = event.currentTarget.files?.[0]
                event.currentTarget.value = ''
                if (file) void choose(file)
              }}
            />
          </label>

          {error && <p role="alert" className="mt-2 text-[11.5px] text-danger">{error}</p>}

          {duplicate && (
            <div className="mt-3 rounded-lg border border-primary-line bg-primary-tint/30 p-3">
              <p className="text-[12.5px] font-semibold text-ink">This exact image is already in the library as “{duplicate.title}”.</p>
              <p className="mt-0.5 text-[11.5px] leading-relaxed text-ink-2">Using it keeps one record, so fixing it later fixes it everywhere.</p>
              <div className="mt-2 flex gap-2">
                <Button size="sm" variant="primary" onClick={() => { setDuplicate(null); onPick(duplicate.id) }}>Use that one</Button>
                <Button size="sm" variant="ghost" onClick={() => setDuplicate(null)}>Cancel</Button>
              </div>
            </div>
          )}

          <div className="mt-3">
            <SearchInput value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the media library" />
          </div>
          {matches.length === 0 ? (
            <p className="mt-3 flex items-center gap-1.5 text-[11.5px] text-ink-3">
              <Icon icon={Search} size={13} />
              {records.length ? 'Nothing matches that.' : 'The library is empty. Upload the first image.'}
            </p>
          ) : (
            <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {matches.map((record) => (
                <li key={record.id}>
                  <button type="button" onClick={() => onPick(record.id)} className="w-full rounded-lg border border-line p-1 text-start hover:border-primary-line hover:bg-primary-tint/20">
                    <PlacedImage record={record} className="max-h-24 w-full rounded object-contain" />
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
            Stored — {pending.measured.width}×{pending.measured.height}. Describe it before it can reach a student.
          </p>
          <Field label="Title" hint="What it is, in the picker">
            <TextInput value={pending.title} onChange={(event) => setPending({ ...pending, title: event.target.value })} />
          </Field>
          <Field label="Alt text" hint="Read aloud to anyone who cannot see it">
            <TextInput value={pending.altText} onChange={(event) => setPending({ ...pending, altText: event.target.value })} />
          </Field>
          <Field label="Rights" hint="Where it came from, and on what licence">
            <TextInput value={pending.rights} onChange={(event) => setPending({ ...pending, rights: event.target.value })} />
          </Field>
          {blockers.length > 0 && (
            <p className="text-[11.5px] leading-relaxed text-ink-2">
              Held back from students until it has {blockers.join(' and ')}.
            </p>
          )}
          <div className="flex gap-2">
            <Button size="sm" variant="primary" disabled={blockers.length > 0} onClick={commit}>Add to the library</Button>
            <Button size="sm" variant="ghost" onClick={() => setPending(null)}>Discard</Button>
          </div>
        </div>
      )}
    </Panel>
  )
}
