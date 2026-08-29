package com.synapse.app.core.config

import com.synapse.app.BuildConfig

/**
 * The build's configuration, read from `BuildConfig` (populated from the
 * gitignored `secrets.properties`). Mirrors iOS `AppConfig`: the app builds
 * without secrets and can report what's missing so a fresh clone never fails to
 * compile — it just shows a "Not configured" state.
 */
data class AppConfig(
    val apiHost: String,
    val supabaseHost: String,
    val supabaseAnonKey: String,
) {
    val isConfigured: Boolean
        get() = apiHost.isNotBlank() && supabaseHost.isNotBlank() && supabaseAnonKey.isNotBlank()

    /** The REST API base, e.g. `https://synapse.doitrous.com/api`. */
    val apiBase: String
        get() = "https://$apiHost/api"

    companion object {
        fun fromBuildConfig(): AppConfig = AppConfig(
            apiHost = BuildConfig.API_HOST,
            supabaseHost = BuildConfig.SUPABASE_HOST,
            supabaseAnonKey = BuildConfig.SUPABASE_ANON_KEY,
        )
    }
}
