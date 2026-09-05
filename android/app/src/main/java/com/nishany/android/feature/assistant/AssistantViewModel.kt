package com.nishany.android.feature.assistant

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import com.nishany.android.core.ConnectivityMonitor
import com.nishany.android.core.api.ApiError
import com.nishany.android.core.api.AssistantMessage
import com.nishany.android.core.api.AssistantStatus
import com.nishany.android.core.api.SynapseApi
import com.nishany.android.core.backgroundWorkScope
import com.nishany.android.core.ui.UiState
import kotlinx.coroutines.cancel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.flowOf
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

/** One message in the transcript. [role] is `"user"` or `"assistant"`, the server's own wire values. */
data class AssistantTurn(val id: String, val role: String, val content: String)

/**
 * The study assistant (parity item G5): a status gate (quota, plan, whether
 * it is on at all) plus a chat transcript, ported from iOS's `AssistantModel`
 * (`ios/Synapse/Core/Assistant/Assistant.swift`). The transcript lives only
 * here -- not persisted, not synced -- exactly like iOS and the web, so
 * leaving this screen loses it, on every client alike.
 *
 * A network-only surface, same shape as
 * [com.nishany.android.feature.practical.PracticalViewModel]'s connectivity-aware
 * [UiState] fold but with no local ledger behind it: nothing here reads or
 * writes [com.nishany.android.core.cache.LocalStore], so [uiState] is built
 * straight from [SynapseApi.assistantStatus] and [ConnectivityMonitor] rather
 * than from a synced document.
 */
class AssistantViewModel(
    private val api: SynapseApi,
    connectivity: ConnectivityMonitor? = null,
) : ViewModel() {
    private val backgroundScope = backgroundWorkScope("AssistantViewModel")

    private val _status = MutableStateFlow<AssistantStatus?>(null)
    private val _statusFailed = MutableStateFlow(false)

    val uiState: StateFlow<UiState<AssistantStatus>> =
        combine(_status, _statusFailed, connectivity?.isOnline ?: flowOf(true)) { status, failed, online ->
            assistantUiState(status, failed, online, retry = ::loadStatus)
        }.stateIn(backgroundScope, SharingStarted.Eagerly, UiState.Loading)

    private val _turns = MutableStateFlow<List<AssistantTurn>>(emptyList())
    val turns: StateFlow<List<AssistantTurn>> = _turns.asStateFlow()

    private val _pending = MutableStateFlow(false)
    val pending: StateFlow<Boolean> = _pending.asStateFlow()

    /** The last failure's message for the student, or null. Cleared by [clearFailure] and by the next [send]. */
    private val _failureMessage = MutableStateFlow<String?>(null)
    val failureMessage: StateFlow<String?> = _failureMessage.asStateFlow()

    /** Text handed back after a failed send -- see [send]'s doc. Consumed once by [takeReturned]. */
    private val _returned = MutableStateFlow("")
    val returned: StateFlow<String> = _returned.asStateFlow()

    private var counter = 0

    init {
        loadStatus()
    }

    fun loadStatus() {
        backgroundScope.launch {
            try {
                _status.value = api.assistantStatus()
                _statusFailed.value = false
            } catch (e: ApiError) {
                _statusFailed.value = true
            }
        }
    }

    /**
     * Sends [text]: appends it to the transcript immediately, then rolls it
     * back into [returned] if the turn does not land -- a question sitting
     * under a failed send reads as asked-and-ignored, the same reasoning
     * iOS's `AssistantModel.send` documents. A no-op while [pending] is
     * already true or [text] is blank, so a double-tap on Send cannot fire
     * two turns.
     */
    fun send(text: String, lang: String) {
        val message = text.trim().take(MAX_MESSAGE_CHARACTERS)
        if (message.isEmpty() || _pending.value) return

        counter += 1
        val outgoing = AssistantTurn(id = "turn-$counter", role = "user", content = message)
        _turns.update { it + outgoing }
        _pending.value = true
        _failureMessage.value = null
        _returned.value = ""

        backgroundScope.launch {
            try {
                val history = _turns.value.map { AssistantMessage(it.role, it.content) }
                val result = api.assistantChat(history, lang)
                // The server's figures replace this client's wholesale, the
                // same rule the quota display follows everywhere else in
                // this app: it is the one that spends the quota, so it is
                // the one whose count is shown.
                _status.value?.let { current ->
                    _status.value = current.copy(
                        plan = result.plan,
                        dailyMessages = result.dailyMessages,
                        used = result.used,
                        remaining = result.remaining,
                    )
                }
                val reply = result.reply
                if (reply.isNullOrEmpty()) {
                    rollBack(outgoing, message, "That didn't go through. Your message is back in the box — try again.")
                } else {
                    counter += 1
                    _turns.update { it + AssistantTurn(id = "turn-$counter", role = "assistant", content = reply) }
                }
            } catch (e: ApiError) {
                rollBack(outgoing, message, failureMessageFor(e))
            } finally {
                _pending.value = false
            }
        }
    }

    private fun rollBack(turn: AssistantTurn, message: String, failure: String) {
        _turns.update { list -> list.filterNot { it.id == turn.id } }
        _returned.value = message
        _failureMessage.value = failure
    }

    fun clearFailure() {
        _failureMessage.value = null
    }

    /** Consumed once, so recomposing this screen does not resurrect old text into a fresh composer. */
    fun takeReturned(): String {
        val value = _returned.value
        _returned.value = ""
        return value
    }

    /** "Start over" -- drops the transcript. Nothing here is persisted, so there is nothing else to undo. */
    fun reset() {
        _turns.value = emptyList()
        _failureMessage.value = null
        _returned.value = ""
    }

    override fun onCleared() {
        backgroundScope.cancel()
    }

    companion object {
        /** Matches the server's own per-message cap (`assistant.js`'s `MAX_MESSAGE_CHARS`). */
        const val MAX_MESSAGE_CHARACTERS = 4000

        fun factory(api: SynapseApi, connectivity: ConnectivityMonitor) = viewModelFactory {
            initializer { AssistantViewModel(api, connectivity) }
        }
    }
}

/**
 * Each [ApiError] a failed chat turn can come back as, worded the way iOS's
 * `AssistantFailure` words them (`Assistant.swift`). [ApiError.Transient]
 * with a null status is what [request][com.nishany.android.core.api.SynapseApi]
 * throws for an `IOException` with no HTTP response at all -- the same
 * signal iOS's own offline check exists to catch ahead of time, read here
 * off the exception instead of a second connectivity check.
 */
internal fun failureMessageFor(error: ApiError): String = when (error) {
    is ApiError.Forbidden -> "The assistant is not included on your plan."
    is ApiError.Transient -> when (error.status) {
        429 -> "You have used all your assistant messages for today. They reset at midnight."
        503, 502 -> "The assistant is unavailable right now."
        null -> "You're offline. Your message is back in the box — connect and try again."
        else -> "That didn't go through. Your message is back in the box — try again."
    }
    else -> "That didn't go through. Your message is back in the box — try again."
}

/**
 * The pure status-plus-connectivity -> [UiState] fold behind
 * [AssistantViewModel.uiState] -- same idiom as
 * [com.nishany.android.feature.practical.practicalUiState].
 */
internal fun assistantUiState(
    status: AssistantStatus?,
    failed: Boolean,
    isOnline: Boolean,
    retry: () -> Unit,
): UiState<AssistantStatus> = when {
    status != null -> UiState.Content(status)
    failed -> UiState.Error(
        message = if (isOnline) {
            "Couldn't reach Nishany. Check your connection and try again."
        } else {
            "You're offline. Connect and try again."
        },
        retry = retry,
    )
    else -> UiState.Loading
}
