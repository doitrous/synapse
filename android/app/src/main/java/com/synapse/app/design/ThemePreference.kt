package com.synapse.app.design

import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

/**
 * Persists the student's [ThemeChoice] across process death via Jetpack
 * DataStore Preferences, so the app opens in the theme they last picked.
 * Stored as the enum's [ThemeChoice.name] string; an unset or unrecognized
 * value defaults to [ThemeChoice.Light].
 */
class ThemePreference(private val dataStore: DataStore<Preferences>) {
    private object Keys {
        val THEME_CHOICE = stringPreferencesKey("theme_choice")
    }

    val choice: Flow<ThemeChoice> = dataStore.data.map { prefs ->
        prefs[Keys.THEME_CHOICE]
            ?.let { stored -> runCatching { ThemeChoice.valueOf(stored) }.getOrNull() }
            ?: ThemeChoice.Light
    }

    suspend fun set(choice: ThemeChoice) {
        dataStore.edit { prefs -> prefs[Keys.THEME_CHOICE] = choice.name }
    }
}
