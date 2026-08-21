package com.synapse.android

import android.content.Context
import com.synapse.android.core.api.SynapseApi
import com.synapse.android.core.auth.AuthBackend
import com.synapse.android.core.auth.AuthModel
import com.synapse.android.core.auth.EncryptedSessionStore
import com.synapse.android.core.auth.SessionStore
import com.synapse.android.core.auth.SupabaseAuthBackend
import com.synapse.android.core.cache.CortexDatabase
import com.synapse.android.core.cache.LocalStore
import com.synapse.android.core.config.AppConfig
import com.synapse.android.core.sync.SyncEngine
import com.synapse.android.design.ThemePreference
import okhttp3.OkHttpClient

/**
 * One instance of everything the app needs, held for the life of the
 * process by [SynapseApp].
 *
 * `CortexDatabase` must be one instance per process -- Room hands out a
 * connection pool per instance, so two instances over the same file are two
 * writers that do not see each other's invalidations, and a [kotlinx.coroutines.flow.Flow]
 * from one goes quiet after the other writes, with no error anywhere.
 * [database] is therefore a plain `val`, constructed once here and never
 * again -- see [CortexDatabase.build] for why nothing else may open the
 * file directly.
 *
 * The network half -- [sessionStore], [authBackend], [api], [auth], [sync]
 * -- is `by lazy`. When [config] is unconfigured, `RootScreen` renders
 * `NotConfiguredScreen` straight from [config] and never touches any of
 * these; if they were built eagerly, constructing a Supabase client against
 * a blank host would throw inside `Application.onCreate`, before anything
 * could render the explanation. [sessionStore] in particular reaches into
 * the Android Keystore (see `SessionStore.kt`), which a Robolectric test --
 * or an unconfigured build -- must never be asked to do.
 */
class AppGraph(context: Context, val config: AppConfig) {
    private val http = OkHttpClient()

    // Plain SharedPreferences, not lazy: unlike sessionStore below, this
    // never reaches into the Keystore and is never affected by whether the
    // build is configured, so it is built eagerly like database is -- see
    // ThemePreference's own class doc for why it is never encrypted or
    // synced.
    val themePreference = ThemePreference(context.applicationContext)

    private val sessionStore: SessionStore by lazy { EncryptedSessionStore(context.applicationContext) }

    // The backend owns the token. Built first, its reader handed to the API,
    // so the apparent cycle (api needs a token, auth needs the api)
    // resolves without a lateinit or a holder object.
    val authBackend: AuthBackend by lazy { SupabaseAuthBackend(config, sessionStore, http) }
    val api: SynapseApi by lazy { SynapseApi(config.apiBaseUrl, http, authBackend::accessToken) }
    val auth: AuthModel by lazy { AuthModel(config, api, authBackend) }

    // The only correct way to open the file: it pins the name and forces
    // applicationContext, so the database cannot capture an Activity.
    val database: CortexDatabase = CortexDatabase.build(context)
    val store = LocalStore(database)
    val sync: SyncEngine by lazy { SyncEngine(api, store) }
}
