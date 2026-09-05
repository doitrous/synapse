package com.nishany.android.feature.qbank

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import com.nishany.android.core.CortexJson
import com.nishany.android.core.backgroundWorkScope
import com.nishany.android.core.cache.LocalStore
import com.nishany.android.core.progress.AttemptLedger
import com.nishany.android.core.progress.AttemptStats
import com.nishany.android.core.qbank.LiveSession
import com.nishany.android.core.ui.EmptyConfig
import com.nishany.android.core.ui.UiState
import java.time.Instant
import java.time.ZoneId
import kotlinx.coroutines.cancel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import kotlinx.serialization.builtins.MapSerializer
import kotlinx.serialization.builtins.serializer

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
    private val backgroundScope = backgroundWorkScope("PreviousSittingsViewModel")

    /** `null` until the init block's one-shot ledger read lands -- see [uiState]. */
    private val _sittings = MutableStateFlow<List<PreviousSitting>?>(null)
    val sittings: StateFlow<List<PreviousSitting>> =
        _sittings.map { it.orEmpty() }.stateIn(backgroundScope, SharingStarted.Eagerly, emptyList())

    /**
     * [sittings] wrapped as a [UiState] for [PreviousSittingsScreen] to
     * render through [com.nishany.android.core.ui.StateHost]. There is no
     * [com.nishany.android.core.sync.SyncEngine] in this fold -- see
     * [previousSittingsUiState]'s own doc for why `null` (not-yet-loaded) is
     * the only thing that distinguishes Loading from Empty here.
     */
    val uiState: StateFlow<UiState<List<PreviousSitting>>> =
        _sittings.map(::previousSittingsUiState).stateIn(backgroundScope, SharingStarted.Eagerly, UiState.Loading)

    init {
        backgroundScope.launch {
            val records = AttemptLedger.records(store)
            val names = store.document(LiveSession.SESSION_NAMES_KEY)?.json
                ?.let { CortexJson.decodeFromString(MapSerializer(String.serializer(), String.serializer()), it) }
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

/**
 * The pure fold behind [PreviousSittingsViewModel.uiState].
 *
 * [sittings] is `null` only in the window between this ViewModel's
 * construction and its init block's one-shot [AttemptLedger] read landing --
 * the exact window [PreviousSittingsScreen] used to render "No sittings yet."
 * for, indistinguishable from a student who genuinely has none. An empty,
 * *non-null* list is what a completed read with nothing to show looks like.
 */
internal fun previousSittingsUiState(sittings: List<PreviousSitting>?): UiState<List<PreviousSitting>> = when {
    sittings == null -> UiState.Loading
    sittings.isNotEmpty() -> UiState.Content(sittings)
    else -> UiState.Empty(
        EmptyConfig(
            title = "No sittings yet",
            description = "Sittings appear here once you finish a question bank session.",
        ),
    )
}
