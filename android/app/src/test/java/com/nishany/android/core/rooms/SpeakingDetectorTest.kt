package com.nishany.android.core.rooms

import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * [SpeakingDetector]: the onset/release hysteresis that keeps a cough from
 * lighting the ring and a pause between words from flickering it. Clock is
 * injected, so timing is asserted without a real microphone or a sleep.
 */
class SpeakingDetectorTest {

    private val loud = 0.2
    private val quiet = 0.0

    @Test fun `a brief spike under the onset window does not count`() {
        val d = SpeakingDetector()
        assertFalse(d.onSample(loud, nowMs = 0, muted = false))
        assertFalse(d.onSample(loud, nowMs = 100, muted = false)) // still under 120ms
    }

    @Test fun `sustained loudness past the onset lights the ring`() {
        val d = SpeakingDetector()
        d.onSample(loud, nowMs = 0, muted = false)
        assertTrue(d.onSample(loud, nowMs = 130, muted = false))
    }

    @Test fun `a short pause holds the ring, a long one drops it`() {
        val d = SpeakingDetector()
        d.onSample(loud, nowMs = 0, muted = false)
        assertTrue(d.onSample(loud, nowMs = 200, muted = false))
        // Quiet for less than the release window: still speaking.
        assertTrue(d.onSample(quiet, nowMs = 300, muted = false))
        // Quiet past the release window: dropped.
        assertFalse(d.onSample(quiet, nowMs = 800, muted = false))
    }

    @Test fun `muted is always false and resets the windows`() {
        val d = SpeakingDetector()
        d.onSample(loud, nowMs = 0, muted = false)
        assertTrue(d.onSample(loud, nowMs = 130, muted = false))
        assertFalse(d.onSample(loud, nowMs = 200, muted = true))
        // After unmuting the onset window starts over.
        assertFalse(d.onSample(loud, nowMs = 205, muted = false))
        assertTrue(d.onSample(loud, nowMs = 400, muted = false))
    }

    @Test fun `rms of silence is zero and of full-scale is near one`() {
        assertEquals(0.0, SpeakingDetector.rmsOfPcm16(ByteArray(16)), 1e-9)
        // Four max-negative shorts (0x8000 little-endian = 0x00 0x80).
        val full = byteArrayOf(0, -128, 0, -128, 0, -128, 0, -128)
        assertEquals(1.0, SpeakingDetector.rmsOfPcm16(full), 1e-3)
    }
}
