package com.synapse.android.core.config

import com.synapse.android.BuildConfig

/**
 * What the build was configured with, and what it is missing.
 *
 * Missing configuration is a screen, not a crash. A fresh clone has no
 * `secrets.properties`, and an app that refused to launch there would be
 * reported as broken rather than as unconfigured.
 */
class AppConfig(
    private val rawSupabaseHost: String,
    val supabaseAnonKey: String,
    rawApiBaseUrl: String,
) {
    /** The API base with any trailing slash removed, so path joins never double up. */
    val apiBaseUrl: String = rawApiBaseUrl.trim().trimEnd('/')

    /**
     * The full Supabase URL.
     *
     * The host is stored without a scheme because that is how the iOS
     * xcconfig has to store it — an xcconfig reads `//` as a comment and
     * silently truncates a pasted URL to `https:`. Both clients therefore
     * keep the host bare and add the scheme back here.
     */
    val supabaseUrl: String
        get() {
            val host = rawSupabaseHost.trim().trimEnd('/')
            return if (host.startsWith("http://") || host.startsWith("https://")) host else "https://$host"
        }

    val missing: List<String>
        get() = buildList {
            if (rawSupabaseHost.isBlank()) add("SUPABASE_HOST")
            if (supabaseAnonKey.isBlank()) add("SUPABASE_ANON_KEY")
            if (apiBaseUrl.isBlank()) add("API_BASE_URL")
        }

    val isConfigured: Boolean get() = missing.isEmpty()

    companion object {
        fun fromBuild(): AppConfig = AppConfig(
            rawSupabaseHost = BuildConfig.SUPABASE_HOST,
            supabaseAnonKey = BuildConfig.SUPABASE_ANON_KEY,
            rawApiBaseUrl = BuildConfig.API_BASE_URL,
        )
    }
}
