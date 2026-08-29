# Question of the Day — Native Screens (iOS + Android) Design

**Date:** 2026-08-29
**Status:** Approved decisions, pending spec review
**Extends:** the QotD feature (`2026-08-29-question-of-the-day-design.md`) and its reminders (`2026-08-29-question-of-the-day-reminders-design.md`). The reminder-tap routing here replaces the temporary Today-tab fallback added during the reminders work.

## 1. Summary

Build a native Question-of-the-Day screen in both the iOS (SwiftUI) and Android
(Jetpack Compose) apps, at **full parity with the web**: the daily question with
inline answer + explanation, a personal streak, the cohort leaderboard, and the
friends comparison. Both apps are mature native codebases that already render and
answer qbank questions, so this is largely reuse of existing question UI plus the
four `/api/qotd/*` endpoints already built. A tapped daily reminder opens this
screen.

## 2. Locked decisions

| Decision | Choice |
|---|---|
| Scope | Full web parity: question + answer + explanation + streak + cohort leaderboard + friends |
| iOS entry point | A card on the **Today** tab that opens the QotD screen (5-tab limit forbids a 6th tab) |
| Android entry point | A new **4th bottom-bar tab** (app currently has 3: Qbank/Practical/Account) |
| Marking | Server-authoritative (`POST /api/qotd/answer`), as on web — native never self-marks QotD |
| Question body | Resolved from the **local synced ledger** by `questionId` via the existing `QuestionProjection` (same as qbank); the API returns only the id |
| Reminder tap | Routes to the QotD screen (iOS: present from Today; Android: nav to the tab) |

## 3. Server contract (already built — do not change)

- `GET /api/qotd/today` → `{ date, questionId, answered, answerIndex, correct, current, longest, history[] }`
- `POST /api/qotd/answer` `{ questionId, answerIndex }` → `{ correct, correctIndex, current, longest }`
- `GET /api/qotd/leaderboard?limit=` → `{ scope:{universityId,year}, rows:[{rank,userId,username,profileIcon,current,totalCorrect,totalAnswered}], viewer:{rank,total,current} }`
- `GET /api/qotd/friends` → `{ date, viewerAnswered, friends:[{userId,name,answered,correct}] }`

All are `requireAuthenticated`; the bearer token both apps already attach is sufficient. **Index vs label:** the server speaks `answerIndex` (an index into the published answers-with-text order); both native `Question` models speak option **label** ("A".."F"). Map with `question.options[answerIndex].label` when reading and `options.firstIndex(where: label)` when submitting — the option array order is the same answers-with-text order the server marks against.

## 4. iOS design (`ios/`)

**Reuse as-is:** `Question`/`AnswerOption` + `QuestionProjection` (`Core/Model/Question.swift`), `OptionRow` (`Features/QuestionBank/OptionRow.swift`, already shared), `LocalStore.items(kind:audience:)` + the by-id dictionary pattern, `SynapseAPI` transport, `Theme.*`/`EmptyStateView`/`@Environment(\.strings)`, the `@Observable` model + `.task`-load + `.onChange(of: sync.status)` refresh conventions.

**Net-new:**
1. **Response structs** (`Decodable`, new file `Core/Model/Qotd.swift`): `QotdToday`, `QotdAnswerResult`, `QotdLeaderboard` (+ `Row`, `Viewer`), `QotdFriends` (+ `Friend`). Use the API's custom `decoder` (handles ISO dates in `date`/`history`). Leaderboard rows carry `username`/`profileIcon` (absent from `SessionUser`).
2. **API methods inside `SynapseAPI.swift`** (must be in-file — `get`/`send`/`decoder` are private): `qotdToday()`, `qotdAnswer(questionId:answerIndex:)`, `qotdLeaderboard(limit:)`, `qotdFriends()`. Leaderboard's `?limit=` needs a query param — add a small query-supporting overload to the private `url(_:)` path-builder, or pass `limit` as documented; POST uses the inner-`struct Body: Encodable` idiom.
3. **`QotdModel`** (`@MainActor @Observable final class`, `Features/Qotd/QotdModel.swift`): holds `isLoading`, `error`/`emptyReason`, `today`, resolved `question: Question?`, `answered/answerIndex/correct/current/longest`, `leaderboard`, `friends`. `load(api,store,audience)` fetches today, resolves the question from the ledger, and loads leaderboard + friends. `answer(label:)` maps label→index, POSTs, folds `{correct,correctIndex,current,longest}` back, marks answered. Guards double-answer.
4. **`QotdView`** (`Features/Qotd/QotdView.swift`): header (title + date + streak), the question (reuse `OptionRow`; reveal explanation after answer — copy the `Runner` reveal layout, which is `private`, into a small local view), then a cohort leaderboard section (rank/name/streak/correct, highlight viewer + `viewer.rank/total`) and a friends strip (answered/✓/✗, ✓/✗ withheld until `viewerAnswered`). Loading/empty/error via the model flags + `EmptyStateView`. "Question not available" empty state when the id is outside the student's scope/download.
5. **Today entry point** (`Features/Dashboard/…`): a `QotdCard` at the top of `DashboardView` showing today's state (unanswered / answered ✓ · N-day streak), presenting `QotdView` (push in Today's `NavigationStack`, or `.sheet`). Pass `api`/`store`/`sync`/`audience` through its init, per house convention (no environment).
6. **Reminder routing** (`Features/Root/SignedInView.swift`): replace the `pendingRoute` handler that currently just sets `tab = .today` — when `route == "/app/qotd"`, set `tab = .today` **and** trigger the Today card's presentation (a `@State` auto-present flag), then `consumePendingRoute()`.

## 5. Android design (`android/`)

**Reuse as-is:** `Question`/`AnswerOption` + `QuestionProjection` (`core/model/Question.kt`), the `resolveQuestions` ledger→by-id pattern (`feature/root/RootScreen.kt`), `QuestionRunnerScreen`'s option-render + reveal block (`feature/qbank/`), MVVM (`viewModel(factory=…)`, `StateFlow`+`collectAsState`), `SynapseApi` transport + `AppGraph` auth/base-url wiring, `design/Theme.kt`.

**Net-new:**
1. **`POST` support in `SynapseApi.kt`**: the request switch currently supports only GET/PUT (throws otherwise) — add a `"POST"` branch mirroring PUT (`builder.post(body.toRequestBody(JSON_MEDIA_TYPE))`).
2. **QotD API methods + hand-rolled decoders** in `SynapseApi.kt` (the app decodes `JsonObject` manually via `stringOrMalformed`/`booleanOrMalformed`/`parseInstant`, not `@Serializable` auto-decode): `qotdToday()`, `qotdAnswer(questionId,answerIndex)`, `qotdLeaderboard(limit)`, `qotdFriends()` with `decodeQotdToday`/`…Answer`/`…Leaderboard`/`…Friends` following the `decodeProfile` style. New model data classes in `core/model/Qotd.kt`.
3. **`QotdViewModel`** (`feature/qotd/QotdViewModel.kt`, `viewModelFactory` over `graph.store`/`graph.sync`/`graph.api`): state as a `StateFlow<QotdUiState>` (loading/error/loaded with today, resolved question, streak, leaderboard, friends). Loads via `graph.api.qotdToday()` (direct API, not a synced doc) + resolves the question from `store` via `QuestionProjection`; loads leaderboard + friends. `answer(label)` maps label→index, POSTs, folds the result. Background writes on `backgroundWorkScope` per house convention.
4. **`QotdScreen`** (`feature/qotd/QotdScreen.kt`): the question (reuse the runner's option/reveal composables), streak header, leaderboard list, friends strip — same parity content as iOS, matching `QuestionRunnerScreen` styling and `Theme`.
5. **4th bottom-bar tab** (`feature/root/RootScreen.kt`): add `ROUTE_QOTD` constant, a `NavigationBarItem`, and a `composable(ROUTE_QOTD){ QotdRoute(graph) }`, using the existing `navigateToTab` (`popUpTo(start){saveState}`+`launchSingleTop`+`restoreState`). Pick an icon + label ("Daily") consistent with the other tabs.
6. **Reminder routing:** the dormant FCM tap (prepared, off-build) should target this tab. Document in `docs/qotd-android-push-enablement.md` that the tap navigates to `ROUTE_QOTD`. (Live only when Android push is enabled.)

## 6. Testing

- **iOS** (`ios/SynapseTests/`): unit-test the label↔index mapping and the `Decodable` structs against sample JSON (matches the existing test style). UI is not unit-tested.
- **Android** (`android/app/src/test/`): JVM unit tests for the `decodeQotd*` functions (sample `JsonObject` → model) and the label↔index mapping, mirroring the existing decoder tests. Compose UI is not unit-tested here.
- Neither app is fully built/run in this environment: iOS gets `swiftc -parse`; Android a Gradle compile **if** the toolchain is available, else source-review only. **On-device/simulator verification of the screens, the entry points, and reminder-tap routing is owed** and called out as such.

## 7. Build order — two parallel lanes (Sonnet subagents)

The lanes are disjoint (`ios/` vs `android/`) with no shared files, so they run fully in parallel with no central wiring.

- **Lane N-iOS:** structs → `SynapseAPI` methods → `QotdModel` → `QotdView` (question + leaderboard + friends) → Today `QotdCard` + presentation → `pendingRoute` routing → `SynapseTests` for decode/mapping → `swiftc -parse`.
- **Lane N-Android:** `POST` branch + QotD methods/decoders + `Qotd.kt` models → `QotdViewModel` → `QotdScreen` → 4th tab wiring → JVM decoder/mapping tests → compile if toolchain present.
- **Integration:** review each lane; confirm no regressions to existing qbank reuse; update the Android enablement doc's tap target. Final device/simulator verification owed to the owner.

## 8. Out of scope

- No change to the QotD web feature, the server endpoints, or the reminders.
- No offline answering of QotD (it needs the server to mark; requires connectivity, like the web friends/leaderboard).
- No new native design system work — reuse existing `Theme`/components.
