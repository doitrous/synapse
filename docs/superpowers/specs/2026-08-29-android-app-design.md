# Synapse for Android — Design Spec (MVP)

Date: 2026-08-29
Status: Approved design (pre-implementation)
Author: Omar Yasser + Claude (orchestrated review)
Scope: The **student** app only. Admin stays web-only.

---

## 1. Goal

Build a native **Android** student app for Synapse (the medical-student study
platform) as the **sibling of the existing native iOS app** (`ios/`). It shares
the same backend, mirrors the same offline-first sync architecture, and ports
the same pure-logic modules. The first release is a **priority MVP** covering
the foundation plus the five surfaces the product owner prioritised, with true
offline study.

This document is the contract for the implementation plan. It is deliberately
concrete: where the web/iOS code already fixes a behaviour (SM-2 intervals, the
key-ownership routing table, the stroke wire format), Android must match it
exactly so a student's data round-trips across web, iOS, and Android.

## 2. Context (established by a full review of the codebase)

- **Platform**: `github.com/omary98/synapse` — React 19 + Vite + TypeScript web
  app (`src/`), an Express + MariaDB backend (`server/`, 48-table
  `server/schema.sql`), and a native SwiftUI iOS app (`ios/`). ~24 student
  surfaces on web.
- **Auth is Supabase, data is not.** Supabase provides identity only
  (email/password + email confirmation, Google/Facebook OAuth, TOTP MFA,
  session/JWT). There is **zero** use of Supabase Postgres/Storage/Realtime in
  the app. All application data flows through the custom Express REST API.
- **Data is a key→JSON document store.** `GET/PUT /api/state/:key` holds shared,
  admin-authored content (versioned, optimistic-concurrency); `GET/PUT
  /api/user-state/:key` holds per-student progress (single-writer, no version).
  `GET /api/state/manifest` returns `{key: updatedAt}` for cheap delta pulls.
  Content the student reads is an allow-list of ~14 "catalogue" documents
  (`STUDENT_READABLE_STATE` in `server/src/index.js`); the app shreds them into
  articles/questions/resources client-side.
- **Media** (PDFs, images) is Bearer-token-gated, content-addressed by SHA-256,
  streamed through `/api/...` — **no public or signed URLs**, no CDN.
- **Flashcards use SM-2** (Anki 25.02.5 defaults) in `src/data/srs.ts`. FSRS is
  deliberately not implemented (it needs review history to fit against).
- **The iOS app is the blueprint** and its *foundation is built and tested*
  (`ios/Synapse/Core/{Auth,API,Sync,Cache}`, 43 tests): `supabase-swift` auth +
  `GET /api/session` round-trip; `LocalStore` (GRDB/SQLite + FTS5 + write
  outbox); `SyncEngine` (manifest-diff catalogue pull + attempt merge + outbox
  drain); `StateOwnership` (a direct port of the web's `USER_OWNED_PATTERNS`).
  Its *feature screens* are only partly built — and notably **Flashcards,
  Question-Bank offline download, a real Notebook editor, and a smooth
  Whiteboard do not exist yet on iOS**. Android will lead in exactly the areas
  the product owner prioritised, then feed those designs back to iOS.

## 3. Decisions (locked)

1. **Scheduler**: implement **SM-2** now (verbatim port of `src/data/srs.ts`) for
   cross-device parity. FSRS is a **future, coordinated** upgrade across
   web + iOS + Android, not part of this MVP.
2. **Scope**: **priority MVP first** — foundation + Question Bank (with offline
   download) + Flashcards + Resources reader/annotations + Notebook editor +
   Whiteboard. Everything else is explicitly deferred (§9).
3. **Stack & location**: **native Kotlin + Jetpack Compose**, living in the
   synapse repo under **`/android`** (sibling to `/ios`), sharing the backend,
   on branch `claude/android-student-app`.

## 4. Architecture

Offline-first, single-network-caller, mirroring the iOS design:

```
Compose UI ── ViewModel ── Repository ─┐  (repositories read LocalStore ONLY)
                                       │
                                  LocalStore (Room + FTS + outbox + attempt)
                                       │
                                  SyncEngine  ← the ONLY component that touches the network
                                    ├── SynapseApi (Retrofit + OkHttp, Bearer token)
                                    └── AuthModel (supabase-kt: GoTrue) → token provider
```

Non-negotiable invariants (each is a test):

- **No screen ever calls the network.** UI reads Room; `SyncEngine` is the sole
  API client. This is what makes offline transparent.
- **Sync = pull-catalogues (manifest diff) + pull-attempts (merge by id) +
  drain-outbox.** A key is refetched only if its `manifest` timestamp moved. A
  404/403 on `/state/manifest` falls back to fetching every catalogue
  (backward-compat with an older server).
- **Ownership routing is a direct port of `USER_OWNED_PATTERNS`**
  (`src/lib/stateOwnership.ts`): dotted-prefix keys (`synapse.qbank.*`,
  `synapse.flashcards.*`, `synapse.notebook.*`, `synapse.whiteboard.*`,
  `synapse.annotations.*`, `synapse.progress.*`, …) are user-owned →
  `/user-state/:key`; hyphenated keys (`synapse-admin-content-ledger-v4`, …) are
  shared → `/state/:key`, **read-only** from the client. A mismatch silently
  splits a student's progress between phone and browser — so this table is
  ported with the same anchored-regex tests iOS uses (`StateOwnershipTests`).
- **Conflict rule** = `StatePrecedence.localCopyWins`: a local write wins only
  when it is **strictly newer** than the server's `updatedAt`. Attempts are
  append-only and idempotent (server enforces
  `UNIQUE(user_id, session_id, question_id)`), so they never conflict. Mutable
  per-user documents (card schedules, notebook, whiteboard) are single-writer
  last-write-wins, matching current product behaviour; the card-schedule map is
  keyed by card id so it merges key-by-key if we later want it to.
- **Outbox** is keyed by document (not per edit): six offline edits to one deck
  coalesce into one PUT. Drain is guarded against overlapping runs. Per-entry
  failure is classed **forbidden** (abandon), **unauthorized** (stop draining,
  keep everything — the session is gone), or **retryable** (record + retry).
- **Auth**: `supabase-kt` (GoTrue) signs in (email/pw, Google/Facebook OAuth,
  TOTP MFA); sign-in completes only after `GET /api/session` also succeeds. The
  access token is read fresh per request via a token provider (transparent SDK
  refresh). A 401 during sync pauses the outbox rather than dropping items.
- **Sync triggers**: on app foreground, after any local write (debounced), on
  connectivity regained, and via WorkManager periodic sync. (Push-triggered
  sync is post-MVP; see §8.)

## 5. MVP scope (requirements)

### 5.0 Foundation
- Gradle project under `/android` (Kotlin, Compose/Material 3, Hilt DI,
  Compose Navigation). `minSdk 26`, `targetSdk` latest stable, `applicationId
  com.synapse.app` (display name confirmed in §11).
- `AppConfig` reading `API_HOST`, `SUPABASE_HOST`, `SUPABASE_ANON_KEY` from
  `BuildConfig`/a gitignored secrets properties file; a "Not configured" screen
  when missing (mirrors iOS).
- `AuthModel` + auth screens: sign in, sign up, email verification notice,
  password reset, TOTP MFA enroll/challenge, Google/Facebook OAuth. Session
  restore on launch. `GET /api/session` gate.
- `SynapseApi` (Retrofit + OkHttp + kotlinx.serialization), Bearer + optional
  `X-Device-Token` headers. Endpoints in §7.
- `LocalStore` (Room): `catalogue(key, updatedAt, fetchedAt, json)`,
  `item(id, kind, subjectId, status, universityIds, yearIds, json, searchText)`
  with an FTS table, `outbox(key, json, enqueuedAt)`, `attempt(id, month, json,
  pending)`. Private app storage, excluded from cloud backup.
- `SyncEngine` + `StateOwnership` + `StatePrecedence` (ported, tested).
- App shell: bottom navigation / drawer, theme (light/warm/dark), RTL-ready.
- **Dashboard (Today)**: greeting, next-exam countdown, next-on-schedule,
  due-reviews, today's agenda, progress tiles — read from LocalStore.

Acceptance: a signed-in student, offline, sees cached content and can navigate;
edits queue and sync when back online; killing the app mid-write loses nothing.

### 5.1 Question Bank + offline download
- Full session engine: all 7 question types — MCQ single, multi-response,
  matching, labeling (image pins), completion, essay (self-marked), written
  (self-marked per part) — with correct grading logic ported from
  `src/data/{answerMatching,multiResponseQuestion,matchingQuestion,labelingQuestion,completionQuestion,essay,writtenQuestion}.ts`.
- Setup hub: New session / Flagged & missed / Previous tests; presets with live
  counts; draw-from (All/Flagged/Wrong/Omitted); subject→topic→subtopic
  tri-state chooser; name; **Tutor / Timed** mode; length 5/10/20/40/custom
  (max 40).
- Running: question navigator (5-state legend + flag dots), per-option
  strike/cross-out (touch-redesigned), Tutor per-question explanations
  (why-right/why-wrong), private per-question notes, flag, report, timer
  (count-up Tutor / countdown Timed) that pauses on app background and forces a
  deliberate resume, end-session dialog (pause vs submit).
- Results: score, pace bands, per-subject/subtopic accuracy, answer review,
  "next action" suggestion. Previous tests: rename/resume/retake/review/delete.
  Collections: Flagged / Wrong / Omitted with "test these".
- Attempts recorded to the attempt log (sharded by month, idempotent ids) and,
  online, POSTed to `/api/qbank/attempts`.
- **Offline download (new; iOS lacks it)**: an explicit action to download a
  chosen scope (subject/module, or the student's whole published set). It
  ensures the relevant catalogue documents are in LocalStore and **prefetches
  all referenced media** (question/labeling images, etc.) into the private media
  cache, showing an estimated size and progress, then **pins** that scope so
  sync keeps it fresh. A pinned scope runs sessions fully offline. A manage
  screen lists pinned scopes with sizes and a remove action.

Acceptance: with airplane mode on, a student can start and complete a session
from a pinned scope, including image-based questions, and see results; attempts
sync on reconnect with no duplicates.

### 5.2 Flashcards (SM-2)
- Verbatim Kotlin port of `src/data/srs.ts` (states new/learning/review/
  relearning; Anki-default `SrsConfig`; minute-steps vs day-intervals;
  lateness credit; ease floor 1.30) with the same test vectors as
  `src/data/srs.test.ts`. Clock is injected (no `System.now()` inside).
- Deck sources (port `src/data/decks.ts`): admin-authored ("provided") decks
  from the content ledger, student-authored ad-hoc decks, and taxonomy-derived
  decks (stable ids). Basic front/back cards only (matches product). Deck
  projection + `dueQueue` (due before new, each capped by daily allowance).
- Daily new/review caps keyed by **local calendar day**.
- Review UI: reveal (tap / key), Again/Hard/Good/Easy each showing the live
  interval preview, progress meter, end-of-session summary (count + how many
  graduate today; no score). No suspend/bury/flag/undo (matches product).
- Schedules + daily counts stored under the exact user-state keys
  `synapse.flashcards.decks.v1` and `synapse.flashcards.dailyCounts.v1`.

Acceptance: intervals for a given grade sequence match the web/iOS SM-2 output
byte-for-byte; a deck reviewed offline syncs schedules back correctly.

### 5.3 Resources reader + annotations (heaviest item)
- Resources browser: Files / Videos / My uploads; System vs Module grouping;
  search, subject/university/year filters, bookmarks; open a PDF in the in-app
  reader; videos open externally.
- PDF rendering via Android `PdfRenderer` (fallback PdfBox-Android/MuPDF if
  needed) + a **port of the arithmetic layout engine** (`src/lib/reader/
  pageLayout.ts`: uniform-size fast path, hysteresis current-page detection,
  overscan, anchor-preserving relayout) — these solved real scroll-jump bugs.
- **Annotation engine** (port `src/lib/reader/*`): 10 tools — pan, lasso, pen
  (4 nib types), highlighter, shape, eraser (stroke/area), sticky note, text
  box, tape (occlusion), laser (ephemeral); ruler snap; undo/redo; per-tool
  colors/width/stabilization. The ink pipeline mirrors web: coalesced touch
  history (`MotionEvent.getHistorical*`), the `Stabilize` filter, a dedicated
  "wet" layer for the in-progress stroke, committed strokes untouched,
  highlighter composited under ink (PorterDuff MULTIPLY). On commit: RDP
  simplify → optional shape recognition → **`StrokeCodec` quantize/delta encode
  kept byte-identical** to the web format so ink round-trips cross-platform.
- Storage: 16-page / 1.5 MB sharded annotation documents under
  `synapse.annotations.v1.*` user-state keys, plus a small manifest key for the
  note-search index. Only a window of shards mounted at once.
- **Offline PDF caching**: pin a resource → fetch its bytes to the private
  media cache (Bearer-authenticated); reader reads from cache when offline.

Acceptance: drawing feels smooth (no per-move full-canvas repaint); an
annotation made on Android appears correctly in the web reader and vice versa;
a pinned PDF opens and annotates offline.

### 5.4 Notebook document editor
- A custom Compose rich-text editor matching the web's Lexical-minimal set:
  **bold, italic, strikethrough, bulleted list, numbered list, undo, redo**, and
  **pasted/inserted images** (uploaded to `/api/my-documents`, referenced by id
  and rendered as a block).
- Serialises to the **exact `NotebookEditorJson` schema** (`src/data/notebook.ts`)
  with a `plainText` mirror for search/preview. Port `plainTextToEditorJson` /
  `editorJsonToPlainText`.
- Reproduce the cursor-preserving guard (only apply external editor state on a
  genuine external change — note switch, capture-append, shared revision) so
  typing never resets the caret / feels laggy.
- Note list (search, Your/Shared tabs), tags (freeform + subject-suggested),
  optional related-article link, resource references, "capture from selection".
- Notes stored under `synapse.notebook.notes` user-state. Sharing (`/api/shares`
  → `/s/:id`) is **deferred** to post-MVP (needs server + revision handling);
  MVP is personal notes only.

Acceptance: formatting + lists + image insert work; the JSON written by Android
opens unchanged in the web Notebook; fast typing never drops characters or
jumps the cursor.

### 5.5 Whiteboard
- Infinite pannable/zoomable canvas (bounded), with sticky notes (8 tones),
  resizable frames (group-drag contained notes), draggable/resizable images
  (uploaded to my-documents), pinned files, bezier connectors between notes
  (auto-curve + manual control points), and freehand ink. Port
  `src/lib/whiteboardGeometry.ts` (clamp, minimap, connector paths) so a shared
  board renders identically to web.
- Tools: select/pan, pen, eraser; 3 colors × 3 widths ink; undo/redo; search;
  minimap. Smooth via Compose Canvas + coalesced touch history.
- Board stored under `synapse.whiteboard.boards.v1` user-state.
  Note: web stores the whole board as one document (a scaling risk for very
  heavy boards); Android matches the format for compatibility but should add a
  size guard/warning (do **not** copy the unbounded-growth risk silently).

Acceptance: notes/frames/connectors/ink behave smoothly on touch; a board's
JSON is compatible with the web `BoardState` shape.

## 6. Package layout (parallels `ios/Synapse`)

```
android/
  app/                       # Application, DI, navigation host, theme
  core/
    api/                     # SynapseApi (Retrofit), DTOs
    auth/                    # AuthModel (supabase-kt), session gate
    sync/                    # SyncEngine, StateOwnership, StatePrecedence
    cache/                   # LocalStore (Room), media cache, outbox
    config/                  # AppConfig
    model/                   # shared domain models (Article, Question, Attempt…)
    qbank/                   # session, scope, grading, presets, attempts
    flashcards/              # Srs (SM-2), Decks, dueQueue, daily counts
    reader/                  # StrokeCodec, ShapeRecognition, Lasso, HitTest,
                             # Stabilize, PageLayout, ZoomAnchor
    whiteboard/              # WhiteboardGeometry, board model
    notebook/                # NotebookModel (JSON schema, plainText convert)
  feature/
    dashboard/ qbank/ flashcards/ resources/ notebook/ whiteboard/ account/
  design/                    # Theme (light/warm/dark), Motion, components, Wordmark
```

## 7. Backend surface used (from `ios/Synapse/Core/API/SynapseAPI.swift`)

Base: `https://<API_HOST>/api`. All requests carry `Authorization: Bearer
<supabase access token>` (+ `X-Device-Token` when a push token exists).

- `GET session`, `GET me`
- `GET state/manifest`, `GET state/:key`, `GET/PUT user-state/:key`
- `POST accounts/exists`, `DELETE account`
- `GET vouchers/mine`, `POST vouchers/redeem`, `DELETE vouchers/redemption`
- `GET medical-resources/:id/status`, `GET medical-resources/:id` (streamed)
- `my-documents` chunked upload/list/delete (for notebook/whiteboard images)
- `POST /api/qbank/attempts`
- `POST/DELETE devices` (push registration — wired in post-MVP)

No new backend endpoints are required for the MVP. (Existing endpoints already
support everything above; the offline-download feature is a client-side pin +
prefetch over the same `state`/`manifest`/`medical-resources` routes.)

## 8. Cross-cutting

- **Design system**: port `Theme`/type scale from `src/index.css`
  (light/warm/dark), reduce-motion-aware `Motion`, Material 3 surfaces in place
  of iOS "Glass", the Synapse wordmark. Device-local prefs (theme, focus mode,
  collapsed nav) in DataStore, **not** synced (matches product intent).
- **i18n / RTL**: string resources with RTL-ready layouts from day one. Arabic
  is only ~33% translated on web today, so **MVP ships English-first** with
  RTL-correct layout; full Arabic parity (incl. Arabic-Indic numerals/percent
  from `src/lib/pricing.ts`) is tracked as its own task.
- **Billing**: **none in-app.** Keep the web's "contact support" model —
  entitlements are admin-granted, vouchers are code redemption. This is also the
  safe Google Play policy posture; do **not** add Play Billing.
- **Push**: FCM is **post-MVP**. The server's `POST /devices` registration is
  generic (token, environment, locale, appVersion); FCM just needs a new
  `environment` value. In-app notification model (campaigns targeted by
  university/year/group) is ported for display; push transport comes later.
- **Media cache**: private app dir, content-addressed by SHA-256, every fetch
  Bearer-authenticated (no public URLs). Respect per-plan storage quota
  (`src/data/storageLimits.ts`).

## 9. Non-goals (deferred, post-MVP — sequenced later)

Library (full reader/atlas), Adaptive Study, Practical (OSCE/cases/oral/skills/
lab/histology), Calendar month/week grid (MVP dashboard shows agenda only),
Performance analytics screens, Medical Taxonomy glossary, Maristanas, Study-
Together (rooms/friends/parties/challenges + SSE), Minigames, University map,
Essays/Written dedicated screens (grading logic is ported for QBank; standalone
screens deferred), Notebook/Whiteboard **sharing** (`/s/:id`), FCM push, full
Arabic translation.

## 10. Testing strategy (TDD)

- Pure-logic ports get unit tests reusing the web/iOS vectors: `Srs` (SM-2),
  `StrokeCodec`, `ShapeRecognition`, `PageLayout`, `Lasso`/`HitTest`,
  `WhiteboardGeometry`, `NotebookModel` conversions, `StateOwnership`
  (anchored-regex per key family), `StatePrecedence`, `SyncEngine`
  (manifest diff, outbox coalescing/last-write-wins/abandon-on-403, attempt
  merge, index-covers-all-months).
- A **client/server contract test** mirroring `src/lib/apiPaths.test.ts`:
  every endpoint `SynapseApi` calls must exist in `server/src/index.js`.
- Room/LocalStore instrumentation tests (upsert, FTS search, outbox survival of
  an in-flight edit, `clearAll` on sign-out).
- UI: Compose tests for the QBank session state machine, flashcard grading
  buttons/intervals, and the annotation/ink gesture pipeline where feasible.

## 11. Open items (non-blocking; confirm before/at release)

- **App display name / branding**: iOS bundle is `com.synapse.app` but its
  display name is "Connect Cortex" (a mid-rebrand). MVP uses `applicationId
  com.synapse.app`, display name "Synapse", pending a branding decision.
- **Play Data Safety form**: map from `ios/Resources/PrivacyInfo.xcprivacy`
  (email, name, phone, user content, product interaction; no tracking).
- **Deep links / App Links**: none exist on iOS; a fresh decision for Android
  (nice-to-have, not MVP-blocking).

## 12. Risks & mitigations

- **Ink smoothness on real devices** (finger vs S-Pen jitter differs from web
  PointerEvents): budget a device-tuning pass on the `Stabilize` strength and
  shape-recognition thresholds; keep the wet-layer/committed-layer split.
- **Cross-platform ink/board compatibility**: guaranteed only by keeping
  `StrokeCodec` and `BoardState`/`NotebookEditorJson` byte-compatible — covered
  by round-trip tests against fixtures captured from the web app.
- **PDF engine limits** (`PdfRenderer` API level / rendering quality): fall back
  to PdfBox-Android or MuPDF if `PdfRenderer` is insufficient for large docs.
- **Single-writer user-state**: two devices editing the same deck/board offline
  is last-write-wins today; acceptable for MVP (matches product), revisit with
  per-key merge if it bites.

## 13. Build order (phases within the MVP)

1. **Foundation** — Gradle/Compose skeleton, DI, `AppConfig`, auth (+session
   gate), `SynapseApi`, `LocalStore`, `SyncEngine`/`StateOwnership`/
   `StatePrecedence`, app shell + theme, Dashboard. (Establishes the tested
   offline spine.)
2. **Question Bank + offline download.**
3. **Flashcards (SM-2).**
4. **Resources reader + annotations + offline PDF.**
5. **Notebook editor.**
6. **Whiteboard.**

Each phase lands behind tests and is independently shippable to internal
testing. The detailed implementation plan (task breakdown per phase) is produced
next via the writing-plans workflow.
