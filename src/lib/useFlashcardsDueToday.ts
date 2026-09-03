import { useMemo, useRef } from 'react'
import { CONTENT_LEDGER_STORAGE_KEY, initialManagedContent, type ManagedContentItem } from '@/data/contentControl'
import { managedDeckToStudentDeck, type StudentDeck } from '@/data/decks'
import { deckDashboardStats } from '@/data/flashcards/deckSummary'
import { useFlashcards } from '@/lib/useFlashcards'
import { usePersistentState } from '@/lib/usePersistentState'

/**
 * Cards due right now, across every deck — the same figure Revise's own
 * Flashcards card computes (`deckDashboardStats(...).dueToday`), so the
 * dashboard tile never risks a second, subtly different definition of "due"
 * (a plain per-deck `reviewDue` sum undercounts relearning cards — see the
 * comment on `dueLeft` in `Revise.tsx`).
 *
 * ponytail: duplicates Revise.tsx's ledger-join + due calc rather than
 * sharing it; pull both into one hook if a third caller needs this figure.
 */
export function useFlashcardsDueToday(): number {
  const [ledger] = usePersistentState<ManagedContentItem[]>(CONTENT_LEDGER_STORAGE_KEY, initialManagedContent)
  const providedDecks: StudentDeck[] = useMemo(
    () =>
      ledger
        .filter((item) => item.kind === 'deck')
        .map(managedDeckToStudentDeck)
        .filter((deck): deck is StudentDeck => deck !== null),
    [ledger],
  )
  const { allCards, reviewEvents } = useFlashcards(providedDecks)
  const now = useRef(new Date()).current
  return useMemo(
    () => deckDashboardStats(allCards.map((entry) => entry.meta), reviewEvents, now).dueToday,
    [allCards, reviewEvents, now],
  )
}
