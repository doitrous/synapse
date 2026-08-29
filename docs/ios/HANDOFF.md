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

## Next, in order
1. **Flashcards study-loop UI** (needs the sim → do the ⌘Q restart first). Replace the `FlashcardsView` placeholder: deck list (`store.decks`, `store.counts`), study loop (reveal → 4 grade buttons showing `scheduler.preview` intervals → `store.grade`), add-card (Basic+Cloze), FSRS toggle in deck options. Wire `FlashcardStore(api:sync:)` in `FlashcardsView`, `.task { await store.load() }`. See `docs/ios/audit/flashcards.md` §4.3 build order.
2. **Provided decks** — `ContentKind.deck` + `LedgerDecoder` extension (`ios/Synapse/Core/…/ContentItem.swift`) so catalogue decks appear.
3. **Widgets + focus timer** (Omar request, no audit yet — do it yourself): Widget Extension target + App Group + a shared Codable "snapshot" the app writes on sync; widgets for Today/Calendar, Flashcards-due (`FlashcardStore.entries` is `nonisolated` for this), Everyday Question, Focus timer (ActivityKit Live Activity; `Features/Reader/StudyTimer.swift` exists to generalize).
4. **Later flashcards**: Browse/stats, GRDB offline cache (§4.2), audio/occlusion authoring.
5. **Other wave-1**: QBank question-images (`MediaFileStore` clone of `ResourceFileStore`) + pull-to-refresh + offline cold-launch fallback; Whiteboard **legacy-key fix** (`synapse.whiteboard.board` → `synapse.whiteboard.boards.v1`); Resources My-uploads + video `.pdf` bug (`ResourceFileStore.swift:61`).
6. **Wave-2 audits+build**: University, Essay Questions, Maristanas, Minigames. (Calendar + Medical Taxonomy already exist on iOS.)

## Rules
Small commits, explicit `git add ios/`. Rebase + re-fetch `origin/main` before every push. Never touch `package.json` or `scripts/kasr/`. Verify UI on the simulator (q@hotmail.com/000000).
