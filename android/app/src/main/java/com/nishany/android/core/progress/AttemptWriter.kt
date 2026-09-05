package com.nishany.android.core.progress

import com.nishany.android.core.CortexJson
import com.nishany.android.core.cache.LocalStore
import com.nishany.android.core.sync.SyncEngine
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
 * They go out through [SyncEngine.writeAll], which commits both -- and both
 * outbox entries -- in one transaction, because half a banked attempt is
 * worse than none. A shard with no index fold is an answer every headline
 * figure ignores; an index fold with no shard is a total no screen can
 * account for. Both fail silently, and an attempt made offline is queued
 * rather than lost either way.
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
 * [com.nishany.android.feature.practical.PracticalViewModel] for the three
 * practical surfaces, and [com.nishany.android.feature.qbank.RunnerViewModel],
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

    val index = store.document(AttemptStore.INDEX_KEY)?.json
        ?.let { CortexJson.decodeFromString(AttemptIndex.serializer(), it) }
        ?: AttemptIndex()

    sync.writeAll(
        listOf(
            monthKey to CortexJson.encodeToString(AttemptMonth.serializer(), updatedMonth),
            AttemptStore.INDEX_KEY to
                CortexJson.encodeToString(AttemptIndex.serializer(), AttemptStore.index(index, record)),
        ),
    )
}
