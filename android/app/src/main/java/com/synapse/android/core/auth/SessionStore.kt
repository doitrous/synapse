package com.synapse.android.core.auth

import android.content.Context
import androidx.security.crypto.EncryptedSharedPreferences
import androidx.security.crypto.MasterKey

/**
 * Where the one, encrypted copy of the student's session lives.
 *
 * The stored string is opaque to the store: it holds a whole serialized
 * Supabase session (access token, refresh token, expiry, user), not a bare
 * access token, because [SupabaseAuthBackend] -- via the [io.github.jan.supabase.auth.SessionManager]
 * it wires up -- is the only thing that knows how to read or refresh it.
 */
interface SessionStore {
    fun read(): String?
    fun write(token: String?)
}

/**
 * Backs [SessionStore] with [EncryptedSharedPreferences] rather than plain
 * `SharedPreferences`.
 *
 * `android:allowBackup="false"` is set in the manifest precisely because this
 * cache holds student work and must not leave the device -- a session sitting
 * in cleartext beside it would defeat that. This class is kept deliberately
 * thin (two methods, no branching of its own worth exercising) because
 * `EncryptedSharedPreferences` needs the real Android Keystore, which
 * Robolectric does not provide; a test that stubbed the keystore would prove
 * nothing about the thing that actually matters here. See task-9-report.md
 * for the fuller reasoning. [AuthModel] is tested instead against a fake
 * [SessionStore].
 */
class EncryptedSessionStore(context: Context) : SessionStore {

    private val prefs = run {
        val masterKey = MasterKey.Builder(context)
            .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
            .build()
        EncryptedSharedPreferences.create(
            context,
            "synapse_session",
            masterKey,
            EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
            EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM,
        )
    }

    override fun read(): String? = prefs.getString(KEY, null)

    override fun write(token: String?) {
        prefs.edit().apply {
            if (token == null) remove(KEY) else putString(KEY, token)
        }.apply()
    }

    private companion object {
        const val KEY = "session"
    }
}
