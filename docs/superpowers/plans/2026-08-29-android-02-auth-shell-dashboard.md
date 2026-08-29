# Android Foundation B — Auth + App Shell + Dashboard — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Turn the headless offline spine into a running, signed-in app: Supabase auth, a Hilt DI graph that assembles the spine, a Compose app shell (navigation + theme), and a Dashboard that reads from the local store and drives sync.

**Architecture:** Compose UI → ViewModels → repositories (read `LocalStore` only) → `SyncEngine` (the sole network caller) → `RetrofitSynapseApi` + Supabase auth. Hilt wires it; a shared authed `OkHttpClient` gets its bearer token from `AuthModel`. Auth uses supabase-kt (GoTrue) with a testable `AuthBackend` seam so `AuthModel` is unit-tested with a fake.

**Tech Stack:** (adds to Plan 01) Jetpack Compose + Material 3, Navigation-Compose, Hilt, DataStore (prefs), WorkManager, Coil, supabase-kt `auth-kt` + a Ktor engine, `kotlinx-coroutines-android`.

**Spec:** `docs/superpowers/specs/2026-08-29-android-app-design.md` (§4 Architecture, §5.0 Foundation, §8 cross-cutting). Prior plan: `docs/superpowers/plans/2026-08-29-android-01-scaffold-sync-spine.md` (the spine this builds on: `SyncEngine`, `LocalStore`, `RetrofitSynapseApi`, `AppConfig`, `StateOwnership`).

**Plan sequence:** 01 Scaffold+Spine ✅ → **02 Auth+Shell+Dashboard (this)** → 03 QBank+offline → 04 Flashcards → 05 Reader+annotations → 06 Notebook → 07 Whiteboard.

## Global Constraints

- Toolchain: JBR 21 at `/Applications/Android Studio.app/Contents/jbr/Contents/Home` (prefix every `./gradlew` with `JAVA_HOME=...`); SDK 36 installed; `compileSdk/targetSdk = 36`, `minSdk 26`, `applicationId com.synapse.app`. Gradle deps are cached — runs are fast; still use `--console=plain` and a ~300000 ms Bash timeout.
- **No screen calls the network** — repositories read `LocalStore`; `SyncEngine` is the sole API caller.
- **Reuse the shared `OkHttpClient`** across Retrofit + Supabase; the bearer token is read fresh per request from `AuthModel` (no caching).
- Sign-in completes only after both Supabase accepts AND `GET /api/session` succeeds (mirror iOS/web).
- Device-local prefs (theme, collapsed nav) live in **DataStore**, not synced.
- Clocks/dispatchers injected where behavior depends on them (testability).
- If a dependency version fails to resolve, bump to the latest stable in the same major line and note it.

## Prerequisites
The Plan-01 spine is committed at branch `claude/android-student-app` (HEAD `62af117c`): `core/{api,cache,config,model,sync}` with 34 passing tests. This plan only adds new packages `core/auth`, `di`, `feature/*`, `design/*`, `work/` and wires them.

## File Structure
```
android/app/src/main/java/com/synapse/app/
  SynapseApp.kt                      # add @HiltAndroidApp
  MainActivity.kt                    # @AndroidEntryPoint, setContent { SynapseApp UI }
  core/auth/AuthBackend.kt           # interface (testable seam) + Session model
  core/auth/SupabaseAuthBackend.kt   # supabase-kt (GoTrue) implementation
  core/auth/AuthModel.kt             # session state flow + sign in/up/reset + /api/session gate
  di/AppModule.kt                    # AppConfig, OkHttp(+auth), Retrofit api, Room/LocalStore, SyncEngine, AuthBackend
  di/WorkModule.kt / work/SyncWorker.kt   # WorkManager periodic + on-demand sync
  design/Theme.kt                    # light/warm/dark palettes + Typography (ported from src/index.css)
  design/ThemePreference.kt          # DataStore-backed theme choice
  feature/auth/*                     # Login/Signup/VerifyEmail/ResetPassword/Mfa + AuthViewModel + RequireAuth
  feature/shell/AppScaffold.kt       # nav scaffold (bottom bar/drawer), top bar, theme switch
  feature/shell/Nav.kt               # student destinations + NavHost
  feature/dashboard/DashboardRepository.kt / DashboardViewModel.kt / DashboardScreen.kt
  feature/placeholder/PlaceholderScreen.kt   # for not-yet-built destinations
```

---

### Task 1: Add Compose/Hilt/Supabase deps; Hilt app + MainActivity; build green

**Files:** `libs.versions.toml`, `app/build.gradle.kts`, `build.gradle.kts` (root, add hilt plugin), `SynapseApp.kt`, `MainActivity.kt`, `AndroidManifest.xml`, a smoke test.

**Interfaces:** Produces a Hilt-enabled app that builds and launches an empty Compose surface.

- [ ] **Step 1: Add version-catalog entries** — Compose BOM (`androidx.compose:compose-bom` ~2024.10+), `androidx.compose.material3:material3`, `androidx.activity:activity-compose`, `androidx.navigation:navigation-compose`, `androidx.hilt:hilt-navigation-compose`, `com.google.dagger:hilt-android` + `hilt-compiler` (plugin `com.google.dagger.hilt.android` ~2.52), `androidx.datastore:datastore-preferences`, `androidx.work:work-runtime-ktx`, `androidx.hilt:hilt-work`+`hilt-compiler`, `io.coil-kt:coil-compose`, `org.jetbrains.kotlinx:kotlinx-coroutines-android`, supabase `io.github.jan-tennert.supabase:auth-kt` (via `supabase-bom` ~3.0) + `io.ktor:ktor-client-okhttp`, and test deps `androidx.compose.ui:ui-test-junit4` + `ui-test-manifest`. Add the Compose compiler plugin `org.jetbrains.kotlin.plugin.compose` (version = kotlin).

- [ ] **Step 2: Wire `app/build.gradle.kts`** — apply `hilt`, `kotlin.plugin.compose`, `kapt` (or ksp) for Hilt; `buildFeatures { compose = true; buildConfig = true }`; add the dependencies; keep KSP for Room. (Hilt uses kapt; keep Room on KSP — both can coexist. If kapt+ksp friction appears, use KSP for Hilt via `androidx.hilt` where possible; note the choice.)

- [ ] **Step 3: `@HiltAndroidApp`** on `SynapseApp`; create `MainActivity` (`@AndroidEntryPoint`) with `setContent { MaterialTheme { } }`; register MainActivity + `android:theme` in the manifest.

- [ ] **Step 4: Smoke test** — a Robolectric test that inflates `MainActivity` (or a trivial `@Composable` under `createComposeRule`) and asserts it renders without crashing; plus `./gradlew :app:assembleDebug` succeeds.

- [ ] **Step 5: Run** `:app:testDebugUnitTest` + `:app:assembleDebug` (JAVA_HOME-prefixed). Expected: green. **Commit.**

---

### Task 2: `AuthBackend` seam + `AuthModel` (session state, sign-in gate)

**Files:** `core/auth/AuthBackend.kt`, `core/auth/AuthModel.kt`, test `core/auth/AuthModelTest.kt`. (`SupabaseAuthBackend.kt` is Task 3.)

**Interfaces:**
- `data class Session(val userId: String, val accessToken: String, val emailVerified: Boolean)`
- `interface AuthBackend { val session: StateFlow<Session?>; suspend fun restore(); suspend fun signIn(email, password); suspend fun signUp(email, password); suspend fun signOut(); suspend fun sendReset(email); suspend fun accessToken(): String? }`
- `class AuthModel(backend: AuthBackend, confirmSession: suspend () -> Boolean)` exposing `val state: StateFlow<AuthState>` where `AuthState = Loading | SignedOut | NeedsEmailVerify | SignedIn(Session)`; `suspend fun signIn(...)`, etc. `signIn` succeeds → `SignedIn` only if `backend.session.emailVerified` AND `confirmSession()` (the `/api/session` round-trip) returns true; otherwise `NeedsEmailVerify`/error.

- [ ] **Step 1: Failing tests** with a `FakeAuthBackend` (in test): signIn with unverified email → `NeedsEmailVerify`; signIn verified but `confirmSession()` false → error/SignedOut (not SignedIn); signIn verified + confirm true → `SignedIn`; signOut → `SignedOut`; `restore()` with an existing session → `SignedIn`. Assert `state` transitions.
- [ ] **Step 2: Run → RED.**
- [ ] **Step 3: Implement `AuthBackend`/`Session` + `AuthModel`** (map `backend.session` → `AuthState`, apply the two-gate rule on `signIn`). `accessToken()` delegates to backend.
- [ ] **Step 4: Run → GREEN.** **Step 5: Commit.**

---

### Task 3: DI graph (`di/AppModule`) + `SupabaseAuthBackend` + authed OkHttp

**Files:** `di/AppModule.kt`, `core/auth/SupabaseAuthBackend.kt`, `core/api/AuthInterceptor.kt`, test `di/GraphTest.kt`.

**Interfaces:** Hilt `@Module @InstallIn(SingletonComponent)` providing: `AppConfig` (fromBuildConfig), `AuthBackend` (`SupabaseAuthBackend` built from AppConfig supabase host/key), `AuthModel` (confirmSession calls `SynapseApi.session()` returning true on success), a shared `OkHttpClient` with an `AuthInterceptor` that adds `Authorization: Bearer <AuthModel.accessToken()>`, `SynapseApi` (`RetrofitSynapseApi(config, tokenProvider = authModel::accessToken)`), `SynapseDatabase`+`LocalStore` (Room), `SyncEngine(api, store, STUDENT_READABLE_KEYS)`.

- [ ] **Step 1: Define `STUDENT_READABLE_KEYS`** (a `val` list in `core/sync` — the hyphenated catalogue keys the student reads, e.g. `synapse-admin-content-ledger-v4`, `synapse-glossary-v1`, …; copy the set the iOS app/`STUDENT_READABLE_STATE` uses — grep the web `server/src/index.js` for `STUDENT_READABLE_STATE` and mirror it; if unavailable, start with the content-ledger key and note the gap).
- [ ] **Step 2: Failing test** — a Hilt test (`@HiltAndroidTest` + Robolectric, or a plain unit test constructing the module manually) asserting `AppModule` can provide a non-null `SyncEngine` and `AuthModel` with a fake AppConfig. (If full Hilt test harness is heavy, test the provider functions directly by calling them.)
- [ ] **Step 3: Implement** `AuthInterceptor`, `SupabaseAuthBackend` (supabase-kt GoTrue: `createSupabaseClient(supabaseUrl, key){ install(Auth) }`; map its session to `Session`; implement sign in/up/out/reset/restore/accessToken), and `AppModule`.
- [ ] **Step 4: Run → GREEN** + `:app:assembleDebug`. **Step 5: Commit.**

---

### Task 4: Design system (Theme) + App shell (nav scaffold, theme switch)

**Files:** `design/Theme.kt`, `design/ThemePreference.kt`, `feature/shell/Nav.kt`, `feature/shell/AppScaffold.kt`, `feature/placeholder/PlaceholderScreen.kt`, test.

**Interfaces:** `SynapseTheme(themeChoice, content)` applying light/warm/dark Material 3 color schemes (ported from `src/index.css` tokens); `enum ThemeChoice { Light, Warm, Dark }` persisted via DataStore (`ThemePreference`); `AppScaffold(navController)` = Scaffold with a bottom navigation bar (or nav rail on wide) listing student destinations, a top bar (title + theme switch), and the `NavHost`. Destinations mirror the web nav groups but only Dashboard is real; the rest use `PlaceholderScreen`.

- [ ] **Step 1: Failing test** — `ThemePreference` round-trips a `ThemeChoice` through DataStore (Robolectric); and a Compose test that `AppScaffold` renders the Dashboard destination label and switching a bottom-nav item navigates (assert the destination route). 
- [ ] **Step 2: RED.**
- [ ] **Step 3: Implement** theme palettes + Typography, DataStore-backed `ThemePreference`, the nav destination list, `AppScaffold` + `NavHost`, `PlaceholderScreen`. RTL via Compose defaults (no hardcoded start/end paddings; use `Modifier.padding` with layout-direction-aware values). 
- [ ] **Step 4: GREEN.** **Step 5: Commit.**

---

### Task 5: Auth screens + RequireAuth gate

**Files:** `feature/auth/AuthViewModel.kt`, `LoginScreen.kt`, `SignupScreen.kt`, `VerifyEmailScreen.kt`, `ResetPasswordScreen.kt`, `RequireAuth.kt`, nav wiring, test.

**Interfaces:** `AuthViewModel(authModel)` exposing `state` + `onSignIn/onSignUp/onReset` (form state + errors); `RequireAuth(content)` shows a loading state, routes to `/login` when `SignedOut`, to verify-email when `NeedsEmailVerify`, else renders `content`. The app's root composable chooses auth flow vs `AppScaffold` based on `AuthModel.state`.

- [ ] **Step 1: Failing tests** — `AuthViewModel` maps a failed sign-in to a visible error and a success to `SignedIn` (using a fake `AuthModel`/backend); a Compose test that `LoginScreen` shows an error message when the VM state carries one, and that tapping "Sign in" calls the VM.
- [ ] **Step 2: RED.**
- [ ] **Step 3: Implement** the screens (email/password fields, submit, error text, links between login/signup/reset), `AuthViewModel`, `RequireAuth`, and root wiring (`SignedIn` → `AppScaffold`, else the auth NavHost). OAuth/MFA: render the buttons/entry points but a full OAuth/MFA round-trip can be a follow-up — wire what supabase-kt supports and mark any deferral in the report.
- [ ] **Step 4: GREEN.** **Step 5: Commit.**

---

### Task 6: Dashboard (repository + sync) + WorkManager periodic sync

**Files:** `feature/dashboard/DashboardRepository.kt`, `DashboardViewModel.kt`, `DashboardScreen.kt`, `work/SyncWorker.kt`, `di/WorkModule.kt`, test.

**Interfaces:** `DashboardRepository(localStore, syncEngine)` — reads whatever synced student state exists from `LocalStore` (greeting/name from a profile catalogue key if present, plus a "last synced" indicator) and exposes `suspend fun refresh(now)`; `DashboardViewModel` drives `refresh()` on open and exposes UI state (loading / content / empty / offline). `SyncWorker` (Hilt `@HiltWorker`) calls `SyncEngine.refresh(Instant.now())`; scheduled periodically (~6h) + on-demand; connectivity-constrained.

- [ ] **Step 1: Failing tests** — `DashboardRepository.refresh` calls `SyncEngine.refresh` and surfaces a "synced/offline" state (with a fake SyncEngine that succeeds vs throws); `SyncWorker.doWork()` returns success when `SyncEngine.refresh` succeeds and retry on transient failure (fake engine). Inject the clock/`Instant` so it's deterministic.
- [ ] **Step 2: RED.**
- [ ] **Step 3: Implement** the repository, ViewModel, a Dashboard screen (greeting, sync status chip, empty-state cards for due-reviews/agenda that will fill once content plans land, a manual "Sync now"), `SyncWorker` + WorkManager scheduling in `di/WorkModule` (enqueue unique periodic work on app start).
- [ ] **Step 4: GREEN** + `:app:assembleDebug`. **Step 5: Commit.**

---

## Self-Review
- Spec §5.0 Foundation (auth flows, `SynapseApi`, `LocalStore`, `SyncEngine`, app shell, Dashboard, theme) → Tasks 1–6. ✅
- Auth two-gate (Supabase + `/api/session`) → Task 2/3. ✅
- Shared authed OkHttp, token fresh per request → Task 3. ✅
- Device-local theme in DataStore → Task 4. ✅
- WorkManager sync → Task 6. ✅
- Deferred (documented): OAuth/MFA full round-trip may partially defer (Task 5 note); real Dashboard content lands with the content plans (03+). Visual/emulator verification is out of scope for these unit/Robolectric-tested tasks.
- Parallelizable after Tasks 1–3 land: Task 4 (shell) and Task 5 (auth screens) are largely independent (different `feature/*` packages) — run in two worktrees each with its own `GRADLE_USER_HOME`.
