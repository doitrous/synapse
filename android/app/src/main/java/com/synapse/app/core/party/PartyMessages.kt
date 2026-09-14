package com.synapse.app.core.party

/**
 * Turns a server-reported `reason` (from a `{ ok: false, reason }` refusal —
 * see the party/session mutation DTOs in `core/api/PartyApi.kt`) into words a
 * student can act on. Mirrors [com.synapse.app.core.social.socialReasonMessage],
 * extended to the reasons `server/src/parties.js` actually reports.
 */
fun partyReasonMessage(reason: String?): String = when (reason) {
    null -> "That did not work."
    "no_cohort" -> "Your university and year need to be set before you can use parties."
    "code_collision" -> "Could not generate a party code. Try again."
    "invalid_visibility" -> "That is not a valid visibility setting."
    "not_found" -> "That could not be found."
    "not_host" -> "Only the host can do that."
    "host_cannot_leave" -> "The host cannot leave their own party."
    "no_items" -> "Pick something to study first."
    "invalid_starts_at" -> "That date and time is not valid."
    "not_a_member" -> "You are not in that party."
    "not_started" -> "This session has not started yet."
    "closed" -> "That session has already closed."
    "question_gone" -> "That question is no longer published."
    "not_in_session" -> "That item is not part of this session."
    "archived" -> "That party has been archived."
    else -> "That did not work."
}

/** As [partyReasonMessage], for the reasons `server/src/partyGames.js` reports. */
fun partyGameReasonMessage(reason: String?): String = when (reason) {
    null -> "That did not work."
    "invalid_kind" -> "That party game is not available."
    "client_content_refused" -> "Party games must be created from server-validated content."
    "no_content" -> "There is not enough published or authored material for that game yet."
    "not_host" -> "Only the host of this party can do that."
    "not_a_member" -> "You are not a member of this party."
    "not_found" -> "That could not be found."
    "archived" -> "That party has been archived."
    "invalid_state" -> "That is not possible right now."
    "wrong_round" -> "That round is no longer active."
    "duplicate_answer" -> "You have already answered this round."
    "invalid_answer" -> "That answer could not be submitted."
    "invalid_action" -> "That action is not recognized."
    else -> "That did not work."
}
