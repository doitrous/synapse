package com.nishany.android.feature.studytest

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import com.nishany.android.core.api.ApiError
import com.nishany.android.core.api.NishanyApi
import com.nishany.android.core.backgroundWorkScope
import com.nishany.android.core.cache.LocalStore
import com.nishany.android.core.model.ContentKind
import com.nishany.android.core.model.Question
import com.nishany.android.core.model.QuestionProjection
import com.nishany.android.core.model.RoomSummary
import com.nishany.android.core.model.StudyRoom
import java.time.Duration
import java.time.Instant
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.Job
import kotlinx.coroutines.cancel
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.isActive
import kotlinx.coroutines.launch

/** How long a poll sleeps between reloads of an open room -- matches iOS's `StudyRoomModel.startPolling`. */
private val POLL_INTERVAL: Duration = Duration.ofSeconds(4)

/** Everything one screen visit needs, folded into one value so [StudyTestScreen] collects a single [StateFlow]. */
internal data class StudyTestUi(
    val rooms: List<RoomSummary> = emptyList(),
    val room: StudyRoom? = null,
    val isLoading: Boolean = false,
    /** A transient notice (a refusal, a dropped write) the lobby/runner show inline -- separate from [loadError], see its doc. */
    val message: String? = null,
    /**
     * Set only by a failed [StudyTestViewModel.loadRooms], and only while
     * there is nothing else on screen yet -- unlike [message], which the
     * student can dismiss and keep trying, this is the one case where the
     * whole surface has nothing to show but the failure.
     */
    val loadError: String? = null,
    /** The current room's questions, in the room's order -- read from the local catalogue, see [StudyTestViewModel.loadQuestions]. */
    val questions: List<Question> = emptyList(),
    val index: Int = 0,
    val chosenIndex: Int? = null,
    val reviewing: Boolean = false,
    val reviewIndex: Int = 0,
) {
    val current: Question? get() = questions.getOrNull(index)

    val reviewed: List<StudyTestLogic.Reviewed>
        get() = room?.let { StudyTestLogic.reviewed(it, questions) } ?: emptyList()

    /** A question withdrawn since the sitting cannot be reopened, so a review button offered for nothing would be worse than none. */
    val canReview: Boolean get() = reviewed.isNotEmpty()
}

/**
 * Sitting a shared test with other people -- the Android peer of iOS's
 * `StudyRoomModel`. This is the one qbank-shaped surface that cannot work
 * offline at all: a room is other students, and their answers only exist on
 * the server, so unlike [com.nishany.android.feature.qbank.QuestionBankViewModel]
 * this talks to [NishanyApi] directly rather than reading a synced document.
 *
 * A room open on screen is kept live by polling every [POLL_INTERVAL] (see
 * [startPolling]) until the student has finished and results are open --
 * there is nothing left to change after that, and a timer that never stops
 * is a battery drain nobody would trace back to this screen.
 */
internal class StudyTestViewModel(
    private val api: NishanyApi,
    private val store: LocalStore,
) : ViewModel() {
    private val scope = backgroundWorkScope("StudyTestViewModel")

    private val _ui = MutableStateFlow(StudyTestUi())
    val ui: StateFlow<StudyTestUi> = _ui.asStateFlow()

    private var pollJob: Job? = null

    /** When the question currently on screen was first shown -- reset only when the question underneath actually changes, matching iOS's own comment on why that must not happen on every poll. */
    private var questionStartedAt: Instant = Instant.now()

    fun loadRooms() {
        _ui.update { it.copy(isLoading = true) }
        scope.launch {
            try {
                val rooms = api.myStudyRooms()
                _ui.update { it.copy(rooms = rooms, isLoading = false, message = null, loadError = null) }
            } catch (e: CancellationException) {
                throw e
            } catch (e: Exception) {
                val text = "Could not reach Nishany. A shared test needs a connection."
                _ui.update { it.copy(isLoading = false, message = text, loadError = text) }
            }
        }
    }

    fun create(name: String, questionIds: List<String>, timed: Boolean) {
        scope.launch {
            try {
                val result = api.createStudyRoom(name, questionIds, timed, secondsPerQuestion = if (timed) 90 else null)
                if (!result.succeeded) {
                    _ui.update { it.copy(message = result.message) }
                    return@launch
                }
                (result.id ?: result.room?.id)?.let { open(it) }
            } catch (e: CancellationException) {
                throw e
            } catch (e: Exception) {
                _ui.update { it.copy(message = "Could not create the room.") }
            }
        }
    }

    fun join(code: String) {
        val tidied = code.trim().uppercase()
        if (tidied.isEmpty()) return
        scope.launch {
            try {
                val result = api.joinStudyRoom(tidied)
                if (!result.succeeded) {
                    _ui.update { it.copy(message = result.message) }
                    return@launch
                }
                (result.id ?: result.room?.id)?.let { open(it) }
            } catch (e: CancellationException) {
                throw e
            } catch (e: Exception) {
                _ui.update { it.copy(message = "Could not join that room.") }
            }
        }
    }

    fun open(id: String) {
        scope.launch {
            _ui.update { it.copy(isLoading = true) }
            reload(id)
            _ui.update { it.copy(isLoading = false) }
            startPolling(id)
        }
    }

    /** Leaves the current room and stops its poll -- every exit from a room goes through this, matching iOS's `close()`. */
    fun close() {
        pollJob?.cancel()
        pollJob = null
        _ui.update { StudyTestUi(rooms = it.rooms) }
    }

    private suspend fun reload(id: String) {
        try {
            val fresh = api.studyRoom(id)
            val questions = loadQuestions(fresh)
            val newIndex = StudyTestLogic.currentIndex(questions, fresh.answeredIds)
            val newCurrentId = questions.getOrNull(newIndex)?.id
            val previousCurrentId = _ui.value.current?.id
            val questionChanged = newCurrentId != previousCurrentId
            if (questionChanged) questionStartedAt = Instant.now()
            _ui.update { current ->
                current.copy(
                    room = fresh,
                    message = null,
                    questions = questions,
                    index = newIndex,
                    chosenIndex = if (questionChanged) null else current.chosenIndex,
                )
            }
        } catch (e: CancellationException) {
            throw e
        } catch (e: ApiError) {
            if (e is ApiError.NotFound) {
                _ui.update { it.copy(message = "That room is no longer available.") }
                close()
            } else if (_ui.value.room == null) {
                // Keep whatever is on screen: a dropped poll should not blank
                // the room a student is halfway through.
                _ui.update { it.copy(message = "Could not reach the room.") }
            }
        }
    }

    /**
     * The room's questions, read from the local catalogue -- the server
     * sends only ids, the text is content this device already synced. A
     * question the room names but this device has not synced (or that is
     * not published/visible any more) is skipped rather than shown blank.
     * There is no client-side cohort filter here, matching
     * [com.nishany.android.feature.qbank.QuestionBankViewModel]'s own pool:
     * [LocalStore.ledgerItems] already carries only this account's synced
     * content.
     */
    private suspend fun loadQuestions(room: StudyRoom): List<Question> {
        if (room.questionIds.isEmpty()) return emptyList()
        val items = store.ledgerItems(ContentKind.QUESTION).first()
        val byId = items.filter { it.isStudentVisible }.mapNotNull(QuestionProjection::project).associateBy { it.id }
        return room.questionIds.mapNotNull { byId[it] }
    }

    private fun startPolling(id: String) {
        pollJob?.cancel()
        pollJob = scope.launch {
            while (isActive) {
                delay(POLL_INTERVAL.toMillis())
                val room = _ui.value.room
                val done = room == null || (room.myFinished && room.resultsOpen)
                if (done) return@launch
                reload(id)
            }
        }
    }

    fun start() {
        val room = _ui.value.room ?: return
        scope.launch {
            try {
                val result = api.startStudyRoom(room.id)
                if (!result.succeeded) _ui.update { it.copy(message = result.message) }
                reload(room.id)
            } catch (e: CancellationException) {
                throw e
            } catch (e: Exception) {
                _ui.update { it.copy(message = "Could not start the test.") }
            }
        }
    }

    fun answer(optionIndex: Int) {
        val state = _ui.value
        val room = state.room ?: return
        val question = state.current ?: return
        if (state.chosenIndex != null) return
        _ui.update { it.copy(chosenIndex = optionIndex) }
        scope.launch {
            try {
                val seconds = Duration.between(questionStartedAt, Instant.now()).seconds.coerceAtLeast(0).toInt()
                val result = api.submitStudyRoomAnswer(room.id, question.id, optionIndex, seconds)
                if (!result.succeeded) _ui.update { it.copy(message = result.message) }
            } catch (e: CancellationException) {
                throw e
            } catch (e: Exception) {
                // The answer is gone. Say so rather than letting the student
                // believe it counted.
                _ui.update { it.copy(message = "That answer did not reach the room.", chosenIndex = null) }
            }
        }
    }

    fun next() {
        val state = _ui.value
        val room = state.room ?: return
        if (state.index + 1 < state.questions.size) {
            questionStartedAt = Instant.now()
            _ui.update { it.copy(index = it.index + 1, chosenIndex = null) }
            return
        }
        scope.launch {
            try {
                api.finishStudyRoom(room.id)
            } catch (e: CancellationException) {
                throw e
            } catch (e: Exception) {
                _ui.update { it.copy(message = "Could not hand it in.") }
            }
            reload(room.id)
        }
    }

    // --- The paper, afterwards ---

    fun startReview() {
        _ui.update { it.copy(reviewing = true, reviewIndex = 0) }
    }

    fun stopReview() {
        _ui.update { it.copy(reviewing = false) }
    }

    fun reviewPrevious() {
        _ui.update { it.copy(reviewIndex = (it.reviewIndex - 1).coerceAtLeast(0)) }
    }

    fun reviewNext() {
        _ui.update { it.copy(reviewIndex = (it.reviewIndex + 1).coerceAtMost((it.reviewed.size - 1).coerceAtLeast(0))) }
    }

    override fun onCleared() {
        scope.cancel()
    }

    companion object {
        fun factory(api: NishanyApi, store: LocalStore) = viewModelFactory {
            initializer { StudyTestViewModel(api, store) }
        }
    }
}
