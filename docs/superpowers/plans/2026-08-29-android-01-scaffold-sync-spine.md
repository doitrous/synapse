# Android Foundation A — Scaffold + Offline Sync Spine — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up the `/android` Gradle project and the headless, fully unit-tested offline sync spine (models, key-ownership routing, precedence, thin API client, Room local store, and the SyncEngine that ties them together).

**Architecture:** Offline-first. Pure-Kotlin domain logic (`core.*` packages) is JVM-unit-tested with fakes; Room is the on-device store behind a `LocalStore` interface; `SyncEngine` is the *only* component that touches the network. UI and auth come in Foundation B — this plan produces no screens, just the tested spine and a buildable app.

**Tech Stack:** Kotlin 2.x, Android Gradle Plugin 8.x (Gradle wrapper), JDK 17, Jetpack Room (+FTS + KSP), Retrofit 2 + OkHttp + kotlinx.serialization, kotlinx-coroutines, JUnit4 + coroutines-test + Robolectric. Compose/Material3 and Hilt are added in Foundation B.

**Spec:** `docs/superpowers/specs/2026-08-29-android-app-design.md` (read it alongside this plan; §4 Architecture and §7 Backend surface are the source of truth for the spine).

**Plan sequence (this is plan 1 of 7):** 01 Scaffold+Spine (this) → 02 Auth+Shell+Dashboard → 03 Question Bank + offline download → 04 Flashcards (SM-2) → 05 Resources reader + annotations → 06 Notebook editor → 07 Whiteboard.

## Global Constraints

_Every task's requirements implicitly include this section. Values copied verbatim from the spec._

- `applicationId = "com.synapse.app"`, display name **"Synapse"**, `minSdk 26`, `targetSdk` = latest stable, `compileSdk` = latest stable.
- **Ownership routing is a direct port of the web's `USER_OWNED_PATTERNS`** (`src/lib/stateOwnership.ts`). Dotted-prefix keys → `/user-state/:key`; the listed hyphenated keys are user-owned too; everything else is shared → `/state/:key`, **read-only** from the client. A mismatch silently splits a student's progress between phone and browser.
- **Precedence** = a local write wins only when **strictly newer** than the server's `updatedAt` (port of `recoveryCopyWins`, `src/lib/statePrecedence.ts`).
- **No screen ever calls the network.** Repositories read `LocalStore`; `SyncEngine` is the sole API caller.
- **Sync** = pull-catalogues (manifest diff; 404/403 → fetch-all fallback) + pull-attempts (merge by id) + drain-outbox (coalesced per key; failure classes forbidden/unauthorized/retryable).
- **Clocks are injected** — no `System.currentTimeMillis()`/`Instant.now()` inside schedulers or sync logic; pass a `Clock`/`now: Instant` parameter so behaviour is testable.
- All timestamps are ISO-8601 strings on the wire (match the web/server contract).

## Prerequisites (verified present on this machine)

- **JDK**: Android Studio's bundled JBR — OpenJDK **21** at
  `/Applications/Android Studio.app/Contents/jbr/Contents/Home`. `java` is NOT
  on `PATH`, so **every** Gradle command in this plan is prefixed with
  `JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"`.
- **Android SDK**: `~/Library/Android/sdk` — installed platform **android-36**
  and build-tools 36.x/37 (no `cmdline-tools`/`sdkmanager`, so we target what is
  installed: `compileSdk = 36`, `targetSdk = 36`). A `android/local.properties`
  with `sdk.dir=$HOME/Library/Android/sdk` is created in Task 1.
- Network access for the Gradle wrapper distribution, AGP/deps, and
  Robolectric's android-all jar on first run.

> If a build/test cannot run, stop and report — never fake a green build.

## File Structure

```
android/
  settings.gradle.kts
  build.gradle.kts
  gradle.properties
  gradle/libs.versions.toml            # version catalog
  gradle/wrapper/…                     # Gradle wrapper
  local.properties                     # sdk.dir (gitignored)
  .gitignore
  app/
    build.gradle.kts
    src/main/AndroidManifest.xml
    src/main/java/com/synapse/app/SynapseApp.kt          # Application
    src/main/java/com/synapse/app/core/config/AppConfig.kt
    src/main/java/com/synapse/app/core/model/Models.kt   # StateDoc, ManifestEntry, AttemptRecord, OutboxEntry
    src/main/java/com/synapse/app/core/sync/StateOwnership.kt
    src/main/java/com/synapse/app/core/sync/StatePrecedence.kt
    src/main/java/com/synapse/app/core/sync/SyncEngine.kt
    src/main/java/com/synapse/app/core/sync/SyncResult.kt
    src/main/java/com/synapse/app/core/api/SynapseApi.kt         # Retrofit interface + DTOs
    src/main/java/com/synapse/app/core/api/ApiError.kt
    src/main/java/com/synapse/app/core/cache/LocalStore.kt       # interface
    src/main/java/com/synapse/app/core/cache/room/…              # Room impl (entities, DAOs, db, RoomLocalStore)
    src/test/java/com/synapse/app/…                              # JVM unit tests (pure logic)
    src/test/java/com/synapse/app/core/cache/RoomLocalStoreTest.kt  # Robolectric
```

Rationale: pure-logic classes (`core.model`, `core.sync`, `core.api` DTOs) carry no Android imports, so their tests run under `testDebugUnitTest` on the JVM (fast, no emulator). Only `RoomLocalStore` needs Robolectric.

---

### Task 1: Scaffold the Android project with a green JVM test harness

**Files:**
- Create: `android/settings.gradle.kts`, `android/build.gradle.kts`, `android/gradle.properties`, `android/gradle/libs.versions.toml`, `android/.gitignore`, `android/app/build.gradle.kts`, `android/app/src/main/AndroidManifest.xml`, `android/app/src/main/java/com/synapse/app/SynapseApp.kt`
- Create (wrapper): `android/gradlew`, `android/gradlew.bat`, `android/gradle/wrapper/gradle-wrapper.properties`, `android/gradle/wrapper/gradle-wrapper.jar`
- Test: `android/app/src/test/java/com/synapse/app/SanityTest.kt`

**Interfaces:**
- Produces: a buildable `:app` module and a working `./gradlew :app:testDebugUnitTest` command that later tasks reuse.

- [ ] **Step 1: Point at the toolchain**

Run: `export JAVA_HOME="/Applications/Android Studio.app/Contents/jbr/Contents/Home"; "$JAVA_HOME/bin/java" -version` (expect openjdk 21) and `ls ~/Library/Android/sdk/platforms` (expect `android-36…`). If either is missing, stop and report. Every `./gradlew` command below assumes this `JAVA_HOME` is exported (or prefixed inline).

- [ ] **Step 2: Create local.properties + bootstrap the Gradle wrapper (no system gradle exists)**

1. `printf 'sdk.dir=%s\n' "$HOME/Library/Android/sdk" > android/local.properties`
2. Write `android/gradle/wrapper/gradle-wrapper.properties` with the standard four lines and `distributionUrl=https\://services.gradle.org/distributions/gradle-8.13-bin.zip`.
3. Fetch the pinned wrapper jar + scripts from the Gradle release tag:
   - `curl -fsSL -o android/gradle/wrapper/gradle-wrapper.jar https://raw.githubusercontent.com/gradle/gradle/v8.13.0/gradle/wrapper/gradle-wrapper.jar`
   - `curl -fsSL -o android/gradlew https://raw.githubusercontent.com/gradle/gradle/v8.13.0/gradlew && chmod +x android/gradlew`
   - `curl -fsSL -o android/gradlew.bat https://raw.githubusercontent.com/gradle/gradle/v8.13.0/gradlew.bat`
4. Verify: `(cd android && ./gradlew --version)` prints Gradle 8.13. (If the pinned tag 404s, use the latest `v8.13.x`/`v8.14` tag and matching `distributionUrl`.)

- [ ] **Step 3: Write `android/gradle/libs.versions.toml`**

```toml
[versions]
# AGP 8.11 supports compileSdk 36 and requires Gradle 8.13 (wrapper below).
agp = "8.11.1"
kotlin = "2.1.20"
ksp = "2.1.20-2.0.1"
coroutines = "1.9.0"
serialization = "1.7.3"
retrofit = "2.11.0"
okhttp = "4.12.0"
retrofitKotlinxConverter = "1.0.0"
room = "2.6.1"
junit = "4.13.2"
robolectric = "4.14"
androidxTestCore = "1.6.1"

[libraries]
kotlinx-coroutines-core = { module = "org.jetbrains.kotlinx:kotlinx-coroutines-core", version.ref = "coroutines" }
kotlinx-coroutines-test = { module = "org.jetbrains.kotlinx:kotlinx-coroutines-test", version.ref = "coroutines" }
kotlinx-serialization-json = { module = "org.jetbrains.kotlinx:kotlinx-serialization-json", version.ref = "serialization" }
retrofit = { module = "com.squareup.retrofit2:retrofit", version.ref = "retrofit" }
okhttp = { module = "com.squareup.okhttp3:okhttp", version.ref = "okhttp" }
okhttp-logging = { module = "com.squareup.okhttp3:logging-interceptor", version.ref = "okhttp" }
retrofit-kotlinx-converter = { module = "com.jakewharton.retrofit:retrofit2-kotlinx-serialization-converter", version.ref = "retrofitKotlinxConverter" }
room-runtime = { module = "androidx.room:room-runtime", version.ref = "room" }
room-ktx = { module = "androidx.room:room-ktx", version.ref = "room" }
room-compiler = { module = "androidx.room:room-compiler", version.ref = "room" }
room-testing = { module = "androidx.room:room-testing", version.ref = "room" }
junit = { module = "junit:junit", version.ref = "junit" }
robolectric = { module = "org.robolectric:robolectric", version.ref = "robolectric" }
androidx-test-core = { module = "androidx.test:core", version.ref = "androidxTestCore" }

[plugins]
android-application = { id = "com.android.application", version.ref = "agp" }
kotlin-android = { id = "org.jetbrains.kotlin.android", version.ref = "kotlin" }
kotlin-serialization = { id = "org.jetbrains.kotlin.plugin.serialization", version.ref = "kotlin" }
ksp = { id = "com.google.devtools.ksp", version.ref = "ksp" }
```

> If any version fails to resolve, bump it to the latest stable in the same major line and note it in the commit.

- [ ] **Step 4: Write `android/settings.gradle.kts`**

```kotlin
pluginManagement {
    repositories { google(); mavenCentral(); gradlePluginPortal() }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories { google(); mavenCentral() }
}
rootProject.name = "Synapse"
include(":app")
```

- [ ] **Step 5: Write `android/build.gradle.kts`, `android/gradle.properties`, `android/.gitignore`**

`android/build.gradle.kts`:
```kotlin
plugins {
    alias(libs.plugins.android.application) apply false
    alias(libs.plugins.kotlin.android) apply false
    alias(libs.plugins.kotlin.serialization) apply false
    alias(libs.plugins.ksp) apply false
}
```
`android/gradle.properties`:
```
org.gradle.jvmargs=-Xmx2048m -Dfile.encoding=UTF-8
android.useAndroidX=true
kotlin.code.style=official
```
`android/.gitignore`:
```
local.properties
.gradle/
build/
*.iml
.idea/
```

- [ ] **Step 6: Write `android/app/build.gradle.kts`**

```kotlin
plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.serialization)
    alias(libs.plugins.ksp)
}
android {
    namespace = "com.synapse.app"
    compileSdk = 36
    defaultConfig {
        applicationId = "com.synapse.app"
        minSdk = 26
        targetSdk = 36
        versionCode = 1
        versionName = "0.1.0"
        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions { jvmTarget = "17" }
    testOptions { unitTests { isIncludeAndroidResources = true } } // Robolectric
    buildTypes { release { isMinifyEnabled = false } }
}
dependencies {
    implementation(libs.kotlinx.coroutines.core)
    implementation(libs.kotlinx.serialization.json)
    implementation(libs.retrofit)
    implementation(libs.okhttp)
    implementation(libs.okhttp.logging)
    implementation(libs.retrofit.kotlinx.converter)
    implementation(libs.room.runtime)
    implementation(libs.room.ktx)
    ksp(libs.room.compiler)

    testImplementation(libs.junit)
    testImplementation(libs.kotlinx.coroutines.test)
    testImplementation(libs.robolectric)
    testImplementation(libs.androidx.test.core)
    testImplementation(libs.room.testing)
}
```

- [ ] **Step 7: Write the Application class + manifest**

`android/app/src/main/AndroidManifest.xml`:
```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <uses-permission android:name="android.permission.INTERNET" />
    <application
        android:name=".SynapseApp"
        android:label="Synapse"
        android:allowBackup="false"
        android:supportsRtl="true">
    </application>
</manifest>
```
`android/app/src/main/java/com/synapse/app/SynapseApp.kt`:
```kotlin
package com.synapse.app
import android.app.Application
class SynapseApp : Application()
```

- [ ] **Step 8: Write the sanity test**

`android/app/src/test/java/com/synapse/app/SanityTest.kt`:
```kotlin
package com.synapse.app
import org.junit.Assert.assertEquals
import org.junit.Test
class SanityTest {
    @Test fun harnessRuns() { assertEquals(4, 2 + 2) }
}
```

- [ ] **Step 9: Run the test harness**

Run: `cd android && ./gradlew :app:testDebugUnitTest`
Expected: BUILD SUCCESSFUL, `SanityTest` passes.

- [ ] **Step 10: Commit**

```bash
git add android/
git commit -m "feat(android): scaffold app module + green JVM test harness"
```

---

### Task 2: `StateOwnership` — exact port of `USER_OWNED_PATTERNS`

**Files:**
- Create: `android/app/src/main/java/com/synapse/app/core/sync/StateOwnership.kt`
- Test: `android/app/src/test/java/com/synapse/app/core/sync/StateOwnershipTest.kt`

**Interfaces:**
- Produces: `object StateOwnership { fun isUserOwned(key: String): Boolean }`.

- [ ] **Step 1: Write the failing test** (cases mirror the web families + guards from `stateOwnership.ts`)

```kotlin
package com.synapse.app.core.sync
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test
class StateOwnershipTest {
    @Test fun userOwnedDottedFamilies() {
        listOf(
            "synapse.notebook.notes", "synapse.whiteboard.boards.v1",
            "synapse.qbank.session.2026-08", "synapse.flashcards.decks.v1",
            "synapse.flashcards.dailyCounts.v1", "synapse.annotations.v1.d-abc.s0",
            "synapse.reader.prefs", "synapse.bookmarks.resources.v1",
            "synapse.progress.mastery.v1", "synapse.maristanas.tour",
            "synapse.myDocuments.v1", "synapse.termgrid.state",
            "synapse.practical.progress", "synapse.essay.answers",
            "synapse.highlights.x", "synapse.account.prefs",
            "synapse.calendar.blocks",
            "synapse.library.marks", "synapse.library.read",
            "synapse.library.userArticles", "synapse.library.personalTags",
        ).forEach { assertTrue(it, StateOwnership.isUserOwned(it)) }
    }
    @Test fun userOwnedExactAndHyphenated() {
        assertTrue(StateOwnership.isUserOwned("synapse-lang"))
        assertTrue(StateOwnership.isUserOwned("synapse-applied-voucher-v1"))
        assertTrue(StateOwnership.isUserOwned("synapse-notification-read-v1-user42"))
    }
    @Test fun sharedCatalogueKeysAreNotUserOwned() {
        listOf(
            "synapse-admin-content-ledger-v4", "synapse-lang-extra",
            "synapse.library", "synapse.calendar.blocks.extra",
            "synapse-applied-voucher-v1-x", "app_state",
        ).forEach { assertFalse(it, StateOwnership.isUserOwned(it)) }
    }
}
```

> Note the anchoring the web relies on: `^synapse-lang$` (exact), `^synapse\.calendar\.blocks$` (exact), `^synapse-applied-voucher-v1$` (exact) — so `synapse-lang-extra`, `synapse.calendar.blocks.extra`, `synapse-applied-voucher-v1-x` are **shared**. The dotted families use prefix (`^synapse\.qbank\.`), and `synapse.library.(read|userArticles|personalTags|marks)` matches a group prefix. Preserve these exactly.

- [ ] **Step 2: Run test to verify it fails**

Run: `cd android && ./gradlew :app:testDebugUnitTest --tests "com.synapse.app.core.sync.StateOwnershipTest"`
Expected: FAIL (unresolved reference `StateOwnership`).

- [ ] **Step 3: Write the implementation** (regexes transcribed 1:1 from `src/lib/stateOwnership.ts:6-37`)

```kotlin
package com.synapse.app.core.sync

/**
 * Direct port of the web app's USER_OWNED_PATTERNS (src/lib/stateOwnership.ts).
 * Chooses the endpoint only; the server derives the real owner from the session.
 * A mismatch here silently splits a student's progress across devices — keep it
 * byte-for-byte in sync with the web list (and the iOS StateOwnership.swift).
 */
object StateOwnership {
    private val userOwned: List<Regex> = listOf(
        Regex("^synapse-lang$"),
        Regex("^synapse\\.notebook\\."),
        Regex("^synapse\\.whiteboard\\."),
        Regex("^synapse\\.calendar\\.blocks$"),
        Regex("^synapse\\.library\\.(read|userArticles|personalTags|marks)"),
        Regex("^synapse\\.account\\."),
        Regex("^synapse-notification-read-v1-"),
        Regex("^synapse-applied-voucher-v1$"),
        Regex("^synapse\\.qbank\\."),
        Regex("^synapse\\.flashcards\\."),
        Regex("^synapse\\.practical\\."),
        Regex("^synapse\\.essay\\."),
        Regex("^synapse\\.highlights\\."),
        Regex("^synapse\\.annotations\\."),
        Regex("^synapse\\.reader\\."),
        Regex("^synapse\\.bookmarks\\."),
        Regex("^synapse\\.progress\\."),
        Regex("^synapse\\.maristanas\\."),
        Regex("^synapse\\.myDocuments\\."),
        Regex("^synapse\\.termgrid\\."),
    )

    fun isUserOwned(key: String): Boolean = userOwned.any { it.containsMatchIn(key) }
}
```

> `containsMatchIn` with `^`-anchored patterns matches the JS `pattern.test(key)` semantics used by the web.

- [ ] **Step 4: Run test to verify it passes**

Run: `cd android && ./gradlew :app:testDebugUnitTest --tests "com.synapse.app.core.sync.StateOwnershipTest"`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add android/app/src/main/java/com/synapse/app/core/sync/StateOwnership.kt android/app/src/test/java/com/synapse/app/core/sync/StateOwnershipTest.kt
git commit -m "feat(android): port StateOwnership key routing (matches web + iOS)"
```

---

### Task 3: `StatePrecedence` — port of `recoveryCopyWins`

**Files:**
- Create: `android/app/src/main/java/com/synapse/app/core/sync/StatePrecedence.kt`
- Test: `android/app/src/test/java/com/synapse/app/core/sync/StatePrecedenceTest.kt`

**Interfaces:**
- Produces: `object StatePrecedence { fun localCopyWins(savedAt: String?, serverUpdatedAt: String?): Boolean }`.

- [ ] **Step 1: Write the failing test** (cases mirror `statePrecedence.ts`)

```kotlin
package com.synapse.app.core.sync
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test
class StatePrecedenceTest {
    private val t1 = "2026-08-20T10:00:00.000Z"
    private val t2 = "2026-08-20T11:00:00.000Z"
    @Test fun nullLocalNeverWins() = assertFalse(StatePrecedence.localCopyWins(null, t1))
    @Test fun unreadableLocalNeverWins() = assertFalse(StatePrecedence.localCopyWins("not-a-date", t1))
    @Test fun nullServerLetsLocalWin() = assertTrue(StatePrecedence.localCopyWins(t1, null))
    @Test fun unreadableServerLetsLocalWin() = assertTrue(StatePrecedence.localCopyWins(t1, "not-a-date"))
    @Test fun strictlyNewerWins() = assertTrue(StatePrecedence.localCopyWins(t2, t1))
    @Test fun equalDoesNotWin() = assertFalse(StatePrecedence.localCopyWins(t1, t1))
    @Test fun olderDoesNotWin() = assertFalse(StatePrecedence.localCopyWins(t1, t2))
}
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd android && ./gradlew :app:testDebugUnitTest --tests "com.synapse.app.core.sync.StatePrecedenceTest"`
Expected: FAIL (unresolved reference).

- [ ] **Step 3: Write the implementation** (semantics identical to `statePrecedence.ts:11-26`)

```kotlin
package com.synapse.app.core.sync
import java.time.Instant

object StatePrecedence {
    private fun parseOrNull(s: String?): Instant? =
        if (s == null) null else try { Instant.parse(s) } catch (e: Exception) { null }

    /** Port of web `recoveryCopyWins`: a local write wins only when strictly newer. */
    fun localCopyWins(savedAt: String?, serverUpdatedAt: String?): Boolean {
        val saved = parseOrNull(savedAt) ?: return false
        val server = parseOrNull(serverUpdatedAt) ?: return true
        return saved.isAfter(server) // strictly newer; equal means server already has it
    }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd android && ./gradlew :app:testDebugUnitTest --tests "com.synapse.app.core.sync.StatePrecedenceTest"`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add android/app/src/main/java/com/synapse/app/core/sync/StatePrecedence.kt android/app/src/test/java/com/synapse/app/core/sync/StatePrecedenceTest.kt
git commit -m "feat(android): port StatePrecedence (strictly-newer local wins)"
```

---

### Task 4: Core models + `SynapseApi` interface + `ApiError`

**Files:**
- Create: `core/model/Models.kt`, `core/api/SynapseApi.kt`, `core/api/ApiError.kt`
- Test: `core/api/ModelsSerializationTest.kt`

**Interfaces:**
- Produces:
  - `@Serializable data class StateDoc(val value: JsonElement, val version: Long? = null, val updatedAt: String? = null)`
  - `typealias Manifest = Map<String, String>` (key → updatedAt)
  - `@Serializable data class AttemptRecord(val id: String, val month: String, val payload: JsonObject)`
  - `sealed interface ApiError { object Unauthorized; object Forbidden; data class Retryable(val cause: Throwable) }`
  - `interface SynapseApi { suspend fun session(): SessionDto; suspend fun manifest(): Manifest; suspend fun getState(key: String): StateDoc; suspend fun getUserState(key: String): StateDoc; suspend fun putUserState(key: String, doc: StateDoc); suspend fun getAttempts(month: String): List<AttemptRecord>; suspend fun postAttempt(a: AttemptRecord) }`

- [ ] **Step 1: Write the failing test** (serialization round-trip proves the wire shape)

```kotlin
package com.synapse.app.core.api
import com.synapse.app.core.model.StateDoc
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.encodeToString
import org.junit.Assert.assertEquals
import org.junit.Test
class ModelsSerializationTest {
    @Test fun stateDocRoundTrips() {
        val doc = StateDoc(value = JsonPrimitive("hello"), version = 3, updatedAt = "2026-08-20T10:00:00Z")
        val json = Json.encodeToString(doc)
        val back = Json.decodeFromString<StateDoc>(json)
        assertEquals(doc, back)
    }
}
```

- [ ] **Step 2: Run to verify it fails** — `--tests "com.synapse.app.core.api.ModelsSerializationTest"` → FAIL.

- [ ] **Step 3: Implement models, ApiError, and the Retrofit interface**

`core/model/Models.kt`:
```kotlin
package com.synapse.app.core.model
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonObject

@Serializable data class StateDoc(val value: JsonElement, val version: Long? = null, val updatedAt: String? = null)
@Serializable data class SessionDto(val userId: String)
@Serializable data class AttemptRecord(val id: String, val month: String, val payload: JsonObject)
typealias Manifest = Map<String, String>
```
`core/api/ApiError.kt`:
```kotlin
package com.synapse.app.core.api
sealed interface ApiError {
    data object Unauthorized : ApiError            // 401 — stop draining, keep everything
    data object Forbidden : ApiError               // 403 — abandon this entry permanently
    data class Retryable(val cause: Throwable) : ApiError
}
class ApiException(val error: ApiError) : Exception()
```
`core/api/SynapseApi.kt`:
```kotlin
package com.synapse.app.core.api
import com.synapse.app.core.model.*

interface SynapseApi {
    suspend fun session(): SessionDto
    suspend fun manifest(): Manifest
    suspend fun getState(key: String): StateDoc
    suspend fun getUserState(key: String): StateDoc
    suspend fun putUserState(key: String, doc: StateDoc)
    suspend fun getAttempts(month: String): List<AttemptRecord>
    suspend fun postAttempt(attempt: AttemptRecord)
}
```

> The Retrofit-backed implementation (base URL from `AppConfig`, Bearer header from a token provider, mapping HTTP 401→`Unauthorized`/403→`Forbidden`/else→`Retryable`) is built in Task 7; `SyncEngine` (Task 6) depends only on this interface so it stays JVM-unit-testable with a fake.

- [ ] **Step 4: Run to verify it passes** → PASS.

- [ ] **Step 5: Commit**

```bash
git add android/app/src/main/java/com/synapse/app/core/model/ android/app/src/main/java/com/synapse/app/core/api/
git commit -m "feat(android): core models + SynapseApi interface + ApiError"
```

---

### Task 5: `LocalStore` interface + Room implementation

**Files:**
- Create: `core/cache/LocalStore.kt` (interface), `core/cache/room/Entities.kt`, `core/cache/room/Daos.kt`, `core/cache/room/SynapseDatabase.kt`, `core/cache/room/RoomLocalStore.kt`
- Test: `core/cache/RoomLocalStoreTest.kt` (Robolectric)

**Interfaces:**
- Produces:
  - `interface LocalStore { suspend fun putCatalogue(key: String, updatedAt: String, json: String); suspend fun catalogueUpdatedAt(key: String): String?; suspend fun getCatalogue(key: String): String?; suspend fun enqueue(key: String, json: String); suspend fun pendingOutbox(): List<OutboxEntry>; suspend fun clearOutbox(key: String); suspend fun putAttempts(items: List<AttemptRecord>); suspend fun attempts(month: String): List<AttemptRecord>; suspend fun clearAll() }`
  - `data class OutboxEntry(val key: String, val json: String)`

- [ ] **Step 1: Write the failing Robolectric test**

```kotlin
package com.synapse.app.core.cache
import androidx.room.Room
import androidx.test.core.app.ApplicationProvider
import com.synapse.app.core.cache.room.RoomLocalStore
import com.synapse.app.core.cache.room.SynapseDatabase
import kotlinx.coroutines.test.runTest
import org.junit.After
import org.junit.Assert.*
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
@RunWith(RobolectricTestRunner::class)
class RoomLocalStoreTest {
    private lateinit var db: SynapseDatabase
    private lateinit var store: RoomLocalStore
    @Before fun setup() {
        db = Room.inMemoryDatabaseBuilder(ApplicationProvider.getApplicationContext(), SynapseDatabase::class.java).allowMainThreadQueries().build()
        store = RoomLocalStore(db)
    }
    @After fun teardown() = db.close()

    @Test fun catalogueUpsertAndRead() = runTest {
        store.putCatalogue("k", "2026-08-20T10:00:00Z", "{\"a\":1}")
        assertEquals("2026-08-20T10:00:00Z", store.catalogueUpdatedAt("k"))
        assertEquals("{\"a\":1}", store.getCatalogue("k"))
        store.putCatalogue("k", "2026-08-20T11:00:00Z", "{\"a\":2}") // upsert
        assertEquals("2026-08-20T11:00:00Z", store.catalogueUpdatedAt("k"))
    }
    @Test fun outboxCoalescesPerKey() = runTest {
        store.enqueue("synapse.notebook.notes", "v1")
        store.enqueue("synapse.notebook.notes", "v2") // replaces, not appends
        val pending = store.pendingOutbox()
        assertEquals(1, pending.size)
        assertEquals("v2", pending.first().json)
        store.clearOutbox("synapse.notebook.notes")
        assertTrue(store.pendingOutbox().isEmpty())
    }
    @Test fun clearAllWipesEverything() = runTest {
        store.putCatalogue("k", "t", "{}"); store.enqueue("x", "y")
        store.clearAll()
        assertNull(store.getCatalogue("k")); assertTrue(store.pendingOutbox().isEmpty())
    }
}
```

- [ ] **Step 2: Run to verify it fails** → FAIL (unresolved `RoomLocalStore`/`SynapseDatabase`).

- [ ] **Step 3: Implement entities, DAOs, database, and `RoomLocalStore`**

`core/cache/LocalStore.kt`:
```kotlin
package com.synapse.app.core.cache
import com.synapse.app.core.model.AttemptRecord
data class OutboxEntry(val key: String, val json: String)
interface LocalStore {
    suspend fun putCatalogue(key: String, updatedAt: String, json: String)
    suspend fun catalogueUpdatedAt(key: String): String?
    suspend fun getCatalogue(key: String): String?
    suspend fun enqueue(key: String, json: String)
    suspend fun pendingOutbox(): List<OutboxEntry>
    suspend fun clearOutbox(key: String)
    suspend fun putAttempts(items: List<AttemptRecord>)
    suspend fun attempts(month: String): List<AttemptRecord>
    suspend fun clearAll()
}
```
`core/cache/room/Entities.kt`:
```kotlin
package com.synapse.app.core.cache.room
import androidx.room.Entity
import androidx.room.PrimaryKey
@Entity(tableName = "catalogue")
data class CatalogueEntity(@PrimaryKey val key: String, val updatedAt: String, val json: String, val fetchedAt: Long)
@Entity(tableName = "outbox")
data class OutboxEntity(@PrimaryKey val key: String, val json: String, val enqueuedAt: Long)
@Entity(tableName = "attempt")
data class AttemptEntity(@PrimaryKey val id: String, val month: String, val json: String)
```
`core/cache/room/Daos.kt` — `@Dao` interfaces with `@Upsert` for catalogue/outbox (upsert gives per-key coalescing), `@Query("SELECT updatedAt FROM catalogue WHERE key=:key")`, `@Query("DELETE FROM outbox WHERE key=:key")`, `@Query("SELECT * FROM attempt WHERE month=:month")`, plus `@Query("DELETE FROM catalogue")` etc. for `clearAll`.

`core/cache/room/SynapseDatabase.kt`:
```kotlin
package com.synapse.app.core.cache.room
import androidx.room.Database
import androidx.room.RoomDatabase
@Database(entities = [CatalogueEntity::class, OutboxEntity::class, AttemptEntity::class], version = 1, exportSchema = true)
abstract class SynapseDatabase : RoomDatabase() {
    abstract fun catalogueDao(): CatalogueDao
    abstract fun outboxDao(): OutboxDao
    abstract fun attemptDao(): AttemptDao
}
```
`RoomLocalStore` implements `LocalStore`, mapping `AttemptRecord` ↔ `AttemptEntity` (serialize `payload` via `Json`). (FTS `item` table + full-text search is added in Plan 03 when the content ledger is shredded; not needed by the spine.)

> Robolectric 4.14 does not ship an android-all jar for API 36, so pin the emulated SDK: create `android/app/src/test/resources/robolectric.properties` containing `sdk=34`. (This only affects Robolectric's emulated runtime, not `compileSdk`.)

- [ ] **Step 4: Run to verify it passes** → PASS (all three tests).

- [ ] **Step 5: Commit**

```bash
git add android/app/src/main/java/com/synapse/app/core/cache/ android/app/src/test/java/com/synapse/app/core/cache/
git commit -m "feat(android): Room-backed LocalStore (catalogue/outbox/attempt) + tests"
```

---

### Task 6: `SyncEngine` — manifest-diff pull, attempt merge, outbox drain

**Files:**
- Create: `core/sync/SyncEngine.kt`, `core/sync/SyncResult.kt`
- Test: `core/sync/SyncEngineTest.kt` (JVM, with fake `SynapseApi` + fake `LocalStore`)

**Interfaces:**
- Consumes: `SynapseApi` (Task 4), `LocalStore` (Task 5), `StateOwnership` (Task 2), `StatePrecedence` (Task 3).
- Produces: `class SyncEngine(api, store, readableKeys: List<String>) { suspend fun refresh(now: Instant): SyncResult; suspend fun write(key: String, json: String, savedAt: Instant) }`.

- [ ] **Step 1: Write the failing tests** (behaviours ported from `SyncEngineTests.swift`)

```kotlin
package com.synapse.app.core.sync
// … fakes for SynapseApi + LocalStore defined in the test file …
class SyncEngineTest {
    @Test fun manifestDiffOnlyRefetchesChangedKeys() { /* seed catalogue k1@t1; manifest {k1:t1,k2:t2}; assert only k2 fetched */ }
    @Test fun manifest404FallsBackToFetchingAllReadableKeys() { /* api.manifest throws Retryable(404-ish); assert all readableKeys fetched */ }
    @Test fun writeToSharedKeyIsRejected() { /* write("synapse-admin-content-ledger-v4", …) throws IllegalArgument; not enqueued */ }
    @Test fun writeToUserKeyEnqueuesThenDrainsToPutUserState() { /* write("synapse.notebook.notes", …) → api.putUserState called once */ }
    @Test fun outboxCoalescesLastWriteWins() { /* two writes same key before drain → one PUT with the later json */ }
    @Test fun forbiddenEntryIsAbandoned() { /* putUserState throws Forbidden → entry cleared, drain continues */ }
    @Test fun unauthorizedStopsDrainAndKeepsEntries() { /* putUserState throws Unauthorized → entry NOT cleared, drain stops */ }
    @Test fun attemptsMergeByIdNotReplace() { /* local has attempt A; pull returns B; store has A and B */ }
}
```

- [ ] **Step 2: Run to verify they fail** → FAIL.

- [ ] **Step 3: Implement `SyncEngine`**

```kotlin
package com.synapse.app.core.sync
import com.synapse.app.core.api.*
import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.model.StateDoc
import kotlinx.serialization.json.Json
import java.time.Instant

class SyncEngine(
    private val api: SynapseApi,
    private val store: LocalStore,
    private val readableKeys: List<String>,
) {
    suspend fun refresh(now: Instant): SyncResult {
        pullCatalogues()
        pullAttempts(now)
        return drainOutbox()
    }

    private suspend fun pullCatalogues() {
        val manifest = try { api.manifest() } catch (e: Exception) { null }
        val keys = if (manifest == null) readableKeys
                   else manifest.filter { (k, ts) -> store.catalogueUpdatedAt(k) != ts }.keys.toList()
        for (key in keys) {
            val doc = try { api.getState(key) } catch (e: Exception) { continue }
            store.putCatalogue(key, doc.updatedAt ?: "", Json.encodeToString(StateDoc.serializer(), doc))
        }
    }

    private suspend fun pullAttempts(now: Instant) {
        val month = "%04d-%02d".format(now.atZone(java.time.ZoneOffset.UTC).year, now.atZone(java.time.ZoneOffset.UTC).monthValue)
        val remote = try { api.getAttempts(month) } catch (e: Exception) { return }
        store.putAttempts(remote) // upsert by id → merge, never wholesale replace
    }

    /** Public write path: reject shared keys, enqueue, then drain. */
    suspend fun write(key: String, json: String, savedAt: Instant) {
        require(StateOwnership.isUserOwned(key)) { "Refusing to write shared/admin key from client: $key" }
        store.enqueue(key, json)
        drainOutbox()
    }

    private suspend fun drainOutbox(): SyncResult {
        var pushed = 0; var abandoned = 0
        for (entry in store.pendingOutbox()) {
            try {
                api.putUserState(entry.key, StateDoc(value = Json.parseToJsonElement(entry.json)))
                store.clearOutbox(entry.key); pushed++
            } catch (e: ApiException) {
                when (e.error) {
                    is ApiError.Forbidden -> { store.clearOutbox(entry.key); abandoned++ }  // never succeeds
                    is ApiError.Unauthorized -> return SyncResult(pushed, abandoned, stoppedUnauthorized = true) // keep, stop
                    is ApiError.Retryable -> { /* leave in outbox, try next time */ }
                }
            }
        }
        return SyncResult(pushed, abandoned, stoppedUnauthorized = false)
    }
}
```
`core/sync/SyncResult.kt`:
```kotlin
package com.synapse.app.core.sync
data class SyncResult(val pushed: Int, val abandoned: Int, val stoppedUnauthorized: Boolean)
```

> `StatePrecedence.localCopyWins` is consumed when hydrating a crash-recovery copy at startup (wired in Foundation B, where a persisted "last write" is compared to the server `updatedAt` before it may overwrite). It is unit-tested already in Task 3; add a `refresh`-time guard usage in Plan 02.

- [ ] **Step 4: Run to verify they pass** → PASS (all 8).

- [ ] **Step 5: Commit**

```bash
git add android/app/src/main/java/com/synapse/app/core/sync/SyncEngine.kt android/app/src/main/java/com/synapse/app/core/sync/SyncResult.kt android/app/src/test/java/com/synapse/app/core/sync/SyncEngineTest.kt
git commit -m "feat(android): SyncEngine (manifest diff, attempt merge, outbox drain)"
```

---

### Task 7: `AppConfig` + Retrofit `SynapseApi` implementation

**Files:**
- Create: `core/config/AppConfig.kt`, `core/api/RetrofitSynapseApi.kt`, `core/api/AuthedOkHttp.kt`
- Modify: `android/app/build.gradle.kts` (inject `API_HOST`, `SUPABASE_HOST`, `SUPABASE_ANON_KEY` into `BuildConfig` from a gitignored `secrets.properties`)
- Test: `core/config/AppConfigTest.kt`, `core/api/RetrofitSynapseApiTest.kt` (OkHttp `MockWebServer`)

**Interfaces:**
- Produces: `class AppConfig(val apiBase: String, val supabaseHost: String, val supabaseAnonKey: String) { val isConfigured: Boolean }`, and `RetrofitSynapseApi(config, tokenProvider: suspend () -> String?) : SynapseApi` mapping HTTP 401→`Unauthorized`, 403→`Forbidden`, else→`Retryable`.

- [ ] **Step 1: Write failing tests**

`AppConfigTest`: `isConfigured` is false when host/key blank, true when both present; `apiBase` = `https://<host>/api`.
`RetrofitSynapseApiTest` (MockWebServer): `getUserState` returns parsed `StateDoc`; a 401 response throws `ApiException(Unauthorized)`; a 403 throws `Forbidden`; a 500 throws `Retryable`; the `Authorization: Bearer <token>` header is sent from the token provider.

- [ ] **Step 2: Run to verify they fail** → FAIL.

- [ ] **Step 3: Implement**

- `secrets.properties` loading in `app/build.gradle.kts`: read `API_HOST`, `SUPABASE_HOST`, `SUPABASE_ANON_KEY` (empty defaults) and emit `buildConfigField(...)`; enable `buildFeatures { buildConfig = true }`. Add `secrets.properties` to `android/.gitignore`; create `android/secrets.properties.example` with the three empty keys documented (mirror `ios/Config/Secrets.example.xcconfig`).
- `AppConfig` reads from `BuildConfig`.
- `AuthedOkHttp`: an OkHttp `Interceptor` that adds `Authorization: Bearer <token>` from the (suspend-bridged) token provider.
- `RetrofitSynapseApi`: a Retrofit service with the `retrofit2-kotlinx-serialization-converter`, wrapping calls to translate HTTP status → `ApiException`.

- [ ] **Step 4: Run to verify they pass** → PASS.

- [ ] **Step 5: Commit**

```bash
git add android/app/ 
git commit -m "feat(android): AppConfig + Retrofit SynapseApi (auth header, error mapping)"
```

---

## Self-Review

**Spec coverage (§4/§5.0/§7 of the spec):**
- Offline-first, single-network-caller → Tasks 5,6,7. ✅
- Manifest-diff pull + 404 fallback → Task 6. ✅
- Attempt merge-by-id → Tasks 5,6. ✅
- Outbox coalescing + failure classes (forbidden/unauthorized/retryable) → Tasks 5,6. ✅
- StateOwnership exact port → Task 2. ✅
- StatePrecedence strictly-newer → Task 3 (usage wired in Plan 02). ✅
- Auth token on API calls, error mapping → Task 7. ✅
- `AppConfig` + "not configured" data → Task 7 (the *screen* is Plan 02). ✅
- Room store (catalogue/outbox/attempt); FTS `item` table → deferred to Plan 03 (noted in Task 5), which is when the content ledger is shredded. ✅ (documented, not a gap)
- App shell, auth screens, Dashboard → **Plan 02** (out of scope here by design). ✅

**Placeholder scan:** the only "later plan" references are the FTS `item` table (Plan 03) and the `StatePrecedence` startup-usage wiring (Plan 02); both are deliberate cross-plan handoffs, not in-plan placeholders. Every code step here has real, runnable code. ✅

**Type consistency:** `StateOwnership.isUserOwned`, `StatePrecedence.localCopyWins`, `LocalStore` method names, `SyncEngine(api, store, readableKeys)`, `SyncResult(pushed, abandoned, stoppedUnauthorized)`, `ApiError.{Unauthorized,Forbidden,Retryable}` are used consistently across Tasks 2–7. ✅
