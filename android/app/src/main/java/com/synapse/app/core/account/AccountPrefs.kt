package com.synapse.app.core.account

import kotlinx.serialization.Serializable

/**
 * What a student has chosen about how the app treats them. A direct port of
 * iOS `AccountPrefs`/web's equivalent record (`src/pages/student/Account.tsx`)
 * — same three fields, same key, so a choice made on one client is read by
 * the others.
 *
 * Name and email are not here — they are the sign-in identity, not a
 * preference. University/year/group are not here either — those are
 * [com.synapse.app.core.auth.AccountIdentity], server-owned via
 * `PUT /api/me/enrolment`, not a student-only document.
 *
 * The timezone is recorded rather than chosen: reminders are sent from the
 * server, which cannot know what a phone's clock is set to unless told (see
 * `AccountRepository.syncTimezone`).
 */
@Serializable
data class AccountPrefs(
    val timezone: String,
    val reviewReminders: Boolean = true,
    val calendarReminders: Boolean = true,
) {
    /**
     * Whether a notification campaign of this [kind] is allowed through.
     * Anything neither switch names is still delivered — a student who muted
     * review nudges has not asked to stop hearing that their exam moved.
     */
    fun allows(kind: String): Boolean = when (kind.lowercase()) {
        "review", "reviews" -> reviewReminders
        "calendar", "timetable", "schedule" -> calendarReminders
        else -> true
    }

    companion object {
        /** The student's own, so dotted — matches iOS `AccountPrefs.key`/web's storage key exactly. */
        const val KEY = "synapse.account.prefs.v1"

        fun default(timezone: String): AccountPrefs = AccountPrefs(timezone = timezone)
    }
}
