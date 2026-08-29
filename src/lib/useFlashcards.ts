import { useCallback, useMemo, useRef } from 'react'
import { usePersistentState } from './usePersistentState'
import {
  cardId,
  newCardMeta,
  providedNoteId,
  type Card,
  type CardMeta,
  type DeckConfig,
  type DeckRecord,
  type FlashcardCollection,
  type FlagColor,
  type Note,
  type ReviewEvent,
  type SchedulerType,
} from '@/data/flashcards/model'
import { ensureV2, type StoredDecksV1 } from '@/data/flashcards/migration'
import { mergeImport, type ImportInput } from '@/lib/flashcards/importCommit'
import { generateCards, reconcileNoteInMeta } from '@/data/flashcards/generate'
import { sm2Scheduler, type Scheduler } from '@/data/flashcards/scheduler'
import { fsrsScheduler } from '@/data/flashcards/fsrs'
import { deckCounts, type DeckCounts } from '@/data/flashcards/status'
import { buildQueue, seenTodayFromEvents } from '@/data/flashcards/queue'
import {
  buryCard,
  gradeCard,
  resetCard,
  setDueDate,
  suspendCard,
  unburyCard,
  unsuspendCard,
  type NewReviewEvent,
} from '@/data/flashcards/actions'
import type { Grade } from '@/data/srs'
import type { StudentDeck } from '@/data/decks'
import { escapeHtml } from '@/data/flashcards/richText'

/**
 * The one hook the whole Flashcards feature reads and writes through.
 *
 * It owns the versioned collection (migrating the v1 store the first time it is
 * read), the review-event log, and every mutation — deck, note, and study
 * action — so a sub-view never touches storage or the scheduler directly. Cards
 * are derived from notes on the fly and never stored; a card's schedule and
 * standing (`CardMeta`) is what persists, keyed by the card's stable id, so an
 * edit to a note regenerates its cards without disturbing the schedules of the
 * ones it didn't change.
 *
 * Provided (catalogue) decks are folded in as synthesized notes so a published
 * deck studies exactly like an authored one, while its content stays owned by
 * the catalogue and only the student's schedules live here.
 */

const COLLECTION_KEY = 'synapse.flashcards.collection.v2'
const LEGACY_DECKS_KEY = 'synapse.flashcards.decks.v1'
const REVIEW_LOG_KEY = 'synapse.flashcards.reviewlog.v2'

/** A generous ceiling; a student's own review history stays well under it. */
const REVIEW_LOG_CAP = 50_000

export const DEFAULT_DECK_CONFIG: DeckConfig = { scheduler: 'sm2', newPerDay: 20, maxReviewsPerDay: 200 }

export interface CardWithMeta {
  card: Card
  note: Note
  meta: CardMeta
}

export interface DeckView {
  id: string
  name: string
  provided: boolean
  sourceId?: string
  subjectId?: string
  description?: string
  config: DeckConfig
  counts: DeckCounts
  scheduler: SchedulerType
}

export interface FlashcardsApi {
  ready: boolean
  collection: FlashcardCollection
  reviewEvents: ReviewEvent[]
  decks: DeckView[]
  getDeck: (deckId: string) => DeckView | undefined
  notesForDeck: (deckId: string) => Note[]
  allNotes: Note[]
  cardsForDeck: (deckId: string) => CardWithMeta[]
  allCards: CardWithMeta[]
  cardById: (id: string) => CardWithMeta | undefined
  metaFor: (id: string) => CardMeta | undefined
  schedulerFor: (deckId: string) => Scheduler
  studyQueue: (deckId: string, now?: Date) => CardWithMeta[]
  // Deck mutations
  createDeck: (name: string) => string
  renameDeck: (deckId: string, name: string) => void
  removeDeck: (deckId: string) => void
  setDeckConfig: (deckId: string, config: Partial<DeckConfig>) => void
  // Bulk import (merges decks/notes/optional meta into the current collection)
  importCollection: (input: ImportInput) => void
  // Note mutations
  saveNote: (note: Note) => void
  deleteNote: (noteId: string) => void
  moveNote: (noteId: string, deckId: string) => void
  setNoteTags: (noteId: string, tags: string[]) => void
  // Study actions (all log a review event)
  grade: (cardId: string, answer: Grade, timeSpentMs?: number) => void
  reset: (cardId: string) => void
  suspend: (cardId: string, next: boolean) => void
  bury: (cardId: string, next: boolean) => void
  setDue: (cardId: string, day: string) => void
  // Flag (meta only; searchable, no scheduling event)
  setFlag: (cardId: string, flag: FlagColor | null) => void
  // Bulk actions (single commit — safe to apply to many cards/notes at once)
  bulkFlag: (cardIds: string[], flag: FlagColor | null) => void
  bulkSuspend: (cardIds: string[], next: boolean) => void
  bulkBury: (cardIds: string[], next: boolean) => void
  bulkReset: (cardIds: string[]) => void
  bulkSetDue: (cardIds: string[], day: string) => void
  unburyDeck: (deckId: string) => void
  bulkMoveNotes: (noteIds: string[], deckId: string) => void
  bulkTag: (noteIds: string[], tag: string, add: boolean) => void
  bulkDeleteNotes: (noteIds: string[]) => void
  // Tags across the collection
  allTags: string[]
}

export function useFlashcards(providedDecks: StudentDeck[] = []): FlashcardsApi {
  const bootNow = useRef(new Date()).current
  const [storedV2, setStoredV2] = usePersistentState<FlashcardCollection | null>(COLLECTION_KEY, null)
  const [legacyV1] = usePersistentState<StoredDecksV1>(LEGACY_DECKS_KEY, {})
  const [reviewEvents, setReviewEvents] = usePersistentState<ReviewEvent[]>(REVIEW_LOG_KEY, [])

  // Until something is written to v2, the working collection is the migrated
  // view of the v1 store, computed once so unseen cards keep a stable due time.
  const migratedRef = useRef<FlashcardCollection | null>(null)
  const collection = useMemo<FlashcardCollection>(() => {
    if (storedV2) return storedV2
    if (!migratedRef.current) migratedRef.current = ensureV2(legacyV1, bootNow)
    return migratedRef.current
  }, [storedV2, legacyV1, bootNow])

  const commit = useCallback(
    (next: FlashcardCollection) => setStoredV2(() => next),
    [setStoredV2],
  )

  // Synthesize a Basic note per provided-deck card, keyed so a student's
  // schedule follows the card whether content comes from the catalogue now or a
  // stored fallback later. These are never persisted.
  const providedNotes = useMemo<Record<string, Note>>(() => {
    const notes: Record<string, Note> = {}
    for (const deck of providedDecks) {
      for (const card of deck.cards) {
        const id = providedNoteId(deck.id, card.id)
        notes[id] = {
          id,
          type: 'basic',
          deckId: deck.id,
          tags: [],
          createdAt: '',
          updatedAt: '',
          fields: { front: asRich(card.front), back: asRich(card.back) },
        }
      }
    }
    return notes
  }, [providedDecks])

  const providedDeckRecords = useMemo<Record<string, DeckRecord>>(() => {
    const records: Record<string, DeckRecord> = {}
    for (const deck of providedDecks) {
      records[deck.id] = { id: deck.id, name: deck.title, sourceId: deck.id, createdAt: '' }
    }
    return records
  }, [providedDecks])

  // The working world: stored notes plus synthesized provided ones (catalogue
  // content overrides any stored fallback of the same id).
  const notes = useMemo<Record<string, Note>>(
    () => ({ ...collection.notes, ...providedNotes }),
    [collection.notes, providedNotes],
  )

  const deckRecords = useMemo<Record<string, DeckRecord>>(
    () => ({ ...providedDeckRecords, ...collection.decks }),
    [collection.decks, providedDeckRecords],
  )

  const providedMeta = useMemo<Record<string, string>>(() => {
    // deckId set of provided decks, for the `provided` flag on DeckView.
    const set: Record<string, string> = {}
    for (const deck of providedDecks) set[deck.id] = deck.id
    return set
  }, [providedDecks])

  const providedSubject = useMemo<Record<string, StudentDeck>>(() => {
    const map: Record<string, StudentDeck> = {}
    for (const deck of providedDecks) map[deck.id] = deck
    return map
  }, [providedDecks])

  // All cards, derived from all notes, joined to their meta (fresh where absent).
  const allCards = useMemo<CardWithMeta[]>(() => {
    const out: CardWithMeta[] = []
    for (const note of Object.values(notes)) {
      for (const card of generateCards(note)) {
        out.push({ card, note, meta: collection.meta[card.id] ?? newCardMeta(sm2Scheduler().newCard(bootNow)) })
      }
    }
    return out
  }, [notes, collection.meta, bootNow])

  const cardIndex = useMemo(() => new Map(allCards.map((c) => [c.card.id, c])), [allCards])

  const schedulerFor = useCallback(
    (deckId: string): Scheduler => {
      const config = deckRecords[deckId]?.config ?? DEFAULT_DECK_CONFIG
      // Opt-in per deck; SM-2 stays the default. A freshly-FSRS card carries no
      // stability/difficulty yet — fsrsScheduler initializes them on first grade.
      return config.scheduler === 'fsrs' ? fsrsScheduler() : sm2Scheduler()
    },
    [deckRecords],
  )

  const decks = useMemo<DeckView[]>(() => {
    const byDeck = new Map<string, CardMeta[]>()
    for (const { card, meta } of allCards) {
      const list = byDeck.get(card.deckId) ?? []
      list.push(meta)
      byDeck.set(card.deckId, list)
    }
    return Object.values(deckRecords).map((record) => {
      const config = record.config ?? DEFAULT_DECK_CONFIG
      const provided = !!providedMeta[record.id]
      return {
        id: record.id,
        name: record.name,
        provided,
        sourceId: record.sourceId,
        subjectId: provided ? providedSubject[record.id]?.subjectId : undefined,
        description: provided ? providedSubject[record.id]?.description : undefined,
        config,
        counts: deckCounts(byDeck.get(record.id) ?? [], bootNow),
        scheduler: config.scheduler,
      }
    })
  }, [deckRecords, allCards, providedMeta, providedSubject, bootNow])

  const appendEvents = useCallback(
    (events: NewReviewEvent[]) => {
      if (events.length === 0) return
      const stamped: ReviewEvent[] = events.map((event, i) => ({
        ...event,
        id: `re-${Date.now().toString(36)}-${i}-${Math.random().toString(36).slice(2, 7)}`,
      }))
      setReviewEvents((current) => {
        const next = [...current, ...stamped]
        return next.length > REVIEW_LOG_CAP ? next.slice(next.length - REVIEW_LOG_CAP) : next
      })
    },
    [setReviewEvents],
  )
  const appendEvent = useCallback((event: NewReviewEvent) => appendEvents([event]), [appendEvents])

  const ctxFor = useCallback(
    (card: Card): { cardId: string; noteId: string; deckId: string; scheduler: SchedulerType } => ({
      cardId: card.id,
      noteId: card.noteId,
      deckId: card.deckId,
      scheduler: deckRecords[card.deckId]?.config?.scheduler ?? 'sm2',
    }),
    [deckRecords],
  )

  const withMeta = useCallback(
    (id: string, produce: (meta: CardMeta, entry: CardWithMeta) => { meta: CardMeta; event?: NewReviewEvent }) => {
      const entry = cardIndex.get(id)
      if (!entry) return
      const { meta, event } = produce(entry.meta, entry)
      commit({ ...collection, meta: { ...collection.meta, [id]: meta } })
      if (event) appendEvent(event)
    },
    [cardIndex, collection, commit, appendEvent],
  )

  // ---- Deck mutations -------------------------------------------------------

  const createDeck = useCallback(
    (name: string): string => {
      const id = `deck-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`
      commit({
        ...collection,
        decks: { ...collection.decks, [id]: { id, name: name.trim() || 'Untitled deck', createdAt: new Date().toISOString() } },
      })
      return id
    },
    [collection, commit],
  )

  const renameDeck = useCallback(
    (deckId: string, name: string) => {
      const record = collection.decks[deckId]
      if (!record) return
      commit({ ...collection, decks: { ...collection.decks, [deckId]: { ...record, name: name.trim() || record.name } } })
    },
    [collection, commit],
  )

  const removeDeck = useCallback(
    (deckId: string) => {
      const notesLeft: Record<string, Note> = {}
      const removedNoteIds = new Set<string>()
      for (const [id, note] of Object.entries(collection.notes)) {
        if (note.deckId === deckId) removedNoteIds.add(id)
        else notesLeft[id] = note
      }
      const metaLeft: Record<string, CardMeta> = {}
      for (const [id, meta] of Object.entries(collection.meta)) {
        const noteId = id.slice(0, id.lastIndexOf('::'))
        if (!removedNoteIds.has(noteId)) metaLeft[id] = meta
      }
      const { [deckId]: _gone, ...decksLeft } = collection.decks
      commit({ ...collection, decks: decksLeft, notes: notesLeft, meta: metaLeft })
    },
    [collection, commit],
  )

  const setDeckConfig = useCallback(
    (deckId: string, config: Partial<DeckConfig>) => {
      const record = collection.decks[deckId] ?? deckRecords[deckId]
      if (!record) return
      const nextConfig = { ...(record.config ?? DEFAULT_DECK_CONFIG), ...config }
      commit({ ...collection, decks: { ...collection.decks, [deckId]: { ...record, config: nextConfig } } })
    },
    [collection, deckRecords, commit],
  )

  // ---- Bulk import ----------------------------------------------------------

  // Merge an Anki/CSV import into the CURRENT working collection (which includes
  // a migrated v1 store on first use), so an import never discards existing
  // decks. Preserved card meta is keyed to match generateCards, so imported
  // schedules attach to their cards on the next read.
  const importCollection = useCallback(
    (input: ImportInput) => commit(mergeImport(collection, input)),
    [collection, commit],
  )

  // ---- Note mutations -------------------------------------------------------

  const saveNote = useCallback(
    (note: Note) => {
      const scheduler = schedulerFor(note.deckId)
      const meta = reconcileNoteInMeta(note, collection.meta, scheduler, new Date())
      commit({ ...collection, notes: { ...collection.notes, [note.id]: note }, meta })
    },
    [collection, commit, schedulerFor],
  )

  const deleteNote = useCallback(
    (noteId: string) => {
      const { [noteId]: _gone, ...notesLeft } = collection.notes
      const metaLeft: Record<string, CardMeta> = {}
      const prefix = `${noteId}::`
      for (const [id, meta] of Object.entries(collection.meta)) {
        if (!id.startsWith(prefix)) metaLeft[id] = meta
      }
      commit({ ...collection, notes: notesLeft, meta: metaLeft })
    },
    [collection, commit],
  )

  const moveNote = useCallback(
    (noteId: string, deckId: string) => {
      const note = collection.notes[noteId]
      if (!note) return
      const moved = { ...note, deckId, updatedAt: new Date().toISOString() } as Note
      // Card ids don't include the deck, so schedules carry over unchanged.
      commit({ ...collection, notes: { ...collection.notes, [noteId]: moved } })
    },
    [collection, commit],
  )

  const setNoteTags = useCallback(
    (noteId: string, tags: string[]) => {
      const note = collection.notes[noteId]
      if (!note) return
      commit({ ...collection, notes: { ...collection.notes, [noteId]: { ...note, tags, updatedAt: new Date().toISOString() } } })
    },
    [collection, commit],
  )

  // ---- Study actions --------------------------------------------------------

  const grade = useCallback(
    (id: string, answer: Grade, timeSpentMs?: number) =>
      withMeta(id, (meta, entry) => gradeCard(meta, answer, ctxFor(entry.card), schedulerFor(entry.card.deckId), new Date(), timeSpentMs ?? null)),
    [withMeta, ctxFor, schedulerFor],
  )
  const reset = useCallback(
    (id: string) => withMeta(id, (meta, entry) => resetCard(meta, ctxFor(entry.card), schedulerFor(entry.card.deckId), new Date())),
    [withMeta, ctxFor, schedulerFor],
  )
  const suspend = useCallback(
    (id: string, next: boolean) =>
      withMeta(id, (meta, entry) => (next ? suspendCard(meta, ctxFor(entry.card), new Date()) : unsuspendCard(meta, ctxFor(entry.card), new Date()))),
    [withMeta, ctxFor],
  )
  const bury = useCallback(
    (id: string, next: boolean) =>
      withMeta(id, (meta, entry) => (next ? buryCard(meta, ctxFor(entry.card), new Date()) : unburyCard(meta, ctxFor(entry.card), new Date()))),
    [withMeta, ctxFor],
  )
  const setDue = useCallback(
    (id: string, day: string) => withMeta(id, (meta, entry) => setDueDate(meta, day, ctxFor(entry.card), new Date())),
    [withMeta, ctxFor],
  )
  const setFlag = useCallback(
    (id: string, flag: FlagColor | null) => withMeta(id, (meta) => ({ meta: { ...meta, flag } })),
    [withMeta],
  )

  // ---- Bulk actions (one commit, so a loop never clobbers itself) ----------

  const bulkCard = useCallback(
    (ids: string[], produce: (meta: CardMeta, entry: CardWithMeta) => { meta: CardMeta; event?: NewReviewEvent }) => {
      let meta = collection.meta
      const events: NewReviewEvent[] = []
      let changed = false
      for (const id of ids) {
        const entry = cardIndex.get(id)
        if (!entry) continue
        const result = produce(meta[id] ?? entry.meta, entry)
        meta = { ...meta, [id]: result.meta }
        changed = true
        if (result.event) events.push(result.event)
      }
      if (changed) commit({ ...collection, meta })
      appendEvents(events)
    },
    [collection, cardIndex, commit, appendEvents],
  )

  const bulkFlag = useCallback((ids: string[], flag: FlagColor | null) => bulkCard(ids, (meta) => ({ meta: { ...meta, flag } })), [bulkCard])
  const bulkSuspend = useCallback(
    (ids: string[], next: boolean) => bulkCard(ids, (meta, entry) => (next ? suspendCard(meta, ctxFor(entry.card), new Date()) : unsuspendCard(meta, ctxFor(entry.card), new Date()))),
    [bulkCard, ctxFor],
  )
  const bulkBury = useCallback(
    (ids: string[], next: boolean) => bulkCard(ids, (meta, entry) => (next ? buryCard(meta, ctxFor(entry.card), new Date()) : unburyCard(meta, ctxFor(entry.card), new Date()))),
    [bulkCard, ctxFor],
  )
  const bulkReset = useCallback(
    (ids: string[]) => bulkCard(ids, (meta, entry) => resetCard(meta, ctxFor(entry.card), schedulerFor(entry.card.deckId), new Date())),
    [bulkCard, ctxFor, schedulerFor],
  )
  const bulkSetDue = useCallback(
    (ids: string[], day: string) => bulkCard(ids, (meta, entry) => setDueDate(meta, day, ctxFor(entry.card), new Date())),
    [bulkCard, ctxFor],
  )
  const unburyDeck = useCallback(
    (deckId: string) => {
      const ids = allCards.filter((c) => c.card.deckId === deckId && c.meta.buriedUntil).map((c) => c.card.id)
      bulkBury(ids, false)
    },
    [allCards, bulkBury],
  )

  const bulkMoveNotes = useCallback(
    (noteIds: string[], deckId: string) => {
      const nextNotes = { ...collection.notes }
      let changed = false
      for (const noteId of noteIds) {
        const note = nextNotes[noteId]
        if (!note) continue
        nextNotes[noteId] = { ...note, deckId, updatedAt: new Date().toISOString() } as Note
        changed = true
      }
      if (changed) commit({ ...collection, notes: nextNotes })
    },
    [collection, commit],
  )

  const bulkTag = useCallback(
    (noteIds: string[], tag: string, add: boolean) => {
      const nextNotes = { ...collection.notes }
      let changed = false
      for (const noteId of noteIds) {
        const note = nextNotes[noteId]
        if (!note) continue
        const has = note.tags.includes(tag)
        if (add && has) continue
        if (!add && !has) continue
        const tags = add ? [...note.tags, tag] : note.tags.filter((tg) => tg !== tag)
        nextNotes[noteId] = { ...note, tags, updatedAt: new Date().toISOString() } as Note
        changed = true
      }
      if (changed) commit({ ...collection, notes: nextNotes })
    },
    [collection, commit],
  )

  const bulkDeleteNotes = useCallback(
    (noteIds: string[]) => {
      const removed = new Set(noteIds)
      const notesLeft: Record<string, Note> = {}
      for (const [id, note] of Object.entries(collection.notes)) {
        if (!removed.has(id)) notesLeft[id] = note
      }
      const metaLeft: Record<string, CardMeta> = {}
      for (const [id, meta] of Object.entries(collection.meta)) {
        const noteId = id.slice(0, id.lastIndexOf('::'))
        if (!removed.has(noteId)) metaLeft[id] = meta
      }
      commit({ ...collection, notes: notesLeft, meta: metaLeft })
    },
    [collection, commit],
  )

  // ---- Reads ----------------------------------------------------------------

  const notesForDeck = useCallback((deckId: string) => Object.values(notes).filter((n) => n.deckId === deckId), [notes])
  const cardsForDeck = useCallback((deckId: string) => allCards.filter((c) => c.card.deckId === deckId), [allCards])
  const cardById = useCallback((id: string) => cardIndex.get(id), [cardIndex])
  const metaFor = useCallback((id: string) => collection.meta[id], [collection.meta])
  const getDeck = useCallback((deckId: string) => decks.find((d) => d.id === deckId), [decks])

  const studyQueue = useCallback(
    (deckId: string, now: Date = new Date()): CardWithMeta[] => {
      const entries = allCards.filter((c) => c.card.deckId === deckId).map((c) => ({ id: c.card.id, meta: c.meta }))
      const config = deckRecords[deckId]?.config ?? DEFAULT_DECK_CONFIG
      const seen = seenTodayFromEvents(reviewEvents, deckId, now)
      const ids = buildQueue(entries, now, config, seen)
      return ids.map((id) => cardIndex.get(id)!).filter(Boolean)
    },
    [allCards, deckRecords, reviewEvents, cardIndex],
  )

  const allTags = useMemo(() => {
    const set = new Set<string>()
    for (const note of Object.values(notes)) for (const tag of note.tags) set.add(tag)
    return [...set].sort((a, b) => a.localeCompare(b))
  }, [notes])

  const allNotes = useMemo(() => Object.values(notes), [notes])

  return {
    ready: true,
    collection,
    reviewEvents,
    decks,
    getDeck,
    notesForDeck,
    allNotes,
    cardsForDeck,
    allCards,
    cardById,
    metaFor,
    schedulerFor,
    studyQueue,
    createDeck,
    renameDeck,
    removeDeck,
    setDeckConfig,
    importCollection,
    saveNote,
    deleteNote,
    moveNote,
    setNoteTags,
    grade,
    reset,
    suspend,
    bury,
    setDue,
    setFlag,
    bulkFlag,
    bulkSuspend,
    bulkBury,
    bulkReset,
    bulkSetDue,
    unburyDeck,
    bulkMoveNotes,
    bulkTag,
    bulkDeleteNotes,
    allTags,
  }
}

/** Treat provided-deck plain content as safe rich text (escaped, no markup). */
function asRich(value: string): string {
  return value.includes('<') ? escapeHtml(value) : value
}

export function cardIdOf(noteId: string, templateKey: string): string {
  return cardId(noteId, templateKey)
}
