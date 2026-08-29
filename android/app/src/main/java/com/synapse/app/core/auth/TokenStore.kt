package com.synapse.app.core.auth

import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import kotlinx.coroutines.flow.first

/** The persisted Supabase GoTrue access/refresh token pair for one signed-in session. */
data class Tokens(val accessToken: String, val refreshToken: String)

/**
 * Seam for persisting [Tokens] across process death, so
 * [SupabaseAuthBackend.restore] can silently refresh a prior session on cold
 * start. [DataStoreTokenStore] is the production implementation; tests use an
 * in-memory fake.
 */
interface TokenStore {
    suspend fun save(tokens: Tokens)
    suspend fun load(): Tokens?
    suspend fun clear()
}

/** [TokenStore] backed by Jetpack DataStore Preferences. */
class DataStoreTokenStore(private val dataStore: DataStore<Preferences>) : TokenStore {
    private object Keys {
        val ACCESS_TOKEN = stringPreferencesKey("access_token")
        val REFRESH_TOKEN = stringPreferencesKey("refresh_token")
    }

    override suspend fun save(tokens: Tokens) {
        dataStore.edit { prefs ->
            prefs[Keys.ACCESS_TOKEN] = tokens.accessToken
            prefs[Keys.REFRESH_TOKEN] = tokens.refreshToken
        }
    }

    override suspend fun load(): Tokens? {
        val prefs = dataStore.data.first()
        val access = prefs[Keys.ACCESS_TOKEN]
        val refresh = prefs[Keys.REFRESH_TOKEN]
        return if (access != null && refresh != null) Tokens(access, refresh) else null
    }

    override suspend fun clear() {
        dataStore.edit { it.clear() }
    }
}
