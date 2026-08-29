# Android Flashcards — research

**Date:** 2026-08-29
**Status:** Research only — feeds the Phase 3 implementation plan (`docs/superpowers/specs/2026-08-29-android-app-design.md`, build order item 3)
**Scope:** Port the web Flashcards feature (deck list, study session, admin authoring, taxonomy-to-deck) and its SM-2 scheduler to the native Android app.

This document cites every claim as `path:line` against
`/Users/doitrous/Documents/CodexGPT/Codex-Synapse continue on Claude/synapse-android`
(repo-relative paths below). It builds directly on prior art already in this
repo — `docs/superpowers/specs/2026-08-20-flashcards-design.md` (the web
feature's own design doc) and `docs/superpowers/specs/2026-08-29-android-app-design.md`
§5.2 (the Android MVP's existing Flashcards contract) — and goes one level
deeper into exact formulas, storage shapes, and the Android sync-spine gaps
this feature will expose.

---

## Headline finding

**The scheduler is SM-2, not FSRS — and this is stated explicitly and
repeatedly in the source, not something that needs inferring.**

`src/data/srs.ts:1-21` opens with a doc comment that says outright:

> "Every number in `ANKI_DEFAULTS` is Anki 25.02.5's own default preset, and
> the algorithm is the SM-2 scheduler those defaults belong to... FSRS is
> deliberately not implemented."

The reasoning given (`src/data/srs.ts:9-15`) is that FSRS fits its parameters
against a student's own review history, and on day one there is none — "it
would be guessing with more arithmetic." This is corroborated by the design
doc (`docs/superpowers/specs/2026-08-20-flashcards-design.md:29-31`) and the
Android app design doc (`docs/superpowers/specs/2026-08-29-android-app-design.md:43-44,
57-59`), both of which independently confirm SM-2 and rule out FSRS for this
MVP. There is no dead FSRS code path anywhere in `src/` — grepping for `fsrs`
(case-insensitive) across `src/` returns zero hits outside comments explaining
why it isn't there.

**Implication for the port:** the Android scheduler is a straightforward,
literal port of one 213-line pure TypeScript file. There is no algorithmic
ambiguity to resolve — only a faithful Kotlin re-expression plus the same test
vectors.

---

## 1. The scheduler (`src/data/srs.ts`)

### 1.1 Types and state carried per card

```ts
export type Grade = 'again' | 'hard' | 'good' | 'easy'                    // srs.ts:23
export type CardState = 'new' | 'learning' | 'review' | 'relearning'       // srs.ts:25

export interface CardSchedule {                                            // srs.ts:27-39
  state: CardState
  step: number       // index into learningSteps/relearningSteps; unused in 'review'
  interval: number   // whole days; 0 until the card graduates
  ease: number       // SM-2 ease factor, 2.5 = "×2.5"
  lapses: number
  reps: number
  due: string        // ISO 8601 timestamp
}
```

`step` is minutes-scale bookkeeping (index into a steps array); `interval` is
days-scale and is `0` for every card that hasn't graduated yet — the two
fields deliberately never both carry live information at once
(`srs.ts:29-32`).

### 1.2 Config and exact defaults (Anki 25.02.5's own preset)

```ts
export interface SrsConfig {                                               // srs.ts:41-62
  newPerDay: number
  maxReviewsPerDay: number
  learningSteps: number[]        // minutes
  relearningSteps: number[]      // minutes
  graduatingInterval: number     // days
  easyInterval: number           // days
  startingEase: number
  easyBonus: number
  hardMultiplier: number
  lapseNewIntervalPercent: number  // % of the OLD interval a lapse leaves behind
  minimumInterval: number          // days
  maximumInterval: number          // days
  leechThreshold: number
}

export const ANKI_DEFAULTS: SrsConfig = {                                  // srs.ts:64-78
  newPerDay: 20,
  maxReviewsPerDay: 200,
  learningSteps: [1, 10],
  relearningSteps: [10],
  graduatingInterval: 1,
  easyInterval: 4,
  startingEase: 2.5,
  easyBonus: 1.3,
  hardMultiplier: 1.2,
  lapseNewIntervalPercent: 0,
  minimumInterval: 1,
  maximumInterval: 36500,
  leechThreshold: 8,
}
```

Other constants (`srs.ts:85-92`):
- `MINIMUM_EASE = 1.3` — the ease floor, so a repeatedly-failed card can't
  spiral its own ease to zero and become due every single day forever.
- `EASE_DELTA_HARD = -0.15`, `EASE_DELTA_EASY = +0.15`, `EASE_DELTA_LAPSE = -0.2`.
- `MINUTE_MS = 60_000`, `DAY_MS = 86_400_000`.

**`leechThreshold` is declared but never consulted.** I grepped the entire
`src/` tree for `leech` (case-insensitive) and it appears exactly twice: the
type declaration (`srs.ts:61`) and the default value (`srs.ts:77`). Nothing
reads `card.lapses` against it, tags a card as a leech, suspends it, or
surfaces it to the student or admin anywhere in `src/`. **Treat leech
handling as not implemented on web — do not invent it for Android beyond
matching this exact non-behavior**, unless the product owner explicitly asks
for leech suspension as a *new* feature (see Open Questions).

### 1.3 Core functions, verbatim behavior

```ts
newCard(now, config = ANKI_DEFAULTS): CardSchedule   // srs.ts:103-113
```
Returns `{ state: 'new', step: 0, interval: 0, ease: config.startingEase,
lapses: 0, reps: 0, due: now.toISOString() }` — a new card is immediately due.

```ts
isDue(card, now): boolean                             // srs.ts:115-117
```
`Date.parse(card.due) <= now.getTime()`.

```ts
grade(card, answer, now, config = ANKI_DEFAULTS): CardSchedule   // srs.ts:123-128
```
Pure and total; never mutates its input (`srs.ts:119-122` explains why: a
caller holding the old schedule, e.g. a React render or an undo stack, must
keep seeing the old value). Increments `reps` by 1, then dispatches:
- `card.state === 'review'` → `gradeReview`
- anything else (`new`/`learning`/`relearning`) → `gradeSteps`

**`gradeSteps`** (`srs.ts:131-145`) — new/learning/relearning cards are
scheduled in **minutes** off a step list:
- `easy` → immediately `graduate()` regardless of which step the card is on.
- `again` → target step `0` (start over).
- `hard` → target step = **current** step (holds position — "not forgotten,
  so it doesn't restart; not recalled cleanly, so it doesn't advance").
- `good` → target step = `current + 1`.
- If `target >= steps.length` → `graduate()`.
- Otherwise → stay in `learning`/`relearning` at `step = target`, due in
  `stepDelay(steps, answer, target)` minutes from `now`.

**`stepDelay`** (`srs.ts:156-161`) — the one non-obvious rule: **Hard on the
*first* step (`target === 0`) averages the first two steps** — `(1+10)/2 =
5.5` minutes for the default `[1, 10]` — because repeating a 1-minute step
would show the card again almost instantly, which isn't what "hard" is
asking for. From the second step on, or with a single-step preset, Hard just
repeats the step it's on (`current`, with no averaging).

**`graduate`** (`srs.ts:163-171`):
- From `relearning`: keep the card's current `interval` (already shortened by
  the lapse) — "earning the full graduating interval back for one correct
  answer would undo the lapse."
- From `new`/`learning`: `interval = easyInterval (4d)` if graded `easy`,
  else `graduatingInterval (1d)`.
- Either way: `state = 'review'`, `step = 0`, `due = now + interval days`,
  clamped by `clampInterval` (rounds to whole days, caps at `maximumInterval`).

**`gradeReview`** (`srs.ts:173-193`) — the SM-2 core, for cards already in
`review`:
- `again` → delegates to `lapse()`.
- Otherwise, **overdue-day credit** is computed first (`srs.ts:176-181`):
  `delay = max(0, floor((now - card.due) / DAY_MS))` — days the card sat
  overdue, floored at zero (answered early ⇒ zero credit, never negative).
  This mirrors Anki: without it, a student back from a week off would have
  every interval *shrink*, punishing them for remembering longer than
  scheduled.
- Interval formula (`srs.ts:183-188`), by grade:
  - **hard**: `(interval + delay/4) × hardMultiplier` — a quarter of the
    overdue days credited.
  - **good**: `(interval + delay/2) × ease` — half credited.
  - **easy**: `(interval + delay) × ease × easyBonus` — all of it credited.
  - Result is clamped via `clampInterval` (round to whole days, cap at
    `maximumInterval = 36500`).
- Ease delta (`srs.ts:190`): `hard` → `-0.15`, `easy` → `+0.15`, `good` → `0`
  (unchanged), all floored at `MINIMUM_EASE = 1.3` via `clampEase`.
- New state: `review`, `step = 0`, `due = now + new interval (days)`.

**`lapse`** (`srs.ts:195-213`) — `again` on a review card:
- New interval: `round(card.interval × lapseNewIntervalPercent / 100)`,
  clamped between `minimumInterval` and `maximumInterval`. With the default
  `lapseNewIntervalPercent = 0`, this is always `minimumInterval = 1` day
  (before the relearning steps run).
- `ease = clampEase(ease - 0.2)`, `lapses += 1`.
- If the config has a first relearning step, the card goes to
  `relearning`, `step = 0`, due in that many minutes.
- If the config has **no** relearning steps at all, the card goes straight
  back to `review` on its (shortened) interval — there's nowhere else to put
  it (`srs.ts:207-209`).

### 1.4 Test vectors to reuse verbatim (`src/data/srs.test.ts`)

The 21 test cases in `src/data/srs.test.ts:1-142` are the ground truth for
the Kotlin port's own tests — port them 1:1, same fixture timestamps (base
`2026-08-20T09:00:00.000Z`), same expected numbers. Notable ones that
exercise the parts most likely to be gotten wrong in translation:
- `srs.test.ts:106-112` — Hard on first learning step → 5.5 minutes exactly.
- `srs.test.ts:120-129` — late-review Hard/Good credit fractions (`(10+10/4)
  ×1.2=15`, `(10+10/2)×2.5=37.5→38`).
- `srs.test.ts:132-135` — late-review Easy credits the full gap:
  `(10+10)×2.5×1.3=65`.
- `srs.test.ts:84-88` — ease floor holds after 5 repeated lapses from 1.35.
- `srs.test.ts:90-93` — interval never exceeds `maximumInterval` (36500).

### 1.5 Related but distinct: `reviewQueue.ts` is NOT the flashcards scheduler

`src/data/reviewQueue.ts:1-104` is a different feature — a **concept mastery**
review queue (fixed day-intervals per mastery band: shaky=1, practised=2,
developing=3, secure=14 — `reviewQueue.ts:25-30`) that drives the dashboard's
"due for review" concept list. It has nothing to do with flashcard decks or
SM-2 and should **not** be conflated with `srs.ts` during the port. Flag this
explicitly to whoever plans the phase so a search for "spaced repetition" in
the codebase doesn't accidentally merge the two.

---

## 2. Data model & storage

### 2.1 Content model — shared/admin-authored (read-only to the student)

```ts
export interface DeckCard { id: string; front: string; back: string }      // decks.ts:17-21
export interface DeckAuthoringData { description: string; cards: DeckCard[] }  // decks.ts:24-27
export interface StudentDeck {                                              // decks.ts:30-36
  id: string; title: string; subjectId: string; description: string; cards: DeckCard[]
}
```

Cards are **plain front/back text only** — confirmed by `DeckCard` itself
(no image/media/cloze fields), by the admin editor
(`src/components/admin/DeckEditorDialog.tsx:141-154`, two `Textarea`s per
card, nothing else), and by the bulk-import authoring spec
(`Instruction Manual for Content Creation/14-decks-essays-histology.md:27-58`,
which documents only `description` and `cards` as deck-specific fields, one
`front | back` per line). **There is no image occlusion, no cloze deletion,
no rich text/HTML in cards today.** See §3 for why this simplifies (not
complicates) the Android port.

`ManagedContentItem` (`src/data/contentControl.ts:619-637`) is the ledger
item shape shared by every content kind; `deckData?: DeckAuthoringData` is
the deck-specific slot (`contentControl.ts:634`). A deck becomes visible to
students via `managedDeckToStudentDeck` (`src/data/decks.ts:95-106`), which
returns `null` unless `isStudentPublishable(item)` (status `Published` **and**
no blocking required media requests, `contentControl.ts:667-669`) **and**
`item.deckData` exists with at least one card.

**Notable gap versus other content kinds — decks are not university/year
scoped.** `itemScope()` (`src/data/contentControl.ts:695-702`) reads
`questionData.tags`, or `articleData`/`practicalData`/`resourceData` for
their `universityIds`/`yearIds` — **`deckData` is never consulted**. A
published deck is therefore visible to every student regardless of
university or year, unlike questions/articles/practicals/resources. The
admin "Flashcards Setup" university/year navigator
(`src/pages/admin/FlashcardsSetup.tsx:16-111`) is purely an authoring-side
browsing convenience over `ControlDashboard`'s generic scope filter — it does
not gate what a student sees. Confirm this is intentional before the Android
port (see Open Questions) rather than silently adding scoping that doesn't
exist on web.

### 2.2 Per-student state — private, never shared

```ts
export interface CardSchedule { ... }   // srs.ts — see §1.1, one per card

export interface StoredDeck {                                              // useDecks.ts:19-28
  id: string
  name: string
  sourceId?: string    // set when this deck mirrors a published one
  cards: { id: string; front: string; back: string }[]
  schedules: Record<string, CardSchedule>   // card id -> that student's own schedule
  createdAt: string
}

export interface DailyDeckCounts { day: string; newSeen: number; reviewsSeen: number }  // useDecks.ts:37-41
```

Key design point (`useDecks.ts:5-14`): **a deck's schedule map lives on the
student's own document, keyed by card id — including for cards that came
from a published deck.** This is why an admin fixing a typo on a card never
resets anyone's progress, and why two students studying the same published
deck never see each other's intervals. `StoredDeck.cards` for a
provided-deck mirror is a **snapshot of content at time of first study**, not
a live join — `DeckList.startStudy` (`src/components/flashcards/DeckList.tsx:104-120`)
writes `merged.cards = entry.cards` (the *current* catalogue cards) every
time a provided deck is (re-)opened for study, so it does stay in sync with
catalogue edits on each subsequent visit, while `schedules` persists across
that overwrite.

`DailyDeckCounts` bounds the daily new/review caps to the **local calendar
day** (`useDecks.ts:46-53`, explicit UTC-avoidance rationale), not UTC —
important for Android to replicate with the device's local `ZoneId`, not
`Instant`/UTC.

### 2.3 Exact storage keys

| Key | Constant | Shape | Owner | Endpoint |
|---|---|---|---|---|
| `synapse.flashcards.decks.v1` | `DECKS_KEY`, `useDecks.ts:16` | `Record<string, StoredDeck>` | student | `/api/user-state/:key` |
| `synapse.flashcards.dailyCounts.v1` | `DAILY_COUNTS_KEY`, `useDecks.ts:17` | `DailyDeckCounts` | student | `/api/user-state/:key` |
| `synapse-admin-content-ledger-v4` | `CONTENT_LEDGER_STORAGE_KEY`, `contentControl.ts:21` | `ManagedContentItem[]` (all content kinds, not just decks) | shared/admin | `/api/state/:key` (read-only to student) |

**Ownership routing is already ported and correct on Android for both
per-student keys**: `Regex("^synapse\\.flashcards\\.")` is present in
`android/app/src/main/java/com/synapse/app/core/sync/StateOwnership.kt:20`,
matching the web pattern at `src/lib/stateOwnership.ts:20` exactly, and also
already ported to iOS at `ios/Synapse/Core/Sync/StateOwnership.swift:27`
(confirmed present, though iOS has no flashcards feature built on top of it —
see §2.4). **No `StateOwnership` change is needed for this port.**

**The content-ledger key is already in the Android catalogue allow-list**:
`android/app/src/main/java/com/synapse/app/core/sync/StudentReadableKeys.kt:19`
lists `"synapse-admin-content-ledger-v4"` in `STUDENT_READABLE_KEYS`,
matching the server's own allow-list at `server/src/index.js:1042-1060`
(`STUDENT_READABLE_STATE`, which includes the same key). **This means the
deck catalogue already round-trips through `SyncEngine.pullCatalogues()`
(`android/.../core/sync/SyncEngine.kt:36-57`) with zero additional wiring** —
the only new work is projecting it into deck objects (§5).

### 2.4 iOS status

`ios/Synapse/Core/Sync/StateOwnership.swift:27` already carries the
`synapse.flashcards.` ownership pattern (kept in lockstep with web per the
comment at `useDecks.ts` design intent and the Android file's own header
comment), but grepping all of `ios/` for `flashcard` (case-insensitive)
surfaces **only that one line** — no model, no store, no view. Flashcards is
explicitly deferred on iOS (confirmed by
`docs/superpowers/specs/2026-08-29-android-app-design.md:50-53`: "notably
Flashcards... do not exist yet on iOS. Android will lead ... then feed those
designs back to iOS."). **Android is the first native platform to actually
build this feature** — there is no working native reference implementation
to copy UI/store patterns from; only the ownership-routing constant is
shared prior art.

---

## 3. UI surfaces & features (every button, enumerated)

### 3.1 Student surface — `src/pages/student/Flashcards.tsx`

Route: `/app/flashcards` (`src/router.tsx:87,150`), nav entry "Flashcards"
with a `Layers` icon (`src/components/shell/nav.ts:69`).

Top-level composition (`Flashcards.tsx:18-59`): reads the student's own
`decks`/`dailyCounts` via `useDecks()`, reads the shared content ledger via
`usePersistentState(CONTENT_LEDGER_STORAGE_KEY, ...)`, filters to
`kind === 'deck'` and projects via `managedDeckToStudentDeck`, then renders
either `DeckList` (browse) or `CardRunner` (study), toggled by local
`active` state — **no route param, no deep link into a specific deck's
study session** (it's a single-page state machine).

### 3.2 Deck list — `src/components/flashcards/DeckList.tsx`

Two panels, always both shown once any deck exists (empty-state variant when
both are empty, `DeckList.tsx:136-150`):

- **"Your decks"** (`DeckList.tsx:154-176`) — the student's own
  (`sourceId` absent) decks, sorted newest-id-first. Each row
  (`DeckRow`, `DeckList.tsx:212-257`):
  - Shows **due count** and **new count** (`counts()`, `DeckList.tsx:36-45`
    — due = not-new and past its `due` timestamp; fresh = state `new` or no
    schedule yet).
  - **Study** button (primary, `Play` icon) — disabled when both counts are 0.
  - **Add and edit cards** icon button (`Pencil`) → opens `ManageDeckDialog`.
  - **Delete deck** icon button (`Trash2`) → opens `DeleteDeckDialog`.
  - **"New deck"** button (header, `Plus` icon) → opens `CreateDeckDialog`.
- **"Provided decks"** (`DeckList.tsx:178-189`) — published decks from the
  ledger, each tagged with a `Badge` reading "Provided"
  (`DeckList.tsx:237`) plus a `SubjectTag` for its subject. **No edit/delete
  controls** — only **Study**. Its due/new counts are computed against the
  student's own mirrored schedule if one exists (`sourceId === deck.id`),
  else every card counts as fresh (`DeckList.tsx:91-102`).

**Dialogs:**
- `CreateDeckDialog` (`DeckList.tsx:259-283`) — one text field (deck name),
  Enter-to-submit, "Create deck" button disabled until non-blank.
- `ManageDeckDialog` (`DeckList.tsx:285-365`) — full CRUD on an own deck's
  cards while viewing it as a list:
  - Existing cards render as two inline `TextInput`s (front/back, live-edited
    on every keystroke via `updateCard`) plus a per-card delete (`Trash2`,
    which also strips that card's schedule entry, `DeckList.tsx:309-312`).
  - "Add a card" section: two `Textarea`s (front/back) + an "Add" button
    (`Plus` icon), disabled until both are non-blank.
  - No reordering control in the student's own-deck editor (unlike the admin
    editor, which has up/down — see §3.3).
- `DeleteDeckDialog` (`DeckList.tsx:367-383`) — confirmation copy explicitly
  states cards *and schedules* are lost and this "cannot be undone"; a
  `danger`-styled Delete button.

### 3.3 Study session — `src/components/flashcards/CardRunner.tsx`

One card at a time, `deckId`/`title`/`subjectId`/`cards`/`schedules`/
`dailyCounts` passed in as props, `onGrade`/`onExit` as callbacks
(`CardRunnerProps`, `CardRunner.tsx:47-57`).

- **Queue is snapshotted once, at mount** (`CardRunner.tsx:73-81`):
  `newCard(now)` fills in a schedule for any card that has none yet, then
  `dueQueue()` (due-before-new, capped by `dailyCounts`) produces a fixed
  array. Explicitly **not** live-re-derived — a card graded Again with a
  1-minute step is deliberately *not* re-offered the moment that minute
  elapses within the same sitting, "turning one pass through the deck into
  an open-ended loop" (`CardRunner.tsx:73-76`). **This snapshot-at-mount
  behavior must be preserved on Android.**
- Front card panel: uppercase "Front" label, the card's `front` text
  (`CardRunner.tsx:200-201`).
- **"Show answer"** button, or press **Space** (`CardRunner.tsx:117-135` for
  the keydown handler; disabled while focus is inside any input/textarea/
  select/contenteditable so it doesn't steal typing from the deck-management
  screens this runner is opened from).
- Once revealed: "Back" section with the card's `back` text
  (`CardRunner.tsx:203-207`), and **four grade buttons** — Again / Hard /
  Good / Easy — each labeled with **the live-computed resulting interval**
  ("Good · 10m", "Easy · 4d", via `formatInterval`, `CardRunner.tsx:35-45`
  and the inline `computeGrade` call per button, `CardRunner.tsx:220-237`).
  Each button is tone-coded (danger/neutral/primary/success,
  `GRADE_TONE`, `CardRunner.tsx:20-25`).
- **Keyboard shortcuts 1–4** for the four grades once the answer is shown
  (`CardRunner.tsx:137-140`), with visible `Kbd` hints under the buttons
  (`CardRunner.tsx:239-245`), and **Escape** to exit the session at any time
  (`CardRunner.tsx:125-129`).
- **Progress meter**: a `Meter` bar plus "`position` / `total`" text
  (`CardRunner.tsx:194-197`), `total` fixed at session start.
- **Attempt logging**: every grade calls `logAttempt` with
  `surface: 'card'`, `itemId: '${deckId}:${cardId}'`, `correct: null`,
  `seconds: null` (`CardRunner.tsx:96-110`). The design doc is explicit about
  why `correct` is `null` and not a boolean derived from the grade
  (`docs/superpowers/specs/2026-08-20-flashcards-design.md:80-87`,
  `CardRunner.tsx:97-99`): a flashcard grade is a **self-report** of recall
  quality, not a marked answer, and coercing it into true/false would quietly
  corrupt every accuracy figure elsewhere in the app that reads the attempt
  log. **Android's `AttemptRecord.correct` must stay `null` for `surface =
  "card"` attempts** — this is directly relevant to the existing
  `android/.../core/qbank/Attempt.kt:24` field, which is currently only
  populated by qbank flows.
- **End-of-session summary** (`CardRunner.tsx:147-181`): "Session complete"
  (if `studied > 0`) or "Nothing due right now" (if the queue was empty from
  the start); text reports **count studied** and, if any, **how many
  graduate tomorrow or later** (`graduated`, incremented when the *new*
  `due` date is more than 0 days out, `dayDiff`-based,
  `CardRunner.tsx:112`). Explicitly **no score/percentage** — the code
  comment at `CardRunner.tsx:158-159` states a flashcard grade is a
  self-report, not a mark, and a percentage would misrepresent that.
  "Back to Flashcards" button returns to the deck list.

**Features that do *not* exist** (confirm these are true non-goals for
Android too, not accidental omissions): no suspend, no bury, no flag, no
undo/redo of a grade, no "edit this card" affordance from inside the study
session, no per-card notes/tags, no browse-all-cards view, no dedicated
flashcards stats/analytics screen (progress is only visible via the generic
attempt-log-driven dashboard, which doesn't appear to break flashcard
attempts out specially — `src/components/dashboard/LastUsedResources.tsx:27`
maps a `Deck` content kind to an icon, but that's the only dashboard
flashcards-specific line found by grep across `src/components/dashboard/`).

### 3.4 "Study these as flashcards" — `src/pages/student/MedicalTaxonomy.tsx`

A second entry point that builds a deck **on the fly** from whatever glossary
terms are currently filtered on screen (`MedicalTaxonomy.tsx:77-88`):
`deckFromTerms(currentFilterName(category, query), filtered)`
(`src/data/decks.ts:129-138`) derives a **stable, deterministic deck id**
from the filter name alone (`slugify`, `decks.ts:116-118`) — front = the
English term, back = the definition (`decks.ts:136`; **Arabic term/definition
are not used**, despite being available on the term object, per
`decks.test.ts:60-67`'s fixture carrying an unused `ar` field). Re-running the
same filter **overwrites the same deck** rather than creating a duplicate,
and any existing schedule on cards still present survives the overwrite
(`MedicalTaxonomy.tsx:79-86`). After saving, it `navigate('/app/flashcards')`
— no auto-start into the study session; the student lands on the deck list
and must press Study themselves.

### 3.5 Admin authoring (context — not part of the student app, but shapes what the Android catalogue projector must handle)

- **`src/pages/admin/FlashcardsSetup.tsx`** (`FlashcardsSetup.tsx:1-111`) —
  a "Master Flashcards" + per-university/year navigator wrapping
  `ControlDashboard` locked to `kind='deck'`. Purely a browsing convenience
  over the same ledger (see §2.1 on why this does **not** imply real
  scoping).
- **`src/components/admin/DeckEditorDialog.tsx`** (`DeckEditorDialog.tsx:1-177`)
  — title, subject/system select, workflow status (`Draft`/`In review`/
  `Published`/`Archived`), content owner, description, and a **reorderable**
  card list (up/down arrows, `moveCard`, `DeckEditorDialog.tsx:73-79`) with
  inline front/back editing and per-card delete. Validity gate: non-blank
  title, a subject, and ≥1 card (`DeckEditorDialog.tsx:63`).
- **Bulk import** (`src/data/bulkImport.ts:215-223,1007-1011,1293-1302`;
  schema doc `src/data/importContract.ts:80-85`; authoring guide
  `Instruction Manual for Content Creation/14-decks-essays-histology.md:27-58`)
  — Markdown/CSV-style import with `## description` and `## cards` fields,
  cards as `front | back` one per line, parsed by the same
  `parseCardLines()` (`src/data/decks.ts:75-88`) the taxonomy-deck builder
  doesn't use but the student's own `ManageDeckDialog` also doesn't use
  (that one calls `saveDeck` directly per keystroke, not through line
  parsing) — `parseCardLines` is specifically the bulk-import/CSV path's
  parser. A line with no `|` separator is silently skipped, not surfaced as
  a partial card (`decks.ts:80-82`, tested at `decks.test.ts:44-46`).

**None of this admin tooling needs to exist on Android** (admin stays
web-only per the Android app design doc's stated scope,
`docs/superpowers/specs/2026-08-29-android-app-design.md:6`) — it's included
here only so the ledger-projection code on Android knows exactly what shapes
of `deckData` it may see arriving from the server (including decks with 0
cards mid-authoring, decks in non-`Published` status, decks missing
`deckData` entirely on very old/malformed items).

### 3.6 Things that will be easy vs. hard on Android

**Easy** — this is genuinely one of the simplest content types in the app:
- No rich text, no images, no cloze/occlusion anywhere in the current
  product (confirmed in §2.1). A `Text` composable per side is sufficient.
- No per-card media means **no offline media-pinning work** analogous to
  QBank's `MediaCache`/`pinScopeForOffline`
  (`android/.../feature/qbank/QBankRepository.kt:143-173`) — flashcards data
  is 100% JSON, nothing binary to prefetch for offline study.
- The scheduler is pure and already has a Kotlin architectural precedent
  to mirror exactly (`QuestionProjection`/`QBankSession`, see §5).

**Watch for / genuinely hard:**
- **Keyboard shortcuts (1-4, Space, Escape)** are a web-only interaction
  model; Android needs an equivalent (large tap targets are already the
  primary interaction, but a physical-keyboard/Chromebook or tablet-with-
  keyboard user would expect parity — likely low priority, but note it).
- **The "queue snapshotted at session mount" semantic** (§3.3) requires
  deliberate state design in a Compose ViewModel — it's easy to accidentally
  make the queue reactive to the live schedule store and break the "one pass
  through the deck" guarantee.
- **Local-calendar-day daily caps** (§2.2) must use the device's local
  `ZoneId`, not UTC — an easy off-by-one-timezone bug, and the web code has
  an explicit comment warning about exactly this (`useDecks.ts:46-50`).
- **Deck editing UX parity** — the student's own-deck editor doesn't
  reorder cards (only the admin editor does); don't accidentally add a
  feature that isn't in the product being ported.

---

## 4. Offline

What must work with no network, per the product's own framing
(`docs/superpowers/specs/2026-08-29-android-app-design.md:169-171` states the
QBank offline bar; §5.2's acceptance criterion, line 189-190, states the
flashcards one explicitly): **"a deck reviewed offline syncs schedules back
correctly."** Concretely, offline must support:

1. **Browsing decks** — both the student's own and any previously-synced
   provided decks — with correct due/new counts.
2. **Running a full study session** on a due deck, including grading every
   card through all four grade options, with the four interval previews
   computed correctly.
3. **Persisting the resulting schedule + daily-count changes locally**, such
   that re-opening the app (even before reconnecting) shows the updated
   due/new counts, and such that once connectivity returns, those changes
   sync to the server without loss or duplication.
4. Studying a **taxonomy-derived deck** offline requires the medical
   glossary catalogue (`synapse-medical-glossary-v1`) to already be
   locally cached — this is a pre-existing catalogue key already in
   `STUDENT_READABLE_KEYS` (`StudentReadableKeys.kt:24`), not new to this
   feature, but worth calling out as a dependency if the taxonomy-to-deck
   entry point is in scope for the same phase.

Nothing here requires new binary/media caching (§3.6). The entire offline
surface is JSON: the shared deck catalogue (already synced generically via
`SyncEngine.pullCatalogues()`) and the student's own two small documents
(§2.3). The open question is **not** "can this be made to work offline" —
it's "does the existing sync spine actually have a place to durably store
and read back an arbitrary per-student JSON document," which it currently
does not (see §5.3, this is the central risk of the whole port).

---

## 5. Android port plan sketch

### 5.1 What already exists and needs zero new work

- `StateOwnership.isUserOwned("synapse.flashcards.decks.v1")` and the
  `dailyCounts` key both already return `true`
  (`android/.../core/sync/StateOwnership.kt:20`, tested presumably in
  `StateOwnershipTest.kt`).
- `"synapse-admin-content-ledger-v4"` is already in
  `STUDENT_READABLE_KEYS` (`StudentReadableKeys.kt:19`), so
  `SyncEngine.pullCatalogues()` already fetches and locally caches the deck
  catalogue alongside every other content kind, with zero flashcards-specific
  sync code.
- `SynapseApi.getUserState`/`putUserState` already exist on the interface
  and have a working Retrofit implementation
  (`android/.../core/api/SynapseApi.kt:8-9`,
  `android/.../core/api/RetrofitSynapseApi.kt:68-70,88,91`).
- `StatePrecedence.localCopyWins` (last-write-wins conflict rule, ported from
  the web's `recoveryCopyWins`) already exists and is unit-tested
  (`android/.../core/sync/StatePrecedence.kt:1-14`).

### 5.2 Proposed new Kotlin files (mirrors the QBank package shape exactly)

**Pure logic — no Android framework deps, TDD-first (per
`docs/superpowers/specs/2026-08-29-android-app-design.md`'s own testing
strategy and build order):**

- `core/flashcards/Srs.kt` — verbatim port of `src/data/srs.ts`: `Grade`
  enum, `CardState` enum, `CardSchedule` data class, `SrsConfig` data class +
  `AnkiDefaults` object, `newCard()`, `isDue()`, `grade()` (dispatching to
  private `gradeSteps`/`gradeReview`/`graduate`/`lapse`/`stepDelay` mirroring
  the TS file's own private-function boundaries 1:1 so a future diff against
  `srs.ts` stays easy). Clock passed as `Instant`/`java.time`, never read
  internally — same rationale as the TS file (`srs.ts:17-20`).
- `core/flashcards/SrsTest.kt` — port all 21 cases from `src/data/srs.test.ts`
  with identical fixture timestamps and expected values (§1.4).
- `core/flashcards/Deck.kt` — `DeckCard`, `StudentDeck`, `StudyCard`,
  `dueQueue()`, `parseCardLines()`, `deckFromTerms()` (pure, ported from
  `src/data/decks.ts`).
- `core/flashcards/DeckTest.kt` — port `src/data/decks.test.ts`'s 8 cases.
- `core/qbank/ContentLedger.kt` **gains** (or a sibling
  `core/flashcards/DeckLedgerModel.kt` defines) a `deckData` field on the
  shared `ManagedContentItem` wire model, or its own parallel
  `@Serializable data class ManagedContentItem` scoped to deck projection —
  today `ContentLedger.kt:12-20` only models `questionData`; decide whether
  to widen the one shared DTO (simpler call sites, but couples qbank and
  flashcards deserialization) or keep `QuestionProjection`-style per-feature
  DTOs that each `ignoreUnknownKeys`-decode their own view of the same JSON
  array (matches the existing QBank precedent more closely — recommend this
  approach, see `QuestionProjection.kt:11-38` for the exact pattern to copy).
- `core/flashcards/DeckProjection.kt` — mirrors
  `core/qbank/QuestionProjection.kt:17-79` exactly: parse the ledger JSON
  array (or `{items: [...]}` wrapper), filter `kind == "deck"`, drop unless
  `status == "Published"` and `deckData != null` and `deckData.cards`
  non-empty (port of `isStudentPublishable` +
  `managedDeckToStudentDeck`'s null-guards, `decks.ts:95-106`).
- Test with fixtures covering: unpublished deck dropped, published-but-
  empty deck dropped (port `decks.test.ts:48-58` cases).

**Data layer:**

- `feature/flashcards/FlashcardsRepository.kt` — mirrors
  `feature/qbank/QBankRepository.kt`'s shape:
  - `providedDecks(): List<StudentDeck>` — reads the cached ledger via
    `localStore.getCatalogue(CONTENT_LEDGER_KEY)` (reusing the existing
    constant, `QBankRepository.kt:34`) and runs `DeckProjection.project(...)`.
  - `ownDecks(): Map<String, StoredDeck>` / `dailyCounts(): DailyDeckCounts`
    — **this is the part with no existing precedent; see §5.3.**
  - `saveDeck(deck: StoredDeck)`, `removeDeck(id)`, `gradeCard(deckId,
    cardId, next: CardSchedule)` — each updates the local cache
    optimistically and calls `syncEngine.write(key, json, now)` exactly as
    `QBankRepository.recordAttempts` does (`QBankRepository.kt:87-114`), but
    for a *replace-the-whole-document* write rather than an *append-and-
    re-serialize-the-month* write.
- `FlashcardsRepositoryTest.kt`.

**UI (Compose), once ViewModel conventions are settled per the Dashboard
precedent — `feature/dashboard/DashboardScreen.kt` +
`feature/dashboard/DashboardViewModel.kt`:**

- `feature/flashcards/FlashcardsViewModel.kt`
- `feature/flashcards/DeckListScreen.kt` (+ `CreateDeckDialog`,
  `ManageDeckDialog`, `DeleteDeckDialog` composables)
- `feature/flashcards/CardRunnerScreen.kt` (+ a `CardRunnerViewModel` or a
  plain `remember`-scoped session state holder that snapshots the queue at
  entry — see §3.6's warning about not making the queue reactive)

### 5.3 The central architectural risk: there is no durable local store for arbitrary per-student documents yet

This is the single most important thing for whoever plans this phase to
resolve **before** writing `FlashcardsRepository`, because it blocks the
repository's read side entirely, not just an edge case:

- `LocalStore` (`android/.../core/cache/LocalStore.kt:1-14`) exposes exactly
  three kinds of persistence: **catalogue** (`putCatalogue`/`getCatalogue`/
  `catalogueUpdatedAt` — shared, read-only, manifest-diffed), **outbox**
  (`enqueue`/`pendingOutbox`/`clearOutbox` — a *transient* pending-write
  queue, cleared once successfully pushed), and **attempts**
  (`putAttempts`/`attempts` — a bespoke, append-only, month-bucketed store
  built specifically for QBank/attempt records).
- **None of these is "the last-known-good value of an arbitrary per-student
  JSON document."** `SyncEngine.write()` (`SyncEngine.kt:77-81`) only
  `store.enqueue()`s (adds to the pending-push queue) and drains — it never
  writes anywhere that survives a successful push. Once
  `drainOutbox()` succeeds, `store.clearOutbox(entry.key)`
  (`SyncEngine.kt:99`) removes the only on-device copy of that write.
- `SynapseApi.getUserState()` is fully implemented end-to-end
  (`RetrofitSynapseApi.kt:68`) but **is never called from anywhere in the
  app** — confirmed by grepping the whole `android/app/src/main/java` tree
  for `getUserState`: it appears only in the interface declaration and the
  Retrofit implementation, zero call sites. `SyncEngine.pullCatalogues()`
  only calls `api.getState()` (the shared/read-only endpoint) for the fixed
  `STUDENT_READABLE_KEYS` list.
- `StatePrecedence.localCopyWins` (`StatePrecedence.kt:9-13`) is written and
  unit-tested but likewise **has zero call sites** in `SyncEngine.kt` — the
  conflict rule the design doc describes as locked
  (`docs/superpowers/specs/2026-08-29-android-app-design.md:97-103`) is not
  actually wired into the pull/push path yet.

**Why QBank got away without this:** QBank's only per-student mutable state
is the append-only attempt log, which has its own bespoke store
(`putAttempts`/`attempts`) and needs no conflict resolution because attempts
are idempotent and additive (`SyncEngine.kt:59` comment; server enforces a
uniqueness constraint per the design doc, line 99-100). **Flashcards is the
first feature that needs to durably read back a single mutable document it
previously wrote** — the deck+schedule map isn't an event log, it's current
state, and a student must be able to see it (due counts, which cards are
new) after an app restart with an empty outbox (e.g., the write already
synced yesterday).

**What this means for planning:** before or alongside `FlashcardsRepository`,
the phase needs a small, generic addition to the sync spine — something like
a `userDoc` table in `LocalStore` (`putUserDoc(key, json, updatedAt)` /
`getUserDoc(key)`), populated by:
1. An explicit `pullUserDoc(key)` (or a small fixed list of "known per-
   student document keys this app reads," analogous to
   `STUDENT_READABLE_KEYS` but hitting `getUserState` instead of `getState`)
   called during `SyncEngine.refresh()`, so a fresh install / new device
   recovers existing progress.
2. **Optimistic local writes**: `SyncEngine.write()` should update this
   local cache immediately (not only enqueue), so a screen reading it back
   reflects the change instantly and survives a restart even before the
   outbox drains — today's `enqueue`-then-`clearOutbox` flow has no such
   durable copy.
3. Wiring `StatePrecedence.localCopyWins` into whichever path decides "keep
   my local write or take the server's" when both exist (matters more once
   multi-device conflicts are a real scenario than for MVP correctness, but
   the pieces should connect since both already exist in isolation).

This is a **shared sync-spine enhancement**, not something flashcards-
specific to hide inside `FlashcardsRepository` — the same gap will resurface
for Notebook (`synapse.notebook.notes`) and Whiteboard
(`synapse.whiteboard.boards.v1`) in later phases (§5.4/5.5 of the Android app
design doc), so solving it generically now pays for itself twice more.

### 5.4 Parallelizable work breakdown

Once §5.3's spine gap has a design (it may be a short, separate mini-task
ahead of the rest), the remaining work parallelizes cleanly:

1. **Track A (pure, no dependencies)**: `Srs.kt` + `SrsTest.kt`. Can start
   immediately, fully spec'd by this document and the existing TS tests.
2. **Track B (pure, depends only on A's types)**: `Deck.kt` + `DeckTest.kt`,
   `DeckProjection.kt` + tests. Can start in parallel with A if `CardSchedule`
   is stubbed first (it's a small, stable type).
3. **Track C (depends on §5.3's spine fix landing)**:
   `FlashcardsRepository.kt` + tests.
4. **Track D (depends on A+B+C)**: Compose screens
   (`DeckListScreen`/`CardRunnerScreen`/dialogs) + ViewModel.

### 5.5 Libraries with no direct Kotlin equivalent

None identified as blocking. The web feature uses no scheduling library
(the algorithm is hand-written in `srs.ts`), no rich-text editor, no
image/canvas library — it's plain React state + a pure TS module. The only
"library" dependency worth naming is `lucide-react` icons
(`DeckList.tsx:2`, `CardRunner.tsx:2`) — Android already has its own Material
icon set / design-system icons per the app design doc's `design/` module
(`docs/superpowers/specs/2026-08-29-android-app-design.md:277`), so this is
a straightforward icon-substitution, not a porting risk.

---

## 6. Open questions for the human/controller

1. **The sync-spine gap (§5.3) — sequencing.** Should the generic
   "durable per-student document cache + pull + optimistic-write" capability
   be its own preliminary task ahead of Flashcards (recommended, since
   Notebook and Whiteboard need it too), or built narrowly for flashcards
   first and generalized later? This materially changes the phase's task
   breakdown and estimate.
2. **Deck scoping.** Confirmed on web: published decks are **not**
   university/year scoped (§2.1), unlike every other content kind. Is this
   intentional/permanent product behavior to match exactly, or a web gap
   that Android should either also reproduce faithfully (for now) or that
   should be fixed on web first so both platforms agree? Recommend matching
   web exactly for MVP and filing the scoping question separately.
3. **Leech handling.** `leechThreshold` exists in `SrsConfig`/`ANKI_DEFAULTS`
   but is entirely unused (§1.2) — no suspension, tagging, or surfacing of
   leeches anywhere in `src/`. Should Android (a) faithfully match this
   non-behavior, or (b) is this a good moment to actually implement leech
   handling as a genuinely new, coordinated feature (web + Android)? If (b),
   that's out of scope for a "port" and needs its own design.
4. **Taxonomy-to-deck entry point — same phase or deferred?** §3.4's
   "Study these as flashcards" from Medical Taxonomy depends on the medical
   glossary catalogue and the `MedicalTaxonomy` screen, neither of which is
   otherwise in the Android MVP's Phase 3 scope as described in
   `docs/superpowers/specs/2026-08-29-android-app-design.md` (Medical
   Taxonomy glossary is explicitly listed as a **non-goal/deferred** surface,
   line 323). Should Flashcards ship in this phase with only the "your
   decks" + "provided decks" surfaces (deferring the taxonomy entry point
   until Medical Taxonomy itself is built), or is a taxonomy-independent
   partial port of `deckFromTerms` wanted sooner? Recommend deferring
   alongside Medical Taxonomy.
5. **Keyboard-shortcut parity (§3.6).** Worth replicating on
   Android (tablet/Chromebook/hardware-keyboard users), or explicitly
   descoped as web-only ergonomics for MVP?
6. **`ManagedContentItem` DTO strategy (§5.2).** Widen the single shared
   Kotlin `ManagedContentItem` (in `ContentLedger.kt`) to also carry
   `deckData`, or keep a separate per-feature decode the way
   `QuestionProjection` already does? Recommend the latter for consistency
   with existing code, but flag it since it means two Kotlin classes both
   named/shaped like `ManagedContentItem` in different packages — naming
   needs to avoid collision (e.g. `DeckManagedContentItem` or put it in a
   `core/flashcards` package as done above).
7. **Stats/analytics scope.** Web has no dedicated flashcards stats screen
   (§3.3) — confirm Android shouldn't add one either, keeping true feature
   parity rather than "while we're at it" scope creep.

---

## Resolved decisions (controller, 2026-08-29)

- **Card richness: MATCH WEB (plain text).** Confirmed against `src/data/decks.ts` — `DeckCard = { id, front, back }`, both plain strings; no image/cloze/rich-text field exists in the model, the admin deck editor, the student deck editor, or `CardRunner.tsx`. Android flashcards ship at parity: plain front/back only. Richer cards (images/cloze/formatting) are a deliberate later milestone, NOT part of the initial port — they'd be net-new capability that doesn't round-trip to the web authoring model. → No media cache for flashcards.
- **Scheduler: SM-2 now** (literal port of `src/data/srs.ts`, 21 tests), FSRS deferred (needs review history). Match web's non-behavior on `leechThreshold` (declared, never consulted).
- **PREREQUISITE (verified): durable user-state store.** `StatePrecedence.localCopyWins` has ZERO production call sites; `getUserState` lives only in the API/Retrofit layer + test fakes. The sync spine can WRITE user-owned keys (outbox→push) but has no durable local cache to READ arbitrary per-student mutable JSON back offline. Flashcards is the first feature needing this (Notebook + Whiteboard will too). → Sequence a small "durable user-state store" plan (Room-backed cache of user-owned StateDoc keyed by key, integrated into SyncEngine.refresh, applying localCopyWins, read via a repository) BEFORE FlashcardsRepository. Build it once, reuse for all three.
