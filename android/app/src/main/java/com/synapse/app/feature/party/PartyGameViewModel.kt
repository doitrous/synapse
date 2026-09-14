package com.synapse.app.feature.party

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.synapse.app.core.api.PartyGamePublicStateDto
import com.synapse.app.core.auth.AuthBackend
import com.synapse.app.core.party.partyGameReasonMessage
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.Job
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

/** What one open party game shows, once it has loaded at least once. */
sealed interface PartyGameUiState {
    data object Loading : PartyGameUiState

    data class InGame(
        val game: PartyGamePublicStateDto,
        val myUserId: String?,
        val busy: Boolean = false,
        val message: String? = null,
    ) : PartyGameUiState {
        val hasAnswered: Boolean get() = myUserId != null && game.answeredParticipantIds.contains(myUserId)
        val isHost: Boolean get() = myUserId != null && myUserId == game.hostId
    }

    /** The game is gone, or this student is not a member of its party — nothing left to poll for. */
    data class Gone(val message: String) : PartyGameUiState
}

/**
 * Drives one open party game: the lobby, the round-by-round play, and the
 * final scoreboard — the Android analogue of web's `PartyGameSyncPlayer`,
 * polling instead of the web SSE stream (see [PartyGamesRepository]'s class
 * doc for why). [open] starts [PartyGamesRepository.pollGame] on
 * `viewModelScope`; [close] cancels it and best-effort tells the server this
 * member stepped away.
 *
 * Every mutation (`start`/`submitAnswer`/`nextRound`) applies the server's
 * returned state immediately rather than waiting for the next poll tick —
 * the same "optimistic via an authoritative echo" shape
 * `feature/social`'s `RoomViewModel.start`/`next` use.
 */
@HiltViewModel
class PartyGameViewModel @Inject constructor(
    private val repository: PartyGamesRepository,
    private val authBackend: AuthBackend,
) : ViewModel() {

    private val _uiState = MutableStateFlow<PartyGameUiState>(PartyGameUiState.Loading)
    val uiState: StateFlow<PartyGameUiState> = _uiState.asStateFlow()

    private var pollJob: Job? = null
    private var openPartyId: String? = null
    private var openGameId: String? = null

    fun open(partyId: String, gameId: String) {
        if (openPartyId == partyId && openGameId == gameId && pollJob?.isActive == true) return
        pollJob?.cancel()
        openPartyId = partyId
        openGameId = gameId
        _uiState.value = PartyGameUiState.Loading
        pollJob = viewModelScope.launch {
            // Best-effort: marks this member connected a tick early. The poll
            // right after is authoritative regardless of whether this succeeds.
            runCatching { repository.reconnect(partyId, gameId) }
            repository.pollGame(partyId, gameId).collect { tick -> applyTick(tick) }
        }
    }

    /** Leaving the game. Stops the poll and best-effort marks this member disconnected. */
    fun close() {
        val partyId = openPartyId
        val gameId = openGameId
        pollJob?.cancel()
        pollJob = null
        if (partyId != null && gameId != null) {
            viewModelScope.launch {
                try {
                    repository.leave(partyId, gameId)
                } catch (e: CancellationException) {
                    throw e
                } catch (e: Exception) {
                    // Best-effort — the poll for whoever is still watching will catch up regardless.
                }
            }
        }
        openPartyId = null
        openGameId = null
        _uiState.value = PartyGameUiState.Loading
    }

    override fun onCleared() {
        pollJob?.cancel()
    }

    private fun applyTick(tick: GamePoll) {
        val myUserId = authBackend.session.value?.userId
        _uiState.value = when (tick) {
            is GamePoll.Loaded -> PartyGameUiState.InGame(tick.game, myUserId)
            GamePoll.Gone -> PartyGameUiState.Gone("That party game is no longer available.")
            GamePoll.Unavailable -> {
                val prev = _uiState.value as? PartyGameUiState.InGame
                prev?.copy(busy = false, message = "Could not reach the game.")
                    ?: PartyGameUiState.Gone("Could not reach the game.")
            }
        }
    }

    fun start() = mutate { partyId, gameId -> repository.start(partyId, gameId) }

    fun submitAnswer(roundId: String, answer: PartyGameAnswer) =
        mutate { partyId, gameId -> repository.submitAnswer(partyId, gameId, roundId, answer) }

    fun nextRound() = mutate { partyId, gameId -> repository.nextRound(partyId, gameId) }

    private fun mutate(action: suspend (partyId: String, gameId: String) -> com.synapse.app.core.api.PartyGameActionMutation) {
        val partyId = openPartyId ?: return
        val gameId = openGameId ?: return
        val state = _uiState.value as? PartyGameUiState.InGame ?: return
        viewModelScope.launch {
            _uiState.value = state.copy(busy = true, message = null)
            val mutation = action(partyId, gameId)
            val current = _uiState.value as? PartyGameUiState.InGame ?: state
            _uiState.value = if (mutation.succeeded && mutation.state != null) {
                PartyGameUiState.InGame(mutation.state, current.myUserId)
            } else if (!mutation.succeeded) {
                current.copy(busy = false, message = partyGameReasonMessage(mutation.reason))
            } else {
                current.copy(busy = false)
            }
        }
    }
}
