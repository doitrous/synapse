import { useMemo, useRef } from 'react'
import { Layers, NotebookPen, PenTool } from 'lucide-react'
import { FeatureCard, FeatureGrid, HubPage, HubStat } from '@/components/hub'
import { QBANK_NOTES_STORAGE_KEY } from '@/components/qbank/StudyRail'
import { CONTENT_LEDGER_STORAGE_KEY, initialManagedContent, type ManagedContentItem } from '@/data/contentControl'
import { managedDeckToStudentDeck, type StudentDeck } from '@/data/decks'
import { initialNotes, type Note } from '@/data/notebook'
import { WHITEBOARD_COLLECTION_KEY, emptyWhiteboardCollection, type WhiteboardCollection } from '@/data/whiteboard'
import { deckDashboardStats } from '@/data/flashcards/deckSummary'
import { localDay } from '@/data/flashcards/time'
import { usePersistentState } from '@/lib/usePersistentState'
import { useFlashcards } from '@/lib/useFlashcards'
import { useT } from '@/lib/i18n'

/**
 * How many boards the student has, without assuming the document's shape.
 *
 * The whiteboard store has been through a migration — a single board became a
 * collection — and a browser that has not opened the page since can still hold
 * the older document. A hub card is the wrong place to crash over that, so
 * anything that is not a collection with a `boards` array simply counts zero.
 */
function boardCount(collection: unknown): number {
  if (!collection || typeof collection !== 'object') return 0
  const boards = (collection as { boards?: unknown }).boards
  return Array.isArray(boards) ? boards.length : 0
}

/**
 * Revise: capture it, connect it, keep it.
 *
 * The three surfaces where a student's own words live. Notebook and Whiteboard
 * are counted rather than scored — there is no "right" number of notes — while
 * Flashcards is the one place with a day's work to finish, so it is the one
 * card carrying a ring.
 */
export function Revise() {
  const t = useT()
  const [notes] = usePersistentState<Note[]>('nishany.notebook.notes', initialNotes)
  const [questionNotes] = usePersistentState<Record<string, string>>(QBANK_NOTES_STORAGE_KEY, {})
  // Seeded with the same document `Whiteboard.tsx` seeds it with, not with a
  // convenient `null`: `usePersistentState` shares one entry per key and keeps
  // the FIRST caller's seed, so a hub that seeded `null` would hand Whiteboard
  // a null collection and white-screen the page it exists to open.
  const [boards] = usePersistentState<WhiteboardCollection>(WHITEBOARD_COLLECTION_KEY, emptyWhiteboardCollection)
  const [ledger] = usePersistentState<ManagedContentItem[]>(CONTENT_LEDGER_STORAGE_KEY, initialManagedContent)

  // Joined the same way the Flashcards page joins it, so the counts on this
  // card are the counts the page itself shows rather than the student's own
  // decks minus everything the catalogue published.
  const providedDecks: StudentDeck[] = useMemo(
    () =>
      ledger
        .filter((item) => item.kind === 'deck')
        .map(managedDeckToStudentDeck)
        .filter((deck): deck is StudentDeck => deck !== null),
    [ledger],
  )
  const { allCards, decks, reviewEvents } = useFlashcards(providedDecks)

  const questionNoteCount = useMemo(
    () => Object.values(questionNotes).filter((text) => text.trim().length > 0).length,
    [questionNotes],
  )

  const deckCount = decks.length
  const cardCount = decks.reduce((sum, deck) => sum + deck.counts.total, 0)

  // One clock for the whole figure, so a render that straddles midnight cannot
  // count a card against one day and the day's total against the next.
  const now = useRef(new Date()).current
  const today = localDay(now)

  // Both halves of the fraction have to describe the same population, or the
  // ring lies. `counts.reviewDue` is review-state only, while a card graded
  // today can have come from learning or relearning too — 3 of 6 relearning
  // cards then read "3/3 · all cleared". `deckDashboardStats().dueToday` is the
  // definition that matches: eligible, non-new, due now — learning, relearning
  // and review alike.
  const dueLeft = useMemo(
    () => deckDashboardStats(allCards.map((entry) => entry.meta), reviewEvents, now).dueToday,
    [allCards, reviewEvents, now],
  )

  // What the day started with is what is still due plus what has already been
  // graded today out of a non-new state — the review log carries the local day
  // on every event, so this needs no extra store and no midnight bookkeeping.
  const clearedToday = useMemo(() => {
    const ids = new Set<string>()
    for (const event of reviewEvents) {
      if (event.kind !== 'grade' || event.localDay !== today) continue
      if (event.stateBefore === 'new') continue
      ids.add(event.cardId)
    }
    return ids.size
  }, [reviewEvents, today])
  const dueAtStartOfDay = clearedToday + dueLeft

  return (
    <HubPage
      eyebrow="04 · REVISE"
      title={t('Revise')}
      lede={t('Capture it, connect it, keep it.')}
      aside={
        <HubStat
          label="Due today"
          value={dueAtStartOfDay > 0 ? `${clearedToday}/${dueAtStartOfDay}` : '0'}
          sub={dueAtStartOfDay === 0 ? 'nothing due today' : dueLeft === 0 ? 'all cleared' : 'flashcards cleared'}
        />
      }
    >
      <FeatureGrid>
        <FeatureCard
          to="/app/notebook"
          icon={NotebookPen}
          title={t('Notebook')}
          description={t('Your own notes, the ones classmates shared with you, and everything you wrote beside a question.')}
          stats={[
            { label: t('Notes'), value: String(notes.length) },
            { label: t('Question notes'), value: String(questionNoteCount) },
          ]}
        />
        <FeatureCard
          to="/app/whiteboard"
          icon={PenTool}
          title={t('Whiteboard')}
          description={t('Lay a mechanism out in space — notes, arrows, pictures and freehand ink on one canvas.')}
          stats={[{ label: t('Boards'), value: String(boardCount(boards)) }]}
        />
        <FeatureCard
          to="/app/flashcards"
          icon={Layers}
          title={t('Flashcards')}
          description={t('Spaced repetition over your decks and the published ones, so what you learned in week two survives to the exam.')}
          progress={dueAtStartOfDay > 0
            ? { kind: 'ring', value: clearedToday, max: dueAtStartOfDay, label: t('due today cleared') }
            : undefined}
          stats={[
            { label: t('Decks'), value: String(deckCount) },
            { label: t('Cards'), value: String(cardCount) },
          ]}
        />
      </FeatureGrid>
    </HubPage>
  )
}
