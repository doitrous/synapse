import { useMemo, useState } from 'react'
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react'
import { Dialog } from '@/components/ui/Dialog'
import { PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Field, TextInput, Select } from '@/components/ui/Field'
import { useT } from '@/lib/i18n'
import { ensureV2 } from '@/data/flashcards/migration'
import { quickAddFlashcard, basicNoteFieldsFromText } from '@/lib/flashcards/quickAdd'

const NEW_DECK = '__new_deck__'

/** Read the student's own (non-catalogue) deck ids and names from storage. */
function readOwnDecks(): { id: string; name: string }[] {
  try {
    const raw = localStorage.getItem('synapse.flashcards.collection.v2')
    const collection = ensureV2(raw ? JSON.parse(raw) : null, new Date())
    return Object.values(collection.decks)
      .filter((deck) => !deck.sourceId)
      .map((deck) => ({ id: deck.id, name: deck.name }))
      .sort((a, b) => a.name.localeCompare(b.name))
  } catch {
    return []
  }
}

/**
 * Capture a flashcard from anywhere — a selected phrase, a question, a passage.
 *
 * Deliberately standalone: it writes straight to the flashcards collection in
 * storage through `quickAddFlashcard`, so it works on any screen without the
 * heavy per-page `useFlashcards` hook. Front/back are captured as plain text and
 * escaped on save; the deck is an existing one or a new named deck.
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
  const decks = useMemo(readOwnDecks, [])
  const [front, setFront] = useState(initialFront.trim())
  const [back, setBack] = useState(initialBack.trim())
  const [deckChoice, setDeckChoice] = useState(decks[0]?.id ?? NEW_DECK)
  const [newDeckName, setNewDeckName] = useState('')
  const [saved, setSaved] = useState<{ deckName: string } | null>(null)

  const creatingDeck = deckChoice === NEW_DECK
  // A new deck falls back to "Quick capture" when unnamed, so only a front is required.
  const canSave = front.trim() !== ''

  function reset(keepDeck: boolean) {
    setFront('')
    setBack('')
    setSaved(null)
    if (!keepDeck) setDeckChoice(decks[0]?.id ?? NEW_DECK)
  }

  function save() {
    if (front.trim() === '') return
    const fields = basicNoteFieldsFromText(front, back)
    const result = quickAddFlashcard({
      front: fields.front,
      back: fields.back,
      deckId: creatingDeck ? undefined : deckChoice,
      deckName: creatingDeck ? newDeckName : undefined,
    })
    const chosen = decks.find((d) => d.id === result.deckId)
    setSaved({ deckName: chosen?.name ?? (newDeckName.trim() || 'Quick capture') })
  }

  return (
    <Dialog onClose={onClose} label={t('Create a flashcard')} size="md">
      <PanelHeader title={t('Create a flashcard')} icon={Sparkles} />
      {saved ? (
        <div className="space-y-4 p-5">
          <div className="flex items-start gap-2.5 rounded-lg border border-success/25 bg-success-tint px-3 py-3">
            <Icon icon={CheckCircle2} size={18} className="mt-0.5 shrink-0 text-success" />
            <p className="text-[13.5px] leading-relaxed text-ink-2">
              {t('Flashcard added to')} <b className="text-ink">{saved.deckName}</b>. {t('Study it from the Flashcards tab whenever you are ready.')}
            </p>
          </div>
          <div className="flex justify-end gap-2 border-t border-line pt-4">
            <Button variant="secondary" onClick={() => reset(true)}>{t('Create another')}</Button>
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
            <Select id="qa-deck" value={deckChoice} onChange={(e) => setDeckChoice(e.target.value)}>
              {decks.map((deck) => <option key={deck.id} value={deck.id}>{deck.name}</option>)}
              <option value={NEW_DECK}>{t('＋ New deck')}</option>
            </Select>
          </Field>
          {creatingDeck && (
            <Field label={t('New deck name')} hint={t('Optional — defaults to “Quick capture”.')} htmlFor="qa-deckname">
              <TextInput id="qa-deckname" value={newDeckName} onChange={(e) => setNewDeckName(e.target.value)} placeholder={t('e.g. Cardiology')} />
            </Field>
          )}
          <div className="flex items-center gap-2 border-t border-line pt-4">
            <Button variant="primary" iconLeft={Sparkles} onClick={save} disabled={!canSave}>{t('Create flashcard')}</Button>
            <a href="/app/flashcards" className="ms-auto inline-flex items-center gap-1 text-[12.5px] font-medium text-ink-2 hover:text-ink">
              {t('Open Flashcards')} <Icon icon={ArrowRight} size={13} />
            </a>
          </div>
        </div>
      )}
    </Dialog>
  )
}
