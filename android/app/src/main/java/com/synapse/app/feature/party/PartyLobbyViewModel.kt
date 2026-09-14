package com.synapse.app.feature.party

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.synapse.app.core.api.PartyDto
import com.synapse.app.core.api.PartyGameSummaryDto
import com.synapse.app.core.api.PartySessionItemRefDto
import com.synapse.app.core.api.PartySessionSummaryDto
import com.synapse.app.core.party.partyGameReasonMessage
import com.synapse.app.core.party.partyReasonMessage
import com.synapse.app.core.qbank.Question
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Job
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

/** What one open party's lobby shows, once it has loaded at least once. */
sealed interface PartyLobbyUiState {
    data object Loading : PartyLobbyUiState

    data class Content(
        val party: PartyDto,
        val sessions: List<PartySessionSummaryDto> = emptyList(),
        val games: List<PartyGameSummaryDto> = emptyList(),
        val availableQuestions: List<Question> = emptyList(),
        val message: String? = null,
    ) : PartyLobbyUiState

    /** The party is gone (deleted, or this student was never a member) — nothing left to poll for. */
    data class Gone(val message: String) : PartyLobbyUiState
}

/**
 * Drives one open party's lobby: members and visibility (via
 * [PartiesRepository.pollParty], 4s polling per the class doc there), and its
 * sessions/games lists — fetched once on [open] and refreshed after this
 * ViewModel's own mutations, not continuously polled (only the single-party
 * GET is a polled endpoint per this surface's scope). [open] starts the poll
 * on `viewModelScope`; [close] cancels it — the same lifecycle
 * `feature/social`'s `RoomViewModel` uses.
 */
@HiltViewModel
class PartyLobbyViewModel @Inject constructor(
    private val partiesRepository: PartiesRepository,
    private val sessionsRepository: PartySessionsRepository,
    private val gamesRepository: PartyGamesRepository,
) : ViewModel() {

    private val _uiState = MutableStateFlow<PartyLobbyUiState>(PartyLobbyUiState.Loading)
    val uiState: StateFlow<PartyLobbyUiState> = _uiState.asStateFlow()

    /** Set by [createSession]/opening a row; the route reacts by opening [PartySessionViewModel]. */
    private val _openedSessionId = MutableStateFlow<String?>(null)
    val openedSessionId: StateFlow<String?> = _openedSessionId.asStateFlow()

    /** Set by [createGame]/opening a row; the route reacts by opening [PartyGameViewModel]. */
    private val _openedGameId = MutableStateFlow<String?>(null)
    val openedGameId: StateFlow<String?> = _openedGameId.asStateFlow()

    private var pollJob: Job? = null
    private var openPartyId: String? = null

    fun open(id: String) {
        if (openPartyId == id && pollJob?.isActive == true) return
        pollJob?.cancel()
        openPartyId = id
        _uiState.value = PartyLobbyUiState.Loading
        pollJob = viewModelScope.launch {
            partiesRepository.pollParty(id).collect { tick -> applyTick(id, tick) }
        }
    }

    /** Leaving the lobby. Stops the poll — nothing further should be fetched once nobody is watching. */
    fun close() {
        pollJob?.cancel()
        pollJob = null
        openPartyId = null
        _uiState.value = PartyLobbyUiState.Loading
    }

    override fun onCleared() {
        pollJob?.cancel()
    }

    private suspend fun applyTick(partyId: String, tick: PartyPoll) {
        when (tick) {
            is PartyPoll.Loaded -> {
                val prev = _uiState.value as? PartyLobbyUiState.Content
                val sessions = prev?.sessions ?: sessionsRepository.sessionsFor(partyId)
                val games = prev?.games ?: gamesRepository.gamesFor(partyId)
                val availableQuestions = prev?.availableQuestions ?: sessionsRepository.publishedQuestions()
                _uiState.value = PartyLobbyUiState.Content(tick.party, sessions, games, availableQuestions)
            }
            PartyPoll.Gone -> _uiState.value = PartyLobbyUiState.Gone("That party is no longer available.")
            PartyPoll.Unavailable -> {
                val prev = _uiState.value as? PartyLobbyUiState.Content
                _uiState.value = prev?.copy(message = "Could not reach the party.")
                    ?: PartyLobbyUiState.Gone("Could not reach the party.")
            }
        }
    }

    /** Re-reads the sessions/games lists, outside the party's own poll cadence — for right after this ViewModel's own mutations. */
    fun refreshLists() {
        val partyId = openPartyId ?: return
        viewModelScope.launch {
            val sessions = sessionsRepository.sessionsFor(partyId)
            val games = gamesRepository.gamesFor(partyId)
            val current = _uiState.value as? PartyLobbyUiState.Content ?: return@launch
            _uiState.value = current.copy(sessions = sessions, games = games)
        }
    }

    fun toggleVisibility(open: Boolean) {
        val state = _uiState.value as? PartyLobbyUiState.Content ?: return
        viewModelScope.launch {
            val mutation = partiesRepository.setVisibility(state.party.id, open)
            if (!mutation.succeeded) {
                _uiState.value = state.copy(message = partyReasonMessage(mutation.reason))
            }
        }
    }

    fun createSession(name: String, item: PartySessionItemRefDto, startsAt: String?) {
        val state = _uiState.value as? PartyLobbyUiState.Content ?: return
        viewModelScope.launch {
            val mutation = sessionsRepository.create(state.party.id, name, item, startsAt)
            if (mutation.succeeded) {
                refreshLists()
                mutation.session?.id?.let { _openedSessionId.value = it }
            } else {
                _uiState.value = state.copy(message = partyReasonMessage(mutation.reason))
            }
        }
    }

    fun createGame(kind: String, seed: Long) {
        val state = _uiState.value as? PartyLobbyUiState.Content ?: return
        viewModelScope.launch {
            val mutation = gamesRepository.create(state.party.id, kind, seed)
            if (mutation.succeeded) {
                refreshLists()
                mutation.game?.id?.let { _openedGameId.value = it }
            } else {
                _uiState.value = state.copy(message = partyGameReasonMessage(mutation.reason))
            }
        }
    }

    fun openSession(id: String) {
        _openedSessionId.value = id
    }

    fun consumeOpenedSession() {
        _openedSessionId.value = null
    }

    fun openGame(id: String) {
        _openedGameId.value = id
    }

    fun consumeOpenedGame() {
        _openedGameId.value = null
    }

    fun leaveParty(onLeft: () -> Unit) {
        val state = _uiState.value as? PartyLobbyUiState.Content ?: return
        viewModelScope.launch {
            val mutation = partiesRepository.leave(state.party.id)
            if (mutation.succeeded) {
                onLeft()
            } else {
                _uiState.value = state.copy(message = partyReasonMessage(mutation.reason))
            }
        }
    }
}
