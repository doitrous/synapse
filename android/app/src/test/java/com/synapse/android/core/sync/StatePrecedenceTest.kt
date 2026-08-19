package com.synapse.android.core.sync

import java.time.Instant
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

class StatePrecedenceTest {

    private val earlier = Instant.parse("2026-08-19T10:00:00Z")
    private val later = Instant.parse("2026-08-19T11:00:00Z")

    @Test
    fun `no local copy never wins`() {
        assertFalse(StatePrecedence.localCopyWins(null, earlier))
        assertFalse(StatePrecedence.localCopyWins(null, null))
    }

    @Test
    fun `an unwritten key leaves the offline edit in place`() {
        assertTrue(StatePrecedence.localCopyWins(earlier, null))
    }

    @Test
    fun `a strictly newer local copy wins`() {
        assertTrue(StatePrecedence.localCopyWins(later, earlier))
    }

    @Test
    fun `an equal stamp means the server already has this write`() {
        assertFalse(StatePrecedence.localCopyWins(earlier, earlier))
    }

    @Test
    fun `a stale local copy never reverts newer work done elsewhere`() {
        assertFalse(StatePrecedence.localCopyWins(earlier, later))
    }
}
