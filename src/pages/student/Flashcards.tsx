import { useMemo, useState } from 'react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { useT } from '@/lib/i18n'
import { useDecks } from '@/lib/useDecks'
import { usePersistentState } from '@/lib/usePersistentState'
import { CONTENT_LEDGER_STORAGE_KEY, initialManagedContent, type ManagedContentItem } from '@/data/contentControl'
import { managedDeckToStudentDeck, type StudentDeck } from '@/data/decks'
import { DeckList, type StudyTarget } from '@/components/flashcards/DeckList'
import { CardRunner } from '@/components/flashcards/CardRunner'

/**
 * Study a deck at a time, on Anki's own defaults.
 *
 * The catalogue and the student's progress on it are read separately and
 * joined here — `decks.ts` is why: a published deck is content, and what a
 * student knows of it is their own evidence, kept under their own key.
 */
export function Flashcards() {
  const t = useT()
  const { decks, dailyCounts, saveDeck, removeDeck, gradeCard } = useDecks()
  const [ledger] = usePersistentState<ManagedContentItem[]>(CONTENT_LEDGER_STORAGE_KEY, initialManagedContent)
  const [active, setActive] = useState<StudyTarget | null>(null)

  const providedDecks: StudentDeck[] = useMemo(
    () => ledger.filter((item) => item.kind === 'deck').map(managedDeckToStudentDeck).filter((deck): deck is StudentDeck => deck !== null),
    [ledger],
  )

  if (active) {
    return (
      <CardRunner
        deckId={active.deckId}
        title={active.title}
        subjectId={active.subjectId}
        cards={active.cards}
        schedules={active.schedules}
        dailyCounts={dailyCounts}
        onGrade={(cardId, next) => gradeCard(active.deckId, cardId, next)}
        onExit={() => setActive(null)}
      />
    )
  }

  return (
    <PageContainer>
      <PageHeader
        title={t('Flashcards')}
        description={t('Study on Anki’s own schedule — the cards you build yourself, alongside every deck that has been published for you.')}
      />
      <DeckList
        decks={decks}
        providedDecks={providedDecks}
        onStudy={setActive}
        onSaveDeck={saveDeck}
        onRemoveDeck={removeDeck}
      />
    </PageContainer>
  )
}
