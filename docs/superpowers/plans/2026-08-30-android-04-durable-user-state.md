# Plan 04 — Durable user-state store (foundation)

**Why:** The sync spine can *write* user-owned keys (outbox → push) but has no durable
local cache to *read* arbitrary per-student mutable JSON back offline, and `refresh` never
*pulls* user-owned singleton docs onto a fresh device. Verified: `StatePrecedence.localCopyWins`
has **zero** production call sites; `getUserState` exists only in the API/Retrofit layer + test
fakes. QBank sidestepped this with a bespoke append-only attempts table. Flashcards is the first
feature that must durably read back a mutable per-student document — and Notebook + Whiteboard
will too. Build the generic store once.

**Scope:** singleton user-owned documents (e.g. `synapse.flashcards.decks.v1`,
`synapse.flashcards.dailyCounts.v1`, and later notebook/whiteboard docs). Attempts keep their own
existing append-only table + merge path — do **not** fold them in. No feature UI here; this is
pure infrastructure with unit tests.

## Design

### Room (`core/cache/room`)
- New `@Entity(tableName = "user_state") data class UserStateEntity(@PrimaryKey val key: String, val json: String, val savedAt: String?, val serverUpdatedAt: String?)`.
  - `json` = the StateDoc **value** JSON. `savedAt` = ISO-8601 of the last *local* write (null if
    purely server-sourced). `serverUpdatedAt` = the server's `updatedAt` from the last pull.
- New `UserStateDao`: `@Upsert upsert`, `@Query json(key)`, `@Query savedAt(key)`, `@Query clear()`.
- Add `UserStateEntity` to `@Database` and bump version **1 → 2** with a real `Migration(1,2)` that
  `CREATE TABLE IF NOT EXISTS user_state (...)`. (App is pre-release, but a proper migration is
  cheap and avoids wiping the catalogue cache.)

### `LocalStore` (interface + `RoomLocalStore`)
- `suspend fun putUserState(key: String, json: String, savedAt: String?, serverUpdatedAt: String?)`
- `suspend fun getUserState(key: String): String?`  — the value JSON, or null.
- `suspend fun userStateSavedAt(key: String): String?`
- Extend `clearAll()` to clear `user_state` too. Update all `LocalStore` test fakes accordingly.

### `SyncEngine`
- `write(key, json, savedAt)`: **write-through** to the durable store —
  `store.putUserState(key, json, savedAt.toString(), serverUpdatedAt = <keep existing>)` — *before*
  `enqueue`, so an offline read immediately after a write sees the new value. Then enqueue + drain
  as today (unchanged).
- `refresh`: add `pullUserState()` (offline-tolerant, per-key try/continue, **rethrow
  `CancellationException`**). For each key in an injected `userStateKeys: List<String>`:
  `api.getUserState(key)`; if `StatePrecedence.localCopyWins(store.userStateSavedAt(key), serverDoc.updatedAt)`
  → skip (a local pending write is newer); else
  `store.putUserState(key, serverDoc.value.toString(), savedAt = serverDoc.updatedAt, serverUpdatedAt = serverDoc.updatedAt)`.
- Constructor gains `userStateKeys: List<String>` (like `readableKeys`).

### DI (`di/AppModule`)
- Provide the known singleton user-owned keys (start with the two flashcard keys; extend as
  features land) and pass into `SyncEngine`.

## Tasks
1. **Room + LocalStore** (TDD): entity/dao/migration + `RoomLocalStore` impl + interface methods +
   fakes updated. Tests: user-state upsert/read round-trip; `clearAll` clears it; migration 1→2
   opens and the table is usable. Commit.
2. **SyncEngine pull + write-through** (TDD): write-through makes `getUserState` return the written
   value with no network; `pullUserState` applies precedence (local-newer kept, server-newer taken)
   and is offline-tolerant; `CancellationException` propagates. Extend `SyncEngineTest` fakes/keys.
   Commit.

Gates each task: `:app:testDebugUnitTest` (169 baseline) + `:app:assembleDebug`.

## Deferred / notes
- The speculative `pullAttempts`/`api.getAttempts` GET (flagged in Plan 03) is **not** touched here.
- A thin `UserStateRepository` read helper is **not** built; features read via `LocalStore.getUserState`
  and write via `SyncEngine.write`, exactly as `QBankRepository` uses the catalogue today.
- Wiring the *flagged/missed/previous* QBank sources onto this store is a later QBank follow-up.
