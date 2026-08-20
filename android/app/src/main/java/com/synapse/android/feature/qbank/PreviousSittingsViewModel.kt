package com.synapse.android.feature.qbank

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import com.synapse.android.core.cache.LocalStore
import com.synapse.android.core.progress.AttemptLedger
import com.synapse.android.core.progress.AttemptStats
import com.synapse.android.core.qbank.LiveSession
import java.time.Instant
import java.time.ZoneId
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.cancel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import kotlinx.serialization.builtins.MapSerializer
import kotlinx.serialization.builtins.serializer
import kotlinx.serialization.json.Json

/** One row on [PreviousSittingsScreen]. */
data class PreviousSitting(
    val sessionId: String,
    /** The stored name, or the sitting's own [date] when no name was saved. */
    val name: String,
    /** Local calendar date the sitting started. */
    val date: String,
    val answered: Int,
    val accuracy: Double?,
)

/**
 * A student's past qbank sittings, newest first.
 *
 * Reads the attempt **shards** through [AttemptLedger], never
 * [LiveSession.KEY] -- a sitting that was finished and cleared still has its
 * records; a live session abandoned without an answer has none, and must not
 * appear here. A resumed sitting appears once: every record it produced
 * carries the same `sessionId` across both of its runs, and
 * [AttemptStats.bySession] groups on exactly that.
 */
class PreviousSittingsViewModel(store: LocalStore) : ViewModel() {

    private val backgroundScope = CoroutineScope(SupervisorJob() + Dispatchers.Default)
    private val json = Json { ignoreUnknownKeys = true }

    private val _sittings = MutableStateFlow<List<PreviousSitting>>(emptyList())
    val sittings: StateFlow<List<PreviousSitting>> = _sittings.asStateFlow()

    init {
        backgroundScope.launch {
            val records = AttemptLedger.records(store)
            val names = store.document(LiveSession.SESSION_NAMES_KEY)?.json
                ?.let { json.decodeFromString(MapSerializer(String.serializer(), String.serializer()), it) }
                .orEmpty()

            _sittings.value = AttemptStats.bySession(records)
                .filter { it.surface == SURFACE }
                .map { summary ->
                    val date = Instant.parse(summary.startedAt).atZone(ZoneId.systemDefault()).toLocalDate().toString()
                    val storedName = names[summary.sessionId]?.trim()
                    PreviousSitting(
                        sessionId = summary.sessionId,
                        name = storedName?.takeIf { it.isNotEmpty() } ?: date,
                        date = date,
                        answered = summary.answered,
                        accuracy = summary.accuracy,
                    )
                }
        }
    }

    override fun onCleared() {
        backgroundScope.cancel()
    }

    companion object {
        private const val SURFACE = "qbank"

        fun factory(store: LocalStore) = viewModelFactory {
            initializer { PreviousSittingsViewModel(store) }
        }
    }
}
