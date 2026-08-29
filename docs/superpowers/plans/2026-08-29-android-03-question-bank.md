# Android Plan 03 — Question Bank + Offline Download — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development. Steps use checkbox (`- [ ]`) syntax.

**Goal:** A working Question Bank: parse published questions from the already-synced content ledger, build tutor/timed practice sessions over a scoped pool (MCQ single-best + multi-response), grade + show results, log attempts (local + server-verified), and let a student **download a scope for offline** (prefetch referenced media).

**Architecture:** Pure-logic core (`core/qbank/*`: models, ledger projection, scope, session, grading, attempts) — JVM-unit-tested. A `QBankRepository` reads published questions from `LocalStore` (the ledger is synced by `SyncEngine`; reads never hit the network) and owns the offline media cache. A separate `QBankApi` (Retrofit) carries the two QBank-only endpoints (`POST /qbank/attempts`, `GET /media/:id`) so the existing `SynapseApi` interface (and its fakes) are untouched. Compose UI (`feature/qbank/*`) with ViewModels.

**Tech Stack:** (all present) Kotlin, Compose/Material3, Hilt, Room (already stores the catalogue), Retrofit/OkHttp, kotlinx.serialization, WorkManager (reuse). No new deps.

**Spec:** `docs/superpowers/specs/2026-08-29-android-app-design.md` §5.1. Blueprint: this plan encodes the field mappings/logic distilled from the iOS `Core/QuestionBank`+`Core/Model` port and the web source.

**Plan sequence:** 01 Spine ✅ · 02 Auth+Shell+Dashboard ✅ · **03 Question Bank (this)** · 04 Flashcards · 05 Reader · 06 Notebook · 07 Whiteboard.

## Global Constraints

- Toolchain: `JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"` prefix on every `./gradlew`; SDK 36; deps cached (fast). `--console=plain`, ~300000 ms timeout; if a gradle command runs >3 min silently, STOP and report. For parallel worktree tasks, add `--no-daemon`.
- **No screen calls the network.** UI → ViewModel → `QBankRepository` (reads `LocalStore`) ; the media cache and the verified-attempt POST go through `QBankApi`, invoked by the repository/a worker, never a composable.
- **Content ledger key** = `"synapse-admin-content-ledger-v4"` (already in `STUDENT_READABLE_KEYS`; `SyncEngine` stores it in `LocalStore.getCatalogue(key)` as the raw `StateDoc` JSON — parse `value` as `ManagedContentItem[]`).
- **Fields come from `item.fields`** (`Topic`/`Difficulty`/`Vignette`/`Explanation`), NOT `questionData.{vignette,stem,explanation}`. Stem = `item.title`.
- **Question scope** lives at `questionData.tags.{universityIds, years}` (note: `years`, not `yearIds`). Empty arrays = unrestricted. Match: university = prefix before `_`; year = digits-only.
- **Attempt id** = `"${sessionId}:${surface}:${itemId}"` (colon, includes surface="qbank") — the web canonical, for cross-platform dedup.
- **sessionId** = `"qb-" + base36(ms) + "-" + 5 random [a-z0-9]`. Clock/random injected for tests (pass `now`/a seeded RNG; never call `System.currentTimeMillis()`/`Random()` inside pure logic).
- Grading: single-best via `correctLabel`; multi-response is a **separate** type + `markMultiResponse` — never force multi through the single-answer path.

## File Structure
```
core/qbank/
  Question.kt              # Question, AnswerOption, MultiResponseQuestion, QuestionFormat
  ContentLedger.kt         # ManagedContentItem (minimal), parse from ledger JSON
  QuestionProjection.kt    # project published questions; ScopeMatch (univ/year)
  MultiResponse.kt         # markMultiResponse -> MultiResponseResult
  QBankScope.kt            # scope keys, synthesized topics, toggle rules, chooser tree
  QBankSession.kt          # session model, per-question state, navigator states, grading, results
  QBankSessionId.kt        # sessionId minting (injected clock+rng)
  Attempt.kt               # AttemptRecord, month key, idempotent id, verified-POST payload
core/api/
  QBankApi.kt              # interface + RetrofitQBankApi: POST qbank/attempts, GET media/:id
core/media/
  MediaCache.kt            # content-addressed private-dir cache, Bearer GET /media/:id
feature/qbank/
  QBankRepository.kt       # published questions from LocalStore; pools; attempts; offline pin
  QuestionBankViewModel.kt / SessionViewModel.kt / PinnedScopesViewModel.kt
  QBankSetupScreen.kt / SessionRunnerScreen.kt / MultiResponseRunner.kt / ResultsScreen.kt
  ScopeChooser.kt / QuestionNavigator.kt / OfflineDownloadScreen.kt
di/ (extend AppModule): provide QBankApi, MediaCache, QBankRepository
```

---

### Task 1: Question models + ledger projection

**Files:** `core/qbank/Question.kt`, `core/qbank/ContentLedger.kt`, `core/qbank/QuestionProjection.kt`; test `core/qbank/QuestionProjectionTest.kt`.

**Interfaces produced:**
- `enum class QuestionFormat { McqSingle, McqMulti }`
- `data class AnswerOption(val label: String, val text: String, val explanation: String)`
- `data class Question(val id: String, val subjectId: String, val topic: String, val difficulty: String = "Moderate", val vignette: String, val stem: String, val options: List<AnswerOption>, val correctLabel: String, val explanation: String, val learningObjective: String? = null, val estimatedSeconds: Int? = null, val libraryIds: List<String> = emptyList(), val conceptIds: List<String> = emptyList(), val universityIds: List<String> = emptyList(), val years: List<String> = emptyList())` with `fun isCorrect(label: String) = label == correctLabel`.
- `object QuestionProjection { fun project(ledgerJson: String): List<Question>; fun inScope(q: Question, universityId: String?, year: String?): Boolean }`
- `object ScopeMatch { fun universityMatches(scope: List<String>, id: String?): Boolean; fun yearMatches(scope: List<String>, year: String?): Boolean }`

- [ ] **Step 1: Failing test** using the fixture from the blueprint (put the JSON in the test). Assert: a Published item projects to a `Question` with stem=`title`, topic from `fields.Topic`, difficulty from `fields.Difficulty`, options from `questionData.answers` (dropping empty label/text), `correctLabel="B"`, `conceptIds` from `tags.mainConceptIds ?? tags.conceptIds`, and scope `universityIds=["OMS"]`/`years=["OMS_Y2"]`. Assert a **non-Published** item is dropped; an item whose `correctAnswer` matches no option is dropped; an item with empty title is dropped. Assert `ScopeMatch.universityMatches(["OMS"], "OMS_ClassA")` is true (prefix before `_`) and `yearMatches(["OMS_Y2"], "2")` is true (digits-only) and empty-scope = unrestricted (matches anyone).

```json
// fixture (one Published MCQ item)
{ "id":"Q1","kind":"question","title":"Which mechanism explains this?","subjectId":"SYS_CVS","status":"Published",
  "fields":{"Topic":"Heart failure","Difficulty":"Moderate","Vignette":"A patient with HFrEF...","Explanation":"Chronic sympathetic activation is toxic."},
  "questionData":{"correctAnswer":"B","answers":[
    {"label":"A","text":"Increases cardiac output","explanation":"Wrong."},
    {"label":"B","text":"Opposes chronic sympathetic activation","explanation":"Correct."},
    {"label":"C","text":"","explanation":""}],
    "learningObjective":"...","estimatedSeconds":90,"libraryIds":["hf-patho"],
    "tags":{"universityIds":["OMS"],"years":["OMS_Y2"],"mainConceptIds":["C1"],"conceptIds":["C1"]}}}
```

- [ ] **Step 2: RED.**
- [ ] **Step 3: Implement.** `ContentLedger`: `@Serializable` minimal `ManagedContentItem(id, kind, title, subjectId, status, fields: Map<String,String> = emptyMap(), questionData: QuestionAuthoringData? = null)` with `QuestionAuthoringData(correctAnswer: String? = null, answers: List<RawAnswer> = emptyList(), learningObjective: String? = null, estimatedSeconds: Int? = null, libraryIds: List<String> = emptyList(), tags: QuestionTags? = null)`, `QuestionTags(universityIds, years, mainConceptIds, conceptIds, topic, ...)`. Parse the ledger doc: the `StateDoc.value` is the array (the ledger doc may wrap it — accept either a top-level array or `{items:[...]}`; the fixture is an array element). Use `Json { ignoreUnknownKeys = true }`. Project per the Global Constraints + blocked-item rules above. (Only handle `kind == "question"` here; other kinds ignored.)
- [ ] **Step 4: GREEN.** **Step 5: Commit** `feat(android): qbank question models + ledger projection`.

---

### Task 2: Multi-response question + grading  *(parallelizable with Task 1 — independent files; but easier to base its `label` type on Task 1; sequence after Task 1)*

**Files:** `core/qbank/MultiResponse.kt`; test `core/qbank/MultiResponseTest.kt`. Port `src/data/multiResponseQuestion.ts`.

**Interfaces:** `data class MultiResponseQuestion(id, subjectId, topic, stem, options: List<AnswerOption>, correctAnswers: List<String>, learningObjective: String? = null, conceptIds: List<String> = emptyList())`; `data class MultiResponseResult(val hit: List<String>, val falsePositive: List<String>, val missed: List<String>, val allCorrect: Boolean)`; `fun markMultiResponse(question, selected: List<String>): MultiResponseResult`. Add a `QuestionProjection.projectMultiResponse(ledgerJson)` (items whose `questionData` has `multiResponse.correctAnswers` / `format=="mcq_multi"`).

- [ ] Steps 1–5 TDD: test the four buckets (hit/falsePositive/missed/allCorrect) for a few selections (all correct; partial; over-selection) and that a multi item projects with its `correctAnswers`. Commit `feat(android): multi-response question + grading`.

---

### Task 3: Scope tree + session engine

**Files:** `core/qbank/QBankScope.kt`, `core/qbank/QBankSession.kt`, `core/qbank/QBankSessionId.kt`; tests `QBankScopeTest.kt`, `QBankSessionTest.kt`. Port iOS `QBankScope.swift`/`QuestionBankModel`/`QBankSession.swift` behaviors.

**Interfaces:**
- `QBankScope`: scope is a `Set<String>` of `"t:<topicId>"`/`"s:<subtopicId>"`; `fun topicsFromQuestions(questions): List<TopicNode>` (synthesize `qt:` topics grouped by `topic`); `fun toggleTopic`/`toggleSubtopic` with the supersede/explode rules; `fun poolFor(scope, questions): List<Question>`.
- `QBankSessionId`: `fun mint(now: Instant, rng: Random): String` → `"qb-"+base36(now.toEpochMilli())+"-"+5 chars`.
- `QBankSession`: `enum Mode { Tutor, Timed }`; `enum NavState { Unseen, Answered, Correct, Wrong, Omitted }`; a `Session` built from `(pool, length, mode, seed)` (seeded shuffle → first `length`); mutable per-question state `picked: MutableMap<qid,String>` (irrevocable once `checked`), `checked: MutableSet<qid>`, `visited: MutableSet<Int>`, `spent: MutableMap<qid,Int>`; `fun check(index)` (tutor reveals), `fun navState(index, currentIndex): NavState`, `fun finish(): SessionResult(correct, total, perQuestion...)`. Grading single-best via `Question.isCorrect`.

- [ ] Steps 1–5 TDD, porting the documented behaviors: seeded shuffle is deterministic; `picked` is irrevocable after `check`; navigator `omitted` = visited & unanswered & not current; tutor grades on `check`, timed only at `finish`; a resumed session (answers as **option index**, converted label↔index) survives a reshuffle. Commit `feat(android): qbank scope tree + session engine`.

---

### Task 4: Attempt logging + verified POST

**Files:** `core/qbank/Attempt.kt`, `core/api/QBankApi.kt`; tests `AttemptTest.kt`, `QBankApiTest.kt` (MockWebServer). Extend `di/AppModule` to provide `QBankApi`.

**Interfaces:**
- `data class AttemptRecord(id, at: String, surface: String = "qbank", itemId, subjectId, topic, difficulty, conceptIds: List<String>, correct: Boolean?, seconds: Int?, sessionId, selectedIndex: Int? = null, correctIndex: Int? = null, subtopic: String? = null, sessionDurationSeconds: Int? = null, sessionOvertimeSeconds: Int? = null)`. `fun attemptId(sessionId, surface, itemId) = "$sessionId:$surface:$itemId"`; `fun monthKey(at: Instant): String` (local `YYYY-MM`); user-state keys `synapse.progress.attempts.<month>` + `synapse.progress.attemptIndex.v1`.
- `QBankApi { suspend fun postAttempts(body: VerifiedAttemptsBody) }` where `VerifiedAttemptsBody(attempts: List<VerifiedAttempt(attemptId, sessionId, questionId, answerIndex, seconds, sessionDurationSeconds, overtimeSeconds, answeredAt)>)`; `RetrofitQBankApi` posts to `qbank/attempts` with the Bearer header (reuse the token provider = `authBackend::accessToken`, same as `RetrofitSynapseApi`) and maps HTTP errors to `ApiException` (reuse the `call {}` pattern).

- [ ] Steps 1–5 TDD: `attemptId` format; `monthKey` for a fixed instant; dedup by id (two records same id → one); the MockWebServer test asserts `postAttempts` sends the JSON body + Bearer header and maps a 401/403/500 to `ApiException`. Only `surface=="qbank"` records with an integer `selectedIndex` are eligible for the POST. Commit `feat(android): qbank attempts + verified POST (QBankApi)`.

---

### Task 5: Offline media cache + `QBankRepository`

**Files:** `core/media/MediaCache.kt`, `feature/qbank/QBankRepository.kt`; tests `MediaCacheTest.kt` (MockWebServer + temp dir), `QBankRepositoryTest.kt`. Extend `QBankApi` with `suspend fun getMedia(id): ResponseBody`. Extend `di/AppModule`.

**Interfaces:**
- `MediaCache(cacheDir: File, api: QBankApi)`: `suspend fun ensure(id: String): File` (return cached file if present else download bytes via `getMedia(id)` to `cacheDir/<id>`); `fun isCached(id): Boolean`; content-addressed by the media id (already a sha-derived id). Bearer auth is handled by `QBankApi`.
- `QBankRepository(localStore: LocalStore, mediaCache: MediaCache, pinStore /* user-state or DataStore */)`: `suspend fun publishedQuestions(): List<Question>` (read the ledger doc from `localStore`, `QuestionProjection.project`); `fun pool(scope): List<Question>`; `suspend fun pinScopeForOffline(scope, onProgress): PinResult` (collect referenced media ids from the in-scope questions — for the MVP, questions carry no media yet in most content, so this is a no-op-safe prefetch loop that downloads each referenced id via `mediaCache.ensure`, reporting count/bytes); `fun pinnedScopes(): List<...>`; `suspend fun unpin(scope)`.

- [ ] Steps 1–5 TDD: `MediaCache.ensure` downloads once then serves from disk (second call makes no HTTP request — assert MockWebServer `requestCount`); `QBankRepository.publishedQuestions()` parses a stored ledger doc (seed `localStore.putCatalogue("synapse-admin-content-ledger-v4", ...)` with the fixture) and returns the projected questions; `pinScopeForOffline` on a scope with N media ids caches N files and is idempotent. Commit `feat(android): offline media cache + QBankRepository`.

---

### Task 6: Question Bank UI (setup, runner, results, offline)

**Files:** `feature/qbank/QuestionBankViewModel.kt`, `SessionViewModel.kt`, `PinnedScopesViewModel.kt`, `QBankSetupScreen.kt`, `ScopeChooser.kt`, `SessionRunnerScreen.kt`, `MultiResponseRunner.kt`, `QuestionNavigator.kt`, `ResultsScreen.kt`, `OfflineDownloadScreen.kt`; wire the `qbank` route in `feature/shell/AppScaffold.kt` (via a `qbankContent` seam like the dashboard one). Tests: ViewModel tests + a couple of Compose interaction tests.

- Setup hub: source (New / Flagged & missed / Previous), a `ScopeChooser` (subject→topic→subtopic tri-state over `QBankScope`), presets (weak/emergency/demanding/everything), mode (Tutor/Timed), length (5/10/20/40/custom, max 40), Start.
- Runner: renders the current `Question` (vignette + stem + options as single-select; multi-response items use `MultiResponseRunner` with checkboxes); per-option cross-out (touch-friendly, separate from select); Check (tutor) → reveal why-right/why-wrong; Next/Prev; a `QuestionNavigator` grid (5-state legend + flag dots); flag + private note; a timer (count-up tutor / countdown timed) that **pauses on app background** (lifecycle) and forces a deliberate resume; End dialog (leave vs submit).
- Results: score, per-subject/topic accuracy, answer review, "Sync now" hint; on finish, write attempts (local shard + fire the verified POST when online).
- Offline: a "Download for offline" action from setup that pins the chosen scope (`QBankRepository.pinScopeForOffline`) with a size estimate + progress; a manage screen listing pinned scopes with remove.

- [ ] Steps 1–5 TDD: `SessionViewModel` drives the session engine (start → answer → check → finish produces the right score with a fake pool); a Compose test that answering + Check in Tutor reveals the explanation and the navigator marks the item correct/wrong; the "Download for offline" action calls `pinScopeForOffline`. Compile + `:app:assembleDebug`. Commit `feat(android): question bank UI (setup, runner, results, offline)`.

## Self-Review
- §5.1 QBank + offline download → Tasks 1–6. ✅ (MCQ single + multi from day one; matching/labeling/completion/essay/written deferred — documented.)
- Attempts local + server-verified (`selectedIndex` captured) → Task 4. ✅
- Offline = ledger already local + media prefetch → Task 5. ✅
- No `SynapseApi` interface change (new `QBankApi` instead) → keeps existing fakes intact. ✅
- Parallelization: after Task 1, Tasks 2/3/4 are largely independent (different `core/qbank` files) — candidates for parallel worktrees (`--no-daemon`, separate branches, merge). Task 5 depends on Task 4's `QBankApi`; Task 6 depends on all. 
- Deferred (documented): exotic question types; the `blockingMediaRequests` publish gate (accept iOS's simpler `status==Published` gate for MVP, note it); rich per-subject analytics beyond basic results.
