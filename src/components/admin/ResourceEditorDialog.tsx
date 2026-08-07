import { useEffect, useMemo, useState } from 'react'
import { X, Plus, Trash2, MapPin, Play, FileText } from 'lucide-react'
import type { Status } from '@/data/admin'
import type { ResourceType } from '@/data/types'
import {
  CONTENT_FIELDS,
  type ManagedContentItem,
  type ResourceAuthoringData,
  type ResourceConceptLocation,
} from '@/data/contentControl'
import { resources } from '@/data/resources'
import { subjects } from '@/data/student'
import { initialConceptGraph } from '@/data/conceptGraph'
import { newId } from '@/data/userLibrary'
import { Button } from '@/components/ui/Button'
import { Field, Select, TextInput } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'

const STATUSES: Status[] = ['Draft', 'In review', 'Published', 'Archived']
const RESOURCE_TYPES: ResourceType[] = ['Book', 'Video', 'Guideline', 'Deck', 'Article']
const LOCATION_KINDS: Array<{ value: ResourceConceptLocation['kind']; label: string; hint: string }> = [
  { value: 'page', label: 'Page', hint: 'e.g. 142 or 142–148' },
  { value: 'line', label: 'Line', hint: 'e.g. L. 12' },
  { value: 'slide', label: 'Slide', hint: 'e.g. 24' },
  { value: 'timestamp', label: 'Timestamp', hint: 'e.g. 3:20' },
]

/** All concepts available for the deep-link map (id + human label). */
const CONCEPTS = initialConceptGraph().concepts.map((c) => ({ id: c.id, label: c.label }))

function emptyResourceData(): ResourceAuthoringData {
  return { chapters: [], moduleIds: [], includedConceptIds: [], includedArticleIds: [], conceptLocations: [] }
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

/** Chip list with add-by-Enter and free text; used for chapters, modules, IDs. */
function ChipEditor({ label, hint, values, suggestions = [], placeholder, onChange }: {
  label: string
  hint?: string
  values: string[]
  suggestions?: string[]
  placeholder?: string
  onChange: (next: string[]) => void
}) {
  const [text, setText] = useState('')
  const add = (raw: string) => {
    const v = raw.trim()
    if (!v || values.includes(v)) { setText(''); return }
    onChange([...values, v]); setText('')
  }
  const remaining = suggestions.filter((s) => !values.includes(s))
  return (
    <Field label={label} hint={hint}>
      {values.length > 0 && (
        <div className="mb-1.5 flex flex-wrap gap-1.5">
          {values.map((v) => (
            <span key={v} className="inline-flex items-center gap-1 rounded-full border border-accent-line bg-accent-tint px-2.5 py-0.5 text-[12px] font-medium text-accent-strong">
              {v}
              <button type="button" onClick={() => onChange(values.filter((x) => x !== v))} className="text-accent-strong/70 hover:text-accent-strong" aria-label={`Remove ${v}`}><Icon icon={X} size={12} /></button>
            </span>
          ))}
        </div>
      )}
      <TextInput
        value={text}
        placeholder={placeholder}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add(text) } }}
        onBlur={() => add(text)}
      />
      {remaining.length > 0 && (
        <div className="mt-1.5 flex flex-wrap gap-1">
          {remaining.slice(0, 12).map((s) => (
            <button key={s} type="button" onClick={() => add(s)} className="rounded-full border border-line bg-surface px-2 py-0.5 text-[11.5px] text-ink-3 hover:border-accent-line hover:text-accent-strong">+ {s}</button>
          ))}
        </div>
      )}
    </Field>
  )
}

export function ResourceEditorDialog({ open, item, onClose, onSave }: {
  open: boolean
  item: ManagedContentItem | null
  onClose: () => void
  onSave: (item: ManagedContentItem) => void
}) {
  const [draft, setDraft] = useState<ManagedContentItem>(() => item ?? emptyResource())

  useEffect(() => {
    if (open) setDraft(item ? { ...item, fields: { ...item.fields }, resourceData: { ...emptyResourceData(), ...item.resourceData } } : emptyResource())
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

  // Chapters seen elsewhere in the catalogue for this subject → offered as quick chips.
  const chapterSuggestions = useMemo(
    () => [...new Set(resources.filter((r) => r.subjectId === draft.subjectId && r.chapter).map((r) => r.chapter!))],
    [draft.subjectId],
  )

  if (!open) return null

  const isVideo = draft.fields.Type === 'Video'
  const valid = draft.title.trim() && draft.subjectId && draft.fields.Type

  const addLocation = () => patchData({ conceptLocations: [...data.conceptLocations, { id: newId('loc'), conceptId: CONCEPTS[0]?.id ?? '', kind: isVideo ? 'timestamp' : 'page', locator: '' }] })
  const setLocation = (id: string, patch: Partial<ResourceConceptLocation>) => patchData({ conceptLocations: data.conceptLocations.map((l) => l.id === id ? { ...l, ...patch } : l) })

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
            <span className="grid size-9 place-items-center rounded-lg bg-accent-tint text-accent-strong"><Icon icon={isVideo ? Play : FileText} size={17} /></span>
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
            </div>

            {/* Placement: chapters + modules (multi-select) */}
            <div className="grid gap-4 rounded-lg border border-line bg-surface-2/40 p-4 sm:grid-cols-2">
              <ChipEditor label="Chapters" hint="Select one or more — type and press Enter to add." values={data.chapters} suggestions={chapterSuggestions} placeholder="Add a chapter…" onChange={(chapters) => patchData({ chapters })} />
              <ChipEditor label="Module IDs" hint="One resource can serve several modules." values={data.moduleIds} placeholder="e.g. CVS 01" onChange={(moduleIds) => patchData({ moduleIds })} />
            </div>

            {/* Links */}
            <div className="grid gap-4 sm:grid-cols-2">
              <ChipEditor label="Included concept IDs" hint="Auto-links to each concept's approved media." values={data.includedConceptIds} suggestions={CONCEPTS.map((c) => c.id)} placeholder="med.concept.…" onChange={(includedConceptIds) => patchData({ includedConceptIds })} />
              <ChipEditor label="Included article IDs" values={data.includedArticleIds} placeholder="hf-patho…" onChange={(includedArticleIds) => patchData({ includedArticleIds })} />
            </div>

            {/* Concept → page/line/timestamp map */}
            <div className="rounded-lg border border-line p-4">
              <div className="mb-2 flex items-center gap-2">
                <Icon icon={MapPin} size={15} className="text-accent" />
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
                      <div className="min-w-[10rem] flex-1">
                        <label className="mb-1 block text-[10.5px] font-medium uppercase tracking-wide text-ink-3">Concept</label>
                        <Select value={loc.conceptId} onChange={(e) => setLocation(loc.id, { conceptId: e.target.value })} className="h-9">
                          {CONCEPTS.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
                        </Select>
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
