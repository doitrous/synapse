import { useEffect, useMemo, useState } from 'react'
import { X, Plus, Trash2, MapPin, Play, FileText, Upload, Check } from 'lucide-react'
import type { Status } from '@/data/admin'
import type { ResourceType } from '@/data/types'
import {
  CONTENT_FIELDS,
  CONTENT_LEDGER_STORAGE_KEY,
  initialManagedContent,
  type ManagedContentItem,
  type ResourceAuthoringData,
  type ResourceConceptLocation,
} from '@/data/contentControl'
import { EntityPicker } from '@/components/admin/EntityPicker'
import { chapterOptions, conceptOptions, contentOptions, moduleOptions } from '@/components/admin/pickerOptions'
import { useTaxonomyTree } from '@/data/taxonomyStore'
import { useMedicalTaxonomy } from '@/data/medicalTaxonomyStore'
import { useUniversityCatalogue } from '@/lib/useUniversityCatalogue'
import { RESOURCE_ICON_CHOICES, resourceIcon } from '@/data/resourceIcons'
import { subjects } from '@/data/subjects'
import { CONCEPT_STORAGE_KEY, initialConceptGraph, type ConceptGraph } from '@/data/conceptGraph'
import { newId } from '@/data/userLibrary'
import { Button } from '@/components/ui/Button'
import { Field, Select, TextInput } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { usePersistentState } from '@/lib/usePersistentState'
import { apiUploadMedicalResource } from '@/lib/api'
import { universities, YEARS } from '@/data/universities'

const STATUSES: Status[] = ['Draft', 'In review', 'Published', 'Archived']
const RESOURCE_TYPES: ResourceType[] = ['Book', 'Video', 'Guideline', 'Deck', 'Article']

/** The type as chosen so far, falling back while nothing has been picked. */
function asResourceType(value: string | undefined): ResourceType {
  return RESOURCE_TYPES.includes(value as ResourceType) ? (value as ResourceType) : 'Article'
}
const LOCATION_KINDS: Array<{ value: ResourceConceptLocation['kind']; label: string; hint: string }> = [
  { value: 'page', label: 'Page', hint: 'e.g. 142 or 142–148' },
  { value: 'line', label: 'Line', hint: 'e.g. L. 12' },
  { value: 'slide', label: 'Slide', hint: 'e.g. 24' },
  { value: 'timestamp', label: 'Timestamp', hint: 'e.g. 3:20' },
]

function emptyResourceData(): ResourceAuthoringData {
  return { universityIds: [], yearIds: [], institution: '', collectionId: '', storageKey: '', sha256: '', rights: '', processingStatus: '', reviewer: 'Medical team, Admin team', finalPublisher: 'Admin team', chapters: [], moduleIds: [], includedConceptIds: [], includedArticleIds: [], conceptLocations: [] }
}

function emptyResource(): ManagedContentItem {
  return {
    id: '',
    kind: 'resource',
    title: '',
    subjectId: subjects[0]?.id ?? 'cvs',
    status: 'Draft',
    owner: 'Admin team',
    updatedAt: new Date().toISOString(),
    fields: Object.fromEntries(CONTENT_FIELDS.resource.map(({ key }) => [key, ''])),
    resourceData: emptyResourceData(),
  }
}

export function ResourceEditorDialog({ open, item, onClose, onSave }: {
  open: boolean
  item: ManagedContentItem | null
  onClose: () => void
  onSave: (item: ManagedContentItem) => void
}) {
  const [draft, setDraft] = useState<ManagedContentItem>(() => item ?? emptyResource())
  const [graph] = usePersistentState<ConceptGraph>(CONCEPT_STORAGE_KEY, initialConceptGraph)
  const [ledger] = usePersistentState<ManagedContentItem[]>(CONTENT_LEDGER_STORAGE_KEY, initialManagedContent)
  const [taxonomy] = useTaxonomyTree()
  const [medicalTaxonomy] = useMedicalTaxonomy()
  const [catalogue] = useUniversityCatalogue()
  const conceptPicks = useMemo(() => conceptOptions({ graph, taxonomy, medicalTaxonomy }), [graph, taxonomy, medicalTaxonomy])
  const articlePicks = useMemo(() => contentOptions(ledger, 'article'), [ledger])
  const modulePicks = useMemo(() => moduleOptions(catalogue), [catalogue])
  const chapterPicks = useMemo(() => chapterOptions(ledger), [ledger])
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'done' | 'error'>('idle')
  const [uploadMessage, setUploadMessage] = useState('')

  useEffect(() => {
    if (open) {
      setDraft(item ? { ...item, fields: { ...item.fields }, resourceData: { ...emptyResourceData(), ...item.resourceData } } : emptyResource())
      setUploadState('idle')
      setUploadMessage('')
    }
  }, [item, open])

  useEffect(() => {
    if (!open) return
    const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onEsc)
    return () => window.removeEventListener('keydown', onEsc)
  }, [onClose, open])

  const data = draft.resourceData ?? emptyResourceData()
  const patchData = (patch: Partial<ResourceAuthoringData>) => setDraft((c) => ({ ...c, resourceData: { ...emptyResourceData(), ...c.resourceData, ...patch } }))
  const setField = (key: string, value: string) => setDraft((c) => ({ ...c, fields: { ...c.fields, [key]: value } }))


  if (!open) return null

  const isVideo = draft.fields.Type === 'Video'
  const valid = draft.title.trim() && draft.subjectId && draft.fields.Type

  const addLocation = () => patchData({ conceptLocations: [...data.conceptLocations, { id: newId('loc'), conceptId: '', kind: isVideo ? 'timestamp' : 'page', locator: '' }] })
  const setLocation = (id: string, patch: Partial<ResourceConceptLocation>) => patchData({ conceptLocations: data.conceptLocations.map((l) => l.id === id ? { ...l, ...patch } : l) })
  const uploadQualifiedFile = async (file: File | undefined) => {
    if (!file || !draft.id) return
    setUploadState('uploading')
    setUploadMessage('Checking and securely uploading…')
    try {
      const result = await apiUploadMedicalResource(draft.id, file)
      setUploadState('done')
      setUploadMessage(`Uploaded and hash-checked · ${(result.sizeBytes / 1_048_576).toFixed(1)} MB`)
      setField('Storage state', 'uploaded')
    } catch (error) {
      setUploadState('error')
      setUploadMessage(error instanceof Error ? error.message : 'Upload failed')
    }
  }

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="resource-editor-title">
      <button type="button" className="absolute inset-0 bg-ink/30 animate-fade" onClick={onClose} aria-label="Close editor" />
      <div className="absolute inset-x-0 bottom-0 w-full sm:left-1/2 sm:top-1/2 sm:bottom-auto sm:w-[min(94vw,760px)] sm:-translate-x-1/2 sm:-translate-y-1/2">
        <form
          className="animate-pop max-h-[calc(100dvh-env(safe-area-inset-top))] overflow-hidden rounded-t-2xl border border-line bg-surface pb-[env(safe-area-inset-bottom)] shadow-pop sm:rounded-xl sm:pb-0"
          onSubmit={(e) => {
            e.preventDefault()
            if (!valid) return
            onSave({ ...draft, id: draft.id || `resource-${Date.now()}`, title: draft.title.trim(), updatedAt: new Date().toISOString() })
          }}
        >
          <div className="flex items-center gap-3 border-b border-line px-5 py-4">
            <span className="grid size-9 place-items-center rounded-lg bg-primary-tint text-primary-strong"><Icon icon={isVideo ? Play : FileText} size={17} /></span>
            <div className="min-w-0 flex-1">
              <h2 id="resource-editor-title" className="font-serif text-[18px] font-semibold text-ink">{item ? 'Edit resource' : 'Add resource'}</h2>
              <p className="text-[12px] text-ink-3">{isVideo ? 'Video' : 'File'} · chapters, modules, and concept deep-links.</p>
            </div>
            <button type="button" onClick={onClose} className="grid size-9 place-items-center rounded-lg text-ink-3 hover:bg-inset hover:text-ink" aria-label="Close editor"><Icon icon={X} size={18} /></button>
          </div>

          <div className="max-h-[calc(100dvh-11rem-env(safe-area-inset-top)-env(safe-area-inset-bottom))] space-y-5 overflow-y-auto overscroll-contain p-4 sm:max-h-[70vh] sm:p-5">
            {/* Basics */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Title" className="sm:col-span-2"><TextInput value={draft.title} onChange={(e) => setDraft((c) => ({ ...c, title: e.target.value }))} /></Field>
              <Field label="Resource type" hint="Videos live in the Videos tab; everything else in Files.">
                <Select value={draft.fields.Type ?? ''} onChange={(e) => setField('Type', e.target.value)}>
                  <option value="" disabled>Choose…</option>
                  {RESOURCE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </Select>
              </Field>
              <Field label="System / subject">
                <Select value={draft.subjectId} onChange={(e) => setDraft((c) => ({ ...c, subjectId: e.target.value }))}>
                  {subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                </Select>
              </Field>
              <Field label="Source or publisher"><TextInput value={draft.fields.Source ?? ''} onChange={(e) => setField('Source', e.target.value)} placeholder="Osmosis, NICE, Faculty deck…" /></Field>
              <Field label="Publication year"><TextInput type="number" value={draft.fields.Year ?? ''} onChange={(e) => setField('Year', e.target.value)} /></Field>
              <Field label="Default location" hint="Where the resource opens (page/slide/timestamp)."><TextInput value={draft.fields.Location ?? ''} onChange={(e) => setField('Location', e.target.value)} placeholder={isVideo ? '0:00' : 'Ch. 23 · p. 512'} /></Field>
              <Field label="Workflow status">
                <Select value={draft.status} onChange={(e) => setDraft((c) => ({ ...c, status: e.target.value as Status }))}>
                  {STATUSES.map((s) => <option key={s}>{s}</option>)}
                </Select>
              </Field>
              <Field label="Content owner" className="sm:col-span-2"><TextInput value={draft.owner} onChange={(e) => setDraft((c) => ({ ...c, owner: e.target.value }))} /></Field>
              {/* Every resource of a type used to carry the same glyph, so a
                  shelf of forty books was forty identical icons. */}
              <div className="sm:col-span-2">
                <p className="mb-1.5 text-[12.5px] font-medium text-ink-2">Icon</p>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => patchData({ icon: undefined })}
                    aria-pressed={!data.icon}
                    title="Use the glyph for this resource type"
                    className={cn(
                      'inline-flex h-9 items-center gap-1.5 rounded-lg border px-2.5 text-[11.5px] font-medium transition-colors',
                      !data.icon ? 'border-primary bg-primary-tint text-primary-strong' : 'border-line text-ink-2 hover:bg-inset',
                    )}
                  >
                    <Icon icon={resourceIcon(undefined, asResourceType(draft.fields.Type))} size={15} />
                    By type
                  </button>
                  {RESOURCE_ICON_CHOICES.map((choice) => (
                    <button
                      key={choice.name}
                      type="button"
                      onClick={() => patchData({ icon: choice.name })}
                      aria-pressed={data.icon === choice.name}
                      aria-label={choice.label}
                      title={choice.label}
                      className={cn(
                        'grid size-9 place-items-center rounded-lg border transition-colors',
                        data.icon === choice.name ? 'border-primary bg-primary-tint text-primary-strong' : 'border-line text-ink-2 hover:bg-inset',
                      )}
                    >
                      <Icon icon={resourceIcon(choice.name, 'Article')} size={16} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-line bg-surface-2/40 p-4">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.07em] text-ink-3">Source, access & governance</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Institution"><TextInput value={data.institution ?? ''} onChange={(event) => patchData({ institution: event.target.value })} placeholder="Kasr Alainy" /></Field>
                <Field label="Collection / folder"><TextInput value={data.collectionId ?? ''} onChange={(event) => patchData({ collectionId: event.target.value })} placeholder="anatomy, physiology, miscellaneous…" /></Field>
                <Field label="Reviewer"><TextInput value={data.reviewer ?? ''} onChange={(event) => patchData({ reviewer: event.target.value })} /></Field>
                <Field label="Final publisher"><TextInput value={data.finalPublisher ?? ''} onChange={(event) => patchData({ finalPublisher: event.target.value })} /></Field>
                <Field label="Processing status"><TextInput value={data.processingStatus ?? ''} onChange={(event) => patchData({ processingStatus: event.target.value })} /></Field>
                <Field label="SHA-256" hint="Qualified source hash"><TextInput readOnly value={data.sha256 ?? ''} className="font-mono text-[10.5px]" /></Field>
                <Field label="Secure storage path" hint="University / subject / collection / file" className="sm:col-span-2"><TextInput readOnly value={data.storageKey ?? ''} className="font-mono text-[10.5px]" /></Field>
                <Field label="Rights / permission" className="sm:col-span-2"><TextInput value={data.rights ?? ''} onChange={(event) => patchData({ rights: event.target.value })} /></Field>
              </div>
              <div className="mt-3">
                <p className="mb-1.5 text-[11.5px] font-medium text-ink-2">Universities</p>
                <div className="grid grid-cols-2 gap-1 sm:grid-cols-4">
                  {universities.map((university) => <label key={university.id} className="flex items-center gap-2 rounded px-1.5 py-1 text-[11.5px] text-ink-2 hover:bg-inset"><input type="checkbox" className="accent-[var(--color-primary)]" checked={(data.universityIds ?? []).includes(university.id)} onChange={() => patchData({ universityIds: (data.universityIds ?? []).includes(university.id) ? (data.universityIds ?? []).filter((id) => id !== university.id) : [...(data.universityIds ?? []), university.id] })} />{university.short}</label>)}
                </div>
              </div>
              {/* The student catalogue filters on years, but this dialog never
                  offered a way to set one, so that filter could only ever match
                  resources scoped by an import. */}
              <div className="mt-3">
                <p className="mb-1.5 text-[11.5px] font-medium text-ink-2">Years <span className="font-normal text-ink-3">— leave empty for every year</span></p>
                <div className="grid grid-cols-2 gap-1 sm:grid-cols-4">
                  {YEARS.map((year) => <label key={year} className="flex items-center gap-2 rounded px-1.5 py-1 text-[11.5px] text-ink-2 hover:bg-inset"><input type="checkbox" className="accent-[var(--color-primary)]" checked={(data.yearIds ?? []).includes(year)} onChange={() => patchData({ yearIds: (data.yearIds ?? []).includes(year) ? (data.yearIds ?? []).filter((id) => id !== year) : [...(data.yearIds ?? []), year] })} />{year.replace('Year ', 'Y')}</label>)}
                </div>
              </div>
              {data.storageKey && draft.id && (
                <div className="mt-4 rounded-lg border border-primary-line bg-primary-tint/30 p-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-primary-line bg-surface px-3 py-2 text-[12px] font-semibold text-primary-strong hover:bg-primary-tint">
                      <Icon icon={uploadState === 'done' ? Check : Upload} size={14} />
                      {uploadState === 'uploading' ? 'Uploading…' : uploadState === 'done' ? 'Uploaded' : 'Choose exact source file'}
                      <input type="file" accept="application/pdf,.pdf" className="sr-only" disabled={uploadState === 'uploading' || uploadState === 'done'} onChange={(event) => { void uploadQualifiedFile(event.currentTarget.files?.[0]); event.currentTarget.value = '' }} />
                    </label>
                    <span className={cn('text-[11.5px]', uploadState === 'error' ? 'text-danger' : uploadState === 'done' ? 'text-success' : 'text-ink-3')}>{uploadMessage || 'The file is accepted only when its hash matches this qualified record.'}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Placement: chapters + modules (multi-select) */}
            <div className="grid gap-4 rounded-lg border border-line bg-surface-2/40 p-4 sm:grid-cols-2">
              <EntityPicker label="Chapters" hint="Chapters already used elsewhere in the catalogue." noun="chapters" options={chapterPicks} selected={data.chapters} onChange={(chapters) => patchData({ chapters })} emptyText="No chapters recorded yet." />
              <EntityPicker label="Modules" hint="One resource can serve several modules." noun="modules" options={modulePicks} selected={data.moduleIds} onChange={(moduleIds) => patchData({ moduleIds })} emptyText="No modules in the catalogue yet — add them in Academic Setup." />
            </div>

            {/* Links */}
            <div className="grid gap-4 sm:grid-cols-2">
              <EntityPicker label="Included concepts" hint="Auto-links to each concept's approved media." noun="concepts" options={conceptPicks} selected={data.includedConceptIds} onChange={(includedConceptIds) => patchData({ includedConceptIds })} />
              <EntityPicker label="Included articles" noun="articles" options={articlePicks} selected={data.includedArticleIds} onChange={(includedArticleIds) => patchData({ includedArticleIds })} />
            </div>

            {/* Concept → page/line/timestamp map */}
            <div className="rounded-lg border border-line p-4">
              <div className="mb-2 flex items-center gap-2">
                <Icon icon={MapPin} size={15} className="text-primary" />
                <h3 className="text-[13.5px] font-semibold text-ink">Concept deep-links</h3>
                <span className="text-[11.5px] text-ink-3">Pin a concept to the exact page, line, slide, or timestamp.</span>
              </div>
              {data.conceptLocations.length === 0 && (
                <p className="mb-2 text-[12px] text-ink-3">No deep-links yet. A student opening one of these concepts can jump straight to where it is taught here.</p>
              )}
              <div className="space-y-2">
                {data.conceptLocations.map((loc) => {
                  const kindHint = LOCATION_KINDS.find((k) => k.value === loc.kind)?.hint
                  return (
                    <div key={loc.id} className="flex flex-wrap items-end gap-2 rounded-md border border-line bg-surface-2/40 p-2">
                      <div className="min-w-[12rem] flex-1">
                        {/* One concept per row: picking another replaces it. */}
                        <EntityPicker label="Concept" noun="concepts" options={conceptPicks} selected={loc.conceptId ? [loc.conceptId] : []} onChange={(ids) => setLocation(loc.id, { conceptId: ids[ids.length - 1] ?? '' })} />
                      </div>
                      <div className="w-28">
                        <label className="mb-1 block text-[10.5px] font-medium uppercase tracking-wide text-ink-3">Locate by</label>
                        <Select value={loc.kind} onChange={(e) => setLocation(loc.id, { kind: e.target.value as ResourceConceptLocation['kind'] })} className="h-9">
                          {LOCATION_KINDS.map((k) => <option key={k.value} value={k.value}>{k.label}</option>)}
                        </Select>
                      </div>
                      <div className="w-32">
                        <label className="mb-1 block text-[10.5px] font-medium uppercase tracking-wide text-ink-3">Locator</label>
                        <TextInput value={loc.locator} onChange={(e) => setLocation(loc.id, { locator: e.target.value })} placeholder={kindHint} className="h-9" />
                      </div>
                      <button type="button" onClick={() => patchData({ conceptLocations: data.conceptLocations.filter((l) => l.id !== loc.id) })} className="grid size-9 place-items-center rounded text-ink-3 hover:bg-danger-tint hover:text-danger" aria-label="Remove deep-link"><Icon icon={Trash2} size={14} /></button>
                    </div>
                  )
                })}
              </div>
              <Button type="button" variant="secondary" size="sm" iconLeft={Plus} className="mt-2" onClick={addLocation}>Add deep-link</Button>
            </div>
          </div>

          <div className={cn('flex items-center justify-end gap-2 border-t border-line px-4 py-3 sm:px-5')}>
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="primary" disabled={!valid}>{item ? 'Save changes' : 'Add resource'}</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
