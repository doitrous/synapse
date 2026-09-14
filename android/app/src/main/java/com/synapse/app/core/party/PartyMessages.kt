package com.synapse.app.core.party

import androidx.annotation.StringRes
import com.synapse.app.R

/**
 * Turns a server-reported `reason` (from a `{ ok: false, reason }` refusal —
 * see the party/session mutation DTOs in `core/api/PartyApi.kt`) into a
 * string resource a student can act on. Mirrors [com.synapse.app.core.social.socialReasonMessage],
 * extended to the reasons `server/src/parties.js` actually reports. Resolve
 * the returned id with `stringResource` at the composable — the `reason`
 * codes themselves are the wire contract and are never translated.
 */
@StringRes
fun partyReasonMessage(reason: String?): Int = when (reason) {
    null -> R.string.party_reason_default
    "no_cohort" -> R.string.party_reason_no_cohort
    "code_collision" -> R.string.party_reason_code_collision
    "invalid_visibility" -> R.string.party_reason_invalid_visibility
    "not_found" -> R.string.party_reason_not_found
    "not_host" -> R.string.party_reason_not_host
    "host_cannot_leave" -> R.string.party_reason_host_cannot_leave
    "no_items" -> R.string.party_reason_no_items
    "invalid_starts_at" -> R.string.party_reason_invalid_starts_at
    "not_a_member" -> R.string.party_reason_not_a_member
    "not_started" -> R.string.party_reason_not_started
    "closed" -> R.string.party_reason_closed
    "question_gone" -> R.string.party_reason_question_gone
    "not_in_session" -> R.string.party_reason_not_in_session
    "archived" -> R.string.party_reason_archived
    else -> R.string.party_reason_default
}

/** As [partyReasonMessage], for the reasons `server/src/partyGames.js` reports. */
@StringRes
fun partyGameReasonMessage(reason: String?): Int = when (reason) {
    null -> R.string.party_reason_default
    "invalid_kind" -> R.string.party_game_reason_invalid_kind
    "client_content_refused" -> R.string.party_game_reason_client_content_refused
    "no_content" -> R.string.party_game_reason_no_content
    "not_host" -> R.string.party_game_reason_not_host
    "not_a_member" -> R.string.party_game_reason_not_a_member
    "not_found" -> R.string.party_reason_not_found
    "archived" -> R.string.party_reason_archived
    "invalid_state" -> R.string.party_game_reason_invalid_state
    "wrong_round" -> R.string.party_game_reason_wrong_round
    "duplicate_answer" -> R.string.party_game_reason_duplicate_answer
    "invalid_answer" -> R.string.party_game_reason_invalid_answer
    "invalid_action" -> R.string.party_game_reason_invalid_action
    else -> R.string.party_reason_default
}
