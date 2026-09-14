package com.synapse.app.feature.notifications

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.synapse.app.core.api.ApiException
import com.synapse.app.core.api.ShareNotification
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import java.time.Instant
import javax.inject.Inject

/** What [NotificationsRoute] renders. */
sealed interface NotificationsUiState {
    data object Loading : NotificationsUiState

    data class Content(
        val items: List<ShareNotification>,
        /** True when [items] is the last-good cached response, not a fresh fetch. */
        val fromCache: Boolean,
    ) : NotificationsUiState {
        val unreadCount: Int get() = items.unreadCount()
    }

    /** Neither the network nor the offline cache had anything to show. */
    data object Unavailable : NotificationsUiState
}

/**
 * Drives [NotificationsRoute]. Loads the inbox once on init and on [refresh];
 * [markRead] writes through [NotificationsRepository] then reloads so [uiState]
 * always reflects the server's own read state — mirrors `MaristanaViewModel`'s
 * mutate-then-reload shape.
 */
@HiltViewModel
class NotificationsViewModel @Inject constructor(
    private val repository: NotificationsRepository,
) : ViewModel() {

    var now: () -> Instant = Instant::now

    private val _uiState = MutableStateFlow<NotificationsUiState>(NotificationsUiState.Loading)
    val uiState: StateFlow<NotificationsUiState> = _uiState.asStateFlow()

    init {
        refresh()
    }

    fun refresh() {
        viewModelScope.launch {
            when (val outcome = repository.shared(now())) {
                is NotificationsOutcome.Loaded -> _uiState.value = NotificationsUiState.Content(outcome.items, outcome.fromCache)
                NotificationsOutcome.Unavailable -> _uiState.value = NotificationsUiState.Unavailable
            }
        }
    }

    /** Marks one notification read and reloads. A no-op if it is already read or unknown. */
    fun markRead(id: String) {
        val state = _uiState.value as? NotificationsUiState.Content ?: return
        if (state.items.firstOrNull { it.id == id }?.readAt != null) return
        viewModelScope.launch {
            try {
                repository.markRead(listOf(id))
            } catch (e: CancellationException) {
                throw e
            } catch (e: ApiException) {
                return@launch
            }
            refresh()
        }
    }
}
