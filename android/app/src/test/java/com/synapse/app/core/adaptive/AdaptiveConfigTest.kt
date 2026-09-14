package com.synapse.app.core.adaptive

import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * `config.ts` has no dedicated `*.test.ts` on the web (its numbers are
 * exercised indirectly through every other adaptive test). These cover the
 * two pure functions this task ports: [sharesForHorizon] and
 * [normaliseShares].
 */
class AdaptiveConfigTest {
    private val config = DEFAULT_ADAPTIVE_CONFIG

    @Test
    fun `sharesForHorizon weights coverage higher as the exam nears`() {
        val imminent = sharesForHorizon(config, 10)
        val near = sharesForHorizon(config, 30)
        val far = sharesForHorizon(config, null)

        assertEquals(0.50, imminent.coverage, 1e-9)
        assertEquals(0.35, near.coverage, 1e-9)
        assertEquals(0.25, far.coverage, 1e-9)
        assertTrue("coverage share should rise as the exam approaches", imminent.coverage > near.coverage && near.coverage > far.coverage)
    }

    @Test
    fun `sharesForHorizon matches the narrowest band that still contains the horizon`() {
        // 14 is the inclusive boundary of "imminent" (<= 14), not "near".
        val atBoundary = sharesForHorizon(config, 14)
        assertEquals(sharesForHorizon(config, 10).coverage, atBoundary.coverage, 1e-9)
    }

    @Test
    fun `normaliseShares rescales to sum to 1 and clamps negatives to zero`() {
        val messy = AllocationShares(weakness = 2.0, coverage = 2.0, review = -1.0, uncertainty = 0.0)
        val normalised = normaliseShares(messy)
        assertEquals(1.0, normalised.weakness + normalised.coverage + normalised.review + normalised.uncertainty, 1e-9)
        assertEquals(0.0, normalised.review, 1e-9)
        assertEquals(0.5, normalised.weakness, 1e-9)
    }

    @Test
    fun `normaliseShares falls back to the default when everything is non-positive`() {
        val allZero = AllocationShares(0.0, 0.0, 0.0, 0.0)
        assertEquals(config.defaultShares, normaliseShares(allZero, config.defaultShares))
    }
}
