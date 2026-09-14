package com.synapse.app.feature.account

import com.synapse.app.core.account.AccountPrefs
import com.synapse.app.core.api.AccountApi
import com.synapse.app.core.api.EnrolmentRequest
import com.synapse.app.core.api.MeResponse
import com.synapse.app.core.auth.AccountIdentity
import com.synapse.app.core.auth.AccountIdentityStore
import com.synapse.app.core.auth.AuthModel
import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.sync.SyncEngine
import kotlinx.coroutines.CancellationException
import kotlinx.serialization.builtins.serializer
import kotlinx.serialization.json.Json
import java.time.Instant
import javax.inject.Inject

/** What asking the server to export this account's data came back with. */
sealed interface ExportOutcome {
    /** The export exists and was fetched; [sizeBytes] is `-1` if the server didn't send a length. */
    data class Ready(val sizeBytes: Long) : ExportOutcome
    data object Unavailable : ExportOutcome
}

/**
 * What deleting the account came back with. The server does the whole
 * erasure in one transaction, so a [Failed] outcome means nothing was
 * removed — "try again" is honest, not hopeful.
 */
sealed interface DeletionOutcome {
    data object Deleted : DeletionOutcome
    data object Failed : DeletionOutcome
}

/**
 * The Account data layer: identity/enrolment ([loadMe], [saveEnrolment]),
 * this student's own prefs and language choice (small synced user-state
 * documents), the classmate-directory toggle, data export, and account
 * deletion.
 *
 * Also the sole writer of [AccountIdentityStore] — every [loadMe]/
 * [saveEnrolment] call that returns a roster row refreshes the cached
 * [AccountIdentity] the other surfaces read (see that store's doc comment).
 */
class AccountRepository @Inject constructor(
    private val api: AccountApi,
    private val localStore: LocalStore,
    private val syncEngine: SyncEngine,
    private val identityStore: AccountIdentityStore,
    private val authModel: AuthModel,
    private val json: Json,
) {

    suspend fun loadMe(): MeResponse {
        val me = api.getMe()
        cacheIdentity(me)
        return me
    }

    /**
     * `PUT /api/me/enrolment`. Only [group] is actually editable once a
     * university/year is on record — the server locks the other two and
     * answers `enrollment_locked` (a 409, surfaced here as
     * [com.synapse.app.core.api.ApiException]) if they're sent changed; this
     * repository does not special-case that beyond letting it propagate.
     * Re-fetches `/api/me` afterward (see [EnrolmentRequest]'s sibling
     * [com.synapse.app.core.api.EnrolmentResult] doc comment for why) so the
     * returned [MeResponse] and [AccountIdentityStore] both reflect the
     * server's own row.
     */
    suspend fun saveEnrolment(universityId: String, year: String, group: String?): MeResponse {
        api.putEnrolment(EnrolmentRequest(universityId = universityId, year = year, group = group))
        return loadMe()
    }

    private suspend fun cacheIdentity(me: MeResponse) {
        val profile = me.profile
        val universityId = profile?.universityId.orEmpty()
        val year = profile?.year.orEmpty()
        if (universityId.isEmpty() || year.isEmpty()) return
        identityStore.save(
            AccountIdentity(
                universityId = universityId,
                year = year,
                yearId = profile?.yearId.orEmpty(),
                group = profile?.group.orEmpty(),
            )
        )
    }

    // --- Prefs (synced) ------------------------------------------------------

    suspend fun prefs(defaultTimezone: String): AccountPrefs {
        val stored = localStore.getUserState(AccountPrefs.KEY) ?: return AccountPrefs.default(defaultTimezone)
        return runCatching { json.decodeFromString(AccountPrefs.serializer(), stored) }
            .getOrDefault(AccountPrefs.default(defaultTimezone))
    }

    suspend fun setReviewReminders(value: Boolean, defaultTimezone: String, now: Instant) {
        writePrefs(prefs(defaultTimezone).copy(reviewReminders = value), now)
    }

    suspend fun setCalendarReminders(value: Boolean, defaultTimezone: String, now: Instant) {
        writePrefs(prefs(defaultTimezone).copy(calendarReminders = value), now)
    }

    /** Record the device's timezone when it differs from what's stored — mirrors iOS `AccountPrefsStore.syncTimezone`. */
    suspend fun syncTimezone(currentTimezone: String, now: Instant) {
        val current = prefs(currentTimezone)
        if (current.timezone != currentTimezone) writePrefs(current.copy(timezone = currentTimezone), now)
    }

    private suspend fun writePrefs(prefs: AccountPrefs, now: Instant) {
        syncEngine.write(AccountPrefs.KEY, json.encodeToString(AccountPrefs.serializer(), prefs), now)
    }

    // --- Language (synced; drives this client's own locale too — see LANGUAGE_KEY) -------

    suspend fun language(): String {
        val stored = localStore.getUserState(LANGUAGE_KEY) ?: return DEFAULT_LANGUAGE
        return runCatching { json.decodeFromString(String.serializer(), stored) }.getOrDefault(DEFAULT_LANGUAGE)
    }

    suspend fun setLanguage(language: String, now: Instant) {
        syncEngine.write(LANGUAGE_KEY, json.encodeToString(String.serializer(), language), now)
    }

    // --- Classmate directory ---------------------------------------------------

    suspend fun discoverable(): Boolean = try {
        api.getDiscoverable().discoverable
    } catch (e: CancellationException) {
        throw e
    } catch (e: Exception) {
        false
    }

    /** Returns the value the server actually stored, or null if the write failed — the caller reverts its toggle on null, matching web's `Account.tsx`. */
    suspend fun setDiscoverable(value: Boolean): Boolean? = try {
        api.setDiscoverable(value).discoverable
    } catch (e: CancellationException) {
        throw e
    } catch (e: Exception) {
        null
    }

    // --- Export ----------------------------------------------------------------

    suspend fun requestExport(): ExportOutcome = try {
        val body = api.exportRaw()
        val size = body.contentLength()
        body.close()
        ExportOutcome.Ready(size)
    } catch (e: CancellationException) {
        throw e
    } catch (e: Exception) {
        ExportOutcome.Unavailable
    }

    // --- Session ----------------------------------------------------------------

    /**
     * Plain sign-out, reusing [AuthModel] — Account is the only student-facing
     * surface with a "Sign out" action, since the shell (`feature/shell`, out
     * of this task's scope) doesn't wire one anywhere else.
     */
    suspend fun signOut() {
        authModel.signOut()
    }

    // --- Deletion ----------------------------------------------------------------

    /** Deletes the account server-side, then signs this device out (reuses [AuthModel] — Google Play requires both). */
    suspend fun deleteAccount(): DeletionOutcome = try {
        api.deleteAccount()
        authModel.signOut()
        DeletionOutcome.Deleted
    } catch (e: CancellationException) {
        throw e
    } catch (e: Exception) {
        DeletionOutcome.Failed
    }

    companion object {
        private const val DEFAULT_LANGUAGE = "en"

        /**
         * The student's language choice. Matches web/iOS's `synapse-lang`
         * exactly (no `.v1`, no leading `synapse.`) — `StateOwnership`
         * already carries a `^synapse-lang$` pattern for it.
         *
         * Cross-client: also drives this app's own locale (see
         * [com.synapse.app.core.i18n.LocaleController], applied from
         * [com.synapse.app.RootViewModel] at startup and from
         * [AccountViewModel.setLanguage] on change), not just the other
         * clients'.
         */
        const val LANGUAGE_KEY = "synapse-lang"
    }
}
