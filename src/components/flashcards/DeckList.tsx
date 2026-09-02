import { useState } from 'react'
import { Layers, Plus, Play, Pencil, Trash2, X } from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { IconButton } from '@/components/ui/IconButton'
import { Icon } from '@/components/ui/Icon'
import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { Dialog } from '@/components/ui/Dialog'
import { TextInput, Textarea, Field } from '@/components/ui/Field'
import { SubjectTag } from '@/components/ui/Subject'
import { useT } from '@/lib/i18n'
import type { StoredDeck } from '@/lib/useDecks'
import { isDue, type CardSchedule } from '@/data/srs'
import type { DeckCard, StudentDeck } from '@/data/decks'

export interface StudyTarget {
  deckId: string
  title: string
  subjectId: string
  cards: DeckCard[]
  schedules: Record<string, CardSchedule>
}

interface Entry {
  id: string
  title: string
  subjectId?: string
  description: string
  cards: DeckCard[]
  schedules: Record<string, CardSchedule>
  provided: boolean
}

/** How many of a deck's cards are due for review versus never seen at all. */
function counts(entry: Pick<Entry, 'cards' | 'schedules'>, now: Date): { due: number; fresh: number } {
  let due = 0
  let fresh = 0
  for (const card of entry.cards) {
    const schedule = entry.schedules[card.id]
    if (!schedule || schedule.state === 'new') fresh++
    else if (isDue(schedule, now)) due++
  }
  return { due, fresh }
}

function newId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`
}

/**
 * The student's own decks and the published ones, side by side.
 *
 * A published deck only gains an entry in `decks` — and so a place to keep its
 * schedules — the moment someone studies it; until then its counts are read
 * straight off the catalogue, every card counted as new. That is why a
 * premade deck's cards are always read from `providedDecks`, never from
 * whatever a stale local mirror happens to hold.
 */
export function DeckList({
  decks,
  providedDecks,
  onStudy,
  onSaveDeck,
  onRemoveDeck,
}: {
  decks: Record<string, StoredDeck>
  providedDecks: StudentDeck[]
  onStudy: (target: StudyTarget) => void
  onSaveDeck: (deck: StoredDeck) => void
  onRemoveDeck: (id: string) => void
}) {
  const t = useT()
  const [creating, setCreating] = useState(false)
  const [managingId, setManagingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const now = new Date()

  const ownEntries: Entry[] = Object.values(decks)
    .filter((deck) => !deck.sourceId)
    .map((deck) => ({
      id: deck.id,
      title: deck.name,
      description: `${deck.cards.length} ${deck.cards.length === 1 ? t('card') : t('cards')}`,
      cards: deck.cards,
      schedules: deck.schedules,
      provided: false,
    }))
    .sort((a, b) => b.id.localeCompare(a.id))

  const providedEntries: Entry[] = providedDecks.map((deck) => {
    const mirror = decks[deck.id]
    return {
      id: deck.id,
      title: deck.title,
      subjectId: deck.subjectId,
      description: deck.description,
      cards: deck.cards,
      schedules: mirror?.sourceId === deck.id ? mirror.schedules : {},
      provided: true,
    }
  })

  function startStudy(entry: Entry) {
    if (entry.provided) {
      const mirror = decks[entry.id]
      const merged: StoredDeck = {
        id: entry.id,
        name: entry.title,
        sourceId: entry.id,
        cards: entry.cards,
        schedules: entry.schedules,
        createdAt: mirror?.createdAt ?? new Date().toISOString(),
      }
      onSaveDeck(merged)
      onStudy({ deckId: entry.id, title: entry.title, subjectId: entry.subjectId ?? '', cards: merged.cards, schedules: merged.schedules })
      return
    }
    onStudy({ deckId: entry.id, title: entry.title, subjectId: '', cards: entry.cards, schedules: entry.schedules })
  }

  function createDeck(name: string) {
    const trimmed = name.trim()
    if (!trimmed) return
    const id = newId('deck')
    onSaveDeck({ id, name: trimmed, cards: [], schedules: {}, createdAt: new Date().toISOString() })
    setCreating(false)
    setManagingId(id)
  }

  const managingDeck = managingId ? decks[managingId] : null
  const deletingDeck = deletingId ? decks[deletingId] : null

  const isEmpty = ownEntries.length === 0 && providedEntries.length === 0

  if (isEmpty) {
    return (
      <>
        <Panel className="p-10 text-center">
          <EmptyState
            icon={Layers}
            title={t('No decks yet')}
            description={t('Create your own deck to study by spaced repetition, or check back once a published deck appears here.')}
            action={<Button variant="primary" size="sm" iconLeft={Plus} onClick={() => setCreating(true)}>{t('New deck')}</Button>}
          />
        </Panel>
        {creating && <CreateDeckDialog onClose={() => setCreating(false)} onCreate={createDeck} />}
      </>
    )
  }

  return (
    <div className="space-y-5">
      <Panel>
        <PanelHeader
          title={t('Your decks')}
          hint={String(ownEntries.length)}
          action={<Button size="sm" variant="secondary" iconLeft={Plus} onClick={() => setCreating(true)}>{t('New deck')}</Button>}
        />
        {ownEntries.length === 0 ? (
          <p className="px-4 py-6 text-center text-[12.5px] text-ink-3">{t('You have not created a deck yet.')}</p>
        ) : (
          <ul className="divide-y divide-line">
            {ownEntries.map((entry) => (
              <DeckRow
                key={entry.id}
                entry={entry}
                now={now}
                onStudy={() => startStudy(entry)}
                onManage={() => setManagingId(entry.id)}
                onDelete={() => setDeletingId(entry.id)}
              />
            ))}
          </ul>
        )}
      </Panel>

      <Panel>
        <PanelHeader title={t('Provided decks')} hint={String(providedEntries.length)} />
        {providedEntries.length === 0 ? (
          <p className="px-4 py-6 text-center text-[12.5px] text-ink-3">{t('Published decks appear here once they are released.')}</p>
        ) : (
          <ul className="divide-y divide-line">
            {providedEntries.map((entry) => (
              <DeckRow key={entry.id} entry={entry} now={now} onStudy={() => startStudy(entry)} />
            ))}
          </ul>
        )}
      </Panel>

      {creating && <CreateDeckDialog onClose={() => setCreating(false)} onCreate={createDeck} />}

      {managingDeck && (
        <ManageDeckDialog
          deck={managingDeck}
          onClose={() => setManagingId(null)}
          onSave={onSaveDeck}
        />
      )}

      {deletingDeck && (
        <DeleteDeckDialog
          name={deletingDeck.name}
          onClose={() => setDeletingId(null)}
          onConfirm={() => { onRemoveDeck(deletingDeck.id); setDeletingId(null) }}
        />
      )}
    </div>
  )
}

function DeckRow({
  entry,
  now,
  onStudy,
  onManage,
  onDelete,
}: {
  entry: Entry
  now: Date
  onStudy: () => void
  onManage?: () => void
  onDelete?: () => void
}) {
  const t = useT()
  const { due, fresh } = counts(entry, now)
  const nothingToStudy = due === 0 && fresh === 0

  return (
    <li className="flex flex-wrap items-center gap-x-4 gap-y-2.5 px-4 py-3.5">
      <span className="grid size-10 shrink-0 place-items-center rounded-md border border-line bg-surface-2 text-ink-2">
        <Icon icon={Layers} size={18} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-[14px] font-medium text-ink">{entry.title}</p>
          {entry.provided && <Badge tone="outline">{t('Provided')}</Badge>}
        </div>
        <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-[12px] text-ink-3">
          {entry.subjectId && <SubjectTag id={entry.subjectId} />}
          {entry.description && <span>{entry.description}</span>}
        </p>
      </div>
      <div className="flex items-center gap-3 text-[12.5px] text-ink-3">
        <span><span className="tnum font-mono font-medium text-ink-2">{due}</span> {t('due')}</span>
        <span><span className="tnum font-mono font-medium text-ink-2">{fresh}</span> {t('new')}</span>
      </div>
      <div className="flex items-center gap-1.5">
        {onManage && <IconButton icon={Pencil} label={t('Add and edit cards')} size="sm" onClick={onManage} />}
        {onDelete && <IconButton icon={Trash2} label={t('Delete deck')} size="sm" onClick={onDelete} />}
        <Button variant="primary" size="sm" iconLeft={Play} onClick={onStudy} disabled={nothingToStudy}>
          {t('Study')}
        </Button>
      </div>
    </li>
  )
}

function CreateDeckDialog({ onClose, onCreate }: { onClose: () => void; onCreate: (name: string) => void }) {
  const t = useT()
  const [name, setName] = useState('')
  return (
    <Dialog onClose={onClose} label={t('New deck')} size="sm">
      <PanelHeader title={t('New deck')} icon={Layers} />
      <div className="space-y-4 p-5">
        <Field label={t('Deck name')} htmlFor="deck-name">
          <TextInput
            id="deck-name"
            autoFocus
            value={name}
            onChange={(event) => setName(event.target.value)}
            onKeyDown={(event) => { if (event.key === 'Enter') onCreate(name) }}
            placeholder={t('e.g. Cranial nerves')}
          />
        </Field>
        <div className="flex justify-end gap-2 border-t border-line pt-4">
          <Button variant="ghost" onClick={onClose}>{t('Cancel')}</Button>
          <Button variant="primary" onClick={() => onCreate(name)} disabled={!name.trim()}>{t('Create deck')}</Button>
        </div>
      </div>
    </Dialog>
  )
}

function ManageDeckDialog({
  deck,
  onClose,
  onSave,
}: {
  deck: StoredDeck
  onClose: () => void
  onSave: (deck: StoredDeck) => void
}) {
  const t = useT()
  const [front, setFront] = useState('')
  const [back, setBack] = useState('')

  function addCard() {
    if (!front.trim() || !back.trim()) return
    onSave({ ...deck, cards: [...deck.cards, { id: newId('card'), front: front.trim(), back: back.trim() }] })
    setFront('')
    setBack('')
  }

  function updateCard(cardId: string, patch: Partial<DeckCard>) {
    onSave({ ...deck, cards: deck.cards.map((card) => (card.id === cardId ? { ...card, ...patch } : card)) })
  }

  function removeCard(cardId: string) {
    const { [cardId]: _gone, ...schedules } = deck.schedules
    onSave({ ...deck, cards: deck.cards.filter((card) => card.id !== cardId), schedules })
  }

  return (
    <Dialog onClose={onClose} label={t('Manage deck')} size="lg">
      <PanelHeader title={deck.name} icon={Layers} action={<IconButton icon={X} label={t('Close')} size="sm" onClick={onClose} />} />
      <div className="max-h-[65dvh] space-y-4 overflow-y-auto p-5">
        {deck.cards.length === 0 ? (
          <p className="text-[12.5px] text-ink-3">{t('No cards yet. Add the first one below.')}</p>
        ) : (
          <ul className="space-y-2.5">
            {deck.cards.map((card) => (
              <li key={card.id} className="flex flex-wrap items-start gap-2 rounded-lg border border-line bg-surface-2/40 p-2.5">
                <TextInput
                  value={card.front}
                  onChange={(event) => updateCard(card.id, { front: event.target.value })}
                  placeholder={t('Front')}
                  className="flex-1 basis-52"
                />
                <TextInput
                  value={card.back}
                  onChange={(event) => updateCard(card.id, { back: event.target.value })}
                  placeholder={t('Back')}
                  className="flex-1 basis-52"
                />
                <IconButton icon={Trash2} label={t('Delete card')} size="sm" onClick={() => removeCard(card.id)} />
              </li>
            ))}
          </ul>
        )}

        <div className="space-y-2.5 border-t border-line pt-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">{t('Add a card')}</p>
          <div className="flex flex-wrap items-start gap-2">
            <Textarea
              value={front}
              onChange={(event) => setFront(event.target.value)}
              placeholder={t('Front')}
              className="min-h-[2.75rem] flex-1 basis-52"
            />
            <Textarea
              value={back}
              onChange={(event) => setBack(event.target.value)}
              placeholder={t('Back')}
              className="min-h-[2.75rem] flex-1 basis-52"
            />
            <Button variant="primary" iconLeft={Plus} onClick={addCard} disabled={!front.trim() || !back.trim()}>
              {t('Add')}
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

function DeleteDeckDialog({ name, onClose, onConfirm }: { name: string; onClose: () => void; onConfirm: () => void }) {
  const t = useT()
  return (
    <Dialog onClose={onClose} label={t('Delete this deck')} size="sm">
      <PanelHeader title={t('Delete this deck')} icon={Trash2} />
      <div className="space-y-4 p-5">
        <p className="text-[13.5px] leading-relaxed text-ink-2">
          {t('This removes')} <span className="font-medium text-ink">{name}</span> {t('and every card and schedule in it. This cannot be undone.')}
        </p>
        <div className="flex justify-end gap-2 border-t border-line pt-4">
          <Button variant="ghost" onClick={onClose}>{t('Cancel')}</Button>
          <Button variant="danger" iconLeft={Trash2} onClick={onConfirm}>{t('Delete')}</Button>
        </div>
      </div>
    </Dialog>
  )
}
