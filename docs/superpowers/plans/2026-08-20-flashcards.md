# Flashcards Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give students spaced-repetition flashcards on Anki's default settings — their own decks, premade ones from admins, and a deck built from the Medical Taxonomy.

**Architecture:** The scheduler is a pure, heavily tested module; everything else is lists and forms around it. A premade deck is a `ContentKind` in the content ledger; a student's decks and *all* card schedules live in one user-owned document, so correcting a published card never resets anyone's progress.

**Tech Stack:** React 19 + TypeScript + Vite + Tailwind v4. Tests: `node --test --experimental-strip-types "src/**/*.test.ts"`. No server work.

## Global Constraints

- Dependencies are installed. Do not run `npm install`. Add no dependency. **The network is currently unavailable — any command needing it will fail.**
- `npx tsc -b` must stay green. `noUnusedLocals` is ON.
- **Every student- and admin-facing string goes through `useT()`.**
- **Logical CSS properties only**: `ps-`/`pe-`/`ms-`/`me-`/`start-`/`end-`. Never `pl-`/`pr-`/`left-`/`right-`. The app runs RTL in Arabic.
- Tested modules import relatively with an explicit `.ts` extension — `node --test` cannot resolve `@/`. Type-only imports too.
- Comments explain **why**, not what.
- Commit messages are a plain sentence about what a person can now do. No `feat:`/`fix:` prefixes.
- **Adding a `ContentKind` fans out.** `tsc` names every exhaustive `Record<ContentKind, …>` it breaks — let it guide you. Sites: `contentControl.ts` (×2), `IMPORT_SCHEMAS` in `bulkImport.ts`, `routeFor` in `BulkImportPage.tsx`, and `ControlDashboard.tsx` (tab list, icon, count, scope filter). There is a worked precedent: `'histology'` and `'essay'` were both added this way — follow them.

---

### Task 1: The scheduler

The centre of the slice. Pure, no React, no storage, no clock of its own.

**Files:**
- Create: `src/data/srs.ts`
- Test: `src/data/srs.test.ts`

**Interfaces:**
- Produces: `Grade`, `CardState`, `CardSchedule`, `SrsConfig`, `ANKI_DEFAULTS`, `newCard`, `grade`, `isDue`.

- [ ] **Step 1: Write the failing test**

Every interval below comes from Anki's defaults and is the specification, not an example. `at` is a fixed clock so the assertions are exact.

```ts
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { newCard, grade, isDue, ANKI_DEFAULTS, type CardSchedule } from './srs.ts'

const at = new Date('2026-08-20T09:00:00.000Z')
const minutes = (n: number) => new Date(at.getTime() + n * 60_000).toISOString()
const days = (n: number) => new Date(at.getTime() + n * 86_400_000).toISOString()

const review = (over: Partial<CardSchedule> = {}): CardSchedule => ({
  state: 'review', step: 0, interval: 10, ease: 2.5, lapses: 0, reps: 5, due: at.toISOString(), ...over,
})

test('a new card starts due, with the starting ease', () => {
  const card = newCard(at)
  assert.equal(card.state, 'new')
  assert.equal(card.ease, 2.5)
  assert.equal(card.interval, 0)
  assert.equal(isDue(card, at), true)
})

test('Good on a new card enters learning at the second step, ten minutes out', () => {
  const card = grade(newCard(at), 'good', at, ANKI_DEFAULTS)
  assert.equal(card.state, 'learning')
  assert.equal(card.step, 1)
  assert.equal(card.due, minutes(10))
})

test('Again on a new card stays on the first step, one minute out', () => {
  const card = grade(newCard(at), 'again', at, ANKI_DEFAULTS)
  assert.equal(card.state, 'learning')
  assert.equal(card.step, 0)
  assert.equal(card.due, minutes(1))
})

test('Easy on a new card graduates straight to four days', () => {
  const card = grade(newCard(at), 'easy', at, ANKI_DEFAULTS)
  assert.equal(card.state, 'review')
  assert.equal(card.interval, 4)
  assert.equal(card.due, days(4))
})

test('Hard on a learning card repeats the step it is on', () => {
  const learning: CardSchedule = { ...newCard(at), state: 'learning', step: 1 }
  const card = grade(learning, 'hard', at, ANKI_DEFAULTS)
  assert.equal(card.step, 1)
  assert.equal(card.due, minutes(10))
})

test('Good on the last learning step graduates to one day', () => {
  const learning: CardSchedule = { ...newCard(at), state: 'learning', step: 1 }
  const card = grade(learning, 'good', at, ANKI_DEFAULTS)
  assert.equal(card.state, 'review')
  assert.equal(card.interval, 1)
})

test('Good on a review card multiplies the interval by its ease', () => {
  const card = grade(review({ interval: 10, ease: 2.5 }), 'good', at, ANKI_DEFAULTS)
  assert.equal(card.interval, 25)
  assert.equal(card.ease, 2.5)
})

test('Hard on a review card uses the hard multiplier and drops ease by fifteen', () => {
  const card = grade(review({ interval: 10, ease: 2.5 }), 'hard', at, ANKI_DEFAULTS)
  assert.equal(card.interval, 12)
  assert.equal(card.ease, 2.35)
})

test('Easy on a review card adds the easy bonus and raises ease by fifteen', () => {
  const card = grade(review({ interval: 10, ease: 2.5 }), 'easy', at, ANKI_DEFAULTS)
  assert.equal(card.interval, 33)
  assert.equal(card.ease, 2.65)
})

test('Again on a review card lapses it into relearning', () => {
  const card = grade(review({ interval: 10, ease: 2.5 }), 'again', at, ANKI_DEFAULTS)
  assert.equal(card.state, 'relearning')
  assert.equal(card.lapses, 1)
  assert.equal(card.ease, 2.3)
  // New interval after a lapse is 0% of the old one, floored at the minimum.
  assert.equal(card.interval, 1)
  assert.equal(card.due, minutes(10))
})

test('ease never falls below its floor however often a card lapses', () => {
  let card = review({ ease: 1.35 })
  for (let i = 0; i < 5; i++) card = grade({ ...card, state: 'review' }, 'again', at, ANKI_DEFAULTS)
  assert.equal(card.ease, 1.3)
})

test('an interval never exceeds the maximum', () => {
  const card = grade(review({ interval: 30000, ease: 2.5 }), 'easy', at, ANKI_DEFAULTS)
  assert.equal(card.interval, ANKI_DEFAULTS.maximumInterval)
})

test('graduating from relearning returns the card to review', () => {
  const relearning: CardSchedule = { ...review(), state: 'relearning', step: 0, interval: 1 }
  const card = grade(relearning, 'good', at, ANKI_DEFAULTS)
  assert.equal(card.state, 'review')
})

test('a card is not due before its time', () => {
  assert.equal(isDue(review({ due: days(1) }), at), false)
  assert.equal(isDue(review({ due: minutes(-1) }), at), true)
})
```

- [ ] **Step 2: Run it and watch it fail**

Run: `node --test --experimental-strip-types src/data/srs.test.ts`
Expected: FAIL — cannot resolve `./srs.ts`.

- [ ] **Step 3: Write the implementation**

Write `src/data/srs.ts` satisfying exactly those assertions. It must export:

```ts
export const ANKI_DEFAULTS: SrsConfig = {
  newPerDay: 20,
  maxReviewsPerDay: 200,
  learningSteps: [1, 10],      // minutes
  relearningSteps: [10],       // minutes
  graduatingInterval: 1,       // days
  easyInterval: 4,             // days
  startingEase: 2.5,
  easyBonus: 1.3,
  hardMultiplier: 1.2,
  lapseNewIntervalPercent: 0,
  minimumInterval: 1,          // days
  maximumInterval: 36500,      // days
  leechThreshold: 8,
}
```

Rules, stated so they are not guessed at:

- **New / learning / relearning** are scheduled in *minutes* from the step list. `again` returns to step 0; `hard` repeats the current step; `good` advances, and graduates when it runs off the end; `easy` graduates immediately.
- **Graduating** from learning gives `graduatingInterval` days, from `easy` gives `easyInterval` days, and from relearning returns to `review` keeping the lapsed interval.
- **Review** cards multiply days: `hard` → `interval × hardMultiplier`, `good` → `interval × ease`, `easy` → `interval × ease × easyBonus`.
- **Ease** moves by −0.15 on hard, +0.15 on easy, −0.20 on a lapse, and is clamped at a 1.30 floor.
- **A lapse** sets `interval = max(minimumInterval, round(interval × lapseNewIntervalPercent / 100))`, increments `lapses`, and enters `relearning` at step 0.
- Every interval is **rounded to whole days** and clamped to `maximumInterval`.
- `grade` never mutates its input.

Give the module a header comment saying these are Anki 25.02.5's defaults, that FSRS is deliberately not implemented because it needs a review history to fit against, and that `now` is a parameter so intervals are testable.

- [ ] **Step 4: Run it and watch it pass**

Run: `node --test --experimental-strip-types src/data/srs.test.ts`
Expected: PASS, 14 tests.

- [ ] **Step 5: Commit**

```bash
git add src/data/srs.ts src/data/srs.test.ts
git commit -m "Decide when a card should come back"
```

---

### Task 2: The queue, and a deck

**Files:**
- Create: `src/data/decks.ts`
- Test: `src/data/decks.test.ts`

**Interfaces:**
- Consumes: `CardSchedule`, `SrsConfig`, `isDue`, `newCard` from `./srs.ts`; `ManagedContentItem` from `./contentControl.ts`.
- Produces: `DeckCard`, `DeckAuthoringData`, `StudentDeck`, `StudyCard`, `dueQueue`, `parseCardLines`, `managedDeckToStudentDeck`, `deckFromTerms`.

- [ ] **Step 1: Write the failing test**

```ts
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { dueQueue, parseCardLines, managedDeckToStudentDeck, deckFromTerms } from './decks.ts'
import { newCard, ANKI_DEFAULTS, type CardSchedule } from './srs.ts'
import type { ManagedContentItem } from './contentControl.ts'

const at = new Date('2026-08-20T09:00:00.000Z')
const sched = (over: Partial<CardSchedule> = {}): CardSchedule => ({ ...newCard(at), ...over })

test('the queue offers due cards before new ones', () => {
  const queue = dueQueue([
    { id: 'n', schedule: sched() },
    { id: 'd', schedule: sched({ state: 'review', due: new Date(at.getTime() - 1000).toISOString() }) },
  ], at, ANKI_DEFAULTS, { newSeen: 0, reviewsSeen: 0 })
  assert.equal(queue[0].id, 'd')
})

test('a card that is not yet due is not in the queue', () => {
  const queue = dueQueue([
    { id: 'later', schedule: sched({ state: 'review', due: new Date(at.getTime() + 86_400_000).toISOString() }) },
  ], at, ANKI_DEFAULTS, { newSeen: 0, reviewsSeen: 0 })
  assert.deepEqual(queue, [])
})

test('the daily new cap bounds how many new cards are offered', () => {
  const cards = Array.from({ length: 30 }, (_, i) => ({ id: `n${i}`, schedule: sched() }))
  const queue = dueQueue(cards, at, ANKI_DEFAULTS, { newSeen: 0, reviewsSeen: 0 })
  assert.equal(queue.length, ANKI_DEFAULTS.newPerDay)
})

test('cards already seen today count against the cap', () => {
  const cards = Array.from({ length: 30 }, (_, i) => ({ id: `n${i}`, schedule: sched() }))
  const queue = dueQueue(cards, at, ANKI_DEFAULTS, { newSeen: 18, reviewsSeen: 0 })
  assert.equal(queue.length, 2)
})

test('cards parse one per line, front and back split on a pipe', () => {
  const cards = parseCardLines('Aorta | Largest artery\nVein | Carries blood back')
  assert.equal(cards.length, 2)
  assert.equal(cards[0].front, 'Aorta')
  assert.equal(cards[0].back, 'Largest artery')
})

test('a line with no separator is not a card', () => {
  assert.equal(parseCardLines('Aorta\n\nVein | Back').length, 1)
})

test('an unpublished deck is not offered to students', () => {
  const item = { id: 'd1', kind: 'deck', title: 'CVS', subjectId: 'cvs', status: 'Draft', owner: '', updatedAt: '', fields: {},
    deckData: { description: '', cards: [{ id: 'c1', front: 'a', back: 'b' }] } } as unknown as ManagedContentItem
  assert.equal(managedDeckToStudentDeck(item), null)
})

test('a published deck with no cards is not offered either', () => {
  const item = { id: 'd1', kind: 'deck', title: 'CVS', subjectId: 'cvs', status: 'Published', owner: '', updatedAt: '', fields: {},
    deckData: { description: '', cards: [] } } as unknown as ManagedContentItem
  assert.equal(managedDeckToStudentDeck(item), null)
})

test('a deck built from taxonomy terms is stable across two runs', () => {
  const terms = [{ id: 't1', term: 'Aorta', ar: 'الأبهر', def: 'Largest artery' }]
  const first = deckFromTerms('Anatomy', terms)
  const second = deckFromTerms('Anatomy', terms)
  assert.equal(first.id, second.id)
  assert.deepEqual(first.cards.map((card) => card.id), second.cards.map((card) => card.id))
  assert.equal(first.cards[0].front, 'Aorta')
})
```

- [ ] **Step 2: Run it and watch it fail**, then **Step 3: implement**, then **Step 4: watch it pass** (9 tests).

`deckFromTerms` must derive its id from the filter name, so re-running it updates the same deck rather than making a second one. `managedDeckToStudentDeck` refuses a deck with no cards — there would be nothing to study.

`tsc` stays red until Task 3 adds `'deck'` to `ContentKind`. Expected; do not fix it here.

- [ ] **Step 5: Commit**

```bash
git add src/data/decks.ts src/data/decks.test.ts
git commit -m "Work out which cards are worth showing today"
```

---

### Task 3: A deck is a kind of content

**Files:** `src/data/contentControl.ts`, `src/data/bulkImport.ts`, `src/pages/admin/BulkImportPage.tsx`, `src/pages/admin/ControlDashboard.tsx`; test in `src/data/bulkImport.test.ts`.

- [ ] **Step 1** — `ContentKind` gains `'deck'`; `ManagedContentItem` gains `deckData?: DeckAuthoringData`. Add an entry to every record `tsc` names:

```ts
  deck: { singular: 'deck', plural: 'Flashcard decks' },
```

```ts
  deck: [
    { key: 'Description', label: 'What this deck covers', multiline: true },
  ],
```

- [ ] **Step 2** — `IMPORT_SCHEMAS.deck` with the `common` fields plus `description` and `cards`. Document the `front | back` format in the field's `help`. `validateImportRow` requires at least one parseable card; `importRowToContent` builds `deckData` via `parseCardLines`.

- [ ] **Step 3** — tests:

```ts
test('a deck needs at least one card', () => {
  const errors = validateImportRow('deck', { title: 'CVS', subject: 'cvs' })
  assert.ok(errors.some((error) => /card/i.test(error)))
})

test('an imported deck splits its cards on the pipe', () => {
  const item = importRowToContent('deck', { title: 'CVS', subject: 'cvs', cards: 'Aorta | Largest artery' }, 'row-1')
  assert.equal(item.deckData?.cards[0].back, 'Largest artery')
})
```

`validateImportRow` returns `string[]`, not `{ errors }` — confirmed in an earlier slice. Check before writing.

- [ ] **Step 4** — `ControlDashboard.tsx`: kind tab, icon (`Layers` from `lucide-react` — confirm it exists at runtime), count, scope filter. `routeFor` in `BulkImportPage.tsx` must point at the route Task 6 creates: `deck: 'flashcards'`.

- [ ] **Step 5** — `npx tsc -b` clean, `npm test` green and larger.

```bash
git add src/data src/pages/admin
git commit -m "Let a deck be authored like every other piece of content"
```

---

### Task 4: Where a student's cards live

**Files:** `src/lib/stateOwnership.ts` + test, `ios/Synapse/Core/Sync/StateOwnership.swift`, `src/data/attempts.ts`, `src/lib/useDecks.ts` (new).

- [ ] **Step 1** — add `/^synapse\.flashcards\./` to `USER_OWNED_PATTERNS` **and** `"^synapse\\.flashcards\\."` to the Swift port, matching its escaping exactly. That file says it must stay a direct port; a mismatch means the phone writes a student's schedule where the web never reads it, silently. Add a test for the key.

- [ ] **Step 2** — `AttemptSurface` gains `'card'`. Extend the existing comment: a flashcard grade is the student saying how well they knew something, so like a station and a written answer it carries `correct: null`.

- [ ] **Step 3** — `src/lib/useDecks.ts` over `usePersistentState` on `nishany.flashcards.decks.v1`:

```ts
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

export function useDecks(): {
  decks: Record<string, StoredDeck>
  saveDeck: (deck: StoredDeck) => void
  removeDeck: (id: string) => void
  gradeCard: (deckId: string, cardId: string, next: CardSchedule) => void
}
```

Also store the daily counts (`{ day: string; newSeen: number; reviewsSeen: number }`) so the caps in `dueQueue` mean something across a day. Reset when the day changes.

- [ ] **Step 4** — verify and commit.

```bash
git add src/lib src/data/attempts.ts ios/Synapse/Core/Sync/StateOwnership.swift
git commit -m "Keep a student's decks and their schedule where they belong"
```

---

### Task 5: Studying

**Files:** `src/components/flashcards/CardRunner.tsx`, `src/components/flashcards/DeckList.tsx`, `src/pages/student/Flashcards.tsx`, `src/router.tsx`, `src/components/shell/nav.ts`.

- [ ] **Step 1** — `CardRunner`: one card at a time. The front, a *Show answer* control, then the back with four grade buttons.

  **Each grade button carries the interval it would produce** — "Good · 10m", "Easy · 4d". Compute it by calling `grade()` with that grade and formatting the result; that is the information the choice is about, and it also means the labels cannot drift from the scheduler.

  Keyboard: space shows the answer, 1–4 grade. Bind on the runner, not the window, and do not swallow keys while a text field has focus.

  On each grade: write the new schedule via `gradeCard`, and log an attempt with `surface: 'card'`, `correct: null`, `seconds: null`.

  When the queue empties, say what was done — studied, and how many graduate tomorrow. No score.

- [ ] **Step 2** — `DeckList` + the `Flashcards` page: the student's decks and the published ones together, each with due and new counts, premade ones marked as provided. Empty state in the house voice (see `MedicalTaxonomy.tsx`). Creating a deck, adding and editing cards, deleting a deck.

- [ ] **Step 3** — route at `/app/flashcards` via `lazyNamed`, and a `studentNav` entry in the **Workspace** group directly after Notebook: `{ label: 'Flashcards', to: '/app/flashcards', icon: Layers }`.

- [ ] **Step 4** — `npx tsc -b` clean, `npm test` green.

  Browser: **check `document.hidden` first — the pane may be closed, in which case say so and verify by DOM query rather than claiming you looked.** Create a deck, add a card, study it, grade Good, and confirm the interval moved and the card left the queue.

```bash
git add src/components/flashcards src/pages/student/Flashcards.tsx src/router.tsx src/components/shell/nav.ts
git commit -m "Study a deck, and have it come back when it should"
```

---

### Task 6: The admin tab, and the taxonomy deck

**Files:** `src/pages/admin/FlashcardsSetup.tsx`, `src/components/admin/DeckEditorDialog.tsx`, `src/pages/admin/ControlDashboard.tsx`, `src/router.tsx`, `src/components/shell/nav.ts`, `src/pages/student/MedicalTaxonomy.tsx`.

- [ ] **Step 1** — `FlashcardsSetup`: copy `PracticalSetup.tsx` with `initialKind="deck"` and `lockedKind`. Route at `/admin/flashcards`, `adminNav` entry under Content.

- [ ] **Step 2** — `DeckEditorDialog` following `ResourceEditorDialog`'s scaffold: a description, and the cards (add, edit front/back, delete, reorder). Branch to it in `ControlDashboard.tsx`.

- [ ] **Step 3** — in `MedicalTaxonomy.tsx`, a **Study these as flashcards** control that calls `deckFromTerms(filterName, filteredTerms)` and saves it via `useDecks`, then routes to `/app/flashcards`. Re-running it updates the same deck — that is what `deckFromTerms`' stable id is for. Say how many terms went in.

- [ ] **Step 4** — verify, and check the round trip: author a deck, publish it, study it as a student; then build one from the taxonomy and study that.

```bash
git add src/pages/admin src/components/admin src/pages/student/MedicalTaxonomy.tsx src/router.tsx src/components/shell/nav.ts
git commit -m "Add decks from the console, and turn the taxonomy into one"
```

---

## Out of scope, deliberately

- **FSRS.** It needs a review history to fit its parameters against; on day one there is none, so it would be a worse scheduler wearing a better name.
- **Sharing, import/export, and card media** — no reason to exist yet.
- **Slices F and G** (study parties, the word game).
