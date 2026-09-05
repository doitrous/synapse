package com.nishany.android.core.ui

/**
 * What any screen backed by a load is showing, right now: still loading,
 * genuinely empty once loaded, failed to load, or here is the data.
 *
 * Generalises the sealed load-state shape `SettingsUiState`/`SupportListState`
 * (`feature/settings/SettingsViewModel.kt`) and `QotdUiState`
 * (`feature/qotd/QotdViewModel.kt`) each hand-roll for their own screen, so a
 * new screen reaches for this instead of inventing a fifth copy. Render it
 * with [com.nishany.android.core.ui.StateHost]. The Android peer of the
 * web's `AsyncSurface`.
 */
sealed interface UiState<out T> {
    data object Loading : UiState<Nothing>

    /** [retry], when non-null, is wired to a Retry button by [StateHost]. */
    data class Error(val message: String, val retry: (() -> Unit)? = null) : UiState<Nothing>

    data class Empty(val config: EmptyConfig = EmptyConfig()) : UiState<Nothing>

    data class Content<T>(val data: T) : UiState<T>
}

/**
 * icon + title + optional description for a [UiState.Empty] branch.
 *
 * [icon] is a single emoji glyph rather than a Material icon -- this app has
 * no material-icons-extended dependency, and the FAB in `RootScreen.kt`
 * (`Text("⏱")`) already draws its icon the same way.
 */
data class EmptyConfig(
    val title: String = "Nothing here yet",
    val description: String? = null,
    val icon: String? = null,
)
