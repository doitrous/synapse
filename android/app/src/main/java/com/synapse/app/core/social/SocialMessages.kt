package com.synapse.app.core.social

import androidx.annotation.StringRes
import com.synapse.app.R

/**
 * Turns a server-reported `reason` (from a `{ ok: false, reason }` refusal —
 * see [com.synapse.app.core.api.RoomMutation] and friends) into a string
 * resource a student can act on. Mirrors iOS `RoomMutation.message`, extended
 * to the challenge and friend reasons the same three source files
 * (`studyRooms.js`/`challenges.js`/`friends.js`) report.
 *
 * Pure and side-effect free so it is trivially unit-testable on its own,
 * without a repository or a fake API in the way. Returns a `@StringRes` id
 * rather than resolved text — the reason codes themselves are never
 * translated, only the human-facing message this maps them to.
 */
@StringRes
fun socialReasonMessage(reason: String?): Int = when (reason) {
    null -> R.string.social_reason_generic
    "no_questions" -> R.string.social_reason_no_questions
    "code_collision" -> R.string.social_reason_code_collision
    "not_found" -> R.string.social_reason_not_found
    "closed" -> R.string.social_reason_closed
    "not_a_member" -> R.string.social_reason_not_a_member
    "not_host" -> R.string.social_reason_not_host
    "not_started" -> R.string.social_reason_not_started
    "not_in_room" -> R.string.social_reason_not_in_room
    "not_in_challenge" -> R.string.social_reason_not_in_challenge
    "already_finished" -> R.string.social_reason_already_finished
    "question_gone" -> R.string.social_reason_question_gone
    "invalid_opponent" -> R.string.social_reason_invalid_opponent
    "not_friends" -> R.string.social_reason_not_friends
    "not_pending" -> R.string.social_reason_not_pending
    "not_running" -> R.string.social_reason_not_running
    "invalid_target" -> R.string.social_reason_invalid_target
    "used" -> R.string.social_reason_used
    "expired" -> R.string.social_reason_expired
    "self" -> R.string.social_reason_self
    else -> R.string.social_reason_generic
}
