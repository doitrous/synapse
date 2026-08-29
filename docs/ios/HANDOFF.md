# Connect Cortex iOS — handoff

You are picking up a native **iOS app** for Connect Cortex, a medical learning
platform for undergraduate medical students at Egyptian universities. This
document is everything a fresh session needs to continue without re-discovering
it.

---

## The mission (new instructions, this is the job)

Bring the **student** experience of the website to the iPhone app in full. The
admin console stays web-only — never build admin surfaces on iOS.

1. **Audit the current website's student features**, then implement *every*
   student function, feature and button in the iOS app.
2. **Offline questions.** Students must be able to download the question bank and
   study it with no connection.
3. **Navigation.** The pages must be easy to move around — this is a first-class
   requirement, not polish.
4. **Resources document editor** must work flawlessly and smoothly. **Whiteboard**
   too.
5. **Flashcards** must have ALL current web features, including **FSRS**
   scheduling and everything around it.

Working method the user asked for: **you are the masterbrain (Opus); dispatch
Sonnet subagents as the manpower.** They execute; they come back to you when
blocked. Keep an activity board and give the user a plain-language synthesis.
(The Agent tool is explicitly authorised for this work.)

---

## Ground truth: where the code is, and a warning

- **Repo:** `/Users/doitrous/Documents/CodexGPT/Codex-Synapse continue on Claude/ClaudeSynapse`
- **All iOS work is committed and in `origin/main`** — 25 commits, ported feature
  by feature. `git log origin/main --grep "Co-Authored-By: Claude"` finds them.
- **⚠️ The local checkout is a shared battlefield.** Five+ content-extraction
  lanes push to `main` constantly (hundreds of docs commits). This checkout has
  been reset to `origin/main` mid-task and **dropped my commits twice** (both
  recovered from reflog). The local branch `codex/review-existing-work` is
  **stale** — do not trust `HEAD`. There is also uncommitted drift in
  `server/`, `package.json`, `scripts/` that belongs to **other lanes, not iOS**.
  - **Do this first:** get a clean tree at `origin/main` in a **dedicated git
    worktree** so a concurrent reset can't reach you. All iOS work is at
    `origin/main`; the iOS files on disk here also already contain it.
  - **Never `git add -A`.** Stage explicitly: `git add ios/`. My clean history
    exists *because* every commit used explicit paths.
  - **Re-fetch and rebase onto `origin/main` before every push.**
  - **Do not touch `package.json` or `scripts/kasr/`** — the content lanes have a
    standing rule, and `package.json` edits while lanes are unmerged break them.

### Worktree note (from project memory)
A fresh worktree starts with an **empty `node_modules`**; symlink it to the main
checkout so `tsc`/`vite` work. `oxlint` alone never typechecks.

---

## Build, test, run

- **Project:** `ios/Synapse.xcodeproj`, scheme `Synapse`, bundle `com.synapse.app`,
  **deployment target iOS 18.0**, `TARGETED_DEVICE_FAMILY = 1,2` (iPhone + iPad).
- **Scratch dir** (use for DerivedData, screenshots, logs — not `/tmp`):
  the session's own scratchpad path.
- **Build:**
  ```
  xcodebuild build -project ios/Synapse.xcodeproj -scheme Synapse \
    -destination 'platform=iOS Simulator,name=iPhone 17 Pro' \
    -derivedDataPath <scratch>/DerivedData
  ```
- **Test:** same with `test`. **Baseline: 507 iOS tests in 80 suites, all green.**
  Server: `cd server && npm test` → **241 tests**. Run both after any change that
  touches shared behaviour. Full test builds can exceed 10 min — run in
  background and poll the log, don't let a foreground call time out.
- **Simulators already set up:**
  - iPhone 17 Pro — `6F165190-0F92-480E-A04C-6B97D16FE3D2` (primary, ~393pt wide)
  - iPhone 17 Pro Max — `BF5B2E03-1330-4B8A-9212-021F29E7CB7E` (**1320×2868**, the
    App Store 6.9" size; ~440pt wide — recompute tap coords for it)
  - iPad Air 11" — `BB9F6A84-9859-451F-9F35-8A6E3EF9677A`
- **Drive it** with the iOS Simulator MCP (`mcp__Claude_Code_iOS_Simulator__control`):
  `attach` first, then build/`launch`, then `screenshot`/`tap`/`text`. Install a
  fresh build with `xcrun simctl install <udid> <app>` then `launch`.
- **Live test student:** `q@hotmail.com` / `000000` — a real Kasr Alainy Year 1
  account with data. **Password `000000` must be rotated before real students;
  don't let it become anyone's real password.** Don't delete this account (the
  delete flow is built and verified up to the final tap — never press it on this
  account).

### Config / secrets
- API: `https://synapse.doitrous.com/api` (`API_HOST` in `ios/Config/Base.xcconfig`).
- Supabase project `ofifilywalzynftcctrn.supabase.co`; the anon key is
  publishable and safe in the app. Real values live in
  `ios/Config/Secrets.xcconfig` (**gitignored**) — a fresh clone still builds and
  shows a "not configured" screen instead.
- Production is **Express** (`server/src/index.js`), not nginx; to know how a URL
  is served, check the live URL. Shipping = landing on `main`; Coolify builds it.
- Direct prod DB writes go through the tunnel `10.0.1.11:3306` (content-lane
  workflow; iOS work rarely needs it).

---

## Design system (already implemented in `ios/Synapse/Design`)

**Connect Cortex**, two-hue brand. Primary = cortex crimson `#d13a63` (action);
accent = cortex blue `#1553b3` (structure — concept terms, sources, the answered
marker). Three themes: light `#f5f7fb`, warm `#f7f2ea`, dark `#0d1117`, all as
the same tokens (`Theme.token(light:warm:dark:)`). Liquid Glass is additive
behind `if #available(iOS 26, *)` with `.ultraThinMaterial` fallback; the app
must be complete and handsome on iOS 18. Motion: ease-out-quint, transform-only
entrances, `.screenIn(tab)`; honours reduce-motion.

**Storage ownership rule (critical):** dotted keys (`synapse.progress.*`,
`synapse.library.*`) are **student-owned and synced**; hyphenated keys
(`synapse-adaptive-config-v1`) are **admin-authored, read-only** catalogue.
A hyphenated key written from the app is refused by the server. `SyncEngine`
(`ios/Synapse/Core/Sync`) is the only thing that talks to the network; every
screen reads `LocalStore` (GRDB/SQLite) — which is why the app already works
offline for what it has cached.

---

## What the iOS app has today

**Shell:** 5 tabs — Today (Dashboard), Library, Questions, Resources, More.
More holds: Adaptive Study, Calendar, Practical, Medical taxonomy, Notebook,
Whiteboard, Study together, Progress (Performance), Billing, Account.

**Built and verified:**
- **PDF reader/editor** — 10 annotation tools, ruler, page thumbnails, search,
  sharded annotations, movable/collapsible panels.
- **Question Bank** — modes (tutor/timed), flags, notes, resume, chooser,
  previous tests, navigator. Reads cached questions → already works offline for
  cached content, but there is **no explicit "download for offline" flow yet**.
- **Review queue + mastery ledger** (the spaced-review model).
- **Adaptive Study** — 6 panels (Today/Practice/Readiness/Concepts/Plan/How),
  full model ported: config, blueprint, coverage, priority, allocation,
  readiness, schedule (weekly plan), crash horizons.
- **Performance** analyses; **Practical** progress; **Calendar** (list, not grid);
  **Notebook** (title/body only — no block editor / pasted images); **Whiteboard**
  (basic pan/zoom/add-note/link — needs the smoothness + editing work);
  **Study Together** with review; **Resources** (read tracking, personal tags,
  FTS5 search, evidence drawer).
- **Study Assistant** — chat sheet, per-plan quota, entry points on Today /
  Library / Question Bank / More; bilingual.
- **Account** — cohort, theme, language (EN/AR), reminders + timezone, sync
  state, **account deletion** (App Store 5.1.1(v), server + iOS, one transaction),
  sign out.
- **APNs** — silent sync nudge (server `push.js` + iOS `PushRegistrar`), no
  permission prompt, debounced, `aps-environment` entitlement present.
- **Arabic** — RTL mirroring, ~235 translatable strings, 60 already translated;
  all 16 sheets re-apply direction via `.localisedSheet()`. Remaining strings for
  a native speaker: `docs/ios/arabic-to-translate.md` (175, grouped by screen).
- **Brand** — wordmark + app icon in an asset catalog
  (`ios/Synapse/Resources/Assets.xcassets`). Icon is a **placeholder** upscaled
  from a 256px favicon; needs a designed 1024 original (no vector source exists in
  the repo — must come from whoever supplied the mark).

---

## The gap: student web surfaces vs iOS

Student nav is defined in `src/components/shell/nav.ts`. Full list and status:

| Web surface | iOS status |
|---|---|
| Dashboard | ✅ (Today) |
| University | ❌ **missing** |
| Calendar | ⚠️ list only — needs month/week grids + block editor |
| Library | ✅ |
| Question Bank | ✅ — **needs explicit offline download flow** |
| Adaptive Study | ✅ |
| Practical | ✅ |
| Essay questions | ❌ **missing** |
| Resources | ✅ read — **doc editor must be verified/made flawless** |
| Medical Taxonomy | ✅ |
| Performance | ✅ (Progress) |
| Build Maristanas | ❌ **missing** (landed on web very recently) |
| Whiteboard | ⚠️ basic — needs editing UI + smoothness |
| Notebook | ⚠️ no block/markdown editor, no pasted images |
| Flashcards | ❌ **missing — FSRS, full feature set required** |
| Minigames | ❌ **missing** |
| Study Together | ✅ |
| Account | ✅ |
| Billing | ✅ |

**Missing entirely:** University, Essay questions, Build Maristanas, Flashcards,
Minigames. Several of these (Flashcards, University, Essay questions, Maristanas,
Minigames) **landed on the web in commits that were rebased in recently** and
have never been looked at for iOS — audit them fresh, don't assume.

---

## The explicit asks, with pointers

1. **Offline questions.** Web caches nothing special; iOS already stores questions
   in `LocalStore` (GRDB) via `SyncEngine.pullAttempts`/catalogues. What's needed
   is a deliberate **"download this scope for offline"** action + a visible
   offline state + an offline sitting that doesn't try the network. Start:
   `ios/Synapse/Core/Sync/SyncEngine.swift`, `Core/Store`, the Question Bank
   feature.
2. **Flashcards + FSRS.** New to iOS. Web lives in `src/components/flashcards/`
   (`CardRunner.tsx`), `src/lib/useDecks.ts`, admin `DeckEditorDialog.tsx`, and
   an FSRS implementation (grep `fsrs|stability|difficulty|retrievability`).
   **Port the FSRS formulas exactly** — capture parameters, grade handling,
   interval math precisely; this is the kind of thing that must match the web to
   the decimal or a card written on one device schedules wrong on the other.
   Note the storage keys and student-owned vs admin-authored split.
3. **Resources document editor.** Verify the current iOS reader/editor
   (`ios/Synapse/Features/Reader`, `Resources`) against the web and make it
   smooth. Web: grep `resource|annotation|pdf`.
4. **Whiteboard.** `ios/Synapse/Features/More/WhiteboardView.swift` is basic.
   Web: grep `whiteboard|board|canvas`. Needs editing + smoothness.
5. **Navigation.** With this many surfaces, 5 tabs + a flat More list won't hold.
   Rethink IA — likely grouped sections, search, quick access to study surfaces.

---

## App Store status (context; mostly the user's to finish)

**Done:** account deletion, privacy manifest (`ios/Synapse/Resources/PrivacyInfo.xcprivacy`),
wordmark, placeholder icon, 6 screenshots at 1320×2868 (`docs/ios/screenshots/`),
store listing draft (`docs/ios/app-store-listing.md`), privacy policy draft
(`docs/ios/privacy-policy-draft.md`).

**Open blockers (user):**
- **Privacy policy URL + support URL don't exist** — `src/router.tsx` has no
  `/privacy`, `/terms`, `/support` route; they fall through to the catch-all and
  only return 200 because it's an SPA. Both must resolve before submission.
- Designed 1024 app-icon original (current is a placeholder).
- Demo account for App Review; copyright/version fields.
- **iPad decision:** support is declared but the layout is a narrow column in a
  lot of white. Either design for iPad or drop to iPhone-only before review (Apple
  reviews on iPad if you declare it).
- Apple Developer account exists and is approved (user confirmed).
- No physical-device run yet; **silent-push delivery is unverified** (`simctl
  push` doesn't exercise the background path — needs a real device).

---

## Hard-won gotchas (don't relearn these)

- **`plutil -extract KEY FILE` without `-o -` overwrites FILE** with the extracted
  value. It destroyed a built `Info.plist` and I misread the result as a bug.
  Always `plutil -extract KEY xml1 -o - FILE`.
- **SwiftUI `Image("name")` resolves only through an asset catalog.** Loose bundle
  PNGs work with `UIImage(named:)` but render blank in `Image`. Adding a catalog
  then forces Xcode to require an `AppIcon` set.
- **Sheets don't inherit `layoutDirection`** (they do inherit other environment
  values), so Arabic text came out in an LTR layout. Every sheet uses
  `.localisedSheet()` — keep that on any new sheet.
- **Stock SwiftUI `Toggle` has rendered-but-untappable three times in this
  codebase.** When a control looks right but takes no taps, replace it with a
  tappable `Button` row (see the reminders rows, resources filter, question-bank
  footer). Verify controls actually respond on device.
- **Edit-overlay vs disk:** tool edits have occasionally missed the file that
  `node`/`swift` actually run. Verify with `git diff`/`grep` before trusting a
  change, especially when a Bash edit and a tool edit touch the same file.
- **A failed Bash tool call leaves no trace in the files** — three edits silently
  didn't apply once because the call errored before running. Re-grep to confirm.
- **Console is unreachable** for an app launched from the home screen in this
  simulator; breadcrumb to `UserDefaults` and read it from
  `xcrun simctl get_app_container <udid> data`/Library/Preferences.
- **Simulator keychains are per-device encrypted** — you can't copy a signed-in
  session between simulators; sign in on each.
- **Concept popovers light up nothing on live content:** only 55 of 1816 concepts
  are `active` and none of their labels match article prose. That's editorial
  (needs aliases), not a code bug. The web behaves the same.
- **`@Observable` needs iOS 17**, so 17.0 is the true deployment floor if you ever
  drop below 18.

---

## Suggested first moves for the new session

1. Read this file, then get a clean `origin/main` **worktree** (see the warning).
2. Confirm baseline: build + full test suite green (507 iOS / 241 server).
3. Fan out Sonnet audit subagents (one per unknown surface) to produce a parity
   matrix and a per-feature port spec — write them under `docs/ios/audit/`.
   Priority unknowns: **Flashcards/FSRS, offline-questions design, Resources
   editor, Whiteboard**, then University / Essay questions / Maristanas / Minigames.
4. Decide the new navigation IA before building screens into the old 5-tab shell.
5. Implement in waves; verify each on the simulator against the live account;
   small commits with explicit `git add ios/`; rebase before push.

Baseline at handoff: **507 iOS tests, 241 server tests, all green**, latest iOS
commit `eba7f15` ("Draft what we would have to promise about a student's data").
