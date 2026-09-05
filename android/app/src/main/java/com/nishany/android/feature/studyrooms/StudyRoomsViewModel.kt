package com.nishany.android.feature.studyrooms

import android.content.Context
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import com.nishany.android.core.api.JoinedParty
import com.nishany.android.core.api.NishanyApi
import com.nishany.android.core.backgroundWorkScope
import com.nishany.android.core.rooms.MediasoupVoiceClient
import com.nishany.android.core.rooms.MuteTransition
import com.nishany.android.core.rooms.RoomChannel
import com.nishany.android.core.rooms.RoomChannelState
import com.nishany.android.core.rooms.RoomForegroundService
import com.nishany.android.core.rooms.RoomRoster
import com.nishany.android.core.rooms.RoomStatus
import com.nishany.android.core.rooms.buildRoster
import com.nishany.android.core.ui.UiState
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.Job
import kotlinx.coroutines.cancel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.launch
import okhttp3.OkHttpClient

enum class VoicePhase { IDLE, JOINING, LIVE, ERROR }

data class VoiceUi(
    val phase: VoicePhase,
    val muted: Boolean,
    /** Why nobody can hear you, when that is the case; null under a working call. */
    val reason: String?,
    val callActive: Boolean,
    val reconnecting: Boolean,
)

sealed interface StudyRoomsState {
    /** No room joined: the enter-a-code form. */
    data class Lobby(val joining: Boolean = false, val error: String? = null) : StudyRoomsState

    /** In a room: the presence roster (loading/error/content) and the voice controls. */
    data class InRoom(
        val party: JoinedParty,
        val roster: UiState<RoomRoster>,
        val voice: VoiceUi,
    ) : StudyRoomsState
}

/**
 * Study Rooms: join by code, watch the presence roster over the room socket,
 * and — when the server has an SFU — talk. The greenfield Android peer of the
 * web's `StudyRooms.tsx` + `RoomControls.tsx`, voice-only (the shared "study
 * test" room is a follow-on, see the screen's doc).
 *
 * The socket ([RoomChannel]) and the call ([MediasoupVoiceClient]) are held for
 * the life of the ViewModel — a navigation-entry ViewModel, so a call survives
 * rotation and backgrounding (the foreground service keeps the process alive);
 * leaving the screen clears both. Everything the room decides is the pure
 * [com.nishany.android.core.rooms.RoomProtocol] layer, tested apart from this.
 */
class StudyRoomsViewModel(
    private val appContext: Context,
    private val api: NishanyApi,
    private val apiBaseUrl: String,
    private val tokenProvider: suspend () -> String?,
    private val wsClient: OkHttpClient,
) : ViewModel() {
    private val scope = backgroundWorkScope("StudyRoomsViewModel")

    private val _state = MutableStateFlow<StudyRoomsState>(StudyRoomsState.Lobby())
    val state: StateFlow<StudyRoomsState> = _state.asStateFlow()

    private var channel: RoomChannel? = null
    private var voice: MediasoupVoiceClient? = null
    private var collectJob: Job? = null

    private val selfSpeaking = MutableStateFlow(false)
    private val voiceInternal = MutableStateFlow(VoiceState())
    @Volatile private var rebuilding = false

    private data class VoiceState(
        val phase: VoicePhase = VoicePhase.IDLE,
        val muted: Boolean = false,
        val localReason: String? = null,
        val reconnecting: Boolean = false,
        val callActive: Boolean = false,
    )

    fun join(code: String) {
        val trimmed = code.trim()
        if (trimmed.isEmpty()) return
        _state.value = StudyRoomsState.Lobby(joining = true)
        scope.launch {
            val result = try {
                api.joinParty(trimmed)
            } catch (e: CancellationException) {
                throw e
            } catch (e: Exception) {
                _state.value = StudyRoomsState.Lobby(error = "Couldn't reach Nishany. Check your connection and try again.")
                return@launch
            }
            val party = result.party
            if (!result.ok || party == null) {
                _state.value = StudyRoomsState.Lobby(error = joinFailureText(result.reason))
                return@launch
            }
            startRoom(party)
        }
    }

    private fun startRoom(party: JoinedParty) {
        selfSpeaking.value = false
        voiceInternal.value = VoiceState()
        val ch = RoomChannel(apiBaseUrl, party.code, wsClient, tokenProvider, scope)
        channel = ch
        ch.start()
        collectJob = scope.launch {
            combine(ch.state, selfSpeaking, voiceInternal) { chState, selfSpk, voiceState ->
                Triple(chState, selfSpk, voiceState)
            }.collect { (chState, selfSpk, voiceState) ->
                maintainCall(chState, voiceState)
                _state.value = StudyRoomsState.InRoom(
                    party = party,
                    roster = rosterUi(chState, selfSpk),
                    voice = voiceUi(chState),
                )
                // Reconcile the consumers with who is currently producing.
                if (voiceState.phase == VoicePhase.LIVE && voiceState.callActive) {
                    val client = voice
                    if (client != null) scope.launch { client.syncProducers(chState.producers) }
                }
            }
        }
    }

    /** Tear a live call down when the socket drops, and rebuild it when the socket returns. */
    private fun maintainCall(chState: RoomChannelState, voiceState: VoiceState) {
        if (voiceState.phase != VoicePhase.LIVE && !voiceState.reconnecting) return
        val connected = chState.status == RoomStatus.OPEN
        if (!connected) {
            if (voiceState.callActive) {
                voice?.close()
                voice = null
                voiceInternal.value = voiceState.copy(reconnecting = true, callActive = false)
            }
            return
        }
        if (voiceState.callActive || rebuilding) return
        rebuildCall()
    }

    private fun rebuildCall() {
        val ch = channel ?: return
        if (rebuilding) return
        rebuilding = true
        scope.launch {
            voice?.close()
            val previousMuted = voiceInternal.value.muted
            val client = newVoiceClient(ch)
            voice = client
            try {
                client.setMuted(previousMuted)
                client.join()
                voiceInternal.value = voiceInternal.value.copy(
                    phase = VoicePhase.LIVE, reconnecting = false, callActive = true,
                )
            } catch (e: CancellationException) {
                throw e
            } catch (e: Exception) {
                client.close()
                voice = null
                voiceInternal.value = voiceInternal.value.copy(
                    reconnecting = false, callActive = false,
                    localReason = "Voice could not reconnect, so nobody can hear you in this room.",
                )
            } finally {
                rebuilding = false
            }
        }
    }

    /** Called once the mic permission is granted (the screen primes it). */
    fun joinVoice() {
        val ch = channel ?: return
        if (voice != null) return
        if (ch.sfu?.available != true) return
        voiceInternal.value = voiceInternal.value.copy(phase = VoicePhase.JOINING, localReason = null)
        RoomForegroundService.start(appContext)
        val client = newVoiceClient(ch)
        voice = client
        scope.launch {
            try {
                client.setMuted(voiceInternal.value.muted)
                client.join()
                voiceInternal.value = voiceInternal.value.copy(phase = VoicePhase.LIVE, callActive = true)
            } catch (e: CancellationException) {
                throw e
            } catch (e: Exception) {
                client.close()
                voice = null
                RoomForegroundService.stop(appContext)
                voiceInternal.value = voiceInternal.value.copy(
                    phase = VoicePhase.ERROR, callActive = false,
                    localReason = "Voice could not connect, so nobody can hear you in this room.",
                )
            }
        }
    }

    fun toggleMute() {
        val client = voice ?: return
        val transition = MuteTransition.toggle(voiceInternal.value.muted)
        client.setMuted(transition.muted)
        if (transition.emitSpeakingFalse) selfSpeaking.value = false
        voiceInternal.value = voiceInternal.value.copy(muted = transition.muted)
    }

    /** Leave voice but stay in the room (roster keeps updating). */
    fun leaveVoice() {
        voice?.close()
        voice = null
        RoomForegroundService.stop(appContext)
        selfSpeaking.value = false
        voiceInternal.value = VoiceState()
    }

    /** Leave the room entirely, back to the lobby. */
    fun leaveRoom() {
        leaveVoice()
        collectJob?.cancel()
        collectJob = null
        channel?.close()
        channel = null
        _state.value = StudyRoomsState.Lobby()
    }

    private fun newVoiceClient(ch: RoomChannel) = MediasoupVoiceClient(
        appContext = appContext,
        channel = ch,
        scope = scope,
        onSelfSpeaking = { selfSpeaking.value = it },
        onMediaFailed = { reason ->
            voice?.close()
            voice = null
            RoomForegroundService.stop(appContext)
            voiceInternal.value = voiceInternal.value.copy(phase = VoicePhase.ERROR, callActive = false, localReason = reason)
        },
    )

    private fun rosterUi(chState: RoomChannelState, selfSpeaking: Boolean): UiState<RoomRoster> {
        if (chState.archived) return UiState.Error("This room has been closed.")
        val roster = buildRoster(chState, selfSpeaking)
        return when {
            roster != null -> UiState.Content(roster)
            chState.status == RoomStatus.CLOSED && !chState.retrying ->
                UiState.Error("You're not a member of this room, or it's no longer available.")
            else -> UiState.Loading
        }
    }

    private fun voiceUi(chState: RoomChannelState): VoiceUi {
        val v = voiceInternal.value
        val reason = when {
            v.callActive || v.reconnecting -> null
            v.localReason != null -> v.localReason
            chState.sfu?.available == false -> chState.sfu?.reason ?: VOICE_UNAVAILABLE
            else -> null
        }
        return VoiceUi(
            phase = v.phase,
            muted = v.muted,
            reason = reason,
            callActive = v.callActive,
            reconnecting = v.reconnecting,
        )
    }

    override fun onCleared() {
        leaveVoice()
        channel?.close()
        scope.cancel()
    }

    private fun joinFailureText(reason: String?): String = when (reason) {
        "no_cohort" -> "Your account isn't in a year yet, so you can't join rooms."
        "archived" -> "That room has been closed."
        // A wrong code and a room in another cohort look the same by design.
        "wrong_cohort" -> "That code didn't match a room for your year. Check it and try again."
        else -> "That room code didn't work. Check it and try again."
    }

    companion object {
        const val VOICE_UNAVAILABLE = "Voice is unavailable in this room right now."

        fun factory(
            appContext: Context,
            api: NishanyApi,
            apiBaseUrl: String,
            tokenProvider: suspend () -> String?,
        ) = viewModelFactory {
            initializer {
                StudyRoomsViewModel(
                    appContext = appContext.applicationContext,
                    api = api,
                    apiBaseUrl = apiBaseUrl,
                    tokenProvider = tokenProvider,
                    wsClient = OkHttpClient(),
                )
            }
        }
    }
}
