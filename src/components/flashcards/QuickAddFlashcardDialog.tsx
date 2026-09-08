import { LoadingRegion } from '@/components/loading/SkeletonParts'
import { Skeleton } from '@/components/ui/Skeleton'
import { useMemo, useRef, useState } from 'react'
import { Layers, CheckCircle2 } from 'lucide-react'
import { Dialog } from '@/components/ui/Dialog'
import { PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Field, TextInput, Select } from '@/components/ui/Field'
import { useT } from '@/lib/i18n'
import { usePersistentState } from '@/lib/usePersistentState'
import { ensureV2, type StoredDecksV1 } from '@/data/flashcards/migration'
import type { FlashcardCollection } from '@/data/flashcards/model'
import { appendBasicNote, basicNoteFieldsFromText, quickAddIds, FLASHCARDS_COLLECTION_KEY, FLASHCARDS_LEGACY_DECKS_KEY } from '@/lib/flashcards/quickAdd'

const NEW_DECK = '__new_deck__'
const DEFAULT_DECK_NAME = 'Quick capture'

/**
 * Capture a flashcard from anywhere — a selected phrase, a question, a passage.
 *
 * It holds the collection through `usePersistentState`, the same persistence
 * boundary `useFlashcards` uses, so a saved card reaches the backend in live
 * mode and a mounted Flashcards page stays in sync in demo mode — a raw
 * `localStorage` write would be dropped in live mode and desync a mounted reader
 * in demo mode. Front/back are captured as plain text and escaped on save; the
 * deck is an existing one or a new named deck.
 */
export function QuickAddFlashcardDialog({
  initialFront = '',
  initialBack = '',
  onClose,
}: {
  initialFront?: string
  initialBack?: string
  onClose: () => void
}) {
  const t = useT()
  // Read and seed these keys IDENTICALLY to useFlashcards, which owns them:
  // stateStore shares one document per key and keeps only the first caller's
  // seed, so a mismatched seed would crash this dialog or desync the hook. The
  // effective collection is the committed v2 doc, or the v1 legacy decks migrated
  // forward — reading only the v2 key would miss (and a save would clobber) the
  // legacy decks useFlashcards migrates lazily in memory without committing.
  const [storedV2, setStoredV2, status] = usePersistentState<FlashcardCollection | null>(FLASHCARDS_COLLECTION_KEY, null)
  const [legacyV1] = usePersistentState<StoredDecksV1>(FLASHCARDS_LEGACY_DECKS_KEY, {})
  const bootNow = useRef(new Date()).current
  const collection = useMemo(() => storedV2 ?? ensureV2(legacyV1, bootNow), [storedV2, legacyV1, bootNow])

  const decks = useMemo(
    () => Object.values(collection.decks)
      .filter((deck) => !deck.sourceId)
      .map((deck) => ({ id: deck.id, name: deck.name }))
      .sort((a, b) => a.name.localeCompare(b.name)),
    [collection],
  )

  const [front, setFront] = useState(initialFront.trim())
  const [back, setBack] = useState(initialBack.trim())
  // null until the student picks: the effective choice tracks the deck list,
  // which arrives asynchronously in live mode.
  const [deckChoice, setDeckChoice] = useState<string | null>(null)
  const [newDeckName, setNewDeckName] = useState('')
  const [saved, setSaved] = useState<{ deckName: string } | null>(null)

  const effectiveDeck = deckChoice ?? decks[0]?.id ?? NEW_DECK
  const creatingDeck = effectiveDeck === NEW_DECK
  // In live mode the write is dropped until the document has hydrated, so hold
  // the save until then rather than silently losing the card.
  const canSave = front.trim() !== '' && status.hydrated

  function save() {
    if (!canSave) return
    const now = new Date()
    const { noteId, newDeckId } = quickAddIds()
    const fields = basicNoteFieldsFromText(front, back)
    const deckName = creatingDeck ? (newDeckName.trim() || DEFAULT_DECK_NAME) : (decks.find((d) => d.id === effectiveDeck)?.name ?? DEFAULT_DECK_NAME)
    const committedDeckId = creatingDeck ? newDeckId : effectiveDeck

    setStoredV2((prev) => appendBasicNote(
      prev ?? ensureV2(legacyV1, now),
      { front: fields.front, back: fields.back, deckId: creatingDeck ? undefined : effectiveDeck, deckName: creatingDeck ? newDeckName : undefined },
      { now, noteId, newDeckId },
    ).collection)

    // Point the next card at the deck just used, so "Create another" appends to
    // it instead of minting a second same-named deck.
    setDeckChoice(committedDeckId)
    setNewDeckName('')
    setSaved({ deckName })
  }

  function createAnother() {
    setFront('')
    setBack('')
    setSaved(null)
  }

  return (
    <Dialog onClose={onClose} label={t('Create a flashcard')} size="md">
      <PanelHeader title={t('Create a flashcard')} icon={Layers} />
      {saved ? (
        <div className="space-y-4 p-5">
          <div className="flex items-start gap-2.5 rounded-lg border border-success/25 bg-success-tint px-3 py-3">
            <Icon icon={CheckCircle2} size={18} className="mt-0.5 shrink-0 text-success" />
            <p className="text-[13.5px] leading-relaxed text-ink-2">
              {t('Flashcard added to')} <b className="text-ink">{saved.deckName}</b>. {t('Study it from the Flashcards tab whenever you are ready.')}
            </p>
          </div>
          <div className="flex justify-end gap-2 border-t border-line pt-4">
            <Button variant="secondary" onClick={createAnother}>{t('Create another')}</Button>
            <Button variant="primary" onClick={onClose}>{t('Done')}</Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4 p-5">
          <Field label={t('Front')} hint={t('The prompt — a question or the term to recall.')} htmlFor="qa-front">
            <textarea
              id="qa-front"
              value={front}
              onChange={(e) => setFront(e.target.value)}
              rows={2}
              autoFocus
              className="w-full resize-y rounded-md border border-line bg-surface px-3 py-2 text-[13.5px] text-ink outline-none focus:border-primary-strong/40 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary"
              placeholder={t('e.g. Which artery supplies the SA node?')}
            />
          </Field>
          <Field label={t('Back')} hint={t('The answer.')} htmlFor="qa-back">
            <textarea
              id="qa-back"
              value={back}
              onChange={(e) => setBack(e.target.value)}
              rows={2}
              className="w-full resize-y rounded-md border border-line bg-surface px-3 py-2 text-[13.5px] text-ink outline-none focus:border-primary-strong/40 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary"
              placeholder={t('The answer')}
            />
          </Field>
          <Field label={t('Deck')} htmlFor="qa-deck">
            <Select id="qa-deck" value={effectiveDeck} onChange={(e) => setDeckChoice(e.target.value)}>
              {decks.map((deck) => <option key={deck.id} value={deck.id}>{deck.name}</option>)}
              <option value={NEW_DECK}>{t('＋ New deck')}</option>
            </Select>
          </Field>
          {creatingDeck && (
            <Field label={t('New deck name')} hint={t('Optional — defaults to “Quick capture”.')} htmlFor="qa-deckname">
              <TextInput id="qa-deckname" value={newDeckName} onChange={(e) => setNewDeckName(e.target.value)} placeholder={t('e.g. Cardiology')} />
            </Field>
          )}
          <div className="flex items-center gap-3 border-t border-line pt-4">
            <Button variant="primary" iconLeft={Layers} onClick={save} disabled={!canSave}>{t('Create flashcard')}</Button>
            {!status.hydrated && <LoadingRegion label={t('Loading your decks…')}><Skeleton className="h-4 w-24" /></LoadingRegion>}
            <Button variant="ghost" className="ms-auto" onClick={onClose}>{t('Cancel')}</Button>
          </div>
        </div>
      )}
    </Dialog>
  )
}
