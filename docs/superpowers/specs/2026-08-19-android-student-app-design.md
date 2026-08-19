# Connect Cortex for Android — foundation, Question Bank, Practical

The native Android student app. Admins keep using the web console; this covers
the student portal only, exactly as `ios/` does.

Milestone 1 is the foundation (project, theme, auth, API client, local cache,
sync engine) plus two surfaces: **Question Bank** and **Practical**. Every other
surface is additive on top of the same foundation and gets its own spec.

## Why a native app rather than a wrapper

A WebView shell would reach parity in days, but three things in this product
resist it: the app has to be usable on a ward with no signal, the question
runner and mark sheets are long-lived stateful surfaces, and the Play Store
treats thin wrappers of an existing site poorly. The iOS app already proved the
API contract supports a native offline client — Android is a second client of a
contract that exists, not a new product.

## Project shape

`android/` beside `ios/`, a single `:app` Gradle module with packages mirroring
the iOS `Core`/`Features` split — `core/api`, `core/auth`, `core/cache`,
`core/sync`, `core/model`, `core/qbank`, `core/practical`, `design`, `feature/`.
Splitting into Gradle modules buys nothing until there are more surfaces and
costs build complexity now.

- Kotlin, Jetpack Compose with Material 3, Gradle version catalog.
- `minSdk 26`, `targetSdk 36`. 26 covers the devices students actually carry
  and clears the API floor every dependency here assumes.
- **OkHttp + kotlinx-serialization** for the API client. A Retrofit interface
  layer over an API this small is indirection without a payoff.
- **supabase-kt** (gotrue) for auth, session persisted in
  EncryptedSharedPreferences.
- **Room** for the cache, with an FTS4 index.
- Navigation via `androidx.navigation-compose`.
- `Theme` ported from `src/index.css` tokens and `ios/Synapse/Design/Theme.swift`
  — the same palette and type scale, and the same self-hosted families (Source
  Serif 4, Geist) the other two clients use.

## The contracts this app must port exactly

The API is shared with the web app and with iOS. Most of the risk in a second
client is not crashing — it is agreeing with the other clients *almost*. Each
item below fails quietly rather than loudly, so each gets a unit test.

| Contract | Source of truth | What a mismatch costs |
|---|---|---|
| `USER_OWNED_PATTERNS` | `src/lib/stateOwnership.ts` | A key routed to the shared catalogue store instead of `/api/user-state/:key`. The server refuses the write (student, not admin) or files it where the web never reads. A student's progress splits between phone and browser with no error on either side. |
| `localCopyWins` | `src/lib/statePrecedence.ts` | A local copy that wins by default lets an idle phone re-upload stale data over newer work done elsewhere. A local copy may only win when it can be *shown* newer. |
| `QBankScope` keys | `src/data/qbankScope.ts` | Scope keys are `t:<id>` for a whole topic and `s:<id>` for one subtopic, with `qt:` marking a topic the questions named rather than the library. A whole-topic selection must **also** match on lowercased title — without that fallback, a chapter the student can plainly see has questions in it returns an empty sitting whenever the questions are not cross-referenced to articles. |
| `LiveSession` | `src/pages/student/QuestionBank.tsx` | Stored at `synapse.qbank.activeSession.v1`, field for field. This record is the only thing carrying a half-finished sitting between web and phone; a renamed field silently drops the resume. |
| `AttemptRecord` and month sharding | `src/data/attempts.ts` | The raw event log every performance figure on both platforms is computed from. Shards are `synapse.progress.attempts.<YYYY-MM>` indexed by `synapse.progress.attemptIndex.v1`, and the month must come from **local** calendar fields — UTC files a late-evening answer for anyone east of Greenwich under the next month, in a shard the web app does not look in. |
| Catalogue key list | `STUDENT_READABLE_STATE` in `server/src/index.js` | Anything outside the set earns a 403, correctly. Those 14 documents are what the learning product is made of; everything else on the server is operational data. |

`ios/Synapse/Core/Sync/StateOwnership.swift` and its siblings are the existing
ports and are the closest reference for how faithful these need to be.

## Architecture

```
SynapseApi  ──►  SyncEngine  ──►  LocalStore (Room)  ──►  repositories (Flow)
 stateless        the only            the only                  │
                  network caller      read path                 ▼
                                                         ViewModels ──► Compose
```

**The UI reads from Room and only from Room.** No screen calls the network.
That single rule is what makes every surface work offline without knowing it is
offline, and it is what removes the loading spinner from every view. A screen
that reaches for the API is a bug in this design, not a shortcut.

### `SynapseApi`

A thin OkHttp + kotlinx-serialization client holding no cache and no state — a
port of `SynapseAPI.swift`. The Supabase access token goes out as a bearer, and
`server/src/auth.js` verifies it against the project JWKS. Identical to how the
web app and iOS authenticate.

Routes milestone 1 uses: `GET /api/session`, `GET /api/me`,
`GET /api/state/manifest`, `GET|PUT /api/state/:key`,
`GET|PUT|DELETE /api/user-state/:key`.

### `LocalStore` (Room)

Tables:

- `documents` — `key`, `json`, `serverUpdatedAt`, `savedAt`. Catalogue documents
  and user-owned documents, stored whole.
- `ledger_items` — the ledger shredded into typed rows (`id`, `kind`,
  `subjectId`, `title`, `raw`), so questions and practicals can be queried
  without parsing one large document per read.
- `ledger_fts` — an FTS index over title and searchable text.
- `outbox` — `key`, `json`, `savedAt`, `attempts`. Writes made offline.

Two deliberate deviations from the iOS store, both worth recording so a later
reader does not take them for mistakes:

- **FTS4, not FTS5.** Room exposes FTS4. Behaviour is equivalent for the
  prefix and token queries these surfaces run.
- **Encryption.** iOS gets file protection from the OS. On Android the cache
  lives in app-private internal storage, which is already inaccessible to other
  apps on a non-rooted device; the Supabase session goes in
  EncryptedSharedPreferences rather than the plain store.

### `SyncEngine`

`refresh()` — safe to call on launch and on every foreground:

1. `GET /api/state/manifest` — timestamps for all 14 catalogue keys, a few
   hundred bytes, so "nothing changed" costs one small request instead of a
   full download.
2. Fetch only the catalogues whose stamp moved.
3. Shred the content ledger into `ledger_items` and rebuild the FTS rows.
4. Pull the user-owned keys these surfaces read, applying `localCopyWins`:
   `synapse.qbank.activeSession.v1`, the rest of `synapse.qbank.*` (presets and
   previous sittings), `synapse.practical.*`, and
   `synapse.progress.attemptIndex.v1` with the shards for the current and
   previous month. Older shards are fetched on demand rather than on every
   sync — a year of study is not something a phone should pull to show a
   question.
5. Drain the outbox.

A 404 on the manifest falls back to fetching every catalogue, which is how sync
worked before that endpoint existed. That matters during rollout: the app can
reach internal testing before the server is redeployed without looking broken.

Writes never block on the network. A write goes to Room and to the outbox in
one transaction; the drain is idempotent per key, and a write made while a
drain is in flight must survive it — that is a test, not an assumption.

## Surfaces in milestone 1

### Auth
Sign in, sign up, password reset, session restore, and the `/api/session`
round-trip that proves the whole chain. When `SUPABASE_HOST` or
`SUPABASE_ANON_KEY` are missing the app builds and shows a "Not configured"
screen naming the setup step, so a fresh clone never fails to compile.

### Shell
Bottom navigation: Question Bank, Practical, Account. Small on purpose —
Library and the rest arrive in later milestones and the nav grows with them.

**Account** is deliberately thin in this milestone: who you are signed in as,
the sync status (last successful refresh, and how many writes are still waiting
in the outbox), and sign out. The outbox count is not a debug affordance — it is
the honest answer to "is my work saved?", and a student on a ward deserves to
see it.

### Question Bank
Topic chooser over `ChooserTopic` (topic with its subtopics), presets, and a
builder choosing mode and count. **Tutor** explains after each question;
**timed** runs a clock and explains at the end. The difference is not cosmetic —
in tutor mode the explanation is the point, in timed mode showing it defeats the
rehearsal.

The runner shows options with per-option rationales, the explanation, and
references back to library articles. The navigator carries five states —
`answered`, `correct`, `wrong`, `omitted`, `unseen`. `omitted` (reached, left,
moved past) stays distinct from unseen: folding them together hides exactly the
questions a student most needs to return to. Where the student *is* is tracked
separately, because it is a different fact on a different axis.

Results, previous sittings, and resuming a sitting started on the web.

### Practical
The five formats — OSCE station, clinical case, lab interpretation, imaging
interpretation, skills checklist — are one content kind with different blocks
filled in, so `type` decides what the reader renders rather than there being a
screen per type. Tickable mark sections, staged decisions, lab and imaging
questions with reveal, debrief, references.

Self-ticked work writes `correct = null`, never `false`. Nobody marked it; null
is not the same as wrong and accuracy must not count it either way.

### Attempts
Both surfaces append `AttemptRecord`s to the month shard and update the index,
through the outbox like any other write.

## Configuration

`android/secrets.properties` (gitignored) → `BuildConfig`, with a committed
example file:

```
SUPABASE_HOST=...        # no scheme, no trailing slash
SUPABASE_ANON_KEY=...
API_BASE_URL=https://...
```

The publishable **anon** key only. The service role key bypasses every
row-level security policy and must never ship in a client.

## Language

English UI chrome, matching iOS. Content carries its own direction, so Arabic
articles and questions render correctly per item. A fully bilingual, RTL Android
UI is a later milestone with proper string extraction — a half-localised app is
worse than an honestly English one, and doing it properly should happen on both
platforms together.

## Testing

Unit tests over the quiet-failure surface, mirroring what the iOS suite covers:

- key routing against the web app's rules, including every pattern;
- precedence between a local edit and the server's copy, in both directions;
- scope expansion, and the whole-topic title fallback;
- `LiveSession` JSON round-trip against a sample produced by the web app;
- month sharding across timezone boundaries;
- a write made while the outbox is draining is not lost.

## Not in this milestone

Library and the reader (including ink annotation), Dashboard, Performance,
Calendar, Notebook, Whiteboard, Study Together, Resources, push notifications
(`/api/devices`), and the admin console. Android is student-only, as iOS is.

## Toolchain

No Android toolchain exists on the development machine. Android Studio is
installed by hand (it bundles a JDK, the SDK manager and an emulator) before
anything can be compiled or run. The project is scaffolded to open cleanly in
Studio with no further setup beyond `secrets.properties`.
