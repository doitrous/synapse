package com.synapse.app.feature.social

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.synapse.app.core.api.ChallengeSummaryDto
import com.synapse.app.core.api.PersonDto
import com.synapse.app.core.qbank.Question
import com.synapse.app.core.social.socialReasonMessage
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

/** What the Challenges tab's list shows. */
sealed interface ChallengesUiState {
    data object Loading : ChallengesUiState
    data class Content(
        val challenges: List<ChallengeSummaryDto>,
        val friends: List<PersonDto> = emptyList(),
        val available: List<Question> = emptyList(),
        val offline: Boolean = false,
        val message: String? = null,
    ) : ChallengesUiState
}

/**
 * Drives the Challenges tab's list screen — sending a new head-to-head to a
 * friend and listing the ones sent or received. Sitting one, once accepted,
 * is [ChallengeViewModel]'s job (same Setup-vs-Session split as
 * [StudyRoomsViewModel]/[RoomViewModel]).
 */
@HiltViewModel
class ChallengesViewModel @Inject constructor(
    private val repository: ChallengesRepository,
    private val friends: FriendsRepository,
) : ViewModel() {

    private val _uiState = MutableStateFlow<ChallengesUiState>(ChallengesUiState.Loading)
    val uiState: StateFlow<ChallengesUiState> = _uiState.asStateFlow()

    private val _openedChallengeId = MutableStateFlow<String?>(null)
    val openedChallengeId: StateFlow<String?> = _openedChallengeId.asStateFlow()

    init {
        load()
    }

    fun load() {
        viewModelScope.launch {
            val available = repository.publishedQuestions()
            val friendList = (friends.friends() as? FriendsOutcome.Loaded)?.friends ?: emptyList()
            when (val outcome = repository.myChallenges()) {
                is ChallengesOutcome.Loaded ->
                    _uiState.value = ChallengesUiState.Content(outcome.challenges, friendList, available)
                ChallengesOutcome.Unavailable ->
                    _uiState.value = ChallengesUiState.Content(emptyList(), friendList, available, offline = true)
            }
        }
    }

    fun create(opponentId: String, questionIds: List<String>, scopeLabel: String) {
        val state = _uiState.value as? ChallengesUiState.Content ?: return
        viewModelScope.launch {
            val mutation = repository.create(opponentId, questionIds, scopeLabel)
            if (mutation.succeeded) {
                _openedChallengeId.value = mutation.challenge?.id
                load()
            } else {
                _uiState.value = state.copy(message = socialReasonMessage(mutation.reason))
            }
        }
    }

    /** Accept/decline straight from the list — no need to open the challenge just to answer this. */
    fun respond(id: String, accept: Boolean) {
        val state = _uiState.value as? ChallengesUiState.Content ?: return
        viewModelScope.launch {
            val mutation = repository.respond(id, accept)
            if (mutation.succeeded) {
                if (accept) _openedChallengeId.value = id else load()
            } else {
                _uiState.value = state.copy(message = socialReasonMessage(mutation.reason))
            }
        }
    }

    fun openChallenge(id: String) {
        _openedChallengeId.value = id
    }

    fun consumeOpenedChallenge() {
        _openedChallengeId.value = null
    }
}
