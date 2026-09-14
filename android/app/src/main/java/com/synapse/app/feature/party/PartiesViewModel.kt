package com.synapse.app.feature.party

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.synapse.app.core.api.OpenPartyDto
import com.synapse.app.core.api.PartySummaryDto
import com.synapse.app.core.party.partyReasonMessage
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

/** What the Parties list screen shows: this student's own parties, and ones open to browse. */
sealed interface PartiesUiState {
    data object Loading : PartiesUiState
    data class Content(
        val mine: List<PartySummaryDto>,
        val open: List<OpenPartyDto>,
        val offline: Boolean = false,
        val message: String? = null,
    ) : PartiesUiState
}

/**
 * Drives the Parties list screen: loading this student's parties and the
 * ones open in their cohort, building a new one, and joining by code.
 * Opening a specific party (the lobby lifecycle) is [PartyLobbyViewModel]'s
 * job — the same Setup-vs-Session split `feature/social`'s
 * `StudyRoomsViewModel`/`RoomViewModel` use.
 */
@HiltViewModel
class PartiesViewModel @Inject constructor(
    private val repository: PartiesRepository,
) : ViewModel() {

    private val _uiState = MutableStateFlow<PartiesUiState>(PartiesUiState.Loading)
    val uiState: StateFlow<PartiesUiState> = _uiState.asStateFlow()

    /** Set by [create]/[join] on success; the route reacts by opening [PartyLobbyViewModel]. Consume with [consumeOpenedParty]. */
    private val _openedPartyId = MutableStateFlow<String?>(null)
    val openedPartyId: StateFlow<String?> = _openedPartyId.asStateFlow()

    init {
        load()
    }

    fun load() {
        viewModelScope.launch {
            val mineOutcome = repository.myParties()
            val openOutcome = repository.openParties()
            val mine = (mineOutcome as? PartiesOutcome.Loaded)?.parties.orEmpty()
            val open = (openOutcome as? OpenPartiesOutcome.Loaded)?.parties.orEmpty()
            val offline = mineOutcome is PartiesOutcome.Unavailable && openOutcome is OpenPartiesOutcome.Unavailable
            _uiState.value = PartiesUiState.Content(mine, open, offline)
        }
    }

    fun create(name: String) {
        val state = _uiState.value as? PartiesUiState.Content ?: return
        val trimmed = name.trim()
        if (trimmed.isEmpty()) return
        viewModelScope.launch {
            val mutation = repository.create(trimmed)
            if (mutation.succeeded) {
                _openedPartyId.value = mutation.party?.id
                load()
            } else {
                _uiState.value = state.copy(message = partyReasonMessage(mutation.reason))
            }
        }
    }

    fun join(code: String) {
        val state = _uiState.value as? PartiesUiState.Content ?: return
        val trimmed = code.trim()
        if (trimmed.isEmpty()) return
        viewModelScope.launch {
            val mutation = repository.join(trimmed)
            if (mutation.succeeded) {
                _openedPartyId.value = mutation.party?.id
            } else {
                _uiState.value = state.copy(message = partyReasonMessage(mutation.reason))
            }
        }
    }

    fun openParty(id: String) {
        _openedPartyId.value = id
    }

    fun consumeOpenedParty() {
        _openedPartyId.value = null
    }
}
