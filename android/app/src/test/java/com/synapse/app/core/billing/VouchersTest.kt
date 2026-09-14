package com.synapse.app.core.billing

import com.synapse.app.core.api.Voucher
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test
import java.time.Instant

/** Ported test vectors from web's `src/data/vouchers.test.ts` — see `Vouchers.kt`'s doc comment for what is and isn't ported. */
class VouchersTest {

    private fun voucher(
        grant: String? = null,
        trialDays: Int? = null,
        amount: Double = 20.0,
        active: Boolean = true,
        startsAt: String = "2026-01-01T00:00:00Z",
        expiresAt: String = "2030-01-01T00:00:00Z",
        maxRedemptions: Int = 0,
        redemptionCount: Int = 0,
        universityIds: List<String> = emptyList(),
        years: List<String> = emptyList(),
        groups: List<String> = emptyList(),
    ) = Voucher(
        id = "v1", code = "CODE", name = "Test voucher", discountType = "Percentage", amount = amount,
        grant = grant, trialDays = trialDays, active = active, startsAt = startsAt, expiresAt = expiresAt,
        maxRedemptions = maxRedemptions, redemptionCount = redemptionCount,
        universityIds = universityIds, years = years, groups = groups,
        createdAt = "2026-01-01T00:00:00Z", updatedAt = "2026-01-01T00:00:00Z",
    )

    private fun catalogue(uniActive: Boolean? = null, yearActive: Boolean? = null) = listOf(
        VoucherCatalogueUniversity(
            id = "kau",
            active = uniActive,
            years = listOf(
                VoucherCatalogueYear(id = "KAU_Y1", year = "Year 1", active = yearActive),
                VoucherCatalogueYear(id = "KAU_Y2", year = "Year 2"),
            ),
        )
    )

    private val student = AudienceProfile(universityId = "kau", year = "Year 1", group = "")

    // --- Trial grants -----------------------------------------------------------

    @Test fun `a voucher is a discount unless it says otherwise`() {
        val plain = voucher()
        assertEquals(false, isTrialVoucher(plain))
        assertEquals(0, voucherTrialDays(plain))
        assertNull(trialEndsAt(plain, Instant.parse("2026-01-01T00:00:00Z")))
    }

    @Test fun `a trial voucher grants the days it names`() {
        val trial = voucher(grant = "Full-access trial", trialDays = 3)
        assertTrue(isTrialVoucher(trial))
        assertEquals(3, voucherTrialDays(trial))
    }

    @Test fun `a trial voucher with no length falls back to the platform trial`() {
        assertEquals(DEFAULT_TRIAL_DAYS, voucherTrialDays(voucher(grant = "Full-access trial")))
        assertEquals(DEFAULT_TRIAL_DAYS, voucherTrialDays(voucher(grant = "Full-access trial", trialDays = 0)))
        assertEquals(DEFAULT_TRIAL_DAYS, voucherTrialDays(voucher(grant = "Full-access trial", trialDays = -5)))
    }

    @Test fun `a three-day trial redeemed today ends three days from today`() {
        val end = trialEndsAt(voucher(grant = "Full-access trial", trialDays = 3), Instant.parse("2026-08-19T00:00:00Z"))
        assertEquals(Instant.parse("2026-08-22T00:00:00Z"), end)
    }

    @Test fun `a trial takes nothing off the price - it opens the platform instead`() {
        assertEquals(0.0, voucherDiscount(voucher(grant = "Full-access trial", trialDays = 3, amount = 20.0), 500.0), 0.0)
        assertEquals(100.0, voucherDiscount(voucher(amount = 20.0), 500.0), 0.0)
    }

    // --- Eligibility --------------------------------------------------------------

    @Test fun `without a catalogue, eligibility is the targeting rules alone`() {
        assertNull(voucherEligibility(voucher(), student))
    }

    @Test fun `a voucher targeted elsewhere is refused`() {
        assertEquals("This voucher is not available for your university.", voucherEligibility(voucher(universityIds = listOf("asu")), student))
        assertEquals("This voucher is not available for your year.", voucherEligibility(voucher(years = listOf("Year 3")), student))
    }

    @Test fun `a targeted voucher redeems when the university and year are live`() {
        val targeted = voucher(universityIds = listOf("kau"), years = listOf("Year 1"))
        assertNull(voucherEligibility(targeted, student, catalogue()))
        assertNull(voucherEligibility(targeted, student, catalogue(uniActive = true, yearActive = true)))
    }

    @Test fun `a voucher is refused while the university is switched off`() {
        val targeted = voucher(universityIds = listOf("kau"), years = listOf("Year 1"))
        assertEquals(
            "This voucher is not available for your university right now.",
            voucherEligibility(targeted, student, catalogue(uniActive = false)),
        )
    }

    @Test fun `a voucher is refused while the year is switched off`() {
        val targeted = voucher(universityIds = listOf("kau"), years = listOf("Year 1"))
        assertEquals(
            "This voucher is not available for your year right now.",
            voucherEligibility(targeted, student, catalogue(yearActive = false)),
        )
    }

    @Test fun `a switched-off university refuses the code whatever its years say`() {
        val targeted = voucher(universityIds = listOf("kau"))
        assertNotNull(voucherEligibility(targeted, student, catalogue(uniActive = false, yearActive = true)))
    }

    @Test fun `a student whose university or year is not in the catalogue is refused, not guessed`() {
        assertNotNull(voucherEligibility(voucher(), student.copy(universityId = "nowhere"), catalogue()))
        assertNotNull(voucherEligibility(voucher(), student.copy(year = "Year 9"), catalogue()))
    }

    @Test fun `an untargeted voucher still has to land somewhere live`() {
        assertNotNull(voucherEligibility(voucher(), student, catalogue(yearActive = false)))
    }

    @Test fun `the inactive, unstarted, expired and exhausted rules still come first`() {
        assertEquals("This voucher is not active.", voucherEligibility(voucher(active = false), student, catalogue()))
        assertEquals(
            "This voucher is not available yet.",
            voucherEligibility(voucher(startsAt = "2099-01-01T00:00:00Z"), student, catalogue()),
        )
        assertEquals(
            "This voucher has expired.",
            voucherEligibility(voucher(expiresAt = "2020-01-01T00:00:00Z"), student, catalogue()),
        )
        assertEquals(
            "This voucher has reached its redemption limit.",
            voucherEligibility(voucher(maxRedemptions = 5, redemptionCount = 5), student, catalogue()),
        )
    }

    @Test fun `a private scholarship code can cover 100 percent once and remain scoped to one university year`() {
        val scholarship = voucher(
            amount = 100.0,
            maxRedemptions = 1,
            universityIds = listOf("kau"),
            years = listOf("Year 1"),
        )

        assertEquals(1000.0, voucherDiscount(scholarship, 1000.0), 0.0)
        assertNull(voucherEligibility(scholarship, student, catalogue()))
        assertEquals(
            "This voucher has reached its redemption limit.",
            voucherEligibility(scholarship.copy(redemptionCount = 1), student, catalogue()),
        )
        assertEquals(
            "This voucher is not available for your year.",
            voucherEligibility(scholarship, student.copy(year = "Year 2"), catalogue()),
        )
    }
}
