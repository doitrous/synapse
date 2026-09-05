package com.nishany.android

import android.app.Application
import com.nishany.android.core.config.AppConfig

class NishanyApp : Application() {
    lateinit var graph: AppGraph
        private set

    override fun onCreate() {
        super.onCreate()
        graph = AppGraph(this, AppConfig.fromBuild())
    }
}
