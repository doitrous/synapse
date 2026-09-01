import { useEffect, useState } from 'react'
import { TriangleAlert } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { isStoredMediaReference, resolveMediaSource } from '@/lib/mediaStorage'
import { uploadMedia } from '@/lib/mediaUpload'
import { usePersistentState } from '@/lib/usePersistentState'
import { useIdentity } from '@/lib/useIdentity'
import { MEDIA_STATE_KEY, emptyMediaLibrary, type MediaLibraryDocument, type MediaRecord } from '@/data/mediaLibrary'

/**
 * An image that exists only in one browser.
 *
 * `nishany-media:` references were written to IndexedDB, so they render for
 * whoever uploaded them and for nobody else — including that same person on a
 * different machine. Saying so where the image appears is the whole point: this
 * was invisible, which is why it survived.
 *
 * Recovery is offered only where this browser actually holds the bytes. On any
 * other machine the notice says the file is not here, because a button that
 * quietly does nothing looks exactly like one that worked.
 */
export function StrandedMediaNotice({ reference, title, onRecovered }: {
  reference: string
  /** What to call the recovered record, usually the owning item's title. */
  title?: string
  /** Called with the media id once the bytes are on the server and verified. */
  onRecovered: (mediaId: string) => void
}) {
  const [library, setLibrary] = usePersistentState<MediaLibraryDocument>(MEDIA_STATE_KEY, emptyMediaLibrary)
  const identity = useIdentity()
  const [available, setAvailable] = useState<boolean | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [recovered, setRecovered] = useState(false)

  const stranded = isStoredMediaReference(reference)

  useEffect(() => {
    if (!stranded) return
    let active = true
    let objectUrl = ''
    resolveMediaSource(reference)
      .then((resolved) => {
        if (resolved.revoke) objectUrl = resolved.url
        if (active) setAvailable(true)
      })
      .catch(() => { if (active) setAvailable(false) })
    return () => {
      active = false
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [reference, stranded])

  if (!stranded) return null

  async function recover() {
    setBusy(true)
    setError('')
    try {
      const resolved = await resolveMediaSource(reference)
      const blob = await (await fetch(resolved.url)).blob()
      if (resolved.revoke) URL.revokeObjectURL(resolved.url)
      // Put through the same path as any fresh upload. Nothing about a rescued
      // file is trusted more than a new one — it is still identified from its
      // own bytes, and still has to come back before it counts.
      const file = new File([blob], 'recovered-image', { type: blob.type || 'image/png' })
      const { id: uploadedId, measured, alreadyStored } = await uploadMedia(file)

      // An upload alone creates no record, and a placement points at a record.
      // The bytes may already be here under somebody else's description, in
      // which case that one is reused rather than described a second time.
      const twin = alreadyStored
        ? (library.records ?? []).find((record) => record.sha256 === measured.sha256)
        : undefined
      const mediaId = twin?.id ?? uploadedId
      if (!twin) {
        const record: MediaRecord = {
          id: mediaId,
          ...measured,
          title: title || 'Recovered image',
          // Deliberately blank. The file is safe now, but it is not publishable
          // until somebody says what it shows and where it came from — and the
          // notice below says so rather than implying the job is finished.
          altText: '',
          rights: '',
          tags: { moduleIds: [], moduleSubjectPaths: [], conceptIds: [], yearIds: [] },
          uploadedBy: identity.userId ?? 'unknown',
          uploadedAt: new Date().toISOString(),
        }
        setLibrary((current) => ({ ...current, records: [record, ...(current.records ?? [])] }))
      }
      setRecovered(true)
      onRecovered(mediaId)
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'That image could not be recovered.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="rounded-lg border border-warning/40 bg-warning-tint px-3 py-2.5">
      <p className="flex items-start gap-2 text-[12px] font-semibold text-ink">
        <Icon icon={TriangleAlert} size={14} className="mt-0.5 shrink-0 text-warning" />
        This image exists only in one browser. Students cannot see it.
      </p>
      <p className="mt-1 text-[11.5px] leading-relaxed text-ink-2">
        {available === false
          ? 'The file is not on this machine, so it cannot be recovered here. Whoever uploaded it can re-upload it from the browser they used, or it can be attached again from the original.'
          : 'The original is still in this browser. Upload it to publish it.'}
      </p>
      {available && (
        <Button className="mt-2" size="sm" variant="secondary" loading={busy} onClick={() => void recover()}>
          Upload to the server
        </Button>
      )}
      {recovered && (
        <p className="mt-2 text-[11.5px] leading-relaxed text-ink-2">
          On the server now. It still needs alt text and rights in the media library before a student is shown it.
        </p>
      )}
      {error && <p role="alert" className="mt-2 text-[11.5px] text-danger">{error}</p>}
    </div>
  )
}
