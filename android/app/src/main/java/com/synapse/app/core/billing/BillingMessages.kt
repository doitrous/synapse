package com.synapse.app.core.billing

import androidx.annotation.StringRes
import com.synapse.app.R

/**
 * Turns a voucher redemption's server-reported `reason` (`{ ok: false, reason }`
 * from `POST /api/vouchers/redeem` — see `server/src/vouchers.js#REFUSALS`)
 * into a string resource a student can act on. Mirrors
 * [com.synapse.app.core.social.socialReasonMessage]/[com.synapse.app.core.party.partyReasonMessage]:
 * the `reason` code is the wire contract and is never translated, only the
 * message it maps to — the server's own `message` field is English-only and
 * is deliberately not shown to the student.
 */
@StringRes
fun billingReasonMessage(reason: String?): Int = when (reason) {
    "not_found" -> R.string.billing_reason_not_found
    "inactive" -> R.string.billing_reason_inactive
    "not_started" -> R.string.billing_reason_not_started
    "expired" -> R.string.billing_reason_expired
    "limit_reached" -> R.string.billing_reason_limit_reached
    "not_your_university" -> R.string.billing_reason_not_your_university
    "not_your_year" -> R.string.billing_reason_not_your_year
    "not_your_group" -> R.string.billing_reason_not_your_group
    "already_redeemed" -> R.string.billing_reason_already_redeemed
    "no_profile" -> R.string.billing_reason_no_profile
    else -> R.string.billing_reason_generic
}
