package com.synapse.app.feature.social

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.synapse.app.core.api.StudyRoomDto
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

/** What one open room shows, once it has loaded at least once. */
sealed interface RoomDetailUiState {
    data object Loading : RoomDetailUiState

    data class InRoom(
        val room: StudyRoomDto,
        val questions: List<Question>,
        val index: Int,
        val chosenIndex: Int?,
        val reviewExpanded: Boolean,
        val message: String? = null,
    ) : RoomDetailUiState

    /** The room is gone (deleted, or this student was never a member) — nothing left to poll for. */
    data class Gone(val message: String) : RoomDetailUiState
}

/**
 * Drives one open room: the lobby, the sitting, and the results — the
 * lifecycle [com.synapse.app.core.social] mirrors from iOS `StudyRoomModel`.
 * [open] starts [StudyRoomsRepository.pollRoom] on `viewModelScope`, so the
 * 4s polling runs exactly as long as this ViewModel is alive watching this
 * room; [close] cancels it, the same job every exit from a room goes through
 * on iOS.
 */
@HiltViewModel
class RoomViewModel @Inject constructor(
    private val repository: StudyRoomsRepository,
) : ViewModel() {

    var now: () -> Instant = Instant::now

    private val _uiState = MutableStateFlow<RoomDetailUiState>(RoomDetailUiState.Loading)
    val uiState: StateFlow<RoomDetailUiState> = _uiState.asStateFlow()

    private var pollJob: Job? = null
    private var openRoomId: String? = null
    private var questionStartedAt: Instant = now()

    fun open(id: String) {
        if (openRoomId == id && pollJob?.isActive == true) return
        pollJob?.cancel()
        openRoomId = id
        _uiState.value = RoomDetailUiState.Loading
        pollJob = viewModelScope.launch {
            repository.pollRoom(id).collect { tick -> applyTick(tick) }
        }
    }

    /** Leaving the room. Stops the poll — nothing further should be fetched once nobody is watching. */
    fun close() {
        pollJob?.cancel()
        pollJob = null
        openRoomId = null
        _uiState.value = RoomDetailUiState.Loading
    }

    override fun onCleared() {
        pollJob?.cancel()
    }

    private suspend fun applyTick(tick: RoomPoll) {
        when (tick) {
            is RoomPoll.Loaded -> applyLoaded(tick.room)
            RoomPoll.Gone -> _uiState.value = RoomDetailUiState.Gone("That room is no longer available.")
            RoomPoll.Unavailable -> {
                val prev = _uiState.value as? RoomDetailUiState.InRoom
                _uiState.value = prev?.copy(message = "Could not reach the room.")
                    ?: RoomDetailUiState.Gone("Could not reach the room.")
            }
        }
    }

    private suspend fun applyLoaded(room: StudyRoomDto) {
        val questions = repository.questionsFor(room)
        val prev = _uiState.value as? RoomDetailUiState.InRoom
        val answered = room.answeredIds
        val index = questions.indices.firstOrNull { questions[it].id !in answered }
            ?: (questions.size - 1).coerceAtLeast(0)
        val landedOn = questions.getOrNull(index)?.id
        // Reset the choice (and the clock) only when the question underneath
        // actually changed — resetting on every poll made a room impossible
        // to hand in, the exact regression `StudyRoomModel.loadQuestions` calls out.
        val sameQuestion = landedOn != null && prev?.questions?.getOrNull(prev.index)?.id == landedOn
        if (!sameQuestion) questionStartedAt = now()
        _uiState.value = RoomDetailUiState.InRoom(
            room = room,
            questions = questions,
            index = index,
            chosenIndex = if (sameQuestion) prev?.chosenIndex else null,
            reviewExpanded = prev?.reviewExpanded ?: false,
        )
    }

    fun start() {
        val state = _uiState.value as? RoomDetailUiState.InRoom ?: return
        viewModelScope.launch {
            val mutation = repository.start(state.room.id)
            if (!mutation.succeeded) {
                _uiState.value = state.copy(message = socialReasonMessage(mutation.reason))
                return@launch
            }
            applyTick(repository.fetchRoom(state.room.id))
        }
    }

    /** Choosing an option. Optimistic — reverted if the answer never reaches the server. */
    fun selectAnswer(optionIndex: Int) {
        val state = _uiState.value as? RoomDetailUiState.InRoom ?: return
        val question = state.questions.getOrNull(state.index) ?: return
        if (state.chosenIndex != null) return
        _uiState.value = state.copy(chosenIndex = optionIndex, message = null)
        viewModelScope.launch {
            val seconds = maxOf(0, java.time.Duration.between(questionStartedAt, now()).seconds.toInt())
            val mutation = repository.submitAnswer(state.room.id, question.id, optionIndex, seconds)
            if (!mutation.succeeded) {
                val current = _uiState.value as? RoomDetailUiState.InRoom ?: return@launch
                _uiState.value = current.copy(chosenIndex = null, message = "That answer did not reach the room.")
            }
        }
    }

    /** Next question, or — on the last one — hand it in. */
    fun next() {
        val state = _uiState.value as? RoomDetailUiState.InRoom ?: return
        if (state.index + 1 < state.questions.size) {
            questionStartedAt = now()
            _uiState.value = state.copy(index = state.index + 1, chosenIndex = null)
            return
        }
        viewModelScope.launch {
            val mutation = repository.finish(state.room.id)
            if (!mutation.succeeded) {
                _uiState.value = state.copy(message = socialReasonMessage(mutation.reason))
                return@launch
            }
            applyTick(repository.fetchRoom(state.room.id))
        }
    }

    fun setReviewExpanded(expanded: Boolean) {
        val state = _uiState.value as? RoomDetailUiState.InRoom ?: return
        _uiState.value = state.copy(reviewExpanded = expanded)
    }
}
