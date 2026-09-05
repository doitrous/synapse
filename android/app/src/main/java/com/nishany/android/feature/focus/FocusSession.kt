package com.nishany.android.feature.focus

import kotlinx.serialization.Serializable

/**
 * The Focus Timer's session state machine, ported field-for-field from
 * `src/lib/focusSession.ts` -- the reference logic the web, iOS and Android
 * clients all mirror. Dependency-free (no Android, no Compose) so it reads
 * as one self-contained model and unit-tests as plain JVM; `FocusViewModel`
 * is the only place it meets the platform (persistence, ticking, the
 * heartbeat, strict mode). `@Serializable` is the one non-platform
 * dependency let in -- pure-Kotlin annotations, needed so `FocusViewModel`
 * can persist this to `SharedPreferences` as JSON.
 */

@Serializable
enum class FocusMode { COUNTDOWN, COUNTUP }

@Serializable
data class FocusSessionState(
    val mode: FocusMode,
    /** Countdown target length. Irrelevant in count-up, but kept rather than
     *  dropped so switching back to countdown restores the student's last pick. */
    val durationSeconds: Int,
    /** Countdown only -- clamped to `[0, durationSeconds]`. */
    val remainingSeconds: Int,
    /** Count-up only -- seconds counted since the block started. */
    val elapsedSeconds: Int,
    val running: Boolean,
    val strictArmed: Boolean,
    val selectedTaskId: String?,
    /** Wall clock (epoch millis) the fields above were last accurate at.
     *  [tick] catches up from here, so a backgrounded app, a killed process,
     *  or a device reboot all resume at the right second instead of
     *  freezing at the last write. */
    val updatedAt: Long,
    /** Set the moment a countdown reaches zero on its own; cleared by any
     *  user action (start, reset, mode/duration change). Null in count-up. */
    val completedAt: Long?,
)

const val DEFAULT_DURATION_MINUTES = 25
val DURATION_PRESETS_MINUTES = listOf(25, 50)
const val MIN_DURATION_MINUTES = 5
const val MAX_DURATION_MINUTES = 180

fun clampDurationMinutes(minutes: Int): Int = minutes.coerceIn(MIN_DURATION_MINUTES, MAX_DURATION_MINUTES)

fun initialFocusSession(now: Long = System.currentTimeMillis()): FocusSessionState {
    val durationSeconds = DEFAULT_DURATION_MINUTES * 60
    return FocusSessionState(
        mode = FocusMode.COUNTDOWN,
        durationSeconds = durationSeconds,
        remainingSeconds = durationSeconds,
        elapsedSeconds = 0,
        running = false,
        strictArmed = false,
        selectedTaskId = null,
        updatedAt = now,
        completedAt = null,
    )
}

/** Seconds actually spent working this block -- what credits study time. */
fun accruedSeconds(state: FocusSessionState): Int =
    if (state.mode == FocusMode.COUNTDOWN) state.durationSeconds - state.remainingSeconds else state.elapsedSeconds

/**
 * Catches a persisted state up to [now]. Pure, and safe to call on every
 * read: idle state is returned untouched, so calling it speculatively costs
 * nothing.
 */
fun tick(state: FocusSessionState, now: Long = System.currentTimeMillis()): FocusSessionState {
    if (!state.running) return state
    val elapsed = maxOf(0L, (now - state.updatedAt) / 1000)
    if (elapsed <= 0L) return state
    if (state.mode == FocusMode.COUNTUP) {
        return state.copy(elapsedSeconds = state.elapsedSeconds + elapsed.toInt(), updatedAt = now)
    }
    val remaining = state.remainingSeconds - elapsed.toInt()
    if (remaining > 0) return state.copy(remainingSeconds = remaining, updatedAt = now)
    return state.copy(remainingSeconds = 0, running = false, updatedAt = now, completedAt = now)
}

fun setMode(state: FocusSessionState, mode: FocusMode, now: Long = System.currentTimeMillis()): FocusSessionState {
    if (state.mode == mode) return state
    return if (mode == FocusMode.COUNTDOWN) {
        state.copy(mode = mode, remainingSeconds = state.durationSeconds, running = false, updatedAt = now, completedAt = null)
    } else {
        state.copy(mode = mode, elapsedSeconds = 0, running = false, updatedAt = now, completedAt = null)
    }
}

fun setDurationMinutes(state: FocusSessionState, minutes: Int, now: Long = System.currentTimeMillis()): FocusSessionState {
    val durationSeconds = clampDurationMinutes(minutes) * 60
    return state.copy(durationSeconds = durationSeconds, remainingSeconds = durationSeconds, running = false, updatedAt = now, completedAt = null)
}

fun start(state: FocusSessionState, now: Long = System.currentTimeMillis()): FocusSessionState {
    val caught = tick(state, now)
    if (caught.running) return caught
    // Starting again after a countdown finished restarts the block rather
    // than leaving "Start" dead at 0:00.
    val remainingSeconds = if (caught.mode == FocusMode.COUNTDOWN && caught.remainingSeconds <= 0) caught.durationSeconds else caught.remainingSeconds
    return caught.copy(running = true, remainingSeconds = remainingSeconds, updatedAt = now, completedAt = null)
}

fun pause(state: FocusSessionState, now: Long = System.currentTimeMillis()): FocusSessionState =
    tick(state, now).copy(running = false, updatedAt = now)

fun reset(state: FocusSessionState, now: Long = System.currentTimeMillis()): FocusSessionState =
    state.copy(remainingSeconds = state.durationSeconds, elapsedSeconds = 0, running = false, updatedAt = now, completedAt = null)

fun selectTask(state: FocusSessionState, taskId: String?): FocusSessionState = state.copy(selectedTaskId = taskId)

fun setStrictArmed(state: FocusSessionState, strictArmed: Boolean): FocusSessionState = state.copy(strictArmed = strictArmed)

/**
 * Strict mode's penalty for leaving: the running block is thrown away
 * exactly as a manual reset would, rather than quietly paused and
 * resumable. Whatever whole minutes already reached the server via the
 * study-heartbeat stay credited -- this only stops the block from counting
 * as finished.
 */
fun discard(state: FocusSessionState, now: Long = System.currentTimeMillis()): FocusSessionState = reset(state, now)

fun formatClock(totalSeconds: Int): String {
    val safe = maxOf(0, totalSeconds)
    val hours = safe / 3600
    val minutes = (safe % 3600) / 60
    val seconds = safe % 60
    return if (hours > 0) {
        "$hours:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}"
    } else {
        "$minutes:${seconds.toString().padStart(2, '0')}"
    }
}
