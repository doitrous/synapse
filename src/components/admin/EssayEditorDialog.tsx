import { useEffect, useState } from 'react'
import { ArrowDown, ArrowUp, PenLine, Plus, Trash2, X } from 'lucide-react'
import type { Status } from '@/data/admin'
import { type ManagedContentItem } from '@/data/contentControl'
import { type EssayAuthoringData, type EssayKeyPoint } from '@/data/essay'
import { newId } from '@/data/userLibrary'
import { subjects } from '@/data/subjects'
import { Button } from '@/components/ui/Button'
import { Field, Select, Textarea, TextInput } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { overlayPortal } from '@/lib/overlayPortal'

const STATUSES: Status[] = ['Draft', 'In review', 'Published', 'Archived']

function emptyEssayData(): EssayAuthoringData {
  return { prompt: '', keyPoints: [], examinerNote: '', modelAnswer: '' }
}

function emptyEssay(): ManagedContentItem {
  return {
    id: '',
    kind: 'essay',
    title: '',
    subjectId: subjects[0]?.id ?? 'cvs',
    status: 'Draft',
    owner: 'Admin team',
    updatedAt: new Date().toISOString(),
    fields: { Prompt: '', ExaminerNote: '' },
    essayData: emptyEssayData(),
  }
}

/**
 * One key point, with its "write this legibly" flag on the row itself.
 *
 * The flag is a property of the point — one of the words an examiner scans
 * for, a diagnosis or an enzyme or an organism — not a second list a student
 * would need to be told to also read. A toggle keeps the two facts (this is a
 * point; this point is legible-marked) from ever being asked in two places
 * that could disagree.
 */
function KeyPointRow({ point, index, count, onChange, onRemove, onMove }: {
  point: EssayKeyPoint
  index: number
  count: number
  onChange: (patch: Partial<EssayKeyPoint>) => void
  onRemove: () => void
  onMove: (direction: -1 | 1) => void
}) {
  return (
    <div className="flex items-start gap-2 rounded-lg border border-line bg-surface-2/40 p-2.5">
      <div className="flex flex-col gap-0.5 pt-0.5">
        <button
          type="button"
          onClick={() => onMove(-1)}
          disabled={index === 0}
          className="grid size-6 place-items-center rounded text-ink-3 hover:bg-inset hover:text-ink disabled:opacity-30 disabled:hover:bg-transparent"
          aria-label={`Move key point ${index + 1} up`}
        >
          <Icon icon={ArrowUp} size={13} />
        </button>
        <button
          type="button"
          onClick={() => onMove(1)}
          disabled={index === count - 1}
          className="grid size-6 place-items-center rounded text-ink-3 hover:bg-inset hover:text-ink disabled:opacity-30 disabled:hover:bg-transparent"
          aria-label={`Move key point ${index + 1} down`}
        >
          <Icon icon={ArrowDown} size={13} />
        </button>
      </div>
      <div className="min-w-0 flex-1">
        <TextInput
          aria-label={`Key point ${index + 1}`}
          value={point.text}
          onChange={(event) => onChange({ text: event.target.value })}
          placeholder="e.g. Raised JVP"
        />
        <label className="mt-2 inline-flex items-center gap-1.5 text-[12px] text-ink-2">
          <input
            type="checkbox"
            className="accent-[var(--color-primary)]"
            checked={Boolean(point.legible)}
            onChange={(event) => onChange({ legible: event.target.checked || undefined })}
          />
          Write this legibly
        </label>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="grid size-9 shrink-0 place-items-center rounded text-ink-3 hover:bg-danger-tint hover:text-danger"
        aria-label={`Remove key point ${index + 1}`}
      >
        <Icon icon={Trash2} size={14} />
      </button>
    </div>
  )
}

export function EssayEditorDialog({ open, item, onClose, onSave }: {
  open: boolean
  item: ManagedContentItem | null
  onClose: () => void
  onSave: (item: ManagedContentItem) => void
}) {
  const [draft, setDraft] = useState<ManagedContentItem>(() => item ?? emptyEssay())

  useEffect(() => {
    if (open) setDraft(item ? { ...item, fields: { ...item.fields }, essayData: { ...emptyEssayData(), ...item.essayData } } : emptyEssay())
  }, [item, open])

  useEffect(() => {
    if (!open) return
    const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onEsc)
    return () => window.removeEventListener('keydown', onEsc)
  }, [onClose, open])

  const data = draft.essayData ?? emptyEssayData()
  const patchData = (patch: Partial<EssayAuthoringData>) => setDraft((current) => ({ ...current, essayData: { ...emptyEssayData(), ...current.essayData, ...patch } }))

  if (!open) return null

  const valid = Boolean(draft.title.trim() && data.prompt.trim() && data.keyPoints.length)

  const addPoint = () => patchData({ keyPoints: [...data.keyPoints, { id: newId('kp'), text: '' }] })
  const updatePoint = (id: string, patch: Partial<EssayKeyPoint>) =>
    patchData({ keyPoints: data.keyPoints.map((point) => point.id === id ? { ...point, ...patch } : point) })
  const removePoint = (id: string) => patchData({ keyPoints: data.keyPoints.filter((point) => point.id !== id) })
  const movePoint = (index: number, direction: -1 | 1) => {
    const target = index + direction
    if (target < 0 || target >= data.keyPoints.length) return
    const next = [...data.keyPoints]
    ;[next[index], next[target]] = [next[target], next[index]]
    patchData({ keyPoints: next })
  }

  return overlayPortal(
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="essay-editor-title">
      <button type="button" className="absolute inset-0 bg-ink/30 animate-fade" onClick={onClose} aria-label="Close editor" />
      <div className="absolute inset-x-0 bottom-0 w-full sm:left-1/2 sm:top-1/2 sm:bottom-auto sm:w-[min(94vw,720px)] sm:-translate-x-1/2 sm:-translate-y-1/2">
        <form
          className="animate-pop max-h-[calc(100dvh-env(safe-area-inset-top))] overflow-hidden rounded-t-2xl border border-line bg-surface pb-[env(safe-area-inset-bottom)] shadow-pop sm:rounded-xl sm:pb-0"
          onSubmit={(e) => {
            e.preventDefault()
            if (!valid) return
            onSave({
              ...draft,
              id: draft.id || `essay-${Date.now()}`,
              title: draft.title.trim(),
              updatedAt: new Date().toISOString(),
              fields: { Prompt: data.prompt, ExaminerNote: data.examinerNote },
              essayData: data,
            })
          }}
        >
          <div className="flex items-center gap-3 border-b border-line px-5 py-4">
            <span className="grid size-9 place-items-center rounded-lg bg-primary-tint text-primary-strong"><Icon icon={PenLine} size={17} /></span>
            <div className="min-w-0 flex-1">
              <h2 id="essay-editor-title" className="font-serif text-[18px] font-semibold text-ink">{item ? 'Edit written question' : 'Add written question'}</h2>
              <p className="text-[12px] text-ink-3">Prompt, key points, examiner note, and model answer.</p>
            </div>
            <button type="button" onClick={onClose} className="grid size-9 place-items-center rounded-lg text-ink-3 hover:bg-inset hover:text-ink" aria-label="Close editor"><Icon icon={X} size={18} /></button>
          </div>

          <div className="max-h-[calc(100dvh-11rem-env(safe-area-inset-top)-env(safe-area-inset-bottom))] space-y-5 overflow-y-auto overscroll-contain p-4 sm:max-h-[70vh] sm:p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Title" className="sm:col-span-2"><TextInput value={draft.title} onChange={(e) => setDraft((c) => ({ ...c, title: e.target.value }))} /></Field>
              <Field label="System / subject">
                <Select value={draft.subjectId} onChange={(e) => setDraft((c) => ({ ...c, subjectId: e.target.value }))}>
                  {subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                </Select>
              </Field>
              <Field label="Workflow status">
                <Select value={draft.status} onChange={(e) => setDraft((c) => ({ ...c, status: e.target.value as Status }))}>
                  {STATUSES.map((s) => <option key={s}>{s}</option>)}
                </Select>
              </Field>
              <Field label="Content owner" className="sm:col-span-2"><TextInput value={draft.owner} onChange={(e) => setDraft((c) => ({ ...c, owner: e.target.value }))} /></Field>
            </div>

            <Field label="Prompt" hint="The question exactly as it appears on the paper.">
              <Textarea className="min-h-24" value={data.prompt} onChange={(e) => patchData({ prompt: e.target.value })} />
            </Field>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[12.5px] font-medium text-ink-2">Key points</p>
                <span className="text-[11px] text-ink-3">{data.keyPoints.length} point{data.keyPoints.length === 1 ? '' : 's'}</span>
              </div>
              {data.keyPoints.length === 0 && (
                <p className="mb-2 text-[12px] text-ink-3">At least one key point is required — a student self-marks their answer against this list.</p>
              )}
              <div className={cn('space-y-2', data.keyPoints.length === 0 && 'hidden')}>
                {data.keyPoints.map((point, index) => (
                  <KeyPointRow
                    key={point.id}
                    point={point}
                    index={index}
                    count={data.keyPoints.length}
                    onChange={(patch) => updatePoint(point.id, patch)}
                    onRemove={() => removePoint(point.id)}
                    onMove={(direction) => movePoint(index, direction)}
                  />
                ))}
              </div>
              <Button type="button" variant="secondary" size="sm" iconLeft={Plus} className="mt-2" onClick={addPoint}>Add key point</Button>
            </div>

            <Field label="What the examiner scans for" hint="Guidance on how the answer is actually marked, shown to the student once they reveal it.">
              <Textarea className="min-h-20" value={data.examinerNote} onChange={(e) => patchData({ examinerNote: e.target.value })} />
            </Field>

            <Field label="Model answer" hint="A full written answer the student can compare their own against.">
              <Textarea className="min-h-32" value={data.modelAnswer} onChange={(e) => patchData({ modelAnswer: e.target.value })} />
            </Field>
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-line px-4 py-3 sm:px-5">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="primary" disabled={!valid}>{item ? 'Save changes' : 'Add written question'}</Button>
          </div>
        </form>
      </div>
    </div>,
  )
}
