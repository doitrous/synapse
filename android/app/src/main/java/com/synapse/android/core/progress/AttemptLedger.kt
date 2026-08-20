package com.synapse.android.core.progress

import com.synapse.android.core.cache.LocalStore
import kotlinx.serialization.json.Json

/**
 * Reads the attempt ledger back out of [LocalStore].
 *
 * `AttemptStore` (in this package) has written month shards since Task 5, but
 * nothing read them back until this task -- "previous sittings" is the first
 * screen that needs to, and [QuestionBankViewModel][com.synapse.android.feature.qbank.QuestionBankViewModel]
 * (to count a student's previous sittings for the auto name) needs the exact
 * same records, so this is the one place both read from.
 *
 * Reads only the shards [AttemptIndex.months] names, newest first, capped at
 * twelve -- the index exists precisely so headline figures cost no unbounded
 * shard reads. Never enumerates shards by guessing keys.
 */
object AttemptLedger {

    private const val MAX_MONTHS = 12
    private val json = Json { ignoreUnknownKeys = true }

    suspend fun records(store: LocalStore): List<AttemptRecord> {
        val index = store.document(AttemptStore.INDEX_KEY)?.json
            ?.let { json.decodeFromString(AttemptIndex.serializer(), it) }
            ?: AttemptIndex()

        val months = index.months.sortedDescending().take(MAX_MONTHS)
        return months.flatMap { month ->
            store.document(AttemptStore.monthKey(month))?.json
                ?.let { json.decodeFromString(AttemptMonth.serializer(), it).records }
                .orEmpty()
        }
    }
}
