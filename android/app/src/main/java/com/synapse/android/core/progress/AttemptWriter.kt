package com.synapse.android.core.progress

import com.synapse.android.core.cache.LocalStore
import com.synapse.android.core.sync.SyncEngine
import java.time.Instant
import kotlinx.serialization.json.Json

/**
 * The one place an attempt is banked.
 *
 * Every surface that logs an attempt -- the question bank runner, and all
 * three practical surfaces -- goes through here. It used to be copied
 * character for character into each ViewModel that needed it, which meant
 * the dedupe invariant below existed in two places and a fix to one of them
 * silently missed the other.
 *
 * Read-modify-write through [LocalStore], never the API. Two documents
 * change per attempt: the month shard the record actually lives in, and the
 * index that lets headline totals be read without opening every shard.
 * [SyncEngine.write] saves each locally and queues it in one transaction, so
 * an attempt made offline is queued rather than lost.
 *
 * [AttemptStore.addAttempt] refuses a record whose id already exists in the
 * shard by handing back the exact same [AttemptMonth] instance it was given.
 * That identity is the signal a duplicate call must not also fold into
 * [AttemptIndex.totals] -- so when nothing changed, nothing is written, to
 * either document.
 *
 * **This is not itself atomic against a concurrent caller.** Two coroutines
 * banking an attempt at the same moment both read the shard, both add their
 * own record to the copy they read, and the later write wins -- losing one
 * record from the shard and one fold from the index. Callers that can be
 * driven concurrently by independent user taps must serialise their own
 * mutation path; see [com.synapse.android.feature.practical.PracticalViewModel].
 * [com.synapse.android.feature.qbank.RunnerViewModel] does not need to: it
 * banks every attempt of a sitting in one sequential loop inside a single
 * coroutine.
 */
suspend fun writeAttempt(store: LocalStore, sync: SyncEngine, record: AttemptRecord) {
    val monthName = AttemptStore.month(Instant.parse(record.at))
    val monthKey = AttemptStore.monthKey(monthName)
    val month = store.document(monthKey)?.json?.let { attemptJson.decodeFromString(AttemptMonth.serializer(), it) }
        ?: AttemptMonth(month = monthName)
    val updatedMonth = AttemptStore.addAttempt(month, record)
    if (updatedMonth === month) return
    sync.write(monthKey, attemptJson.encodeToString(AttemptMonth.serializer(), updatedMonth))

    val index = store.document(AttemptStore.INDEX_KEY)?.json
        ?.let { attemptJson.decodeFromString(AttemptIndex.serializer(), it) }
        ?: AttemptIndex()
    sync.write(AttemptStore.INDEX_KEY, attemptJson.encodeToString(AttemptIndex.serializer(), AttemptStore.index(index, record)))
}

private val attemptJson = Json { ignoreUnknownKeys = true }
