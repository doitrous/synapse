import Foundation

/// The hand-rolled half of the mediasoup client: ORTC ⇄ SDP for one Opus track.
///
/// `mediasoup-client` is distributed as a CocoaPod that bundles its own
/// `WebRTC.xcframework`; this project is Swift Package Manager only, so instead
/// of vendoring that, the produce/consume signalling is implemented here against
/// the plain `stasel/WebRTC` binary. A study room needs exactly one Opus stream
/// up and one per speaker down — no video, no simulcast, no RTX — which is the
/// one case small enough to map by hand.
///
/// The shape follows `mediasoup-client`'s Unified-Plan handler:
///   • **send** — the peer connection makes the offer; we read the produced
///     track's `RtpParameters` out of it and set a remote *answer* built here.
///   • **recv** — we build a remote *offer* from the consumer's `RtpParameters`
///     and let the peer connection make the answer.
/// In both directions mediasoup is the DTLS server (ICE-lite), so every remote
/// section is `a=setup:passive` and the client connects the transport with its
/// own fingerprint and `role: "client"`.
///
/// These functions are pure String ⇄ struct transforms, so the parsing and the
/// generation are unit-tested directly. What they cannot prove — that the
/// resulting DTLS/ICE handshake actually completes against a live SFU with a
/// public `announcedIp` — is the one part of this file that needs two devices
/// and real infrastructure to verify. See `docs/rooms-voice.md`.
enum MediasoupSdp {

    // MARK: - Building remote SDP (what we hand to setRemoteDescription)

    struct Transport {
        var ice: IceParameters
        var candidates: [IceCandidate]
        var dtls: DtlsParameters
    }

    /// The remote *answer* for the send transport: mediasoup receiving our track.
    static func sendAnswer(transport: Transport, produced rtp: RtpParameters, mid: String) -> String {
        let section = mediaSection(
            mid: mid,
            direction: "recvonly",
            codecs: rtp.codecs,
            headerExtensions: rtp.headerExtensions ?? [],
            rtcp: rtp.rtcp,
            ssrc: nil,
            cname: nil,
            transport: transport,
        )
        return sessionHeader(dtls: transport.dtls, iceLite: transport.ice.iceLite ?? true, mids: [mid]) + section
    }

    /// The remote *offer* for the recv transport: mediasoup sending each speaker.
    ///
    /// One `m=audio` section per consumer, all under one BUNDLE group, so every
    /// speaker rides the single recv transport's one ICE/DTLS session.
    static func recvOffer(transport: Transport, consumers: [(mid: String, rtp: RtpParameters)]) -> String {
        let mids = consumers.map(\.mid)
        var sdp = sessionHeader(dtls: transport.dtls, iceLite: transport.ice.iceLite ?? true, mids: mids)
        for consumer in consumers {
            let ssrc = consumer.rtp.encodings?.first?.ssrc
            sdp += mediaSection(
                mid: consumer.mid,
                direction: "sendonly",
                codecs: consumer.rtp.codecs,
                headerExtensions: consumer.rtp.headerExtensions ?? [],
                rtcp: consumer.rtp.rtcp,
                ssrc: ssrc,
                cname: consumer.rtp.rtcp?.cname,
                transport: transport,
            )
        }
        return sdp
    }

    private static func sessionHeader(dtls: DtlsParameters, iceLite: Bool, mids: [String]) -> String {
        var lines = [
            "v=0",
            "o=mediasoup-client 10000 1 IN IP4 0.0.0.0",
            "s=-",
            "t=0 0",
        ]
        if iceLite { lines.append("a=ice-lite") }
        if let fingerprint = dtls.fingerprints.last {
            lines.append("a=fingerprint:\(fingerprint.algorithm) \(fingerprint.value)")
        }
        lines.append("a=group:BUNDLE \(mids.joined(separator: " "))")
        lines.append("a=msid-semantic: WMS *")
        return lines.joined(separator: "\r\n") + "\r\n"
    }

    private static func mediaSection(
        mid: String,
        direction: String,
        codecs: [RtpCodecParameters],
        headerExtensions: [RtpHeaderExtensionParameters],
        rtcp: RtcpParameters?,
        ssrc: UInt32?,
        cname: String?,
        transport: Transport,
    ) -> String {
        let payloadTypes = codecs.map { String($0.payloadType) }.joined(separator: " ")
        var lines = [
            "m=audio 7 UDP/TLS/RTP/SAVPF \(payloadTypes)",
            "c=IN IP4 127.0.0.1",
            "a=rtcp:9 IN IP4 0.0.0.0",
            "a=ice-ufrag:\(transport.ice.usernameFragment)",
            "a=ice-pwd:\(transport.ice.password)",
            // mediasoup is always the DTLS server, so the remote section is passive.
            "a=setup:passive",
            "a=mid:\(mid)",
            "a=\(direction)",
            "a=rtcp-mux",
        ]
        if rtcp?.reducedSize ?? true { lines.append("a=rtcp-rsize") }
        for ext in headerExtensions {
            lines.append("a=extmap:\(ext.id) \(ext.uri)")
        }
        for codec in codecs {
            let channels = codec.channels ?? 1
            lines.append("a=rtpmap:\(codec.payloadType) \(codecName(codec.mimeType))/\(codec.clockRate)/\(channels)")
            if let parameters = codec.parameters, !parameters.isEmpty {
                let fmtp = parameters
                    .sorted { $0.key < $1.key }
                    .map { "\($0.key)=\($0.value.sdpText)" }
                    .joined(separator: ";")
                lines.append("a=fmtp:\(codec.payloadType) \(fmtp)")
            }
            for feedback in codec.rtcpFeedback ?? [] {
                let parameter = feedback.parameter.map { " \($0)" } ?? ""
                lines.append("a=rtcp-fb:\(codec.payloadType) \(feedback.type)\(parameter)")
            }
        }
        if let ssrc {
            lines.append("a=ssrc:\(ssrc) cname:\(cname ?? "mediasoup")")
        }
        for candidate in transport.candidates {
            lines.append(candidateLine(candidate))
        }
        lines.append("a=end-of-candidates")
        return lines.joined(separator: "\r\n") + "\r\n"
    }

    private static func candidateLine(_ candidate: IceCandidate) -> String {
        var line = "a=candidate:\(candidate.foundation) 1 \(candidate.`protocol`) \(candidate.priority) "
            + "\(candidate.host) \(candidate.port) typ \(candidate.type)"
        if let tcpType = candidate.tcpType { line += " tcptype \(tcpType)" }
        return line
    }

    /// `audio/opus` → `opus`. The SDP rtpmap wants the subtype only.
    private static func codecName(_ mimeType: String) -> String {
        mimeType.split(separator: "/").last.map(String.init) ?? mimeType
    }

    // MARK: - Parsing our own local offer (to produce)

    /// The RTP parameters of the audio track in a peer-connection offer.
    ///
    /// Picks the Opus codec the peer connection chose and reads its payload
    /// type, fmtp, feedback, the header-extension ids, the SSRC and the CNAME —
    /// which is exactly what `sfu:produce` needs. Returns nil if the offer has
    /// no Opus audio m-line, which is not something a healthy peer connection
    /// produces.
    static func parseProducerRtpParameters(offer sdp: String) -> RtpParameters? {
        guard let section = audioSection(in: sdp) else { return nil }
        let mid = value(after: "a=mid:", in: section)

        // The Opus payload type, from its rtpmap.
        guard let opusLine = section.first(where: { $0.lowercased().contains("a=rtpmap:") && $0.lowercased().contains("opus/") }),
              let payloadType = Int(value(after: "a=rtpmap:", in: [opusLine]).split(separator: " ").first ?? "") else {
            return nil
        }
        let rtpmapTail = opusLine.split(separator: " ").dropFirst().first.map(String.init) ?? "opus/48000/2"
        let parts = rtpmapTail.split(separator: "/")
        let clockRate = parts.count > 1 ? Int(parts[1]) ?? 48000 : 48000
        let channels = parts.count > 2 ? Int(parts[2]) ?? 2 : 2

        var parameters: [String: CodecParameterValue] = [:]
        if let fmtp = section.first(where: { $0.hasPrefix("a=fmtp:\(payloadType) ") }) {
            let body = fmtp.replacingOccurrences(of: "a=fmtp:\(payloadType) ", with: "")
            for pair in body.split(separator: ";") {
                let kv = pair.split(separator: "=", maxSplits: 1)
                guard kv.count == 2 else { continue }
                let key = kv[0].trimmingCharacters(in: .whitespaces)
                let raw = kv[1].trimmingCharacters(in: .whitespaces)
                parameters[key] = Int(raw).map(CodecParameterValue.int) ?? .string(raw)
            }
        }

        var feedback: [RtcpFeedback] = []
        for line in section where line.hasPrefix("a=rtcp-fb:\(payloadType) ") {
            let body = line.replacingOccurrences(of: "a=rtcp-fb:\(payloadType) ", with: "")
                .split(separator: " ").map(String.init)
            if let type = body.first {
                feedback.append(RtcpFeedback(type: type, parameter: body.count > 1 ? body[1] : nil))
            }
        }

        var headerExtensions: [RtpHeaderExtensionParameters] = []
        for line in section where line.hasPrefix("a=extmap:") {
            let body = line.replacingOccurrences(of: "a=extmap:", with: "").split(separator: " ")
            guard body.count >= 2, let id = Int(body[0].split(separator: "/").first ?? "") else { continue }
            headerExtensions.append(RtpHeaderExtensionParameters(uri: String(body[1]), id: id, encrypt: nil))
        }

        var ssrc: UInt32?
        var cname: String?
        for line in section where line.hasPrefix("a=ssrc:") {
            let body = line.replacingOccurrences(of: "a=ssrc:", with: "")
            let bits = body.split(separator: " ", maxSplits: 1)
            if ssrc == nil, let first = bits.first { ssrc = UInt32(first) }
            if let attr = bits.count > 1 ? bits[1] : nil, attr.hasPrefix("cname:") {
                cname = String(attr.dropFirst("cname:".count))
            }
        }

        let codec = RtpCodecParameters(
            mimeType: "audio/opus",
            payloadType: payloadType,
            clockRate: clockRate,
            channels: channels,
            parameters: parameters.isEmpty ? nil : parameters,
            rtcpFeedback: feedback.isEmpty ? nil : feedback,
        )
        return RtpParameters(
            mid: mid.isEmpty ? nil : mid,
            codecs: [codec],
            headerExtensions: headerExtensions.isEmpty ? nil : headerExtensions,
            encodings: ssrc.map { [RtpEncoding(ssrc: $0, dtx: nil)] },
            rtcp: RtcpParameters(cname: cname, reducedSize: true),
        )
    }

    /// Our own DTLS fingerprint, from the peer connection's local description,
    /// to send in `sfu:connectTransport` with `role: "client"`.
    static func parseFingerprint(localSDP sdp: String) -> DtlsFingerprint? {
        for line in lines(sdp) where line.hasPrefix("a=fingerprint:") {
            let body = line.replacingOccurrences(of: "a=fingerprint:", with: "").split(separator: " ")
            if body.count == 2 { return DtlsFingerprint(algorithm: String(body[0]), value: String(body[1])) }
        }
        return nil
    }

    // MARK: - Small SDP helpers

    private static func lines(_ sdp: String) -> [String] {
        sdp.components(separatedBy: .newlines).filter { !$0.isEmpty }
    }

    /// The lines of the first audio m-section (from `m=audio` to the next `m=`).
    private static func audioSection(in sdp: String) -> [String]? {
        let all = lines(sdp)
        guard let start = all.firstIndex(where: { $0.hasPrefix("m=audio") }) else { return nil }
        var section: [String] = []
        for line in all[start...] {
            if line.hasPrefix("m=") && !section.isEmpty { break }
            section.append(line)
        }
        return section
    }

    private static func value(after prefix: String, in lines: [String]) -> String {
        for line in lines where line.hasPrefix(prefix) {
            return String(line.dropFirst(prefix.count))
        }
        return ""
    }
}
