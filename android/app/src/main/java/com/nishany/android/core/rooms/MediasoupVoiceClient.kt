package com.nishany.android.core.rooms

import android.content.Context
import android.util.Log
import com.nishany.android.core.BACKGROUND_WORK_TAG
import com.nishany.android.core.CortexJson
import java.util.concurrent.ConcurrentHashMap
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.runBlocking
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import org.mediasoup.droid.Consumer
import org.mediasoup.droid.Device
import org.mediasoup.droid.MediasoupClient
import org.mediasoup.droid.PeerConnection
import org.mediasoup.droid.Producer
import org.mediasoup.droid.RecvTransport
import org.mediasoup.droid.SendTransport
import org.mediasoup.droid.Transport
import org.webrtc.AudioSource
import org.webrtc.AudioTrack
import org.webrtc.MediaConstraints
import org.webrtc.PeerConnectionFactory
import org.webrtc.audio.AudioDeviceModule
import org.webrtc.audio.JavaAudioDeviceModule

/**
 * The call, over the mediasoup SFU in `server/src/roomsSfu.js`.
 *
 * The shape mirrors `useRoomAudio.ts`: this member sends one audio stream up
 * and receives one down per person talking (twenty students in a mesh would be
 * 380 peer connections, which is not a thing a phone does). The negotiation
 * rides the room's [RoomChannel] — the same socket that carries presence and
 * speaking — and every step matches the web's: capabilities → load the device
 * → send/recv transports → produce → consume the existing producers, then the
 * ones that arrive later through [syncProducers].
 *
 * The real ORTC↔SDP work is the mediasoup-client-android native library
 * (`org.mediasoup.droid.*`, which bundles libwebrtc); this class is the wiring
 * between that and the room's JSON signalling. It is deliberately behind the
 * pure [RoomProtocol]/[RoomFrames]/[SpeakingDetector] layer, which is what
 * carries the unit tests — a real two-device call needs an SFU with a public
 * announced IP and a TURN server, which is infrastructure, not app code.
 *
 * Speaking is still measured locally: the SFU never decodes audio, so RMS is
 * read off the microphone's own PCM (the audio-device-module's samples
 * callback) and fed to [SpeakingDetector], whose boolean is broadcast so
 * everyone else's roster lights the same ring.
 */
class MediasoupVoiceClient(
    private val appContext: Context,
    private val channel: RoomChannel,
    private val scope: CoroutineScope,
    /** Called on the local analyser's verdict changing; the ViewModel broadcasts it. */
    private val onSelfSpeaking: (Boolean) -> Unit,
    /** Called once when the media path fails after signalling agreed (ICE never connected). */
    private val onMediaFailed: (String) -> Unit,
) {
    private var factory: PeerConnectionFactory? = null
    private var adm: AudioDeviceModule? = null
    private var device: Device? = null
    private var sendTransport: SendTransport? = null
    private var recvTransport: RecvTransport? = null
    private var producer: Producer? = null
    private var audioSource: AudioSource? = null
    private var localTrack: AudioTrack? = null
    private val consumers = ConcurrentHashMap<String, Consumer>()

    private val detector = SpeakingDetector()
    @Volatile private var muted = false
    @Volatile private var lastSpeaking = false
    @Volatile private var closed = false

    /** True once producing — the point at which the room can say "you are in the room's voice". */
    @Volatile var callActive = false
        private set

    /**
     * Open the microphone, load the device, raise both transports, and produce.
     * Then consume whoever was already talking. Throws on failure; the caller
     * tears down and reports it. The [RECORD_AUDIO] permission must already be
     * granted — [MicPermission] handles that before this is called.
     */
    suspend fun join() {
        ensureRuntime()
        val f = buildFactory()
        factory = f

        val caps = channel.request(RoomFrames.rtpCapabilities())
        val device = Device()
        device.load(caps.elementString("rtpCapabilities"))
        this.device = device

        sendTransport = openSendTransport(device, f)
        recvTransport = openRecvTransport(device, f)

        val track = f.createAudioTrack("mic-${System.nanoTime()}", audioSource!!)
        track.setEnabled(!muted)
        localTrack = track

        // Audio only, single Opus stream: no simulcast encodings, no codec options.
        producer = sendTransport!!.produce(
            object : Producer.Listener {
                override fun onTransportClose(p: Producer) { /* torn down with the transport */ }
            },
            track,
            null,
            null,
        )
        if (muted) producer?.pause()
        callActive = true

        // Whoever was already talking when we walked in; later arrivals come
        // through the channel and are picked up by [syncProducers].
        val existing = runCatching { channel.request(RoomFrames.producers()) }.getOrNull()
        val list = (existing?.get("producers") as? JsonArray).orEmptyProducers()
        for (p in list) consume(p.producerId)
    }

    private fun openSendTransport(device: Device, f: PeerConnectionFactory): SendTransport {
        val reply = requestTransport("send")
        val options = optionsFor(f, reply)
        return device.createSendTransport(
            object : SendTransport.Listener {
                override fun onConnect(transport: Transport, dtlsParameters: String) {
                    connectTransport(transport.id, dtlsParameters)
                }

                override fun onConnectionStateChange(transport: Transport, connectionState: String) {
                    if (connectionState == "failed" && callActive && !closed) {
                        onMediaFailed(VOICE_MEDIA_REASON)
                    }
                }

                override fun onProduce(transport: Transport, kind: String, rtpParameters: String, appData: String?): String {
                    // A synchronous callback that must return the producer id, so
                    // it blocks on the socket round-trip. It runs on the native
                    // signalling thread, never the one delivering the reply.
                    return runBlocking {
                        channel.request(
                            RoomFrames.produce(transport.id, kind, rtpParameters.asElement()),
                        ).string("producerId") ?: throw RoomRequestException("produce returned no id")
                    }
                }
            },
            reply.string("id"),
            reply.elementString("iceParameters"),
            reply.elementString("iceCandidates"),
            reply.elementString("dtlsParameters"),
            options,
            "{}",
        )
    }

    private fun openRecvTransport(device: Device, f: PeerConnectionFactory): RecvTransport {
        val reply = requestTransport("recv")
        val options = optionsFor(f, reply)
        return device.createRecvTransport(
            object : RecvTransport.Listener {
                override fun onConnect(transport: Transport, dtlsParameters: String) {
                    connectTransport(transport.id, dtlsParameters)
                }

                override fun onConnectionStateChange(transport: Transport, connectionState: String) {
                    if (connectionState == "failed" && callActive && !closed) {
                        onMediaFailed(VOICE_MEDIA_REASON)
                    }
                }
            },
            reply.string("id"),
            reply.elementString("iceParameters"),
            reply.elementString("iceCandidates"),
            reply.elementString("dtlsParameters"),
            options,
            "{}",
        )
    }

    private fun requestTransport(direction: String): JsonObject =
        runBlocking { channel.request(RoomFrames.createTransport(direction)) }

    private fun connectTransport(transportId: String, dtlsParameters: String) {
        runCatching {
            runBlocking { channel.request(RoomFrames.connectTransport(transportId, dtlsParameters.asElement())) }
        }.onFailure { Log.w(BACKGROUND_WORK_TAG, "rooms: connectTransport failed", it) }
    }

    /**
     * Consume one remote producer. The consumer arrives paused — WebRTC would
     * otherwise drop the first syllable — so it is resumed on the SFU before the
     * track is enabled. A failure leaves the producer unclaimed so the next
     * [syncProducers] pass retries it, exactly as the web does.
     */
    private suspend fun consume(producerId: String) {
        val recv = recvTransport ?: return
        val device = device ?: return
        if (consumers.containsKey(producerId) || closed) return

        val reply = channel.request(
            RoomFrames.consume(recv.id, producerId, device.rtpCapabilities.asElement()),
        )
        if (closed) return
        val consumer = recv.consume(
            object : Consumer.Listener {
                override fun onTransportClose(c: Consumer) { consumers.remove(producerId) }
            },
            reply.string("id"),
            reply.string("producerId"),
            reply.string("kind"),
            reply.elementString("rtpParameters"),
        )
        try {
            channel.request(RoomFrames.resume(consumer.id))
        } catch (e: Exception) {
            runCatching { consumer.close() }
            throw e
        }
        if (closed) {
            runCatching { consumer.close() }
            return
        }
        consumer.track?.setEnabled(true)
        consumers[producerId] = consumer
    }

    /**
     * Reconcile the consumers against the room's live producer list: drop those
     * whose producer closed, consume those newly arrived. Driven by channel
     * state rather than an event handler, so a producer that arrived while the
     * transports were still building is picked up the moment they exist, and one
     * seen twice is consumed once.
     */
    suspend fun syncProducers(producers: List<RoomProducer>) {
        if (!callActive || closed) return
        val wanted = producers.map { it.producerId }.toSet()
        for (producerId in consumers.keys.toList()) {
            if (producerId !in wanted) {
                runCatching { consumers.remove(producerId)?.close() }
            }
        }
        for (p in producers) {
            if (!consumers.containsKey(p.producerId)) {
                runCatching { consume(p.producerId) }
                    .onFailure { Log.w(BACKGROUND_WORK_TAG, "rooms: consume failed", it) }
            }
        }
    }

    /** Mute stops the track transmitting, pauses the producer, and tells the SFU. */
    fun setMuted(next: Boolean) {
        muted = next
        localTrack?.setEnabled(!next)
        val p = producer
        if (p != null) {
            runCatching { if (next) p.pause() else p.resume() }
            channel.send(RoomFrames.pause(p.id, next))
        }
        if (next && lastSpeaking) {
            lastSpeaking = false
            onSelfSpeaking(false)
        }
    }

    fun close() {
        if (closed) return
        closed = true
        callActive = false
        channel.send(RoomFrames.close())
        for (consumer in consumers.values) runCatching { consumer.close() }
        consumers.clear()
        runCatching { producer?.close() }
        runCatching { sendTransport?.close() }
        runCatching { recvTransport?.close() }
        runCatching { device?.dispose() }
        runCatching { localTrack?.dispose() }
        runCatching { audioSource?.dispose() }
        runCatching { factory?.dispose() }
        runCatching { (adm as? JavaAudioDeviceModule)?.release() }
        producer = null
        sendTransport = null
        recvTransport = null
        device = null
        localTrack = null
        audioSource = null
        factory = null
        adm = null
    }

    private fun buildFactory(): PeerConnectionFactory {
        val module = JavaAudioDeviceModule.builder(appContext)
            .setUseHardwareAcousticEchoCanceler(true)
            .setUseHardwareNoiseSuppressor(true)
            .setSamplesReadyCallback { samples ->
                val rms = SpeakingDetector.rmsOfPcm16(samples.data)
                val speaking = detector.onSample(rms, System.currentTimeMillis(), muted)
                if (speaking != lastSpeaking) {
                    lastSpeaking = speaking
                    onSelfSpeaking(speaking)
                }
            }
            .createAudioDeviceModule()
        adm = module
        val f = PeerConnectionFactory.builder()
            .setAudioDeviceModule(module)
            .createPeerConnectionFactory()
        audioSource = f.createAudioSource(MediaConstraints())
        return f
    }

    private fun optionsFor(f: PeerConnectionFactory, reply: JsonObject): PeerConnection.Options {
        // The transport reply carries its own TURN/STUN list; fall back to the
        // one `hello.sfu` advertised.
        val configs = RoomProtocol.iceServersOf(reply).ifEmpty { channel.sfu?.iceServers ?: emptyList() }
        val servers = configs.flatMap { cfg ->
            cfg.urls.map { url ->
                org.webrtc.PeerConnection.IceServer.builder(url)
                    .setUsername(cfg.username ?: "")
                    .setPassword(cfg.credential ?: "")
                    .createIceServer()
            }
        }
        val options = PeerConnection.Options()
        options.setFactory(f)
        if (servers.isNotEmpty()) {
            options.setRTCConfig(org.webrtc.PeerConnection.RTCConfiguration(servers))
        }
        return options
    }

    companion object {
        /** ICE never reached the media server; the call was agreed but nobody can hear you. */
        const val VOICE_MEDIA_REASON =
            "Voice could not reach the media server, so nobody can hear you in this room."

        @Volatile private var runtimeReady = false

        /** mediasoup's native worker + libwebrtc, initialized once per process. */
        @Synchronized
        private fun ensureRuntimeStatic(context: Context) {
            if (runtimeReady) return
            MediasoupClient.initialize(context.applicationContext)
            runtimeReady = true
        }
    }

    private fun ensureRuntime() = ensureRuntimeStatic(appContext)
}

private fun JsonObject.string(key: String): String? =
    (this[key] as? JsonPrimitive)?.takeIf { it.isString }?.content

private fun JsonObject.elementString(key: String): String {
    val element = this[key] ?: throw RoomRequestException("missing $key in reply")
    return CortexJson.encodeToString(JsonElement.serializer(), element)
}

private fun String.asElement(): JsonElement = CortexJson.parseToJsonElement(this)

private fun JsonArray?.orEmptyProducers(): List<RoomProducer> {
    if (this == null) return emptyList()
    return mapNotNull { entry ->
        val obj = entry as? JsonObject ?: return@mapNotNull null
        val id = obj.string("producerId") ?: return@mapNotNull null
        RoomProducer(id, obj.string("userId") ?: "")
    }
}
