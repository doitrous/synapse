package com.synapse.app.feature.social

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.synapse.app.core.api.ChallengeDto
import com.synapse.app.core.qbank.Question
import com.synapse.app.core.social.socialReasonMessage
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Job
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import java.time.Instant
import javax.inject.Inject

/** What one open challenge shows, once it has loaded at least once. */
sealed interface ChallengeDetailUiState {
    data object Loading : ChallengeDetailUiState

    data class Detail(
        val challenge: ChallengeDto,
        val questions: List<Question>,
        val index: Int,
        val chosenIndex: Int?,
        val message: String? = null,
    ) : ChallengeDetailUiState

    data class Gone(val message: String) : ChallengeDetailUiState
}

/**
 * Drives one open challenge — accepting/declining a `sent` one, sitting it
 * once `running`, and the head-to-head once `complete`. Same 4s-poll-while-
 * collected lifecycle as [RoomViewModel], via [ChallengesRepository.pollChallenge].
 */
@HiltViewModel
class ChallengeViewModel @Inject constructor(
    private val repository: ChallengesRepository,
) : ViewModel() {

    var now: () -> Instant = Instant::now

    private val _uiState = MutableStateFlow<ChallengeDetailUiState>(ChallengeDetailUiState.Loading)
    val uiState: StateFlow<ChallengeDetailUiState> = _uiState.asStateFlow()

    private var pollJob: Job? = null
    private var openChallengeId: String? = null
    private var questionStartedAt: Instant = now()

    fun open(id: String) {
        if (openChallengeId == id && pollJob?.isActive == true) return
        pollJob?.cancel()
        openChallengeId = id
        _uiState.value = ChallengeDetailUiState.Loading
        pollJob = viewModelScope.launch {
            repository.pollChallenge(id).collect { tick -> applyTick(tick) }
        }
    }

    fun close() {
        pollJob?.cancel()
        pollJob = null
        openChallengeId = null
        _uiState.value = ChallengeDetailUiState.Loading
    }

    override fun onCleared() {
        pollJob?.cancel()
    }

    private suspend fun applyTick(tick: ChallengePoll) {
        when (tick) {
            is ChallengePoll.Loaded -> applyLoaded(tick.challenge)
            ChallengePoll.Gone -> _uiState.value = ChallengeDetailUiState.Gone("That challenge is no longer available.")
            ChallengePoll.Unavailable -> {
                val prev = _uiState.value as? ChallengeDetailUiState.Detail
                _uiState.value = prev?.copy(message = "Could not reach the challenge.")
                    ?: ChallengeDetailUiState.Gone("Could not reach the challenge.")
            }
        }
    }

    private suspend fun applyLoaded(challenge: ChallengeDto) {
        val questions = repository.questionsFor(challenge)
        val prev = _uiState.value as? ChallengeDetailUiState.Detail
        val answered = challenge.answeredIds
        val index = questions.indices.firstOrNull { questions[it].id !in answered }
            ?: (questions.size - 1).coerceAtLeast(0)
        val landedOn = questions.getOrNull(index)?.id
        val sameQuestion = landedOn != null && prev?.questions?.getOrNull(prev.index)?.id == landedOn
        if (!sameQuestion) questionStartedAt = now()
        _uiState.value = ChallengeDetailUiState.Detail(
            challenge = challenge,
            questions = questions,
            index = index,
            chosenIndex = if (sameQuestion) prev?.chosenIndex else null,
        )
    }

    fun respond(accept: Boolean) {
        val state = _uiState.value as? ChallengeDetailUiState.Detail ?: return
        viewModelScope.launch {
            val mutation = repository.respond(state.challenge.id, accept)
            if (!mutation.succeeded) {
                _uiState.value = state.copy(message = socialReasonMessage(mutation.reason))
                return@launch
            }
            applyTick(repository.fetchChallenge(state.challenge.id))
        }
    }

    fun selectAnswer(optionIndex: Int) {
        val state = _uiState.value as? ChallengeDetailUiState.Detail ?: return
        val question = state.questions.getOrNull(state.index) ?: return
        if (state.chosenIndex != null) return
        _uiState.value = state.copy(chosenIndex = optionIndex, message = null)
        viewModelScope.launch {
            val seconds = maxOf(0, java.time.Duration.between(questionStartedAt, now()).seconds.toInt())
            val mutation = repository.submitAnswer(state.challenge.id, question.id, optionIndex, seconds)
            if (!mutation.succeeded) {
                val current = _uiState.value as? ChallengeDetailUiState.Detail ?: return@launch
                _uiState.value = current.copy(chosenIndex = null, message = "That answer did not reach the challenge.")
            }
        }
    }

    fun next() {
        val state = _uiState.value as? ChallengeDetailUiState.Detail ?: return
        if (state.index + 1 < state.questions.size) {
            questionStartedAt = now()
            _uiState.value = state.copy(index = state.index + 1, chosenIndex = null)
            return
        }
        viewModelScope.launch {
            val mutation = repository.finish(state.challenge.id)
            if (!mutation.succeeded) {
                _uiState.value = state.copy(message = socialReasonMessage(mutation.reason))
                return@launch
            }
            applyTick(repository.fetchChallenge(state.challenge.id))
        }
    }
}
