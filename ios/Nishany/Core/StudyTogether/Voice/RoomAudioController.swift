import Foundation
import Observation
import WebRTC

/// Voice in a study room, tying the socket, the SFU negotiation, the microphone
/// and the audio session together. The iOS counterpart of
/// `src/lib/rooms/useRoomAudio.ts`, and it mirrors that hook's shape: every
/// member sends one Opus stream up and receives one per speaker down, speaking
/// is measured locally and broadcast, and a dropped socket rebuilds the call
/// from the still-open microphone.
///
/// A study room is capped at twenty, so nineteen downstreams is the ceiling —
/// which is a call an SFU carries and a mesh never could.
@MainActor
@Observable
final class RoomAudioController {

    enum State: Equatable { case idle, joining, live, error }

    private(set) var state: State = .idle
    private(set) var muted = false
    private(set) var callActive = false
    private(set) var voiceReconnecting = false
    /// Whether the mic prompt was refused — the UI points to Settings then.
    private(set) var micDenied = false
    private(set) var localReason: String?

    /// Member ids currently speaking: yours from your own level, everyone else's
    /// from the room.
    var speaking: Set<String> {
        var set = channel.speaking
        if let selfId = channel.selfUserId {
            if selfSpeaking { set.insert(selfId) } else { set.remove(selfId) }
        }
        return set
    }

    var members: [RoomVoiceProtocol.Member] { channel.members ?? [] }
    var selfUserId: String? { channel.selfUserId }

    /// Why nobody can hear you, when that is the case. Nothing at all once a call
    /// is up: a standing "voice doesn't work" under a working call is worse than
    /// no note.
    var reason: String? {
        if let localReason { return localReason }
        if callActive || voiceReconnecting { return nil }
        if let sfu = channel.sfu, !sfu.available { return sfu.reason ?? Self.transportReason }
        if channel.sfu == nil && !channel.connected { return "Connecting to the room…" }
        return nil
    }

    /// True when a call is possible at all: the socket is up and the server has
    /// an SFU. The Join button is only offered when this is true.
    var voiceAvailable: Bool { channel.connected && (channel.sfu?.available ?? false) }

    static let transportReason = "Voice is unavailable right now."

    let channel: RoomVoiceChannel
    private let rtc: RoomVoiceRTC
    private let audioSession = RoomVoiceAudioSession()

    private var selfSpeaking = false
    private var detector = RoomSpeakingDetector()
    private var levelTimer: Task<Void, Never>?

    /// The student asked to be in the call, not merely to open the mic. Survives
    /// a dropped socket, which is the whole point: it tells the reconnect whether
    /// to rebuild anything.
    private var wantCall = false
    private var rebuilding = false

    private var sendTransportId: String?
    private var recvTransport: MediasoupSdp.Transport?
    private var recvTransportId: String?
    private var recvIceServers: [RTCIceServer] = []
    private var producerId: String?
    private var consumedProducerIds: Set<String> = []

    init(channel: RoomVoiceChannel, rtc: RoomVoiceRTC = MediasoupRTCClient()) {
        self.channel = channel
        self.rtc = rtc
        channel.onChange = { [weak self] in self?.reconcile() }
        audioSession.onInterruption = { [weak self] in self?.handleInterruption($0) }
    }

    // MARK: - Join / leave

    /// Open the microphone and negotiate a call. Called only from an explicit
    /// "Join voice" tap; the mic prompt is requested here, never at cold launch.
    func join() async {
        guard state != .live, state != .joining else { return }
        state = .joining
        localReason = nil

        if RoomVoiceAudioSession.micDenied {
            micDenied = true
            state = .error
            localReason = "Microphone access is off. Turn it on in Settings to talk in the room."
            return
        }
        if !RoomVoiceAudioSession.micGranted {
            let granted = await RoomVoiceAudioSession.requestMic()
            if !granted {
                micDenied = true
                state = .error
                localReason = "Microphone access was refused, so nobody can hear you."
                return
            }
        }

        do {
            try audioSession.activate()
        } catch {
            state = .error
            localReason = "The audio session could not start."
            return
        }

        state = .live
        wantCall = true
        do {
            try await startCall()
        } catch {
            // The initial negotiation failed (as opposed to a mid-call drop,
            // which `reconcile` rebuilds). Stand back down so Join can be tried
            // again rather than leaving a dead call reporting itself as live.
            closeCall()
            wantCall = false
            audioSession.deactivate()
            state = .error
            localReason = "Voice could not connect, so nobody can hear you in this room."
        }
    }

    func leave() {
        wantCall = false
        voiceReconnecting = false
        closeCall()
        levelTimer?.cancel()
        levelTimer = nil
        audioSession.deactivate()
        if selfSpeaking { channel.send(RoomVoiceProtocol.SpeakingFrame(speaking: false)) }
        selfSpeaking = false
        muted = false
        detector = RoomSpeakingDetector()
        state = .idle
        localReason = nil
    }

    // MARK: - The call

    private func startCall() async throws {
        guard channel.connected, channel.sfu?.available == true else { return }

        // Router capabilities (also carries the ICE servers).
        let capsData = try await channel.request { RoomVoiceProtocol.RtpCapabilitiesRequest(requestId: $0) }
        let caps = try JSONDecoder().decode(RoomVoiceProtocol.RtpCapabilitiesReply.self, from: capsData)
        var iceServers = caps.iceServers.map(Self.map) ?? []

        // Send transport, then produce over it.
        let sendData = try await channel.request { RoomVoiceProtocol.CreateTransportRequest(requestId: $0, direction: "send") }
        let send = try JSONDecoder().decode(RoomVoiceProtocol.CreateTransportReply.self, from: sendData)
        sendTransportId = send.id
        if let sendIce = send.iceServers.map(Self.map) { iceServers = sendIce }
        let sendTransport = MediasoupSdp.Transport(ice: send.iceParameters, candidates: send.iceCandidates, dtls: send.dtlsParameters)

        // Recv transport, kept for consuming speakers.
        let recvData = try await channel.request { RoomVoiceProtocol.CreateTransportRequest(requestId: $0, direction: "recv") }
        let recv = try JSONDecoder().decode(RoomVoiceProtocol.CreateTransportReply.self, from: recvData)
        recvTransportId = recv.id
        recvTransport = MediasoupSdp.Transport(ice: recv.iceParameters, candidates: recv.iceCandidates, dtls: recv.dtlsParameters)
        recvIceServers = recv.iceServers.map(Self.map) ?? iceServers

        let sendId = send.id
        let newProducerId = try await rtc.produce(
            transport: sendTransport,
            iceServers: iceServers,
            connect: { [channel] dtls in
                _ = try await channel.request {
                    RoomVoiceProtocol.ConnectTransportRequest(requestId: $0, transportId: sendId, dtlsParameters: dtls)
                }
            },
            produce: { [channel] rtp in
                let data = try await channel.request {
                    RoomVoiceProtocol.ProduceRequest(requestId: $0, transportId: sendId, rtpParameters: rtp)
                }
                return try JSONDecoder().decode(RoomVoiceProtocol.ProduceReply.self, from: data).producerId
            },
        )
        producerId = newProducerId
        if muted { rtc.setMuted(true) }
        callActive = true
        startLevelSampling()

        // Whoever was already talking when we walked in. New arrivals come
        // through the socket and are picked up by `reconcile()`.
        if let existingData = try? await channel.request({ RoomVoiceProtocol.ProducersRequest(requestId: $0) }),
           let existing = try? JSONDecoder().decode(RoomVoiceProtocol.ProducersReply.self, from: existingData) {
            for entry in existing.producers { await consume(producerId: entry.producerId) }
        }
        reconcile()
    }

    private func consume(producerId: String) async {
        guard callActive, let transport = recvTransport,
              !consumedProducerIds.contains(producerId) else { return }
        consumedProducerIds.insert(producerId)
        let recvId = recvTransportId ?? ""
        do {
            let data = try await channel.request {
                RoomVoiceProtocol.ConsumeRequest(
                    requestId: $0, transportId: recvId, producerId: producerId,
                    rtpCapabilities: Self.receiveCapabilities,
                )
            }
            let reply = try JSONDecoder().decode(RoomVoiceProtocol.ConsumeReply.self, from: data)
            try await rtc.consume(
                transport: transport,
                iceServers: recvIceServers,
                producerId: producerId,
                rtp: reply.rtpParameters,
                connect: { [channel] dtls in
                    _ = try await channel.request {
                        RoomVoiceProtocol.ConnectTransportRequest(requestId: $0, transportId: recvId, dtlsParameters: dtls)
                    }
                },
            )
            // The consumer arrives paused, always. Resume only once it is attached.
            _ = try await channel.request { RoomVoiceProtocol.ResumeRequest(requestId: $0, consumerId: reply.id) }
        } catch {
            consumedProducerIds.remove(producerId)
        }
    }

    /// Match live consumers to the room's producer list, and rebuild the call if
    /// the socket dropped and came back. Driven by `channel.onChange`.
    private func reconcile() {
        // A dropped socket tore the peer down server-side; the ids we hold name
        // things that no longer exist.
        if state == .live && wantCall && !channel.connected {
            if callActive {
                closeCall()
                voiceReconnecting = true
            }
            return
        }
        if state == .live && wantCall && channel.connected && !callActive && !rebuilding {
            rebuilding = true
            voiceReconnecting = true
            Task { [weak self] in
                guard let self else { return }
                do { try await self.startCall() }
                catch { self.closeCall(); self.localReason = "Voice could not reconnect." }
                self.rebuilding = false
                self.voiceReconnecting = false
            }
            return
        }

        guard callActive else { return }
        let wanted = Set(channel.producers.map(\.producerId))
        for gone in consumedProducerIds.subtracting(wanted) {
            rtc.stopConsumer(producerId: gone)
            consumedProducerIds.remove(gone)
        }
        for producer in channel.producers where !consumedProducerIds.contains(producer.producerId) {
            Task { [weak self] in await self?.consume(producerId: producer.producerId) }
        }
    }

    private func closeCall() {
        callActive = false
        rtc.close()
        producerId = nil
        consumedProducerIds.removeAll()
        sendTransportId = nil
        recvTransport = nil
        recvTransportId = nil
        channel.send(RoomVoiceProtocol.CloseFrame())
    }

    // MARK: - Mute

    func toggleMute() {
        let (next, effects) = RoomMuteMachine.toggle(muted: muted)
        muted = next
        rtc.setMuted(next)
        if let producerId {
            channel.send(RoomVoiceProtocol.PauseFrame(producerId: producerId, paused: effects.producerPaused))
        }
        if effects.announceSilent {
            selfSpeaking = false
            channel.send(RoomVoiceProtocol.SpeakingFrame(speaking: false))
        }
    }

    // MARK: - Speaking

    private func startLevelSampling() {
        levelTimer?.cancel()
        levelTimer = Task { [weak self] in
            while !Task.isCancelled {
                try? await Task.sleep(for: .milliseconds(100))
                guard let self, self.callActive else { continue }
                let level = await self.rtc.inputAudioLevel() ?? 0
                let now = Date()
                let wasSpeaking = self.selfSpeaking
                let isSpeaking = self.detector.update(rms: level, now: now, muted: self.muted)
                if isSpeaking != wasSpeaking {
                    self.selfSpeaking = isSpeaking
                    self.channel.send(RoomVoiceProtocol.SpeakingFrame(speaking: isSpeaking))
                }
            }
        }
    }

    // MARK: - Interruptions

    private func handleInterruption(_ interruption: RoomVoiceAudioSession.Interruption) {
        switch interruption {
        case .began:
            break // iOS has already paused our audio; nothing to tear down.
        case .ended(let shouldResume):
            guard shouldResume, state == .live else { return }
            try? audioSession.activate()
        }
    }

    // MARK: - Helpers

    private static func map(_ servers: [RoomVoiceProtocol.IceServer]) -> [RTCIceServer] {
        servers.map { server in
            if let username = server.username, let credential = server.credential {
                return RTCIceServer(urlStrings: server.urls, username: username, credential: credential)
            }
            return RTCIceServer(urlStrings: server.urls)
        }
    }

    /// What this client can receive: one Opus stream. Presented to the server so
    /// `canConsume` passes; it matches the codec we put in the recv SDP.
    private static let receiveCapabilities = RtpCapabilities(
        codecs: [
            RtpCodecCapability(
                kind: "audio", mimeType: "audio/opus", preferredPayloadType: 100,
                clockRate: 48000, channels: 2,
                parameters: ["minptime": .int(10), "useinbandfec": .int(1)], rtcpFeedback: [RtcpFeedback(type: "transport-cc")],
            ),
        ],
        headerExtensions: [
            RtpHeaderExtensionCapability(kind: "audio", uri: "urn:ietf:params:rtp-hdrext:ssrc-audio-level", preferredId: 1),
            RtpHeaderExtensionCapability(kind: "audio", uri: "http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01", preferredId: 3),
        ],
    )
}
