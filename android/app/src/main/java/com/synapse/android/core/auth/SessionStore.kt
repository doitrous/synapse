package com.synapse.android.core.auth

import android.content.Context
import androidx.security.crypto.EncryptedSharedPreferences
import androidx.security.crypto.MasterKey
import com.synapse.android.core.api.SessionUser
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.booleanOrNull
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.contentOrNull
import kotlinx.serialization.json.jsonPrimitive

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
 * The last identity the server confirmed for the session held by [SessionStore].
 *
 * This exists so that a launch with no network does not throw the student
 * back to the sign-in form. Connect Cortex on Android is offline-first --
 * every screen reads the local cache, and the cache holds work the student
 * has already done -- so answering "who is this?" with "nobody, sign in
 * again" the moment the server is unreachable locks them out of their own
 * device. It is [AuthModel]'s fallback, never its first answer: the server
 * is still asked on every restore, and this is read only when that ask
 * failed for a reason that is plainly the network's fault.
 *
 * Device-local, and deliberately not a synced document: no other client
 * reads it, so its shape is nobody else's contract. Rejected sessions clear
 * it (see [AuthModel.confirmWithServer]), so it can only ever outlive the
 * server's confirmation, never contradict it.
 */
interface SessionUserCache {
    fun readUser(): SessionUser?

    /** Stores [user], or forgets what was stored when it is null. */
    fun writeUser(user: SessionUser?)

    companion object {
        /**
         * A cache that remembers nothing, which is exactly the behaviour the
         * app had before one existed. It is [AuthModel]'s default so that a
         * test with no interest in offline restore does not have to supply
         * one; the app itself always wires [EncryptedSessionStore].
         */
        val Forgetful: SessionUserCache = object : SessionUserCache {
            override fun readUser(): SessionUser? = null
            override fun writeUser(user: SessionUser?) = Unit
        }
    }
}

/**
 * How a [SessionUser] is written to this device and read back.
 *
 * Hand-rolled rather than `@Serializable` because the shape is a private
 * arrangement between this app and this device's own storage, not the
 * cross-client field contract that `SessionUser`'s name suggests. [decode]
 * returns null for anything it cannot make sense of -- a cache written by an
 * older build, or a half-written string -- because the whole point of this
 * cache is to keep the app running when something is not right, and throwing
 * on the restore path would defeat that more thoroughly than the missing
 * network ever could.
 */
internal object CachedSessionUser {

    private val json = Json { ignoreUnknownKeys = true }

    fun encode(user: SessionUser): String = json.encodeToString(
        JsonObject.serializer(),
        buildJsonObject {
            put("id", JsonPrimitive(user.id))
            put("email", JsonPrimitive(user.email))
            put("role", JsonPrimitive(user.role))
            put("aal", JsonPrimitive(user.aal))
            put("mfaRequired", JsonPrimitive(user.mfaRequired))
        },
    )

    fun decode(raw: String): SessionUser? = try {
        val fields = json.decodeFromString(JsonObject.serializer(), raw)
        val id = fields["id"]?.jsonPrimitive?.contentOrNull
        if (id.isNullOrBlank()) {
            null
        } else {
            SessionUser(
                id = id,
                email = fields["email"]?.jsonPrimitive?.contentOrNull,
                role = fields["role"]?.jsonPrimitive?.contentOrNull,
                aal = fields["aal"]?.jsonPrimitive?.contentOrNull,
                mfaRequired = fields["mfaRequired"]?.jsonPrimitive?.booleanOrNull ?: false,
            )
        }
    } catch (e: Exception) {
        null
    }
}

/**
 * Backs [SessionStore] with [EncryptedSharedPreferences] rather than plain
 * `SharedPreferences`.
 *
 * `android:allowBackup="false"` is set in the manifest precisely because this
 * cache holds student work and must not leave the device -- a session sitting
 * in cleartext beside it would defeat that. This class is kept deliberately
 * thin (four accessors over two keys, no branching of its own worth
 * exercising -- the one piece with real behaviour, the cached-user format,
 * lives in [CachedSessionUser] where a test can reach it) because
 * `EncryptedSharedPreferences` needs the real Android Keystore, which
 * Robolectric does not provide; a test that stubbed the keystore would prove
 * nothing about the thing that actually matters here. See task-9-report.md
 * for the fuller reasoning. [AuthModel] is tested instead against a fake
 * [SessionStore].
 */
class EncryptedSessionStore(context: Context) : SessionStore, SessionUserCache {

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
        put(KEY, token)
    }

    override fun readUser(): SessionUser? = prefs.getString(USER_KEY, null)?.let(CachedSessionUser::decode)

    override fun writeUser(user: SessionUser?) {
        put(USER_KEY, user?.let(CachedSessionUser::encode))
    }

    private fun put(key: String, value: String?) {
        prefs.edit().apply {
            if (value == null) remove(key) else putString(key, value)
        }.apply()
    }

    private companion object {
        const val KEY = "session"

        /** Separate from [KEY]: the session is supabase-kt's to write, this is ours. */
        const val USER_KEY = "session_user"
    }
}
