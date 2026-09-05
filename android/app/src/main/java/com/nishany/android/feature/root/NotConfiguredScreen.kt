package com.nishany.android.feature.root

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

/**
 * What a fresh clone with no `secrets.properties` shows -- a screen to
 * render, not a crash. No retry button and no network call: nothing here
 * can succeed until the build itself is reconfigured.
 */
@Composable
fun NotConfiguredScreen(missing: List<String>) {
    Column(
        modifier = Modifier.fillMaxSize().padding(24.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp, Alignment.CenterVertically),
    ) {
        Text("Not configured", style = MaterialTheme.typography.headlineSmall)
        Text("This build is missing the following configuration:")
        for (key in missing) {
            Text("• $key")
        }
    }
}
