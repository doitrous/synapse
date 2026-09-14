package com.synapse.app.core.auth

import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.map

/**
 * Where Adaptive, Calendar, and other surfaces read [AccountIdentity]
 * without hitting the network: a plain on-device cache of the roster row
 * `AccountRepository` last fetched, backed by DataStore Preferences —
 * mirrors [com.synapse.app.design.ThemePreference]'s shape. `AccountRepository`
 * is this store's only writer.
 *
 * One-line consumer, once injected:
 * ```
 * val identity = accountIdentityStore.current()
 * if (identity.isKnown) BlueprintScope(identity.universityId, identity.year) else BlueprintScope("", "")
 * ```
 * or collect [identity] as a [Flow] to react to a later enrolment without
 * restarting whatever's reading it.
 */
class AccountIdentityStore(private val dataStore: DataStore<Preferences>) {
    private object Keys {
        val UNIVERSITY_ID = stringPreferencesKey("university_id")
        val YEAR = stringPreferencesKey("year")
        val YEAR_ID = stringPreferencesKey("year_id")
        val GROUP = stringPreferencesKey("group")
    }

    val identity: Flow<AccountIdentity> = dataStore.data.map { prefs ->
        AccountIdentity(
            universityId = prefs[Keys.UNIVERSITY_ID].orEmpty(),
            year = prefs[Keys.YEAR].orEmpty(),
            yearId = prefs[Keys.YEAR_ID].orEmpty(),
            group = prefs[Keys.GROUP].orEmpty(),
        )
    }

    /** [identity]'s current value, for the common case of a one-shot read (e.g. building a network request scope). */
    suspend fun current(): AccountIdentity = identity.first()

    suspend fun save(identity: AccountIdentity) {
        dataStore.edit { prefs ->
            prefs[Keys.UNIVERSITY_ID] = identity.universityId
            prefs[Keys.YEAR] = identity.year
            prefs[Keys.YEAR_ID] = identity.yearId
            prefs[Keys.GROUP] = identity.group
        }
    }
}
