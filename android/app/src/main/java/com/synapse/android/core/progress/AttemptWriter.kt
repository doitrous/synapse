package com.synapse.android.core.progress

import com.synapse.android.core.CortexJson
import com.synapse.android.core.cache.LocalStore
import com.synapse.android.core.sync.SyncEngine
import java.time.Instant

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
 * record from the shard and one fold from the index. Every caller that can
 * be driven concurrently by independent user taps serialises its own
 * mutation path behind a `Mutex`, and both of them can be: see
 * [com.synapse.android.feature.practical.PracticalViewModel] for the three
 * practical surfaces, and [com.synapse.android.feature.qbank.RunnerViewModel],
 * whose tutor mode launches one banking coroutine per answer checked. Only
 * the timed-mode finish path is naturally sequential, and it takes the same
 * lock rather than resting on that.
 */
suspend fun writeAttempt(store: LocalStore, sync: SyncEngine, record: AttemptRecord) {
    val monthName = AttemptStore.month(Instant.parse(record.at))
    val monthKey = AttemptStore.monthKey(monthName)
    val month = store.document(monthKey)?.json?.let { CortexJson.decodeFromString(AttemptMonth.serializer(), it) }
        ?: AttemptMonth(month = monthName)
    val updatedMonth = AttemptStore.addAttempt(month, record)
    if (updatedMonth === month) return
    sync.write(monthKey, CortexJson.encodeToString(AttemptMonth.serializer(), updatedMonth))

    val index = store.document(AttemptStore.INDEX_KEY)?.json
        ?.let { CortexJson.decodeFromString(AttemptIndex.serializer(), it) }
        ?: AttemptIndex()
    sync.write(AttemptStore.INDEX_KEY, CortexJson.encodeToString(AttemptIndex.serializer(), AttemptStore.index(index, record)))
}
