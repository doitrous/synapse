package com.synapse.app.feature.social

import androidx.annotation.StringRes
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.synapse.app.core.api.PersonDto
import com.synapse.app.core.social.socialReasonMessage
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

/** What the Friends tab shows. There is no polling here — see [FriendsRepository]'s doc for why. */
sealed interface FriendsUiState {
    data object Loading : FriendsUiState

    data class Content(
        val friends: List<PersonDto>,
        val incoming: List<PersonDto>,
        val outgoing: List<PersonDto>,
        val directoryQuery: String = "",
        /** Null before a search has been run; empty is a real "nobody matched". */
        val directoryResults: List<PersonDto>? = null,
        val inviteToken: String? = null,
        val offline: Boolean = false,
        @param:StringRes val message: Int? = null,
    ) : FriendsUiState
}

@HiltViewModel
class FriendsViewModel @Inject constructor(
    private val repository: FriendsRepository,
) : ViewModel() {

    private val _uiState = MutableStateFlow<FriendsUiState>(FriendsUiState.Loading)
    val uiState: StateFlow<FriendsUiState> = _uiState.asStateFlow()

    init {
        load()
    }

    fun load() {
        viewModelScope.launch {
            when (val outcome = repository.friends()) {
                is FriendsOutcome.Loaded ->
                    _uiState.value = FriendsUiState.Content(outcome.friends, outcome.requests.incoming, outcome.requests.outgoing)
                FriendsOutcome.Unavailable ->
                    _uiState.value = FriendsUiState.Content(emptyList(), emptyList(), emptyList(), offline = true)
            }
        }
    }

    fun search(query: String) {
        val state = _uiState.value as? FriendsUiState.Content ?: return
        _uiState.value = state.copy(directoryQuery = query)
        viewModelScope.launch {
            val results = repository.directorySearch(query)
            val current = _uiState.value as? FriendsUiState.Content ?: return@launch
            // A stale search that finished after a newer one was typed must not clobber it.
            if (current.directoryQuery != query) return@launch
            _uiState.value = current.copy(directoryResults = results ?: emptyList())
        }
    }

    fun sendRequest(userId: String) {
        val state = _uiState.value as? FriendsUiState.Content ?: return
        viewModelScope.launch {
            val mutation = repository.sendRequest(userId)
            if (mutation.succeeded) {
                _uiState.value = state.copy(directoryResults = state.directoryResults?.filterNot { it.userId == userId })
                load()
            } else {
                _uiState.value = state.copy(message = socialReasonMessage(mutation.reason))
            }
        }
    }

    fun respondToRequest(userId: String, accept: Boolean) {
        viewModelScope.launch {
            val state = _uiState.value as? FriendsUiState.Content ?: return@launch
            val mutation = repository.respondToRequest(userId, accept)
            if (mutation.succeeded) load() else _uiState.value = state.copy(message = socialReasonMessage(mutation.reason))
        }
    }

    fun remove(userId: String) {
        viewModelScope.launch {
            val state = _uiState.value as? FriendsUiState.Content ?: return@launch
            val mutation = repository.remove(userId)
            if (mutation.succeeded) load() else _uiState.value = state.copy(message = socialReasonMessage(mutation.reason))
        }
    }

    fun mintInvite() {
        val state = _uiState.value as? FriendsUiState.Content ?: return
        viewModelScope.launch {
            val response = repository.mintInvite()
            _uiState.value = state.copy(inviteToken = response.token)
        }
    }

    fun redeemInvite(token: String) {
        val state = _uiState.value as? FriendsUiState.Content ?: return
        viewModelScope.launch {
            val mutation = repository.redeemInvite(token)
            if (mutation.succeeded) load() else _uiState.value = state.copy(message = socialReasonMessage(mutation.reason))
        }
    }
}
