# Plan 05 — Flashcards (SM-2, plain text, offline)

**Depends on:** Plan 04 (durable user-state store) merged — `LocalStore.getUserState/putUserState/userStateSavedAt`, `SyncEngine.write` write-through + `pullUserState`. Feeds off research
`docs/superpowers/specs/2026-08-29-android-flashcards-research.md` (cite it for every formula/shape).

**Scope (parity with web, per resolved decisions):** deck list (your decks + provided decks),
deck CRUD on own decks, the study session (SM-2 scheduling, self-report grades), offline study that
syncs schedules back. Plain front/back text only.

**Deferred (documented non-goals, matching web / MVP):** taxonomy "study these as flashcards"
entry point (ships with Medical Taxonomy later); keyboard shortcuts (Android is tap-first); a
dedicated flashcards stats screen (web has none); leech handling (`leechThreshold` is declared but
never consulted on web — match that non-behavior); university/year deck scoping (web decks are
**not** scoped — match exactly); richer cards (images/cloze — later milestone).

## Hard invariants (from research — get these right)
- **Scheduler is a literal SM-2 port** of `src/data/srs.ts` (213 lines). Port the 21 test vectors
  from `src/data/srs.test.ts` **1:1** (same base timestamp `2026-08-20T09:00:00.000Z`, same numbers).
  Watch: Hard-on-first-learning-step averages the first two steps (`(1+10)/2 = 5.5` min);
  overdue-day credit (hard `/4`, good `/2`, easy full) computed before the interval formula; ease
  floor `1.3`; lapse with default `lapseNewIntervalPercent = 0` → 1 day then relearning.
- **`grade()` is pure** — never mutates its input `CardSchedule`. Clock passed in (`Instant`), never
  read internally. Mirror the TS private-function boundaries (`gradeSteps/gradeReview/graduate/lapse/stepDelay`) 1:1 for easy future diffing.
- **Study queue is snapshotted once at session mount** (`dueQueue()` due-before-new, capped by
  daily counts) — NOT live-re-derived, or one pass through the deck becomes an infinite loop.
- **Daily new/review caps use the device's local calendar day** (`ZoneId.systemDefault()`), not UTC.
- **Provided-deck mirror:** the student's own doc holds a per-card `schedules` map keyed by card id
  (even for cards from a published deck); `cards` is re-snapshotted from the current catalogue each
  time the deck is opened for study, while `schedules` persists across that overwrite.
- **Card grade attempts log with `correct = null`** (surface `"card"`, itemId `"<deckId>:<cardId>"`),
  never a boolean derived from the grade — a grade is a self-report, not a marked answer, and
  coercing it corrupts every accuracy figure. (`AttemptRecord.correct` stays null for card attempts.)
- **DeckProjection** keeps a per-feature `@Serializable` DTO (like `QuestionProjection`), NOT a
  widened shared `ManagedContentItem`. Publish gate: `kind == "deck"` && `status == "Published"` &&
  `deckData != null` && `deckData.cards` non-empty.

## Storage keys (already wired in `StateOwnership`/`StudentReadableKeys`)
- `synapse.flashcards.decks.v1` — `Map<String, StoredDeck>`, user-owned. Read via
  `LocalStore.getUserState`, written via `SyncEngine.write`.
- `synapse.flashcards.dailyCounts.v1` — `DailyDeckCounts`, user-owned. Same path.
- `synapse-admin-content-ledger-v4` — shared catalogue (already pulled), source of provided decks.
  Both flashcard keys are in Plan 04's `STUDENT_USER_STATE_KEYS` so a fresh device recovers progress.

## Tasks

### Task 1 — SM-2 scheduler (pure; TDD; no deps) — parallelizable
`core/flashcards/Srs.kt`: `Grade` enum (again/hard/good/easy), `CardState` enum
(new/learning/review/relearning), `CardSchedule` data class, `SrsConfig` + `AnkiDefaults`,
`newCard()`, `isDue()`, `grade()` (+ private `gradeSteps/gradeReview/graduate/lapse/stepDelay`).
`SrsTest.kt`: all 21 vectors from `src/data/srs.test.ts`. Commit.

### Task 2 — Deck model + ledger projection (pure; TDD; depends on Task 1's `CardSchedule`) — parallelizable with T1 if `CardSchedule` stubbed first
`core/flashcards/Deck.kt`: `DeckCard`, `StudentDeck`, `StoredDeck`, `StudyCard`, `DailyDeckCounts`,
`dueQueue()` (due-before-new, caps minus seen-today), `parseCardLines()`, `deckFromTerms()` (pure,
ported from `src/data/decks.ts`; taxonomy *entry point* deferred but the pure builder is cheap to
port and unit-test now). `core/flashcards/DeckProjection.kt`: ledger JSON → `List<StudentDeck>`
(per-feature DTO, publish gate above). Tests port `src/data/decks.test.ts` (8 cases) + projection
drop cases (unpublished, empty). Commit.

### Task 3 — FlashcardsRepository (depends on T1+T2 + Plan 04 store; TDD)
`feature/flashcards/FlashcardsRepository.kt`, mirroring `QBankRepository`:
- `providedDecks(): List<StudentDeck>` — `LocalStore.getCatalogue(CONTENT_LEDGER_KEY)` →
  `DeckProjection.project`.
- `ownDecks(): Map<String, StoredDeck>` and `dailyCounts(): DailyDeckCounts` — read via
  `LocalStore.getUserState(<key>)` (Plan 04), decode, default empty.
- `saveDeck(deck)`, `removeDeck(id)`, `gradeCard(deckId, cardId, next: CardSchedule, now)`,
  `bumpDailyCounts(...)` — replace-the-whole-document writes via `SyncEngine.write(key, json, now)`
  (write-through makes the next `getUserState` read reflect it offline).
- `logCardAttempt(deckId, cardId, now)` — record a `surface="card"`, `correct=null` attempt through
  the existing attempts path (reuse `LocalStore.putAttempts` + `SyncEngine.write(attemptsKey, ...)`,
  as `QBankRepository.recordAttempts` does; map deck `subjectId`, leave topic/difficulty empty).
`FlashcardsRepositoryTest.kt` with a fake `LocalStore`/`SyncEngine`: read-back after write; provided
deck projection; grade persists schedule; daily-count bump; card attempt has `correct == null`.
Commit.

### Task 4 — Compose UI (depends on T1–T3; TDD ViewModel + a couple of Compose tests)
`feature/flashcards/`:
- `FlashcardsViewModel` (`@HiltViewModel`, `var now`, sealed UiState per `DashboardViewModel`
  convention) — loads provided + own decks, computes due/new counts, owns deck CRUD.
- `DeckListScreen` + `CreateDeckDialog` / `ManageDeckDialog` (front/back edit, add, per-card delete
  that also strips the schedule) / `DeleteDeckDialog` (warns cards+schedules lost). "Your decks"
  (Study disabled at 0/0, edit, delete, New deck) + "Provided decks" (Study only, "Provided" badge).
- `CardRunnerScreen` (+ a session state holder that **snapshots the queue at entry**): front → Show
  answer → back + four grade buttons each labeled with the **live-computed resulting interval**
  (Again/Hard/Good/Easy, tone-coded), progress meter `pos/total`, end-of-session summary (studied
  count + how many graduate tomorrow-or-later; **no score/percentage**), Back to Flashcards.
- Wire a `flashcardsContent` seam into `feature/shell/AppScaffold.kt` for the `flashcards` route
  (mirror `qbankContent`; note `flashcards` IS in the bottom nav, unlike `question_bank`).
Tests: ViewModel (due/new counts, grade updates schedule + advances queue, snapshot-at-mount not
live); a Compose test (Show answer reveals back + grade buttons; grading advances to next card).
Commit. Gate each task: `:app:testDebugUnitTest` + `:app:assembleDebug`.

## Parallelization
Tasks 1 & 2 are pure and independent (T2 needs only T1's `CardSchedule` type — stub first, or run
T1 then T2). T3 needs T1+T2+Plan 04. T4 needs T1–T3. Run T1 ∥ T2 in worktrees, then T3, then T4.

## Self-review vs. research open questions
- Sync-spine gap → Plan 04 (done first). ✅
- Deck scoping, leech, stats, keyboard, taxonomy entry, DTO strategy → all resolved to "match web /
  defer," documented above. ✅
