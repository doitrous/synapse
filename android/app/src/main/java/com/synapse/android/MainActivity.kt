package com.synapse.android

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import com.synapse.android.design.CortexTheme
import com.synapse.android.feature.root.RootScreen

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val graph = (application as SynapseApp).graph

        // Read once, synchronously, before setContent -- so the first frame
        // is already in the reader's chosen theme rather than painting one
        // theme and then correcting to another. The web solves the same
        // problem with a boot script for the same reason
        // (src/lib/useTheme.tsx:9-10).
        val initialChoice = graph.themePreference.choice.value

        setContent {
            val choice by graph.themePreference.choice.collectAsState(initial = initialChoice)
            CortexTheme(choice) {
                RootScreen(graph)
            }
        }
    }
}
