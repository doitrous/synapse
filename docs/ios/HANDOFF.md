# iOS port — HANDOFF

Masterbrain handoff for the native iOS student app (Connect Cortex). Admin stays web; this is the student portal only.

## Where the work lives
- Branch: **`claude/cortex-ios-port-79b661`** (pushed to origin; 9 commits on top of `origin/main`). iOS app in `ios/`, web reference in `src/`, Express API in `server/`.
- Build in a **dedicated worktree**, not the main checkout (content lanes reset it). This branch touches only `ios/` and `docs/ios/` — content lanes touch `docs/`, `scripts/kasr/`, batches — so a rebase onto `origin/main` is clean.

## Baseline / how to build + test
- **iOS: 603 tests pass** (was 507). Server: 385 pass.
- Build+test: `xcodebuild test -project ios/Synapse.xcodeproj -scheme Synapse -destination 'platform=iOS Simulator,name=iPhone 17'`. **Never pass `CODE_SIGNING_ALLOWED=NO`** (breaks Keychain → silent 401). ~1–4 min.
- `Secrets.xcconfig`: copy from the main checkout (`cp <main>/ios/Config/Secrets.xcconfig ios/Config/`). node_modules + `server/node_modules`: symlink to the main checkout.
- Sim login: **q@hotmail.com / 000000**.

## Done this session
1. **Navigation IA** (`92798bc5`) — daily-driver tabs: **Today · Questions · Flashcards · Library · More**. New `FlashcardsView` placeholder; Resources moved to a folder button in the Library toolbar. (Omar's decision.)
2. **Flashcards data + store layer — COMPLETE** (`6f919270`, `7fbe5e53`, `71c2af6e`, `9aa7422f`, `bb211ba1`, `9d81fc39`), all under `ios/Synapse/Core/Flashcards/`, each pinned to the web's own `*.test.ts`:
   - `CardSchedule` + `SM2Scheduler` + `LocalDay`; `Scheduler` protocol + `FSRSScheduler` (matches published FSRS-5 reference values); `FlashcardModel` (notes/cards/collection, JSON round-trips byte-for-byte); `ClozeParser` + `CardGen`; `FlashcardActions` + `FlashcardStatus` + `FlashcardQueue`; `FlashcardStore` (@MainActor @Observable, user-state sync).
3. **Audit** (`e2712d52`) — `docs/ios/audit/`: PARITY-MATRIX + specs for flashcards, offline-questions, resources-editor, whiteboard.

## Decisions on record (Omar)
- Nav IA = daily-driver tabs (above).
- **Resources** = full web parity (catalogue + "My uploads" file locker + flawless PDF annotation) **PLUS a new in-app rich-text editor** (beyond web).
- Download policy = Wi-Fi-only default + manual override (my call, revisable).
- Build a **shared "My Documents" chunked-upload client** — unblocks Resources uploads AND Whiteboard images.

## Gotchas (learned the hard way)
- **Simulator input injection needs a full ⌘Q quit+reopen of the Claude app** to take effect (Accessibility TCC). Screenshots work without it; taps/typing silently no-op until the restart. After restart, login flow works (tap 200,306 email / 200,371 password / 200,447 sign-in in the 402×874 pt space; verify focus by screenshot — caret blinks).
- **Subagents stall on a 600s no-output watchdog** — 3/3 code-port agents AND 1 audit agent died this way. Build code ports **yourself** in small committed slices. (Wave-1 audits happened to succeed, but don't rely on it.)
- **Type-name collisions**: web `Note`→iOS **`FlashcardNote`** (Notebook has `Note`); web `ShapeKind`→**`OccluderShapeKind`** (Reader has `ShapeKind`). Grep new type names against the module first.
- **Synced payload fidelity**: `CardMeta`/`ReviewEvent` use a custom `encode(to:)` to write explicit `null` (not omitted) like the web; SM-2 `CardSchedule` omits `stability`/`difficulty`. Reuse `ISO8601DateFormatter.synapse` (+ `.read`) so `due` round-trips with JS `toISOString()`.
- **Cloze** uses `NSString`/`NSRegularExpression` (UTF-16 offsets) to match JS string semantics.
- `Synapse/` is a synchronized file-system group — new files under it are auto-added to the app target. A **new extension target (widgets) is NOT** — that's a real `.pbxproj` change.

## Flashcards — feature-complete for this scope (verified on the sim)
Study-loop UI, Basic + **Cloze** authoring and rendering, the **FSRS opt-in deck toggle**, and **provided (catalogue) decks** are all shipped and verified live (create deck → add Basic/Cloze card → study with correct SM-2 *and* FSRS intervals → grade/advance/session-complete). `FlashcardStore` reads through a merged view (own collection + provided decks). Files: `Core/Flashcards/*`, `Features/Flashcards/*`, `Core/Flashcards/DeckProjection.swift`, `ContentKind.deck`.

**Remaining Flashcards polish (later):** Browse/stats view, GRDB offline cache (flashcards.md §4.2), card audio + image-occlusion authoring, rich-text rendering (currently HTML is stripped to plain text in `FlashcardStudyView.plain/unhtml`), quick-add from Question Bank/Reader. No catalogue decks exist for the KAU Y1 test cohort, so the provided-deck path is unit-tested and will show a "Shared" deck once one is published.

## Shipped since (wave-1)
- **Question Bank pull-to-refresh** (`d89bffb1`) — the audit's missing-refresh gap.
- **Whiteboard sync fix** (`21a624cb`) — iOS now reads/writes the live `synapse.whiteboard.boards.v1` multi-board document and **preserves every element type** (ink/images/files/ready-items) it doesn't render, so a phone save never strips a web board. Legacy single-board drawings migrate on first load. Verified live: a legacy board migrated and the edit wrote `boards.v1` (`migratedFromSingleBoard:true`) — confirmed in the outbox.
- **Resources "My uploads"** (`2246f08b`) — the personal document locker over the chunked `/api/my-documents` REST contract (`SynapseAPI` list/create/upload-chunk/complete/rename/delete/download; `MyDocumentStore`; `MyUploadsView` reached from a Resources toolbar button). List + upload (PhotosPicker / fileImporter) + rename + delete + usage. Build + 623-test suite green; live UI screenshot was blocked by the sim host crashing (the race above — now fixed). **Still to do for Resources:** the in-app rich-text editor Omar asked for, and opening/previewing an uploaded doc (download API exists; needs a QuickLook screen). The `ResourceFileStore.swift:61` video→`.pdf` bug is still open.

## Fixed
- **`SynapseAPI` concurrent-request crash** (`923807fa`) — `lastDiagnostic`/`lastTokenError` were unlocked `nonisolated(unsafe)` statics assigned from concurrent `send()` fan-outs, double-freeing the Optional's buffer (`_swift_release_dealloc` / EXC_BAD_ACCESS). Now serialized behind an `NSLock`; `APIConcurrencyTests` is a TSan regression guard. This was also what made the test-host crash at bootstrap and the app launch blank intermittently.

## Next, in order
1. **Widgets + focus timer** — BLOCKED on a new Xcode extension target (objectVersion-77 pbxproj; risky to add by hand). Needs a one-time Xcode "New Target → Widget Extension + App Group" from Omar; then build the shared snapshot + widgets + ActivityKit focus timer on top.
2. **Question Bank images** — the media model + `MediaFileStore` (auth'd `/api/media/:id`) + rendering. NOTE: the KAU-Y1 test cohort has **zero** questions with images (checked the ledger), so this is a blind/unit-tested build until content has one.
3. **Resources polish** (My uploads itself shipped, see above) — the in-app rich-text editor Omar asked for; open/preview an uploaded doc via QuickLook (`SynapseAPI.downloadMyDocument` exists); the `ResourceFileStore.swift:61` video→`.pdf` bug.
4. **Wave-2 audits+build**: University, Essay Questions, Maristanas, Minigames. (Calendar + Medical Taxonomy already exist on iOS.)
5. **Flashcards polish**: Browse/stats, GRDB offline cache, audio/occlusion authoring, rich-text rendering. Plus QBank offline cold-launch fallback (bug G2) + question-media rendering.
   - Widgets detail when unblocked: App Group + a shared Codable snapshot the app writes on sync; widgets for Today/Flashcards-due (`FlashcardStore.entries` is `nonisolated` for this) / Everyday Question; Focus timer as an ActivityKit Live Activity (`Features/Reader/StudyTimer.swift` to generalize).

## Rules
Small commits, explicit `git add ios/`. Rebase + re-fetch `origin/main` before every push. Never touch `package.json` or `scripts/kasr/`. Verify UI on the simulator (q@hotmail.com/000000).
