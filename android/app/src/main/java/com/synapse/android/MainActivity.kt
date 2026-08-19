package com.synapse.android

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.material3.Text
import com.synapse.android.core.config.AppConfig

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val config = AppConfig.fromBuild()
        setContent { Text(if (config.isConfigured) "Configured" else "Missing: ${config.missing}") }
    }
}
