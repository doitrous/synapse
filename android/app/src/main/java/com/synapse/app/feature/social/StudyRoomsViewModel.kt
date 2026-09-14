package com.synapse.app.feature.social

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.synapse.app.core.api.RoomSummaryDto
import com.synapse.app.core.qbank.Question
import com.synapse.app.core.social.socialReasonMessage
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

/** What the Rooms tab's list shows. */
sealed interface RoomsUiState {
    data object Loading : RoomsUiState
    data class Content(
        val rooms: List<RoomSummaryDto>,
        val available: List<Question> = emptyList(),
        val offline: Boolean = false,
        val message: String? = null,
    ) : RoomsUiState
}

/**
 * Drives the Rooms tab's list screen: loading this student's rooms, building
 * a new one, and joining by code. Opening a specific room (the lobby /
 * sitting / results lifecycle) is [RoomViewModel]'s job, the same Setup-vs-
 * Session split `feature/qbank` uses — a shared test's 4s-polling lifecycle
 * has nothing to do with listing what a student has.
 */
@HiltViewModel
class StudyRoomsViewModel @Inject constructor(
    private val repository: StudyRoomsRepository,
) : ViewModel() {

    private val _uiState = MutableStateFlow<RoomsUiState>(RoomsUiState.Loading)
    val uiState: StateFlow<RoomsUiState> = _uiState.asStateFlow()

    /** Set by [create]/[join] on success; the route reacts by opening [RoomViewModel]. Consume with [consumeOpenedRoom]. */
    private val _openedRoomId = MutableStateFlow<String?>(null)
    val openedRoomId: StateFlow<String?> = _openedRoomId.asStateFlow()

    init {
        load()
    }

    fun load() {
        viewModelScope.launch {
            val available = repository.publishedQuestions()
            when (val outcome = repository.myRooms()) {
                is RoomsOutcome.Loaded -> _uiState.value = RoomsUiState.Content(outcome.rooms, available)
                RoomsOutcome.Unavailable -> _uiState.value = RoomsUiState.Content(emptyList(), available, offline = true)
            }
        }
    }

    fun create(name: String, questionIds: List<String>, timed: Boolean, secondsPerQuestion: Int?) {
        val state = _uiState.value as? RoomsUiState.Content ?: return
        viewModelScope.launch {
            val mutation = repository.create(name, questionIds, timed, secondsPerQuestion)
            if (mutation.succeeded) {
                _openedRoomId.value = mutation.room?.id
                load()
            } else {
                _uiState.value = state.copy(message = socialReasonMessage(mutation.reason))
            }
        }
    }

    fun join(code: String) {
        val state = _uiState.value as? RoomsUiState.Content ?: return
        val trimmed = code.trim()
        if (trimmed.isEmpty()) return
        viewModelScope.launch {
            val mutation = repository.join(trimmed)
            if (mutation.succeeded) {
                _openedRoomId.value = mutation.room?.id
            } else {
                _uiState.value = state.copy(message = socialReasonMessage(mutation.reason))
            }
        }
    }

    fun openRoom(id: String) {
        _openedRoomId.value = id
    }

    fun consumeOpenedRoom() {
        _openedRoomId.value = null
    }
}
