# Flashcards — design

**Date:** 2026-08-20
**Status:** Approved, ready to plan
**Slice:** D of an eleven-part request

---

## Scope

### In scope

1. A **Flashcards** surface for students, beside Notebook in the Workspace group.
2. **Their own decks** — create, add cards, edit, delete.
3. **Premade decks** authored by admins in a **Flashcards Setup** tab.
4. **Spaced repetition on Anki's defaults**, in this design system.
5. **Study these as flashcards** in Medical Taxonomy, which builds a deck from
   the terms on screen.

### Out of scope

Slices F and G (study parties, the word game). Sharing a deck between students,
deck import/export, and card media all wait for a reason to exist.

---

## Decisions taken

### 1 · SM-2, because that is what Anki's defaults are

The installed Anki is **25.02.5**, where FSRS exists but is **opt-in** — a new
collection schedules on SM-2. "The same default settings as Anki" therefore
means SM-2 with this exact configuration, and these numbers are the spec:

| Setting | Value |
|---|---|
| New cards/day | 20 |
| Maximum reviews/day | 200 |
| Learning steps | 1m, 10m |
| Graduating interval | 1 day |
| Easy interval | 4 days |
| Relearning steps | 10m |
| Starting ease | 2.50 |
| Easy bonus | 1.30 |
| Hard interval | 1.20 |
| New interval after a lapse | 0% |
| Minimum interval | 1 day |
| Maximum interval | 36500 days |
| Leech threshold | 8 lapses |

FSRS is not built. It needs a review history to fit its parameters against, and
on day one there is none — it would be a worse scheduler wearing a better name.

### 2 · The scheduler is a pure function, and it is the thing to get right

Everything else here is a list and a form. The scheduler is where a bug is
invisible: a card scheduled wrongly does not throw, it just quietly shows up on
the wrong day, and nobody notices for weeks.

So it lives in `src/data/srs.ts` with no React and no storage, and it is tested
against the table above — including the parts people get wrong: **Hard on a
learning card repeats the current step rather than advancing**, **Again on a
review card is a lapse that multiplies the interval by the new-interval
percentage and drops ease by 20**, and **ease never falls below 1.30**.

### 3 · A student's cards and their schedule are one document, and it is theirs

`synapse.flashcards.decks.v1` holds the student's own decks and every card's
schedule — including the schedule of cards that came from a premade deck.

A premade deck is *content*; how well one student knows it is *theirs*. Keeping
the schedule with the student means an admin can correct a typo on a card
without resetting anyone's progress, and two students studying the same deck
never see each other's intervals.

`synapse.flashcards.` is added to `USER_OWNED_PATTERNS` **and** to its
hand-maintained Swift port in `ios/Synapse/Core/Sync/StateOwnership.swift`,
which must stay a direct port.

### 4 · Reviews are practice, not accuracy

A flashcard grade is the student saying how well they knew something. Like a
practical station and a written answer, it is recorded with `correct: null`.
`AttemptSurface` gains `'card'`.

Storing `true` for Good and `false` for Again would look reasonable and quietly
corrupt every accuracy figure in the app with self-reported data.

---

## 1 · The scheduler

```ts
export type Grade = 'again' | 'hard' | 'good' | 'easy'
export type CardState = 'new' | 'learning' | 'review' | 'relearning'

export interface CardSchedule {
  state: CardState
  /** Index into the learning or relearning steps, while in one. */
  step: number
  /** Days. Zero while learning. */
  interval: number
  /** SM-2 ease factor, 1.30 floor. */
  ease: number
  lapses: number
  reps: number
  /** ISO timestamp. A card is due when this is in the past. */
  due: string
}

export function newCard(now: Date): CardSchedule
export function grade(card: CardSchedule, grade: Grade, now: Date, config: SrsConfig): CardSchedule
export function isDue(card: CardSchedule, now: Date): boolean
/** New and due cards for one session, honouring the daily caps. */
export function dueQueue(cards: CardSchedule[], now: Date, config: SrsConfig, seenToday: DailyCount): …
```

`grade` is total and pure: same card, same grade, same clock, same result. It
takes `now` rather than reading one, which is the only reason its intervals can
be tested at all.

## 2 · The student's surface

**Decks.** A list: name, how many cards are due, how many are new, when it was
last studied. Premade decks appear alongside the student's own, marked as
provided rather than written by them.

**Studying.** One card at a time: the front, a *Show answer* control, then the
back with the four grades. Each button carries **the interval it would produce**
— "Good · 10m", "Easy · 4d" — because that is the information the choice is
actually about, and Anki shows it for the same reason.

Keyboard: space to show, 1–4 to grade. A student doing two hundred reviews
should not have to move a mouse.

**Ending.** When the queue empties, say what was done — how many were studied,
how many graduate tomorrow — and stop. No score.

## 3 · Premade decks

`ContentKind` gains `'deck'`, so a deck inherits the catalogue, status
workflow, university/year scoping, editor and bulk import.

```ts
export interface DeckCard { id: string; front: string; back: string; hint?: string }
export interface DeckAuthoringData { description: string; cards: DeckCard[] }
```

Bulk import takes one card per line as `front | back`, which is the format
every flashcard tool exports and every author already has.

## 4 · From the Medical Taxonomy

A **Study these as flashcards** control on the taxonomy page builds a deck from
the terms currently filtered on screen — front the English term, back the
Arabic and the definition.

It creates a *student-owned* deck named for the filter ("Medical taxonomy ·
Anatomy"), so it behaves like any other deck they made, and re-running it
updates that deck rather than making a second one. The terms are already
published content; this is a view of them, not a copy to maintain.

## 5 · Verification

**Unit** — `src/data/srs.test.ts` is the centre of this slice:

- a new card graded Good enters learning at step 1, due in 10 minutes
- a new card graded Easy graduates immediately to 4 days
- Hard on a learning card repeats the same step
- Again on a learning card returns to step 0
- the last learning step graded Good graduates to 1 day
- a review card graded Good multiplies by ease
- Hard multiplies by 1.20 and drops ease by 15
- Easy multiplies by ease and the 1.30 bonus, and raises ease by 15
- Again on a review card lapses: interval to the new-interval percentage,
  ease down 20, into relearning
- ease never falls below 1.30 however many lapses
- interval never exceeds the maximum
- the daily caps bound the queue, and due cards are not starved by new ones

**Also unit:** deck projection refuses an unpublished deck and one with no
cards; taxonomy-to-deck maps a term to a card and is stable across two runs.

**In the browser:** create a deck, add a card, study it, grade it, and see the
interval move. Generate a deck from the taxonomy and study it.

Nothing here needs a database.
