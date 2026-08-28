package com.synapse.android

import android.app.Application
import com.synapse.android.core.config.AppConfig

class SynapseApp : Application() {
    lateinit var graph: AppGraph
        private set

    override fun onCreate() {
        super.onCreate()
        graph = AppGraph(this, AppConfig.fromBuild())
    }
}
