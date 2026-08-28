# Flashcards feature — handoff

Continuation handoff for the Anki-inspired flashcard system. A previous session
built and shipped the full feature; this document is for a **new session** that
will implement four remaining items.

## Status / where things are

- **Branch:** `claude/leadership-subagent-orchestration-c8f67b` (based on `main` @ `c5fed759`).
- **PR:** https://github.com/omary98/synapse/pull/34 (open, conflict-free — none of the feature files overlap the content-lane commits on `main`).
- **Baseline is green:** `npm test` → 1660 pass / 0 fail. `npx tsc -b` clean. `npm run lint` clean for the feature. `npm run build` succeeds (Flashcards is a lazy ~147 kB chunk).
- Re-fetch `origin/main` before any push — other sessions push content-lane work to `main` constantly (they touch `docs/`, `scripts/kasr`, batches — not `src/`). Do **not** `git stash` (shared stack across worktrees); use a WIP commit if you must set work aside.

## The four remaining tasks (what the user asked for)

1. **FSRS scheduler implementation** — a real, correct FSRS behind the existing scheduler interface, opt-in per deck, SM-2 stays default. Then wire the FSRS-only analytics (stability/difficulty/retrievability).
2. **Card media audio** — attach audio to cards in authoring; wire `R` replay / `P` pause-resume of card audio in study.
3. **Occlusion resize handles** — drag-to-resize selected rect/ellipse occluders in the editor.
4. **Interactive draw→save→study loop** — verify (and fix if needed) the occlusion editor end-to-end; the previous session couldn't browser-automate it (no file-upload injection in the in-app browser).

Each has a detailed section below.

---

## Architecture (read these first)

Everything is pure + tested in `src/data/flashcards/`; UI in `src/components/flashcards/`; the one integration hook is `src/lib/useFlashcards.ts`.

### Data layer — `src/data/flashcards/` (all have `.test.ts` unless noted)
- `model.ts` — `Note` (BasicNote | ClozeNote | ImageOcclusionNote), generated `Card`, `CardMeta`, `ReviewEvent`, `FlashcardCollection` (`version: 2`), `DeckRecord`, `DeckConfig` (`{ scheduler, newPerDay, maxReviewsPerDay }`), `FlagColor`/`FLAG_ORDER`, `SchedulerType = 'sm2' | 'fsrs'`. `cardId(noteId, key)`, `providedNoteId(deckId, catalogCardId)`, `newCardMeta(schedule)`. (types file; tested via consumers)
- `srs.ts` (pre-existing, `../srs.ts`) — the legacy **SM-2** engine: `grade(schedule, answer, now, config)`, `newCard`, `isDue`, `CardSchedule`, `Grade`, `SrsConfig`, `ANKI_DEFAULTS`. Pure, `now` injected.
- `scheduler.ts` — **the interface FSRS must implement.** `Scheduler = { type, newCard(now), grade(schedule, answer, now), preview(schedule, now) }`. `sm2Scheduler(config?)` wraps `srs.ts`. `previewFrom(...)`, `GRADES`.
- `status.ts` — `deckCounts`, `exclusiveCounts`/`exclusiveStatus`, `isYoung/isMature/isBuried/isReviewDue/isStudyEligible`, `MATURE_THRESHOLD_DAYS = 21`.
- `actions.ts` — pure transitions returning `{ meta, event }`: `gradeCard`, `resetCard`, `setDueDate`, `suspendCard`/`unsuspendCard`, `buryCard`/`unburyCard`. Take a `Scheduler`.
- `cloze.ts` — `tokenizeCloze`, `clozeNumbers`, `validateCloze`, `nextClozeNumber`, `insertCloze`, `renderClozeSide`, `clozePlainText`.
- `generate.ts` — `generateCards(note)`, `templateKeys(note)`, `reconcileNoteInMeta(note, allMeta, scheduler, now)` (preserves unaffected schedules).
- `occlusion.ts` — `shapeBounds`, `pointInShape`, `pointInPolygon`, `moveShape`, `occlusionCardCount`, `occlusionSignature`, `isDuplicateOcclusion`.
- `occlusionEditor.ts` — editor geometry: `rectFromPoints`, `clientToImage`, `clampRect`, `zoomViewBox`, `nudgeShape`, `isDrawable`, `MIN_DRAW_SIZE`.
- `richText.ts` — `sanitizeRich(html)` (strict allowlist, XSS-tested), `richToPlainText`, `escapeHtml`, `isRichEmpty`.
- `migration.ts` — `ensureV2(value, now)`, `migrateV1ToV2`, `isV2Collection`, `migratedNoteId(deck, v1CardId)`.
- `queue.ts` — `buildQueue(entries, now, config, seen)`, `seenTodayFromEvents(events, deckId, now)`.
- `stats.ts` — every chart dataset: `studySummary`, `futureDue` (daily load from intervals), `heatmap`, `reviewsOverTime`, `reviewIntervals`, `hourlyBreakdown`, `answerButtons`, `addedOverTime`, `trueRetention` (first-review-per-local-day), `currentStreak`. `Horizon = number | null`.
- `deckSummary.ts` — `deckDashboardStats(metas, events, now)`.
- `flag.ts` — `FLAG_META`, `FLAGS`, `flagForDigit`, `digitForFlag`. Colours are theme tokens `var(--color-flag-*)` (defined in `src/index.css`, light/warm/dark).
- `time.ts` — `localDay`, `addLocalDays`, `daysBetweenDays`, `localDayPlus` (local calendar, not UTC).

### The integration hook — `src/lib/useFlashcards.ts`
`useFlashcards(providedDecks): FlashcardsApi`. Owns the versioned collection (lazy v1→v2 migration), the review-event log, provided-deck synthesis, and every mutation. Key API surface:
- Reads: `decks: DeckView[]` (`{ id, name, provided, sourceId?, subjectId?, config, counts, scheduler }`), `allCards: CardWithMeta[]` (`{ card, note, meta }`), `allNotes`, `reviewEvents`, `collection`, `getDeck`, `notesForDeck`, `cardsForDeck`, `cardById`, `metaFor`, `schedulerFor(deckId)`, `studyQueue(deckId, now?)`, `allTags`.
- Deck: `createDeck`, `renameDeck`, `removeDeck`, `setDeckConfig(deckId, Partial<DeckConfig>)`.
- Note: `saveNote(note)`, `deleteNote`, `moveNote`, `setNoteTags`.
- Study actions (each logs an event): `grade(cardId, answer, timeSpentMs?)`, `reset`, `suspend`, `bury`, `setDue`, `setFlag`.
- Bulk (single commit): `bulkFlag/bulkSuspend/bulkBury/bulkReset/bulkSetDue/unburyDeck/bulkMoveNotes/bulkTag/bulkDeleteNotes`.
- **`schedulerFor(deckId)` currently always returns `sm2Scheduler()`** — this is the seam for FSRS (see Task 1).
- Storage keys: `synapse.flashcards.collection.v2`, `synapse.flashcards.reviewlog.v2`, legacy `synapse.flashcards.decks.v1`.

### Command/shortcut system — `src/lib/shortcuts/`
- `keys.ts` — chord normalization (`Mod` = ⌘ on mac / Ctrl else), `eventToChord`, `parseChord`, `isEditableTarget`, `detectMac`. Shifted symbols like `?` drop the redundant Shift.
- `registry.ts` — `resolve(commands, event, ctx)`, `Command` type (`{ id, title, group, scopes, keys, run, when?, allowInEditable?, repeatable?, destructive?, hidden? }`), `findCollisions`, `helpModel`, `formatSpec`.
- `useShortcuts.tsx` — `ShortcutsProvider`, `useCommands(commands)`, `useScope(scope, { exclusive })`, `useOpenShortcutHelp`. Scopes in use: `global`, `study`, `editor`, `occlusion`, `dialog` (exclusive).

### UI — `src/components/flashcards/`
- `Flashcards.tsx` (page shell, `src/pages/student/`) — 4-view state machine + `ShortcutsProvider` + G-nav chords + ⌘N; tracks `editNoteId`.
- `DeckDashboard.tsx`, `DeckOptionsDialog.tsx` — Decks view.
- `StudyScreen.tsx` — study loop + toolbar + all study shortcuts + dialogs (card info, set-due, reset-confirm, auto-advance) + voice buttons. `StudyCardFace.tsx` renders Basic/Cloze, delegates occlusion to `OcclusionCardFace.tsx`. `CardInfo.tsx` = history panel.
- `AddView.tsx` — authoring (Basic/Cloze/Image-Occlusion routing). `RichField.tsx` (contentEditable rich editor + cloze textarea), `TagSelect.tsx`, `RichHtml.tsx` (safe render).
- `BrowseView.tsx` — search/filter/sort/bulk (uses `browseQuery.ts`).
- `StatsView.tsx` + `charts/Charts.tsx` (ColumnChart, StackBar, StatFigure) + `charts/HeatmapGrid.tsx`.
- `OcclusionEditor.tsx` — the canvas editor. `OcclusionCardFace.tsx` — study renderer.
- `src/lib/useVoiceRecorder.ts` — MediaRecorder hook (own-voice; states: idle/unsupported/denied/error/requesting/recording/recorded).

## How to run / verify
- Dev server: `preview_start` with `{ name: "synapse" }` (config in `.claude/launch.json`). Demo mode (no `.env`) → identity is `demo`, but an **onboarding modal** blocks the app. Bypass it by setting localStorage before loading `/app/flashcards`:
  ```js
  localStorage.setItem('synapse.account.audience.v1', JSON.stringify({universityId:'kau', year:'Year 1', group:''}))
  localStorage.setItem('synapse.account.profile.v1', JSON.stringify({username:'tester', iconId:'stethoscope', universityId:'kau', year:'Year 1'}))
  ```
  Then a provided deck "Heart failure · rapid review" (6 cards) is available to study.
- Commands: `npm test` · `npx tsc -b` · `npm run lint` · `npm run build`. Tests are `node --test --experimental-strip-types "src/**/*.test.ts"`; colocated `*.test.ts`, `node:assert/strict`, import with `.ts` extension, inject `now`/state.
- **Browser gotchas:** ref-clicks drift under viewport emulation — prefer clicking via `javascript_tool` (`[...document.querySelectorAll('button')].find(b=>b.textContent.trim()==='X').click()`) or clear emulation with the `desktop` preset. The in-app browser **cannot inject a file upload** (relevant to Task 4). Escape dispatched to `window` via JS does NOT reach the Dialog's `document` listener — that's a test artifact, real Escape works.

## Operating notes (important)
- **Subagent watchdog churn:** in this environment, large Sonnet subagents stall on a 600s no-output watchdog and fail. The previous session lost the Stats and Occlusion agents this way and built those slices directly. Prefer building complex UI yourself in small committed increments; if you delegate, keep tasks tightly scoped and expect stalls.
- Commit in small, verified increments (tiny first commits). Stage specific paths, not `git add -A`, if any agents are running.
- Design system rules: tokens only (no hardcoded hex except user-chosen content colours), no emoji/gradients/glow, `tnum` on numbers, `useT()` for all strings, keyboard-accessible + focus-visible, light/warm/dark automatic.

---

## Task 1 — FSRS scheduler + analytics

**Goal:** a correct, opt-in FSRS-5 scheduler behind the `Scheduler` interface; SM-2 stays default. Then real FSRS-only analytics.

**Where it plugs in:**
- Implement `fsrsScheduler(params?): Scheduler` in a new `src/data/flashcards/fsrs.ts` (pure, `now` injected, heavily tested against known FSRS reference values). FSRS needs per-card **stability** and **difficulty** state that SM-2's `CardSchedule` doesn't carry. Decide: either extend `CardSchedule` with optional `stability?`/`difficulty?` fields (back-compat: absent = SM-2 card), or add an `fsrs?` sub-object to `CardMeta`. Extending `CardSchedule` keeps `actions.ts`/`scheduler.ts` uniform — recommended, and it must round-trip through storage (it's JSON).
- Wire `schedulerFor(deckId)` in `useFlashcards.ts` to return `fsrsScheduler()` when `deckRecords[deckId]?.config?.scheduler === 'fsrs'` (the branch is already stubbed there).
- Enable the FSRS option in `DeckOptionsDialog.tsx` (currently a disabled `<Select>` with only `sm2`). Switching an existing deck to FSRS is a migration decision — per spec, keep SM-2 as default and make FSRS an explicit opt-in; a freshly-FSRS deck with no FSRS state should initialize stability/difficulty from FSRS defaults on first review.
- FSRS analytics: `StatsView.tsx` has an honest "requires FSRS" panel keyed on `deck.scheduler === 'fsrs'`. Add `cardStability`/`cardDifficulty`/`cardRetrievability` distributions to `stats.ts` (pure, tested) computed from real FSRS state + review history, and render them (distribution + average; retrievability adds estimated-remembered-cards) only when the selected deck uses FSRS. **Never derive FSRS values from ease/interval.**

**Reference:** the official FSRS-5 algorithm and default 19-parameter weights (see the Anki manual / open-source FSRS). Implement the retrievability `R = (1 + FACTOR·t/S)^DECAY` form, stability-after-recall/lapse, and difficulty update. Pin with tests using published expected outputs.

**Verify:** unit tests for the scheduler (new/again/hard/good/easy transitions, stability growth, difficulty clamp), FSRS metrics never appear for legacy decks (there's an existing-style test to mirror), and a deck toggled to FSRS studies + charts correctly in the browser.

## Task 2 — Card media audio

**Goal:** attach audio to a card in authoring; `R` replays / `P` pauses-resumes card audio in study.

**Where it plugs in:**
- Model: add an optional audio attachment to notes — e.g. `BasicNote.fields` / `ClozeNote.fields` gain an optional `audio?: string` (a `synapse-media:` reference), or a general `media?: string[]`. Keep it optional for back-compat and migration (v1 cards have none). Update `generate.ts` only if audio affects card identity (it shouldn't).
- Storage: reuse `src/lib/mediaStorage.ts` — `storeMediaFile(id, file)` on upload, `mediaReference(id)` into the field, `resolveMediaSource(ref)` to play (revoke the object URL on unmount; see `OcclusionCardFace.tsx` for the pattern). Accept `audio/*` via the `<input type="file" className="sr-only">` + drop pattern used in `HistologyEditorDialog.tsx`.
- Authoring: add an audio-attach control to `AddView.tsx` (and/or `RichField.tsx`'s "Attachment"/"Audio recording" toolbar buttons — the toolbar already lists these conceptually). Recording new audio can reuse `useVoiceRecorder.ts` (generalize it, or add `useAudioRecorder`) and store the blob via `storeMediaFile`.
- Study: in `StudyScreen.tsx`, register `R` (replay card audio) and `P` (pause/resume) commands + toolbar buttons, **enabled only when the current card's note has audio** (no dead buttons). Use an `<audio>` element or `new Audio(url)` with play/pause state. `MediaAttachmentView.tsx` already renders `audio` and resolves managed media — reuse it.
- Autoplay: optionally play card audio on reveal (respect the auto-advance settings pattern).

**Verify:** author a card with audio, study it, `R`/`P` work; a card without audio shows the buttons disabled; the field round-trips through storage and migration leaves old cards untouched. Note: the in-app browser can't inject a file upload, so test upload manually or by storing a blob into `mediaStorage` via `javascript_tool`, and unit-test any pure parts.

## Task 3 — Occlusion resize handles

**Goal:** drag-to-resize selected rect/ellipse occluders in `OcclusionEditor.tsx` (polygon resize is out of scope; move + per-vertex is a stretch).

**Where it plugs in:**
- Pure geometry first: add `resizeRect(rect, handle, imgPoint, imageWidth, imageHeight): Rect` to `src/data/flashcards/occlusionEditor.ts` (+ tests) — 8 handles (corners + edges), clamped to image, min size `MIN_DRAW_SIZE`, keep positive w/h.
- In the editor: when exactly one rect/ellipse is selected in `select` tool, render small SVG handle squares at its bounds (use `shapeBounds`; `vectorEffect: non-scaling-stroke` so they stay a constant screen size under zoom). Add a `drag.kind === 'resize'` branch alongside the existing `draw`/`move`/`pan` in `onPointerDown`/`onPointerMove`/`onPointerUp`, snapshotting onto the undo stack on pointer-up (matches how `move` snapshots). Coordinates map via the existing `toImg` (`clientToImage`).
- Keep it out of the way of drawing: handles only when `tool === 'select'` and a single resizable shape is selected.

**Verify:** unit-test `resizeRect` for each handle + clamping; in the browser, draw a rect, select it, drag a corner to resize, undo restores it.

## Task 4 — Interactive draw→save→study loop

**Goal:** confirm the occlusion editor works end-to-end and fix anything broken; the previous session verified the editor **UI** (upload prompt, type-switching, no console errors) and the geometry/domain via unit tests, but could not browser-automate the actual image upload → draw → save → study because the in-app browser can't inject a file upload.

**How to verify (pick one):**
- **Manual:** run the dev server, bypass onboarding (see above), Add → Image Occlusion → choose a real image → draw a few occluders → Save → study the deck; confirm masks render on the front and the asked region reveals on the back (`OcclusionCardFace.tsx`), for both `hide-all` and `hide-one` modes and for a grouped set.
- **Scripted:** use `javascript_tool` to (a) store a small generated image blob into the `mediaStorage` IndexedDB (DB `synapse-media-v1`, store `attachments` — match `storeMediaFile`'s record shape), (b) inject an `ImageOcclusionNote` into `synapse.flashcards.collection.v2`, (c) study it and screenshot. This exercises `OcclusionCardFace` without a file dialog.
- Watch for: object-URL revocation on unmount, image-space viewBox mapping (`viewBox="0 0 imageWidth imageHeight"`), duplicate rejection on a second identical save, and the card count matching `occlusionCardCount`.

**Likely-fine, but check:** `resolveMediaSource` returns `{ url, revoke }` — the study renderer must revoke when `revoke` is true and the component unmounts (already implemented — verify it actually fires). Pointer capture on touch. Fit-to-image on load.

---

## Suggested order
Task 3 (small, self-contained, unit-testable) → Task 4 (verifies 3 in situ) → Task 2 (media plumbing, reuses patterns) → Task 1 (largest; FSRS correctness is the risk — budget test time against reference values). Commit each in small verified increments; re-fetch `main` before pushing to the existing PR branch.
