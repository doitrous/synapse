package com.nishany.android.feature.focus

import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Test

/** Mirrors `src/lib/focusSession.test.ts` case for case -- this is the one JVM test for the ported pure state machine; no UI is tested here. */
class FocusSessionTest {

    private val t0 = 1_700_000_000_000L

    @Test
    fun `start then tick then complete -- a countdown reaches zero and stops itself`() {
        val started = start(setDurationMinutes(initialFocusSession(t0), 5, t0), t0)
        assertEquals(true, started.running)
        assertEquals(300, started.remainingSeconds)

        val midway = tick(started, t0 + 150_000)
        assertEquals(true, midway.running)
        assertEquals(150, midway.remainingSeconds)
        assertEquals(150, accruedSeconds(midway))

        val finished = tick(midway, t0 + 300_000)
        assertEquals(false, finished.running)
        assertEquals(0, finished.remainingSeconds)
        assertEquals(t0 + 300_000, finished.completedAt)
        assertEquals(300, accruedSeconds(finished))
    }

    @Test
    fun `count-up mode accrues seconds instead of counting down`() {
        val started = start(setMode(initialFocusSession(t0), FocusMode.COUNTUP, t0), t0)
        val later = tick(started, t0 + 45_000)
        assertEquals(45, later.elapsedSeconds)
        assertEquals(45, accruedSeconds(later))
        assertNull(later.completedAt)
    }

    @Test
    fun `pause freezes the clock -- resuming with start picks up from there`() {
        val started = start(setDurationMinutes(initialFocusSession(t0), 25, t0), t0)
        val ran = tick(started, t0 + 10_000)
        val paused = pause(ran, t0 + 10_000)
        assertEquals(false, paused.running)
        assertEquals(25 * 60 - 10, paused.remainingSeconds)

        // Time passing while paused must not be counted.
        val stillPaused = tick(paused, t0 + 60_000)
        assertEquals(paused.remainingSeconds, stillPaused.remainingSeconds)

        val resumed = start(stillPaused, t0 + 60_000)
        assertEquals(true, resumed.running)
        assertEquals(paused.remainingSeconds, resumed.remainingSeconds)
    }

    @Test
    fun `starting again after completion restarts the block rather than staying at 0-00`() {
        val finished = tick(start(setDurationMinutes(initialFocusSession(t0), 5, t0), t0), t0 + 300_000)
        assertEquals(0, finished.remainingSeconds)
        val restarted = start(finished, t0 + 300_000)
        assertEquals(true, restarted.running)
        assertEquals(300, restarted.remainingSeconds)
        assertNull(restarted.completedAt)
    }

    @Test
    fun `strict-discard -- leaving mid-block throws the running progress away`() {
        val started = start(setDurationMinutes(initialFocusSession(t0), 25, t0), t0)
        val ran = tick(started, t0 + 5 * 60_000)
        assertEquals(20 * 60, ran.remainingSeconds)

        val discarded = discard(ran, t0 + 5 * 60_000 + 15_000)
        assertEquals(false, discarded.running)
        assertEquals(25 * 60, discarded.remainingSeconds)
        assertEquals(0, accruedSeconds(discarded))
        assertNull(discarded.completedAt)
    }

    @Test
    fun `reset returns to the full chosen duration in countdown, and zero in count-up`() {
        val countdown = reset(tick(start(setDurationMinutes(initialFocusSession(t0), 50, t0), t0), t0 + 5_000), t0 + 5_000)
        assertEquals(50 * 60, countdown.remainingSeconds)

        val countup = reset(tick(start(setMode(initialFocusSession(t0), FocusMode.COUNTUP, t0), t0), t0 + 5_000), t0 + 5_000)
        assertEquals(0, countup.elapsedSeconds)
    }

    @Test
    fun `formatClock prints mm-ss under an hour and h-mm-ss past it`() {
        assertEquals("1:05", formatClock(65))
        assertEquals("1:01:01", formatClock(3_661))
        assertEquals("0:00", formatClock(-4))
    }
}
