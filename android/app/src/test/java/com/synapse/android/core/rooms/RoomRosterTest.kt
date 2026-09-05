package com.synapse.android.core.rooms

import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test

/** [buildRoster]: the split into "Speaking now" and "In the room", with your own ring merged in locally. */
class RoomRosterTest {

    private fun member(id: String, name: String, activity: String = "studying") =
        RoomMember(id, name, "member", null, null, activity)

    @Test fun `null before the first presence`() {
        assertNull(buildRoster(RoomChannelState(), selfSpeaking = false))
    }

    @Test fun `speakers are lifted out and the rest stay in the room`() {
        val state = RoomChannelState(
            status = RoomStatus.OPEN,
            members = listOf(member("a", "Amir"), member("b", "Bea"), member("c", "Cy", "idle")),
            speaking = setOf("b"),
            sfu = RoomSfu(available = true, reason = null, iceServers = emptyList()),
            selfId = "a",
        )
        val roster = buildRoster(state, selfSpeaking = false)!!
        assertEquals(listOf("b"), roster.speakingNow.map { it.userId })
        assertEquals(listOf("a", "c"), roster.inRoom.map { it.userId })
        assertTrue(roster.sfuAvailable)
        assertTrue(roster.inRoom.first { it.userId == "c" }.idle)
    }

    @Test fun `your own analyser lights your ring without a server round-trip`() {
        val state = RoomChannelState(
            status = RoomStatus.OPEN,
            members = listOf(member("me", "Me"), member("b", "Bea")),
            selfId = "me",
        )
        val roster = buildRoster(state, selfSpeaking = true)!!
        assertEquals(listOf("me"), roster.speakingNow.map { it.userId })
        assertTrue(roster.speakingNow.first().isSelf)
    }

    @Test fun `sfu unavailable is surfaced with its reason but the roster still builds`() {
        val state = RoomChannelState(
            status = RoomStatus.OPEN,
            members = listOf(member("a", "Amir")),
            sfu = RoomSfu(available = false, reason = "no worker", iceServers = emptyList()),
            selfId = "a",
        )
        val roster = buildRoster(state, selfSpeaking = false)!!
        assertEquals(1, roster.total)
        assertEquals(false, roster.sfuAvailable)
        assertEquals("no worker", roster.sfuReason)
    }
}
