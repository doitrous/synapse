import { useEffect, useState } from 'react'
import { X, Plus, Trash2, ArrowUp, ArrowDown, Layers } from 'lucide-react'
import type { Status } from '@/data/admin'
import type { ManagedContentItem } from '@/data/contentControl'
import type { DeckAuthoringData, DeckCard } from '@/data/decks'
import { subjects } from '@/data/subjects'
import { newId } from '@/data/userLibrary'
import { Button } from '@/components/ui/Button'
import { IconButton } from '@/components/ui/IconButton'
import { Field, Select, TextInput, Textarea } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { overlayPortal } from '@/lib/overlayPortal'

const STATUSES: Status[] = ['Draft', 'In review', 'Published', 'Archived']

function emptyDeckData(): DeckAuthoringData {
  return { description: '', cards: [] }
}

function emptyDeck(): ManagedContentItem {
  return {
    id: '',
    kind: 'deck',
    title: '',
    subjectId: subjects[0]?.id ?? 'cvs',
    status: 'Draft',
    owner: 'Admin team',
    updatedAt: new Date().toISOString(),
    fields: { Description: '' },
    deckData: emptyDeckData(),
  }
}

export function DeckEditorDialog({ open, item, onClose, onSave }: {
  open: boolean
  item: ManagedContentItem | null
  onClose: () => void
  onSave: (item: ManagedContentItem) => void
}) {
  const [draft, setDraft] = useState<ManagedContentItem>(() => item ?? emptyDeck())
  const [front, setFront] = useState('')
  const [back, setBack] = useState('')

  useEffect(() => {
    if (open) {
      setDraft(item ? { ...item, fields: { ...item.fields }, deckData: { ...emptyDeckData(), ...item.deckData } } : emptyDeck())
      setFront('')
      setBack('')
    }
  }, [item, open])

  useEffect(() => {
    if (!open) return
    const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onEsc)
    return () => window.removeEventListener('keydown', onEsc)
  }, [onClose, open])

  if (!open) return null

  const data = draft.deckData ?? emptyDeckData()
  const patchData = (patch: Partial<DeckAuthoringData>) => setDraft((c) => ({ ...c, deckData: { ...emptyDeckData(), ...c.deckData, ...patch } }))
  const valid = draft.title.trim() && draft.subjectId && data.cards.length > 0

  const addCard = () => {
    if (!front.trim() || !back.trim()) return
    patchData({ cards: [...data.cards, { id: newId('card'), front: front.trim(), back: back.trim() }] })
    setFront('')
    setBack('')
  }
  const updateCard = (id: string, patch: Partial<DeckCard>) => patchData({ cards: data.cards.map((c) => c.id === id ? { ...c, ...patch } : c) })
  const removeCard = (id: string) => patchData({ cards: data.cards.filter((c) => c.id !== id) })
  const moveCard = (index: number, direction: -1 | 1) => {
    const target = index + direction
    if (target < 0 || target >= data.cards.length) return
    const next = [...data.cards]
    ;[next[index], next[target]] = [next[target], next[index]]
    patchData({ cards: next })
  }

  return overlayPortal(
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="deck-editor-title">
      <button type="button" className="absolute inset-0 bg-ink/30 animate-fade" onClick={onClose} aria-label="Close editor" />
      <div className="absolute inset-x-0 bottom-0 w-full sm:left-1/2 sm:top-1/2 sm:bottom-auto sm:w-[min(94vw,720px)] sm:-translate-x-1/2 sm:-translate-y-1/2">
        <form
          className="animate-pop max-h-[calc(100dvh-env(safe-area-inset-top))] overflow-hidden rounded-t-2xl border border-line bg-surface pb-[env(safe-area-inset-bottom)] shadow-pop sm:rounded-xl sm:pb-0"
          onSubmit={(e) => {
            e.preventDefault()
            if (!valid) return
            onSave({
              ...draft,
              id: draft.id || `deck-${Date.now()}`,
              title: draft.title.trim(),
              updatedAt: new Date().toISOString(),
              fields: { ...draft.fields, Description: data.description },
            })
          }}
        >
          <div className="flex items-center gap-3 border-b border-line px-5 py-4">
            <span className="grid size-9 place-items-center rounded-lg bg-primary-tint text-primary-strong"><Icon icon={Layers} size={17} /></span>
            <div className="min-w-0 flex-1">
              <h2 id="deck-editor-title" className="font-serif text-[18px] font-semibold text-ink">{item ? 'Edit deck' : 'Add deck'}</h2>
              <p className="text-[12px] text-ink-3">Flashcard deck · cards students study by spaced repetition.</p>
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
              <Field label="What this deck covers" className="sm:col-span-2"><Textarea value={data.description} onChange={(e) => patchData({ description: e.target.value })} className="min-h-20" /></Field>
            </div>

            <div className="rounded-lg border border-line p-4">
              <div className="mb-2 flex items-center gap-2">
                <Icon icon={Layers} size={15} className="text-primary" />
                <h3 className="text-[13.5px] font-semibold text-ink">Cards</h3>
                <span className="text-[11.5px] text-ink-3">{data.cards.length} {data.cards.length === 1 ? 'card' : 'cards'}</span>
              </div>
              {data.cards.length === 0 && (
                <p className="mb-2 text-[12px] text-ink-3">No cards yet. A deck needs at least one to publish.</p>
              )}
              <ul className="space-y-2">
                {data.cards.map((card, index) => (
                  <li key={card.id} className="flex flex-wrap items-start gap-2 rounded-md border border-line bg-surface-2/40 p-2.5">
                    <div className="flex shrink-0 flex-col gap-1 pt-1">
                      <IconButton icon={ArrowUp} label={`Move card ${index + 1} up`} size="sm" disabled={index === 0} onClick={() => moveCard(index, -1)} />
                      <IconButton icon={ArrowDown} label={`Move card ${index + 1} down`} size="sm" disabled={index === data.cards.length - 1} onClick={() => moveCard(index, 1)} />
                    </div>
                    <Textarea
                      aria-label={`Front of card ${index + 1}`}
                      value={card.front}
                      onChange={(e) => updateCard(card.id, { front: e.target.value })}
                      placeholder="Front"
                      className="min-h-[3.25rem] flex-1 basis-52 text-[13px]"
                    />
                    <Textarea
                      aria-label={`Back of card ${index + 1}`}
                      value={card.back}
                      onChange={(e) => updateCard(card.id, { back: e.target.value })}
                      placeholder="Back"
                      className="min-h-[3.25rem] flex-1 basis-52 text-[13px]"
                    />
                    <IconButton icon={Trash2} label={`Delete card ${index + 1}`} size="sm" onClick={() => removeCard(card.id)} />
                  </li>
                ))}
              </ul>

              <div className="mt-3 flex flex-wrap items-start gap-2 border-t border-line pt-3">
                <Textarea aria-label="New card front" value={front} onChange={(e) => setFront(e.target.value)} placeholder="Front" className="min-h-[2.75rem] flex-1 basis-52 text-[13px]" />
                <Textarea aria-label="New card back" value={back} onChange={(e) => setBack(e.target.value)} placeholder="Back" className="min-h-[2.75rem] flex-1 basis-52 text-[13px]" />
                <Button type="button" variant="secondary" size="sm" iconLeft={Plus} onClick={addCard} disabled={!front.trim() || !back.trim()}>Add card</Button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-line px-4 py-3 sm:px-5">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="primary" disabled={!valid}>{item ? 'Save changes' : 'Add deck'}</Button>
          </div>
        </form>
      </div>
    </div>,
  )
}
