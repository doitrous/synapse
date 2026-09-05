package com.nishany.android.core.rooms

import com.nishany.android.core.CortexJson
import kotlinx.serialization.json.JsonObject
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNull
import org.junit.Assert.assertSame
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * [RoomProtocol]: the socket URL (including the `/api` strip that avoids the
 * historical `/api/api` 404), the bearer subprotocol header, the frame parser,
 * the reducer that turns one server frame into the next room state, and the
 * close-code rules. The Android peer of `roomChannel.test.ts`.
 */
class RoomProtocolTest {

    private fun obj(json: String): JsonObject = CortexJson.parseToJsonElement(json) as JsonObject

    // ---- socket URL ----

    @Test fun `https base becomes wss with one api segment`() {
        assertEquals(
            "wss://app.nishany.com/api/rooms/ws?code=ABC123",
            RoomProtocol.roomSocketUrl("https://app.nishany.com", "ABC123"),
        )
    }

    @Test fun `a trailing api on the base is stripped, not doubled`() {
        assertEquals(
            "wss://app.nishany.com/api/rooms/ws?code=ABC123",
            RoomProtocol.roomSocketUrl("https://app.nishany.com/api", "ABC123"),
        )
    }

    @Test fun `a trailing slash is tolerated`() {
        assertEquals(
            "wss://app.nishany.com/api/rooms/ws?code=ABC123",
            RoomProtocol.roomSocketUrl("https://app.nishany.com/api/", "ABC123"),
        )
    }

    @Test fun `http base becomes ws`() {
        assertEquals(
            "ws://localhost:8080/api/rooms/ws?code=XY",
            RoomProtocol.roomSocketUrl("http://localhost:8080", "XY"),
        )
    }

    @Test fun `a host that merely contains api is left alone`() {
        assertEquals(
            "wss://api.nishany.com/api/rooms/ws?code=XY",
            RoomProtocol.roomSocketUrl("https://api.nishany.com", "XY"),
        )
    }

    @Test fun `no base or no code is null`() {
        assertNull(RoomProtocol.roomSocketUrl(null, "XY"))
        assertNull(RoomProtocol.roomSocketUrl("", "XY"))
        assertNull(RoomProtocol.roomSocketUrl("https://x", ""))
        assertNull(RoomProtocol.roomSocketUrl("ftp://x", "XY"))
    }

    // ---- header + close codes + backoff ----

    @Test fun `the subprotocol header is the pair the browser offers`() {
        assertEquals("nishany.bearer, tok-123", RoomProtocol.bearerSubprotocolHeader("tok-123"))
    }

    @Test fun `4401 and 4403 are permanent, 4500 is not`() {
        assertTrue(RoomProtocol.isPermanentClose(4401))
        assertTrue(RoomProtocol.isPermanentClose(4403))
        assertFalse(RoomProtocol.isPermanentClose(4500))
        assertFalse(RoomProtocol.isPermanentClose(1006))
    }

    @Test fun `only 4403 re-reads the party`() {
        assertTrue(RoomProtocol.shouldRereadParty(4403))
        assertFalse(RoomProtocol.shouldRereadParty(4401))
    }

    @Test fun `backoff doubles from one second to a thirty second ceiling`() {
        assertEquals(1_000L, RoomProtocol.backoffDelayMs(0))
        assertEquals(2_000L, RoomProtocol.backoffDelayMs(1))
        assertEquals(8_000L, RoomProtocol.backoffDelayMs(3))
        assertEquals(30_000L, RoomProtocol.backoffDelayMs(10))
    }

    // ---- parsing ----

    @Test fun `only an object with a string type parses`() {
        assertNull(RoomProtocol.parse("not json"))
        assertNull(RoomProtocol.parse("[1,2]"))
        assertNull(RoomProtocol.parse("{\"nope\":1}"))
        assertEquals("hello", RoomProtocol.typeOf(RoomProtocol.parse("{\"type\":\"hello\"}")!!))
    }

    @Test fun `a numeric requestId is read back`() {
        assertEquals(7L, RoomProtocol.requestIdOf(obj("""{"type":"x","requestId":7}""")))
        assertNull(RoomProtocol.requestIdOf(obj("""{"type":"x"}""")))
    }

    @Test fun `a member decodes with its seat and activity`() {
        val member = RoomProtocol.memberFromJson(
            obj("""{"userId":"u1","displayName":"Sara","role":"host","seat":{"desk":"corner","seatIndex":3},"activity":"idle","lastActiveAt":"2026-01-01T00:00:00Z"}"""),
        )!!
        assertEquals("u1", member.userId)
        assertEquals("Sara", member.displayName)
        assertEquals("host", member.role)
        assertEquals(3, member.seat?.seatIndex)
        assertEquals("idle", member.activity)
    }

    @Test fun `iceServers parse from a reply`() {
        val servers = RoomProtocol.iceServersOf(
            obj("""{"iceServers":[{"urls":["turn:t:3478"],"username":"u","credential":"c"},{"urls":"stun:s:19302"}]}"""),
        )
        assertEquals(2, servers.size)
        assertEquals(listOf("turn:t:3478"), servers[0].urls)
        assertEquals("u", servers[0].username)
        assertEquals(listOf("stun:s:19302"), servers[1].urls)
    }

    // ---- the reducer ----

    @Test fun `hello opens the room, records self and the sfu`() {
        val next = RoomProtocol.onMessage(
            RoomChannelState(),
            obj("""{"type":"hello","userId":"me","roomId":"r","sfu":{"available":true,"iceServers":[]}}"""),
        )
        assertEquals(RoomStatus.OPEN, next.status)
        assertEquals("me", next.selfId)
        assertTrue(next.sfu!!.available)
    }

    @Test fun `presence sets members and drops speakers who left`() {
        val start = RoomChannelState(speaking = setOf("gone", "here"))
        val next = RoomProtocol.onMessage(
            start,
            obj("""{"type":"presence","members":[{"userId":"here","displayName":"H","role":"member","activity":"studying"}]}"""),
        )
        assertEquals(1, next.members!!.size)
        assertEquals(setOf("here"), next.speaking)
    }

    @Test fun `speaking adds and removes, and a no-op keeps the same instance`() {
        val on = RoomProtocol.onMessage(RoomChannelState(), obj("""{"type":"speaking","userId":"u","speaking":true}"""))
        assertEquals(setOf("u"), on.speaking)
        val same = RoomProtocol.onMessage(on, obj("""{"type":"speaking","userId":"u","speaking":true}"""))
        assertSame(on, same)
        val off = RoomProtocol.onMessage(on, obj("""{"type":"speaking","userId":"u","speaking":false}"""))
        assertTrue(off.speaking.isEmpty())
    }

    @Test fun `producers arrive, close, and list wholesale`() {
        var state = RoomProtocol.onMessage(RoomChannelState(), obj("""{"type":"sfu:newProducer","producerId":"p1","userId":"u1"}"""))
        state = RoomProtocol.onMessage(state, obj("""{"type":"sfu:newProducer","producerId":"p1","userId":"u1"}"""))
        assertEquals(1, state.producers.size) // deduped
        state = RoomProtocol.onMessage(state, obj("""{"type":"sfu:producerClosed","producerId":"p1","userId":"u1"}"""))
        assertTrue(state.producers.isEmpty())
        state = RoomProtocol.onMessage(state, obj("""{"type":"sfu:producers","producers":[{"producerId":"a","userId":"x"},{"producerId":"b","userId":"y"}]}"""))
        assertEquals(listOf("a", "b"), state.producers.map { it.producerId })
    }

    @Test fun `archived is sticky and unavailable carries the reason`() {
        val archived = RoomProtocol.onMessage(RoomChannelState(), obj("""{"type":"archived","roomId":"r"}"""))
        assertTrue(archived.archived)
        val unavailable = RoomProtocol.onMessage(RoomChannelState(), obj("""{"type":"sfu:unavailable","reason":"no worker"}"""))
        assertFalse(unavailable.sfu!!.available)
        assertEquals("no worker", unavailable.sfu!!.reason)
    }

    @Test fun `a closed socket keeps members but drops speaking and producers`() {
        val open = RoomChannelState(
            status = RoomStatus.OPEN,
            members = listOf(RoomMember("u", "U", "member", null, null, "studying")),
            speaking = setOf("u"),
            producers = listOf(RoomProducer("p", "u")),
        )
        val dropped = RoomProtocol.onClosed(open, permanent = false)
        assertEquals(RoomStatus.CLOSED, dropped.status)
        assertEquals(1, dropped.members!!.size)
        assertTrue(dropped.speaking.isEmpty())
        assertTrue(dropped.producers.isEmpty())
        assertTrue(dropped.retrying)
        assertFalse(RoomProtocol.onClosed(open, permanent = true).retrying)
    }

    @Test fun `an unknown frame leaves the room unchanged`() {
        val start = RoomChannelState(status = RoomStatus.OPEN)
        assertSame(start, RoomProtocol.onMessage(start, obj("""{"type":"sfu:createTransport-reply-ish"}""")))
    }
}
