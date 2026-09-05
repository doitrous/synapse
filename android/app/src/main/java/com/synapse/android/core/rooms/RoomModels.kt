package com.synapse.android.core.rooms

/**
 * The shapes a study room's socket and REST join both speak, ported from the
 * web's `src/lib/rooms/roomChannel.ts`. Kept free of Android, OkHttp and the
 * mediasoup AAR so the whole protocol reduces and tests on the JVM the way
 * `RoomProtocolTest` does.
 */

/** A member's seat as the server stores it. Every piece may be unchosen. */
data class RoomSeat(
    val desk: String?,
    val device: String?,
    val chair: String?,
    val seatIndex: Int?,
)

/** One person in the room, from `presence` or the REST join's `members`. */
data class RoomMember(
    val userId: String,
    val displayName: String,
    val role: String,
    val seat: RoomSeat?,
    val lastActiveAt: String?,
    /** `"studying"` or `"idle"` — the server downgrades a stale heartbeat to idle for us. */
    val activity: String,
)

/** Somebody sending audio, by producer and owner. */
data class RoomProducer(
    val producerId: String,
    val userId: String,
)

/** One STUN/TURN server the SFU handed down. */
data class IceServerConfig(
    val urls: List<String>,
    val username: String?,
    val credential: String?,
)

/**
 * Whether the room can carry a call, and why not when it cannot.
 * Null (on [RoomChannelState.sfu]) means "not decided yet" — before `hello`.
 */
data class RoomSfu(
    val available: Boolean,
    val reason: String?,
    val iceServers: List<IceServerConfig>,
)

/** Where the socket is. Mirrors `ChannelStatus` in the web. */
enum class RoomStatus { IDLE, CONNECTING, OPEN, CLOSED }

/**
 * The room as the channel knows it — the Android peer of `RoomChannelState`.
 *
 * [members] is null until the first `presence`: null means "not known yet"
 * (show a spinner), which is not the same as `emptyList()` ("nobody here"),
 * a thing the socket can never say because the caller is in the room.
 */
data class RoomChannelState(
    val status: RoomStatus = RoomStatus.IDLE,
    val members: List<RoomMember>? = null,
    val speaking: Set<String> = emptySet(),
    val producers: List<RoomProducer> = emptyList(),
    val sfu: RoomSfu? = null,
    val archived: Boolean = false,
    /** A closed socket expected back. False once retrying has given up (4401/4403/no session). */
    val retrying: Boolean = false,
    /** Set once `hello` arrives, so the voice client knows its own id. */
    val selfId: String? = null,
)
