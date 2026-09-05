package com.nishany.android.core.rooms

import com.nishany.android.core.CortexJson
import java.net.URLEncoder
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonNull
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.booleanOrNull
import kotlinx.serialization.json.contentOrNull
import kotlinx.serialization.json.intOrNull

/**
 * Everything a study room decides, without a socket to decide it against —
 * the Android peer of `src/lib/rooms/roomChannel.ts`. Pure: parsing, the
 * reducer that turns one frame into the next room state, the reconnect
 * backoff, the socket URL, and the client→server frame builders. Exercised
 * whole by `RoomProtocolTest`; the socket in `RoomChannel.kt` does nothing
 * but feed this.
 */
object RoomProtocol {

    /** The subprotocol that carries the bearer token. Matches the server. */
    const val BEARER_SUBPROTOCOL = "nishany.bearer"

    /** Refused at the door: not a member, or not signed in. Retrying is pointless. */
    const val CLOSE_NOT_A_MEMBER = 4401

    /** Admitted then evicted (left, removed, or room archived). Also stops retrying, and re-reads the party. */
    const val CLOSE_EVICTED = 4403

    /** A blip on our side. Reconnect. */
    const val CLOSE_TRANSIENT = 4500

    const val REQUEST_TIMEOUT_MS = 15_000L

    private const val BACKOFF_MIN_MS = 1_000L
    private const val BACKOFF_MAX_MS = 30_000L

    /** 4401 and 4403 both stop the retry loop; a plain drop and 4500 do not. */
    fun isPermanentClose(code: Int): Boolean = code == CLOSE_NOT_A_MEMBER || code == CLOSE_EVICTED

    /** Only 4403 means "the room moved on without you" — re-read the party. */
    fun shouldRereadParty(code: Int): Boolean = code == CLOSE_EVICTED

    /** Doubling 1s→30s. Deterministic; the jitter is the caller's to add. */
    fun backoffDelayMs(attempt: Int): Long {
        val step = attempt.coerceAtLeast(0).coerceAtMost(30)
        return (BACKOFF_MIN_MS shl step).coerceAtMost(BACKOFF_MAX_MS)
    }

    /** The `Sec-WebSocket-Protocol` header value: the pair the browser passes as subprotocols. */
    fun bearerSubprotocolHeader(token: String): String = "$BEARER_SUBPROTOCOL, $token"

    /**
     * The socket URL for a room, from the app's API base.
     *
     * `http`→`ws`, `https`→`wss`. A trailing `/api` path segment is stripped
     * before `/api/rooms/ws` is appended, so a base written either way resolves
     * to one `/api`, never the `/api/api/rooms/ws` that historically 404'd the
     * upgrade. Returns null when there is no base or code, or the base is not
     * absolute http(s).
     */
    fun roomSocketUrl(base: String?, code: String): String? {
        if (base.isNullOrBlank() || code.isBlank()) return null
        var normalised = base.trim().trimEnd('/')
        if (normalised.endsWith("/api", ignoreCase = true)) normalised = normalised.dropLast(4)
        val wsBase = when {
            normalised.startsWith("https://", ignoreCase = true) -> "wss://" + normalised.substring(8)
            normalised.startsWith("http://", ignoreCase = true) -> "ws://" + normalised.substring(7)
            else -> return null
        }
        val encoded = URLEncoder.encode(code, "UTF-8")
        return "$wsBase/api/rooms/ws?code=$encoded"
    }

    /* ---- Parsing ------------------------------------------------------- */

    /** One frame of JSON, or null. Anything but an object with a string `type` is not a message. */
    fun parse(raw: String): JsonObject? {
        val element = runCatching { CortexJson.parseToJsonElement(raw) }.getOrNull() ?: return null
        val obj = element as? JsonObject ?: return null
        return if (typeOf(obj) == null) null else obj
    }

    fun typeOf(message: JsonObject): String? =
        (message["type"] as? JsonPrimitive)?.takeIf { it.isString }?.contentOrNull

    /** A numeric `requestId`, or null. Replies to a `request` echo it back. */
    fun requestIdOf(message: JsonObject): Long? =
        (message["requestId"] as? JsonPrimitive)?.contentOrNull?.toLongOrNull()

    fun memberFromJson(obj: JsonObject): RoomMember? {
        val userId = obj.str("userId") ?: return null
        val seat = (obj["seat"] as? JsonObject)?.let {
            RoomSeat(
                desk = it.str("desk"),
                device = it.str("device"),
                chair = it.str("chair"),
                seatIndex = (it["seatIndex"] as? JsonPrimitive)?.intOrNull,
            )
        }
        return RoomMember(
            userId = userId,
            displayName = obj.str("displayName") ?: userId,
            role = obj.str("role") ?: "member",
            seat = seat,
            lastActiveAt = obj.str("lastActiveAt"),
            activity = obj.str("activity") ?: "studying",
        )
    }

    /** The `iceServers` array on any reply/`hello.sfu` object, parsed. Empty when absent. */
    fun iceServersOf(obj: JsonObject): List<IceServerConfig> = iceServersFrom(obj["iceServers"])

    private fun iceServersFrom(element: kotlinx.serialization.json.JsonElement?): List<IceServerConfig> {
        val array = element as? JsonArray ?: return emptyList()
        return array.mapNotNull { entry ->
            val obj = entry as? JsonObject ?: return@mapNotNull null
            val urls = when (val u = obj["urls"]) {
                is JsonArray -> u.mapNotNull { (it as? JsonPrimitive)?.contentOrNull }
                is JsonPrimitive -> listOfNotNull(u.contentOrNull)
                else -> emptyList()
            }
            if (urls.isEmpty()) null
            else IceServerConfig(urls = urls, username = obj.str("username"), credential = obj.str("credential"))
        }
    }

    private fun sfuFrom(obj: JsonObject?): RoomSfu {
        if (obj == null) return RoomSfu(available = false, reason = null, iceServers = emptyList())
        return RoomSfu(
            available = (obj["available"] as? JsonPrimitive)?.booleanOrNull ?: false,
            reason = obj.str("reason"),
            iceServers = iceServersFrom(obj["iceServers"]),
        )
    }

    /* ---- The reducer --------------------------------------------------- */

    fun onConnecting(state: RoomChannelState): RoomChannelState =
        if (state.status == RoomStatus.CONNECTING && state.retrying) state
        else state.copy(status = RoomStatus.CONNECTING, retrying = true)

    /**
     * A closed socket. Members are kept across a drop on purpose — the room did
     * not empty, the connection did. Speaking and producers do not survive:
     * they are claims about now, and a closed socket knows nothing about now.
     */
    fun onClosed(state: RoomChannelState, permanent: Boolean): RoomChannelState =
        state.copy(
            status = RoomStatus.CLOSED,
            speaking = emptySet(),
            producers = emptyList(),
            retrying = !permanent,
        )

    /** The room after one server frame. Returns the same instance when nothing changed. */
    fun onMessage(state: RoomChannelState, message: JsonObject): RoomChannelState {
        return when (typeOf(message)) {
            "hello" -> state.copy(
                status = RoomStatus.OPEN,
                retrying = true,
                sfu = sfuFrom(message["sfu"] as? JsonObject),
                selfId = message.str("userId") ?: state.selfId,
            )

            "archived" -> if (state.archived) state else state.copy(archived = true)

            "presence" -> {
                val array = message["members"] as? JsonArray ?: return state
                val members = array.mapNotNull { memberFromJson(it as? JsonObject ?: return@mapNotNull null) }
                val present = members.map { it.userId }.toSet()
                val speaking = state.speaking.filterTo(HashSet()) { it in present }
                state.copy(
                    status = RoomStatus.OPEN,
                    members = members,
                    speaking = if (speaking.size == state.speaking.size) state.speaking else speaking,
                )
            }

            "speaking" -> {
                val userId = message.str("userId") ?: return state
                val isSpeaking = (message["speaking"] as? JsonPrimitive)?.booleanOrNull ?: false
                val has = userId in state.speaking
                if (isSpeaking == has) return state
                val next = if (isSpeaking) state.speaking + userId else state.speaking - userId
                state.copy(speaking = next)
            }

            "sfu:newProducer" -> {
                val producerId = message.str("producerId") ?: return state
                if (state.producers.any { it.producerId == producerId }) return state
                val userId = message.str("userId") ?: ""
                state.copy(producers = state.producers + RoomProducer(producerId, userId))
            }

            "sfu:producerClosed" -> {
                val producerId = message.str("producerId") ?: return state
                if (state.producers.none { it.producerId == producerId }) return state
                state.copy(producers = state.producers.filterNot { it.producerId == producerId })
            }

            "sfu:producers" -> {
                val array = message["producers"] as? JsonArray ?: return state
                val producers = array.mapNotNull { entry ->
                    val obj = entry as? JsonObject ?: return@mapNotNull null
                    val producerId = obj.str("producerId") ?: return@mapNotNull null
                    RoomProducer(producerId, obj.str("userId") ?: "")
                }
                state.copy(producers = producers)
            }

            "sfu:unavailable" -> state.copy(
                sfu = RoomSfu(available = false, reason = message.str("reason"), iceServers = state.sfu?.iceServers ?: emptyList()),
            )

            // A reply to a `request` (createTransport, consume, …) is delivered
            // to whoever asked, not to the room. An unknown type is a server
            // from another version, and the room carries on.
            else -> state
        }
    }

    private fun JsonObject.str(key: String): String? =
        (this[key] as? JsonPrimitive)?.takeIf { it.isString && it !is JsonNull }?.contentOrNull

    // Small helpers used by the voice client to read reply objects.
    fun JsonObject.string(key: String): String? = str(key)
    fun JsonObject.obj(key: String): JsonObject? = this[key] as? JsonObject
    fun JsonObject.serialize(): String = CortexJson.encodeToString(JsonObject.serializer(), this)
}
