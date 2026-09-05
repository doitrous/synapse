package com.synapse.android.core.adaptive

import com.synapse.android.core.CortexJson
import com.synapse.android.core.cache.LocalStore
import com.synapse.android.core.progress.AttemptStore
import kotlinx.serialization.Serializable

/** One month of adaptive evidence. Sharded like the attempt ledger. */
@Serializable
data class AdaptiveEvidenceMonth(
    val version: Int = 1,
    val month: String = "",
    val events: List<AdaptiveEvidenceEvent> = emptyList(),
)

/** The index naming which month shards exist -- the honest denominator for "how much do we know". */
@Serializable
data class AdaptiveEvidenceIndex(
    val version: Int = 1,
    val months: List<String> = emptyList(),
    val events: Int = 0,
    val questionIds: List<String> = emptyList(),
    val lastAt: String? = null,
)

/**
 * Reads the adaptive evidence ledger back out of [LocalStore].
 *
 * Mirrors [com.synapse.android.core.progress.AttemptLedger]: the ledger is
 * month-sharded on the wire (`src/data/adaptive/evidenceLedger.ts`), so the
 * index names the months and this reads the most recent
 * [AttemptStore.HISTORY_MONTHS] of them and concatenates their events. Never
 * enumerates shards by guessing keys. Every decode is tolerant -- a shard or
 * index the phone cannot parse contributes nothing rather than failing the
 * whole surface.
 *
 * The keys here are the single source of truth for both what
 * [com.synapse.android.core.sync.SyncEngine] pulls and what this reads, so the
 * pull list can never drift from the read.
 *
 * ponytail: reads a bounded recent window (HISTORY_MONTHS) rather than every
 * month the index lists, matching the AttemptLedger idiom; the 60-day mastery
 * decay makes older shards near-weightless. Widen the window if a longer
 * history is ever surfaced.
 */
object AdaptiveEvidenceStore {

    const val INDEX_KEY = "nishany.progress.adaptive.evidenceIndex.v1"

    fun monthKey(month: String) = "nishany.progress.adaptive.evidence.$month"

    suspend fun events(store: LocalStore): List<AdaptiveEvidenceEvent> {
        val index = store.document(INDEX_KEY)?.json
            ?.let { runCatching { CortexJson.decodeFromString(AdaptiveEvidenceIndex.serializer(), it) }.getOrNull() }
            ?: AdaptiveEvidenceIndex()

        val months = index.months.sortedDescending().take(AttemptStore.HISTORY_MONTHS)
        return months.flatMap { month ->
            store.document(monthKey(month))?.json
                ?.let {
                    runCatching { CortexJson.decodeFromString(AdaptiveEvidenceMonth.serializer(), it).events }
                        .getOrNull()
                }
                .orEmpty()
        }
    }
}
