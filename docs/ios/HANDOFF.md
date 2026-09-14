# iOS port — HANDOFF

Masterbrain handoff for the native iOS student app (**nishany**). Admin stays web; this is the student portal only.

## Production release track (approved plan: `~/.claude/plans/rippling-tumbling-bonbon.md`)
Full-parity + social production App Store release. Phase 0 (correctness blockers) status:
- **0.1 sync-key rebrand** `synapse.*`→`nishany.*` — DONE (staleness sync restored).
- **0.2 402 / paywall** — DONE (`APIError.paymentRequired`, `PaywallView`, `SyncEngine.subscriptionRequired`, `fullScreenCover` over paid tabs).
- **0.4 nishany build identity** — DONE (main already carried `com.nishany.app` / "Nishany"; my redundant rebrand reconciled during the rebase).
- **0.5a video→external-open**, **0.5b QBank offline cold-launch cache (G2)** — DONE (+ `LocalStore` v3-userdoc migration, `QBankOfflineTests`).
- **0.3 production repoint** — API half DONE + verified live. The old `synapse.doitrous.com` is retired (503); the live API is **nishany.com**, set in `Base.xcconfig`. The existing Supabase project (`ofifilywalzynftcctrn`) already pairs with production — the dev login (q@hotmail.com/000000) signs in and loads the Today screen live against nishany.com. Remaining 0.3: confirm this is the intended *production* Supabase (vs a separate prod project) with Omar, and get a non-test prod login for full-tier verification.
- **Rebased onto `origin/main` @ cd6319a19** (2026-09-14): 28 iOS commits replayed, my 0.4 taken as `--ours`/reconciled, force-pushed-with-lease. Next: Phase 1 (complete existing surfaces) → 2 (new study screens) → 3 (social/native voice) → 4 (IA+launch). Note main already shipped a Today-tab redesign that supersedes part of the Phase 4 IA plan.

### Live verification against production (2026-09-14)
Signed in on the sim against **nishany.com** with the dev account q@hotmail.com/000000. Confirmed live: the nishany rebrand (sign-in wordmark), the Today screen, the Notebook rich editor round-trip, and — because **this account's trial has lapsed on production** — the **402 paywall (Phase 0.2)**: tapping a paid tab (Library) shows "Full access has ended" cleanly (not a "couldn't reach server" error), and "Browse free features" returns to Today with the free tabs usable. **Consequence:** every *paid* surface (Library/Resources, Question Bank, Flashcards) is now behind the paywall for this account, so paid-surface UI can no longer be visually verified on the sim. **This is the Omar-gated half of plan 0.3** — a **subscribed / non-test production login** is needed to verify paid surfaces live (and to confirm `ofifilywalzynftcctrn` is the intended prod Supabase). Until then, paid-surface changes are test/compile-verified only.

### Phase 1 progress
- **Resources catalogue polish — partial (audit items 7 + 9).** Type filter chips (Book/Guideline/Deck/Article/Video) with live counts (shown only when >1 kind present) + the author's recorded location shown inline on a reference-only (no-file) row, mirroring the web. `Features/Library/ResourcesView.swift`. Test/compile-verified; visual sim check blocked by the paywall above. **Still pending:** subject/university/year filters and web's dual-axis System/Module two-level grouping — both need new fields on `LibraryResource`/the ledger projection (`modules: [String]`, university/year restriction) plus content variety to verify (audit items 7-remainder + 8).
- **Notebook rich-text editor — DONE + verified live.** Native inline bold/italic/underline/strike over the lossless Lexical model. `Features/More/RichTextEditor.swift` (a `UITextView` bridge with a B/I/U/S input-accessory toolbar — iOS-18 target, so not the iOS-26 attributed `TextEditor`), `Core/Notebook/RichText.swift` (`NotebookRichText`: `NSAttributedString` ↔ Lexical `editorJson`, marks → text-node `format` bitfield 1/2/4/8), `NotebookDoc.applyingRichEdit`, `Theme.uiFont`. Used only for `isSimple` notes; notes with headings/lists/tables keep the plain editor + notice so unmodeled structure is never flattened. `NotebookEditorTests.richMarksSurviveTheAttributedRoundTrip` guards the bitfield round-trip. Verified on the sim: created a note, bolded a run, saved to nishany.com, reopened — the bold survived the save/reload round-trip. **Later (Notebook polish):** in-place editing that preserves unmodeled blocks (edit text around a table/list without flattening); block types (headings, lists) in the native editor.

## Where the work lives
- Branch: **`claude/cortex-ios-port-79b661`** (pushed to origin). **Push is over SSH**: the remote is `git@github.com:omary98/synapse.git` and the account's key is `~/.ssh/id_hetzner` — a non-default name that is *not* loaded in the agent, so a bare `git push` fails with `Permission denied (publickey)`. Push with `GIT_SSH_COMMAND='ssh -i ~/.ssh/id_hetzner -o IdentitiesOnly=yes' git push origin <branch>`, or have Omar run `ssh-add ~/.ssh/id_hetzner` once. iOS app in `ios/`, web reference in `src/`, Express API in `server/`.
- Build in a **dedicated worktree**, not the main checkout (content lanes reset it). This branch touches only `ios/` and `docs/ios/` — content lanes touch `docs/`, `scripts/kasr/`, batches — so a rebase onto `origin/main` is clean.

## Baseline / how to build + test
- **iOS: 647 tests pass** (was 633). Server: 385 pass.
- Build+test: `xcodebuild test -project ios/Synapse.xcodeproj -scheme Synapse -destination 'platform=iOS Simulator,id=643D5D39-4A1F-469B-AEDA-5AFDDE97BCAE'` (sim **Nishany-QA**, OS 26.5; there is no "iPhone 17" sim on this machine). **Never pass `CODE_SIGNING_ALLOWED=NO`** (breaks Keychain → silent 401). ~1–4 min.
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
- **Resources "My uploads"** (`2246f08b`) — the personal document locker over the chunked `/api/my-documents` REST contract (`SynapseAPI` list/create/upload-chunk/complete/rename/delete/download; `MyDocumentStore`; `MyUploadsView` reached from a Resources toolbar button). List + upload (PhotosPicker / fileImporter) + rename + delete + usage. **Verified live** (this session): uploaded a photo → appeared as "Photo · 4.1 MB", usage bar updated.
- **Open an uploaded document** (`958e7cf9`) — tapping a My-uploads row downloads the file (bearer-authed) and previews it in `QLPreviewController` (PDF paging / image zoom / share/print), completing the upload→open loop. `MyDocument.previewExtension` gives the extensionless download the right extension so QuickLook renders it instead of raw bytes; `DocumentPreviewLoader` parks it under a safe, id-keyed, extension-carrying temp URL (cached for the session). Verified live: uploaded a photo, opened it, image rendered correctly. **Still to do for Resources:** the `ResourceFileStore.swift:61` video→`.pdf` bug (a `.video` resource still downloads as a PDF).
- **Notebook — lossless rich-text note model** (`cca57872`) — the "rich-text editor" work, **Phase 1**. The web notebook is a full **Lexical** editor: a note's real content is `editorJson` (+ `plainText`/`legacyMarkdownSource`/`revision`), with pasted media in `imageDocumentId` and freehand ink in `drawing`. The iOS `Note` struct modelled **none** of those — so, because the notebook is one array rewritten whole, editing any note on the phone **stripped rich-text + ink from every note on the web** (the exact loss `NotebookView`'s own doc-comment warned about), and could even fail to decode a modern note since the web's save payload omits `body`. Now: `Note` carries every web field (`editorJson`/`drawing` as opaque `JSONValue` — reuses `Core/Model/JSONValue.swift`), `body` is optional, and the web's text helpers are ported faithfully to `Core/Notebook/NotebookDoc.swift`. The editor reads via `notePlainText` and saves via `applyingEdit` (regenerates `editorJson`/`plainText`, bumps `revision`, preserves ink/refs/images), and shows a banner before it simplifies a web-formatted note rather than flattening it silently. A decode→encode round-trip test guards the invariant. Verified live: create/edit/save a note; the Notebook loads and the preview reads the modern fields.

## Fixed
- **`SynapseAPI` concurrent-request crash** (`923807fa`) — `lastDiagnostic`/`lastTokenError` were unlocked `nonisolated(unsafe)` statics assigned from concurrent `send()` fan-outs, double-freeing the Optional's buffer (`_swift_release_dealloc` / EXC_BAD_ACCESS). Now serialized behind an `NSLock`; `APIConcurrencyTests` is a TSan regression guard. This was also what made the test-host crash at bootstrap and the app launch blank intermittently.

## Next, in order
1. **Widgets + focus timer** — BLOCKED on a new Xcode extension target (objectVersion-77 pbxproj; risky to add by hand). Needs a one-time Xcode "New Target → Widget Extension + App Group" from Omar; then build the shared snapshot + widgets + ActivityKit focus timer on top.
2. **Question Bank images** — the media model + `MediaFileStore` (auth'd `/api/media/:id`) + rendering. NOTE: the KAU-Y1 test cohort has **zero** questions with images (checked the ledger), so this is a blind/unit-tested build until content has one.
3. **Notebook rich-text editor — DONE** (bold/italic/underline/strike; see the Phase 1 progress section above). Remaining notebook polish: block types (heading h1–h4, quote, bullet/numbered/check lists) in the native editor, and in-place editing that preserves unmodeled blocks (tables/images/HR) rather than the current `isSimple` plain-editor fallback. Web reference: `src/components/notebook/NoteEditor.tsx` (Lexical).
4. **Wave-2 audits+build**: University, Essay Questions, Maristanas, Minigames. (Calendar + Medical Taxonomy already exist on iOS.)
5. **Flashcards polish**: Browse/stats, GRDB offline cache, audio/occlusion authoring, rich-text rendering. Plus QBank offline cold-launch fallback (bug G2) + question-media rendering.
   - Widgets detail when unblocked: App Group + a shared Codable snapshot the app writes on sync; widgets for Today/Flashcards-due (`FlashcardStore.entries` is `nonisolated` for this) / Everyday Question; Focus timer as an ActivityKit Live Activity (`Features/Reader/StudyTimer.swift` to generalize).

## Rules
Small commits, explicit `git add ios/`. Rebase + re-fetch `origin/main` before every push. Never touch `package.json` or `scripts/kasr/`. Verify UI on the simulator (q@hotmail.com/000000).
