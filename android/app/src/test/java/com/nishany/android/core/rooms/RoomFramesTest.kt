package com.nishany.android.core.rooms

import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.booleanOrNull
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

/** [RoomFrames] builders and the [MuteTransition] state machine. */
class RoomFramesTest {

    private fun JsonObject.str(key: String) = (this[key] as? JsonPrimitive)?.content
    private fun JsonObject.bool(key: String) = (this[key] as? JsonPrimitive)?.booleanOrNull

    @Test fun `speaking frame carries the flag`() {
        val frame = RoomFrames.speaking(true)
        assertEquals("speaking", frame.str("type"))
        assertEquals(true, frame.bool("speaking"))
    }

    @Test fun `createTransport names the direction`() {
        val frame = RoomFrames.createTransport("recv")
        assertEquals("sfu:createTransport", frame.str("type"))
        assertEquals("recv", frame.str("direction"))
    }

    @Test fun `consume carries the recv transport and producer`() {
        val frame = RoomFrames.consume("t1", "p1", JsonPrimitive("{}"))
        assertEquals("sfu:consume", frame.str("type"))
        assertEquals("t1", frame.str("transportId"))
        assertEquals("p1", frame.str("producerId"))
    }

    @Test fun `pause carries the paused flag`() {
        val frame = RoomFrames.pause("p1", true)
        assertEquals("sfu:pause", frame.str("type"))
        assertEquals("p1", frame.str("producerId"))
        assertEquals(true, frame.bool("paused"))
    }

    // ---- mute state machine ----

    @Test fun `muting stops the track, pauses the producer, and drops your ring`() {
        val t = MuteTransition.toggle(current = false)
        assertTrue(t.muted)
        assertFalse(t.trackEnabled)
        assertTrue(t.emitSpeakingFalse)
        assertEquals(true, (t.pauseFrame("p1")["paused"] as JsonPrimitive).booleanOrNull)
    }

    @Test fun `unmuting re-enables the track and does not touch your ring`() {
        val t = MuteTransition.toggle(current = true)
        assertFalse(t.muted)
        assertTrue(t.trackEnabled)
        assertFalse(t.emitSpeakingFalse)
        assertEquals(false, (t.pauseFrame("p1")["paused"] as JsonPrimitive).booleanOrNull)
    }
}
