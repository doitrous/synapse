package com.synapse.app.core.auth

/**
 * The signed-in student's own university/year — what Adaptive, Calendar, and
 * the University surface each need to scope curriculum content by, and the
 * exact gap their own doc comments call out (`AdaptiveRepository`'s
 * `BlueprintScope("", "")` default, `CalendarRepository.curriculumSessions`'s
 * "Android has no confirmed source yet"). Account is that source: every
 * `GET /api/me` (`AccountRepository.loadMe`) and every successful
 * `PUT /api/me/enrolment` (`AccountRepository.saveEnrolment`) caches the
 * roster row's `profile.universityId`/`.year`/`.yearId`/`.group` here via
 * [AccountIdentityStore].
 *
 * [yearId] is the server-derived scoping id (e.g. `KAU_Y3`) taken straight
 * off the roster row. Android does not re-derive it client-side the way
 * iOS's `StudentAudience.yearId(universityShort:)` does for its
 * *self-declared* fallback, because there is no such fallback here:
 * `PUT /api/me/enrolment` is now the single writer of a student's cohort
 * (see `server/src/accounts.js`'s `saveOwnEnrolment` doc comment) — the
 * older browser-local `synapse.account.audience.v1` document it superseded
 * is legacy, pre-migration state that this client has no reason to
 * replicate.
 */
data class AccountIdentity(
    val universityId: String = "",
    val year: String = "",
    val yearId: String = "",
    val group: String = "",
) {
    /** True once there is enough to scope curriculum content by. */
    val isKnown: Boolean get() = universityId.isNotEmpty() && year.isNotEmpty()

    companion object {
        val Unknown = AccountIdentity()
    }
}
