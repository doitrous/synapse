package com.nishany.android.feature.qotd

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import com.nishany.android.core.api.NishanyApi
import com.nishany.android.core.cache.LocalStore
import com.nishany.android.core.model.ContentKind
import com.nishany.android.core.model.Question
import com.nishany.android.core.model.QuestionProjection
import com.nishany.android.core.model.QotdFriends
import com.nishany.android.core.model.QotdLeaderboard
import com.nishany.android.core.model.QotdToday
import com.nishany.android.core.sync.SyncEngine
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.launch

/** What the Question-of-the-Day screen is showing. */
sealed interface QotdUiState {
    data object Loading : QotdUiState
    data class Error(val message: String) : QotdUiState
    data class Loaded(
        val today: QotdToday,
        val question: Question?,
        val emptyReason: String?,
        val answered: Boolean,
        val chosenLabel: String?,
        val correctLabel: String?,
        val current: Int,
        val longest: Int,
        val leaderboard: QotdLeaderboard?,
        val friends: QotdFriends?,
        val answerError: String? = null,
    ) : QotdUiState
}

/**
 * Question of the Day.
 *
 * The server marks answers ([NishanyApi.qotdAnswer]), so this never self-marks
 * and never writes a question-bank attempt: QotD is a separate track. Today's
 * status comes from the API; the question BODY is resolved from the local ledger
 * by id, exactly as the question bank resolves its pool.
 */
class QotdViewModel(
    private val api: NishanyApi,
    private val store: LocalStore,
) : ViewModel() {

    private val _state = MutableStateFlow<QotdUiState>(QotdUiState.Loading)
    val state: StateFlow<QotdUiState> = _state.asStateFlow()

    fun load() {
        viewModelScope.launch {
            _state.value = QotdUiState.Loading
            val today = try {
                api.qotdToday()
            } catch (e: Exception) {
                _state.value = QotdUiState.Error("Today's question could not be loaded.")
                return@launch
            }
            val question = today.questionId?.let { resolveQuestion(it) }
            val emptyReason = when {
                today.questionId == null -> "There's no Question of the Day for your year today."
                question == null -> "Today's question isn't on this device yet — it may be outside your year, or still downloading."
                else -> null
            }
            _state.value = QotdUiState.Loaded(
                today = today,
                question = question,
                emptyReason = emptyReason,
                answered = today.answered,
                chosenLabel = today.answerIndex?.let { question?.options?.getOrNull(it)?.label },
                correctLabel = if (today.answered) question?.correctLabel else null,
                current = today.current,
                longest = today.longest,
                leaderboard = null,
                friends = null,
            )
            loadSocial()
        }
    }

    fun answer(label: String) {
        val current = _state.value as? QotdUiState.Loaded ?: return
        if (current.answered) return
        val question = current.question ?: return
        val index = question.options.indexOfFirst { it.label == label }
        if (index < 0) return
        viewModelScope.launch {
            val result = try {
                api.qotdAnswer(question.id, index)
            } catch (e: Exception) {
                (_state.value as? QotdUiState.Loaded)?.let {
                    _state.value = it.copy(answerError = "Your answer couldn't be submitted. Check your connection and try again.")
                }
                return@launch
            }
            (_state.value as? QotdUiState.Loaded)?.let {
                _state.value = it.copy(
                    answered = true,
                    chosenLabel = label,
                    correctLabel = question.options.getOrNull(result.correctIndex)?.label ?: question.correctLabel,
                    current = result.current,
                    longest = result.longest,
                    answerError = null,
                )
            }
            loadSocial()
        }
    }

    private suspend fun loadSocial() {
        val leaderboard = runCatching { api.qotdLeaderboard() }.getOrNull()
        val friends = runCatching { api.qotdFriends() }.getOrNull()
        (_state.value as? QotdUiState.Loaded)?.let {
            _state.value = it.copy(leaderboard = leaderboard, friends = friends)
        }
    }

    private suspend fun resolveQuestion(id: String): Question? {
        val byId = store.ledgerItems(ContentKind.QUESTION).first()
            .filter { it.isStudentVisible }
            .mapNotNull(QuestionProjection::project)
            .associateBy { it.id }
        return byId[id]
    }

    companion object {
        fun factory(store: LocalStore, sync: SyncEngine, api: NishanyApi) = viewModelFactory {
            initializer { QotdViewModel(api, store) }
        }
    }
}
