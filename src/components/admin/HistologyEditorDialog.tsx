import { useEffect, useState, type CSSProperties, type MouseEvent as ReactMouseEvent } from 'react'
import { ImagePlus, MapPin, Microscope, Plus, Trash2, TriangleAlert, X } from 'lucide-react'
import type { Status } from '@/data/admin'
import { CONTENT_FIELDS, type ManagedContentItem } from '@/data/contentControl'
import {
  clampPin,
  objectivesOf,
  openingObjective,
  OBJECTIVES,
  type HistologyAuthoringData,
  type Objective,
  type SlideStructure,
  type SlideView,
} from '@/data/histology'
import { subjects } from '@/data/subjects'
import { newId } from '@/data/userLibrary'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Field, Select, Textarea, TextInput } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { isStoredMediaReference, removeStoredMedia, resolveMediaSource } from '@/lib/mediaStorage'
import { uploadMedia } from '@/lib/mediaUpload'
import { apiDelete } from '@/lib/api'
import { usePersistentState } from '@/lib/usePersistentState'
import { useIdentity } from '@/lib/useIdentity'
import { StrandedMediaNotice } from '@/components/admin/StrandedMediaNotice'
import { MEDIA_STATE_KEY, emptyMediaLibrary, mediaUrl, type MediaLibraryDocument, type MediaRecord } from '@/data/mediaLibrary'
import { overlayPortal } from '@/lib/overlayPortal'

const STATUSES: Status[] = ['Draft', 'In review', 'Published', 'Archived']

/** The same ceiling question attachments use — one media path, one limit. */
const MAX_IMAGE_BYTES = 100 * 1024 * 1024

function isImageFile(file: File): boolean {
  if (file.type.startsWith('image/')) return true
  const extension = file.name.split('.').pop()?.toLowerCase() ?? ''
  return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)
}

function emptyHistologyData(): HistologyAuthoringData {
  return { tissue: '', stain: '', views: [], structures: [] }
}

function emptySlide(): ManagedContentItem {
  return {
    id: '',
    kind: 'histology',
    title: '',
    subjectId: subjects[0]?.id ?? 'cvs',
    status: 'Draft',
    owner: 'Admin team',
    updatedAt: new Date().toISOString(),
    fields: Object.fromEntries(CONTENT_FIELDS.histology.map(({ key }) => [key, ''])),
    histologyData: emptyHistologyData(),
  }
}

/**
 * Stored references (`synapse-media:…`) are opaque, so the editor cannot draw on
 * them directly — every view is resolved to a displayable URL here, exactly as
 * the student viewer resolves the one view it is showing.
 */
function useResolvedViews(views: SlideView[]): Partial<Record<Objective, string>> {
  const [urls, setUrls] = useState<Partial<Record<Objective, string>>>({})
  // Re-resolving on every render would churn object URLs; only a changed set of
  // images is a reason to fetch again.
  const signature = views.map((view) => `${view.objective}:${view.image}`).join('|')

  useEffect(() => {
    let active = true
    const created: string[] = []
    const next: Partial<Record<Objective, string>> = {}
    void Promise.all(
      views.map(async (view) => {
        try {
          const resolved = await resolveMediaSource(view.image)
          // The slot may have been replaced while this was in flight; applying
          // the stale URL would show the wrong field, and dropping it without
          // revoking would leak the blob it just created.
          if (!active) {
            if (resolved.revoke) URL.revokeObjectURL(resolved.url)
            return
          }
          if (resolved.revoke) created.push(resolved.url)
          next[view.objective] = resolved.url
        } catch {
          // A file that is no longer in this browser leaves its slot without a
          // preview rather than taking the whole editor down.
        }
      }),
    ).then(() => {
      if (active) setUrls(next)
    })
    return () => {
      active = false
      created.forEach((url) => URL.revokeObjectURL(url))
    }
    // `views` is a fresh array on every render — the signature is what actually
    // changed. eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature])

  return urls
}

/**
 * Authoring a slide: three objectives, the structures on them, and where each
 * structure sits on each field.
 *
 * Separate from the generic content editor because none of this is a text
 * field — a pin is a point clicked on a picture, and without it an imported
 * slide can never be labelled.
 */
export function HistologyEditorDialog({ open, item, onClose, onSave }: {
  open: boolean
  item: ManagedContentItem | null
  onClose: () => void
  onSave: (item: ManagedContentItem) => void
}) {
  const [draft, setDraft] = useState<ManagedContentItem>(() => item ?? emptySlide())
  const [pinObjective, setPinObjective] = useState<Objective>(OBJECTIVES[0])
  const [selectedStructureId, setSelectedStructureId] = useState<string | null>(null)
  const [library, setLibrary] = usePersistentState<MediaLibraryDocument>(MEDIA_STATE_KEY, emptyMediaLibrary)
  const identity = useIdentity()
  const [mediaError, setMediaError] = useState('')
  const [uploading, setUploading] = useState<Objective | null>(null)

  const data = draft.histologyData ?? emptyHistologyData()
  const urls = useResolvedViews(data.views)

  useEffect(() => {
    if (!open) return
    const base: ManagedContentItem = item
      ? {
          ...item,
          fields: { ...item.fields },
          histologyData: item.histologyData
            ? structuredClone(item.histologyData)
            : { ...emptyHistologyData(), tissue: item.fields.Tissue ?? '', stain: item.fields.Stain ?? '' },
        }
      : emptySlide()
    setDraft(base)
    // Open on the field the student would open on, so the author is looking at
    // the same picture the slide leads with.
    setPinObjective(openingObjective({ views: base.histologyData?.views ?? [] }) ?? OBJECTIVES[0])
    setSelectedStructureId(base.histologyData?.structures[0]?.id ?? null)
    setMediaError('')
    setUploading(null)
  }, [item, open])

  useEffect(() => {
    if (!open) return
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [onClose, open])

  if (!open) return null

  const updateData = (updater: (current: HistologyAuthoringData) => HistologyAuthoringData) =>
    setDraft((current) => ({ ...current, histologyData: updater(current.histologyData ?? emptyHistologyData()) }))
  const setField = (key: string, value: string) => setDraft((current) => ({ ...current, fields: { ...current.fields, [key]: value } }))

  const available = objectivesOf({ views: data.views })
  const activeUrl = urls[pinObjective]
  const pinnedHere = data.structures.filter((structure) => Boolean(structure.at[pinObjective]))
  const selectedStructure = data.structures.find((structure) => structure.id === selectedStructureId) ?? null
  const missingLowPower = data.views.length > 0 && !data.views.some((view) => view.objective === 4)
  const valid = Boolean(draft.title.trim() && draft.subjectId)

  async function uploadView(objective: Objective, file: File | undefined) {
    if (!file) return
    setMediaError('')
    if (!isImageFile(file)) { setMediaError(`${file.name} is not a supported image file.`); return }
    if (file.size > MAX_IMAGE_BYTES) { setMediaError(`${file.name} is larger than the 100 MB image limit. Large-file support is intended for streaming audio and video.`); return }
    // Read before awaiting: after the store resolves, this closure's copy of the
    // draft is a render old.
    const previous = data.views.find((view) => view.objective === objective)
    setUploading(objective)
    try {
      // On the server, like every other image. A slide that only existed in the
      // uploader's browser rendered perfectly for them and reached no student —
      // histology arrived after that bug and inherited it.
      const { id: uploadedId, measured, alreadyStored } = await uploadMedia(file)
      if (measured.mediaType !== 'image') {
        if (!alreadyStored) await apiDelete(`/media/${encodeURIComponent(uploadedId)}`).catch(() => undefined)
        throw new Error('Histology fields accept PNG, JPEG, GIF or WebP images.')
      }
      const twin = alreadyStored
        ? (library.records ?? []).find((record) => record.sha256 === measured.sha256)
        : undefined
      const mediaId = twin?.id ?? uploadedId
      if (!twin) {
        const record: MediaRecord = {
          id: mediaId,
          ...measured,
          title: `${draft.title || 'Slide'} · ${objective}×`,
          // Blank on purpose: the file is safe, and it is not publishable until
          // somebody says what it shows and where it came from.
          altText: '',
          rights: '',
          tags: { moduleIds: [], moduleSubjectPaths: [], conceptIds: [], yearIds: [] },
          uploadedBy: identity.userId ?? 'unknown',
          uploadedAt: new Date().toISOString(),
        }
        setLibrary((current) => ({ ...current, records: [record, ...(current.records ?? [])] }))
      }
      const image = mediaUrl(mediaId)
      // A replaced picture that only ever lived in this browser is nobody's
      // now. One on the server is left alone: another slide may name it.
      if (previous && isStoredMediaReference(previous.image)) void removeStoredMedia(previous.image).catch(() => {})
      updateData((current) => ({
        ...current,
        views: [...current.views.filter((view) => view.objective !== objective), { objective, image }]
          .sort((a, b) => a.objective - b.objective),
      }))
      setPinObjective(objective)
    } catch (reason) {
      setMediaError(reason instanceof Error
        ? `${file.name} was not stored: ${reason.message}`
        : `${file.name} could not be stored.`)
    } finally {
      setUploading(null)
    }
  }

  function removeView(objective: Objective) {
    const view = data.views.find((entry) => entry.objective === objective)
    if (!view) return
    void removeStoredMedia(view.image).catch(() => {
      setMediaError('The image was removed from the slide, but its local file could not be cleared.')
    })
    updateData((current) => ({
      ...current,
      views: current.views.filter((entry) => entry.objective !== objective),
      // The pins at this objective are coordinates on a picture that is gone.
      // Kept, they would silently reattach themselves to whatever image is
      // uploaded next — a label pointing at the wrong thing.
      structures: current.structures.map((structure) => {
        if (!structure.at[objective]) return structure
        const at = { ...structure.at }
        delete at[objective]
        return { ...structure, at }
      }),
    }))
  }

  function addStructure() {
    const id = newId('structure')
    updateData((current) => ({ ...current, structures: [...current.structures, { id, label: '', at: {} }] }))
    setSelectedStructureId(id)
  }

  function setStructure(id: string, patch: Partial<SlideStructure>) {
    updateData((current) => ({
      ...current,
      structures: current.structures.map((structure) => structure.id === id ? { ...structure, ...patch } : structure),
    }))
  }

  function removeStructure(id: string) {
    updateData((current) => ({ ...current, structures: current.structures.filter((structure) => structure.id !== id) }))
    setSelectedStructureId((current) => current === id ? null : current)
  }

  function clearPin(id: string, objective: Objective) {
    updateData((current) => ({
      ...current,
      structures: current.structures.map((structure) => {
        if (structure.id !== id || !structure.at[objective]) return structure
        const at = { ...structure.at }
        delete at[objective]
        return { ...structure, at }
      }),
    }))
  }

  /**
   * A click on the field becomes a fraction of *the image's own box*.
   *
   * `currentTarget` is the wrapper the image fills at its natural proportions,
   * so its rect is the image's rect. The viewer sizes its field to those same
   * proportions and places a pin at `left: x * 100%` of that box, so the same
   * fraction lands on the same speck of tissue at any rendered size.
   */
  function placePin(event: ReactMouseEvent<HTMLDivElement>) {
    if (!selectedStructureId) return
    const rect = event.currentTarget.getBoundingClientRect()
    const point = clampPin({ x: (event.clientX - rect.left) / rect.width, y: (event.clientY - rect.top) / rect.height })
    updateData((current) => ({
      ...current,
      structures: current.structures.map((structure) =>
        structure.id === selectedStructureId ? { ...structure, at: { ...structure.at, [pinObjective]: point } } : structure,
      ),
    }))
  }

  return overlayPortal(
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="histology-editor-title">
      <button type="button" className="absolute inset-0 bg-ink/30 animate-fade" onClick={onClose} aria-label="Close editor" />
      <div className="absolute inset-x-0 bottom-0 w-full sm:left-1/2 sm:top-1/2 sm:bottom-auto sm:w-[min(94vw,880px)] sm:-translate-x-1/2 sm:-translate-y-1/2">
        <form
          className="animate-pop max-h-[calc(100dvh-env(safe-area-inset-top))] overflow-hidden rounded-t-2xl border border-line bg-surface pb-[env(safe-area-inset-bottom)] shadow-pop sm:rounded-xl sm:pb-0"
          onSubmit={(event) => {
            event.preventDefault()
            if (!valid) return
            const tissue = (draft.fields.Tissue ?? '').trim()
            const stain = (draft.fields.Stain ?? '').trim()
            onSave({
              ...draft,
              id: draft.id || `histology-${Date.now()}`,
              title: draft.title.trim(),
              updatedAt: new Date().toISOString(),
              // Tissue and stain are typed once but read from both places: the
              // ledger table reads `fields`, the student slide reads
              // `histologyData`.
              histologyData: {
                ...data,
                tissue,
                stain,
                structures: data.structures.filter((structure) => structure.label.trim()),
              },
            })
          }}
        >
          <div className="flex items-center gap-3 border-b border-line px-5 py-4">
            <span className="grid size-9 place-items-center rounded-lg bg-primary-tint text-primary-strong"><Icon icon={Microscope} size={17} /></span>
            <div className="min-w-0 flex-1">
              <h2 id="histology-editor-title" className="font-serif text-[18px] font-semibold text-ink">{item ? 'Edit slide' : 'Add slide'}</h2>
              <p className="text-[12px] text-ink-3">One image per objective, and a pin for every structure worth naming.</p>
            </div>
            <button type="button" onClick={onClose} className="grid size-9 place-items-center rounded-lg text-ink-3 hover:bg-inset hover:text-ink" aria-label="Close editor"><Icon icon={X} size={18} /></button>
          </div>

          <div className="max-h-[calc(100dvh-11rem-env(safe-area-inset-top)-env(safe-area-inset-bottom))] space-y-5 overflow-y-auto overscroll-contain p-4 sm:max-h-[72vh] sm:p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Title" htmlFor="histology-title" className="sm:col-span-2">
                <TextInput id="histology-title" value={draft.title} onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))} placeholder="Ileum, low power" />
              </Field>
              <Field label="System / subject" htmlFor="histology-subject">
                <Select id="histology-subject" value={draft.subjectId} onChange={(event) => setDraft((current) => ({ ...current, subjectId: event.target.value }))}>
                  {subjects.map((subject) => <option key={subject.id} value={subject.id}>{subject.name}</option>)}
                </Select>
              </Field>
              <Field label="Workflow status" htmlFor="histology-status">
                <Select id="histology-status" value={draft.status} onChange={(event) => setDraft((current) => ({ ...current, status: event.target.value as Status }))}>
                  {STATUSES.map((status) => <option key={status}>{status}</option>)}
                </Select>
              </Field>
              <Field label="Tissue" htmlFor="histology-tissue">
                <TextInput id="histology-tissue" value={draft.fields.Tissue ?? ''} onChange={(event) => setField('Tissue', event.target.value)} placeholder="Small bowel" />
              </Field>
              <Field label="Stain" htmlFor="histology-stain">
                <TextInput id="histology-stain" value={draft.fields.Stain ?? ''} onChange={(event) => setField('Stain', event.target.value)} placeholder="H&E" />
              </Field>
              <Field label="What to look for" htmlFor="histology-description" className="sm:col-span-2" hint="Shown under the eyepiece once the slide is open.">
                <Textarea id="histology-description" value={draft.fields.Description ?? ''} onChange={(event) => setField('Description', event.target.value)} />
              </Field>
              <Field label="Content owner" htmlFor="histology-owner" className="sm:col-span-2">
                <TextInput id="histology-owner" value={draft.owner} onChange={(event) => setDraft((current) => ({ ...current, owner: event.target.value }))} />
              </Field>
            </div>

            {/* Objectives */}
            <div className="rounded-lg border border-line p-4">
              <div className="mb-1 flex items-center gap-2">
                <Icon icon={ImagePlus} size={15} className="text-primary" />
                <h3 className="text-[13.5px] font-semibold text-ink">Fields of view</h3>
                <span className="text-[11.5px] text-ink-3">One image per objective. 4× and 40× are different fields, not the same picture scaled.</span>
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {OBJECTIVES.map((objective) => {
                  const view = data.views.find((entry) => entry.objective === objective)
                  const preview = urls[objective]
                  return (
                    <div key={objective} className={cn('rounded-lg border p-2.5', view ? 'border-primary-line bg-primary-tint/20' : 'border-dashed border-line-2 bg-surface-2/40')}>
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-[13px] font-semibold tabular-nums text-ink">{objective}×</span>
                        {view ? <Badge tone="success">Image</Badge> : <span className="text-[11.5px] text-ink-3">Empty</span>}
                        {view && (
                          <button type="button" onClick={() => removeView(objective)} className="ms-auto grid size-10 place-items-center rounded text-ink-3 hover:bg-danger-tint hover:text-danger sm:size-7" aria-label={`Remove the ${objective}× image`}>
                            <Icon icon={Trash2} size={14} />
                          </button>
                        )}
                      </div>
                      {preview && (
                        <img src={preview} alt="" className="mb-2 block h-24 w-full rounded-md object-cover" />
                      )}
                      {view && isStoredMediaReference(view.image) && (
                        <div className="mb-2">
                          <StrandedMediaNotice
                            reference={view.image}
                            title={`${draft.title || 'Slide'} · ${objective}×`}
                            onRecovered={(mediaId) => updateData((current) => ({
                              ...current,
                              views: current.views.map((candidate) =>
                                candidate.objective === objective ? { ...candidate, image: mediaUrl(mediaId) } : candidate),
                            }))}
                          />
                        </div>
                      )}
                      <label className="flex min-h-9 cursor-pointer items-center justify-center gap-1.5 rounded-md border border-line bg-surface px-2 text-[11.5px] font-semibold text-ink-2 hover:border-primary-line hover:text-primary-strong">
                        <Icon icon={ImagePlus} size={14} />
                        {uploading === objective ? 'Storing…' : view ? 'Replace image' : `Upload ${objective}× image`}
                        <input type="file" accept="image/*" className="sr-only" onChange={(event) => { void uploadView(objective, event.currentTarget.files?.[0]); event.currentTarget.value = '' }} />
                      </label>
                    </div>
                  )
                })}
              </div>
              {mediaError && <p role="alert" className="mt-2 text-[11.5px] text-danger">{mediaError}</p>}
              {/* A warning, not a refusal: a 40×-only slide is still worth
                  publishing when that is the only image there is. */}
              {missingLowPower && (
                <div role="status" className="mt-3 flex items-start gap-2 rounded-lg border border-warning-line bg-warning-tint/40 p-3">
                  <Icon icon={TriangleAlert} size={15} className="mt-0.5 shrink-0 text-warning" />
                  <p className="text-[12px] leading-relaxed text-ink-2">
                    No 4× image, so this slide opens at {available[0]}× — a high-power field with no landmarks to orient from.
                    You can still publish it; the student just starts already zoomed in.
                  </p>
                </div>
              )}
            </div>

            {/* Structures and pins */}
            <div className="rounded-lg border border-line p-4">
              <div className="mb-1 flex items-center gap-2">
                <Icon icon={MapPin} size={15} className="text-primary" />
                <h3 className="text-[13.5px] font-semibold text-ink">Structures</h3>
                <span className="text-[11.5px] text-ink-3">Pick one, then click the field to drop its pin. Click again to move it.</span>
              </div>

              <div className="mt-3 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]">
                <div className="space-y-2">
                  {data.structures.length === 0 && (
                    <p className="text-[12px] text-ink-3">No structures yet. A slide with none is a picture; a slide with pins is a spotter.</p>
                  )}
                  {data.structures.map((structure) => {
                    const selected = structure.id === selectedStructureId
                    const pinnedAt = OBJECTIVES.filter((objective) => structure.at[objective])
                    return (
                      <div key={structure.id} className={cn('rounded-md border p-2.5', selected ? 'border-primary bg-primary-tint/25' : 'border-line bg-surface-2/40')}>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedStructureId(structure.id)}
                            aria-pressed={selected}
                            className={cn('grid size-10 shrink-0 place-items-center rounded-full border sm:size-7', selected ? 'border-primary bg-primary text-on-primary' : 'border-line-2 text-ink-3 hover:border-primary-line hover:text-primary-strong')}
                            aria-label={`Pin ${structure.label || 'this structure'}`}
                          >
                            <Icon icon={MapPin} size={13} />
                          </button>
                          <TextInput aria-label="Structure label" className="min-w-0 flex-1" value={structure.label} onChange={(event) => setStructure(structure.id, { label: event.target.value })} placeholder="Goblet cell" />
                          <button type="button" onClick={() => removeStructure(structure.id)} className="grid size-10 shrink-0 place-items-center rounded text-ink-3 hover:bg-danger-tint hover:text-danger sm:size-9" aria-label={`Delete ${structure.label || 'this structure'}`}>
                            <Icon icon={Trash2} size={14} />
                          </button>
                        </div>
                        <TextInput aria-label="Structure note" className="mt-2" value={structure.note ?? ''} onChange={(event) => setStructure(structure.id, { note: event.target.value })} placeholder="Optional note — what gives it away" />
                        <div className="mt-2 flex flex-wrap items-center gap-1.5">
                          <span className="text-[11px] text-ink-3">Pinned at</span>
                          {pinnedAt.length === 0 && <span className="text-[11px] font-medium text-warning">nowhere yet</span>}
                          {pinnedAt.map((objective) => (
                            <button
                              key={objective}
                              type="button"
                              onClick={() => clearPin(structure.id, objective)}
                              className="inline-flex min-h-10 items-center gap-1 rounded-full border border-primary-line bg-primary-tint px-2.5 text-[11px] font-semibold tabular-nums text-primary-strong hover:border-danger hover:text-danger sm:min-h-8"
                              aria-label={`Clear the ${objective}× pin for ${structure.label || 'this structure'}`}
                            >
                              {objective}×
                              <Icon icon={X} size={11} />
                            </button>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                  <Button type="button" variant="secondary" size="sm" iconLeft={Plus} onClick={addStructure}>Add structure</Button>
                </div>

                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-1.5">
                    {available.length > 0 ? available.map((objective) => (
                      <button
                        key={objective}
                        type="button"
                        onClick={() => setPinObjective(objective)}
                        aria-pressed={objective === pinObjective}
                        className={cn(
                          'inline-flex h-8 min-w-10 items-center justify-center rounded-full border px-2.5 text-[12.5px] font-semibold tabular-nums',
                          objective === pinObjective ? 'border-primary-line bg-primary-tint text-primary-strong' : 'border-line bg-surface text-ink-2 hover:border-line-2 hover:text-ink',
                        )}
                      >
                        {objective}×
                      </button>
                    )) : <span className="text-[11.5px] text-ink-3">Upload an image to start pinning.</span>}
                  </div>

                  {activeUrl ? (
                    <div className="overflow-hidden rounded-lg border border-line bg-inset">
                      {/* No border or padding on the clickable box itself: its
                          rect has to be the image's rect for the fraction to
                          match what the viewer draws. */}
                      <div className={cn('relative', selectedStructure ? 'cursor-crosshair' : 'cursor-not-allowed')} onClick={placePin} role="presentation">
                        <img src={activeUrl} alt="" draggable={false} className="block w-full select-none" />
                        {data.structures.map((structure) => {
                          const point = structure.at[pinObjective]
                          if (!point) return null
                          const selected = structure.id === selectedStructureId
                          return (
                            <span
                              key={structure.id}
                              // Pointer-events off so a click meant to move a
                              // pin is not swallowed by the pin already there.
                              className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
                              style={
                                {
                                  // Physical, not logical: a pin marks a point
                                  // on the picture, and the picture is never
                                  // mirrored under `dir="rtl"`. This is the
                                  // same choice SlideViewer makes, and the two
                                  // have to agree.
                                  left: `${point.x * 100}%`,
                                  top: `${point.y * 100}%`,
                                } satisfies CSSProperties
                              }
                            >
                              <span className={cn('block size-3.5 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.35)]', selected ? 'scale-125 bg-primary' : 'bg-ink/70')} />
                            </span>
                          )
                        })}
                      </div>
                    </div>
                  ) : (
                    <p className="rounded-lg border border-dashed border-line-2 bg-surface-2/40 p-6 text-center text-[12px] text-ink-3">
                      No image at {pinObjective}× yet.
                    </p>
                  )}

                  <p className="mt-2 text-[11.5px] leading-relaxed text-ink-2">
                    {!selectedStructure
                      ? 'Choose a structure on the left, then click the field to place its pin.'
                      : <>Clicking places <span className="font-semibold text-ink">{selectedStructure.label || 'this structure'}</span> at {pinObjective}×.</>}
                  </p>
                  <p className="mt-1 text-[11.5px] text-ink-3 tabular-nums">
                    {pinnedHere.length} of {data.structures.length} structures pinned at {pinObjective}×
                    {pinnedHere.length > 0 && <> — {pinnedHere.map((structure) => structure.label || 'unnamed').join(', ')}</>}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-line px-4 py-3 sm:px-5">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="primary" disabled={!valid}>{item ? 'Save changes' : 'Add slide'}</Button>
          </div>
        </form>
      </div>
    </div>,
  )
}
