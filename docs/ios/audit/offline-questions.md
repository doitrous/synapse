# Port spec — Offline question download

_Audit for the native iOS port of the Connect Cortex student app. iOS work lives in `ios/`. Web reference lives in `src/`. This spec is the source of truth for implementing offline question download on iOS._

## 1. Web behavior inventory

The web app has no explicit "offline download" feature for the question bank — it doesn't need one, because of how it gets its data. This section explains that mechanism, since the iOS design has to answer the same underlying question (how does content reach the device) before "offline" means anything.

### How the web gets questions at all

`src/lib/usePublishedQuestions.ts:62-65` — `usePublishedQuestions()` reads the **entire content ledger** out of `usePersistentState<ManagedContentItem[]>(CONTENT_LEDGER_STORAGE_KEY, ...)` (`usePublishedQuestions.ts:63`) — i.e. browser `localStorage`, not a per-question network call. `publishedQuestionsFromCatalogue` (`usePublishedQuestions.ts:55-59`) then maps every ledger item through `managedQuestionToStudentQuestion` (`usePublishedQuestions.ts:17-53`), filtering to `item.kind === 'question'`, `isStudentPublishable(item)`, and a valid answer set. The written/matching/multi-response/labeling/completion formats go through parallel functions in `useLiveWrittenQuestions.ts:16-75`, all reading the **same** persisted catalogue.

The ledger itself (key `synapse-admin-content-ledger-v4`, `server/src/index.js:147`) is fetched whole via `GET /api/state/:key` (`server/src/index.js:1605-1656`) — there is no per-item or per-scope route: "the content ledger holds every authored item ... there is no per-item route to ask for less" (`server/src/index.js:246-250`, comment on the compression middleware). A version snapshot of this document is **~23 MB** of JSON (`server/src/index.js:1661`, comment on `STATE_VERSION_RETENTION`); gzip brings that down "by roughly an order of magnitude" over the wire (`server/src/index.js:250-252`). Server-side, a student's read is redacted (drops drafts, unreleased media, author notes) via `redactLedgerForStudent` (`server/src/index.js:1642-1647`) but is **not** filtered by university/year cohort — that filtering happens client-side, after the whole document is already local.

**Conclusion for the design questions below**: on the web, the whole question bank (every published question, every format, across every university/year) is already resident in the browser's persisted state before a student ever opens Question Bank. There is no lazy per-question fetch to go offline from.

### Screens / routes

- `src/pages/student/QuestionBank.tsx` (2346 lines) is the entire feature — no nested routes. Three phases via local `phase` state (`setup`/`running`/`results`, `QuestionBank.tsx:716`).
- Setup tab has three sub-tabs: new sitting / collections / previous (`hubTab`, `QuestionBank.tsx:799`).
- Scope picker: `TopicChooser` (`src/components/qbank/TopicChooser.tsx`), same three-state chapter/subtopic tree the iOS port mirrors (see §2).
- Running: `QuestionNavigator` (grid jump), `StudyRail`, `MediaAttachmentView`/`ZoomableImage` for attached images (`QuestionBank.tsx:70`, rendered at `QuestionBank.tsx:2057-2060` for the legacy `attachedImage` field), `HighlightableText`/`QuestionHighlights` for text highlighting, `QuickAddFlashcardDialog`.
- Results / previous: `EndSessionDialog`, `ContinueCard` (resume banner), session rename/delete context menu.

### Data model

- `Question` (`src/data/qbank.ts:34-58`): `id, subjectId, topic, difficulty, vignette, stem, options: QOption[], explanation, libraryRefs, resourceRefs, attachedImage?, media?: MediaPlacement[], attachments?: QuestionMedia[], learningObjective?, conceptIds?`.
- `QuestionMedia` (`qbank.ts:25-32`): `{ id, type: 'image'|'audio'|'video', name, url, mimeType?, size? }` — the modern attachment shape.
- `MediaPlacement` (`src/data/mediaLibrary.ts:55-63`): `{ id, mediaId, slot, answerLabel?, caption? }` — places a media-library asset (`mediaId`) into a specific slot (stem / an answer letter / the explanation). Resolved by `mediaUrl(id) = /media/${id}` (`mediaLibrary.ts:88-90`) for legacy display, but the actual authenticated fetch is `GET /api/media/:id` (`server/src/index.js:3048-3053`, `requireAuthenticated` + `mayReadManagedMedia` — any signed-in student may read *released* media, no cohort check). Audio/video instead get a short-lived signed playback URL via `POST /api/media/:id/playback` → `GET /api/media-playback/:token` (`server/src/index.js:3056-3073`), so `<video>`/`<audio>` Range requests don't need the bearer header.
- `QuestionAuthoringData.attachedImage` (`src/data/contentControl.ts:346`) is the oldest, pre-media-library mechanism (a bare URL string) and "still render[s] — live content is not broken to tidy a data model" (`contentControl.ts:334-335`). Three overlapping attachment mechanisms exist on live content: `attachedImage` (legacy, rare), `attachments` (mid-generation `QuestionMedia[]`), `media` (current, slot-aware `MediaPlacement[]`).
- `QuestionAuthoringData.format` (`contentControl.ts:297-302`) distinguishes `mcq_single_best` (absent = default), `mcq_multi`, `true_false`, `image_based`, `matching`, `labeling`, written formats, `completion` — see `src/data/questionFormat.ts`.
- Storage keys (student-owned, dotted prefix per `src/lib/stateOwnership.ts` `USER_OWNED_PATTERNS`): flags/notes/session-names/live-session under `synapse.qbank.*`, attempts under `synapse.progress.*` — exact iOS mirror in §2/§4.4.
- Attempts: `AttemptRecord` (`src/data/attempts.ts`), recorded via `useRecordAttempt`/`useRecordAttempts` (`src/lib/useAttemptLog.ts`), persisted the same way as the rest of user state.

### Empty / loading / error / offline states

- No explicit "offline" banner or `navigator.onLine` check found anywhere in `QuestionBank.tsx` or its imports — because content already lives in `localStorage`, there is no meaningfully distinct offline case for *reading* the bank. A total loss of connectivity only matters for something the SPA itself needs the network for (initial page load, writing progress) — genuinely out of scope for a "questions offline" spec.
- Empty scope / no questions: handled inline by disabling the Start button and showing a count (`matching`-style counts throughout the setup UI).

## 2. iOS current state

The port already mirrors the web's core design decision — sync the whole catalogue down, don't fetch per-question — and the mechanism is further along than "offline download" as a checkbox: **most of what this task asks for already happens automatically, with no download button at all.**

### Already implemented: the whole ledger (and therefore question text) syncs to disk automatically

- `SyncEngine.refresh()` (`ios/Synapse/Core/Sync/SyncEngine.swift:86-103`) is called on every launch (`ios/Synapse/Features/Root/SignedInView.swift:120`), on every push nudge (`SignedInView.swift:117`), and via `.refreshable` pull-to-refresh on Library/Resources/Dashboard (`ResourcesView.swift:57-58`, `LibraryView.swift:104-105`, `DashboardView.swift:93-94`) — **but not on QuestionBankView** (see gap G1 below).
- `pullCatalogues()` (`SyncEngine.swift:144-196`) fetches every key in `catalogueKeys` (`SyncEngine.swift:20-35`), including `synapse-admin-content-ledger-v4` (`ledgerKey`, `SyncEngine.swift:38`), comparing against `GET /api/state/manifest` timestamps so an unchanged ledger costs one small request, not a re-download.
- `fetchCatalogue(key:expecting:)` (`SyncEngine.swift:200-216`) stores the raw document via `LocalStore.saveCatalogue` and, for the ledger specifically, calls `shredLedger(_:)` (`SyncEngine.swift:219-232`), which runs `LedgerDecoder.decode` (`ios/Synapse/Core/Model/ContentItem.swift:94-108`) and writes every item — **verbatim `raw` JSON kept whole** (`ContentItem.swift:41-42`) — into the SQLite `item` table (`LocalStore.swift:81-94`, `LocalStore.replaceItems`, `LocalStore.swift:242-263`).
- `QuestionBankModel.load()` (`QuestionBankModel.swift:149-163`) reads questions via `store.items(kind: .question, audience:)` (`LocalStore.swift:275-285`) — **a local SQLite read, no network call**, filtered only by `status == .published` and `LedgerItem.inScope(audience:)`.
- `QuestionProjection.project(_:)` (`ios/Synapse/Core/Model/Question.swift:56-92`) turns the cached raw JSON into a sittable `Question` — again purely local.

**This means the stem, vignette, options, per-option explanations, and overall explanation for every MCQ-shaped published question are already fully offline after the first successful sync — no separate "download" step, no per-topic selection, nothing to build.** The task's framing question ("does the whole bank already sync down?") resolves to **yes, for text**. Because the ledger fetch is monolithic (§1 — "no per-item route to ask for less"), a granular "download this subject only" affordance would not actually reduce what's stored or transferred for text content; the whole ~23 MB (compressed in transit) document comes down regardless of what a student selects to study.

### Not implemented: question media (images/audio/video)

No fetch, cache, or rendering code exists for question attachments anywhere in `ios/Synapse/Core/QuestionBank` or `ios/Synapse/Features/QuestionBank` — confirmed by grep across both directories for `image|media|attachment` (only unrelated hits: `Reader/Stabilize.swift`, `Library/ResourceModel.swift`, `Library/ResourceFileStore.swift`, `StudyTogether/StudyRoomModel.swift`). Specifically:

- `Question` (`ios/Synapse/Core/Model/Question.swift:17-44`) has **no** field for `attachedImage`, `attachments`, or `media` — those JSON keys are simply never read.
- `QuestionProjection.project` (`Question.swift:56-92`) reads only `questionData.answers`, `questionData.correctAnswer`, `questionData.tags`, `questionData.learningObjective`, `questionData.estimatedSeconds`, `questionData.libraryIds`, plus `fields.Topic/Difficulty/Vignette/Explanation`. It never touches `questionData.attachedImage`, `questionData.attachments`, or `questionData.media`.
- `QuestionBankView.swift` (Runner, lines 285-339) renders `vignette`, `stem`, and `options` as plain text — there is no `Image`/`AsyncImage` anywhere in the file.
- `ios/Synapse/Core/Library/ResourceFileStore.swift` is the **nearest existing pattern** to copy: a per-id download state machine (`notDownloaded/downloading(fraction:)/ready(URL)/failed`, `ResourceFileStore.swift:14-19`), files kept in `Application Support/Synapse/Resources` excluded from iCloud backup (`ResourceFileStore.swift:45-53`), a `download(_:)` that streams via `URLSession.download` with progress (paired with `SynapseAPI.downloadResource(id:onProgress:)`, `SynapseAPI.swift:302-323`, which sets the bearer token manually because "a viewer given a bare URL sends no Authorization header"), and a `bytesOnDisk()` for storage accounting (`ResourceFileStore.swift:121-133`). This is built for one binary type (PDF, `medical-resources/:id`); question media would hit `/api/media/:id` instead and needs its own store (images are typically small enough to hold as `Data`/`UIImage` rather than stream-to-disk, but the disk-cache-with-state-machine shape is directly reusable).

### Not implemented (adjacent, worth flagging, not core to this task): non-MCQ formats

`QuestionProjection.project` requires `options` decoded from `data["answers"]` and a `correctLabel` present among them (`Question.swift:64-70`) — the classic `mcq_single_best` shape. A ledger item authored as `written`, `matching`, `mcq_multi`, `labeling`, or `completion` (`format` field, `contentControl.ts:297-302`) is still synced and cached byte-for-byte in the `item` table (kind stays `.question`, `LedgerDecoder` doesn't look at `format` at all) — but `QuestionProjection.project` silently returns `nil` for it, so it never appears in `QuestionBankModel.available`. **The gap here is the projection/rendering layer, not the sync layer** — the raw bytes are already offline; iOS just can't turn them into a sittable question yet. This is a full separate feature (five question-taking UIs), not an "offline" gap, and is flagged only so it isn't confused with the actual scope of this task.

### Partially implemented: everything else a sitting touches

- `QBankStore` (`ios/Synapse/Core/QuestionBank/QBankStore.swift`) holds marks (`markedKey`, `:16`), notes (`notesKey`, `:17`), session names (`namesKey`, `:18`), and the in-progress sitting (`LiveSession.key = "synapse.qbank.activeSession.v1"`, `QBankSession.swift:55`). **`QBankStore.load()` (`QBankStore.swift:50-61`) reads all four directly from the network via `api.userState(...)`, with no `LocalStore` fallback** — unlike catalogue documents and attempts, there is no local cache table for these. A cold launch with no connectivity yields empty `marked`/`notes`/`names` and no "Carry on" resume offer (`QuestionBankView.swift:123-143` reads `store.live`, which is `nil` until a network `load()` succeeds), even if the student flagged questions or has a sitting in progress from a prior (online) session. Attempts are the one exception — they get a dedicated local table with real offline support (next point).
- Attempts (`AttemptRecord`/`AttemptMonth`/`AttemptIndex`, `ios/Synapse/Core/Model/Attempt.swift`) **do** have proper offline handling: `LocalStore`'s `attempt` table (`LocalStore.swift:133-140`) stores every answer locally the instant a sitting finishes (`QuestionBankModel.recordAttempts`, `QuestionBankModel.swift:401-426`), independent of connectivity, and `pending` flags (`LocalStore.swift:152-166, 186-196`) track what still needs to reach the server.

## 3. Gap list (web → iOS)

Ordered by dependency; G1–G2 are cheap and independent, G3 is the substantive new build, G4 depends on G3, G5 is explicitly out of scope for this task.

- **G1 — No pull-to-refresh on Question Bank.** `QuestionBankView.swift` has no `.refreshable`, unlike Library/Resources/Dashboard. A student who knows new questions were published has no way to force a re-sync from inside the screen (they'd have to go to Account → Sync → "Refresh now").
- **G2 — `QBankStore`'s marks/notes/names/live-session are not locally cached.** Network-only reads in `load()` (`QBankStore.swift:50-61`) mean these reset to empty on any launch where that one request fails, unlike attempts (which have a real local table) and unlike the catalogue (which has a real local table). This is the actual "offline gap" in the qbank *experience*, even though it's not about downloading questions per se.
- **G3 — No media fetch/cache for question images/audio/video.** `attachedImage`, `attachments`, `media` are unread by `QuestionProjection` and unrendered by `QuestionBankView`. This is the one piece of question-bank content that is genuinely fetched lazily today (i.e., not at all) and is the real "build a download" work in this task.
- **G4 — No storage/management UI.** No screen shows how much is cached, no "download images for offline" action, no way to clear cached media. Depends on G3 existing to have something to manage.
- **G5 — (adjacent, not in scope) non-MCQ format rendering.** Raw data for `written`/`matching`/`mcq_multi`/`labeling`/`completion` questions is already cached (part of the existing ledger sync) but not projected into sittable UI. Call out separately; do not fold into this spec's build order.

## 4. Port spec

### 4.1 Data layer

- **`ios/Synapse/Core/Model/Question.swift`**: extend `Question` with an attachment list, e.g.:
  ```swift
  struct QuestionAttachment: Identifiable, Equatable, Sendable {
      enum Kind: String, Sendable { case image, audio, video }
      let mediaId: String
      let kind: Kind
      let slot: String        // "stem" | "answer" | "explanation" (mirrors MediaPlacement.slot)
      let answerLabel: String?
  }
  ```
  and add `let attachments: [QuestionAttachment]` to `Question` (`Question.swift:17-44`).
- **`QuestionProjection.project`** (`Question.swift:56-92`): read `data["media"]` (`MediaPlacement[]`, current mechanism — prioritize this) and `data["attachments"]` (`QuestionMedia[]`, legacy) into `QuestionAttachment`s; treat `data["attachedImage"]` (bare URL string) as a synthetic single stem-slot attachment for backward compatibility with old content. Skip malformed entries rather than failing the whole question, matching the file's existing philosophy (e.g. `Question.swift:97-110`).
- **New: `ios/Synapse/Core/Media/MediaFileStore.swift`** (new `Core/Media` group). Mirror `ResourceFileStore.swift` almost exactly: `State` enum (`notDownloaded/downloading(fraction:)/ready(URL)/failed(String)`), `states: [String: State]` keyed by `mediaId`, `download(_:)`/`cancel(_:)`/`delete(_:)`, files under `Application Support/Synapse/Media/<id>.<ext>` excluded from backup, `bytesOnDisk()`. Since these are small (images), keep the disk-cache shape but consider surfacing a decoded `UIImage`/`Data` accessor rather than forcing every call site to re-read from disk. Audio/video should use the playback-token flow instead of a plain download (see 4.3) — `MediaFileStore` covers images only for v1.
- **`ios/Synapse/Core/API/SynapseAPI.swift`**: add `func downloadMedia(id: String, onProgress: ...) async throws -> URL`, copying `downloadResource(id:onProgress:)` (`SynapseAPI.swift:302-323`) but hitting `["media", id]` instead of `["medical-resources", id]`. Add `func mediaPlaybackURL(id: String) async throws -> URL` for the signed-token flow if audio/video prefetch is included.
- **`LocalStore` migration**: add a small table for the four `QBankStore` documents (marks/notes/names/liveSession) so `load()` can fall back to a local copy when the network read fails — same shape as `catalogue` (key → document blob → fetchedAt), e.g. `userDoc(key TEXT PRIMARY KEY, document BLOB, fetchedAt DATETIME)`. `QBankStore.load()` would then read-through: try network, on success write to `userDoc` and use it; on failure, read `userDoc` instead of defaulting to empty. This addresses G2 and is a small, independently-committable change (it doesn't touch the outbox — these are reads, not writes).

### 4.2 UI

- **`ios/Synapse/Features/QuestionBank/QuestionBankView.swift`**: add `.refreshable { await sync.refresh() }` to the `List` in `SessionBuilder` (mirrors `LibraryView.swift:104-105`) — closes G1.
- **Runner** (`QuestionBankView.swift:275-339`): render attachments. For each `question.attachments` in the `stem` slot, show an image view backed by `MediaFileStore` state (spinner while `downloading`, tap-to-retry on `failed`, the image itself on `ready`, and — importantly — **auto-trigger `download(_:)` the moment the question appears** so media behaves like ordinary online content when connected, and gracefully shows a placeholder/retry when not). Answer-slot and explanation-slot attachments render inline next to the relevant `OptionRow` / `revealed(_:)` block.
- **New: a small "Downloads" section**, most naturally added to the existing Account screen's Sync section (`ios/Synapse/Features/Root/SignedInView.swift:237-253`, right where `sync.pendingUploads` and "Refresh now" already live) rather than a new screen: `row("Question images", "<n> of <total> cached · <bytes>")`, a `Button("Download all images")` that walks `model.available` (or a chosen `QBankScope`, reusing `TopicChooser`'s existing scope UI for a "what to prefetch" picker in a later phase) collecting distinct `mediaId`s and calling `MediaFileStore.download` for each, and a destructive `Button("Clear downloaded images")` calling `MediaFileStore.delete` for every cached id (mirrors `ResourceFileStore.delete`/`bytesOnDisk`, `ResourceFileStore.swift:115-133`).
- Keep this additive: nothing here gates the existing "questions just work offline" behavior — the download button is for *media*, not for the question bank as a whole, since the latter is already handled by ordinary sync.

### 4.3 Sync/offline

- **Text content**: no change needed — already flows through `SyncEngine.pullCatalogues()` (§2). Confirmed via read of `SyncEngine.swift` end to end.
- **Attempts**: confirmed the outbox already covers this correctly. `QuestionBankModel.pushAttempts()` (`QuestionBankModel.swift:432-448`) calls `sync.write(key: AttemptStore.monthKey(month), ...)` for `synapse.progress.attempts.<month>` and `pushIndex()` (`QuestionBankModel.swift:456-479`) writes `synapse.progress.attemptIndex.v1` (`Attempt.swift:50,63`). `SyncEngine.write(key:value:)` (`SyncEngine.swift:241-252`) asserts `StateOwnership.isUserOwned(key)` (both keys match `^synapse\.progress\.` in `StateOwnership.swift:34`), enqueues into `LocalStore`'s `outboxEntry` table, and immediately attempts `drainOutbox()` — which fails silently offline (`SyncEngine.swift:284-311`, `recordFailure`/`abandonPending` per error type) and is retried on the next `refresh()`. Local-first is also correct at the answer level: `saveAttempt` writes to the local `attempt` table on `finish()` before any network call (`QuestionBankModel.swift:401-426`, `LocalStore.swift:152-166`). **Marks/notes/names/live-session go through the identical outbox path** (`QBankStore.toggleMark/saveNote/rename/keep`, all calling `sync.write` with keys `synapse.qbank.marked.v1` / `synapse.qbank.questionNotes.v1` / `synapse.qbank.sessionNames.v1` / `synapse.qbank.activeSession.v1`, `QBankStore.swift:16-18`, `QBankSession.swift:55`) — so an offline flag/note/resume-state *write* is safe today; only the *read-on-cold-launch* path lacks a local fallback (G2, §4.1).
- **Media**: pure reads, not outbox material — `MediaFileStore` sits alongside `SyncEngine` the way `ResourceFileStore` does today (constructed with just `api`, no `store`/outbox dependency). Do **not** fold media prefetch into the automatic `refresh()` call — that runs on every launch/foreground/push-nudge, and silently pulling potentially many images over cellular on every launch is a materially different data-usage promise than the text sync makes today. Keep it an explicit, user-initiated action (§4.2), and flag the cellular-vs-Wi-Fi default as an open question (§5).

### 4.4 Tests

- `QuestionProjectionTests.swift` (existing file, extend): a `media`/`attachments`/`attachedImage` fixture projects the expected `QuestionAttachment` list; a malformed attachment entry is skipped without failing the whole question; a question with only legacy `attachedImage` still gets one stem-slot attachment.
- New `MediaFileStoreTests.swift` (mirror the shape of any existing `ResourceFileStore` tests, or write fresh if none exist — confirm during implementation): download → `.ready`, a second `download(_:)` call while one is in flight is a no-op, `delete` clears state and file, `bytesOnDisk` sums correctly, a 404 maps to a distinct failure message (matching `ResourceFileStore.swift:97-104`'s pattern).
- `LocalStoreTests.swift` (existing, extend): the new `userDoc` table round-trips a document; a `QBankStore.load()` with a forced network failure falls back to the last-written local copy instead of resetting to empty.
- `StateOwnershipTests.swift` (existing): no change needed — already covers `synapse.qbank.*`/`synapse.progress.*`; worth double-checking existing coverage includes these exact key literals rather than just the regex patterns.

### 4.5 Suggested build order

1. `QuestionBankView` `.refreshable` (G1) — trivial, ships alone.
2. `QuestionProjection` + `Question` attachment parsing (§4.1, no UI yet) — pure/testable, ships alone, unblocks everything else.
3. `MediaFileStore` + `SynapseAPI.downloadMedia` (§4.1) — mirrors an existing, working pattern closely; ships alone with its own tests.
4. Wire attachment rendering into `QuestionBankView` Runner (§4.2), auto-downloading on view for the online case — this is the point at which question media becomes visible in the app at all (currently it renders nothing, online or off).
5. `LocalStore` `userDoc` table + `QBankStore.load()` fallback (G2, §4.1) — independent of 1-4, can land any time, fixes a real (if narrow) existing offline bug.
6. Account screen "Downloads" section: bulk prefetch + storage readout + clear (§4.2) — depends on step 3.
7. (Separate spec, not this build order) non-MCQ format projection/rendering — G5.

## 5. Open questions / blockers

- **Cellular data policy for media prefetch**: no existing precedent in the app (`ResourceFileStore`'s textbook downloads are also always user-initiated, with no observed Wi-Fi gate either — grepped for `wifi`/`cellular`/`allowsCellular`, only a comment mentions "wifi" aspirationally). Needs an Omar decision: should "Download all images" warn on cellular, refuse on cellular, or not care? Given question images are individually small (unlike PDF textbooks), the case for gating is weaker, but the total across a whole bank is unknown (no count of media-bearing questions was available from static analysis — would need a live query against `synapse-admin-content-ledger-v4` or the admin media library page to size this before committing to a default).
- **G2 (local cache for marks/notes/names/live-session)** is a legitimate pre-existing gap surfaced by this audit, not something the task asked for directly. Recommend fixing it as part of this work since it's cheap and directly adjacent (same "is this actually offline?" question the task poses), but flagging in case Omar wants it split into its own change.
- **G5 (non-MCQ formats)** is a substantial, separate feature (five question-taking UIs: written, matching, multi-response, labeling, completion) that happens to share the same ledger-sync mechanism this spec covers. Recommend a dedicated port spec rather than folding it in here — mentioned only so it isn't mistaken for part of "offline download."
- **Per-scope selective text download** is not buildable as a meaningfully-smaller download without server changes (the ledger has no per-item route today, per the server's own comment at `server/src/index.js:246-250`). If Omar specifically wants a "download only Cardiology" experience for *text*, that's a backend project (a scoped ledger endpoint), not an iOS one — worth an explicit decision that v1 does not attempt this, since the whole bank is already local regardless of what's selected.
- Confirmed no blockers requiring Telegram or other unavailable sources — everything needed to write this spec was verifiable directly in `ios/`, `src/`, and `server/src/index.js`.
