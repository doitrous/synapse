package com.synapse.app.feature.shell

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.synapse.app.feature.maristanas.MaristanaRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import java.time.Instant
import java.util.UUID
import javax.inject.Inject
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.isActive
import kotlinx.coroutines.launch

/** How often a heartbeat may fire, and the width of one `bucket` — mirrors web's `HEARTBEAT_MS`. */
internal const val HEARTBEAT_INTERVAL_MS = 60_000L

/**
 * Web's `STUDY_SURFACES` (`src/components/shell/StudyActivityTracker.tsx`), restricted to
 * routes that actually exist on this app's `NavHost` (see `ALL_DESTINATIONS` in `Nav.kt`).
 * Web's six minigame sub-games (`term-grid`, `spotter`, `term-match`, `clinical-sequence`,
 * `mechanism-chain`, `red-flag-sort`) are `MinigamesRoute`'s own internal state, not distinct
 * `NavHost` routes (see that file's `MinigamesPosition`), so `"minigames"` alone stands in for
 * the whole hub. `"maristanas"` (Build Maristanas) is deliberately excluded, matching web:
 * looking at your own progress isn't studying.
 */
internal val STUDY_SURFACES = setOf(
    LIBRARY_ROUTE,
    QUESTION_BANK_ROUTE,
    "adaptive",
    RESOURCES_ROUTE,
    "taxonomy",
    "practical",
    "essays",
    FLASHCARDS_ROUTE,
    "minigames",
    "whiteboard",
    "notebook",
    "study-together",
)

/**
 * The gating + ticker behind [StudyActivityTracker]. Owns one loop (started/stopped by
 * [onRouteChanged]/[onForegroundChanged], the same restart-on-change shape as
 * `PartyLobbyViewModel.open`/`close`) that calls
 * [MaristanaRepository.recordStudyHeartbeat] at most once a minute while the current route is a
 * [STUDY_SURFACES] route AND the app is foregrounded.
 *
 * ponytail: web also gates on a real keyboard/pointer/touch/scroll event within the last 3
 * minutes (`ACTIVE_FOR_MS`). Threading a genuine last-interaction timestamp here would mean
 * wiring a pointer listener through every study screen's Modifier tree, which isn't cheap for
 * a shell-mounted tracker — foreground + study-route is the honest proxy for now (see
 * [StudyActivityTracker]'s doc). Add the recency window if that proxy proves too generous.
 */
@HiltViewModel
class StudyActivityTrackerViewModel @Inject constructor(
    private val repository: MaristanaRepository,
) : ViewModel() {

    /** Overridable in tests, same seam as `MaristanaViewModel.now`. */
    var now: () -> Instant = Instant::now

    private var tickJob: Job? = null
    private var sessionId: String = UUID.randomUUID().toString()
    private var surface: String? = null
    private var foreground: Boolean = false

    /** [route] is the shell's current `NavHost` route (or null); only a [STUDY_SURFACES] route counts. */
    fun onRouteChanged(route: String?) {
        val newSurface = route?.takeIf { it in STUDY_SURFACES }
        if (newSurface == surface) return
        surface = newSurface
        sessionId = UUID.randomUUID().toString()
        restart()
    }

    fun onForegroundChanged(isForeground: Boolean) {
        if (isForeground == foreground) return
        foreground = isForeground
        restart()
    }

    private fun restart() {
        tickJob?.cancel()
        tickJob = if (surface != null && foreground) {
            viewModelScope.launch {
                while (isActive) {
                    delay(HEARTBEAT_INTERVAL_MS)
                    sendHeartbeat()
                }
            }
        } else {
            null
        }
    }

    private suspend fun sendHeartbeat() {
        val activeSurface = surface ?: return
        if (!foreground) return
        val bucket = now().toEpochMilli() / HEARTBEAT_INTERVAL_MS
        try {
            repository.recordStudyHeartbeat(
                bucket = bucket,
                sessionId = sessionId,
                moduleId = null,
                subjectId = null,
                surface = activeSurface,
            )
        } catch (e: CancellationException) {
            throw e
        } catch (e: Exception) {
            // Degrade honestly: a missed heartbeat this minute is not fatal, the next tick retries.
        }
    }

    override fun onCleared() {
        tickJob?.cancel()
    }
}
