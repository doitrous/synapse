package com.synapse.app.core.auth

import kotlinx.coroutines.flow.StateFlow

/** A signed-in student's session as seen by the client. */
data class Session(val userId: String, val accessToken: String, val emailVerified: Boolean)

/**
 * Seam between [AuthModel] and the real identity provider. The Supabase-backed
 * implementation lives in `SupabaseAuthBackend` (wired up separately); this
 * interface is what [AuthModel] and its tests depend on.
 */
interface AuthBackend {
    /** The current session, or null when signed out. Updated by every method below. */
    val session: StateFlow<Session?>

    /** Re-hydrate [session] from whatever persisted credential the backend holds (e.g. a saved token). */
    suspend fun restore()

    suspend fun signIn(email: String, password: String)

    suspend fun signUp(email: String, password: String)

    suspend fun signOut()

    suspend fun sendReset(email: String)

    /** The bearer token for the current session, if any. Used by the API layer's auth header. */
    suspend fun accessToken(): String?
}
