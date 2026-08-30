# Question of the Day — Native Screens Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Build a native Question-of-the-Day screen (question + answer + explanation + streak + cohort leaderboard + friends) in both the iOS SwiftUI app and the Android Compose app, reusing each app's existing question UI and calling the four `/api/qotd/*` endpoints.

**Architecture:** Server-authoritative marking (`POST /api/qotd/answer`); the question BODY is resolved from the local synced ledger by `questionId` via each app's existing `QuestionProjection`. iOS entry = a card on the Today tab; Android entry = a new 4th bottom-bar tab. A reminder tap opens the screen.

**Tech Stack:** iOS: SwiftUI, `@Observable` (Observation), iOS 18 target, `SynapseAPI` (URLSession). Android: Jetpack Compose, MVVM, `SynapseApi` (OkHttp + kotlinx.serialization manual decode), Navigation-Compose.

**Spec:** `docs/superpowers/specs/2026-08-29-question-of-the-day-native-screens-design.md` (read alongside). Server contract + reminder background in the sibling QotD specs.

## Global Constraints

- **Two fully disjoint lanes:** N-iOS touches only `ios/`; N-Android touches only `android/`. No shared files, no cross-lane imports.
- **Reuse, don't rebuild:** use each app's existing `Question`/`AnswerOption`/`QuestionProjection` and option-render/reveal UI; do not invent new question models or a new design system.
- **Server-authoritative marking:** native never self-marks QotD — always `POST /api/qotd/answer` and use the returned `{correct, correctIndex}`. (The qbank self-marks; QotD does NOT — this is the key deviation from the qbank flow to copy.)
- **Index vs label:** API uses `answerIndex` (index into the published answers-with-text order); the native `Question.options` array is in that same order. Submit `answerIndex = options.firstIndex(of: chosenLabel)`; display the server's `correctIndex` via `options[correctIndex].label`.
- **Question resolution:** resolve `questionId` → `Question` from the local ledger (published + in-scope only). If the id isn't found, show a "not available yet" empty state — never crash or show a blank question.
- **Match conventions exactly:** read the named reuse files first and mirror their model/view/loading/error patterns, theme tokens, and localization.
- **Verification is limited here:** iOS `swiftc -parse` the changed files; Android compile only if the toolchain is available. Unit-test the decoders + label/index mapping. On-device/simulator verification of the screens + routing is owed to the owner — state it in the report; do not claim the UI was verified.
- Commit after each green step. Messages `feat(qotd-ios):` / `feat(qotd-android):`, ending with:
  `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`

---

# LANE N-iOS (`ios/`)

Read FIRST and mirror: `ios/Synapse/Core/API/SynapseAPI.swift` (transport: private `get`/`send`/`url`/`decoder`; the `registerDevice` inner-`struct Body` POST idiom; `APIError`), `ios/Synapse/Core/Model/Question.swift` (`Question`, `AnswerOption`, `QuestionProjection.project`), `ios/Synapse/Features/QuestionBank/QuestionBankView.swift` (the private `Runner` reveal/explanation layout to copy) + `ios/Synapse/Features/QuestionBank/OptionRow.swift` (reuse directly) + `ios/Synapse/Features/QuestionBank/QuestionBankModel.swift` (load pattern, `questions(inSitting:)` ledger→by-id resolution, `describeEmptiness`), `ios/Synapse/Features/Root/SignedInView.swift` (tabs, `Container`, `pendingRoute` handler), `ios/Synapse/Features/Dashboard/DashboardView.swift` (Today tab; where the card mounts; `.task`/`.onChange(of: sync.status)`/`.refreshable`), `ios/Synapse/Design/Theme.swift` + `EmptyStateView`, `ios/Synapse/Core/Cache/LocalStore.swift` (`items(kind:audience:)`).

### Task iOS-1: Response models
**Files:** Create `ios/Synapse/Core/Model/Qotd.swift`
- [ ] Define `Decodable` structs matching the server JSON exactly:
  - `QotdToday { date: String; questionId: String?; answered: Bool; answerIndex: Int?; correct: Bool?; current: Int; longest: Int; history: [String] }`
  - `QotdAnswerResult { correct: Bool; correctIndex: Int; current: Int; longest: Int }`
  - `QotdLeaderboard { scope: Scope; rows: [Row]; viewer: Viewer }` with `Scope { universityId: String; year: String }`, `Row { rank: Int; userId: String; username: String; profileIcon: String?; current: Int; totalCorrect: Int; totalAnswered: Int }`, `Viewer { rank: Int?; total: Int; current: Int }`
  - `QotdFriends { date: String; viewerAnswered: Bool; friends: [Friend] }` with `Friend { userId: String; name: String; answered: Bool; correct: Bool? }`
- [ ] Add a `SynapseTests` case decoding sample JSON for each (mirror existing decode tests). Verify field names match `src/data/qotdTypes.ts`.

### Task iOS-2: API methods (inside SynapseAPI.swift)
**Files:** Modify `ios/Synapse/Core/API/SynapseAPI.swift`
- [ ] Add, using the private `get`/`send`/`decoder` (so they MUST live in this file):
  - `func qotdToday() async throws -> QotdToday` → `get(QotdToday.self, ["qotd","today"])`
  - `func qotdAnswer(questionId: String, answerIndex: Int) async throws -> QotdAnswerResult` → POST `["qotd","answer"]` with inner `struct Body: Encodable { let questionId: String; let answerIndex: Int }`, decode with `Self.decoder`
  - `func qotdLeaderboard(limit: Int = 50) async throws -> QotdLeaderboard`
  - `func qotdFriends() async throws -> QotdFriends`
- [ ] For the leaderboard `?limit=`, add a minimal query-supporting overload to the private `url(_:)` builder (or omit the param and rely on the server default 50 for v1 — pick one and note it).
- [ ] `swiftc -parse` the file (with its dependencies) or at least confirm it parses; the SynapseTests compile is the real gate.

### Task iOS-3: QotdModel
**Files:** Create `ios/Synapse/Features/Qotd/QotdModel.swift`
- [ ] `@MainActor @Observable final class QotdModel` with injected `api: SynapseAPI`, `store: LocalStore`, `audience: StudentAudience`. State: `isLoading`, `errorText: String?`, `emptyReason: String?`, `today: QotdToday?`, `question: Question?`, `answered`, `chosenLabel: String?`, `correctLabel: String?`, `current`, `longest`, `leaderboard: QotdLeaderboard?`, `friends: QotdFriends?`.
- [ ] `func load() async`: fetch `qotdToday()`; resolve the question via `store.items(kind:.question,audience:audience)` → `compactMap(QuestionProjection.project)` → `associateBy id` → `[today.questionId]`; set `emptyReason` (mirror `describeEmptiness`) when nil; fold answered state from `today`; then load `qotdLeaderboard()` + `qotdFriends()` (tolerate their failure independently — a leaderboard error must not blank the question).
- [ ] `func answer(_ label: String) async`: guard `!answered` and a resolved question; compute `answerIndex = question.options.firstIndex { $0.label == label }`; `qotdAnswer(questionId:answerIndex:)`; set `answered=true`, `chosenLabel=label`, `correctLabel = question.options[result.correctIndex].label`, `current/longest` from result; refresh leaderboard/friends.

### Task iOS-4: QotdView
**Files:** Create `ios/Synapse/Features/Qotd/QotdView.swift`
- [ ] `struct QotdView: View` holding `@State private var model: QotdModel` built in `init` (`_model = State(wrappedValue:)`) from injected `api`/`store`/`sync`/`audience`. Load in `.task { await model.load() }`; re-load on `.onChange(of: sync.status)` `.done`; `.refreshable`.
- [ ] Layout: header (title + `today.date` + streak "🔥 current", subtitle longest) → question block: vignette, stem, `ForEach(question.options) { OptionRow(state:..., isAnswered:model.answered, choose:{ Task { await model.answer($0) } }) }`; after answered, reveal the explanation (copy the `Runner` reveal layout — it's `private`, so reimplement a small local reveal view). → Leaderboard section (rank/username/streak/correct; highlight viewer; show `viewer.rank/total`; empty state). → Friends strip (answered/✓/✗, withhold ✓/✗ until `viewerAnswered`; empty state). Loading/empty/error via model flags + `EmptyStateView`. Use `Theme.*` and `@Environment(\.strings)`.

### Task iOS-5: Today card + presentation
**Files:** Create `ios/Synapse/Features/Dashboard/QotdCard.swift`; Modify `ios/Synapse/Features/Dashboard/DashboardView.swift`
- [ ] `QotdCard` — compact card (today's state: "Answer today's question" / "Answered ✓ · N-day streak") matching the Dashboard's card styling. It reads a lightweight `QotdModel` (or a shared instance) for answered/streak, tappable.
- [ ] Mount it at the top of `DashboardView`; tapping presents `QotdView` (push into Today's `NavigationStack` or `.sheet`). Expose a bindable "present QotD" flag on the Dashboard for the reminder route to trigger.

### Task iOS-6: Reminder tap routing
**Files:** Modify `ios/Synapse/Features/Root/SignedInView.swift`
- [ ] Replace the current `pendingRoute` handler (which only sets `tab = .today`): when the consumed route is `"/app/qotd"`, set `tab = .today` AND set the Dashboard's "present QotD" flag so the screen opens; then `consumePendingRoute()`.

### Task iOS-7: Verify + report
- [ ] `swiftc -parse` the changed/new Swift files; build `SynapseTests` decode/mapping tests if the toolchain allows.
- [ ] Report: files, what was reused vs new, and the explicit note that screen/entry/routing verification is owed on a simulator/device.

---

# LANE N-Android (`android/`)

Read FIRST and mirror: `android/app/src/main/java/com/synapse/android/core/api/SynapseApi.kt` (request switch — only GET/PUT today; `requestObject`; the `stringOrMalformed`/`booleanOrMalformed`/`parseInstant` decode helpers; `decodeProfile` style; `ApiError`), `core/model/Question.kt` (`Question`, `AnswerOption`, `QuestionProjection.project`), `feature/root/RootScreen.kt` (`SignedInNavHost`, `ROUTE_*` constants, `NavigationBar`/`NavigationBarItem`, `navigateToTab`, `resolveQuestions` ledger→by-id), `feature/qbank/QuestionRunnerScreen.kt` + `feature/qbank/RunnerViewModel.kt` (option render + reveal + `choose`/`commit`; note QotD must NOT bank an attempt the qbank way — it POSTs to `/api/qotd/answer`), `core/cache/LocalStore.kt` (`ledgerItems`/`items`), `AppGraph.kt` (`api`/`store`/`sync`), `design/Theme.kt`.

### Task AND-1: POST support + models
**Files:** Modify `SynapseApi.kt`; Create `core/model/Qotd.kt`
- [ ] In `SynapseApi.request(...)`, add a `"POST"` branch mirroring the PUT branch: `builder.post(body.toRequestBody(JSON_MEDIA_TYPE))`.
- [ ] Create `core/model/Qotd.kt` data classes matching the server JSON: `QotdToday(date, questionId: String?, answered, answerIndex: Int?, correct: Boolean?, current, longest, history: List<String>)`, `QotdAnswerResult(correct, correctIndex, current, longest)`, `QotdLeaderboard(scope, rows, viewer)` (+ `QotdScope`, `QotdLeaderboardRow`, `QotdViewer`), `QotdFriends(date, viewerAnswered, friends)` (+ `QotdFriend`).

### Task AND-2: API methods + decoders
**Files:** Modify `SynapseApi.kt`
- [ ] Add suspend methods + hand-rolled `JsonObject` decoders (mirror `decodeProfile`/`decodeEntitlement`):
  - `suspend fun qotdToday(): QotdToday` (GET `qotd/today`, `decodeQotdToday`)
  - `suspend fun qotdAnswer(questionId: String, answerIndex: Int): QotdAnswerResult` (POST `qotd/answer` with a serialized body, `decodeQotdAnswer`)
  - `suspend fun qotdLeaderboard(limit: Int = 50): QotdLeaderboard` (GET `qotd/leaderboard?limit=`, `decodeQotdLeaderboard`)
  - `suspend fun qotdFriends(): QotdFriends` (GET `qotd/friends`, `decodeQotdFriends`)
- [ ] JVM unit tests (`android/app/src/test/…`) for each decoder against sample `JsonObject`, plus the label↔index mapping. Mirror existing decoder tests.

### Task AND-3: QotdViewModel
**Files:** Create `feature/qotd/QotdViewModel.kt`
- [ ] MVVM `ViewModel` via `viewModelFactory` over `graph.api`, `graph.store`, `graph.sync` (mirror `RunnerViewModel.factory`). Expose `StateFlow<QotdUiState>` (`Loading | Error(msg) | Loaded(today, question?, emptyReason?, answered, chosenLabel?, correctLabel?, current, longest, leaderboard?, friends?)`).
- [ ] `load()`: `api.qotdToday()`; resolve question from `store.ledgerItems(ContentKind.QUESTION)` filtered `isStudentVisible` → `mapNotNull(QuestionProjection::project)` → `associateBy { it.id }` → `[today.questionId]` (mirror `resolveQuestions`); set an empty reason when absent; load leaderboard + friends (independent failure tolerance). Run on `viewModelScope`.
- [ ] `answer(label)`: map to `answerIndex`, `api.qotdAnswer(...)`, fold result (answered, `correctLabel = question.options[correctIndex].label`, streak), refresh leaderboard/friends. Do NOT write a qbank `AttemptRecord` (QotD is a separate track).

### Task AND-4: QotdScreen
**Files:** Create `feature/qotd/QotdScreen.kt`
- [ ] Compose screen collecting the VM `StateFlow` with `collectAsState()`. Render: streak header, the question (reuse the runner's option + reveal composables — extract/adapt), leaderboard list, friends strip — parity with iOS/web. Loading = centered progress (mirror `RestoringScreen`); error/empty states inline. Use `Theme` tokens.
- [ ] Add a `QotdRoute(graph)` composable that builds the VM and hosts the screen.

### Task AND-5: 4th bottom-bar tab
**Files:** Modify `feature/root/RootScreen.kt`
- [ ] Add `ROUTE_QOTD` constant; a `NavigationBarItem` (label "Daily", a suitable icon) after the existing three; and `composable(ROUTE_QOTD){ QotdRoute(graph) }` in `SignedInNavHost`, using `navigateToTab`.

### Task AND-6: Reminder tap target (doc)
**Files:** Modify `docs/qotd-android-push-enablement.md`
- [ ] Document that the (dormant) FCM notification tap should navigate to `ROUTE_QOTD`. No live code path until Android push is enabled.

### Task AND-7: Verify + report
- [ ] Run the JVM decoder/mapping tests (`./gradlew :app:testDebugUnitTest` if the toolchain is available; else state it couldn't run). Compile if possible.
- [ ] Report: files, reuse vs new, whether Gradle ran, and the explicit note that screen/tab/routing verification is owed on an emulator/device.

---

# INTEGRATION
- [ ] Review each lane (`superpowers:requesting-code-review` or inline): correct index/label mapping, server-authoritative marking (no self-mark, no qbank attempt written), question-resolution empty state, no regressions to reused qbank code, conventions matched.
- [ ] Confirm the two lanes didn't touch shared files (they shouldn't — `ios/` vs `android/`).
- [ ] Note owed on-device verification for both apps in the final summary.
