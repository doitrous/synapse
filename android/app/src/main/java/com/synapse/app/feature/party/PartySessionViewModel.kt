package com.synapse.app.feature.party

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.synapse.app.core.api.PartySessionDto
import com.synapse.app.core.party.partyReasonMessage
import com.synapse.app.core.qbank.Question
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Job
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

/** What one open party session shows, once it has loaded at least once. */
sealed interface PartySessionUiState {
    data object Loading : PartySessionUiState

    data class InSession(
        val session: PartySessionDto,
        val questions: List<Question>,
        val message: String? = null,
    ) : PartySessionUiState

    /** The session is gone, or this student is not a member of its party — nothing left to poll for. */
    data class Gone(val message: String) : PartySessionUiState
}

/**
 * Drives one open party session: the scheduled wait, the sitting (one item at
 * a time, in `itemRefs` order), and the results. [open] starts
 * [PartySessionsRepository.pollSession] on `viewModelScope` (4s polling,
 * matching [com.synapse.app.feature.social.RoomViewModel]); [close] cancels
 * it.
 *
 * A `question` item is graded server-side via [answerQuestion] — the answer
 * submitted here is never trusted back as the verdict; once the poll reflects
 * it, [PartySessionDto.myAnswers] carries the graded `correct` value. A
 * `practical`/`essay` item has no on-device authored-content resolver (see
 * [PartySessionsRepository]'s class doc): [markSelfChecked] records the
 * server's `correct: null` self-check without ever having shown a body for
 * it — an honest degrade, not a silent one.
 */
@HiltViewModel
class PartySessionViewModel @Inject constructor(
    private val repository: PartySessionsRepository,
) : ViewModel() {

    private val _uiState = MutableStateFlow<PartySessionUiState>(PartySessionUiState.Loading)
    val uiState: StateFlow<PartySessionUiState> = _uiState.asStateFlow()

    private var pollJob: Job? = null
    private var openSessionId: String? = null

    fun open(id: String) {
        if (openSessionId == id && pollJob?.isActive == true) return
        pollJob?.cancel()
        openSessionId = id
        _uiState.value = PartySessionUiState.Loading
        pollJob = viewModelScope.launch {
            repository.pollSession(id).collect { tick -> applyTick(tick) }
        }
    }

    /** Leaving the session. Stops the poll — nothing further should be fetched once nobody is watching. */
    fun close() {
        pollJob?.cancel()
        pollJob = null
        openSessionId = null
        _uiState.value = PartySessionUiState.Loading
    }

    override fun onCleared() {
        pollJob?.cancel()
    }

    private suspend fun applyTick(tick: SessionPoll) {
        when (tick) {
            is SessionPoll.Loaded -> {
                val questions = repository.questionsFor(tick.session)
                _uiState.value = PartySessionUiState.InSession(tick.session, questions)
            }
            SessionPoll.Gone -> _uiState.value = PartySessionUiState.Gone("That session is no longer available.")
            SessionPoll.Unavailable -> {
                val prev = _uiState.value as? PartySessionUiState.InSession
                _uiState.value = prev?.copy(message = "Could not reach the session.")
                    ?: PartySessionUiState.Gone("Could not reach the session.")
            }
        }
    }

    fun answerQuestion(questionId: String, chosenIndex: Int) {
        val state = _uiState.value as? PartySessionUiState.InSession ?: return
        viewModelScope.launch {
            val mutation = repository.answer(state.session.id, "question", questionId, chosenIndex, null)
            if (!mutation.succeeded) {
                _uiState.value = state.copy(message = partyReasonMessage(mutation.reason))
                return@launch
            }
            applyTick(repository.fetchSession(state.session.id))
        }
    }

    /** Records a self-check for a practical/essay item ref — see this class's KDoc. */
    fun markSelfChecked(kind: String, itemId: String) {
        val state = _uiState.value as? PartySessionUiState.InSession ?: return
        viewModelScope.launch {
            val mutation = repository.answer(state.session.id, kind, itemId, null, null)
            if (!mutation.succeeded) {
                _uiState.value = state.copy(message = partyReasonMessage(mutation.reason))
                return@launch
            }
            applyTick(repository.fetchSession(state.session.id))
        }
    }

    /** Ends the session early. Only the host of its party or the member who created it may — the server enforces this. */
    fun closeSession() {
        val state = _uiState.value as? PartySessionUiState.InSession ?: return
        viewModelScope.launch {
            val mutation = repository.close(state.session.id)
            if (!mutation.succeeded) {
                _uiState.value = state.copy(message = partyReasonMessage(mutation.reason))
                return@launch
            }
            applyTick(repository.fetchSession(state.session.id))
        }
    }
}
