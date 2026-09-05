import Foundation
import WebRTC

/// The native media engine behind a study-room call, kept behind a protocol so
/// the orchestration in `RoomAudioController` can be reasoned about — and one
/// day tested — without a live `RTCPeerConnection`.
///
/// The signalling itself (createTransport → connect → produce/consume) stays in
/// the controller, which owns the socket; this type owns only the two peer
/// connections and the microphone track. Each method is handed the two async
/// steps it must interleave with WebRTC — `connect` sends `sfu:connectTransport`
/// with the DTLS parameters read from the local description, `produce` sends
/// `sfu:produce` with the RTP parameters read from the offer — because those are
/// the exact points at which mediasoup needs to hear from the client mid-SDP.
protocol RoomVoiceRTC: AnyObject {

    /// Build the send transport: offer → connect → produce. Returns the producerId.
    func produce(
        transport: MediasoupSdp.Transport,
        iceServers: [RTCIceServer],
        connect: @escaping (DtlsParameters) async throws -> Void,
        produce: @escaping (RtpParameters) async throws -> String,
    ) async throws -> String

    /// Take one remote producer: add its m-line, renegotiate, connect on the first.
    func consume(
        transport: MediasoupSdp.Transport,
        iceServers: [RTCIceServer],
        producerId: String,
        rtp: RtpParameters,
        connect: @escaping (DtlsParameters) async throws -> Void,
    ) async throws

    func stopConsumer(producerId: String)
    func setMuted(_ muted: Bool)
    /// The local microphone level (RMS, 0–1) from WebRTC stats, for the ring.
    func inputAudioLevel() async -> Double?
    func close()
}

/// The single-Opus mediasoup client built on `stasel/WebRTC`.
final class MediasoupRTCClient: RoomVoiceRTC {

    private static let factory: RTCPeerConnectionFactory = {
        RTCInitializeSSL()
        return RTCPeerConnectionFactory(
            encoderFactory: RTCDefaultVideoEncoderFactory(),
            decoderFactory: RTCDefaultVideoDecoderFactory(),
        )
    }()

    private let delegate = PeerConnectionDelegate()
    private var sendPC: RTCPeerConnection?
    private var recvPC: RTCPeerConnection?
    private var micTrack: RTCAudioTrack?

    /// Remote producers on the recv transport, in the order added, so the offer
    /// is rebuilt with stable mids.
    private var consumers: [(producerId: String, mid: String, rtp: RtpParameters)] = []
    private var recvConnected = false
    private var midCounter = 0

    // MARK: - Send

    func produce(
        transport: MediasoupSdp.Transport,
        iceServers: [RTCIceServer],
        connect: @escaping (DtlsParameters) async throws -> Void,
        produce: @escaping (RtpParameters) async throws -> String,
    ) async throws -> String {
        let pc = makePeerConnection(iceServers: iceServers)
        sendPC = pc

        let source = Self.factory.audioSource(with: RTCMediaConstraints(mandatoryConstraints: nil, optionalConstraints: nil))
        let track = Self.factory.audioTrack(with: source, trackId: "mic0")
        micTrack = track
        pc.add(track, streamIds: ["nishany-room"])

        let offer = try await pc.offerAsync()
        try await pc.setLocalAsync(offer)

        guard let fingerprint = MediasoupSdp.parseFingerprint(localSDP: offer.sdp) else {
            throw RoomVoiceError.sdp("no local DTLS fingerprint")
        }
        try await connect(DtlsParameters(role: "client", fingerprints: [fingerprint]))

        guard var rtp = MediasoupSdp.parseProducerRtpParameters(offer: offer.sdp) else {
            throw RoomVoiceError.sdp("no Opus audio in local offer")
        }
        let producerId = try await produce(rtp)

        // The remote answer describes mediasoup receiving exactly what we offered.
        let mid = rtp.mid ?? "0"
        rtp.mid = mid
        let answer = MediasoupSdp.sendAnswer(transport: transport, produced: rtp, mid: mid)
        try await pc.setRemoteAsync(RTCSessionDescription(type: .answer, sdp: answer))
        return producerId
    }

    // MARK: - Receive

    func consume(
        transport: MediasoupSdp.Transport,
        iceServers: [RTCIceServer],
        producerId: String,
        rtp: RtpParameters,
        connect: @escaping (DtlsParameters) async throws -> Void,
    ) async throws {
        let pc = recvPC ?? makePeerConnection(iceServers: iceServers)
        recvPC = pc

        guard !consumers.contains(where: { $0.producerId == producerId }) else { return }
        midCounter += 1
        let mid = "recv\(midCounter)"
        consumers.append((producerId: producerId, mid: mid, rtp: rtp))

        let offer = MediasoupSdp.recvOffer(
            transport: transport,
            consumers: consumers.map { (mid: $0.mid, rtp: $0.rtp) },
        )
        try await pc.setRemoteAsync(RTCSessionDescription(type: .offer, sdp: offer))
        let answer = try await pc.answerAsync()
        try await pc.setLocalAsync(answer)

        if !recvConnected {
            recvConnected = true
            guard let fingerprint = MediasoupSdp.parseFingerprint(localSDP: answer.sdp) else {
                throw RoomVoiceError.sdp("no local DTLS fingerprint")
            }
            try await connect(DtlsParameters(role: "client", fingerprints: [fingerprint]))
        }
    }

    func stopConsumer(producerId: String) {
        consumers.removeAll { $0.producerId == producerId }
        // The m-line stays in the session but is no longer fed by the SFU, which
        // sent `sfu:producerClosed`; libwebrtc simply stops rendering it. A full
        // renegotiation to recycle the m-line is not attempted — a study room
        // churns speakers slowly, and a stale inactive section costs nothing.
    }

    // MARK: - Controls

    func setMuted(_ muted: Bool) {
        micTrack?.isEnabled = !muted
    }

    func inputAudioLevel() async -> Double? {
        guard let pc = sendPC else { return nil }
        return await withCheckedContinuation { continuation in
            pc.statistics { report in
                for stat in report.statistics.values
                where stat.type == "media-source" && (stat.values["kind"] as? String) == "audio" {
                    if let level = stat.values["audioLevel"] as? Double {
                        continuation.resume(returning: level)
                        return
                    }
                }
                continuation.resume(returning: nil)
            }
        }
    }

    func close() {
        micTrack?.isEnabled = false
        micTrack = nil
        sendPC?.close()
        recvPC?.close()
        sendPC = nil
        recvPC = nil
        consumers.removeAll()
        recvConnected = false
    }

    // MARK: - Peer connection

    private func makePeerConnection(iceServers: [RTCIceServer]) -> RTCPeerConnection {
        let config = RTCConfiguration()
        config.iceServers = iceServers
        config.sdpSemantics = .unifiedPlan
        config.bundlePolicy = .maxBundle
        config.rtcpMuxPolicy = .require
        config.continualGatheringPolicy = .gatherContinually
        let constraints = RTCMediaConstraints(mandatoryConstraints: nil, optionalConstraints: nil)
        guard let pc = Self.factory.peerConnection(with: config, constraints: constraints, delegate: delegate) else {
            fatalError("RTCPeerConnectionFactory returned no peer connection")
        }
        return pc
    }
}

enum RoomVoiceError: Error, Equatable {
    case sdp(String)
}

/// libwebrtc requires a delegate. Remote audio renders through the audio session
/// on its own, so nothing here needs to do work; the callbacks are noise.
private final class PeerConnectionDelegate: NSObject, RTCPeerConnectionDelegate {
    func peerConnection(_ pc: RTCPeerConnection, didChange stateChanged: RTCSignalingState) {}
    func peerConnection(_ pc: RTCPeerConnection, didAdd stream: RTCMediaStream) {}
    func peerConnection(_ pc: RTCPeerConnection, didRemove stream: RTCMediaStream) {}
    func peerConnectionShouldNegotiate(_ pc: RTCPeerConnection) {}
    func peerConnection(_ pc: RTCPeerConnection, didChange newState: RTCIceConnectionState) {}
    func peerConnection(_ pc: RTCPeerConnection, didChange newState: RTCIceGatheringState) {}
    func peerConnection(_ pc: RTCPeerConnection, didGenerate candidate: RTCIceCandidate) {}
    func peerConnection(_ pc: RTCPeerConnection, didRemove candidates: [RTCIceCandidate]) {}
    func peerConnection(_ pc: RTCPeerConnection, didOpen dataChannel: RTCDataChannel) {}
}

/// Async wrappers over the completion-handler API.
private extension RTCPeerConnection {
    func offerAsync() async throws -> RTCSessionDescription {
        let constraints = RTCMediaConstraints(mandatoryConstraints: nil, optionalConstraints: nil)
        return try await withCheckedThrowingContinuation { continuation in
            offer(for: constraints) { sdp, error in
                if let sdp { continuation.resume(returning: sdp) }
                else { continuation.resume(throwing: error ?? RoomVoiceError.sdp("offer failed")) }
            }
        }
    }

    func answerAsync() async throws -> RTCSessionDescription {
        let constraints = RTCMediaConstraints(mandatoryConstraints: nil, optionalConstraints: nil)
        return try await withCheckedThrowingContinuation { continuation in
            answer(for: constraints) { sdp, error in
                if let sdp { continuation.resume(returning: sdp) }
                else { continuation.resume(throwing: error ?? RoomVoiceError.sdp("answer failed")) }
            }
        }
    }

    func setLocalAsync(_ sdp: RTCSessionDescription) async throws {
        try await withCheckedThrowingContinuation { (continuation: CheckedContinuation<Void, Error>) in
            setLocalDescription(sdp) { error in
                if let error { continuation.resume(throwing: error) } else { continuation.resume() }
            }
        }
    }

    func setRemoteAsync(_ sdp: RTCSessionDescription) async throws {
        try await withCheckedThrowingContinuation { (continuation: CheckedContinuation<Void, Error>) in
            setRemoteDescription(sdp) { error in
                if let error { continuation.resume(throwing: error) } else { continuation.resume() }
            }
        }
    }
}
