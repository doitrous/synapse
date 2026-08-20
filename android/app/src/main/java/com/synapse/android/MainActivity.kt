package com.synapse.android

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import com.synapse.android.design.CortexTheme
import com.synapse.android.feature.root.RootScreen

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val graph = (application as SynapseApp).graph
        setContent {
            CortexTheme {
                RootScreen(graph)
            }
        }
    }
}
