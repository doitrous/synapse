package com.synapse.app.core.billing

import com.synapse.app.core.api.Voucher
import java.time.Instant
import java.time.temporal.ChronoUnit

/**
 * 1:1 port of the pure logic in web's `src/data/vouchers.ts`. Redemption
 * itself is decided by the server (`server/src/vouchers.js`) against the
 * roster row and the redemption table — this app is always authenticated, so
 * it always takes that live path and never needs a client-side redemption
 * decision (same reasoning `core/university/UniversityModel.kt` gives for
 * skipping web's offline `DemoUniversity` builder). [voucherEligibility] is
 * ported anyway, with its full test vectors, because it is real product logic
 * a future admin-facing voucher screen (testing a chosen cohort against
 * rules, the way the web admin console does) would need — not because
 * anything on this screen calls it today.
 */

/** The trial length the platform offers, and the default a new trial voucher takes. */
const val DEFAULT_TRIAL_DAYS: Int = 3

fun isTrialVoucher(voucher: Voucher): Boolean = voucher.grant == "Full-access trial"

/** Days of full access this voucher grants, or 0 when it is a discount. */
fun voucherTrialDays(voucher: Voucher): Int {
    if (!isTrialVoucher(voucher)) return 0
    val days = voucher.trialDays ?: DEFAULT_TRIAL_DAYS
    return if (days > 0) days else DEFAULT_TRIAL_DAYS
}

/** When a trial redeemed at [from] runs out, or null for a discount voucher. */
fun trialEndsAt(voucher: Voucher, from: Instant): Instant? {
    val days = voucherTrialDays(voucher)
    if (days == 0) return null
    return from.plus(days.toLong(), ChronoUnit.DAYS)
}

/**
 * Money off [price]. A trial takes nothing off: it opens the whole platform
 * for a few days and then ends. Returning its `amount` here would show a
 * student a discount they were never given.
 */
fun voucherDiscount(voucher: Voucher, price: Double): Double {
    if (isTrialVoucher(voucher)) return 0.0
    return if (voucher.discountType == "Percentage") {
        minOf(price, price * (voucher.amount / 100))
    } else {
        minOf(price, voucher.amount)
    }
}

/** The three facts a targeted rule is written against. */
data class AudienceProfile(val universityId: String, val year: String, val group: String)

/** The slice of the academic-universities catalogue [voucherEligibility] checks a targeted voucher against — mirrors web's `UniYear`. */
data class VoucherCatalogueYear(val id: String, val year: String, val active: Boolean? = null)

/** Mirrors web's `University`, trimmed to the fields eligibility actually reads. */
data class VoucherCatalogueUniversity(val id: String, val years: List<VoucherCatalogueYear>, val active: Boolean? = null)

/** Whether students may be offered this year. Absent means live, matching web's `isYearLive`. */
fun isVoucherYearLive(universityActive: Boolean?, yearActive: Boolean?): Boolean =
    universityActive != false && yearActive != false

/**
 * Why this voucher is not for this student, or null when it is.
 *
 * The audience is passed in rather than looked up, for the same reason as
 * web's `voucherEligibility`: it is meant to be checkable against a chosen
 * cohort, not only against the signed-in viewer.
 *
 * A restriction the student cannot satisfy fails closed. If a voucher names
 * universities and we do not know theirs, the answer is no: guessing yes
 * would hand a targeted discount to whoever asked.
 */
fun voucherEligibility(
    voucher: Voucher,
    profile: AudienceProfile,
    catalogue: List<VoucherCatalogueUniversity>? = null,
    now: Instant = Instant.now(),
): String? {
    val nowMillis = now.toEpochMilli()
    if (!voucher.active) return "This voucher is not active."
    if (runCatching { Instant.parse(voucher.startsAt) }.getOrNull()?.toEpochMilli()?.let { it > nowMillis } == true) {
        return "This voucher is not available yet."
    }
    if (runCatching { Instant.parse(voucher.expiresAt) }.getOrNull()?.toEpochMilli()?.let { it < nowMillis } == true) {
        return "This voucher has expired."
    }
    if (voucher.maxRedemptions > 0 && voucher.redemptionCount >= voucher.maxRedemptions) {
        return "This voucher has reached its redemption limit."
    }
    if (voucher.universityIds.isNotEmpty() && profile.universityId !in voucher.universityIds) {
        return "This voucher is not available for your university."
    }
    if (voucher.years.isNotEmpty() && profile.year !in voucher.years) {
        return "This voucher is not available for your year."
    }
    if (voucher.groups.isNotEmpty() && profile.group !in voucher.groups) {
        return "This voucher is not available for your group."
    }

    // A voucher may only be redeemed into a place that is actually open. The
    // catalogue is optional because a caller may test a chosen cohort against
    // rules rather than against a live enrolment; when it is supplied, a
    // university or year that is switched off refuses the code — the same
    // fail-closed rule the targeting checks above follow.
    if (catalogue != null) {
        val university = catalogue.find { it.id == profile.universityId }
            ?: return "This voucher is not available for your university."
        val year = university.years.find { it.year == profile.year }
            ?: return "This voucher is not available for your year."
        if (university.active == false) return "This voucher is not available for your university right now."
        if (!isVoucherYearLive(university.active, year.active)) return "This voucher is not available for your year right now."
    }

    return null
}
