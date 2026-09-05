package com.nishany.android

import android.content.Intent
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.compose.ui.platform.LocalLayoutDirection
import androidx.compose.ui.unit.LayoutDirection
import com.nishany.android.design.CortexTheme
import com.nishany.android.feature.root.RootScreen

class MainActivity : ComponentActivity() {
    // A plain field, not `rememberSaveable`: it only needs to survive from
    // onCreate/onNewIntent into the first composition that reads it, and
    // both of those already run on this Activity instance.
    private var openFocusTimerRequest by mutableStateOf(false)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val graph = (application as NishanyApp).graph
        openFocusTimerRequest = intent?.getBooleanExtra(EXTRA_OPEN_FOCUS_TIMER, false) == true

        // Read once, synchronously, before setContent -- so the first frame
        // is already in the reader's chosen theme rather than painting one
        // theme and then correcting to another. The web solves the same
        // problem with a boot script for the same reason
        // (src/lib/useTheme.tsx:9-10).
        val initialChoice = graph.themePreference.choice.value
        val initialLanguage = graph.languagePreference.language.value

        setContent {
            val choice by graph.themePreference.choice.collectAsState(initial = initialChoice)
            val language by graph.languagePreference.language.collectAsState(initial = initialLanguage)
            val direction = if (language.rtl) LayoutDirection.Rtl else LayoutDirection.Ltr
            CortexTheme(choice) {
                CompositionLocalProvider(LocalLayoutDirection provides direction) {
                    RootScreen(
                        graph = graph,
                        openFocusTimerRequest = openFocusTimerRequest,
                        onFocusTimerRequestConsumed = { openFocusTimerRequest = false },
                    )
                }
            }
        }
    }

    // launchMode="singleTop" (see the manifest) routes a tap on the ongoing
    // notification here instead of spawning a second Activity instance --
    // this is what lets that tap re-open the same running composition.
    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        setIntent(intent)
        if (intent.getBooleanExtra(EXTRA_OPEN_FOCUS_TIMER, false)) {
            openFocusTimerRequest = true
        }
    }

    companion object {
        /** Set by [com.nishany.android.feature.focus.FocusNotifier]'s tap-to-open PendingIntent. */
        const val EXTRA_OPEN_FOCUS_TIMER = "com.nishany.android.EXTRA_OPEN_FOCUS_TIMER"
    }
}
