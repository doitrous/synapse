package com.synapse.android.feature.focus

import android.content.Context
import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import com.synapse.android.core.api.SynapseApi
import com.synapse.android.core.backgroundWorkScope
import java.util.UUID
import kotlinx.coroutines.Job
import kotlinx.coroutines.cancel
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

/** Matches the web's `localStorage` key -- not read cross-client, just a shared name to grep for. */
private const val STORAGE_KEY = "nishany.focusTimer.session.v1"
private const val STRICT_GRACE_MS = 15_000L
private const val HEARTBEAT_MS = 60_000L
private const val HEARTBEAT_SURFACE = "focus-timer"

/**
 * Device-local persistence for [FocusSessionState] -- plain `SharedPreferences`
 * under [STORAGE_KEY], the same storage key and "never synced" contract
 * `useFocusSession.ts` uses for `localStorage`: two devices (there, two
 * tabs) must never fight over one running block. See
 * [com.synapse.android.design.ThemePreference]'s own doc for why plain,
 * unencrypted `SharedPreferences` is the right store for a per-device-only
 * value like this.
 */
class FocusSessionStore(context: Context) {
    private val prefs = context.applicationContext.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
    private val json = Json { ignoreUnknownKeys = true }

    fun load(): FocusSessionState {
        val raw = prefs.getString(STORAGE_KEY, null) ?: return initialFocusSession()
        return runCatching { json.decodeFromString<FocusSessionState>(raw) }.getOrDefault(initialFocusSession())
    }

    fun save(state: FocusSessionState) {
        prefs.edit().putString(STORAGE_KEY, json.encodeToString(state)).apply()
    }

    private companion object {
        const val PREFS_NAME = "synapse-focus-timer"
    }
}

private fun newSessionId(): String = UUID.randomUUID().toString()

/**
 * The Focus Timer's live session: ticks once a second (running or not --
 * see the ponytail note below), persisted to [FocusSessionStore] on every
 * user action and on every tick, and crediting study time through the exact
 * endpoint every other study surface already uses
 * (`POST /api/maristanas/study-heartbeat`), one id per run.
 *
 * Strict mode's two Android-specific pieces -- the background grace window
 * and the face-down accelerometer read -- are deliberately *not* here.
 * [armStrictGrace]/[clearStrictGrace] are the only hooks this class exposes;
 * [FocusTimerScreen] is what actually observes `Lifecycle.Event.ON_STOP` and
 * the `SensorManager`, because both need a `LifecycleOwner`/`Context` this
 * plain `ViewModel` does not carry, and keeping them out is what leaves this
 * class free of Android framework calls beyond `SharedPreferences`.
 *
 * ponytail: always ticks once a second, running or not -- `tick()` is a
 * no-op (returns the same instance) when idle, so `MutableStateFlow` simply
 * skips re-emitting; that is a smaller diff than starting/stopping a job on
 * every play/pause, the same tradeoff `RunnerViewModel`'s own ticker takes.
 */
class FocusViewModel(
    private val api: SynapseApi,
    private val store: FocusSessionStore,
    val tasks: FocusTasksStore,
    private val notifier: FocusNotifier,
) : ViewModel() {
    private val backgroundScope = backgroundWorkScope("FocusViewModel")

    private val _state = MutableStateFlow(tick(store.load()))
    val state: StateFlow<FocusSessionState> = _state.asStateFlow()

    private val _strictDeadline = MutableStateFlow<Long?>(null)
    private val _strictWarningSecondsLeft = MutableStateFlow<Int?>(null)
    val strictWarningSecondsLeft: StateFlow<Int?> = _strictWarningSecondsLeft.asStateFlow()

    private var sessionId = newSessionId()
    private var heartbeatJob: Job? = null

    init {
        if (_state.value.running) startHeartbeat()
        backgroundScope.launch {
            while (true) {
                delay(1_000)
                tickOnce()
                checkStrictDeadline()
            }
        }
    }

    fun setMode(mode: FocusMode) = mutate { setMode(it, mode) }
    fun setDurationMinutes(minutes: Int) = mutate { setDurationMinutes(it, minutes) }
    fun toggleRunning() = mutate { if (it.running) pause(it) else start(it) }
    fun reset() = mutate { reset(it) }
    fun selectTask(taskId: String?) = mutate { selectTask(it, taskId) }
    fun setStrictArmed(armed: Boolean) = mutate { setStrictArmed(it, armed) }
    fun discard() = mutate { discard(it) }

    fun accruedSeconds(): Int = accruedSeconds(_state.value)

    /**
     * Reloads from [store] -- the ongoing notification's Pause/Resume and Stop
     * actions (and, eventually, a widget) mutate [store] directly through
     * [FocusNotificationReceiver] rather than through this ViewModel, since
     * either can run in a fresh process with no live instance to call. A live
     * instance would otherwise never see that write. Called by
     * [FocusTimerScreen] on `Lifecycle.Event.ON_START`, the same spot
     * [clearStrictGrace] already runs from.
     */
    fun resync() {
        val before = _state.value
        val after = tick(store.load())
        _state.value = after
        if (before.running && !after.running) {
            stopHeartbeat()
        } else if (!before.running && after.running) {
            sessionId = newSessionId()
            startHeartbeat()
        }
        syncNotification(after)
    }

    /** Called by [FocusTimerScreen] on `Lifecycle.Event.ON_STOP` while a strict block is running. */
    fun armStrictGrace() {
        if (!_state.value.strictArmed || !_state.value.running) return
        _strictDeadline.value = System.currentTimeMillis() + STRICT_GRACE_MS
        _strictWarningSecondsLeft.value = (STRICT_GRACE_MS / 1000).toInt()
    }

    /** Called on `Lifecycle.Event.ON_START` -- returning within the grace window forgives it. */
    fun clearStrictGrace() {
        _strictDeadline.value = null
        _strictWarningSecondsLeft.value = null
    }

    private fun tickOnce() {
        val before = _state.value
        val after = tick(before)
        if (after === before) return
        _state.value = after
        store.save(after)
        // A countdown reaching zero on its own is the one running->idle
        // transition that never passes through mutate() -- catch it here so
        // the notification clears the moment the block completes, not on
        // the next heartbeat or app open.
        if (before.running && !after.running) {
            stopHeartbeat()
            syncNotification(after)
        }
    }

    private fun checkStrictDeadline() {
        val deadline = _strictDeadline.value ?: return
        val remainingMs = deadline - System.currentTimeMillis()
        if (remainingMs <= 0) {
            _strictDeadline.value = null
            _strictWarningSecondsLeft.value = null
            discard()
        } else {
            _strictWarningSecondsLeft.value = ((remainingMs + 999) / 1000).toInt()
        }
    }

    private fun mutate(fn: (FocusSessionState) -> FocusSessionState) {
        val before = _state.value
        val after = fn(tick(before))
        _state.value = after
        store.save(after)
        if (!before.running && after.running) {
            sessionId = newSessionId()
            startHeartbeat()
        } else if (before.running && !after.running) {
            stopHeartbeat()
        }
        syncNotification(after)
    }

    /** Shows/updates the ongoing notification while running; clears it the moment the block is not (paused, completed, or discarded). */
    private fun syncNotification(state: FocusSessionState) {
        if (state.running) notifier.update(state, currentTaskTitle(state)) else notifier.clear()
    }

    private fun currentTaskTitle(state: FocusSessionState): String? =
        state.selectedTaskId?.let { id -> tasks.tasks.value.firstOrNull { it.id == id }?.title }

    private fun startHeartbeat() {
        heartbeatJob?.cancel()
        heartbeatJob = backgroundScope.launch {
            while (true) {
                beat()
                delay(HEARTBEAT_MS)
            }
        }
    }

    private fun stopHeartbeat() {
        heartbeatJob?.cancel()
        heartbeatJob = null
    }

    private suspend fun beat() {
        // Drives the notification's on-the-minute refresh -- see this task's
        // brief for why per-second is not required. Also the path that
        // repaints it after this process was restarted just to run the
        // heartbeat, with no `mutate()` call in between.
        syncNotification(_state.value)
        val bucket = System.currentTimeMillis() / 60_000
        runCatching { api.studyHeartbeat(bucket, sessionId, HEARTBEAT_SURFACE) }
            .onFailure { Log.w(TAG, "study-heartbeat failed; this beat is simply lost", it) }
    }

    override fun onCleared() {
        backgroundScope.cancel()
    }

    companion object {
        private const val TAG = "FocusViewModel"

        fun factory(api: SynapseApi, store: FocusSessionStore, tasks: FocusTasksStore, notifier: FocusNotifier) = viewModelFactory {
            initializer { FocusViewModel(api, store, tasks, notifier) }
        }
    }
}
