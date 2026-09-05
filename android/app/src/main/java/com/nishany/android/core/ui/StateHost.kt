package com.nishany.android.core.ui

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp

/**
 * Renders exactly the branch [state] is in -- the Android peer of the web's
 * `AsyncSurface`, and the one place every screen backed by a load should
 * render its loading/error/empty chrome, rather than a fifth hand-rolled
 * `when` per screen.
 *
 * [modifier] sizes the single [Box] every branch renders into, so a caller
 * that needs `Modifier.weight(1f)` inside a `Column` (as every branch of
 * `PracticalListScreen`'s tabs did before this) passes it here once, and
 * both the loading/error/empty chrome and [content] size the same way.
 */
@Composable
fun <T> StateHost(
    state: UiState<T>,
    modifier: Modifier = Modifier,
    content: @Composable (T) -> Unit,
) {
    Box(modifier = modifier) {
        when (state) {
            is UiState.Loading -> LoadingSurface()
            is UiState.Error -> ErrorSurface(message = state.message, retry = state.retry)
            is UiState.Empty -> EmptySurface(state.config)
            is UiState.Content -> content(state.data)
        }
    }
}

/** Generalises `RootScreen.RestoringScreen`'s look: a centered spinner, nothing else. */
@Composable
private fun LoadingSurface() {
    Box(
        modifier = Modifier.fillMaxSize().semantics { contentDescription = "Loading" },
        contentAlignment = Alignment.Center,
    ) {
        CircularProgressIndicator()
    }
}

@Composable
private fun ErrorSurface(message: String, retry: (() -> Unit)?) {
    Box(modifier = Modifier.fillMaxSize().padding(24.dp), contentAlignment = Alignment.Center) {
        Column(horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.spacedBy(12.dp)) {
            Text(message, style = MaterialTheme.typography.bodyMedium, textAlign = TextAlign.Center)
            if (retry != null) {
                // heightIn(min = 48.dp): the WCAG/Material touch-target floor --
                // a default Material Button is already close to this, but not
                // guaranteed to clear it at every font scale.
                Button(onClick = retry, modifier = Modifier.heightIn(min = 48.dp).semantics { contentDescription = "Retry" }) {
                    Text("Retry")
                }
            }
        }
    }
}

@Composable
private fun EmptySurface(config: EmptyConfig) {
    Box(modifier = Modifier.fillMaxSize().padding(24.dp), contentAlignment = Alignment.Center) {
        Column(horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.spacedBy(8.dp)) {
            if (config.icon != null) {
                Text(config.icon, style = MaterialTheme.typography.displaySmall)
            }
            Text(config.title, style = MaterialTheme.typography.titleMedium, textAlign = TextAlign.Center)
            if (config.description != null) {
                Text(config.description, style = MaterialTheme.typography.bodySmall, textAlign = TextAlign.Center)
            }
        }
    }
}
