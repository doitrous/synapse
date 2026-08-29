# Port spec — Flashcards

_Audit for the native iOS port of the Connect Cortex student app. iOS work lives in `ios/`. Web reference lives in `src/`. This spec is the source of truth for implementing `Flashcards` on iOS._

Companion doc: `FLASHCARDS-HANDOFF.md` (repo root) is the web architecture map written for a previous web session. This audit re-verifies its claims against the current tree (some have changed — see callouts below) and adds the iOS side.

**State-of-the-web callout up front:** the handoff doc frames FSRS, audio, occlusion resize, and the draw→save→study loop as *open* tasks. They are not anymore. `src/data/flashcards/fsrs.ts` exists and is wired end-to-end (scheduler, `DeckOptionsDialog` toggle, `stats.ts` analytics); `resizeRect`/`resizeHandlePoints` exist in `occlusionEditor.ts`; `StudyCardAudio.tsx` implements the `R`/`P` shortcuts. Treat the feature as complete on web. Details below.

## 1. Web behavior inventory

### 1.1 Screens and navigation

- `src/pages/student/Flashcards.tsx:35-142` — the page shell. Wraps everything in one `ShortcutsProvider` (`Flashcards.tsx:37`) and renders `FlashcardsShell`, a 4-tab state machine (`decks | add | browse | stats`, `Flashcards.tsx:33,56`) plus a full-screen `StudyScreen` takeover when `studyDeckId` is set (`Flashcards.tsx:86-96`). Tabs: Decks, Add, Browse, Stats (`Flashcards.tsx:98-103`). Global chords: `G D`/`G A`/`G B`/`G S` jump tabs, `Mod+N` opens Add (`Flashcards.tsx:72-83`). Two header icon buttons: a guide modal (`FlashcardsGuide.tsx`) and the keyboard-shortcut help sheet (`Flashcards.tsx:110-115`).
- **Decks** (`DeckDashboard.tsx:37`) — list of decks with counts, a detail panel per deck (`DeckDashboard.tsx:157-254`), create/rename/delete dialogs (`DeckDashboard.tsx:263,282`), "Study" and "Add to deck" actions.
- **Add** (`AddView.tsx:50`) — author a Basic or Cloze note, or launch the Image Occlusion editor (`AddView.tsx:66-71` routes `image-occlusion` to a separate flow, not this form). One draft survives type-switching and inline deck creation (`AddView.tsx:39-48`). Live preview mirrors exactly what study will render (`AddView.tsx:538`).
- **Browse** (`BrowseView.tsx:67`) — a filterable/sortable table over every card, with per-row and bulk actions (flag, suspend, bury, reset, set-due, move, tag, delete) (`BrowseView.tsx:387-822`).
- **Stats** (`StatsView.tsx:48`) — chart panels: future-due forecast, reviews-over-time, interval distribution, answer-button breakdown, hourly heatmap, cards-added, true retention, and (when the selected deck's scheduler is FSRS) stability/difficulty/retrievability distributions (`StatsView.tsx:187-353`, FSRS panel at `StatsView.tsx:318`).
- **Study** (`StudyScreen.tsx:77`) — takes over the whole surface (see 1.3).
- **Quick Add** (`QuickAddFlashcardDialog.tsx:27`) — a separate entry point reachable from the Question Bank and Reader context menus (`src/components/shell/StudyContextMenu.tsx`, `src/components/qbank/QuestionHighlights.tsx`, `src/pages/student/QuestionBank.tsx`), for capturing a Basic card from selected text anywhere in the app. It reads/writes the *same* two storage keys `useFlashcards` owns, seeded identically to avoid a stateStore seed mismatch (`QuickAddFlashcardDialog.tsx:37-46`).

### 1.2 Data model

Everything below is pure TypeScript with no DOM/clock dependency (every function takes `now` as a parameter) — a strong signal these are meant to be ported as pure functions, not re-derived.

- **Note/Card split** (`model.ts:1-19`) — a `Note` is what the student authors (`BasicNote | ClozeNote | ImageOcclusionNote`, `model.ts:116`); a `Card` is generated from it (`model.ts:136-141`) and carries no content — only `id = noteId::templateKey` (`model.ts:143-145`). Regeneration is idempotent by construction (`generate.ts:1-9`), so editing a note never disturbs the schedule of an unaffected sibling card.
  - `BasicNote.fields = { front, back, audio? }` (`model.ts:48-60`); `ClozeNote.fields = { text, extra, audio? }` (`model.ts:62-75`). `audio` is a `synapse-media:` reference, optional for back-compat.
  - `ImageOcclusionNote` (`model.ts:104-114`): `image` ref, `imageWidth/imageHeight`, `occluders: Occluder[]`, `groups: OccluderGroup[]`, `mode: 'hide-all' | 'hide-one'` (`model.ts:98-102`), `fields: { header, back }`. `OccluderShape` is a rect/ellipse/polygon union in image-space pixels (`model.ts:87-90`).
  - Cloze template keys are the cloze *number* (`c1`, `c2`, …), not position — `generate.ts:33-46`, so inserting a new deletion never renumbers/orphans an existing card's schedule.
- **Scheduling** — `CardSchedule` (`src/data/srs.ts:27-43`): `state: new|learning|review|relearning`, `step`, `interval` (days), `ease`, `lapses`, `reps`, `due` (ISO), and **optional** `stability?`/`difficulty?` (`srs.ts:39-42`, FSRS-only, absent on SM-2 cards).
- **Scheduler interface** (`scheduler.ts:34-42`) — `{ type, newCard(now), grade(schedule, answer, now), preview(schedule, now) }`. `sm2Scheduler(config?)` (`scheduler.ts:47-54`) wraps SM-2; `fsrsScheduler(params?)` (`fsrs.ts:141-205`) implements FSRS-5. Nothing else in the app names an algorithm — `useFlashcards.schedulerFor(deckId)` picks one from `DeckConfig.scheduler` (`useFlashcards.ts:214-222`).
- **SM-2** (`src/data/srs.ts`, Anki 25.02.5 defaults, `ANKI_DEFAULTS` at `srs.ts:68-82`): new/learning/relearning cards step through minute-granularity `learningSteps`/`relearningSteps` (`srs.ts:135-165`); graduating lands on `graduatingInterval`/`easyInterval` days (`srs.ts:167-175`); a review-state card's next interval multiplies `interval * ease` (good), `* ease * easyBonus` (easy), or `(interval + delay/4) * hardMultiplier` (hard) — **overdue days are half- or fully-credited before multiplying** so a card returned to late isn't punished for having been remembered longer (`srs.ts:180-192`); `again` on a review card lapses it into relearning at `lapseNewIntervalPercent` of its old interval (`srs.ts:199-217`); ease floors at `MINIMUM_EASE = 1.3` (`srs.ts:89,102`).
- **FSRS-5** (`fsrs.ts`, fully implemented — see design question 2 below) — day-grained, opt-in per deck.
- **Card standing** — `CardMeta` (`model.ts:171-183`): the schedule plus `flag`, `suspended`, `buriedUntil` (local day), `reviewCount`, `resetSinceReview`, `firstReviewedAt`/`lastReviewedAt`. "Unseen" = `reviewCount === 0`; "Learned" = `reviewCount >= 1 && !resetSinceReview` (`model.ts:163-169`).
- **Status/derived state** (`status.ts`) — `MATURE_THRESHOLD_DAYS = 21` (`status.ts:22`); `isBuried/isUnseen/isLearned/isYoung/isMature/isReviewDue/isStudyEligible` (`status.ts:25-71`); `deckCounts` (10 overlapping dashboard measures, `status.ts:101-141`) vs `exclusiveStatus`/`exclusiveCounts` (7-way mutually-exclusive partition for the Card Breakdown chart, `status.ts:149-187`).
- **Actions** (`actions.ts`) — pure `(meta, ctx, scheduler?, now) → { meta, event }` transitions: `gradeCard` (`actions.ts:62-84`), `resetCard` (`actions.ts:92-99`, keeps `reviewCount`, flips `resetSinceReview`), `setDueDate` (`actions.ts:106-116`), `suspendCard`/`unsuspendCard` (`actions.ts:118-130`), `buryCard`/`unburyCard` (hides until `localDayPlus(now,1)`, `actions.ts:132-145`).
- **Review log** — `ReviewEvent` (`model.ts:213-230`): every grade *and* every manual action (reset/suspend/bury/set-due) is logged with before/after state and interval, so the card-info panel and every stat is a replay of this log, never a second source of truth.
- **Queue** (`queue.ts`) — `buildQueue` (`queue.ts:51-59`): eligible cards (excludes suspended/buried), due-review cards first then new cards, each capped by the deck's daily limits minus what today's review log already shows as seen (`seenTodayFromEvents`, `queue.ts:33-43`) — no separate "seen today" counter to drift.
- **Duplicate detection** (`duplicate.ts`) — a deterministic per-note-type signature over deck + normalized visible text (`duplicate.ts:34-54`); Basic vs Cloze never collide even on identical words.
- **Cloze parsing** (`cloze.ts`) — regex tokenizer (`cloze.ts:28-45`), validation (`no-cloze|empty-deletion|unbalanced|zero-number`, `cloze.ts:56-86`), and `renderClozeSide` returning structured cells (never raw HTML) for front/back rendering (`cloze.ts:136-150`).
- **Image occlusion geometry** (`occlusion.ts`, `occlusionEditor.ts`) — all in image-space pixels so masks are zoom/screen-size independent. `occlusionSignature` normalizes geometry to 3-decimal image fractions, deck-scoped, so a sub-pixel re-drag isn't a "new" set but a genuinely different layout is (`occlusion.ts:96-125`). `resizeRect`/`resizeHandlePoints` (8 handles, clamped to image bounds, min size floor) are **implemented** (`occlusionEditor.ts:81-134`) — the handoff doc's Task 3 is done.
- **Rich text** (`richText.ts`) — default-deny HTML sanitizer: fixed tag allowlist (`richText.ts:19-22`), tags whose *content* is dropped (`script/style/iframe/…`, `richText.ts:25`), a strict per-property style-value allowlist (`richText.ts:30-38`), `href` scheme allowlist (`http(s)/mailto`/relative/`#`, `richText.ts:145-151`). Re-sanitized again on render (`RichHtml.tsx:8-13`) as defense in depth.
- **Migration** (`migration.ts`) — lossless v1 (`{id,front,back}` bag + per-card `CardSchedule`) → v2 (note/card split) migration, idempotent by construction (`migratedNoteId`, `migration.ts:50-53`), never invents a schedule.
- **Local-day arithmetic** (`time.ts`) — every day-bounded rule (caps, bury rollover, true retention, heatmap) turns on the *student's* local calendar day, never UTC (`time.ts:1-12`).
- **Stats** (`stats.ts`, grep of exports) — `studySummary`, `currentStreak`, `futureDue`, `heatmap`, `reviewsOverTime`, `reviewIntervals`, `hourlyBreakdown`, `answerButtons`, `addedOverTime`, `trueRetention` (first-review-per-local-day), and FSRS-only `cardStability`/`cardDifficulty`/`cardRetrievability` (`stats.ts:481,502,541`) — computed from real per-card `stability`/`difficulty` and current retrievability, **never derived from SM-2's ease/interval** (explicit rule, `scheduler.ts:14-18`).

### 1.3 The study loop (`StudyScreen.tsx`) — the highest-value surface to port

- Snapshots the queue at mount (`StudyScreen.tsx:96`); a card re-entering learning/relearning is re-queued to the back of *this* session's array rather than re-derived (`StudyScreen.tsx:133-143`), so a 1-minute learning step doesn't loop forever.
- Flow: reveal (`Space`) → four graded buttons (Again/Hard/Good/Easy, keys `1-4`) each showing the *previewed* resulting interval via `scheduler.preview()` (`StudyScreen.tsx:145-160,252,312-333`).
- Every action is a keyboard command registered in a `'study'` scope, so a key does nothing while typing and a modal dialog takes an exclusive scope so a grade can't fire underneath it (`StudyScreen.tsx:177-214`): `Space` reveal, `1-4` grade, `B` bury, `S` suspend, `Mod+Shift+R` reset (destructive, confirms), `Mod+Shift+D` set due date, `O` deck options, `I`/`Shift+I` card info (current/previous), `Shift+A` toggle auto-advance, `E` edit note, `V`/`Shift+V` record/replay own voice, `R`/`P` replay/pause card audio (only enabled when the note has one, `StudyScreen.tsx:195-196`), `Mod+1..7` toggle flag.
- Auto-advance (optional, persisted to `localStorage` key `synapse.flashcards.autoAdvance`, `StudyScreen.tsx:94`) reveals after N seconds then auto-grades after M more (`StudyScreen.tsx:217-225`).
- Empty states: "Session complete" (studied > 0) vs "Nothing due right now" (`StudyScreen.tsx:228-247`) — an honest empty deck is not an error.
- Card audio (`StudyCardAudio.tsx`) — resolves a `synapse-media:` blob to a short-lived object URL, revokes on unmount/card-turn (`StudyCardAudio.tsx:28-41`), exposes `replay()`/`toggle()` for the `R`/`P` shortcuts (`StudyCardAudio.tsx:43-56`) alongside a visible native `<audio controls>`.
- Card face rendering (`StudyCardFace.tsx`) is per-type: Basic renders two rich fields; Cloze renders `renderClozeSide` cells (active deletion blanked with its hint on front, revealed on back, siblings shown plain); Image Occlusion delegates to `OcclusionCardFace.tsx`, which SVG-masks the asked occluder(s) according to `mode` (`OcclusionCardFace.tsx:82-91`).

### 1.4 Storage keys and sync (see design question 1 — this is the load-bearing section)

- `usePersistentState<T>(key, initial)` (`src/lib/usePersistentState.ts:29`) is the **only** persistence primitive the whole app uses. Two modes: demo build (no `VITE_API_BASE`) → plain `localStorage`; live build → hydrated from and written to the backend via `stateStore.ts`, which picks one of two endpoints per key based on `isUserOwnedState(key)` (`src/lib/stateOwnership.ts:39-41`, consumed at `stateStore.ts:1,137`).
- **`synapse.flashcards.*` is entirely user-owned** (`stateOwnership.ts:20`, confirmed by its own test at the bottom of that file). User-owned keys go through `putUserState`/`getUserState` — **whole-document, single-writer, no delta merge** ("a private document has one writer, so there is nothing to merge against", `stateStore.ts:200-203`) — as opposed to the shared catalogue's delta-capable path.
- Exact keys `useFlashcards.ts` owns: `COLLECTION_KEY = 'synapse.flashcards.collection.v2'` (`useFlashcards.ts:53`), `LEGACY_DECKS_KEY = 'synapse.flashcards.decks.v1'` (`useFlashcards.ts:54`, v1 pre-migration, read-only fallback), `REVIEW_LOG_KEY = 'synapse.flashcards.reviewlog.v2'` (`useFlashcards.ts:55`), capped client-side at `REVIEW_LOG_CAP = 50_000` entries (`useFlashcards.ts:58,256-258`). A third, unrelated key `synapse.flashcards.autoAdvance` is a **local-only UI preference** via `useLocalJsonPreference`, not part of `useFlashcards` and not synced (`StudyScreen.tsx:94`).
- Every mutation (`grade`, `saveNote`, `setDeckConfig`, bulk actions, …) calls `commit()` which replaces the *entire* `FlashcardCollection` document via `setStoredV2` (`useFlashcards.ts:141-144`) — there is no incremental/delta write path for these keys on web either.
- No server endpoints beyond the generic `/api/user-state/:key` GET/PUT are involved — Flashcards has no bespoke API surface.

### 1.5 Provided (catalogue) decks

- Source 1 (the one that matters for sync): admin-authored decks on the content ledger, `kind: 'deck'` (`src/data/contentControl.ts:13`), carrying `deckData: { description, cards: [{id, front, back}] }` (`contentControl.ts:710`, shape in `src/data/decks.ts:24-27`). `managedDeckToStudentDeck` projects a publishable one to `StudentDeck { id, title, subjectId, description, cards }` (`decks.ts:30-36,95-106`).
- Source 2: `deckFromTerms(filterName, terms)` (`decks.ts:129-138`) builds an ad-hoc deck on the fly from a filtered set of Medical Taxonomy glossary terms (a "study these as flashcards" action elsewhere in the app, not reachable from the Flashcards page itself). Deterministic ids from the filter name, not the clock.
- **Scope note:** `itemScope`/`DeckAuthoringData` carry **no** `universityIds`/`yearIds` fields at all (`contentControl.ts:798-805,710`; `decks.ts:24-27`) — provided decks are unrestricted for every university and year on the web, unconditionally. Any iOS scoping added to decks would be a parity break, not a feature.
- `useFlashcards(providedDecks)` folds each catalogue card into a synthesized `BasicNote` at read time, keyed `providedNoteId(deckId, catalogueCardId) = 'provided:'+deckId+':'+catalogueCardId` (`model.ts:154-156`, synthesis at `useFlashcards.ts:149-174`) — **never persisted**; only the student's `CardMeta` (schedule/flag/etc., keyed off the same stable id) lives in the synced collection. This is what lets catalogue content change without breaking a student's schedule.

### 1.6 Empty / loading / error / offline states

- Demo mode: instant, `hydrated` is always true (`usePersistentState.ts` doc comment).
- Live mode: `status.hydrated` gates saves everywhere a form can write before the document has arrived (e.g. `QuickAddFlashcardDialog.tsx:68,149` — "Loading your decks…"); a save conflict/refusal shows a plain-language reason and reloads the server's copy (`stateStore.ts:319-336`); offline queues the write and flushes on `online`/`pagehide`/tab-hidden (`stateStore.ts:525-545`).
- Study: "Nothing due right now" / "Session complete" honest empty states (`StudyScreen.tsx:228-247`); a failed card-audio/image load shows an inline error, never a silent blank (`StudyCardAudio.tsx:58-60`, `OcclusionCardFace.tsx:59`).

## 2. iOS current state

**Greenfield**, confirmed: `grep -ri flashcard ios/Synapse` returns exactly one hit — a comment in `ios/Synapse/Core/Sync/StateOwnership.swift:27` (see below). No models, stores, views, or tests exist for this feature yet.

### 2.1 What already anticipates this feature

- **`StateOwnership.swift:14-47`** is a direct, line-for-line port of `stateOwnership.ts`, and **it already includes `"^synapse\\.flashcards\\."` at line 27** — someone already future-proofed the routing rule. No change needed here; the iOS port must simply use the same key strings the web uses (`synapse.flashcards.collection.v2`, `synapse.flashcards.reviewlog.v2`) and this pattern will route them correctly.
- **`SyncEngine.swift`** — `write<Value: Encodable>(key:value:)` (`SyncEngine.swift:241-252`) is the generic "queue then drain" path for any user-owned key: it asserts `StateOwnership.isUserOwned(key)` (`SyncEngine.swift:242`), writes to the local outbox first (offline-safe), and drains via `putUserState` (`SyncEngine.swift:270-311`). This is the exact primitive Flashcards should call — no new sync machinery needed.
- **`LocalStore.swift`** (GRDB) — three existing patterns to choose between for the local cache (see design question 1): (a) the `catalogue` table (`LocalStore.swift:74-79,213-233`) — one row per key, whole-JSON-blob, `updatedAt`/`fetchedAt`, used for *shared* documents only today; (b) the `item`/`itemSearch` shredding of the ledger into query-friendly rows (`LocalStore.swift:81-108,242-338`); (c) the `attempt` table (`LocalStore.swift:133-140,152-200`) — one row per record, a `pending` flag, grouped into month-shard documents only at push time. Pattern (c) is the closest analog to Flashcards' `ReviewEvent` log.
- **`QBankStore.swift:12-160`** — the closest existing *Feature-level* pattern for a small set of simple user-owned documents (`marked`, `notes`, `names`, one `LiveSession`). Load: parallel `api.userState(...)` calls straight into memory, no GRDB cache of the fetched value at all (`QBankStore.swift:50-61`) — **note this is a weaker pattern than Flashcards needs**: `isLoaded` gates every write so a pre-hydration write can never stomp a student's real data (`QBankStore.swift:37-39,73-75`), but a cold launch with no network shows empty until sync completes. Write: mutate in-memory state, then `await sync.write(key:, value:)` (`QBankStore.swift:78,96,118,125`).
- **`QuestionBankModel.swift:401-479`** — the closest analog for a large, append-only, periodically-flattened log (attempts): local GRDB rows written immediately and marked `pending`, later grouped and pushed as whole-document shards (`recordAttempts`/`pushAttempts`, `QuestionBankModel.swift:401-448`), plus a small rebuilt-from-scratch index document (`pushIndex`, `QuestionBankModel.swift:456-479`). This is the shape to imitate for `reviewlog.v2`, adjusted for the fact that the *web's* key is one flat array rather than month-shards (see design question 1).
- **`QuestionBankView.swift:1-63`** — the Feature-wiring convention to mirror: a screen's `init` takes `(store: LocalStore, sync: SyncEngine, api: SynapseAPI, audience: StudentAudience)` (`QuestionBankView.swift:11-18`), builds its `@Observable` model(s) as `@State`, loads everything in `.task { }` (`QuestionBankView.swift:40-45`), and reacts to `sync.status` completing to refresh (`QuestionBankView.swift:54-56`).

### 2.2 What is missing / needs new code

- No `ContentKind.deck` case — `ContentItem.swift:8-10` only has `question, article, practical, resource`. `LedgerDecoder.decodeOne` (`ContentItem.swift:110-118`) requires `ContentKind(rawValue:)` to succeed or the whole ledger record is **silently skipped** (counted in `skipped`, logged once at `SyncEngine.swift:223-226`). Any `kind: "deck"` record from the ledger is invisible to iOS today. This blocks provided decks specifically, not authored decks.
- No Theme tokens for the 7 Anki flag colours (`Theme.swift` has no `flag` reference at all) — needed for Browse/flag UI (later phase).
- `ios/README.md:85-86` — the stated build order is Library/Resources → Question Bank → Dashboard/Performance → Calendar/Notebook/Practical → push. Flashcards is not yet on this list; this audit doesn't change that roadmap, it prepares the spec for whenever it's slotted in.
- No local media store equivalent to `mediaStorage.ts` (IndexedDB) exists yet — relevant to a later audio/occlusion phase, not v1.

## 3. Gap list (web → iOS)

Ordered by dependency; each is a discrete, independently-committable unit.

1. **Swift `CardSchedule`/`Grade`/scheduler types** — port `srs.ts` types 1:1 (including optional `stability`/`difficulty`).
2. **SM-2 engine** — pure port of `srs.ts` grading logic, pinned by reference tests against the same fixtures the web's `srs.test.ts`-equivalent uses.
3. **FSRS-5 engine** — pure port of `fsrs.ts`, pinned by numeric fixtures (see design question 2). Independent of (2); can land in parallel.
4. **Scheduler protocol** — Swift `Scheduler` protocol mirroring `scheduler.ts:34-42`, with `sm2` and `fsrs` conformers.
5. **Note/Card model** — `Note` enum (basic/cloze/imageOcclusion), `Card`, `CardMeta`, `ReviewEvent`, `FlashcardCollection` — direct port of `model.ts`.
6. **Card generation** — `generateCards`/`templateKeys`/`reconcileNoteInMeta` port (`generate.ts`), needed before any note can produce a studyable card.
7. **Actions** — pure transition functions (`actions.ts` port): grade/reset/setDue/suspend/bury.
8. **Status/queue** — `status.ts` + `queue.ts` ports: what's due, what's eligible, build-queue.
9. **Local GRDB schema** — new tables for decks/notes/card-meta/review-events (see design question 1).
10. **`FlashcardStore`** — the `@Observable` store wiring GRDB + `SyncEngine.write`, mirroring `QBankStore`/`QuestionBankModel`.
11. **`ContentKind.deck` + ledger decode** — unblocks provided decks (`LedgerDecoder` extension, a `DeckProjection`).
12. **Study loop UI** — reveal/grade screen, no shortcuts (touch-first), Basic + Cloze rendering.
13. **Deck dashboard UI** — list, counts, create/rename/delete, deck options (scheduler picker).
14. **Add view (Basic + Cloze only)** — authoring form, cloze validation/insertion, duplicate check.
15. **Basic stats** — deck counts / card breakdown chart only.
16. **Browse view** — search/filter/sort (bulk actions can trail).
17. *(later)* Card audio, own-voice recording.
18. *(later)* Image occlusion editor (authoring) + resize handles.
19. *(later)* Rich-text authoring (web's contentEditable has no direct SwiftUI analog).
20. *(later)* Full stats charts (heatmap, reviews-over-time, hourly, true retention, FSRS distributions).
21. *(later)* Quick-add integration from Question Bank/Reader.
22. *(later)* v1-collection legacy-store fallback, if design question 5 below resolves toward porting it.

## 4. Port spec

### 4.1 Data layer — `ios/Synapse/Core/Flashcards/`

Pure Swift, no I/O, mirroring the web's data-layer discipline (every function takes `now`/state explicitly):

- `CardSchedule.swift` — struct mirroring `srs.ts:27-43`: `state` (enum `new/learning/review/relearning`), `step: Int`, `interval: Int`, `ease: Double`, `lapses: Int`, `reps: Int`, `due: Date`, `stability: Double?`, `difficulty: Double?`. `Codable`, so it round-trips through the synced JSON document exactly like the web's does.
- `SM2Scheduler.swift` — port of `src/data/srs.ts` (`ANKI_DEFAULTS`, `grade`, `newCard`, `isDue`, the overdue-day partial-credit rule at `srs.ts:180-192`, the lapse rule at `srs.ts:199-217`).
- `FSRSScheduler.swift` — port of `fsrs.ts` in full: `FSRS5_DEFAULT_WEIGHTS` (19 doubles, `fsrs.ts:24-27`), `retrievability` (`fsrs.ts:62-64`), `intervalFromStability` (`fsrs.ts:71-76`), `initialStability`/`initialDifficulty` (`fsrs.ts:79-86`), `nextDifficulty` (mean-reversion, `fsrs.ts:93-98`), `nextStabilityOnRecall`/`nextStabilityOnForget` (`fsrs.ts:101-134`), and the day-grained `gradeCard` orchestration (`fsrs.ts:145-187`, including the "stability and difficulty both update from the *old* difficulty" rule at `fsrs.ts:161-167`, and the "failing a brand-new card is not a lapse" rule at `fsrs.ts:171-173`). Keep `w[17]`/`w[18]` present-but-unused in the weight vector, exactly as the web does, so it stays byte-for-byte the published FSRS-5 parameter set (`fsrs.ts:9-16`).
- `Scheduler.swift` — protocol mirroring `scheduler.ts:34-42`: `newCard(now:) -> CardSchedule`, `grade(_:answer:now:) -> CardSchedule`, `preview(_:now:) -> [Grade: CardSchedule]`.
- `FlashcardModel.swift` — `Note` (enum with associated `BasicFields`/`ClozeFields`/`ImageOcclusionFields`), `Card`, `CardMeta`, `ReviewEvent`, `FlashcardCollection`, `DeckRecord`, `DeckConfig`, `FlagColor` (7-case enum matching `FLAG_ORDER`, `model.ts:36`) — direct port of `model.ts`.
- `FlashcardGenerate.swift` — `generateCards`/`templateKeys`/`reconcileNoteInMeta` port (`generate.ts`).
- `FlashcardActions.swift` — `gradeCard`/`resetCard`/`setDueDate`/`suspendCard`/`buryCard`/… port (`actions.ts`), returning `(meta, event)` tuples, never mutating input.
- `FlashcardStatus.swift` — `isBuried`/`isLearned`/`isYoung`/`isMature`/`deckCounts`/`exclusiveStatus` port (`status.ts`).
- `FlashcardQueue.swift` — `buildQueue`/`seenTodayFromEvents` port (`queue.ts`).
- `ClozeParser.swift` — `tokenizeCloze`/`validateCloze`/`renderClozeSide`/`insertCloze` port (`cloze.ts`).
- `LocalDay.swift` — `localDay`/`addLocalDays`/`daysBetweenDays` port (`time.ts`), local-calendar, not UTC — mirrors what `AttemptStore`/`ISO8601DateFormatter.synapse` already do for QBank timestamps.
- *(later phase)* `OcclusionGeometry.swift` (`occlusion.ts` + `occlusionEditor.ts` port, including `resizeRect`), `RichTextSanitizer.swift` (`richText.ts` port — needed the moment any authoring UI accepts more than plain text).

### 4.2 Storage/sync — the central decision

**Decision: both — the two web keys are the sync contract; GRDB is a query-friendly local cache of the same two documents, not a separate source of truth.**

Mirror the web's key names *exactly*, because `StateOwnership.swift:27` already routes them and any divergence silently splits a student's progress between phone and browser with no error on either side (the exact failure mode `ios/README.md:50-53` warns about):

- `synapse.flashcards.collection.v2` — decks + notes + card-meta.
- `synapse.flashcards.reviewlog.v2` — the review event log.
- Do **not** invent new keys, and do not read `synapse.flashcards.decks.v1` on iOS without a decision (see open question 5.1).

**Why not follow `QBankStore`'s in-memory-only pattern verbatim:** `QBankStore.swift:50-61` loads straight from `api.userState` into memory with no GRDB cache of the value itself — acceptable for a few small documents (a marked-question set, a notes dictionary), but Flashcards' collection can hold hundreds of notes and the review log can hold tens of thousands of events (web caps it at `50_000`, `useFlashcards.ts:58`). `LocalStore`'s own header comment (`LocalStore.swift:6-9`) is explicit that the point of this cache is "usable on a ward with no signal" — a student studying a flashcard deck between patients is exactly that scenario, and a cold, offline launch must show the deck immediately, not an empty state until the network answers.

Recommended schema (new GRDB migration in `LocalStore.swift`, alongside `v2-attempts`):

```
fcDeck        (id TEXT PK, name, sourceId, config BLOB, createdAt)
fcNote        (id TEXT PK, deckId TEXT indexed, type, fields BLOB, tags BLOB, createdAt, updatedAt)
fcCardMeta    (cardId TEXT PK, noteId TEXT indexed, deckId TEXT indexed, schedule BLOB, flag, suspended, buriedUntil, reviewCount, resetSinceReview, firstReviewedAt, lastReviewedAt)
fcReviewEvent (id TEXT PK, cardId TEXT indexed, deckId TEXT indexed, localDay TEXT indexed, at DATETIME, payload BLOB)
```

This is the same shredding discipline already used for the ledger (`LocalStore.swift:242-263`, `SyncEngine.shredLedger` at `SyncEngine.swift:219-232`): rows for fast local queries (Browse-equivalent filters, deck counts), while every mutation *also* re-serializes the affected document (`fcDeck`+`fcNote`+`fcCardMeta` → one `FlashcardCollection` JSON; `fcReviewEvent` rows for a deck → one `[ReviewEvent]` JSON array, capped at 50,000 like the web) and calls `SyncEngine.write(key:value:)`. No separate debounce is needed in `FlashcardStore` — `LocalStore.enqueue`'s `ON CONFLICT DO UPDATE` (`LocalStore.swift:342-357`) already coalesces rapid successive writes to the same key into one outbox row before the drain fires, matching the web's 400ms debounce (`stateStore.ts:50`) in effect if not in mechanism.

**Correctness constraint, stated explicitly because it's easy to miss:** since `CardSchedule` (including FSRS `stability`/`difficulty`) is the *synced* payload, a card graded on the web and then opened on the phone must compute its *next* grade from the exact same numbers — the two schedulers only need to agree from whichever grade each platform actually computes, but they must agree byte-for-formula on that computation, or a card's due dates will start to drift depending on which platform last graded it. This is what makes reference-value tests (4.4) load-bearing rather than a nice-to-have.

`FlashcardStore` (new, `ios/Synapse/Core/Flashcards/FlashcardStore.swift`) is an `@MainActor @Observable` class taking `(store: LocalStore, sync: SyncEngine, api: SynapseAPI)`, following `QBankStore`'s shape: `isLoaded` gate before any write (`QBankStore.swift:37-39`), `load()` reads the GRDB cache synchronously for instant offline display, then refreshes from `api.userState(...)` and reconciles.

### 4.3 UI — `ios/Synapse/Features/Flashcards/`

- `FlashcardsView.swift` — tab container (Decks/Add/Browse/Stats), `init(store:sync:api:audience:)` matching `QuestionBankView.swift:11-18`.
- `DeckDashboardView.swift` — deck list + counts + detail, using `Theme` tokens and `strings()`/`\.strings` for copy (no hardcoded English).
- `StudyView.swift` — the reveal/grade loop. No keyboard shortcuts (touch-first): reveal is a tap on the card or a "Show answer" button, grading is 4 large tap targets (Again/Hard/Good/Easy) each showing the previewed interval, matching `StudyScreen.tsx:312-333`'s information (not its exact chrome). Toolbar actions (flag/bury/suspend/reset/set-due/deck options/card info) as a toolbar or sheet, not a command palette — the web's `useShortcuts` registry (`src/lib/shortcuts/`) has no touch equivalent and should not be ported for v1. *(Stretch, later)* hardware-keyboard shortcuts on iPad via `.keyboardShortcut()`/`UIKeyCommand`, reusing the same key letters the web uses for muscle-memory parity.
- `AddCardView.swift` — Basic/Cloze authoring. Cloze needs a lightweight text-selection-to-`{{cN::}}` insertion affordance (`ClozeParser.insertCloze` port) — plain `TextEditor` selection range is the natural analog to `insertCloze`'s `(selStart, selEnd)` API.
- `CardFaceView.swift` — per-type rendering (Basic/Cloze cell rendering/Occlusion-later), consuming `ClozeParser.renderClozeSide` cells directly rather than any HTML.
- `BrowseFlashcardsView.swift`, `StatsFlashcardsView.swift` — later phases per the scope recommendation (4.5).
- Theme: add the 7 flag colours as `Theme` tokens when Browse/flag ships (mirrors `flag.ts:20-28`'s `var(--color-flag-*)` tokens) — do not hardcode hex in the view layer.

### 4.4 Tests

Swift Testing (`@Test`) cases to pin correctness, mirroring the web's own test discipline (colocated, `now`/state injected, no clock reads):

- `SM2SchedulerTests` — new/learning/relearning step transitions, graduating interval selection, overdue partial-credit on review grading, lapse-into-relearning, ease floor.
- `FSRSSchedulerTests` — **extract the (input, expected-output) pairs directly from the existing `src/data/flashcards/fsrs.test.ts`** rather than re-deriving them from the FSRS spec by hand; a hand-rederivation risks a subtly different floating-point rounding order that would silently desync due dates between platforms for exactly the case in 4.2's correctness constraint. Cover: initial stability/difficulty per rating, next-difficulty mean reversion, stability-on-recall (with hard-penalty/easy-bonus), stability-on-forget, retrievability/interval-from-stability round-trip at the default 0.9 retention, FSRS metrics absent on an SM-2 card.
- `FlashcardGenerateTests` — basic/cloze/occlusion template-key generation, reconciliation preserving unaffected schedules across a note edit.
- `FlashcardActionsTests` — each transition's before/after event fields.
- `FlashcardStatusTests` — the young/mature boundary, learned/unseen overlap rules, exclusive-status precedence (suspended/buried win over scheduling state).
- `FlashcardQueueTests` — due-before-new ordering, daily-cap exhaustion from a synthetic review log.
- `ClozeParserTests` — tokenization, all four validation errors, cloze-number reuse across deletions.
- `FlashcardStoreSyncTests` — writes coalesce through the outbox; a key that already carries `synapse.flashcards.` prefix is confirmed user-owned via `StateOwnership.isUserOwned` (regression-guards the routing assumption this whole spec rests on).

### 4.5 Suggested build order

1. Pure data layer: `CardSchedule`, `SM2Scheduler`, `FlashcardModel`, `FlashcardGenerate`, `FlashcardActions`, `FlashcardStatus`, `FlashcardQueue` + their tests. Zero UI risk, fully committable in isolation.
2. `FlashcardStore` + GRDB schema + `SyncEngine.write` wiring, tested against an in-memory `LocalStore`.
3. `ContentKind.deck` + `LedgerDecoder` extension + `DeckProjection`, unblocking provided decks — small, isolated, unblocks nothing else so it can land whenever convenient before step 5.
4. Study loop UI (Basic cards only, SM-2 only) — the smallest end-to-end vertical slice that's actually usable.
5. Cloze cards + `ClozeParser` UI + deck options (scheduler picker) + `FSRSScheduler` — FSRS is pure and self-contained, so it can ship alongside Cloze rather than waiting for a "v2".
6. Deck dashboard (create/rename/delete/config), Add view for Basic+Cloze, provided decks read-through.
7. Basic stats (deck counts/card breakdown only).
8. Browse view (search/filter/sort; bulk actions can trail into a follow-up).
9. Everything in gap-list items 17-21 (audio, occlusion, rich text, full stats, quick-add) as independent later phases, each gated on an explicit go-ahead since they touch open questions below.

## 5. Open questions / blockers

1. **v1 legacy-collection fallback.** `useFlashcards.ts:132-139` computes the v1→v2 migration *in memory only* and does **not commit it to storage** until the student's first mutation. A student who has old v1-only flashcard history and hasn't touched the web Flashcards page since (so the v2 document was never written) would see their real deck on web but an **empty** collection on iOS if iOS reads only `collection.v2`. Options: (a) port `ensureV2`/`migrateV1ToV2` (`migration.ts`) to Swift as a defensive fallback when `collection.v2` comes back empty/absent, reading `synapse.flashcards.decks.v1`; (b) treat v1 as old enough to disregard (the web itself calls it "legacy"). Needs an Omar call — depends on how many active students still have unmigrated v1 data, which isn't visible from the codebase alone.
2. **Student-authored media does not sync across devices today, on web.** `mediaStorage.ts:1-80` stores card audio and occlusion images in per-browser IndexedDB only; the `/media/:id` authenticated path (`mediaStorage.ts:53-58`) serves *admin-managed catalogue* media, never a student's own uploads. So a card audio attached on the web is invisible on the phone and vice versa, **even after** a full iOS media port — porting Task 2/3/4's audio faithfully just adds a second island of unsynced media, matching rather than fixing the status quo. Worth flagging to Omar before investing in the iOS media UI: does this get a real server-backed blob store first, on web, so both platforms benefit, or does iOS ship the same per-device limitation deliberately?
3. **Review-log size on the wire.** Both platforms write `reviewlog.v2` as one whole-document PUT with no delta path (`stateStore.ts:200-203` applies identically to whatever iOS calls). At the web's own cap of 50,000 events this is a several-megabyte body on every single grade in the worst case. Not an iOS-specific problem — flagging because the iOS local cache (GRDB rows) makes it easy to *notice* this cost precisely (count rows × avg size) in a way the web's flat array doesn't, and because "does this need a real delta/shard format on the wire" is a decision bigger than this port.
4. **`deckFromTerms`'s ad-hoc taxonomy decks** (`decks.ts:129-138`) are not part of the ledger sync at all — they're built from a live taxonomy query triggered elsewhere in the web app. Confirm with Omar whether this path is reachable/valuable enough to plan for on iOS, or whether "provided decks" for v1 should mean ledger-sourced decks only (this spec assumes the latter).
5. **FSRS opt-in migration UX.** The web's rule ("switching an existing deck to FSRS initializes stability/difficulty from FSRS defaults on the *next* review", confirmed at `useFlashcards.ts:214-222` and `fsrs.ts:147-153,191-201`) is a pure-data behavior with no special UI beyond the `DeckOptionsDialog` picker (`DeckOptionsDialog.tsx:38-49`) — no open question here, just confirming for the iOS engineer that no separate "convert this deck" flow exists to replicate.

No Telegram-only or server-dependent gaps apply to this feature — everything above is either a pure-logic port or an existing sync primitive.
