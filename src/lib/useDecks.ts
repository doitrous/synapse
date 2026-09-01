import { useCallback } from 'react'
import { usePersistentState } from './usePersistentState'
import type { CardSchedule } from '@/data/srs'

/**
 * A student's own flashcard decks, and how well they know each card.
 *
 * A deck taken from the catalogue is content; the schedule that says when a
 * card comes back is evidence of one student's own recall, so it is kept here
 * rather than on the deck — see `decks.ts` for why. Keying `schedules` by card
 * id, on the student's own document, means a catalogue edit that fixes a typo
 * never touches anyone's progress, and two students on the same published deck
 * never see each other's intervals.
 */

const DECKS_KEY = 'nishany.flashcards.decks.v1'
const DAILY_COUNTS_KEY = 'nishany.flashcards.dailyCounts.v1'

export interface StoredDeck {
  id: string
  name: string
  /** Set when this deck mirrors a published one, so its cards come from there. */
  sourceId?: string
  cards: { id: string; front: string; back: string }[]
  /** Card id → schedule. Covers premade cards too: the schedule is the student's. */
  schedules: Record<string, CardSchedule>
  createdAt: string
}

/**
 * How many new and review cards have been graded today, and which day that is.
 *
 * `dueQueue`'s caps (20 new, 200 reviews) are Anki's per-day limits, not
 * per-sitting ones — without a running count a student who studies in three
 * short sessions would see sixty new cards, not twenty.
 */
export interface DailyDeckCounts {
  day: string
  newSeen: number
  reviewsSeen: number
}

const EMPTY_COUNTS: DailyDeckCounts = { day: '', newSeen: 0, reviewsSeen: 0 }

/**
 * Local calendar date, `YYYY-MM-DD` — not UTC. A student studying at 11pm and
 * a student studying at 1am local time are on different days regardless of
 * what UTC thinks, and comparing against UTC would reset their allowance at
 * the wrong moment (or fail to reset it at all, depending on the timezone).
 */
function localDay(now: Date): string {
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}

/** The day's counts, zeroed if `stored` is left over from an earlier day. */
function countsForToday(stored: DailyDeckCounts, today: string): DailyDeckCounts {
  return stored.day === today ? stored : { day: today, newSeen: 0, reviewsSeen: 0 }
}

function isNewCard(schedule: CardSchedule | undefined): boolean {
  return !schedule || schedule.state === 'new'
}

export function useDecks(): {
  decks: Record<string, StoredDeck>
  dailyCounts: DailyDeckCounts
  saveDeck: (deck: StoredDeck) => void
  removeDeck: (id: string) => void
  gradeCard: (deckId: string, cardId: string, next: CardSchedule) => void
} {
  const [decks, setDecks] = usePersistentState<Record<string, StoredDeck>>(DECKS_KEY, {})
  const [counts, setCounts] = usePersistentState<DailyDeckCounts>(DAILY_COUNTS_KEY, EMPTY_COUNTS)

  const saveDeck = useCallback((deck: StoredDeck) => {
    setDecks((current) => ({ ...current, [deck.id]: deck }))
  }, [setDecks])

  const removeDeck = useCallback((id: string) => {
    setDecks((current) => {
      if (!(id in current)) return current
      const { [id]: _going, ...rest } = current
      return rest
    })
  }, [setDecks])

  /**
   * Record a grade and fold it into today's count in the same call, so a card
   * graded right at midnight is never counted against the wrong day: both
   * writes are stamped from the one `Date` this closure reads.
   */
  const gradeCard = useCallback((deckId: string, cardId: string, next: CardSchedule) => {
    const deck = decks[deckId]
    if (!deck) return
    const wasNew = isNewCard(deck.schedules[cardId])
    const today = localDay(new Date())

    setDecks((current) => {
      const currentDeck = current[deckId]
      if (!currentDeck) return current
      return {
        ...current,
        [deckId]: { ...currentDeck, schedules: { ...currentDeck.schedules, [cardId]: next } },
      }
    })

    setCounts((current) => {
      const base = countsForToday(current, today)
      return wasNew
        ? { ...base, newSeen: base.newSeen + 1 }
        : { ...base, reviewsSeen: base.reviewsSeen + 1 }
    })
  }, [decks, setDecks, setCounts])

  return { decks, dailyCounts: countsForToday(counts, localDay(new Date())), saveDeck, removeDeck, gradeCard }
}
