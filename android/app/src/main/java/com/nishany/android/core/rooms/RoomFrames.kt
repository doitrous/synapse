package com.nishany.android.core.rooms

import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put

/**
 * The client→server frames, ported from the `type:` payloads
 * `useRoomAudio.ts` and `useRoomChannel.ts` send. Pure builders returning a
 * [JsonObject]; `RoomChannel` stamps the numeric `requestId` on the ones that
 * expect a reply. Tested by `RoomFramesTest`.
 */
object RoomFrames {

    fun speaking(isSpeaking: Boolean): JsonObject = buildJsonObject {
        put("type", "speaking")
        put("speaking", isSpeaking)
    }

    fun presenceRefresh(): JsonObject = buildJsonObject { put("type", "presence:refresh") }

    fun rtpCapabilities(): JsonObject = buildJsonObject { put("type", "sfu:rtpCapabilities") }

    fun createTransport(direction: String): JsonObject = buildJsonObject {
        put("type", "sfu:createTransport")
        put("direction", direction)
    }

    fun connectTransport(transportId: String, dtlsParameters: JsonElement): JsonObject = buildJsonObject {
        put("type", "sfu:connectTransport")
        put("transportId", transportId)
        put("dtlsParameters", dtlsParameters)
    }

    fun produce(transportId: String, kind: String, rtpParameters: JsonElement): JsonObject = buildJsonObject {
        put("type", "sfu:produce")
        put("transportId", transportId)
        put("kind", kind)
        put("rtpParameters", rtpParameters)
    }

    fun producers(): JsonObject = buildJsonObject { put("type", "sfu:producers") }

    fun consume(transportId: String, producerId: String, rtpCapabilities: JsonElement): JsonObject = buildJsonObject {
        put("type", "sfu:consume")
        put("transportId", transportId)
        put("producerId", producerId)
        put("rtpCapabilities", rtpCapabilities)
    }

    fun resume(consumerId: String): JsonObject = buildJsonObject {
        put("type", "sfu:resume")
        put("consumerId", consumerId)
    }

    fun pause(producerId: String, paused: Boolean): JsonObject = buildJsonObject {
        put("type", "sfu:pause")
        put("producerId", producerId)
        put("paused", paused)
    }

    fun close(): JsonObject = buildJsonObject { put("type", "sfu:close") }
}

/**
 * What toggling Mute must do, computed apart from the mediasoup handles so it
 * tests without them (`RoomMuteTest`). Muting is not just hiding a dot: it has
 * to stop the track transmitting, pause the producer, tell the SFU, and drop
 * your own speaking ring — an "off" button that only hid a dot would have been
 * broadcasting all along.
 */
data class MuteTransition(
    val muted: Boolean,
    /** The audio track's `enabled` flag: false when muted, true when live. */
    val trackEnabled: Boolean,
) {
    /** Frame telling the SFU to pause the producer (when muted) or resume it (when not). */
    fun pauseFrame(producerId: String): JsonObject = RoomFrames.pause(producerId, muted)

    /** Muting also drops your own speaking ring, so [RoomFrames.speaking]`(false)` goes out. */
    val emitSpeakingFalse: Boolean get() = muted

    companion object {
        fun toggle(current: Boolean): MuteTransition {
            val next = !current
            return MuteTransition(muted = next, trackEnabled = !next)
        }
    }
}
