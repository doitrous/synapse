package com.nishany.android.feature.settings

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

/**
 * A plain statement of intent, not a compliance audit -- there is no
 * automated WCAG 2.1 AA scan behind this screen, only the standing goal every
 * other screen in this app is written against: legible contrast from the
 * Cortex palette (`design/Theme.kt`'s tokens are chosen against AA ratios in
 * the first place, per their own comments), touch targets sized for a tap
 * rather than a cursor, and every control reachable and nameable by
 * TalkBack. A gap found against any of that is a bug report, not a surprise.
 */
@Composable
fun AccessibilityStatementScreen(onBack: () -> Unit) {
    Column(
        modifier = Modifier.fillMaxSize().padding(24.dp).verticalScroll(rememberScrollState()),
        verticalArrangement = Arrangement.spacedBy(14.dp),
    ) {
        Text("Accessibility statement", style = MaterialTheme.typography.headlineSmall)
        Text(
            "Nishany is built with WCAG 2.1 Level AA as the standard we hold every screen to: " +
                "colour contrast that stays legible in every theme, touch targets sized for a tap, " +
                "and controls that a screen reader like TalkBack can reach and name correctly.",
            style = MaterialTheme.typography.bodyMedium,
        )
        Text(
            "This is a statement of intent, not a claim that every screen has been independently " +
                "audited. If something in the app is hard to read, hard to reach, or doesn't work with " +
                "TalkBack, that is a bug -- tell us about it from Help, and we will fix it.",
            style = MaterialTheme.typography.bodyMedium,
        )
        Text(
            "Reach us at help@nishany.com, or use the message box under Help in Settings.",
            style = MaterialTheme.typography.bodySmall,
        )
        Button(onClick = onBack) { Text("Back") }
    }
}
