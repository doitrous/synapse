package com.synapse.app.core.sync
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test
class StatePrecedenceTest {
    private val t1 = "2026-08-20T10:00:00.000Z"
    private val t2 = "2026-08-20T11:00:00.000Z"
    @Test fun nullLocalNeverWins() = assertFalse(StatePrecedence.localCopyWins(null, t1))
    @Test fun unreadableLocalNeverWins() = assertFalse(StatePrecedence.localCopyWins("not-a-date", t1))
    @Test fun nullServerLetsLocalWin() = assertTrue(StatePrecedence.localCopyWins(t1, null))
    @Test fun unreadableServerLetsLocalWin() = assertTrue(StatePrecedence.localCopyWins(t1, "not-a-date"))
    @Test fun strictlyNewerWins() = assertTrue(StatePrecedence.localCopyWins(t2, t1))
    @Test fun equalDoesNotWin() = assertFalse(StatePrecedence.localCopyWins(t1, t1))
    @Test fun olderDoesNotWin() = assertFalse(StatePrecedence.localCopyWins(t1, t2))
}
