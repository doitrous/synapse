package com.synapse.app.feature.shell

import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.LifecycleEventObserver
import androidx.lifecycle.ProcessLifecycleOwner

/**
 * Records active-study minutes by calling
 * [MaristanaRepository.recordStudyHeartbeat][com.synapse.app.feature.maristanas.MaristanaRepository.recordStudyHeartbeat],
 * mirroring web's shell-mounted `StudyActivityTracker`
 * (`src/components/shell/StudyActivityTracker.tsx`). Mounted once from [AppScaffold]'s `NavHost`
 * content; renders nothing. All the gating (study-surface check, once-a-minute ticker, session
 * id per surface) lives in [StudyActivityTrackerViewModel] so it can be unit tested directly —
 * this composable only forwards [currentRoute] and the app's foreground state.
 *
 * A heartbeat fires at most once a minute while [currentRoute] is a study surface AND the app
 * is foregrounded — read via [ProcessLifecycleOwner] (app-level RESUMED/PAUSED, not one
 * `Activity`'s), the Android equivalent of web's `document.visibilityState`. See
 * [StudyActivityTrackerViewModel]'s doc for the recency-window corner this cuts.
 */
@Composable
fun StudyActivityTracker(
    currentRoute: String?,
    viewModel: StudyActivityTrackerViewModel = hiltViewModel(),
) {
    LaunchedEffect(currentRoute) {
        viewModel.onRouteChanged(currentRoute)
    }

    DisposableEffect(viewModel) {
        val lifecycle = ProcessLifecycleOwner.get().lifecycle
        val observer = LifecycleEventObserver { _, event ->
            when (event) {
                Lifecycle.Event.ON_RESUME -> viewModel.onForegroundChanged(true)
                Lifecycle.Event.ON_PAUSE -> viewModel.onForegroundChanged(false)
                else -> Unit
            }
        }
        lifecycle.addObserver(observer)
        onDispose { lifecycle.removeObserver(observer) }
    }
}
