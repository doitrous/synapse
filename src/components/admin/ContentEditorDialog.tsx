import { useEffect, useState } from 'react'
import { FilePenLine, Trash2, X } from 'lucide-react'
import type { Status } from '@/data/admin'
import {
  CONTENT_FIELDS,
  CONTENT_KIND_LABEL,
  type ContentKind,
  type ManagedContentItem,
} from '@/data/contentControl'
import { subjects } from '@/data/subjects'
import { Button } from '@/components/ui/Button'
import { Field, Select, Textarea, TextInput } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'

const STATUSES: Status[] = ['Draft', 'In review', 'Published', 'Archived']

function emptyItem(kind: ContentKind): ManagedContentItem {
  return {
    id: '',
    kind,
    title: '',
    subjectId: subjects[0]?.id ?? 'cvs',
    status: 'Draft',
    owner: 'Admin team',
    updatedAt: new Date().toISOString(),
    fields: Object.fromEntries(CONTENT_FIELDS[kind].map(({ key }) => [key, ''])),
  }
}

export function ContentEditorDialog({
  open,
  kind,
  item,
  onClose,
  onSave,
}: {
  open: boolean
  kind: ContentKind
  item: ManagedContentItem | null
  onClose: () => void
  onSave: (item: ManagedContentItem) => void
}) {
  const [draft, setDraft] = useState<ManagedContentItem>(() => item ?? emptyItem(kind))

  useEffect(() => {
    if (open) setDraft(item ? { ...item, fields: { ...item.fields } } : emptyItem(kind))
  }, [item, kind, open])

  useEffect(() => {
    if (!open) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [onClose, open])

  if (!open) return null

  const noun = CONTENT_KIND_LABEL[kind].singular
  const valid = draft.title.trim() && draft.subjectId && CONTENT_FIELDS[kind].every(({ key }) => draft.fields[key]?.trim())

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="content-editor-title">
      <button type="button" className="absolute inset-0 bg-ink/30 animate-fade" onClick={onClose} aria-label="Close editor" />
      <div className="absolute inset-x-0 bottom-0 w-full sm:left-1/2 sm:top-1/2 sm:bottom-auto sm:w-[min(94vw,720px)] sm:-translate-x-1/2 sm:-translate-y-1/2">
        <form
          className="animate-pop max-h-[calc(100dvh-env(safe-area-inset-top))] overflow-hidden rounded-b-none rounded-t-2xl border border-line bg-surface pb-[env(safe-area-inset-bottom)] shadow-pop sm:rounded-xl sm:pb-0"
          onSubmit={(event) => {
            event.preventDefault()
            if (!valid) return
            onSave({
              ...draft,
              id: draft.id || `${kind}-${Date.now()}`,
              title: draft.title.trim(),
              updatedAt: new Date().toISOString(),
            })
          }}
        >
          <div className="flex items-center gap-3 border-b border-line px-5 py-4">
            <span className="grid size-9 place-items-center rounded-lg bg-primary-tint text-primary-strong">
              <Icon icon={FilePenLine} size={17} />
            </span>
            <div className="min-w-0 flex-1">
              <h2 id="content-editor-title" className="font-serif text-[18px] font-semibold text-ink">
                {item ? `Edit ${noun}` : `Add ${noun}`}
              </h2>
              <p className="text-[12px] text-ink-3">Changes are saved to the admin content ledger.</p>
            </div>
            <button type="button" onClick={onClose} className="grid size-9 place-items-center rounded-lg text-ink-3 hover:bg-inset hover:text-ink" aria-label="Close editor">
              <Icon icon={X} size={18} />
            </button>
          </div>

          <div className="max-h-[calc(100dvh-11rem-env(safe-area-inset-top)-env(safe-area-inset-bottom))] overflow-y-auto overscroll-contain p-4 sm:max-h-[68vh] sm:p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={kind === 'question' ? 'Question stem' : 'Title'} htmlFor="content-title" className="sm:col-span-2">
                {kind === 'question' ? (
                  <Textarea id="content-title" value={draft.title} onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))} />
                ) : (
                  <TextInput id="content-title" value={draft.title} onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))} />
                )}
              </Field>
              <Field label="Subject" htmlFor="content-subject">
                <Select id="content-subject" value={draft.subjectId} onChange={(event) => setDraft((current) => ({ ...current, subjectId: event.target.value }))}>
                  {subjects.map((subject) => <option key={subject.id} value={subject.id}>{subject.name}</option>)}
                </Select>
              </Field>
              <Field label="Workflow status" htmlFor="content-status">
                <Select id="content-status" value={draft.status} onChange={(event) => setDraft((current) => ({ ...current, status: event.target.value as Status }))}>
                  {STATUSES.map((status) => <option key={status}>{status}</option>)}
                </Select>
              </Field>
              <Field label="Content owner" htmlFor="content-owner" className="sm:col-span-2">
                <TextInput id="content-owner" value={draft.owner} onChange={(event) => setDraft((current) => ({ ...current, owner: event.target.value }))} />
              </Field>
              {CONTENT_FIELDS[kind].map((definition) => (
                <Field key={definition.key} label={definition.label} htmlFor={`content-${definition.key}`} className={definition.multiline ? 'sm:col-span-2' : undefined}>
                  {definition.multiline ? (
                    <Textarea id={`content-${definition.key}`} value={draft.fields[definition.key] ?? ''} onChange={(event) => setDraft((current) => ({ ...current, fields: { ...current.fields, [definition.key]: event.target.value } }))} />
                  ) : (
                    <TextInput id={`content-${definition.key}`} value={draft.fields[definition.key] ?? ''} onChange={(event) => setDraft((current) => ({ ...current, fields: { ...current.fields, [definition.key]: event.target.value } }))} />
                  )}
                </Field>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-line px-4 py-3 sm:px-5">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="primary" disabled={!valid}>{item ? 'Save changes' : `Add ${noun}`}</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export function ConfirmDeleteDialog({ item, onClose, onConfirm }: { item: ManagedContentItem | null; onClose: () => void; onConfirm: () => void }) {
  useEffect(() => {
    if (!item) return
    const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [item, onClose])

  if (!item) return null

  return (
    <div className="fixed inset-0 z-50" role="alertdialog" aria-modal="true" aria-labelledby="delete-content-title" aria-describedby="delete-content-description">
      <button type="button" className="absolute inset-0 bg-ink/30 animate-fade" onClick={onClose} aria-label="Cancel delete" />
      <div className="absolute inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] sm:left-1/2 sm:top-1/2 sm:bottom-auto sm:w-[min(92vw,440px)] sm:-translate-x-1/2 sm:-translate-y-1/2">
        <div className="animate-pop rounded-xl border border-line bg-surface p-5 shadow-pop">
          <span className="grid size-10 place-items-center rounded-lg bg-danger-tint text-danger"><Icon icon={Trash2} size={19} /></span>
          <h2 id="delete-content-title" className="mt-4 font-serif text-[19px] font-semibold text-ink">Delete this {CONTENT_KIND_LABEL[item.kind].singular}?</h2>
          <p id="delete-content-description" className="mt-2 text-[13.5px] leading-relaxed text-ink-2">“{item.title}” will be removed from the admin content ledger. This cannot be undone.</p>
          <div className="mt-5 flex flex-wrap justify-end gap-2">
            <Button variant="ghost" onClick={onClose}>Keep item</Button>
            <Button variant="danger" onClick={onConfirm}>Delete permanently</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
