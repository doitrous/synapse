package com.synapse.app.core.social

/**
 * Turns a server-reported `reason` (from a `{ ok: false, reason }` refusal —
 * see [com.synapse.app.core.api.RoomMutation] and friends) into words a
 * student can act on. Mirrors iOS `RoomMutation.message`, extended to the
 * challenge and friend reasons the same three source files
 * (`studyRooms.js`/`challenges.js`/`friends.js`) report.
 *
 * Pure and side-effect free so it is trivially unit-testable on its own,
 * without a repository or a fake API in the way.
 */
fun socialReasonMessage(reason: String?): String = when (reason) {
    null -> "That did not work."
    "no_questions" -> "Pick at least one question first."
    "code_collision" -> "Could not generate a room code. Try again."
    "not_found" -> "That could not be found."
    "closed" -> "That has already closed."
    "not_a_member" -> "You are not in that room."
    "not_host" -> "Only the host can start it."
    "not_started" -> "The host has not started it yet."
    "not_in_room" -> "That question is not part of this test."
    "not_in_challenge" -> "That question is not part of this challenge."
    "already_finished" -> "You have already finished this one."
    "question_gone" -> "That question is no longer published."
    "invalid_opponent" -> "Pick someone to challenge."
    "not_friends" -> "You can only challenge a friend."
    "not_pending" -> "That request is no longer pending."
    "not_running" -> "That is not in progress."
    "invalid_target" -> "That person could not be found."
    "used" -> "That invite has already been used."
    "expired" -> "That invite has expired."
    "self" -> "You cannot use your own invite."
    else -> "That did not work."
}
